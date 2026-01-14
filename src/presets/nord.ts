/**
 * Nord Theme Preset for CoralCSS
 *
 * An arctic, north-bluish color palette for a clean and focused design.
 * Based on the Nord theme: https://www.nordtheme.com/
 *
 * @module presets/nord
 */

import type { Plugin, DeepPartial, Theme } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Nord theme preset options
 */
export interface NordPresetOptions {
  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  /** Dark mode selector (for class or selector strategy) */
  darkModeSelector?: string
  /** Enable polar night (darker) variant */
  polarNight?: boolean
  /** Enable frost (lighter) variant */
  frost?: boolean
  /** Enable aurora (accent) variant */
  aurora?: boolean
}

/**
 * Nord color palette
 */
const nordColors = {
  // Polar Night (dark backgrounds)
  'nord-0': '#2E3440',  // Polar Night
  'nord-1': '#3B4252',  // Snow Storm
  'nord-2': '#434C5E',  // Snow Storm
  'nord-3': '#4C566A',  // Snow Storm

  // Snow Storm (light backgrounds)
  'nord-4': '#D8DEE9',  // Snow Storm
  'nord-5': '#E5E9F0',  // Snow Storm
  'nord-6': '#ECEFF4',  // Snow Storm

  // Frost (content)
  'nord-7': '#8FBCBB',  // Frost
  'nord-8': '#88C0D0',  // Frost
  'nord-9': '#81A1C1',  // Frost
  'nord-10': '#5E81AC', // Frost

  // Aurora (accents)
  'nord-11': '#BF616A', // Aurora (red)
  'nord-12': '#D08770', // Aurora (orange)
  'nord-13': '#EBCB8B', // Aurora (yellow)
  'nord-14': '#A3BE8C', // Aurora (green)
  'nord-15': '#B48EAD', // Aurora (purple)

  // Semantic mappings
  primary: '#5E81AC',     // Nord-10 (blue)
  secondary: '#81A1C1',   // Nord-9 (light blue)
  accent: '#88C0D0',      // Nord-8 (cyan)
  success: '#A3BE8C',     // Nord-14 (green)
  warning: '#EBCB8B',     // Nord-13 (yellow)
  error: '#BF616A',       // Nord-11 (red)
  info: '#8FBCBB',        // Nord-7 (teal)

  // Backgrounds
  background: '#2E3440',   // Nord-0
  surface: '#3B4252',      // Nord-1
  card: '#434C5E',         // Nord-2

  // Foregrounds
  foreground: '#D8DEE9',   // Nord-4
  'foreground-muted': '#E5E9F0', // Nord-5
  border: '#4C566A',       // Nord-3
}

/**
 * Nord spacing scale (inspired by Nordic design)
 */
const nordSpacing = {
  'nord-xs': '4px',
  'nord-sm': '8px',
  'nord-md': '16px',
  'nord-lg': '24px',
  'nord-xl': '32px',
  'nord-2xl': '48px',
}

/**
 * Nord border radius (softer, rounded)
 */
const nordBorderRadius = {
  'nord-sm': '6px',
  'nord-md': '10px',
  'nord-lg': '16px',
  'nord-xl': '24px',
}

/**
 * Nord box shadows (subtle, frost-like)
 */
const nordBoxShadow = {
  'nord-sm': '0 1px 3px rgba(46, 52, 64, 0.12)',
  'nord-md': '0 4px 6px rgba(46, 52, 64, 0.16)',
  'nord-lg': '0 10px 15px rgba(46, 52, 64, 0.20)',
  'nord-xl': '0 20px 25px rgba(46, 52, 64, 0.24)',
  'nord-frost': '0 0 20px rgba(136, 192, 208, 0.15)',
}

/**
 * Nord theme preset
 *
 * @example
 * ```ts
 * import { createCoral } from '@coral-css/core'
 * import { nordPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   plugins: nordPreset({ darkMode: 'class' })
 * })
 * ```
 */
export function nordPreset(options: NordPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'media',
    darkModeSelector = '.dark',
    polarNight = true,
    frost = true,
    aurora = true,
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

  // Nord theme plugin
  plugins.push({
    name: 'nord-theme',
    version: '1.0.0',
    install(api) {
      api.extendTheme({
        colors: nordColors,
        ...(polarNight && { spacing: nordSpacing }),
        ...(frost && { borderRadius: nordBorderRadius }),
        ...(aurora && { boxShadow: nordBoxShadow }),
      } as DeepPartial<Theme>)
    },
  })

  return plugins
}

/**
 * Get default Nord preset configuration
 */
export function nordPresetConfig(options: NordPresetOptions = {}) {
  return {
    darkMode: options.darkMode ?? 'media',
    theme: {
      colors: nordColors,
      spacing: nordSpacing,
      borderRadius: nordBorderRadius,
      boxShadow: nordBoxShadow,
    },
  }
}
