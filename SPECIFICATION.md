# CoralCSS Specification

## Package Identity

| Field | Value |
|-------|-------|
| **NPM Package** | `@coral-css/core` |
| **GitHub Organization** | `https://github.com/coralcss` |
| **GitHub Repository** | `https://github.com/coralcss/coralcss` |
| **Documentation Site** | `https://coralcss.com` |
| **License** | MIT |
| **Author** | Ersin Koc (ersinkoc) |
| **Version** | 1.0.0 |

---

## 1. Overview

CoralCSS is a modern, zero-dependency CSS framework that provides:

1. **Utility-first CSS classes** - Complete coverage of all CSS properties
2. **Headless UI components** - Accessible, unstyled components
3. **Modern CSS features** - First-class support for anchor positioning, container queries, :has(), scroll-driven animations, view transitions
4. **Plugin-based architecture** - Micro-kernel design with extensible plugin system
5. **Dual-mode operation** - Works at build-time (Vite/PostCSS) and runtime (CDN)

### 1.1 Design Goals

- **Zero runtime dependencies** - Everything implemented from scratch
- **Type-safe** - Full TypeScript support with strict mode
- **Tree-shakeable** - Only used code in final bundle
- **Framework-agnostic** - Works with any JS framework or vanilla
- **LLM-native** - Designed for AI assistants with predictable APIs
- **Developer experience** - Variant groups, attributify mode, autocomplete

### 1.2 Target Audience

- Frontend developers building modern web applications
- Teams migrating from Tailwind CSS seeking more features
- Developers needing headless UI components
- Projects requiring modern CSS features support

---

## 2. Technical Requirements

### 2.1 Runtime Requirements

| Environment | Version |
|-------------|---------|
| Node.js | >= 18.0.0 |
| TypeScript | >= 5.0.0 |
| Browsers | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |

### 2.2 Build Output

| Format | File | Purpose |
|--------|------|---------|
| ESM | `dist/index.js` | Modern bundlers |
| CJS | `dist/index.cjs` | Node.js require() |
| IIFE | `dist/coral.min.js` | CDN/browser direct |
| Types | `dist/index.d.ts` | TypeScript support |

### 2.3 Bundle Size Targets

| Bundle | Target |
|--------|--------|
| Core (gzipped) | < 8KB |
| With all plugins (gzipped) | < 20KB |
| Runtime/CDN (gzipped) | < 15KB |

### 2.4 Dependencies

```json
{
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.7.0",
    "vitest": "^2.1.0",
    "@vitest/coverage-v8": "^2.1.0",
    "tsup": "^8.3.0",
    "@types/node": "^22.0.0",
    "prettier": "^3.4.0",
    "eslint": "^9.0.0",
    "playwright": "^1.49.0"
  },
  "peerDependencies": {
    "vite": ">=5.0.0",
    "postcss": ">=8.0.0"
  },
  "peerDependenciesMeta": {
    "vite": { "optional": true },
    "postcss": { "optional": true }
  }
}
```

---

## 3. API Specification

### 3.1 Core API

#### createCoral(options)

Creates a new CoralCSS instance.

```typescript
function createCoral(options?: CoralOptions): Coral

interface CoralOptions {
  /** Presets to use */
  presets?: Preset[]
  /** Additional plugins */
  plugins?: Plugin[]
  /** Theme configuration */
  theme?: DeepPartial<Theme>
  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  /** Custom dark mode selector (when darkMode is 'selector') */
  darkModeSelector?: string
  /** Prefix for all classes */
  prefix?: string
  /** Enable/disable features */
  features?: {
    variantGroups?: boolean
    attributify?: boolean
  }
}

interface Coral {
  /** Current resolved configuration */
  readonly config: ResolvedConfig
  /** Registered plugins */
  readonly plugins: ReadonlyMap<string, Plugin>
  /** Register a plugin */
  use(plugin: Plugin): this
  /** Unregister a plugin by name */
  unregister(name: string): boolean
  /** Generate CSS from class names */
  generate(classes: string[]): string
  /** Generate CSS from HTML content */
  generateFromHTML(html: string): string
  /** Get all registered rules */
  getRules(): Rule[]
  /** Get all registered variants */
  getVariants(): Variant[]
  /** Reset instance state */
  reset(): void
}
```

### 3.2 Plugin API

```typescript
interface Plugin {
  /** Unique plugin name (kebab-case) */
  name: string
  /** Semantic version */
  version: string
  /** Dependencies on other plugins */
  dependencies?: string[]
  /** Priority (higher = runs first, default: 0) */
  priority?: number
  /** Called when plugin is registered */
  install: (api: PluginAPI) => void
  /** Called after all plugins installed */
  onReady?: () => void | Promise<void>
  /** Called when plugin is unregistered */
  onDestroy?: () => void | Promise<void>
  /** Called on error in this plugin */
  onError?: (error: Error) => void
}

interface PluginAPI {
  /** Add a utility rule */
  addRule(rule: Rule): void
  /** Add multiple utility rules */
  addRules(rules: Rule[]): void
  /** Add a variant */
  addVariant(variant: Variant): void
  /** Add multiple variants */
  addVariants(variants: Variant[]): void
  /** Extend the theme */
  extendTheme(theme: DeepPartial<Theme>): void
  /** Add a component definition */
  addComponent(component: Component): void
  /** Get theme value by path */
  theme<T = unknown>(path: string, fallback?: T): T
  /** Subscribe to kernel events */
  on(event: KernelEvent, handler: EventHandler): () => void
  /** Get current config */
  getConfig(): ResolvedConfig
}
```

### 3.3 Rule Interface

```typescript
interface Rule {
  /** Rule identifier */
  name: string
  /** Pattern to match class names (RegExp or string) */
  pattern: RegExp | string
  /** Generate CSS from match */
  generate: (match: RegExpMatchArray, theme: Theme) => CSSProperties | null
  /** CSS layer (default: 'utilities') */
  layer?: 'base' | 'components' | 'utilities'
  /** Rule priority (higher = more specific) */
  priority?: number
  /** Autocomplete suggestions */
  autocomplete?: string[] | ((theme: Theme) => string[])
}

interface CSSProperties {
  [property: string]: string | number | CSSProperties
}
```

### 3.4 Variant Interface

```typescript
interface Variant {
  /** Variant identifier */
  name: string
  /** Pattern to match variant prefix */
  match: RegExp | string
  /** Transform selector or wrap in at-rule */
  transform: (selector: string, css: string) => string
  /** Priority for ordering */
  priority?: number
  /** Can combine with other variants */
  combinable?: boolean
}
```

### 3.5 Theme Interface

```typescript
interface Theme {
  colors: ColorScale
  spacing: SpacingScale
  sizing: SizingScale
  fonts: FontFamilies
  fontSizes: FontSizeScale
  fontWeights: FontWeightScale
  lineHeights: LineHeightScale
  letterSpacing: LetterSpacingScale
  borderRadius: BorderRadiusScale
  borderWidth: BorderWidthScale
  boxShadow: BoxShadowScale
  opacity: OpacityScale
  zIndex: ZIndexScale
  transitionDuration: DurationScale
  transitionTimingFunction: EasingScale
  animation: AnimationScale
  screens: ScreensConfig
  containers: ContainerConfig
}

interface ColorScale {
  [name: string]: string | {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }
}

interface SpacingScale {
  [key: string]: string
}

interface ScreensConfig {
  [name: string]: string | { min?: string; max?: string }
}
```

---

## 4. Utility Classes Specification

### 4.1 Spacing Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `p-{value}` | padding | 0, px, 0.5-96 |
| `px-{value}` | padding-left, padding-right | 0, px, 0.5-96, auto |
| `py-{value}` | padding-top, padding-bottom | 0, px, 0.5-96 |
| `pt-{value}` | padding-top | 0, px, 0.5-96 |
| `pr-{value}` | padding-right | 0, px, 0.5-96 |
| `pb-{value}` | padding-bottom | 0, px, 0.5-96 |
| `pl-{value}` | padding-left | 0, px, 0.5-96 |
| `ps-{value}` | padding-inline-start | 0, px, 0.5-96 |
| `pe-{value}` | padding-inline-end | 0, px, 0.5-96 |
| `m-{value}` | margin | 0, px, 0.5-96, auto |
| `mx-{value}` | margin-left, margin-right | 0, px, 0.5-96, auto |
| `my-{value}` | margin-top, margin-bottom | 0, px, 0.5-96, auto |
| `mt-{value}` | margin-top | 0, px, 0.5-96, auto |
| `mr-{value}` | margin-right | 0, px, 0.5-96, auto |
| `mb-{value}` | margin-bottom | 0, px, 0.5-96, auto |
| `ml-{value}` | margin-left | 0, px, 0.5-96, auto |
| `ms-{value}` | margin-inline-start | 0, px, 0.5-96, auto |
| `me-{value}` | margin-inline-end | 0, px, 0.5-96, auto |
| `gap-{value}` | gap | 0, px, 0.5-96 |
| `gap-x-{value}` | column-gap | 0, px, 0.5-96 |
| `gap-y-{value}` | row-gap | 0, px, 0.5-96 |

**Spacing Scale:**
```
0: 0px
px: 1px
0.5: 0.125rem
1: 0.25rem
1.5: 0.375rem
2: 0.5rem
2.5: 0.625rem
3: 0.75rem
3.5: 0.875rem
4: 1rem
5: 1.25rem
6: 1.5rem
7: 1.75rem
8: 2rem
9: 2.25rem
10: 2.5rem
11: 2.75rem
12: 3rem
14: 3.5rem
16: 4rem
20: 5rem
24: 6rem
28: 7rem
32: 8rem
36: 9rem
40: 10rem
44: 11rem
48: 12rem
52: 13rem
56: 14rem
60: 15rem
64: 16rem
72: 18rem
80: 20rem
96: 24rem
```

### 4.2 Sizing Utilities

| Pattern | CSS Property |
|---------|--------------|
| `w-{value}` | width |
| `h-{value}` | height |
| `size-{value}` | width, height |
| `min-w-{value}` | min-width |
| `max-w-{value}` | max-width |
| `min-h-{value}` | min-height |
| `max-h-{value}` | max-height |

**Additional Sizing Values:**
```
auto, full, screen, svw, lvw, dvw, svh, lvh, dvh
min, max, fit
1/2, 1/3, 2/3, 1/4, 2/4, 3/4
1/5, 2/5, 3/5, 4/5
1/6, 2/6, 3/6, 4/6, 5/6
```

### 4.3 Color Utilities

| Pattern | CSS Property |
|---------|--------------|
| `bg-{color}-{shade}` | background-color |
| `text-{color}-{shade}` | color |
| `border-{color}-{shade}` | border-color |
| `ring-{color}-{shade}` | --tw-ring-color |
| `shadow-{color}-{shade}` | --tw-shadow-color |
| `accent-{color}-{shade}` | accent-color |
| `fill-{color}-{shade}` | fill |
| `stroke-{color}-{shade}` | stroke |
| `caret-{color}-{shade}` | caret-color |
| `placeholder-{color}-{shade}` | ::placeholder color |
| `outline-{color}-{shade}` | outline-color |
| `decoration-{color}-{shade}` | text-decoration-color |

**Color Palette:**
- coral (brand): 50-950
- slate, gray, zinc, neutral, stone (neutrals): 50-950
- red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose: 50-950
- inherit, current, transparent, black, white

### 4.4 Typography Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `font-{family}` | font-family | sans, serif, mono |
| `text-{size}` | font-size, line-height | xs, sm, base, lg, xl, 2xl-9xl |
| `font-{weight}` | font-weight | thin, light, normal, medium, semibold, bold, extrabold, black |
| `leading-{value}` | line-height | none, tight, snug, normal, relaxed, loose, 3-10 |
| `tracking-{value}` | letter-spacing | tighter, tight, normal, wide, wider, widest |
| `text-{align}` | text-align | left, center, right, justify, start, end |
| `underline` | text-decoration | underline |
| `overline` | text-decoration | overline |
| `line-through` | text-decoration | line-through |
| `no-underline` | text-decoration | none |
| `uppercase` | text-transform | uppercase |
| `lowercase` | text-transform | lowercase |
| `capitalize` | text-transform | capitalize |
| `normal-case` | text-transform | none |
| `truncate` | overflow, text-overflow, white-space | hidden, ellipsis, nowrap |
| `text-ellipsis` | text-overflow | ellipsis |
| `text-clip` | text-overflow | clip |
| `text-wrap` | text-wrap | wrap |
| `text-nowrap` | text-wrap | nowrap |
| `text-balance` | text-wrap | balance |
| `text-pretty` | text-wrap | pretty |
| `whitespace-{value}` | white-space | normal, nowrap, pre, pre-line, pre-wrap, break-spaces |
| `break-normal` | word-break, overflow-wrap | normal |
| `break-words` | overflow-wrap | break-word |
| `break-all` | word-break | break-all |
| `break-keep` | word-break | keep-all |
| `hyphens-{value}` | hyphens | none, manual, auto |

### 4.5 Layout Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `block` | display | block |
| `inline-block` | display | inline-block |
| `inline` | display | inline |
| `flex` | display | flex |
| `inline-flex` | display | inline-flex |
| `grid` | display | grid |
| `inline-grid` | display | inline-grid |
| `contents` | display | contents |
| `flow-root` | display | flow-root |
| `hidden` | display | none |
| `static` | position | static |
| `fixed` | position | fixed |
| `absolute` | position | absolute |
| `relative` | position | relative |
| `sticky` | position | sticky |
| `inset-{value}` | inset | 0, px, 0.5-96, auto, full, 1/2, etc. |
| `inset-x-{value}` | left, right | same as inset |
| `inset-y-{value}` | top, bottom | same as inset |
| `top-{value}` | top | same as inset |
| `right-{value}` | right | same as inset |
| `bottom-{value}` | bottom | same as inset |
| `left-{value}` | left | same as inset |
| `start-{value}` | inset-inline-start | same as inset |
| `end-{value}` | inset-inline-end | same as inset |
| `z-{value}` | z-index | 0, 10, 20, 30, 40, 50, auto |
| `float-{value}` | float | start, end, right, left, none |
| `clear-{value}` | clear | start, end, left, right, both, none |
| `isolate` | isolation | isolate |
| `isolation-auto` | isolation | auto |
| `object-{fit}` | object-fit | contain, cover, fill, none, scale-down |
| `object-{position}` | object-position | bottom, center, left, left-bottom, etc. |
| `overflow-{value}` | overflow | auto, hidden, clip, visible, scroll |
| `overflow-x-{value}` | overflow-x | same as overflow |
| `overflow-y-{value}` | overflow-y | same as overflow |
| `overscroll-{value}` | overscroll-behavior | auto, contain, none |
| `visible` | visibility | visible |
| `invisible` | visibility | hidden |
| `collapse` | visibility | collapse |

### 4.6 Flexbox Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `flex-row` | flex-direction | row |
| `flex-row-reverse` | flex-direction | row-reverse |
| `flex-col` | flex-direction | column |
| `flex-col-reverse` | flex-direction | column-reverse |
| `flex-wrap` | flex-wrap | wrap |
| `flex-wrap-reverse` | flex-wrap | wrap-reverse |
| `flex-nowrap` | flex-wrap | nowrap |
| `flex-1` | flex | 1 1 0% |
| `flex-auto` | flex | 1 1 auto |
| `flex-initial` | flex | 0 1 auto |
| `flex-none` | flex | none |
| `grow` | flex-grow | 1 |
| `grow-0` | flex-grow | 0 |
| `shrink` | flex-shrink | 1 |
| `shrink-0` | flex-shrink | 0 |
| `order-{value}` | order | 1-12, first, last, none |
| `justify-{value}` | justify-content | normal, start, end, center, between, around, evenly, stretch |
| `justify-items-{value}` | justify-items | start, end, center, stretch |
| `justify-self-{value}` | justify-self | auto, start, end, center, stretch |
| `content-{value}` | align-content | normal, center, start, end, between, around, evenly, baseline, stretch |
| `items-{value}` | align-items | start, end, center, baseline, stretch |
| `self-{value}` | align-self | auto, start, end, center, stretch, baseline |
| `place-content-{value}` | place-content | center, start, end, between, around, evenly, baseline, stretch |
| `place-items-{value}` | place-items | start, end, center, baseline, stretch |
| `place-self-{value}` | place-self | auto, start, end, center, stretch |

### 4.7 Grid Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `grid-cols-{n}` | grid-template-columns | 1-12, none, subgrid |
| `col-auto` | grid-column | auto |
| `col-span-{n}` | grid-column | span 1-12, full |
| `col-start-{n}` | grid-column-start | 1-13, auto |
| `col-end-{n}` | grid-column-end | 1-13, auto |
| `grid-rows-{n}` | grid-template-rows | 1-12, none, subgrid |
| `row-auto` | grid-row | auto |
| `row-span-{n}` | grid-row | span 1-12, full |
| `row-start-{n}` | grid-row-start | 1-13, auto |
| `row-end-{n}` | grid-row-end | 1-13, auto |
| `grid-flow-{value}` | grid-auto-flow | row, col, dense, row-dense, col-dense |
| `auto-cols-{value}` | grid-auto-columns | auto, min, max, fr |
| `auto-rows-{value}` | grid-auto-rows | auto, min, max, fr |

### 4.8 Border Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `border` | border-width | 1px |
| `border-{n}` | border-width | 0, 2, 4, 8 |
| `border-{side}` | border-{side}-width | 1px |
| `border-{side}-{n}` | border-{side}-width | 0, 2, 4, 8 |
| `border-{style}` | border-style | solid, dashed, dotted, double, hidden, none |
| `rounded` | border-radius | 0.25rem |
| `rounded-{size}` | border-radius | none, sm, md, lg, xl, 2xl, 3xl, full |
| `rounded-{corner}-{size}` | border-{corner}-radius | same |
| `divide-x` | border-left-width (children) | 1px |
| `divide-x-{n}` | border-left-width (children) | 0, 2, 4, 8 |
| `divide-y` | border-top-width (children) | 1px |
| `divide-y-{n}` | border-top-width (children) | 0, 2, 4, 8 |
| `divide-{style}` | border-style (children) | solid, dashed, dotted, double, none |
| `outline` | outline-style | solid |
| `outline-{style}` | outline-style | none, dashed, dotted, double |
| `outline-{n}` | outline-width | 0, 1, 2, 4, 8 |
| `outline-offset-{n}` | outline-offset | 0, 1, 2, 4, 8 |
| `ring` | box-shadow (ring) | 3px |
| `ring-{n}` | box-shadow (ring) | 0, 1, 2, 4, 8, inset |
| `ring-offset-{n}` | box-shadow (ring offset) | 0, 1, 2, 4, 8 |

### 4.9 Effects Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `shadow` | box-shadow | default |
| `shadow-{size}` | box-shadow | sm, md, lg, xl, 2xl, inner, none |
| `opacity-{n}` | opacity | 0, 5, 10, 15, ..., 95, 100 |
| `mix-blend-{mode}` | mix-blend-mode | normal, multiply, screen, overlay, etc. |
| `bg-blend-{mode}` | background-blend-mode | same |

### 4.10 Filter Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `blur` | filter: blur() | 8px |
| `blur-{size}` | filter: blur() | none, sm, md, lg, xl, 2xl, 3xl |
| `brightness-{n}` | filter: brightness() | 0, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200 |
| `contrast-{n}` | filter: contrast() | same as brightness |
| `drop-shadow` | filter: drop-shadow() | default |
| `drop-shadow-{size}` | filter: drop-shadow() | sm, md, lg, xl, 2xl, none |
| `grayscale` | filter: grayscale() | 100% |
| `grayscale-0` | filter: grayscale() | 0% |
| `hue-rotate-{n}` | filter: hue-rotate() | 0, 15, 30, 60, 90, 180 |
| `invert` | filter: invert() | 100% |
| `invert-0` | filter: invert() | 0% |
| `saturate-{n}` | filter: saturate() | 0, 50, 100, 150, 200 |
| `sepia` | filter: sepia() | 100% |
| `sepia-0` | filter: sepia() | 0% |
| `backdrop-blur-{size}` | backdrop-filter: blur() | same as blur |
| `backdrop-brightness-{n}` | backdrop-filter: brightness() | same |
| `backdrop-contrast-{n}` | backdrop-filter: contrast() | same |
| `backdrop-grayscale` | backdrop-filter: grayscale() | same |
| `backdrop-hue-rotate-{n}` | backdrop-filter: hue-rotate() | same |
| `backdrop-invert` | backdrop-filter: invert() | same |
| `backdrop-opacity-{n}` | backdrop-filter: opacity() | same |
| `backdrop-saturate-{n}` | backdrop-filter: saturate() | same |
| `backdrop-sepia` | backdrop-filter: sepia() | same |

### 4.11 Transform Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `scale-{n}` | transform: scale() | 0, 50, 75, 90, 95, 100, 105, 110, 125, 150 |
| `scale-x-{n}` | transform: scaleX() | same |
| `scale-y-{n}` | transform: scaleY() | same |
| `rotate-{n}` | transform: rotate() | 0, 1, 2, 3, 6, 12, 45, 90, 180 |
| `translate-x-{value}` | transform: translateX() | spacing scale + percentages |
| `translate-y-{value}` | transform: translateY() | same |
| `skew-x-{n}` | transform: skewX() | 0, 1, 2, 3, 6, 12 |
| `skew-y-{n}` | transform: skewY() | same |
| `origin-{value}` | transform-origin | center, top, top-right, right, bottom-right, bottom, bottom-left, left, top-left |

### 4.12 Transition & Animation Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `transition` | transition-property | default (colors, bg, border, shadow, etc.) |
| `transition-none` | transition-property | none |
| `transition-all` | transition-property | all |
| `transition-colors` | transition-property | color, background-color, border-color, etc. |
| `transition-opacity` | transition-property | opacity |
| `transition-shadow` | transition-property | box-shadow |
| `transition-transform` | transition-property | transform |
| `duration-{n}` | transition-duration | 0, 75, 100, 150, 200, 300, 500, 700, 1000 |
| `ease-{value}` | transition-timing-function | linear, in, out, in-out |
| `delay-{n}` | transition-delay | same as duration |
| `animate-none` | animation | none |
| `animate-spin` | animation | spin 1s linear infinite |
| `animate-ping` | animation | ping 1s cubic-bezier(0, 0, 0.2, 1) infinite |
| `animate-pulse` | animation | pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite |
| `animate-bounce` | animation | bounce 1s infinite |
| `will-change-{value}` | will-change | auto, scroll, contents, transform |

### 4.13 Interactivity Utilities

| Pattern | CSS Property | Values |
|---------|--------------|--------|
| `accent-{color}` | accent-color | color scale |
| `accent-auto` | accent-color | auto |
| `appearance-none` | appearance | none |
| `appearance-auto` | appearance | auto |
| `cursor-{value}` | cursor | auto, default, pointer, wait, text, move, help, not-allowed, none, context-menu, progress, cell, crosshair, vertical-text, alias, copy, no-drop, grab, grabbing, all-scroll, col-resize, row-resize, n-resize, e-resize, s-resize, w-resize, ne-resize, nw-resize, se-resize, sw-resize, ew-resize, ns-resize, nesw-resize, nwse-resize, zoom-in, zoom-out |
| `pointer-events-none` | pointer-events | none |
| `pointer-events-auto` | pointer-events | auto |
| `resize` | resize | both |
| `resize-{value}` | resize | none, y, x |
| `scroll-auto` | scroll-behavior | auto |
| `scroll-smooth` | scroll-behavior | smooth |
| `scroll-m-{value}` | scroll-margin | spacing scale |
| `scroll-p-{value}` | scroll-padding | spacing scale |
| `snap-{type}` | scroll-snap-type | none, x, y, both |
| `snap-{strictness}` | scroll-snap-type | mandatory, proximity |
| `snap-{align}` | scroll-snap-align | start, end, center, align-none |
| `snap-{stop}` | scroll-snap-stop | normal, always |
| `touch-{value}` | touch-action | auto, none, pan-x, pan-left, pan-right, pan-y, pan-up, pan-down, pinch-zoom, manipulation |
| `select-{value}` | user-select | none, text, all, auto |

---

## 5. Variants Specification

### 5.1 Pseudo-class Variants

| Variant | Selector |
|---------|----------|
| `hover` | `:hover` |
| `focus` | `:focus` |
| `focus-within` | `:focus-within` |
| `focus-visible` | `:focus-visible` |
| `active` | `:active` |
| `visited` | `:visited` |
| `target` | `:target` |
| `first` | `:first-child` |
| `last` | `:last-child` |
| `only` | `:only-child` |
| `odd` | `:nth-child(odd)` |
| `even` | `:nth-child(even)` |
| `first-of-type` | `:first-of-type` |
| `last-of-type` | `:last-of-type` |
| `only-of-type` | `:only-of-type` |
| `empty` | `:empty` |
| `disabled` | `:disabled` |
| `enabled` | `:enabled` |
| `checked` | `:checked` |
| `indeterminate` | `:indeterminate` |
| `default` | `:default` |
| `required` | `:required` |
| `valid` | `:valid` |
| `invalid` | `:invalid` |
| `in-range` | `:in-range` |
| `out-of-range` | `:out-of-range` |
| `placeholder-shown` | `:placeholder-shown` |
| `autofill` | `:autofill` |
| `read-only` | `:read-only` |

### 5.2 Pseudo-element Variants

| Variant | Selector |
|---------|----------|
| `before` | `::before` |
| `after` | `::after` |
| `first-letter` | `::first-letter` |
| `first-line` | `::first-line` |
| `marker` | `::marker` |
| `selection` | `::selection` |
| `file` | `::file-selector-button` |
| `backdrop` | `::backdrop` |
| `placeholder` | `::placeholder` |

### 5.3 Responsive Variants

| Variant | Media Query |
|---------|-------------|
| `sm` | `@media (min-width: 640px)` |
| `md` | `@media (min-width: 768px)` |
| `lg` | `@media (min-width: 1024px)` |
| `xl` | `@media (min-width: 1280px)` |
| `2xl` | `@media (min-width: 1536px)` |
| `max-sm` | `@media (max-width: 639px)` |
| `max-md` | `@media (max-width: 767px)` |
| `max-lg` | `@media (max-width: 1023px)` |
| `max-xl` | `@media (max-width: 1279px)` |
| `max-2xl` | `@media (max-width: 1535px)` |

### 5.4 Theme Variants

| Variant | Selector/Media |
|---------|----------------|
| `dark` | `.dark &` or `@media (prefers-color-scheme: dark)` |
| `light` | `.light &` or `@media (prefers-color-scheme: light)` |

### 5.5 Motion Variants

| Variant | Media Query |
|---------|-------------|
| `motion-safe` | `@media (prefers-reduced-motion: no-preference)` |
| `motion-reduce` | `@media (prefers-reduced-motion: reduce)` |

### 5.6 Print Variant

| Variant | Media Query |
|---------|-------------|
| `print` | `@media print` |

### 5.7 Container Query Variants

| Variant | Container Query |
|---------|-----------------|
| `@sm` | `@container (min-width: 20rem)` |
| `@md` | `@container (min-width: 28rem)` |
| `@lg` | `@container (min-width: 32rem)` |
| `@xl` | `@container (min-width: 36rem)` |
| `@2xl` | `@container (min-width: 42rem)` |
| `@3xl` | `@container (min-width: 48rem)` |
| `@4xl` | `@container (min-width: 56rem)` |
| `@5xl` | `@container (min-width: 64rem)` |
| `@6xl` | `@container (min-width: 72rem)` |
| `@7xl` | `@container (min-width: 80rem)` |

### 5.8 Direction Variants

| Variant | Selector |
|---------|----------|
| `rtl` | `[dir="rtl"] &` |
| `ltr` | `[dir="ltr"] &` |

### 5.9 Group & Peer Variants

| Variant | Selector |
|---------|----------|
| `group-hover` | `.group:hover &` |
| `group-focus` | `.group:focus &` |
| `group-active` | `.group:active &` |
| `group-{state}` | `.group:{state} &` |
| `peer-hover` | `.peer:hover ~ &` |
| `peer-focus` | `.peer:focus ~ &` |
| `peer-checked` | `.peer:checked ~ &` |
| `peer-{state}` | `.peer:{state} ~ &` |

### 5.10 ARIA Variants

| Variant | Selector |
|---------|----------|
| `aria-checked` | `&[aria-checked="true"]` |
| `aria-disabled` | `&[aria-disabled="true"]` |
| `aria-expanded` | `&[aria-expanded="true"]` |
| `aria-hidden` | `&[aria-hidden="true"]` |
| `aria-pressed` | `&[aria-pressed="true"]` |
| `aria-readonly` | `&[aria-readonly="true"]` |
| `aria-required` | `&[aria-required="true"]` |
| `aria-selected` | `&[aria-selected="true"]` |

### 5.11 Data Attribute Variants

| Variant | Selector |
|---------|----------|
| `data-[state=open]` | `&[data-state="open"]` |
| `data-[active]` | `&[data-active]` |

### 5.12 Has Variants

| Variant | Selector |
|---------|----------|
| `has-[img]` | `&:has(img)` |
| `has-[>img]` | `&:has(> img)` |
| `has-[:checked]` | `&:has(:checked)` |
| `group-has-[img]` | `.group:has(img) &` |
| `peer-has-[:checked]` | `.peer:has(:checked) ~ &` |

---

## 6. Modern CSS Features Specification

### 6.1 Anchor Positioning

| Utility | CSS Output |
|---------|------------|
| `anchor-[name]` | `anchor-name: --name` |
| `anchor-none` | `anchor-name: none` |
| `anchored-[name]` | `position-anchor: --name` |
| `anchor-top` | `position-area: top` |
| `anchor-top-left` | `position-area: top left` |
| `anchor-top-right` | `position-area: top right` |
| `anchor-bottom` | `position-area: bottom` |
| `anchor-bottom-left` | `position-area: bottom left` |
| `anchor-bottom-right` | `position-area: bottom right` |
| `anchor-left` | `position-area: left` |
| `anchor-right` | `position-area: right` |
| `anchor-center` | `position-area: center` |
| `position-try-[flip-block]` | `position-try-fallbacks: flip-block` |
| `position-try-[flip-inline]` | `position-try-fallbacks: flip-inline` |

### 6.2 Container Queries

| Utility | CSS Output |
|---------|------------|
| `@container` | `container-type: inline-size` |
| `@container/[name]` | `container-type: inline-size; container-name: name` |
| `@container-normal` | `container-type: normal` |

### 6.3 Scroll-Driven Animations

| Utility | CSS Output |
|---------|------------|
| `view-timeline-[name]` | `view-timeline-name: --name` |
| `view-timeline-x` | `view-timeline-axis: x` |
| `view-timeline-y` | `view-timeline-axis: y` |
| `view-timeline-block` | `view-timeline-axis: block` |
| `view-timeline-inline` | `view-timeline-axis: inline` |
| `scroll-timeline-[name]` | `scroll-timeline-name: --name` |
| `animate-scroll` | `animation-timeline: scroll()` |
| `animate-view` | `animation-timeline: view()` |
| `animate-timeline-[name]` | `animation-timeline: --name` |
| `animate-range-cover` | `animation-range: cover` |
| `animate-range-contain` | `animation-range: contain` |
| `animate-range-entry` | `animation-range: entry` |
| `animate-range-exit` | `animation-range: exit` |
| `scroll-fade-in` | Preset scroll animation |
| `scroll-fade-out` | Preset scroll animation |
| `scroll-slide-up` | Preset scroll animation |
| `scroll-slide-down` | Preset scroll animation |
| `scroll-scale-in` | Preset scroll animation |
| `scroll-reveal` | Preset scroll animation |

### 6.4 View Transitions

| Utility | CSS Output |
|---------|------------|
| `view-transition-[name]` | `view-transition-name: name` |
| `view-transition-none` | `view-transition-name: none` |
| `vt-fade` | Preset view transition |
| `vt-slide-left` | Preset view transition |
| `vt-slide-right` | Preset view transition |
| `vt-slide-up` | Preset view transition |
| `vt-slide-down` | Preset view transition |
| `vt-scale` | Preset view transition |

### 6.5 Logical Properties

| Utility | CSS Property |
|---------|--------------|
| `ms-{value}` | margin-inline-start |
| `me-{value}` | margin-inline-end |
| `mbs-{value}` | margin-block-start |
| `mbe-{value}` | margin-block-end |
| `ps-{value}` | padding-inline-start |
| `pe-{value}` | padding-inline-end |
| `pbs-{value}` | padding-block-start |
| `pbe-{value}` | padding-block-end |
| `inline-size-{value}` | inline-size |
| `block-size-{value}` | block-size |
| `min-inline-size-{value}` | min-inline-size |
| `max-inline-size-{value}` | max-inline-size |
| `min-block-size-{value}` | min-block-size |
| `max-block-size-{value}` | max-block-size |
| `border-s-{value}` | border-inline-start |
| `border-e-{value}` | border-inline-end |
| `rounded-ss-{value}` | border-start-start-radius |
| `rounded-se-{value}` | border-start-end-radius |
| `rounded-es-{value}` | border-end-start-radius |
| `rounded-ee-{value}` | border-end-end-radius |

### 6.6 Subgrid

| Utility | CSS Output |
|---------|------------|
| `grid-cols-subgrid` | `grid-template-columns: subgrid` |
| `grid-rows-subgrid` | `grid-template-rows: subgrid` |

### 6.7 Color Functions

| Pattern | CSS Output |
|---------|------------|
| `bg-[color-mix(in_oklch,red,blue)]` | `background-color: color-mix(in oklch, red, blue)` |
| `bg-[light-dark(white,#1a1a1a)]` | `background-color: light-dark(white, #1a1a1a)` |
| `bg-[oklch(70%_0.15_250)]` | `background-color: oklch(70% 0.15 250)` |

### 6.8 Popover API

| Utility | CSS Output |
|---------|------------|
| `popover-open` | `&:popover-open` variant |

---

## 7. Variant Groups Specification

Unique to CoralCSS - group multiple utilities under one variant:

```html
<!-- Standard syntax -->
<div class="hover:bg-red-500 hover:text-white hover:scale-105">

<!-- Variant group syntax -->
<div class="hover:(bg-red-500 text-white scale-105)">
```

### 7.1 Parsing Rules

1. Match pattern: `{variant}:({utilities})`
2. Split utilities by whitespace
3. Expand to: `{variant}:{utility1} {variant}:{utility2} ...`
4. Nested variant groups supported: `dark:hover:(bg-gray-800 text-white)`

### 7.2 Implementation

```typescript
function expandVariantGroups(input: string): string {
  // Pattern: variant:(utility1 utility2 ...)
  const pattern = /(\S+?):\(([^)]+)\)/g
  return input.replace(pattern, (_, variant, utilities) => {
    return utilities
      .trim()
      .split(/\s+/)
      .map(u => `${variant}:${u}`)
      .join(' ')
  })
}
```

---

## 8. Attributify Mode Specification

Alternative syntax using HTML attributes:

```html
<!-- Traditional -->
<button class="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2">

<!-- Attributify -->
<button
  bg="coral-500 hover:coral-600"
  text="white"
  p="x-4 y-2"
>
```

### 8.1 Supported Attributes

| Attribute | Maps to |
|-----------|---------|
| `p` | padding |
| `m` | margin |
| `w` | width |
| `h` | height |
| `size` | width + height |
| `bg` | background |
| `text` | color/font-size |
| `border` | border |
| `ring` | ring |
| `shadow` | shadow |
| `font` | font |
| `leading` | line-height |
| `tracking` | letter-spacing |
| `flex` | flex |
| `grid` | grid |
| `gap` | gap |
| `pos` | position |
| `inset` | inset |
| `z` | z-index |
| `opacity` | opacity |
| `blur` | blur |
| `rounded` | border-radius |
| `transition` | transition |
| `duration` | duration |
| `ease` | timing-function |
| `delay` | delay |
| `scale` | scale |
| `rotate` | rotate |
| `translate` | translate |

### 8.2 Extraction

```typescript
function extractAttributify(html: string): string[] {
  const classes: string[] = []
  const attrPattern = /(\w+)="([^"]+)"/g

  for (const match of html.matchAll(attrPattern)) {
    const [, attr, values] = match
    if (attributifyGroups[attr]) {
      for (const value of values.split(/\s+/)) {
        classes.push(`${attr}-${value}`)
      }
    }
  }

  return classes
}
```

---

## 9. Headless Components Specification

### 9.1 Base Component Interface

```typescript
interface HeadlessComponent<TElement extends HTMLElement> {
  readonly id: string
  readonly element: TElement | null
  readonly state: ComponentState
  mount(container: HTMLElement | string): void
  unmount(): void
  update(props: Partial<ComponentProps>): void
  subscribe(listener: StateListener): () => void
  destroy(): void
}
```

### 9.2 Components

| Component | Data Attributes | Features |
|-----------|-----------------|----------|
| Dialog | `data-coral-dialog`, `data-coral-dialog-trigger`, `data-coral-dialog-content`, `data-coral-dialog-close`, `data-coral-dialog-title`, `data-coral-dialog-description` | Focus trap, escape close, click outside close, scroll lock, ARIA |
| Dropdown | `data-coral-dropdown`, `data-coral-dropdown-trigger`, `data-coral-dropdown-content`, `data-coral-dropdown-item`, `data-coral-dropdown-separator` | Anchor positioning, keyboard nav, typeahead, ARIA |
| Tabs | `data-coral-tabs`, `data-coral-tabs-list`, `data-coral-tab`, `data-coral-tab-panel` | Auto/manual activation, keyboard nav, ARIA |
| Accordion | `data-coral-accordion`, `data-coral-accordion-item`, `data-coral-accordion-trigger`, `data-coral-accordion-content` | Single/multiple mode, collapsible, ARIA |
| Tooltip | `data-coral-tooltip`, `data-coral-tooltip-trigger` | Anchor positioning, delay, ARIA |
| Popover | `data-coral-popover`, `data-coral-popover-trigger`, `data-coral-popover-content` | Native Popover API, anchor positioning |
| Toast | Programmatic | Position, duration, types, queue |
| Switch | `data-coral-switch` | Toggle, ARIA |
| Select | `data-coral-select`, `data-coral-select-trigger`, `data-coral-select-content`, `data-coral-select-option` | Keyboard nav, typeahead, ARIA |
| Combobox | `data-coral-combobox`, `data-coral-combobox-input`, `data-coral-combobox-content`, `data-coral-combobox-option` | Autocomplete, filtering, ARIA |
| Menu | `data-coral-menu`, `data-coral-menu-trigger`, `data-coral-menu-item` | Submenus, keyboard nav |
| Slider | `data-coral-slider`, `data-coral-slider-track`, `data-coral-slider-thumb` | Range, step, ARIA |
| Progress | `data-coral-progress` | Determinate/indeterminate, ARIA |
| Sheet | `data-coral-sheet`, `data-coral-sheet-trigger`, `data-coral-sheet-content` | Slide from edge, focus trap |

---

## 10. Plugin Specification

### 10.1 Core Plugins

| Plugin | Purpose |
|--------|---------|
| `@coral-css/core/utilities` | All utility class rules |
| `@coral-css/core/variants` | All variant processors |
| `@coral-css/core/modern` | Modern CSS features |
| `@coral-css/core/theming` | Theme system |

### 10.2 Optional Plugins

| Plugin | Purpose |
|--------|---------|
| `icons` | Iconify icon support: `i-lucide-home` |
| `typography` | Prose styling: `prose prose-lg` |
| `forms` | Form element styling |
| `animations` | Extended animation library |
| `attributify` | Attributify mode support |
| `components` | Component base classes |

### 10.3 Presets

| Preset | Includes |
|--------|----------|
| `presetCoral()` | Core utilities, variants, modern CSS, theming |
| `presetWind()` | Tailwind-compatible utilities and variants |
| `presetMini()` | Minimal utilities only |
| `presetFull()` | All plugins and features |

---

## 11. Integration Specification

### 11.1 Vite Plugin

```typescript
// vite.config.ts
import coral from '@coral-css/core/vite'

export default {
  plugins: [
    coral({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      presets: [presetCoral()],
      theme: { /* custom theme */ }
    })
  ]
}
```

### 11.2 PostCSS Plugin

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@coral-css/core/postcss': {
      content: ['./src/**/*.html']
    }
  }
}
```

### 11.3 CLI

```bash
# Build
npx coralcss build --input ./src --output ./dist/coral.css

# Watch
npx coralcss watch --input ./src --output ./dist/coral.css

# Init config
npx coralcss init
```

### 11.4 Runtime/CDN

```html
<script src="https://cdn.coralcss.com/coral.min.js"></script>
<script>
  Coral.configure({
    theme: { colors: { brand: '#FF6B6B' } }
  })
</script>
```

---

## 12. Testing Requirements

### 12.1 Coverage Requirements

- Lines: 100%
- Branches: 100%
- Functions: 100%
- Statements: 100%

### 12.2 Test Categories

| Category | Tool | Scope |
|----------|------|-------|
| Unit | Vitest | Kernel, generator, parser, plugins |
| Integration | Vitest | Vite plugin, PostCSS plugin, CLI |
| E2E | Playwright | Runtime mode, components in browser |

---

## 13. Documentation Requirements

### 13.1 Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation, LLM-optimized |
| `llms.txt` | LLM reference (< 2000 tokens) |
| `CHANGELOG.md` | Version history |
| `LICENSE` | MIT license |

### 13.2 JSDoc Requirements

- Every public API must have JSDoc
- Every JSDoc must have `@example`
- Examples must be runnable

### 13.3 Examples

Minimum 20 examples covering:
- Basic usage (CDN, Vite, PostCSS)
- Utility categories
- Variant usage
- Modern CSS features
- Components
- Theming
- Plugins
- Framework integrations
- Real-world applications

---

## 14. Quality Requirements

### 14.1 Performance

- Class generation: < 1ms per class
- Full HTML extraction: < 100ms for 10K classes
- Runtime injection: < 16ms per batch

### 14.2 Compatibility

- No polyfills required for target browsers
- Graceful degradation for older browsers
- Feature detection for modern CSS

### 14.3 Accessibility

- All components WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management

---

## Document Version

| Version | Date | Author |
|---------|------|--------|
| 1.0.0 | 2025-01-08 | Claude (AI Assistant) |
