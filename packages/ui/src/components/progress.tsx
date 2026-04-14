"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full",
      className
    )}
    value={value as number | undefined}
    suppressHydrationWarning
    {...props}
  >
    {/* Glassy gray background */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-300/50 via-gray-200/50 to-gray-300/50 rounded-full" suppressHydrationWarning />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-400/30 via-transparent to-white/20 rounded-full" suppressHydrationWarning />
    <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/30 to-transparent rounded-full" suppressHydrationWarning />

    <ProgressPrimitive.Indicator
      className="progress-indicator h-full w-full flex-1 relative overflow-hidden rounded-full transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      suppressHydrationWarning
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a5e] via-[#2B3990] via-[#4052B3] via-[#5568D3] to-[#2B3990] animate-shimmer rounded-full" suppressHydrationWarning />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/25 rounded-full" suppressHydrationWarning />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-flare rounded-full" suppressHydrationWarning />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-white/40 to-transparent animate-sparkle rounded-full" suppressHydrationWarning />
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-full" suppressHydrationWarning />
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } 
