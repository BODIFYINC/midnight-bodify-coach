import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Camera, TrendingUp, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';

interface ProfileTabProps {
  onTabChange: (tab: string) => void;
}

const ProfileTab = ({ onTabChange }: ProfileTabProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', goal: '' });
  const [targets, setTargets] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setUser({
      name: settings.name || currentUser.name || 'User',
      email: currentUser.email || settings.email || '',
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
  }, []);

  const goalLabel: Record<string, string> = {
    weight_loss: '🔥 Lose Weight', muscle_gain: '💪 Build Muscle',
    maintenance: '⚖️ Maintain', endurance: '🏃 Endurance', general_fitness: '🎯 General'
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', action: () => onTabChange('settings') },
    { icon: TrendingUp, label: 'Progress Photos', action: () => onTabChange('progress') },
    { icon: Heart, label: 'Wellness', action: () => onTabChange('wellness') },
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="px-4 pb-28 space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 flex flex-col items-center text-center"
      >
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
        <p className="text-xs text-muted-foreground">{user.email}</p>
        <span className="mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          {goalLabel[user.goal] || user.goal}
        </span>
      </motion.div>

      {/* Daily Targets */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">Daily Targets</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Calories', value: targets.calories, color: 'text-primary' },
            { label: 'Protein', value: `${targets.protein}g`, color: 'text-red-400' },
            { label: 'Carbs', value: `${targets.carbs}g`, color: 'text-sky-400' },
            { label: 'Fat', value: `${targets.fat}g`, color: 'text-amber-400' },
          ].map((item, i) => (
            <div key={i}>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card divide-y divide-border"
      >
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex items-center w-full px-4 py-3.5 hover:bg-muted/30 transition-colors"
          >
            <item.icon className="w-5 h-5 text-muted-foreground mr-3" />
            <span className="text-sm text-foreground flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleLogout}
        className="w-full glass-card px-4 py-3.5 flex items-center text-destructive hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="w-5 h-5 mr-3" />
        <span className="text-sm font-medium">Log Out</span>
      </motion.button>
    </div>
  );
};

export default ProfileTab;
