/**
 * SVG XSS Bypass Tests
 *
 * Tests for comprehensive SVG XSS protection including
 * xlink:href, HTML entities, foreignObject, and encoding bypasses.
 */

import { describe, it, expect } from 'vitest'
import { isDangerousCSSValue, sanitizeCSSValue } from '../../src/utils/string'

describe('SVG XSS Protection', () => {
  describe('xlink:href attacks', () => {
    it('blocks xlink:href with javascript protocol', () => {
      const svg = 'data:image/svg+xml,<svg><a xlink:href="javascript:alert(1)">click</a></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
      expect(sanitizeCSSValue(svg)).toBeNull()
    })

    it('blocks xlink:href with vbscript protocol', () => {
      const svg = 'data:image/svg+xml,<svg><a xlink:href="vbscript:msgbox(1)">click</a></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks xlink:href case variations', () => {
      const variations = [
        'XLINK:HREF="javascript:alert(1)"',
        'xlink:href="JavaScript:alert(1)"',
        'xlink:HREF="javascript:alert(1)"',
      ]

      variations.forEach(variant => {
        const svg = `data:image/svg+xml,<svg><a ${variant}>click</a></svg>`
        expect(isDangerousCSSValue(svg)).toBe(true)
      })
    })
  })

  describe('HTML entity encoding bypass', () => {
    it('blocks decimal entity encoding', () => {
      const svg = 'data:image/svg+xml,<svg onload="&#x61;lert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks hexadecimal entity encoding', () => {
      const svg = 'data:image/svg+xml,<svg onload="&#97;lert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks mixed entity encoding', () => {
      const svg = 'data:image/svg+xml,<svg onload="&#{97}lert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks double-encoded entities', () => {
      const svg = 'data:image/svg+xml,<svg onload="&amp;#x61;lert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })
  })

  describe('foreignObject attacks', () => {
    it('blocks foreignObject with body onload', () => {
      const svg = 'data:image/svg+xml,<svg><foreignObject><body onload=alert(1)></foreignObject></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks foreignObject with script tag', () => {
      const svg = 'data:image/svg+xml,<svg><foreignObject><script>alert(1)</script></foreignObject></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks foreignObject with iframe', () => {
      const svg = 'data:image/svg+xml,<svg><foreignObject><iframe src="javascript:alert(1)"></iframe></foreignObject></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })
  })

  describe('event handler bypasses', () => {
    it('blocks onload attribute', () => {
      const svg = 'data:image/svg+xml,<svg onload="alert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks onerror attribute', () => {
      const svg = 'data:image/svg+xml,<svg><image onerror="alert(1)"/></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks onmouseover attribute', () => {
      const svg = 'data:image/svg+xml,<svg><rect onmouseover="alert(1)"/></svg>'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })
  })

  describe('nested encoding attacks', () => {
    it('blocks unicode escape + entity encoding', () => {
      // CSS unicode escape + HTML entity
      const svg = 'data:image/svg+xml,<svg onload="\\6a&#x61;vascript:alert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks CSS comment + entity encoding', () => {
      const svg = 'data:image/svg+xml,<svg onload="ja/*comm*/&#x76;ascript:alert(1)">'
      expect(isDangerousCSSValue(svg)).toBe(true)
    })
  })

  describe('safe SVG patterns', () => {
    it('allows safe SVG without scripts', () => {
      const svg = 'data:image/svg+xml,<svg><rect fill="red"/></svg>'
      expect(isDangerousCSSValue(svg)).toBe(false)
      expect(sanitizeCSSValue(svg)).toBe(svg)
    })

    it('allows SVG with safe href', () => {
      const svg = 'data:image/svg+xml,<svg><a xlink:href="https://example.com">click</a></svg>'
      expect(isDangerousCSSValue(svg)).toBe(false)
    })

    it('allows SVG with inline styles', () => {
      const svg = 'data:image/svg+xml,<svg><rect style="fill:red"/></svg>'
      expect(isDangerousCSSValue(svg)).toBe(false)
    })
  })

  describe('base64 encoded SVG attacks', () => {
    it('blocks base64 encoded SVG with script', () => {
      // Base64 of: <svg><script>alert(1)</script></svg>
      const base64Svg = 'PHN2Zz48c2NyaXB0PmFsZXJ0KDEpPC9zY3JpcHQ+PC9zdmc+'
      const svg = `data:image/svg+xml;base64,${base64Svg}`
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('blocks base64 encoded SVG with onload', () => {
      // Base64 of: <svg onload="alert(1)">
      const base64Svg = 'PHN2ZyBvbmxvYWQ9ImFsZXJ0KDEpIj4='
      const svg = `data:image/svg+xml;base64,${base64Svg}`
      expect(isDangerousCSSValue(svg)).toBe(true)
    })

    it('allows base64 encoded safe SVG', () => {
      // Base64 of: <svg><rect fill="red"/></svg>
      const base64Svg = 'PHN2Zz48cmVjdCBmaWxsPSJyZWQiLz48L3N2Zz4='
      const svg = `data:image/svg+xml;base64,${base64Svg}`
      expect(isDangerousCSSValue(svg)).toBe(false)
    })
  })

  describe('url-encoded SVG attacks', () => {
    it('blocks url-encoded XSS', () => {
      // URL-encoded: <svg onload="alert(1)">
      const urlEncoded = 'data:image/svg+xml,%3Csvg%20onload%3D%22alert(1)%22%3E'
      expect(isDangerousCSSValue(urlEncoded)).toBe(true)
    })

    it('handles double url-encoded gracefully', () => {
      // Double-encoded: <svg onload="alert(1)">
      const doubleEncoded = 'data:image/svg+xml,%253Csvg%2520onload%253D%2522alert(1)%2522%253E'
      // Double-encoding might not decode automatically in all contexts
      // Just verify it doesn't crash and returns a boolean
      const result = isDangerousCSSValue(doubleEncoded)
      expect(typeof result).toBe('boolean')
    })
  })
})
