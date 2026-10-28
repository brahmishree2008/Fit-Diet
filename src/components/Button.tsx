import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    // Rich cocoa brown primary button (#7A4325)
    primary:
      'bg-[#7A4325] hover:bg-[#63351C] active:bg-[#4F2B16] text-white shadow-sm hover:shadow focus-visible:ring-[#7A4325]',
    // Deep espresso brown outline button (#2C1810)
    outline:
      'border-2 border-[#2C1810] text-[#2C1810] bg-transparent hover:bg-[#2C1810]/5 active:bg-[#2C1810]/10 focus-visible:ring-[#2C1810]',
    // Soft sand/cream subtle button
    secondary:
      'bg-[#F0E5D5] hover:bg-[#E5D7C2] text-[#2C1810] border border-[#E2D3BE] focus-visible:ring-[#7A4325]',
    // Ghost minimal button
    ghost:
      'text-[#2C1810] hover:bg-[#2C1810]/5 active:bg-[#2C1810]/10 focus-visible:ring-[#7A4325]',
    // Warm caramel gold highlight button (#E8B86D)
    lime:
      'bg-[#E8B86D] hover:bg-[#DEAB5E] active:bg-[#D49E4F] text-[#2C1810] font-semibold shadow-sm focus-visible:ring-[#7A4325]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
