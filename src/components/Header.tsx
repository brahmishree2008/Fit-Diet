import React, { useState, useEffect } from 'react';
import { Menu, X, Bookmark, Utensils, Sparkles, User, Calculator } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  savedCount: number;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenCalculator: () => void;
  onSelectCategory?: (category: string) => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenAuth,
  onOpenCalculator,
  onSelectCategory,
  currentUser,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Recipes', href: '#recipes' },
    { label: 'Calculator', href: '#calculator', onClick: onOpenCalculator },
    { label: 'Meal Planner', href: '#how-it-works' },
    { label: 'About', href: '#benefits' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF5EE]/95 backdrop-blur-md shadow-xs border-b border-[#E2D3BE]'
          : 'bg-[#FAF5EE] border-b border-[#E2D3BE]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-2xl font-extrabold font-display tracking-tight text-[#2C1810] whitespace-nowrap shrink-0 group focus-visible:outline-none"
          >
            <span className="w-9 h-9 rounded-xl bg-[#2C1810] text-[#E8B86D] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10C2 6.477 6.477 2 12 2Z" />
                <path d="M12 12c-2 2-3 4-3 6" />
                <path d="M12 12c2-2 4-3 6-3" />
                <path d="M12 2v20" />
              </svg>
            </span>
            <span className="text-2xl font-extrabold text-[#2C1810] tracking-tight">
              Fit<span className="text-[#7A4325]">Diet</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Single-line, clean typography) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2C1810]/85"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="hover:text-[#7A4325] transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Saved recipe quick link, Log in / Sign up, mobile hamburger) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Saved recipes quick toggle */}
            <a
              href="#recipes"
              onClick={() => onSelectCategory && onSelectCategory('Saved')}
              title={`View ${savedCount} saved recipe${savedCount === 1 ? '' : 's'}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F0E5D5] border border-[#E2D3BE] text-[#2C1810] hover:bg-[#E5D7C2] transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 fill-[#7A4325] text-[#7A4325]" />
              <span className="hidden sm:inline">Saved</span>
              <span className="bg-[#2C1810] text-[#E8B86D] rounded-full px-1.5 py-0.2 text-[10px] tabular-nums font-bold">
                {savedCount}
              </span>
            </a>

            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 pl-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C1810] bg-[#FDFBF7] px-3 py-1.5 rounded-full border border-[#E2D3BE]">
                  <User className="w-3.5 h-3.5 text-[#7A4325]" />
                  <span className="truncate max-w-[120px]">{currentUser.name}</span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-xs text-[#2C1810]/70 hover:text-red-700 font-medium px-2 py-1 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenAuth('login')}
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenAuth('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-xl bg-[#F0E5D5] border border-[#E2D3BE] text-[#2C1810] flex items-center justify-center transition-colors hover:bg-[#E5D7C2] focus-visible:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#FAF5EE] border-b border-[#E2D3BE] p-6 flex flex-col justify-between overflow-y-auto z-50 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-[#2C1810] hover:bg-[#F0E5D5] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#E2D3BE] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F0E5D5] border border-[#E2D3BE] text-sm font-semibold text-[#2C1810]"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#7A4325]" />
                  <span>Calorie Estimator</span>
                </span>
                <span className="text-xs text-[#7A4325] font-bold">Open &rarr;</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSelectCategory) onSelectCategory('Saved');
                  window.location.hash = '#recipes';
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F0E5D5] border border-[#E2D3BE] text-sm font-semibold text-[#2C1810]"
              >
                <span className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#7A4325] fill-current" />
                  <span>Saved Recipes</span>
                </span>
                <span className="bg-[#2C1810] text-[#E8B86D] rounded-full px-2 py-0.5 text-xs font-bold tabular-nums">
                  {savedCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Auth actions */}
          <div className="pt-6 border-t border-[#E2D3BE] flex flex-col gap-2.5">
            {currentUser ? (
              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#E2D3BE] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#2C1810]/60">Logged in as</p>
                  <p className="text-sm font-bold text-[#2C1810]">{currentUser.name}</p>
                </div>
                {onLogout && (
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    Logout
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                >
                  Create Free Account
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
