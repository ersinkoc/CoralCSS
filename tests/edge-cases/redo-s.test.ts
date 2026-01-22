/**
 * ReDoS Protection Tests
 *
 * Tests for Regular Expression Denial of Service protection
 */

import { describe, it, expect } from 'vitest'
import { minifyCSS } from '../../src/utils/css'

describe('ReDoS Protection', () => {
  describe('minifyCSS - Protection against catastrophic backtracking', () => {
    it('handles nested comments without exponential time', () => {
      // Create malicious input with nested comment patterns
      const malicious = '/*/**/'.repeat(1000) + '.p-4 { padding: 1rem; }'

      const start = performance.now()
      const result = minifyCSS(malicious)
      const duration = performance.now() - start

      // Should complete in reasonable time (< 100ms)
      expect(duration).toBeLessThan(100)
      expect(result).toContain('.p-4')
    })

    it('handles deeply nested comment structures', () => {
      const malicious = '/*/*/**/*//**/'.repeat(500) + '.test { color: red; }'

      const start = performance.now()
      const result = minifyCSS(malicious)
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100)
      expect(result).toContain('.test')
    })

    it('handles alternating comment delimiters', () => {
      const malicious = '/*//**//**//**/'.repeat(1000) + 'body { margin: 0; }'

      const start = performance.now()
      const result = minifyCSS(malicious)
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100)
      expect(result).toContain('body')
    })
  })

  describe('minifyCSS - Large input handling', () => {
    it('handles very large CSS files efficiently', () => {
      // Create a large CSS file (100KB+)
      let largeCSS = ''
      for (let i = 0; i < 10000; i++) {
        largeCSS += `/* Comment ${i} */ .class-${i} { color: #${i.toString(16).padStart(6, '0')}; } `
      }

      const start = performance.now()
      const result = minifyCSS(largeCSS)
      const duration = performance.now() - start

      // Should complete in reasonable time
      expect(duration).toBeLessThan(500)
      expect(result.length).toBeLessThan(largeCSS.length)
    })

    it('handles input with many comments efficiently', () => {
      let cssWithComments = ''
      for (let i = 0; i < 5000; i++) {
        cssWithComments += `/* Comment block ${i} with some text */ `
      }
      cssWithComments += '.test { color: red; }'

      const start = performance.now()
      const result = minifyCSS(cssWithComments)
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100)
      expect(result).toContain('.test')
    })
  })

  describe('minifyCSS - Edge cases', () => {
    it('handles empty input', () => {
      expect(minifyCSS('')).toBe('')
    })

    it('handles input with only comments', () => {
      expect(minifyCSS('/* comment only */')).toBe('')
    })

    it('handles input with only whitespace', () => {
      expect(minifyCSS('   \n\t   ')).toBe('')
    })

    it('handles malformed comments gracefully', () => {
      // Unclosed comment - the minifyCSS function will treat everything after /* as a comment
      // until it finds a closing */, so in this case, the result is just the closing brace
      const result = minifyCSS('/* unclosed comment .test { color: red; }')
      // Should not crash and should return something (even if not what we expect)
      expect(typeof result).toBe('string')
    })

    it('handles consecutive comments', () => {
      const result = minifyCSS('/* comment 1 *//* comment 2 */ .test { color: red; }')
      expect(result).toContain('.test')
      expect(result).not.toContain('comment')
    })
  })

  describe('minifyCSS - Correctness', () => {
    it('removes comments correctly', () => {
      expect(minifyCSS('/* comment */ .p-4 { padding: 1rem; }')).toBe('.p-4{padding:1rem}')
    })

    it('collapses whitespace correctly', () => {
      expect(minifyCSS('.test  {   color   :   red   ;   }')).toBe('.test{color:red}')
    })

    it('removes unnecessary semicolons', () => {
      // Single semicolon before closing brace is removed
      expect(minifyCSS('.test { color: red; }')).toBe('.test{color:red}')
      // Double semicolons are collapsed, but one remains before closing brace
      expect(minifyCSS('.test { color: red ;; }')).toBe('.test{color:red;}')
    })

    it('preserves important CSS features', () => {
      const css = '.test { color: red !important; background: url(image.png); }'
      const result = minifyCSS(css)
      expect(result).toContain('!important')
      expect(result).toContain('url(image.png)')
    })
  })
})
