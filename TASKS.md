# CoralCSS Task List

This document contains the ordered list of tasks for implementing CoralCSS.
Execute tasks sequentially. Do not skip tasks unless marked as optional.

---

## Phase 1: Project Infrastructure

### Task 1.1: Initialize Package
- [ ] Create `package.json` with all metadata
- [ ] Set name: `@coral-css/core`
- [ ] Set version: `1.0.0`
- [ ] Configure exports for all entry points
- [ ] Add all scripts
- [ ] Add devDependencies only

### Task 1.2: TypeScript Configuration
- [ ] Create `tsconfig.json` with strict mode
- [ ] Enable all strict checks
- [ ] Configure paths and module resolution

### Task 1.3: Build Configuration
- [ ] Create `tsup.config.ts`
- [ ] Configure ESM + CJS + IIFE outputs
- [ ] Configure multiple entry points
- [ ] Enable tree shaking and minification

### Task 1.4: Test Configuration
- [ ] Create `vitest.config.ts`
- [ ] Configure coverage thresholds (100%)
- [ ] Configure test environments

### Task 1.5: Other Config Files
- [ ] Create `.gitignore`
- [ ] Create `.prettierrc`
- [ ] Create `eslint.config.js`
- [ ] Create `playwright.config.ts`

---

## Phase 2: Core Types and Errors

### Task 2.1: Type Definitions
- [ ] Create `src/types.ts`
- [ ] Define `CoralOptions` interface
- [ ] Define `Coral` interface
- [ ] Define `Plugin` interface
- [ ] Define `PluginAPI` interface
- [ ] Define `Rule` interface
- [ ] Define `Variant` interface
- [ ] Define `Theme` interface and all sub-types
- [ ] Define `CSSProperties` type
- [ ] Define component interfaces

### Task 2.2: Error Classes
- [ ] Create `src/errors.ts`
- [ ] Define `CoralError` base class
- [ ] Define `ErrorCode` enum
- [ ] Create error factory functions

---

## Phase 3: Utility Functions

### Task 3.1: String Utilities
- [ ] Create `src/utils/string.ts`
- [ ] Implement `kebabCase()`
- [ ] Implement `camelCase()`
- [ ] Implement `escapeSelector()`
- [ ] Implement `generateId()`

### Task 3.2: CSS Utilities
- [ ] Create `src/utils/css.ts`
- [ ] Implement `formatCSS()`
- [ ] Implement `minifyCSS()`
- [ ] Implement `serializeProperties()`

### Task 3.3: Color Utilities
- [ ] Create `src/utils/color.ts`
- [ ] Implement `parseColor()`
- [ ] Implement `rgbToHex()`
- [ ] Implement `hexToRgb()`
- [ ] Implement `adjustAlpha()`

### Task 3.4: Regex Utilities
- [ ] Create `src/utils/regex.ts`
- [ ] Implement `escapeRegex()`
- [ ] Implement `createPattern()`

### Task 3.5: DOM Utilities (for runtime)
- [ ] Create `src/utils/dom.ts`
- [ ] Implement `querySelector()` wrapper
- [ ] Implement `createElement()`
- [ ] Implement focus management utilities

### Task 3.6: Utility Index
- [ ] Create `src/utils/index.ts`
- [ ] Export all utilities

---

## Phase 4: Core Engine

### Task 4.1: Cache
- [ ] Create `src/core/cache.ts`
- [ ] Implement `CSSCache` class
- [ ] Implement `get()`, `set()`, `has()`, `clear()`
- [ ] Implement `stats()` for debugging
- [ ] Write tests: `tests/unit/cache.test.ts`

### Task 4.2: Parser
- [ ] Create `src/core/parser.ts`
- [ ] Implement `parse()` for class names
- [ ] Handle variant extraction (hover:dark:bg-red)
- [ ] Handle negative prefix (-translate-x-4)
- [ ] Handle arbitrary values (bg-[#ff0000])
- [ ] Implement `expandVariantGroups()` for hover:(a b c)
- [ ] Write tests: `tests/unit/parser.test.ts`

### Task 4.3: Matcher
- [ ] Create `src/core/matcher.ts`
- [ ] Implement `Matcher` class
- [ ] Implement `match()` for finding rules
- [ ] Implement `addRule()` and `removeRule()`
- [ ] Implement priority-based matching
- [ ] Write tests: `tests/unit/matcher.test.ts`

### Task 4.4: Generator
- [ ] Create `src/core/generator.ts`
- [ ] Implement `Generator` class
- [ ] Implement `generateClass()` for single class
- [ ] Implement `generateClasses()` for batch
- [ ] Implement `applyVariants()` for variant wrapping
- [ ] Handle selector escaping
- [ ] Write tests: `tests/unit/generator.test.ts`

### Task 4.5: Transformer
- [ ] Create `src/core/transformer.ts`
- [ ] Implement `Transformer` class
- [ ] Implement `transform()` CSS objects to string
- [ ] Implement `sort()` by layer and priority
- [ ] Implement `format()` with minify option
- [ ] Write tests: `tests/unit/transformer.test.ts`

### Task 4.6: Extractor
- [ ] Create `src/core/extractor.ts`
- [ ] Implement `Extractor` class
- [ ] Implement `extractFromHTML()`
- [ ] Implement `extract()` for generic content
- [ ] Implement `extractAttributify()`
- [ ] Handle template literals and JSX
- [ ] Write tests: `tests/unit/extractor.test.ts`

### Task 4.7: Core Index
- [ ] Create `src/core/index.ts`
- [ ] Export all core modules

---

## Phase 5: Kernel

### Task 5.1: Kernel Implementation
- [ ] Create `src/kernel.ts`
- [ ] Implement `Kernel` class
- [ ] Implement `use()` for plugin registration
- [ ] Implement `unregister()` for plugin removal
- [ ] Implement `generate()` for CSS generation
- [ ] Implement `generateFromHTML()`
- [ ] Implement `getRules()` and `getVariants()`
- [ ] Implement `reset()`
- [ ] Implement event system
- [ ] Write tests: `tests/unit/kernel.test.ts`

### Task 5.2: Plugin API
- [ ] Implement `PluginAPI` in kernel
- [ ] Implement `addRule()` and `addRules()`
- [ ] Implement `addVariant()` and `addVariants()`
- [ ] Implement `extendTheme()`
- [ ] Implement `addComponent()`
- [ ] Implement `theme()` accessor
- [ ] Implement `on()` for events
- [ ] Implement `getConfig()`

### Task 5.3: createCoral Factory
- [ ] Create `src/index.ts`
- [ ] Implement `createCoral()` factory function
- [ ] Handle options merging
- [ ] Handle preset loading
- [ ] Export public API

---

## Phase 6: Theme System

### Task 6.1: Color Palettes
- [ ] Create `src/theme/colors.ts`
- [ ] Define coral brand colors (50-950)
- [ ] Define all neutral palettes (slate, gray, zinc, neutral, stone)
- [ ] Define all color palettes (red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose)
- [ ] Define semantic colors (inherit, current, transparent, black, white)

### Task 6.2: Spacing Scale
- [ ] Create `src/theme/spacing.ts`
- [ ] Define all spacing values (0, px, 0.5-96)

### Task 6.3: Typography Scale
- [ ] Create `src/theme/typography.ts`
- [ ] Define font families (sans, serif, mono)
- [ ] Define font sizes (xs, sm, base, lg, xl, 2xl-9xl)
- [ ] Define font weights (thin-black)
- [ ] Define line heights
- [ ] Define letter spacing

### Task 6.4: Other Scales
- [ ] Define border radius scale
- [ ] Define border width scale
- [ ] Define box shadow scale
- [ ] Define opacity scale
- [ ] Define z-index scale
- [ ] Define transition duration scale
- [ ] Define transition timing scale
- [ ] Define animation scale

### Task 6.5: Screen and Container Config
- [ ] Define breakpoints (sm, md, lg, xl, 2xl)
- [ ] Define container query sizes

### Task 6.6: Default Theme
- [ ] Create `src/theme/default.ts`
- [ ] Combine all scales into default theme

### Task 6.7: Dark Mode
- [ ] Create `src/theme/dark.ts`
- [ ] Implement dark mode color inversions
- [ ] Implement dark mode strategy handling

### Task 6.8: Theme Index
- [ ] Create `src/theme/index.ts`
- [ ] Export theme utilities
- [ ] Implement CSS variable generation
- [ ] Write tests: `tests/unit/theme.test.ts`

---

## Phase 7: Core Plugins - Utilities

### Task 7.1: Spacing Plugin
- [ ] Create `src/plugins/core/utilities/spacing.ts`
- [ ] Implement padding rules (p-*, px-*, py-*, pt-*, pr-*, pb-*, pl-*, ps-*, pe-*)
- [ ] Implement margin rules (m-*, mx-*, my-*, mt-*, mr-*, mb-*, ml-*, ms-*, me-*)
- [ ] Implement gap rules (gap-*, gap-x-*, gap-y-*)
- [ ] Write tests

### Task 7.2: Sizing Plugin
- [ ] Create `src/plugins/core/utilities/sizing.ts`
- [ ] Implement width rules (w-*)
- [ ] Implement height rules (h-*)
- [ ] Implement size rules (size-*)
- [ ] Implement min/max rules
- [ ] Write tests

### Task 7.3: Colors Plugin
- [ ] Create `src/plugins/core/utilities/colors.ts`
- [ ] Implement bg-* rules
- [ ] Implement text-* color rules
- [ ] Implement border-* color rules
- [ ] Implement ring-* rules
- [ ] Implement shadow-* color rules
- [ ] Implement accent-*, fill-*, stroke-*, caret-* rules
- [ ] Implement placeholder-* rules
- [ ] Write tests

### Task 7.4: Typography Plugin
- [ ] Create `src/plugins/core/utilities/typography.ts`
- [ ] Implement font-* rules (family, size, weight)
- [ ] Implement text-* rules (size, align, decoration, transform)
- [ ] Implement leading-* rules
- [ ] Implement tracking-* rules
- [ ] Implement whitespace-*, break-*, hyphens-* rules
- [ ] Write tests

### Task 7.5: Layout Plugin
- [ ] Create `src/plugins/core/utilities/layout.ts`
- [ ] Implement display rules (block, flex, grid, hidden, etc.)
- [ ] Implement position rules (static, fixed, absolute, relative, sticky)
- [ ] Implement inset rules (inset-*, top-*, right-*, bottom-*, left-*)
- [ ] Implement z-index rules
- [ ] Implement float/clear rules
- [ ] Implement overflow rules
- [ ] Implement visibility rules
- [ ] Implement object-fit/position rules
- [ ] Write tests

### Task 7.6: Flexbox Plugin
- [ ] Create `src/plugins/core/utilities/flexbox.ts`
- [ ] Implement flex-direction rules
- [ ] Implement flex-wrap rules
- [ ] Implement flex rules (flex-1, flex-auto, etc.)
- [ ] Implement grow/shrink rules
- [ ] Implement order rules
- [ ] Implement justify-* rules
- [ ] Implement items-* rules
- [ ] Implement content-* rules
- [ ] Implement self-* rules
- [ ] Implement place-* rules
- [ ] Write tests

### Task 7.7: Grid Plugin
- [ ] Create `src/plugins/core/utilities/grid.ts`
- [ ] Implement grid-cols-* rules
- [ ] Implement grid-rows-* rules
- [ ] Implement col-* rules (span, start, end)
- [ ] Implement row-* rules (span, start, end)
- [ ] Implement grid-flow-* rules
- [ ] Implement auto-cols-* rules
- [ ] Implement auto-rows-* rules
- [ ] Implement subgrid rules
- [ ] Write tests

### Task 7.8: Borders Plugin
- [ ] Create `src/plugins/core/utilities/borders.ts`
- [ ] Implement border-* width rules
- [ ] Implement border-* style rules
- [ ] Implement rounded-* rules
- [ ] Implement divide-* rules
- [ ] Implement outline-* rules
- [ ] Implement ring-* rules
- [ ] Write tests

### Task 7.9: Effects Plugin
- [ ] Create `src/plugins/core/utilities/effects.ts`
- [ ] Implement shadow-* rules
- [ ] Implement opacity-* rules
- [ ] Implement mix-blend-* rules
- [ ] Implement bg-blend-* rules
- [ ] Write tests

### Task 7.10: Filters Plugin
- [ ] Create `src/plugins/core/utilities/filters.ts`
- [ ] Implement blur-* rules
- [ ] Implement brightness-* rules
- [ ] Implement contrast-* rules
- [ ] Implement drop-shadow-* rules
- [ ] Implement grayscale-* rules
- [ ] Implement hue-rotate-* rules
- [ ] Implement invert-* rules
- [ ] Implement saturate-* rules
- [ ] Implement sepia-* rules
- [ ] Implement backdrop-* rules
- [ ] Write tests

### Task 7.11: Transforms Plugin
- [ ] Create `src/plugins/core/utilities/transforms.ts`
- [ ] Implement scale-* rules
- [ ] Implement rotate-* rules
- [ ] Implement translate-* rules
- [ ] Implement skew-* rules
- [ ] Implement origin-* rules
- [ ] Write tests

### Task 7.12: Transitions Plugin
- [ ] Create `src/plugins/core/utilities/transitions.ts`
- [ ] Implement transition-* rules
- [ ] Implement duration-* rules
- [ ] Implement ease-* rules
- [ ] Implement delay-* rules
- [ ] Implement animate-* rules
- [ ] Implement will-change-* rules
- [ ] Write tests

### Task 7.13: Interactivity Plugin
- [ ] Create `src/plugins/core/utilities/interactivity.ts`
- [ ] Implement accent-* rules
- [ ] Implement appearance-* rules
- [ ] Implement cursor-* rules
- [ ] Implement pointer-events-* rules
- [ ] Implement resize-* rules
- [ ] Implement scroll-* rules
- [ ] Implement snap-* rules
- [ ] Implement touch-* rules
- [ ] Implement select-* rules
- [ ] Write tests

### Task 7.14: Utilities Plugin Index
- [ ] Create `src/plugins/core/utilities/index.ts`
- [ ] Combine all utility plugins
- [ ] Export as single plugin

---

## Phase 8: Core Plugins - Variants

### Task 8.1: Pseudo-class Variants
- [ ] Create `src/plugins/core/variants/pseudo-class.ts`
- [ ] Implement hover, focus, active, visited, target variants
- [ ] Implement first, last, only, odd, even variants
- [ ] Implement first-of-type, last-of-type, only-of-type variants
- [ ] Implement empty, disabled, enabled, checked variants
- [ ] Implement required, valid, invalid variants
- [ ] Implement placeholder-shown, autofill, read-only variants
- [ ] Write tests

### Task 8.2: Pseudo-element Variants
- [ ] Create `src/plugins/core/variants/pseudo-element.ts`
- [ ] Implement before, after variants
- [ ] Implement first-letter, first-line variants
- [ ] Implement marker, selection variants
- [ ] Implement file, backdrop, placeholder variants
- [ ] Write tests

### Task 8.3: Responsive Variants
- [ ] Create `src/plugins/core/variants/responsive.ts`
- [ ] Implement sm, md, lg, xl, 2xl variants
- [ ] Implement max-sm, max-md, max-lg, max-xl, max-2xl variants
- [ ] Write tests

### Task 8.4: Dark Mode Variants
- [ ] Create `src/plugins/core/variants/dark.ts`
- [ ] Implement dark variant (class strategy)
- [ ] Implement dark variant (media strategy)
- [ ] Implement light variant
- [ ] Write tests

### Task 8.5: Motion Variants
- [ ] Create `src/plugins/core/variants/motion.ts`
- [ ] Implement motion-safe variant
- [ ] Implement motion-reduce variant
- [ ] Write tests

### Task 8.6: Print Variant
- [ ] Create `src/plugins/core/variants/print.ts`
- [ ] Implement print variant
- [ ] Write tests

### Task 8.7: Container Query Variants
- [ ] Create `src/plugins/core/variants/container.ts`
- [ ] Implement @sm, @md, @lg, @xl, @2xl, @3xl, @4xl, @5xl, @6xl, @7xl variants
- [ ] Implement named container variants @[name]/size
- [ ] Write tests

### Task 8.8: Direction Variants
- [ ] Create `src/plugins/core/variants/direction.ts`
- [ ] Implement rtl, ltr variants
- [ ] Write tests

### Task 8.9: Group & Peer Variants
- [ ] Create `src/plugins/core/variants/group-peer.ts`
- [ ] Implement group-* variants (group-hover, group-focus, etc.)
- [ ] Implement peer-* variants (peer-hover, peer-focus, etc.)
- [ ] Write tests

### Task 8.10: ARIA Variants
- [ ] Create `src/plugins/core/variants/aria.ts`
- [ ] Implement aria-checked, aria-disabled, etc. variants
- [ ] Write tests

### Task 8.11: Data Attribute Variants
- [ ] Create `src/plugins/core/variants/data.ts`
- [ ] Implement data-[attr=value] variants
- [ ] Write tests

### Task 8.12: Has Variants
- [ ] Create `src/plugins/core/variants/has.ts`
- [ ] Implement has-[selector] variants
- [ ] Implement group-has-*, peer-has-* variants
- [ ] Write tests

### Task 8.13: Variants Plugin Index
- [ ] Create `src/plugins/core/variants/index.ts`
- [ ] Combine all variant plugins
- [ ] Export as single plugin

---

## Phase 9: Core Plugins - Modern CSS

### Task 9.1: Anchor Positioning
- [ ] Create `src/plugins/core/modern/anchor.ts`
- [ ] Implement anchor-[name] rule
- [ ] Implement anchored-[name] rule
- [ ] Implement anchor-top, anchor-bottom, etc. rules
- [ ] Implement position-try-* rules
- [ ] Write tests

### Task 9.2: Container Queries
- [ ] Create `src/plugins/core/modern/container-queries.ts`
- [ ] Implement @container rule
- [ ] Implement @container/[name] rule
- [ ] Implement container query unit utilities (cqw, cqh, etc.)
- [ ] Write tests

### Task 9.3: Has Selector Utilities
- [ ] Create `src/plugins/core/modern/has.ts`
- [ ] Ensure has-[] variant works with all utilities
- [ ] Write tests

### Task 9.4: Scroll-Driven Animations
- [ ] Create `src/plugins/core/modern/scroll-driven.ts`
- [ ] Implement view-timeline-* rules
- [ ] Implement scroll-timeline-* rules
- [ ] Implement animate-scroll, animate-view rules
- [ ] Implement animate-range-* rules
- [ ] Implement preset scroll animations (scroll-fade-in, etc.)
- [ ] Write tests

### Task 9.5: View Transitions
- [ ] Create `src/plugins/core/modern/view-transitions.ts`
- [ ] Implement view-transition-[name] rule
- [ ] Implement preset view transitions (vt-fade, vt-slide-*, etc.)
- [ ] Write tests

### Task 9.6: Logical Properties
- [ ] Create `src/plugins/core/modern/logical.ts`
- [ ] Implement margin logical (ms-*, me-*, mbs-*, mbe-*)
- [ ] Implement padding logical (ps-*, pe-*, pbs-*, pbe-*)
- [ ] Implement inset logical (start-*, end-*, inset-inline-*, inset-block-*)
- [ ] Implement border logical (border-s-*, border-e-*)
- [ ] Implement border-radius logical (rounded-ss-*, etc.)
- [ ] Implement size logical (inline-size-*, block-size-*)
- [ ] Write tests

### Task 9.7: Color Functions
- [ ] Add support for color-mix() in arbitrary values
- [ ] Add support for light-dark() in arbitrary values
- [ ] Add support for oklch() in arbitrary values
- [ ] Write tests

### Task 9.8: Popover API
- [ ] Create `src/plugins/core/modern/popover.ts`
- [ ] Implement popover-open variant
- [ ] Write tests

### Task 9.9: Modern Plugin Index
- [ ] Create `src/plugins/core/modern/index.ts`
- [ ] Combine all modern CSS plugins
- [ ] Export as single plugin

---

## Phase 10: Core Plugins - Theming

### Task 10.1: Theming Plugin
- [ ] Create `src/plugins/core/theming.ts`
- [ ] Implement CSS variable generation
- [ ] Implement dark mode CSS variable overrides
- [ ] Implement theme extension handling
- [ ] Write tests

### Task 10.2: Plugin Index
- [ ] Create `src/plugins/core/index.ts`
- [ ] Export all core plugins

### Task 10.3: Main Plugin Index
- [ ] Create `src/plugins/index.ts`
- [ ] Export core and optional plugins

---

## Phase 11: Presets

### Task 11.1: Coral Preset
- [ ] Create `src/presets/coral.ts`
- [ ] Include core utilities plugin
- [ ] Include core variants plugin
- [ ] Include modern CSS plugin
- [ ] Include theming plugin
- [ ] Configure default theme
- [ ] Write tests

### Task 11.2: Wind Preset
- [ ] Create `src/presets/wind.ts`
- [ ] Configure for Tailwind compatibility
- [ ] Adjust naming where needed
- [ ] Write tests

### Task 11.3: Mini Preset
- [ ] Create `src/presets/mini.ts`
- [ ] Include only essential utilities
- [ ] Minimize bundle size
- [ ] Write tests

### Task 11.4: Full Preset
- [ ] Create `src/presets/full.ts`
- [ ] Include all plugins
- [ ] Include all features
- [ ] Write tests

### Task 11.5: Preset Index
- [ ] Create `src/presets/index.ts`
- [ ] Export all presets

---

## Phase 12: Optional Plugins

### Task 12.1: Icons Plugin
- [ ] Create `src/plugins/optional/icons.ts`
- [ ] Implement i-{collection}-{icon} rule
- [ ] Support scale, extraProperties options
- [ ] Write tests

### Task 12.2: Typography Plugin
- [ ] Create `src/plugins/optional/typography.ts`
- [ ] Implement prose class
- [ ] Implement prose-sm, prose-lg, etc.
- [ ] Implement prose-invert
- [ ] Write tests

### Task 12.3: Forms Plugin
- [ ] Create `src/plugins/optional/forms.ts`
- [ ] Implement form element base styles
- [ ] Support base and class strategies
- [ ] Write tests

### Task 12.4: Animations Plugin
- [ ] Create `src/plugins/optional/animations.ts`
- [ ] Implement animate-fade-in, animate-fade-out
- [ ] Implement animate-slide-*, animate-bounce-*
- [ ] Implement animate-shake, animate-spin-*, etc.
- [ ] Write tests

### Task 12.5: Attributify Plugin
- [ ] Create `src/plugins/optional/attributify.ts`
- [ ] Implement attribute extraction
- [ ] Support all attribute groups
- [ ] Write tests

### Task 12.6: Components Plugin
- [ ] Create `src/plugins/optional/components.ts`
- [ ] Implement component base classes
- [ ] Write tests

---

## Phase 13: Headless Components

### Task 13.1: Base Component
- [ ] Create `src/components/base.ts`
- [ ] Implement `BaseComponent` abstract class
- [ ] Implement state management
- [ ] Implement event handling
- [ ] Implement lifecycle methods
- [ ] Write tests

### Task 13.2: Dialog Component
- [ ] Create `src/components/dialog.ts`
- [ ] Implement open/close/toggle
- [ ] Implement focus trap
- [ ] Implement scroll lock
- [ ] Implement escape key handling
- [ ] Implement click outside handling
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.3: Dropdown Component
- [ ] Create `src/components/dropdown.ts`
- [ ] Implement open/close/toggle
- [ ] Implement keyboard navigation
- [ ] Implement typeahead search
- [ ] Implement anchor positioning
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.4: Tabs Component
- [ ] Create `src/components/tabs.ts`
- [ ] Implement tab selection
- [ ] Implement keyboard navigation
- [ ] Support auto/manual activation
- [ ] Support vertical/horizontal orientation
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.5: Accordion Component
- [ ] Create `src/components/accordion.ts`
- [ ] Implement expand/collapse/toggle
- [ ] Support single/multiple mode
- [ ] Implement keyboard navigation
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.6: Tooltip Component
- [ ] Create `src/components/tooltip.ts`
- [ ] Implement show/hide
- [ ] Implement delay/hideDelay
- [ ] Implement anchor positioning
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.7: Popover Component
- [ ] Create `src/components/popover.ts`
- [ ] Implement show/hide/toggle
- [ ] Use native Popover API when available
- [ ] Implement anchor positioning
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.8: Toast Component
- [ ] Create `src/components/toast.ts`
- [ ] Implement toast queue system
- [ ] Implement show/success/error/warning/info
- [ ] Implement dismiss/dismissAll
- [ ] Support positions
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.9: Switch Component
- [ ] Create `src/components/switch.ts`
- [ ] Implement toggle/check/uncheck
- [ ] Implement keyboard handling
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.10: Select Component
- [ ] Create `src/components/select.ts`
- [ ] Implement open/close/select
- [ ] Implement keyboard navigation
- [ ] Implement typeahead
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.11: Combobox Component
- [ ] Create `src/components/combobox.ts`
- [ ] Implement open/close/select/filter
- [ ] Implement autocomplete
- [ ] Implement keyboard navigation
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.12: Menu Component
- [ ] Create `src/components/menu.ts`
- [ ] Implement submenu support
- [ ] Implement keyboard navigation
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.13: Slider Component
- [ ] Create `src/components/slider.ts`
- [ ] Implement value management
- [ ] Support range and step
- [ ] Implement keyboard handling
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.14: Progress Component
- [ ] Create `src/components/progress.ts`
- [ ] Support determinate/indeterminate
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.15: Avatar Component
- [ ] Create `src/components/avatar.ts`
- [ ] Implement fallback handling
- [ ] Write tests

### Task 13.16: Badge Component
- [ ] Create `src/components/badge.ts`
- [ ] Implement variants
- [ ] Write tests

### Task 13.17: Sheet Component
- [ ] Create `src/components/sheet.ts`
- [ ] Implement slide from edge
- [ ] Implement focus trap
- [ ] Add ARIA attributes
- [ ] Write tests

### Task 13.18: Component Index
- [ ] Create `src/components/index.ts`
- [ ] Export all components
- [ ] Implement auto-init function

---

## Phase 14: Runtime Mode

### Task 14.1: Observer
- [ ] Create `src/runtime/observer.ts`
- [ ] Implement MutationObserver wrapper
- [ ] Implement class/attribute change detection
- [ ] Implement batching and debouncing
- [ ] Write tests

### Task 14.2: Injector
- [ ] Create `src/runtime/injector.ts`
- [ ] Implement style element creation
- [ ] Implement CSS injection
- [ ] Implement incremental updates
- [ ] Write tests

### Task 14.3: Runtime Index
- [ ] Create `src/runtime/index.ts`
- [ ] Implement runtime mode setup
- [ ] Export runtime utilities

### Task 14.4: CDN Bundle
- [ ] Create `src/runtime/cdn.ts`
- [ ] Implement global Coral object
- [ ] Implement Coral.configure()
- [ ] Auto-initialize on DOMContentLoaded
- [ ] Write tests

---

## Phase 15: Build Integrations

### Task 15.1: Vite Plugin
- [ ] Create `src/build/vite.ts`
- [ ] Implement virtual module handling
- [ ] Implement content file watching
- [ ] Implement HMR support
- [ ] Write tests: `tests/integration/vite.test.ts`

### Task 15.2: PostCSS Plugin
- [ ] Create `src/build/postcss.ts`
- [ ] Implement @coral-css directive handling
- [ ] Implement CSS generation and replacement
- [ ] Write tests: `tests/integration/postcss.test.ts`

### Task 15.3: CLI
- [ ] Create `src/build/cli.ts`
- [ ] Implement `build` command
- [ ] Implement `watch` command
- [ ] Implement `init` command
- [ ] Write tests: `tests/integration/cli.test.ts`

---

## Phase 16: Testing

### Task 16.1: Unit Tests
- [ ] Ensure all unit tests written (from previous tasks)
- [ ] Verify 100% coverage on kernel
- [ ] Verify 100% coverage on core modules
- [ ] Verify 100% coverage on plugins
- [ ] Verify 100% coverage on components

### Task 16.2: Integration Tests
- [ ] Write Vite plugin tests
- [ ] Write PostCSS plugin tests
- [ ] Write CLI tests

### Task 16.3: E2E Tests
- [ ] Create `tests/e2e/runtime.test.ts`
- [ ] Test runtime mode in browser
- [ ] Test class extraction and CSS generation
- [ ] Test component functionality
- [ ] Create `tests/e2e/components.test.ts`
- [ ] Test all component interactions

### Task 16.4: Coverage Verification
- [ ] Run `npm run test:coverage`
- [ ] Verify 100% line coverage
- [ ] Verify 100% branch coverage
- [ ] Verify 100% function coverage
- [ ] Verify 100% statement coverage

---

## Phase 17: Examples

### Task 17.1: Basic Examples
- [ ] Create `examples/01-basic/cdn-usage/`
- [ ] Create `examples/01-basic/vite-project/`
- [ ] Create `examples/01-basic/postcss-project/`

### Task 17.2: Utility Examples
- [ ] Create `examples/02-utilities/spacing/`
- [ ] Create `examples/02-utilities/colors/`
- [ ] Create `examples/02-utilities/typography/`
- [ ] Create `examples/02-utilities/layout/`

### Task 17.3: Variant Examples
- [ ] Create `examples/03-variants/responsive/`
- [ ] Create `examples/03-variants/states/`
- [ ] Create `examples/03-variants/dark-mode/`
- [ ] Create `examples/03-variants/container-queries/`

### Task 17.4: Modern CSS Examples
- [ ] Create `examples/04-modern-css/anchor-positioning/`
- [ ] Create `examples/04-modern-css/has-selector/`
- [ ] Create `examples/04-modern-css/scroll-driven/`
- [ ] Create `examples/04-modern-css/view-transitions/`

### Task 17.5: Component Examples
- [ ] Create `examples/05-components/dialog/`
- [ ] Create `examples/05-components/dropdown/`
- [ ] Create `examples/05-components/tabs/`
- [ ] Create `examples/05-components/toast/`

### Task 17.6: Theming Examples
- [ ] Create `examples/06-theming/custom-theme/`
- [ ] Create `examples/06-theming/dark-mode/`
- [ ] Create `examples/06-theming/multiple-themes/`

### Task 17.7: Plugin Examples
- [ ] Create `examples/07-plugins/icons/`
- [ ] Create `examples/07-plugins/typography/`
- [ ] Create `examples/07-plugins/attributify/`

### Task 17.8: Integration Examples
- [ ] Create `examples/08-integrations/react/`
- [ ] Create `examples/08-integrations/vue/`
- [ ] Create `examples/08-integrations/svelte/`
- [ ] Create `examples/08-integrations/astro/`

### Task 17.9: Real-World Examples
- [ ] Create `examples/09-real-world/landing-page/`
- [ ] Create `examples/09-real-world/dashboard/`
- [ ] Create `examples/09-real-world/e-commerce/`

---

## Phase 18: Documentation

### Task 18.1: README
- [ ] Write comprehensive README.md
- [ ] Include installation instructions
- [ ] Include quick start guide
- [ ] Include API reference
- [ ] Include examples
- [ ] Optimize for LLM consumption

### Task 18.2: llms.txt
- [ ] Create `llms.txt` (< 2000 tokens)
- [ ] Include essential API info
- [ ] Include common patterns
- [ ] Include links

### Task 18.3: Changelog
- [ ] Create `CHANGELOG.md`
- [ ] Document initial release

### Task 18.4: License
- [ ] Create `LICENSE` (MIT)

### Task 18.5: JSDoc Review
- [ ] Verify all public APIs have JSDoc
- [ ] Verify all JSDoc have @example
- [ ] Verify examples are runnable

---

## Phase 19: Website

### Task 19.1: Project Setup
- [ ] Create `website/` directory
- [ ] Initialize React + Vite project
- [ ] Configure CoralCSS
- [ ] Add routing

### Task 19.2: Home Page
- [ ] Create landing page
- [ ] Add hero section
- [ ] Add feature highlights
- [ ] Add code examples

### Task 19.3: Documentation Pages
- [ ] Create getting started guide
- [ ] Create utilities documentation
- [ ] Create variants documentation
- [ ] Create modern CSS documentation
- [ ] Create components documentation
- [ ] Create theming documentation
- [ ] Create plugins documentation

### Task 19.4: Examples Page
- [ ] Create examples browser
- [ ] Link to example repositories

### Task 19.5: Features
- [ ] Add dark/light theme toggle
- [ ] Add mobile responsive design
- [ ] Add search functionality
- [ ] Add copy code buttons

### Task 19.6: Configuration
- [ ] Create `website/public/CNAME` with coralcss.com
- [ ] Copy llms.txt to public folder

---

## Phase 20: GitHub Actions

### Task 20.1: Website Deploy
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure GitHub Pages deployment
- [ ] Run tests before deploy

### Task 20.2: NPM Publish
- [ ] Create `.github/workflows/release.yml`
- [ ] Configure npm publish on tag push
- [ ] Run tests before publish

---

## Phase 21: Final Verification

### Task 21.1: Build Verification
- [ ] Run `npm run build`
- [ ] Verify all output files generated
- [ ] Verify no build errors

### Task 21.2: Type Check
- [ ] Run `npm run typecheck`
- [ ] Verify no type errors

### Task 21.3: Test Coverage
- [ ] Run `npm run test:coverage`
- [ ] Verify 100% coverage achieved

### Task 21.4: E2E Tests
- [ ] Run `npm run test:e2e`
- [ ] Verify all tests pass

### Task 21.5: Bundle Size
- [ ] Check core bundle < 8KB gzipped
- [ ] Check full bundle < 20KB gzipped

### Task 21.6: Website
- [ ] Run `cd website && npm run build`
- [ ] Verify website builds successfully

### Task 21.7: Examples
- [ ] Test all examples work
- [ ] Verify instructions are correct

### Task 21.8: Documentation Review
- [ ] Review README for accuracy
- [ ] Review API documentation
- [ ] Verify all links work

---

## Task Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Infrastructure | 5 | Pending |
| Phase 2: Types & Errors | 2 | Pending |
| Phase 3: Utilities | 6 | Pending |
| Phase 4: Core Engine | 7 | Pending |
| Phase 5: Kernel | 3 | Pending |
| Phase 6: Theme System | 8 | Pending |
| Phase 7: Utility Plugins | 14 | Pending |
| Phase 8: Variant Plugins | 13 | Pending |
| Phase 9: Modern CSS Plugins | 9 | Pending |
| Phase 10: Theming Plugin | 3 | Pending |
| Phase 11: Presets | 5 | Pending |
| Phase 12: Optional Plugins | 6 | Pending |
| Phase 13: Components | 18 | Pending |
| Phase 14: Runtime | 4 | Pending |
| Phase 15: Build Tools | 3 | Pending |
| Phase 16: Testing | 4 | Pending |
| Phase 17: Examples | 9 | Pending |
| Phase 18: Documentation | 5 | Pending |
| Phase 19: Website | 6 | Pending |
| Phase 20: GitHub Actions | 2 | Pending |
| Phase 21: Final Verification | 8 | Pending |
| **Total** | **140** | **Pending** |

---

## Document Version

| Version | Date | Author |
|---------|------|--------|
| 1.0.0 | 2025-01-08 | Claude (AI Assistant) |
