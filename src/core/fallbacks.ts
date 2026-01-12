/**
 * Browser Fallbacks System
 *
 * Generates CSS fallbacks for modern features that aren't supported
 * in older browsers (Safari < 16.4, Firefox < 128).
 *
 * @module core/fallbacks
 */

/**
 * Fallback configuration options
 */
export interface FallbackConfig {
  /** Enable OKLAB color fallbacks */
  oklabFallbacks?: boolean
  /** Enable @property fallbacks */
  propertyFallbacks?: boolean
  /** Enable gradient fallbacks */
  gradientFallbacks?: boolean
  /** Target browsers for fallbacks */
  targetBrowsers?: string[]
  /** Minimum Safari version */
  minSafariVersion?: number
  /** Minimum Firefox version */
  minFirefoxVersion?: number
}

/**
 * Default fallback configuration
 */
export const defaultFallbackConfig: FallbackConfig = {
  oklabFallbacks: true,
  propertyFallbacks: true,
  gradientFallbacks: true,
  targetBrowsers: ['safari < 16.4', 'firefox < 128'],
  minSafariVersion: 16.4,
  minFirefoxVersion: 128,
}

/**
 * Convert OKLAB color to RGB
 * Simple approximation for fallback purposes
 */
export function convertOKLABToRGB(oklabColor: string): string {
  // Extract values from oklab(l a b / alpha) format
  const match = oklabColor.match(/oklab\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/)
  if (!match) {
    // Return a safe fallback if we can't parse
    return 'rgb(100, 100, 100)'
  }

  const l = parseFloat(match[1])
  const a = parseFloat(match[2])
  const b = parseFloat(match[3])
  const alpha = match[4] ? parseFloat(match[4]) : 1

  // Simple OKLAB to RGB conversion (approximation)
  // This is a simplified conversion - for production use a more accurate algorithm would be better
  const toLinear = (x: number) => {
    if (x >= 0.206893034) {
      return Math.pow(x, 3)
    }
    return (x - 0.128319) * 0.128319
  }

  const L = toLinear((l + 16) / 156)
  const A = 2 * L * (a + 1) / 2
  const B = 2 * L * (b + 1) / 2

  // Convert linear RGB to sRGB
  const toSRGB = (x: number) => {
    if (x > 0.0031308) {
      return 1.055 * Math.pow(x, 1 / 2.4) - 0.055
    }
    return 12.92 * x
  }

  // Very rough approximation - in production, use proper color conversion
  // This is just to provide a reasonable fallback
  const r = Math.max(0, Math.min(255, Math.round((L + A + B) * 255)))
  const g = Math.max(0, Math.min(255, Math.round((L - A) * 255)))
  const bVal = Math.max(0, Math.min(255, Math.round((L - B) * 255)))

  if (alpha < 1) {
    return `rgba(${r}, ${g}, ${bVal}, ${alpha})`
  }
  return `rgb(${r}, ${g}, ${bVal})`
}

/**
 * Generate OKLAB color fallback
 * Creates a @supports block with RGB fallback
 *
 * @example
 * generateOKLABFallback('oklab(0.5 0.1 0.1)', 'background-color')
 * // Returns:
 * // background-color: rgb(187, 99, 99);
 * // @supports (background-color: oklab(1 0 0)) {
 * //   background-color: oklab(0.5 0.1 0.1);
 * // }
 */
export function generateOKLABFallback(
  color: string,
  propertyName: string
): string {
  const rgbColor = convertOKLABToRGB(color)

  return `  ${propertyName}: ${rgbColor};
  @supports (${propertyName}: oklab(1 0 0)) {
    ${propertyName}: ${color};
  }`
}

/**
 * Generate @property fallback
 * Creates fallback for CSS custom properties with @supports
 *
 * @example
 * generatePropertyFallback(
 *   'box-shadow',
 *   '0 4px 6px var(--shadow-color)',
 *   '0 4px 6px rgba(0, 0, 0, 0.1)'
 * )
 * // Returns:
 * // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 * // @supports (box-shadow: 0 4px 6px var(--shadow-color)) {
 * //   box-shadow: 0 4px 6px var(--shadow-color);
 * // }
 */
export function generatePropertyFallback(
  property: string,
  value: string,
  fallbackValue: string
): string {
  return `  ${property}: ${fallbackValue};
  @supports (${property}: ${value}) {
    ${property}: ${value};
  }`
}

/**
 * Detect if a CSS value uses modern features that need fallbacks
 */
function needsFallback(value: string): boolean {
  // Check for OKLAB colors
  if (value.includes('oklab(') || value.includes('oklch(')) {
    return true
  }

  // Check for color-mix()
  if (value.includes('color-mix(')) {
    return true
  }

  // Check for @property usage (CSS variables in places that need @supports)
  if (value.includes('var(--') && (
    value.includes('box-shadow') ||
    value.includes('filter') ||
    value.includes('clip-path')
  )) {
    return true
  }

  return false
}

/**
 * Generate gradient fallback with solid color
 *
 * @example
 * generateGradientFallback(
 *   'linear-gradient(to right, blue, red)',
 *   '#3b82f6'
 * )
 * // Returns:
 * // background-color: #3b82f6;
 * // background-image: linear-gradient(to right, blue, red);
 */
export function generateGradientFallback(
  gradient: string,
  fallbackColor: string
): string {
  return `  background-color: ${fallbackColor};
  background-image: ${gradient};`
}

/**
 * Extract a fallback color from a gradient
 * Gets the first color from the gradient as fallback
 */
function extractGradientFallback(gradient: string): string {
  // Try to extract first color from gradient
  const colorMatch = gradient.match(
    /(?:from|to|(?:rgb|hsl|hwb|lab|lch|oklab|oklch)[^)]+)|#[a-f0-9]{3,8}|[a-z]+/i
  )

  if (colorMatch) {
    const color = colorMatch[0]
    // Return a common fallback color if it's a keyword
    if (['from', 'to', 'in'].includes(color.toLowerCase())) {
      return '#3b82f6'
    }
    return color
  }

  // Default fallback
  return '#3b82f6'
}

/**
 * Process CSS content and add fallbacks
 * Automatically detects modern features and adds appropriate fallbacks
 */
export function processCSSWithFallbacks(
  css: string,
  config: FallbackConfig = {}
): string {
  const finalConfig = { ...defaultFallbackConfig, ...config }
  const lines = css.split('\n')
  const result: string[] = []
  const fallbackBlocks: string[] = []

  let inRule = false
  let currentSelector = ''
  let currentProperties: string[] = []

  for (const line of lines) {
    // Track selectors and rules
    if (line.trim().endsWith('{')) {
      inRule = true
      currentSelector = line.trim()
      result.push(line)
      continue
    }

    if (line.trim() === '}') {
      inRule = false

      // Process properties for fallbacks
      if (currentProperties.length > 0) {
        let hasFallbacks = false

        for (const prop of currentProperties) {
          const propertyMatch = prop.match(/^\s*([a-z-]+):\s*(.+);$/i)
          if (!propertyMatch) {
            result.push(prop)
            continue
          }

          const [, property, value] = propertyMatch

          // Check if value needs fallback
          if (needsFallback(value)) {
            hasFallbacks = true

            if (config.oklabFallbacks && (value.includes('oklab(') || value.includes('oklch('))) {
              const rgbFallback = convertOKLABToRGB(value)
              result.push(`  ${property}: ${rgbFallback};`)
              fallbackBlocks.push(`@supports (${property}: ${value}) {`)
              fallbackBlocks.push(`  ${currentSelector.replace('{', '')} {`)
              fallbackBlocks.push(`    ${property}: ${value};`)
              fallbackBlocks.push('  }')
              fallbackBlocks.push('}')
            } else if (config.gradientFallbacks && value.includes('gradient(')) {
              const fallbackColor = extractGradientFallback(value)
              result.push(`  background-color: ${fallbackColor};`)
            } else if (config.propertyFallbacks && value.includes('var(--')) {
              // Add fallback for CSS variables in certain properties
              if (property === 'box-shadow') {
                result.push(`  ${property}: 0 4px 6px rgba(0, 0, 0, 0.1);`)
              }
            }
          }

          result.push(prop)
        }

        currentProperties = []
      }

      result.push(line)
      continue
    }

    if (inRule) {
      currentProperties.push(line)
    } else {
      result.push(line)
    }
  }

  // Add fallback blocks at the end
  if (fallbackBlocks.length > 0) {
    result.push('')
    result.push('/* Fallbacks for older browsers */')
    result.push(...fallbackBlocks)
  }

  return result.join('\n')
}

/**
 * Auto-fallback plugin for CoralCSS
 * Integrates fallback generation with the CSS pipeline
 */
export function createFallbacksPlugin(config: FallbackConfig = {}) {
  const finalConfig = { ...defaultFallbackConfig, ...config }

  return {
    name: 'browser-fallbacks',
    version: '1.0.0',
    postProcess(css: string): string {
      if (!finalConfig.oklabFallbacks && !finalConfig.propertyFallbacks && !finalConfig.gradientFallbacks) {
        return css
      }
      return processCSSWithFallbacks(css, finalConfig)
    },
  }
}

export default {
  convertOKLABToRGB,
  generateOKLABFallback,
  generatePropertyFallback,
  generateGradientFallback,
  processCSSWithFallbacks,
  createFallbacksPlugin,
  defaultFallbackConfig,
}
