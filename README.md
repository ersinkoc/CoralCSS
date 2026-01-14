# CoralCSS

Modern, zero-dependency CSS framework with utility-first classes and headless components.

[![npm version](https://img.shields.io/npm/v/@coral-css/core.svg)](https://www.npmjs.com/package/@coral-css/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-10,056%20passing-brightgreen.svg)]()

## What is CoralCSS?

CoralCSS is a complete CSS framework built from the ground up with modern web development in mind. It combines:

- **Utility Classes** - 700+ utility classes for rapid UI development
- **Headless Components** - 78 accessible, unstyled UI components
- **Modern CSS** - First-class support for container queries, anchor positioning, scroll-driven animations
- **High Performance** - Rust-powered Turbo engine for blazing fast builds

## Installation

```bash
npm install @coral-css/core
```

## Quick Start

### With Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [coral()]
})
```

```html
<link rel="stylesheet" href="virtual:coral.css">

<div class="flex items-center gap-4 p-4 bg-coral-500 text-white rounded-lg">
  Hello, CoralCSS!
</div>
```

### With CDN

```html
<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
```

### Programmatic

```typescript
import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
```

## Utility Classes

### Layout

```html
<div class="flex items-center justify-between gap-4">
<div class="grid grid-cols-3 gap-4">
<div class="container mx-auto px-4">
```

### Spacing

```html
<div class="p-4 m-2 gap-4">
<div class="px-4 py-2 mt-4 mb-8">
<div class="-mt-4 -ml-2">  <!-- Negative values -->
```

### Typography

```html
<p class="text-lg font-bold text-gray-900">
<p class="text-sm font-medium tracking-tight leading-relaxed">
```

### Colors

```html
<div class="bg-coral-500 text-white border-gray-200">
<div class="bg-coral-500/50">  <!-- With opacity -->
```

### Effects

```html
<div class="shadow-lg rounded-xl opacity-90">
<div class="blur-sm backdrop-blur-md">
```

### Transforms

```html
<div class="scale-105 rotate-45 translate-x-4">
<div class="perspective-1000 rotate-x-45">  <!-- 3D -->
```

## Variants

```html
<!-- Pseudo-classes -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark mode -->
<div class="bg-white dark:bg-slate-900">

<!-- State -->
<input class="border focus:border-coral-500 invalid:border-red-500">

<!-- Group -->
<div class="group">
  <span class="group-hover:text-coral-500">Hover parent</span>
</div>

<!-- Variant groups (unique!) -->
<div class="hover:(bg-coral-500 text-white scale-105)">
```

## Headless Components

78 accessible, unstyled components with full keyboard navigation:

```typescript
import { createDialog, createDropdown, createTabs } from '@coral-css/core/components'

const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  trapFocus: true,
})
dialog.open()
```

### Available Components

| Category | Components |
|----------|------------|
| **Overlays** | Dialog, Dropdown, Drawer, Popover, Tooltip, Toast, ContextMenu, Sheet |
| **Navigation** | Tabs, Accordion, Breadcrumb, Pagination, Stepper, Tree, Navbar, Menu |
| **Forms** | Switch, Checkbox, Radio, Select, Combobox, Slider, Input, FileUpload |
| **Date/Time** | Calendar, DatePicker, DateRangePicker, TimePicker |
| **Feedback** | Alert, Spinner, Progress, Skeleton, Countdown |
| **Data** | Card, Avatar, Badge, Table, DataTable, Timeline, Rating |
| **Advanced** | Carousel, Command, Tour, QRCode, Transfer, VirtualList, ColorPicker |

## Modern CSS Features

### Container Queries

```html
<div class="@container">
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container size
  </div>
</div>
```

### Anchor Positioning

```html
<button class="anchor-name-[--btn]">Anchor</button>
<div class="position-anchor-[--btn] position-area-bottom">
  Positioned relative to anchor
</div>
```

### Scroll-Driven Animations

```html
<div class="animation-timeline-scroll animation-range-entry">
  Animates as you scroll
</div>
```

### 3D Transforms

```html
<div class="perspective-1000 transform-style-3d">
  <div class="rotate-x-45 rotate-y-30 translate-z-20">
    3D transformed element
  </div>
</div>
```

## Animations

60+ built-in animations:

```html
<!-- Entrance -->
<div class="animate-fade-in">
<div class="animate-slide-in-left">
<div class="animate-zoom-in">

<!-- Attention -->
<div class="animate-bounce">
<div class="animate-pulse">
<div class="animate-shake">

<!-- Loading -->
<div class="animate-spinner">
<div class="animate-dots">

<!-- Controls -->
<div class="animate-duration-500 animate-delay-100 animate-ease-out">
```

## Configuration

```typescript
import { createCoral } from '@coral-css/core'

const coral = createCoral({
  prefix: 'c-',           // Class prefix
  darkMode: 'class',      // 'class' | 'media' | 'selector'
})
```

### Presets

```typescript
import { coralPreset, windPreset, miniPreset, fullPreset } from '@coral-css/core'

coralPreset()   // Default with modern CSS
windPreset()    // Tailwind-compatible
miniPreset()    // Minimal utilities
fullPreset()    // Everything included
```

### Design System Presets

```typescript
materialPreset()    // Material Design 3
cupertinoPreset()   // Apple iOS/macOS
nordPreset()        // Nord arctic theme
draculaPreset()     // Dracula dark theme
githubPreset()      // GitHub design system
```

## Build Tool Support

| Tool | Status |
|------|--------|
| Vite | Full plugin support |
| PostCSS | Full plugin support |
| Webpack | Loader available |
| Rollup | Plugin available |
| ESBuild | Plugin available |
| Next.js | Supported |
| Nuxt | Supported |
| Astro | Supported |
| SvelteKit | Supported |

## Framework Integrations

```typescript
// React
import { useCoralCSS } from '@coral-css/core/react'

// Vue
import { createCoralPlugin } from '@coral-css/core/vue'

// Angular
import { CoralModule } from '@coral-css/core/angular'

// Svelte
import { coralStore } from '@coral-css/core/svelte'
```

## Coral Turbo Engine

Optional Rust-powered engine for maximum performance:

```bash
npm install @coral-css/turbo
```

```typescript
import { createEngine } from '@coral-css/turbo'

const turbo = await createEngine()
const css = turbo.process('p-4 m-2 flex items-center')
```

**Performance:**
- 10,000 classes/ms parsing
- 281 KB/ms parallel extraction
- 95 tests passing

## Architecture

CoralCSS uses a micro-kernel architecture:

```
┌─────────────────────────────────────────┐
│              Application                │
├─────────────────────────────────────────┤
│   Presets (coral, wind, mini, full)     │
├─────────────────────────────────────────┤
│              Plugins                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Layout  │ │ Colors  │ │ Effects │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│              Kernel                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Parser  │ │ Matcher │ │Generator│   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│         Turbo Engine (Rust)             │
└─────────────────────────────────────────┘
```

## Test Coverage

| Package | Tests | Status |
|---------|-------|--------|
| @coral-css/core | 9,961 | Passing |
| @coral-css/turbo | 95 | Passing |
| **Total** | **10,056** | **100%** |

## TypeScript

Full TypeScript support with strict types:

```typescript
import type {
  Coral,
  Plugin,
  Rule,
  Variant,
  Theme,
  ComponentConfig,
} from '@coral-css/core'
```

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

Some features (anchor positioning, scroll-driven animations) require latest browser versions.

## License

MIT

## Links

- [Documentation](https://coralcss.dev)
- [GitHub](https://github.com/nicholascostadev/coralcss)
- [npm](https://www.npmjs.com/package/@coral-css/core)
