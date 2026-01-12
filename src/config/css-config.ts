/**
 * CSS Configuration Plugin
 *
 * Integrates CSS-first configuration with CoralCSS core.
 * Allows loading configuration from CSS files using @coral directives.
 *
 * @module config/css-config
 */

import type { Plugin, PluginAPI, CoralOptions } from '../types'
import { parseCSSConfig, mergeConfigs, validateCSSConfig } from './css-parser'
import { readFileSync } from 'fs'
import { resolve } from 'path'

/**
 * CSS Config Plugin Options
 */
export interface CSSConfigPluginOptions {
  /**
   * Path to CSS config file
   */
  cssConfig?: string

  /**
   * Enable/disable CSS config parsing
   */
  enabled?: boolean

  /**
   * Watch CSS config file for changes
   */
  watch?: boolean

  /**
   * Inline CSS config (as string)
   */
  inlineConfig?: string
}

/**
 * Load CSS config from file path
 */
function loadCSSConfig(filePath: string): string {
  try {
    const resolvedPath = resolve(filePath)
    return readFileSync(resolvedPath, 'utf-8')
  } catch (error) {
    console.warn(`Could not load CSS config from ${filePath}:`, error)
    return ''
  }
}

/**
 * CSS Configuration Plugin
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { cssConfigPlugin } from '@coral-css/core/config'
 *
 * const coral = createCoral({
 *   plugins: [
 *     cssConfigPlugin({
 *       cssConfig: './coral.css'
 *     })
 *   ]
 * })
 * ```
 */
export function cssConfigPlugin(options: CSSConfigPluginOptions = {}): Plugin {
  const {
    cssConfig,
    enabled = true,
    watch = false,
    inlineConfig,
  } = options

  return {
    name: 'css-config',
    version: '1.0.0',
    install(api: PluginAPI) {
      if (!enabled) return

      let cssContent = ''

      // Load CSS config from file or inline
      if (inlineConfig) {
        cssContent = inlineConfig
      } else if (cssConfig) {
        cssContent = loadCSSConfig(cssConfig)
      }

      if (!cssContent) return

      // Validate CSS config
      const validation = validateCSSConfig(cssContent)
      if (!validation.valid) {
        console.warn('CSS config validation errors:', validation.errors)
      }

      // Parse CSS config
      const parsedConfig = parseCSSConfig(cssContent)

      // Apply theme variables
      if (parsedConfig.theme) {
        api.extendTheme(parsedConfig.theme as any)
      }

      // Apply source/content configuration
      if (parsedConfig.source || parsedConfig.sourceNot) {
        const contentPaths = [
          ...(parsedConfig.source || []),
          ...(parsedConfig.sourceNot?.map(s => `!${s}`) || []),
        ]

        // Store for extractor to use
        api.setData('css-config:content', contentPaths)
      }

      // Apply safelist
      if (parsedConfig.safelist) {
        api.setData('css-config:safelist', parsedConfig.safelist)
      }

      // Apply blocklist
      if (parsedConfig.blocklist) {
        api.setData('css-config:blocklist', parsedConfig.blocklist)
      }

      // Apply presets
      if (parsedConfig.presets) {
        api.setData('css-config:presets', parsedConfig.presets)
      }

      // Apply plugin options
      if (parsedConfig.pluginOptions) {
        for (const [pluginName, pluginOpts] of Object.entries(parsedConfig.pluginOptions)) {
          api.setData(`css-config:plugin:${pluginName}`, pluginOpts)
        }
      }

      // Apply disabled plugins
      if (parsedConfig.disabledPlugins) {
        api.setData('css-config:disabled-plugins', parsedConfig.disabledPlugins)
      }

      // Watch CSS config file for changes
      if (watch && cssConfig) {
        // In a real implementation, this would set up a file watcher
        api.setData('css-config:watch-file', cssConfig)
      }

      // Emit config loaded event
      api.emit('css-config:loaded', parsedConfig)
    },
  }
}

/**
 * Create CoralCSS instance with CSS config
 *
 * Convenience function to create CoralCSS with CSS-based configuration.
 *
 * @example
 * ```typescript
 * import { createCoralWithCSS } from '@coral-css/core/config'
 *
 * const coral = createCoralWithCSS({
 *   cssConfig: './coral.css',
 *   // Additional JS config can be merged
 *   theme: {
 *     colors: {
 *       brand: '#ff6b6b'
 *     }
 *   }
 * })
 * ```
 */
export function createCoralWithCSS(options: CoralOptions & CSSConfigPluginOptions): any {
  const { cssConfig, inlineConfig, ...jsConfig } = options

  // Parse CSS config
  let cssContent = ''
  if (inlineConfig) {
    cssContent = inlineConfig
  } else if (cssConfig) {
    cssContent = loadCSSConfig(cssConfig)
  }

  const parsedCSSConfig = cssContent ? parseCSSConfig(cssContent) : {}

  // Merge configs (CSS takes precedence)
  const mergedConfig = mergeConfigs(jsConfig, parsedCSSConfig)

  // Return the merged config for use with createCoral
  return mergedConfig
}

/**
 * Generate CSS config template
 *
 * Creates a template CSS config file with all available options.
 */
export function generateCSSConfigTemplate(): string {
  return `/**
 * CoralCSS Configuration
 *
 * Configure CoralCSS using CSS instead of JavaScript.
 */

/* ========================================
 * THEME CONFIGURATION
 * ======================================== */

@coral theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', 'Consolas', monospace;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* ========================================
 * SOURCE / CONTENT CONFIGURATION
 * ======================================== */

/* Scan these files for utility classes */
@coral source "./src/**/*.{html,js,ts,jsx,tsx,svelte,vue}";

/* Ignore specific paths */
@coral source not "./src/**/legacy/**";
@coral source not "./dist/**";
@coral source not "./node_modules/**";

/* Always include specific utilities (safelist) */
@coral source inline("hover:bg-red-500");
@coral source inline("{sm:,md:}p-4");
@coral source inline("{hover:,focus:}text-coral-500");

/* Never generate specific utilities (blocklist) */
@coral source not inline("container");

/* ========================================
 * PLUGIN CONFIGURATION
 * ======================================== */

/* Enable specific plugins */
@coral plugin gradients;
@coral plugin patterns;
@coral plugin masks;
@coral plugin text-shadows;

/* Disable specific plugins */
@coral plugin no animations;
@coral plugin no backdrop;

/* Configure dark mode */
@coral plugin dark-mode class .dark;

/* Add prefix to all utilities */
@coral plugin prefix coral-;

/* ========================================
 * PRESET CONFIGURATION
 * ======================================== */

/* Use a preset */
@coral preset github;

/* Extend a preset with custom theme values */
@coral preset github {
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
}

/* Mix multiple presets */
@coral preset nord, dracula;
`
}

export default cssConfigPlugin
