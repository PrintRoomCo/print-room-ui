'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../utils';

const StepTabs = TabsPrimitive.Root;

const StepTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center justify-center border-t border-gray-200',
      className
    )}
    {...props}
  />
));
StepTabsList.displayName = 'StepTabsList';

const StepTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative px-6 py-3 text-sm font-medium text-muted-foreground transition-colors',
      'hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'data-[state=active]:text-foreground',
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-colors',
      'data-[state=active]:after:bg-[var(--pr-step-underline)]',
      'data-[state=inactive]:after:bg-transparent',
      className
    )}
    {...props}
  />
));
StepTabsTrigger.displayName = 'StepTabsTrigger';

const StepTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
StepTabsContent.displayName = 'StepTabsContent';

export { StepTabs, StepTabsList, StepTabsTrigger, StepTabsContent };
