# UI Package - AI Assistant Instructions

## Overview

This is the **shared UI component library** for Print Room Studio. All 9 apps in the monorepo import components from this package.

- **Package Name**: `@print-room-studio/ui`
- **Storybook**: https://print-room-storybook.vercel.app
- **Design Tokens**: `apps/storybook/src/tokens/design-tokens.json`

## Exported Components (27 total)

### Form Components
- `Button` - Primary action button with variants
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Label` - Form field label
- `Checkbox` - Checkbox input
- `Switch` - Toggle switch
- `RadioGroup`, `RadioGroupItem` - Radio button group
- `InputNumber` - Numeric input with increment/decrement
- `QuantityInput` - Quantity selector for products
- `ColorPicker` - Color selection component

### Layout Components
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `Modal`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`
- `Dropdown` - Select dropdown
- `Separator` - Visual divider

### Navigation Components
- `GlobalHeader` - App header with navigation
- `BackButton` - Back navigation button
- `FilterButtons` - Filter toggle buttons
- `ViewOptions` - View switcher (grid/list)

### Feedback Components
- `Progress` - Progress indicator (Radix)
- `ProgressBar` - Custom progress bar
- `StepProgress` - Multi-step progress indicator

### Business Components
- `ProductViewer` - Product image viewer
- `OrderSummary` - Order details summary
- `PriceSummary` - Pricing breakdown
- `QuoteDetailsForm` - Quote request form

## Adding a New Component

### 1. Create the Component

```tsx
// src/components/my-component.tsx
'use client';

import * as React from 'react';
import { cn } from '../utils';

export interface MyComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
}
```

### 2. Export from Index

```tsx
// src/index.ts
export { MyComponent } from './components/my-component';
export type { MyComponentProps } from './components/my-component';
```

### 3. Create a Story

```tsx
// apps/storybook/src/stories/ui/MyComponent.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@print-room-studio/ui';

const meta: Meta<typeof MyComponent> = {
  title: 'UI/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    children: 'Hello World',
  },
};
```

### 4. Build and Test

```bash
cd packages/ui
pnpm build

cd ../../apps/storybook
pnpm dev
```

## Component Guidelines

1. **Always use `'use client'`** directive for client components
2. **Accept `className` prop** and merge with `cn()` utility
3. **Export types** alongside components
4. **Build on Radix primitives** when possible for accessibility
5. **Include keyboard handling** and ARIA attributes
6. **Add Storybook story** with multiple variants

## File Structure

```
src/
├── components/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── hooks/
├── utils/
│   └── index.ts (cn utility)
├── lib/
│   └── (advanced utilities)
├── styles/
│   └── globals.css
└── index.ts (main exports)
```

## Tailwind Preset

This package exports a Tailwind preset that apps should extend:

```ts
// In any app's tailwind.config.ts
import uiPreset from '@print-room-studio/ui/tailwind.config';

export default {
  presets: [uiPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};
```
