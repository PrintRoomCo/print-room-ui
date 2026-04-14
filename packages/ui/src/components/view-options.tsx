"use client"

import * as React from "react"
import { cn } from "../utils"

interface ViewOption {
  id: string
  label: string
}

interface ViewOptionsProps {
  options?: ViewOption[]
  selectedView?: string
  onViewChange?: (viewId: string) => void
  className?: string
}

const defaultOptions: ViewOption[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "side", label: "Side" },
  { id: "neck", label: "Neck" }
]

const ViewOptions = React.forwardRef<
  HTMLDivElement,
  ViewOptionsProps
>(({ options = defaultOptions, selectedView = "front", onViewChange, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cn("flex items-center justify-center gap-3", className)}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.id}
          role="radio"
          aria-checked={selectedView === option.id}
          value={option.id}
          onClick={() => onViewChange?.(option.id)}
          className={cn(
            "px-6 py-3 text-sm font-medium rounded-full transition-all duration-200",
            "min-w-[80px] border-2",
            selectedView === option.id
              ? "border-primary bg-primary text-white shadow-md"
              : "border-black/10 bg-secondary text-gray-700 hover:border-primary/30 hover:bg-white"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
})

ViewOptions.displayName = "ViewOptions"

export { ViewOptions, type ViewOption, type ViewOptionsProps } 
