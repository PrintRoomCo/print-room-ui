# Print Room UI — Storybook Setup & Alignment Prompt

> Paste this entire document into your AI coding assistant (Claude Code, Cursor, etc.) as the initial prompt when working in the `print-room-ui` repo.

---

## Who Is The Print Room?

The Print Room is a New Zealand-based custom apparel and branded merchandise company. They offer **five core branding services**: screen printing, embroidery, heat transfers, finishing (relabelling, neck tags, packaging), and custom patches.

They serve two customer segments:

- **B2C** — Individuals and small teams order custom-branded apparel through the Shopify storefront or the interactive design tool. The journey is: browse products, pick a decoration method, upload artwork, choose sizes/quantities, submit a quote request. Quotes go to Monday.com CRM where sales staff follow up.
- **B2B** — Corporate/wholesale buyers enter via a B2B portal with signed tokens. They use the same design tool but can save designs to shared collections instead of submitting individual quotes. They get catalogue pricing via Shopify Plus B2B catalogues.

**Key brands stocked**: AS Colour, Continental, Stanley/Stella, Earth Positive.
**Locations**: Auckland and Wellington (NZ), with Australia and international shipping.
**Currency**: NZD with `$` prefix.

---

## What This Design System Is For

This Storybook is **not** a generic component playground. It's the living reference for every UI element a Print Room customer or staff member touches. Every story should answer: "What does this look like with real Print Room content?"

That means:
- Product cards show AS Colour tees at `$24.00`, not "Product Name" at `$9.99`
- Quote forms have NZ phone numbers and Wellington addresses, not US placeholders
- Branding service cards describe screen printing and embroidery, not "Service A"
- Color swatches use the actual product color hex codes from suppliers
- The design token defaults match the Shopify storefront (the customer-facing brand), not a generic shadcn theme

**The Shopify storefront is the source of truth for brand-facing design tokens.** The React design system adapts to match it, not the other way around. App-specific overrides (e.g. Tech Pack Builder uses Roboto font, B2B Portal uses glass morphism) are documented exceptions.

---

## Repository Map

| Repo | Path | Stack | Role |
|------|------|-------|------|
| **print-room-ui** | `C:\Users\MSI\Documents\Projects\print-room-ui` | Storybook 10 + React 19 + Vite + Tailwind 3 | This repo. Standalone design system and component library |
| **print-room-studio** | `C:\Users\MSI\Documents\Projects\print-room-studio` | Turborepo + Next.js 15 + pnpm 9.9 | Monorepo: design-tool (port 3001), web (3003), job-tracker (3002), quote-calculator (3003) |
| **print-room-no-design-tool** | `C:\Users\MSI\Documents\Projects\print-room-no-design-tool` | Shopify Liquid + Alpine.js + Tailwind | Production storefront at theprintroom.nz |

**`print-room-studio` and `print-room-no-design-tool` are read-only references.** Never modify them. They exist so you can grep for real usage patterns, prop values, and content.

### How the repos relate

```
Shopify Storefront (Liquid)           Design Tool (Next.js)
  theprintroom.nz                       /design → /quote-flow
         |                                    |
         |  design tokens, brand colors       |  uses @print-room-studio/ui
         |  product data, service copy         |  81+ custom components
         v                                    v
    print-room-ui (Storybook)
      packages/ui/     ← shared React component library
      src/vendored/    ← isolated copies of design-tool components
      src/stories/     ← stories for everything above
```

---

## The User Journeys This UI Serves

Understanding these journeys determines which stories matter and what props are realistic.

### Journey 1: Storefront Browse + Quote Request (B2C)

1. Customer lands on theprintroom.nz (Shopify)
2. Browses products by category/brand (collection pages, filter sidebar, product cards)
3. Views product details (gallery, variant picker, branding service pills)
4. Clicks "Get a Quote" → quote request modal opens
5. Fills in: contact info, products wanted, quantity slider, budget, in-hand date, location, file upload
6. Submits → hits Vercel serverless function → creates deal in Monday.com CRM
7. Sales team follows up with pricing

**Relevant components**: ProductCard, FavoriteButton, Pill, BrandingServiceCard, Modal, QuoteDetailsForm, FreeShippingProgress, QuantityInput, FilterButtons, Breadcrumbs, Pagination, GlobalHeader, Badge, StockIndicator, LocationStock

### Journey 2: Design Tool Quote Flow (B2C)

1. Customer enters design tool at `/design`
2. Browses product catalog with filters
3. Selects a product → enters interactive designer
4. Chooses decoration method (MethodCard → TechniquesGuideModal)
5. Picks product color (AnimatedColorButton, ColorSwatches)
6. Places artwork, adjusts positioning, selects print areas
7. Selects sizes and quantities (QuantitySummary)
8. Reviews design with product viewer (multiple angles: front, back, sides, neck, label)
9. Enters business details and shipping info
10. Submits quote → data goes to Supabase + Monday.com CRM

**Relevant components**: ViewTabs, AnimatedColorButton, ColorSwatches, MethodCard, TechniquesGuideModal, QuantitySummary, ProductViewer, StepProgress, Sidebar, OrderSummary, PriceSummary, BackButton, Accordion, Switch, Tabs, LoadingSpinner, ClientOnly

### Journey 3: B2B Collection Management

Same as Journey 2 but the customer:
- Enters via B2B portal with a signed auth token
- Sees a B2B banner with their company name
- "Next" button becomes "Save to Collection"
- Designs are saved to shared collections for team review, not individual quotes

**Relevant components**: Same as Journey 2 plus Badge (for B2B indicators), Card (collection cards)

---

## Design Token Philosophy

### Storefront-first defaults

The design system uses Shopify storefront tokens as the baseline because that's the customer-facing brand. These tokens come from `print-room-no-design-tool/snippets/design-tokens.liquid` and are mirrored in `src/tokens/design-tokens.json`.

| Token | Shopify Value | Purpose |
|-------|---------------|---------|
| `--pr-blue` / `brand.primary` | `#2B3990` | Print Room Blue — nav, links, focus rings |
| `--dusky-purple` / `brand.cta` | `#4B4D72` | CTA buttons, borders |
| `--off-white` / `storefront.offWhite` | `#FBFBF6` | Page background, drawer backgrounds |
| `--pill-bg` / `storefront.pill` | `#EEE` | Pill/tag backgrounds |
| `--slider-green` / `storefront.sliderGreen` | `#658A6A` | Budget slider accent |
| `--font-family` | `DM Sans` | Primary typeface everywhere |
| `--radius-modal` | `27px` | Shopify modal corners (React uses 16px — documented exception) |
| `--radius-pill` | `9999px` | Fully rounded pills, inputs on Shopify |
| `--shadow-modal` | `0 4px 13px 2px rgba(0,0,0,0.1)` | Modal drop shadow |
| `--shadow-focus` | `0 0 0 3px rgba(43,57,144,0.1)` | Focus ring (Print Room Blue at 10%) |

### Per-app overrides (documented exceptions)

| App | What's Different | Why |
|-----|-----------------|-----|
| Design Tool (legacy) | Figma background `#F5F2ED`, accent `#0900FF` | Original Figma designs, not yet migrated |
| Tech Pack Builder | Font: Roboto/D-DINExp, radius: `0.9rem` | Industry-standard print production look |
| B2B Portal | Glass morphism shadows, slate backgrounds | Premium enterprise feel |
| Quote Calculator | Glass morphism shadows | Matches B2B Portal |

### When to change tokens

- Storefront brand change (new logo color, new font) → update `design-tokens.json` brand values
- Shopify storefront token change → update `design-tokens.json` storefront values and sync `globals.css`
- Adding a new app variant → add to the per-app theme table, don't change defaults

---

## Component Categories & Sidebar Hierarchy

Components are categorised by **where they appear**, not by technical complexity:

```
Documentation/
  Introduction              — What this Storybook covers, alignment rules
  Design Tokens             — Visual token reference (colors, type, spacing, radii, shadows)
  Design Tokens Guide       — How to edit tokens (for non-devs)
  Contributing Guide        — PR workflow, Figma sync, Chromatic visual regression
  Hooks                     — use-theme, use-media-query, use-local-storage
  Utilities                 — canvasTint, recolor, color-accuracy, swatchParams

Primitives/                 — Building blocks used everywhere
  Button, Input, Textarea, Checkbox, Switch, RadioGroup, Label, Dropdown,
  InputNumber, QuantityInput, Separator, Tabs, Accordion, Modal, Card,
  Progress, ProgressBar, Toast, Badge

Storefront/                 — Components that mirror Shopify storefront patterns
  ProductCard, BrandingServiceCard, Pill, FavoriteButton, FilterButtons,
  FreeShippingProgress, GlobalHeader, LocationStock, StockIndicator,
  OrderSummary, PriceSummary, QuoteDetailsForm, ProductViewer,
  TestimonialCard, Breadcrumbs, Pagination, Sidebar, BackButton,
  StepProgress, ViewOptions, ColorPicker

App/Design Tool/            — Isolated design-tool interactions (vendored)
  AnimatedColorButton, ColorSwatches, ViewTabs, MethodCard,
  TechniquesGuideModal, QuantitySummary, LoadingSpinner, ClientOnly
```

**Categorisation rule**: If it appears on the Shopify storefront or maps to a Liquid snippet, it's `Storefront/`. If it's only used in the design tool app, it's `App/Design Tool/`. If it's a low-level building block used across multiple contexts, it's `Primitives/`.

---

## Fixture Data Strategy

Stories use production-shaped fixture data from `src/stories/fixtures/production-data.ts`. This file provides:

- **Products**: AS Colour Staple Tee ($24), Continental Hoodie ($58), Stanley/Stella Creator ($32), Earth Positive Pullover ($64)
- **Brands**: AS Colour, Continental, Stanley/Stella, Earth Positive
- **Services**: Screen Printing, Embroidery, Heat Transfers, Finishing, Custom Patches — each with real descriptions and CTA links
- **Locations**: Northland, Auckland, Waikato, Bay of Plenty, Wellington, Canterbury, Otago, Australia, International
- **Customer details**: NZ and AU example customers with real-format addresses and phone numbers
- **Testimonials**: Three realistic customer quotes with names and roles
- **Navigation**: Breadcrumb and pagination examples using real collection/product paths
- **Design tool views**: Front, Back, Left Sleeve, Right Sleeve

**Rules for fixture data**:
- Always use Print Room brands, not generic names
- Prices in NZD with `$` prefix (no currency code)
- Phone numbers in +64 (NZ) or +61 (AU) format
- Addresses use NZ/AU formatting
- Images use `buildPlaceholderImage()` with brand-token background/foreground colors
- When adding new fixtures, add them to `production-data.ts` and import from there — don't hardcode in individual stories

---

## Phase 1: Audit — print-room-studio (React Monorepo)

### 1a. Inventory the shared UI library

Scan `print-room-studio/packages/ui/src/components/` and cross-reference against the existing stories in `print-room-ui/src/stories/ui/`. Currently 41 components are exported from `packages/ui/src/components/index.ts`.

For each component:
- Check if the story's props/variants match the component's actual TypeScript interface
- Check if the story uses production-data fixtures (not placeholder text)
- Flag any components in `packages/ui/` that have NO story
- Flag any story variants that don't reflect how the component is actually used in production apps

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
- Real-world prop values (actual product names, prices in NZD, color hex codes from suppliers)
- Common composition patterns (e.g. ProductCard with FavoriteButton overlay and branding Pill badges)
- How components compose to form the user journeys described above

### 1c. Identify design-tool components worth showcasing

The design-tool app has 81+ custom components. Currently 8 are vendored into `print-room-ui/src/vendored/design-tool/`:
- `controls/AnimatedColorButton.tsx`
- `color/ColorSwatches.tsx`
- `common/ClientOnly.tsx`
- `common/LoadingSpinner.tsx`
- `ViewTabs.tsx`
- `MethodCard.tsx`
- `TechniquesGuideModal.tsx`
- `QuantitySummary.tsx`

Scan for additional components worth adding. Prioritise:
- Components that demonstrate a key step in the design-to-quote journey
- Components that are visually interesting or show animation patterns (framer-motion)
- Components reusable outside the design-tool context

Skip:
- Page-level layouts and wrappers (QuoteProcessLayout, DesignPage)
- State providers and context consumers (DesignToolProvider)
- Components tightly coupled to Supabase/API calls
- Components already well-represented by the shared UI library

### 1d. Catalogue hooks and utilities

Check that documentation pages exist for:

**Hooks** (`packages/ui/src/hooks/`): `use-theme`, `use-media-query`, `use-local-storage`

**Lib functions** (`packages/ui/src/lib/`): `canvasTint.ts` (color processing), `recolor.ts` (product recoloring), `color-accuracy.ts` (OKLab color matching), `swatchParams.ts` (swatch parameters)

These should be documented in `src/stories/docs/Hooks.mdx` and `src/stories/docs/Utilities.mdx` respectively.

---

## Phase 2: Audit — print-room-no-design-tool (Shopify Storefront)

The Shopify theme uses Liquid templates, not React. The goal is NOT to port Liquid to React, but to:
1. Ensure React equivalents exist for key customer-facing Shopify patterns
2. Keep design tokens synced between platforms
3. Use real Shopify content and data in stories

### 2a. Sync design tokens

Read `print-room-no-design-tool/snippets/design-tokens.liquid` and compare against `src/tokens/design-tokens.json`. Flag any values that have drifted. The Shopify file is the source of truth for storefront-facing tokens.

Files that must stay in sync when tokens change:
- `src/tokens/design-tokens.json` — master token file
- `src/styles/globals.css` — CSS custom properties for Storybook
- `packages/ui/src/styles/globals.css` — CSS custom properties for the UI package
- `tailwind.config.ts` — Tailwind theme extension

### 2b. Map Shopify patterns to React components

Key Shopify patterns and their React status:

| Shopify Pattern | Liquid Source | React Component | Story Status |
|---|---|---|---|
| Product tile | `product-tile-standard.liquid` | `ProductCard` | Has story |
| Modal dialog | `modal.liquid` | `Modal` | Has story |
| Collapsible/accordion | `collapsible.liquid` | `Accordion` | Has story |
| Branding service card | `branding-service-cards.liquid` | `BrandingServiceCard` | Has story |
| Service pill | `branding-service-pill.liquid` | `Pill` | Has story |
| Quote request form | `quote-request-modal.liquid` | `QuoteDetailsForm` + `Modal` | Has story — should show composed together |
| Free shipping bar | `free-shipping-progress.liquid` | `FreeShippingProgress` | Has story |
| Favorites/wishlist | `favorites-button.liquid` | `FavoriteButton` | Has story |
| Quantity selector | `product-form-component-quantity-selector.liquid` | `QuantityInput` | Has story |
| Breadcrumbs | `breadcrumbs.liquid` | `Breadcrumbs` | Has story (added recently) |
| Pagination | `pagination.liquid` | `Pagination` | Has story (added recently) |
| Quote pill CTA | `quote-pill.liquid` | `Pill` (variant) | Needs variant story |
| Favorites drawer | `drawer-favorites.liquid` | `Sidebar` (variant) | Needs variant story |
| Announcement bar | `announcement-bar.liquid` | *missing* | Consider adding |
| Social icons | `social-icons.liquid` | *missing* | Consider adding |
| AI chatbot widget | `ai-chatbot.liquid` | *missing* | Low priority — separate app |

### 2c. Extract real content

Use actual data from the Shopify theme to make stories realistic. This has been partially done via `production-data.ts` — verify it covers:

- Product names, vendors, and NZD prices from real collection templates
- Branding service descriptions matching `sections/branding-service-cards.liquid`
- NZ location names from collection templates (Auckland, Wellington, etc.)
- Quote form field labels and validation matching `snippets/quote-request-modal.liquid`
- Stock status labels matching `product-block-inventory.liquid` and `product-block-live-stock.liquid`

---

## Phase 3: Implementation

### 3a. Update existing stories

For each story:
- Import fixture data from `src/stories/fixtures/production-data.ts` instead of hardcoding
- Ensure Default story uses the most common production configuration
- Add composition stories that show real page-level patterns (e.g. ProductCard grid with FavoriteButton overlays and Pill badges, QuoteDetailsForm inside a Modal)
- Match TypeScript interfaces — if a component's props have changed, update the story's argTypes

### 3b. Create missing stories

- Components in `packages/ui/` without stories → create in `src/stories/ui/`
- Design-tool components → vendor into `src/vendored/design-tool/`, create stories in `src/stories/design-tool/`
- New components for Shopify patterns → create in `packages/ui/src/components/`, export from `index.ts`, create stories

### 3c. Sync vendored components

Check if vendored components have drifted from their source in `print-room-studio/apps/design-tool/src/components/`. If the source has changed:
1. Copy the updated source
2. Remove `'use client'` directives
3. Inline any external type imports (define interfaces locally)
4. Fix import paths (replace `@/` with relative or `@print-room-studio/ui`)
5. Copy any associated CSS modules

### 3d. Update documentation MDX pages

- `Introduction.mdx` — update component counts and coverage tables
- `DesignTokens.mdx` — update if any token values changed
- `DesignTokensGuide.mdx` — update file paths if structure changed
- `Hooks.mdx` and `Utilities.mdx` — update if new hooks/utils were added

---

## Technical Reference

### Story file pattern

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';  // NOT @storybook/react
import { fn } from 'storybook/test';  // for action mocks
import { ComponentName } from '@print-room-studio/ui';
import { storefrontProducts } from '../fixtures/production-data';

const meta: Meta<typeof ComponentName> = {
  title: 'Storefront/ComponentName',  // or Primitives/ or App/Design Tool/
  component: ComponentName,
  parameters: {
    layout: 'centered',  // or 'padded' for full-width
    docs: {
      description: {
        component: 'What this component does and where it appears in the Print Room UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { /* controls with descriptions */ },
  args: { onClick: fn() },  // action mocks
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Use production-shaped data
    title: storefrontProducts[0].title,
    price: storefrontProducts[0].price,
  },
};
```

### Import paths

| What | Import |
|------|--------|
| Shared UI components | `import { Button } from '@print-room-studio/ui'` |
| Vendored design-tool | `import AnimatedColorButton from '@vendored/design-tool/controls/AnimatedColorButton'` |
| Storybook types | `import type { Meta, StoryObj } from '@storybook/react-vite'` |
| Test utilities | `import { fn } from 'storybook/test'` |
| MDX doc blocks | `import { Meta, ColorPalette, ... } from '@storybook/addon-docs/blocks'` |
| Fixture data | `import { storefrontProducts, ... } from '../fixtures/production-data'` |

### Vendoring design-tool components

1. Copy from `print-room-studio/apps/design-tool/src/components/` to `print-room-ui/src/vendored/design-tool/`
2. Remove `'use client'` directives (Storybook doesn't use RSC)
3. Inline any type imports from `@/types/`, `@/hooks/` — define interfaces locally in the file
4. Replace `@/` imports with relative paths or `@print-room-studio/ui` imports
5. Copy associated CSS module files if the component uses them

### Mocking Next.js APIs

Already configured in `.storybook/mocks/`:
- `next-link.tsx` → `<a>` tag
- `next-image.tsx` → `<img>` tag
- `next-navigation.tsx` → stubs for `useRouter`, `usePathname`, `useSearchParams`

Aliased in `.storybook/main.ts`. No setup needed for components that import from `next/*`.

### Storybook configuration

- **Framework**: `@storybook/react-vite` (Storybook 10.3.5)
- **Addons**: a11y, links, docs
- **Docgen**: `react-docgen` (not `react-docgen-typescript` — switched for performance)
- **Theme**: Light/dark toggle via toolbar, decorators apply theme class to `<html>`
- **Viewports**: Mobile (375px), Mobile Large (414px), Tablet (768px), Laptop (1024px), Desktop (1440px)
- **Backgrounds**: light (`#FBFBF6` — the storefront off-white), dark (`#0f172a`), figma-bg (`#F5F2ED`)
- **A11y**: color-contrast enabled, landmark checks disabled (Storybook chrome interferes)
- **pnpm**: Uses `shamefully-hoist=true` in `.npmrc` (required for Storybook 10 + pnpm)

### Adding new components to packages/ui

1. Create component in `packages/ui/src/components/new-component.tsx`
2. Export from `packages/ui/src/components/index.ts`
3. Use Radix UI primitives where appropriate (already in devDependencies)
4. Use CVA (`class-variance-authority`) for variant props
5. Use `cn()` from `../utils` for className merging
6. Create story in `src/stories/ui/NewComponent.stories.tsx`

---

## Verification

After making changes:

1. **`pnpm dev`** — Storybook starts on port 6006 without errors
2. **Sidebar check** — Every story loads, no crashed/blank panels
3. **`pnpm type-check`** — No TypeScript errors
4. **`pnpm lint`** — No ESLint errors
5. **`pnpm build`** — Static build succeeds (outputs to `dist/`)
6. **Visual check** — Stories show realistic Print Room content, not placeholder text
7. **Controls check** — ArgType controls in the panel actually modify the rendered component
8. **Dark mode** — Toggle the theme in toolbar, verify components adapt
9. **Viewport** — Check Mobile and Desktop viewports for responsive components

---

## Rules

- **Read-only references**: Never modify `print-room-studio` or `print-room-no-design-tool`
- **No unnecessary deps**: Check `package.json` before adding anything
- **No abstractions**: Keep stories simple and direct — no wrapper components or story helpers beyond what's in `production-data.ts`
- **No extra annotations**: Don't add comments, docstrings, or type annotations to code you didn't change
- **Workspace resolution**: `packages/ui/` resolves as `@print-room-studio/ui` via pnpm `workspace:*`
- **Storybook 10**: Use `@storybook/react-vite` (not `@storybook/react`) for Meta/StoryObj types
- **Production data first**: Always prefer realistic NZ/Print Room data over generic placeholders
