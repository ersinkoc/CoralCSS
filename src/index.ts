/**
 * CoralCSS
 *
 * A modern, zero-dependency CSS framework with utility-first classes,
 * headless components, and first-class support for modern CSS features.
 *
 * @module @coral-css/core
 * @license MIT
 */

// Core exports
export { Kernel, createCoral } from './kernel'

// Core modules
export {
  CSSCache,
  ClassNameParser,
  RuleMatcher,
  CSSGenerator,
  CSSTransformer,
  ClassExtractor,
  convertOKLABToRGB,
  generateOKLABFallback,
  generatePropertyFallback,
  generateGradientFallback,
  processCSSWithFallbacks,
  createFallbacksPlugin,
  defaultFallbackConfig,
  // Performance optimizations
  CoralWorker,
  WorkerPool,
  createWorker,
  createWorkerPool,
  HybridCache,
  createHybridCache,
  IncrementalBuilder,
  DependencyTracker,
  BuildCache,
  createIncrementalBuilder,
  createDependencyTracker,
  createBuildCache,
  // Phase 4: Performance Optimizations
  TreeShake,
  createTreeShake,
  treeShakeRules,
  analyzeRuleUsage,
  RuntimeOptimizer,
  createRuntimeOptimizer,
  getGlobalOptimizer,
  setGlobalOptimizer,
} from './core'

// Theme exports
export {
  // Colors
  colors,
  coral,
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  getColor,
  // Spacing
  spacing,
  sizing,
  heightSizing,
  zIndex,
  maxWidth,
  inset,
  negativeSpacing,
  getSpacing,
  getSizing,
  getNegativeSpacing,
  // Typography
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textDecorationThickness,
  textUnderlineOffset,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLineHeight,
  getLetterSpacing,
  // Default theme
  defaultTheme,
  getDefaultTheme,
  borderRadius,
  borderWidth,
  boxShadow,
  opacity,
  transitionDuration,
  transitionTimingFunction,
  animation,
  screens,
  containers,
  blur,
  dropShadow,
  keyframes,
  // Dark mode
  invertColorScale,
  generateDarkColors,
  generateDarkModeCSS,
  wrapInDarkMode,
  usesClassStrategy,
  usesMediaStrategy,
  generateLightModeCSS,
  generateThemeCSS,
} from './theme'

// Utility exports
export {
  // String utilities
  kebabCase,
  escapeSelector,
  generateId,
  splitByDelimiter,
  // CSS utilities
  serializeProperties,
  formatCSS,
  minifyCSS,
  wrapInMediaQuery,
  wrapInContainerQuery,
  cssVar,
  // Color utilities
  hexToRgb,
  rgbToHex,
  adjustAlpha,
  isDark,
  mixColors,
  // Regex utilities
  createPattern,
  anchorPattern,
  extractArbitraryValue,
  // DOM utilities
  querySelector,
  querySelectorAll,
  trapFocus,
  releaseFocusTrap,
  lockScroll,
  unlockScroll,
  cssSupports,
} from './utils'

// Error exports
export {
  CoralError,
  ConfigError,
  PluginNotFoundError,
  RuleConflictError,
  InvalidValueError,
  ParseError,
  GenerationError,
  createError,
  ErrorCode,
} from './errors'

// Plugin exports
export {
  corePlugins,
  coreUtilitiesPlugins,
  coreVariantsPlugins,
  modernCSSPlugin,
  // Utility plugins
  spacingPlugin,
  sizingPlugin,
  colorsPlugin,
  typographyPlugin,
  layoutPlugin,
  flexboxPlugin,
  gridPlugin,
  bordersPlugin,
  effectsPlugin,
  filtersPlugin,
  transformsPlugin,
  transitionsPlugin,
  interactivityPlugin,
  backgroundsPlugin,
  // Variant plugins
  pseudoVariantsPlugin,
  responsiveVariantsPlugin,
  darkModeVariantsPlugin,
  modernVariantsPlugin,
} from './plugins'

// Preset exports
export {
  coralPreset,
  coralPresetConfig,
  windPreset,
  miniPreset,
  fullPreset,
  materialPreset,
  materialPresetConfig,
  cupertinoPreset,
  cupertinoPresetConfig,
  nordPreset,
  nordPresetConfig,
  draculaPreset,
  draculaPresetConfig,
  githubPreset,
  githubPresetConfig,
  enhancedLightPreset,
  enhancedLightPresetConfig,
} from './presets'

// Component exports
export {
  BaseComponent,
  Dialog,
  createDialog,
  Dropdown,
  createDropdown,
  Tabs,
  createTabs,
  Accordion,
  createAccordion,
  Tooltip,
  createTooltip,
  Switch,
  createSwitch,
  Toast,
  createToast,
  ToastContainer,
  createToastContainer,
  initComponents,
  components,
  factories,
} from './components'

// Runtime exports
export {
  DOMObserver,
  createObserver,
  StyleInjector,
  createInjector,
  createCoralCDN,
  getCoralCDN,
} from './runtime'

// Build tool exports
export {
  coralVitePlugin,
  coralPostCSSPlugin,
  cli,
} from './build'

// Config exports
export {
  parseCSSConfig,
  mergeConfigs,
  extractCoralDirectives,
  validateCSSConfig,
  cssConfigPlugin,
  createCoralWithCSS,
  generateCSSConfigTemplate,
} from './config'
export type { CSSConfigPluginOptions, ParsedCSSConfig } from './config'

// Type exports
export type {
  // Core types
  Coral,
  CoralOptions,
  CoralConfig,
  // Plugin types
  Plugin,
  PluginContext,
  PluginHooks,
  // Rule types
  Rule,
  RuleConfig,
  RuleMatch,
  RuleResult,
  // Variant types
  Variant,
  VariantConfig,
  VariantResult,
  // Component types
  Component,
  ComponentConfig,
  ComponentState,
  ComponentContext,
  ComponentHooks,
  // Theme types
  Theme,
  ThemeColors,
  ColorScale,
  SpacingScale,
  SizingScale,
  FontFamilies,
  FontSizeScale,
  FontSizeValue,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  BorderRadiusScale,
  BorderWidthScale,
  BoxShadowScale,
  OpacityScale,
  ZIndexScale,
  DurationScale,
  EasingScale,
  AnimationScale,
  ScreensConfig,
  ScreenConfig,
  ContainerConfig,
  DarkModeStrategy,
  // Utility types
  ParsedClass,
  CacheOptions,
  CacheStats,
  GenerateOptions,
  TransformOptions,
  ExtractOptions,
  ExtractResult,
  FallbackConfig,
  // Event types
  CoralEvent,
  EventCallback,
} from './types'

// Performance optimization type exports
export type {
  WorkerMessage,
  WorkerTask,
  WorkerPoolOptions,
  CacheEntry as HybridCacheEntry,
  PersistentCacheEntry,
  HybridCacheOptions,
  ManifestEntry as BuildManifestEntry,
  BuildManifest,
  BuildResult,
  IncrementalBuildOptions,
  FileChangeType,
  FileChange,
  // Phase 4: Performance Optimizations
  TreeShakeOptions,
  UsageAnalysis,
  SchedulerOptions,
  BatchOptions,
  VirtualizedOptions,
} from './core'

// Preset type exports
export type {
  CoralPresetOptions,
  WindPresetOptions,
  MiniPresetOptions,
  FullPresetOptions,
} from './presets'

// Component type exports
export type {
  DialogConfig,
  DialogState,
  DropdownConfig,
  DropdownState,
  TabsConfig,
  TabsState,
  AccordionConfig,
  AccordionState,
  TooltipConfig,
  TooltipState,
  SwitchConfig,
  SwitchState,
  ToastConfig,
  ToastState,
} from './components'

// Runtime type exports
export type {
  ObserverConfig,
  InjectorConfig,
  CDNConfig,
  CoralCDN,
} from './runtime'

// Build type exports
export type {
  VitePluginOptions,
  PostCSSPluginOptions,
  CLIOptions,
  CLIResult,
} from './build'

// Template exports
export * from './templates'

// UI Kit exports
export * as uiKit from './ui-kit'

// Design Tokens exports
export * as tokens from './tokens'

// CVA (Class Variance Authority) exports
export * from './cva'

// DevTools exports
export * as devtools from './devtools'

// Playground exports
export * as playground from './playground'
