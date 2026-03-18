// Comprehensive exercise database with accurate data
// All exercises sourced from exercise science literature

export interface ExerciseEntry {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscle: string;
  secondaryMuscles: string[];
  equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight' | 'kettlebell' | 'bands';
  gymRequired: boolean; // true = needs gym equipment
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesPerSet: number; // estimated calories burned per set
  instructions: string;
}

export const exerciseDatabase: Record<string, ExerciseEntry[]> = {
  chest: [
    // GYM EXERCISES
    { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '2-3 min', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Lie flat, grip slightly wider than shoulder width, lower bar to mid-chest, press up explosively.' },
    { name: 'Incline Barbell Bench Press', sets: 4, reps: '8-10', rest: '2-3 min', muscle: 'Chest', secondaryMuscles: ['Front Delts', 'Triceps'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Set bench to 30-45°, grip shoulder width, lower to upper chest, press up.' },
    { name: 'Decline Barbell Bench Press', sets: 3, reps: '8-12', rest: '2 min', muscle: 'Chest', secondaryMuscles: ['Triceps'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Set bench to -15°, grip shoulder width, lower to lower chest, press up.' },
    { name: 'Dumbbell Bench Press', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 7, instructions: 'Lie flat with dumbbells at chest level, press up while squeezing chest, lower with control.' },
    { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts', 'Triceps'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 7, instructions: 'Set bench to 30-45°, press dumbbells up from chest level, squeeze at top.' },
    { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Lie flat, arms extended with slight bend, lower dumbbells in arc to sides, squeeze back up.' },
    { name: 'Incline Dumbbell Flyes', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Incline bench 30-45°, perform fly motion targeting upper chest.' },
    { name: 'Cable Crossovers', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'cable', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Stand between cable stations, bring handles together in front of chest in arc motion.' },
    { name: 'Low Cable Flyes', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'cable', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Set cables low, bring handles up and together targeting upper chest.' },
    { name: 'Machine Chest Press', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Chest', secondaryMuscles: ['Triceps'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Sit with back flat, grip handles at chest level, press forward, control the return.' },
    { name: 'Pec Deck Machine', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Sit with arms on pads, squeeze arms together in front, control the return.' },
    // BODYWEIGHT EXERCISES
    { name: 'Push-ups', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hands shoulder width, lower chest to floor, push up. Keep core tight.' },
    { name: 'Incline Push-ups', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Hands on elevated surface, perform push-up. Easier variation for beginners.' },
    { name: 'Decline Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts', 'Triceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Feet elevated on bench/step, hands on floor. Targets upper chest more.' },
    { name: 'Diamond Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Triceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Hands together forming diamond shape, push up. Heavy tricep and inner chest emphasis.' },
    { name: 'Wide Push-ups', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Chest', secondaryMuscles: ['Front Delts'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hands wider than shoulder width. Greater chest stretch and activation.' },
    { name: 'Archer Push-ups', sets: 3, reps: '6-8/side', rest: '90 sec', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 7, instructions: 'Wide stance, shift weight to one arm while extending the other. Unilateral chest work.' },
    { name: 'Explosive Push-ups', sets: 3, reps: '8-12', rest: '90 sec', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 8, instructions: 'Push up explosively so hands leave the ground. Builds power.' },
  ],

  back: [
    // GYM EXERCISES
    { name: 'Barbell Deadlift', sets: 4, reps: '5-8', rest: '3-4 min', muscle: 'Back', secondaryMuscles: ['Hamstrings', 'Glutes', 'Core', 'Traps'], equipment: 'barbell', gymRequired: true, difficulty: 'advanced', caloriesPerSet: 12, instructions: 'Stand over bar, hip-width stance, hinge at hips, grip bar, drive through heels, lock out hips.' },
    { name: 'Barbell Bent-Over Row', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Hinge at hips 45°, pull bar to lower chest, squeeze shoulder blades, lower with control.' },
    { name: 'Pendlay Row', sets: 4, reps: '6-8', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'barbell', gymRequired: true, difficulty: 'advanced', caloriesPerSet: 9, instructions: 'Bar starts on floor each rep. Explosive pull to lower chest, controlled lower.' },
    { name: 'Dumbbell Single-Arm Row', sets: 3, reps: '10-12/side', rest: '60 sec', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'One knee on bench, row dumbbell to hip, squeeze lat at top.' },
    { name: 'Lat Pulldown', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Wide grip, pull bar to upper chest, squeeze lats, control the return.' },
    { name: 'Close-Grip Lat Pulldown', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Back', secondaryMuscles: ['Biceps'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'V-bar attachment, pull to chest, focus on squeezing lower lats.' },
    { name: 'Seated Cable Row', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Sit upright, pull handle to lower chest, squeeze shoulder blades together.' },
    { name: 'T-Bar Row', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Straddle the bar, pull to chest with close grip, squeeze back.' },
    { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Back', secondaryMuscles: ['Rear Delts', 'Rotator Cuff'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Cable at face height, pull rope to face with elbows high, squeeze rear delts.' },
    { name: 'Machine Row', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Back', secondaryMuscles: ['Biceps'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Chest against pad, pull handles back, squeeze shoulder blades.' },
    { name: 'Rack Pulls', sets: 3, reps: '6-8', rest: '2-3 min', muscle: 'Back', secondaryMuscles: ['Traps', 'Glutes'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 10, instructions: 'Bar at knee height in rack, deadlift from this position. Focuses on upper back.' },
    // BODYWEIGHT EXERCISES
    { name: 'Pull-ups', sets: 3, reps: '6-10', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Overhand grip, pull chin over bar, control the descent. King of back exercises.' },
    { name: 'Chin-ups', sets: 3, reps: '6-10', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Underhand grip, pull chin over bar. More bicep involvement than pull-ups.' },
    { name: 'Inverted Rows', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hang under a bar/table, pull chest to bar, keep body straight.' },
    { name: 'Superman Hold', sets: 3, reps: '15-20', rest: '45 sec', muscle: 'Back', secondaryMuscles: ['Glutes', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Lie face down, lift arms and legs simultaneously, hold 2-3 seconds at top.' },
    { name: 'Reverse Snow Angels', sets: 3, reps: '12-15', rest: '45 sec', muscle: 'Back', secondaryMuscles: ['Rear Delts'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Lie face down, sweep arms from sides to overhead keeping them off the floor.' },
    { name: 'Wide-Grip Pull-ups', sets: 3, reps: '5-8', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 8, instructions: 'Extra wide overhand grip, pull up focusing on lat width.' },
    { name: 'Commando Pull-ups', sets: 3, reps: '6-8/side', rest: '2 min', muscle: 'Back', secondaryMuscles: ['Biceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 8, instructions: 'Perpendicular to bar, alternating head to each side of bar.' },
  ],

  shoulders: [
    // GYM EXERCISES
    { name: 'Overhead Barbell Press', sets: 4, reps: '6-8', rest: '2-3 min', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Core'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Standing, press bar from front shoulders overhead, lock out, lower with control.' },
    { name: 'Seated Dumbbell Shoulder Press', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Shoulders', secondaryMuscles: ['Triceps'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 7, instructions: 'Sit upright, press dumbbells from shoulder height overhead, lower slowly.' },
    { name: 'Arnold Press', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Front Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Start with palms facing you, rotate outward as you press up. Hits all three delt heads.' },
    { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: [], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Arms at sides, raise dumbbells to shoulder height with slight bend in elbows, lower slowly.' },
    { name: 'Front Raises', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Front Delts'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Raise dumbbells in front to shoulder height, one arm or both, lower with control.' },
    { name: 'Rear Delt Flyes', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Rear Delts', 'Upper Back'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Bent over, raise dumbbells to sides targeting rear delts. Essential for shoulder balance.' },
    { name: 'Cable Lateral Raises', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: [], equipment: 'cable', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Cable behind you, raise arm to side. Constant tension throughout range of motion.' },
    { name: 'Machine Shoulder Press', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Shoulders', secondaryMuscles: ['Triceps'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Sit with back supported, press handles overhead, lower with control.' },
    { name: 'Upright Rows', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Traps'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Narrow grip, pull bar up to chin level, elbows high. Use moderate weight to protect shoulders.' },
    { name: 'Barbell Shrugs', sets: 4, reps: '12-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Traps'], equipment: 'barbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hold bar at waist, shrug shoulders up toward ears, squeeze at top 2 seconds.' },
    // BODYWEIGHT EXERCISES
    { name: 'Pike Push-ups', sets: 3, reps: '8-12', rest: '90 sec', muscle: 'Shoulders', secondaryMuscles: ['Triceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Hips high in inverted V, lower head toward floor, press back up. Mimics overhead press.' },
    { name: 'Elevated Pike Push-ups', sets: 3, reps: '6-10', rest: '90 sec', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 7, instructions: 'Feet elevated on box, pike position, push-up targeting shoulders.' },
    { name: 'Handstand Hold (Wall)', sets: 3, reps: '20-30 sec', rest: '90 sec', muscle: 'Shoulders', secondaryMuscles: ['Core', 'Triceps'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 5, instructions: 'Kick up against wall, hold handstand position. Builds tremendous shoulder strength.' },
    { name: 'Arm Circles', sets: 3, reps: '20/direction', rest: '30 sec', muscle: 'Shoulders', secondaryMuscles: [], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 2, instructions: 'Arms extended, make small then large circles. Great warm-up or finisher.' },
    { name: 'Prone Y Raises', sets: 3, reps: '12-15', rest: '45 sec', muscle: 'Shoulders', secondaryMuscles: ['Upper Back'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Lie face down, raise arms in Y position, squeeze upper back. Great for posture.' },
    { name: 'Bear Crawl', sets: 3, reps: '30 sec', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Core', 'Quads'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Crawl forward on hands and feet, knees hovering off ground. Full-body shoulder stability.' },
    { name: 'Hindu Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Shoulders', secondaryMuscles: ['Chest', 'Triceps', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Dive down and through from downward dog to cobra position. Dynamic shoulder builder.' },
  ],

  arms: [
    // GYM EXERCISES
    { name: 'Barbell Bicep Curl', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Forearms'], equipment: 'barbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Stand with bar at waist, curl up keeping elbows pinned, lower slowly (3 sec negative).' },
    { name: 'EZ-Bar Curl', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Forearms'], equipment: 'barbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Use EZ curl bar for better wrist position, curl with strict form.' },
    { name: 'Dumbbell Hammer Curls', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Brachialis', 'Forearms'], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Neutral grip (palms facing each other), curl up. Builds brachialis for arm thickness.' },
    { name: 'Preacher Curls', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Forearms'], equipment: 'dumbbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Arms on preacher bench, curl up, lower slowly. Eliminates momentum for strict bicep isolation.' },
    { name: 'Incline Dumbbell Curls', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Forearms'], equipment: 'dumbbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Recline on incline bench, curl dumbbells. Full stretch on bicep long head.' },
    { name: 'Cable Curls', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Forearms'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Low cable, curl bar up with constant tension throughout range.' },
    { name: 'Skull Crushers (Lying Tricep Extension)', sets: 3, reps: '10-12', rest: '90 sec', muscle: 'Arms', secondaryMuscles: [], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Lie flat, lower EZ bar to forehead by bending elbows only, press back up.' },
    { name: 'Tricep Rope Pushdown', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Arms', secondaryMuscles: [], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Cable with rope attachment, push down and spread rope at bottom, squeeze triceps.' },
    { name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: [], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Hold dumbbell overhead with both hands, lower behind head, press back up.' },
    { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', rest: '2 min', muscle: 'Arms', secondaryMuscles: ['Chest'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Grip narrower than shoulder width on bench, press up. Compound tricep movement.' },
    { name: 'Concentration Curls', sets: 3, reps: '10-12/arm', rest: '45 sec', muscle: 'Arms', secondaryMuscles: [], equipment: 'dumbbell', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Sit, elbow against inner thigh, curl dumbbell up, squeeze bicep peak.' },
    // BODYWEIGHT EXERCISES
    { name: 'Tricep Dips (Bench)', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Chest', 'Shoulders'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hands on bench behind you, lower body by bending elbows, press back up.' },
    { name: 'Diamond Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Chest'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Hands together in diamond shape, push up. Best bodyweight tricep exercise.' },
    { name: 'Close-Grip Push-ups', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Chest'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Hands narrower than shoulder width, push up. Emphasizes triceps.' },
    { name: 'Chin-up Hold (Isometric)', sets: 3, reps: '15-20 sec', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Back'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Pull chin over bar and hold at top position. Intense bicep isometric.' },
    { name: 'Bodyweight Tricep Extension', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Arms', secondaryMuscles: [], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Hands on elevated surface, lower forehead toward hands by bending elbows only.' },
    { name: 'Negative Chin-ups', sets: 3, reps: '5-8', rest: '90 sec', muscle: 'Arms', secondaryMuscles: ['Back'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Jump to top of chin-up, lower yourself as slowly as possible (5+ seconds).' },
    { name: 'Commando Push-ups', sets: 3, reps: '8-10', rest: '60 sec', muscle: 'Arms', secondaryMuscles: ['Core', 'Chest'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 6, instructions: 'Start in plank, go down to forearms one arm at a time, then back up.' },
  ],

  legs: [
    // GYM EXERCISES
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '2-3 min', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 12, instructions: 'Bar on upper traps, squat to parallel or below, drive through heels, chest up.' },
    { name: 'Front Squat', sets: 4, reps: '8-10', rest: '2-3 min', muscle: 'Legs', secondaryMuscles: ['Core', 'Quads'], equipment: 'barbell', gymRequired: true, difficulty: 'advanced', caloriesPerSet: 11, instructions: 'Bar on front delts, elbows high, squat deep. More quad-dominant than back squat.' },
    { name: 'Leg Press', sets: 4, reps: '10-12', rest: '2 min', muscle: 'Legs', secondaryMuscles: ['Glutes'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 9, instructions: 'Feet shoulder width on platform, lower to 90°, press up without locking knees.' },
    { name: 'Hack Squat', sets: 3, reps: '10-12', rest: '2 min', muscle: 'Legs', secondaryMuscles: ['Glutes'], equipment: 'machine', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 9, instructions: 'Shoulders under pads, squat down and press up. Great quad builder.' },
    { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Legs', secondaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 9, instructions: 'Slight knee bend, hinge at hips, lower bar along legs until hamstring stretch, return.' },
    { name: 'Leg Curl Machine', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Hamstrings'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Lie face down or sit depending on machine, curl legs, squeeze hamstrings.' },
    { name: 'Leg Extension', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Quads'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Sit in machine, extend legs fully, squeeze quads at top, lower slowly.' },
    { name: 'Walking Dumbbell Lunges', sets: 3, reps: '10/leg', rest: '90 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'], equipment: 'dumbbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Hold dumbbells, step forward into lunge, drive off front foot to next step.' },
    { name: 'Barbell Hip Thrust', sets: 4, reps: '10-12', rest: '2 min', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Upper back on bench, bar on hips, drive hips up, squeeze glutes at top.' },
    { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45 sec', muscle: 'Legs', secondaryMuscles: ['Calves'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Shoulders under pads, rise onto toes, lower slowly for full stretch.' },
    { name: 'Seated Calf Raises', sets: 3, reps: '15-20', rest: '45 sec', muscle: 'Legs', secondaryMuscles: ['Calves'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Pad on knees, rise onto toes, pause at top. Targets soleus muscle.' },
    // BODYWEIGHT EXERCISES
    { name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Feet shoulder width, squat to parallel, arms in front for balance, stand up.' },
    { name: 'Jump Squats', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Calves'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Squat down, explode up into a jump, land softly, repeat immediately.' },
    { name: 'Walking Lunges', sets: 3, reps: '12/leg', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Step forward into lunge, back knee nearly touches ground, drive to next step.' },
    { name: 'Bulgarian Split Squats', sets: 3, reps: '10/leg', rest: '90 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Rear foot elevated on bench, squat on front leg. Unilateral leg strength.' },
    { name: 'Pistol Squats', sets: 3, reps: '5-8/leg', rest: '90 sec', muscle: 'Legs', secondaryMuscles: ['Core', 'Glutes'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 8, instructions: 'Single-leg squat with other leg extended. Ultimate bodyweight leg exercise.' },
    { name: 'Wall Sit', sets: 3, reps: '30-60 sec', rest: '60 sec', muscle: 'Legs', secondaryMuscles: ['Quads'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Back against wall, slide down to 90° knee angle, hold position.' },
    { name: 'Glute Bridge', sets: 3, reps: '15-20', rest: '45 sec', muscle: 'Legs', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Lie on back, feet flat, drive hips up squeezing glutes at top.' },
    { name: 'Single-Leg Calf Raises', sets: 3, reps: '15/leg', rest: '30 sec', muscle: 'Legs', secondaryMuscles: ['Calves'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Stand on edge of step on one foot, rise up on toes, lower below step level.' },
  ],

  core: [
    // GYM EXERCISES
    { name: 'Cable Woodchops', sets: 3, reps: '12/side', rest: '60 sec', muscle: 'Core', secondaryMuscles: ['Obliques'], equipment: 'cable', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Cable high or low, rotate torso pulling handle diagonally across body.' },
    { name: 'Cable Crunches', sets: 3, reps: '15-20', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Abs'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Kneel at cable, rope behind head, crunch down contracting abs.' },
    { name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: '60 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'bodyweight', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Hang from bar, raise legs to 90° or higher, lower with control. No swinging.' },
    { name: 'Ab Wheel Rollouts', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Core', secondaryMuscles: ['Shoulders', 'Lats'], equipment: 'bodyweight', gymRequired: true, difficulty: 'advanced', caloriesPerSet: 6, instructions: 'Kneel, roll wheel out as far as possible, pull back using core.' },
    { name: 'Weighted Decline Sit-ups', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'machine', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Hold weight plate on chest, decline bench, sit up with controlled motion.' },
    // BODYWEIGHT EXERCISES
    { name: 'Plank', sets: 3, reps: '30-60 sec', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Shoulders', 'Glutes'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Forearms on floor, body straight line from head to heels, squeeze everything.' },
    { name: 'Side Plank', sets: 3, reps: '30-45 sec/side', rest: '30 sec', muscle: 'Core', secondaryMuscles: ['Obliques'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'On one forearm, stack feet, hips up, body straight line. Targets obliques.' },
    { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '30 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors', 'Shoulders'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 6, instructions: 'Push-up position, drive knees to chest alternating quickly.' },
    { name: 'Bicycle Crunches', sets: 3, reps: '20/side', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Obliques'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Lie on back, alternate elbow to opposite knee in cycling motion.' },
    { name: 'Leg Raises', sets: 3, reps: '12-15', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Lie flat, legs straight, raise to 90°, lower slowly without touching floor.' },
    { name: 'Russian Twists', sets: 3, reps: '20/side', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Obliques'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 4, instructions: 'Sit with torso at 45°, rotate side to side touching floor each side.' },
    { name: 'Dead Bug', sets: 3, reps: '10/side', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'Lie on back, extend opposite arm and leg while keeping lower back pressed to floor.' },
    { name: 'V-ups', sets: 3, reps: '10-15', rest: '45 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Lie flat, simultaneously raise torso and legs to form V shape, touch toes.' },
    { name: 'Flutter Kicks', sets: 3, reps: '30 sec', rest: '30 sec', muscle: 'Core', secondaryMuscles: ['Hip Flexors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Lie on back, legs slightly elevated, alternate small kicks. Keep lower back down.' },
  ],

  glutes: [
    // GYM EXERCISES
    { name: 'Barbell Hip Thrust', sets: 4, reps: '10-12', rest: '2 min', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Upper back on bench, bar on hips, drive hips up, squeeze glutes hard at top.' },
    { name: 'Cable Kickbacks', sets: 3, reps: '12-15/leg', rest: '45 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Ankle strap on cable, kick leg back squeezing glute at top.' },
    { name: 'Cable Pull-Through', sets: 3, reps: '12-15', rest: '60 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'cable', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Face away from cable, hinge at hips, pull rope through legs squeezing glutes.' },
    { name: 'Smith Machine Hip Thrust', sets: 4, reps: '10-12', rest: '90 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 7, instructions: 'Use Smith machine for stability, same hip thrust motion.' },
    { name: 'Sumo Deadlift', sets: 4, reps: '8-10', rest: '2 min', muscle: 'Glutes', secondaryMuscles: ['Inner Thighs', 'Hamstrings', 'Back'], equipment: 'barbell', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 10, instructions: 'Wide stance, toes out, grip inside legs, deadlift. More glute and inner thigh focus.' },
    // BODYWEIGHT EXERCISES
    { name: 'Glute Bridge', sets: 3, reps: '15-20', rest: '45 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 4, instructions: 'Lie on back, feet flat, drive hips up squeezing glutes at top.' },
    { name: 'Single-Leg Glute Bridge', sets: 3, reps: '12/leg', rest: '45 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'One leg extended, bridge up on the other leg. Unilateral glute strength.' },
    { name: 'Fire Hydrants', sets: 3, reps: '15/side', rest: '30 sec', muscle: 'Glutes', secondaryMuscles: ['Hip Abductors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'On all fours, raise bent knee out to the side, squeeze at top.' },
    { name: 'Donkey Kicks', sets: 3, reps: '15/leg', rest: '30 sec', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 3, instructions: 'On all fours, kick one leg up keeping knee bent at 90°, squeeze glute at top.' },
    { name: 'Clamshells', sets: 3, reps: '15/side', rest: '30 sec', muscle: 'Glutes', secondaryMuscles: ['Hip Abductors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 2, instructions: 'Lie on side, knees bent, open top knee like a clamshell. Targets gluteus medius.' },
    { name: 'Step-ups', sets: 3, reps: '12/leg', rest: '60 sec', muscle: 'Glutes', secondaryMuscles: ['Quads'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Step up onto elevated surface, drive through heel, step down controlled.' },
    { name: 'Sumo Squats', sets: 3, reps: '15-20', rest: '60 sec', muscle: 'Glutes', secondaryMuscles: ['Inner Thighs', 'Quads'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 5, instructions: 'Wide stance, toes pointed out, squat deep targeting glutes and inner thighs.' },
    { name: 'Curtsy Lunges', sets: 3, reps: '10/leg', rest: '60 sec', muscle: 'Glutes', secondaryMuscles: ['Quads'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 5, instructions: 'Step back and across behind other leg, lunge down. Targets gluteus medius.' },
  ],

  cardio: [
    { name: 'Jumping Jacks', sets: 3, reps: '45 sec', rest: '15 sec', muscle: 'Cardio', secondaryMuscles: ['Full Body'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 8, instructions: 'Jump feet out while raising arms overhead, jump back. Classic full-body cardio.' },
    { name: 'Burpees', sets: 3, reps: '10-12', rest: '30 sec', muscle: 'Cardio', secondaryMuscles: ['Full Body'], equipment: 'bodyweight', gymRequired: false, difficulty: 'advanced', caloriesPerSet: 12, instructions: 'Squat, jump feet back to plank, push-up, jump feet forward, explode up.' },
    { name: 'High Knees', sets: 3, reps: '30 sec', rest: '15 sec', muscle: 'Cardio', secondaryMuscles: ['Core', 'Hip Flexors'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 7, instructions: 'Run in place driving knees as high as possible. Quick pace.' },
    { name: 'Box Jumps', sets: 3, reps: '10-12', rest: '60 sec', muscle: 'Cardio', secondaryMuscles: ['Legs', 'Glutes'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 8, instructions: 'Jump onto elevated platform, land softly with both feet, step down.' },
    { name: 'Jump Rope (Imaginary or Real)', sets: 3, reps: '60 sec', rest: '30 sec', muscle: 'Cardio', secondaryMuscles: ['Calves', 'Shoulders'], equipment: 'bodyweight', gymRequired: false, difficulty: 'beginner', caloriesPerSet: 10, instructions: 'Jump with both feet, wrists turning rope (or simulate). Stay on balls of feet.' },
    { name: 'Sprint Intervals', sets: 5, reps: '20 sec sprint / 40 sec walk', rest: '0 sec', muscle: 'Cardio', secondaryMuscles: ['Legs', 'Core'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 15, instructions: 'Sprint maximum effort for 20 sec, walk to recover for 40 sec. Repeat.' },
    { name: 'Skater Jumps', sets: 3, reps: '12/side', rest: '30 sec', muscle: 'Cardio', secondaryMuscles: ['Legs', 'Glutes'], equipment: 'bodyweight', gymRequired: false, difficulty: 'intermediate', caloriesPerSet: 7, instructions: 'Leap side to side landing on one foot, touch floor with opposite hand.' },
    { name: 'Rowing Machine', sets: 3, reps: '500m or 2 min', rest: '60 sec', muscle: 'Cardio', secondaryMuscles: ['Back', 'Legs', 'Arms'], equipment: 'machine', gymRequired: true, difficulty: 'beginner', caloriesPerSet: 15, instructions: 'Drive with legs first, pull handle to chest, extend arms then bend knees.' },
    { name: 'Battle Ropes', sets: 3, reps: '30 sec', rest: '30 sec', muscle: 'Cardio', secondaryMuscles: ['Arms', 'Core', 'Shoulders'], equipment: 'bodyweight', gymRequired: true, difficulty: 'intermediate', caloriesPerSet: 12, instructions: 'Alternate arms whipping ropes up and down, or slam both together.' },
  ],
};

// Equipment mapping for filtering
export const equipmentMapping: Record<string, { gymRequired: boolean; allowedEquipment: string[] }> = {
  gym: { gymRequired: true, allowedEquipment: ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight', 'kettlebell'] },
  home_basic: { gymRequired: false, allowedEquipment: ['dumbbell', 'bodyweight', 'bands'] },
  home_advanced: { gymRequired: false, allowedEquipment: ['dumbbell', 'bodyweight', 'bands', 'kettlebell', 'barbell'] },
  bodyweight: { gymRequired: false, allowedEquipment: ['bodyweight'] },
  dumbbells: { gymRequired: false, allowedEquipment: ['dumbbell', 'bodyweight'] },
};

export function getFilteredExercises(
  muscleGroup: string,
  equipment: string,
  experience: string,
): ExerciseEntry[] {
  const key = muscleGroup.toLowerCase();
  const allExercises = exerciseDatabase[key] || [];
  const equipConfig = equipmentMapping[equipment] || equipmentMapping.bodyweight;

  return allExercises.filter(ex => {
    // Equipment filter
    const equipmentMatch = equipment === 'gym'
      ? true // gym has access to everything
      : equipConfig.allowedEquipment.includes(ex.equipment);

    // If gym, prioritize gym exercises over bodyweight
    // (handled in selection, not filtering)

    // Difficulty filter
    const difficultyMatch = experience === 'beginner'
      ? ex.difficulty === 'beginner'
      : experience === 'intermediate'
      ? ex.difficulty !== 'advanced'
      : true;

    return equipmentMatch && difficultyMatch;
  });
}

export function selectExercisesForWorkout(
  muscleGroups: string[],
  equipment: string,
  experience: string,
  goal: string,
  targetCount: number = 7, // 6-8 exercises
): ExerciseEntry[] {
  const selected: ExerciseEntry[] = [];
  const usedNames = new Set<string>();
  const isGym = equipment === 'gym' || equipment === 'home_advanced';

  // Determine exercises per muscle group
  const exercisesPerGroup = Math.max(2, Math.ceil(targetCount / muscleGroups.length));

  for (const muscle of muscleGroups) {
    const available = getFilteredExercises(muscle, equipment, experience);

    // Sort: if gym, put gym exercises first; if bodyweight, put bodyweight first
    const sorted = [...available].sort((a, b) => {
      if (isGym) {
        // Prefer weighted exercises for gym users
        const aWeight = a.gymRequired ? 0 : 1;
        const bWeight = b.gymRequired ? 0 : 1;
        return aWeight - bWeight;
      }
      return 0;
    });

    // Shuffle within priority groups for variety
    const gymExercises = sorted.filter(e => e.gymRequired);
    const bwExercises = sorted.filter(e => !e.gymRequired);

    shuffle(gymExercises);
    shuffle(bwExercises);

    const prioritized = isGym
      ? [...gymExercises, ...bwExercises]
      : [...bwExercises, ...gymExercises];

    let count = 0;
    for (const ex of prioritized) {
      if (count >= exercisesPerGroup) break;
      if (usedNames.has(ex.name)) continue;
      selected.push(ex);
      usedNames.add(ex.name);
      count++;
    }
  }

  // If we have fewer than 6, pad with more exercises from the groups
  if (selected.length < 6) {
    for (const muscle of muscleGroups) {
      const available = getFilteredExercises(muscle, equipment, experience);
      for (const ex of available) {
        if (selected.length >= 8) break;
        if (usedNames.has(ex.name)) continue;
        selected.push(ex);
        usedNames.add(ex.name);
      }
    }
  }

  // Trim to max 8
  const result = selected.slice(0, 8);

  // Adjust sets/reps based on goal
  return result.map(ex => adjustForGoal({ ...ex }, goal));
}

function adjustForGoal(ex: ExerciseEntry, goal: string): ExerciseEntry {
  switch (goal) {
    case 'strength':
      ex.sets = Math.min(ex.sets + 1, 5);
      ex.reps = ex.reps.includes('sec') ? ex.reps : '4-6';
      ex.rest = '3-4 min';
      break;
    case 'endurance':
    case 'weight_loss':
      ex.sets = 3;
      ex.reps = ex.reps.includes('sec') ? ex.reps : '15-20';
      ex.rest = '30-45 sec';
      break;
    case 'muscle_gain':
      ex.sets = 4;
      ex.reps = ex.reps.includes('sec') ? ex.reps : '8-12';
      ex.rest = '60-90 sec';
      break;
    case 'athletic':
      ex.sets = 3;
      ex.reps = ex.reps.includes('sec') ? ex.reps : '6-10';
      ex.rest = '60-90 sec';
      break;
  }
  return ex;
}

function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
