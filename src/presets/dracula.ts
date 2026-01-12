/**
 * Dracula Theme Preset for CoralCSS
 *
 * A dark color palette for a sleek and modern design.
 * Based on the Dracula theme: https://draculatheme.com/
 *
 * @module presets/dracula
 */

import type { Plugin } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Dracula theme preset options
 */
export interface DraculaPresetOptions {
  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  /** Dark mode selector (for class or selector strategy) */
  darkModeSelector?: string
  /** Enable high contrast mode */
  highContrast?: boolean
  /** Enable bold accents */
  boldAccents?: boolean
}

/**
 * Dracula color palette
 */
const draculaColors = {
  // Background
  background: '#282a36',
  current: '#282a36',
  foreground: '#f8f8f2',
  comment: '#6272a4',

  // Core colors
  'dracula-bg': '#282a36',
  'dracula-current': '#282a36',
  'dracula-fg': '#f8f8f2',
  'dracula-comment': '#6272a4',

  // Cyan
  'dracula-cyan': '#8be9fd',
  cyan: '#8be9fd',

  // Green
  'dracula-green': '#50fa7b',
  green: '#50fa7b',

  // Orange
  'dracula-orange': '#ffb86c',
  orange: '#ffb86c',

  // Pink
  'dracula-pink': '#ff79c6',
  pink: '#ff79c6',

  // Purple
  'dracula-purple': '#bd93f9',
  purple: '#bd93f9',

  // Red
  'dracula-red': '#ff5555',
  red: '#ff5555',

  // Yellow
  'dracula-yellow': '#f1fa8c',
  yellow: '#f1fa8c',

  // Semantic mappings
  primary: '#bd93f9',      // Purple
  secondary: '#ff79c6',    // Pink
  accent: '#8be9fd',       // Cyan
  success: '#50fa7b',      // Green
  warning: '#f1fa8c',      // Yellow
  error: '#ff5555',        // Red
  info: '#8be9fd',         // Cyan

  // UI colors
  surface: '#44475a',
  card: '#44475a',
  border: '#44475a',
  muted: '#6272a4',
  'muted-foreground': '#f8f8f2',
}

/**
 * Dracula spacing scale
 */
const draculaSpacing = {
  'dracula-xs': '4px',
  'dracula-sm': '8px',
  'dracula-md': '16px',
  'dracula-lg': '24px',
  'dracula-xl': '32px',
  'dracula-2xl': '48px',
}

/**
 * Dracula border radius (slightly rounded)
 */
const draculaBorderRadius = {
  'dracula-sm': '4px',
  'dracula-md': '8px',
  'dracula-lg': '12px',
  'dracula-xl': '16px',
  'dracula-2xl': '24px',
}

/**
 * Dracula box shadows (glowing effects)
 */
const draculaBoxShadow = {
  'dracula-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
  'dracula-md': '0 4px 6px rgba(0, 0, 0, 0.4)',
  'dracula-lg': '0 10px 15px rgba(0, 0, 0, 0.5)',
  'dracula-glow-purple': '0 0 20px rgba(189, 147, 249, 0.3)',
  'dracula-glow-pink': '0 0 20px rgba(255, 121, 198, 0.3)',
  'dracula-glow-cyan': '0 0 20px rgba(139, 233, 253, 0.3)',
  'dracula-glow-green': '0 0 20px rgba(80, 250, 123, 0.3)',
}

/**
 * Dracula theme preset
 *
 * @example
 * ```ts
 * import { createCoral } from '@coral-css/core'
 * import { draculaPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   plugins: draculaPreset({ boldAccents: true })
 * })
 * ```
 */
export function draculaPreset(options: DraculaPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'media',
    darkModeSelector = '.dark',
    highContrast = false,
    boldAccents = false,
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

  // Dracula theme plugin
  plugins.push({
    name: 'dracula-theme',
    version: '1.0.0',
    install(api) {
      let colors = { ...draculaColors }

      // High contrast mode
      if (highContrast) {
        colors = {
          ...colors,
          'dracula-fg': '#ffffff',
          foreground: '#ffffff'
        }
      }

      // Bold accents mode
      if (boldAccents) {
        colors = {
          ...colors,
          'dracula-purple': '#d6aaff',
          'dracula-pink': '#ff99cc',
          'dracula-cyan': '#a3ffff',
          'dracula-green': '#70ff9a'
        }
      }

      api.extendTheme({
        colors,
        spacing: draculaSpacing,
        borderRadius: draculaBorderRadius,
        boxShadow: draculaBoxShadow,
      })
    },
  })

  return plugins
}

/**
 * Get default Dracula preset configuration
 */
export function draculaPresetConfig(options: DraculaPresetOptions = {}) {
  return {
    darkMode: options.darkMode ?? 'media',
    theme: {
      colors: draculaColors,
      spacing: draculaSpacing,
      borderRadius: draculaBorderRadius,
      boxShadow: draculaBoxShadow,
    },
  }
}
