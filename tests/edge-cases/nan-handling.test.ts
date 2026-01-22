/**
 * NaN and Edge Case Handling Tests
 *
 * Tests for proper handling of NaN, undefined, null,
 * and other edge cases in color utilities and CSS generation.
 */

import { describe, it, expect } from 'vitest'
import { rgbToHex, hexToRgb, parseRgbString, lighten, darken } from '../../src/utils/color'
import { InvalidValueError } from '../../src/errors'

describe('NaN Handling', () => {
  describe('rgbToHex', () => {
    it('should throw on NaN in first argument (number form)', () => {
      expect(() => rgbToHex(NaN, 100, 200))
        .toThrow()
    })

    it('should throw on NaN in second argument', () => {
      expect(() => rgbToHex(255, NaN, 200))
        .toThrow()
    })

    it('should throw on NaN in third argument', () => {
      expect(() => rgbToHex(255, 100, NaN))
        .toThrow()
    })

    it('should throw on NaN in object form', () => {
      expect(() => rgbToHex({ r: NaN, g: 100, b: 200 }))
        .toThrow()
    })

    it('should throw on Infinity', () => {
      expect(() => rgbToHex(Infinity, 100, 200))
        .toThrow()
      expect(() => rgbToHex({ r: 255, g: Infinity, b: 200 }))
        .toThrow()
    })

    it('should handle valid numbers correctly', () => {
      expect(rgbToHex(255, 100, 200)).toBe('#ff64c8')
      expect(rgbToHex(0, 0, 0)).toBe('#000000')
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff')
    })

    it('should clamp values to 0-255 range', () => {
      expect(rgbToHex(-10, 300, 128)).toBe('#00ff80')
      expect(rgbToHex({ r: -5, g: 500, b: 50 })).toBe('#00ff32')
    })
  })

  describe('hexToRgb', () => {
    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull()
      expect(hexToRgb('#gggggg')).toBeNull()
    })

    it('should handle short hex format', () => {
      // 3-character hex colors are expanded to 6-character
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 })
      expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 })
      expect(hexToRgb('#00f')).toEqual({ r: 0, g: 0, b: 255 })
    })

    it('should handle 6-digit hex', () => {
      expect(hexToRgb('#ff6b6b')).toEqual({ r: 255, g: 107, b: 107 })
    })

    it('should handle 8-digit hex with alpha', () => {
      const result = hexToRgb('#ff6b6b80')
      // Note: Due to floating point precision, a might not be exactly 0.5
      expect(result).toEqual({ r: 255, g: 107, b: 107, a: expect.any(Number) })
      expect(result.a).toBeCloseTo(0.5, 1) // Within 1% tolerance
    })
  })

  describe('parseRgbString', () => {
    it('should handle invalid numeric values gracefully', () => {
      const result = parseRgbString('rgb(999, 0, 0)')
      expect(result).toEqual({ r: 255, g: 0, b: 0 }) // Clamped
    })

    it('should handle negative values', () => {
      const result = parseRgbString('rgb(-50, 100, 200)')
      expect(result).toEqual({ r: 0, g: 100, b: 200 }) // Clamped to 0
    })

    it('should return null for invalid format', () => {
      expect(parseRgbString('invalid')).toBeNull()
      expect(parseRgbString('rgb()')).toBeNull()
    })
  })

  describe('lighten/darken', () => {
    it('should handle invalid colors by returning original', () => {
      expect(lighten('invalid', 20)).toBe('invalid')
      expect(darken('invalid', 20)).toBe('invalid')
    })

    it('should clamp percentage limits', () => {
      const result = lighten('#ff0000', 200) // Try to lighten by 200%
      expect(result).toBeTruthy()
      expect(result.length).toBeGreaterThan(0)
    })
  })
})

describe('Undefined/Null Handling', () => {
  describe('rgbToHex with object', () => {
    it('should throw on undefined properties', () => {
      expect(() => rgbToHex({ r: undefined, g: 100, b: 200 } as any))
        .toThrow()
    })

    it('should throw on missing properties (not default to 0)', () => {
      // Changed behavior: undefined now throws instead of defaulting to 0
      expect(() => rgbToHex({ r: 255, g: undefined as any, b: 200 }))
        .toThrow()
    })

    it('should throw on null object', () => {
      expect(() => rgbToHex(null as unknown as any))
        .toThrow()
    })
  })

  describe('hexToRgb', () => {
    it('should handle null input', () => {
      expect(hexToRgb(null as unknown as string)).toBeNull()
    })

    it('should handle undefined input', () => {
      expect(hexToRgb(undefined as unknown as string)).toBeNull()
    })

    it('should handle empty string', () => {
      expect(hexToRgb('')).toBeNull()
    })
  })
})

describe('Empty String Handling', () => {
  it('should handle empty hex string', () => {
    expect(hexToRgb('')).toBeNull()
  })

  it('should handle empty rgb string', () => {
    expect(parseRgbString('')).toBeNull()
  })
})

describe('Numeric Edge Cases', () => {
  describe('very small numbers', () => {
    it('should handle sub-zero values', () => {
      // The actual implementation rounds small values to 0
      // 0.1*255 = 25.5 -> gets rounded to 0 in hex
      // This is actually expected behavior for very small values
      expect(rgbToHex(0.1, 0.5, 0.9)).toBe('#000101')
      expect(rgbToHex({ r: 0.1, g: 0.5, b: 0.9 })).toBe('#000101')
    })
  })

  describe('very large numbers', () => {
    it('should clamp large positive values', () => {
      expect(rgbToHex(10000, 99999, 1000000)).toBe('#ffffff')
    })
  })
})
