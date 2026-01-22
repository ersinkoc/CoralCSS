/**
 * CoralCSS Kernel
 *
 * The core engine that manages plugins, rules, variants, and CSS generation.
 * @module kernel
 */

import type {
  Coral,
  CoralOptions,
  ResolvedConfig,
  Plugin,
  PluginAPI,
  Rule,
  Variant,
  Theme,
  DeepPartial,
  ComponentDefinition,
  KernelEvent,
  EventHandler,
  ParsedClass,
  GeneratedCSS,
  SafelistPattern,
} from './types'
import {
  PluginDependencyError,
} from './errors'
import { CSSCache, createCache, hashTheme } from './core/cache'
import { Matcher, createMatcher } from './core/matcher'
import { Generator, createGenerator, sortGeneratedCSS } from './core/generator'
import { Transformer, createTransformer } from './core/transformer'
import { Extractor, createExtractor } from './core/extractor'
import { parse, expandVariantGroups } from './core/parser'
import { dedupeStrings } from './utils/string'
import { defaultTheme } from './theme/default'

/**
 * Branded type for validated plain objects
 * This provides stronger type safety than Record<string, unknown>
 * by marking objects that have passed isPlainObject validation
 */
export interface PlainObject extends Record<string, unknown> {
  readonly __brand: unique symbol
}

/**
 * Default configuration values
 */
const defaultConfig: ResolvedConfig = {
  presets: [],
  plugins: [],
  theme: defaultTheme,
  darkMode: 'class',
  darkModeSelector: '.dark',
  prefix: '',
  features: {
    variantGroups: true,
    attributify: false,
  },
  content: [],
  safelist: [],
  blocklist: [],
  cache: {
    maxSize: 1000,
    ttl: Infinity,
    enabled: true,
  },
}

/**
 * Keys that should never be merged (prototype pollution prevention)
 */
const UNSAFE_MERGE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Maximum depth for deep merge to prevent stack overflow from deeply nested objects
 */
const MAX_MERGE_DEPTH = 20

/**
 * Check if a value is a plain object (not a class instance, array, null, etc.)
 * This also performs deep validation to prevent prototype pollution via nested values
 *
 * @example
 * ```typescript
 * if (isPlainObject(value)) {
 *   // TypeScript now knows value is a PlainObject (branded type)
 *   console.log(value.someProperty)
 * }
 * ```
 */
function isPlainObject(value: unknown): value is PlainObject {
  if (value === null || typeof value !== 'object') {
    return false
  }

  // Reject arrays and special objects explicitly
  if (Array.isArray(value)) return false
  if (value instanceof Date) return false
  if (value instanceof RegExp) return false
  if (value instanceof Function) return false
  if (value instanceof Map) return false
  if (value instanceof Set) return false
  if (value instanceof WeakMap) return false
  if (value instanceof WeakSet) return false
  if (value instanceof Promise) return false

  // Check prototype chain
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) {
    return false
  }

  // Deep validation: check that the object doesn't contain dangerous nested values
  // This prevents: { "toString": { "constructor": { "polluted": true } } }
  const obj = value as Record<string, unknown>
  for (const key of Object.keys(obj)) {
    const val = obj[key]

    // Check if the value itself has a dangerous constructor
    if (val && typeof val === 'object') {
      const valProto = Object.getPrototypeOf(val)
      if (valProto && valProto !== Object.prototype && valProto !== null) {
        return false
      }

      // Check if value has dangerous properties (constructor, prototype, __proto__)
      if (typeof val === 'object' && val !== null) {
        const valKeys = Object.keys(val)
        for (const valKey of valKeys) {
          if (UNSAFE_MERGE_KEYS.has(valKey)) {
            return false
          }
        }
      }
    }
  }

  return true
}

/**
 * Deep merge utility with prototype pollution and circular reference protection
 */
function deepMerge<T extends object>(target: T, ...sources: DeepPartial<T>[]): T {
  // Track seen objects to detect circular references
  const seen = new WeakSet<object>()

  function mergeInternal(
    targetObj: Record<string, unknown>,
    sourceObj: Record<string, unknown>,
    depth: number
  ): Record<string, unknown> {
    // Prevent stack overflow from deeply nested objects
    if (depth > MAX_MERGE_DEPTH) {
      console.warn('CoralCSS: Deep merge exceeded maximum depth, returning source as-is')
      return { ...targetObj, ...sourceObj }
    }

    // Check for circular reference
    if (seen.has(sourceObj)) {
      console.warn('CoralCSS: Circular reference detected in deep merge, skipping')
      return targetObj
    }
    seen.add(sourceObj)

    const result = { ...targetObj }

    for (const key of Object.keys(sourceObj)) {
      // Prototype pollution protection - skip dangerous keys
      if (UNSAFE_MERGE_KEYS.has(key)) {
        continue
      }

      const sourceValue = sourceObj[key]
      const targetValue = result[key]

      // Only merge plain objects recursively
      if (isPlainObject(sourceValue)) {
        if (isPlainObject(targetValue)) {
          result[key] = mergeInternal(
            targetValue as Record<string, unknown>,
            sourceValue as Record<string, unknown>,
            depth + 1
          )
        } else {
          // Clone source object to prevent shared references
          result[key] = mergeInternal({}, sourceValue as Record<string, unknown>, depth + 1)
        }
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue
      }
    }

    return result
  }

  let result = { ...target } as Record<string, unknown>

  for (const source of sources) {
    if (!source || typeof source !== 'object') {
      continue
    }

    result = mergeInternal(result, source as Record<string, unknown>, 0)
  }

  return result as T
}

/**
 * CoralCSS Kernel class
 *
 * @example
 * ```typescript
 * const kernel = new Kernel({
 *   presets: [presetCoral()],
 *   theme: { colors: { brand: '#ff6b6b' } }
 * })
 *
 * const css = kernel.generate(['p-4', 'bg-brand', 'hover:bg-brand'])
 * ```
 */
export class Kernel implements Coral {
  private _config: ResolvedConfig
  private _plugins: Map<string, Plugin>
  private _rules: Map<string, Rule>
  private _variants: Map<string, Variant>
  private _components: Map<string, ComponentDefinition>
  private _eventHandlers: Map<KernelEvent, Set<EventHandler>>
  private _data: Map<string, unknown>
  private _cache: CSSCache
  private _matcher: Matcher
  private _generator: Generator
  private _transformer: Transformer
  private _extractor: Extractor
  private _initialized: boolean
  private _readyPromise: Promise<void>

  constructor(options: CoralOptions = {}) {
    this._plugins = new Map()
    this._rules = new Map()
    this._variants = new Map()
    this._components = new Map()
    this._eventHandlers = new Map()
    this._data = new Map()
    this._matcher = createMatcher()
    this._initialized = false

    // Resolve configuration first
    this._config = this.resolveConfig(options)

    // Create cache with resolved config
    this._cache = createCache(this._config.cache)
    // Initialize cache version with initial theme hash
    this._cache.setThemeVersion(hashTheme(this._config.theme))

    // Initialize generator and transformer with empty theme/variants
    // They will be updated after plugins are loaded
    this._generator = createGenerator(
      this._config.theme,
      this._variants,
      { prefix: this._config.prefix }
    )
    this._transformer = createTransformer()
    this._extractor = createExtractor({
      attributify: this._config.features.attributify,
    })

    // Load presets
    this.loadPresets(options.presets ?? [])

    // Load plugins
    this.loadPlugins(options.plugins ?? [])

    // Mark as initialized and call onReady
    this._initialized = true
    this._readyPromise = this.callOnReady()
  }

  /**
   * Wait for all plugins to be ready
   * Call this if you need to ensure all async plugin initialization is complete
   *
   * @example
   * ```typescript
   * const kernel = new Kernel(options)
   * await kernel.ready() // Wait for all plugins to initialize
   * ```
   */
  async ready(): Promise<void> {
    return this._readyPromise
  }

  /**
   * Get resolved configuration
   */
  get config(): ResolvedConfig {
    return this._config
  }

  /**
   * Get registered plugins
   */
  get plugins(): ReadonlyMap<string, Plugin> {
    return this._plugins
  }

  /**
   * Get number of registered plugins
   */
  get pluginCount(): number {
    return this._plugins.size
  }

  /**
   * Register a plugin
   *
   * @example
   * ```typescript
   * kernel.use({
   *   name: 'my-plugin',
   *   version: '1.0.0',
   *   install: (api) => {
   *     api.addRule({ ... })
   *   }
   * })
   * ```
   */
  use(plugin: Plugin): this {
    // Check if already registered
    if (this._plugins.has(plugin.name)) {
      return this
    }

    // Check dependencies
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        if (!this._plugins.has(dep)) {
          throw new PluginDependencyError(plugin.name, dep)
        }
      }
    }

    // Register plugin
    this._plugins.set(plugin.name, plugin)

    // Create plugin API
    const api = this.createPluginAPI(plugin)

    // Install plugin
    try {
      plugin.install(api)
    } catch (error) {
      // Call error handler if available
      plugin.onError?.(error as Error)
      throw error
    }

    // Emit event
    this.emit('plugin:registered', { plugin: plugin.name })

    // Update generator with new variants
    this._generator.setVariants(this._variants)

    // If already initialized, call onReady immediately
    if (this._initialized && plugin.onReady) {
      Promise.resolve(plugin.onReady()).catch((err) => {
        plugin.onError?.(err)
      })
    }

    return this
  }

  /**
   * Unregister a plugin by name
   */
  unregister(name: string): boolean {
    const plugin = this._plugins.get(name)
    if (!plugin) {
      return false
    }

    // Call onDestroy
    if (plugin.onDestroy) {
      Promise.resolve(plugin.onDestroy()).catch((err) => {
        plugin.onError?.(err)
      })
    }

    // Remove plugin
    this._plugins.delete(name)

    // Emit event
    this.emit('plugin:unregistered', { plugin: name })

    return true
  }

  /**
   * Generate CSS from class names
   *
   * @example
   * ```typescript
   * const css = kernel.generate(['p-4', 'bg-red-500', 'hover:bg-red-600'])
   * ```
   */
  generate(classes: string[]): string {
    // Dedupe classes
    const uniqueClasses = dedupeStrings(classes)

    // Expand variant groups if enabled
    let expandedClasses = uniqueClasses
    if (this._config.features.variantGroups) {
      expandedClasses = uniqueClasses.flatMap((c) => {
        if (c.includes(':(')) {
          return expandVariantGroups(c)
        }
        return [c]
      })
      expandedClasses = dedupeStrings(expandedClasses)
    }

    // Apply blocklist - remove blocked classes
    if (this._config.blocklist.length > 0) {
      expandedClasses = expandedClasses.filter((className) => {
        return !this.isBlocked(className)
      })
    }

    // Add safelist classes
    if (this._config.safelist.length > 0) {
      const safelistClasses = this.expandSafelist()
      expandedClasses = dedupeStrings([...expandedClasses, ...safelistClasses])
    }

    // Generate CSS for each class
    const cssItems: GeneratedCSS[] = []
    const uncachedClasses: ParsedClass[] = []
    const seenCachedCSS = new Set<string>()

    for (const className of expandedClasses) {
      // Check cache
      const cached = this._cache.get(className)
      if (cached !== undefined) {
        this.emit('cache:hit', { className })
        // Track cached CSS to include later
        if (!seenCachedCSS.has(cached)) {
          seenCachedCSS.add(cached)
        }
        continue
      }

      this.emit('cache:miss', { className })
      uncachedClasses.push(parse(className))
    }

    // Generate CSS for uncached classes
    for (const parsed of uncachedClasses) {
      // Reconstruct full utility including negative prefix
      const utility = parsed.negative ? `-${parsed.utility}` : parsed.utility
      const matchResult = this._matcher.match(utility)
      if (!matchResult) {
        continue
      }

      const css = this._generator.generateWithVariants(parsed, matchResult)
      if (css) {
        cssItems.push(css)

        // Cache the result
        const cssString = this._generator.toCSS(css)
        this._cache.set(parsed.original, cssString)
      }
    }

    // Sort by layer and priority
    const sorted = sortGeneratedCSS(cssItems)

    // Generate CSS strings
    const cssStrings = sorted.map((item) => this._generator.toCSS(item))

    // Include cached CSS (already deduplicated via Set)
    for (const cachedCSS of seenCachedCSS) {
      cssStrings.push(cachedCSS)
    }

    // Combine and return
    const result = cssStrings.join('\n')

    this.emit('css:generated', { classes: expandedClasses, css: result })

    return result
  }

  /**
   * Generate CSS from HTML content
   *
   * @example
   * ```typescript
   * const css = kernel.generateFromHTML('<div class="p-4 bg-red-500">')
   * ```
   */
  generateFromHTML(html: string): string {
    const classes = this._extractor.extractFromHTML(html)
    return this.generate(classes)
  }

  /**
   * Get all registered rules
   */
  getRules(): Rule[] {
    return this._matcher.getRules()
  }

  /**
   * Get all registered variants
   */
  getVariants(): Variant[] {
    return Array.from(this._variants.values())
  }

  /**
   * Reset kernel state
   */
  reset(): void {
    this._cache.clear()
    // Re-initialize cache version after reset
    this._cache.setThemeVersion(hashTheme(this._config.theme))
    this._rules.clear()
    this._variants.clear()
    this._matcher.clear()
    this._components.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this._cache.stats()
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this._cache.clear()
  }

  /**
   * Subscribe to kernel events
   */
  on(event: KernelEvent, handler: EventHandler): () => void {
    if (!this._eventHandlers.has(event)) {
      this._eventHandlers.set(event, new Set())
    }
    this._eventHandlers.get(event)!.add(handler)

    // Return unsubscribe function
    return () => {
      this._eventHandlers.get(event)?.delete(handler)
    }
  }

  // =========================================================================
  // Private Methods
  // =========================================================================

  /**
   * Resolve configuration from options and presets
   */
  private resolveConfig(options: CoralOptions): ResolvedConfig {
    // Start with defaults
    let config: ResolvedConfig = { ...defaultConfig }

    // Apply preset configurations
    for (const preset of options.presets ?? []) {
      if (preset.options) {
        config = deepMerge(config, preset.options as DeepPartial<ResolvedConfig>)
      }
      if (preset.theme) {
        config = deepMerge(config, { theme: preset.theme } as DeepPartial<ResolvedConfig>)
      }
    }

    // Apply user options
    if (options.theme) {
      config = deepMerge(config, { theme: options.theme } as DeepPartial<ResolvedConfig>)
    }

    if (options.darkMode) {
      config = deepMerge(config, { darkMode: options.darkMode } as DeepPartial<ResolvedConfig>)
    }

    if (options.darkModeSelector) {
      config = deepMerge(config, { darkModeSelector: options.darkModeSelector } as DeepPartial<ResolvedConfig>)
    }

    if (options.prefix !== undefined) {
      config = deepMerge(config, { prefix: options.prefix } as DeepPartial<ResolvedConfig>)
    }

    if (options.features) {
      config = deepMerge(config, { features: options.features } as DeepPartial<ResolvedConfig>)
    }

    if (options.content) {
      config = deepMerge(config, { content: options.content } as DeepPartial<ResolvedConfig>)
    }

    if (options.safelist) {
      config = deepMerge(config, { safelist: options.safelist } as DeepPartial<ResolvedConfig>)
    }

    if (options.blocklist) {
      config = deepMerge(config, { blocklist: options.blocklist } as DeepPartial<ResolvedConfig>)
    }

    return config
  }

  /**
   * Load presets
   */
  private loadPresets(presets: CoralOptions['presets']): void {
    if (!presets) {
      return
    }

    for (const preset of presets) {
      // Load preset plugins
      for (const plugin of preset.plugins) {
        this.use(plugin)
      }
    }
  }

  /**
   * Load plugins
   */
  private loadPlugins(plugins: Plugin[]): void {
    // Sort by priority (higher first)
    const sorted = [...plugins].sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
    )

    for (const plugin of sorted) {
      this.use(plugin)
    }
  }

  /**
   * Create plugin API for a plugin
   */
  private createPluginAPI(plugin: Plugin): PluginAPI {
    const self = this

    return {
      addRule(rule: Rule): void {
        const ruleName = rule.name ?? (typeof rule.pattern === 'string' ? rule.pattern : rule.pattern.source.slice(0, 40))
        self._rules.set(ruleName, rule)
        self._matcher.addRule(rule)
        self.emit('rule:added', { rule: ruleName, plugin: plugin.name })
      },

      addRules(rules: Rule[]): void {
        for (const rule of rules) {
          this.addRule(rule)
        }
      },

      addVariant(variant: Variant): void {
        // Default match to name if not provided
        const resolvedVariant: Variant = {
          ...variant,
          match: variant.match ?? variant.name,
        }
        self._variants.set(variant.name, resolvedVariant)
        self.emit('variant:added', { variant: variant.name, plugin: plugin.name })
      },

      addVariants(variants: Variant[]): void {
        for (const variant of variants) {
          this.addVariant(variant)
        }
      },

      extendTheme(theme: DeepPartial<Theme>): void {
        self._config = deepMerge(self._config, { theme } as DeepPartial<ResolvedConfig>)
        self._generator.setTheme(self._config.theme)
        // Update cache version with new theme hash for automatic invalidation
        self._cache.setThemeVersion(hashTheme(self._config.theme))
        self.emit('theme:extended', { plugin: plugin.name })
      },

      addComponent(component: ComponentDefinition): void {
        self._components.set(component.name, component)
      },

      theme<T = unknown>(path: string, fallback?: T): T {
        const parts = path.split('.')
        let current: unknown = self._config.theme

        for (const part of parts) {
          if (current === null || current === undefined) {
            return fallback as T
          }
          // Use isPlainObject to properly exclude arrays and other non-plain objects
          if (isPlainObject(current)) {
            current = current[part]
          } else {
            return fallback as T
          }
        }

        return (current as T) ?? (fallback as T)
      },

      on(event: KernelEvent, handler: EventHandler): () => void {
        return self.on(event, handler)
      },

      getConfig(): ResolvedConfig {
        return self._config
      },

      setData(key: string, value: unknown): void {
        self._data.set(key, value)
      },

      getData(key: string): unknown {
        return self._data.get(key)
      },

      emit(event: string, data?: unknown): void {
        self.emit(event as KernelEvent, data)
      },
    }
  }

  /**
   * Call onReady for all plugins
   */
  private async callOnReady(): Promise<void> {
    for (const plugin of this._plugins.values()) {
      if (plugin.onReady) {
        try {
          await plugin.onReady()
        } catch (error) {
          plugin.onError?.(error as Error)
        }
      }
    }
  }

  /**
   * Emit an event
   */
  private emit(event: KernelEvent, data: unknown): void {
    const handlers = this._eventHandlers.get(event)
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(data)
        } catch (error) {
          // Ignore handler errors
          console.error(`Error in event handler for ${event}:`, error)
        }
      }
    }
  }

  /**
   * Check if a class is blocked by blocklist
   */
  private isBlocked(className: string): boolean {
    for (const pattern of this._config.blocklist) {
      if (typeof pattern === 'string') {
        if (className === pattern) {
          return true
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(className)) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Expand safelist patterns into actual class names
   * Now properly handles RegExp and object patterns
   */
  private expandSafelist(): string[] {
    const classes: string[] = []
    const allRules = this.getRules()

    for (const item of this._config.safelist) {
      if (typeof item === 'string') {
        // Direct class name - add as-is
        classes.push(item)
      } else if (item instanceof RegExp) {
        // RegExp pattern - expand against all registered rules
        for (const rule of allRules) {
          const ruleName = rule.name || ''
          if (item.test(ruleName)) {
            // Add base rule
            classes.push(ruleName)
          }
        }
      } else if (typeof item === 'object' && 'pattern' in item) {
        // SafelistPattern with specific variants/breakpoints
        const safelistPattern = item as SafelistPattern
        const pattern = safelistPattern.pattern instanceof RegExp
          ? safelistPattern.pattern
          : new RegExp(safelistPattern.pattern)

        for (const rule of allRules) {
          const ruleName = rule.name || ''
          if (pattern.test(ruleName)) {
            // Add base rule
            classes.push(ruleName)

            // Add specified variants
            for (const variant of safelistPattern.variants || []) {
              classes.push(`${variant}:${ruleName}`)
            }

            // Add specified breakpoints
            for (const bp of safelistPattern.breakpoints || []) {
              classes.push(`${bp}:${ruleName}`)
            }
          }
        }
      }
    }

    return dedupeStrings(classes)
  }
}

/**
 * Create a new CoralCSS instance
 *
 * @example
 * ```typescript
 * import { createCoral, presetCoral } from '@coral-css/core'
 *
 * const coral = createCoral({
 *   presets: [presetCoral()],
 *   theme: {
 *     colors: {
 *       brand: '#ff6b6b'
 *     }
 *   }
 * })
 *
 * const css = coral.generate(['p-4', 'bg-brand'])
 * ```
 */
export function createCoral(options?: CoralOptions): Coral {
  return new Kernel(options)
}
