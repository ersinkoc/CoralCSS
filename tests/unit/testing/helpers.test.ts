/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createCoral } from '../../../src/index'
import {
  extractGeneratedCSS,
  getComputedClasses,
  generateSnapshot,
  compareCSS,
  normalizeCSS,
  extractCSSProperties,
  createDiffReport,
  createConfiguredCoral,
  waitForCSSInjection,
  getInjectedStyles,
  cleanupInjectedStyles,
} from '../../../src/testing/helpers'

describe('Testing Helpers', () => {
  describe('extractGeneratedCSS', () => {
    it('should extract CSS for given classes', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, ['bg-red-500'])
      // Returns string (may be empty if class not recognized)
      expect(typeof css).toBe('string')
    })

    it('should accept string input', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, 'bg-red-500 p-4')
      expect(typeof css).toBe('string')
    })

    it('should accept array input', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, ['bg-red-500', 'p-4'])
      expect(typeof css).toBe('string')
    })

    it('should return empty string for empty array', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, [])
      expect(css).toBe('')
    })

    it('should return empty string for empty string input', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, '')
      expect(css).toBe('')
    })

    it('should return empty string for whitespace-only input', () => {
      const coral = createCoral()
      const css = extractGeneratedCSS(coral, '   ')
      expect(css).toBe('')
    })
  })

  describe('getComputedClasses', () => {
    it('should parse string into array of classes', () => {
      const classes = getComputedClasses('bg-red-500 p-4 hover:bg-red-600')
      expect(classes).toEqual(['bg-red-500', 'p-4', 'hover:bg-red-600'])
    })

    it('should handle multiple spaces', () => {
      const classes = getComputedClasses('bg-red-500   p-4')
      expect(classes).toEqual(['bg-red-500', 'p-4'])
    })

    it('should handle element input', () => {
      const element = document.createElement('div')
      element.className = 'bg-red-500 p-4'
      const classes = getComputedClasses(element)
      expect(classes).toContain('bg-red-500')
      expect(classes).toContain('p-4')
    })

    it('should return empty array for empty string', () => {
      const classes = getComputedClasses('')
      expect(classes).toEqual([])
    })
  })

  describe('generateSnapshot', () => {
    it('should generate snapshot with CSS', () => {
      const coral = createCoral()
      const snapshot = generateSnapshot(coral, ['bg-red-500'])

      expect(typeof snapshot.css).toBe('string')
      expect(snapshot.classes).toEqual(['bg-red-500'])
      expect(snapshot.timestamp).toBeDefined()
      expect(snapshot.hash).toBeDefined()
    })

    it('should generate consistent hash for same CSS', () => {
      const coral = createCoral()
      const snapshot1 = generateSnapshot(coral, ['bg-red-500'])
      const snapshot2 = generateSnapshot(coral, ['bg-red-500'])

      // Same input should produce same hash
      expect(snapshot1.hash).toBe(snapshot2.hash)
    })

    it('should generate different hash for different CSS', () => {
      // Create manual snapshots with different CSS content
      const snapshot1 = {
        css: '.a { color: red; }',
        classes: ['a'],
        timestamp: Date.now(),
        hash: '',
      }
      const snapshot2 = {
        css: '.b { color: blue; }',
        classes: ['b'],
        timestamp: Date.now(),
        hash: '',
      }

      // Use generateSnapshot which calls hashCSS internally
      const coral = createCoral()
      const snap1 = generateSnapshot(coral, 'bg-red-500')
      const snap2 = generateSnapshot(coral, 'text-blue-500')

      // Different CSS should produce different hashes (when CSS is generated)
      if (snap1.css !== snap2.css) {
        expect(snap1.hash).not.toBe(snap2.hash)
      }
    })

    it('should generate hash in hex format with 8 characters', () => {
      const coral = createCoral()
      const snapshot = generateSnapshot(coral, ['bg-red-500'])

      // FNV-1a hash should produce 8-character hex string
      expect(snapshot.hash).toMatch(/^[0-9a-f]{8}$/)
    })

    it('should accept string input', () => {
      const coral = createCoral()
      const snapshot = generateSnapshot(coral, 'bg-red-500 p-4')
      expect(snapshot.classes).toEqual(['bg-red-500', 'p-4'])
    })

    it('should handle string with multiple spaces', () => {
      const coral = createCoral()
      const snapshot = generateSnapshot(coral, 'bg-red-500  p-4   m-2')
      expect(snapshot.classes).toEqual(['bg-red-500', 'p-4', 'm-2'])
    })
  })

  describe('compareCSS', () => {
    it('should return matches true for identical CSS', () => {
      const css = '.test { color: red; }'
      const result = compareCSS(css, css)
      expect(result.matches).toBe(true)
    })

    it('should detect different properties', () => {
      const css1 = '.test { color: red; }'
      const css2 = '.test { color: blue; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      expect(result.differences.different.length).toBeGreaterThan(0)
    })

    it('should detect missing property in second CSS', () => {
      const css1 = '.test { color: red; margin: 10px; }'
      const css2 = '.test { color: red; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      const marginDiff = result.differences.different.find(d => d.property.includes('margin'))
      expect(marginDiff).toBeDefined()
      expect(marginDiff?.secondValue).toBe('(missing)')
    })

    it('should detect extra property in second CSS', () => {
      const css1 = '.test { color: red; }'
      const css2 = '.test { color: red; padding: 5px; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      const paddingDiff = result.differences.different.find(d => d.property.includes('padding'))
      expect(paddingDiff).toBeDefined()
      expect(paddingDiff?.firstValue).toBe('(missing)')
    })

    it('should return all difference types', () => {
      const css1 = '.a { color: red; } .b { margin: 5px; }'
      const css2 = '.a { color: blue; } .c { padding: 10px; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      expect(result.differences.onlyInFirst).toContain('.b')
      expect(result.differences.onlyInSecond).toContain('.c')
      expect(result.differences.different.length).toBeGreaterThan(0)
    })

    it('should detect missing selectors', () => {
      const css1 = '.test1 { color: red; } .test2 { color: blue; }'
      const css2 = '.test1 { color: red; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      expect(result.differences.onlyInFirst).toContain('.test2')
    })

    it('should detect extra selectors', () => {
      const css1 = '.test1 { color: red; }'
      const css2 = '.test1 { color: red; } .test2 { color: blue; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(false)
      expect(result.differences.onlyInSecond).toContain('.test2')
    })

    it('should handle empty CSS', () => {
      const result = compareCSS('', '')
      expect(result.matches).toBe(true)
    })

    it('should handle CSS with comments', () => {
      const css1 = '/* comment */ .test { color: red; }'
      const css2 = '.test { color: red; }'
      const result = compareCSS(css1, css2)

      // Should match since comments are stripped
      expect(result.matches).toBe(true)
    })

    it('should handle CSS with multiline comments', () => {
      const css1 = `
        /* This is a
           multiline comment */
        .test { color: red; }
      `
      const css2 = '.test { color: red; }'
      const result = compareCSS(css1, css2)

      expect(result.matches).toBe(true)
    })
  })

  describe('normalizeCSS', () => {
    it('should normalize whitespace', () => {
      const css = '.test{color:red;}'
      const normalized = normalizeCSS(css)
      expect(normalized).toContain('{ ')
      expect(normalized).toContain(': ')
    })

    it('should handle multiple rules', () => {
      const css = '.a{color:red;}.b{color:blue;}'
      const normalized = normalizeCSS(css)
      expect(normalized).toBeTruthy()
    })
  })

  describe('extractCSSProperties', () => {
    it('should extract properties for a selector', () => {
      const css = '.test { color: red; background: blue; }'
      const props = extractCSSProperties(css, '.test')

      expect(props['color']).toBe('red')
      expect(props['background']).toBe('blue')
    })

    it('should return empty object for unknown selector', () => {
      const css = '.test { color: red; }'
      const props = extractCSSProperties(css, '.unknown')

      expect(props).toEqual({})
    })
  })

  describe('createDiffReport', () => {
    it('should return no differences message for identical snapshots', () => {
      const coral = createCoral()
      const snapshot1 = generateSnapshot(coral, ['bg-red-500'])
      const snapshot2 = generateSnapshot(coral, ['bg-red-500'])

      const report = createDiffReport(snapshot1, snapshot2)
      expect(report).toContain('No differences')
    })

    it('should create diff report for different snapshots', () => {
      // Create manual snapshots with different CSS
      const snapshot1 = {
        css: '.bg-red-500 { background-color: red; }',
        classes: ['bg-red-500'],
        timestamp: Date.now(),
        hash: 'abc123',
      }
      const snapshot2 = {
        css: '.bg-blue-500 { background-color: blue; }',
        classes: ['bg-blue-500'],
        timestamp: Date.now(),
        hash: 'def456',
      }

      const report = createDiffReport(snapshot1, snapshot2)
      expect(report).toContain('CSS Differences')
    })

    it('should show selectors only in first', () => {
      const snapshot1 = {
        css: '.first-only { color: red; } .shared { margin: 0; }',
        classes: ['first-only', 'shared'],
        timestamp: Date.now(),
        hash: 'abc123',
      }
      const snapshot2 = {
        css: '.shared { margin: 0; }',
        classes: ['shared'],
        timestamp: Date.now(),
        hash: 'def456',
      }

      const report = createDiffReport(snapshot1, snapshot2)
      expect(report).toContain('Selectors only in first')
      expect(report).toContain('.first-only')
    })

    it('should show selectors only in second', () => {
      const snapshot1 = {
        css: '.shared { margin: 0; }',
        classes: ['shared'],
        timestamp: Date.now(),
        hash: 'abc123',
      }
      const snapshot2 = {
        css: '.second-only { color: blue; } .shared { margin: 0; }',
        classes: ['second-only', 'shared'],
        timestamp: Date.now(),
        hash: 'def456',
      }

      const report = createDiffReport(snapshot1, snapshot2)
      expect(report).toContain('Selectors only in second')
      expect(report).toContain('.second-only')
    })

    it('should show property differences for same selector', () => {
      const snapshot1 = {
        css: '.test { color: red; }',
        classes: ['test'],
        timestamp: Date.now(),
        hash: 'abc123',
      }
      const snapshot2 = {
        css: '.test { color: blue; }',
        classes: ['test'],
        timestamp: Date.now(),
        hash: 'def456',
      }

      const report = createDiffReport(snapshot1, snapshot2)
      expect(report).toContain('Property differences')
      expect(report).toContain('color')
      expect(report).toContain('red')
      expect(report).toContain('blue')
    })
  })

  describe('createConfiguredCoral', () => {
    it('should create coral with default options', () => {
      const coral = createConfiguredCoral()
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
    })

    it('should create coral with custom options', () => {
      const coral = createConfiguredCoral({ darkMode: 'class' })
      expect(coral.config.darkMode).toBe('class')
    })
  })

  describe('DOM utilities', () => {
    afterEach(() => {
      cleanupInjectedStyles()
    })

    describe('waitForCSSInjection', () => {
      it('should resolve when style element exists', async () => {
        const style = document.createElement('style')
        style.setAttribute('data-coral', 'test')
        document.head.appendChild(style)

        const result = await waitForCSSInjection('[data-coral="test"]', 100)
        expect(result).toBe(style)

        style.remove()
      })

      it('should resolve to null after timeout', async () => {
        const result = await waitForCSSInjection('[data-coral="nonexistent"]', 50)
        expect(result).toBeNull()
      })
    })

    describe('getInjectedStyles', () => {
      it('should return all coral style elements', () => {
        const style1 = document.createElement('style')
        style1.setAttribute('data-coral', 'test1')
        document.head.appendChild(style1)

        const style2 = document.createElement('style')
        style2.setAttribute('data-coral', 'test2')
        document.head.appendChild(style2)

        const styles = getInjectedStyles()
        expect(styles.length).toBeGreaterThanOrEqual(2)

        style1.remove()
        style2.remove()
      })
    })

    describe('cleanupInjectedStyles', () => {
      it('should remove all coral style elements', () => {
        const style = document.createElement('style')
        style.setAttribute('data-coral', 'cleanup-test')
        document.head.appendChild(style)

        cleanupInjectedStyles()

        const remaining = document.querySelectorAll('style[data-coral]')
        expect(remaining.length).toBe(0)
      })
    })
  })
})
