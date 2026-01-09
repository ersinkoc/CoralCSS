/**
 * Full Preset
 *
 * Complete preset with all features enabled.
 * @module presets/full
 */

import type { Plugin, DarkModeStrategy } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Full preset options
 */
export interface FullPresetOptions {
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
   * Prefix for all classes
   * @default ''
   */
  prefix?: string
}

/**
 * Create the Full preset
 *
 * This preset includes everything CoralCSS has to offer:
 * - All utility plugins
 * - All variant plugins
 * - Modern CSS features (anchor positioning, scroll-driven animations, etc.)
 *
 * Use this preset when you want access to all features and don't mind
 * a slightly larger bundle size.
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { fullPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [fullPreset()],
 * })
 * ```
 */
export function fullPreset(options: FullPresetOptions = {}): Plugin[] {
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

  // Add modern CSS features
  plugins.push(modernCSSPlugin())

  return plugins
}

export default fullPreset
