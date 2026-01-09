# CoralCSS Implementation Guide

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Code                             │
│    import { createCoral, presetCoral } from '@coral-css/core' │
├─────────────────────────────────────────────────────────────┤
│                     Public API Layer                         │
│      createCoral() · generate() · use() · theme()           │
├─────────────────────────────────────────────────────────────┤
│                     Plugin Registry                          │
│        register() · unregister() · list() · get()           │
├────────────┬────────────┬────────────┬──────────────────────┤
│   CORE     │   CORE     │  OPTIONAL  │     COMMUNITY        │
│  Plugins   │  Plugins   │  Plugins   │      Plugins         │
│ utilities  │  variants  │   icons    │                      │
│  theming   │   modern   │  forms     │                      │
├────────────┴────────────┴────────────┴──────────────────────┤
│                      Micro Kernel                            │
│   Rule Engine · CSS Generator · Variant Processor            │
│   Class Extractor · Cache · Event System                     │
├─────────────────────────────────────────────────────────────┤
│                    Core Utilities                            │
│   Parser · Matcher · Transformer · CSS Utils · Color Utils   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Core Principles

1. **Single Responsibility**: Each module does one thing well
2. **Dependency Injection**: No hard dependencies between modules
3. **Plugin Architecture**: All features implemented as plugins
4. **Immutability**: Config and state are immutable after creation
5. **Lazy Evaluation**: CSS generated on-demand, not upfront

### 1.3 Data Flow

```
Input (class names or HTML)
         │
         ▼
┌─────────────────┐
│   Extractor     │  ← Extracts class names from HTML
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Parser        │  ← Parses class into variant + utility
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Cache Check   │  ← Returns cached CSS if available
└────────┬────────┘
         │ (cache miss)
         ▼
┌─────────────────┐
│   Matcher       │  ← Finds matching rule for utility
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Generator     │  ← Generates CSS properties
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Variant       │  ← Applies variant transformations
│   Processor     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Transformer   │  ← Transforms to final CSS string
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Cache Store   │  ← Stores in cache for next time
└────────┬────────┘
         │
         ▼
     CSS Output
```

---

## 2. Module Design

### 2.1 Kernel (src/kernel.ts)

The kernel is the central coordinator. It's minimal and only handles:

```typescript
// Kernel responsibilities:
// 1. Plugin lifecycle management
// 2. Rule registration and lookup
// 3. Variant registration and lookup
// 4. Theme management
// 5. Event dispatching
// 6. CSS generation coordination

interface KernelState {
  readonly plugins: Map<string, Plugin>
  readonly rules: Map<string, Rule>
  readonly variants: Map<string, Variant>
  readonly theme: Theme
  readonly config: ResolvedConfig
  readonly cache: CSSCache
}

class Kernel {
  private state: KernelState
  private eventEmitter: EventEmitter

  use(plugin: Plugin): this
  unregister(name: string): boolean
  generate(classes: string[]): string
  generateFromHTML(html: string): string
  getRules(): Rule[]
  getVariants(): Variant[]
  reset(): void
}
```

**Design Decisions:**
- State is private and immutable from outside
- Plugins are sorted by priority on registration
- Rules and variants are stored in Maps for O(1) lookup by name
- Event system allows plugins to react to lifecycle events

### 2.2 Generator (src/core/generator.ts)

Generates CSS from matched rules:

```typescript
interface Generator {
  // Generate CSS for a single class
  generateClass(className: string, rule: Rule, match: RegExpMatchArray): GeneratedCSS

  // Generate CSS for multiple classes
  generateClasses(classes: ParsedClass[]): string

  // Apply variants to generated CSS
  applyVariants(css: GeneratedCSS, variants: string[]): string
}

interface GeneratedCSS {
  selector: string
  properties: CSSProperties
  layer: 'base' | 'components' | 'utilities'
  priority: number
}
```

**Design Decisions:**
- Returns structured CSS object, not string (for manipulation)
- Layer determines output order (base → components → utilities)
- Priority within layer for specificity ordering
- Selector escaping handled here (special chars in class names)

### 2.3 Parser (src/core/parser.ts)

Parses class names into structured format:

```typescript
interface Parser {
  // Parse a single class name
  parse(className: string): ParsedClass

  // Parse variant groups: hover:(bg-red text-white)
  expandVariantGroups(input: string): string[]

  // Check if class has negative prefix
  isNegative(className: string): boolean
}

interface ParsedClass {
  original: string           // Original input
  variants: string[]         // ['hover', 'dark', 'md']
  utility: string            // 'bg-red-500'
  negative: boolean          // -translate-x-4 → true
  arbitrary: string | null   // '[color:red]' → 'color:red'
}
```

**Design Decisions:**
- Variants parsed left-to-right: `hover:dark:md:bg-red`
- Variant groups expanded before parsing
- Arbitrary values detected by `[...]` pattern
- Negative prefix (`-`) handled separately from utility

### 2.4 Matcher (src/core/matcher.ts)

Matches utility names against registered rules:

```typescript
interface Matcher {
  // Find matching rule for utility
  match(utility: string): MatchResult | null

  // Register a rule
  addRule(rule: Rule): void

  // Remove a rule
  removeRule(name: string): boolean

  // Get all rules
  getRules(): Rule[]
}

interface MatchResult {
  rule: Rule
  match: RegExpMatchArray
}
```

**Design Decisions:**
- Rules tested in priority order (highest first)
- First match wins (no ambiguity)
- String patterns converted to RegExp on registration
- Patterns anchored (^...$) automatically

### 2.5 Transformer (src/core/transformer.ts)

Transforms CSS objects to CSS strings:

```typescript
interface Transformer {
  // Transform to CSS string
  transform(css: GeneratedCSS[]): string

  // Sort by layer and priority
  sort(css: GeneratedCSS[]): GeneratedCSS[]

  // Format CSS (minify or pretty)
  format(css: string, options: FormatOptions): string
}
```

**Design Decisions:**
- Output uses CSS nesting syntax when appropriate
- Layer order: base → components → utilities
- Within layer: sorted by priority
- Minification optional (for production)

### 2.6 Cache (src/core/cache.ts)

Caches generated CSS for performance:

```typescript
interface CSSCache {
  // Get cached CSS for class
  get(className: string): string | undefined

  // Store CSS for class
  set(className: string, css: string): void

  // Check if class is cached
  has(className: string): boolean

  // Clear all cache
  clear(): void

  // Get cache stats
  stats(): CacheStats
}

interface CacheStats {
  hits: number
  misses: number
  size: number
}
```

**Design Decisions:**
- Simple Map-based cache (no eviction in v1)
- Cache key is full class name (with variants)
- Cache invalidated on theme change
- Stats useful for debugging

### 2.7 Extractor (src/core/extractor.ts)

Extracts class names from content:

```typescript
interface Extractor {
  // Extract classes from HTML
  extractFromHTML(html: string): string[]

  // Extract from any content (JS, JSX, etc.)
  extract(content: string): string[]

  // Extract attributify syntax
  extractAttributify(html: string): string[]
}
```

**Design Decisions:**
- Regex-based extraction (no HTML parser needed)
- Handles template literals: `class=${condition ? 'a' : 'b'}`
- Handles JSX: `className="..."` and `className={...}`
- Deduplicates results

---

## 3. Plugin System Design

### 3.1 Plugin Interface

```typescript
interface Plugin {
  // Required
  name: string              // Unique identifier
  version: string           // Semver
  install: (api: PluginAPI) => void

  // Optional
  dependencies?: string[]   // Other plugin names
  priority?: number         // Higher = runs first (default: 0)
  onReady?: () => void | Promise<void>
  onDestroy?: () => void | Promise<void>
  onError?: (error: Error) => void
}
```

### 3.2 Plugin API

```typescript
interface PluginAPI {
  // Rule management
  addRule(rule: Rule): void
  addRules(rules: Rule[]): void

  // Variant management
  addVariant(variant: Variant): void
  addVariants(variants: Variant[]): void

  // Theme management
  extendTheme(theme: DeepPartial<Theme>): void
  theme<T>(path: string, fallback?: T): T

  // Component management
  addComponent(component: Component): void

  // Event system
  on(event: KernelEvent, handler: EventHandler): () => void

  // Config access
  getConfig(): ResolvedConfig
}
```

### 3.3 Plugin Lifecycle

```
1. Registration (use())
   │
   ├─ Check dependencies
   ├─ Sort by priority
   └─ Store in registry
         │
2. Installation (install())
   │
   ├─ Create PluginAPI
   ├─ Call plugin.install(api)
   └─ Collect rules/variants
         │
3. Ready (onReady())
   │
   ├─ Called after ALL plugins installed
   └─ Safe to access other plugins
         │
4. Active (running)
   │
   └─ Handles CSS generation
         │
5. Destruction (unregister())
   │
   ├─ Call plugin.onDestroy()
   ├─ Remove rules/variants
   └─ Remove from registry
```

### 3.4 Core Plugins Structure

```
plugins/core/
├── utilities/
│   ├── spacing.ts      # p-*, m-*, gap-*
│   ├── sizing.ts       # w-*, h-*, size-*
│   ├── colors.ts       # bg-*, text-*, border-*
│   ├── typography.ts   # font-*, text-*, leading-*
│   ├── layout.ts       # flex, grid, position
│   ├── borders.ts      # border-*, rounded-*, ring-*
│   ├── effects.ts      # shadow-*, opacity-*, blur-*
│   ├── transforms.ts   # scale-*, rotate-*, translate-*
│   ├── transitions.ts  # transition-*, duration-*, ease-*
│   └── interactivity.ts # cursor-*, select-*, resize-*
├── variants/
│   ├── pseudo-class.ts # hover, focus, active, etc.
│   ├── pseudo-element.ts # before, after, etc.
│   ├── responsive.ts   # sm, md, lg, xl, 2xl
│   ├── dark.ts         # dark, light
│   ├── motion.ts       # motion-safe, motion-reduce
│   ├── container.ts    # @sm, @md, @lg, etc.
│   ├── group-peer.ts   # group-*, peer-*
│   ├── aria.ts         # aria-*
│   └── data.ts         # data-[...]
├── modern/
│   ├── anchor.ts       # Anchor positioning
│   ├── container-queries.ts
│   ├── has.ts          # :has() selector
│   ├── scroll-driven.ts # Scroll animations
│   ├── view-transitions.ts
│   └── logical.ts      # Logical properties
└── theming/
    ├── index.ts
    └── css-variables.ts
```

---

## 4. Theme System Design

### 4.1 Theme Structure

```typescript
interface Theme {
  // Colors
  colors: {
    [name: string]: string | ColorScale
  }

  // Spacing (used by padding, margin, gap)
  spacing: {
    [key: string]: string  // '4': '1rem'
  }

  // Sizing (extends spacing)
  sizing: {
    [key: string]: string
  }

  // Typography
  fonts: {
    sans: string[]
    serif: string[]
    mono: string[]
  }

  fontSizes: {
    [key: string]: [string, { lineHeight: string }]
  }

  // ... more scales
}
```

### 4.2 Theme Resolution

```typescript
function resolveTheme(
  base: Theme,
  extensions: DeepPartial<Theme>[]
): Theme {
  // Deep merge with last-wins strategy
  return extensions.reduce(
    (merged, ext) => deepMerge(merged, ext),
    base
  )
}
```

### 4.3 CSS Variables Generation

```css
:root {
  /* Colors */
  --coral-50: #fff5f5;
  --coral-500: #ff6b6b;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-4: 1rem;

  /* Typography */
  --font-sans: ui-sans-serif, system-ui, sans-serif;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.dark {
  /* Dark mode overrides */
  --coral-50: #1a0505;
  --coral-500: #ff8585;
}
```

---

## 5. Runtime Mode Design

### 5.1 Architecture

```
Browser Load
     │
     ▼
┌─────────────┐
│  cdn.ts     │  ← Entry point for CDN bundle
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  observer   │  ← MutationObserver for DOM changes
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  extractor  │  ← Extracts classes from elements
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  kernel     │  ← Generates CSS
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  injector   │  ← Injects <style> into <head>
└─────────────┘
```

### 5.2 Observer (src/runtime/observer.ts)

```typescript
interface Observer {
  // Start observing DOM
  start(): void

  // Stop observing
  stop(): void

  // Process a single element
  process(element: Element): void

  // Process entire document
  processAll(): void
}
```

**Design Decisions:**
- Uses MutationObserver for efficiency
- Batches mutations to avoid thrashing
- Debounces style injection (requestAnimationFrame)
- Only observes class and attribute changes

### 5.3 Injector (src/runtime/injector.ts)

```typescript
interface Injector {
  // Inject CSS into document
  inject(css: string): void

  // Update existing CSS
  update(css: string): void

  // Remove injected styles
  remove(): void
}
```

**Design Decisions:**
- Creates single `<style id="coralcss">` element
- Appends new CSS (doesn't replace)
- Uses `insertRule` for better performance
- Falls back to textContent for older browsers

---

## 6. Build Integration Design

### 6.1 Vite Plugin (src/build/vite.ts)

```typescript
interface VitePluginOptions {
  content: string[]
  presets?: Preset[]
  plugins?: Plugin[]
  theme?: DeepPartial<Theme>
}

export default function coralVite(options: VitePluginOptions): VitePlugin {
  return {
    name: 'coralcss',
    enforce: 'pre',

    // Transform virtual CSS import
    resolveId(id) {
      if (id === 'virtual:coralcss') return id
    },

    // Generate CSS on virtual import
    load(id) {
      if (id === 'virtual:coralcss') {
        return generateCSS(options)
      }
    },

    // Watch content files
    configureServer(server) {
      // Hot reload on content change
    }
  }
}
```

### 6.2 PostCSS Plugin (src/build/postcss.ts)

```typescript
export default function coralPostCSS(options: PostCSSOptions): PostCSSPlugin {
  return {
    postcssPlugin: 'coralcss',

    Once(root, { result }) {
      // Find @coral-css directive
      root.walkAtRules('coralcss', (rule) => {
        // Generate and replace
        const css = generateCSS(options)
        rule.replaceWith(css)
      })
    }
  }
}
```

### 6.3 CLI (src/build/cli.ts)

```typescript
// Commands:
// coralcss build --input <dir> --output <file>
// coralcss watch --input <dir> --output <file>
// coralcss init

interface CLIOptions {
  input: string
  output: string
  config?: string
  minify?: boolean
  watch?: boolean
}
```

---

## 7. Headless Components Design

### 7.1 Base Component (src/components/base.ts)

```typescript
abstract class BaseComponent<
  TElement extends HTMLElement,
  TState extends object,
  TProps extends object
> implements HeadlessComponent<TElement> {
  readonly id: string
  protected _element: TElement | null = null
  protected _state: TState
  protected _props: TProps
  private _listeners: Set<StateListener>

  constructor(props: TProps) {
    this.id = generateId()
    this._props = props
    this._state = this.getInitialState()
    this._listeners = new Set()
  }

  // Abstract methods
  protected abstract getInitialState(): TState
  protected abstract render(): void
  protected abstract setupEventListeners(): void
  protected abstract cleanupEventListeners(): void

  // Lifecycle
  mount(container: HTMLElement | string): void
  unmount(): void
  destroy(): void

  // State management
  protected setState(partial: Partial<TState>): void
  subscribe(listener: StateListener): () => void
}
```

### 7.2 Component Pattern

Each component follows this pattern:

1. **Props**: Configuration passed at creation
2. **State**: Internal reactive state
3. **Elements**: DOM element references
4. **Events**: Event handlers
5. **ARIA**: Accessibility attributes

Example (Dialog):

```typescript
interface DialogProps {
  id: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  modal?: boolean
  onOpen?: () => void
  onClose?: () => void
}

interface DialogState {
  isOpen: boolean
}

class Dialog extends BaseComponent<HTMLDivElement, DialogState, DialogProps> {
  private triggerEl: HTMLElement | null = null
  private contentEl: HTMLElement | null = null
  private previousActiveElement: Element | null = null

  protected getInitialState(): DialogState {
    return { isOpen: false }
  }

  open(): void {
    this.setState({ isOpen: true })
    this.previousActiveElement = document.activeElement
    this.trapFocus()
    this.lockScroll()
    this._props.onOpen?.()
  }

  close(): void {
    this.setState({ isOpen: false })
    this.restoreFocus()
    this.unlockScroll()
    this._props.onClose?.()
  }

  // Focus trap implementation
  private trapFocus(): void { /* ... */ }
  private restoreFocus(): void { /* ... */ }

  // Scroll lock
  private lockScroll(): void { /* ... */ }
  private unlockScroll(): void { /* ... */ }
}
```

### 7.3 Data Attribute Discovery

Components are discovered via data attributes:

```typescript
function initComponents(): void {
  // Dialog
  document.querySelectorAll('[data-coral-dialog]').forEach((el) => {
    const id = el.getAttribute('data-coral-dialog')
    Dialog.create({ id })
  })

  // Dropdown
  document.querySelectorAll('[data-coral-dropdown]').forEach((el) => {
    const id = el.getAttribute('data-coral-dropdown')
    Dropdown.create({ id })
  })

  // ... more components
}
```

---

## 8. Error Handling Design

### 8.1 Error Types (src/errors.ts)

```typescript
class CoralError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'CoralError'
  }
}

enum ErrorCode {
  INVALID_CONFIG = 'INVALID_CONFIG',
  PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',
  PLUGIN_DEPENDENCY = 'PLUGIN_DEPENDENCY',
  INVALID_RULE = 'INVALID_RULE',
  INVALID_VARIANT = 'INVALID_VARIANT',
  THEME_ERROR = 'THEME_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  COMPONENT_ERROR = 'COMPONENT_ERROR',
}
```

### 8.2 Error Recovery

- Invalid class names: Silently skip (no crash)
- Plugin errors: Caught, logged, plugin disabled
- Theme errors: Fall back to default values
- Component errors: Fall back to native behavior

---

## 9. Performance Considerations

### 9.1 Caching Strategy

```
Level 1: Rule Pattern Cache
  - Compiled RegExp stored on rule
  - Avoid recompilation

Level 2: Match Cache
  - utility → rule mapping
  - O(1) lookup after first match

Level 3: CSS Cache
  - className → CSS string
  - Invalidated on theme change

Level 4: Full Output Cache
  - Set<className> → full CSS output
  - Used by build tools
```

### 9.2 Lazy Loading

```typescript
// Presets load core plugins only
// Optional plugins loaded on demand

const coral = createCoral({
  presets: [presetCoral()],  // Core only
})

// Later, add icons plugin
import { iconsPlugin } from '@coral-css/core/plugins/icons'
coral.use(iconsPlugin())
```

### 9.3 Tree Shaking

```typescript
// Entry points for tree shaking:

// Main (minimal)
import { createCoral } from '@coral-css/core'

// Presets (pick one)
import { presetCoral } from '@coral-css/core/presets'

// Plugins (pick needed)
import { iconsPlugin } from '@coral-css/core/plugins/icons'

// Components (pick needed)
import { Dialog } from '@coral-css/core/components'
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

```typescript
// Example: parser.test.ts
describe('Parser', () => {
  describe('parse', () => {
    it('parses simple utility', () => {
      expect(parse('bg-red-500')).toEqual({
        original: 'bg-red-500',
        variants: [],
        utility: 'bg-red-500',
        negative: false,
        arbitrary: null,
      })
    })

    it('parses with variants', () => {
      expect(parse('hover:dark:bg-red-500')).toEqual({
        original: 'hover:dark:bg-red-500',
        variants: ['hover', 'dark'],
        utility: 'bg-red-500',
        negative: false,
        arbitrary: null,
      })
    })

    it('parses negative values', () => {
      expect(parse('-translate-x-4')).toEqual({
        original: '-translate-x-4',
        variants: [],
        utility: 'translate-x-4',
        negative: true,
        arbitrary: null,
      })
    })

    it('parses arbitrary values', () => {
      expect(parse('bg-[#ff0000]')).toEqual({
        original: 'bg-[#ff0000]',
        variants: [],
        utility: 'bg-[#ff0000]',
        negative: false,
        arbitrary: '#ff0000',
      })
    })
  })

  describe('expandVariantGroups', () => {
    it('expands single group', () => {
      expect(expandVariantGroups('hover:(bg-red text-white)')).toEqual([
        'hover:bg-red',
        'hover:text-white',
      ])
    })
  })
})
```

### 10.2 Integration Tests

```typescript
// Example: vite.test.ts
describe('Vite Plugin', () => {
  it('generates CSS from content files', async () => {
    const result = await build({
      plugins: [coralVite({ content: ['./fixtures/*.html'] })],
    })

    expect(result.output[0].source).toContain('.bg-red-500')
  })
})
```

### 10.3 E2E Tests

```typescript
// Example: runtime.test.ts (Playwright)
test('runtime mode generates CSS', async ({ page }) => {
  await page.goto('/fixtures/runtime.html')

  // Add element with classes
  await page.evaluate(() => {
    const div = document.createElement('div')
    div.className = 'p-4 bg-coral-500 text-white'
    document.body.appendChild(div)
  })

  // Check CSS was injected
  const style = await page.locator('#coralcss')
  await expect(style).toContainText('.bg-coral-500')
})
```

---

## 11. Security Considerations

### 11.1 Input Validation

- Class names: Sanitized before use in selectors
- Theme values: Type-checked at compile time
- Arbitrary values: Escaped in CSS output
- HTML content: Only class attributes extracted

### 11.2 CSS Injection Prevention

```typescript
// Escape special characters in class names
function escapeSelector(className: string): string {
  return className.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&')
}
```

### 11.3 XSS Prevention

- No `eval()` or `new Function()`
- No innerHTML for CSS injection
- Content-Security-Policy compatible

---

## 12. Browser Compatibility

### 12.1 Feature Detection

```typescript
// Check for modern CSS features
const supportsAnchor = CSS.supports('anchor-name', '--test')
const supportsContainer = CSS.supports('container-type', 'inline-size')
const supportsHas = CSS.supports('selector(:has(*)))')

// Provide fallbacks
if (!supportsAnchor) {
  // Use JavaScript positioning
}
```

### 12.2 Polyfill Strategy

- No polyfills bundled (zero dependencies)
- Document required browser versions
- Graceful degradation for unsupported features

---

## 13. File Organization

```
src/
├── index.ts              # Public API exports
├── kernel.ts             # Core kernel
├── types.ts              # All type definitions
├── errors.ts             # Error classes
├── core/
│   ├── index.ts          # Core exports
│   ├── generator.ts      # CSS generation
│   ├── parser.ts         # Class parsing
│   ├── matcher.ts        # Rule matching
│   ├── transformer.ts    # CSS transformation
│   ├── cache.ts          # Caching layer
│   └── extractor.ts      # Class extraction
├── plugins/
│   ├── index.ts          # Plugin exports
│   ├── core/             # Core plugins
│   └── optional/         # Optional plugins
├── presets/
│   ├── index.ts          # Preset exports
│   ├── coral.ts          # Default preset
│   ├── wind.ts           # Tailwind-compatible
│   ├── mini.ts           # Minimal
│   └── full.ts           # Everything
├── components/
│   ├── index.ts          # Component exports
│   ├── base.ts           # Base class
│   └── [component].ts    # Individual components
├── runtime/
│   ├── index.ts          # Runtime exports
│   ├── observer.ts       # DOM observer
│   ├── injector.ts       # Style injector
│   └── cdn.ts            # CDN bundle entry
├── build/
│   ├── vite.ts           # Vite plugin
│   ├── postcss.ts        # PostCSS plugin
│   └── cli.ts            # CLI tool
├── theme/
│   ├── index.ts          # Theme exports
│   ├── default.ts        # Default values
│   ├── colors.ts         # Color palettes
│   ├── spacing.ts        # Spacing scale
│   ├── typography.ts     # Typography scale
│   └── dark.ts           # Dark mode
└── utils/
    ├── index.ts          # Utility exports
    ├── css.ts            # CSS utilities
    ├── color.ts          # Color utilities
    ├── string.ts         # String utilities
    ├── dom.ts            # DOM utilities
    └── regex.ts          # Regex utilities
```

---

## Document Version

| Version | Date | Author |
|---------|------|--------|
| 1.0.0 | 2025-01-08 | Claude (AI Assistant) |
