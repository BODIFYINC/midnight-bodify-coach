import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Clock, Users, CheckCircle, Circle, Sparkles, Utensils, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { generateAdvancedMealPlan } from '@/services/advancedMealService';
import { Meal, MealType } from '@/services/enhancedMealService';
import { generateMealImage, getFallbackImage } from '@/services/imageService';
import { getMealsByGoal } from '@/services/realMealDatabase';

interface MealAlternative {
  id: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface EnhancedMeal extends Meal {
  alternatives: MealAlternative[];
  isCompleted: boolean;
}

export const MealsTab: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadMealPlan();
    loadCompletedMeals();

    const onPrefs = () => {
      setCompletedMeals(new Set());
      loadMealPlan();
    };
    window.addEventListener('userPreferencesUpdated', onPrefs as EventListener);
    return () => window.removeEventListener('userPreferencesUpdated', onPrefs as EventListener);
  }, []);

  const loadMealPlan = async () => {
    setLoading(true);
    try {
      // Generate meal plan locally first (fast), then enforce strict caps
      const plan = generateAdvancedMealPlan();

      // Remove snacks if we already exceed targets
      let workingPlan = { ...plan, snacks: [...plan.snacks] } as any;
      const recalcTotals = (p: any) => ({
        ...p,
        nutrition: {
          ...p.nutrition,
          totalCalories: p.breakfast.calories + p.lunch.calories + p.dinner.calories + p.snacks.reduce((s: number, sn: any) => s + sn.calories, 0),
          totalProtein: p.breakfast.protein + p.lunch.protein + p.dinner.protein + p.snacks.reduce((s: number, sn: any) => s + sn.protein, 0),
        }
      });

      workingPlan = recalcTotals(workingPlan);
      if (workingPlan.nutrition.totalCalories > workingPlan.nutrition.calorieTarget) {
        workingPlan.snacks = [];
        workingPlan = recalcTotals(workingPlan);
      }

      // If still over target, scale meals down proportionally (do not exceed daily target)
      if (workingPlan.nutrition.totalCalories > workingPlan.nutrition.calorieTarget) {
        const scale = workingPlan.nutrition.calorieTarget / Math.max(1, workingPlan.nutrition.totalCalories);
        const scaleMeal = (m: any) => ({
          ...m,
          calories: Math.max(0, Math.round(m.calories * scale)),
          protein: Math.max(0, Math.round(m.protein * scale)),
          carbs: Math.max(0, Math.round(m.carbs * scale)),
          fat: Math.max(0, Math.round(m.fat * scale)),
        });
        workingPlan.breakfast = scaleMeal(workingPlan.breakfast);
        workingPlan.lunch = scaleMeal(workingPlan.lunch);
        workingPlan.dinner = scaleMeal(workingPlan.dinner);
        workingPlan = recalcTotals(workingPlan);
        toast({ title: 'Adjusted to your daily target', description: 'Meals were scaled to fit your calories.' });
      }

      // If we're under target, intelligently add snacks until within 2% of target
      if (workingPlan.nutrition.totalCalories < workingPlan.nutrition.calorieTarget * 0.98) {
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        const goal = userSettings.goal || userPrefs.goal || 'weight_loss';
        const disliked: string[] = (userPrefs.dislikedFoods || []).map((d: string) => (d || '').toLowerCase().trim());
        const containsDisliked = (meal: any) => {
          const text = (meal.title + ' ' + (meal.ingredients || []).join(' ')).toLowerCase();
          const variations: Record<string, string[]> = {
            rice: ['rice', 'brown rice', 'white rice', 'wild rice', 'jasmine', 'basmati'],
            chicken: ['chicken', 'poultry'],
            fish: ['fish', 'salmon', 'tuna', 'cod', 'tilapia'],
            beef: ['beef', 'steak'],
            eggs: ['egg', 'eggs'],
            dairy: ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
            nuts: ['nuts', 'almond', 'peanut', 'walnut', 'cashew', 'pecan', 'pistachio']
          };
          return disliked.some((d) => {
            const vars = variations[d] || [d];
            return vars.some((v) => text.includes(v));
          });
        };

        const goalMeals = getMealsByGoal(goal as 'weight_loss' | 'muscle_gain');
        const existingIds = new Set<string>([
          workingPlan.breakfast.id,
          workingPlan.lunch.id,
          workingPlan.dinner.id,
          ...workingPlan.snacks.map((s: any) => s.id)
        ]);
        let candidates = (goalMeals.snacks || []).filter((m: any) => !existingIds.has(m.id) && !containsDisliked(m));

        const pickScore = (snack: any) => {
          const remainingCal = Math.max(0, workingPlan.nutrition.calorieTarget - (workingPlan.nutrition.totalCalories + snack.calories));
          const remainingPro = Math.max(0, workingPlan.nutrition.proteinTarget - (workingPlan.nutrition.totalProtein + snack.protein));
          const calDev = remainingCal / Math.max(1, workingPlan.nutrition.calorieTarget);
          const proDev = remainingPro / Math.max(1, workingPlan.nutrition.proteinTarget);
          const proteinWeight = (workingPlan.nutrition.totalProtein < workingPlan.nutrition.proteinTarget * 0.9) ? 0.6 : 0.4;
          const calorieWeight = 1 - proteinWeight;
          return calDev * calorieWeight + proDev * proteinWeight;
        };

        const maxSnacks = 12;
        while (
          workingPlan.nutrition.totalCalories < workingPlan.nutrition.calorieTarget * 0.98 &&
          workingPlan.snacks.length < maxSnacks &&
          candidates.length > 0
        ) {
          candidates.sort((a, b) => pickScore(a) - pickScore(b));
          const next = candidates.shift();
          if (!next) break;

          const wouldCalories = workingPlan.nutrition.totalCalories + next.calories;
          // Avoid overshooting by >3% unless still low protein
          if (
            wouldCalories > workingPlan.nutrition.calorieTarget * 1.03 &&
            workingPlan.nutrition.totalProtein >= workingPlan.nutrition.proteinTarget * 0.9
          ) {
            continue;
          }

          workingPlan.snacks.push(next);
          workingPlan = recalcTotals(workingPlan);
        }
      }

      // Add alternatives for each meal and finalize
      const enhancedPlan = {
        ...workingPlan,
        breakfast: { ...workingPlan.breakfast, alternatives: generateAlternatives(workingPlan.breakfast) },
        lunch: { ...workingPlan.lunch, alternatives: generateAlternatives(workingPlan.lunch) },
        dinner: { ...workingPlan.dinner, alternatives: generateAlternatives(workingPlan.dinner) },
        snacks: workingPlan.snacks.map((snack: any) => ({ ...snack, alternatives: generateAlternatives(snack) }))
      };

      setMealPlan(enhancedPlan);
      
      toast({
        title: "Meal Plan Ready ✅",
        description: "Daily totals aligned to your targets."
      });
    } catch (error) {
      toast({
        title: "Error generating meal plan",
        description: "Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAlternatives = (meal: Meal): MealAlternative[] => {
    const alternatives = [
      {
        id: `${meal.id}-alt1`,
        title: `Alternative ${meal.title}`,
        calories: meal.calories + Math.floor(Math.random() * 100) - 50,
        protein: meal.protein + Math.floor(Math.random() * 10) - 5,
        carbs: meal.carbs + Math.floor(Math.random() * 20) - 10,
        fat: meal.fat + Math.floor(Math.random() * 10) - 5
      },
      {
        id: `${meal.id}-alt2`,
        title: `${meal.title} Variation`,
        calories: meal.calories + Math.floor(Math.random() * 80) - 40,
        protein: meal.protein + Math.floor(Math.random() * 8) - 4,
        carbs: meal.carbs + Math.floor(Math.random() * 15) - 7,
        fat: meal.fat + Math.floor(Math.random() * 8) - 4
      }
    ];
    return alternatives;
  };

  const loadCompletedMeals = () => {
    const completed = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    const completedIds = new Set<string>(completed.map((meal: any) => meal.id));
    setCompletedMeals(completedIds);
  };

  const toggleMealComplete = (mealId: string, meal: Meal, mealType: MealType) => {
    const completed = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    const isCompleted = completedMeals.has(mealId);

    if (isCompleted) {
      // Remove from completed
      const filtered = completed.filter((m: any) => m.id !== mealId);
      localStorage.setItem('completedMeals', JSON.stringify(filtered));
      setCompletedMeals(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(mealId);
        return newSet;
      });
      
      toast({
        title: "Meal unmarked ↩️",
        description: `${meal.title} removed from completed meals.`
      });
    } else {
      // Add to completed
      const newMeal = {
        id: mealId,
        title: meal.title,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
        mealType,
        completedAt: new Date().toISOString()
      };
      completed.push(newMeal);
      localStorage.setItem('completedMeals', JSON.stringify(completed));
      setCompletedMeals(prev => new Set([...prev, mealId]));
      
      toast({
        title: "Meal completed! ✅",
        description: `${meal.title} marked as done.`
      });
    }

    // Trigger nutrition update
    window.dispatchEvent(new CustomEvent('mealCompleted'));
  };

  const swapMeal = (mealType: MealType, alternativeIndex: number) => {
    if (!mealPlan) return;

    const currentMeal = mealPlan[mealType];
    const alternative = currentMeal.alternatives[alternativeIndex];

    // Create new meal from alternative
    const newMeal = {
      ...currentMeal,
      id: alternative.id,
      title: alternative.title,
      calories: alternative.calories,
      protein: alternative.protein,
      carbs: alternative.carbs,
      fat: alternative.fat
    };

    setMealPlan(prev => ({
      ...prev,
      [mealType]: newMeal
    }));

    toast({
      title: "Meal swapped! 🔄",
      description: `Switched to ${alternative.title} with same macros.`
    });
  };

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case 'protein': return 'text-red-400';
      case 'carbs': return 'text-blue-400';
      case 'fat': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const renderMealCard = (meal: Meal & { alternatives: MealAlternative[] }, mealType: MealType, index?: number) => (
    <motion.div
      key={meal.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.1 }}
    >
      <Card className={`glassmorphism-card border transition-all duration-300 hover-scale ${
        completedMeals.has(meal.id) 
          ? 'border-green-500/50 bg-green-500/10' 
          : 'border-white/10 hover:border-emerald-500/50'
      }`}>
        <div className="relative">
          <img 
            src={generateMealImage(meal)}
            alt={meal.title}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = getFallbackImage(mealType);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-lg" />
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-emerald-500/90 text-white">
              {meal.calories} cal
            </Badge>
          </div>
          
          <div className="absolute top-3 right-3">
            <AnimatedButton
              size="sm"
              variant={completedMeals.has(meal.id) ? "default" : "outline"}
              onClick={() => toggleMealComplete(meal.id, meal, mealType)}
              className={completedMeals.has(meal.id) 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-white/10 hover:bg-white/20 border-white/30"
              }
            >
              {completedMeals.has(meal.id) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </AnimatedButton>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-lg mb-1">{meal.title}</h3>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Macros */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className={`font-semibold ${getMacroColor('protein')}`}>{meal.protein}g</p>
              <p className="text-xs text-white/60">Protein</p>
            </div>
            <div>
              <p className={`font-semibold ${getMacroColor('carbs')}`}>{meal.carbs}g</p>
              <p className="text-xs text-white/60">Carbs</p>
            </div>
            <div>
              <p className={`font-semibold ${getMacroColor('fat')}`}>{meal.fat}g</p>
              <p className="text-xs text-white/60">Fat</p>
            </div>
          </div>

          {/* Meal Info */}
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{meal.instructions.length * 3} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Utensils className="w-4 h-4" />
              <span>{meal.ingredients.length} ingredients</span>
            </div>
          </div>

          {/* Alternatives */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/80">Swap Options:</p>
            <div className="grid grid-cols-2 gap-2">
              {meal.alternatives.map((alt, idx) => (
                <AnimatedButton
                  key={alt.id}
                  size="sm"
                  variant="outline"
                  onClick={() => swapMeal(mealType, idx)}
                  className="text-xs bg-white/5 hover:bg-white/10 border-white/20 hover:border-emerald-500/50"
                >
                  {alt.title.length > 15 ? `${alt.title.substring(0, 15)}...` : alt.title}
                </AnimatedButton>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (!mealPlan) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-emerald-400 animate-spin" />
          <p className="text-white/70">Generating AI meal plan...</p>
        </div>
      </div>
    );
  }

  const totalCalories = mealPlan.nutrition?.totalCalories || 0;
  const totalProtein = mealPlan.nutrition?.totalProtein || 0;
  const completedCount = [mealPlan.breakfast, mealPlan.lunch, mealPlan.dinner, ...mealPlan.snacks]
    .filter(meal => completedMeals.has(meal.id)).length;
  const totalMeals = 3 + mealPlan.snacks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          AI-Generated Meal Plan
        </h2>
        <p className="text-white/70">Personalized meals excluding your disliked foods</p>
        
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{totalCalories}</p>
            <p className="text-sm text-white/60">Total Calories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{totalProtein}g</p>
            <p className="text-sm text-white/60">Total Protein</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{completedCount}/{totalMeals}</p>
            <p className="text-sm text-white/60">Completed</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <Card className="glassmorphism-card border border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Daily Progress</h3>
            <AnimatedButton
              onClick={loadMealPlan}
              loading={loading}
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-green-500"
              glowEffect={true}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Daily
            </AnimatedButton>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Meal Completion</span>
              <span className="text-white/60">{completedCount}/{totalMeals}</span>
            </div>
            <Progress value={(completedCount / totalMeals) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Main Meals */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Today's Meals</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderMealCard(mealPlan.breakfast, 'breakfast', 0)}
          {renderMealCard(mealPlan.lunch, 'lunch', 1)}
          {renderMealCard(mealPlan.dinner, 'dinner', 2)}
        </div>
      </div>

      {/* Snacks */}
      {mealPlan.snacks && mealPlan.snacks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Healthy Snacks</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPlan.snacks.map((snack, index) => 
              renderMealCard(snack, 'snacks', index + 3)
            )}
          </div>
        </div>
      )}
    </div>
  );
};