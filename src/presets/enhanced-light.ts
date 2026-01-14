/**
 * Enhanced Light Mode Theme
 *
 * A carefully crafted light mode theme with beautiful, harmonious colors
 * that look professional and modern.
 *
 * @module presets/enhanced-light
 */

import type { Plugin, DeepPartial, Theme } from '../types'
import { corePlugins } from '../plugins/core'
import { modernCSSPlugin } from '../plugins/core/modern'

/**
 * Enhanced light mode preset options
 */
export interface EnhancedLightPresetOptions {
  /** Additional custom colors to merge */
  colors?: Record<string, string>
  /** Additional custom shadows */
  boxShadow?: Record<string, string>
  /** Additional custom border radius */
  borderRadius?: Record<string, string>
  /** Additional custom spacing */
  spacing?: Record<string, string>
}

/**
 * Enhanced light mode color palette
 */
const enhancedLightColors = {
  // Primary colors - beautiful blue-purple gradient
  primary: '#6366f1',        // Indigo 500
  'primary-50': '#eef2ff',
  'primary-100': '#e0e7ff',
  'primary-200': '#c7d2fe',
  'primary-300': '#a5b4fc',
  'primary-400': '#818cf8',
  'primary-500': '#6366f1',
  'primary-600': '#4f46e5',
  'primary-700': '#4338ca',
  'primary-800': '#3730a3',
  'primary-900': '#312e81',
  'primary-950': '#1e1b4b',

  // Secondary - rose pink
  secondary: '#f43f5e',      // Rose 500
  'secondary-50': '#fff1f2',
  'secondary-100': '#ffe4e6',
  'secondary-200': '#fecdd3',
  'secondary-300': '#fda4af',
  'secondary-400': '#fb7185',
  'secondary-500': '#f43f5e',
  'secondary-600': '#e11d48',
  'secondary-700': '#be123c',
  'secondary-800': '#9f1239',
  'secondary-900': '#881337',

  // Accent - emerald green
  accent: '#10b981',         // Emerald 500
  'accent-50': '#ecfdf5',
  'accent-100': '#d1fae5',
  'accent-200': '#a7f3d0',
  'accent-300': '#6ee7b7',
  'accent-400': '#34d399',
  'accent-500': '#10b981',
  'accent-600': '#059669',
  'accent-700': '#047857',
  'accent-800': '#065f46',
  'accent-900': '#064e3b',

  // Success colors
  success: '#22c55e',
  'success-light': '#86efac',
  'success-dark': '#16a34a',

  // Warning colors
  warning: '#f59e0b',
  'warning-light': '#fcd34d',
  'warning-dark': '#d97706',

  // Error colors
  error: '#ef4444',
  'error-light': '#fca5a5',
  'error-dark': '#dc2626',

  // Info colors
  info: '#3b82f6',
  'info-light': '#93c5fd',
  'info-dark': '#2563eb',

  // Background colors - warm white tones
  background: '#ffffff',
  'background-alt': '#fafafa',
  surface: '#f8fafc',
  'surface-alt': '#f1f5f9',
  card: '#ffffff',
  'card-alt': '#f8fafc',
  'card-hover': '#f1f5f9',

  // Foreground colors
  foreground: '#0f172a',     // Slate 900
  'foreground-muted': '#475569', // Slate 600
  'foreground-faint': '#94a3b8',  // Slate 400
  'foreground-inverse': '#ffffff',

  // Border colors - subtle and refined
  border: '#e2e8f0',         // Slate 200
  'border-light': '#f1f5f9', // Slate 100
  'border-muted': '#cbd5e1', // Slate 300
  'border-strong': '#94a3b8', // Slate 400

  // Text colors
  text: '#0f172a',
  'text-muted': '#64748b',
  'text-faint': '#94a3b8',
  'text-inverse': '#ffffff',

  // Muted backgrounds
  muted: '#f1f5f9',
  'muted-foreground': '#64748b',

  // Shadow colors - subtle shadows for light mode
  'shadow-color': 'rgba(0, 0, 0, 0.1)',
  'shadow-color-sm': 'rgba(0, 0, 0, 0.05)',
  'shadow-color-md': 'rgba(0, 0, 0, 0.1)',
  'shadow-color-lg': 'rgba(0, 0, 0, 0.15)',

  // Special effect colors
  'glow-primary': 'rgba(99, 102, 241, 0.5)',
  'glow-secondary': 'rgba(244, 63, 94, 0.5)',
  'glow-accent': 'rgba(16, 185, 129, 0.5)',

  // Gradient definitions
  'gradient-start': '#6366f1',
  'gradient-end': '#a855f7',
  'gradient-start-alt': '#f43f5e',
  'gradient-end-alt': '#fb923c',
}

/**
 * Enhanced box shadows for light mode
 */
const enhancedShadows = {
  'glow-sm': '0 0 10px rgba(99, 102, 241, 0.2), 0 2px 4px rgba(0, 0, 0, 0.05)',
  'glow-md': '0 0 20px rgba(99, 102, 241, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)',
  'glow-lg': '0 0 30px rgba(99, 102, 241, 0.4), 0 8px 16px rgba(0, 0, 0, 0.1)',
  'card-elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -2px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.02)',
  'card-floating': '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.02)',
  'button-raised': '0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  'input-soft': '0 1px 2px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)',
}

/**
 * Enhanced border radius
 */
const enhancedBorderRadius = {
  'pill': '9999px',
  'card-sm': '12px',
  'card-md': '16px',
  'card-lg': '20px',
  'button-sm': '8px',
  'button-md': '10px',
  'button-lg': '12px',
}

/**
 * Enhanced spacing for refined layouts
 */
const enhancedSpacing = {
  'xs': '4px',
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
}

/**
 * Enhanced light mode preset
 *
 * @example
 * ```ts
 * import { createCoral } from '@coral-css/core'
 * import { enhancedLightPreset } from '@coral-css/core/presets'
 *
 * const coral = createCoral({
 *   plugins: enhancedLightPreset()
 * })
 * ```
 */
export function enhancedLightPreset(): Plugin[] {
  const plugins: Plugin[] = []

  // Core plugins
  plugins.push(...corePlugins())
  plugins.push(modernCSSPlugin())

  // Enhanced light mode theme plugin
  plugins.push({
    name: 'enhanced-light-theme',
    version: '1.0.0',
    install(api) {
      api.extendTheme({
        colors: enhancedLightColors,
        boxShadow: enhancedShadows,
        borderRadius: enhancedBorderRadius,
        spacing: enhancedSpacing,
      } as DeepPartial<Theme>)
    },
  })

  return plugins
}

/**
 * Get enhanced light preset configuration
 */
export function enhancedLightPresetConfig() {
  return {
    theme: {
      colors: enhancedLightColors,
      boxShadow: enhancedShadows,
      borderRadius: enhancedBorderRadius,
      spacing: enhancedSpacing,
    },
  }
}
