import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';
import { Button } from '@/components/ui/button';
import { StepHeader } from '@/components/onboarding/StepHeader';
import { ProfileInput } from '@/components/onboarding/ProfileInput';
import { ChoiceCard } from '@/components/onboarding/ChoiceCard';

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

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>({
    name: '',
    age: '',
    height: '',
    weight: '',
    bodyFat: '',
    gender: 'male',
    activity: 'moderate',
    goal: 'muscle_gain',
    daysPerWeek: '4',
    fitnessLevel: 'beginner',
    dietaryRestrictions: [],
    allergies: '',
    dislikedFoods: '',
  });

  const totalSteps = 5;

  const activities = [
    { value: 'sedentary', label: 'Sedentary', emoji: '🪑', desc: 'Desk job, little exercise' },
    { value: 'light', label: 'Light Active', emoji: '🚶', desc: 'Light exercise 1-3x per week' },
    { value: 'moderate', label: 'Moderate', emoji: '🚶', desc: 'Exercise 3-5x per week' },
    { value: 'active', label: 'Athlete', emoji: '🏋️', desc: 'Heavy exercise daily' },
    { value: 'very_active', label: 'Very Active', emoji: '⚡', desc: 'Intense training + active lifestyle' },
  ];

  const goals = [
    { value: 'muscle_gain', label: 'Build Muscle', emoji: '💪' },
    { value: 'weight_loss', label: 'Lose Fat', emoji: '🔥' },
    { value: 'maintenance', label: 'Longevity', emoji: '🧬' },
  ];

  const restrictions = [
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'keto', label: '🥑 Keto' },
    { value: 'vegetarian', label: '🥗 Vegetarian' },
    { value: 'gluten_free', label: '🌾 Gluten-Free' },
    { value: 'dairy_free', label: '🥛 Dairy-Free' },
    { value: 'halal', label: '🕌 Halal' },
    { value: 'pescatarian', label: '🐟 Pescatarian' },
  ];

  const toggleRestriction = (v: string) => {
    setData(d => ({
      ...d,
      dietaryRestrictions: d.dietaryRestrictions.includes(v)
        ? d.dietaryRestrictions.filter(p => p !== v)
        : [...d.dietaryRestrictions, v]
    }));
  };

  const stepMeta = [
    { title: 'Basics', subtitle: 'Tell us who you are' },
    { title: 'Body Metrics', subtitle: 'Real data = better plans' },
    { title: 'Training Setup', subtitle: 'Customize your weekly routine' },
    { title: 'Main Goal', subtitle: 'What are we optimizing for?' },
    { title: 'Nutrition Filters', subtitle: 'Any restrictions or foods to avoid?' },
  ];

  const handleNext = () => {
    if (step === 0 && (!data.name || !data.age)) {
      toast({ title: 'Fill all fields', variant: 'destructive' }); return;
    }
    if (step === 1 && (!data.height || !data.weight)) {
      toast({ title: 'Add your body metrics', variant: 'destructive' }); return;
    }
    if (step === 2 && (!data.daysPerWeek || Number(data.daysPerWeek) < 1 || Number(data.daysPerWeek) > 7)) {
      toast({ title: 'Choose valid workout days (1-7)', variant: 'destructive' }); return;
    }

    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      // Save and navigate
      const profile: UserProfile = {
        weight: parseInt(data.weight),
        height: parseInt(data.height),
        age: parseInt(data.age),
        gender: data.gender as 'male' | 'female',
        activityLevel: data.activity as UserProfile['activityLevel'],
        goal: data.goal as UserProfile['goal'],
        bodyFat: data.bodyFat ? parseInt(data.bodyFat) : undefined,
      };
      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);

      const allergiesArr = data.allergies
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

      const dislikedArr = data.dislikedFoods
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

      const settings = {
        name: data.name,
        age: parseInt(data.age),
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        bodyFat: data.bodyFat ? parseInt(data.bodyFat) : undefined,
        gender: data.gender,
        activityLevel: data.activity,
        goal: data.goal,
        fitnessLevel: data.fitnessLevel,
        daysPerWeek: Number(data.daysPerWeek),
        dietaryRestrictions: data.dietaryRestrictions.join(', '),
        dislikedFoods: data.dislikedFoods,
        allergies: data.allergies,
        targetCalories: targets.calories, targetProtein: targets.protein,
        targetCarbs: targets.carbs, targetFat: targets.fat,
      };
      localStorage.setItem('userSettings', JSON.stringify(settings));
      localStorage.setItem('userPreferences', JSON.stringify({
        ...settings,
        dislikedFoods: dislikedArr,
        allergies: allergiesArr,
        dietaryRestrictions: data.dietaryRestrictions,
      }));

      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.name = data.name;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      toast({ title: 'Welcome to Bodify! 🎉' });
      navigate('/app');
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col px-6 py-8 safe-top safe-bottom">
      <StepHeader
        step={step}
        totalSteps={totalSteps}
        title={stepMeta[step].title}
        subtitle={stepMeta[step].subtitle}
        onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
      />

      <div className="flex-1 flex flex-col mt-7">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="bio" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-4">
              <ProfileInput label="Full name" value={data.name} onChange={(v) => setData((d) => ({ ...d, name: v }))} placeholder="Alex Rivera" />
              <ProfileInput label="Age" type="number" value={data.age} onChange={(v) => setData((d) => ({ ...d, age: v }))} placeholder="25" />
              <div className="grid grid-cols-2 gap-3">
                <ChoiceCard title="Male" icon="♂️" selected={data.gender === 'male'} onClick={() => setData((d) => ({ ...d, gender: 'male' }))} compact />
                <ChoiceCard title="Female" icon="♀️" selected={data.gender === 'female'} onClick={() => setData((d) => ({ ...d, gender: 'female' }))} compact />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="metrics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <ProfileInput label="Height" type="number" value={data.height} onChange={(v) => setData((d) => ({ ...d, height: v }))} placeholder="175" unit="cm" />
                <ProfileInput label="Weight" type="number" value={data.weight} onChange={(v) => setData((d) => ({ ...d, weight: v }))} placeholder="70" unit="kg" />
              </div>
              <ProfileInput label="Body fat (optional)" type="number" value={data.bodyFat} onChange={(v) => setData((d) => ({ ...d, bodyFat: v }))} placeholder="18" unit="%" />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="activity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-4">
              <div className="space-y-3">
                {activities.map(a => (
                  <ChoiceCard
                    key={a.value}
                    title={a.label}
                    description={a.desc}
                    icon={a.emoji}
                    selected={data.activity === a.value}
                    onClick={() => setData(d => ({ ...d, activity: a.value }))}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ProfileInput label="Days per week" type="number" value={data.daysPerWeek} onChange={(v) => setData((d) => ({ ...d, daysPerWeek: v }))} placeholder="4" />
                <label className="block space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fitness level</span>
                  <select
                    value={data.fitnessLevel}
                    onChange={(e) => setData((d) => ({ ...d, fitnessLevel: e.target.value as StepData['fitnessLevel'] }))}
                    className="w-full h-12 rounded-2xl border border-border/60 bg-card/60 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </label>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="goal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div className="space-y-3">
                {goals.map(g => (
                  <ChoiceCard
                    key={g.value}
                    title={g.label}
                    icon={g.emoji}
                    selected={data.goal === g.value}
                    onClick={() => setData(d => ({ ...d, goal: g.value }))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="prefs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {restrictions.map(p => (
                  <motion.button key={p.value} whileTap={{ scale: 0.95 }}
                    onClick={() => toggleRestriction(p.value)}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all ${
                      data.dietaryRestrictions.includes(p.value)
                        ? 'bg-primary/10 border-2 border-primary text-primary'
                        : 'bg-card/60 border border-border/60 text-foreground'
                    }`}>
                    {p.label}
                  </motion.button>
                ))}
              </div>
              <div className="space-y-3">
                <ProfileInput label="Allergies (optional)" value={data.allergies} onChange={(v) => setData((d) => ({ ...d, allergies: v }))} placeholder="nuts, shellfish" />
                <ProfileInput label="Disliked foods (optional)" value={data.dislikedFoods} onChange={(v) => setData((d) => ({ ...d, dislikedFoods: v }))} placeholder="mushrooms, olives" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <Button
        onClick={handleNext}
        className="w-full h-14 mt-6 text-sm gap-2"
      >
        {step === totalSteps - 1 ? 'Get Started' : 'Continue'}
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Onboarding;
