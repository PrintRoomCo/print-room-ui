'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface QuantityInputProps {
  className?: string;
  value: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'rounded' | 'inline';
  showButtons?: boolean;
  label?: string;
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  ({ 
    className,
    value,
    onValueChange,
    min = 1,
    max = 999999,
    step = 1,
    disabled = false,
    size = 'md',
    variant = 'default',
    showButtons = true,
    label,
    ...props 
  }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10) || min;
      const clampedValue = Math.min(Math.max(newValue, min), max);
      onValueChange?.(clampedValue);
    };

    const handleButtonChange = (delta: number) => {
      const newValue = Math.min(Math.max(value + delta, min), max);
      onValueChange?.(newValue);
    };

    const sizeClasses = {
      sm: {
        input: 'w-16 px-2 py-1 text-sm',
        button: 'w-6 h-6 text-xs',
        container: 'space-x-2'
      },
      md: {
        input: 'w-24 px-3 py-2',
        button: 'w-8 h-8',
        container: 'space-x-4'
      },
      lg: {
        input: 'w-32 px-4 py-3 text-lg',
        button: 'w-10 h-10 text-lg',
        container: 'space-x-6'
      }
    };

    const inputClasses = cn(
      "text-center font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-gray-400",
      variant === 'default' && "bg-gray-100 border border-gray-300 rounded-md",
      variant === 'rounded' && "bg-gray-100 rounded-full",
      variant === 'inline' && "bg-transparent border-b border-gray-300",
      disabled && "opacity-50 cursor-not-allowed",
      sizeClasses[size].input
    );

    const buttonClasses = cn(
      "rounded-full flex items-center justify-center transition-colors",
      "bg-gray-100 hover:bg-gray-200 text-gray-600",
      disabled && "opacity-50 cursor-not-allowed hover:bg-gray-100",
      sizeClasses[size].button
    );

    if (variant === 'inline' && showButtons) {
      return (
        <div 
          ref={ref}
          className={cn("flex items-center", sizeClasses[size].container, className)} 
          {...props}
        >
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}:</label>
          )}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => !disabled && handleButtonChange(-step)}
              disabled={disabled || value <= min}
              className={buttonClasses}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={inputClasses}
              aria-label="Quantity"
            />
            <button
              type="button"
              onClick={() => !disabled && handleButtonChange(step)}
              disabled={disabled || value >= max}
              className={buttonClasses}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      );
    }

    // For 'default' and 'rounded' variants with integrated buttons
    return (
      <div 
        ref={ref}
        className={cn("flex items-center", sizeClasses[size].container, className)} 
        {...props}
      >
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}:</label>
        )}
        <div className="relative flex items-center">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              inputClasses,
              showButtons && variant === 'rounded' && "pr-8"
            )}
            aria-label="Quantity"
          />
          {showButtons && variant === 'rounded' && (
            <div className="absolute right-2 flex flex-col items-center">
              <button
                type="button"
                onClick={() => !disabled && handleButtonChange(step)}
                disabled={disabled || value >= max}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Increase quantity"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => !disabled && handleButtonChange(-step)}
                disabled={disabled || value <= min}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Decrease quantity"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        {showButtons && variant === 'default' && (
          <>
            <button
              type="button"
              onClick={() => !disabled && handleButtonChange(-step)}
              disabled={disabled || value <= min}
              className={buttonClasses}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => !disabled && handleButtonChange(step)}
              disabled={disabled || value >= max}
              className={buttonClasses}
              aria-label="Increase quantity"
            >
              +
            </button>
          </>
        )}
      </div>
    );
  }
);

QuantityInput.displayName = "QuantityInput";

export { QuantityInput }; 