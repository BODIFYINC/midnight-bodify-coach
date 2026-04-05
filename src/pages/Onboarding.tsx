import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { saveUserSettings } from '@/services/userSettingsService';
import OnboardingInput from '@/components/onboarding/OnboardingInput';

interface StepData {
  name: string;
  age: string;
  height: string;
  weight: string;
  bodyFat: string;
  gender: string;
  activity: string;
  goal: string;
  daysPerWeek: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  dietaryRestrictions: string[];
  allergies: string;
  dislikedFoods: string;
}

const activities = [
  { value: 'sedentary', emoji: '🪑', label: 'Sedentary', desc: 'Desk job, little exercise' },
  { value: 'light', emoji: '🚶', label: 'Light Active', desc: 'Light exercise 1-3x/week' },
  { value: 'moderate', emoji: '🏃', label: 'Moderate', desc: 'Exercise 3-5x/week' },
  { value: 'active', emoji: '🏋️', label: 'Very Active', desc: 'Heavy exercise daily' },
  { value: 'very_active', emoji: '⚡', label: 'Athlete', desc: 'Intense training + active job' },
];

const goals = [
  { value: 'muscle_gain', emoji: '💪', label: 'Build Muscle', desc: 'Gain lean mass & strength' },
  { value: 'weight_loss', emoji: '🔥', label: 'Lose Fat', desc: 'Cut body fat, stay strong' },
  { value: 'maintenance', emoji: '🧬', label: 'Stay Healthy', desc: 'Maintain & feel great' },
];

const restrictions = [
  { value: 'vegan', label: '🌱 Vegan' },
  { value: 'keto', label: '🥑 Keto' },
  { value: 'vegetarian', label: '🥗 Vegetarian' },
  { value: 'gluten_free', label: '🌾 Gluten-Free' },
  { value: 'dairy_free', label: '🥛 Dairy-Free' },
  { value: 'halal', label: '🕌 Halal' },
  { value: 'pescatarian', label: '🐟 Pescatarian' },
  { value: 'none', label: '✅ No Restrictions' },
];

const stepMeta = [
  { title: "What's your name?", subtitle: "Let's personalize your experience" },
  { title: 'Your body metrics', subtitle: 'Real data = better plans' },
  { title: 'Activity level', subtitle: 'How active are you day-to-day?' },
  { title: 'Your main goal', subtitle: 'What are we optimizing for?' },
  { title: 'Dietary preferences', subtitle: 'Any restrictions or foods to avoid?' },
];

const totalSteps = 5;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<StepData>({
    name: '', age: '', height: '', weight: '', bodyFat: '',
    gender: 'male', activity: 'moderate', goal: 'muscle_gain',
    daysPerWeek: '4', fitnessLevel: 'beginner',
    dietaryRestrictions: [], allergies: '', dislikedFoods: '',
  });

  const updateField = (field: keyof StepData, value: string) => {
    setData(d => ({ ...d, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const toggleRestriction = (v: string) => {
    if (v === 'none') {
      setData(d => ({ ...d, dietaryRestrictions: d.dietaryRestrictions.includes('none') ? [] : ['none'] }));
      return;
    }
    setData(d => ({
      ...d,
      dietaryRestrictions: d.dietaryRestrictions.filter(x => x !== 'none').includes(v)
        ? d.dietaryRestrictions.filter(p => p !== v)
        : [...d.dietaryRestrictions.filter(x => x !== 'none'), v]
    }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.name.trim()) newErrors.name = 'Name is required';
      if (!data.age) newErrors.age = 'Age is required';
      else {
        const age = Number(data.age);
        if (age < 12) newErrors.age = 'Must be 12 or older';
        if (age > 120) newErrors.age = 'Enter a valid age';
      }
      if (!data.gender) newErrors.gender = 'Select your gender';
    }

    if (step === 1) {
      if (!data.height) newErrors.height = 'Height is required';
      else {
        const h = Number(data.height);
        if (h < 50) newErrors.height = 'Min 50 cm';
        if (h > 300) newErrors.height = 'Max 300 cm';
      }
      if (!data.weight) newErrors.weight = 'Weight is required';
      else {
        const w = Number(data.weight);
        if (w < 20) newErrors.weight = 'Min 20 kg';
        if (w > 500) newErrors.weight = 'Max 500 kg';
      }
      if (data.bodyFat) {
        const bf = Number(data.bodyFat);
        if (bf < 2 || bf > 70) newErrors.bodyFat = '2-70%';
      }
      if (data.daysPerWeek) {
        const d = Number(data.daysPerWeek);
        if (d < 1 || d > 7) newErrors.daysPerWeek = '1-7 days';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast({ title: 'Please fix the errors', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < totalSteps - 1) {
      setStep(s => s + 1);
      return;
    }

    setSaving(true);
    try {
      const profile: UserProfile = {
        weight: parseInt(data.weight), height: parseInt(data.height),
        age: parseInt(data.age), gender: data.gender as 'male' | 'female',
        activityLevel: data.activity as UserProfile['activityLevel'],
        goal: data.goal as UserProfile['goal'],
        bodyFat: data.bodyFat ? parseInt(data.bodyFat) : undefined,
      };
      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);

      const allergiesArr = data.allergies.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const dislikedArr = data.dislikedFoods.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

      const settings = {
        name: data.name, age: parseInt(data.age), height: parseInt(data.height),
        weight: parseInt(data.weight), bodyFat: data.bodyFat ? parseInt(data.bodyFat) : undefined,
        gender: data.gender, activityLevel: data.activity, goal: data.goal,
        fitnessLevel: data.fitnessLevel, daysPerWeek: Number(data.daysPerWeek),
        dietaryRestrictions: data.dietaryRestrictions.join(', '),
        dislikedFoods: data.dislikedFoods, allergies: data.allergies,
        targetCalories: targets.calories, targetProtein: targets.protein,
        targetCarbs: targets.carbs, targetFat: targets.fat,
        onboardingCompleted: true,
      };
      localStorage.setItem('userSettings', JSON.stringify(settings));
      localStorage.setItem('userPreferences', JSON.stringify({
        ...settings, dislikedFoods: dislikedArr, allergies: allergiesArr,
        dietaryRestrictions: data.dietaryRestrictions,
      }));

      await saveUserSettings({
        age: parseInt(data.age), weight: parseFloat(data.weight),
        height: parseFloat(data.height), gender: data.gender,
        activity_level: data.activity, goal: data.goal,
        dietary_restrictions: data.dietaryRestrictions.filter(x => x !== 'none'),
        allergies: allergiesArr, disliked_foods: dislikedArr,
        cooking_time: 'moderate', skill_level: data.fitnessLevel,
        onboarding_completed: true,
      });

      toast({ title: 'Welcome to Bodify! 🎉' });
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Onboarding save error:', err);
      toast({ title: 'Welcome to Bodify! 🎉' });
      navigate('/', { replace: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background safe-top safe-bottom">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-20%] top-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-15%] h-80 w-80 rounded-full bg-secondary/8 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 pt-14 pb-2">
        <div className="flex items-center justify-between mb-6">
          {step > 0 ? (
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setStep(s => s - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card/60 border border-border/50">
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </motion.button>
          ) : <div className="w-10" />}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === step ? 24 : 8, backgroundColor: i <= step ? 'hsl(var(--accent))' : 'hsl(var(--muted))' }}
                className="h-2 rounded-full"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <span className="text-[12px] text-muted-foreground font-medium tabular-nums">{step + 1}/{totalSteps}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <h1 className="text-[24px] font-bold text-foreground tracking-tight">{stepMeta[step].title}</h1>
            <p className="text-[14px] text-muted-foreground mt-1">{stepMeta[step].subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <OnboardingInput label="Full name" value={data.name} onChange={v => updateField('name', v)} placeholder="Alex Rivera" error={errors.name} />
              <OnboardingInput label="Age" type="number" value={data.age} onChange={v => updateField('age', v)} placeholder="25" min={12} max={120} error={errors.age} />
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ value: 'male', emoji: '♂️', label: 'Male' }, { value: 'female', emoji: '♀️', label: 'Female' }].map(g => (
                    <motion.button key={g.value} whileTap={{ scale: 0.96 }}
                      onClick={() => updateField('gender', g.value)}
                      className={`h-14 rounded-2xl flex items-center justify-center gap-2.5 text-[14px] font-medium transition-all ${
                        data.gender === g.value
                          ? 'border-2 border-accent bg-accent/10 text-foreground shadow-lg shadow-accent/10'
                          : 'border border-border/50 bg-card/50 text-muted-foreground'
                      }`}>
                      <span className="text-lg">{g.emoji}</span> {g.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <OnboardingInput label="Height" type="number" value={data.height} onChange={v => updateField('height', v)} placeholder="175" unit="cm" min={50} max={300} error={errors.height} />
                <OnboardingInput label="Weight" type="number" value={data.weight} onChange={v => updateField('weight', v)} placeholder="70" unit="kg" min={20} max={500} error={errors.weight} />
              </div>
              <OnboardingInput label="Body fat (optional)" type="number" value={data.bodyFat} onChange={v => updateField('bodyFat', v)} placeholder="18" unit="%" min={2} max={70} error={errors.bodyFat} />
              <div className="grid grid-cols-2 gap-3">
                <OnboardingInput label="Days/week" type="number" value={data.daysPerWeek} onChange={v => updateField('daysPerWeek', v)} placeholder="4" min={1} max={7} error={errors.daysPerWeek} />
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fitness level</label>
                  <select
                    value={data.fitnessLevel}
                    onChange={e => setData(d => ({ ...d, fitnessLevel: e.target.value as any }))}
                    className="w-full h-[52px] rounded-2xl border border-border/50 bg-card/60 px-3 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              {activities.map(a => (
                <motion.button key={a.value} whileTap={{ scale: 0.97 }}
                  onClick={() => setData(d => ({ ...d, activity: a.value }))}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    data.activity === a.value
                      ? 'border-2 border-accent bg-accent/10 shadow-lg shadow-accent/10'
                      : 'border border-border/50 bg-card/50'
                  }`}>
                  <span className="text-2xl">{a.emoji}</span>
                  <div className="text-left flex-1">
                    <p className="text-[14px] font-semibold text-foreground">{a.label}</p>
                    <p className="text-[12px] text-muted-foreground">{a.desc}</p>
                  </div>
                  {data.activity === a.value && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              {goals.map(g => (
                <motion.button key={g.value} whileTap={{ scale: 0.97 }}
                  onClick={() => setData(d => ({ ...d, goal: g.value }))}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all ${
                    data.goal === g.value
                      ? 'border-2 border-accent bg-accent/10 shadow-lg shadow-accent/10'
                      : 'border border-border/50 bg-card/50'
                  }`}>
                  <span className="text-3xl">{g.emoji}</span>
                  <div className="text-left flex-1">
                    <p className="text-[16px] font-bold text-foreground">{g.label}</p>
                    <p className="text-[13px] text-muted-foreground">{g.desc}</p>
                  </div>
                  {data.goal === g.value && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="grid grid-cols-2 gap-2.5">
                {restrictions.map(r => (
                  <motion.button key={r.value} whileTap={{ scale: 0.95 }}
                    onClick={() => toggleRestriction(r.value)}
                    className={`p-3.5 rounded-2xl text-[13px] font-medium transition-all ${
                      data.dietaryRestrictions.includes(r.value)
                        ? 'border-2 border-accent bg-accent/10 text-foreground'
                        : 'border border-border/50 bg-card/50 text-muted-foreground'
                    }`}>
                    {r.label}
                  </motion.button>
                ))}
              </div>
              <OnboardingInput label="Allergies (comma separated)" value={data.allergies} onChange={v => updateField('allergies', v)} placeholder="nuts, shellfish" />
              <OnboardingInput label="Disliked foods (optional)" value={data.dislikedFoods} onChange={v => updateField('dislikedFoods', v)} placeholder="mushrooms, olives" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-6 pb-8 pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          disabled={saving}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary text-white text-[15px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          style={{ boxShadow: '0 12px 30px -14px hsl(var(--accent) / 0.6)' }}
        >
          {saving ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : step === totalSteps - 1 ? (
            <><Check className="w-5 h-5" /> Get Started</>
          ) : (
            <>Continue <ArrowRight className="w-5 h-5" /></>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;
