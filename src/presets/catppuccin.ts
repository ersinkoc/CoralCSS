/**
 * Catppuccin Theme Preset for CoralCSS
 *
 * A soothing pastel theme with 4 delicious flavors.
 * Based on the Catppuccin theme: https://catppuccin.com/
 *
 * @module presets/catppuccin
 */

import type { Plugin, DeepPartial, Theme } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * Catppuccin flavors
 */
export type CatppuccinFlavor = 'latte' | 'frappe' | 'macchiato' | 'mocha'

/**
 * Catppuccin theme preset options
 */
export interface CatppuccinPresetOptions {
  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  /** Dark mode selector (for class or selector strategy) */
  darkModeSelector?: string
  /** Catppuccin flavor (default: 'mocha') */
  flavor?: CatppuccinFlavor
  /** Enable accent color overrides */
  accentColor?: string
}

/**
 * Catppuccin Latte (light) color palette
 */
const latteColors = {
  // Base colors
  'rosewater': '#dc8a78',
  'flamingo': '#dd7878',
  'pink': '#ea76cb',
  'mauve': '#8839ef',
  'red': '#d20f39',
  'maroon': '#e64553',
  'peach': '#fe640b',
  'yellow': '#df8e1d',
  'green': '#40a02b',
  'teal': '#179299',
  'sky': '#04a5e5',
  'sapphire': '#209fb5',
  'blue': '#1e66f5',
  'lavender': '#7287fd',
  'text': '#4c4f69',
  'subtext1': '#5c5f77',
  'subtext0': '#6c6f85',
  'overlay2': '#7c7f93',
  'overlay1': '#8c8fa1',
  'overlay0': '#9ca0b0',
  'surface2': '#acb0be',
  'surface1': '#bcc0cc',
  'surface0': '#ccd0da',
  'base': '#eff1f5',
  'mantle': '#e6e9ef',
  'crust': '#dce0e8',

  // Semantic mappings
  primary: '#1e66f5',      // Blue
  secondary: '#8839ef',    // Mauve
  accent: '#ea76cb',       // Pink
  success: '#40a02b',      // Green
  warning: '#df8e1d',      // Yellow
  error: '#d20f39',        // Red
  info: '#209fb5',         // Sapphire

  // UI colors
  background: '#eff1f5',   // Base
  surface: '#e6e9ef',      // Mantle
  card: '#ffffff',
  foreground: '#4c4f69',   // Text
  'foreground-muted': '#6c6f85', // Subtext0
  border: '#ccd0da',       // Surface0
}

/**
 * Catppuccin Frappé color palette
 */
const frappeColors = {
  // Base colors
  'rosewater': '#f2d5cf',
  'flamingo': '#eebebe',
  'pink': '#f4b8e4',
  'mauve': '#ca9ee6',
  'red': '#e78284',
  'maroon': '#ea999c',
  'peach': '#ef9f76',
  'yellow': '#e5c890',
  'green': '#a6d189',
  'teal': '#81c8be',
  'sky': '#99d1db',
  'sapphire': '#85c1dc',
  'blue': '#8caaee',
  'lavender': '#babbf1',
  'text': '#c6d0f5',
  'subtext1': '#b5bfe2',
  'subtext0': '#a5adce',
  'overlay2': '#949cbb',
  'overlay1': '#838ba7',
  'overlay0': '#737994',
  'surface2': '#626880',
  'surface1': '#51576d',
  'surface0': '#414559',
  'base': '#303446',
  'mantle': '#292c3c',
  'crust': '#232634',

  // Semantic mappings
  primary: '#8caaee',      // Blue
  secondary: '#ca9ee6',    // Mauve
  accent: '#f4b8e4',       // Pink
  success: '#a6d189',      // Green
  warning: '#e5c890',      // Yellow
  error: '#e78284',        // Red
  info: '#85c1dc',         // Sapphire

  // UI colors
  background: '#303446',   // Base
  surface: '#292c3c',      // Mantle
  card: '#414559',         // Surface0
  foreground: '#c6d0f5',   // Text
  'foreground-muted': '#a5adce', // Subtext0
  border: '#414559',       // Surface0
}

/**
 * Catppuccin Macchiato color palette
 */
const macchiatoColors = {
  // Base colors
  'rosewater': '#f4dbd6',
  'flamingo': '#f0c6c6',
  'pink': '#f5bde6',
  'mauve': '#c6a0f6',
  'red': '#ed8796',
  'maroon': '#ee99a0',
  'peach': '#f5a97f',
  'yellow': '#eed49f',
  'green': '#a6da95',
  'teal': '#8bd5ca',
  'sky': '#91d7e3',
  'sapphire': '#7dc4e4',
  'blue': '#8aadf4',
  'lavender': '#b7bdf8',
  'text': '#cad3f5',
  'subtext1': '#b8c0e0',
  'subtext0': '#a5adcb',
  'overlay2': '#939ab7',
  'overlay1': '#8087a2',
  'overlay0': '#6e738d',
  'surface2': '#5b6078',
  'surface1': '#4b5569',
  'surface0': '#3c4159',
  'base': '#24273a',
  'mantle': '#1e2030',
  'crust': '#181926',

  // Semantic mappings
  primary: '#8aadf4',      // Blue
  secondary: '#c6a0f6',    // Mauve
  accent: '#f5bde6',       // Pink
  success: '#a6da95',      // Green
  warning: '#eed49f',      // Yellow
  error: '#ed8796',        // Red
  info: '#7dc4e4',         // Sapphire

  // UI colors
  background: '#24273a',   // Base
  surface: '#1e2030',      // Mantle
  card: '#3c4159',         // Surface0
  foreground: '#cad3f5',   // Text
  'foreground-muted': '#a5adcb', // Subtext0
  border: '#3c4159',       // Surface0
}

/**
 * Catppuccin Mocha color palette (default dark)
 */
const mochaColors = {
  // Base colors
  'rosewater': '#f5e0dc',
  'flamingo': '#f2cdcd',
  'pink': '#f5c2e7',
  'mauve': '#cba6f7',
  'red': '#f38ba8',
  'maroon': '#eba0ac',
  'peach': '#fab387',
  'yellow': '#f9e2af',
  'green': '#a6e3a1',
  'teal': '#94e2d5',
  'sky': '#89dceb',
  'sapphire': '#74c7ec',
  'blue': '#89b4fa',
  'lavender': '#b4befe',
  'text': '#cdd6f4',
  'subtext1': '#bac2de',
  'subtext0': '#a6adc8',
  'overlay2': '#9399b2',
  'overlay1': '#7f849c',
  'overlay0': '#6c7086',
  'surface2': '#585b70',
  'surface1': '#45475a',
  'surface0': '#313244',
  'base': '#1e1e2e',
  'mantle': '#181825',
  'crust': '#11111b',

  // Semantic mappings
  primary: '#89b4fa',      // Blue
  secondary: '#cba6f7',    // Mauve
  accent: '#f5c2e7',       // Pink
  success: '#a6e3a1',      // Green
  warning: '#f9e2af',      // Yellow
  error: '#f38ba8',        // Red
  info: '#74c7ec',         // Sapphire

  // UI colors
  background: '#1e1e2e',   // Base
  surface: '#181825',      // Mantle
  card: '#313244',         // Surface0
  foreground: '#cdd6f4',   // Text
  'foreground-muted': '#a6adc8', // Subtext0
  border: '#313244',       // Surface0
}

/**
 * Get colors for a specific flavor
 */
function getFlavorColors(flavor: CatppuccinFlavor): Record<string, string> {
  switch (flavor) {
    case 'latte':
      return latteColors
    case 'frappe':
      return frappeColors
    case 'macchiato':
      return macchiatoColors
    case 'mocha':
    default:
      return mochaColors
  }
}

/**
 * Catppuccin spacing scale
 */
const catppuccinSpacing = {
  'ctp-xs': '4px',
  'ctp-sm': '8px',
  'ctp-md': '16px',
  'ctp-lg': '24px',
  'ctp-xl': '32px',
  'ctp-2xl': '48px',
}

/**
 * Catppuccin border radius (soft and rounded)
 */
const catppuccinBorderRadius = {
  'ctp-sm': '6px',
  'ctp-md': '10px',
  'ctp-lg': '16px',
  'ctp-xl': '24px',
}

/**
 * Catppuccin box shadows (soft, pastel-like)
 */
const catppuccinBoxShadow = {
  'ctp-sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
  'ctp-md': '0 4px 6px rgba(0, 0, 0, 0.15)',
  'ctp-lg': '0 10px 15px rgba(0, 0, 0, 0.2)',
  'ctp-xl': '0 20px 25px rgba(0, 0, 0, 0.25)',
  'ctp-glow': '0 0 20px rgba(203, 166, 247, 0.2)', // Mauve glow
}

/**
 * Catppuccin theme preset
 *
 * @example
 * ```ts
 * import { createCoral } from '@coral-css/core'
 * import { catppuccinPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   plugins: catppuccinPreset({ flavor: 'mocha' })
 * })
 * ```
 */
export function catppuccinPreset(options: CatppuccinPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
    flavor = 'mocha',
    accentColor,
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

  // Catppuccin theme plugin
  plugins.push({
    name: 'catppuccin-theme',
    version: '1.0.0',
    install(api) {
      let colors = { ...getFlavorColors(flavor) }

      // Apply custom accent color if provided
      if (accentColor) {
        colors.primary = accentColor
      }

      api.extendTheme({
        colors,
        spacing: catppuccinSpacing,
        borderRadius: catppuccinBorderRadius,
        boxShadow: catppuccinBoxShadow,
      } as DeepPartial<Theme>)
    },
  })

  return plugins
}

/**
 * Get default Catppuccin preset configuration
 */
export function catppuccinPresetConfig(options: CatppuccinPresetOptions = {}) {
  const flavor = options.flavor ?? 'mocha'
  return {
    darkMode: options.darkMode ?? 'class',
    theme: {
      colors: getFlavorColors(flavor),
      spacing: catppuccinSpacing,
      borderRadius: catppuccinBorderRadius,
      boxShadow: catppuccinBoxShadow,
    },
  }
}
