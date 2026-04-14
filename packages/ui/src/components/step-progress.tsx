'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface StepProgressProps {
  className?: string;
  steps: string[];
  currentStep: number;
  showLabels?: boolean;
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({
    className,
    steps = [],
    currentStep = 0,
    showLabels = true,
    ...props
  }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    const progress = ((currentStep + 1) / steps.length) * 100;

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Render a simple placeholder during SSR to avoid hydration mismatch
    if (!mounted) {
      return (
        <div
          ref={ref}
          className={cn("w-full space-y-4 sm:space-y-6", className)}
          {...props}
        >
          <div className="relative">
            <div
              className="h-3 sm:h-4 rounded-full border border-gray-400"
              style={{ backgroundColor: 'rgb(241, 255, 165)' }}
            />
            <div
              className="absolute top-0 left-0 h-3 sm:h-4 rounded-full transition-all duration-500 ease-out border border-gray-400"
              style={{ width: `${progress}%`, backgroundColor: 'rgb(43, 57, 144)' }}
            />
          </div>
          {showLabels && (
            <ol className={cn("grid gap-1 sm:gap-2", `grid-cols-${steps.length}`)}>
              {steps.map((step, index) => (
                <li key={step} className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-300 mb-1 sm:mb-2 text-black"
                    )}
                    style={{
                      backgroundColor: 'rgb(241, 255, 165)',
                      borderColor: 'rgb(43, 57, 144)'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span
                    className="text-[10px] sm:text-xs leading-tight max-w-12 sm:max-w-16 font-normal break-words"
                    style={{ color: 'rgb(102, 102, 102)' }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("w-full space-y-4 sm:space-y-6", className)}
        {...props}
      >
        <div className="relative">
          <div
            className="h-3 sm:h-4 rounded-full border border-gray-400"
            style={{ backgroundColor: 'rgb(241, 255, 165)' }}
          />
          <div
            className="absolute top-0 left-0 h-3 sm:h-4 rounded-full transition-all duration-500 ease-out border border-gray-400"
            style={{ width: `${progress}%`, backgroundColor: 'rgb(43, 57, 144)' }}
          />
        </div>

        {showLabels && (
          <ol className={cn("grid gap-1 sm:gap-2", `grid-cols-${steps.length}`)}>
            {steps.map((step, index) => (
              <li key={step} className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-300 mb-1 sm:mb-2 text-black"
                  )}
                  style={{
                    backgroundColor: 'rgb(241, 255, 165)',
                    borderColor: 'rgb(43, 57, 144)'
                  }}
                >
                  {index + 1}
                </div>
                <span
                  className="text-[10px] sm:text-xs leading-tight max-w-12 sm:max-w-16 font-normal break-words"
                  style={{ color: 'rgb(102, 102, 102)' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
);

StepProgress.displayName = "StepProgress";

export { StepProgress };
