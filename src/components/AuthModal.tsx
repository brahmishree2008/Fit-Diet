import React, { useState } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(name || 'FitDiet Member', email);
      onClose();
    }, 700);
  };

  const handleDemoFill = () => {
    setName('Alex Morgan');
    setEmail('alex.morgan@fitdiet.example');
    setPassword('healthyeating123');
    setError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#FAF5EE] border border-[#E2D3BE] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close authentication window"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2C1810]/5 hover:bg-[#2C1810]/10 text-[#2C1810] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2C1810] text-[#E8B86D] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-bold font-display text-[#2C1810]">
            {mode === 'signup' ? 'Create Your FitDiet Account' : 'Welcome Back to FitDiet'}
          </h2>
          <p className="text-xs text-[#2C1810]/70 mt-1">
            {mode === 'signup'
              ? 'Save favorite recipes, track macros, and build meal plans'
              : 'Sign in to access your saved recipes and weekly plans'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-[#F0E5D5] border border-[#E2D3BE] rounded-xl mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#2C1810] text-white shadow-xs'
                : 'text-[#2C1810]/70 hover:text-[#2C1810]'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-[#2C1810] text-white shadow-xs'
                : 'text-[#2C1810]/70 hover:text-[#2C1810]'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-semibold text-[#2C1810] mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#2C1810]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-name"
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E2D3BE] rounded-xl text-sm text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-[#2C1810] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#2C1810]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E2D3BE] rounded-xl text-sm text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-[#2C1810] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#2C1810]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E2D3BE] rounded-xl text-sm text-[#2C1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4325]"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            {mode === 'signup' ? 'Create Free Account' : 'Sign In'}
          </Button>
        </form>

        {/* Quick Demo Fill */}
        <div className="mt-5 pt-4 border-t border-[#E2D3BE] text-center">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs text-[#7A4325] hover:underline font-medium cursor-pointer"
          >
            Fill sample demo credentials
          </button>
        </div>
      </div>
    </div>
  );
};
