import { getMealsByGoal, getAllRealisticMeals } from './realMealDatabase';
import { Meal, MealType } from './enhancedMealService';
import { AccurateNutritionTracker } from './accurateNutritionTracker';
import { getFitnessResponse } from './aiService';

export interface EnhancedMealPlan {
  // Meal properties
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
  // Nutrition properties
  nutrition: {
    totalCalories: number;
    totalProtein: number;
    calorieTarget: number;
    proteinTarget: number;
  };
}

export function generateAdvancedMealPlan(): EnhancedMealPlan {
  const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  
  // Calculate accurate targets using medical formulas
  const profile = {
    weight: userSettings.weight || 70,
    height: userSettings.height || 175,
    age: userSettings.age || 25,
    gender: userSettings.gender || 'male',
    activityLevel: userSettings.activityLevel || 'moderate',
    goal: userSettings.goal || 'muscle_gain',
    bodyFat: userSettings.bodyFat
  };

  const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
  // Prefer explicit targets saved from Settings, if present
  if (userPrefs && typeof userPrefs.targetCalories === 'number') {
    targets.calories = Math.round(userPrefs.targetCalories);
  }
  if (userPrefs && typeof userPrefs.targetProtein === 'number') {
    targets.protein = Math.round(userPrefs.targetProtein);
  }
  console.log('Meal generation targets:', targets);
  
  // Get goal-specific meals
  const goalMeals = getMealsByGoal(profile.goal as 'weight_loss' | 'muscle_gain');
  
  // Filter out disliked foods
  const filteredMeals = {
    breakfast: filterDislikedFoods(goalMeals.breakfast, userPrefs.dislikedFoods || []),
    lunch: filterDislikedFoods(goalMeals.lunch, userPrefs.dislikedFoods || []),
    dinner: filterDislikedFoods(goalMeals.dinner, userPrefs.dislikedFoods || []),
    snacks: filterDislikedFoods(goalMeals.snacks, userPrefs.dislikedFoods || [])
  };

  // For muscle gain (3148 calories), aim for:
  // Breakfast: 25% (787 cal)
  // Lunch: 30% (944 cal) 
  // Dinner: 35% (1102 cal)
  // Snacks: 10% (315 cal)
  
  const calorieDistribution = {
    breakfast: Math.round(targets.calories * 0.25),
    lunch: Math.round(targets.calories * 0.30),
    dinner: Math.round(targets.calories * 0.35),
    snacks: Math.round(targets.calories * 0.10)
  };

  console.log('Calorie distribution:', calorieDistribution);

  // Select meals closest to targets
  const selectedBreakfast = selectBestMeal(filteredMeals.breakfast, calorieDistribution.breakfast, targets.protein * 0.25);
  const selectedLunch = selectBestMeal(filteredMeals.lunch, calorieDistribution.lunch, targets.protein * 0.30);
  const selectedDinner = selectBestMeal(filteredMeals.dinner, calorieDistribution.dinner, targets.protein * 0.35);
  
  // Calculate remaining needs
  const currentTotal = selectedBreakfast.calories + selectedLunch.calories + selectedDinner.calories;
  const remainingCalories = targets.calories - currentTotal;
  const remainingProtein = targets.protein - (selectedBreakfast.protein + selectedLunch.protein + selectedDinner.protein);

  console.log('Remaining needs:', { calories: remainingCalories, protein: remainingProtein });

  // Add snacks to reach targets
  const selectedSnacks = selectSnacksToReachTarget(filteredMeals.snacks, remainingCalories, remainingProtein);

  const finalTotal = currentTotal + selectedSnacks.reduce((sum, snack) => sum + snack.calories, 0);
  const finalProtein = selectedBreakfast.protein + selectedLunch.protein + selectedDinner.protein + selectedSnacks.reduce((sum, snack) => sum + snack.protein, 0);

  console.log('Final totals:', { calories: finalTotal, protein: finalProtein, target: targets.calories });

  return {
    breakfast: selectedBreakfast,
    lunch: selectedLunch,
    dinner: selectedDinner,
    snacks: selectedSnacks,
    nutrition: {
      totalCalories: finalTotal,
      totalProtein: finalProtein,
      calorieTarget: targets.calories,
      proteinTarget: targets.protein
    }
  };
}

function filterDislikedFoods(meals: Meal[], dislikedFoods: string[]): Meal[] {
  if (!dislikedFoods || dislikedFoods.length === 0) return meals;
  
  return meals.filter(meal => {
    const mealText = (meal.title + ' ' + meal.ingredients.join(' ')).toLowerCase();
    
    for (const disliked of dislikedFoods) {
      const dislikedLower = disliked.toLowerCase().trim();
      
      // Strict matching - if any disliked food is found, exclude the meal
      if (mealText.includes(dislikedLower)) {
        console.log(`Excluding meal "${meal.title}" due to disliked food: ${disliked}`);
        return false;
      }
      
      // Check for common variations
      const variations: { [key: string]: string[] } = {
        'rice': ['rice', 'brown rice', 'white rice', 'wild rice'],
        'chicken': ['chicken', 'poultry'],
        'fish': ['fish', 'salmon', 'tuna', 'cod'],
        'beef': ['beef', 'steak'],
        'eggs': ['egg', 'eggs'],
        'dairy': ['milk', 'cheese', 'yogurt']
      };
      
      const checkVariations = variations[dislikedLower] || [dislikedLower];
      if (checkVariations.some(variation => mealText.includes(variation))) {
        console.log(`Excluding meal "${meal.title}" due to variation of disliked food: ${disliked}`);
        return false;
      }
    }
    
    return true;
  });
}

function selectBestMeal(meals: Meal[], targetCalories: number, targetProtein: number): Meal {
  if (meals.length === 0) {
    // Fallback to any available meal
    const allMeals = getAllRealisticMeals();
    // Select a meal that has some protein
    const proteinRichFallback = allMeals.find(meal => meal.protein > 10);
    return proteinRichFallback || allMeals[Math.floor(Math.random() * allMeals.length)];
  }

  let bestMeal = meals[0];
  let bestScore = Infinity;

  for (const meal of meals) {
    // Score based on how close to targets, prioritizing protein
    const calorieDeviation = Math.abs(meal.calories - targetCalories) / Math.max(targetCalories, 1);
    const proteinDeviation = Math.abs(meal.protein - targetProtein) / Math.max(targetProtein, 1);
    
    // Weight protein more heavily, especially if below target
    const proteinWeight = meal.protein < targetProtein * 0.8 ? 0.8 : 0.5; // Higher weight if significantly below protein target
    const calorieWeight = 1 - proteinWeight;
    
    const totalScore = (calorieDeviation * calorieWeight) + (proteinDeviation * proteinWeight);
    
    if (totalScore < bestScore) {
      bestScore = totalScore;
      bestMeal = meal;
    }
  }

  console.log(`Selected ${bestMeal.title}: ${bestMeal.calories} cal, ${bestMeal.protein}g protein (target: ${targetCalories} cal, ${targetProtein}g protein)`);
  return bestMeal;
}

function selectSnacksToReachTarget(snacks: Meal[], targetCalories: number, targetProtein: number): Meal[] {
  if (snacks.length === 0) return [];

  const selectedSnacks: Meal[] = [];
  let currentCalories = 0;
  let currentProtein = 0;

  // Greedy selection: prefer items that move us closest to both targets
  const available = [...snacks];
  const usedIds = new Set<string>();

  const scoreSnack = (snack: Meal) => {
    const wouldCalories = currentCalories + snack.calories;
    const wouldProtein = currentProtein + snack.protein;
    const calDev = Math.abs(wouldCalories - targetCalories) / Math.max(1, targetCalories);
    const proDev = Math.abs(wouldProtein - targetProtein) / Math.max(1, targetProtein);
    // Weight protein higher if we're under protein
    const proteinWeight = currentProtein < targetProtein ? 0.6 : 0.4;
    const calorieWeight = 1 - proteinWeight;
    return calDev * calorieWeight + proDev * proteinWeight;
  };

  // Cap snacks reasonably high to support high-calorie targets
  const maxSnacks = 12;

  while (selectedSnacks.length < maxSnacks) {
    // Stop if we're within 2% of calories and 5% of protein
    const calOk = currentCalories >= targetCalories * 0.98 && currentCalories <= targetCalories * 1.02;
    const proOk = currentProtein >= targetProtein * 0.95;
    if (calOk && proOk) break;

    // Pick best next snack not yet used
    const candidates = available.filter(s => !usedIds.has(s.id));
    if (candidates.length === 0) break;

    candidates.sort((a, b) => scoreSnack(a) - scoreSnack(b));
    const best = candidates[0];

    // Avoid large overshoot (>3%) unless still far under protein
    const wouldCalories = currentCalories + best.calories;
    if (wouldCalories > targetCalories * 1.03 && currentProtein >= targetProtein * 0.9) {
      // Try next candidate
      const alt = candidates.find(c => currentCalories + c.calories <= targetCalories * 1.03);
      if (!alt) break;
      usedIds.add(alt.id);
      selectedSnacks.push(alt);
      currentCalories += alt.calories;
      currentProtein += alt.protein;
      continue;
    }

    usedIds.add(best.id);
    selectedSnacks.push(best);
    currentCalories += best.calories;
    currentProtein += best.protein;
  }

  // If we overshot slightly on calories (>2%), remove last item(s) until within bounds
  while (currentCalories > targetCalories * 1.02 && selectedSnacks.length > 0) {
    const removed = selectedSnacks.pop()!;
    currentCalories -= removed.calories;
    currentProtein -= removed.protein;
  }

  return selectedSnacks;
}

function calculateTotalNutrition(meals: EnhancedMealPlan): { calories: number; protein: number } {
    // Calculate totals from individual meals
    const mealCalories = meals.breakfast.calories +
                        meals.lunch.calories +
                        meals.dinner.calories +
                        meals.snacks.reduce((sum, snack) => sum + snack.calories, 0);
                            
    const mealProtein = meals.breakfast.protein +
                       meals.lunch.protein +
                       meals.dinner.protein +
                       meals.snacks.reduce((sum, snack) => sum + snack.protein, 0);
                         
    // Return the calculated totals
    return { 
        calories: mealCalories,
        protein: mealProtein
    };
}
