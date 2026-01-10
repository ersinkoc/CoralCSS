/**
 * Color Utilities Tests
 */
import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  rgbToHex,
  parseRgbString,
  rgbToHsl,
  hslToRgb,
  adjustAlpha,
  lighten,
  darken,
  isDark,
  getContrastColor,
  parseColor,
  formatColor,
  mixColors,
} from '../../../src/utils/color'

describe('Color Utilities', () => {
  describe('hexToRgb', () => {
    it('should parse 6-character hex', () => {
      expect(hexToRgb('#ff6b6b')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should parse 3-character hex', () => {
      expect(hexToRgb('#f66')).toEqual({ r: 255, g: 102, b: 102 })
    })

    it('should parse 8-character hex with alpha', () => {
      const result = hexToRgb('#ff6b6b80')
      expect(result).toMatchObject({ r: 255, g: 107, b: 107 })
      expect((result as { a: number }).a).toBeCloseTo(0.5, 1)
    })

    it('should parse 4-character hex with alpha', () => {
      const result = hexToRgb('#f668')
      expect(result).toMatchObject({ r: 255, g: 102, b: 102 })
      expect((result as { a: number }).a).toBeCloseTo(0.53, 1)
    })

    it('should handle without hash', () => {
      expect(hexToRgb('ff6b6b')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should return null for invalid hex', () => {
      expect(hexToRgb('#gg')).toBeNull()
      expect(hexToRgb('#12')).toBeNull()
    })
  })

  describe('rgbToHex', () => {
    it('should convert RGB object to hex', () => {
      expect(rgbToHex({ r: 255, g: 107, b: 107 })).toBe('#ff6b6b')
    })

    it('should convert separate RGB values to hex', () => {
      expect(rgbToHex(255, 107, 107)).toBe('#ff6b6b')
    })

    it('should include alpha when not 1', () => {
      expect(rgbToHex({ r: 255, g: 107, b: 107, a: 0.5 })).toBe('#ff6b6b80')
    })

    it('should not include alpha when 1', () => {
      expect(rgbToHex({ r: 255, g: 107, b: 107, a: 1 })).toBe('#ff6b6b')
    })

    it('should handle default g and b when using number args', () => {
      expect(rgbToHex(255)).toBe('#ff0000')
    })
  })

  describe('parseRgbString', () => {
    it('should parse rgb string', () => {
      expect(parseRgbString('rgb(255, 107, 107)')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should parse rgba string', () => {
      expect(parseRgbString('rgba(255, 107, 107, 0.5)')).toEqual({ r: 255, g: 107, b: 107, a: 0.5 })
    })

    it('should handle extra whitespace', () => {
      expect(parseRgbString('rgb(  255 ,  107 ,  107  )')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should return null for invalid string', () => {
      expect(parseRgbString('invalid')).toBeNull()
      expect(parseRgbString('#ff6b6b')).toBeNull()
    })
  })

  describe('rgbToHsl', () => {
    it('should convert red', () => {
      const hsl = rgbToHsl({ r: 255, g: 0, b: 0 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(100)
      expect(hsl.l).toBe(50)
    })

    it('should convert green', () => {
      const hsl = rgbToHsl({ r: 0, g: 255, b: 0 })
      expect(hsl.h).toBe(120)
      expect(hsl.s).toBe(100)
      expect(hsl.l).toBe(50)
    })

    it('should convert blue', () => {
      const hsl = rgbToHsl({ r: 0, g: 0, b: 255 })
      expect(hsl.h).toBe(240)
      expect(hsl.s).toBe(100)
      expect(hsl.l).toBe(50)
    })

    it('should convert white', () => {
      const hsl = rgbToHsl({ r: 255, g: 255, b: 255 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(0)
      expect(hsl.l).toBe(100)
    })

    it('should convert black', () => {
      const hsl = rgbToHsl({ r: 0, g: 0, b: 0 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(0)
      expect(hsl.l).toBe(0)
    })

    it('should convert gray', () => {
      const hsl = rgbToHsl({ r: 128, g: 128, b: 128 })
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(0)
      expect(hsl.l).toBe(50)
    })
  })

  describe('hslToRgb', () => {
    it('should convert red', () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should convert green', () => {
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 })
    })

    it('should convert blue', () => {
      expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 })
    })

    it('should convert white', () => {
      expect(hslToRgb({ h: 0, s: 0, l: 100 })).toEqual({ r: 255, g: 255, b: 255 })
    })

    it('should convert black', () => {
      expect(hslToRgb({ h: 0, s: 0, l: 0 })).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should convert gray (zero saturation)', () => {
      const rgb = hslToRgb({ h: 180, s: 0, l: 50 })
      expect(rgb.r).toBe(rgb.g)
      expect(rgb.g).toBe(rgb.b)
      expect(rgb.r).toBe(128)
    })

    it('should handle HSL with high lightness', () => {
      const rgb = hslToRgb({ h: 120, s: 100, l: 90 })
      expect(rgb).toBeDefined()
      expect(rgb.r).toBeGreaterThan(0)
      expect(rgb.g).toBeGreaterThan(0)
      expect(rgb.b).toBeGreaterThan(0)
    })

    it('should handle HSL with low lightness', () => {
      const rgb = hslToRgb({ h: 240, s: 100, l: 10 })
      expect(rgb).toBeDefined()
      // Dark colors should have low RGB values
      const avg = (rgb.r + rgb.g + rgb.b) / 3
      expect(avg).toBeLessThan(100)
    })
  })

  describe('adjustAlpha', () => {
    it('should adjust hex color alpha', () => {
      expect(adjustAlpha('#ff6b6b', 0.5)).toBe('rgba(255, 107, 107, 0.5)')
    })

    it('should adjust rgb color alpha', () => {
      expect(adjustAlpha('rgb(255, 107, 107)', 0.5)).toBe('rgba(255, 107, 107, 0.5)')
    })

    it('should return original for unsupported format', () => {
      expect(adjustAlpha('red', 0.5)).toBe('red')
    })
  })

  describe('lighten', () => {
    it('should lighten color', () => {
      const original = hexToRgb('#ff6b6b')
      const result = hexToRgb(lighten('#ff6b6b', 10))

      expect(result).toBeDefined()
      if (result && original) {
        // Lightened color should have higher average RGB
        const originalAvg = (original.r + original.g + original.b) / 3
        const resultAvg = (result.r + result.g + result.b) / 3
        expect(resultAvg).toBeGreaterThan(originalAvg)
      }
    })

    it('should not exceed max lightness', () => {
      const result = lighten('#ffffff', 50)
      expect(result).toBe('#ffffff')
    })

    it('should return original for invalid color', () => {
      expect(lighten('invalid', 10)).toBe('invalid')
    })
  })

  describe('darken', () => {
    it('should darken color', () => {
      const original = hexToRgb('#ff6b6b')
      const result = hexToRgb(darken('#ff6b6b', 10))

      expect(result).toBeDefined()
      if (result && original) {
        // Darkened color should have lower average RGB
        const originalAvg = (original.r + original.g + original.b) / 3
        const resultAvg = (result.r + result.g + result.b) / 3
        expect(resultAvg).toBeLessThan(originalAvg)
      }
    })

    it('should not go below min lightness', () => {
      const result = darken('#000000', 50)
      expect(result).toBe('#000000')
    })

    it('should return original for invalid color', () => {
      expect(darken('invalid', 10)).toBe('invalid')
    })
  })

  describe('isDark', () => {
    it('should return true for black', () => {
      expect(isDark('#000000')).toBe(true)
    })

    it('should return false for white', () => {
      expect(isDark('#ffffff')).toBe(false)
    })

    it('should return true for dark colors', () => {
      expect(isDark('#1a1a1a')).toBe(true)
      expect(isDark('#333333')).toBe(true)
    })

    it('should return false for light colors', () => {
      expect(isDark('#f0f0f0')).toBe(false)
      expect(isDark('#cccccc')).toBe(false)
    })

    it('should return false for invalid color', () => {
      expect(isDark('invalid')).toBe(false)
    })
  })

  describe('getContrastColor', () => {
    it('should return white for dark backgrounds', () => {
      expect(getContrastColor('#000000')).toBe('#ffffff')
      expect(getContrastColor('#1a1a1a')).toBe('#ffffff')
    })

    it('should return black for light backgrounds', () => {
      expect(getContrastColor('#ffffff')).toBe('#000000')
      expect(getContrastColor('#f0f0f0')).toBe('#000000')
    })
  })

  describe('parseColor', () => {
    it('should parse hex color', () => {
      expect(parseColor('#ff6b6b')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should parse rgb color', () => {
      expect(parseColor('rgb(255, 107, 107)')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should return null for unsupported format', () => {
      expect(parseColor('red')).toBeNull()
      expect(parseColor('hsl(0, 100%, 50%)')).toBeNull()
    })
  })

  describe('formatColor', () => {
    it('should format RGB', () => {
      expect(formatColor({ r: 255, g: 107, b: 107 })).toBe('rgb(255, 107, 107)')
    })

    it('should format RGBA', () => {
      expect(formatColor({ r: 255, g: 107, b: 107, a: 0.5 })).toBe('rgba(255, 107, 107, 0.5)')
    })

    it('should not include alpha when 1', () => {
      expect(formatColor({ r: 255, g: 107, b: 107, a: 1 })).toBe('rgb(255, 107, 107)')
    })
  })

  describe('mixColors', () => {
    it('should mix two colors equally', () => {
      const result = mixColors('#ff0000', '#0000ff', 0.5)
      const rgb = hexToRgb(result)

      expect(rgb).toBeDefined()
      if (rgb) {
        // Should be purple-ish
        expect(rgb.r).toBeGreaterThan(0)
        expect(rgb.b).toBeGreaterThan(0)
      }
    })

    it('should favor first color with low weight', () => {
      const result = mixColors('#ff0000', '#0000ff', 0.1)
      const rgb = hexToRgb(result)

      expect(rgb).toBeDefined()
      if (rgb) {
        expect(rgb.r).toBeGreaterThan(rgb.b)
      }
    })

    it('should favor second color with high weight', () => {
      const result = mixColors('#ff0000', '#0000ff', 0.9)
      const rgb = hexToRgb(result)

      expect(rgb).toBeDefined()
      if (rgb) {
        expect(rgb.b).toBeGreaterThan(rgb.r)
      }
    })

    it('should return first color if second is invalid', () => {
      expect(mixColors('#ff0000', 'invalid', 0.5)).toBe('#ff0000')
    })

    it('should return first color if first is invalid', () => {
      expect(mixColors('invalid', '#0000ff', 0.5)).toBe('invalid')
    })
  })
})
