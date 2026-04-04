import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Camera, TrendingUp, Heart, LogOut, ChevronRight, Dumbbell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { getUserSettings } from '@/services/userSettingsService';
import { getWorkoutLogs } from '@/services/logService';

interface ProfileTabProps {
  onTabChange: (tab: string) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const ProfileTab = ({ onTabChange }: ProfileTabProps) => {
  const { user: authUser, signOut } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', goal: '' });
  const [targets, setTargets] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [workoutCount, setWorkoutCount] = useState(0);

  useEffect(() => {
    // Load from localStorage first (fast), then overlay with DB data
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUserData({
      name: settings.name || currentUser.name || authUser?.user_metadata?.full_name || 'User',
      email: authUser?.email || currentUser.email || settings.email || '',
      goal: settings.goal || 'weight_loss',
    });
    try {
      const profile: UserProfile = {
        weight: settings.weight || 70, height: settings.height || 175,
        age: settings.age || 25, gender: settings.gender || 'male',
        activityLevel: settings.activityLevel || 'moderate',
        goal: settings.goal || 'weight_loss',
      };
      const t = AccurateNutritionTracker.calculateNutritionTargets(profile);
      setTargets(t);
    } catch {}

    // Load DB data
    getUserSettings().then(dbSettings => {
      if (dbSettings?.goal) setUserData(d => ({ ...d, goal: dbSettings.goal || d.goal }));
      if (dbSettings?.age) {
        try {
          const profile: UserProfile = {
            weight: dbSettings.weight || 70, height: dbSettings.height || 175,
            age: dbSettings.age || 25, gender: (dbSettings.gender || 'male') as 'male' | 'female',
            activityLevel: (dbSettings.activity_level || 'moderate') as UserProfile['activityLevel'],
            goal: (dbSettings.goal || 'weight_loss') as UserProfile['goal'],
          };
          setTargets(AccurateNutritionTracker.calculateNutritionTargets(profile));
        } catch {}
      }
    }).catch(() => {});
    getWorkoutLogs(100).then(logs => setWorkoutCount(logs.length)).catch(() => {});
  }, [authUser]);

  const goalLabel: Record<string, string> = {
    weight_loss: '🔥 Lose Weight', muscle_gain: '💪 Build Muscle',
    maintenance: '⚖️ Maintain', endurance: '🏃 Endurance', general_fitness: '🎯 General'
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', sub: 'Preferences & account', action: () => onTabChange('settings') },
    { icon: TrendingUp, label: 'Progress Photos', sub: 'Track your transformation', action: () => onTabChange('progress') },
    { icon: Heart, label: 'Wellness', sub: 'Sleep, water & recovery', action: () => onTabChange('wellness') },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="px-5 pb-32 space-y-5"
    >
      {/* Profile Card */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-6 flex flex-col items-center text-center border border-border/40"
        style={{ background: 'hsla(222, 40%, 6%, 0.7)', backdropFilter: 'blur(16px)' }}
      >
        <div className="relative mb-4">
          <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/15">
            <User className="w-9 h-9 text-white" />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg"
          >
            <Camera className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.button>
        </div>
        <h2 className="text-lg font-bold text-foreground tracking-tight">{userData.name}</h2>
        <p className="text-[12px] text-muted-foreground mt-0.5">{userData.email}</p>
        <span className="mt-3 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[11px] font-semibold">
          {goalLabel[userData.goal] || userData.goal}
        </span>
      </motion.div>

      {/* Daily Targets */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-5 border border-border/40"
        style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}
      >
        <h3 className="text-[13px] font-semibold text-foreground mb-4">Daily Targets</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Calories', value: targets.calories, color: 'text-primary' },
            { label: 'Protein', value: `${targets.protein}g`, color: 'text-red-400' },
            { label: 'Carbs', value: `${targets.carbs}g`, color: 'text-sky-400' },
            { label: 'Fat', value: `${targets.fat}g`, color: 'text-amber-400' },
          ].map((item, i) => (
            <div key={i} className="py-2">
              <p className={`text-[18px] font-bold ${item.color} tabular-nums`}>{item.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl overflow-hidden border border-border/40"
        style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}
      >
        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.99, backgroundColor: 'hsla(0,0%,100%,0.03)' }}
            onClick={item.action}
            className={`flex items-center w-full px-5 py-4 transition-colors ${
              i < menuItems.length - 1 ? 'border-b border-border/30' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-muted/40 flex items-center justify-center mr-3.5">
              <item.icon className="w-[18px] h-[18px] text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-[14px] text-foreground font-medium block">{item.label}</span>
              <span className="text-[11px] text-muted-foreground">{item.sub}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
          </motion.button>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.button
        variants={fadeUp}
        whileTap={{ scale: 0.98 }}
        onClick={signOut}
        className="w-full rounded-2xl px-5 py-4 flex items-center border border-destructive/15 transition-colors active:bg-destructive/5"
        style={{ background: 'hsla(0, 40%, 8%, 0.4)' }}
      >
        <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center mr-3.5">
          <LogOut className="w-[18px] h-[18px] text-destructive" />
        </div>
        <span className="text-[14px] font-medium text-destructive">Log Out</span>
      </motion.button>
    </motion.div>
  );
};

export default ProfileTab;
