import { supabase } from '@/integrations/supabase/client';

// Workout logging
export async function logWorkout(workout: {
  workout_name: string;
  exercises: any[];
  duration_minutes?: number;
  muscle_groups?: string[];
  notes?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('workout_logs').insert({
    user_id: user.id,
    ...workout,
  });
  if (error) throw error;
}

export async function getWorkoutLogs(limit = 30) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('workout_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to load workouts:', error);
    return [];
  }
  return data || [];
}

// Meal logging
export async function logMeal(meal: {
  meal_type: string;
  meal_name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  ingredients?: string[];
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('meal_logs').insert({
    user_id: user.id,
    ...meal,
  });
  if (error) throw error;
}

export async function getMealLogs(limit = 30) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('meal_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to load meals:', error);
    return [];
  }
  return data || [];
}

// Daily logs
export async function saveDailyLog(log: {
  water_ml?: number;
  sleep_hours?: number;
  weight?: number;
  mood?: string;
  notes?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const today = new Date().toISOString().split('T')[0];

  const { error } = await supabase.from('daily_logs').upsert({
    user_id: user.id,
    log_date: today,
    ...log,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,log_date' });

  if (error) throw error;
}

export async function getDailyLog(date?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const logDate = date || new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('log_date', logDate)
    .maybeSingle();

  if (error) {
    console.error('Failed to load daily log:', error);
    return null;
  }
  return data;
}
