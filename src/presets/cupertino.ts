/**
 * Cupertino Preset
 *
 * A preset inspired by Apple's iOS/macOS design language.
 * @module presets/cupertino
 */

import type { Plugin, DarkModeStrategy } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Cupertino preset options
 */
export interface CupertinoPresetOptions {
  /**
   * Dark mode strategy
   * @default 'media'
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
   * Primary color (system blue)
   * @default '#007AFF'
   */
  primary?: string

  /**
   * Secondary color (system gray)
   * @default '#8E8E93'
   */
  secondary?: string

  /**
   * Success color (system green)
   * @default '#34C759'
   */
  success?: string

  /**
   * Warning color (system orange)
   * @default '#FF9500'
   */
  warning?: string

  /**
   * Error color (system red)
   * @default '#FF3B30'
   */
  error?: string

  /**
   * Background color
   * @default '#FFFFFF'
   */
  background?: string

  /**
   * Surface color (system gray)
   * @default '#F2F2F7'
   */
  surface?: string

  /**
   * Use SF Pro font stack
   * @default true
   */
  useSFPro?: boolean
}

/**
 * Create the Cupertino preset
 *
 * @example
 * ```typescript
 * import { createCoral } from '@coral-css/core'
 * import { cupertinoPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   presets: [cupertinoPreset()],
 * })
 * ```
 */
export function cupertinoPreset(options: CupertinoPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'media',
    darkModeSelector = '.dark',
    modernCSS = true,
    primary = '#007AFF',
    secondary = '#8E8E93',
    success = '#34C759',
    warning = '#FF9500',
    error = '#FF3B30',
    background = '#FFFFFF',
    surface = '#F2F2F7',
    useSFPro = true,
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

  // Add Cupertino specific theme plugin
  plugins.push({
    name: 'cupertino-theme',
    version: '1.0.0',
    install(api) {
      // Extend theme with Cupertino colors
      api.extendTheme({
        colors: {
          // System colors
          primary,
          'primary-light': lighten(primary, 15),
          'primary-dark': darken(primary, 15),
          secondary,
          success,
          'success-light': lighten(success, 15),
          'success-dark': darken(success, 15),
          warning,
          'warning-light': lighten(warning, 15),
          'warning-dark': darken(warning, 15),
          error,
          'error-light': lighten(error, 15),
          'error-dark': darken(error, 15),
          background,
          surface,
          'surface-light': '#FAFAFC',
          'surface-dark': '#E5E5EA',

          // iOS specific colors
          'ios-blue': '#007AFF',
          'ios-green': '#34C759',
          'ios-indigo': '#5856D6',
          'ios-orange': '#FF9500',
          'ios-pink': '#FF2D55',
          'ios-purple': '#AF52DE',
          'ios-red': '#FF3B30',
          'ios-teal': '#5AC8FA',
          'ios-yellow': '#FFCC00',

          // Label colors
          label: secondary,
          'label-light': '#C7C7CC',
          'label-dark': '#636366',

          // Fill colors
          fill: surface,
          'fill-light': '#F9F9F9',
          'fill-dark': '#E5E5EA',

          // Separator colors
          separator: '#C6C6C8',
          'separator-light': '#E5E5EA',
          'separator-dark': '#D1D1D6',
        },
        fonts: useSFPro ? {
          sans: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"SF Pro Display"',
            '"SF Pro Text"',
            'Roboto',
            'Helvetica',
            'Arial',
            'sans-serif',
          ],
        } : {},
        fontSizes: {
          'ios-caption-1': '11px',
          'ios-caption-2': '12px',
          'ios-footnote': '13px',
          'ios-subheadline': '14px',
          'ios-callout': '15px',
          'ios-body': '16px',
          'ios-headline': '17px',
          'ios-title-3': '20px',
          'ios-title-2': '22px',
          'ios-title-1': '28px',
          'ios-large-title': '34px',
        },
        borderRadius: {
          'ios-sm': '6px',
          'ios-md': '10px',
          'ios-lg': '14px',
          'ios-xl': '18px',
        },
        boxShadow: {
          'ios-sm': '0 1px 2px rgba(0,0,0,0.05)',
          'ios-md': '0 2px 8px rgba(0,0,0,0.08)',
          'ios-lg': '0 4px 16px rgba(0,0,0,0.10)',
          'ios-xl': '0 8px 32px rgba(0,0,0,0.12)',
        },
        spacing: {
          'ios-safe-area-top': 'env(safe-area-inset-top)',
          'ios-safe-area-bottom': 'env(safe-area-inset-bottom)',
          'ios-safe-area-left': 'env(safe-area-inset-left)',
          'ios-safe-area-right': 'env(safe-area-inset-right)',
        },
      })
    },
  })

  return plugins
}

/**
 * Get default Cupertino configuration options
 */
export function cupertinoPresetConfig(options: CupertinoPresetOptions = {}) {
  return {
    darkMode: options.darkMode ?? 'media',
  }
}

export default cupertinoPreset

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
