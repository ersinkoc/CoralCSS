/**
 * Wind Preset
 *
 * Tailwind-compatible preset for easy migration.
 * @module presets/wind
 */

import type { Plugin, DarkModeStrategy } from '../types'
import { corePlugins } from '../plugins/core'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Wind preset options
 */
export interface WindPresetOptions {
  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Dark mode selector
   * @default '.dark'
   */
  darkModeSelector?: string

  /**
   * Prefix for all classes (like Tailwind's prefix option)
   * @default ''
   */
  prefix?: string
}

/**
 * Create the Wind preset (Tailwind-compatible)
 *
 * This preset aims for maximum compatibility with Tailwind CSS classes,
 * making it easy to migrate existing projects.
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { windPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [windPreset()],
 * })
 * ```
 */
export function windPreset(options: WindPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
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

  // Note: Wind preset is intentionally similar to Coral preset
  // but without modern CSS features by default for broader compatibility

  return plugins
}

export default windPreset
