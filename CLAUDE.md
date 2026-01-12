# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run build        # Build with tsup (outputs to dist/)
npm run dev          # Watch mode build
npm run build:css    # Build CSS only (runs build-css.js script)
npm run test         # Run all tests with vitest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright e2e tests
npm run lint         # Lint src/ with ESLint
npm run lint:fix     # Auto-fix lint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run typecheck    # TypeScript type checking
npm run clean        # Remove dist/
```

Run a single test file:
```bash
npx vitest run tests/unit/kernel.test.ts
```

CLI Usage:
```bash
npx coralcss src/**/*.html -o dist/styles.css --minify
```

## Architecture Overview

CoralCSS is a zero-dependency, utility-first CSS framework with JIT (Just-In-Time) CSS generation. It follows a micro-kernel plugin architecture.

### Core Components

**Kernel** (`src/kernel.ts`) - The central engine that:
- Manages plugin registration and lifecycle
- Coordinates CSS generation pipeline
- Handles configuration resolution
- Emits events for extensibility

**Core Pipeline** (`src/core/`):
- `parser.ts` - Parses class names, extracts variants, handles variant groups `hover:(bg-red text-white)`
- `matcher.ts` - Matches utility classes against registered rules
- `generator.ts` - Generates CSS from matched rules with variant support
- `cache.ts` - LRU cache for generated CSS
- `extractor.ts` - Extracts classes from HTML/JSX content
- `transformer.ts` - Post-processes generated CSS

### Plugin System

Plugins register **rules** and **variants** via the PluginAPI:

```typescript
const myPlugin: Plugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(api) {
    api.addRule({ pattern: /^custom-(\d+)$/, generate: (m) => ({ padding: `${m[1]}px` }) })
    api.addVariant({ name: 'hover', match: 'hover', transform: (sel) => `${sel}:hover` })
    api.extendTheme({ colors: { brand: '#ff6b6b' } })
  }
}
```

**Plugin Categories** (`src/plugins/`):
- `core/utilities/` - Spacing, sizing, colors, typography, layout, flexbox, grid, borders, effects, filters, transforms, transitions
- `core/variants/` - Pseudo-classes, responsive breakpoints, dark mode, modern CSS variants
- `core/modern.ts` - Container queries, anchor positioning, scroll-driven animations
- `optional/` - Icons, typography prose, forms, animations, attributify mode

### Presets

Presets bundle plugins with default configurations (`src/presets/`):
- `coral` - Default preset with modern CSS features
- `wind` - Tailwind-compatible utilities
- `mini` - Minimal core utilities only
- `full` - Everything included

### Theme System

Theme values defined in `src/theme/`:
- `colors.ts` - Color palettes (coral, slate, etc.)
- `spacing.ts` - Spacing/sizing scales
- `typography.ts` - Font families, sizes, weights
- `default.ts` - Complete default theme
- `dark.ts` - Dark mode CSS generation

### Configuration Options

**Safelist/Blocklist** - Control which classes are generated:
```typescript
const coral = createCoral({
  safelist: [
    'bg-red-500',           // Always include this class
    /^text-/,               // Include all text- utilities
    { pattern: /^bg-/, variants: ['hover', 'dark'] }  // With variants
  ],
  blocklist: [
    'opacity-0',            // Never generate this
    /^hidden$/              // Block exact match
  ]
})
```

**Key Options:**
- `darkMode` - 'class' | 'media' | 'selector' | 'auto'
- `prefix` - Add prefix to all classes (e.g., 'tw-')
- `features.variantGroups` - Enable `hover:(class1 class2)` syntax
- `features.attributify` - Enable attributify mode
- `content` - File paths for class extraction
- `safelist` - Always-include patterns
- `blocklist` - Never-generate patterns

### Headless Components

Accessible UI components in `src/components/`:
- Dialog, Dropdown, Tabs, Accordion, Tooltip, Switch, Toast
- All extend `BaseComponent` class with state management
- Auto-initialize via `data-coral-*` attributes

### Framework Integrations

CoralCSS includes first-class integrations for major frameworks:
- `src/react/` - React components and hooks
- `src/vue/` - Vue components and composables
- `src/angular/` - Angular directives, pipes, and services
- `src/svelte/` - Svelte components and actions
- `src/solid/` - SolidJS components and signals
- `src/preact/` - Preact components and hooks
- `src/templates/` - HTML templates and patterns
- `src/ui-kit/` - Comprehensive UI component library

### Build Tool Ecosystem

Multiple build tool plugins available (`src/build/`):
- `vite.ts` - Vite plugin with virtual module `virtual:coral.css`
- `postcss.ts` - PostCSS plugin for `@coral` directives
- `cli.ts` - CLI for static CSS generation
- `webpack.ts` - Webpack plugin
- `rollup.ts` - Rollup plugin
- `esbuild.ts` - ESBuild plugin
- `nextjs.ts` - Next.js integration
- `nuxt.ts` - Nuxt.js integration
- `astro.ts` - Astro integration
- `remix.ts` - Remix integration
- `sveltekit.ts` - SvelteKit integration
- `parcel.ts` - Parcel plugin
- `qwik.ts` - Qwik integration

### Runtime & Build Integration

**Runtime** (`src/runtime/`):
- `observer.ts` - MutationObserver for DOM class changes
- `injector.ts` - Injects generated CSS into `<style>` tags
- `cdn.ts` - Auto-initializing CDN bundle (outputs to `dist/coral.min.global.js`)

### Key Type Definitions

All types in `src/types.ts`:
- `Coral` - Main instance interface
- `Plugin`, `PluginAPI` - Plugin contracts
- `Rule`, `Variant` - CSS generation primitives
- `Theme` - Complete theme structure
- Component prop/state types
- `CoralOptions` - Configuration options including safelist/blocklist
- `DarkModeStrategy` - Dark mode strategies

## Project Structure

```
src/
├── kernel.ts          # Core engine
├── types.ts           # All type definitions
├── errors.ts          # Custom error classes
├── index.ts           # Public API exports
├── core/              # CSS generation pipeline
├── theme/             # Theme values and dark mode
├── plugins/           # Utility and variant plugins
├── presets/           # Plugin bundles
├── components/        # Headless UI components
├── runtime/           # Browser runtime (observer, injector)
├── build/             # Build tool integrations (Vite, Webpack, Rollup, etc.)
├── react/             # React integration
├── vue/               # Vue integration
├── angular/           # Angular integration
├── svelte/            # Svelte integration
├── solid/             # SolidJS integration
├── preact/            # Preact integration
├── templates/         # HTML templates
├── ui-kit/            # Comprehensive UI components
├── tokens/            # Design tokens
├── cva/               # Component variants
├── testing/           # Testing utilities
├── eslint/            # ESLint plugin
├── prettier/          # Prettier plugin
├── intellisense/      # TypeScript intellisense
├── storybook/         # Storybook integration
└── utils/             # Shared utilities
tests/
├── unit/              # Unit tests by module
└── integration/       # Integration tests
examples/              # HTML examples (use dist/coral.min.global.js)
```

## Key Features

### Variant Groups (Unique Feature!)
Apply multiple classes under one variant:

```html
<!-- Instead of repeating variants -->
<div class="hover:bg-coral-500 hover:text-white hover:scale-105">

<!-- Use variant groups -->
<div class="hover:(bg-coral-500 text-white scale-105)">
```

### Modern CSS Features

**Container Queries:**
```html
<div class="@container">
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container size
  </div>
</div>
```

**Anchor Positioning:**
```html
<button class="anchor-name-[--btn]">Anchor</button>
<div class="position-anchor-[--btn] position-area-bottom">
  Positioned relative to anchor
</div>
```

**Scroll-Driven Animations:**
```html
<div class="animation-timeline-scroll animation-range-entry">
  Animates as you scroll
</div>
```

## Usage Examples

### Vite Plugin
```typescript
// vite.config.ts
import coral from '@coral-css/core/vite'

export default {
  plugins: [coral({ darkMode: 'class' })],
}
```

### PostCSS
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@coral-css/core/postcss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    }),
  ],
}
```

```css
/* In your CSS */
@coral base;
@coral theme;
@coral utilities;
@coral components;
```

### CDN Runtime
```html
<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
<script>
  // CoralCSS auto-initializes and watches for class changes
  const coral = window.CoralCSS.getCoralCDN()
</script>
```

## Presets

**coral** (default) - Modern CSS with container queries, anchor positioning
**wind** - Tailwind-compatible utilities
**mini** - Minimal core utilities only
**full** - Everything included (all plugins)

## Conventions

- Plugin names use kebab-case
- Rules can use RegExp or string patterns
- Variant groups syntax: `hover:(class1 class2)`
- Arbitrary values: `p-[17px]`, `bg-[#ff6b6b]`
- Negative values: `-mt-4`, `-translate-x-2`
- Dark mode strategies: `class` (`.dark` ancestor), `media` (prefers-color-scheme), `selector`, `auto`
