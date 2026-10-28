import React, { useState } from 'react';
import { Clock, Star, Bookmark, Flame, UtensilsCrossed } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
  onOpenDetails: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isSaved,
  onToggleSave,
  onOpenDetails,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-[#FDFBF7] border border-[#E2D3BE] hover:border-[#7A4325]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md">
      {/* Visual media banner */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5D7C2]">
        {!imgError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => onOpenDetails(recipe)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-gradient-to-br from-[#FDFBF7] to-[#E5D7C2]"
            onClick={() => onOpenDetails(recipe)}
          >
            <UtensilsCrossed className="w-8 h-8 text-[#7A4325] mb-2 opacity-80" />
            <p className="font-display font-semibold text-sm text-[#2C1810]">{recipe.title}</p>
          </div>
        )}

        {/* Quick Tag Floater (discrete, clean) */}
        {recipe.tags[0] && (
          <div className="absolute top-3 left-3 bg-[#2C1810]/90 backdrop-blur-xs text-[#E8B86D] text-xs font-semibold px-2.5 py-1 rounded-md tracking-wide shadow-xs">
            {recipe.tags[0]}
          </div>
        )}

        {/* Save Bookmark Action */}
        <button
          type="button"
          aria-label={isSaved ? `Remove ${recipe.title} from saved` : `Save ${recipe.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(recipe);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xs transition-all duration-200 shadow-sm cursor-pointer ${
            isSaved
              ? 'bg-[#2C1810] text-[#E8B86D] ring-2 ring-[#E8B86D]/80'
              : 'bg-white/90 text-[#2C1810] hover:bg-white hover:text-[#7A4325]'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata row with typographic separators */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#2C1810]/70 mb-2">
          <span>{recipe.category}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#7A4325]" />
            <span className="tabular-nums">{recipe.cookTimeMin}</span> min
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-[#2C1810]">
            <Star className="w-3.5 h-3.5 fill-[#7A4325] text-[#7A4325]" />
            <span className="font-semibold tabular-nums">{recipe.rating}</span>
            <span className="text-[#2C1810]/50">({recipe.reviewCount})</span>
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(recipe)}
          className="text-lg font-bold font-display text-[#2C1810] hover:text-[#7A4325] cursor-pointer transition-colors line-clamp-1 mb-1.5"
        >
          {recipe.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-[#2C1810]/75 line-clamp-2 leading-relaxed mb-4">
          {recipe.description}
        </p>

        {/* Nutritional values footer */}
        <div className="mt-auto pt-3.5 border-t border-[#E2D3BE]/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium text-[#2C1810]">
            <Flame className="w-4 h-4 text-[#7A4325]" />
            <span className="font-bold tabular-nums text-sm">{recipe.calories}</span>
            <span className="text-[#2C1810]/70">kcal</span>
          </div>

          <div className="flex items-center gap-3 text-[#2C1810]/80">
            <div>
              <span className="font-bold text-[#2C1810] tabular-nums">{recipe.protein}g</span>{' '}
              <span className="text-[11px] text-[#2C1810]/60">protein</span>
            </div>
            <div className="hidden xs:block">
              <span className="font-medium tabular-nums">{recipe.carbs}g</span>{' '}
              <span className="text-[11px] text-[#2C1810]/60">carbs</span>
            </div>
            <div className="hidden xs:block">
              <span className="font-medium tabular-nums">{recipe.fat}g</span>{' '}
              <span className="text-[11px] text-[#2C1810]/60">fat</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
