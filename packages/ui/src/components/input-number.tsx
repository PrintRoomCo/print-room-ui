'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface InputNumberProps {
  className?: string;
  value: number;
  onValueChange?: (value: number) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  width?: string;
  variant?: 'default' | 'dark';
}

const InputNumber = React.forwardRef<HTMLLabelElement, InputNumberProps>(
  ({ 
    className,
    value,
    onValueChange,
    onBlur: onBlurProp,
    min = 0,
    max = 999999,
    step = 1,
    disabled = false,
    label,
    width = "46px",
    variant = 'default',
    ...props 
  }, ref) => {
    // Track the raw string value to allow typing freely
    const [inputValue, setInputValue] = React.useState<string>(value.toString());

    // Sync internal state when external value changes
    React.useEffect(() => {
      setInputValue(value.toString());
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      
      // Update the input display immediately to allow free typing
      setInputValue(newInputValue);
      
      // Allow empty input while typing
      if (newInputValue === '') {
        return;
      }
      
      const parsedValue = parseInt(newInputValue, 10);
      
      // If parsing fails, don't update (allow user to continue typing)
      if (isNaN(parsedValue)) {
        return;
      }
      
      // Only enforce max constraint while typing, min will be enforced on blur
      // This allows typing "100" without being forced to 24 mid-entry
      const clampedValue = Math.min(parsedValue, max);
      
      onValueChange?.(clampedValue);
    };

    const handleBlur = () => {
      // On blur, ensure the value meets minimum requirement
      const parsedValue = parseInt(inputValue, 10);
      if (isNaN(parsedValue) || parsedValue < min) {
        const correctedValue = Math.max(min, isNaN(parsedValue) ? min : parsedValue);
        setInputValue(correctedValue.toString());
        onValueChange?.(correctedValue);
      }
      // Call parent's onBlur handler if provided
      onBlurProp?.();
    };

    const handleButtonChange = (delta: number) => {
      const newValue = Math.min(Math.max(value + delta, min), max);
      onValueChange?.(newValue);
    };

    if (variant === 'dark') {
      return (
        <label 
          ref={ref}
          className={cn("flex flex-col gap-2", className)} 
          {...props}
        >
          {label && (
            <p className="font-medium text-white">{label}</p>
          )}
          <div 
            className={cn(
              "ui-input-number pr-0 bg-gray-700 border-gray-600 rounded-full",
              "hover:border-green-400 focus-within:border-green-400 focus-within:ring-green-400/20"
            )}
            style={{ width }}
          >
            <div className="ui-input-number-handler-wrap bg-gray-700 border-gray-600 rounded-r-full">
              <span 
                role="button" 
                aria-label="Increase Value" 
                aria-disabled={disabled || value >= max}
                className={cn(
                  "ui-input-number-handler ui-input-number-handler-up select-none",
                  "hover:bg-gray-600 text-green-400 hover:text-green-300",
                  (disabled || value >= max) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !disabled && value < max && handleButtonChange(step)}
              >
                <span className="ui-input-number-handler-up-inner text-green-400 select-none"></span>
              </span>
              <span 
                role="button" 
                aria-label="Decrease Value" 
                aria-disabled={disabled || value <= min}
                className={cn(
                  "ui-input-number-handler ui-input-number-handler-down select-none",
                  "hover:bg-gray-600 text-green-400 hover:text-green-300",
                  (disabled || value <= min) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !disabled && value > min && handleButtonChange(-step)}
              >
                <span className="ui-input-number-handler-down-inner text-green-400 select-none"></span>
              </span>
            </div>
            <div className="ui-input-number-input-wrap">
              <input
                autoComplete="off"
                role="spinbutton"
                aria-valuemin={min}
                aria-valuenow={value}
                step={step}
                className="ui-input-number-input text-white bg-transparent font-bold text-xs"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={disabled}
                min={min}
                max={max}
              />
            </div>
          </div>
        </label>
      );
    }

    return (
      <label 
        ref={ref}
        className={cn("flex flex-col gap-2", className)} 
        {...props}
      >
        {label && (
          <p className="font-medium text-black/80">{label}</p>
        )}
        <div 
          className="ui-input-number pr-0"
          style={{ width }}
        >
          <div className="ui-input-number-handler-wrap">
            <span 
              role="button" 
              aria-label="Increase Value" 
              aria-disabled={disabled || value >= max}
              className={cn(
                "ui-input-number-handler ui-input-number-handler-up select-none",
                (disabled || value >= max) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !disabled && value < max && handleButtonChange(step)}
            >
              <span className="ui-input-number-handler-up-inner select-none"></span>
            </span>
            <span 
              role="button" 
              aria-label="Decrease Value" 
              aria-disabled={disabled || value <= min}
              className={cn(
                "ui-input-number-handler ui-input-number-handler-down select-none",
                (disabled || value <= min) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !disabled && value > min && handleButtonChange(-step)}
            >
              <span className="ui-input-number-handler-down-inner select-none"></span>
            </span>
          </div>
          <div className="ui-input-number-input-wrap">
            <input
              autoComplete="off"
              role="spinbutton"
              aria-valuemin={min}
              aria-valuenow={value}
              step={step}
              className="ui-input-number-input"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={disabled}
              min={min}
              max={max}
            />
          </div>
        </div>
      </label>
    );
  }
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
