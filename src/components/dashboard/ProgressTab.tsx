import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Flame, Droplets, Moon, Scale, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AccurateNutritionTracker } from '@/services/accurateNutritionTracker';
import { getWorkoutLogs, getMealLogs, getDailyLog } from '@/services/logService';

interface DayData {
  day: string;
  calories: number;
  protein: number;
  weight?: number;
}

const stagger = { animate: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const ProgressTab: React.FC = () => {
  const [weekData, setWeekData] = useState<DayData[]>([]);
  const [todayMacros, setTodayMacros] = useState({ cal: 0, prot: 0, carbs: 0, fat: 0 });
  const [targets, setTargets] = useState({ calories: 2200, protein: 150, carbs: 275, fat: 73 });
  const [stats, setStats] = useState({ workouts: 0, streak: 0, water: 0, sleep: 0 });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    // Targets from settings
    try {
      const s = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const t = AccurateNutritionTracker.calculateNutritionTargets({
        weight: s.weight || 70, height: s.height || 175,
        age: s.age || 25, gender: s.gender || 'male',
        activityLevel: s.activityLevel || 'moderate',
        goal: s.goal || 'weight_loss',
      });
      setTargets(t);
      const actual = AccurateNutritionTracker.calculateActualNutrition();
      setTodayMacros({ cal: Math.round(actual.calories), prot: Math.round(actual.protein), carbs: Math.round(actual.carbs), fat: Math.round(actual.fat) });
    } catch {}

    // Real DB data
    try {
      const [workouts, meals, daily] = await Promise.all([
        getWorkoutLogs(30),
        getMealLogs(100),
        getDailyLog(),
      ]);

      setStats(prev => ({
        ...prev,
        workouts: workouts.length,
        water: daily?.water_ml ? Math.round(daily.water_ml / 250) : 0,
        sleep: daily?.sleep_hours || 0,
      }));

      // Build week chart from meal_logs
      const days: DayData[] = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayMeals = meals.filter((m: any) => m.logged_at?.startsWith(dateStr));
        const cal = dayMeals.reduce((s: number, m: any) => s + (m.calories || 0), 0);
        const prot = dayMeals.reduce((s: number, m: any) => s + (m.protein || 0), 0);
        days.push({
          day: d.toLocaleDateString('en', { weekday: 'short' }),
          calories: cal,
          protein: prot,
        });
      }
      if (days.some(d => d.calories > 0)) setWeekData(days);
      else {
        // Fallback demo data
        setWeekData(Array.from({ length: 7 }, (_, i) => {
          const d = new Date(); d.setDate(d.getDate() - (6 - i));
          return { day: d.toLocaleDateString('en', { weekday: 'short' }), calories: 1400 + Math.floor(Math.random() * 600), protein: 70 + Math.floor(Math.random() * 60) };
        }));
      }

      // Streak
      let streak = 0;
      for (let i = 0; i < 30; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const hasMeal = meals.some((m: any) => m.logged_at?.startsWith(ds));
        const hasWorkout = workouts.some((w: any) => w.completed_at?.startsWith(ds));
        if (hasMeal || hasWorkout) streak++; else break;
      }
      setStats(prev => ({ ...prev, streak }));
    } catch {}
  };

  const pct = (c: number, t: number) => Math.min((c / Math.max(t, 1)) * 100, 100);

  const macroCards = [
    { label: 'Calories', value: todayMacros.cal, target: targets.calories, unit: '', icon: Flame, color: 'accent' },
    { label: 'Protein', value: todayMacros.prot, target: targets.protein, unit: 'g', icon: Target, color: 'accent' },
    { label: 'Carbs', value: todayMacros.carbs, target: targets.carbs, unit: 'g', icon: Zap, color: 'primary' },
    { label: 'Fat', value: todayMacros.fat, target: targets.fat, unit: 'g', icon: TrendingUp, color: 'secondary' },
  ];

  const badges = [
    { emoji: '🔥', label: 'Streak', value: `${stats.streak}d`, desc: stats.streak >= 7 ? 'Unlocked!' : `${7 - stats.streak} to go` },
    { emoji: '🏋️', label: 'Workouts', value: stats.workouts.toString(), desc: 'Total logged' },
    { emoji: '💧', label: 'Water', value: `${stats.water}`, desc: 'glasses today' },
    { emoji: '😴', label: 'Sleep', value: `${stats.sleep}h`, desc: 'last night' },
  ];

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h2 className="text-xl font-bold text-foreground tracking-tight">Your Progress</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">Track nutrition, workouts & wellness</p>
      </motion.div>

      {/* Today's Macros — 2x2 grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        {macroCards.map((m) => {
          const p = pct(m.value, m.target);
          return (
            <div
              key={m.label}
              className="rounded-2xl p-4 border border-border/40"
              style={{ background: 'hsla(222, 40%, 6%, 0.7)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <m.icon className={`w-4 h-4 text-${m.color}`} />
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{m.label}</span>
              </div>
              <p className="text-[22px] font-bold text-foreground tabular-nums">
                {m.value}<span className="text-[13px] text-muted-foreground font-medium">/{m.target}{m.unit}</span>
              </p>
              <div className="mt-2.5 h-[5px] rounded-full bg-muted/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className={`h-full rounded-full bg-${m.color}`}
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Weekly Chart */}
      {weekData.length > 0 && (
        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-4 border border-border/40"
          style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}
        >
          <h3 className="text-[13px] font-semibold text-foreground mb-3">Weekly Calories</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Line type="monotone" dataKey="calories" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ fill: 'hsl(var(--accent))', r: 3.5, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="protein" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-5 mt-2">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Calories</span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2.5 h-0.5 rounded bg-primary" /> Protein</span>
          </div>
        </motion.div>
      )}

      {/* Badges */}
      <motion.div variants={fadeUp}>
        <h3 className="text-[13px] font-semibold text-foreground mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl p-3 text-center border border-border/40"
              style={{ background: 'hsla(222, 40%, 6%, 0.6)' }}
            >
              <div className="text-[22px] mb-1">{b.emoji}</div>
              <div className="text-[14px] font-bold text-foreground tabular-nums">{b.value}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
