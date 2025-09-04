-- Insert sample meals with real nutrition data
INSERT INTO public.meals (name, description, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, category, tags, ingredients, preparation_time, difficulty, recipe_instructions) VALUES 
('Grilled Chicken Breast', 'Lean protein source perfect for muscle building', 165, 31, 0, 3.6, 0, 'lunch', ARRAY['high_protein', 'low_carb', 'gluten_free'], ARRAY['chicken breast', 'olive oil', 'salt', 'pepper'], 15, 'easy', 'Season chicken with salt and pepper. Grill for 6-8 minutes per side until cooked through.'),
('Brown Rice', 'Complex carbohydrate for sustained energy', 111, 2.6, 23, 0.9, 1.8, 'lunch', ARRAY['whole_grain', 'vegan'], ARRAY['brown rice', 'water', 'salt'], 45, 'easy', 'Rinse rice, add to boiling water with salt. Simmer covered for 45 minutes.'),
('Salmon Fillet', 'Rich in omega-3 fatty acids and high-quality protein', 208, 20, 0, 13, 0, 'dinner', ARRAY['high_protein', 'omega_3', 'keto'], ARRAY['salmon fillet', 'lemon', 'herbs'], 20, 'medium', 'Season salmon and bake at 400°F for 12-15 minutes.'),
('Greek Yogurt', 'High protein dairy with probiotics', 59, 10, 3.6, 0.4, 0, 'breakfast', ARRAY['high_protein', 'probiotic', 'vegetarian'], ARRAY['greek yogurt'], 0, 'easy', 'Serve chilled as is or with toppings.'),
('Quinoa', 'Complete protein grain alternative', 120, 4.4, 22, 1.9, 2.8, 'lunch', ARRAY['complete_protein', 'gluten_free', 'vegan'], ARRAY['quinoa', 'water', 'salt'], 15, 'easy', 'Rinse quinoa, boil in water for 15 minutes until fluffy.'),
('Eggs', 'Complete protein with all essential amino acids', 155, 13, 1.1, 11, 0, 'breakfast', ARRAY['complete_protein', 'vegetarian'], ARRAY['eggs'], 5, 'easy', 'Cook as scrambled, boiled, or fried to preference.'),
('Sweet Potato', 'Complex carbs with vitamins and minerals', 86, 1.6, 20, 0.1, 3, 'lunch', ARRAY['complex_carbs', 'vitamin_a', 'vegan'], ARRAY['sweet potato'], 45, 'easy', 'Bake whole at 425°F for 45 minutes or until tender.'),
('Broccoli', 'Nutrient-dense vegetable with fiber', 34, 2.8, 7, 0.4, 2.6, 'lunch', ARRAY['high_fiber', 'vitamin_c', 'vegan'], ARRAY['broccoli'], 10, 'easy', 'Steam for 5-7 minutes or stir-fry until tender-crisp.'),
('Almonds', 'Healthy fats and protein for snacking', 579, 21, 22, 50, 12, 'snack', ARRAY['healthy_fats', 'protein', 'keto'], ARRAY['raw almonds'], 0, 'easy', 'Eat raw or lightly toasted for enhanced flavor.'),
('Oatmeal', 'Fiber-rich breakfast grain', 68, 2.4, 12, 1.4, 1.7, 'breakfast', ARRAY['fiber', 'whole_grain', 'vegan'], ARRAY['rolled oats', 'water', 'salt'], 10, 'easy', 'Cook oats in water or milk for 5-10 minutes, stirring frequently.'),
('Tuna', 'Lean fish high in protein', 144, 30, 0, 0.6, 0, 'lunch', ARRAY['high_protein', 'low_fat', 'omega_3'], ARRAY['tuna fillet'], 10, 'easy', 'Grill or sear tuna for 2-3 minutes per side for medium-rare.'),
('Avocado', 'Healthy monounsaturated fats', 160, 2, 9, 15, 7, 'snack', ARRAY['healthy_fats', 'fiber', 'keto'], ARRAY['avocado'], 0, 'easy', 'Slice and serve fresh, or mash for guacamole.'),
('Black Beans', 'Plant-based protein and fiber', 132, 8.9, 23, 0.5, 8.7, 'lunch', ARRAY['plant_protein', 'fiber', 'vegan'], ARRAY['black beans'], 60, 'easy', 'Soak overnight, then simmer for 60-90 minutes until tender.'),
('Spinach', 'Iron-rich leafy green', 23, 2.9, 3.6, 0.4, 2.2, 'lunch', ARRAY['iron', 'folate', 'vegan'], ARRAY['fresh spinach'], 2, 'easy', 'Use fresh in salads or sauté briefly until wilted.'),
('Cottage Cheese', 'High protein, low fat dairy', 98, 11, 3.4, 4.3, 0, 'snack', ARRAY['high_protein', 'low_fat', 'vegetarian'], ARRAY['cottage cheese'], 0, 'easy', 'Serve chilled, optionally with fruit or nuts.');

-- Insert sample exercises
INSERT INTO public.exercises (name, description, muscle_groups, equipment, difficulty, calories_per_minute, instructions) VALUES 
('Push-ups', 'Bodyweight chest and arm exercise', ARRAY['chest', 'shoulders', 'triceps', 'core'], ARRAY['bodyweight'], 'beginner', 8, ARRAY['Start in plank position', 'Lower chest to floor', 'Push back up', 'Keep core tight throughout']),
('Squats', 'Fundamental lower body exercise', ARRAY['quadriceps', 'glutes', 'hamstrings', 'calves'], ARRAY['bodyweight'], 'beginner', 10, ARRAY['Stand with feet hip-width apart', 'Lower hips back and down', 'Keep chest up', 'Drive through heels to stand']),
('Pull-ups', 'Upper body pulling exercise', ARRAY['back', 'biceps', 'shoulders'], ARRAY['pull_up_bar'], 'intermediate', 12, ARRAY['Hang from bar with arms extended', 'Pull body up until chin over bar', 'Lower with control', 'Keep core engaged']),
('Deadlifts', 'Compound posterior chain exercise', ARRAY['hamstrings', 'glutes', 'back', 'traps'], ARRAY['barbell'], 'advanced', 15, ARRAY['Stand with feet hip-width apart', 'Hinge at hips to grab bar', 'Drive through heels to stand tall', 'Keep bar close to body']),
('Planks', 'Core stability exercise', ARRAY['core', 'shoulders'], ARRAY['bodyweight'], 'beginner', 5, ARRAY['Start in push-up position on forearms', 'Keep body in straight line', 'Engage core muscles', 'Hold position']),
('Lunges', 'Single-leg lower body exercise', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 9, ARRAY['Step forward into lunge position', 'Lower back knee toward ground', 'Push through front heel to return', 'Alternate legs']),
('Bench Press', 'Chest pressing movement', ARRAY['chest', 'shoulders', 'triceps'], ARRAY['barbell', 'bench'], 'intermediate', 12, ARRAY['Lie on bench with feet flat', 'Grip bar slightly wider than shoulders', 'Lower bar to chest', 'Press up explosively']),
('Rows', 'Back pulling exercise', ARRAY['back', 'biceps', 'rhomboids'], ARRAY['dumbbells'], 'intermediate', 10, ARRAY['Hinge at hips with slight knee bend', 'Pull weights to ribcage', 'Squeeze shoulder blades', 'Lower with control']),
('Burpees', 'Full body conditioning exercise', ARRAY['full_body'], ARRAY['bodyweight'], 'advanced', 18, ARRAY['Start standing', 'Drop to push-up position', 'Perform push-up', 'Jump feet to hands', 'Jump up with arms overhead']),
('Mountain Climbers', 'Cardio and core exercise', ARRAY['core', 'shoulders', 'legs'], ARRAY['bodyweight'], 'intermediate', 14, ARRAY['Start in plank position', 'Alternate bringing knees to chest', 'Keep hips level', 'Maintain rapid pace']),
('Shoulder Press', 'Overhead pressing movement', ARRAY['shoulders', 'triceps', 'core'], ARRAY['dumbbells'], 'intermediate', 8, ARRAY['Hold weights at shoulder height', 'Press weights overhead', 'Lower with control', 'Keep core engaged']),
('Dips', 'Tricep and chest exercise', ARRAY['triceps', 'chest', 'shoulders'], ARRAY['dip_bars'], 'intermediate', 11, ARRAY['Support body on dip bars', 'Lower body by bending arms', 'Push back up to start', 'Keep elbows close to body']),
('Hip Thrusts', 'Glute strengthening exercise', ARRAY['glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 7, ARRAY['Lie with upper back on bench', 'Place feet flat on floor', 'Drive hips up squeezing glutes', 'Lower with control']),
('Russian Twists', 'Rotational core exercise', ARRAY['core', 'obliques'], ARRAY['bodyweight'], 'beginner', 6, ARRAY['Sit with knees bent', 'Lean back slightly', 'Rotate torso side to side', 'Keep feet off ground for difficulty']),
('Jump Squats', 'Plyometric lower body exercise', ARRAY['quadriceps', 'glutes', 'calves'], ARRAY['bodyweight'], 'intermediate', 16, ARRAY['Perform regular squat', 'Explode up into jump', 'Land softly back in squat', 'Maintain good form throughout']);

-- Insert sample workout templates
INSERT INTO public.workout_templates (name, description, workout_type, target_muscles, duration_minutes, difficulty, exercises) VALUES 
('Upper Body Strength', 'Build upper body muscle and strength', 'strength', ARRAY['upper_body'], 45, 'intermediate', 
'[
  {"exercise_id": null, "exercise_name": "Push-ups", "sets": 3, "reps": "12-15", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Pull-ups", "sets": 3, "reps": "8-10", "rest_seconds": 90},
  {"exercise_id": null, "exercise_name": "Shoulder Press", "sets": 3, "reps": "10-12", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Rows", "sets": 3, "reps": "12-15", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Dips", "sets": 3, "reps": "8-12", "rest_seconds": 90}
]'::jsonb),

('Lower Body Power', 'Explosive lower body workout', 'strength', ARRAY['lower_body'], 40, 'intermediate',
'[
  {"exercise_id": null, "exercise_name": "Squats", "sets": 4, "reps": "15-20", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Deadlifts", "sets": 3, "reps": "8-10", "rest_seconds": 120},
  {"exercise_id": null, "exercise_name": "Lunges", "sets": 3, "reps": "12 each leg", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Jump Squats", "sets": 3, "reps": "10-15", "rest_seconds": 90},
  {"exercise_id": null, "exercise_name": "Hip Thrusts", "sets": 3, "reps": "15-20", "rest_seconds": 60}
]'::jsonb),

('HIIT Cardio Blast', 'High intensity interval training', 'hiit', ARRAY['full_body'], 30, 'advanced',
'[
  {"exercise_id": null, "exercise_name": "Burpees", "sets": 4, "reps": "30 seconds", "rest_seconds": 30},
  {"exercise_id": null, "exercise_name": "Mountain Climbers", "sets": 4, "reps": "30 seconds", "rest_seconds": 30},
  {"exercise_id": null, "exercise_name": "Jump Squats", "sets": 4, "reps": "30 seconds", "rest_seconds": 30},
  {"exercise_id": null, "exercise_name": "Push-ups", "sets": 4, "reps": "30 seconds", "rest_seconds": 30},
  {"exercise_id": null, "exercise_name": "Russian Twists", "sets": 4, "reps": "30 seconds", "rest_seconds": 30}
]'::jsonb),

('Push Day', 'Upper body pushing muscles', 'strength', ARRAY['push'], 50, 'intermediate',
'[
  {"exercise_id": null, "exercise_name": "Bench Press", "sets": 4, "reps": "8-10", "rest_seconds": 120},
  {"exercise_id": null, "exercise_name": "Shoulder Press", "sets": 3, "reps": "10-12", "rest_seconds": 90},
  {"exercise_id": null, "exercise_name": "Push-ups", "sets": 3, "reps": "12-15", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Dips", "sets": 3, "reps": "10-12", "rest_seconds": 90},
  {"exercise_id": null, "exercise_name": "Planks", "sets": 3, "reps": "45-60 seconds", "rest_seconds": 60}
]'::jsonb),

('Pull Day', 'Upper body pulling muscles', 'strength', ARRAY['pull'], 45, 'intermediate',
'[
  {"exercise_id": null, "exercise_name": "Pull-ups", "sets": 4, "reps": "6-10", "rest_seconds": 120},
  {"exercise_id": null, "exercise_name": "Rows", "sets": 4, "reps": "10-12", "rest_seconds": 90},
  {"exercise_id": null, "exercise_name": "Deadlifts", "sets": 3, "reps": "8-10", "rest_seconds": 120},
  {"exercise_id": null, "exercise_name": "Russian Twists", "sets": 3, "reps": "20-30", "rest_seconds": 60}
]'::jsonb),

('Full Body Beginner', 'Complete beginner-friendly workout', 'strength', ARRAY['full_body'], 35, 'beginner',
'[
  {"exercise_id": null, "exercise_name": "Squats", "sets": 3, "reps": "10-15", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Push-ups", "sets": 3, "reps": "8-12", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Lunges", "sets": 3, "reps": "10 each leg", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Planks", "sets": 3, "reps": "30-45 seconds", "rest_seconds": 60},
  {"exercise_id": null, "exercise_name": "Hip Thrusts", "sets": 3, "reps": "12-15", "rest_seconds": 60}
]'::jsonb);