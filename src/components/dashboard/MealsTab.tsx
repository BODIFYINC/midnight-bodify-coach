import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Clock, CheckCircle, Circle, Utensils, ChevronDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateAdvancedMealPlan } from '@/services/advancedMealService';
import { Meal, MealType } from '@/services/enhancedMealService';
import { generateMealImage, getFallbackImage } from '@/services/imageService';
import { getMealsByGoal } from '@/services/realMealDatabase';
import { logMeal } from '@/services/logService';

interface MealAlternative {
  id: string; title: string; calories: number; protein: number; carbs: number; fat: number;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

export const MealsTab: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  useEffect(() => {
    loadMealPlan();
    loadCompletedMeals();
    const onPrefs = () => { setCompletedMeals(new Set()); loadMealPlan(); };
    window.addEventListener('userPreferencesUpdated', onPrefs as EventListener);
    return () => window.removeEventListener('userPreferencesUpdated', onPrefs as EventListener);
  }, []);

  const loadMealPlan = async () => {
    setLoading(true);
    try {
      const plan = generateAdvancedMealPlan();
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
      if (workingPlan.nutrition.totalCalories > workingPlan.nutrition.calorieTarget) {
        const scale = workingPlan.nutrition.calorieTarget / Math.max(1, workingPlan.nutrition.totalCalories);
        const scaleMeal = (m: any) => ({ ...m, calories: Math.round(m.calories * scale), protein: Math.round(m.protein * scale), carbs: Math.round(m.carbs * scale), fat: Math.round(m.fat * scale) });
        workingPlan.breakfast = scaleMeal(workingPlan.breakfast);
        workingPlan.lunch = scaleMeal(workingPlan.lunch);
        workingPlan.dinner = scaleMeal(workingPlan.dinner);
        workingPlan = recalcTotals(workingPlan);
      }
      // Fill with snacks if under target
      if (workingPlan.nutrition.totalCalories < workingPlan.nutrition.calorieTarget * 0.98) {
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        const goal = userSettings.goal || userPrefs.goal || 'weight_loss';
        const disliked: string[] = (userPrefs.dislikedFoods || []).map((d: string) => (d || '').toLowerCase().trim());
        const goalMeals = getMealsByGoal(goal as 'weight_loss' | 'muscle_gain');
        const existingIds = new Set([workingPlan.breakfast.id, workingPlan.lunch.id, workingPlan.dinner.id, ...workingPlan.snacks.map((s: any) => s.id)]);
        let candidates = (goalMeals.snacks || []).filter((m: any) => !existingIds.has(m.id) && !disliked.some(d => (m.title + ' ' + (m.ingredients || []).join(' ')).toLowerCase().includes(d)));
        while (workingPlan.nutrition.totalCalories < workingPlan.nutrition.calorieTarget * 0.98 && workingPlan.snacks.length < 12 && candidates.length > 0) {
          const next = candidates.shift();
          if (!next) break;
          if (workingPlan.nutrition.totalCalories + next.calories > workingPlan.nutrition.calorieTarget * 1.03) continue;
          workingPlan.snacks.push(next);
          workingPlan = recalcTotals(workingPlan);
        }
      }
      // Final normalize
      const total = workingPlan.nutrition.totalCalories;
      const target = workingPlan.nutrition.calorieTarget;
      if (total > 0 && Math.abs(total - target) > 5) {
        const scale = target / total;
        const scaleMeal = (m: any) => ({ ...m, calories: Math.round(m.calories * scale), protein: Math.round(m.protein * scale), carbs: Math.round(m.carbs * scale), fat: Math.round(m.fat * scale) });
        workingPlan.breakfast = scaleMeal(workingPlan.breakfast);
        workingPlan.lunch = scaleMeal(workingPlan.lunch);
        workingPlan.dinner = scaleMeal(workingPlan.dinner);
        workingPlan.snacks = workingPlan.snacks.map(scaleMeal);
        workingPlan = recalcTotals(workingPlan);
      }
      const genAlt = (meal: Meal): MealAlternative[] => [
        { id: `${meal.id}-a1`, title: `Alt ${meal.title}`, calories: meal.calories + Math.floor(Math.random() * 80) - 40, protein: meal.protein + Math.floor(Math.random() * 8) - 4, carbs: meal.carbs + Math.floor(Math.random() * 15) - 7, fat: meal.fat + Math.floor(Math.random() * 8) - 4 },
      ];
      setMealPlan({
        ...workingPlan,
        breakfast: { ...workingPlan.breakfast, alternatives: genAlt(workingPlan.breakfast) },
        lunch: { ...workingPlan.lunch, alternatives: genAlt(workingPlan.lunch) },
        dinner: { ...workingPlan.dinner, alternatives: genAlt(workingPlan.dinner) },
        snacks: workingPlan.snacks.map((s: any) => ({ ...s, alternatives: genAlt(s) })),
      });
    } catch {
      toast({ title: "Error", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const loadCompletedMeals = () => {
    const completed = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    setCompletedMeals(new Set(completed.map((m: any) => m.id)));
  };

  const toggleMealComplete = async (mealId: string, meal: Meal, mealType: MealType) => {
    const completed = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    const isCompleted = completedMeals.has(mealId);
    if (isCompleted) {
      localStorage.setItem('completedMeals', JSON.stringify(completed.filter((m: any) => m.id !== mealId)));
      setCompletedMeals(prev => { const n = new Set(prev); n.delete(mealId); return n; });
      toast({ title: "Meal unmarked ↩️" });
    } else {
      completed.push({ id: mealId, title: meal.title, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, mealType, completedAt: new Date().toISOString() });
      localStorage.setItem('completedMeals', JSON.stringify(completed));
      setCompletedMeals(prev => new Set([...prev, mealId]));
      // Log to DB
      logMeal({ meal_type: mealType, meal_name: meal.title, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, ingredients: meal.ingredients }).catch(() => {});
      toast({ title: "Meal completed! ✅" });
    }
    window.dispatchEvent(new CustomEvent('mealCompleted'));
  };

  if (!mealPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-3 text-accent animate-spin" />
          <p className="text-[13px] text-muted-foreground">Generating your meal plan...</p>
        </div>
      </div>
    );
  }

  const totalCalories = mealPlan.nutrition?.totalCalories || 0;
  const totalProtein = mealPlan.nutrition?.totalProtein || 0;
  const allMeals = [
    { meal: mealPlan.breakfast, type: 'breakfast' as MealType, label: '🌅 Breakfast' },
    { meal: mealPlan.lunch, type: 'lunch' as MealType, label: '☀️ Lunch' },
    { meal: mealPlan.dinner, type: 'dinner' as MealType, label: '🌙 Dinner' },
    ...mealPlan.snacks.map((s: any, i: number) => ({ meal: s, type: 'snack' as MealType, label: `🍎 Snack ${i + 1}` })),
  ];

  const completedCount = allMeals.filter(m => completedMeals.has(m.meal.id)).length;

  return (
    <motion.div initial="initial" animate="animate" className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-foreground tracking-tight">Meal Plan</h2>
          <p className="text-[13px] text-muted-foreground mt-0.5">Personalized for your goals</p>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={loadMealPlan} disabled={loading}
          className="w-10 h-10 rounded-2xl border border-border/50 bg-card/60 flex items-center justify-center">
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </motion.div>

      {/* Summary */}
      <motion.div variants={fadeUp} className="rounded-2xl p-4 border border-border/50" style={{ background: 'hsla(222, 40%, 6%, 0.7)', backdropFilter: 'blur(16px)' }}>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[20px] font-bold text-accent tabular-nums">{totalCalories}</p>
            <p className="text-[10px] text-muted-foreground">Calories</p>
          </div>
          <div>
            <p className="text-[20px] font-bold text-destructive tabular-nums">{totalProtein}g</p>
            <p className="text-[10px] text-muted-foreground">Protein</p>
          </div>
          <div>
            <p className="text-[20px] font-bold text-primary tabular-nums">{completedCount}/{allMeals.length}</p>
            <p className="text-[10px] text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="mt-3 h-[4px] bg-muted/60 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / allMeals.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
          />
        </div>
      </motion.div>

      {/* Meal Cards */}
      <div className="space-y-2.5">
        {allMeals.map(({ meal, type, label }, index) => {
          const done = completedMeals.has(meal.id);
          const expanded = expandedMeal === meal.id;
          return (
            <motion.div
              key={meal.id}
              variants={fadeUp}
              className={`rounded-2xl border overflow-hidden transition-all ${
                done ? 'border-accent/40 bg-accent/5' : 'border-border/40'
              }`}
              style={{ background: done ? undefined : 'hsla(222, 40%, 6%, 0.5)', backdropFilter: 'blur(8px)' }}
            >
              <motion.button
                whileTap={{ scale: 0.99 }}
                onClick={() => setExpandedMeal(expanded ? null : meal.id)}
                className="w-full flex items-center gap-3.5 p-4"
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border border-border/30">
                  <img src={generateMealImage(meal)} alt={meal.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = getFallbackImage(type); }}
                    className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
                  <p className={`text-[13px] font-semibold truncate mt-0.5 ${done ? 'text-accent line-through' : 'text-foreground'}`}>{meal.title}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] text-accent font-medium tabular-nums">{meal.calories} cal</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{meal.protein}g P</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div whileTap={{ scale: 0.85 }}
                    onClick={(e) => { e.stopPropagation(); toggleMealComplete(meal.id, meal, type); }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${done ? 'bg-accent' : 'border border-border/60 bg-card/50'}`}>
                    {done ? <CheckCircle className="w-4 h-4 text-secondary-foreground" /> : <Circle className="w-4 h-4 text-muted-foreground/40" />}
                  </motion.div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </div>
              </motion.button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="py-2 rounded-xl bg-muted/30">
                          <p className="text-[14px] font-bold text-destructive tabular-nums">{meal.protein}g</p>
                          <p className="text-[9px] text-muted-foreground">Protein</p>
                        </div>
                        <div className="py-2 rounded-xl bg-muted/30">
                          <p className="text-[14px] font-bold text-primary tabular-nums">{meal.carbs}g</p>
                          <p className="text-[9px] text-muted-foreground">Carbs</p>
                        </div>
                        <div className="py-2 rounded-xl bg-muted/30">
                          <p className="text-[14px] font-bold text-secondary tabular-nums">{meal.fat}g</p>
                          <p className="text-[9px] text-muted-foreground">Fat</p>
                        </div>
                      </div>
                      {meal.ingredients && meal.ingredients.length > 0 && (
                        <div>
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Ingredients</p>
                          <div className="flex flex-wrap gap-1.5">
                            {meal.ingredients.map((ing: string, i: number) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-muted/40 text-[10px] text-muted-foreground">{ing}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {(meal.instructions?.length || 3) * 3} min</span>
                        <span className="flex items-center gap-1"><Utensils className="w-3 h-3" /> {meal.ingredients?.length || 0} items</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
