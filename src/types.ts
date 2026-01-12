/**
 * CoralCSS Type Definitions
 *
 * This file contains all type definitions for the CoralCSS framework.
 * @module types
 */

// =============================================================================
// Core Types
// =============================================================================

/**
 * Deep partial type - makes all nested properties optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * CSS property value types
 */
export type CSSValue = string | number

/**
 * CSS properties object
 */
export interface CSSProperties {
  [property: string]: CSSValue | CSSProperties
}

/**
 * CSS layer for organizing output
 */
export type CSSLayer = 'base' | 'components' | 'utilities'

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Dark mode strategy
 */
export type DarkModeStrategy = 'class' | 'media' | 'selector' | 'auto'

/**
 * CoralCSS configuration options
 *
 * @example
 * ```typescript
 * const options: CoralOptions = {
 *   presets: [presetCoral()],
 *   darkMode: 'class',
 *   prefix: 'cc-',
 * }
 * ```
 */
export interface CoralOptions {
  /** Presets to use */
  presets?: Preset[]
  /** Additional plugins */
  plugins?: Plugin[]
  /** Theme configuration */
  theme?: DeepPartial<Theme>
  /** Dark mode strategy */
  darkMode?: DarkModeStrategy
  /** Custom dark mode selector (when darkMode is 'selector') */
  darkModeSelector?: string
  /** Prefix for all generated classes */
  prefix?: string
  /** Enable/disable features */
  features?: {
    /** Enable variant groups: hover:(bg-red text-white) */
    variantGroups?: boolean
    /** Enable attributify mode */
    attributify?: boolean
  }
  /** Content paths for class extraction */
  content?: string[]
  /**
   * Safelist - classes to always include even if not found in content.
   * Supports strings and RegExp patterns.
   * @example
   * ```ts
   * safelist: [
   *   'bg-red-500',
   *   /^text-/,
   *   { pattern: /^bg-/, variants: ['hover', 'dark'] }
   * ]
   * ```
   */
  safelist?: (string | RegExp | {
    pattern: RegExp
    variants?: string[]
  })[]
  /**
   * Blocklist - classes to never generate even if found in content.
   * Supports strings and RegExp patterns.
   * @example
   * ```ts
   * blocklist: ['opacity-0', /^hidden$/]
   * ```
   */
  blocklist?: (string | RegExp)[]
  /**
   * Cache configuration
   * @example
   * ```ts
   * cache: {
   *   maxSize: 500,
   *   ttl: 60000,  // 1 minute
   *   enabled: true
   * }
   * ```
   */
  cache?: CacheOptions
}

/**
 * Resolved configuration after merging defaults and user options
 */
export interface ResolvedConfig {
  readonly presets: Preset[]
  readonly plugins: Plugin[]
  readonly theme: Theme
  readonly darkMode: DarkModeStrategy
  readonly darkModeSelector: string
  readonly prefix: string
  readonly features: {
    readonly variantGroups: boolean
    readonly attributify: boolean
  }
  readonly content: string[]
  readonly safelist: (string | RegExp | { pattern: RegExp; variants?: string[] })[]
  readonly blocklist: (string | RegExp)[]
  readonly cache: Required<CacheOptions>
}

// =============================================================================
// Plugin Types
// =============================================================================

/**
 * Plugin interface for extending CoralCSS functionality.
 *
 * @example
 * ```typescript
 * const myPlugin: Plugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   install(api) {
 *     api.addRule({
 *       name: 'custom',
 *       pattern: /^custom-(\\d+)$/,
 *       generate: (match) => ({ padding: `${match[1]}px` })
 *     })
 *   }
 * }
 * ```
 */
export interface Plugin {
  /** Unique plugin identifier (kebab-case) */
  name: string
  /** Semantic version (e.g., "1.0.0") */
  version: string
  /** Other plugins this plugin depends on */
  dependencies?: string[]
  /** Plugin priority (higher = runs first, default: 0) */
  priority?: number
  /** Called when plugin is registered */
  install: (api: PluginAPI) => void
  /** Called after all plugins are installed */
  onReady?: () => void | Promise<void>
  /** Called when plugin is unregistered */
  onDestroy?: () => void | Promise<void>
  /** Called on error in this plugin */
  onError?: (error: Error) => void
}

/**
 * API available to plugins during installation
 */
export interface PluginAPI {
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
  addComponent(component: ComponentDefinition): void
  /** Get theme value by path */
  theme<T = unknown>(path: string, fallback?: T): T
  /** Subscribe to kernel events */
  on(event: KernelEvent, handler: EventHandler): () => void
  /** Get current config */
  getConfig(): ResolvedConfig
}

/**
 * Preset is a collection of plugins with optional configuration
 */
export interface Preset {
  /** Preset name */
  name: string
  /** Plugins included in this preset */
  plugins: Plugin[]
  /** Default theme for this preset */
  theme?: DeepPartial<Theme>
  /** Default options */
  options?: Partial<CoralOptions>
}

// =============================================================================
// Rule Types
// =============================================================================

/**
 * A rule defines how a class name is matched and converted to CSS.
 *
 * @example
 * ```typescript
 * const paddingRule: Rule = {
 *   name: 'padding',
 *   pattern: /^p-(\\d+)$/,
 *   generate: (match, theme) => ({
 *     padding: theme.spacing[match[1]] ?? `${match[1]}px`
 *   })
 * }
 * ```
 */
export interface Rule {
  /** Rule identifier (optional, auto-generated from pattern if not provided) */
  name?: string
  /** Pattern to match class names */
  pattern: RegExp | string
  /** Generate CSS properties from match */
  generate?: (match: RegExpMatchArray, theme: Theme) => CSSProperties | null
  /** Direct CSS properties (alternative to generate) */
  properties?: CSSProperties
  /** Handler function (alternative to generate) */
  handler?: (match: RegExpMatchArray, theme?: Theme) => { properties: CSSProperties } | CSSProperties | null
  /** Selector transformer function */
  selector?: (selector: string) => string
  /** CSS layer (default: 'utilities') */
  layer?: CSSLayer
  /** Rule priority (higher = more specific) */
  priority?: number
  /** Autocomplete suggestions */
  autocomplete?: string[] | ((theme: Theme) => string[])
}

/**
 * Result of matching a rule against a class name
 */
export interface MatchResult {
  /** The matched rule */
  rule: Rule
  /** RegExp match result */
  match: RegExpMatchArray
}

// =============================================================================
// Variant Types
// =============================================================================

/**
 * A variant modifies how a utility is applied.
 *
 * @example
 * ```typescript
 * const hoverVariant: Variant = {
 *   name: 'hover',
 *   match: /^hover:/,
 *   transform: (selector) => `${selector}:hover`
 * }
 * ```
 */
export interface Variant {
  /** Variant identifier */
  name: string
  /** Pattern to match variant prefix (optional, defaults to name) */
  match?: RegExp | string
  /** Transform selector or wrap in at-rule */
  transform?: (selector: string, css: string) => string
  /** Handler function (alternative to transform). Can optionally receive regex match results. */
  handler?: (selector: string, matches?: RegExpMatchArray | null) => string
  /**
   * Wrapper for at-rules - can be:
   * - A string (e.g., '@supports (display: grid)')
   * - A function that takes CSS and returns wrapped CSS
   * - A factory function that takes regex matches and returns the wrapper string (for dynamic variants)
   */
  wrapper?: string | ((css: string) => string) | ((matches: RegExpMatchArray | null) => string)
  /** Variant priority for ordering */
  priority?: number
  /** Whether this variant can be combined with others */
  combinable?: boolean
}

// =============================================================================
// Theme Types
// =============================================================================

/**
 * Color scale with shades
 */
export interface ColorScale {
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

/**
 * Theme colors configuration
 */
export interface ThemeColors {
  [name: string]: string | ColorScale
}

/**
 * Spacing scale configuration
 */
export interface SpacingScale {
  [key: string]: string
}

/**
 * Sizing scale configuration
 */
export interface SizingScale {
  [key: string]: string
}

/**
 * Font family configuration
 */
export interface FontFamilies {
  sans: string[]
  serif: string[]
  mono: string[]
  [key: string]: string[]
}

/**
 * Font size configuration with line height
 */
export interface FontSizeValue {
  fontSize: string
  lineHeight: string
}

/**
 * Font size scale
 */
export interface FontSizeScale {
  [key: string]: string | FontSizeValue
}

/**
 * Font weight scale
 */
export interface FontWeightScale {
  [key: string]: string | number
}

/**
 * Line height scale
 */
export interface LineHeightScale {
  [key: string]: string
}

/**
 * Letter spacing scale
 */
export interface LetterSpacingScale {
  [key: string]: string
}

/**
 * Border radius scale
 */
export interface BorderRadiusScale {
  [key: string]: string
}

/**
 * Border width scale
 */
export interface BorderWidthScale {
  [key: string]: string
}

/**
 * Box shadow scale
 */
export interface BoxShadowScale {
  [key: string]: string
}

/**
 * Opacity scale
 */
export interface OpacityScale {
  [key: string]: string
}

/**
 * Z-index scale
 */
export interface ZIndexScale {
  [key: string]: string | number
}

/**
 * Duration scale for transitions/animations
 */
export interface DurationScale {
  [key: string]: string
}

/**
 * Easing functions scale
 */
export interface EasingScale {
  [key: string]: string
}

/**
 * Animation definitions
 */
export interface AnimationScale {
  [key: string]: string
}

/**
 * Screen breakpoint configuration
 */
export interface ScreenConfig {
  min?: string
  max?: string
}

/**
 * Screens configuration
 */
export interface ScreensConfig {
  [key: string]: string | ScreenConfig
}

/**
 * Container query sizes
 */
export interface ContainerConfig {
  [key: string]: string
}

/**
 * Complete theme interface
 *
 * @example
 * ```typescript
 * const customTheme: DeepPartial<Theme> = {
 *   colors: {
 *     brand: {
 *       500: '#ff6b6b',
 *     }
 *   },
 *   spacing: {
 *     'header': '4rem',
 *   }
 * }
 * ```
 */
export interface Theme {
  colors: ThemeColors
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
  /** Keyframes for animations */
  keyframes?: Record<string, Record<string, CSSProperties>>
  /** Attributify mode configuration */
  attributify?: {
    enabled: boolean
    prefix?: string
    strict?: boolean
    ignoreAttributes?: string[]
    onlyAttributes?: string[]
    valueless?: boolean
    variantGroups?: boolean
    separator?: string
  }
}

// =============================================================================
// Generated CSS Types
// =============================================================================

/**
 * Generated CSS output from a rule
 */
export interface GeneratedCSS {
  /** CSS selector */
  selector: string
  /** CSS properties */
  properties: CSSProperties
  /** CSS layer */
  layer: CSSLayer
  /** Priority for ordering */
  priority: number
  /** Original class name */
  className: string
  /** Applied variants */
  variants: string[]
}

/**
 * Parsed class name structure
 */
export interface ParsedClass {
  /** Original input */
  original: string
  /** Extracted variants */
  variants: string[]
  /** Utility part */
  utility: string
  /** Is negative value */
  negative: boolean
  /** Arbitrary value (from [...]) */
  arbitrary: string | null
  /** Important modifier (!) */
  important?: boolean
  /** Opacity modifier (/50) */
  opacity?: string | null
}

// =============================================================================
// Event Types
// =============================================================================

/**
 * Kernel event types
 */
export type KernelEvent =
  | 'plugin:registered'
  | 'plugin:unregistered'
  | 'rule:added'
  | 'rule:removed'
  | 'variant:added'
  | 'variant:removed'
  | 'theme:extended'
  | 'css:generated'
  | 'cache:hit'
  | 'cache:miss'
  | 'error'

/**
 * Event handler function
 */
export type EventHandler = (data: unknown) => void

/**
 * Event callback - alias for EventHandler
 */
export type EventCallback = EventHandler

// =============================================================================
// Component Types
// =============================================================================

/**
 * Component state
 */
export interface ComponentState {
  [key: string]: unknown
}

/**
 * State listener callback
 */
export type StateListener = (state: ComponentState) => void

/**
 * Component definition for plugins
 */
export interface ComponentDefinition {
  /** Component name */
  name: string
  /** CSS styles */
  styles?: CSSProperties
  /** Selector pattern */
  selector?: string
}

/**
 * Base component interface
 */
export interface HeadlessComponent<TElement extends HTMLElement = HTMLElement> {
  /** Unique component instance ID */
  readonly id: string
  /** Root element reference */
  readonly element: TElement | null
  /** Component state */
  readonly state: ComponentState
  /** Mount component to DOM */
  mount(container: HTMLElement | string): void
  /** Unmount and cleanup */
  unmount(): void
  /** Update component props */
  update(props: Record<string, unknown>): void
  /** Subscribe to state changes */
  subscribe(listener: StateListener): () => void
  /** Destroy component instance */
  destroy(): void
}

/**
 * Placement options for positioned components
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

// =============================================================================
// Dialog Types
// =============================================================================

/**
 * Dialog component props
 */
export interface DialogProps {
  /** Unique identifier */
  id: string
  /** Close on escape key */
  closeOnEscape?: boolean
  /** Close on outside click */
  closeOnOutsideClick?: boolean
  /** Initially open */
  initialOpen?: boolean
  /** Modal mode */
  modal?: boolean
  /** Open callback */
  onOpen?: () => void
  /** Close callback */
  onClose?: () => void
}

/**
 * Dialog state
 */
export interface DialogState extends ComponentState {
  isOpen: boolean
}

// =============================================================================
// Dropdown Types
// =============================================================================

/**
 * Dropdown component props
 */
export interface DropdownProps {
  /** Unique identifier */
  id: string
  /** Placement relative to trigger */
  placement?: Placement
  /** Offset from trigger */
  offset?: number
  /** Close on item select */
  closeOnSelect?: boolean
  /** Close on outside click */
  closeOnOutsideClick?: boolean
  /** Loop focus through items */
  loop?: boolean
  /** Open callback */
  onOpen?: () => void
  /** Close callback */
  onClose?: () => void
  /** Item select callback */
  onSelect?: (item: HTMLElement) => void
}

/**
 * Dropdown state
 */
export interface DropdownState extends ComponentState {
  isOpen: boolean
  activeIndex: number
}

// =============================================================================
// Tabs Types
// =============================================================================

/**
 * Tabs component props
 */
export interface TabsProps {
  /** Unique identifier */
  id: string
  /** Initially selected tab */
  defaultTab?: string
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Activation mode */
  activationMode?: 'automatic' | 'manual'
  /** Loop focus */
  loop?: boolean
  /** Tab change callback */
  onChange?: (tabId: string) => void
}

/**
 * Tabs state
 */
export interface TabsState extends ComponentState {
  activeTab: string
  tabs: string[]
}

// =============================================================================
// Accordion Types
// =============================================================================

/**
 * Accordion component props
 */
export interface AccordionProps {
  /** Unique identifier */
  id: string
  /** Expansion type */
  type?: 'single' | 'multiple'
  /** Allow collapsing all */
  collapsible?: boolean
  /** Initially expanded items */
  defaultExpanded?: string | string[]
  /** Expansion change callback */
  onChange?: (expandedItems: string[]) => void
}

/**
 * Accordion state
 */
export interface AccordionState extends ComponentState {
  expandedItems: string[]
}

// =============================================================================
// Tooltip Types
// =============================================================================

/**
 * Tooltip component props
 */
export interface TooltipProps {
  /** Unique identifier */
  id: string
  /** Placement */
  placement?: Placement
  /** Offset from trigger */
  offset?: number
  /** Delay before showing (ms) */
  delay?: number
  /** Delay before hiding (ms) */
  hideDelay?: number
}

/**
 * Tooltip state
 */
export interface TooltipState extends ComponentState {
  isVisible: boolean
}

// =============================================================================
// Popover Types
// =============================================================================

/**
 * Popover component props
 */
export interface PopoverProps {
  /** Unique identifier */
  id: string
  /** Placement */
  placement?: Placement
  /** Offset from trigger */
  offset?: number
  /** Close on outside click */
  closeOnOutsideClick?: boolean
  /** Close on escape */
  closeOnEscape?: boolean
  /** Modal mode */
  modal?: boolean
}

/**
 * Popover state
 */
export interface PopoverState extends ComponentState {
  isOpen: boolean
}

// =============================================================================
// Toast Types
// =============================================================================

/**
 * Toast type
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast position
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

/**
 * Toast options
 */
export interface ToastOptions {
  /** Toast message */
  message: string
  /** Toast type */
  type?: ToastType
  /** Duration in ms */
  duration?: number
  /** Position */
  position?: ToastPosition
  /** Dismissible */
  dismissible?: boolean
  /** Dismiss callback */
  onDismiss?: () => void
}

// =============================================================================
// Switch Types
// =============================================================================

/**
 * Switch component props
 */
export interface SwitchProps {
  /** Unique identifier */
  id: string
  /** Initially checked */
  defaultChecked?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Change callback */
  onChange?: (checked: boolean) => void
}

/**
 * Switch state
 */
export interface SwitchState extends ComponentState {
  isChecked: boolean
}

// =============================================================================
// Select Types
// =============================================================================

/**
 * Select component props
 */
export interface SelectProps {
  /** Unique identifier */
  id: string
  /** Placeholder text */
  placeholder?: string
  /** Initially selected value */
  defaultValue?: string
  /** Disabled state */
  disabled?: boolean
  /** Change callback */
  onChange?: (value: string) => void
}

/**
 * Select state
 */
export interface SelectState extends ComponentState {
  isOpen: boolean
  value: string
}

// =============================================================================
// Combobox Types
// =============================================================================

/**
 * Combobox component props
 */
export interface ComboboxProps {
  /** Unique identifier */
  id: string
  /** Placeholder text */
  placeholder?: string
  /** Initially selected value */
  defaultValue?: string
  /** Disabled state */
  disabled?: boolean
  /** Change callback */
  onChange?: (value: string) => void
  /** Input change callback */
  onInputChange?: (query: string) => void
}

/**
 * Combobox state
 */
export interface ComboboxState extends ComponentState {
  isOpen: boolean
  value: string
  query: string
}

// =============================================================================
// Cache Types
// =============================================================================

/**
 * Cache configuration options
 */
export interface CacheOptions {
  /** Maximum number of entries before eviction (default: 1000) */
  maxSize?: number
  /** Time-to-live in milliseconds before entries expire (default: Infinity) */
  ttl?: number
  /** Whether caching is enabled (default: true) */
  enabled?: boolean
}

/**
 * Cache statistics
 */
export interface CacheStats {
  /** Cache hits */
  hits: number
  /** Cache misses */
  misses: number
  /** Current cache size */
  size: number
  /** Hit rate percentage */
  hitRate?: number
  /** Maximum cache size */
  maxSize?: number
  /** TTL in milliseconds (-1 if infinite) */
  ttl?: number
}

// =============================================================================
// Build/Integration Types
// =============================================================================

/**
 * Vite plugin options
 */
export interface VitePluginOptions extends CoralOptions {
  /** Content paths to scan */
  content: string[]
}

/**
 * PostCSS plugin options
 */
export interface PostCSSPluginOptions extends CoralOptions {
  /** Content paths to scan */
  content: string[]
}

/**
 * CLI options
 */
export interface CLIOptions {
  /** Input directory */
  input: string
  /** Output file */
  output: string
  /** Config file path */
  config?: string
  /** Minify output */
  minify?: boolean
  /** Watch mode */
  watch?: boolean
}

// =============================================================================
// Additional Plugin Types (Aliases for compatibility)
// =============================================================================

/**
 * Plugin context - alias for PluginAPI
 */
export type PluginContext = PluginAPI

/**
 * Plugin hooks interface
 */
export interface PluginHooks {
  onReady?: () => void | Promise<void>
  onDestroy?: () => void | Promise<void>
  onError?: (error: Error) => void
}

/**
 * Rule configuration
 */
export interface RuleConfig {
  name?: string
  pattern: RegExp | string
  properties?: CSSProperties
  handler?: (match: RegExpMatchArray) => { properties: CSSProperties } | null
  selector?: (selector: string) => string
  layer?: CSSLayer
  priority?: number
}

/**
 * Rule match result
 */
export interface RuleMatch {
  rule: RuleConfig
  match: RegExpMatchArray
  className: string
}

/**
 * Rule generation result
 */
export interface RuleResult {
  selector: string
  properties: CSSProperties
  layer: CSSLayer
}

/**
 * Variant configuration
 */
export interface VariantConfig {
  name: string
  match: RegExp | string
  transform: (selector: string, css: string) => string
  priority?: number
}

/**
 * Variant transformation result
 */
export interface VariantResult {
  selector: string
  css: string
  wrapperStart?: string
  wrapperEnd?: string
}

// =============================================================================
// Component Types (Extended)
// =============================================================================

/**
 * Component interface - alias for HeadlessComponent
 */
export type Component<T extends HTMLElement = HTMLElement> = HeadlessComponent<T>

/**
 * Component configuration options
 */
export interface ComponentConfig {
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  trapFocus?: boolean
  closeOnSelect?: boolean
  closeOnClickOutside?: boolean
  defaultTab?: number
  activation?: 'automatic' | 'manual'
  allowMultiple?: boolean
  delay?: number
  hideDelay?: number
  placement?: Placement
  position?: ToastPosition
  duration?: number
  [key: string]: unknown
}

/**
 * Component context for internal use
 */
export interface ComponentContext {
  element: HTMLElement
  options?: ComponentConfig
  config?: ComponentConfig
  state: ComponentState
  emit?: (event: string, detail?: unknown) => void
  component?: unknown
}

/**
 * Component lifecycle hooks
 */
export interface ComponentHooks {
  onMount?: () => void
  onUnmount?: () => void
  onUpdate?: (props: Record<string, unknown>) => void
  onDestroy?: (context?: ComponentContext) => void
  onInit?: (context?: ComponentContext) => void
  onStateChange?: (prevState: ComponentState, newState: ComponentState, context?: ComponentContext) => void
  onOpen?: (context?: ComponentContext) => void
  onClose?: (context?: ComponentContext) => void
}

// =============================================================================
// Options Types
// =============================================================================

/**
 * Cache options
 */
export interface CacheOptions {
  maxSize?: number
  ttl?: number
}

/**
 * Generate options
 */
export interface GenerateOptions {
  minify?: boolean
  includeBase?: boolean
  includeReset?: boolean
}

/**
 * Transform options
 */
export interface TransformOptions {
  minify?: boolean
  sourceMaps?: boolean
}

/**
 * Extract options
 */
export interface ExtractOptions {
  attributify?: boolean
  variantGroups?: boolean
}

/**
 * Extract result
 */
export interface ExtractResult {
  classes: string[]
  attributes?: Record<string, string[]>
}

// =============================================================================
// Event Types (Extended)
// =============================================================================

/**
 * Coral event - extended event type
 */
export interface CoralEvent {
  type: KernelEvent
  data?: unknown
  timestamp: number
}

/**
 * Coral config - alias for CoralOptions
 */
export type CoralConfig = CoralOptions

// =============================================================================
// Coral Instance Types
// =============================================================================

/**
 * Main CoralCSS instance interface
 *
 * @example
 * ```typescript
 * const coral = createCoral({ presets: [presetCoral()] })
 * const css = coral.generate(['p-4', 'bg-coral-500'])
 * ```
 */
export interface Coral {
  /** Current resolved configuration */
  readonly config: ResolvedConfig
  /** Registered plugins */
  readonly plugins: ReadonlyMap<string, Plugin>
  /** Number of registered plugins */
  readonly pluginCount: number
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
