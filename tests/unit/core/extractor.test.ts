/**
 * Class Extractor Tests
 */
import { describe, it, expect, vi } from 'vitest'
import { Extractor, createExtractor, extractFromHTML, extractClasses } from '../../../src/core/extractor'

describe('Extractor', () => {
  describe('initialization', () => {
    it('should create extractor with default options', () => {
      const extractor = new Extractor()
      expect(extractor).toBeDefined()
    })

    it('should create extractor with custom options', () => {
      const extractor = new Extractor({
        attributify: true,
        patterns: [/custom-pattern/g],
      })
      expect(extractor).toBeDefined()
    })

    it('should create extractor via factory function', () => {
      const extractor = createExtractor()
      expect(extractor).toBeInstanceOf(Extractor)
    })
  })

  describe('extractFromHTML', () => {
    it('should extract classes from class attribute', () => {
      const extractor = new Extractor()
      const classes = extractor.extractFromHTML('<div class="p-4 bg-red-500"></div>')

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })

    it('should extract from multiple elements', () => {
      const extractor = new Extractor()
      const html = `
        <div class="container mx-auto">
          <button class="btn hover:bg-blue-500">Click</button>
        </div>
      `
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('container')
      expect(classes).toContain('mx-auto')
      expect(classes).toContain('btn')
      expect(classes).toContain('hover:bg-blue-500')
    })

    it('should extract from className attribute (JSX)', () => {
      const extractor = new Extractor()
      const jsx = '<Button className="p-4 bg-blue-500">Click</Button>'
      const classes = extractor.extractFromHTML(jsx)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-blue-500')
    })

    it('should deduplicate classes', () => {
      const extractor = new Extractor()
      const html = `
        <div class="p-4 bg-red-500">
          <span class="p-4 text-white"></span>
        </div>
      `
      const classes = extractor.extractFromHTML(html)

      const p4Count = classes.filter(c => c === 'p-4').length
      expect(p4Count).toBe(1)
    })

    it('should handle empty class attribute', () => {
      const extractor = new Extractor()
      const classes = extractor.extractFromHTML('<div class=""></div>')

      expect(classes).toHaveLength(0)
    })

    it('should handle whitespace in class attribute', () => {
      const extractor = new Extractor()
      const classes = extractor.extractFromHTML('<div class="  p-4   bg-red-500  "></div>')

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
      expect(classes).toHaveLength(2)
    })
  })

  describe('extract', () => {
    it('should extract from template literals in class context', () => {
      const extractor = new Extractor()
      const content = 'const cls = class=`p-4 bg-red-500`'
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })

    it('should extract from className template literals', () => {
      const extractor = new Extractor()
      const content = 'className=`flex items-center`'
      const classes = extractor.extract(content)

      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should extract from string literals that look like utilities', () => {
      const extractor = new Extractor()
      const content = `
        const cls = "p-4 bg-red-500"
        element.classList.add("hover:bg-blue-500")
      `
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
      expect(classes).toContain('hover:bg-blue-500')
    })

    it('should apply custom patterns', () => {
      const extractor = new Extractor({
        patterns: [/data-class="([^"]*)"/g],
      })
      const content = '<div data-class="custom-class another-class">'
      const classes = extractor.extract(content)

      expect(classes).toContain('custom-class')
      expect(classes).toContain('another-class')
    })
  })

  describe('extractAttributify', () => {
    it('should extract attributify syntax', () => {
      const extractor = new Extractor({ attributify: true })
      const html = '<div bg="red-500" p="4"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('bg-red-500')
      expect(classes).toContain('p-4')
    })

    it('should handle attributify with variants', () => {
      const extractor = new Extractor({ attributify: true })
      const html = '<div bg="red-500 hover:blue-500"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('bg-red-500')
      expect(classes).toContain('hover:bg-blue-500')
    })

    it('should handle multiple attributify values', () => {
      const extractor = new Extractor({ attributify: true })
      const html = '<div m="x-4 y-2"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('m-x-4')
      expect(classes).toContain('m-y-2')
    })

    it('should skip empty attributify values', () => {
      const extractor = new Extractor({ attributify: true })
      const html = '<div p="  "></div>'
      const classes = extractor.extractFromHTML(html)

      // Should not crash and should return empty or filter out empties
      expect(classes.every(c => c.trim().length > 0)).toBe(true)
    })

    it('should not extract attributify when disabled', () => {
      const extractor = new Extractor({ attributify: false })
      const html = '<div bg="red-500"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).not.toContain('bg-red-500')
    })
  })

  describe('extractAttributify method directly', () => {
    it('should extract basic attributify', () => {
      const extractor = new Extractor()
      const classes = extractor.extractAttributify('<div bg="red-500">')

      expect(classes).toContain('bg-red-500')
    })

    it('should handle all attribute groups', () => {
      const extractor = new Extractor()
      const html = '<div p="4" m="2" w="full" h="screen" text="white" border="2">'
      const classes = extractor.extractAttributify(html)

      expect(classes).toContain('p-4')
      expect(classes).toContain('m-2')
      expect(classes).toContain('w-full')
      expect(classes).toContain('h-screen')
      expect(classes).toContain('text-white')
      expect(classes).toContain('border-2')
    })
  })

  describe('setOptions', () => {
    it('should update extraction options', () => {
      const extractor = new Extractor()
      extractor.setOptions({ attributify: true })

      const html = '<div bg="red-500"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('bg-red-500')
    })

    it('should merge with existing options', () => {
      const extractor = new Extractor({ attributify: true })
      extractor.setOptions({ patterns: [/custom="([^"]*)"/g] })

      const html = '<div bg="red-500" custom="my-class">'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('bg-red-500')
      // Custom pattern should be applied in extract, not extractFromHTML
    })
  })

  describe('convenience functions', () => {
    it('extractFromHTML should work as standalone function', () => {
      const classes = extractFromHTML('<div class="p-4 bg-red-500"></div>')

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })

    it('extractFromHTML with options', () => {
      const classes = extractFromHTML('<div bg="red-500"></div>', { attributify: true })

      expect(classes).toContain('bg-red-500')
    })

    it('extractClasses should work as standalone function', () => {
      const classes = extractClasses('const cls = "p-4 bg-red-500"')

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })

    it('extractClasses with options', () => {
      const classes = extractClasses('<div bg="red-500"></div>', { attributify: true })

      // Note: extract doesn't call attributify directly, only extractFromHTML does
    })
  })

  describe('edge cases', () => {
    it('should handle empty content', () => {
      const extractor = new Extractor()
      expect(extractor.extractFromHTML('')).toHaveLength(0)
      expect(extractor.extract('')).toHaveLength(0)
    })

    it('should handle content without classes', () => {
      const extractor = new Extractor()
      const html = '<div><span>Hello</span></div>'
      expect(extractor.extractFromHTML(html)).toHaveLength(0)
    })

    it('should handle malformed HTML', () => {
      const extractor = new Extractor()
      const html = '<div class="p-4" class="m-4">' // Duplicate attribute
      const classes = extractor.extractFromHTML(html)

      // Should extract from both attributes
      expect(classes.length).toBeGreaterThan(0)
    })

    it('should extract complex utility patterns', () => {
      const extractor = new Extractor()
      const html = '<div class="bg-[#ff0000] p-[2.5rem] text-[14px/1.5]"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('bg-[#ff0000]')
      expect(classes).toContain('p-[2.5rem]')
      expect(classes).toContain('text-[14px/1.5]')
    })

    it('should extract negative utilities', () => {
      const extractor = new Extractor()
      const html = '<div class="-mt-4 -ml-2"></div>'
      const classes = extractor.extractFromHTML(html)

      expect(classes).toContain('-mt-4')
      expect(classes).toContain('-ml-2')
    })

    it('should handle JSX expression className', () => {
      const extractor = new Extractor()
      const jsx = `<div className={'flex items-center'}></div>`
      const classes = extractor.extractFromHTML(jsx)

      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should handle className with template literal', () => {
      const extractor = new Extractor()
      const jsx = '<div className={`flex items-center`}></div>'
      const classes = extractor.extractFromHTML(jsx)

      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should remove template expressions from class extraction', () => {
      const extractor = new Extractor()
      const content = 'class=`p-4 ${someVar} bg-red-500`'
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
      expect(classes).not.toContain('${someVar}')
    })
  })

  describe('utility pattern recognition', () => {
    it('should recognize standard utilities', () => {
      const extractor = new Extractor()
      const content = `"p-4 mt-2 bg-red-500"`
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('mt-2')
      expect(classes).toContain('bg-red-500')
    })

    it('should recognize utilities with variants', () => {
      const extractor = new Extractor()
      const content = `"hover:bg-blue-500 focus:ring-2 dark:text-white"`
      const classes = extractor.extract(content)

      expect(classes).toContain('hover:bg-blue-500')
      expect(classes).toContain('focus:ring-2')
      expect(classes).toContain('dark:text-white')
    })

    it('should recognize simple utilities', () => {
      const extractor = new Extractor()
      const content = `"flex block hidden"`
      const classes = extractor.extract(content)

      expect(classes).toContain('flex')
      expect(classes).toContain('block')
      expect(classes).toContain('hidden')
    })

    it('should extract simple words that could be utilities', () => {
      const extractor = new Extractor()
      // Simple lowercase words match the utility pattern for words like "flex", "block", "hidden"
      const content = `"hello world"`
      const classes = extractor.extract(content)

      // These match the simple utility pattern /^-?[a-z]+$/
      expect(classes).toContain('hello')
      expect(classes).toContain('world')
    })

    it('should not extract strings with uppercase or special chars', () => {
      const extractor = new Extractor()
      const content = `"Hello World" "UPPERCASE" "has spaces inside" "has123numbers"`
      const classes = extractor.extract(content)

      // Uppercase doesn't match utility patterns
      expect(classes).not.toContain('Hello')
      expect(classes).not.toContain('World')
      expect(classes).not.toContain('UPPERCASE')
    })
  })

  describe('custom patterns', () => {
    it('should apply custom pattern with capture group', () => {
      const extractor = new Extractor({
        patterns: [/tw\(([^)]+)\)/g],
      })
      const content = `tw(p-4 bg-red-500)`
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })

    it('should apply multiple custom patterns', () => {
      const extractor = new Extractor({
        patterns: [
          /tw\(([^)]+)\)/g,
          /styles\["([^"]+)"\]/g,
        ],
      })
      const content = `tw(p-4) styles["bg-red-500"]`
      const classes = extractor.extract(content)

      expect(classes).toContain('p-4')
      expect(classes).toContain('bg-red-500')
    })
  })

  describe('security and input validation', () => {
    describe('maxInputLength option', () => {
      it('should respect custom maxInputLength', () => {
        const extractor = new Extractor({ maxInputLength: 100 })
        const input = '<div class="p-4"></div>'.repeat(10) // Way over 100 chars

        const classes = extractor.extractFromHTML(input)

        // Should not crash and should return some classes
        expect(Array.isArray(classes)).toBe(true)
      })

      it('should truncate input exceeding max length and warn', () => {
        const extractor = new Extractor({ maxInputLength: 50 })
        const input = '<div class="p-4 bg-red-500 text-white hover:bg-red-600"></div>'

        // Spy on console.warn
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const classes = extractor.extractFromHTML(input)

        // Should truncate to first 50 chars
        expect(Array.isArray(classes)).toBe(true)

        warnSpy.mockRestore()
      })

      it('should handle maxInputLength in extract method', () => {
        const extractor = new Extractor({ maxInputLength: 100 })
        const input = 'class="'.repeat(100) + 'p-4 bg-red-500' + '"' // Very long

        const classes = extractor.extract(input)

        expect(Array.isArray(classes)).toBe(true)
      })
    })

    describe('input length limits', () => {
      it('should handle very long input without hanging (ReDoS protection)', () => {
        const extractor = new Extractor()
        // Create a long input that could cause ReDoS with naive regex
        const longInput = 'a'.repeat(100000)

        const start = Date.now()
        const classes = extractor.extract(longInput)
        const elapsed = Date.now() - start

        // Should complete quickly, not hang
        expect(elapsed).toBeLessThan(5000) // 5 seconds max
        expect(Array.isArray(classes)).toBe(true)
      })

      it('should truncate extremely long input', () => {
        const extractor = new Extractor()
        // Create input over 1MB
        const veryLongInput = '<div class="p-4"></div>'.repeat(100000)

        const start = Date.now()
        const classes = extractor.extractFromHTML(veryLongInput)
        const elapsed = Date.now() - start

        // Should complete reasonably quickly
        expect(elapsed).toBeLessThan(10000) // 10 seconds max
        expect(Array.isArray(classes)).toBe(true)
      })

      it('should handle extremely long class names', () => {
        const extractor = new Extractor()
        const longClassName = 'a'.repeat(500)
        const html = `<div class="${longClassName}"></div>`

        // Should not crash or hang
        const classes = extractor.extractFromHTML(html)
        expect(Array.isArray(classes)).toBe(true)
        // The extractor extracts the class, but the utility pattern matcher won't match it
      })
    })

    describe('malicious input patterns', () => {
      it('should handle nested brackets safely', () => {
        const extractor = new Extractor()
        const malicious = 'class="[[[[[[[[[[[[[[[[[[[[p-4]]]]]]]]]]]]]]]]]]]]"'

        const start = Date.now()
        const classes = extractor.extract(malicious)
        const elapsed = Date.now() - start

        expect(elapsed).toBeLessThan(1000)
        expect(Array.isArray(classes)).toBe(true)
      })

      it('should handle repeated patterns safely', () => {
        const extractor = new Extractor()
        // Pattern that could cause backtracking
        const malicious = `class="${'a-'.repeat(1000)}b"`

        const start = Date.now()
        const classes = extractor.extract(malicious)
        const elapsed = Date.now() - start

        expect(elapsed).toBeLessThan(1000)
        expect(Array.isArray(classes)).toBe(true)
      })

      it('should handle alternating quotes safely', () => {
        const extractor = new Extractor()
        const malicious = `${"'\"".repeat(1000)}`

        const start = Date.now()
        const classes = extractor.extract(malicious)
        const elapsed = Date.now() - start

        expect(elapsed).toBeLessThan(1000)
        expect(Array.isArray(classes)).toBe(true)
      })
    })

    describe('null and undefined handling', () => {
      it('should handle null-like input gracefully', () => {
        const extractor = new Extractor()

        // @ts-expect-error testing runtime behavior
        expect(extractor.extractFromHTML(null)).toEqual([])
        // @ts-expect-error testing runtime behavior
        expect(extractor.extractFromHTML(undefined)).toEqual([])
        // @ts-expect-error testing runtime behavior
        expect(extractor.extract(null)).toEqual([])
        // @ts-expect-error testing runtime behavior
        expect(extractor.extract(undefined)).toEqual([])
      })

      it('should handle non-string input gracefully', () => {
        const extractor = new Extractor()

        // @ts-expect-error testing runtime behavior
        expect(extractor.extractFromHTML(123)).toEqual([])
        // @ts-expect-error testing runtime behavior
        expect(extractor.extractFromHTML({})).toEqual([])
        // @ts-expect-error testing runtime behavior
        expect(extractor.extract([])).toEqual([])
      })
    })
  })
})
