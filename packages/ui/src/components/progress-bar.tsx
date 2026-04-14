'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface ProgressBarProps {
  className?: string;
  value?: number; // 0-100 for percentage mode
  steps?: string[]; // For stepped mode
  currentStep?: number; // For stepped mode
  variant?: 'percentage' | 'steps';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabels?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className,
    value = 0,
    steps = [],
    currentStep = 0,
    variant = 'percentage',
    size = 'md',
    color = '#2563eb',
    showLabels = true,
    ...props 
  }, ref) => {
    // Calculate progress based on variant
    const progress = variant === 'steps' && steps.length > 0 
      ? ((currentStep + 0.5) / steps.length) * 100
      : Math.min(Math.max(value, 0), 100);

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2', 
      lg: 'h-3'
    };

    return (
      <div 
        ref={ref}
        className={cn("w-full", className)} 
        {...props}
      >
        {/* Progress bar */}
        <div className={cn(
          "relative w-full bg-gray-200 rounded-full",
          variant === 'steps' && steps.length > 0 && "opacity-50",
          sizeClasses[size]
        )}>
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out" 
            style={{ 
              width: `${progress}%`, 
              backgroundColor: color 
            }} 
          />
        </div>

        {/* Step labels */}
        {variant === 'steps' && steps.length > 0 && showLabels && (
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            {steps.map((step, index) => (
              <button
                key={step}
                disabled
                className={cn(
                  "font-medium transition-colors cursor-default",
                  index === currentStep && "text-gray-800"
                )}
              >
                {step}
              </button>
            ))}
          </div>
        )}

        {/* Percentage label */}
        {variant === 'percentage' && showLabels && (
          <div className="text-sm text-gray-600 mt-1 text-center">
            {Math.round(progress)}%
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar }; 