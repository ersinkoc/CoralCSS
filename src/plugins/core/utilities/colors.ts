/**
 * Color Utilities Plugin
 *
 * Background, text, border, and other color utilities.
 * @module plugins/core/utilities/colors
 */

import type { Plugin, Rule, PluginContext, ColorScale } from '../../../types'
import { colors, opacity } from '../../../theme'

/**
 * Generate color rules for a property prefix
 */
function createColorRules(
  prefix: string,
  property: string,
  colorScale: Record<string, string | ColorScale>
): Rule[] {
  const rules: Rule[] = []

  for (const [colorName, colorValue] of Object.entries(colorScale)) {
    if (typeof colorValue === 'string') {
      // Simple color value (inherit, current, transparent, black, white)
      rules.push({
        pattern: `${prefix}-${colorName}`,
        properties: { [property]: colorValue },
      })
    } else if (typeof colorValue === 'object') {
      // Color scale (50-950)
      for (const [shade, hex] of Object.entries(colorValue)) {
        rules.push({
          pattern: `${prefix}-${colorName}-${shade}`,
          properties: { [property]: hex },
        })
      }
    }
  }

  return rules
}

/**
 * Generate color rules with opacity support
 */
function createColorOpacityRules(
  prefix: string,
  property: string,
  colorScale: Record<string, string | ColorScale>
): Rule[] {
  const rules: Rule[] = []

  for (const [colorName, colorValue] of Object.entries(colorScale)) {
    if (typeof colorValue === 'object') {
      for (const [shade, hex] of Object.entries(colorValue)) {
        // With opacity modifier: bg-red-500/50
        rules.push({
          pattern: new RegExp(`^${prefix}-${colorName}-${shade}/(\\d+)$`),
          handler: (match) => {
            const opacityStr = match[1]
            if (!opacityStr) return null
            const opacityValue = parseInt(opacityStr, 10) / 100
            const rgb = hexToRgbValues(hex)
            if (rgb) {
              return {
                properties: {
                  [property]: `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacityValue})`,
                },
              }
            }
            return { properties: { [property]: hex } }
          },
        })
      }
    }
  }

  return rules
}

/**
 * Convert hex to RGB values
 */
function hexToRgbValues(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || !result[1] || !result[2] || !result[3]) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Colors utilities plugin
 */
export function colorsPlugin(): Plugin {
  return {
    name: 'colors',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Background colors
      rules.push(...createColorRules('bg', 'background-color', colors))
      rules.push(...createColorOpacityRules('bg', 'background-color', colors))

      // Text colors
      rules.push(...createColorRules('text', 'color', colors))
      rules.push(...createColorOpacityRules('text', 'color', colors))

      // Border colors
      rules.push(...createColorRules('border', 'border-color', colors))
      rules.push(...createColorOpacityRules('border', 'border-color', colors))
      rules.push(...createColorRules('border-t', 'border-top-color', colors))
      rules.push(...createColorRules('border-r', 'border-right-color', colors))
      rules.push(...createColorRules('border-b', 'border-bottom-color', colors))
      rules.push(...createColorRules('border-l', 'border-left-color', colors))
      rules.push(...createColorRules('border-x', 'border-inline-color', colors))
      rules.push(...createColorRules('border-y', 'border-block-color', colors))

      // Outline colors
      rules.push(...createColorRules('outline', 'outline-color', colors))
      rules.push(...createColorOpacityRules('outline', 'outline-color', colors))

      // Ring colors (box-shadow based)
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `ring-${colorName}-${shade}`,
              properties: {
                '--coral-ring-color': hex,
              },
            })
          }
        }
      }

      // Divide colors (for > * + * selector)
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `divide-${colorName}-${shade}`,
              selector: (s) => `${s} > * + *`,
              properties: { 'border-color': hex },
            })
          }
        }
      }

      // Accent color
      rules.push(...createColorRules('accent', 'accent-color', colors))

      // Caret color
      rules.push(...createColorRules('caret', 'caret-color', colors))

      // Fill color (for SVG)
      rules.push(...createColorRules('fill', 'fill', colors))
      rules.push({ pattern: 'fill-none', properties: { fill: 'none' } })

      // Stroke color (for SVG)
      rules.push(...createColorRules('stroke', 'stroke', colors))
      rules.push({ pattern: 'stroke-none', properties: { stroke: 'none' } })

      // Placeholder color
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `placeholder-${colorName}-${shade}`,
              selector: (s) => `${s}::placeholder`,
              properties: { color: hex },
            })
          }
        }
      }

      // Decoration color (text-decoration-color)
      rules.push(...createColorRules('decoration', 'text-decoration-color', colors))

      // Shadow color
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `shadow-${colorName}-${shade}`,
              properties: {
                '--coral-shadow-color': hex,
              },
            })
          }
        }
      }

      // Arbitrary color values
      rules.push({
        pattern: /^bg-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'background-color': value } }
        },
      })
      rules.push({
        pattern: /^text-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: value } }
        },
      })
      rules.push({
        pattern: /^border-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-color': value } }
        },
      })

      // Opacity utilities
      for (const [key, value] of Object.entries(opacity)) {
        rules.push({
          pattern: `opacity-${key}`,
          properties: { opacity: value },
        })
      }

      // Arbitrary opacity
      rules.push({
        pattern: /^opacity-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { opacity: value } }
        },
      })

      // ========================================
      // OKLCH/OKLAB Wide Gamut Color Support (Tailwind 4 parity)
      // ========================================

      // oklch() function support - arbitrary values
      rules.push({
        pattern: /^bg-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'background-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^text-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^border-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^ring-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-ring-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^outline-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'outline-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^shadow-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { '--coral-shadow-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^accent-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'accent-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^caret-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'caret-color': `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^fill-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { fill: `oklch(${value})` } }
        },
      })
      rules.push({
        pattern: /^stroke-oklch-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { stroke: `oklch(${value})` } }
        },
      })

      // oklab() function support - arbitrary values
      rules.push({
        pattern: /^bg-oklab-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'background-color': `oklab(${value})` } }
        },
      })
      rules.push({
        pattern: /^text-oklab-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: `oklab(${value})` } }
        },
      })
      rules.push({
        pattern: /^border-oklab-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-color': `oklab(${value})` } }
        },
      })

      // color-mix() function support - for color blending
      rules.push({
        pattern: /^bg-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'background-color': `color-mix(${value})` } }
        },
      })
      rules.push({
        pattern: /^text-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: `color-mix(${value})` } }
        },
      })
      rules.push({
        pattern: /^border-mix-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { 'border-color': `color-mix(${value})` } }
        },
      })

      // Predefined wide gamut color utilities using oklch
      // Vivid colors that exceed sRGB gamut
      const wideGamutColors: Record<string, string> = {
        // Vivid reds
        'vivid-red': 'oklch(0.55 0.35 25)',
        'vivid-red-light': 'oklch(0.7 0.3 25)',
        'vivid-red-dark': 'oklch(0.4 0.35 25)',
        // Vivid oranges
        'vivid-orange': 'oklch(0.7 0.35 55)',
        'vivid-orange-light': 'oklch(0.8 0.28 55)',
        'vivid-orange-dark': 'oklch(0.55 0.35 55)',
        // Vivid yellows
        'vivid-yellow': 'oklch(0.9 0.35 100)',
        'vivid-yellow-light': 'oklch(0.95 0.25 100)',
        'vivid-yellow-dark': 'oklch(0.75 0.35 100)',
        // Vivid greens
        'vivid-green': 'oklch(0.7 0.35 145)',
        'vivid-green-light': 'oklch(0.82 0.28 145)',
        'vivid-green-dark': 'oklch(0.55 0.35 145)',
        // Vivid cyans
        'vivid-cyan': 'oklch(0.75 0.25 195)',
        'vivid-cyan-light': 'oklch(0.85 0.2 195)',
        'vivid-cyan-dark': 'oklch(0.6 0.25 195)',
        // Vivid blues
        'vivid-blue': 'oklch(0.55 0.35 260)',
        'vivid-blue-light': 'oklch(0.7 0.28 260)',
        'vivid-blue-dark': 'oklch(0.4 0.35 260)',
        // Vivid purples
        'vivid-purple': 'oklch(0.55 0.35 300)',
        'vivid-purple-light': 'oklch(0.7 0.28 300)',
        'vivid-purple-dark': 'oklch(0.4 0.35 300)',
        // Vivid magentas
        'vivid-magenta': 'oklch(0.6 0.35 340)',
        'vivid-magenta-light': 'oklch(0.75 0.28 340)',
        'vivid-magenta-dark': 'oklch(0.45 0.35 340)',
        // Vivid pinks
        'vivid-pink': 'oklch(0.7 0.3 0)',
        'vivid-pink-light': 'oklch(0.82 0.22 0)',
        'vivid-pink-dark': 'oklch(0.55 0.3 0)',
      }

      for (const [colorName, colorValue] of Object.entries(wideGamutColors)) {
        rules.push({
          pattern: `bg-${colorName}`,
          properties: { 'background-color': colorValue },
        })
        rules.push({
          pattern: `text-${colorName}`,
          properties: { color: colorValue },
        })
        rules.push({
          pattern: `border-${colorName}`,
          properties: { 'border-color': colorValue },
        })
        rules.push({
          pattern: `ring-${colorName}`,
          properties: { '--coral-ring-color': colorValue },
        })
      }

      // Color interpolation method utilities (for gradients)
      rules.push({
        pattern: 'interpolate-oklch',
        properties: { '--coral-gradient-interpolation': 'in oklch' },
      })
      rules.push({
        pattern: 'interpolate-oklab',
        properties: { '--coral-gradient-interpolation': 'in oklab' },
      })
      rules.push({
        pattern: 'interpolate-srgb',
        properties: { '--coral-gradient-interpolation': 'in srgb' },
      })
      rules.push({
        pattern: 'interpolate-hsl',
        properties: { '--coral-gradient-interpolation': 'in hsl' },
      })
      rules.push({
        pattern: 'interpolate-hwb',
        properties: { '--coral-gradient-interpolation': 'in hwb' },
      })
      rules.push({
        pattern: 'interpolate-lch',
        properties: { '--coral-gradient-interpolation': 'in lch' },
      })

      // Hue interpolation direction for gradients
      rules.push({
        pattern: 'hue-shorter',
        properties: { '--coral-hue-interpolation': 'shorter hue' },
      })
      rules.push({
        pattern: 'hue-longer',
        properties: { '--coral-hue-interpolation': 'longer hue' },
      })
      rules.push({
        pattern: 'hue-increasing',
        properties: { '--coral-hue-interpolation': 'increasing hue' },
      })
      rules.push({
        pattern: 'hue-decreasing',
        properties: { '--coral-hue-interpolation': 'decreasing hue' },
      })

      // Relative color syntax support (CSS Color Level 5)
      rules.push({
        pattern: /^bg-from-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          // Supports: from(var(--color) l c h) or similar
          return { properties: { 'background-color': `oklch(from ${value})` } }
        },
      })
      rules.push({
        pattern: /^text-from-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          return { properties: { color: `oklch(from ${value})` } }
        },
      })

      // ========================================
      // light-dark() Color Function (CSS Color 5)
      // Automatically switches between colors based on color-scheme
      // ========================================
      rules.push({
        pattern: /^bg-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          // Expects: light_color,dark_color (space-separated in CSS)
          const colors = value.replace(',', ', ')
          return { properties: { 'background-color': `light-dark(${colors})` } }
        },
      })
      rules.push({
        pattern: /^text-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          const colors = value.replace(',', ', ')
          return { properties: { color: `light-dark(${colors})` } }
        },
      })
      rules.push({
        pattern: /^border-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          const colors = value.replace(',', ', ')
          return { properties: { 'border-color': `light-dark(${colors})` } }
        },
      })
      rules.push({
        pattern: /^shadow-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          const colors = value.replace(',', ', ')
          return { properties: { '--coral-shadow-color': `light-dark(${colors})` } }
        },
      })
      rules.push({
        pattern: /^ring-light-dark-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) return null
          const colors = value.replace(',', ', ')
          return { properties: { '--coral-ring-color': `light-dark(${colors})` } }
        },
      })

      // Predefined light-dark utilities for common patterns
      // These use CSS variables that should be defined in the root
      rules.push({
        pattern: 'bg-adaptive',
        properties: { 'background-color': 'light-dark(white, black)' },
      })
      rules.push({
        pattern: 'text-adaptive',
        properties: { color: 'light-dark(black, white)' },
      })
      rules.push({
        pattern: 'border-adaptive',
        properties: { 'border-color': 'light-dark(#e5e7eb, #374151)' },
      })

      // ========================================
      // ADVANCED GRADIENTS (Beyond Tailwind 4)
      // ========================================

      // Conic gradients
      rules.push({
        pattern: 'bg-conic',
        properties: { 'background-image': 'conic-gradient(from 0deg, var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-conic-from-0',
        properties: { 'background-image': 'conic-gradient(from 0deg, var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-conic-from-45',
        properties: { 'background-image': 'conic-gradient(from 45deg, var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-conic-from-90',
        properties: { 'background-image': 'conic-gradient(from 90deg, var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-conic-from-135',
        properties: { 'background-image': 'conic-gradient(from 135deg, var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-conic-from-180',
        properties: { 'background-image': 'conic-gradient(from 180deg, var(--coral-gradient-stops))' },
      })

      // Arbitrary conic gradient
      rules.push({
        pattern: /^bg-conic-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'background-image': `conic-gradient(${v})` } }
        },
      })

      // Repeating gradients
      rules.push({
        pattern: 'bg-repeating-linear',
        properties: { 'background-image': 'repeating-linear-gradient(var(--coral-gradient-angle, 45deg), var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-repeating-radial',
        properties: { 'background-image': 'repeating-radial-gradient(var(--coral-gradient-stops))' },
      })
      rules.push({
        pattern: 'bg-repeating-conic',
        properties: { 'background-image': 'repeating-conic-gradient(from 0deg, var(--coral-gradient-stops))' },
      })

      // Arbitrary repeating gradients
      rules.push({
        pattern: /^bg-repeating-linear-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'background-image': `repeating-linear-gradient(${v})` } }
        },
      })
      rules.push({
        pattern: /^bg-repeating-radial-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'background-image': `repeating-radial-gradient(${v})` } }
        },
      })
      rules.push({
        pattern: /^bg-repeating-conic-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { 'background-image': `repeating-conic-gradient(${v})` } }
        },
      })

      // Gradient with CSS math for smooth color stops
      rules.push({
        pattern: /^gradient-angle-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-gradient-angle': v } }
        },
      })

      // Mesh gradient (multiple layered radial gradients)
      rules.push({
        pattern: 'bg-mesh',
        properties: {
          'background-image':
            'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
        },
      })

      // ========================================
      // CSS MATH FUNCTIONS (Beyond Tailwind 4)
      // ========================================

      // CSS calc() arbitrary support
      rules.push({
        pattern: /^calc-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-calc': `calc(${v})` } }
        },
      })

      // CSS min() function
      rules.push({
        pattern: /^min-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-min': `min(${v})` } }
        },
      })

      // CSS max() function
      rules.push({
        pattern: /^max-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-max': `max(${v})` } }
        },
      })

      // CSS clamp() function
      rules.push({
        pattern: /^clamp-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-clamp': `clamp(${v})` } }
        },
      })

      // CSS trigonometric functions
      rules.push({
        pattern: /^sin-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-sin': `sin(${v})` } }
        },
      })
      rules.push({
        pattern: /^cos-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-cos': `cos(${v})` } }
        },
      })
      rules.push({
        pattern: /^tan-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-tan': `tan(${v})` } }
        },
      })
      rules.push({
        pattern: /^asin-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-asin': `asin(${v})` } }
        },
      })
      rules.push({
        pattern: /^acos-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-acos': `acos(${v})` } }
        },
      })
      rules.push({
        pattern: /^atan-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-atan': `atan(${v})` } }
        },
      })
      rules.push({
        pattern: /^atan2-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-atan2': `atan2(${v})` } }
        },
      })

      // CSS exponential functions
      rules.push({
        pattern: /^pow-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-pow': `pow(${v})` } }
        },
      })
      rules.push({
        pattern: /^sqrt-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-sqrt': `sqrt(${v})` } }
        },
      })
      rules.push({
        pattern: /^hypot-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-hypot': `hypot(${v})` } }
        },
      })
      rules.push({
        pattern: /^log-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-log': `log(${v})` } }
        },
      })
      rules.push({
        pattern: /^exp-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-exp': `exp(${v})` } }
        },
      })

      // CSS sign/abs functions
      rules.push({
        pattern: /^abs-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-abs': `abs(${v})` } }
        },
      })
      rules.push({
        pattern: /^sign-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-sign': `sign(${v})` } }
        },
      })

      // CSS round/mod/rem functions
      rules.push({
        pattern: /^round-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-round': `round(${v})` } }
        },
      })
      rules.push({
        pattern: /^mod-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-mod': `mod(${v})` } }
        },
      })
      rules.push({
        pattern: /^rem-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return { properties: { '--coral-rem': `rem(${v})` } }
        },
      })

      // ========================================
      // GRADIENT PRESETS (Beyond Tailwind 4)
      // ========================================

      // Beautiful gradient presets
      rules.push({
        pattern: 'bg-gradient-sunset',
        properties: { 'background-image': 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)' },
      })
      rules.push({
        pattern: 'bg-gradient-ocean',
        properties: { 'background-image': 'linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)' },
      })
      rules.push({
        pattern: 'bg-gradient-forest',
        properties: { 'background-image': 'linear-gradient(135deg, #22c55e, #059669, #14b8a6)' },
      })
      rules.push({
        pattern: 'bg-gradient-aurora',
        properties: { 'background-image': 'linear-gradient(135deg, #8b5cf6, #06b6d4, #22c55e)' },
      })
      rules.push({
        pattern: 'bg-gradient-fire',
        properties: { 'background-image': 'linear-gradient(135deg, #fbbf24, #f97316, #ef4444)' },
      })
      rules.push({
        pattern: 'bg-gradient-midnight',
        properties: { 'background-image': 'linear-gradient(135deg, #1e3a8a, #3730a3, #4c1d95)' },
      })
      rules.push({
        pattern: 'bg-gradient-rose',
        properties: { 'background-image': 'linear-gradient(135deg, #fda4af, #f472b6, #c084fc)' },
      })
      rules.push({
        pattern: 'bg-gradient-gold',
        properties: { 'background-image': 'linear-gradient(135deg, #fef08a, #fbbf24, #f97316)' },
      })
      rules.push({
        pattern: 'bg-gradient-silver',
        properties: { 'background-image': 'linear-gradient(135deg, #f4f4f5, #d4d4d8, #a1a1aa)' },
      })
      rules.push({
        pattern: 'bg-gradient-neon',
        properties: { 'background-image': 'linear-gradient(135deg, #00ff87, #60efff, #ff00e6)' },
      })

      // Animated gradient
      rules.push({
        pattern: 'bg-gradient-animated',
        properties: {
          'background-size': '400% 400%',
          animation: 'coral-gradient-shift 15s ease infinite',
        },
      })

      // ========================================
      // BACKGROUND PATTERNS (Beyond Tailwind 4)
      // CSS-only patterns without images
      // ========================================

      // Stripe patterns
      rules.push({
        pattern: 'bg-stripes',
        properties: {
          'background-image': 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)',
        },
      })
      rules.push({
        pattern: 'bg-stripes-horizontal',
        properties: {
          'background-image': 'repeating-linear-gradient(0deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)',
        },
      })
      rules.push({
        pattern: 'bg-stripes-vertical',
        properties: {
          'background-image': 'repeating-linear-gradient(90deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)',
        },
      })
      rules.push({
        pattern: 'bg-stripes-reverse',
        properties: {
          'background-image': 'repeating-linear-gradient(-45deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)',
        },
      })

      // Stripe size variants
      const stripeSizes: Record<string, string> = {
        sm: '5px',
        md: '10px',
        lg: '20px',
        xl: '40px',
      }
      for (const [size, value] of Object.entries(stripeSizes)) {
        rules.push({
          pattern: `bg-stripes-${size}`,
          properties: {
            '--coral-stripe-size': value,
            'background-image': `repeating-linear-gradient(45deg, transparent, transparent var(--coral-stripe-size, 10px), currentColor var(--coral-stripe-size, 10px), currentColor calc(var(--coral-stripe-size, 10px) + 2px))`,
          },
        })
      }

      // Arbitrary stripe size
      rules.push({
        pattern: /^bg-stripes-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return {
            properties: {
              '--coral-stripe-size': v,
              'background-image': `repeating-linear-gradient(45deg, transparent, transparent ${v}, currentColor ${v}, currentColor calc(${v} + 2px))`,
            },
          }
        },
      })

      // Dotted patterns (polka dots)
      rules.push({
        pattern: 'bg-dots',
        properties: {
          'background-image': 'radial-gradient(currentColor 1px, transparent 1px)',
          'background-size': '16px 16px',
        },
      })
      rules.push({
        pattern: 'bg-dots-sm',
        properties: {
          'background-image': 'radial-gradient(currentColor 0.5px, transparent 0.5px)',
          'background-size': '8px 8px',
        },
      })
      rules.push({
        pattern: 'bg-dots-lg',
        properties: {
          'background-image': 'radial-gradient(currentColor 2px, transparent 2px)',
          'background-size': '24px 24px',
        },
      })
      rules.push({
        pattern: 'bg-dots-xl',
        properties: {
          'background-image': 'radial-gradient(currentColor 3px, transparent 3px)',
          'background-size': '32px 32px',
        },
      })

      // Arbitrary dot pattern
      rules.push({
        pattern: /^bg-dots-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          const parts = v.split(',').map(p => p.trim())
          const dotSize = parts[0] || '1px'
          const spacing = parts[1] || '16px'
          return {
            properties: {
              'background-image': `radial-gradient(currentColor ${dotSize}, transparent ${dotSize})`,
              'background-size': `${spacing} ${spacing}`,
            },
          }
        },
      })

      // Grid pattern
      rules.push({
        pattern: 'bg-grid',
        properties: {
          'background-image': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          'background-size': '20px 20px',
        },
      })
      rules.push({
        pattern: 'bg-grid-sm',
        properties: {
          'background-image': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          'background-size': '10px 10px',
        },
      })
      rules.push({
        pattern: 'bg-grid-lg',
        properties: {
          'background-image': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          'background-size': '40px 40px',
        },
      })
      rules.push({
        pattern: 'bg-grid-xl',
        properties: {
          'background-image': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          'background-size': '80px 80px',
        },
      })

      // Arbitrary grid
      rules.push({
        pattern: /^bg-grid-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return {
            properties: {
              'background-image': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              'background-size': `${v} ${v}`,
            },
          }
        },
      })

      // Checkerboard pattern
      rules.push({
        pattern: 'bg-checkerboard',
        properties: {
          'background-image': 'repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)',
          'background-size': '20px 20px',
        },
      })
      rules.push({
        pattern: 'bg-checkerboard-sm',
        properties: {
          'background-image': 'repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)',
          'background-size': '10px 10px',
        },
      })
      rules.push({
        pattern: 'bg-checkerboard-lg',
        properties: {
          'background-image': 'repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)',
          'background-size': '40px 40px',
        },
      })

      // Cross-hatch pattern
      rules.push({
        pattern: 'bg-cross-hatch',
        properties: {
          'background-image': 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
        },
      })

      // Zigzag pattern
      rules.push({
        pattern: 'bg-zigzag',
        properties: {
          'background-image': 'linear-gradient(135deg, currentColor 25%, transparent 25%), linear-gradient(225deg, currentColor 25%, transparent 25%), linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(315deg, currentColor 25%, transparent 25%)',
          'background-size': '20px 20px',
          'background-position': '10px 0, 10px 0, 0 0, 0 0',
        },
      })

      // Triangle pattern
      rules.push({
        pattern: 'bg-triangles',
        properties: {
          'background-image': 'linear-gradient(45deg, currentColor 50%, transparent 50%)',
          'background-size': '20px 20px',
        },
      })

      // Herringbone pattern
      rules.push({
        pattern: 'bg-herringbone',
        properties: {
          'background-image': 'linear-gradient(45deg, currentColor 12%, transparent 12%, transparent 88%, currentColor 88%), linear-gradient(135deg, currentColor 12%, transparent 12%, transparent 88%, currentColor 88%)',
          'background-size': '40px 40px',
        },
      })

      // Diamond pattern
      rules.push({
        pattern: 'bg-diamonds',
        properties: {
          'background-image': 'linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)',
          'background-size': '20px 20px',
          'background-position': '0 0, 10px 0, 10px -10px, 0 10px',
        },
      })

      // Wave pattern (CSS only approximation)
      rules.push({
        pattern: 'bg-waves',
        properties: {
          'background-image': 'radial-gradient(ellipse at 50% 100%, transparent 50%, currentColor 50%, currentColor 51%, transparent 51%)',
          'background-size': '40px 20px',
        },
      })

      // Noise/grain effect (subtle)
      rules.push({
        pattern: 'bg-noise',
        properties: {
          'background-image': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        },
      })

      // Paper texture
      rules.push({
        pattern: 'bg-paper',
        properties: {
          'background-image': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.04\' numOctaves=\'5\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
        },
      })

      // Isometric grid (for 3D design mockups)
      rules.push({
        pattern: 'bg-isometric',
        properties: {
          'background-image': 'linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor), linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor), linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor), linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor), linear-gradient(60deg, transparent 25%, currentColor 25%, currentColor 75%, transparent 75%)',
          'background-size': '80px 140px',
          'background-position': '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
        },
      })

      // Carbon fiber pattern
      rules.push({
        pattern: 'bg-carbon',
        properties: {
          'background-image': 'linear-gradient(27deg, #151515 5px, transparent 5px), linear-gradient(207deg, #151515 5px, transparent 5px), linear-gradient(27deg, #222 5px, transparent 5px), linear-gradient(207deg, #222 5px, transparent 5px), linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)',
          'background-color': '#131313',
          'background-size': '20px 35px',
        },
      })

      // Blueprint grid
      rules.push({
        pattern: 'bg-blueprint',
        properties: {
          'background-color': '#0a4b8c',
          'background-image': 'linear-gradient(rgba(255, 255, 255, .15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .15) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .1) 1px, transparent 1px)',
          'background-size': '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          'background-position': '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
        },
      })

      // Honeycomb pattern
      rules.push({
        pattern: 'bg-honeycomb',
        properties: {
          'background-image': 'radial-gradient(circle farthest-side at 0% 50%, transparent 47%, currentColor 50%, currentColor 53%, transparent 56%), radial-gradient(circle farthest-side at 100% 50%, transparent 47%, currentColor 50%, currentColor 53%, transparent 56%)',
          'background-size': '60px 100px',
        },
      })

      // Brick pattern
      rules.push({
        pattern: 'bg-brick',
        properties: {
          'background-image': 'linear-gradient(335deg, #b00 23px, transparent 23px), linear-gradient(155deg, #d00 23px, transparent 23px), linear-gradient(335deg, #b00 23px, transparent 23px), linear-gradient(155deg, #d00 23px, transparent 23px)',
          'background-size': '58px 58px',
          'background-position': '0px 2px, 4px 35px, 29px 31px, 33px 6px',
          'background-color': '#b00',
        },
      })

      // Pattern opacity control
      rules.push({
        pattern: /^pattern-opacity-(\d+)$/,
        handler: (match) => {
          const v = match[1]
          if (!v) return null
          return {
            properties: { '--coral-pattern-opacity': `${parseInt(v, 10) / 100}` },
          }
        },
      })

      // Pattern color (sets currentColor for patterns)
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === 'object') {
          for (const [shade, hex] of Object.entries(colorValue)) {
            rules.push({
              pattern: `pattern-${colorName}-${shade}`,
              properties: { color: hex },
            })
          }
        }
      }

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default colorsPlugin
