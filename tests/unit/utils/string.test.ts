/**
 * String Utilities Tests
 */
import { describe, it, expect } from 'vitest'
import {
  kebabCase,
  camelCase,
  pascalCase,
  escapeSelector,
  escapeRegex,
  generateId,
  isValidIdentifier,
  hashString,
  splitByDelimiter,
  trimQuotes,
  capitalize,
  isWhitespace,
  dedupeStrings,
  joinWithSpace,
  isDangerousCSSValue,
  sanitizeCSSValue,
} from '../../../src/utils/string'

describe('String Utilities', () => {
  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('backgroundColor')).toBe('background-color')
    })

    it('should convert PascalCase to kebab-case', () => {
      expect(kebabCase('BackgroundColor')).toBe('background-color')
    })

    it('should handle consecutive uppercase letters', () => {
      expect(kebabCase('XMLHttpRequest')).toBe('x-m-l-http-request')
    })

    it('should preserve CSS custom properties', () => {
      expect(kebabCase('--myVariable')).toBe('--myvariable')
    })

    it('should handle underscores', () => {
      expect(kebabCase('my_variable')).toBe('my-variable')
    })

    it('should handle spaces', () => {
      expect(kebabCase('my variable')).toBe('my-variable')
    })

    it('should collapse multiple dashes', () => {
      expect(kebabCase('my--variable')).toBe('my-variable')
    })
  })

  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('background-color')).toBe('backgroundColor')
    })

    it('should handle vendor prefixes', () => {
      expect(camelCase('-webkit-transform')).toBe('WebkitTransform')
    })

    it('should handle already camelCase', () => {
      expect(camelCase('backgroundColor')).toBe('backgroundColor')
    })
  })

  describe('pascalCase', () => {
    it('should convert to PascalCase', () => {
      expect(pascalCase('my-component')).toBe('MyComponent')
    })

    it('should handle single word', () => {
      expect(pascalCase('component')).toBe('Component')
    })

    it('should handle already PascalCase', () => {
      expect(pascalCase('MyComponent')).toBe('MyComponent')
    })
  })

  describe('escapeSelector', () => {
    it('should escape brackets', () => {
      expect(escapeSelector('bg-[#ff0000]')).toBe('bg-\\[\\#ff0000\\]')
    })

    it('should escape slashes', () => {
      expect(escapeSelector('w-1/2')).toBe('w-1\\/2')
    })

    it('should escape parentheses', () => {
      expect(escapeSelector('calc(100%)')).toBe('calc\\(100\\%\\)')
    })

    it('should escape dots', () => {
      expect(escapeSelector('text-2.5')).toBe('text-2\\.5')
    })

    it('should handle multiple special characters', () => {
      expect(escapeSelector('bg-[url("test")]')).toBe('bg-\\[url\\(\\"test\\"\\)\\]')
    })
  })

  describe('escapeRegex', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegex('p-[4px]')).toBe('p-\\[4px\\]')
    })

    it('should escape dots', () => {
      expect(escapeRegex('text.lg')).toBe('text\\.lg')
    })

    it('should escape asterisks', () => {
      expect(escapeRegex('*')).toBe('\\*')
    })

    it('should escape plus', () => {
      expect(escapeRegex('a+b')).toBe('a\\+b')
    })

    it('should escape parentheses', () => {
      expect(escapeRegex('calc(100%)')).toBe('calc\\(100%\\)')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).not.toBe(id2)
    })

    it('should use default prefix', () => {
      const id = generateId()

      expect(id).toMatch(/^coral-[a-z0-9]+$/)
    })

    it('should use custom prefix', () => {
      const id = generateId('dialog')

      expect(id).toMatch(/^dialog-[a-z0-9]+$/)
    })
  })

  describe('isValidIdentifier', () => {
    it('should accept valid CSS identifiers', () => {
      expect(isValidIdentifier('my-class')).toBe(true)
      expect(isValidIdentifier('_private')).toBe(true)
      expect(isValidIdentifier('-webkit-transform')).toBe(true)
      expect(isValidIdentifier('class123')).toBe(true)
    })

    it('should reject invalid identifiers', () => {
      expect(isValidIdentifier('123class')).toBe(false)
      expect(isValidIdentifier('class name')).toBe(false)
      expect(isValidIdentifier('')).toBe(false)
    })
  })

  describe('hashString', () => {
    it('should generate consistent hash', () => {
      expect(hashString('p-4')).toBe(hashString('p-4'))
    })

    it('should generate different hashes for different strings', () => {
      expect(hashString('p-4')).not.toBe(hashString('m-4'))
    })

    it('should return hash starting with h', () => {
      expect(hashString('test')).toMatch(/^h[a-z0-9]+$/)
    })
  })

  describe('splitByDelimiter', () => {
    it('should split by delimiter', () => {
      expect(splitByDelimiter('a:b:c', ':')).toEqual(['a', 'b', 'c'])
    })

    it('should respect brackets', () => {
      expect(splitByDelimiter('hover:bg-[#ff0000]:text-white', ':')).toEqual([
        'hover',
        'bg-[#ff0000]',
        'text-white',
      ])
    })

    it('should respect parentheses', () => {
      expect(splitByDelimiter('calc(100%):margin:auto', ':')).toEqual([
        'calc(100%)',
        'margin',
        'auto',
      ])
    })

    it('should handle empty string', () => {
      expect(splitByDelimiter('', ':')).toEqual([])
    })

    it('should handle no delimiter', () => {
      expect(splitByDelimiter('no-delimiter', ':')).toEqual(['no-delimiter'])
    })

    it('should handle nested brackets', () => {
      expect(splitByDelimiter('a:[b[c]]:d', ':')).toEqual(['a', '[b[c]]', 'd'])
    })
  })

  describe('trimQuotes', () => {
    it('should trim double quotes', () => {
      expect(trimQuotes('"hello"')).toBe('hello')
    })

    it('should trim single quotes', () => {
      expect(trimQuotes("'hello'")).toBe('hello')
    })

    it('should not trim mismatched quotes', () => {
      expect(trimQuotes('"hello\'')).toBe('"hello\'')
    })

    it('should not modify unquoted string', () => {
      expect(trimQuotes('hello')).toBe('hello')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('should handle single character', () => {
      expect(capitalize('h')).toBe('H')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('isWhitespace', () => {
    it('should return true for whitespace-only string', () => {
      expect(isWhitespace('   ')).toBe(true)
      expect(isWhitespace('\t\n')).toBe(true)
    })

    it('should return true for empty string', () => {
      expect(isWhitespace('')).toBe(true)
    })

    it('should return false for non-whitespace', () => {
      expect(isWhitespace('hello')).toBe(false)
      expect(isWhitespace(' hello ')).toBe(false)
    })
  })

  describe('dedupeStrings', () => {
    it('should remove duplicates', () => {
      expect(dedupeStrings(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c'])
    })

    it('should preserve order', () => {
      expect(dedupeStrings(['c', 'a', 'b', 'a'])).toEqual(['c', 'a', 'b'])
    })

    it('should handle empty array', () => {
      expect(dedupeStrings([])).toEqual([])
    })
  })

  describe('joinWithSpace', () => {
    it('should join strings with space', () => {
      expect(joinWithSpace('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter out falsy values', () => {
      expect(joinWithSpace('a', undefined, 'b', null, 'c', false)).toBe('a b c')
    })

    it('should handle empty arguments', () => {
      expect(joinWithSpace()).toBe('')
    })

    it('should handle all falsy values', () => {
      expect(joinWithSpace(undefined, null, false)).toBe('')
    })
  })

  describe('isDangerousCSSValue', () => {
    describe('safe values', () => {
      it('should allow normal CSS values', () => {
        expect(isDangerousCSSValue('#ff0000')).toBe(false)
        expect(isDangerousCSSValue('1rem')).toBe(false)
        expect(isDangerousCSSValue('100%')).toBe(false)
        expect(isDangerousCSSValue('auto')).toBe(false)
      })

      it('should allow CSS functions', () => {
        expect(isDangerousCSSValue('calc(100% - 20px)')).toBe(false)
        expect(isDangerousCSSValue('rgb(255, 0, 0)')).toBe(false)
        expect(isDangerousCSSValue('rgba(255, 0, 0, 0.5)')).toBe(false)
        expect(isDangerousCSSValue('hsl(120, 50%, 50%)')).toBe(false)
        expect(isDangerousCSSValue('var(--my-color)')).toBe(false)
      })

      it('should allow safe url() values', () => {
        expect(isDangerousCSSValue('url(https://example.com/image.png)')).toBe(false)
        expect(isDangerousCSSValue('url("https://example.com/image.png")')).toBe(false)
        expect(isDangerousCSSValue("url('https://example.com/image.png')")).toBe(false)
      })

      it('should allow data:image URLs for SVG patterns', () => {
        expect(isDangerousCSSValue('url("data:image/svg+xml,<svg></svg>")')).toBe(false)
        expect(isDangerousCSSValue('url("data:image/png;base64,ABC123")')).toBe(false)
        expect(isDangerousCSSValue('url("data:image/jpeg;base64,ABC123")')).toBe(false)
        expect(isDangerousCSSValue('url("data:image/gif;base64,ABC123")')).toBe(false)
      })

      it('should allow empty or falsy values', () => {
        expect(isDangerousCSSValue('')).toBe(false)
      })
    })

    describe('dangerous values', () => {
      it('should block javascript: protocol', () => {
        expect(isDangerousCSSValue('url(javascript:alert(1))')).toBe(true)
        expect(isDangerousCSSValue('url("javascript:alert(1)")')).toBe(true)
        expect(isDangerousCSSValue('javascript:void(0)')).toBe(true)
        expect(isDangerousCSSValue('JAVASCRIPT:alert(1)')).toBe(true)
      })

      it('should block vbscript: protocol', () => {
        expect(isDangerousCSSValue('url(vbscript:msgbox(1))')).toBe(true)
        expect(isDangerousCSSValue('VBSCRIPT:alert(1)')).toBe(true)
      })

      it('should block IE expression()', () => {
        expect(isDangerousCSSValue('expression(alert(1))')).toBe(true)
        expect(isDangerousCSSValue('EXPRESSION(alert(1))')).toBe(true)
        expect(isDangerousCSSValue('width: expression(document.body.clientWidth)')).toBe(true)
      })

      it('should block behavior:', () => {
        expect(isDangerousCSSValue('behavior:url(script.htc)')).toBe(true)
        expect(isDangerousCSSValue('BEHAVIOR:url(script.htc)')).toBe(true)
      })

      it('should block -moz-binding:', () => {
        expect(isDangerousCSSValue('-moz-binding:url(xss.xml#xss)')).toBe(true)
        expect(isDangerousCSSValue('-MOZ-BINDING:url(xss.xml)')).toBe(true)
      })

      it('should block @import', () => {
        expect(isDangerousCSSValue('@import url(evil.css)')).toBe(true)
        expect(isDangerousCSSValue('@IMPORT url(evil.css)')).toBe(true)
      })

      it('should block non-image data: URLs', () => {
        expect(isDangerousCSSValue('url("data:text/html,<script>alert(1)</script>")')).toBe(true)
        expect(isDangerousCSSValue('url("data:application/javascript,alert(1)")')).toBe(true)
        expect(isDangerousCSSValue('url(data:text/css,body{background:red})')).toBe(true)
      })
    })
  })

  describe('sanitizeCSSValue', () => {
    it('should return safe values unchanged', () => {
      expect(sanitizeCSSValue('#ff0000')).toBe('#ff0000')
      expect(sanitizeCSSValue('calc(100% - 20px)')).toBe('calc(100% - 20px)')
      expect(sanitizeCSSValue('url("data:image/svg+xml,<svg></svg>")')).toBe('url("data:image/svg+xml,<svg></svg>")')
    })

    it('should return null for dangerous values', () => {
      expect(sanitizeCSSValue('url(javascript:alert(1))')).toBeNull()
      expect(sanitizeCSSValue('expression(alert(1))')).toBeNull()
      expect(sanitizeCSSValue('@import url(evil.css)')).toBeNull()
    })

    it('should handle empty values', () => {
      expect(sanitizeCSSValue('')).toBe('')
    })
  })

  describe('Edge Cases', () => {
    it('should handle dedupeStrings with empty strings', () => {
      expect(dedupeStrings(['a', '', 'b', '', 'a'])).toEqual(['a', '', 'b'])
    })

    it('should handle generateId with prefix', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      expect(id1).not.toBe(id2)
      expect(id1).toContain('test')
    })

    it('should handle generateId without prefix', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })

    it('should handle capitalize with already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('should handle capitalize with empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })
})
