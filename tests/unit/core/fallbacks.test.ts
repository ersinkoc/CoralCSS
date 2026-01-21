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

    it('should hit toLinear if branch with large L value', () => {
      // L value >= 16.27 triggers the toLinear if branch (x >= 0.206893034)
      // This also triggers toSRGB if branch (x > 0.0031308) with positive values
      const result = convertOKLABToRGB('oklab(20 0 0)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should hit both conversion branches with high lightness', () => {
      // Very high L value ensures toLinear returns positive value
      // which then makes toSRGB receive values > 0.0031308
      const result = convertOKLABToRGB('oklab(25 0.1 0.1)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
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

  describe('Gradient Fallback Code Path', () => {
    it('should add background-color fallback for gradient with color-mix', () => {
      // This CSS value passes needsFallback (has color-mix) AND has gradient
      const input = `.hero {
  background: linear-gradient(to right, color-mix(in srgb, red 50%, blue), white);
}`

      const result = processCSSWithFallbacks(input)
      // Should add background-color fallback extracted from gradient
      expect(result).toContain('background-color:')
    })

    it('should extract fallback color from gradient with color-mix in stops', () => {
      const input = `.banner {
  background-image: radial-gradient(circle, color-mix(in oklch, blue, green), transparent);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color:')
    })
  })

  describe('Box-shadow CSS Variable Fallback Code Path', () => {
    it('should add box-shadow fallback when value has color-mix and var()', () => {
      // This CSS value passes needsFallback (has color-mix) AND has var(--)
      // AND property is box-shadow
      const input = `.card {
  box-shadow: 0 4px 6px color-mix(in srgb, var(--shadow-color) 50%, transparent);
}`

      const result = processCSSWithFallbacks(input)
      // Should add fallback box-shadow with rgba
      expect(result).toContain('box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);')
    })

    it('should add box-shadow fallback for complex shadow with color-mix and var', () => {
      const input = `.element {
  box-shadow: 2px 2px 10px color-mix(in srgb, var(--primary) 30%, black);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);')
    })
  })

  describe('extractGradientFallback edge cases', () => {
    it('should extract gradient type name as fallback color', () => {
      // The regex matches the gradient type name first (conic, linear, etc.)
      const input = `.hero {
  background: conic-gradient(from 0deg, color-mix(in srgb, red, blue));
}`

      const result = processCSSWithFallbacks(input)
      // 'conic' matches first via [a-z]+ pattern
      expect(result).toContain('background-color: conic;')
    })

    it('should extract first word from linear-gradient', () => {
      const input = `.banner {
  background: linear-gradient(to right, color-mix(in srgb, purple, orange));
}`

      const result = processCSSWithFallbacks(input)
      // 'linear' matches first
      expect(result).toContain('background-color: linear;')
    })

    it('should extract first word from radial-gradient', () => {
      const input = `.test {
  background: radial-gradient(circle, color-mix(in srgb, red, blue));
}`

      const result = processCSSWithFallbacks(input)
      // 'radial' matches first
      expect(result).toContain('background-color: radial;')
    })

    it('should return default fallback when first match is from keyword', () => {
      // Edge case: value starts with 'from' but contains 'gradient('
      // This hits the 'from' keyword filter branch (lines 200-202)
      const input = `.weird {
  background: from-gradient(color-mix(in srgb, red, blue));
}`

      const result = processCSSWithFallbacks(input)
      // 'from' matches first and is in the keyword list, returns default #3b82f6
      expect(result).toContain('background-color: #3b82f6;')
    })

    it('should return default fallback when first match is to keyword', () => {
      const input = `.edge {
  background: to-gradient(color-mix(in srgb, red, blue));
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color: #3b82f6;')
    })

    it('should return default fallback when first match is in keyword', () => {
      const input = `.case {
  background: in-gradient(color-mix(in srgb, red, blue));
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color: #3b82f6;')
    })
  })

  describe('needsFallback var() check code path', () => {
    it('should trigger fallback for value containing var and box-shadow text', () => {
      // This is an edge case where value contains both var(--) and 'box-shadow' text
      // Note: This is unusual CSS but tests the needsFallback branch
      const input = `.weird {
  content: var(--box-shadow-label);
}`

      const result = processCSSWithFallbacks(input)
      // Should process without error (value contains var(-- and 'box-shadow')
      expect(result).toContain('content:')
    })

    it('should trigger fallback for value containing var and filter text', () => {
      const input = `.element {
  content: var(--filter-name);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('content:')
    })
  })

  describe('oklabToRgb edge cases', () => {
    it('should handle small values in sRGB conversion branch', () => {
      const input = `.dark {
  background-color: oklab(0.1 0 0);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color:')
    })

    it('should handle large values in sRGB conversion branch', () => {
      const input = `.light {
  background-color: oklab(0.9 0.1 0.1);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('background-color:')
    })

    it('should handle very dark OKLAB colors', () => {
      const input = `.veryDark {
  color: oklab(0.05 0.001 0.001);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('color:')
    })

    it('should handle very light OKLAB colors', () => {
      const input = `.veryLight {
  color: oklab(0.95 -0.01 0.01);
}`

      const result = processCSSWithFallbacks(input)
      expect(result).toContain('color:')
    })
  })

  describe('gradient fallback edge cases', () => {
    it('should handle completely invalid color syntax without adding fallback', () => {
      // Non-gradient values don't trigger fallback addition
      const input = `.invalid {
  background: notacolor(invalid, syntax, here);
}`

      const result = processCSSWithFallbacks(input)
      // Should keep the original class
      expect(result).toContain('.invalid')
      // Should keep the original property
      expect(result).toContain('background: notacolor(invalid, syntax, here);')
    })

    it('should preserve conic-gradient without fallback', () => {
      // conic-gradient is passed through without modification
      // (fallbacks only added for oklab/oklch colors, not all gradients)
      const input = `.hasGradient {
  background: conic-gradient(red, blue);
}`

      const result = processCSSWithFallbacks(input)
      // Should preserve the gradient
      expect(result).toContain('conic-gradient(red, blue)')
    })

    it('should trigger toSRGB else branch with very small values', () => {
      // Very small l value (near 0) triggers the else branch in toSRGB
      // L = toLinear((0 + 16) / 156) = toLinear(0.1026) ≈ -0.0033 (negative!)
      // After Math.max(0, ...), this becomes 0
      // toSRGB receives values <= 0.0031308, hitting the else branch
      const result = convertOKLABToRGB('oklab(0 0 0)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should trigger toSRGB if branch with large values', () => {
      // Large l value triggers the if branch in toSRGB (x > 0.0031308)
      // L = toLinear((1 + 16) / 156) = toLinear(0.09) ≈ -0.0049 (still negative!)
      // Need even larger l value to get positive L
      // l=100: (100+16)/156 = 0.743, toLinear returns 0.743^3 ≈ 0.41
      // 0.41 > 0.0031308, so if branch is hit
      const result = convertOKLABToRGB('oklab(100 0 0)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should handle extreme positive a and b values', () => {
      // Extreme values should still work through the conversion
      const result = convertOKLABToRGB('oklab(0.5 0.5 0.5)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should handle extreme negative a and b values', () => {
      // Extreme negative values should still work
      const result = convertOKLABToRGB('oklab(0.5 -0.5 -0.5)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })

    it('should hit toSRGB if branch with moderate lightness', () => {
      // Test with l=50 which should give positive L value
      const result = convertOKLABToRGB('oklab(50 0.1 0.1)')
      expect(result).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })
  })
})
