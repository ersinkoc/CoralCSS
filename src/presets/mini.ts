/**
 * Mini Preset
 *
 * Minimal preset with only essential utilities.
 * @module presets/mini
 */

import type { Plugin, DarkModeStrategy } from '../types'
import {
  spacingPlugin,
  sizingPlugin,
  colorsPlugin,
  typographyPlugin,
  layoutPlugin,
  flexboxPlugin,
  bordersPlugin,
} from '../plugins/core/utilities'
import {
  pseudoVariantsPlugin,
  responsiveVariantsPlugin,
  darkModeVariantsPlugin,
} from '../plugins/core/variants'

/**
 * Mini preset options
 */
export interface MiniPresetOptions {
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
}

/**
 * Create the Mini preset
 *
 * This preset includes only the most essential utilities:
 * - Spacing (padding, margin, gap)
 * - Sizing (width, height)
 * - Colors (background, text, border)
 * - Typography (font, text)
 * - Layout (display, position)
 * - Flexbox
 * - Borders
 *
 * Variants:
 * - Pseudo-classes (hover, focus, etc.)
 * - Responsive breakpoints
 * - Dark mode
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { miniPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [miniPreset()],
 * })
 * ```
 */
export function miniPreset(options: MiniPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
  } = options

  return [
    // Essential utilities
    spacingPlugin(),
    sizingPlugin(),
    colorsPlugin(),
    typographyPlugin(),
    layoutPlugin(),
    flexboxPlugin(),
    bordersPlugin(),

    // Essential variants
    pseudoVariantsPlugin(),
    responsiveVariantsPlugin(),
    darkModeVariantsPlugin({
      strategy: darkMode,
      selector: darkModeSelector,
    }),
  ]
}

export default miniPreset
