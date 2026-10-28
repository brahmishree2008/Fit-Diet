import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { recipeApi } from '../services/recipeApi';
import { Button } from './Button';

interface FooterProps {
  onNotify: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNotify, onOpenCalculator }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubscribing(true);
      const res = await recipeApi.subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail('');
      onNotify('success', res.message, 'Newsletter Subscribed');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Subscription failed. Please retry.';
      setError(msg);
      onNotify('error', msg, 'Subscription Error');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#2C1810] text-[#FAF5EE] border-t border-[#2C1810]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-2.5 text-2xl font-extrabold font-display tracking-tight text-white focus-visible:outline-none"
            >
              <span className="w-8 h-8 rounded-lg bg-[#7A4325] text-[#E8B86D] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10C2 6.477 6.477 2 12 2Z" />
                  <path d="M12 12c-2 2-3 4-3 6" />
                  <path d="M12 12c2-2 4-3 6-3" />
                  <path d="M12 2v20" />
                </svg>
              </span>
              <span>
                Fit<span className="text-[#E8B86D]">Diet</span>
              </span>
            </a>

            <p className="text-sm text-[#FAF5EE]/75 max-w-sm leading-relaxed">
              Wholesome recipes, clear macronutrient transparency, and flexible meal-planning
              tools designed to make nourishing food effortless and sustainable.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#E8B86D] mb-2">
                Get Weekly Nourishment Ideas
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#7A4325]/40 border border-[#7A4325] rounded-xl text-xs text-[#E8B86D]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#E8B86D]" />
                  <span>You are subscribed! Watch your inbox for weekly seasonal recipes.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2 max-w-md">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      aria-label="Email address for weekly newsletter"
                      className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8B86D]"
                    />
                    <Button
                      type="submit"
                      variant="lime"
                      size="sm"
                      isLoading={isSubscribing}
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      Subscribe
                    </Button>
                  </div>
                  {error && <p className="text-xs text-red-300 font-medium">{error}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B86D] mb-4">
              Explore Recipes
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EE]/75">
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  High-Protein Bowls
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Quick 15-Minute Meals
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Plant-Based & Vegan
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Low-Carb Dinners
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Healthy Sweet Snacks
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Nutrition Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B86D] mb-4">
              Nutrition Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EE]/75">
              <li>
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Daily Calorie Needs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Macro Split Calculator
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Weekly Meal Planner
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-white transition-colors">
                  Macro Transparency Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Integrity */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8B86D] mb-4">
              FitDiet
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF5EE]/75">
              <li>
                <a href="#benefits" className="hover:text-white transition-colors">
                  Our Nutrition Philosophy
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Methodology & Sources
                </a>
              </li>
              <li>
                <span className="text-[#FAF5EE]/50 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-[#FAF5EE]/50 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Health & Medical Disclaimer */}
        <div className="my-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-[#FAF5EE]/75 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#E8B86D] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">General Nutrition Disclaimer: </span>
            FitDiet provides generalized nutrition information, recipe ideas, and energy estimations
            for educational and wellness purposes only. It is not individualized medical advice,
            clinical diagnosis, or treatment. Dietary needs vary significantly based on medical
            history, metabolic conditions, and physical activity. Always consult a qualified
            healthcare provider or registered dietitian before beginning a new dietary regimen.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF5EE]/50">
          <p>© {new Date().getFullYear()} FitDiet. Eat well without the guesswork.</p>
          <div className="flex items-center gap-2">
            <span>Crafted for vibrant living</span>
            <span>·</span>
            <span>All recipes lab & kitchen tested</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
