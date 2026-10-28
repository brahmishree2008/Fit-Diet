import React, { useEffect } from 'react';
import { X, Clock, Star, Bookmark, Check, ShieldAlert } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { Button } from './Button';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  isSaved,
  onClose,
  onToggleSave,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF5EE] border border-[#E2D3BE] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#E5D7C2] shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close recipe details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Save button */}
          <button
            onClick={() => onToggleSave(recipe)}
            className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#E8B86D] text-[#2C1810]'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved to Plan' : 'Save Recipe'}</span>
          </button>

          {/* Title & category overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-[#E8B86D] mb-1">
              <span>{recipe.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{recipe.cookTimeMin} mins</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#E8B86D] text-[#E8B86D]" />
                <span>{recipe.rating}</span>
                <span className="opacity-75">({recipe.reviewCount} reviews)</span>
              </span>
            </div>
            <h2
              id="recipe-modal-title"
              className="text-2xl sm:text-3xl font-extrabold font-display leading-tight"
            >
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Scrollable details container */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Macro Nutrient Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-[#F0E5D5] border border-[#E2D3BE] rounded-2xl">
            <div className="text-center p-2">
              <span className="text-[11px] font-semibold text-[#2C1810]/60 uppercase tracking-wider block">
                Calories
              </span>
              <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                {recipe.calories}
              </span>
              <span className="text-xs text-[#2C1810]/60 block">kcal</span>
            </div>

            <div className="text-center p-2 border-l border-[#E2D3BE]/70">
              <span className="text-[11px] font-semibold text-[#2C1810]/60 uppercase tracking-wider block">
                Protein
              </span>
              <span className="text-xl font-bold font-display text-[#7A4325] tabular-nums">
                {recipe.protein}g
              </span>
              <span className="text-xs text-[#2C1810]/60 block">clean fuel</span>
            </div>

            <div className="text-center p-2 border-l border-[#E2D3BE]/70">
              <span className="text-[11px] font-semibold text-[#2C1810]/60 uppercase tracking-wider block">
                Carbs
              </span>
              <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                {recipe.carbs}g
              </span>
              <span className="text-xs text-[#2C1810]/60 block">energy</span>
            </div>

            <div className="text-center p-2 border-l border-[#E2D3BE]/70">
              <span className="text-[11px] font-semibold text-[#2C1810]/60 uppercase tracking-wider block">
                Healthy Fat
              </span>
              <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                {recipe.fat}g
              </span>
              <span className="text-xs text-[#2C1810]/60 block">lipids</span>
            </div>

            <div className="text-center p-2 col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-[#E2D3BE]/70">
              <span className="text-[11px] font-semibold text-[#2C1810]/60 uppercase tracking-wider block">
                Fiber
              </span>
              <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                {recipe.fiber || 6}g
              </span>
              <span className="text-xs text-[#2C1810]/60 block">gut health</span>
            </div>
          </div>

          {/* Description & Tags */}
          <div>
            <p className="text-sm text-[#2C1810]/85 leading-relaxed mb-3">
              {recipe.description}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-2.5 py-1 bg-[#2C1810]/10 text-[#2C1810] rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column layout: Ingredients & Preparation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E2D3BE]">
            {/* Ingredients */}
            <div>
              <h4 className="text-base font-bold font-display text-[#2C1810] mb-3 flex items-center justify-between">
                <span>Ingredients</span>
                <span className="text-xs font-normal text-[#2C1810]/60">
                  {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}
                </span>
              </h4>
              <ul className="space-y-2 text-sm text-[#2C1810]/85">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#7A4325] shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Steps */}
            <div>
              <h4 className="text-base font-bold font-display text-[#2C1810] mb-3">
                Preparation Steps
              </h4>
              <ol className="space-y-3 text-sm text-[#2C1810]/85">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#2C1810] text-[#E8B86D] text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E2D3BE] flex items-start gap-2.5 text-xs text-[#2C1810]/70">
            <ShieldAlert className="w-4 h-4 text-[#7A4325] shrink-0 mt-0.5" />
            <span>
              Nutrient breakdowns are nutritional estimates based on USDA ingredient standards.
              Consult your clinical provider for medical diets.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#F0E5D5] border-t border-[#E2D3BE] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onToggleSave(recipe)}
            leftIcon={<Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />}
          >
            {isSaved ? 'Remove from Saved' : 'Add to My Meal Plan'}
          </Button>
        </div>
      </div>
    </div>
  );
};
