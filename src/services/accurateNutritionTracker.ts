// Accurate nutrition tracking based on medical knowledge
export interface UserProfile {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  bodyFat?: number; // percentage
}

export interface NutritionTargets {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface CompletedMeal {
  id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  completedAt: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

export class AccurateNutritionTracker {
  // Calculate BMR using Mifflin-St Jeor equation (most accurate)
  static calculateBMR(profile: UserProfile): number {
    const { weight, height, age, gender } = profile;
    // Mifflin-St Jeor Equation (most accurate for general population)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    return gender === 'male' ? bmr + 5 : bmr - 161;
  }
  
  // Calculate TDEE with accurate activity multipliers
  static calculateTDEE(profile: UserProfile): number {
    const bmr = this.calculateBMR(profile);
    const activityMultipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,      // Moderate exercise 3-5 days/week
      active: 1.725,       // Hard exercise 6-7 days/week
      very_active: 1.9     // Very hard exercise & physical job
    };
    return bmr * (activityMultipliers[profile.activityLevel] || 1.55);
  }
  
  // Calculate medically sound nutrition targets
  static calculateNutritionTargets(profile: UserProfile): NutritionTargets {
    const tdee = this.calculateTDEE(profile);
    let targetCalories: number;
    
    // Calorie targets based on goal with safe limits
    switch (profile.goal) {
      case 'weight_loss':
        // Safe deficit of 300-500 calories (0.3-0.5 kg per week)
        targetCalories = Math.max(tdee - 400, 1200); // Never below 1200 for safety
        break;
      case 'muscle_gain':
        // Moderate surplus of 200-300 calories (0.2-0.3 kg per week)
        targetCalories = tdee + 250;
        break;
      case 'maintenance':
      default:
        targetCalories = tdee;
        break;
    }
    
    // Protein targets based on medical research
    let proteinPerKg: number;
    if (profile.goal === 'muscle_gain') {
      proteinPerKg = 1.6; // 1.4-1.8g per kg for muscle building
    } else if (profile.goal === 'weight_loss') {
      proteinPerKg = 1.4; // Higher protein helps preserve muscle during deficit
    } else {
      proteinPerKg = 1.0; // Maintenance needs
    }
    
    const protein = Math.round(profile.weight * proteinPerKg);
    
    // Calculate carbs and fat (balanced approach)
    const proteinCalories = protein * 4;
    let fatPercentage = 0.25; // 25% of calories from fat
    
    if (profile.goal === 'weight_loss') {
      fatPercentage = 0.30; // Higher fat for satiety
    }
    
    const fatCalories = targetCalories * fatPercentage;
    const fat = Math.round(fatCalories / 9);
    
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);
    
    return {
      calories: Math.round(targetCalories),
      protein,
      carbs: Math.max(carbs, 50), // Minimum carbs for brain function
      fat: Math.max(fat, 30) // Essential fatty acids
    };
  }
  
  // Calculate meal distribution percentages
  static calculateMealDistribution(targets: NutritionTargets): {
    breakfast: { calories: number; protein: number };
    lunch: { calories: number; protein: number };
    dinner: { calories: number; protein: number };
    snacks: { calories: number; protein: number };
  } {
    // Standard meal distribution percentages
    const distribution = {
      breakfast: { calories: 0.25, protein: 0.25 }, // 25% of daily intake
      lunch: { calories: 0.30, protein: 0.30 },     // 30% of daily intake
      dinner: { calories: 0.35, protein: 0.35 },    // 35% of daily intake
      snacks: { calories: 0.10, protein: 0.10 }     // 10% of daily intake
    };

    return {
      breakfast: {
        calories: Math.round(targets.calories * distribution.breakfast.calories),
        protein: Math.round(targets.protein * distribution.breakfast.protein)
      },
      lunch: {
        calories: Math.round(targets.calories * distribution.lunch.calories),
        protein: Math.round(targets.protein * distribution.lunch.protein)
      },
      dinner: {
        calories: Math.round(targets.calories * distribution.dinner.calories),
        protein: Math.round(targets.protein * distribution.dinner.protein)
      },
      snacks: {
        calories: Math.round(targets.calories * distribution.snacks.calories),
        protein: Math.round(targets.protein * distribution.snacks.protein)
      }
    };
  }
  
  // Get completed meals from localStorage
  static getCompletedMeals(): CompletedMeal[] {
    const completedMeals = localStorage.getItem('completedMeals');
    if (!completedMeals) return [];
    
    try {
      const meals = JSON.parse(completedMeals);
      // Filter to today's meals only
      const today = new Date().toDateString();
      return meals.filter((meal: CompletedMeal) => 
        new Date(meal.completedAt).toDateString() === today
      );
    } catch (error) {
      console.error('Error parsing completed meals:', error);
      return [];
    }
  }
  
  // Add completed meal
  static addCompletedMeal(meal: Omit<CompletedMeal, 'completedAt'>): void {
    const completedMeals = this.getCompletedMeals();
    const newMeal: CompletedMeal = {
      ...meal,
      completedAt: new Date().toISOString()
    };
    
    // Add to existing meals
    completedMeals.push(newMeal);
    
    // Store updated list
    localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
    
    console.log('Added completed meal:', newMeal);
  }
  
  // Remove completed meal
  static removeCompletedMeal(mealId: string, mealType: string): void {
    const completedMeals = this.getCompletedMeals();
    const filteredMeals = completedMeals.filter(meal => 
      !(meal.id === mealId && meal.mealType === mealType)
    );
    
    // Store updated list
    localStorage.setItem('completedMeals', JSON.stringify(filteredMeals));
    
    // Dispatch event to update UI
    window.dispatchEvent(new CustomEvent('mealCompleted'));
    
    console.log('Removed completed meal:', mealId);
  }
  
  // Calculate actual nutrition from completed meals
  static calculateActualNutrition(): NutritionTargets {
    const completedMeals = this.getCompletedMeals();
    
    return completedMeals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }
  
  // Calculate progress percentages
  static calculateProgress(targets: NutritionTargets): {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const actual = this.calculateActualNutrition();
    
    return {
      calories: Math.round((actual.calories / targets.calories) * 100),
      protein: Math.round((actual.protein / targets.protein) * 100),
      carbs: Math.round((actual.carbs / targets.carbs) * 100),
      fat: Math.round((actual.fat / targets.fat) * 100)
    };
  }
  
  // Get nutrition recommendations
  static getNutritionRecommendations(profile: UserProfile, actual: NutritionTargets, targets: NutritionTargets): string[] {
    const recommendations: string[] = [];
    
    const calorieRatio = actual.calories / targets.calories;
    const proteinRatio = actual.protein / targets.protein;
    
    if (calorieRatio < 0.8) {
      recommendations.push('Consider adding a healthy snack to reach your calorie goals');
    } else if (calorieRatio > 1.2) {
      recommendations.push('You may be exceeding your calorie targets - focus on portion control');
    }
    
    if (proteinRatio < 0.8) {
      recommendations.push('Add more protein-rich foods like lean meats, eggs, or protein powder');
    }
    
    if (profile.goal === 'muscle_gain' && proteinRatio < 0.9) {
      recommendations.push('For muscle building, aim for consistent protein intake throughout the day');
    }
    
    if (profile.goal === 'weight_loss' && calorieRatio < 0.7) {
      recommendations.push('Very low calorie intake may slow metabolism - consider eating more');
    }
    
    return recommendations;
  }

  // Reset all nutrition tracking data
  static resetAll(): void {
    // Clear completed meals
    localStorage.setItem('completedMeals', '[]');
    
    // Dispatch event to update UI
    window.dispatchEvent(new CustomEvent('mealCompleted'));
    
    console.log('Nutrition tracking data reset');
  }
}
