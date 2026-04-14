'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface FilterOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface FilterButtonsProps {
  className?: string;
  options: FilterOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'icon' | 'text' | 'both';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const FilterButtons = React.forwardRef<HTMLDivElement, FilterButtonsProps>(
  ({ 
    className,
    options = [],
    value,
    onValueChange,
    variant = 'both',
    size = 'md',
    orientation = 'horizontal',
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10',
      lg: 'w-12 h-12 text-lg'
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };

    return (
      <div 
        ref={ref}
        className={cn(
          "flex items-center",
          orientation === 'horizontal' ? "space-x-3" : "flex-col space-y-3",
          className
        )} 
        {...props}
      >
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => !option.disabled && onValueChange?.(option.key)}
            disabled={option.disabled}
            className={cn(
              "flex items-center justify-center rounded-lg transition-all duration-200",
              "bg-transparent border-none shadow-none",
              value === option.key
                ? 'text-purple-600'
                : 'text-gray-600 hover:text-purple-600',
              option.disabled && "opacity-50 cursor-not-allowed",
              variant === 'icon' && sizeClasses[size],
              variant === 'text' && "px-3 py-2",
              variant === 'both' && "px-3 py-2 space-x-2"
            )}
            title={option.label}
          >
            {/* Icon */}
            {option.icon && (variant === 'icon' || variant === 'both') && (
              <span className={cn(
                variant === 'icon' ? iconSizeClasses[size] : "w-5 h-5"
              )}>
                {option.icon}
              </span>
            )}
            
            {/* Label */}
            {(variant === 'text' || variant === 'both') && (
              <span className="font-medium">{option.label}</span>
            )}
          </button>
        ))}
      </div>
    );
  }
);

FilterButtons.displayName = "FilterButtons";

export { FilterButtons }; 