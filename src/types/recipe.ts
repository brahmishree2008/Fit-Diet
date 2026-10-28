export type RecipeCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  cookTimeMin: number;
  rating: number;
  reviewCount: number;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;   // in grams
  image: string;
  tags: string[];
  description: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
}

export type DietaryTag = 'High protein' | 'Vegan' | 'High fibre' | 'Low carb';

export interface FilterOptions {
  category: string; // 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Saved'
  searchQuery: string;
  activeTag: DietaryTag | null;
  sortBy: 'featured' | 'calories-asc' | 'calories-desc' | 'protein-desc' | 'time-asc' | 'rating-desc';
}

export interface CalorieCalculationInput {
  age: number;
  gender: 'female' | 'male';
  weightKg: number;
  heightCm: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  goal: 'loss' | 'maintain' | 'gain';
}

export interface CalorieCalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}
