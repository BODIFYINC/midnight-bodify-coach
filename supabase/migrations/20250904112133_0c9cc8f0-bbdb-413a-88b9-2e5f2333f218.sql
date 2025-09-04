-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  name TEXT,
  age INTEGER,
  height_cm REAL,
  weight_kg REAL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')),
  goal TEXT CHECK (goal IN ('lose_weight', 'maintain_weight', 'gain_weight', 'build_muscle', 'improve_fitness')),
  dietary_restrictions TEXT[], -- array of restrictions like ['vegetarian', 'gluten_free', 'dairy_free']
  disliked_foods TEXT[], -- array of foods user doesn't like
  target_calories INTEGER,
  target_protein REAL,
  target_carbs REAL,
  target_fat REAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meals table for real nutrition data
CREATE TABLE public.meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  calories_per_100g REAL NOT NULL,
  protein_per_100g REAL NOT NULL,
  carbs_per_100g REAL NOT NULL,
  fat_per_100g REAL NOT NULL,
  fiber_per_100g REAL,
  sugar_per_100g REAL,
  sodium_per_100g REAL,
  category TEXT CHECK (category IN ('breakfast', 'lunch', 'dinner', 'snack', 'drink')),
  tags TEXT[], -- ['high_protein', 'low_carb', 'vegetarian', etc.]
  ingredients TEXT[],
  preparation_time INTEGER, -- in minutes
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  image_url TEXT,
  recipe_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user meal logs for tracking
CREATE TABLE public.user_meal_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meal_id UUID REFERENCES public.meals(id) ON DELETE CASCADE,
  portion_size_grams REAL NOT NULL DEFAULT 100,
  calories_consumed REAL NOT NULL,
  protein_consumed REAL NOT NULL,
  carbs_consumed REAL NOT NULL,
  fat_consumed REAL NOT NULL,
  consumed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'))
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  muscle_groups TEXT[] NOT NULL, -- ['chest', 'shoulders', 'triceps']
  equipment TEXT[], -- ['dumbbells', 'barbell', 'bodyweight']
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  calories_per_minute REAL,
  instructions TEXT[],
  video_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout templates
CREATE TABLE public.workout_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  workout_type TEXT CHECK (workout_type IN ('strength', 'cardio', 'hiit', 'flexibility', 'sports')),
  target_muscles TEXT[], -- ['upper_body', 'lower_body', 'full_body', 'push', 'pull', 'legs']
  duration_minutes INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  exercises JSONB NOT NULL, -- array of {exercise_id, sets, reps, rest_seconds, weight}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user workout logs
CREATE TABLE public.user_workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workout_template_id UUID REFERENCES public.workout_templates(id),
  workout_name TEXT NOT NULL,
  exercises_completed JSONB NOT NULL,
  total_duration_minutes INTEGER,
  calories_burned REAL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create progress tracking table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  weight_kg REAL,
  body_fat_percentage REAL,
  muscle_mass_kg REAL,
  total_calories_consumed REAL DEFAULT 0,
  total_protein_consumed REAL DEFAULT 0,
  total_carbs_consumed REAL DEFAULT 0,
  total_fat_consumed REAL DEFAULT 0,
  total_calories_burned REAL DEFAULT 0,
  workout_count INTEGER DEFAULT 0,
  steps INTEGER DEFAULT 0,
  water_intake_ml REAL DEFAULT 0,
  sleep_hours REAL,
  notes TEXT,
  UNIQUE(user_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for meals (public read)
CREATE POLICY "Anyone can view meals" ON public.meals FOR SELECT USING (true);

-- Create RLS policies for user meal logs
CREATE POLICY "Users can manage their meal logs" ON public.user_meal_logs FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for exercises (public read)
CREATE POLICY "Anyone can view exercises" ON public.exercises FOR SELECT USING (true);

-- Create RLS policies for workout templates (public read)
CREATE POLICY "Anyone can view workout templates" ON public.workout_templates FOR SELECT USING (true);

-- Create RLS policies for user workout logs
CREATE POLICY "Users can manage their workout logs" ON public.user_workout_logs FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for user progress
CREATE POLICY "Users can manage their progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate daily nutrition targets based on user profile
CREATE OR REPLACE FUNCTION public.calculate_nutrition_targets(
  user_weight REAL,
  user_height REAL,
  user_age INTEGER,
  user_gender TEXT,
  user_activity_level TEXT,
  user_goal TEXT
)
RETURNS TABLE(
  calories INTEGER,
  protein REAL,
  carbs REAL,
  fat REAL
) AS $$
DECLARE
  bmr REAL;
  tdee REAL;
  activity_multiplier REAL;
  goal_modifier REAL;
BEGIN
  -- Calculate BMR using Mifflin-St Jeor Equation
  IF user_gender = 'male' THEN
    bmr := (10 * user_weight) + (6.25 * user_height) - (5 * user_age) + 5;
  ELSE
    bmr := (10 * user_weight) + (6.25 * user_height) - (5 * user_age) - 161;
  END IF;
  
  -- Apply activity level multiplier
  CASE user_activity_level
    WHEN 'sedentary' THEN activity_multiplier := 1.2;
    WHEN 'lightly_active' THEN activity_multiplier := 1.375;
    WHEN 'moderately_active' THEN activity_multiplier := 1.55;
    WHEN 'very_active' THEN activity_multiplier := 1.725;
    WHEN 'extremely_active' THEN activity_multiplier := 1.9;
    ELSE activity_multiplier := 1.375;
  END CASE;
  
  tdee := bmr * activity_multiplier;
  
  -- Apply goal modifier
  CASE user_goal
    WHEN 'lose_weight' THEN goal_modifier := 0.8; -- 20% deficit
    WHEN 'gain_weight' THEN goal_modifier := 1.15; -- 15% surplus
    WHEN 'build_muscle' THEN goal_modifier := 1.1; -- 10% surplus
    ELSE goal_modifier := 1.0; -- maintenance
  END CASE;
  
  calories := ROUND(tdee * goal_modifier);
  
  -- Calculate macros based on goal
  IF user_goal IN ('build_muscle', 'gain_weight') THEN
    protein := user_weight * 2.2; -- 2.2g per kg for muscle building
    fat := calories * 0.25 / 9; -- 25% of calories from fat
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  ELSIF user_goal = 'lose_weight' THEN
    protein := user_weight * 2.0; -- 2g per kg for weight loss
    fat := calories * 0.3 / 9; -- 30% of calories from fat
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  ELSE
    protein := user_weight * 1.6; -- 1.6g per kg for maintenance
    fat := calories * 0.3 / 9; -- 30% of calories from fat
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  END IF;
  
  RETURN QUERY SELECT calories::INTEGER, protein, carbs, fat;
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for user_progress table
ALTER TABLE public.user_progress REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_progress;

-- Enable realtime for user_meal_logs table
ALTER TABLE public.user_meal_logs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_meal_logs;

-- Enable realtime for user_workout_logs table
ALTER TABLE public.user_workout_logs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_workout_logs;