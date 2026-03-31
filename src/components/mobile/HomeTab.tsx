import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, Zap, Star, Utensils, Dumbbell, MessageSquare, TrendingUp } from 'lucide-react';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { getUnifiedTargets } from '@/services/unifiedTargets';

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
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

  const circumference = 2 * Math.PI * 52;

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="px-5 pb-32 space-y-5"
    >
      {/* Greeting */}
      <motion.div variants={fadeUp} className="pt-1">
        <p className="text-muted-foreground text-[13px] font-medium">{getGreeting()}</p>
        <h1 className="text-[26px] font-bold text-foreground tracking-tight mt-0.5">{stats.name} 👋</h1>
        {stats.streak > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-full bg-amber-500/12 border border-amber-500/15 text-amber-400 text-[11px] font-semibold"
          >
            <Flame className="w-3.5 h-3.5" /> {stats.streak} day streak
          </motion.div>
        )}
      </motion.div>

      {/* Energy Ring Card */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-5 border border-border/50"
        style={{
          background: 'hsla(222, 40%, 6%, 0.7)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-5">
          {/* Ring */}
          <div className="relative w-[108px] h-[108px] flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
              <circle cx="58" cy="58" r="52" fill="none" stroke="hsla(0,0%,100%,0.05)" strokeWidth="7" />
              <circle
                cx="58" cy="58" r="52" fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - calPct / 100)}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                  <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-bold text-foreground tabular-nums">{Math.round(calPct)}%</span>
              <span className="text-[10px] text-muted-foreground font-medium mt-0.5">Calories</span>
            </div>
          </div>

          {/* Macros */}
          <div className="flex-1 space-y-3.5">
            <MacroRow icon={Heart} color="text-red-400" label="Protein" current={stats.protein.current} target={stats.protein.target} barColor="bg-red-400" />
            <MacroRow icon={Zap} color="text-primary" label="Carbs" current={stats.carbs.current} target={stats.carbs.target} barColor="bg-primary" />
            <MacroRow icon={Star} color="text-amber-400" label="Fats" current={stats.fats.current} target={stats.fats.target} barColor="bg-amber-400" />
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-border/30 text-center">
          <span className="text-[13px] text-muted-foreground tabular-nums">
            <span className="text-foreground font-semibold">{stats.currentCalories}</span> / {stats.dailyCalories} kcal
          </span>
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div
        variants={fadeUp}
        whileTap={{ scale: 0.98 }}
        className="rounded-2xl p-4 cursor-pointer border border-secondary/15"
        style={{
          background: 'hsla(263, 50%, 12%, 0.4)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={() => onTabChange('chat')}
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-base">🤖</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-secondary tracking-wide uppercase mb-1">AI Insight</p>
            <p className="text-[13px] text-foreground/85 leading-relaxed">
              {stats.protein.current < stats.protein.target * 0.5
                ? `You're low on protein today. Try a 20g snack to stay on track.`
                : `Great progress! Keep going to hit your daily goals 💪`}
            </p>
          </div>
          <div className="text-muted-foreground/40 mt-1">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp}>
        <p className="text-[13px] font-semibold text-foreground mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <motion.button
              key={action.tab}
              whileTap={{ scale: 0.92 }}
              onClick={() => onTabChange(action.tab)}
              className="flex flex-col items-center gap-2.5 py-3"
            >
              <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 8px 24px -4px hsla(217, 91%, 60%, 0.2)` }}
              >
                <action.icon className="w-[22px] h-[22px] text-white" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground">{action.label}</span>
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
            { emoji: '💪', title: 'Protein', sub: 'Pro' },
            { emoji: '🎯', title: 'Goals', sub: 'Crusher' },
            { emoji: '⚡', title: 'Active', sub: 'Daily' },
          ].map((a, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl p-3.5 text-center border border-border/40"
              style={{ background: 'hsla(222, 40%, 6%, 0.6)' }}
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
}

const MacroRow = ({ icon: Icon, color, label, current, target, barColor }: MacroRowProps) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-1.5">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
      </div>
      <span className="text-[11px] text-foreground font-semibold tabular-nums">{current}g/{target}g</span>
    </div>
    <div className="h-[5px] bg-muted/60 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((current / Math.max(target, 1)) * 100, 100)}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`h-full rounded-full ${barColor}`}
      />
    </div>
  </div>
);

export default HomeTab;
