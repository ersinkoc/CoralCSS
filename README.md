# CoralCSS

A modern, zero-dependency CSS framework with utility-first classes, headless components, and first-class support for modern CSS features.

## Features

- **Zero Dependencies** - No runtime dependencies, just pure TypeScript
- **Utility-First** - Comprehensive utility classes like Tailwind but with modern CSS features
- **Headless Components** - Accessible, unstyled UI components (Dialog, Dropdown, Tabs, etc.)
- **Modern CSS** - First-class support for anchor positioning, container queries, :has(), scroll-driven animations, view transitions
- **Plugin Architecture** - Micro-kernel design with everything as plugins
- **Multiple Presets** - Coral (default), Wind (Tailwind-compatible), Mini (minimal), Full (everything)
- **Runtime + Build** - Works via CDN or build tools (Vite, PostCSS)
- **Dark Mode** - Built-in dark mode with class, media, or selector strategies
- **TypeScript** - Full TypeScript support with strict types

## Installation

```bash
npm install @coral-css/core
# or
pnpm add @coral-css/core
# or
yarn add @coral-css/core
```

## Quick Start

### Build Tool Usage (Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
})
```

```html
<!-- Import virtual CSS -->
<link rel="stylesheet" href="virtual:coral.css">

<!-- Use utility classes -->
<div class="flex items-center gap-4 p-4 bg-coral-500 text-white rounded-lg">
  Hello, CoralCSS!
</div>
```

### CDN Usage

```html
<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
<script>
  // CoralCSS auto-initializes and watches for class changes
  const coral = window.CoralCSS.getCoralCDN()
</script>
```

### Programmatic Usage

```typescript
import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
console.log(css)
```

## Utility Classes

CoralCSS provides thousands of utility classes covering:

### Layout
- `flex`, `grid`, `block`, `inline`, `hidden`
- `items-center`, `justify-between`, `gap-4`
- `container`, `mx-auto`, `px-4`

### Spacing
- `p-{0-96}`, `m-{0-96}`, `gap-{0-96}`
- `px-4`, `py-2`, `mt-4`, `mb-8`
- Negative values: `-mt-4`, `-ml-2`

### Sizing
- `w-{0-96}`, `h-{0-96}`, `size-{0-96}`
- `w-full`, `w-screen`, `w-1/2`, `w-auto`
- `min-w-0`, `max-w-lg`, `min-h-screen`

### Typography
- `text-xs` to `text-9xl`
- `font-sans`, `font-serif`, `font-mono`
- `font-normal`, `font-medium`, `font-bold`
- `tracking-tight`, `leading-relaxed`

### Colors
- `bg-{color}-{shade}`, `text-{color}-{shade}`
- `border-{color}-{shade}`, `ring-{color}-{shade}`
- Opacity: `bg-coral-500/50`

### Borders
- `rounded-{none|sm|md|lg|xl|full}`
- `border-{0|2|4|8}`, `border-{color}`
- `ring-{0|1|2|4|8}`, `ring-offset-{0-8}`

### Effects
- `shadow-{sm|md|lg|xl|2xl}`
- `opacity-{0-100}`
- `blur-{sm|md|lg|xl}`

### Transforms
- `scale-{0-150}`, `rotate-{0-180}`
- `translate-x-{0-96}`, `-translate-y-4`
- `origin-center`, `origin-top-left`

### Transitions
- `transition`, `transition-colors`, `transition-all`
- `duration-{75-1000}`, `delay-{75-1000}`
- `ease-in`, `ease-out`, `ease-in-out`

## Variants

Apply styles conditionally:

```html
<!-- Pseudo-classes -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark mode -->
<div class="bg-white dark:bg-slate-900">

<!-- State variants -->
<input class="border focus:border-coral-500 invalid:border-red-500">

<!-- Group/peer variants -->
<div class="group">
  <span class="group-hover:text-coral-500">Hover parent to change</span>
</div>
```

### Variant Groups (Unique Feature!)

```html
<!-- Instead of repeating variants -->
<div class="hover:bg-coral-500 hover:text-white hover:scale-105">

<!-- Use variant groups -->
<div class="hover:(bg-coral-500 text-white scale-105)">
```

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

## Headless Components

Accessible, unstyled components with full keyboard navigation:

```typescript
import { createDialog, createDropdown, createTabs } from '@coral-css/core/components'

// Dialog
const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  trapFocus: true,
})
dialog.open()

// Dropdown
const dropdown = createDropdown('#my-dropdown')
dropdown.element.addEventListener('coral:dropdown:select', (e) => {
  console.log('Selected:', e.detail.item)
})

// Auto-initialize all components
import { initComponents } from '@coral-css/core/components'
document.addEventListener('DOMContentLoaded', initComponents)
```

### Available Components
- `Dialog` - Modal dialogs with focus trap
- `Dropdown` - Dropdown menus with keyboard navigation
- `Tabs` - Tabbed interfaces with ARIA
- `Accordion` - Collapsible panels
- `Tooltip` - Tooltips with delay and positioning
- `Switch` - Toggle switches
- `Toast` - Toast notifications with auto-dismiss

## Configuration

```typescript
import { createCoral, coralPreset, fullPreset } from '@coral-css/core'

const coral = createCoral({
  prefix: 'tw-',        // Class prefix
  darkMode: 'class',    // 'class' | 'media' | 'selector' | 'auto'
})

// Use different presets
coralPreset({ darkMode: 'class' })  // Default, includes modern CSS
windPreset({ darkMode: 'media' })   // Tailwind-compatible
miniPreset()                        // Minimal utilities only
fullPreset()                        // Everything
```

## Build Tools

### Vite Plugin

```typescript
import coral from '@coral-css/core/vite'

export default {
  plugins: [coral()]
}
```

### PostCSS Plugin

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

### CLI

```bash
npx coral src/**/*.html -o dist/styles.css --minify
```

## Browser Support

CoralCSS supports all modern browsers. Some features like anchor positioning and scroll-driven animations require the latest browser versions.

## TypeScript

Full TypeScript support with exported types:

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

## License

MIT © CoralCSS

## Links

- [Documentation](https://coralcss.dev)
- [GitHub](https://github.com/coralcss/core)
- [npm](https://www.npmjs.com/package/@coral-css/core)
