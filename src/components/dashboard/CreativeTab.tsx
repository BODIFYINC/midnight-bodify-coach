import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Zap, Target, Clock, Flame, CheckCircle, ChevronDown, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { selectExercisesForWorkout, type ExerciseEntry } from '@/services/exerciseDatabase';
import { logWorkout } from '@/services/logService';

interface WorkoutPlan {
  title: string;
  duration: number;
  difficulty: string;
  targetMuscles: string[];
  exercises: ExerciseEntry[];
  estimatedCalories: number;
}

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

export const CreativeTab: React.FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [savingWorkout, setSavingWorkout] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const [preferences, setPreferences] = useState({
    equipment: 'gym',
    experience: 'intermediate',
    goal: 'muscle_gain',
    duration: '45',
    targetMuscles: [] as string[]
  });

  const equipmentOptions = [
    { value: 'gym', label: 'Full Gym', emoji: '🏋️' },
    { value: 'home_basic', label: 'Home Basic', emoji: '🏠' },
    { value: 'home_advanced', label: 'Home Pro', emoji: '⚙️' },
    { value: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
    { value: 'dumbbells', label: 'Dumbbells', emoji: '💪' },
  ];

  const goalOptions = [
    { value: 'muscle_gain', label: 'Build Muscle', emoji: '💪' },
    { value: 'strength', label: 'Strength', emoji: '🏆' },
    { value: 'endurance', label: 'Endurance', emoji: '🏃' },
    { value: 'weight_loss', label: 'Fat Loss', emoji: '🔥' },
    { value: 'athletic', label: 'Athletic', emoji: '⚡' },
  ];

  const muscleGroups = [
    { id: 'Chest', emoji: '🫁' }, { id: 'Back', emoji: '🔙' },
    { id: 'Shoulders', emoji: '🦾' }, { id: 'Arms', emoji: '💪' },
    { id: 'Legs', emoji: '🦵' }, { id: 'Core', emoji: '🧱' },
    { id: 'Glutes', emoji: '🍑' }, { id: 'Cardio', emoji: '❤️' },
  ];

  const generateWorkout = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 400));
      const targetMuscles = preferences.targetMuscles.length > 0
        ? preferences.targetMuscles
        : ['Chest', 'Back', 'Legs'];
      const targetCount = targetMuscles.length === 1 ? 7 : Math.min(8, Math.max(6, targetMuscles.length * 2));

      const exercises = selectExercisesForWorkout(
        targetMuscles, preferences.equipment, preferences.experience, preferences.goal, targetCount
      );
      const estimatedCalories = exercises.reduce((sum, ex) => sum + (ex.caloriesPerSet * ex.sets), 0);

      setWorkoutPlan({
        title: `${preferences.goal.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Workout`,
        duration: parseInt(preferences.duration),
        difficulty: preferences.experience,
        targetMuscles,
        exercises,
        estimatedCalories,
      });
      setCompletedExercises(new Set());
      setExpandedIdx(null);
      toast({ title: "Workout Ready! 🏋️", description: `${exercises.length} exercises targeting ${targetMuscles.join(', ')}.` });
    } catch {
      toast({ title: "Error", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const toggleExercise = (name: string) => {
    setCompletedExercises(prev => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const handleMuscleToggle = (muscle: string) => {
    setPreferences(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.includes(muscle)
        ? prev.targetMuscles.filter(m => m !== muscle)
        : [...prev.targetMuscles, muscle]
    }));
  };

  const handleSaveWorkout = async () => {
    if (!workoutPlan) return;
    setSavingWorkout(true);
    try {
      await logWorkout({
        workout_name: workoutPlan.title,
        exercises: workoutPlan.exercises.map(e => ({
          name: e.name, sets: e.sets, reps: e.reps,
          muscle: e.muscle, completed: completedExercises.has(e.name),
        })),
        duration_minutes: workoutPlan.duration,
        muscle_groups: workoutPlan.targetMuscles,
        notes: `Completed ${completedExercises.size}/${workoutPlan.exercises.length} exercises`,
      });
      toast({ title: "Workout Saved! 💾", description: "Logged to your history." });
    } catch {
      toast({ title: "Saved locally", description: "Will sync when connected." });
    } finally {
      setSavingWorkout(false);
    }
  };

  const diffColor = (d: string) =>
    d === 'beginner' ? 'text-accent' : d === 'intermediate' ? 'text-primary' : 'text-destructive';

  const progress = workoutPlan ? (completedExercises.size / workoutPlan.exercises.length) * 100 : 0;

  return (
    <motion.div initial="initial" animate="animate" className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h2 className="text-[22px] font-bold text-foreground tracking-tight">Workout Generator</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">Create your perfect session</p>
      </motion.div>

      {!workoutPlan ? (
        <motion.div variants={fadeUp} className="space-y-5">
          {/* Equipment */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 block">Equipment</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {equipmentOptions.map(o => (
                <motion.button key={o.value} whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(p => ({ ...p, equipment: o.value }))}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-[12px] font-medium transition-all ${
                    preferences.equipment === o.value
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'border border-border/50 bg-card/50 text-muted-foreground'
                  }`}>
                  <span>{o.emoji}</span> {o.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 block">Goal</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {goalOptions.map(o => (
                <motion.button key={o.value} whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(p => ({ ...p, goal: o.value }))}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-[12px] font-medium transition-all ${
                    preferences.goal === o.value
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'border border-border/50 bg-card/50 text-muted-foreground'
                  }`}>
                  <span>{o.emoji}</span> {o.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 block">Duration</label>
            <div className="grid grid-cols-4 gap-2">
              {['30', '45', '60', '90'].map(d => (
                <motion.button key={d} whileTap={{ scale: 0.95 }}
                  onClick={() => setPreferences(p => ({ ...p, duration: d }))}
                  className={`py-3 rounded-2xl text-[13px] font-semibold transition-all ${
                    preferences.duration === d
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'border border-border/50 bg-card/50 text-muted-foreground'
                  }`}>
                  {d} min
                </motion.button>
              ))}
            </div>
          </div>

          {/* Muscle Groups */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 block">
              Muscles <span className="normal-case text-muted-foreground/60">(empty = full body)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {muscleGroups.map(m => (
                <motion.button key={m.id} whileTap={{ scale: 0.93 }}
                  onClick={() => handleMuscleToggle(m.id)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-2xl text-[11px] font-medium transition-all ${
                    preferences.targetMuscles.includes(m.id)
                      ? 'border-2 border-accent bg-accent/10 text-accent'
                      : 'border border-border/50 bg-card/50 text-muted-foreground'
                  }`}>
                  <span className="text-lg">{m.emoji}</span>
                  {m.id}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={generateWorkout}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent via-primary to-secondary text-secondary-foreground text-[15px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ boxShadow: '0 12px 30px -14px hsl(var(--accent) / 0.6)' }}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary-foreground/30 border-t-secondary-foreground" />
            ) : (
              <><Zap className="w-5 h-5" /> Generate Workout</>
            )}
          </motion.button>
        </motion.div>
      ) : (
        /* ======= GENERATED WORKOUT ======= */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Summary Card */}
            <div className="rounded-2xl p-5 border border-border/50" style={{ background: 'hsla(222, 40%, 6%, 0.7)', backdropFilter: 'blur(16px)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[17px] font-bold text-foreground">{workoutPlan.title}</h3>
                  <span className={`text-[11px] font-semibold uppercase ${diffColor(workoutPlan.difficulty)}`}>{workoutPlan.difficulty}</span>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setWorkoutPlan(null)}
                  className="px-3 py-1.5 rounded-full border border-border/50 text-[11px] font-medium text-muted-foreground active:bg-muted/40">
                  New
                </motion.button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { icon: Clock, value: `${workoutPlan.duration}`, sub: 'min', color: 'text-accent' },
                  { icon: Dumbbell, value: `${workoutPlan.exercises.length}`, sub: 'exercises', color: 'text-primary' },
                  { icon: Target, value: `${workoutPlan.targetMuscles.length}`, sub: 'groups', color: 'text-secondary' },
                  { icon: Flame, value: `${workoutPlan.estimatedCalories}`, sub: 'kcal', color: 'text-destructive' },
                ].map((s, i) => (
                  <div key={i} className="py-2">
                    <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                    <p className={`text-[16px] font-bold ${s.color} tabular-nums`}>{s.value}</p>
                    <p className="text-[9px] text-muted-foreground">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-muted-foreground font-medium">Progress</span>
                  <span className="text-[11px] text-accent font-semibold tabular-nums">{completedExercises.size}/{workoutPlan.exercises.length}</span>
                </div>
                <div className="h-[5px] bg-muted/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                  />
                </div>
              </div>

              {/* Muscle tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {workoutPlan.targetMuscles.map(m => (
                  <span key={m} className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/15 text-[10px] font-semibold text-accent">{m}</span>
                ))}
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-2">
              {workoutPlan.exercises.map((exercise, index) => {
                const done = completedExercises.has(exercise.name);
                const expanded = expandedIdx === index;
                return (
                  <motion.div
                    key={exercise.name + index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      done ? 'border-accent/40 bg-accent/5' : 'border-border/40 bg-card/50'
                    }`}
                    style={{ backdropFilter: 'blur(8px)' }}
                  >
                    <motion.button
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setExpandedIdx(expanded ? null : index)}
                      className="w-full flex items-center gap-3 p-4"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[13px] font-bold flex-shrink-0 ${
                        done ? 'bg-accent text-secondary-foreground' : 'bg-muted/60 text-muted-foreground'
                      }`}>
                        {done ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className={`text-[13px] font-semibold truncate ${done ? 'text-accent line-through' : 'text-foreground'}`}>{exercise.name}</p>
                        <p className="text-[11px] text-muted-foreground">{exercise.sets}×{exercise.reps} · {exercise.rest} rest</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0 space-y-3">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">{exercise.muscle}</span>
                              <span className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[10px] font-medium">{exercise.equipment}</span>
                              <span className={`px-2 py-0.5 rounded-full bg-muted/60 text-[10px] font-medium ${diffColor(exercise.difficulty)}`}>{exercise.difficulty}</span>
                            </div>
                            {exercise.secondaryMuscles.length > 0 && (
                              <p className="text-[11px] text-muted-foreground">Also works: {exercise.secondaryMuscles.join(', ')}</p>
                            )}
                            <p className="text-[12px] text-muted-foreground/80 leading-relaxed italic">{exercise.instructions}</p>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => { e.stopPropagation(); toggleExercise(exercise.name); }}
                              className={`w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all ${
                                done
                                  ? 'bg-muted/40 text-muted-foreground border border-border/40'
                                  : 'bg-accent text-secondary-foreground'
                              }`}
                            >
                              {done ? 'Undo' : '✓ Mark Complete'}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Save Workout */}
            {completedExercises.size > 0 && (
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSaveWorkout}
                disabled={savingWorkout}
                className="w-full h-13 rounded-2xl bg-gradient-to-r from-accent to-primary text-secondary-foreground text-[14px] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 py-3.5"
                style={{ boxShadow: '0 10px 24px -12px hsl(var(--accent) / 0.5)' }}
              >
                {savingWorkout ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary-foreground/30 border-t-secondary-foreground" />
                ) : (
                  <><Play className="w-4 h-4" /> Save Workout</>
                )}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
