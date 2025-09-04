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
    const { user_id, action, data } = await req.json();
    console.log('Tracking nutrition progress for user:', user_id, 'action:', action);

    if (action === 'log_meal') {
      // Log a meal consumption
      const { meal_id, portion_size_grams, meal_type } = data;

      // Get meal nutrition data
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .select('*')
        .eq('id', meal_id)
        .single();

      if (mealError || !meal) {
        return new Response(JSON.stringify({ error: 'Meal not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Calculate nutrition for portion
      const portionMultiplier = portion_size_grams / 100;
      const nutritionConsumed = {
        calories_consumed: meal.calories_per_100g * portionMultiplier,
        protein_consumed: meal.protein_per_100g * portionMultiplier,
        carbs_consumed: meal.carbs_per_100g * portionMultiplier,
        fat_consumed: meal.fat_per_100g * portionMultiplier,
      };

      // Log the meal
      const { data: mealLog, error: logError } = await supabase
        .from('user_meal_logs')
        .insert({
          user_id,
          meal_id,
          portion_size_grams,
          meal_type,
          ...nutritionConsumed
        })
        .select()
        .single();

      if (logError) {
        console.error('Error logging meal:', logError);
        return new Response(JSON.stringify({ error: 'Failed to log meal' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update daily progress
      await updateDailyProgress(user_id, new Date().toISOString().split('T')[0]);

      return new Response(JSON.stringify({
        success: true,
        meal_log: mealLog,
        nutrition_added: nutritionConsumed
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'log_workout') {
      // Log a workout completion
      const { workout_data, duration_minutes, calories_burned } = data;

      const { data: workoutLog, error: workoutError } = await supabase
        .from('user_workout_logs')
        .insert({
          user_id,
          workout_name: workout_data.name,
          exercises_completed: workout_data.exercises,
          total_duration_minutes: duration_minutes,
          calories_burned: calories_burned,
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (workoutError) {
        console.error('Error logging workout:', workoutError);
        return new Response(JSON.stringify({ error: 'Failed to log workout' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update daily progress
      await updateDailyProgress(user_id, new Date().toISOString().split('T')[0]);

      return new Response(JSON.stringify({
        success: true,
        workout_log: workoutLog
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'get_daily_progress') {
      // Get daily progress summary
      const date = data.date || new Date().toISOString().split('T')[0];
      
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user_id)
        .eq('date', date)
        .single();

      if (progressError && progressError.code !== 'PGRST116') {
        console.error('Error fetching progress:', progressError);
        return new Response(JSON.stringify({ error: 'Failed to fetch progress' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        progress: progress || {
          date,
          total_calories_consumed: 0,
          total_protein_consumed: 0,
          total_carbs_consumed: 0,
          total_fat_consumed: 0,
          total_calories_burned: 0,
          workout_count: 0
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'get_weekly_progress') {
      // Get weekly progress data
      const endDate = data.end_date || new Date().toISOString().split('T')[0];
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);
      
      const { data: weeklyProgress, error: weeklyError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user_id)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (weeklyError) {
        console.error('Error fetching weekly progress:', weeklyError);
        return new Response(JSON.stringify({ error: 'Failed to fetch weekly progress' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        weekly_progress: weeklyProgress || []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in track-nutrition-progress:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function updateDailyProgress(userId: string, date: string) {
  try {
    // Get all meals for the day
    const { data: meals } = await supabase
      .from('user_meal_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('consumed_at', `${date}T00:00:00.000Z`)
      .lt('consumed_at', `${date}T23:59:59.999Z`);

    // Get all workouts for the day
    const { data: workouts } = await supabase
      .from('user_workout_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('started_at', `${date}T00:00:00.000Z`)
      .lt('started_at', `${date}T23:59:59.999Z`);

    // Calculate totals
    const totalCaloriesConsumed = meals?.reduce((sum, meal) => sum + (meal.calories_consumed || 0), 0) || 0;
    const totalProteinConsumed = meals?.reduce((sum, meal) => sum + (meal.protein_consumed || 0), 0) || 0;
    const totalCarbsConsumed = meals?.reduce((sum, meal) => sum + (meal.carbs_consumed || 0), 0) || 0;
    const totalFatConsumed = meals?.reduce((sum, meal) => sum + (meal.fat_consumed || 0), 0) || 0;
    const totalCaloriesBurned = workouts?.reduce((sum, workout) => sum + (workout.calories_burned || 0), 0) || 0;
    const workoutCount = workouts?.length || 0;

    // Upsert daily progress
    const { error: upsertError } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        date: date,
        total_calories_consumed: totalCaloriesConsumed,
        total_protein_consumed: totalProteinConsumed,
        total_carbs_consumed: totalCarbsConsumed,
        total_fat_consumed: totalFatConsumed,
        total_calories_burned: totalCaloriesBurned,
        workout_count: workoutCount
      }, {
        onConflict: 'user_id,date'
      });

    if (upsertError) {
      console.error('Error updating daily progress:', upsertError);
    }
  } catch (error) {
    console.error('Error in updateDailyProgress:', error);
  }
}