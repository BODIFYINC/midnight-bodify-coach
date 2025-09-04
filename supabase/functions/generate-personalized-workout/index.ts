import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      user_id, 
      target_muscles, 
      duration_minutes, 
      difficulty_preference,
      equipment_available,
      workout_type = 'strength'
    } = await req.json();

    console.log('Generating workout for user:', user_id, 'target:', target_muscles, 'duration:', duration_minutes);

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return new Response(JSON.stringify({ error: 'User profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Determine difficulty based on user profile or preference
    let targetDifficulty = difficulty_preference;
    if (!targetDifficulty) {
      // Auto-determine based on activity level
      switch (profile.activity_level) {
        case 'sedentary':
        case 'lightly_active':
          targetDifficulty = 'beginner';
          break;
        case 'moderately_active':
          targetDifficulty = 'intermediate';
          break;
        case 'very_active':
        case 'extremely_active':
          targetDifficulty = 'advanced';
          break;
        default:
          targetDifficulty = 'beginner';
      }
    }

    // Get suitable exercises
    let exerciseQuery = supabase
      .from('exercises')
      .select('*');

    // Filter by equipment if specified
    if (equipment_available && equipment_available.length > 0) {
      exerciseQuery = exerciseQuery.overlaps('equipment', equipment_available);
    } else {
      // Default to bodyweight exercises if no equipment specified
      exerciseQuery = exerciseQuery.contains('equipment', ['bodyweight']);
    }

    const { data: allExercises, error: exercisesError } = await exerciseQuery;

    if (exercisesError) {
      console.error('Exercises error:', exercisesError);
      return new Response(JSON.stringify({ error: 'Failed to fetch exercises' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Filter exercises based on target muscles and difficulty
    let filteredExercises = allExercises.filter(exercise => {
      // Check difficulty
      const difficultyMatch = exercise.difficulty === targetDifficulty || 
        (targetDifficulty === 'intermediate' && exercise.difficulty === 'beginner');
      
      // Check muscle groups
      let muscleMatch = false;
      if (target_muscles === 'full_body') {
        muscleMatch = true;
      } else if (target_muscles === 'upper_body') {
        muscleMatch = exercise.muscle_groups.some(muscle => 
          ['chest', 'shoulders', 'triceps', 'back', 'biceps', 'core'].includes(muscle)
        );
      } else if (target_muscles === 'lower_body') {
        muscleMatch = exercise.muscle_groups.some(muscle => 
          ['quadriceps', 'glutes', 'hamstrings', 'calves'].includes(muscle)
        );
      } else if (target_muscles === 'push') {
        muscleMatch = exercise.muscle_groups.some(muscle => 
          ['chest', 'shoulders', 'triceps'].includes(muscle)
        );
      } else if (target_muscles === 'pull') {
        muscleMatch = exercise.muscle_groups.some(muscle => 
          ['back', 'biceps', 'rhomboids'].includes(muscle)
        );
      } else if (target_muscles === 'legs') {
        muscleMatch = exercise.muscle_groups.some(muscle => 
          ['quadriceps', 'glutes', 'hamstrings', 'calves'].includes(muscle)
        );
      } else {
        // Random or specific muscle group
        muscleMatch = target_muscles === 'random' || 
          exercise.muscle_groups.includes(target_muscles);
      }

      return difficultyMatch && muscleMatch;
    });

    if (filteredExercises.length === 0) {
      // Fallback to any exercises if none match criteria
      filteredExercises = allExercises.filter(ex => ex.difficulty === 'beginner').slice(0, 10);
    }

    // Generate workout based on duration
    const workoutExercises = generateWorkoutPlan(filteredExercises, duration_minutes, workout_type, profile.goal);

    // Calculate total calories burned
    const totalCaloriesBurned = workoutExercises.reduce((total, exercise) => {
      const exerciseData = filteredExercises.find(ex => ex.name === exercise.exercise_name);
      if (exerciseData && exerciseData.calories_per_minute) {
        const estimatedMinutes = workout_type === 'hiit' ? 
          (exercise.sets * 0.5) : (exercise.sets * 1.5); // Rough estimate
        return total + (exerciseData.calories_per_minute * estimatedMinutes);
      }
      return total;
    }, 0);

    const workoutPlan = {
      id: crypto.randomUUID(),
      name: generateWorkoutName(target_muscles, workout_type),
      description: `Personalized ${target_muscles} ${workout_type} workout`,
      workout_type: workout_type,
      target_muscles: [target_muscles],
      duration_minutes: duration_minutes,
      difficulty: targetDifficulty,
      exercises: workoutExercises,
      estimated_calories_burned: Math.round(totalCaloriesBurned),
      created_for_user: user_id
    };

    console.log('Generated workout plan with', workoutExercises.length, 'exercises');

    return new Response(JSON.stringify({
      workout: workoutPlan,
      available_exercises: filteredExercises.length,
      user_level: targetDifficulty
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-personalized-workout:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateWorkoutPlan(exercises: any[], durationMinutes: number, workoutType: string, userGoal: string) {
  const workoutExercises = [];
  
  // Calculate number of exercises based on duration
  let numExercises = Math.floor(durationMinutes / 8); // ~8 minutes per exercise on average
  numExercises = Math.max(3, Math.min(numExercises, exercises.length, 8)); // Between 3-8 exercises

  // Shuffle and select exercises
  const selectedExercises = shuffleArray([...exercises]).slice(0, numExercises);

  selectedExercises.forEach((exercise, index) => {
    let sets, reps, restSeconds;

    if (workoutType === 'hiit') {
      sets = 3;
      reps = '30 seconds';
      restSeconds = 30;
    } else if (workoutType === 'strength') {
      if (userGoal === 'build_muscle') {
        sets = 4;
        reps = exercise.difficulty === 'beginner' ? '12-15' : '8-12';
        restSeconds = 90;
      } else if (userGoal === 'lose_weight') {
        sets = 3;
        reps = '15-20';
        restSeconds = 60;
      } else {
        sets = 3;
        reps = '10-15';
        restSeconds = 60;
      }
    } else {
      sets = 3;
      reps = '12-15';
      restSeconds = 60;
    }

    workoutExercises.push({
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      sets: sets,
      reps: reps,
      rest_seconds: restSeconds,
      instructions: exercise.instructions,
      muscle_groups: exercise.muscle_groups,
      order: index + 1
    });
  });

  return workoutExercises;
}

function generateWorkoutName(targetMuscles: string, workoutType: string): string {
  const muscleNames = {
    'full_body': 'Full Body',
    'upper_body': 'Upper Body',
    'lower_body': 'Lower Body',
    'push': 'Push',
    'pull': 'Pull',
    'legs': 'Legs',
    'random': 'Mixed'
  };

  const workoutNames = {
    'strength': 'Strength',
    'hiit': 'HIIT',
    'cardio': 'Cardio',
    'flexibility': 'Flexibility'
  };

  return `${muscleNames[targetMuscles] || 'Custom'} ${workoutNames[workoutType] || 'Workout'}`;
}

function shuffleArray(array: any[]): any[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}