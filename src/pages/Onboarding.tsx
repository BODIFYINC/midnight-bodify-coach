import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker, type UserProfile } from '@/services/accurateNutritionTracker';

const bodifyLogo = '/lovable-uploads/1ea08858-4d09-483d-bbca-c23dca759081.png';

interface StepData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  activity: string;
  goal: string;
  preferences: string[];
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>({
    name: '', age: '', height: '', weight: '', gender: 'male',
    activity: 'moderate', goal: 'muscle_gain', preferences: [],
  });

  const totalSteps = 4;

  const activities = [
    { value: 'sedentary', label: 'Sedentary', emoji: '🪑', desc: 'Desk job, little exercise' },
    { value: 'moderate', label: 'Moderate', emoji: '🚶', desc: 'Exercise 3-5x per week' },
    { value: 'active', label: 'Athlete', emoji: '🏋️', desc: 'Heavy exercise daily' },
  ];

  const goals = [
    { value: 'muscle_gain', label: 'Build Muscle', emoji: '💪' },
    { value: 'weight_loss', label: 'Lose Fat', emoji: '🔥' },
    { value: 'maintenance', label: 'Longevity', emoji: '🧬' },
  ];

  const prefs = [
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'keto', label: '🥑 Keto' },
    { value: 'no_equipment', label: '🏠 No Equipment' },
    { value: 'vegetarian', label: '🥗 Vegetarian' },
    { value: 'gluten_free', label: '🌾 Gluten-Free' },
    { value: 'dairy_free', label: '🥛 Dairy-Free' },
  ];

  const togglePref = (v: string) => {
    setData(d => ({
      ...d,
      preferences: d.preferences.includes(v)
        ? d.preferences.filter(p => p !== v)
        : [...d.preferences, v]
    }));
  };

  const handleNext = () => {
    if (step === 0 && (!data.name || !data.age || !data.height || !data.weight)) {
      toast({ title: 'Fill all fields', variant: 'destructive' }); return;
    }
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      // Save and navigate
      const profile: UserProfile = {
        weight: parseInt(data.weight), height: parseInt(data.height),
        age: parseInt(data.age), gender: data.gender as 'male' | 'female',
        activityLevel: data.activity as any, goal: data.goal as any,
      };
      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);

      const settings = {
        name: data.name, age: parseInt(data.age), height: parseInt(data.height),
        weight: parseInt(data.weight), gender: data.gender,
        activityLevel: data.activity, goal: data.goal,
        fitnessLevel: 'beginner', daysPerWeek: 3,
        dietaryRestrictions: data.preferences.join(', '),
        dislikedFoods: '', allergies: '',
        targetCalories: targets.calories, targetProtein: targets.protein,
        targetCarbs: targets.carbs, targetFat: targets.fat,
      };
      localStorage.setItem('userSettings', JSON.stringify(settings));
      localStorage.setItem('userPreferences', JSON.stringify({
        ...settings, dislikedFoods: [], allergies: [],
        dietaryRestrictions: data.preferences,
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
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        <div className="flex-1 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? 'bg-primary' : 'bg-muted'
            }`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="bio" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">About You</h2>
                <p className="text-sm text-muted-foreground">Let's personalize your experience</p>
              </div>
              <Input label="Your Name" value={data.name} onChange={v => setData(d => ({ ...d, name: v }))} placeholder="Enter your name" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Age" type="number" value={data.age} onChange={v => setData(d => ({ ...d, age: v }))} placeholder="25" />
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Gender</label>
                  <div className="flex gap-2">
                    {['male', 'female'].map(g => (
                      <button key={g} onClick={() => setData(d => ({ ...d, gender: g }))}
                        className={`flex-1 h-11 rounded-xl text-sm font-medium transition-all ${
                          data.gender === g ? 'bg-primary text-white' : 'bg-muted text-muted-foreground border border-border'
                        }`}>
                        {g === 'male' ? '♂ Male' : '♀ Female'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Height (cm)" type="number" value={data.height} onChange={v => setData(d => ({ ...d, height: v }))} placeholder="175" />
                <Input label="Weight (kg)" type="number" value={data.weight} onChange={v => setData(d => ({ ...d, weight: v }))} placeholder="70" />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="activity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Activity Level</h2>
                <p className="text-sm text-muted-foreground">How active are you?</p>
              </div>
              <div className="space-y-3">
                {activities.map(a => (
                  <motion.button key={a.value} whileTap={{ scale: 0.97 }}
                    onClick={() => setData(d => ({ ...d, activity: a.value }))}
                    className={`w-full p-4 rounded-2xl text-left flex items-center gap-4 transition-all ${
                      data.activity === a.value
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-muted border-2 border-transparent'
                    }`}>
                    <span className="text-3xl">{a.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="goal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Your Goal</h2>
                <p className="text-sm text-muted-foreground">What are you training for?</p>
              </div>
              <div className="space-y-3">
                {goals.map(g => (
                  <motion.button key={g.value} whileTap={{ scale: 0.97 }}
                    onClick={() => setData(d => ({ ...d, goal: g.value }))}
                    className={`w-full p-5 rounded-2xl text-left flex items-center gap-4 transition-all ${
                      data.goal === g.value
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-muted border-2 border-transparent'
                    }`}>
                    <span className="text-4xl">{g.emoji}</span>
                    <p className="text-lg font-semibold text-foreground">{g.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="prefs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Preferences</h2>
                <p className="text-sm text-muted-foreground">Select any that apply (optional)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {prefs.map(p => (
                  <motion.button key={p.value} whileTap={{ scale: 0.95 }}
                    onClick={() => togglePref(p.value)}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all ${
                      data.preferences.includes(p.value)
                        ? 'bg-primary/10 border-2 border-primary text-primary'
                        : 'bg-muted border-2 border-transparent text-foreground'
                    }`}>
                    {p.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
        style={{ boxShadow: '0 4px 20px hsla(217, 91%, 60%, 0.3)' }}
      >
        {step === totalSteps - 1 ? 'Get Started' : 'Continue'}
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

// Simple input component
const Input = ({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    />
  </div>
);

export default Onboarding;
