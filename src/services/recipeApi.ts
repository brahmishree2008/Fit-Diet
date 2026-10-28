import {
  Recipe,
  FilterOptions,
  CalorieCalculationInput,
  CalorieCalculationResult,
} from '../types/recipe';

// Realistic sample recipes with high-fidelity food imagery
const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 'berry-oat-bowl',
    title: 'Berry oat bowl',
    category: 'Breakfast',
    cookTimeMin: 12,
    rating: 4.8,
    reviewCount: 142,
    calories: 340,
    protein: 14,
    carbs: 54,
    fat: 8,
    fiber: 9,
    image: '/src/assets/images/recipe_berry_oat_1793204608901.jpg',
    tags: ['High fibre', 'Vegan'],
    description: 'Slow-simmered whole grain oats infused with cinnamon, topped with fresh antioxidants, chia seeds, and sliced almonds.',
    ingredients: [
      '1/2 cup rolled whole oats',
      '1 cup unsweetened almond or oat milk',
      '1/2 cup fresh blueberries & sliced strawberries',
      '1 tbsp chia seeds',
      '1 tbsp sliced toasted almonds',
      '1/2 tsp ground Ceylon cinnamon',
      '1 tsp pure maple syrup (optional)'
    ],
    instructions: [
      'Combine rolled oats and almond milk in a small saucepan over medium heat.',
      'Simmer for 5-7 minutes, stirring occasionally until thick and creamy.',
      'Stir in cinnamon and pour into a warm bowl.',
      'Garnish generously with fresh berries, chia seeds, and crunchy almonds.'
    ],
    servings: 1
  },
  {
    id: 'avocado-egg-toast',
    title: 'Avocado egg toast',
    category: 'Breakfast',
    cookTimeMin: 10,
    rating: 4.9,
    reviewCount: 310,
    calories: 380,
    protein: 16,
    carbs: 28,
    fat: 22,
    fiber: 6,
    image: '/src/assets/images/recipe_avocado_toast_1793204630029.jpg',
    tags: ['High protein', 'Low carb'],
    description: 'Thick-cut fermented artisanal sourdough crowned with citrus-mashed ripe avocado, a soft-poached free-range egg, and microgreens.',
    ingredients: [
      '1 thick slice sourdough or sprouted grain bread',
      '1/2 ripe Haas avocado',
      '1 organic pasture-raised egg',
      '1 tsp extra virgin olive oil & fresh lemon juice',
      'Pinch of red pepper flakes and Maldon sea salt',
      'Handful of radish microgreens'
    ],
    instructions: [
      'Toast sourdough until golden brown and crusty.',
      'Roughly mash avocado with lemon juice, salt, and black pepper.',
      'Poach egg in gently simmering water with a splash of vinegar for 3 minutes.',
      'Spread avocado over toast, crown with poached egg, and sprinkle microgreens.'
    ],
    servings: 1
  },
  {
    id: 'chickpea-quinoa-salad',
    title: 'Chickpea quinoa salad',
    category: 'Lunch',
    cookTimeMin: 15,
    rating: 4.7,
    reviewCount: 189,
    calories: 420,
    protein: 18,
    carbs: 58,
    fat: 14,
    fiber: 11,
    image: '/src/assets/images/recipe_chickpea_salad_1793204609828.jpg',
    tags: ['High protein', 'Vegan', 'High fibre'],
    description: 'Fluffy Andean quinoa paired with sprouted chickpeas, Persian cucumbers, Kalamata olives, cherry tomatoes, and zesty herb vinaigrette.',
    ingredients: [
      '1 cup cooked white quinoa, cooled',
      '3/4 cup cooked organic chickpeas, rinsed',
      '1/2 cup diced cucumber and halved heirloom cherry tomatoes',
      '2 tbsp chopped fresh Italian parsley and mint',
      '2 tbsp kalamata olives, pitted',
      '1.5 tbsp cold-pressed extra virgin olive oil with lemon zest'
    ],
    instructions: [
      'In a wide serving bowl, toss cooked quinoa with chickpeas and chopped herbs.',
      'Fold in cucumbers, sweet cherry tomatoes, and olives.',
      'Whisk lemon juice, olive oil, oregano, and salt together; pour over salad and chill.'
    ],
    servings: 1
  },
  {
    id: 'ragi-veggie-wrap',
    title: 'Ragi veggie wrap',
    category: 'Lunch',
    cookTimeMin: 20,
    rating: 4.6,
    reviewCount: 94,
    calories: 350,
    protein: 13,
    carbs: 52,
    fat: 10,
    fiber: 10,
    image: '/src/assets/images/recipe_ragi_wrap_1793204630671.jpg',
    tags: ['High fibre'],
    description: 'Traditional finger millet flatbread rolled with crunchy shredded rainbow veggies, baby spinach, light tahini, and spiced cottage cheese.',
    ingredients: [
      '1 fresh ragi (finger millet) flatbread/roti',
      '1/2 cup shredded purple cabbage, carrots, and bell peppers',
      '50g crumbled paneer or tofu',
      '1 cup baby spinach leaves',
      '1.5 tbsp lemon-garlic tahini or mint chutney',
      'Toasted sesame seeds'
    ],
    instructions: [
      'Warm the ragi flatbread lightly on a skillet for 30 seconds.',
      'Spread lemon tahini or mint yogurt sauce evenly over the center.',
      'Layer fresh spinach, spiced paneer/tofu, and crunchy shredded vegetables.',
      'Roll tightly, slice diagonally, and serve fresh.'
    ],
    servings: 1
  },
  {
    id: 'grilled-fish-greens',
    title: 'Grilled fish with greens',
    category: 'Dinner',
    cookTimeMin: 18,
    rating: 4.9,
    reviewCount: 276,
    calories: 480,
    protein: 38,
    carbs: 18,
    fat: 26,
    fiber: 5,
    image: '/src/assets/images/hero_nourish_plate_1793204607372.jpg',
    tags: ['High protein', 'Low carb'],
    description: 'Herb-crusted wild salmon fillet seared to perfection alongside tender charred asparagus, steamed broccoli florets, and sweet potato.',
    ingredients: [
      '160g wild salmon fillet',
      '1 bunch tender baby asparagus stalks',
      '1 cup broccoli florets, steamed tender-crisp',
      '1/2 roasted sweet potato, sliced',
      '1 tbsp cold-pressed olive oil & fresh dill',
      'Lemon wedges and cracked peppercorns'
    ],
    instructions: [
      'Season salmon with olive oil, sea salt, pepper, and freshly minced dill.',
      'Grill skin-side down for 4-5 minutes, flip gently and cook for 3 minutes.',
      'Toss asparagus and broccoli in the same skillet with garlic until bright green.',
      'Plate with roasted sweet potato wedges and a generous squeeze of fresh lemon.'
    ],
    servings: 1
  },
  {
    id: 'paneer-tikka-bowl',
    title: 'Paneer tikka bowl',
    category: 'Dinner',
    cookTimeMin: 25,
    rating: 4.8,
    reviewCount: 220,
    calories: 520,
    protein: 28,
    carbs: 44,
    fat: 24,
    fiber: 7,
    image: '/src/assets/images/recipe_paneer_bowl_1793204609737.jpg',
    tags: ['High protein'],
    description: 'Char-grilled cottage cheese cubes marinated in Greek yogurt and warming spices, served over nutty brown rice, roasted peppers, and mint crema.',
    ingredients: [
      '120g fresh paneer cubes',
      '2 tbsp thick Greek yogurt & garam masala marinade',
      '1 cup cooked warm brown basmati rice',
      '1/2 cup charred bell pepper cubes and red onions',
      '1 cup crisp arugula or mixed baby greens',
      '2 tbsp fresh mint-cucumber yogurt sauce'
    ],
    instructions: [
      'Marinate paneer cubes with Greek yogurt, turmeric, cumin, and lemon juice.',
      'Skewer with bell peppers and grill or air-fry until lightly charred at edges.',
      'Assemble brown rice base in a wide bowl and top with greens.',
      'Add paneer tikka skewers and drizzle with fresh chilled mint yogurt.'
    ],
    servings: 1
  },
  {
    id: 'roasted-chana',
    title: 'Roasted chana',
    category: 'Snacks',
    cookTimeMin: 8,
    rating: 4.5,
    reviewCount: 165,
    calories: 210,
    protein: 11,
    carbs: 32,
    fat: 5,
    fiber: 8,
    image: '/src/assets/images/recipe_roasted_chana_1793204631160.jpg',
    tags: ['High fibre', 'Vegan', 'High protein'],
    description: 'Crunchy golden roasted Bengal chickpeas dusted with cumin, black salt, and tangy amchur for a satiating zero-guilt snack.',
    ingredients: [
      '1 cup roasted dried chickpeas (chana)',
      '1/2 tsp cold-pressed mustard or coconut oil',
      '1/4 tsp roasted cumin powder',
      '1/4 tsp chaat masala & black salt',
      'Pinch of red chili powder'
    ],
    instructions: [
      'Toss dry-roasted chickpeas with a drop of oil to help spices adhere.',
      'Sprinkle roasted cumin, chaat masala, and mild chili powder.',
      'Shake vigorously in a jar or bowl to coat evenly.',
      'Serve crunchy or store in an airtight container for on-the-go snacking.'
    ],
    servings: 2
  },
  {
    id: 'mango-chia-pudding',
    title: 'Mango chia pudding',
    category: 'Snacks',
    cookTimeMin: 10,
    rating: 4.8,
    reviewCount: 198,
    calories: 260,
    protein: 9,
    carbs: 38,
    fat: 9,
    fiber: 12,
    image: '/src/assets/images/recipe_mango_chia_1793204631188.jpg',
    tags: ['Vegan', 'High fibre'],
    description: 'Overnight coconut-almond chia pudding layered with velvety ripe mango purée, toasted coconut chips, and garden mint.',
    ingredients: [
      '3 tbsp black chia seeds',
      '3/4 cup unsweetened almond or light coconut milk',
      '1/2 cup fresh Alphonso or honey mango puree',
      '1/4 cup freshly diced sweet mango chunks',
      '1 tbsp toasted unsweetened coconut flakes',
      'Dash of pure vanilla bean extract'
    ],
    instructions: [
      'Whisk chia seeds, plant milk, and vanilla in a glass jar until well blended.',
      'Refrigerate for at least 4 hours (or overnight) until gelled and creamy.',
      'Layer half the chia pudding, followed by sweet mango purée.',
      'Top with remainder pudding, fresh mango cubes, and toasted coconut flakes.'
    ],
    servings: 1
  }
];

const SAVED_RECIPES_STORAGE_KEY = 'fitdiet_saved_recipes_v1';

// Local storage helper for favorites persistence
export function getSavedRecipeIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_RECIPES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['berry-oat-bowl', 'grilled-fish-greens'];
  } catch {
    return ['berry-oat-bowl', 'grilled-fish-greens'];
  }
}

export function saveRecipeIds(ids: string[]): void {
  try {
    localStorage.setItem(SAVED_RECIPES_STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

/**
 * FitDiet Central API Service
 * Cleanly decoupled data access layer.
 * Ready to be connected to Python Flask REST API later (e.g. fetch(`${API_BASE}/recipes`)).
 */
export const recipeApi = {
  /**
   * Fetches recipes with optional category, search query, dietary tags, and sort.
   */
  async getRecipes(
    filters?: Partial<FilterOptions>,
    simulateNetworkDelayMs: number = 250,
    shouldFail: boolean = false
  ): Promise<Recipe[]> {
    await new Promise((res) => setTimeout(res, simulateNetworkDelayMs));

    if (shouldFail) {
      throw new Error('Unable to connect to the FitDiet recipe service. Please check your network and retry.');
    }

    let results = [...SAMPLE_RECIPES];

    if (filters?.category && filters.category !== 'All') {
      if (filters.category === 'Saved') {
        const savedIds = getSavedRecipeIds();
        results = results.filter((r) => savedIds.includes(r.id));
      } else {
        results = results.filter((r) => r.category.toLowerCase() === filters.category!.toLowerCase());
      }
    }

    if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }

    if (filters?.activeTag) {
      results = results.filter((r) => r.tags.includes(filters.activeTag!));
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'calories-asc':
          results.sort((a, b) => a.calories - b.calories);
          break;
        case 'calories-desc':
          results.sort((a, b) => b.calories - a.calories);
          break;
        case 'protein-desc':
          results.sort((a, b) => b.protein - a.protein);
          break;
        case 'time-asc':
          results.sort((a, b) => a.cookTimeMin - b.cookTimeMin);
          break;
        case 'rating-desc':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          // default order
          break;
      }
    }

    return results;
  },

  /**
   * Retrieves single recipe by ID.
   */
  async getRecipeById(id: string): Promise<Recipe | null> {
    await new Promise((res) => setTimeout(res, 150));
    return SAMPLE_RECIPES.find((r) => r.id === id) || null;
  },

  /**
   * Toggles bookmark/saved state for a recipe.
   */
  async toggleSaveRecipe(id: string): Promise<{ isSaved: boolean; count: number }> {
    const current = getSavedRecipeIds();
    let updated: string[];
    let isSaved: boolean;

    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
      isSaved = false;
    } else {
      updated = [...current, id];
      isSaved = true;
    }

    saveRecipeIds(updated);
    return { isSaved, count: updated.length };
  },

  /**
   * Subscribes an email to the weekly FitDiet wellness newsletter.
   */
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 600));

    // Basic email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address (e.g., name@domain.com).');
    }

    return {
      success: true,
      message: `Welcome to FitDiet! We've sent a confirmation email to ${email}.`,
    };
  },

  /**
   * Clinical Mifflin-St Jeor daily calorie and macro calculator
   */
  calculateCalorieNeeds(input: CalorieCalculationInput): CalorieCalculationResult {
    // Mifflin-St Jeor Equation:
    // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    let bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age;
    if (input.gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Physical activity multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
    };
    const multiplier = activityMultipliers[input.activityLevel] || 1.375;
    const tdee = Math.round(bmr * multiplier);

    // Goal adjustment
    let targetCalories = tdee;
    if (input.goal === 'loss') {
      targetCalories = Math.round(tdee - 450); // safe moderate deficit
    } else if (input.goal === 'gain') {
      targetCalories = Math.round(tdee + 350); // clean surplus
    }

    // Nutrient breakdown recommendations
    // Protein: ~1.8g to 2.0g per kg bodyweight
    const proteinGrams = Math.round(input.weightKg * 1.8);
    const proteinCalories = proteinGrams * 4;

    // Fat: ~25% to 30% of target calories
    const fatCalories = targetCalories * 0.28;
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: remainder of calories
    const remainingCalories = Math.max(targetCalories - (proteinCalories + fatCalories), 200);
    const carbGrams = Math.round(remainingCalories / 4);

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
    };
  },
};
