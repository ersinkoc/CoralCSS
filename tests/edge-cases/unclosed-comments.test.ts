/**
 * Unclosed Comment and Edge Case Tests
 *
 * Tests for handling malformed CSS, unclosed comments,
 * and other edge cases in minification and parsing.
 */

import { describe, it, expect } from 'vitest'
import { minifyCSS, formatCSS } from '../../src/utils/css'

describe('Unclosed Comment Handling', () => {
  it('should warn and handle unclosed comment gracefully', () => {
    const input = '/* This comment is never closed .p-1 { color: red; }'

    // Should not crash
    const result = minifyCSS(input)

    // Should either return partial result or warn
    expect(typeof result).toBe('string')
  })

  it('should handle multiple unclosed comments', () => {
    const input = '/* Comment 1 /* Comment 2 .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(typeof result).toBe('string')
  })

  it('should handle comment at end of file', () => {
    const input = '.p-1 { color: red; } /* unclosed'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
    expect(result).toContain('color:red')
  })

  it('should handle unclosed comment with nested slash-star', () => {
    const input = '/* /* * / .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(typeof result).toBe('string')
  })
})

describe('Malformed CSS Handling', () => {
  it('should handle unclosed braces', () => {
    const input = '.p-1 { color: red;'

    const result = minifyCSS(input)
    expect(result).toBeTruthy()
  })

  it('should handle extra closing braces', () => {
    const input = '.p-1 { color: red; } } }'

    const result = minifyCSS(input)
    expect(result).toBeTruthy()
  })

  it('should handle unclosed strings', () => {
    const input = '.p-1 { content: "unclosed string; }'

    const result = minifyCSS(input)
    expect(result).toBeTruthy()
  })

  it('should handle unclosed url()', () => {
    const input = '.p-1 { background: url(image.png'

    const result = minifyCSS(input)
    expect(result).toBeTruthy()
  })
})

describe('Comment Edge Cases', () => {
  it('should handle empty comments', () => {
    const input = '/**/ .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
  })

  it('should handle nested-looking comments', () => {
    const input = '/* Not /* actually */ nested */ .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
    expect(result).toContain('color:red')
  })

  it('should handle comments with special chars', () => {
    const input = '/* @#$%^&*() */ .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
  })
})

describe('Whitespace Edge Cases', () => {
  it('should handle only whitespace input', () => {
    const input = '   \n\t   '

    const result = minifyCSS(input)
    expect(result).toBe('')
  })

  it('should handle mixed whitespace types', () => {
    const input = '.p-1  \t\n  { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
  })

  it('should handle leading/trailing whitespace', () => {
    const input = '   .p-1 { color: red; }   '

    const result = minifyCSS(input)
    expect(result).not.toMatch(/^\s/)
    expect(result).not.toMatch(/\s$/)
  })
})

describe('Unicode and Special Characters', () => {
  it('should handle unicode selectors', () => {
    const input = '.クラス { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.クラス')
  })

  it('should handle unicode in comments', () => {
    const input = '/* コメント */ .p-1 { color: red; }'

    const result = minifyCSS(input)
    expect(result).toContain('.p-1')
  })

  it('should handle emoji in CSS', () => {
    const input = '.emoji::before { content: "😀"; }'

    const result = minifyCSS(input)
    expect(result).toContain('content:"😀"')
  })
})

describe('formatCSS Edge Cases', () => {
  it('should handle empty input', () => {
    const result = formatCSS('')
    expect(result).toBe('')
  })

  it('should handle input without braces', () => {
    const result = formatCSS('.p-1')
    expect(result).toBeTruthy()
  })

  it('should handle deeply nested rules', () => {
    const input = '.a { .b { .c { .d { color: red; } } } }'

    const result = formatCSS(input)
    expect(result).toBeTruthy()
  })

  it('should handle @media without braces', () => {
    const input = '@media (min-width: 768px)'

    const result = formatCSS(input)
    expect(result).toBeTruthy()
  })
})

describe('Performance with Large Input', () => {
  it('should handle very large CSS files', () => {
    let input = ''
    for (let i = 0; i < 10000; i++) {
      input += `.p-${i} { padding: ${i}px; }`
    }

    const start = Date.now()
    const result = minifyCSS(input)
    const duration = Date.now() - start

    expect(result).toBeTruthy()
    expect(duration).toBeLessThan(1000) // Should be fast
  })

  it('should handle many comments', () => {
    let input = ''
    for (let i = 0; i < 1000; i++) {
      input += `/* Comment ${i} */ .p-${i} { color: red; }`
    }

    const result = minifyCSS(input)
    expect(result).toBeTruthy()
  })
})
