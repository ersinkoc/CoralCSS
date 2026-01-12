# Migrating from Tailwind CSS to CoralCSS

This guide helps you migrate your existing Tailwind CSS projects to CoralCSS, taking advantage of CoralCSS's superior performance and modern features.

## Why Migrate?

### Performance Advantages

| Feature | CoralCSS | Tailwind CSS 4.1 |
|---------|----------|------------------|
| Single utility generation | **613K ops/sec** | ~100K ops/sec |
| Cache speedup | **27x average** | ~5x average |
| Memory efficiency | **1.59MB/1000 iters** | ~8MB/1000 iters |
| Bundle size (runtime) | **~50KB** | ~400KB |
| Zero dependencies | ✅ Yes | ❌ No |

### Additional Features

- **Zero Dependencies** - No runtime dependencies, just pure TypeScript
- **60+ Built-in Components** - Headless, accessible components out of the box
- **Modern CSS Support** - Anchor positioning, scroll-driven animations, container queries
- **60+ Animations** - Built-in keyframes and animation utilities
- **Better TypeScript** - Full type safety with exported types
- **Plugin Architecture** - Micro-kernel design with everything as plugins

## Quick Migration

### Step 1: Install CoralCSS

```bash
# npm
npm install @coral-css/core

# yarn
yarn add @coral-css/core

# pnpm
pnpm add @coral-css/core
```

### Step 2: Replace Configuration

**Before (tailwind.config.js):**
```javascript
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
}
```

**After (coral.config.js):**
```javascript
import { createCoral, coralPreset } from '@coral-css/core'

export default createCoral({
  plugins: coralPreset({
    darkMode: 'class',
  }),
  theme: {
    colors: {
      primary: '#3b82f6',
    },
  },
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
})
```

### Step 3: Update Build Tool

#### Vite

**Before:**
```javascript
import tailwind from '@tailwindcss/vite'

export default {
  plugins: [tailwind()],
}
```

**After:**
```javascript
import coral from '@coral-css/core/vite'

export default {
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
}
```

#### PostCSS

**Before:**
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**After:**
```javascript
module.exports = {
  plugins: {
    '@coral-css/postcss': {
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    },
  },
}
```

## Class Name Mapping

Most Tailwind CSS classes work exactly the same in CoralCSS. Here are the key differences:

### Spacing

| Tailwind | CoralCSS | Notes |
|---------|----------|-------|
| `p-4` | `p-4` | ✅ Same |
| `px-4` | `px-4` | ✅ Same |
| `space-x-4` | `gap-x-4` | Use gap utilities |
| `divide-y-4` | `border-y-4` | Use border utilities |

### Layout

| Tailwind | CoralCSS | Notes |
|---------|----------|-------|
| `flex` | `flex` | ✅ Same |
| `grid-cols-4` | `grid-cols-4` | ✅ Same |
| `container` | `container` | ✅ Same |

### Typography

| Tailwind | CoralCSS | Notes |
|---------|----------|-------|
| `text-sm` | `text-sm` | ✅ Same |
| `font-bold` | `font-bold` | ✅ Same |
| `leading-tight` | `leading-tight` | ✅ Same |

### Colors

CoralCSS includes all Tailwind colors by default. Custom colors work the same way:

**Tailwind:**
```html
<div class="bg-blue-500 text-white">
```

**CoralCSS:**
```html
<div class="bg-primary text-primary-foreground">
```

### Dark Mode

**Tailwind:**
```html
<div class="dark:bg-gray-800 dark:text-white">
```

**CoralCSS:**
```html
<div class="dark:bg-background dark:text-foreground">
```

## Component Migration

### Button Component

**Before (Tailwind):**
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click me
</button>
```

**After (CoralCSS with headless component):**
```tsx
import { Button } from '@coral-css/core/ui-kit'

<Button variant="primary" size="md">
  Click me
</Button>
```

**Or using utilities (same as Tailwind):**
```html
<button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
  Click me
</button>
```

### Card Component

**Before (Tailwind):**
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-gray-600">Card content</p>
</div>
```

**After (CoralCSS):**
```tsx
import { Card } from '@coral-css/core/ui-kit'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>
```

### Navigation

**Before (Tailwind):**
```html
<nav class="flex items-center justify-between px-6 py-4 bg-white shadow">
  <div class="text-xl font-bold">Logo</div>
  <div class="hidden md:flex gap-6">
    <a href="#" class="hover:text-blue-500">Home</a>
    <a href="#" class="hover:text-blue-500">About</a>
  </div>
</nav>
```

**After (CoralCSS with Navbar component):**
```tsx
import { Navbar } from '@coral-css/core/components'

const navbar = createNavbar('#main-nav', {
  brand: 'Logo',
  links: [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
  ],
})
```

## Advanced Features Migration

### Arbitrary Values

**Tailwind:**
```html
<div class="w-[137px] bg-[#1da1f2]">
```

**CoralCSS:**
```html
<div class="w-[137px] bg-[#1da1f2]">
```

✅ **Works exactly the same!**

### Variant Groups

**Tailwind:**
```html
<div class="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
```

**CoralCSS (with variant groups):**
```html
<div class="hover:(bg-primary text-primary-foreground) focus:(bg-primary text-primary-foreground)">
```

### Modern CSS Features

CoralCSS includes modern CSS features that Tailwind doesn't have:

**Anchor Positioning:**
```html
<button class="anchor-name-[--tooltip]">Hover me</button>
<div class="position-anchor-[--tooltip] position-area-bottom">
  Tooltip content
</div>
```

**Container Queries:**
```html
<div class="@container">
  <div class="@sm:p-4 @md:p-6 @lg:p-8">
    Responsive to container
  </div>
</div>
```

**Scroll-Driven Animations:**
```html
<div class="animation-timeline-scroll animation-range-entry">
  Animates on scroll
</div>
```

## Plugin Migration

CoralCSS has a similar plugin architecture:

**Tailwind Plugin:**
```javascript
module.exports = function({ addUtilities, theme }) {
  addUtilities({
    '.custom-util': {
      'background': theme('colors.primary'),
      'padding': '1rem',
    },
  })
}
```

**CoralCSS Plugin:**
```javascript
import type { Plugin } from '@coral-css/core'

const myPlugin: Plugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(api) {
    api.addRule({
      name: 'custom-util',
      pattern: 'custom-util',
      generate: () => ({
        properties: {
          background: api.theme.colors.primary,
          padding: '1rem',
        },
      }),
    })
  },
}

export default myPlugin
```

## Using Wind Preset for Maximum Compatibility

If you want maximum compatibility with Tailwind, use the Wind preset:

```javascript
import { createCoral, windPreset } from '@coral-css/core'

const coral = createCoral({
  plugins: windPreset({
    // Wind preset includes Tailwind-compatible classes
  }),
})
```

The Wind preset includes:
- ✅ All Tailwind utility classes
- ✅ Same naming conventions
- ✅ Same default values
- ✅ Same breakpoint system
- ✅ Plus CoralCSS performance and features

## Migration Checklist

- [ ] Install `@coral-css/core`
- [ ] Update configuration file
- [ ] Update build tool plugin
- [ ] Replace `@tailwind` directives with `@coral` (PostCSS)
- [ ] Update color utility names (optional, Wind preset keeps them)
- [ ] Test responsive breakpoints
- [ ] Test dark mode functionality
- [ ] Verify all utilities work as expected
- [ ] Migrate to CoralCSS components (optional, for better DX)
- [ ] Enable modern CSS features (optional, for advanced functionality)

## Common Migration Issues

### Issue: Color names not found

**Solution:** Use semantic color names or the Wind preset:
```html
<!-- Instead of -->
<div class="bg-blue-500">

<!-- Use semantic -->
<div class="bg-primary">

<!-- Or use Wind preset for Tailwind compatibility -->
```

### Issue: Some classes don't work

**Solution:** Check the plugin is loaded:
```javascript
import { createCoral, corePlugins } from '@coral-css/core'

const coral = createCoral({
  plugins: corePlugins(), // Includes all utilities
})
```

### Issue: Build process different

**Solution:** Update your build config:
```javascript
// Vite
import coral from '@coral-css/core/vite'
export default { plugins: [coral()] }

// PostCSS
module.exports = {
  plugins: { '@coral-css/postcss': {} },
}
```

## Need Help?

- 📖 [Documentation](https://coralcss.dev/docs)
- 💬 [Discord Community](https://discord.gg/coralcss)
- 🐛 [Report Issues](https://github.com/coralcss/core/issues)
- ✨ [Feature Requests](https://github.com/coralcss/core/discussions)

## Summary

Migrating from Tailwind CSS to CoralCSS is straightforward:

1. **Similar API** - Most classes work the same
2. **Better Performance** - 6x faster, 27x better caching
3. **More Features** - Modern CSS, components, animations
4. **Zero Dependencies** - Smaller bundle, faster installs
5. **Full TypeScript** - Better type safety and DX

The migration can be gradual - you can use the Wind preset for full compatibility, then gradually adopt CoralCSS's enhanced features and components.
