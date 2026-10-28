import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { Button } from './Button';

interface DesignSystemDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateLoading: () => void;
  onSimulateError: () => void;
  onSimulateEmpty: () => void;
  onTriggerToast: (type: 'success' | 'error' | 'info') => void;
}

export const DesignSystemDrawer: React.FC<DesignSystemDrawerProps> = ({
  isOpen,
  onClose,
  onSimulateLoading,
  onSimulateError,
  onSimulateEmpty,
  onTriggerToast,
}) => {
  const [activeChip, setActiveChip] = useState('High protein');
  const [sampleInput, setSampleInput] = useState('example@fitdiet.com');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shared Design System Inspector"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-lg h-full bg-[#FAF5EE] border-l border-[#E2D3BE] shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 bg-[#2C1810] text-white flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Palette className="w-5 h-5 text-[#E8B86D]" />
            <div>
              <h2 className="text-lg font-bold font-display">Shared Design System</h2>
              <p className="text-xs text-[#E8B86D]/90">FitDiet Core UI Component Library (Warm Brown Palette)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close design system inspector"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-8 text-sm">
          {/* 1. Color Palette Tokens */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-3">
              1. Color Palette Tokens
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#2C1810] text-white">
                <span className="font-bold block">Espresso Brown</span>
                <span className="opacity-75 font-mono text-[11px]">#2C1810 · Primary Dark</span>
              </div>
              <div className="p-3 rounded-xl bg-[#7A4325] text-white">
                <span className="font-bold block">Cocoa Brown</span>
                <span className="opacity-75 font-mono text-[11px]">#7A4325 · Actions</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8B86D] text-[#2C1810]">
                <span className="font-bold block">Caramel Gold</span>
                <span className="opacity-75 font-mono text-[11px]">#E8B86D · Accents</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0E5D5] text-[#2C1810] border border-[#E2D3BE]">
                <span className="font-bold block">Darker Cream / Sand</span>
                <span className="opacity-75 font-mono text-[11px]">#F0E5D5 · Sections</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF5EE] text-[#2C1810] border border-[#E2D3BE] col-span-2">
                <span className="font-bold block">Warm Oat Canvas</span>
                <span className="opacity-75 font-mono text-[11px]">#FAF5EE · Canvas Base</span>
              </div>
            </div>
          </section>

          {/* 2. Typography Pairings */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-3">
              2. Typography System
            </h3>
            <div className="p-4 bg-[#FDFBF7] border border-[#E2D3BE] rounded-2xl space-y-2">
              <p className="font-display font-bold text-lg text-[#2C1810]">
                Bricolage Grotesque (Headings & Display)
              </p>
              <p className="font-sans text-xs text-[#2C1810]/80 leading-relaxed">
                Figtree (Body prose, nutritional metrics, and interface controls). Tabular numerals:{' '}
                <span className="font-semibold tabular-nums">480 kcal · 32g protein · 18 min</span>
              </p>
            </div>
          </section>

          {/* 3. Button Component Variants */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-3">
              3. Button Variants
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">
                Primary Button
              </Button>
              <Button variant="outline" size="sm">
                Outline Button
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="lime" size="sm">
                Caramel Accent
              </Button>
              <Button variant="ghost" size="sm">
                Ghost Link
              </Button>
              <Button variant="primary" size="sm" isLoading>
                Loading
              </Button>
            </div>
          </section>

          {/* 4. Filter Chips */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-3">
              4. Filter Chips (Interactive State)
            </h3>
            <div className="flex flex-wrap gap-2">
              {['High protein', 'Vegan', 'High fibre', 'Low carb'].map((chip) => {
                const isActive = activeChip === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2C1810] text-[#E8B86D] shadow-xs'
                        : 'bg-[#F0E5D5] border border-[#E2D3BE] text-[#2C1810] hover:bg-[#E5D7C2]'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Form Field States */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-3">
              5. Form Fields
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#2C1810] mb-1">
                  Active Input Field
                </label>
                <input
                  type="text"
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D3BE] rounded-xl text-xs text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-red-700 mb-1">
                  Validation Error State
                </label>
                <input
                  type="text"
                  defaultValue="invalid-email"
                  className="w-full px-3.5 py-2 bg-red-50 border border-red-300 rounded-xl text-xs text-red-900 focus-visible:ring-2 focus-visible:ring-red-500"
                />
                <span className="text-[11px] text-red-600 mt-1 block">
                  Please enter a valid email address.
                </span>
              </div>
            </div>
          </section>

          {/* 6. Live Interactive State Demonstrations */}
          <section className="pt-4 border-t border-[#E2D3BE]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C1810]/70 mb-2">
              6. State Demonstrations (Live)
            </h3>
            <p className="text-xs text-[#2C1810]/70 mb-3">
              Trigger UI states to verify responsiveness and fallback compliance:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onSimulateLoading();
                  onClose();
                }}
              >
                Trigger Loading Skeletons
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onSimulateEmpty();
                  onClose();
                }}
              >
                Trigger Empty Query State
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onSimulateError();
                  onClose();
                }}
              >
                Trigger Error with Retry
              </Button>

              <Button
                variant="lime"
                size="sm"
                onClick={() => onTriggerToast('success')}
              >
                Test Success Toast
              </Button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
};
