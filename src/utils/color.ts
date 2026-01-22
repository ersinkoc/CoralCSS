/**
 * Color Utilities
 *
 * Helper functions for color manipulation.
 * @module utils/color
 */

/**
 * RGB color representation
 */
export interface RGB {
  r: number
  g: number
  b: number
}

/**
 * RGBA color representation
 */
export interface RGBA extends RGB {
  a: number
}

/**
 * HSL color representation
 */
export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * HSLA color representation
 */
export interface HSLA extends HSL {
  a: number
}

/**
 * Validate that a string contains only valid hex characters
 */
function isValidHex(hex: string): boolean {
  return /^[0-9a-fA-F]+$/.test(hex)
}

/**
 * Clamp a value between min and max
 * Returns the default value if the input is NaN
 */
function clamp(value: number, min: number, max: number, defaultValue?: number): number {
  if (Number.isNaN(value)) {
    return defaultValue ?? min
  }
  return Math.max(min, Math.min(max, value))
}

/**
 * Safely round a number, returning 0 if NaN
 */
function safeRound(value: number): number {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 0
  }
  return Math.round(value)
}

/**
 * Parse a hex color to RGB
 *
 * @example
 * ```typescript
 * hexToRgb('#ff6b6b') // { r: 255, g: 107, b: 107 }
 * hexToRgb('#f66') // { r: 255, g: 102, b: 102 }
 * hexToRgb('#ff6b6b80') // { r: 255, g: 107, b: 107, a: 0.5 }
 * hexToRgb('invalid') // null
 * ```
 */
export function hexToRgb(hex: string): RGB | RGBA | null {
  // Handle null/undefined input
  if (!hex || typeof hex !== 'string') {
    return null
  }

  // Remove # if present
  hex = hex.replace(/^#/, '')

  // Validate hex characters
  if (!isValidHex(hex)) {
    return null
  }

  // Handle short hex (#RGB or #RGBA)
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Parse 6 or 8 character hex
  if (hex.length === 6) {
    const num = parseInt(hex, 16)
    if (isNaN(num)) {
      return null
    }
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    }
  }

  if (hex.length === 8) {
    const num = parseInt(hex, 16)
    if (isNaN(num)) {
      return null
    }
    return {
      r: (num >> 24) & 255,
      g: (num >> 16) & 255,
      b: (num >> 8) & 255,
      a: (num & 255) / 255,
    }
  }

  return null
}

/**
 * Convert RGB(A) to hex
 *
 * @example
 * ```typescript
 * rgbToHex(255, 107, 107) // '#ff6b6b'
 * rgbToHex({ r: 255, g: 107, b: 107 }) // '#ff6b6b'
 * rgbToHex({ r: 255, g: 107, b: 107, a: 0.5 }) // '#ff6b6b80'
 * ```
 */
export function rgbToHex(rOrColor: number | RGB | RGBA, g?: number, b?: number): string {
  let color: RGB | RGBA

  // Support both separate arguments and object
  if (typeof rOrColor === 'number') {
    // Validate all numeric inputs
    if (Number.isNaN(rOrColor) || !Number.isFinite(rOrColor)) {
      throw new Error(
        `Invalid RGB value: r=${rOrColor} must be a finite number. ` +
        'Use valid RGB values (0-255).'
      )
    }
    if (g !== undefined && (Number.isNaN(g) || !Number.isFinite(g))) {
      throw new Error(
        `Invalid RGB value: g=${g} must be a finite number. ` +
        'Use valid RGB values (0-255).'
      )
    }
    if (b !== undefined && (Number.isNaN(b) || !Number.isFinite(b))) {
      throw new Error(
        `Invalid RGB value: b=${b} must be a finite number. ` +
        'Use valid RGB values (0-255).'
      )
    }
    color = { r: rOrColor, g: g ?? 0, b: b ?? 0 }
  } else {
    // Validate object properties
    if (!rOrColor || typeof rOrColor !== 'object') {
      throw new Error('Invalid color object: must be an RGB or RGBA object')
    }
    if (typeof rOrColor.r !== 'number' || Number.isNaN(rOrColor.r) || !Number.isFinite(rOrColor.r)) {
      throw new Error(
        `Invalid RGB value: r=${rOrColor.r} must be a finite number`
      )
    }
    if (typeof rOrColor.g !== 'number' || Number.isNaN(rOrColor.g) || !Number.isFinite(rOrColor.g)) {
      throw new Error(
        `Invalid RGB value: g=${rOrColor.g} must be a finite number`
      )
    }
    if (typeof rOrColor.b !== 'number' || Number.isNaN(rOrColor.b) || !Number.isFinite(rOrColor.b)) {
      throw new Error(
        `Invalid RGB value: b=${rOrColor.b} must be a finite number`
      )
    }
    color = rOrColor
  }

  // Clamp and safely round all values to prevent NaN in output
  const rClamped = clamp(color.r, 0, 255)
  const gClamped = clamp(color.g, 0, 255)
  const bClamped = clamp(color.b, 0, 255)

  const rHex = safeRound(rClamped).toString(16).padStart(2, '0')
  const gHex = safeRound(gClamped).toString(16).padStart(2, '0')
  const bHex = safeRound(bClamped).toString(16).padStart(2, '0')

  if ('a' in color && color.a !== undefined && color.a !== 1) {
    const aClamped = clamp(color.a, 0, 1)
    const a = safeRound(aClamped * 255)
      .toString(16)
      .padStart(2, '0')
    return `#${rHex}${gHex}${bHex}${a}`
  }

  return `#${rHex}${gHex}${bHex}`
}

/**
 * Parse rgb/rgba CSS string to RGB(A)
 * Values are clamped to valid ranges (0-255 for RGB, 0-1 for alpha)
 *
 * @example
 * ```typescript
 * parseRgbString('rgb(255, 107, 107)') // { r: 255, g: 107, b: 107 }
 * parseRgbString('rgba(255, 107, 107, 0.5)') // { r: 255, g: 107, b: 107, a: 0.5 }
 * parseRgbString('rgb(999, 0, 0)') // { r: 255, g: 0, b: 0 } (clamped)
 * ```
 */
export function parseRgbString(str: string): RGB | RGBA | null {
  const match = str.match(/rgba?\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*(?:,\s*(-?[\d.]+))?\s*\)/)
  if (!match) {
    return null
  }

  const [, rStr, gStr, bStr, aStr] = match

  // Parse values with NaN protection (default to 0 for invalid values)
  const rParsed = parseInt(rStr!, 10)
  const gParsed = parseInt(gStr!, 10)
  const bParsed = parseInt(bStr!, 10)

  const result: RGB = {
    r: clamp(rParsed, 0, 255, 0),
    g: clamp(gParsed, 0, 255, 0),
    b: clamp(bParsed, 0, 255, 0),
  }

  if (aStr !== undefined) {
    const aParsed = parseFloat(aStr)
    return { ...result, a: clamp(aParsed, 0, 1, 1) }
  }

  return result
}

/**
 * Convert RGB to HSL
 *
 * @example
 * ```typescript
 * rgbToHsl({ r: 255, g: 107, b: 107 })
 * // { h: 0, s: 100, l: 71 }
 * ```
 */
export function rgbToHsl(color: RGB): HSL {
  // Clamp input values to valid range with NaN protection
  const r = clamp(color.r, 0, 255, 0) / 255
  const g = clamp(color.g, 0, 255, 0) / 255
  const b = clamp(color.b, 0, 255, 0) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: safeRound(h * 360),
    s: safeRound(s * 100),
    l: safeRound(l * 100),
  }
}

/**
 * Convert HSL to RGB
 *
 * @example
 * ```typescript
 * hslToRgb({ h: 0, s: 100, l: 71 })
 * // { r: 255, g: 107, b: 107 }
 * ```
 */
export function hslToRgb(color: HSL): RGB {
  // Clamp input values to valid range with NaN protection
  const h = clamp(color.h, 0, 360, 0) / 360
  const s = clamp(color.s, 0, 100, 0) / 100
  const l = clamp(color.l, 0, 100, 0) / 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) {
        t += 1
      }
      if (t > 1) {
        t -= 1
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t
      }
      if (t < 1 / 2) {
        return q
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6
      }
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: safeRound(r * 255),
    g: safeRound(g * 255),
    b: safeRound(b * 255),
  }
}

/**
 * Adjust the alpha channel of a color
 *
 * @example
 * ```typescript
 * adjustAlpha('#ff6b6b', 0.5) // 'rgba(255, 107, 107, 0.5)'
 * adjustAlpha('rgb(255, 107, 107)', 0.5) // 'rgba(255, 107, 107, 0.5)'
 * ```
 */
export function adjustAlpha(color: string, alpha: number): string {
  let rgb: RGB | null = null

  if (color.startsWith('#')) {
    rgb = hexToRgb(color)
  } else if (color.startsWith('rgb')) {
    rgb = parseRgbString(color)
  }

  if (!rgb) {
    return color
  }

  // Clamp alpha to valid range with NaN protection
  const safeAlpha = clamp(alpha, 0, 1, 1)

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${safeAlpha})`
}

/**
 * Lighten a color
 *
 * @example
 * ```typescript
 * lighten('#ff6b6b', 20) // Lightens by 20%
 * ```
 */
export function lighten(color: string, amount: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) {
    return color
  }

  const hsl = rgbToHsl(rgb)
  hsl.l = Math.min(100, hsl.l + amount)
  const newRgb = hslToRgb(hsl)
  return rgbToHex(newRgb)
}

/**
 * Darken a color
 *
 * @example
 * ```typescript
 * darken('#ff6b6b', 20) // Darkens by 20%
 * ```
 */
export function darken(color: string, amount: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) {
    return color
  }

  const hsl = rgbToHsl(rgb)
  hsl.l = Math.max(0, hsl.l - amount)
  const newRgb = hslToRgb(hsl)
  return rgbToHex(newRgb)
}

/**
 * Check if a color is dark (for contrast calculations)
 *
 * @example
 * ```typescript
 * isDark('#000000') // true
 * isDark('#ffffff') // false
 * ```
 */
export function isDark(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) {
    return false
  }

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance < 0.5
}

/**
 * Get contrasting text color (black or white)
 *
 * @example
 * ```typescript
 * getContrastColor('#ff6b6b') // '#000000' (dark text on light bg)
 * getContrastColor('#1a1a1a') // '#ffffff' (light text on dark bg)
 * ```
 */
export function getContrastColor(backgroundColor: string): string {
  return isDark(backgroundColor) ? '#ffffff' : '#000000'
}

/**
 * Parse any color format to RGB
 *
 * @example
 * ```typescript
 * parseColor('#ff6b6b') // { r: 255, g: 107, b: 107 }
 * parseColor('rgb(255, 107, 107)') // { r: 255, g: 107, b: 107 }
 * ```
 */
export function parseColor(color: string): RGB | RGBA | null {
  if (color.startsWith('#')) {
    return hexToRgb(color)
  }
  if (color.startsWith('rgb')) {
    return parseRgbString(color)
  }
  // Could add more formats here (hsl, oklch, etc.)
  return null
}

/**
 * Format color as CSS string
 *
 * @example
 * ```typescript
 * formatColor({ r: 255, g: 107, b: 107 }) // 'rgb(255, 107, 107)'
 * formatColor({ r: 255, g: 107, b: 107, a: 0.5 }) // 'rgba(255, 107, 107, 0.5)'
 * ```
 */
export function formatColor(color: RGB | RGBA): string {
  // Clamp all values with NaN protection
  const r = safeRound(clamp(color.r, 0, 255, 0))
  const g = safeRound(clamp(color.g, 0, 255, 0))
  const b = safeRound(clamp(color.b, 0, 255, 0))

  if ('a' in color && color.a !== undefined && color.a !== 1) {
    const a = clamp(color.a, 0, 1, 1)
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Mix two colors
 *
 * @example
 * ```typescript
 * mixColors('#ff0000', '#0000ff', 0.5) // Purple
 * ```
 */
export function mixColors(color1: string, color2: string, weight = 0.5): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) {
    return color1
  }

  // Clamp weight to valid range with NaN protection
  const w = clamp(weight, 0, 1, 0.5)
  const w1 = 1 - w

  const result: RGB = {
    r: safeRound(rgb1.r * w1 + rgb2.r * w),
    g: safeRound(rgb1.g * w1 + rgb2.g * w),
    b: safeRound(rgb1.b * w1 + rgb2.b * w),
  }

  return rgbToHex(result)
}
