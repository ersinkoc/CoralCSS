/**
 * Token Transforms Tests
 *
 * Tests for custom transforms for converting tokens to different platforms.
 */
import { describe, it, expect } from 'vitest'
import { transforms, transformGroups } from '../../../src/design-system/token-transforms'
import type { ProcessedToken, PlatformConfig } from '../../../src/design-system/types'

describe('Token Transforms', () => {
  const createMockToken = (overrides: Partial<ProcessedToken> = {}): ProcessedToken => ({
    name: 'test-token',
    value: 'test-value',
    original: { $value: 'test-value', $type: 'string' },
    path: ['category', 'type', 'item'],
    attributes: {},
    ...overrides,
  })

  const createMockConfig = (overrides: Partial<PlatformConfig> = {}): PlatformConfig => ({
    transformGroup: 'web',
    buildPath: 'dist/',
    files: [],
    prefix: 'coral',
    ...overrides,
  })

  describe('name transforms', () => {
    describe('name/kebab', () => {
      it('should convert path to kebab-case', () => {
        const transform = transforms['name/kebab']
        const token = createMockToken({ path: ['color', 'primary', 'base'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('color-primary-base')
      })

      it('should lowercase the result', () => {
        const transform = transforms['name/kebab']
        const token = createMockToken({ path: ['Color', 'PRIMARY'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('color-primary')
      })
    })

    describe('name/camel', () => {
      it('should convert path to camelCase', () => {
        const transform = transforms['name/camel']
        const token = createMockToken({ path: ['color', 'primary', 'base'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('colorPrimaryBase')
      })
    })

    describe('name/pascal', () => {
      it('should convert path to PascalCase', () => {
        const transform = transforms['name/pascal']
        const token = createMockToken({ path: ['color', 'primary', 'base'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('ColorPrimaryBase')
      })
    })

    describe('name/snake', () => {
      it('should convert path to snake_case', () => {
        const transform = transforms['name/snake']
        const token = createMockToken({ path: ['color', 'primary', 'base'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('color_primary_base')
      })
    })

    describe('name/constant', () => {
      it('should convert path to CONSTANT_CASE', () => {
        const transform = transforms['name/constant']
        const token = createMockToken({ path: ['color', 'primary', 'base'] })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('COLOR_PRIMARY_BASE')
      })
    })

    describe('name/css', () => {
      it('should add CSS variable prefix', () => {
        const transform = transforms['name/css']
        const token = createMockToken({ path: ['color', 'primary'] })
        const config = createMockConfig({ prefix: 'app' })

        const result = transform.transform!(token, config)

        expect(result).toBe('--app-color-primary')
      })

      it('should work without prefix', () => {
        const transform = transforms['name/css']
        const token = createMockToken({ path: ['color', 'primary'] })
        const config = createMockConfig({ prefix: '' })

        const result = transform.transform!(token, config)

        expect(result).toBe('--color-primary')
      })
    })
  })

  describe('color transforms', () => {
    describe('value/color/hex', () => {
      it('should return hex color as-is', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: '#ff6347',
          original: { $value: '#ff6347', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('#ff6347')
      })

      it('should convert rgb to hex', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'rgb(255, 99, 71)',
          original: { $value: 'rgb(255, 99, 71)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
      })

      it('should convert rgba to hex with alpha', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'rgba(255, 99, 71, 0.5)',
          original: { $value: 'rgba(255, 99, 71, 0.5)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/^#[0-9a-f]{8}$/i)
      })

      it('should convert hsl to hex', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'hsl(9, 100%, 64%)',
          original: { $value: 'hsl(9, 100%, 64%)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
      })

      it('should handle grayscale hsl values', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'hsl(0, 0%, 50%)',
          original: { $value: 'hsl(0, 0%, 50%)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/^#[0-9a-f]{6}$/i)
      })

      it('should convert hsla to hex with alpha', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'hsla(9, 100%, 64%, 0.5)',
          original: { $value: 'hsla(9, 100%, 64%, 0.5)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        // hsla with alpha should produce 8-character hex (#rrggbbaa)
        expect(result).toMatch(/^#[0-9a-f]{8}$/i)
      })

      it('should handle hsla with grayscale and alpha', () => {
        const transform = transforms['value/color/hex']
        const token = createMockToken({
          value: 'hsla(0, 0%, 50%, 0.75)',
          original: { $value: 'hsla(0, 0%, 50%, 0.75)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/^#[0-9a-f]{8}$/i)
      })

      it('should filter color tokens only', () => {
        const transform = transforms['value/color/hex']
        const colorToken = createMockToken({
          original: { $value: '#ff6347', $type: 'color' },
        })
        const otherToken = createMockToken({
          original: { $value: '16px', $type: 'dimension' },
        })

        expect(transform.filter!(colorToken)).toBe(true)
        expect(transform.filter!(otherToken)).toBe(false)
      })
    })

    describe('value/color/rgba', () => {
      it('should return rgba as-is', () => {
        const transform = transforms['value/color/rgba']
        const token = createMockToken({
          value: 'rgba(255, 99, 71, 0.5)',
          original: { $value: 'rgba(255, 99, 71, 0.5)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('rgba(255, 99, 71, 0.5)')
      })

      it('should convert hex to rgba', () => {
        const transform = transforms['value/color/rgba']
        const token = createMockToken({
          value: '#ff6347',
          original: { $value: '#ff6347', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('rgba(')
      })

      it('should convert rgb to rgba', () => {
        const transform = transforms['value/color/rgba']
        const token = createMockToken({
          value: 'rgb(255, 99, 71)',
          original: { $value: 'rgb(255, 99, 71)', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('rgba(')
      })
    })

    describe('value/color/UIColor', () => {
      it('should convert hex to UIColor', () => {
        const transform = transforms['value/color/UIColor']
        const token = createMockToken({
          value: '#ff6347',
          original: { $value: '#ff6347', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('UIColor(red:')
        expect(result).toContain('green:')
        expect(result).toContain('blue:')
        expect(result).toContain('alpha:')
      })

      it('should handle hex with alpha', () => {
        const transform = transforms['value/color/UIColor']
        const token = createMockToken({
          value: '#ff634780',
          original: { $value: '#ff634780', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('alpha: 0.50')
      })
    })

    describe('value/color/compose', () => {
      it('should convert hex to Compose Color', () => {
        const transform = transforms['value/color/compose']
        const token = createMockToken({
          value: '#ff6347',
          original: { $value: '#ff6347', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toMatch(/Color\(0x[A-F0-9]+\)/)
      })

      it('should handle hex with alpha', () => {
        const transform = transforms['value/color/compose']
        const token = createMockToken({
          value: '#ff634780',
          original: { $value: '#ff634780', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('Color(0x')
      })
    })
  })

  describe('dimension transforms', () => {
    describe('value/dimension/px', () => {
      it('should return px values as-is', () => {
        const transform = transforms['value/dimension/px']
        const token = createMockToken({
          value: '16px',
          original: { $value: '16px', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('16px')
      })

      it('should convert rem to px', () => {
        const transform = transforms['value/dimension/px']
        const token = createMockToken({
          value: '1rem',
          original: { $value: '1rem', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('16px')
      })

      it('should convert em to px', () => {
        const transform = transforms['value/dimension/px']
        const token = createMockToken({
          value: '2em',
          original: { $value: '2em', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('32px')
      })

      it('should filter dimension-type tokens', () => {
        const transform = transforms['value/dimension/px']
        expect(transform.filter!(createMockToken({
          original: { $value: '16px', $type: 'dimension' },
        }))).toBe(true)
        expect(transform.filter!(createMockToken({
          original: { $value: '1rem', $type: 'spacing' },
        }))).toBe(true)
        expect(transform.filter!(createMockToken({
          original: { $value: '100%', $type: 'sizing' },
        }))).toBe(true)
        expect(transform.filter!(createMockToken({
          original: { $value: '4px', $type: 'borderRadius' },
        }))).toBe(true)
      })
    })

    describe('value/dimension/rem', () => {
      it('should return rem values as-is', () => {
        const transform = transforms['value/dimension/rem']
        const token = createMockToken({
          value: '1rem',
          original: { $value: '1rem', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('1rem')
      })

      it('should convert px to rem', () => {
        const transform = transforms['value/dimension/rem']
        const token = createMockToken({
          value: '16px',
          original: { $value: '16px', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('1rem')
      })
    })

    describe('value/dimension/dp', () => {
      it('should convert px to dp', () => {
        const transform = transforms['value/dimension/dp']
        const token = createMockToken({
          value: '16px',
          original: { $value: '16px', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('16.dp')
      })

      it('should convert rem to dp', () => {
        const transform = transforms['value/dimension/dp']
        const token = createMockToken({
          value: '1rem',
          original: { $value: '1rem', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('16.dp')
      })

      it('should handle numeric values', () => {
        const transform = transforms['value/dimension/dp']
        const token = createMockToken({
          value: '8',
          original: { $value: '8', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('8.dp')
      })
    })

    describe('value/dimension/cgfloat', () => {
      it('should convert to CGFloat', () => {
        const transform = transforms['value/dimension/cgfloat']
        const token = createMockToken({
          value: '16px',
          original: { $value: '16px', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('CGFloat(16)')
      })

      it('should convert rem to CGFloat', () => {
        const transform = transforms['value/dimension/cgfloat']
        const token = createMockToken({
          value: '1rem',
          original: { $value: '1rem', $type: 'dimension' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('CGFloat(16)')
      })
    })
  })

  describe('font weight transforms', () => {
    describe('value/fontWeight/number', () => {
      it('should return numeric weight as-is', () => {
        const transform = transforms['value/fontWeight/number']
        const token = createMockToken({
          value: 700,
          original: { $value: 700, $type: 'fontWeight' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe(700)
      })

      it('should convert string weight names to numbers', () => {
        const transform = transforms['value/fontWeight/number']
        const testCases = [
          { input: 'thin', expected: 100 },
          { input: 'light', expected: 300 },
          { input: 'normal', expected: 400 },
          { input: 'medium', expected: 500 },
          { input: 'semibold', expected: 600 },
          { input: 'bold', expected: 700 },
          { input: 'extrabold', expected: 800 },
          { input: 'black', expected: 900 },
        ]

        for (const { input, expected } of testCases) {
          const token = createMockToken({
            value: input,
            original: { $value: input, $type: 'fontWeight' },
          })
          const result = transform.transform!(token, {} as PlatformConfig)
          expect(result).toBe(expected)
        }
      })

      it('should handle unknown weight names', () => {
        const transform = transforms['value/fontWeight/number']
        const token = createMockToken({
          value: 'unknown',
          original: { $value: 'unknown', $type: 'fontWeight' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe(400) // Default
      })
    })

    describe('value/fontWeight/swift', () => {
      it('should convert to Swift Font.Weight', () => {
        const transform = transforms['value/fontWeight/swift']
        const testCases = [
          { input: 100, expected: 'Font.Weight.ultraLight' },
          { input: 400, expected: 'Font.Weight.regular' },
          { input: 700, expected: 'Font.Weight.bold' },
          { input: 900, expected: 'Font.Weight.black' },
        ]

        for (const { input, expected } of testCases) {
          const token = createMockToken({
            value: input,
            original: { $value: input, $type: 'fontWeight' },
          })
          const result = transform.transform!(token, {} as PlatformConfig)
          expect(result).toBe(expected)
        }
      })

      it('should handle unknown weight values', () => {
        const transform = transforms['value/fontWeight/swift']
        const token = createMockToken({
          value: 350,
          original: { $value: 350, $type: 'fontWeight' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('Font.Weight.regular')
      })
    })
  })

  describe('shadow transforms', () => {
    describe('value/shadow/css', () => {
      it('should return string shadow as-is', () => {
        const transform = transforms['value/shadow/css']
        const token = createMockToken({
          value: '0 1px 2px rgba(0,0,0,0.1)',
          original: { $value: '0 1px 2px rgba(0,0,0,0.1)', $type: 'shadow' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('0 1px 2px rgba(0,0,0,0.1)')
      })

      it('should format shadow object', () => {
        const transform = transforms['value/shadow/css']
        const token = createMockToken({
          value: { x: 0, y: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.1)' },
          original: { $value: {}, $type: 'shadow' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('0')
        expect(result).toContain('rgba(0,0,0,0.1)')
      })

      it('should format shadow array', () => {
        const transform = transforms['value/shadow/css']
        const token = createMockToken({
          value: [
            { x: 0, y: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.1)' },
            { x: 0, y: 4, blur: 6, spread: 0, color: 'rgba(0,0,0,0.2)' },
          ],
          original: { $value: [], $type: 'shadow' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain(',')
      })

      it('should handle inset shadows', () => {
        const transform = transforms['value/shadow/css']
        const token = createMockToken({
          value: { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0,0,0,0.1)', inset: true },
          original: { $value: {}, $type: 'shadow' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toContain('inset')
      })
    })
  })

  describe('cubic bezier transforms', () => {
    describe('value/cubicBezier/css', () => {
      it('should return string easing as-is', () => {
        const transform = transforms['value/cubicBezier/css']
        const token = createMockToken({
          value: 'cubic-bezier(0.4, 0, 0.2, 1)',
          original: { $value: 'cubic-bezier(0.4, 0, 0.2, 1)', $type: 'cubicBezier' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
      })

      it('should format array to cubic-bezier', () => {
        const transform = transforms['value/cubicBezier/css']
        const token = createMockToken({
          value: [0.4, 0, 0.2, 1],
          original: { $value: [0.4, 0, 0.2, 1], $type: 'cubicBezier' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
      })
    })
  })

  describe('attribute transforms', () => {
    describe('attribute/cti', () => {
      it('should add CTI attributes', () => {
        const transform = transforms['attribute/cti']
        const token = createMockToken({
          path: ['color', 'primary', 'base', 'dark'],
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toEqual({
          category: 'color',
          type: 'primary',
          item: 'base',
          subitem: 'dark',
        })
      })

      it('should handle short paths', () => {
        const transform = transforms['attribute/cti']
        const token = createMockToken({
          path: ['color'],
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toEqual({
          category: 'color',
          type: '',
          item: '',
          subitem: '',
        })
      })
    })

    describe('attribute/coral', () => {
      it('should add CoralCSS attributes', () => {
        const transform = transforms['attribute/coral']
        const token = createMockToken({
          original: {
            $value: '#ff6347',
            $type: 'color',
            $extensions: {
              'com.coralcss': {
                utility: 'text-coral',
                responsive: true,
                darkMode: true,
                variants: ['hover', 'focus'],
              },
            },
          },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toEqual({
          utility: 'text-coral',
          responsive: 'true',
          darkMode: 'true',
          variants: 'hover,focus',
        })
      })

      it('should handle missing extensions', () => {
        const transform = transforms['attribute/coral']
        const token = createMockToken({
          original: { $value: '#ff6347', $type: 'color' },
        })

        const result = transform.transform!(token, {} as PlatformConfig)

        expect(result).toEqual({
          utility: '',
          responsive: 'false',
          darkMode: 'false',
          variants: '',
        })
      })
    })
  })

  describe('transformGroups', () => {
    it('should have web transform group', () => {
      expect(transformGroups['web']).toBeDefined()
      expect(transformGroups['web']).toContain('name/kebab')
      expect(transformGroups['web']).toContain('value/color/hex')
    })

    it('should have scss transform group', () => {
      expect(transformGroups['scss']).toBeDefined()
    })

    it('should have js transform group', () => {
      expect(transformGroups['js']).toBeDefined()
      expect(transformGroups['js']).toContain('name/camel')
    })

    it('should have ts transform group', () => {
      expect(transformGroups['ts']).toBeDefined()
    })

    it('should have ios transform group', () => {
      expect(transformGroups['ios']).toBeDefined()
      expect(transformGroups['ios']).toContain('value/color/UIColor')
    })

    it('should have ios-swiftui transform group', () => {
      expect(transformGroups['ios-swiftui']).toBeDefined()
    })

    it('should have android transform group', () => {
      expect(transformGroups['android']).toBeDefined()
      expect(transformGroups['android']).toContain('name/snake')
    })

    it('should have compose transform group', () => {
      expect(transformGroups['compose']).toBeDefined()
      expect(transformGroups['compose']).toContain('value/color/compose')
    })

    it('should have flutter transform group', () => {
      expect(transformGroups['flutter']).toBeDefined()
    })

    it('should have react-native transform group', () => {
      expect(transformGroups['react-native']).toBeDefined()
    })

    it('should have figma transform group', () => {
      expect(transformGroups['figma']).toBeDefined()
    })

    it('should have coral transform group', () => {
      expect(transformGroups['coral']).toBeDefined()
      expect(transformGroups['coral']).toContain('attribute/coral')
      expect(transformGroups['coral']).toContain('name/css')
    })
  })
})
