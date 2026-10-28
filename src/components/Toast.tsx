import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types/recipe';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              isSuccess
                ? 'bg-[#2C1810] text-white border-[#7A4325]'
                : isError
                ? 'bg-[#4A1515] text-white border-red-700'
                : 'bg-[#F0E5D5] text-[#2C1810] border-[#E2D3BE]'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#E8B86D]" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-300" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-[#7A4325]" />}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-xs font-semibold uppercase tracking-wider opacity-85 mb-0.5">
                  {toast.title}
                </p>
              )}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-current opacity-60 hover:opacity-100 p-1 -mr-1 -mt-1 rounded-md transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
