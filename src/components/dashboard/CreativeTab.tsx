import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Target, Clock, Flame, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { selectExercisesForWorkout, type ExerciseEntry } from '@/services/exerciseDatabase';

interface WorkoutPlan {
  title: string;
  duration: number;
  difficulty: string;
  targetMuscles: string[];
  exercises: ExerciseEntry[];
  estimatedCalories: number;
}

export const CreativeTab: React.FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const [preferences, setPreferences] = useState({
    equipment: 'gym',
    experience: 'intermediate',
    goal: 'muscle_gain',
    duration: '45',
    targetMuscles: [] as string[]
  });

  const equipmentOptions = [
    { value: 'gym', label: 'Full Gym Access' },
    { value: 'home_basic', label: 'Home - Basic Equipment' },
    { value: 'home_advanced', label: 'Home - Advanced Setup' },
    { value: 'bodyweight', label: 'Bodyweight Only' },
    { value: 'dumbbells', label: 'Dumbbells Only' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' }
  ];

  const goalOptions = [
    { value: 'muscle_gain', label: 'Muscle Building' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'athletic', label: 'Athletic Performance' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
    { value: '90', label: '90 minutes' }
  ];

  const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio'];

  const generateWorkout = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      const targetMuscles = preferences.targetMuscles.length > 0
        ? preferences.targetMuscles
        : ['Chest', 'Back', 'Legs']; // Default full body

      // Calculate target exercise count: 6-8 always
      const targetCount = targetMuscles.length === 1 ? 7 : Math.min(8, Math.max(6, targetMuscles.length * 2));

      const exercises = selectExercisesForWorkout(
        targetMuscles,
        preferences.equipment,
        preferences.experience,
        preferences.goal,
        targetCount
      );

      const estimatedCalories = exercises.reduce(
        (sum, ex) => sum + (ex.caloriesPerSet * ex.sets), 0
      );

      const newWorkout: WorkoutPlan = {
        title: `${preferences.goal.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Workout`,
        duration: parseInt(preferences.duration),
        difficulty: preferences.experience,
        targetMuscles,
        exercises,
        estimatedCalories
      };

      setWorkoutPlan(newWorkout);
      setCompletedExercises(new Set());

      toast({
        title: "Workout Generated! 🏋️",
        description: `${exercises.length} exercises targeting ${targetMuscles.join(', ')}.`
      });
    } catch {
      toast({ title: "Error", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const toggleExerciseComplete = (name: string) => {
    const n = new Set(completedExercises);
    n.has(name) ? n.delete(name) : n.add(name);
    setCompletedExercises(n);
  };

  const handleMuscleGroupToggle = (muscle: string) => {
    setPreferences(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.includes(muscle)
        ? prev.targetMuscles.filter(m => m !== muscle)
        : [...prev.targetMuscles, muscle]
    }));
  };

  const getDifficultyColor = (d: string) => {
    if (d === 'beginner') return 'text-green-400';
    if (d === 'intermediate') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          AI Workout Generator
        </h2>
        <p className="text-muted-foreground">Create custom workout plans based on your equipment and goals</p>
      </motion.div>

      {/* Preferences */}
      <Card className="glassmorphism-card border border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Target className="w-5 h-5 mr-2 text-emerald-400" />
            Workout Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Equipment Available', key: 'equipment', options: equipmentOptions },
              { label: 'Experience Level', key: 'experience', options: experienceOptions },
              { label: 'Primary Goal', key: 'goal', options: goalOptions },
              { label: 'Workout Duration', key: 'duration', options: durationOptions },
            ].map(({ label, key, options }) => (
              <div key={key} className="space-y-2">
                <label className="text-muted-foreground text-sm">{label}</label>
                <Select
                  value={preferences[key as keyof typeof preferences] as string}
                  onValueChange={(v) => setPreferences(prev => ({ ...prev, [key]: v }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-muted-foreground text-sm">Target Muscle Groups (Leave empty for full body)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {muscleGroups.map(muscle => (
                <div key={muscle} className="flex items-center space-x-2">
                  <Checkbox
                    id={muscle}
                    checked={preferences.targetMuscles.includes(muscle)}
                    onCheckedChange={() => handleMuscleGroupToggle(muscle)}
                    className="border-white/30 data-[state=checked]:bg-emerald-500"
                  />
                  <label htmlFor={muscle} className="text-muted-foreground text-sm cursor-pointer">{muscle}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <AnimatedButton
              onClick={generateWorkout}
              loading={loading}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-8"
              glowEffect={true}
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate Workout
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>

      {/* Generated Workout */}
      {workoutPlan && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground">{workoutPlan.title}</h3>
                <Badge className={getDifficultyColor(workoutPlan.difficulty)}>
                  {workoutPlan.difficulty.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                  <p className="text-xl font-bold text-foreground">{workoutPlan.duration}</p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Dumbbell className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-xl font-bold text-foreground">{workoutPlan.exercises.length}</p>
                  <p className="text-sm text-muted-foreground">Exercises</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="text-xl font-bold text-foreground">{workoutPlan.targetMuscles.length}</p>
                  <p className="text-sm text-muted-foreground">Muscle Groups</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Flame className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <p className="text-xl font-bold text-foreground">{workoutPlan.estimatedCalories}</p>
                  <p className="text-sm text-muted-foreground">Est. Calories</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {workoutPlan.targetMuscles.map(m => (
                  <Badge key={m} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{m}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="w-5 h-5 mr-2 text-emerald-400" />
                  Exercise Plan
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {completedExercises.size}/{workoutPlan.exercises.length} Completed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workoutPlan.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.name + index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    completedExercises.has(exercise.name)
                      ? 'bg-green-500/10 border-green-500/50'
                      : 'bg-white/5 border-white/10 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">{exercise.name}</h4>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div><span className="text-muted-foreground">Sets: </span><span className="text-foreground font-medium">{exercise.sets}</span></div>
                        <div><span className="text-muted-foreground">Reps: </span><span className="text-foreground font-medium">{exercise.reps}</span></div>
                        <div><span className="text-muted-foreground">Rest: </span><span className="text-foreground font-medium">{exercise.rest}</span></div>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Target: {exercise.muscle} • Equipment: {exercise.equipment}
                        {exercise.secondaryMuscles.length > 0 && ` • Also works: ${exercise.secondaryMuscles.join(', ')}`}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70 italic">{exercise.instructions}</p>
                    </div>

                    <AnimatedButton
                      size="sm"
                      variant={completedExercises.has(exercise.name) ? "default" : "outline"}
                      onClick={() => toggleExerciseComplete(exercise.name)}
                      className={completedExercises.has(exercise.name)
                        ? "bg-green-500 hover:bg-green-600"
                        : "border-white/30 hover:bg-white/10"
                      }
                    >
                      <CheckCircle className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
