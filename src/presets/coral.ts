/**
 * Coral Preset
 *
 * The default CoralCSS preset with all core features.
 * @module presets/coral
 */

import type { Plugin, CoralOptions, DarkModeStrategy } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Coral preset options
 */
export interface CoralPresetOptions {
  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Dark mode selector (for class or selector strategy)
   * @default '.dark'
   */
  darkModeSelector?: string

  /**
   * Include modern CSS features plugin
   * @default true
   */
  modernCSS?: boolean

  /**
   * Prefix for all classes
   * @default ''
   */
  prefix?: string
}

/**
 * Create the Coral preset
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { coralPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [coralPreset()],
 * })
 * ```
 */
export function coralPreset(options: CoralPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
    modernCSS = true,
  } = options

  const plugins: Plugin[] = []

  // Get core plugins but filter out the default dark mode variant
  const core = corePlugins().filter((p) => p.name !== 'dark-mode-variants')
  plugins.push(...core)

  // Add dark mode with custom options
  plugins.push(
    darkModeVariantsPlugin({
      strategy: darkMode,
      selector: darkModeSelector,
    })
  )

  // Add modern CSS features if enabled
  if (modernCSS) {
    plugins.push(modernCSSPlugin())
  }

  return plugins
}

/**
 * Get default Coral configuration options
 */
export function coralPresetConfig(options: CoralPresetOptions = {}): Partial<CoralOptions> {
  return {
    prefix: options.prefix ?? '',
    darkMode: options.darkMode ?? 'class',
  }
}

export default coralPreset
