
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { EnhancedCard, CardContent } from './ui/enhanced-card';
import { AccurateNutritionTracker, type UserProfile, type NutritionTargets } from '@/services/accurateNutritionTracker';
import { getUnifiedTargets } from '@/services/unifiedTargets';

interface NutritionStatsProps {
  // Remove the old props, we'll calculate everything accurately
}

export const NutritionStats: React.FC<NutritionStatsProps> = () => {
  const [targets, setTargets] = useState<NutritionTargets | null>(null);
  const [actual, setActual] = useState<NutritionTargets>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [progress, setProgress] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    const calculateNutrition = () => {
      try {
        // Get user profile from localStorage
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        if (!userSettings.weight || !userSettings.height || !userSettings.age) {
          console.log('Incomplete user profile, using defaults');
          return;
        }

        const profile: UserProfile = {
          weight: userSettings.weight || 70,
          height: userSettings.height || 175,
          age: userSettings.age || 25,
          gender: userSettings.gender || 'male',
          activityLevel: userSettings.activityLevel || 'moderate',
          goal: userSettings.goal || 'weight_loss',
          bodyFat: userSettings.bodyFat
        };

        console.log('User profile:', profile);

        // Unified targets (use saved targets if present)
        const nutritionTargets = getUnifiedTargets();
        setTargets(nutritionTargets);

        // Get actual nutrition from completed meals
        const actualNutrition = AccurateNutritionTracker.calculateActualNutrition();
        setActual(actualNutrition);

        // Calculate progress
        const progressData = AccurateNutritionTracker.calculateProgress(nutritionTargets);
        setProgress(progressData);

        console.log('Nutrition data:', {
          targets: nutritionTargets,
          actual: actualNutrition,
          progress: progressData
        });

      } catch (error) {
        console.error('Error calculating nutrition:', error);
      }
    };

    calculateNutrition();

    // Recalculate when storage changes (meal completed/uncompleted)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'completedMeals') {
        calculateNutrition();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when meals are marked complete
    const handleMealComplete = () => calculateNutrition();
    window.addEventListener('mealCompleted', handleMealComplete);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mealCompleted', handleMealComplete);
    };
  }, []);

  if (!targets) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="h-24 bg-white/5 animate-pulse rounded-lg" />
        <div className="h-24 bg-white/5 animate-pulse rounded-lg" />
        <div className="h-24 bg-white/5 animate-pulse rounded-lg" />
      </div>
    );
  }

  const calorieProgress = Math.min(progress.calories, 150); // Cap at 150% for display
  const proteinProgress = Math.min(progress.protein, 150);
  const overallProgress = Math.min((calorieProgress + proteinProgress) / 2, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    >
      <EnhancedCard glowEffect={true}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Daily Calories</p>
              <p className="text-xl font-bold">{actual.calories}/{targets.calories}</p>
              <p className="text-xs text-bodify-orange">{Math.round(calorieProgress)}% achieved</p>
            </div>
            <Zap className="text-bodify-orange" size={28} />
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-bodify-orange to-bodify-purple h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(calorieProgress, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          {calorieProgress > 100 && (
            <p className="text-xs text-red-400 mt-1">Over target by {actual.calories - targets.calories} cal</p>
          )}
        </CardContent>
      </EnhancedCard>

      <EnhancedCard glowEffect={true}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Protein Intake</p>
              <p className="text-xl font-bold">{actual.protein}g/{targets.protein}g</p>
              <p className="text-xs text-bodify-purple">{Math.round(proteinProgress)}% achieved</p>
            </div>
            <TrendingUp className="text-bodify-purple" size={28} />
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-bodify-purple to-green-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(proteinProgress, 100)}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            />
          </div>
          {proteinProgress < 80 && (
            <p className="text-xs text-yellow-400 mt-1">Need {targets.protein - actual.protein}g more</p>
          )}
        </CardContent>
      </EnhancedCard>

      <EnhancedCard glowEffect={true}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Overall Progress</p>
              <p className="text-xl font-bold">{Math.round(overallProgress)}%</p>
              <p className="text-xs text-green-400">Based on completed meals</p>
            </div>
            <Target className="text-green-400" size={28} />
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-white/60 mt-1">
            Carbs: {actual.carbs}g | Fat: {actual.fat}g
          </p>
        </CardContent>
      </EnhancedCard>
    </motion.div>
  );
};
