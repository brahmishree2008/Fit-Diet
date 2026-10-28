import React from 'react';
import { AlertCircle, RefreshCw, SearchX } from 'lucide-react';
import { Button } from './Button';

/**
 * Loading Skeleton Card Grid
 */
export const LoadingSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div
      role="status"
      aria-label="Loading recipes"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl overflow-hidden flex flex-col animate-pulse"
        >
          {/* Photo placeholder */}
          <div className="w-full aspect-[4/3] bg-[#E5D7C2]" />

          {/* Content placeholder */}
          <div className="p-5 flex flex-col flex-1 gap-3">
            {/* Meta row */}
            <div className="flex items-center gap-2">
              <div className="h-3.5 bg-[#E2D3BE] rounded w-20" />
              <div className="h-3.5 bg-[#E2D3BE] rounded w-12" />
              <div className="h-3.5 bg-[#E2D3BE] rounded w-14" />
            </div>

            {/* Title */}
            <div className="h-6 bg-[#E2D3BE] rounded w-3/4" />
            <div className="h-3.5 bg-[#E5D7C2] rounded w-full" />
            <div className="h-3.5 bg-[#E5D7C2] rounded w-2/3" />

            {/* Nutrition row */}
            <div className="mt-auto pt-4 border-t border-[#E2D3BE]/60 flex items-center justify-between">
              <div className="h-4 bg-[#E2D3BE] rounded w-16" />
              <div className="h-4 bg-[#E2D3BE] rounded w-20" />
              <div className="h-8 bg-[#E2D3BE] rounded-full w-8" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading delicious recipes...</span>
    </div>
  );
};

/**
 * Empty State view for search/filtering
 */
export const EmptyState: React.FC<{
  query?: string;
  onReset: () => void;
}> = ({ query, onReset }) => {
  return (
    <div className="py-16 px-6 text-center bg-[#FDFBF7] border border-dashed border-[#E2D3BE] rounded-3xl max-w-xl mx-auto my-8">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F0E5D5] text-[#7A4325] flex items-center justify-center">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold font-display text-[#2C1810] mb-2">
        No recipes found
      </h3>
      <p className="text-sm text-[#2C1810]/70 max-w-md mx-auto mb-6">
        {query
          ? `We couldn't find any recipes matching "${query}". Try adjusting your keywords or clearing active filters.`
          : 'There are no recipes matching the selected dietary filters right now.'}
      </p>
      <Button variant="outline" size="sm" onClick={onReset}>
        Clear all filters & search
      </Button>
    </div>
  );
};

/**
 * Error State view with Retry action
 */
export const ErrorState: React.FC<{
  message?: string;
  onRetry: () => void;
}> = ({ message, onRetry }) => {
  return (
    <div
      role="alert"
      className="py-12 px-6 text-center bg-[#FFF8F5] border border-orange-200 rounded-3xl max-w-xl mx-auto my-8"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 text-[#7A4325] flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold font-display text-[#2C1810] mb-1">
        Unable to load recipes
      </h3>
      <p className="text-sm text-[#2C1810]/70 mb-5 max-w-md mx-auto">
        {message || 'Something went wrong while retrieving recipe data. Please try again.'}
      </p>
      <Button
        variant="primary"
        size="sm"
        onClick={onRetry}
        leftIcon={<RefreshCw className="w-4 h-4" />}
      >
        Retry connection
      </Button>
    </div>
  );
};
