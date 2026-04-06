import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, Zap, Star, Utensils, Dumbbell, MessageSquare, TrendingUp } from 'lucide-react';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { haptics } from '@/services/haptics';
import { getUnifiedTargets } from '@/services/unifiedTargets';
import { supabase } from '@/integrations/supabase/client';

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } }
};
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

const HomeTab = ({ onTabChange }: HomeTabProps) => {
  const [stats, setStats] = useState({
    name: 'Champ',
    dailyCalories: 2200,
    currentCalories: 0,
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 275 },
    fats: { current: 0, target: 73 },
    streak: 0,
    waterMl: 0,
    workoutsToday: 0,
  });

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const name = settings.name || currentUser.name || 'Champ';

    try {
      const targets = getUnifiedTargets();
      const actual = AccurateNutritionTracker.calculateActualNutrition();
      setStats(s => ({
        ...s,
        name,
        dailyCalories: Math.round(targets.calories),
        currentCalories: Math.round(actual.calories),
        protein: { current: Math.round(actual.protein), target: Math.round(targets.protein) },
        carbs: { current: Math.round(actual.carbs), target: Math.round(targets.carbs) },
        fats: { current: Math.round(actual.fat), target: Math.round(targets.fat) },
        streak: (actual.calories >= targets.calories * 0.8 && actual.protein >= targets.protein * 0.8) ? 1 : 0,
      }));
    } catch {
      setStats(s => ({ ...s, name }));
    }

    // Fetch today's real data from backend
    const fetchToday = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const today = new Date().toISOString().split('T')[0];

        const [mealRes, logRes, workoutRes] = await Promise.all([
          supabase.from('meal_logs').select('calories, protein, carbs, fat').eq('user_id', user.id).gte('logged_at', today),
          supabase.from('daily_logs').select('water_ml').eq('user_id', user.id).eq('log_date', today).maybeSingle(),
          supabase.from('workout_logs').select('id').eq('user_id', user.id).gte('completed_at', today),
        ]);

        const meals = mealRes.data || [];
        if (meals.length > 0) {
          const totals = meals.reduce((acc, m) => ({
            calories: acc.calories + (m.calories || 0),
            protein: acc.protein + (m.protein || 0),
            carbs: acc.carbs + (m.carbs || 0),
            fat: acc.fat + (m.fat || 0),
          }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

          setStats(s => ({
            ...s,
            currentCalories: totals.calories || s.currentCalories,
            protein: { ...s.protein, current: Math.round(totals.protein) || s.protein.current },
            carbs: { ...s.carbs, current: Math.round(totals.carbs) || s.carbs.current },
            fats: { ...s.fats, current: Math.round(totals.fat) || s.fats.current },
          }));
        }

        setStats(s => ({
          ...s,
          waterMl: logRes.data?.water_ml || 0,
          workoutsToday: workoutRes.data?.length || 0,
        }));
      } catch { /* fallback to local */ }
    };
    fetchToday();
  }, []);

  const pct = (c: number, t: number) => Math.min((c / Math.max(t, 1)) * 100, 100);
  const calPct = pct(stats.currentCalories, stats.dailyCalories);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    { label: 'Meals', icon: Utensils, tab: 'meals', gradient: 'from-accent via-primary to-accent' },
    { label: 'Workout', icon: Dumbbell, tab: 'creative', gradient: 'from-primary via-accent to-secondary' },
    { label: 'Coach', icon: MessageSquare, tab: 'chat', gradient: 'from-secondary via-primary to-accent' },
    { label: 'Progress', icon: TrendingUp, tab: 'progress', gradient: 'from-accent via-secondary to-primary' },
  ];

  const circumference = 2 * Math.PI * 52;

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="px-5 pb-32 space-y-5">
      {/* Greeting */}
      <motion.div variants={fadeUp} className="pt-1">
        <p className="text-muted-foreground text-[13px] font-medium tracking-wide">{getGreeting()}</p>
        <h1 className="text-[28px] font-bold text-foreground tracking-tight mt-0.5">{stats.name} 👋</h1>
        {stats.streak > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-1.5 mt-2.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-[11px] font-semibold text-accent"
          >
            <Flame className="w-3.5 h-3.5 animate-breathe" /> {stats.streak} day streak
          </motion.div>
        )}
      </motion.div>

      {/* Energy Ring Card */}
      <motion.div
        variants={fadeUp}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-5">
          <div className="relative w-[112px] h-[112px] flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
              <circle cx="58" cy="58" r="52" fill="none" stroke="hsla(0,0%,100%,0.04)" strokeWidth="7" />
              <motion.circle
                cx="58" cy="58" r="52" fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - calPct / 100) }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[24px] font-bold text-foreground tabular-nums"
              >
                {Math.round(calPct)}%
              </motion.span>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Calories</span>
            </div>
          </div>

          <div className="flex-1 space-y-3.5">
            <MacroRow icon={Heart} color="text-accent" label="Protein" current={stats.protein.current} target={stats.protein.target} barColor="bg-accent" delay={0.4} />
            <MacroRow icon={Zap} color="text-primary" label="Carbs" current={stats.carbs.current} target={stats.carbs.target} barColor="bg-primary" delay={0.5} />
            <MacroRow icon={Star} color="text-secondary" label="Fats" current={stats.fats.current} target={stats.fats.target} barColor="bg-secondary" delay={0.6} />
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-border/30 flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground tabular-nums">
            <span className="text-foreground font-semibold">{stats.currentCalories}</span> / {stats.dailyCalories} kcal
          </span>
          {stats.waterMl > 0 && (
            <span className="text-[11px] text-primary/80 font-medium">💧 {(stats.waterMl / 1000).toFixed(1)}L</span>
          )}
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        variants={fadeUp}
        whileTap={{ scale: 0.97 }}
        className="glass-card p-4 cursor-pointer border-secondary/15"
        onClick={() => { haptics.tap(); onTabChange('chat'); }}
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-secondary/12 flex items-center justify-center flex-shrink-0 animate-ai-pulse">
            <span className="text-base">🤖</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-secondary tracking-wider uppercase mb-1">AI Insight</p>
            <p className="text-[13px] text-foreground/85 leading-relaxed">
              {stats.protein.current < stats.protein.target * 0.5
                ? `You're low on protein today. Try a 20g snack to stay on track.`
                : stats.workoutsToday > 0
                ? `Great workout today! Recovery nutrition is key 💪`
                : `Keep going to hit your daily goals! You've got this 💪`}
            </p>
          </div>
          <div className="text-muted-foreground/30 mt-1">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp}>
        <p className="text-[13px] font-semibold text-foreground mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.tab}
              whileTap={{ scale: 0.88, rotate: -3 }}
              onClick={() => { haptics.tap(); onTabChange(action.tab); }}
              className="flex flex-col items-center gap-2.5 py-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-gradient-to-br ${action.gradient} shadow-accent-glow`}
              >
                <action.icon className="w-[22px] h-[22px] text-secondary-foreground" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-medium text-foreground/80">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={fadeUp}>
        <p className="text-[13px] font-semibold text-foreground mb-3">Achievements</p>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { emoji: '🔥', title: 'Streak', sub: `${stats.streak}d` },
            { emoji: '💪', title: 'Protein', sub: stats.protein.current >= stats.protein.target ? 'Hit!' : `${Math.round(pct(stats.protein.current, stats.protein.target))}%` },
            { emoji: '🏋️', title: 'Workouts', sub: `${stats.workoutsToday} today` },
            { emoji: '💧', title: 'Water', sub: stats.waterMl > 0 ? `${(stats.waterMl / 1000).toFixed(1)}L` : '0L' },
          ].map((a, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.93 }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06, type: 'spring', stiffness: 400, damping: 25 }}
              className="glass-card p-3.5 text-center"
            >
              <div className="text-[24px] mb-1.5">{a.emoji}</div>
              <div className="text-[11px] font-semibold text-foreground">{a.title}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{a.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface MacroRowProps {
  icon: React.ElementType;
  color: string;
  label: string;
  current: number;
  target: number;
  barColor: string;
  delay: number;
}

const MacroRow = ({ icon: Icon, color, label, current, target, barColor, delay }: MacroRowProps) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-1.5">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
      </div>
      <span className="text-[11px] text-foreground font-semibold tabular-nums">{current}g/{target}g</span>
    </div>
    <div className="h-[5px] bg-muted/50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((current / Math.max(target, 1)) * 100, 100)}%` }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        className={`h-full rounded-full ${barColor}`}
      />
    </div>
  </div>
);

export default HomeTab;
