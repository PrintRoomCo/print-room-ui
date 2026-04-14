'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  className?: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    className,
    options = [],
    value,
    placeholder = "Select an option",
    onValueChange,
    disabled = false,
    size = 'md',
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const selectedOption = options.find(option => option.value === value);
    const displayText = selectedOption?.label || placeholder;

    const sizeClasses = {
      sm: 'w-32 px-3 py-1.5 text-sm',
      md: 'w-48 px-4 py-2',
      lg: 'w-64 px-5 py-3 text-lg'
    };

    const handleOptionClick = (optionValue: string) => {
      if (onValueChange) {
        onValueChange(optionValue);
      }
      setIsOpen(false);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (!target.closest('[data-dropdown]')) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div 
        ref={ref}
        className={cn("relative", className)} 
        data-dropdown
        {...props}
      >
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between bg-white/80 border border-gray-200/50 rounded-lg shadow-sm transition-all duration-200",
            "hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
            disabled && "opacity-50 cursor-not-allowed",
            sizeClasses[size]
          )}
        >
          <span className={cn(
            "font-medium",
            selectedOption ? "text-gray-900" : "text-gray-500"
          )}>
            {displayText}
          </span>
          <svg
            className={cn(
              "w-5 h-5 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                disabled={option.disabled}
                className={cn(
                  "w-full px-4 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg",
                  "hover:bg-purple-50",
                  value === option.value ? "bg-purple-50 text-purple-600" : "text-gray-900",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown }; 