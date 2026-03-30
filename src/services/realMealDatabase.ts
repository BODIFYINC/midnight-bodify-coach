import { Meal } from './enhancedMealService';
import { getAllExpandedMeals, getMealsByType } from './expandedMealDatabase';

export const realisticMealDatabase = [
  // Breakfast
  {
    id: 'veggie-egg-scramble',
    title: 'Veggie Egg White Scramble',
    image: '/images/meals/veggie-egg-scramble.jpg',
    calories: 280,
    protein: 25,
    carbs: 15,
    fat: 12,
    ingredients: ['Egg whites', 'Bell peppers', 'Spinach', 'Mushrooms', 'Onion'],
    instructions: ['Sauté vegetables', 'Add egg whites', 'Scramble until cooked'],
    type: 'breakfast'
  },
  {
    id: 'greek-yogurt-berries',
    title: 'Greek Yogurt with Mixed Berries',
    image: '/images/meals/greek-yogurt-berries.jpg',
    calories: 280,
    protein: 20,
    carbs: 30,
    fat: 8,
    ingredients: [
      '1 cup (227g) non-fat Greek yogurt (130 calories, 23g protein, 9g carbs, 0g fat)',
      '1 cup (144g) mixed berries (70 calories, 1g protein, 17g carbs, 0.5g fat)',
      '1 tbsp (21g) honey (60 calories, 0g protein, 17g carbs, 0g fat)',
      '1 tbsp (7g) chia seeds (35 calories, 2g protein, 3g carbs, 2.5g fat)',
      '1/4 cup (30g) granola (85 calories, 2g protein, 15g carbs, 2.5g fat)'
    ],
    instructions: [
      'Measure out exactly 1 cup (227g) of non-fat Greek yogurt and place in a bowl',
      'Wash and measure 1 cup (144g) of mixed berries (strawberries, blueberries, raspberries)',
      'Add the berries to the yogurt',
      'Drizzle exactly 1 tbsp (21g) of honey over the top',
      'Sprinkle 1 tbsp (7g) of chia seeds evenly over the mixture',
      'Top with 1/4 cup (30g) of granola',
      'Mix gently to combine all ingredients',
      'Serve immediately to maintain granola crispness'
    ],
    type: 'breakfast',
    macros: {
      protein: 20,
      carbs: 30,
      fat: 8
    },
    micros: {
      fiber: 8,
      sugar: 20,
      sodium: 85,
      potassium: 380,
      calcium: 250,
      iron: 1.2
    }
  },
  {
    id: 'power-smoothie-bowl',
    title: 'Power Smoothie Bowl',
    image: '/images/meals/power-smoothie-bowl.jpg',
    calories: 320,
    protein: 22,
    carbs: 45,
    fat: 10,
    ingredients: [
      '1 medium banana (105 calories, 1g protein, 27g carbs, 0g fat)',
      '1 scoop (30g) vanilla protein powder (120 calories, 20g protein, 3g carbs, 1g fat)',
      '1 cup (240ml) unsweetened almond milk (30 calories, 1g protein, 1g carbs, 2.5g fat)',
      '1/2 cup (72g) mixed berries (35 calories, 0.5g protein, 8.5g carbs, 0.25g fat)',
      '1/4 cup (30g) granola (85 calories, 2g protein, 15g carbs, 2.5g fat)',
      '1 tbsp (7g) chia seeds (35 calories, 2g protein, 3g carbs, 2.5g fat)',
      '1 tsp (5ml) honey (20 calories, 0g protein, 5g carbs, 0g fat)'
    ],
    instructions: [
      'Measure out exactly 1 cup (240ml) of unsweetened almond milk',
      'Add 1 scoop (30g) of vanilla protein powder to the almond milk',
      'Peel and slice 1 medium banana (approximately 118g)',
      'Add the banana to the blender',
      'Blend the mixture until smooth and creamy (about 30-45 seconds)',
      'Pour the smoothie into a bowl',
      'Measure and add 1/2 cup (72g) of mixed berries (strawberries, blueberries, raspberries)',
      'Sprinkle 1/4 cup (30g) of granola evenly over the top',
      'Add 1 tbsp (7g) of chia seeds',
      'Drizzle 1 tsp (5ml) of honey over the top',
      'Serve immediately while the smoothie is still cold'
    ],
    type: 'breakfast',
    macros: {
      protein: 22,
      carbs: 45,
      fat: 10
    },
    micros: {
      fiber: 7,
      sugar: 25,
      sodium: 180,
      potassium: 450,
      calcium: 300,
      iron: 2.5
    }
  },
  {
    id: 'greek-yogurt-parfait',
    title: 'Greek Yogurt Parfait',
    image: '/images/meals/greek-yogurt-parfait.jpg',
    calories: 250,
    protein: 18,
    carbs: 35,
    fat: 6,
    ingredients: ['Greek yogurt', 'Granola', 'Honey', 'Fresh fruit'],
    instructions: ['Layer yogurt, granola, and fruit', 'Drizzle with honey'],
    type: 'breakfast'
  },
  {
    id: 'overnight-oats',
    title: 'Overnight Oats',
    image: '/images/meals/overnight-oats.jpg',
    calories: 320,
    protein: 15,
    carbs: 50,
    fat: 7,
    ingredients: ['Oats', 'Almond milk', 'Chia seeds', 'Maple syrup'],
    instructions: ['Mix oats, milk, and chia seeds', 'Refrigerate overnight', 'Sweeten with maple syrup'],
    type: 'breakfast'
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    image: '/images/meals/avocado-toast.jpg',
    calories: 300,
    protein: 12,
    carbs: 35,
    fat: 15,
    ingredients: ['Whole grain bread', 'Avocado', 'Salt', 'Pepper', 'Red pepper flakes'],
    instructions: ['Toast bread', 'Mash avocado', 'Spread on toast', 'Season to taste'],
    type: 'breakfast'
  },
  {
    id: 'egg-avocado-toast',
    title: 'Egg and Avocado Toast',
    image: '/images/meals/egg-avocado-toast.jpg',
    calories: 350,
    protein: 18,
    carbs: 35,
    fat: 15,
    ingredients: ['Whole wheat toast', 'Avocado', 'Egg', 'Red pepper flakes'],
    instructions: ['Toast bread', 'Mash avocado and spread on toast', 'Top with fried or poached egg', 'Sprinkle with red pepper flakes'],
    type: 'breakfast'
  },
  {
    id: 'breakfast-burrito',
    title: 'Protein-Packed Breakfast Burrito',
    image: '/images/meals/breakfast-burrito.jpg',
    calories: 450,
    protein: 30,
    carbs: 40,
    fat: 20,
    ingredients: ['Whole wheat tortilla', 'Eggs', 'Black beans', 'Avocado', 'Salsa'],
    instructions: ['Scramble eggs', 'Warm tortilla', 'Fill with eggs, beans, and avocado', 'Top with salsa'],
    type: 'breakfast'
  },
  {
    id: 'chia-seed-pudding',
    title: 'Chia Seed Pudding',
    image: '/images/meals/chia-seed-pudding.jpg',
    calories: 280,
    protein: 12,
    carbs: 35,
    fat: 15,
    ingredients: ['Chia seeds', 'Almond milk', 'Honey', 'Vanilla extract'],
    instructions: ['Mix chia seeds with milk', 'Add honey and vanilla', 'Refrigerate overnight'],
    type: 'breakfast'
  },
  {
    id: 'protein-pancakes',
    title: 'Protein Pancakes',
    image: '/images/meals/protein-pancakes.jpg',
    calories: 350,
    protein: 25,
    carbs: 40,
    fat: 10,
    ingredients: ['Protein powder', 'Oats', 'Egg whites', 'Banana', 'Almond milk'],
    instructions: ['Mix all ingredients', 'Cook on griddle', 'Serve with fresh fruit'],
    type: 'breakfast'
  },
  {
    id: 'overnight-oats-pb',
    title: 'Overnight Oats with Peanut Butter',
    image: '/images/meals/overnight-oats-peanut-butter.jpg',
    calories: 380,
    protein: 18,
    carbs: 45,
    fat: 15,
    ingredients: ['Oats', 'Almond milk', 'Peanut butter', 'Honey', 'Chia seeds'],
    instructions: ['Mix oats, milk, and chia seeds', 'Add peanut butter and honey', 'Refrigerate overnight'],
    type: 'breakfast'
  },
  {
    id: 'scrambled-eggs-toast',
    title: 'Scrambled Eggs with Toast',
    image: '/images/meals/scrambled-eggs-toast.jpg',
    calories: 320,
    protein: 20,
    carbs: 30,
    fat: 15,
    ingredients: ['Eggs', 'Whole wheat bread', 'Butter', 'Salt', 'Pepper'],
    instructions: ['Scramble eggs', 'Toast bread', 'Serve eggs on toast'],
    type: 'breakfast'
  },
  {
    id: 'power-protein-bowl',
    title: 'Power Protein Breakfast Bowl',
    image: '/images/meals/power-protein-breakfast-bowl.jpg',
    calories: 650,
    protein: 45,
    carbs: 60,
    fat: 25,
    ingredients: [
      '4 large eggs (280 calories, 24g protein, 0g carbs, 20g fat)',
      '1 medium sweet potato, cubed (120 calories, 2g protein, 28g carbs, 0g fat)',
      '1/2 avocado (120 calories, 1g protein, 6g carbs, 11g fat)',
      '1/2 cup black beans (110 calories, 7g protein, 20g carbs, 0g fat)',
      '1/4 cup salsa (20 calories, 1g protein, 4g carbs, 0g fat)',
      '1/4 cup shredded cheese (110 calories, 7g protein, 1g carbs, 9g fat)'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Cube sweet potato and toss with olive oil, salt, and pepper',
      'Roast sweet potato for 20-25 minutes until tender',
      'While sweet potato is roasting, prepare eggs to your preference (scrambled, fried, or poached)',
      'Drain and rinse black beans, then warm them in a small pan',
      'Slice avocado',
      'In a large bowl, combine roasted sweet potato, black beans, and eggs',
      'Top with shredded cheese, sliced avocado, and salsa',
      'Season with additional salt and pepper if needed'
    ],
    type: 'breakfast',
    macros: {
      protein: 45,
      carbs: 60,
      fat: 25
    },
    micros: {
      fiber: 12,
      sugar: 8,
      sodium: 580,
      potassium: 1200,
      calcium: 350,
      iron: 4.5
    }
  },
  {
    id: 'protein-french-toast',
    title: 'Protein-Packed French Toast',
    image: '/images/meals/protein-french-toast.jpg',
    calories: 350,
    protein: 22,
    carbs: 40,
    fat: 12,
    ingredients: ['Whole wheat bread', 'Egg whites', 'Protein powder', 'Cinnamon', 'Maple syrup'],
    instructions: ['Mix egg whites with protein powder', 'Dip bread', 'Cook until golden'],
    type: 'breakfast'
  },
  {
    id: 'triple-protein-pancakes',
    title: 'Triple Protein Pancakes',
    image: '/images/meals/triple-protein-pancakes.jpg',
    calories: 650,
    protein: 45,
    carbs: 65,
    fat: 22,
    ingredients: [
      '2 scoops protein powder (240 calories, 40g protein, 4g carbs, 2g fat)',
      '1 cup oats (300 calories, 10g protein, 54g carbs, 5g fat)',
      '3 whole eggs (210 calories, 18g protein, 0g carbs, 15g fat)',
      '1 banana (105 calories, 1g protein, 27g carbs, 0g fat)',
      '1 cup almond milk (30 calories, 1g protein, 1g carbs, 2.5g fat)',
      '1 tsp vanilla extract (12 calories, 0g protein, 0.5g carbs, 0g fat)',
      '2 tbsp maple syrup (104 calories, 0g protein, 26g carbs, 0g fat)'
    ],
    instructions: [
      'In a large bowl, combine protein powder, oats, and vanilla extract',
      'In a separate bowl, whisk eggs until fluffy',
      'Add almond milk and mashed banana to the eggs',
      'Combine wet and dry ingredients, mixing until smooth',
      'Heat a non-stick pan over medium heat',
      'Pour 1/4 cup batter for each pancake',
      'Cook until bubbles form on top (about 2-3 minutes)',
      'Flip and cook for another 1-2 minutes until golden',
      'Serve with maple syrup and fresh berries'
    ],
    type: 'breakfast',
    macros: {
      protein: 45,
      carbs: 65,
      fat: 22
    },
    micros: {
      fiber: 8,
      sugar: 12,
      sodium: 420,
      potassium: 680,
      calcium: 280,
      iron: 4.2
    }
  },
  {
    id: 'muscle-building-omelette',
    title: 'Muscle Building Omelette',
    image: '/images/meals/muscle-building-omelette.jpg',
    calories: 580,
    protein: 42,
    carbs: 15,
    fat: 35,
    ingredients: [
      '4 whole eggs (280 calories, 24g protein, 0g carbs, 20g fat)',
      '4 egg whites (68 calories, 14g protein, 0g carbs, 0g fat)',
      '1/2 cup cheddar cheese (220 calories, 14g protein, 1g carbs, 18g fat)',
      '2 cups spinach (14 calories, 2g protein, 2g carbs, 0g fat)',
      '1 cup mushrooms (21 calories, 3g protein, 3g carbs, 0g fat)',
      '2 tbsp olive oil (240 calories, 0g protein, 0g carbs, 28g fat)',
      '1/2 avocado (120 calories, 1g protein, 6g carbs, 11g fat)'
    ],
    instructions: [
      'In a large bowl, whisk eggs and egg whites with salt and pepper',
      'Heat 1 tbsp olive oil in a large non-stick pan over medium heat',
      'Add mushrooms and sauté for 3-4 minutes until golden',
      'Add spinach and cook until wilted (about 1 minute)',
      'Remove vegetables from pan and set aside',
      'Add remaining olive oil to the pan',
      'Pour in egg mixture and let it set for 1-2 minutes',
      'Add cheese and cooked vegetables to one half of the omelette',
      'Fold the other half over the filling',
      'Cook for another 1-2 minutes until cheese melts',
      'Top with sliced avocado and serve immediately'
    ],
    type: 'breakfast',
    macros: {
      protein: 42,
      carbs: 15,
      fat: 35
    },
    micros: {
      fiber: 6,
      sugar: 2,
      sodium: 720,
      potassium: 850,
      calcium: 420,
      iron: 3.8
    }
  },
  {
    id: 'protein-waffles',
    title: 'Protein Waffles',
    image: '/images/meals/protein-waffles.jpg',
    calories: 320,
    protein: 25,
    carbs: 35,
    fat: 10,
    ingredients: ['Protein powder', 'Oats', 'Egg whites', 'Almond milk', 'Baking powder'],
    instructions: ['Mix ingredients', 'Cook in waffle iron', 'Serve with toppings'],
    type: 'breakfast'
  },
  {
    id: 'breakfast-quinoa',
    title: 'Breakfast Quinoa Bowl',
    image: '/images/meals/breakfast-quinoa-bowl.jpg',
    calories: 350,
    protein: 18,
    carbs: 45,
    fat: 12,
    ingredients: ['Quinoa', 'Almond milk', 'Berries', 'Nuts', 'Honey'],
    instructions: ['Cook quinoa in almond milk', 'Top with berries and nuts', 'Drizzle with honey'],
    type: 'breakfast'
  },
  {
    id: 'egg-white-frittata',
    title: 'Egg White Frittata',
    image: '/images/meals/egg-white-frittata.jpg',
    calories: 280,
    protein: 30,
    carbs: 15,
    fat: 12,
    ingredients: ['Egg whites', 'Vegetables', 'Feta cheese', 'Herbs'],
    instructions: ['Sauté vegetables', 'Add egg whites', 'Bake until set'],
    type: 'breakfast'
  },
  {
    id: 'breakfast-tacos',
    title: 'Breakfast Tacos',
    image: '/images/meals/breakfast-tacos.jpg',
    calories: 380,
    protein: 25,
    carbs: 35,
    fat: 18,
    ingredients: ['Corn tortillas', 'Eggs', 'Black beans', 'Avocado', 'Salsa'],
    instructions: ['Scramble eggs', 'Warm tortillas', 'Fill with eggs and toppings'],
    type: 'breakfast'
  },
  {
    id: 'protein-oatmeal',
    title: 'Protein Oatmeal',
    image: '/images/meals/protein-oatmeal.jpg',
    calories: 350,
    protein: 20,
    carbs: 45,
    fat: 10,
    ingredients: [
      '1/2 cup (40g) rolled oats (150 calories, 5g protein, 27g carbs, 3g fat)',
      '1 scoop (30g) vanilla protein powder (120 calories, 20g protein, 3g carbs, 1g fat)',
      '1 cup (240ml) unsweetened almond milk (30 calories, 1g protein, 1g carbs, 2.5g fat)',
      '1/4 cup (36g) mixed berries (18 calories, 0.25g protein, 4.25g carbs, 0.125g fat)',
      '1 tbsp (15g) almond butter (98 calories, 3.5g protein, 3g carbs, 8.5g fat)',
      '1 tsp (5ml) maple syrup (20 calories, 0g protein, 5g carbs, 0g fat)',
      '1/4 tsp (1.25g) cinnamon (3 calories, 0g protein, 1g carbs, 0g fat)'
    ],
    instructions: [
      'Measure out exactly 1/2 cup (40g) of rolled oats',
      'Add 1 cup (240ml) of unsweetened almond milk to a small saucepan',
      'Bring the almond milk to a gentle boil over medium heat',
      'Add the oats and reduce heat to low',
      'Cook for 5-7 minutes, stirring occasionally, until oats are creamy',
      'Remove from heat and let cool for 1 minute',
      'Add 1 scoop (30g) of vanilla protein powder and stir until fully incorporated',
      'Transfer to a bowl',
      'Top with 1/4 cup (36g) of mixed berries',
      'Add 1 tbsp (15g) of almond butter',
      'Drizzle with 1 tsp (5ml) of maple syrup',
      'Sprinkle with 1/4 tsp (1.25g) of cinnamon',
      'Serve immediately while warm'
    ],
    type: 'breakfast',
    macros: {
      protein: 20,
      carbs: 45,
      fat: 10
    },
    micros: {
      fiber: 6,
      sugar: 12,
      sodium: 150,
      potassium: 320,
      calcium: 280,
      iron: 2.8
    }
  },
  {
    id: 'protein-toast',
    title: 'Protein Toast',
    image: '/images/meals/protein-toast.jpg',
    calories: 300,
    protein: 20,
    carbs: 35,
    fat: 10,
    ingredients: ['Whole grain bread', 'Protein spread', 'Banana', 'Almond butter'],
    instructions: ['Toast bread', 'Spread with protein spread', 'Top with banana and almond butter'],
    type: 'breakfast'
  },
  {
    id: 'protein-muffins',
    title: 'Protein Muffins',
    image: '/images/meals/protein-muffins.jpg',
    calories: 250,
    protein: 15,
    carbs: 30,
    fat: 8,
    ingredients: ['Protein powder', 'Oats', 'Banana', 'Egg whites', 'Baking powder'],
    instructions: ['Mix ingredients', 'Bake in muffin tin', 'Let cool'],
    type: 'breakfast'
  },

  // Lunch
  {
    id: 'tuna-salad-wrap',
    title: 'Tuna Salad Wrap',
    image: '/images/meals/tuna-salad-wrap.jpg',
    calories: 350,
    protein: 25,
    carbs: 30,
    fat: 15,
    ingredients: [
      '1 whole wheat wrap (120 calories, 4g protein, 22g carbs, 3g fat)',
      '1 can (142g) water-packed tuna, drained (120 calories, 26g protein, 0g carbs, 1g fat)',
      '1/4 cup (60g) non-fat Greek yogurt (35 calories, 6g protein, 2g carbs, 0g fat)',
      '1/4 cup (25g) diced celery (5 calories, 0.25g protein, 1g carbs, 0g fat)',
      '2 tbsp (20g) diced red onion (10 calories, 0.25g protein, 2g carbs, 0g fat)',
      '1 tbsp (15ml) lemon juice (4 calories, 0g protein, 1g carbs, 0g fat)',
      '1/4 tsp (1.25g) salt (0 calories, 0g protein, 0g carbs, 0g fat)',
      '1/4 tsp (0.5g) black pepper (1 calorie, 0g protein, 0.25g carbs, 0g fat)',
      '1 cup (20g) mixed greens (5 calories, 0.5g protein, 1g carbs, 0g fat)'
    ],
    instructions: [
      'Drain 1 can (142g) of water-packed tuna thoroughly',
      'In a medium bowl, combine the drained tuna with 1/4 cup (60g) of non-fat Greek yogurt',
      'Add 1/4 cup (25g) of diced celery and 2 tbsp (20g) of diced red onion',
      'Squeeze in 1 tbsp (15ml) of fresh lemon juice',
      'Season with 1/4 tsp (1.25g) of salt and 1/4 tsp (0.5g) of black pepper',
      'Mix all ingredients thoroughly until well combined',
      'Lay out 1 whole wheat wrap on a clean surface',
      'Place 1 cup (20g) of mixed greens in the center of the wrap',
      'Spoon the tuna mixture evenly over the greens',
      'Fold in the sides of the wrap, then roll from bottom to top',
      'Cut diagonally and serve immediately'
    ],
    type: 'lunch',
    macros: {
      protein: 25,
      carbs: 30,
      fat: 15
    },
    micros: {
      fiber: 4,
      sugar: 3,
      sodium: 680,
      potassium: 420,
      calcium: 180,
      iron: 2.2
    }
  },
  {
    id: 'lentil-soup',
    title: 'Lentil Soup',
    image: '/images/meals/lentil-soup.jpg',
    calories: 320,
    protein: 18,
    carbs: 45,
    fat: 8,
    ingredients: ['Lentils', 'Vegetables', 'Vegetable broth', 'Herbs', 'Spices'],
    instructions: ['Simmer lentils and vegetables in broth', 'Season with herbs and spices'],
    type: 'lunch'
  },
  {
    id: 'tuna-white-bean-salad',
    title: 'Tuna and White Bean Salad',
    image: '/images/meals/tuna-white-bean-salad.jpg',
    calories: 380,
    protein: 30,
    carbs: 35,
    fat: 12,
    ingredients: ['Tuna', 'White beans', 'Vegetables', 'Olive oil', 'Lemon juice'],
    instructions: ['Combine ingredients', 'Dress with olive oil and lemon juice'],
    type: 'lunch'
  },
  {
    id: 'chicken-wrap',
    title: 'Chicken Wrap',
    image: '/images/meals/chicken-wrap.jpg',
    calories: 400,
    protein: 35,
    carbs: 35,
    fat: 15,
    ingredients: ['Whole wheat wrap', 'Chicken breast', 'Vegetables', 'Hummus'],
    instructions: ['Fill wrap with chicken and vegetables', 'Spread with hummus'],
    type: 'lunch'
  },
  {
    id: 'mediterranean-quinoa-bowl',
    title: 'Mediterranean Quinoa Bowl',
    image: '/images/meals/mediterranean-quinoa-bowl.jpg',
    calories: 420,
    protein: 20,
    carbs: 45,
    fat: 18,
    ingredients: ['Quinoa', 'Chickpeas', 'Feta cheese', 'Vegetables', 'Olive oil'],
    instructions: ['Cook quinoa', 'Combine with other ingredients', 'Dress with olive oil'],
    type: 'lunch'
  },
  {
    id: 'asian-tofu-bowl',
    title: 'Asian-Inspired Tofu Bowl',
    image: '/images/meals/asian-tofu-bowl.jpg',
    calories: 380,
    protein: 25,
    carbs: 40,
    fat: 15,
    ingredients: ['Tofu', 'Brown rice', 'Vegetables', 'Soy sauce', 'Sesame oil'],
    instructions: ['Cook rice', 'Prepare tofu and vegetables', 'Combine and season'],
    type: 'lunch'
  },
  {
    id: 'turkey-rice-bowl',
    title: 'Turkey and Rice Bowl',
    image: '/images/meals/turkey-rice-bowl.jpg',
    calories: 400,
    protein: 35,
    carbs: 40,
    fat: 12,
    ingredients: ['Turkey breast', 'Brown rice', 'Vegetables', 'Sauce'],
    instructions: ['Cook rice', 'Prepare turkey and vegetables', 'Combine in bowl'],
    type: 'lunch'
  },
  {
    id: 'beef-pasta-bowl',
    title: 'Beef and Pasta Bowl',
    image: '/images/meals/beef-pasta-bowl.jpg',
    calories: 450,
    protein: 30,
    carbs: 45,
    fat: 20,
    ingredients: ['Lean beef', 'Whole wheat pasta', 'Vegetables', 'Tomato sauce'],
    instructions: ['Cook pasta', 'Prepare beef and vegetables', 'Combine with sauce'],
    type: 'lunch'
  },
  {
    id: 'chicken-caesar-wrap',
    title: 'Chicken Caesar Wrap',
    image: '/images/meals/chicken-caesar-wrap.jpg',
    calories: 420,
    protein: 35,
    carbs: 35,
    fat: 18,
    ingredients: ['Whole wheat wrap', 'Chicken breast', 'Romaine lettuce', 'Caesar dressing'],
    instructions: ['Fill wrap with chicken and lettuce', 'Dress with Caesar dressing'],
    type: 'lunch'
  },
  {
    id: 'salmon-brown-rice-asparagus',
    title: 'Salmon with Brown Rice and Asparagus',
    image: '/images/meals/salmon-brown-rice-asparagus.jpg',
    calories: 450,
    protein: 35,
    carbs: 40,
    fat: 20,
    ingredients: ['Salmon', 'Brown rice', 'Asparagus', 'Lemon', 'Herbs'],
    instructions: ['Cook rice', 'Prepare salmon and asparagus', 'Season with lemon and herbs'],
    type: 'lunch'
  },
  {
    id: 'beef-rice-power-bowl',
    title: 'Beef and Rice Power Bowl',
    image: '/images/meals/beef-rice-power-bowl.jpg',
    calories: 480,
    protein: 40,
    carbs: 45,
    fat: 22,
    ingredients: ['Lean beef', 'Brown rice', 'Vegetables', 'Sauce'],
    instructions: ['Cook rice', 'Prepare beef and vegetables', 'Combine in bowl'],
    type: 'lunch'
  },
  {
    id: 'chicken-burrito-bowl',
    title: 'Chicken Burrito Bowl',
    image: '/images/meals/chicken-burrito-bowl.jpg',
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 18,
    ingredients: ['Chicken breast', 'Brown rice', 'Black beans', 'Vegetables', 'Salsa'],
    instructions: ['Cook rice', 'Prepare chicken and vegetables', 'Combine in bowl'],
    type: 'lunch'
  },
  {
    id: 'beef-stirfry-quinoa',
    title: 'Beef Stir-fry with Quinoa',
    image: '/images/meals/beef-stirfry-quinoa.jpg',
    calories: 420,
    protein: 35,
    carbs: 40,
    fat: 18,
    ingredients: ['Lean beef', 'Quinoa', 'Vegetables', 'Soy sauce', 'Ginger'],
    instructions: ['Cook quinoa', 'Stir-fry beef and vegetables', 'Combine and season'],
    type: 'lunch'
  },
  {
    id: 'protein-pasta-bowl',
    title: 'Protein-Packed Pasta Bowl',
    image: '/images/meals/protein-pasta-bowl.jpg',
    calories: 450,
    protein: 30,
    carbs: 45,
    fat: 20,
    ingredients: ['Whole wheat pasta', 'Chicken breast', 'Vegetables', 'Tomato sauce'],
    instructions: ['Cook pasta', 'Prepare chicken and vegetables', 'Combine with sauce'],
    type: 'lunch'
  },
  {
    id: 'protein-soup',
    title: 'Protein Soup',
    image: '/images/meals/protein-soup.jpg',
    calories: 320,
    protein: 25,
    carbs: 30,
    fat: 12,
    ingredients: ['Chicken breast', 'Vegetables', 'Broth', 'Herbs', 'Spices'],
    instructions: ['Simmer chicken and vegetables in broth', 'Season with herbs and spices'],
    type: 'lunch'
  },
  {
    id: 'protein-bowl',
    title: 'Protein Bowl',
    image: '/images/meals/protein-bowl.jpg',
    calories: 400,
    protein: 35,
    carbs: 35,
    fat: 15,
    ingredients: ['Protein source', 'Grains', 'Vegetables', 'Sauce'],
    instructions: ['Prepare all components', 'Combine in bowl', 'Dress with sauce'],
    type: 'lunch'
  },
  {
    id: 'muscle-gain-chicken-bowl',
    title: 'Muscle Gain Chicken Bowl',
    image: '/images/meals/muscle-gain-chicken-bowl.jpg',
    calories: 720,
    protein: 55,
    carbs: 75,
    fat: 25,
    ingredients: [
      '8 oz chicken breast (240 calories, 44g protein, 0g carbs, 5g fat)',
      '1 cup brown rice (220 calories, 5g protein, 45g carbs, 2g fat)',
      '1 cup quinoa (220 calories, 8g protein, 39g carbs, 4g fat)',
      '1 medium sweet potato (120 calories, 2g protein, 28g carbs, 0g fat)',
      '2 cups broccoli (60 calories, 4g protein, 12g carbs, 0g fat)',
      '1/2 avocado (120 calories, 1g protein, 6g carbs, 11g fat)',
      '2 tbsp olive oil (240 calories, 0g protein, 0g carbs, 28g fat)'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Season chicken breast with salt, pepper, and your favorite spices',
      'Heat 1 tbsp olive oil in a pan over medium-high heat',
      'Cook chicken breast for 6-8 minutes per side until internal temperature reaches 165°F',
      'While chicken is cooking, prepare brown rice and quinoa according to package instructions',
      'Cube sweet potato and toss with 1 tbsp olive oil, salt, and pepper',
      'Roast sweet potato for 20-25 minutes until tender',
      'Steam broccoli for 4-5 minutes until bright green and tender-crisp',
      'Slice avocado',
      'In a large bowl, combine cooked rice, quinoa, sweet potato, and broccoli',
      'Slice chicken breast and add to the bowl',
      'Top with sliced avocado and drizzle with remaining olive oil',
      'Season with additional salt and pepper if needed'
    ],
    type: 'lunch',
    macros: {
      protein: 55,
      carbs: 75,
      fat: 25
    },
    micros: {
      fiber: 14,
      sugar: 6,
      sodium: 650,
      potassium: 1500,
      calcium: 280,
      iron: 5.2
    }
  },

  // Dinner
  {
    id: 'turkey-meatballs-zucchini-noodles',
    title: 'Lean Turkey Meatballs with Zucchini Noodles',
    image: '/images/meals/turkey-meatballs-zucchini-noodles.jpg',
    calories: 380,
    protein: 35,
    carbs: 20,
    fat: 18,
    ingredients: ['Ground turkey', 'Zucchini', 'Tomato sauce', 'Herbs', 'Spices'],
    instructions: ['Form and cook meatballs', 'Spiralize zucchini', 'Combine with sauce'],
    type: 'dinner'
  },
  {
    id: 'baked-salmon-vegetables',
    title: 'Baked Salmon with Vegetables',
    image: '/images/meals/baked-salmon-vegetables.jpg',
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 25,
    ingredients: ['Salmon fillet', 'Broccoli', 'Carrots', 'Olive oil', 'Lemon'],
    instructions: ['Bake salmon with lemon', 'Roast vegetables', 'Serve together'],
    type: 'dinner'
  },
  {
    id: 'zucchini-noodles-chicken',
    title: 'Zucchini Noodles with Chicken',
    image: '/images/meals/zucchini-noodles-chicken.jpg',
    calories: 400,
    protein: 32,
    carbs: 15,
    fat: 22,
    ingredients: ['Chicken breast', 'Zucchini', 'Pesto sauce', 'Cherry tomatoes'],
    instructions: ['Grill chicken', 'Spiralize zucchini', 'Toss with pesto and tomatoes'],
    type: 'dinner'
  },

  // Snacks
  {
    id: 'almond-protein-smoothie',
    title: 'Almond Protein Smoothie',
    image: '/images/meals/almond-protein-smoothie.jpg',
    calories: 250,
    protein: 25,
    carbs: 15,
    fat: 10,
    ingredients: ['Almond milk', 'Protein powder', 'Almond butter', 'Banana'],
    instructions: ['Blend all ingredients until smooth'],
    type: 'snacks'
  },
  {
    id: 'protein-bars',
    title: 'Homemade Protein Bars',
    image: '/images/meals/homemade-protein-bars.jpg',
    calories: 200,
    protein: 15,
    carbs: 20,
    fat: 8,
    ingredients: ['Protein powder', 'Oats', 'Almond butter', 'Honey', 'Dark chocolate'],
    instructions: ['Mix ingredients', 'Press into pan', 'Refrigerate until firm'],
    type: 'snacks'
  },
  {
    id: 'trail-mix',
    title: 'Trail Mix',
    image: '/images/meals/trail-mix.jpg',
    calories: 180,
    protein: 8,
    carbs: 15,
    fat: 12,
    ingredients: ['Almonds', 'Walnuts', 'Dark chocolate chips', 'Dried fruit'],
    instructions: ['Combine all ingredients', 'Store in airtight container'],
    type: 'snacks'
  },

  // ===== LOW-CALORIE HIGH-PROTEIN MEALS (Weight Loss Friendly) =====
  {
    id: 'lemon-herb-cod',
    title: 'Lemon Herb Baked Cod',
    image: '/images/meals/lemon-herb-cod.jpg',
    calories: 220,
    protein: 38,
    carbs: 5,
    fat: 5,
    ingredients: [
      '6 oz (170g) cod fillet (140 cal, 30g protein, 0g carbs, 1g fat)',
      '1 cup (30g) arugula (5 cal, 0.5g protein, 1g carbs, 0g fat)',
      '1 tbsp lemon juice (4 cal)',
      '1 tsp olive oil (40 cal, 0g protein, 0g carbs, 4.5g fat)',
      'Fresh dill, garlic, salt, pepper'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Place cod on parchment-lined baking sheet',
      'Drizzle with olive oil and lemon juice',
      'Season with dill, minced garlic, salt, and pepper',
      'Bake for 12-15 minutes until fish flakes easily',
      'Serve on a bed of fresh arugula'
    ],
    type: 'dinner'
  },
  {
    id: 'turkey-lettuce-wraps',
    title: 'Asian Turkey Lettuce Wraps',
    image: '/images/meals/turkey-lettuce-wraps.jpg',
    calories: 240,
    protein: 32,
    carbs: 10,
    fat: 8,
    ingredients: [
      '6 oz (170g) lean ground turkey (240 cal, 30g protein, 0g carbs, 13g fat)',
      '4 large butter lettuce leaves (5 cal)',
      '1/4 cup water chestnuts, diced (15 cal)',
      '1 tbsp low-sodium soy sauce (10 cal)',
      '1 tsp sesame oil (40 cal)',
      'Ginger, garlic, green onions'
    ],
    instructions: [
      'Brown ground turkey in a pan over medium-high heat',
      'Add minced ginger and garlic, cook 1 minute',
      'Stir in water chestnuts and soy sauce',
      'Drizzle with sesame oil',
      'Spoon mixture into lettuce cups',
      'Garnish with sliced green onions'
    ],
    type: 'lunch'
  },
  {
    id: 'shrimp-zoodles',
    title: 'Garlic Shrimp Zoodles',
    image: '/images/meals/shrimp-zoodles.jpg',
    calories: 210,
    protein: 30,
    carbs: 8,
    fat: 7,
    ingredients: [
      '6 oz (170g) shrimp, peeled (150 cal, 29g protein, 1g carbs, 2.5g fat)',
      '2 medium zucchini, spiralized (60 cal, 4g protein, 7g carbs, 0g fat)',
      '1 tsp olive oil (40 cal)',
      '3 cloves garlic, minced',
      'Red pepper flakes, lemon zest, parsley'
    ],
    instructions: [
      'Spiralize zucchini into noodles',
      'Heat olive oil in a large pan over medium-high heat',
      'Sauté garlic for 30 seconds until fragrant',
      'Add shrimp and cook 2-3 minutes per side until pink',
      'Add zoodles and toss for 1-2 minutes',
      'Finish with lemon zest, parsley, and red pepper flakes'
    ],
    type: 'dinner'
  },
  {
    id: 'egg-white-veggie-bowl',
    title: 'Egg White & Veggie Power Bowl',
    image: '/images/meals/egg-white-veggie-bowl.jpg',
    calories: 195,
    protein: 28,
    carbs: 12,
    fat: 4,
    ingredients: [
      '8 egg whites (136 cal, 28g protein, 0g carbs, 0g fat)',
      '1 cup spinach (7 cal)',
      '1/2 cup cherry tomatoes (15 cal)',
      '1/4 cup bell peppers, diced (10 cal)',
      '1/4 cup mushrooms (5 cal)',
      'Cooking spray, salt, pepper, turmeric'
    ],
    instructions: [
      'Spray a non-stick pan with cooking spray',
      'Sauté mushrooms and bell peppers for 3 minutes',
      'Add spinach and cook until wilted',
      'Pour in egg whites and scramble gently',
      'Season with turmeric, salt, and pepper',
      'Top with halved cherry tomatoes'
    ],
    type: 'breakfast'
  },
  {
    id: 'tuna-cucumber-bites',
    title: 'Tuna Stuffed Cucumber Bites',
    image: '/images/meals/tuna-cucumber-bites.jpg',
    calories: 160,
    protein: 28,
    carbs: 5,
    fat: 3,
    ingredients: [
      '1 can (142g) tuna in water, drained (120 cal, 26g protein, 0g carbs, 1g fat)',
      '2 large cucumbers, sliced thick (30 cal)',
      '2 tbsp non-fat Greek yogurt (15 cal)',
      'Dill, lemon juice, salt, pepper'
    ],
    instructions: [
      'Drain tuna and mix with Greek yogurt',
      'Season with dill, lemon juice, salt, and pepper',
      'Slice cucumbers into thick rounds',
      'Scoop center of each cucumber slice',
      'Fill with tuna mixture',
      'Garnish with fresh dill'
    ],
    type: 'snacks'
  },
  {
    id: 'chicken-cauliflower-rice',
    title: 'Chicken & Cauliflower Rice Bowl',
    image: '/images/meals/chicken-cauliflower-rice.jpg',
    calories: 260,
    protein: 35,
    carbs: 10,
    fat: 9,
    ingredients: [
      '5 oz (140g) grilled chicken breast (195 cal, 33g protein, 0g carbs, 5g fat)',
      '1.5 cups cauliflower rice (38 cal, 3g protein, 6g carbs, 0g fat)',
      '1 tsp olive oil (40 cal)',
      'Soy sauce, garlic, ginger, green onion'
    ],
    instructions: [
      'Season and grill chicken breast until internal temp reaches 165°F',
      'Slice chicken and set aside',
      'Heat olive oil in a pan, add cauliflower rice',
      'Stir-fry with garlic and ginger for 4-5 minutes',
      'Add a splash of soy sauce',
      'Top with sliced chicken and green onions'
    ],
    type: 'lunch'
  },
  {
    id: 'cottage-cheese-veggie-plate',
    title: 'Cottage Cheese & Veggie Plate',
    image: '/images/meals/cottage-cheese-veggie-plate.jpg',
    calories: 180,
    protein: 24,
    carbs: 12,
    fat: 4,
    ingredients: [
      '1 cup (226g) low-fat cottage cheese (163 cal, 24g protein, 6g carbs, 2g fat)',
      '1/2 cup cherry tomatoes (15 cal)',
      '1/2 cup cucumber slices (8 cal)',
      'Everything bagel seasoning, black pepper'
    ],
    instructions: [
      'Scoop cottage cheese into a bowl or plate',
      'Arrange cherry tomatoes and cucumber slices around it',
      'Sprinkle with everything bagel seasoning',
      'Add freshly cracked black pepper',
      'Serve chilled'
    ],
    type: 'snacks'
  },
  {
    id: 'turkey-spinach-roll-ups',
    title: 'Turkey & Spinach Roll-Ups',
    image: '/images/meals/turkey-spinach-roll-ups.jpg',
    calories: 175,
    protein: 26,
    carbs: 4,
    fat: 6,
    ingredients: [
      '4 oz (112g) sliced deli turkey breast (120 cal, 24g protein, 2g carbs, 1g fat)',
      '1 cup baby spinach (7 cal)',
      '1 tbsp mustard (10 cal)',
      '2 tbsp hummus (50 cal, 2g protein, 2g carbs, 4g fat)'
    ],
    instructions: [
      'Lay turkey slices flat on a cutting board',
      'Spread a thin layer of mustard on each slice',
      'Add a small dollop of hummus',
      'Place a few spinach leaves on each slice',
      'Roll up tightly and secure with a toothpick',
      'Slice in half and serve'
    ],
    type: 'lunch'
  },
  {
    id: 'white-fish-asparagus',
    title: 'Baked Tilapia with Asparagus',
    image: '/images/meals/white-fish-asparagus.jpg',
    calories: 230,
    protein: 36,
    carbs: 8,
    fat: 6,
    ingredients: [
      '6 oz (170g) tilapia fillet (165 cal, 34g protein, 0g carbs, 3g fat)',
      '8 asparagus spears (27 cal, 3g protein, 5g carbs, 0g fat)',
      '1 tsp olive oil (40 cal)',
      'Garlic powder, paprika, lemon, salt, pepper'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Place tilapia and asparagus on a lined baking sheet',
      'Drizzle with olive oil',
      'Season fish with garlic powder, paprika, salt, and pepper',
      'Bake for 12-15 minutes until fish is opaque',
      'Squeeze fresh lemon over everything before serving'
    ],
    type: 'dinner'
  },
  {
    id: 'protein-veggie-soup',
    title: 'High-Protein Chicken Veggie Soup',
    image: '/images/meals/protein-veggie-soup.jpg',
    calories: 200,
    protein: 30,
    carbs: 12,
    fat: 4,
    ingredients: [
      '5 oz (140g) shredded chicken breast (165 cal, 31g protein, 0g carbs, 3.6g fat)',
      '1 cup mixed vegetables — carrot, celery, zucchini (30 cal)',
      '2 cups low-sodium chicken broth (15 cal)',
      'Garlic, thyme, bay leaf, salt, pepper'
    ],
    instructions: [
      'Bring chicken broth to a boil in a pot',
      'Add diced carrots and celery, cook 5 minutes',
      'Add zucchini, garlic, thyme, and bay leaf',
      'Simmer for 10 minutes until veggies are tender',
      'Add shredded chicken and heat through',
      'Remove bay leaf, season with salt and pepper, serve hot'
    ],
    type: 'lunch'
  }
];

export function getValidImageUrl(imageUrl: string): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return '/images/meals/fallback.jpg';
  }
  return imageUrl;
}

export function getAllRealisticMeals(): Meal[] {
  const originalMeals = realisticMealDatabase;
  const expandedMeals = getAllExpandedMeals();
  return [...originalMeals, ...expandedMeals] as unknown as Meal[];
}

export function getMealsByGoal(goal: 'weight_loss' | 'muscle_gain'): {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
} {
  const allMeals = getAllRealisticMeals();
  
  if (goal === 'muscle_gain') {
    return {
      breakfast: allMeals.filter(meal => 
        meal.type === 'breakfast' && meal.protein >= 15
      ),
      lunch: allMeals.filter(meal => 
        meal.type === 'lunch' && meal.protein >= 20
      ),
      dinner: allMeals.filter(meal => 
        meal.type === 'dinner' && meal.protein >= 25
      ),
      snacks: allMeals.filter(meal => 
        meal.type === 'snacks' && meal.protein >= 10
      )
    };
  } else {
    return {
      breakfast: allMeals.filter(meal => 
        meal.type === 'breakfast' && meal.calories <= 400
      ),
      lunch: allMeals.filter(meal => 
        meal.type === 'lunch' && meal.calories <= 500
      ),
      dinner: allMeals.filter(meal => 
        meal.type === 'dinner' && meal.calories <= 600
      ),
      snacks: allMeals.filter(meal => 
        meal.type === 'snacks' && meal.calories <= 200
      )
    };
  }
}

export function getMealById(id: string): Meal | undefined {
  return getAllRealisticMeals().find(meal => meal.id === id);
}

export function getRandomMealByType(type: 'breakfast' | 'lunch' | 'dinner' | 'snacks'): Meal {
  const meals = getAllRealisticMeals().filter(meal => meal.type === type);
  const randomIndex = Math.floor(Math.random() * meals.length);
  return meals[randomIndex] || meals[0];
}
