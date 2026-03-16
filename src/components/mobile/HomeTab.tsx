import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, Zap, Star, Utensils, Dumbbell, MessageSquare, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { getUnifiedTargets } from '@/services/unifiedTargets';

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

const HomeTab = ({ onTabChange }: HomeTabProps) => {
  const [stats, setStats] = useState({
    name: 'Champ',
    dailyCalories: 2200,
    currentCalories: 0,
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 275 },
    fats: { current: 0, target: 73 },
    streak: 0,
  });

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const name = settings.name || currentUser.name || 'Champ';

    try {
      const targets = getUnifiedTargets();
      const actual = AccurateNutritionTracker.calculateActualNutrition();
      setStats({
        name,
        dailyCalories: Math.round(targets.calories),
        currentCalories: Math.round(actual.calories),
        protein: { current: Math.round(actual.protein), target: Math.round(targets.protein) },
        carbs: { current: Math.round(actual.carbs), target: Math.round(targets.carbs) },
        fats: { current: Math.round(actual.fat), target: Math.round(targets.fat) },
        streak: (actual.calories >= targets.calories * 0.8 && actual.protein >= targets.protein * 0.8) ? 1 : 0,
      });
    } catch {
      setStats(s => ({ ...s, name }));
    }
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
    { label: 'Meals', icon: Utensils, tab: 'meals', gradient: 'from-primary to-accent' },
    { label: 'Workout', icon: Dumbbell, tab: 'creative', gradient: 'from-secondary to-purple-400' },
    { label: 'Coach', icon: MessageSquare, tab: 'chat', gradient: 'from-amber-500 to-orange-500' },
    { label: 'Progress', icon: TrendingUp, tab: 'progress', gradient: 'from-sky-400 to-blue-500' },
  ];

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="px-4 pb-28 space-y-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-2"
      >
        <p className="text-muted-foreground text-sm">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-foreground">{stats.name} 👋</h1>
        {stats.streak > 0 && (
          <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" /> {stats.streak} day streak
          </div>
        )}
      </motion.div>

      {/* Energy Ring Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-6">
          {/* Ring */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="hsla(0,0%,100%,0.06)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - calPct / 100)}
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                  <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-foreground">{Math.round(calPct)}%</span>
              <span className="text-[10px] text-muted-foreground">Calories</span>
            </div>
          </div>

          {/* Macros */}
          <div className="flex-1 space-y-3">
            <MacroRow icon={Heart} color="text-red-400" label="Protein" current={stats.protein.current} target={stats.protein.target} barColor="bg-red-400" />
            <MacroRow icon={Zap} color="text-primary" label="Carbs" current={stats.carbs.current} target={stats.carbs.target} barColor="bg-primary" />
            <MacroRow icon={Star} color="text-amber-400" label="Fats" current={stats.fats.current} target={stats.fats.target} barColor="bg-amber-400" />
          </div>
        </div>
        <div className="mt-3 text-center text-xs text-muted-foreground">
          {stats.currentCalories} / {stats.dailyCalories} kcal
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 border-secondary/20 animate-ai-pulse cursor-pointer"
        onClick={() => onTabChange('chat')}
        style={{ borderColor: 'hsla(263, 70%, 58%, 0.2)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary mb-0.5">AI Insight</p>
            <p className="text-sm text-foreground/80">
              {stats.protein.current < stats.protein.target * 0.5
                ? `You're low on protein today. Try a 20g snack to stay on track.`
                : `Great progress! Keep going to hit your daily goals 💪`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-4 gap-3"
      >
        {quickActions.map((action, i) => (
          <motion.button
            key={action.tab}
            whileTap={{ scale: 0.93 }}
            onClick={() => onTabChange(action.tab)}
            className="flex flex-col items-center gap-2 py-3"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '🔥', title: 'Streak', sub: `${stats.streak}d` },
            { emoji: '💪', title: 'Protein', sub: 'Pro' },
            { emoji: '🎯', title: 'Goals', sub: 'Crusher' },
            { emoji: '⚡', title: 'Active', sub: 'Daily' },
          ].map((a, i) => (
            <div key={i} className="glass-card p-3 text-center">
              <div className="text-2xl mb-1">{a.emoji}</div>
              <div className="text-[10px] font-semibold text-foreground">{a.title}</div>
              <div className="text-[9px] text-muted-foreground">{a.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface MacroRowProps {
  icon: React.ElementType;
  color: string;
  label: string;
  current: number;
  target: number;
  barColor: string;
}

const MacroRow = ({ icon: Icon, color, label, current, target, barColor }: MacroRowProps) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
      <span className="text-[11px] text-foreground font-medium">{current}g / {target}g</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${barColor} transition-all duration-500`}
        style={{ width: `${Math.min((current / Math.max(target, 1)) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export default HomeTab;
