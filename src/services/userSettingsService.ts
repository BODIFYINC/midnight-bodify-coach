import { supabase } from '@/integrations/supabase/client';

export interface UserSettings {
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
  activity_level?: string;
  goal?: string;
  dietary_restrictions?: string[];
  allergies?: string[];
  disliked_foods?: string[];
  favorite_ingredients?: string[];
  cooking_time?: string;
  skill_level?: string;
  onboarding_completed?: boolean;
}

export async function saveUserSettings(settings: UserSettings) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: user.id,
      ...settings,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) throw error;
}

export async function getUserSettings(): Promise<UserSettings | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
  return data as UserSettings | null;
}

export async function hasCompletedOnboardingDB(): Promise<boolean> {
  const settings = await getUserSettings();
  return settings?.onboarding_completed === true;
}
