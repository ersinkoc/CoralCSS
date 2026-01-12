/**
 * Material Design Preset
 *
 * A preset inspired by Google's Material Design system.
 * @module presets/material
 */

import type { Plugin, DarkModeStrategy } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Material preset options
 */
export interface MaterialPresetOptions {
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
   * Primary color
   * @default '#6200EE'
   */
  primary?: string

  /**
   * Secondary color
   * @default '#03DAC6'
   */
  secondary?: string

  /**
   * Background color
   * @default '#FFFFFF'
   */
  background?: string

  /**
   * Surface color
   * @default '#FFFFFF'
   */
  surface?: string

  /**
   * Error color
   * @default '#B00020'
   */
  error?: string

  /**
   * On primary color (text on primary)
   * @default '#FFFFFF'
   */
  onPrimary?: string

  /**
   * On background color (text on background)
   * @default '#000000'
   */
  onBackground?: string

  /**
   * On surface color (text on surface)
   * @default '#000000'
   */
  onSurface?: string

  /**
   * On error color (text on error)
   * @default '#FFFFFF'
   */
  onError?: string
}

/**
 * Create the Material Design preset
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { materialPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [materialPreset()],
 * })
 * ```
 */
export function materialPreset(options: MaterialPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
    modernCSS = true,
    primary = '#6200EE',
    secondary = '#03DAC6',
    background = '#FFFFFF',
    surface = '#FFFFFF',
    error = '#B00020',
    onPrimary = '#FFFFFF',
    onBackground = '#000000',
    onSurface = '#000000',
    onError = '#FFFFFF',
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

  // Add Material Design specific theme plugin
  plugins.push({
    name: 'material-theme',
    version: '1.0.0',
    install(api) {
      // Extend theme with Material Design colors
      api.extendTheme({
        colors: {
          primary,
          'primary-light': lighten(primary, 20),
          'primary-dark': darken(primary, 20),
          secondary,
          'secondary-light': lighten(secondary, 20),
          'secondary-dark': darken(secondary, 20),
          background,
          surface,
          error,
          'error-light': lighten(error, 20),
          'error-dark': darken(error, 20),
          'on-primary': onPrimary,
          'on-background': onBackground,
          'on-surface': onSurface,
          'on-error': onError,
        },
        spacing: {
          'material-xs': '4px',
          'material-sm': '8px',
          'material-md': '16px',
          'material-lg': '24px',
          'material-xl': '48px',
        },
        borderRadius: {
          'material-sm': '4px',
          'material-md': '8px',
          'material-lg': '16px',
        },
        boxShadow: {
          'material-sm': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          'material-md': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          'material-lg': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
          'material-xl': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        },
      })
    },
  })

  return plugins
}

/**
 * Get default Material Design configuration options
 */
export function materialPresetConfig(options: MaterialPresetOptions = {}) {
  return {
    darkMode: options.darkMode ?? 'class',
  }
}

export default materialPreset

// Helper functions for color manipulation
function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, (num >> 16) + amt)
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt)
  const B = Math.min(255, (num & 0x0000FF) + amt)
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`
}

function darken(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, (num >> 16) - amt)
  const G = Math.max(0, ((num >> 8) & 0x00FF) - amt)
  const B = Math.max(0, (num & 0x0000FF) - amt)
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`
}
