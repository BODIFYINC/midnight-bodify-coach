// Centralized, consistent nutrition targets across the app
import { AccurateNutritionTracker, type UserProfile, type NutritionTargets } from './accurateNutritionTracker';

// Returns a single source of truth for daily targets
export function getUnifiedTargets(): NutritionTargets {
  try {
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    // If user saved explicit targets, always prefer them
    if (
      typeof prefs.targetCalories === 'number' &&
      typeof prefs.targetProtein === 'number' &&
      typeof prefs.targetCarbs === 'number' &&
      typeof prefs.targetFat === 'number'
    ) {
      return {
        calories: Math.round(prefs.targetCalories),
        protein: Math.round(prefs.targetProtein),
        carbs: Math.round(prefs.targetCarbs),
        fat: Math.round(prefs.targetFat),
      };
    }

    // Otherwise, compute from settings
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const profile: UserProfile = {
      weight: settings.weight || 70,
      height: settings.height || 175,
      age: settings.age || 25,
      gender: settings.gender || 'male',
      activityLevel: settings.activityLevel || 'moderate',
      goal: settings.goal || 'maintenance',
      bodyFat: settings.bodyFat,
    };

    const computed = AccurateNutritionTracker.calculateNutritionTargets(profile);
    return computed;
  } catch (e) {
    // Sensible defaults if localStorage is unavailable
    return { calories: 2000, protein: 100, carbs: 220, fat: 70 };
  }
}
