/**
 * Tests for Browser Fallbacks System
 */
import { describe, it, expect } from 'vitest'
import {
  convertOKLABToRGB,
  generateOKLABFallback,
  generatePropertyFallback,
  generateGradientFallback,
  processCSSWithFallbacks,
  createFallbacksPlugin,
  defaultFallbackConfig,
  type FallbackConfig,
} from '../../../src/core/fallbacks'

describe('Browser Fallbacks System', () => {
  describe('convertOKLABToRGB', () => {
    it('should convert basic oklab color to rgb', () => {
      const result = convertOKLABToRGB('oklab(0.5 0.1 0.1)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should convert oklab with alpha to rgba', () => {
      const result = convertOKLABToRGB('oklab(0.5 0.1 0.1 / 0.5)')
      expect(result).toMatch(/^rgba\(\d+, \d+, \d+, 0\.5\)$/)
    })

    it('should handle decimal alpha values', () => {
      const result = convertOKLABToRGB('oklab(0.5 0.1 0.1 / 0.75)')
      expect(result).toContain('0.75')
    })

    it('should return safe fallback for invalid oklab format', () => {
      const result = convertOKLABToRGB('invalid-color')
      expect(result).toBe('rgb(100, 100, 100)')
    })

    it('should handle empty string input', () => {
      const result = convertOKLABToRGB('')
      expect(result).toBe('rgb(100, 100, 100)')
    })

    it('should convert oklch color to rgb', () => {
      const result = convertOKLABToRGB('oklch(0.5 0.2 120)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should clamp RGB values to valid range', () => {
      const result = convertOKLABToRGB('oklab(1 0.5 0.5)')
      const match = result.match(/rgb\((\d+), (\d+), (\d+)\)/)
      expect(match).toBeTruthy()
      if (match) {
        const [, r, g, b] = match
        const rVal = parseInt(r, 10)
        const gVal = parseInt(g, 10)
        const bVal = parseInt(b, 10)
        expect(rVal).toBeGreaterThanOrEqual(0)
        expect(rVal).toBeLessThanOrEqual(255)
        expect(gVal).toBeGreaterThanOrEqual(0)
        expect(gVal).toBeLessThanOrEqual(255)
        expect(bVal).toBeGreaterThanOrEqual(0)
        expect(bVal).toBeLessThanOrEqual(255)
      }
    })
  })

  describe('generateOKLABFallback', () => {
    it('should generate fallback with @supports block', () => {
      const result = generateOKLABFallback('oklab(0.5 0.1 0.1)', 'background-color')
      expect(result).toContain('background-color:')
      expect(result).toContain('@supports (background-color: oklab(1 0 0))')
      expect(result).toContain('background-color: oklab(0.5 0.1 0.1);')
    })

    it('should generate RGB fallback before @supports', () => {
      const result = generateOKLABFallback('oklab(0.5 0.1 0.1)', 'color')
      const lines = result.split('\n')
      expect(lines[0]).toContain('color: rgb(')
      expect(lines[1]).toContain('@supports')
    })

    it('should handle different property names', () => {
      const result = generateOKLABFallback('oklab(0.6 0.2 0.1)', 'border-color')
      expect(result).toContain('border-color:')
      expect(result).toContain('@supports (border-color: oklab(1 0 0))')
    })

    it('should handle oklch colors', () => {
      const result = generateOKLABFallback('oklch(0.5 0.2 120)', 'background-color')
      expect(result).toContain('background-color: rgb(')
      expect(result).toContain('@supports (background-color: oklab(1 0 0))')
    })
  })

  describe('generatePropertyFallback', () => {
    it('should generate fallback with @supports block', () => {
      const result = generatePropertyFallback(
        'box-shadow',
        '0 4px 6px var(--shadow-color)',
        '0 4px 6px rgba(0, 0, 0, 0.1)'
      )
      expect(result).toContain('box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);')
      expect(result).toContain('@supports (box-shadow: 0 4px 6px var(--shadow-color))')
      expect(result).toContain('box-shadow: 0 4px 6px var(--shadow-color);')
    })

    it('should handle different properties', () => {
      const result = generatePropertyFallback(
        'filter',
        'blur(var(--blur-amount))',
        'blur(4px)'
      )
      expect(result).toContain('filter: blur(4px);')
      expect(result).toContain('@supports (filter: blur(var(--blur-amount)))')
    })

    it('should handle clip-path property', () => {
      const result = generatePropertyFallback(
        'clip-path',
        'polygon(var(--points))',
        'polygon(10% 20%, 30% 40%, 50% 60%)'
      )
      expect(result).toContain('clip-path:')
      expect(result).toContain('@supports')
    })
  })

  describe('generateGradientFallback', () => {
    it('should generate gradient with solid color fallback', () => {
      const result = generateGradientFallback(
        'linear-gradient(to right, blue, red)',
        '#3b82f6'
      )
      expect(result).toContain('background-color: #3b82f6;')
      expect(result).toContain('background-image: linear-gradient(to right, blue, red);')
    })

    it('should handle different gradient types', () => {
      const result = generateGradientFallback(
        'radial-gradient(circle, white, black)',
        '#ffffff'
      )
      expect(result).toContain('background-color: #ffffff;')
      expect(result).toContain('background-image: radial-gradient(circle, white, black);')
    })

    it('should handle conic gradients', () => {
      const result = generateGradientFallback(
        'conic-gradient(from 0deg, red, blue)',
        '#ef4444'
      )
      expect(result).toContain('background-color: #ef4444;')
      expect(result).toContain('background-image: conic-gradient(from 0deg, red, blue);')
    })
  })

  describe('processCSSWithFallbacks', () => {
    it('should process CSS with oklab colors', () => {
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
  color: white;
}`

      const result = processCSSWithFallbacks(input)
      // Check that original CSS is preserved
      expect(result).toContain('background-color: oklab(0.5 0.1 0.1)')
      expect(result).toContain('color: white;')
    })

    it('should process CSS with oklch colors', () => {
      const input = `.card {
  background: oklch(0.5 0.2 120);
}`

      const result = processCSSWithFallbacks(input)
      // Should contain the original CSS
      expect(result).toContain('oklch(0.5 0.2 120)')
    })

    it('should process CSS with color-mix', () => {
      const input = `.text {
  color: color-mix(in srgb, red 50%, blue);
}`

      const result = processCSSWithFallbacks(input)
      // Should detect and preserve color-mix
      expect(result).toContain('color-mix')
    })

    it('should process CSS with gradients', () => {
      const input = `.hero {
  background-image: linear-gradient(to right, blue, red);
}`

      const result = processCSSWithFallbacks(input)
      // Should handle gradients
      expect(result).toContain('linear-gradient')
    })

    it('should process CSS with CSS variables in box-shadow', () => {
      const input = `.shadow-box {
  box-shadow: 0 4px 6px var(--shadow-color);
}`

      const result = processCSSWithFallbacks(input)
      // Should handle CSS variables in box-shadow
      expect(result).toContain('box-shadow')
    })

    it('should handle multiple properties in same rule', () => {
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
  color: white;
  padding: 1rem;
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color: oklab(0.5 0.1 0.1)')
      expect(result).toContain('color: white;')
      expect(result).toContain('padding: 1rem;')
    })

    it('should handle multiple rules', () => {
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
}

.card {
  background: oklch(0.6 0.2 120);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('.button')
      expect(result).toContain('.card')
      expect(result).toContain('oklab(0.5 0.1 0.1)')
      expect(result).toContain('oklch(0.6 0.2 120)')
    })

    it('should not add fallbacks when disabled', () => {
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
}`

      const config: FallbackConfig = {
        oklabFallbacks: false,
        propertyFallbacks: false,
        gradientFallbacks: false,
      }

      const result = processCSSWithFallbacks(input, config)
      // Should preserve original CSS
      expect(result).toContain('oklab(0.5 0.1 0.1)')
    })

    it('should handle CSS without any modern features', () => {
      const input = `.button {
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('#3b82f6')
      expect(result).toContain('color: white;')
      expect(result).toContain('padding: 1rem;')
    })

    it('should handle empty CSS input', () => {
      const result = processCSSWithFallbacks('')
      expect(result).toBe('')
    })
  })

  describe('createFallbacksPlugin', () => {
    it('should create a plugin with correct name', () => {
      const plugin = createFallbacksPlugin()
      expect(plugin.name).toBe('browser-fallbacks')
    })

    it('should create a plugin with correct version', () => {
      const plugin = createFallbacksPlugin()
      expect(plugin.version).toBe('1.0.0')
    })

    it('should have postProcess method', () => {
      const plugin = createFallbacksPlugin()
      expect(plugin.postProcess).toBeDefined()
      expect(typeof plugin.postProcess).toBe('function')
    })

    it('should process CSS through postProcess', () => {
      const plugin = createFallbacksPlugin()
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
}`

      const result = plugin.postProcess(input)
      expect(result).toContain('oklab(0.5 0.1 0.1)')
    })

    it('should return original CSS when fallbacks are disabled', () => {
      const plugin = createFallbacksPlugin({
        oklabFallbacks: false,
        propertyFallbacks: false,
        gradientFallbacks: false,
      })

      const input = '.button { color: red; }'
      const result = plugin.postProcess(input)
      expect(result).toContain('color: red;')
    })

    it('should accept custom config', () => {
      const customConfig: FallbackConfig = {
        oklabFallbacks: false,
        targetBrowsers: ['safari < 17'],
        minSafariVersion: 17,
      }

      const plugin = createFallbacksPlugin(customConfig)
      const input = '.button { background: oklab(0.5 0.1 0.1); }'

      const result = plugin.postProcess(input)
      // Should preserve original CSS
      expect(result).toContain('oklab(0.5 0.1 0.1)')
    })
  })

  describe('defaultFallbackConfig', () => {
    it('should have oklabFallbacks enabled by default', () => {
      expect(defaultFallbackConfig.oklabFallbacks).toBe(true)
    })

    it('should have propertyFallbacks enabled by default', () => {
      expect(defaultFallbackConfig.propertyFallbacks).toBe(true)
    })

    it('should have gradientFallbacks enabled by default', () => {
      expect(defaultFallbackConfig.gradientFallbacks).toBe(true)
    })

    it('should have default target browsers', () => {
      expect(defaultFallbackConfig.targetBrowsers).toEqual([
        'safari < 16.4',
        'firefox < 128',
      ])
    })

    it('should have Safari version 16.4 as minimum', () => {
      expect(defaultFallbackConfig.minSafariVersion).toBe(16.4)
    })

    it('should have Firefox version 128 as minimum', () => {
      expect(defaultFallbackConfig.minFirefoxVersion).toBe(128)
    })
  })

  describe('Edge Cases', () => {
    it('should handle malformed CSS gracefully', () => {
      const input = `
.button {
  background-color: oklab(0.5;
  color: white;
}
      `.trim()

      const result = processCSSWithFallbacks(input)
      expect(result).toBeTruthy()
    })

    it('should handle nested braces', () => {
      const input = `
@media (min-width: 640px) {
  .button {
    background-color: oklab(0.5 0.1 0.1);
  }
}
      `.trim()

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('@media')
      expect(result).toContain('oklab(0.5 0.1 0.1)')
    })

    it('should handle CSS comments', () => {
      const input = `
/* Button styles */
.button {
  background-color: oklab(0.5 0.1 0.1); /* Modern color */
}
      `.trim()

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('/* Button styles */')
    })

    it('should handle multiple oklab declarations', () => {
      const input = `.button {
  background-color: oklab(0.5 0.1 0.1);
  border-color: oklab(0.6 0.2 0.1);
}`

      const result = processCSSWithFallbacks(input)
      // Should contain both oklab declarations
      expect(result).toContain('oklab(0.5 0.1 0.1)')
      expect(result).toContain('oklab(0.6 0.2 0.1)')
    })

    it('should handle oklab in @supports queries', () => {
      const input = `
@supports (background-color: oklab(1 0 0)) {
  .button {
    background-color: oklab(0.5 0.1 0.1);
  }
}
      `.trim()

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('@supports')
    })
  })
})
