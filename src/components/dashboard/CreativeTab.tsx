import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Target, Clock, Flame, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscle: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface WorkoutPlan {
  title: string;
  duration: number;
  difficulty: string;
  targetMuscles: string[];
  exercises: Exercise[];
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

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Glutes', 'Cardio'
  ];

  const exerciseDatabase: Record<string, Exercise[]> = {
    chest: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '2-3 min', muscle: 'Chest', equipment: 'gym', difficulty: 'intermediate' },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '90 sec', muscle: 'Chest', equipment: 'gym', difficulty: 'beginner' },
      { name: 'Push-ups', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Chest', equipment: 'bodyweight', difficulty: 'beginner' },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '2 min', muscle: 'Chest', equipment: 'gym', difficulty: 'intermediate' }
    ],
    back: [
      { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '3 min', muscle: 'Back', equipment: 'gym', difficulty: 'advanced' },
      { name: 'Pull-ups', sets: 3, reps: '8-12', rest: '2 min', muscle: 'Back', equipment: 'bodyweight', difficulty: 'intermediate' },
      { name: 'Bent-over Rows', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Back', equipment: 'gym', difficulty: 'intermediate' },
      { name: 'Lat Pulldowns', sets: 3, reps: '12-15', rest: '90 sec', muscle: 'Back', equipment: 'gym', difficulty: 'beginner' }
    ],
    legs: [
      { name: 'Squats', sets: 4, reps: '10-12', rest: '2-3 min', muscle: 'Legs', equipment: 'gym', difficulty: 'intermediate' },
      { name: 'Lunges', sets: 3, reps: '12/leg', rest: '90 sec', muscle: 'Legs', equipment: 'bodyweight', difficulty: 'beginner' },
      { name: 'Leg Press', sets: 4, reps: '15-20', rest: '2 min', muscle: 'Legs', equipment: 'gym', difficulty: 'beginner' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '2 min', muscle: 'Legs', equipment: 'gym', difficulty: 'intermediate' }
    ],
    shoulders: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Shoulders', equipment: 'gym', difficulty: 'intermediate' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Shoulders', equipment: 'gym', difficulty: 'beginner' },
      { name: 'Pike Push-ups', sets: 3, reps: '10-15', rest: '90 sec', muscle: 'Shoulders', equipment: 'bodyweight', difficulty: 'intermediate' }
    ],
    arms: [
      { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Arms', equipment: 'gym', difficulty: 'beginner' },
      { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '90 sec', muscle: 'Arms', equipment: 'bodyweight', difficulty: 'beginner' },
      { name: 'Close-grip Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Arms', equipment: 'bodyweight', difficulty: 'intermediate' }
    ],
    core: [
      { name: 'Plank', sets: 3, reps: '30-60 sec', rest: '60 sec', muscle: 'Core', equipment: 'bodyweight', difficulty: 'beginner' },
      { name: 'Russian Twists', sets: 3, reps: '20/side', rest: '60 sec', muscle: 'Core', equipment: 'bodyweight', difficulty: 'intermediate' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '60 sec', muscle: 'Core', equipment: 'bodyweight', difficulty: 'beginner' }
    ]
  };

  const generateWorkout = async () => {
    setLoading(true);
    try {
      // Simulate AI workout generation
      await new Promise(resolve => setTimeout(resolve, 800));

      const targetMuscles = preferences.targetMuscles.length > 0 
        ? preferences.targetMuscles 
        : ['Chest', 'Back', 'Legs']; // Default full body

      const seedExercises: Exercise[] = [];
      
      // Select exercises based on preferences
      targetMuscles.forEach(muscle => {
        const muscleKey = muscle.toLowerCase();
        const availableExercises = exerciseDatabase[muscleKey] || [];
        
        // Filter by equipment and experience
        const filteredExercises = availableExercises.filter(ex => {
          const equipmentMatch = preferences.equipment === 'bodyweight' 
            ? ex.equipment === 'bodyweight'
            : ex.equipment === 'gym' || ex.equipment === 'bodyweight';
          
          const difficultyMatch = preferences.experience === 'beginner' 
            ? ex.difficulty === 'beginner'
            : preferences.experience === 'intermediate' 
            ? ex.difficulty !== 'advanced'
            : true;
          
          return equipmentMatch && difficultyMatch;
        });

        // Add 1-2 seed exercises per muscle group
        const exerciseCount = preferences.goal === 'strength' ? 1 : 2;
        filteredExercises.slice(0, exerciseCount).forEach(ex => seedExercises.push(ex));
      });

      // Adjust sets/reps based on goal
      const adjustExercise = (ex: Exercise): Exercise => {
        const newEx = { ...ex } as Exercise;
        switch (preferences.goal) {
          case 'strength':
            newEx.sets = Math.min(ex.sets + 1, 5);
            newEx.reps = '3-6';
            newEx.rest = '3-4 min';
            break;
          case 'endurance':
            newEx.sets = Math.max(ex.sets - 1, 2);
            newEx.reps = '15-20';
            newEx.rest = '30-60 sec';
            break;
          case 'weight_loss':
            newEx.sets = 3;
            newEx.reps = '12-15';
            newEx.rest = '45-60 sec';
            break;
          default:
            newEx.rest = newEx.rest || '60-90 sec';
        }
        return newEx;
      };

      const parseRestSec = (rest: string | undefined): number => {
        if (!rest) return 60;
        const m = rest.toLowerCase();
        if (m.includes('min')) {
          const n = parseInt(m);
          return (isNaN(n) ? 1 : n) * 60;
        }
        const n = parseInt(m);
        return isNaN(n) ? 60 : n;
      };

      const estimateExerciseMinutes = (ex: Exercise): number => {
        const rest = parseRestSec(ex.rest);
        const perSetActive = preferences.goal === 'strength' ? 35 : preferences.goal === 'endurance' ? 25 : 30;
        return Math.ceil((ex.sets * (perSetActive + rest)) / 60);
      };

      const desiredMinutes = parseInt(preferences.duration);
      const program: Exercise[] = [];

      // Start with seed exercises
      seedExercises.map(adjustExercise).forEach(ex => program.push(ex));

      // Fill until desired duration is reached
      const pickPool = [...seedExercises];
      let totalMinutes = program.reduce((sum, ex) => sum + estimateExerciseMinutes(ex), 0);
      let i = 0;
      while (totalMinutes < desiredMinutes && program.length < 24) {
        const base = pickPool[i % pickPool.length] || pickPool[0];
        const variant = adjustExercise(base);
        // Slightly vary sets for variety
        if (preferences.goal !== 'strength') {
          variant.sets = Math.min(5, Math.max(2, variant.sets + ((i % 2 === 0) ? 1 : 0)));
        }
        program.push(variant);
        totalMinutes = program.reduce((sum, ex) => sum + estimateExerciseMinutes(ex), 0);
        i++;
      }

      const estimatedCalories = Math.round(desiredMinutes * 8 * (preferences.experience === 'advanced' ? 1.2 : 1));

      const newWorkout: WorkoutPlan = {
        title: `AI-Generated ${preferences.goal.replace('_', ' ').toUpperCase()} Workout`,
        duration: desiredMinutes,
        difficulty: preferences.experience,
        targetMuscles,
        exercises: program,
        estimatedCalories
      };

      setWorkoutPlan(newWorkout);
      setCompletedExercises(new Set());
      
      toast({
        title: "Workout Generated! 🏋️",
        description: `Custom ${desiredMinutes}-minute workout with ${program.length} exercises.`
      });

    } catch (error) {
      toast({
        title: "Error generating workout",
        description: "Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleExerciseComplete = (exerciseName: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseName)) {
      newCompleted.delete(exerciseName);
    } else {
      newCompleted.add(exerciseName);
    }
    setCompletedExercises(newCompleted);
  };

  const handleMuscleGroupToggle = (muscle: string) => {
    const newTargets = preferences.targetMuscles.includes(muscle)
      ? preferences.targetMuscles.filter(m => m !== muscle)
      : [...preferences.targetMuscles, muscle];
    
    setPreferences(prev => ({ ...prev, targetMuscles: newTargets }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          AI Workout Generator
        </h2>
        <p className="text-white/70">Create custom workout plans based on your equipment and goals</p>
      </motion.div>

      {/* Workout Preferences */}
      <Card className="glassmorphism-card border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-emerald-400" />
            Workout Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-white/80 text-sm">Equipment Available</label>
              <Select
                value={preferences.equipment}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, equipment: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {equipmentOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">Experience Level</label>
              <Select
                value={preferences.experience}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, experience: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">Primary Goal</label>
              <Select
                value={preferences.goal}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, goal: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {goalOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm">Workout Duration</label>
              <Select
                value={preferences.duration}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, duration: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target Muscle Groups */}
          <div className="space-y-3">
            <label className="text-white/80 text-sm">Target Muscle Groups (Optional - Leave empty for full body)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {muscleGroups.map(muscle => (
                <div key={muscle} className="flex items-center space-x-2">
                  <Checkbox
                    id={muscle}
                    checked={preferences.targetMuscles.includes(muscle)}
                    onCheckedChange={() => handleMuscleGroupToggle(muscle)}
                    className="border-white/30 data-[state=checked]:bg-emerald-500"
                  />
                  <label htmlFor={muscle} className="text-white/80 text-sm cursor-pointer">
                    {muscle}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <AnimatedButton
              onClick={generateWorkout}
              loading={loading}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-8"
              glowEffect={true}
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate AI Workout
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>

      {/* Generated Workout */}
      {workoutPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Workout Overview */}
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{workoutPlan.title}</h3>
                <Badge className={`${getDifficultyColor(workoutPlan.difficulty)}`}>
                  {workoutPlan.difficulty.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                  <p className="text-xl font-bold text-white">{workoutPlan.duration}</p>
                  <p className="text-sm text-white/70">Minutes</p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Dumbbell className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-xl font-bold text-white">{workoutPlan.exercises.length}</p>
                  <p className="text-sm text-white/70">Exercises</p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="text-xl font-bold text-white">{workoutPlan.targetMuscles.length}</p>
                  <p className="text-sm text-white/70">Muscle Groups</p>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-white/10">
                  <Flame className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <p className="text-xl font-bold text-white">{workoutPlan.estimatedCalories}</p>
                  <p className="text-sm text-white/70">Est. Calories</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {workoutPlan.targetMuscles.map(muscle => (
                  <Badge key={muscle} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exercise List */}
          <Card className="glassmorphism-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
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
                  key={exercise.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                        <h4 className="text-lg font-semibold text-white">{exercise.name}</h4>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-white/70">Sets: </span>
                          <span className="text-white font-medium">{exercise.sets}</span>
                        </div>
                        <div>
                          <span className="text-white/70">Reps: </span>
                          <span className="text-white font-medium">{exercise.reps}</span>
                        </div>
                        <div>
                          <span className="text-white/70">Rest: </span>
                          <span className="text-white font-medium">{exercise.rest}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-white/60">
                        Target: {exercise.muscle} • Equipment: {exercise.equipment}
                      </div>
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