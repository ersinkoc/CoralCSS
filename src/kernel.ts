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
} from './types'
import {
  PluginDependencyError,
  PluginNotFoundError,
  createConfigError,
} from './errors'
import { CSSCache, createCache } from './core/cache'
import { Matcher, createMatcher } from './core/matcher'
import { Generator, createGenerator, sortGeneratedCSS } from './core/generator'
import { Transformer, createTransformer } from './core/transformer'
import { Extractor, createExtractor } from './core/extractor'
import { parse, parseClasses, expandVariantGroups } from './core/parser'
import { dedupeStrings } from './utils/string'

/**
 * Default configuration values
 */
const defaultConfig: ResolvedConfig = {
  presets: [],
  plugins: [],
  theme: {} as Theme,
  darkMode: 'class',
  darkModeSelector: '.dark',
  prefix: '',
  features: {
    variantGroups: true,
    attributify: false,
  },
  content: [],
}

/**
 * Deep merge utility
 */
function deepMerge<T extends object>(target: T, ...sources: DeepPartial<T>[]): T {
  const result = { ...target }

  for (const source of sources) {
    if (!source) {
      continue
    }

    for (const key of Object.keys(source) as (keyof T)[]) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (
        sourceValue !== undefined &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue)
      ) {
        if (
          typeof targetValue === 'object' &&
          targetValue !== null &&
          !Array.isArray(targetValue)
        ) {
          result[key] = deepMerge(targetValue as object, sourceValue as object) as T[keyof T]
        } else {
          result[key] = { ...sourceValue } as T[keyof T]
        }
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[keyof T]
      }
    }
  }

  return result
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
  private _cache: CSSCache
  private _matcher: Matcher
  private _generator: Generator
  private _transformer: Transformer
  private _extractor: Extractor
  private _initialized: boolean

  constructor(options: CoralOptions = {}) {
    this._plugins = new Map()
    this._rules = new Map()
    this._variants = new Map()
    this._components = new Map()
    this._eventHandlers = new Map()
    this._cache = createCache()
    this._matcher = createMatcher()
    this._initialized = false

    // Resolve configuration
    this._config = this.resolveConfig(options)

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
    this.callOnReady()
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

    // Generate CSS for each class
    const cssItems: GeneratedCSS[] = []
    const uncachedClasses: ParsedClass[] = []

    for (const className of expandedClasses) {
      // Check cache
      const cached = this._cache.get(className)
      if (cached !== undefined) {
        this.emit('cache:hit', { className })
        // Parse cached CSS back - skip for now, just track we need to handle this
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

    // Also include cached CSS
    for (const className of expandedClasses) {
      const cached = this._cache.get(className)
      if (cached && !cssStrings.includes(cached)) {
        cssStrings.push(cached)
      }
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
        self._cache.clear() // Clear cache when theme changes
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
          if (typeof current === 'object') {
            current = (current as Record<string, unknown>)[part]
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
