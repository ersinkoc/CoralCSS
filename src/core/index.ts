/**
 * CoralCSS Core
 *
 * Core modules for CSS generation.
 * @module core
 */

// Cache
export { CSSCache, createCache } from './cache'

// Parser Cache (Performance Optimization)
export {
  getCachedRegex,
  clearRegexCache,
  getCacheSize,
  OPACITY_PATTERN,
  ARBITRARY_PATTERN,
  VARIANT_GROUP_PREFIX_PATTERN,
  WHITESPACE_PATTERN,
  ARBITRARY_WITH_TYPE_PATTERN,
  HAS_BRACKETS_PATTERN,
  BRACKET_CONTENT_PATTERN,
  IMPORTANT_PREFIX_PATTERN,
  NEGATIVE_PREFIX_PATTERN,
  DOUBLE_DASH_PATTERN,
  COLON_PATTERN,
  NUMERIC_VALUE_PATTERN,
  PERCENTAGE_PATTERN,
  LENGTH_VALUE_PATTERN,
  COLOR_VALUE_PATTERN,
  ANGLE_VALUE_PATTERN,
  TIME_VALUE_PATTERN,
  lazyRegex,
  createCachedMatcher,
  createCachedExtractor,
} from './parser-cache'

// Parser
export {
  parse,
  parseClasses,
  expandVariantGroups,
  hasVariants,
  isNegative,
  hasArbitrary,
  extractUtility,
  extractVariants,
  combineWithVariants,
  normalizeArbitraryValue,
  parseArbitraryValue,
  createClassName,
  ClassNameParser,
  ClassNameParser as ParserClass,
} from './parser'

// Matcher
export { Matcher, createMatcher } from './matcher'

// Generator
export {
  Generator,
  createGenerator,
  generateNegative,
  mergeProperties,
  sortGeneratedCSS,
  dedupeGeneratedCSS,
  type GeneratorOptions,
} from './generator'

// Transformer
export {
  Transformer,
  createTransformer,
  transformToCSS,
  groupBySelector,
  mergeSameSelector,
  createPreflight,
  type TransformerOptions,
} from './transformer'

// Extractor
export {
  Extractor,
  createExtractor,
  extractFromHTML,
  extractClasses,
  type ExtractorOptions,
} from './extractor'

// Aliases for compatibility
export { Matcher as RuleMatcher } from './matcher'
export { Generator as CSSGenerator } from './generator'
export { Transformer as CSSTransformer } from './transformer'
export { Extractor as ClassExtractor } from './extractor'

// Fallbacks
export {
  convertOKLABToRGB,
  generateOKLABFallback,
  generatePropertyFallback,
  generateGradientFallback,
  processCSSWithFallbacks,
  createFallbacksPlugin,
  defaultFallbackConfig,
} from './fallbacks'
export type { FallbackConfig } from '../types'

// Performance Optimizations
export {
  CoralWorker,
  WorkerPool,
  createWorker,
  createWorkerPool,
} from './worker'
export type { WorkerMessage, WorkerTask, WorkerPoolOptions } from './worker'

export {
  HybridCache,
  createHybridCache,
} from './hybrid-cache'
export type {
  CacheEntry,
  PersistentCacheEntry,
  HybridCacheOptions,
} from './hybrid-cache'

export {
  IncrementalBuilder,
  DependencyTracker,
  BuildCache,
  createIncrementalBuilder,
  createDependencyTracker,
  createBuildCache,
} from './incremental'
export type {
  ManifestEntry,
  BuildManifest,
  BuildResult,
  IncrementalBuildOptions,
  FileChangeType,
  FileChange,
} from './incremental'

// Phase 4: Performance Optimizations
export {
  TreeShake,
  createTreeShake,
  treeShakeRules,
  analyzeRuleUsage,
} from './tree-shake'
export type {
  TreeShakeOptions,
  UsageAnalysis,
} from './tree-shake'

export {
  RuntimeOptimizer,
  createRuntimeOptimizer,
  getGlobalOptimizer,
  setGlobalOptimizer,
} from './runtime-optimizer'
export type {
  SchedulerOptions,
  BatchOptions,
  VirtualizedOptions,
} from './runtime-optimizer'

// Note: ClassNameParser class is exported from './parser'
import { parse, parseClasses, expandVariantGroups } from './parser'
