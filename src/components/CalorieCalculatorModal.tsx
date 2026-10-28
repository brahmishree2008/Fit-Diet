import React, { useState } from 'react';
import { X, Calculator, Flame, Dumbbell, Sparkles, ArrowRight } from 'lucide-react';
import { CalorieCalculationInput } from '../types/recipe';
import { recipeApi } from '../services/recipeApi';
import { Button } from './Button';

interface CalorieCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGoal?: (targetCalories: number) => void;
}

export const CalorieCalculatorModal: React.FC<CalorieCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyGoal,
}) => {
  const [form, setForm] = useState<CalorieCalculationInput>({
    age: 28,
    gender: 'female',
    weightKg: 65,
    heightCm: 168,
    activityLevel: 'moderate',
    goal: 'maintain',
  });

  if (!isOpen) return null;

  const result = recipeApi.calculateCalorieNeeds(form);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculator-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF5EE] border border-[#E2D3BE] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-6 bg-[#2C1810] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A4325] text-[#E8B86D] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 id="calculator-modal-title" className="text-xl font-bold font-display">
                Daily Calorie & Macro Estimator
              </h2>
              <p className="text-xs text-[#E8B86D]">
                Clinical Mifflin-St Jeor equation for sustainable eating
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close calculator"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Inputs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F0E5D5] border border-[#E2D3BE] rounded-xl">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gender: 'female' })}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    form.gender === 'female'
                      ? 'bg-[#2C1810] text-white shadow-xs'
                      : 'text-[#2C1810]/70 hover:text-[#2C1810]'
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, gender: 'male' })}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    form.gender === 'male'
                      ? 'bg-[#2C1810] text-white shadow-xs'
                      : 'text-[#2C1810]/70 hover:text-[#2C1810]'
                  }`}
                >
                  Male
                </button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="calc-age" className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Age (years)
              </label>
              <input
                id="calc-age"
                type="number"
                min="14"
                max="100"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: Math.max(14, Number(e.target.value)) })}
                className="w-full px-3 py-2 bg-white border border-[#E2D3BE] rounded-xl text-sm font-semibold text-[#2C1810] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="calc-weight" className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Weight (kg)
              </label>
              <input
                id="calc-weight"
                type="number"
                min="35"
                max="220"
                value={form.weightKg}
                onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-[#E2D3BE] rounded-xl text-sm font-semibold text-[#2C1810] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              />
            </div>

            {/* Height */}
            <div>
              <label htmlFor="calc-height" className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Height (cm)
              </label>
              <input
                id="calc-height"
                type="number"
                min="120"
                max="230"
                value={form.heightCm}
                onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-[#E2D3BE] rounded-xl text-sm font-semibold text-[#2C1810] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label htmlFor="calc-activity" className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Activity
              </label>
              <select
                id="calc-activity"
                value={form.activityLevel}
                onChange={(e) =>
                  setForm({ ...form, activityLevel: e.target.value as CalorieCalculationInput['activityLevel'] })
                }
                className="w-full px-3 py-2 bg-white border border-[#E2D3BE] rounded-xl text-xs font-medium text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              >
                <option value="sedentary">Sedentary (office job)</option>
                <option value="light">Light (1-2 days/wk)</option>
                <option value="moderate">Moderate (3-5 days/wk)</option>
                <option value="very_active">Very active (6-7 days/wk)</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label htmlFor="calc-goal" className="block text-xs font-semibold text-[#2C1810] mb-1.5">
                Target Goal
              </label>
              <select
                id="calc-goal"
                value={form.goal}
                onChange={(e) =>
                  setForm({ ...form, goal: e.target.value as CalorieCalculationInput['goal'] })
                }
                className="w-full px-3 py-2 bg-white border border-[#E2D3BE] rounded-xl text-xs font-medium text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              >
                <option value="loss">Healthy Deficit (-450 kcal)</option>
                <option value="maintain">Maintain Baseline Weight</option>
                <option value="gain">Lean Muscle Surplus (+350 kcal)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#FDFBF7] border border-[#7A4325]/30 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D3BE]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A4325]">
                  Recommended Intake
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-4xl font-extrabold font-display text-[#2C1810] tabular-nums">
                    {result.targetCalories}
                  </span>
                  <span className="text-base font-semibold text-[#2C1810]/70">kcal / day</span>
                </div>
              </div>

              <div className="text-xs text-[#2C1810]/70 space-y-1">
                <div>
                  Basal Metabolism (BMR): <span className="font-semibold text-[#2C1810] tabular-nums">{result.bmr} kcal</span>
                </div>
                <div>
                  Total Expenditure (TDEE): <span className="font-semibold text-[#2C1810] tabular-nums">{result.tdee} kcal</span>
                </div>
              </div>
            </div>

            {/* Daily Macro Targets */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="p-3 bg-[#F0E5D5] rounded-xl">
                <span className="text-[11px] font-semibold text-[#2C1810]/60 block mb-0.5">
                  Daily Protein
                </span>
                <span className="text-xl font-bold font-display text-[#7A4325] tabular-nums">
                  {result.proteinGrams}g
                </span>
                <span className="text-[10px] text-[#2C1810]/60 block">1.8g / kg</span>
              </div>

              <div className="p-3 bg-[#F0E5D5] rounded-xl">
                <span className="text-[11px] font-semibold text-[#2C1810]/60 block mb-0.5">
                  Carbohydrates
                </span>
                <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                  {result.carbGrams}g
                </span>
                <span className="text-[10px] text-[#2C1810]/60 block">fuel & fiber</span>
              </div>

              <div className="p-3 bg-[#F0E5D5] rounded-xl">
                <span className="text-[11px] font-semibold text-[#2C1810]/60 block mb-0.5">
                  Healthy Fats
                </span>
                <span className="text-xl font-bold font-display text-[#2C1810] tabular-nums">
                  {result.fatGrams}g
                </span>
                <span className="text-[10px] text-[#2C1810]/60 block">~28% energy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#F0E5D5] border-t border-[#E2D3BE] flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onApplyGoal) onApplyGoal(result.targetCalories);
              onClose();
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Recipes For My Plan
          </Button>
        </div>
      </div>
    </div>
  );
};
