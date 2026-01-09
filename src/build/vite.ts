/**
 * Vite Plugin
 *
 * Vite plugin for CoralCSS build-time CSS generation.
 * @module build/vite
 */

import type { Plugin as VitePlugin } from 'vite'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * Vite plugin options
 */
export interface VitePluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['**\/*.{html,jsx,tsx,vue,svelte,astro}']
   */
  include?: string[]

  /**
   * File patterns to exclude
   * @default ['node_modules/**']
   */
  exclude?: string[]

  /**
   * Output CSS file path
   * @default 'virtual:coral.css'
   */
  output?: string

  /**
   * Whether to minify CSS in production
   * @default true
   */
  minify?: boolean

  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Custom preset to use
   */
  preset?: 'coral' | 'wind' | 'mini' | 'full'
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

/**
 * Create Vite plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // vite.config.ts
 * import { defineConfig } from 'vite'
 * import coral from '@coral-css/core/vite'
 *
 * export default defineConfig({
 *   plugins: [
 *     coral({
 *       darkMode: 'class',
 *     }),
 *   ],
 * })
 * ```
 */
export function coralVitePlugin(options: VitePluginOptions = {}): VitePlugin {
  const {
    include = ['**/*.{html,jsx,tsx,vue,svelte,astro}'],
    exclude = ['node_modules/**'],
    output = VIRTUAL_MODULE_ID,
    minify = true,
    darkMode = 'class',
    preset = 'coral',
    ...coralOptions
  } = options

  let coral: Coral
  let seenClasses = new Set<string>()
  let generatedCSS = ''
  let isProduction = false

  return {
    name: 'coral-vite',
    enforce: 'pre',

    configResolved(config) {
      isProduction = config.command === 'build' || config.mode === 'production'

      // Initialize Coral
      coral = createCoral(coralOptions)

      // Load preset
      const plugins = coralPreset({ darkMode })
      plugins.forEach((plugin) => coral.use(plugin))
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID || id === output) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generatedCSS
      }
    },

    transform(code, id) {
      // Check if file should be processed
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      const shouldExclude = exclude.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      if (!shouldProcess || shouldExclude) {
        return null
      }

      // Extract classes from code
      const newClasses = extractClassesFromCode(code)
      let hasNewClasses = false

      for (const cls of newClasses) {
        if (!seenClasses.has(cls)) {
          seenClasses.add(cls)
          hasNewClasses = true
        }
      }

      // Regenerate CSS if new classes found
      if (hasNewClasses) {
        const classes = Array.from(seenClasses)
        generatedCSS = coral.generate(classes)

        if (isProduction && minify) {
          generatedCSS = minifyCSS(generatedCSS)
        }
      }

      return null
    },

    handleHotUpdate({ file, server }) {
      // Check if file should trigger CSS regeneration
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(file)
      })

      if (shouldProcess) {
        // Invalidate virtual module to trigger reload
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (module) {
          server.moduleGraph.invalidateModule(module)
          return [module]
        }
      }
    },
  }
}

/**
 * Extract classes from code
 */
function extractClassesFromCode(code: string): string[] {
  const classes = new Set<string>()

  // Match class="..." and className="..."
  const classAttrRegex = /(?:class|className)=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) classes.add(cls)
      })
    }
  }

  // Match class={`...`} template literals (JSX)
  const templateRegex = /(?:class|className)=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      // Extract static parts (not ${...})
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      const classList = staticParts.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) classes.add(cls)
      })
    }
  }

  // Match class={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) classes.add(cls)
      })
    }
  }

  return Array.from(classes)
}

/**
 * Simple CSS minification
 */
function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around special chars
    .replace(/;}/g, '}') // Remove last semicolon
    .trim()
}

export default coralVitePlugin
