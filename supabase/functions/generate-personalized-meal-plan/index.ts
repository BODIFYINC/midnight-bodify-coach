import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, meal_type, preferences } = await req.json();
    console.log('Generating meal plan for user:', user_id, 'meal type:', meal_type);

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return new Response(JSON.stringify({ error: 'User profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate nutrition targets
    const { data: targets } = await supabase.rpc('calculate_nutrition_targets', {
      user_weight: profile.weight_kg,
      user_height: profile.height_cm,
      user_age: profile.age,
      user_gender: profile.gender,
      user_activity_level: profile.activity_level,
      user_goal: profile.goal
    });

    const nutritionTargets = targets[0];
    console.log('Nutrition targets:', nutritionTargets);

    // Get suitable meals based on dietary restrictions and preferences
    let query = supabase
      .from('meals')
      .select('*')
      .eq('category', meal_type);

    // Filter out disliked foods
    if (profile.disliked_foods && profile.disliked_foods.length > 0) {
      for (const dislikedFood of profile.disliked_foods) {
        query = query.not('ingredients', 'cs', `["${dislikedFood}"]`);
      }
    }

    // Filter by dietary restrictions
    if (profile.dietary_restrictions && profile.dietary_restrictions.length > 0) {
      for (const restriction of profile.dietary_restrictions) {
        query = query.contains('tags', [restriction]);
      }
    }

    const { data: meals, error: mealsError } = await query.limit(20);

    if (mealsError) {
      console.error('Meals error:', mealsError);
      return new Response(JSON.stringify({ error: 'Failed to fetch meals' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate target nutrition for this meal based on meal type
    let mealCalorieTarget = 0;
    let mealProteinTarget = 0;

    switch (meal_type) {
      case 'breakfast':
        mealCalorieTarget = nutritionTargets.calories * 0.25;
        mealProteinTarget = nutritionTargets.protein * 0.25;
        break;
      case 'lunch':
        mealCalorieTarget = nutritionTargets.calories * 0.35;
        mealProteinTarget = nutritionTargets.protein * 0.35;
        break;
      case 'dinner':
        mealCalorieTarget = nutritionTargets.calories * 0.35;
        mealProteinTarget = nutritionTargets.protein * 0.35;
        break;
      case 'snack':
        mealCalorieTarget = nutritionTargets.calories * 0.05;
        mealProteinTarget = nutritionTargets.protein * 0.05;
        break;
    }

    // Score meals based on how well they match targets and user goal
    const scoredMeals = meals.map(meal => {
      let score = 0;
      
      // Base score on calorie match (closer to target = higher score)
      const calorieMatch = 1 - Math.abs(meal.calories_per_100g - mealCalorieTarget) / mealCalorieTarget;
      score += calorieMatch * 30;

      // Score based on protein content (higher for muscle building goals)
      if (profile.goal === 'build_muscle' || profile.goal === 'gain_weight') {
        score += (meal.protein_per_100g / 40) * 40; // Max 40 points for high protein
      } else if (profile.goal === 'lose_weight') {
        score += (meal.protein_per_100g / 30) * 30; // Max 30 points for moderate protein
      }

      // Bonus for fiber if weight loss goal
      if (profile.goal === 'lose_weight' && meal.fiber_per_100g) {
        score += (meal.fiber_per_100g / 10) * 10;
      }

      // Bonus for low carbs if keto diet
      if (profile.dietary_restrictions?.includes('keto')) {
        score += (10 - meal.carbs_per_100g) * 2;
      }

      // Bonus for preparation time preference
      if (preferences?.max_prep_time && meal.preparation_time <= preferences.max_prep_time) {
        score += 10;
      }

      // Bonus for difficulty preference
      if (preferences?.difficulty && meal.difficulty === preferences.difficulty) {
        score += 5;
      }

      return { ...meal, score };
    });

    // Sort by score and return top recommendations
    const topMeals = scoredMeals
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(meal => ({
        ...meal,
        recommended_portion: Math.round((mealCalorieTarget / meal.calories_per_100g) * 100), // grams
        calories_for_portion: Math.round((mealCalorieTarget / meal.calories_per_100g) * meal.calories_per_100g),
        protein_for_portion: Math.round((mealCalorieTarget / meal.calories_per_100g) * meal.protein_per_100g),
        carbs_for_portion: Math.round((mealCalorieTarget / meal.calories_per_100g) * meal.carbs_per_100g),
        fat_for_portion: Math.round((mealCalorieTarget / meal.calories_per_100g) * meal.fat_per_100g),
      }));

    console.log('Generated meal recommendations:', topMeals.length);

    return new Response(JSON.stringify({
      recommendations: topMeals,
      targets: {
        calories: mealCalorieTarget,
        protein: mealProteinTarget,
      },
      daily_targets: nutritionTargets
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-personalized-meal-plan:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});