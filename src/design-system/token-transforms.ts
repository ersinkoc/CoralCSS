/**
 * Token Transforms
 *
 * Custom transforms for converting tokens to different platforms.
 *
 * @module design-system/token-transforms
 */

import type { TransformConfig, ProcessedToken, PlatformConfig } from './types'

/**
 * Built-in transforms for Style Dictionary
 */
export const transforms: Record<string, TransformConfig> = {
  /**
   * Transform name to kebab-case
   */
  'name/kebab': {
    type: 'name',
    transform: (token: ProcessedToken) => {
      return token.path.join('-').toLowerCase()
    },
  },

  /**
   * Transform name to camelCase
   */
  'name/camel': {
    type: 'name',
    transform: (token: ProcessedToken) => {
      const name = token.path.join('-').toLowerCase()
      return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    },
  },

  /**
   * Transform name to PascalCase
   */
  'name/pascal': {
    type: 'name',
    transform: (token: ProcessedToken) => {
      const name = token.path.join('-').toLowerCase()
      return name.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())
    },
  },

  /**
   * Transform name to snake_case
   */
  'name/snake': {
    type: 'name',
    transform: (token: ProcessedToken) => {
      return token.path.join('_').toLowerCase()
    },
  },

  /**
   * Transform name to CONSTANT_CASE
   */
  'name/constant': {
    type: 'name',
    transform: (token: ProcessedToken) => {
      return token.path.join('_').toUpperCase()
    },
  },

  /**
   * Add CSS variable prefix
   */
  'name/css': {
    type: 'name',
    transform: (token: ProcessedToken, config: PlatformConfig) => {
      const prefix = config.prefix || ''
      const name = token.path.join('-').toLowerCase()
      return prefix ? `--${prefix}-${name}` : `--${name}`
    },
  },

  /**
   * Transform color to hex
   */
  'value/color/hex': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'color',
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      if (value.startsWith('#')) {return value}
      if (value.startsWith('rgb')) {return rgbToHex(value)}
      if (value.startsWith('hsl')) {return hslToHex(value)}
      return value
    },
  },

  /**
   * Transform color to rgba
   */
  'value/color/rgba': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'color',
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      if (value.startsWith('rgba')) {return value}
      if (value.startsWith('#')) {return hexToRgba(value)}
      if (value.startsWith('rgb(')) {return value.replace('rgb(', 'rgba(').replace(')', ', 1)')}
      return value
    },
  },

  /**
   * Transform color to UIColor (iOS)
   */
  'value/color/UIColor': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'color',
    transform: (token: ProcessedToken) => {
      const hex = String(token.value).replace('#', '')
      const r = parseInt(hex.slice(0, 2), 16) / 255
      const g = parseInt(hex.slice(2, 4), 16) / 255
      const b = parseInt(hex.slice(4, 6), 16) / 255
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
      return `UIColor(red: ${r.toFixed(3)}, green: ${g.toFixed(3)}, blue: ${b.toFixed(3)}, alpha: ${a.toFixed(3)})`
    },
  },

  /**
   * Transform color to Compose Color (Android)
   */
  'value/color/compose': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'color',
    transform: (token: ProcessedToken) => {
      const hex = String(token.value).replace('#', '').toUpperCase()
      const alpha = hex.length === 8 ? hex.slice(6, 8) : 'FF'
      const rgb = hex.slice(0, 6)
      return `Color(0x${alpha}${rgb})`
    },
  },

  /**
   * Transform dimension to pixels
   */
  'value/dimension/px': {
    type: 'value',
    filter: (token: ProcessedToken) => {
      const type = token.original.$type
      return type === 'dimension' || type === 'spacing' || type === 'sizing' || type === 'borderRadius'
    },
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      if (value.endsWith('px')) {return value}
      if (value.endsWith('rem')) {
        const numericValue = parseFloat(value) * 16
        return `${numericValue}px`
      }
      if (value.endsWith('em')) {
        const numericValue = parseFloat(value) * 16
        return `${numericValue}px`
      }
      return value
    },
  },

  /**
   * Transform dimension to rem
   */
  'value/dimension/rem': {
    type: 'value',
    filter: (token: ProcessedToken) => {
      const type = token.original.$type
      return type === 'dimension' || type === 'spacing' || type === 'sizing'
    },
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      if (value.endsWith('rem')) {return value}
      if (value.endsWith('px')) {
        const numericValue = parseFloat(value) / 16
        return `${numericValue}rem`
      }
      return value
    },
  },

  /**
   * Transform dimension to dp (Android)
   */
  'value/dimension/dp': {
    type: 'value',
    filter: (token: ProcessedToken) => {
      const type = token.original.$type
      return type === 'dimension' || type === 'spacing' || type === 'sizing' || type === 'borderRadius'
    },
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      let numericValue: number
      if (value.endsWith('px')) {
        numericValue = parseFloat(value)
      } else if (value.endsWith('rem')) {
        numericValue = parseFloat(value) * 16
      } else {
        numericValue = parseFloat(value)
      }
      return `${numericValue}.dp`
    },
  },

  /**
   * Transform dimension to CGFloat (iOS)
   */
  'value/dimension/cgfloat': {
    type: 'value',
    filter: (token: ProcessedToken) => {
      const type = token.original.$type
      return type === 'dimension' || type === 'spacing' || type === 'sizing' || type === 'borderRadius'
    },
    transform: (token: ProcessedToken) => {
      const value = String(token.value)
      let numericValue: number
      if (value.endsWith('px')) {
        numericValue = parseFloat(value)
      } else if (value.endsWith('rem')) {
        numericValue = parseFloat(value) * 16
      } else {
        numericValue = parseFloat(value)
      }
      return `CGFloat(${numericValue})`
    },
  },

  /**
   * Transform font weight to number
   */
  'value/fontWeight/number': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'fontWeight',
    transform: (token: ProcessedToken) => {
      const value = token.value
      if (typeof value === 'number') {return value}

      const weights: Record<string, number> = {
        thin: 100,
        hairline: 100,
        extralight: 200,
        ultralight: 200,
        light: 300,
        normal: 400,
        regular: 400,
        medium: 500,
        semibold: 600,
        demibold: 600,
        bold: 700,
        extrabold: 800,
        ultrabold: 800,
        black: 900,
        heavy: 900,
      }

      const normalized = String(value).toLowerCase().replace(/[- ]/g, '')
      return weights[normalized] || 400
    },
  },

  /**
   * Transform font weight to iOS Font.Weight
   */
  'value/fontWeight/swift': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'fontWeight',
    transform: (token: ProcessedToken) => {
      const value = typeof token.value === 'number' ? token.value : parseInt(String(token.value))
      const weights: Record<number, string> = {
        100: '.ultraLight',
        200: '.thin',
        300: '.light',
        400: '.regular',
        500: '.medium',
        600: '.semibold',
        700: '.bold',
        800: '.heavy',
        900: '.black',
      }
      return `Font.Weight${weights[value] || '.regular'}`
    },
  },

  /**
   * Transform shadow to CSS
   */
  'value/shadow/css': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'shadow',
    transform: (token: ProcessedToken) => {
      const value = token.value
      if (typeof value === 'string') {return value}

      if (Array.isArray(value)) {
        return value.map(formatShadow).join(', ')
      }

      return formatShadow(value as ShadowValue)
    },
  },

  /**
   * Transform cubic bezier to CSS
   */
  'value/cubicBezier/css': {
    type: 'value',
    filter: (token: ProcessedToken) => token.original.$type === 'cubicBezier',
    transform: (token: ProcessedToken) => {
      const value = token.value
      if (typeof value === 'string') {return value}
      if (Array.isArray(value) && value.length === 4) {
        return `cubic-bezier(${value.join(', ')})`
      }
      return value
    },
  },

  /**
   * Add attributes for categorization
   */
  'attribute/cti': {
    type: 'attribute',
    transform: (token: ProcessedToken) => {
      const [category, type, item, ...rest] = token.path
      return {
        category: category || '',
        type: type || '',
        item: item || '',
        subitem: rest.join('-') || '',
      }
    },
  },

  /**
   * Add CoralCSS specific attributes
   */
  'attribute/coral': {
    type: 'attribute',
    transform: (token: ProcessedToken) => {
      const extensions = token.original.$extensions?.['com.coralcss']
      return {
        utility: extensions?.utility || '',
        responsive: extensions?.responsive ? 'true' : 'false',
        darkMode: extensions?.darkMode ? 'true' : 'false',
        variants: extensions?.variants?.join(',') || '',
      }
    },
  },
}

/**
 * Transform groups (collections of transforms)
 */
export const transformGroups: Record<string, string[]> = {
  /**
   * Web (CSS) transform group
   */
  'web': [
    'attribute/cti',
    'name/kebab',
    'value/color/hex',
    'value/dimension/rem',
    'value/shadow/css',
    'value/cubicBezier/css',
  ],

  /**
   * Web SCSS transform group
   */
  'scss': [
    'attribute/cti',
    'name/kebab',
    'value/color/hex',
    'value/dimension/rem',
    'value/shadow/css',
    'value/cubicBezier/css',
  ],

  /**
   * JavaScript transform group
   */
  'js': [
    'attribute/cti',
    'name/camel',
    'value/color/hex',
    'value/dimension/px',
    'value/fontWeight/number',
  ],

  /**
   * TypeScript transform group
   */
  'ts': [
    'attribute/cti',
    'name/camel',
    'value/color/hex',
    'value/dimension/px',
    'value/fontWeight/number',
  ],

  /**
   * iOS (Swift) transform group
   */
  'ios': [
    'attribute/cti',
    'name/pascal',
    'value/color/UIColor',
    'value/dimension/cgfloat',
    'value/fontWeight/swift',
  ],

  /**
   * iOS SwiftUI transform group
   */
  'ios-swiftui': [
    'attribute/cti',
    'name/pascal',
    'value/color/hex',
    'value/dimension/cgfloat',
    'value/fontWeight/swift',
  ],

  /**
   * Android transform group
   */
  'android': [
    'attribute/cti',
    'name/snake',
    'value/color/hex',
    'value/dimension/dp',
  ],

  /**
   * Android Compose transform group
   */
  'compose': [
    'attribute/cti',
    'name/pascal',
    'value/color/compose',
    'value/dimension/dp',
    'value/fontWeight/number',
  ],

  /**
   * Flutter transform group
   */
  'flutter': [
    'attribute/cti',
    'name/camel',
    'value/color/hex',
    'value/dimension/px',
    'value/fontWeight/number',
  ],

  /**
   * React Native transform group
   */
  'react-native': [
    'attribute/cti',
    'name/camel',
    'value/color/hex',
    'value/dimension/px',
    'value/fontWeight/number',
  ],

  /**
   * Figma transform group
   */
  'figma': [
    'attribute/cti',
    'name/kebab',
    'value/color/hex',
    'value/dimension/px',
  ],

  /**
   * CoralCSS specific transform group
   */
  'coral': [
    'attribute/cti',
    'attribute/coral',
    'name/css',
    'value/color/hex',
    'value/dimension/rem',
    'value/shadow/css',
    'value/cubicBezier/css',
  ],
}

// ============================================================================
// Helper Functions
// ============================================================================

interface ShadowValue {
  x?: number | string
  y?: number | string
  blur?: number | string
  spread?: number | string
  color?: string
  inset?: boolean
}

/**
 * Format shadow value to CSS
 */
function formatShadow(shadow: ShadowValue): string {
  const inset = shadow.inset ? 'inset ' : ''
  const x = formatDimension(shadow.x || 0)
  const y = formatDimension(shadow.y || 0)
  const blur = formatDimension(shadow.blur || 0)
  const spread = formatDimension(shadow.spread || 0)
  const color = shadow.color || 'rgba(0, 0, 0, 0.1)'

  return `${inset}${x} ${y} ${blur} ${spread} ${color}`.trim()
}

/**
 * Format dimension value
 */
function formatDimension(value: number | string): string {
  if (typeof value === 'string') {return value}
  return value === 0 ? '0' : `${value}px`
}

/**
 * Convert RGB to hex
 */
function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {return rgb}

  const r = parseInt(match[1] as string, 10)
  const g = parseInt(match[2] as string, 10)
  const b = parseInt(match[3] as string, 10)
  const a = match[4] ? parseFloat(match[4]) : 1

  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  if (a < 1) {
    const alpha = Math.round(a * 255).toString(16).padStart(2, '0')
    return `#${hex}${alpha}`
  }

  return `#${hex}`
}

/**
 * Convert HSL to hex
 */
function hslToHex(hsl: string): string {
  const match = hsl.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/)
  if (!match) {return hsl}

  const h = parseInt(match[1] as string, 10) / 360
  const s = parseFloat(match[2] as string) / 100
  const l = parseFloat(match[3] as string) / 100
  const a = match[4] ? parseFloat(match[4]) : 1

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) {t += 1}
      if (t > 1) {t -= 1}
      if (t < 1 / 6) {return p + (q - p) * 6 * t}
      if (t < 1 / 2) {return q}
      if (t < 2 / 3) {return p + (q - p) * (2 / 3 - t) * 6}
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  if (a < 1) {
    return `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`
  }

  return hex
}

/**
 * Convert hex to rgba
 */
function hexToRgba(hex: string): string {
  const cleaned = hex.replace('#', '')
  const r = parseInt(cleaned.slice(0, 2), 16)
  const g = parseInt(cleaned.slice(2, 4), 16)
  const b = parseInt(cleaned.slice(4, 6), 16)
  const a = cleaned.length === 8 ? parseInt(cleaned.slice(6, 8), 16) / 255 : 1

  return `rgba(${r}, ${g}, ${b}, ${a})`
}
