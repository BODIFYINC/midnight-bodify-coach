-- Fix security linter warnings by setting stable search_path for functions

-- update_updated_at_column with explicit search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- handle_new_user with SECURITY DEFINER and explicit search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- calculate_nutrition_targets with explicit search_path
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
  IF user_gender = 'male' THEN
    bmr := (10 * user_weight) + (6.25 * user_height) - (5 * user_age) + 5;
  ELSE
    bmr := (10 * user_weight) + (6.25 * user_height) - (5 * user_age) - 161;
  END IF;

  CASE user_activity_level
    WHEN 'sedentary' THEN activity_multiplier := 1.2;
    WHEN 'lightly_active' THEN activity_multiplier := 1.375;
    WHEN 'moderately_active' THEN activity_multiplier := 1.55;
    WHEN 'very_active' THEN activity_multiplier := 1.725;
    WHEN 'extremely_active' THEN activity_multiplier := 1.9;
    ELSE activity_multiplier := 1.375;
  END CASE;

  tdee := bmr * activity_multiplier;

  CASE user_goal
    WHEN 'lose_weight' THEN goal_modifier := 0.8;
    WHEN 'gain_weight' THEN goal_modifier := 1.15;
    WHEN 'build_muscle' THEN goal_modifier := 1.1;
    ELSE goal_modifier := 1.0;
  END CASE;

  calories := ROUND(tdee * goal_modifier);

  IF user_goal IN ('build_muscle', 'gain_weight') THEN
    protein := user_weight * 2.2;
    fat := calories * 0.25 / 9;
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  ELSIF user_goal = 'lose_weight' THEN
    protein := user_weight * 2.0;
    fat := calories * 0.3 / 9;
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  ELSE
    protein := user_weight * 1.6;
    fat := calories * 0.3 / 9;
    carbs := (calories - (protein * 4) - (fat * 9)) / 4;
  END IF;

  RETURN QUERY SELECT calories::INTEGER, protein, carbs, fat;
END;
$$ LANGUAGE plpgsql SET search_path = public;