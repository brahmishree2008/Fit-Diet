/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Flame,
  Clock,
  Dumbbell,
  Sparkles,
  Calculator,
  CalendarCheck,
  ArrowRight,
  Filter,
  Palette,
  RotateCcw,
} from 'lucide-react';

import { Recipe, FilterOptions, DietaryTag, ToastMessage } from './types/recipe';
import { recipeApi, getSavedRecipeIds } from './services/recipeApi';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { CalorieCalculatorModal } from './components/CalorieCalculatorModal';
import { AuthModal } from './components/AuthModal';
import { DesignSystemDrawer } from './components/DesignSystemDrawer';
import { LoadingSkeletonGrid, EmptyState, ErrorState } from './components/StateViews';
import { ToastContainer } from './components/Toast';
import { Button } from './components/Button';

export default function App() {
  // Recipes & data state
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [category, setCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<DietaryTag | null>(null);
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('featured');

  // Modals & Drawers
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup',
  });
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // User state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Ref to recipes section for smooth auto-scroll
  const recipesSectionRef = useRef<HTMLElement>(null);

  const notify = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial load
  const loadRecipes = async (
    customCategory?: string,
    customQuery?: string,
    customTag?: DietaryTag | null,
    customSort?: FilterOptions['sortBy'],
    shouldSimulateError = false
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await recipeApi.getRecipes(
        {
          category: customCategory !== undefined ? customCategory : category,
          searchQuery: customQuery !== undefined ? customQuery : searchQuery,
          activeTag: customTag !== undefined ? customTag : activeTag,
          sortBy: customSort !== undefined ? customSort : sortBy,
        },
        300,
        shouldSimulateError
      );
      setRecipes(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch recipes.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSavedIds(getSavedRecipeIds());
    loadRecipes();
  }, []);

  // Re-fetch when filters change
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    loadRecipes(newCat, searchQuery, activeTag, sortBy);
  };

  const handleTagToggle = (tag: DietaryTag) => {
    const nextTag = activeTag === tag ? null : tag;
    setActiveTag(nextTag);
    loadRecipes(category, searchQuery, nextTag, sortBy);
    if (recipesSectionRef.current) {
      recipesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecipes(category, searchQuery, activeTag, sortBy);
    if (recipesSectionRef.current) {
      recipesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setActiveTag(null);
    setSortBy('featured');
    loadRecipes('All', '', null, 'featured');
  };

  const handleToggleSave = async (recipe: Recipe) => {
    try {
      const { isSaved } = await recipeApi.toggleSaveRecipe(recipe.id);
      setSavedIds(getSavedRecipeIds());
      notify(
        'success',
        isSaved
          ? `Added "${recipe.title}" to your saved recipes.`
          : `Removed "${recipe.title}" from saved recipes.`,
        isSaved ? 'Recipe Saved' : 'Removed'
      );
      if (category === 'Saved') {
        loadRecipes('Saved', searchQuery, activeTag, sortBy);
      }
    } catch {
      notify('error', 'Could not update saved recipe state.');
    }
  };

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const dietaryChips: DietaryTag[] = ['High protein', 'Vegan', 'High fibre', 'Low carb'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#2C1810]">
      {/* Sticky Top Header */}
      <Header
        savedCount={savedIds.length}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onSelectCategory={(cat) => handleCategoryChange(cat)}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          notify('info', 'You have been logged out.');
        }}
      />

      <main id="main-content" className="flex-1">
        {/* ========================================================
            1. HERO SECTION
           ======================================================== */}
        <section
          id="hero"
          className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#E2D3BE]"
        >
          {/* Subtle background ambient glow in warm caramel/amber tones */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8B86D]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#7A4325]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline, Search, Quick Chips */}
              <div className="lg:col-span-7 space-y-6">
                {/* Clean domain kicker */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0E5D5] border border-[#E2D3BE] text-xs font-semibold text-[#2C1810]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7A4325]" />
                  <span>Real Food · Transparent Macros · Zero Guesswork</span>
                </div>

                {/* Primary Hero Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#2C1810] text-balance leading-[1.08]">
                  Eat well without the{' '}
                  <span className="relative inline-block text-[#7A4325]">
                    guesswork.
                    <span className="absolute left-0 bottom-1 w-full h-3 bg-[#E8B86D]/45 -z-10 rounded-xs" />
                  </span>
                </h1>

                {/* Subtext */}
                <p className="text-base sm:text-lg text-[#2C1810]/80 max-w-xl leading-relaxed">
                  Discover dietitian-crafted recipes, understand clean macro targets at a
                  glance, calculate your daily energy needs, and organize weekly meals with ease.
                </p>

                {/* Search Bar Form */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="p-1.5 bg-white border border-[#E2D3BE] rounded-2xl shadow-sm flex items-center gap-2 max-w-xl focus-within:ring-2 focus-within:ring-[#7A4325] focus-within:border-transparent transition-all"
                >
                  <div className="pl-3 text-[#2C1810]/50">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search by ingredient, dish or goal (e.g. quinoa, wrap, paneer)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search recipes"
                    className="flex-1 py-2 text-sm sm:text-base text-[#2C1810] placeholder-[#2C1810]/40 bg-transparent focus-visible:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        loadRecipes(category, '', activeTag, sortBy);
                      }}
                      aria-label="Clear search input"
                      className="p-1.5 text-[#2C1810]/40 hover:text-[#2C1810] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="rounded-xl px-5"
                  >
                    Search
                  </Button>
                </form>

                {/* Quick Filter Chips */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2C1810]/60">
                    Popular Dietary Goals:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {dietaryChips.map((chip) => {
                      const isActive = activeTag === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleTagToggle(chip)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-[#2C1810] text-[#E8B86D] shadow-xs ring-1 ring-[#2C1810]'
                              : 'bg-[#F0E5D5] border border-[#E2D3BE] text-[#2C1810] hover:bg-[#E5D7C2]'
                          }`}
                        >
                          {chip} {isActive && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Plate Illustration with Floating Stat Badges */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Decorative warm caramel glow backing */}
                  <div className="absolute inset-0 bg-[#E8B86D]/30 rounded-full scale-95 blur-2xl -z-10" />

                  {/* Food Plate Asset */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#FDFBF7] bg-[#E5D7C2]">
                    <img
                      src="/src/assets/images/hero_nourish_plate_1793204607372.jpg"
                      alt="Artisanal healthy balanced meal on a ceramic plate"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Floating Stat Badge 1: 480 kcal (Top Right) */}
                  <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#E2D3BE] px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in duration-500">
                    <div className="w-8 h-8 rounded-xl bg-[#7A4325] text-[#E8B86D] flex items-center justify-center shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-[#2C1810]/60 uppercase font-bold tracking-wider block">
                        Balanced Energy
                      </span>
                      <span className="text-base font-extrabold font-display text-[#2C1810] tabular-nums">
                        480 kcal
                      </span>
                    </div>
                  </div>

                  {/* Floating Stat Badge 2: 32 g protein (Bottom Left) */}
                  <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md border border-[#E2D3BE] px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in duration-500">
                    <div className="w-8 h-8 rounded-xl bg-[#2C1810] text-[#E8B86D] flex items-center justify-center shrink-0">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-[#2C1810]/60 uppercase font-bold tracking-wider block">
                        Clean Protein
                      </span>
                      <span className="text-base font-extrabold font-display text-[#7A4325] tabular-nums">
                        32 g protein
                      </span>
                    </div>
                  </div>

                  {/* Floating Stat Badge 3: 18 min (Bottom Right) */}
                  <div className="absolute bottom-6 right-0 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#E2D3BE] px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5 animate-in fade-in duration-500">
                    <Clock className="w-4 h-4 text-[#7A4325] shrink-0" />
                    <span className="text-xs font-bold text-[#2C1810] tabular-nums">
                      18 min prep
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. FEATURED RECIPES SECTION
           ======================================================== */}
        <section
          ref={recipesSectionRef}
          id="recipes"
          className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A4325] mb-1.5 block">
                Nourishing Kitchen
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#2C1810]">
                Featured Healthy Recipes
              </h2>
              <p className="text-sm text-[#2C1810]/70 mt-1 max-w-xl">
                Every dish includes verified nutrient tables, realistic cooking times, and
                customizable portions to fit your daily lifestyle.
              </p>
            </div>

            {/* Sort & Quick Reset Controls */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#2C1810]/70">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  const val = e.target.value as FilterOptions['sortBy'];
                  setSortBy(val);
                  loadRecipes(category, searchQuery, activeTag, val);
                }}
                className="px-3 py-2 bg-[#F0E5D5] border border-[#E2D3BE] rounded-xl text-xs font-semibold text-[#2C1810] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              >
                <option value="featured">Featured Picks</option>
                <option value="calories-asc">Lowest Calories</option>
                <option value="calories-desc">Highest Calories</option>
                <option value="protein-desc">Highest Protein</option>
                <option value="time-asc">Quickest (Time)</option>
                <option value="rating-desc">Top Rated (Stars)</option>
              </select>

              {(searchQuery || activeTag || category !== 'All') && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#7A4325] hover:text-[#2C1810] hover:bg-[#F0E5D5] rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-[#E2D3BE] pb-4 mb-8 overflow-x-auto">
            <div className="flex items-center gap-2">
              {categories.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#2C1810] text-white shadow-xs'
                        : 'text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#F0E5D5]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handleCategoryChange('Saved')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  category === 'Saved'
                    ? 'bg-[#2C1810] text-white shadow-xs'
                    : 'text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#F0E5D5]'
                }`}
              >
                <span>Saved Bookmarks</span>
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full tabular-nums font-bold ${
                    category === 'Saved'
                      ? 'bg-[#E8B86D] text-[#2C1810]'
                      : 'bg-[#F0E5D5] text-[#2C1810]'
                  }`}
                >
                  {savedIds.length}
                </span>
              </button>
            </div>

            {/* Active Tag indicator badge */}
            {activeTag && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#7A4325] bg-[#FDFBF7] border border-[#7A4325]/30 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                <span>Filter: <strong>{activeTag}</strong></span>
                <button
                  type="button"
                  onClick={() => handleTagToggle(activeTag)}
                  aria-label="Remove filter"
                  className="hover:text-red-700 ml-1"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Grid Content / State Handling */}
          {isLoading ? (
            <LoadingSkeletonGrid count={6} />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() => loadRecipes(category, searchQuery, activeTag, sortBy)}
            />
          ) : recipes.length === 0 ? (
            <EmptyState
              query={searchQuery || activeTag || (category !== 'All' ? category : undefined)}
              onReset={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedIds.includes(recipe.id)}
                  onToggleSave={handleToggleSave}
                  onOpenDetails={(r) => setSelectedRecipe(r)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            3. BENEFITS SECTION
           ======================================================== */}
        <section
          id="benefits"
          className="py-16 md:py-24 bg-[#F0E5D5] border-y border-[#E2D3BE]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A4325] mb-1.5 block">
                Why FitDiet Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#2C1810]">
                Built for Sustainable Health, Not Extreme Diets
              </h2>
              <p className="text-sm sm:text-base text-[#2C1810]/75 mt-2">
                We remove the confusion from nutrition by combining transparent food data with
                practical tools you can use every single day.
              </p>
            </div>

            {/* 4 Benefits Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1: Filterable recipes */}
              <div className="bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#2C1810] text-[#E8B86D] flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#2C1810] mb-2">
                  Filterable Recipes
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed">
                  Pinpoint meals by dietary goals: high protein for strength, high fiber for
                  digestion, or plant-powered vegan bowls in seconds.
                </p>
              </div>

              {/* Benefit 2: Nutrition at a glance */}
              <div className="bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#7A4325] text-white flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#2C1810] mb-2">
                  Nutrition at a Glance
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed">
                  No hidden sugars or cryptic labels. Every recipe prominently shows exact
                  calories, proteins, complex carbs, and healthy fats.
                </p>
              </div>

              {/* Benefit 3: Weekly meal planning */}
              <div className="bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#2C1810] text-[#E8B86D] flex items-center justify-center mb-4">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#2C1810] mb-2">
                  Weekly Meal Planning
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed">
                  Save your favorite dishes to build a cohesive weekly menu. Reduce grocery waste
                  and skip weeknight dinner decision fatigue.
                </p>
              </div>

              {/* Benefit 4: Clearly labelled calorie estimates */}
              <div className="bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#E8B86D] text-[#2C1810] flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#2C1810] mb-2">
                  Calorie Estimates
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1810]/75 leading-relaxed">
                  Scientifically grounded Mifflin-St Jeor daily energy estimates so you eat to
                  fuel your body without extreme deprivation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. HOW IT WORKS SECTION
           ======================================================== */}
        <section id="how-it-works" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A4325] mb-1.5 block">
              Simple 3-Step Routine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#2C1810]">
              How FitDiet Fits Into Your Life
            </h2>
            <p className="text-sm sm:text-base text-[#2C1810]/75 mt-2">
              Transforming your nutrition doesn't require complex spreadsheets. Follow three
              grounded steps to take control of what you eat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-8 rounded-3xl bg-[#FDFBF7] border border-[#E2D3BE] flex flex-col">
              <div className="text-3xl font-extrabold font-display text-[#7A4325] mb-4">
                01.
              </div>
              <h3 className="text-xl font-bold font-display text-[#2C1810] mb-2.5">
                Find a recipe
              </h3>
              <p className="text-sm text-[#2C1810]/75 leading-relaxed mb-6 flex-1">
                Explore wholesome breakfast bowls, 15-minute lunches, and satisfying dinners.
                Filter by prep time, calories, or dietary preference.
              </p>
              <div className="pt-4 border-t border-[#E2D3BE]/70">
                <a
                  href="#recipes"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A4325] hover:text-[#2C1810] transition-colors"
                >
                  <span>Browse recipes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-3xl bg-[#FDFBF7] border border-[#E2D3BE] flex flex-col">
              <div className="text-3xl font-extrabold font-display text-[#7A4325] mb-4">
                02.
              </div>
              <h3 className="text-xl font-bold font-display text-[#2C1810] mb-2.5">
                Check your needs
              </h3>
              <p className="text-sm text-[#2C1810]/75 leading-relaxed mb-6 flex-1">
                Use our validated calorie calculator to discover your baseline energy needs and
                personalized daily protein targets.
              </p>
              <div className="pt-4 border-t border-[#E2D3BE]/70">
                <button
                  type="button"
                  onClick={() => setIsCalculatorOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A4325] hover:text-[#2C1810] transition-colors cursor-pointer"
                >
                  <span>Calculate daily target</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-3xl bg-[#FDFBF7] border border-[#E2D3BE] flex flex-col">
              <div className="text-3xl font-extrabold font-display text-[#7A4325] mb-4">
                03.
              </div>
              <h3 className="text-xl font-bold font-display text-[#2C1810] mb-2.5">
                Plan your week
              </h3>
              <p className="text-sm text-[#2C1810]/75 leading-relaxed mb-6 flex-1">
                Save meals with one click, assemble your weekly rotation, and generate simple
                grocery lists without last-minute stress.
              </p>
              <div className="pt-4 border-t border-[#E2D3BE]/70">
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryChange('Saved');
                    if (recipesSectionRef.current) {
                      recipesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A4325] hover:text-[#2C1810] transition-colors cursor-pointer"
                >
                  <span>View saved meal list</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. CLOSING CALL TO ACTION SECTION
           ======================================================== */}
        <section className="py-16 md:py-24 bg-[#2C1810] text-[#FAF5EE] relative overflow-hidden">
          {/* Subtle accent background orb */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-[#7A4325]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A4325]/60 text-[#E8B86D] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Nutrition Guidance</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Start with your daily calories.
            </h2>

            <p className="text-base sm:text-lg text-[#FAF5EE]/80 max-w-2xl mx-auto leading-relaxed">
              Find out exactly how much fuel your body needs for energy, fat loss, or muscle
              maintenance. It takes less than 60 seconds.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="lime"
                size="lg"
                onClick={() => setIsCalculatorOpen(true)}
                leftIcon={<Calculator className="w-5 h-5 text-[#2C1810]" />}
              >
                Open Calorie Estimator
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  handleCategoryChange('All');
                  if (recipesSectionRef.current) {
                    recipesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Browse All 8 Recipes
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer
        onNotify={notify}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Floating Design System Drawer Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsDesignSystemOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2C1810] text-[#E8B86D] hover:bg-[#3D2317] border border-[#E8B86D]/30 text-xs font-bold shadow-lg transition-all hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B86D]"
          aria-label="Open Design System Inspector"
        >
          <Palette className="w-4 h-4" />
          <span>Design System</span>
        </button>
      </div>

      {/* Modals & Dialogs */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={Boolean(selectedRecipe)}
        isSaved={selectedRecipe ? savedIds.includes(selectedRecipe.id) : false}
        onClose={() => setSelectedRecipe(null)}
        onToggleSave={handleToggleSave}
      />

      <CalorieCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyGoal={(targetKcal) => {
          notify(
            'success',
            `Target updated to ${targetKcal} kcal/day! Filtered recipes to match your energy goals.`,
            'Calorie Goal Set'
          );
          if (recipesSectionRef.current) {
            recipesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onSuccess={(name, email) => {
          setCurrentUser({ name, email });
          notify('success', `Welcome, ${name}! Your meal plans are now synchronized.`, 'Signed In');
        }}
      />

      <DesignSystemDrawer
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
        onSimulateLoading={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1200);
        }}
        onSimulateEmpty={() => {
          setRecipes([]);
          notify('info', 'Showing empty state preview.');
        }}
        onSimulateError={() => {
          setError('Simulated connection error to demonstrate error state.');
        }}
        onTriggerToast={(type) => {
          notify(
            type,
            type === 'success'
              ? 'Berry oat bowl saved to your weekly meal plan.'
              : type === 'error'
              ? 'Could not connect to the recipe server.'
              : 'FitDiet uses general nutrition guidance, not medical prescriptions.',
            type === 'success' ? 'Saved' : type === 'error' ? 'Error' : 'Notice'
          );
        }}
      />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
