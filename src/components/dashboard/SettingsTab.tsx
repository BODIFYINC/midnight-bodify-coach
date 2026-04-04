import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker, UserProfile } from '@/services/accurateNutritionTracker';
import { saveUserSettings } from '@/services/userSettingsService';

interface UserSettingsLocal {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  goal: string;
  fitnessLevel: string;
  daysPerWeek: number;
  dislikedFoods: string;
  allergies: string;
  dietaryRestrictions: string;
  bodyFat?: number;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<UserSettingsLocal>({
    name: '', age: 25, height: 175, weight: 70, gender: 'male',
    activityLevel: 'moderate', goal: 'weight_loss', fitnessLevel: 'intermediate',
    daysPerWeek: 4, dislikedFoods: '', allergies: '', dietaryRestrictions: '', bodyFat: undefined,
  });
  const [targets, setTargets] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    try {
      const profile: UserProfile = {
        weight: settings.weight, height: settings.height, age: settings.age,
        gender: settings.gender as 'male' | 'female',
        activityLevel: settings.activityLevel as UserProfile['activityLevel'],
        goal: settings.goal as UserProfile['goal'],
        bodyFat: settings.bodyFat,
      };
      setTargets(AccurateNutritionTracker.calculateNutritionTargets(profile));
    } catch {}
  }, [settings.weight, settings.height, settings.age, settings.gender, settings.activityLevel, settings.goal, settings.bodyFat]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      const dislikedArr = settings.dislikedFoods.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const allergiesArr = settings.allergies.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const restrictionsArr = settings.dietaryRestrictions.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

      localStorage.setItem('userPreferences', JSON.stringify({
        ...settings, dislikedFoods: dislikedArr, allergies: allergiesArr,
        dietaryRestrictions: restrictionsArr,
        targetCalories: targets.calories, targetProtein: targets.protein,
        targetCarbs: targets.carbs, targetFat: targets.fat,
      }));

      // Save to DB
      await saveUserSettings({
        age: settings.age, weight: settings.weight, height: settings.height,
        gender: settings.gender, activity_level: settings.activityLevel,
        goal: settings.goal, dietary_restrictions: restrictionsArr,
        allergies: allergiesArr, disliked_foods: dislikedArr,
        skill_level: settings.fitnessLevel, onboarding_completed: true,
      });

      window.dispatchEvent(new CustomEvent('userPreferencesUpdated'));
      toast({ title: "Settings saved! ✅" });
    } catch {
      toast({ title: "Saved locally ✅", description: "Will sync when connected." });
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: keyof UserSettingsLocal, value: any) => setSettings(p => ({ ...p, [field]: value }));

  const InputField = ({ label, type = 'text', value, onChange, placeholder, unit }: any) => (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        <input type={type} value={value} onChange={(e: any) => onChange(type === 'number' ? (e.target.value ? Number(e.target.value) : '') : e.target.value)}
          placeholder={placeholder}
          className="w-full h-[48px] rounded-2xl border border-border/50 bg-card/60 px-4 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all" />
        {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground font-medium">{unit}</span>}
      </div>
    </div>
  );

  const OptionPill = ({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex gap-2 flex-wrap">
      {options.map(o => (
        <motion.button key={o.value} whileTap={{ scale: 0.95 }}
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-2 rounded-2xl text-[12px] font-medium transition-all ${
            value === o.value
              ? 'border-2 border-accent bg-accent/10 text-accent'
              : 'border border-border/50 bg-card/50 text-muted-foreground'
          }`}>
          {o.label}
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.div initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={fadeUp}>
        <h2 className="text-[22px] font-bold text-foreground tracking-tight">Settings</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">Update your profile for better plans</p>
      </motion.div>

      {/* Targets Preview */}
      <motion.div variants={fadeUp} className="rounded-2xl p-4 border border-accent/20 bg-accent/5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-3">Your Daily Targets</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Calories', value: targets.calories, color: 'text-accent' },
            { label: 'Protein', value: `${targets.protein}g`, color: 'text-destructive' },
            { label: 'Carbs', value: `${targets.carbs}g`, color: 'text-primary' },
            { label: 'Fat', value: `${targets.fat}g`, color: 'text-secondary' },
          ].map((t, i) => (
            <div key={i} className="py-1">
              <p className={`text-[17px] font-bold tabular-nums ${t.color}`}>{t.value}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{t.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div variants={fadeUp} className="rounded-2xl p-5 border border-border/40 space-y-4" style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}>
        <p className="text-[13px] font-semibold text-foreground">Personal Info</p>
        <InputField label="Name" value={settings.name} onChange={(v: string) => update('name', v)} placeholder="Your name" />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Age" type="number" value={settings.age} onChange={(v: number) => update('age', v)} placeholder="25" />
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Gender</label>
            <OptionPill options={[{ value: 'male', label: '♂️ Male' }, { value: 'female', label: '♀️ Female' }]} value={settings.gender} onChange={v => update('gender', v)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Height" type="number" value={settings.height} onChange={(v: number) => update('height', v)} placeholder="175" unit="cm" />
          <InputField label="Weight" type="number" value={settings.weight} onChange={(v: number) => update('weight', v)} placeholder="70" unit="kg" />
        </div>
        <InputField label="Body Fat (optional)" type="number" value={settings.bodyFat || ''} onChange={(v: any) => update('bodyFat', v || undefined)} placeholder="18" unit="%" />
      </motion.div>

      {/* Fitness */}
      <motion.div variants={fadeUp} className="rounded-2xl p-5 border border-border/40 space-y-4" style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}>
        <p className="text-[13px] font-semibold text-foreground">Fitness Goals</p>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Goal</label>
          <OptionPill options={[
            { value: 'weight_loss', label: '🔥 Lose Fat' },
            { value: 'muscle_gain', label: '💪 Build Muscle' },
            { value: 'maintenance', label: '⚖️ Maintain' },
          ]} value={settings.goal} onChange={v => update('goal', v)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Activity Level</label>
          <OptionPill options={[
            { value: 'sedentary', label: '🪑 Sedentary' },
            { value: 'light', label: '🚶 Light' },
            { value: 'moderate', label: '🏃 Moderate' },
            { value: 'active', label: '🏋️ Active' },
            { value: 'very_active', label: '⚡ Athlete' },
          ]} value={settings.activityLevel} onChange={v => update('activityLevel', v)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fitness Level</label>
          <OptionPill options={[
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ]} value={settings.fitnessLevel} onChange={v => update('fitnessLevel', v)} />
        </div>
        <InputField label="Days per week" type="number" value={settings.daysPerWeek} onChange={(v: number) => update('daysPerWeek', v)} placeholder="4" />
      </motion.div>

      {/* Diet */}
      <motion.div variants={fadeUp} className="rounded-2xl p-5 border border-border/40 space-y-4" style={{ background: 'hsla(222, 40%, 6%, 0.7)' }}>
        <p className="text-[13px] font-semibold text-foreground">Diet Preferences</p>
        <InputField label="Disliked Foods" value={settings.dislikedFoods} onChange={(v: string) => update('dislikedFoods', v)} placeholder="mushrooms, olives" />
        <InputField label="Allergies" value={settings.allergies} onChange={(v: string) => update('allergies', v)} placeholder="nuts, shellfish" />
        <InputField label="Dietary Restrictions" value={settings.dietaryRestrictions} onChange={(v: string) => update('dietaryRestrictions', v)} placeholder="vegan, keto" />
      </motion.div>

      {/* Save */}
      <motion.button
        variants={fadeUp}
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        disabled={isLoading}
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary text-secondary-foreground text-[15px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
        style={{ boxShadow: '0 12px 30px -14px hsl(var(--accent) / 0.6)' }}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary-foreground/30 border-t-secondary-foreground" />
        ) : (
          <><Save className="w-5 h-5" /> Save Settings</>
        )}
      </motion.button>
    </motion.div>
  );
};
