/**
 * GitHub Theme Preset for CoralCSS
 *
 * GitHub's design system and color palette.
 * Includes both light and dark mode variants.
 *
 * @module presets/github
 */

import type { Plugin } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'
import { darkModeVariantsPlugin } from '../plugins/core/variants/dark'

/**
 * GitHub theme preset options
 */
export interface GitHubPresetOptions {
  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  /** Dark mode selector (for class or selector strategy) */
  darkModeSelector?: string
  /** Use GitHub's color blind safe palette */
  colorBlind?: boolean
  /** Use reduced motion */
  reducedMotion?: boolean
}

/**
 * GitHub light color palette
 */
const githubLightColors = {
  // Core colors
  primary: '#0969da',      // GitHub blue
  secondary: '#57606a',    // GitHub gray
  accent: '#1f883d',       // Success green
  success: '#1f883d',
  warning: '#9a6700',
  error: '#cf222e',
  info: '#0969da',

  // Backgrounds
  background: '#ffffff',
  surface: '#f6f8fa',
  card: '#ffffff',
  'card-alt': '#f6f8fa',

  // Foregrounds
  foreground: '#24292f',
  'foreground-muted': '#57606a',
  'foreground-faint': '#8c959f',

  // Borders
  border: '#d0d7de',
  'border-muted': '#d8dee4',
  'border-accent': '#babbbd',

  // Additional semantic colors
  'btn-primary-bg': '#2da44e',
  'btn-primary-text': '#ffffff',
  'btn-primary-hover-bg': '#2c974b',
  'btn-secondary-bg': '#f6f8fa',
  'btn-secondary-text': '#24292f',
  'btn-secondary-hover-bg': '#f3f4f6',

  // Link colors
  link: '#0969da',
  'link-hover': '#0969da',

  // Code colors
  'code-bg': '#f6f8fa',
  'code-border': '#d0d7de',
}

/**
 * GitHub dark color palette (Dimmed)
 */
const githubDarkColors = {
  // Core colors
  primary: '#58a6ff',      // GitHub blue (dark)
  secondary: '#8b949e',    // GitHub gray (dark)
  accent: '#3fb950',       // Success green (dark)
  success: '#3fb950',
  warning: '#d29922',
  error: '#f85149',
  info: '#58a6ff',

  // Backgrounds
  background: '#0d1117',
  surface: '#161b22',
  card: '#161b22',
  'card-alt': '#21262d',

  // Foregrounds
  foreground: '#c9d1d9',
  'foreground-muted': '#8b949e',
  'foreground-faint': '#6e7681',

  // Borders
  border: '#30363d',
  'border-muted': '#21262d',
  'border-accent': '#8b949e',

  // Additional semantic colors
  'btn-primary-bg': '#238636',
  'btn-primary-text': '#ffffff',
  'btn-primary-hover-bg': '#2ea043',
  'btn-secondary-bg': '#21262d',
  'btn-secondary-text': '#c9d1d9',
  'btn-secondary-hover-bg': '#30363d',

  // Link colors
  link: '#58a6ff',
  'link-hover': '#79c0ff',

  // Code colors
  'code-bg': '#161b22',
  'code-border': '#30363d',
}

/**
 * GitHub spacing scale (based on GitHub's design tokens)
 */
const githubSpacing = {
  'github-xs': '4px',
  'github-sm': '8px',
  'github-md': '16px',
  'github-lg': '24px',
  'github-xl': '32px',
  'github-2xl': '40px',
}

/**
 * GitHub border radius (based on GitHub's design)
 */
const githubBorderRadius = {
  'github-sm': '4px',
  'github-md': '6px',
  'github-lg': '8px',
  'github-xl': '12px',
}

/**
 * GitHub box shadows (subtle, clean)
 */
const githubBoxShadow = {
  'github-sm': '0 1px 0 rgba(27, 31, 35, 0.04)',
  'github-md': '0 3px 6px rgba(140, 149, 159, 0.15)',
  'github-lg': '0 8px 24px rgba(140, 149, 159, 0.2)',
  'github-xl': '0 12px 48px rgba(140, 149, 159, 0.25)',
  'github-btn': '0 1px 0 rgba(27, 31, 35, 0.04)',
  'github-dropdown': '0 8px 24px rgba(140, 149, 159, 0.2)',
}

/**
 * GitHub theme preset
 *
 * @example
 * ```ts
 * import { createCoral } from '@coral-css/core'
 * import { githubPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   plugins: githubPreset({ darkMode: 'class' })
 * })
 * ```
 */
export function githubPreset(options: GitHubPresetOptions = {}): Plugin[] {
  const {
    darkMode = 'class',
    darkModeSelector = '.dark',
    colorBlind = false,
    reducedMotion = false,
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

  // GitHub theme plugin
  plugins.push({
    name: 'github-theme',
    version: '1.0.0',
    install(api) {
      let colors = { ...githubLightColors }

      // Color blind safe palette
      if (colorBlind) {
        colors.primary = '#0969da'
        colors.accent = '#1f883d'
        colors.warning = '#9a6700'
        colors.error = '#cf222e'
      }

      api.extendTheme({
        colors: colors as any,
        spacing: githubSpacing as any,
        borderRadius: githubBorderRadius as any,
        boxShadow: githubBoxShadow as any,
      })

      // Configure reduced motion if enabled
      if (reducedMotion) {
        api.extendTheme({
          transitionDuration: {
            'motion-safe': '0ms',
            'motion-reduce': '0ms',
          },
        } as any)
      }
    },
  })

  // Dark mode plugin with GitHub dark colors
  plugins.push({
    name: 'github-dark-mode',
    version: '1.0.0',
    install(api) {
      // Add dark mode colors as theme extension
      // Note: These are used by the dark mode variant system
      for (const [key, value] of Object.entries(githubDarkColors)) {
        api.extendTheme({
          colors: {
            [key]: value,
          },
        } as any)
      }
    },
  })

  return plugins
}

/**
 * Get default GitHub preset configuration
 */
export function githubPresetConfig(options: GitHubPresetOptions = {}) {
  return {
    darkMode: options.darkMode ?? 'class',
    theme: {
      colors: githubLightColors,
      dark: githubDarkColors,
      spacing: githubSpacing,
      borderRadius: githubBorderRadius,
      boxShadow: githubBoxShadow,
    },
  }
}
