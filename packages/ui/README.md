# @print-room-studio/ui

Shared UI components and utilities for Print Room Studio applications.

## Overview

This package provides a centralized collection of reusable UI components, utilities, and design tokens that can be shared across all applications in the Print Room Studio monorepo.

## Features

- **Shared UI Components**: Reusable React components built with Radix UI primitives
- **Design System**: Consistent color scheme, typography, and spacing
- **Utility Functions**: Common helpers like the `cn` function for class merging
- **Tailwind Configuration**: Shared Tailwind CSS configuration with design tokens

## Installation

This package is intended to be used within the Print Room Studio monorepo. Add it as a dependency to your app's `package.json`:

```json
{
  "dependencies": {
    "@print-room-studio/ui": "workspace:*"
  }
}
```

## Usage

### Components

```tsx
import { Switch, ColorPicker } from "@print-room-studio/ui"

function MyComponent() {
  return (
    <div>
      <Switch />
      <ColorPicker 
        colors={["#ff0000", "#00ff00", "#0000ff"]}
        selectedColor="#ff0000"
        onChange={(color) => console.log(color)}
      />
    </div>
  )
}
```

### Utilities

```tsx
import { cn } from "@print-room-studio/ui"

function MyComponent({ className }) {
  return (
    <div className={cn("base-styles", className)}>
      Content
    </div>
  )
}
```

### Styling

Include the shared CSS variables in your app's global CSS:

```css
@import "@print-room-studio/ui/globals.css";
```

Update your Tailwind config to include the shared UI components in the content paths:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    // Your app content
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Include shared UI components
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... rest of your config
}
```

## Available Components

- **Switch**: A toggle switch component built with Radix UI
- **ColorPicker**: A color selection component with optional edit functionality

## Development

To add new components:

1. Create the component in `src/components/`
2. Export it from `src/components/index.ts`
3. Update this README with usage examples

## Architecture

This package follows these principles:

- **Framework Agnostic**: Components can be used in any React application
- **Accessible**: Built on Radix UI primitives for accessibility
- **Customizable**: Components accept className props for styling
- **Type Safe**: Full TypeScript support with exported types 