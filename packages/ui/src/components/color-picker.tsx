'use client';

import React from 'react';
import { cn } from "../utils";

interface ColorSwatchProps {
  color: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

function ColorSwatch({ color, selected, onClick, className }: ColorSwatchProps) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
        selected ? 'border-black' : 'border-transparent',
        className
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
}

export interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  /**
   * Optional handler for displaying an extended colour palette or modal. If provided
   * a small pencil icon will be shown next to the swatches that calls this when clicked.
   */
  onEdit?: () => void;
  className?: string;
}

export function ColorPicker({
  colors,
  selectedColor,
  onChange,
  onEdit,
  className
}: ColorPickerProps) {
  return (
    <div className={cn("flex items-center space-x-3 pt-2", className)}>
      {colors.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          selected={color === selectedColor}
          onClick={() => onChange(color)}
        />
      ))}

      {/* Pencil / edit icon */}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label="Edit colours"
          className={cn(
            "p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {/* Simple pencil icon */}
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z"
            />
          </svg>
        </button>
      )}
    </div>
  );
} 