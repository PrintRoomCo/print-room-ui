# Print Room UI — Storybook Setup & Alignment Prompt

> Paste this entire document into your AI coding assistant (Claude Code, Cursor, etc.) as the initial prompt when working in the `print-room-ui` repo.

---

## Your Task

You are setting up and aligning the **print-room-ui** Storybook design system with the actual UI components used across The Print Room's production applications. You have access to three repositories:

| Repo | Path | Stack | Purpose |
|------|------|-------|---------|
| **print-room-ui** | `C:\Users\MSI\Documents\Projects\print-room-ui` | Storybook 10 + React 19 + Vite + Tailwind | Standalone design system / component library |
| **print-room-studio** | `C:\Users\MSI\Documents\Projects\print-room-studio` | Turborepo + Next.js 15 + pnpm workspaces | Monorepo with design-tool, web, job-tracker, quote-calculator apps |
| **print-room-no-design-tool** | `C:\Users\MSI\Documents\Projects\print-room-no-design-tool` | Shopify Liquid + Alpine.js + Tailwind | Production Shopify storefront (theprintroom.nz) |

**Goal:** Make the Storybook in `print-room-ui` the single source of truth for all Print Room UI components by:
1. Auditing what components exist across all repos
2. Updating existing stories to use real-world props and data from production
3. Creating new stories for production components that are missing
4. Ensuring design tokens are consistent between Shopify and React

---

## Phase 1: Audit — print-room-studio (React Monorepo)

### 1a. Inventory the shared UI library

Scan `print-room-studio/packages/ui/src/components/` and list every exported component. Cross-reference against the 38 existing story files in `print-room-ui/src/stories/ui/`:

**Existing stories (38):**
- Accordion, BackButton, Badge, BrandingServiceCard, Button, Card, Checkbox, ColorPicker, Dropdown, FavoriteButton, FilterButtons, FreeShippingProgress, GlobalHeader, Input, InputNumber, Label, LocationStock, Modal, OrderSummary, Pill, PriceSummary, ProductCard, ProductViewer, Progress, ProgressBar, QuantityInput, QuoteDetailsForm, RadioGroup, Separator, Sidebar, StepProgress, StockIndicator, Switch, Tabs, TestimonialCard, Textarea, Toast, ViewOptions

For each component:
- Check if the story's props/variants match the component's actual TypeScript interface
- Check if the story shows realistic data (not just "Lorem ipsum")
- Flag any components in `packages/ui/` that have NO story

### 1b. Scan production app usage

Search these directories for how shared UI components are actually used:

```
print-room-studio/apps/design-tool/src/components/  (81+ components)
print-room-studio/apps/web/src/
print-room-studio/apps/job-tracker/src/
print-room-studio/apps/quote-calculator/src/
```

For each app, grep for imports from `@print-room-studio/ui` and note:
- Which components are used and with what props
- Real-world prop values (actual product names, prices, color codes, etc.)
- Common composition patterns (e.g. ProductCard with FavoriteButton overlay)

### 1c. Identify design-tool app components worth showcasing

The design-tool app at `print-room-studio/apps/design-tool/src/components/` has 81+ custom components. Five are already vendored into `print-room-ui/src/vendored/design-tool/`:
- `controls/AnimatedColorButton.tsx`
- `color/ColorSwatches.tsx`
- `common/ClientOnly.tsx`
- `common/LoadingSpinner.tsx`
- `ViewTabs.tsx`

Scan the design-tool components and identify additional components worth adding to Storybook. Prioritise:
- Components that are visually interesting or demonstrate design patterns
- Components that are reusable outside the design-tool context
- Components that are complex enough to benefit from isolated testing

Skip components that are:
- Purely layout/page-level wrappers
- Tightly coupled to app state (providers, stores)
- Already well-represented by the shared UI library

### 1d. Catalogue hooks and utilities

Check if these should have documentation stories:

**Hooks** (`packages/ui/src/hooks/`):
- `use-theme.ts` — Theme management
- `use-media-query.ts` — Responsive breakpoints
- `use-local-storage.ts` — LocalStorage sync

**Lib functions** (`packages/ui/src/lib/`):
- `canvasTint.ts` — Color processing (parseColor, tintPreserveLuminance, etc.)
- `recolor.ts` — Color recoloring
- `color-accuracy.ts` — OKLab color matching (hexToOKLab, oklabDeltaE)
- `swatchParams.ts` — Swatch parameters

---

## Phase 2: Audit — print-room-no-design-tool (Shopify Storefront)

The Shopify theme uses Liquid templates, not React. The goal is NOT to port Liquid to React, but to:
1. Ensure React equivalents exist for key Shopify patterns
2. Sync design tokens between platforms
3. Use real Shopify content/data in stories

### 2a. Extract design tokens

Read `print-room-no-design-tool/snippets/design-tokens.liquid` and compare against the React design system:

**Shopify tokens (CSS custom properties):**
```css
/* Colors */
--pr-blue: #2B3990           /* → maps to brand.primary in React */
--dusky-purple: #4B4D72       /* → CTA/button color */
--off-white: #FBFBF6          /* → Figma background */
--pill-bg: #EEE

/* Typography */
--font-family: 'DM Sans'     /* → same in React */
--body-size: 0.9375rem        /* 15px */
--pill-font-size: 0.66rem     /* ~10.65px */

/* Radii */
--radius-modal: 27px          /* → compare with React's modal: 16px */
--radius-pill: 9999px         /* → same in React (pill: 100px / full: 9999px) */
--radius-input: 9999px        /* → pill-shaped inputs in Shopify, not in React */

/* Shadows */
--shadow-modal: 0 4px 13px 2px rgba(0,0,0,0.1)
--shadow-focus: 0 0 0 3px rgba(43,57,144,0.1)
```

Compare with `print-room-ui/src/stories/docs/DesignTokens.mdx` and the `src/tokens/design-tokens.json` file. Flag any discrepancies and decide whether to:
- Update the React tokens to match Shopify (if Shopify is the source of truth for storefront)
- Document the difference (if intentional per-app theming)

### 2b. Map Shopify patterns to React components

Identify which Shopify Liquid snippets/sections have React equivalents:

| Shopify (Liquid) | React (`@print-room-studio/ui`) | Status |
|---|---|---|
| `snippets/product-tile-standard.liquid` | `ProductCard` | Has story — update with real Shopify product data |
| `snippets/modal.liquid` | `Modal` | Has story |
| `snippets/collapsible.liquid` | `Accordion` | Has story |
| `sections/branding-service-cards.liquid` | `BrandingServiceCard` | Has story |
| `snippets/branding-service-pill.liquid` | `Pill` | Has story — add branding service variants |
| `snippets/quote-request-modal.liquid` | `QuoteDetailsForm` + `Modal` | Has story — compose them together |
| `snippets/free-shipping-progress.liquid` | `FreeShippingProgress` | Has story |
| `snippets/favorites-button.liquid` | `FavoriteButton` | Has story |
| `snippets/product-form-component-quantity-selector.liquid` | `QuantityInput` | Has story |
| `snippets/breadcrumbs.liquid` | *missing* | Needs React component + story |
| `snippets/pagination.liquid` | *missing* | Needs React component + story |
| `snippets/quote-pill.liquid` | `Pill` | Variant needed |
| `snippets/drawer-favorites.liquid` | `Sidebar` | Variant needed |
| `sections/announcement-bar.liquid` | *missing* | Consider adding |
| `snippets/social-icons.liquid` | *missing* | Consider adding |

### 2c. Extract real content from Shopify

Use actual product data, brand names, and content from the Shopify theme to make stories realistic:

- **Product names**: AS Colour, Continental, etc. (from collection templates)
- **Branding services**: Screen Printing, Embroidery, Heat Transfers, Finishing, Patches
- **Locations**: Auckland, Wellington (from collection templates)
- **Price formats**: NZD with $ prefix
- **Quote form fields**: Quantity slider, file upload, location picker, notes

---

## Phase 3: Gap Analysis & Implementation

### 3a. Update existing stories with production data

For each of the 38 existing UI stories, update to use:
- Real product names, prices, and vendor names from Shopify/design-tool
- Actual color hex values from the design system (not generic blue/red)
- Realistic composition patterns seen in production apps
- Props that match the current TypeScript interface (some may have drifted)

### 3b. Create missing stories

For components identified in Phase 1 and 2 that lack stories:
- Components in `packages/ui/` without stories → create in `src/stories/ui/`
- Design-tool components worth showcasing → vendor into `src/vendored/design-tool/` and create in `src/stories/design-tool/`
- New components needed to match Shopify patterns → create in `packages/ui/src/components/` first, then add stories

### 3c. Update vendored components

Check if the 5 vendored design-tool components have drifted from their source in `print-room-studio/apps/design-tool/src/components/`:
- `controls/AnimatedColorButton.tsx` — source: `apps/design-tool/src/components/design/controls/AnimatedColorButton.tsx`
- `color/ColorSwatches.tsx` — source: `apps/design-tool/src/components/color/ColorSwatches.tsx`
- `common/ClientOnly.tsx` — source: `apps/design-tool/src/components/common/ClientOnly.tsx`
- `common/LoadingSpinner.tsx` — source: `apps/design-tool/src/components/common/LoadingSpinner.tsx`
- `ViewTabs.tsx` — source: `apps/design-tool/src/components/ViewTabs.tsx`

If the source has changed, update the vendored copy. Remember to inline any external type imports (the vendored copies can't import from `@/types/` or `@/hooks/`).

### 3d. Update documentation

Update `src/stories/docs/Introduction.mdx` to reflect the current component inventory after changes.

If tokens have changed, update `src/stories/docs/DesignTokens.mdx` and `DesignTokensGuide.mdx`.

---

## Implementation Guidelines

### Story file conventions

Follow the exact pattern used by existing stories:

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';  // NOT @storybook/react
import { fn } from 'storybook/test';  // for action mocks
import { ComponentName } from '@print-room-studio/ui';  // shared UI components

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',  // Categories: Primitives, Storefront, App/Design Tool, Documentation
  component: ComponentName,
  parameters: {
    layout: 'centered',  // or 'padded' for full-width components
    docs: {
      description: {
        component: 'Brief description of the component and its usage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Control definitions with descriptions
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* realistic default props */ },
};
```

### Import paths

| Source | Import path |
|--------|------------|
| Shared UI components | `import { Button } from '@print-room-studio/ui'` |
| Vendored design-tool components | `import { ViewTabs } from '@vendored/design-tool/ViewTabs'` |
| Storybook utilities | `import type { Meta, StoryObj } from '@storybook/react-vite'` |
| Test utilities | `import { fn } from 'storybook/test'` |
| MDX doc blocks | `import { Meta, ColorPalette, ... } from '@storybook/addon-docs/blocks'` |

### Sidebar hierarchy

```
Documentation/
  Introduction
  Design Tokens
  Design Tokens Guide
  Contributing Guide

Primitives/
  Button, Input, Textarea, Checkbox, Switch, RadioGroup, Label, ...

Storefront/
  ProductCard, BrandingServiceCard, FreeShippingProgress, ...

App/
  Design Tool/
    AnimatedColorButton, ColorSwatches, ViewTabs, ...
```

### Vendoring design-tool components

When adding new vendored components:
1. Copy the component from `print-room-studio/apps/design-tool/src/components/` to `print-room-ui/src/vendored/design-tool/`
2. Remove `'use client'` directives (Storybook doesn't use RSC)
3. Inline any type imports from `@/types/`, `@/hooks/`, etc. — define interfaces locally
4. Fix import paths: replace `@/` imports with relative paths or `@print-room-studio/ui` imports
5. If the component uses CSS modules, copy the relevant CSS file too

### Mocking Next.js APIs

The repo already has mocks at `.storybook/mocks/`:
- `next-link.tsx` — renders `<a>` tag
- `next-image.tsx` — renders `<img>` tag
- `next-navigation.tsx` — stubs `useRouter`, `usePathname`, `useSearchParams`

These are aliased in `.storybook/main.ts` via Vite resolve aliases. No additional setup needed for components that use Next.js imports.

### Tailwind CSS

Use the Tailwind classes defined in `tailwind.config.ts`. The config includes:
- Custom colors: primary (purple), secondary (lime), accent (emerald), neutral (slate), figma legacy
- Custom border radii: button (8px), card (12px), modal (16px), pill (100px)
- Custom shadows: button, buttonHover, card, modal, glass variants
- Custom animations: fade-in, slide-in, bounce-in, accordion, shimmer, sparkle
- DM Sans as default font

### Adding new packages/ui components

If you identify a Shopify pattern that needs a new React component:
1. Create the component in `print-room-ui/packages/ui/src/components/`
2. Export it from `packages/ui/src/components/index.ts`
3. Create a story in `print-room-ui/src/stories/ui/`
4. Use Radix UI primitives where appropriate (already in devDependencies)
5. Use CVA (class-variance-authority) for variant props
6. Use `cn()` from `@print-room-studio/ui` for className merging

---

## Verification

After making changes, verify:

1. **Dev server**: `pnpm dev` — Storybook starts on port 6006 without errors
2. **All stories render**: Check every story in the sidebar loads without crashing
3. **Type check**: `pnpm type-check` — No TypeScript errors
4. **Lint**: `pnpm lint` — No ESLint errors
5. **Build**: `pnpm build` — Static build succeeds
6. **Visual check**: Ensure stories show realistic, production-representative content
7. **Controls work**: Interactive controls in the Storybook panel should modify the rendered component

---

## Important Notes

- **Do NOT modify** the `print-room-studio` or `print-room-no-design-tool` repos. They are read-only references.
- **Do NOT add** unnecessary dependencies. Check `package.json` before adding anything.
- **Do NOT create** wrapper components or abstractions — keep stories simple and direct.
- **Do NOT add** comments, docstrings, or type annotations to code you didn't change.
- The `packages/ui/` directory in `print-room-ui` is a pnpm workspace package (`@print-room-studio/ui`). It resolves via `workspace:*` in the root `package.json`.
- Storybook 10 uses `@storybook/react-vite` (not `@storybook/react`) for Meta/StoryObj types.
- The `.npmrc` has `shamefully-hoist=true` — this is required for Storybook 10 + pnpm compatibility.
