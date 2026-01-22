/**
 * String Utilities
 *
 * Helper functions for string manipulation.
 * @module utils/string
 */

/**
 * Convert string to kebab-case
 *
 * @example
 * ```typescript
 * kebabCase('backgroundColor') // 'background-color'
 * kebabCase('WebkitTransform') // '-webkit-transform'
 * kebabCase('XMLHttpRequest') // 'x-m-l-http-request'
 * ```
 */
export function kebabCase(str: string): string {
  // Preserve CSS custom properties (starting with --) and vendor prefixes (starting with single dash + lowercase)
  if (str.startsWith('--') || /^-[a-z]/.test(str)) {
    return str.toLowerCase()
  }

  return str
    .replace(/([A-Z])/g, '-$1') // Insert dash before each uppercase
    .replace(/[\s_]+/g, '-')
    .replace(/^-/, '') // Remove leading dash if present (from camelCase conversion)
    .replace(/--+/g, '-') // Collapse multiple dashes
    .toLowerCase()
}

/**
 * Convert string to camelCase
 *
 * @example
 * ```typescript
 * camelCase('background-color') // 'backgroundColor'
 * camelCase('-webkit-transform') // 'WebkitTransform'
 * ```
 */
export function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

/**
 * Convert string to PascalCase
 *
 * @example
 * ```typescript
 * pascalCase('my-component') // 'MyComponent'
 * ```
 */
export function pascalCase(str: string): string {
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/**
 * Escape special characters for use in CSS selectors
 *
 * @example
 * ```typescript
 * escapeSelector('bg-[#ff0000]') // 'bg-\\[\\#ff0000\\]'
 * escapeSelector('w-1/2') // 'w-1\\/2'
 * ```
 */
export function escapeSelector(selector: string): string {
  // Characters that need escaping in CSS selectors
  return selector.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&')
}

/**
 * Dangerous CSS patterns that could lead to XSS or code execution
 * These are checked case-insensitively against normalized input
 */
const DANGEROUS_CSS_PATTERNS = [
  // JavaScript execution vectors (outside of url())
  /javascript\s*:/i,
  /vbscript\s*:/i,

  // Space-separated javascript keyword bypass
  /\bj\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i,

  // Legacy IE expression execution
  /expression\s*\(/i,
  /behavior\s*:/i,

  // Firefox-specific binding
  /-moz-binding\s*:/i,

  // Import can load external stylesheets with malicious content
  /@import/i,

  // Script tags (for SVG injection)
  /<script/i,

  // Event handlers (for SVG/HTML injection)
  /\bon\w+\s*=/i,
]

/**
 * Decode CSS unicode escapes to their actual characters
 * CSS allows \XXXXXX format where X is a hex digit
 *
 * @example
 * ```typescript
 * decodeCSSUnicodeEscapes('\\6a\\61vascript') // 'javascript'
 * decodeCSSUnicodeEscapes('\\6A\\41vascript') // 'jAvascript'
 * ```
 */
function decodeCSSUnicodeEscapes(value: string): string {
  // CSS unicode escape: backslash followed by 1-6 hex digits, optionally followed by whitespace
  return value.replace(/\\([0-9a-fA-F]{1,6})[\s]?/g, (_, hex: string) => {
    const codePoint = parseInt(hex, 16)
    // Validate code point is in valid Unicode range
    if (codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
      return '\ufffd' // Replacement character for invalid
    }
    return String.fromCodePoint(codePoint)
  })
}

/**
 * Remove CSS comments that could be used to bypass detection
 * Example: 'java' + comment + 'script' becomes 'javascript'
 *
 * Uses a state machine approach to avoid ReDoS vulnerability from
 * nested comment patterns (e.g. comment-within-comment that causes
 * catastrophic backtracking in regex solutions).
 */
function removeCSSComments(value: string): string {
  const result: string[] = []
  let i = 0
  const len = value.length

  while (i < len) {
    // Check for comment start /*
    if (i + 1 < len && value[i] === '/' && value[i + 1] === '*') {
      i += 2
      // Skip until we find closing */
      while (i + 1 < len) {
        if (value[i] === '*' && value[i + 1] === '/') {
          i += 2
          break
        }
        i++
      }
      continue
    }

    // Copy non-comment characters
    result.push(value[i]!)
    i++
  }

  return result.join('')
}

/**
 * Normalize a CSS value for security checking
 * Removes obfuscation techniques like unicode escapes and comments
 */
function normalizeCSSValue(value: string): string {
  let normalized = value

  // Remove CSS comments first (can split keywords)
  normalized = removeCSSComments(normalized)

  // Decode unicode escapes (can encode dangerous chars)
  normalized = decodeCSSUnicodeEscapes(normalized)

  // Remove null bytes and other control characters
  // eslint-disable-next-line no-control-regex -- intentionally matching control chars for security
  normalized = normalized.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '')

  return normalized
}

/**
 * Check if a CSS value contains potentially dangerous content
 * Used to sanitize arbitrary values in class names
 *
 * Security measures:
 * - Decodes CSS unicode escapes before checking
 * - Removes CSS comments that could split keywords
 * - Blocks SVG data URLs (can contain scripts)
 * - Checks for event handlers and script tags
 *
 * @example
 * ```typescript
 * isDangerousCSSValue('url(javascript:alert(1))') // true
 * isDangerousCSSValue('expression(alert(1))') // true
 * isDangerousCSSValue('url(\\6aavascript:alert(1))') // true (unicode bypass blocked)
 * isDangerousCSSValue('#ff0000') // false
 * isDangerousCSSValue('calc(100% - 20px)') // false
 * ```
 */
export function isDangerousCSSValue(value: string): boolean {
  if (!value) {return false}

  // Normalize to defeat obfuscation
  const normalized = normalizeCSSValue(value)

  // Check against dangerous patterns on normalized value
  for (const pattern of DANGEROUS_CSS_PATTERNS) {
    if (pattern.test(normalized)) {
      return true
    }
  }

  // Check for direct data: URLs (not wrapped in url())
  // These can be used in CSS values like background-image directly
  const directDataURLMatch = normalized.match(/^data\s*:\s*([^\s,]+),(.*)/is)
  if (directDataURLMatch) {
    const mimeType = directDataURLMatch[1]!.toLowerCase()
    const content = directDataURLMatch[2] || ''

    // Block non-image data URLs entirely
    if (!mimeType.startsWith('image/')) {
      return true
    }

    // For SVG images, decode and check for dangerous content
    if (mimeType.includes('svg')) {
      let decodedContent: string
      if (mimeType.includes('base64')) {
        try {
          // eslint-disable-next-line no-undef -- atob is browser API, Buffer is Node.js
          decodedContent = typeof atob !== 'undefined' ? atob(content) : Buffer.from(content, 'base64').toString('utf-8')
        } catch {
          decodedContent = content
        }
      } else {
        try {
          decodedContent = decodeURIComponent(content)
        } catch {
          decodedContent = content
        }
      }

      // Check for dangerous patterns in decoded SVG
      if (
        /<script/i.test(decodedContent) ||
        /\bon\w+\s*=/i.test(decodedContent) ||
        /javascript\s*:/i.test(decodedContent) ||
        /href\s*=\s*["']?\s*javascript/i.test(decodedContent) ||
        /onload\s*=/i.test(decodedContent) ||
        /onerror\s*=/i.test(decodedContent)
      ) {
        return true
      }
    }
  }

  // Check for url() with dangerous protocols
  const urlMatch = normalized.match(/url\s*\(\s*(['"]?)([^)]+)\1\s*\)/gi)
  if (urlMatch) {
    for (const match of urlMatch) {
      const urlContent = match.replace(/url\s*\(\s*['"]?/i, '').replace(/['"]?\s*\)$/, '')
      const trimmedUrl = urlContent.trim()

      // Block dangerous protocols in url()
      if (/^(javascript|vbscript)\s*:/i.test(trimmedUrl)) {
        return true
      }

      // Handle data: URLs carefully
      if (/^data\s*:/i.test(trimmedUrl)) {
        // Block non-image data URLs entirely (text/html, etc.)
        if (!/^data\s*:\s*image\//i.test(trimmedUrl)) {
          return true
        }

        // For image data URLs (including SVG), decode and check for dangerous content
        const commaIndex = trimmedUrl.indexOf(',')
        if (commaIndex !== -1) {
          const header = trimmedUrl.slice(0, commaIndex).toLowerCase()
          const content = trimmedUrl.slice(commaIndex + 1)

          let decodedContent: string

          // Decode the content based on encoding
          if (header.includes('base64')) {
            try {
              // eslint-disable-next-line no-undef -- atob is browser API, Buffer is Node.js
              decodedContent = typeof atob !== 'undefined' ? atob(content) : Buffer.from(content, 'base64').toString('utf-8')
            } catch {
              // Invalid base64 - treat as raw
              decodedContent = content
            }
          } else {
            // URL-encoded or plain text
            try {
              decodedContent = decodeURIComponent(content)
            } catch {
              decodedContent = content
            }
          }

          // Check for dangerous patterns in decoded content
          // COMPREHENSIVE SVG XSS checks - multiple bypass vectors
          const dangerousSvgPatterns = [
            /<script/i,                    // Script tags
            /\bon\w+\s*=/i,                // Event handlers (onload, onerror, etc.)
            /javascript\s*:/i,             // javascript: protocol
            /href\s*=\s*["']?\s*javascript/i, // href with javascript
            /xlink:href\s*=\s*["']?\s*javascript/i, // xlink:href attacks
            /onload\s*=/i,                 // Specific: onload
            /onerror\s*=/i,                // Specific: onerror
            /<iframe/i,                    // iframe embeds
            /<object/i,                    // object embeds
            /<embed/i,                     // embed tags
            /<foreignObject/i,             // Foreign object can contain HTML
            /data:text\/html/i,            // HTML data URLs
            /&#x?[\da-f]+;/i,              // HTML entity encoding bypass
            /&#[0-9]+;/i,                  // HTML numeric entities
            /<style/i,                     // Style tags with CSS expressions
            /<a\s/i,                       // Anchor tags (potential xlink:href)
          ]

          for (const pattern of dangerousSvgPatterns) {
            if (pattern.test(decodedContent)) {
              return true
            }
          }

          // Also check for double-encoded content (encoding bypass attempts)
          const doubleDecoded = decodeCSSUnicodeEscapes(decodedContent)
          if (doubleDecoded !== decodedContent) {
            for (const pattern of dangerousSvgPatterns) {
              if (pattern.test(doubleDecoded)) {
                return true
              }
            }
          }
        }
      }
    }
  }

  return false
}

/**
 * Sanitize a CSS value by removing or escaping dangerous content
 * Returns null if the value is too dangerous to sanitize
 *
 * @example
 * ```typescript
 * sanitizeCSSValue('calc(100% - 20px)') // 'calc(100% - 20px)'
 * sanitizeCSSValue('url(javascript:alert(1))') // null (dangerous)
 * ```
 */
export function sanitizeCSSValue(value: string): string | null {
  if (!value) {return value}

  // If it contains dangerous patterns, reject entirely
  if (isDangerousCSSValue(value)) {
    return null
  }

  return value
}

/**
 * Escape special characters for use in RegExp
 *
 * @example
 * ```typescript
 * escapeRegex('p-[4px]') // 'p-\\[4px\\]'
 * ```
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Generate a unique ID
 *
 * @example
 * ```typescript
 * generateId() // 'coral-a1b2c3d4'
 * generateId('dialog') // 'dialog-a1b2c3d4'
 * ```
 */
export function generateId(prefix = 'coral'): string {
  const random = Math.random().toString(36).substring(2, 10)
  return `${prefix}-${random}`
}

/**
 * Check if string is a valid CSS identifier
 *
 * @example
 * ```typescript
 * isValidIdentifier('my-class') // true
 * isValidIdentifier('123class') // false
 * ```
 */
export function isValidIdentifier(str: string): boolean {
  // CSS identifier must start with a letter, underscore, or hyphen
  // followed by letters, digits, underscores, or hyphens
  return /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(str)
}

/**
 * Hash a string for caching purposes
 *
 * @example
 * ```typescript
 * hashString('p-4') // 'h1a2b3c4'
 * ```
 */
export function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return 'h' + Math.abs(hash).toString(36)
}

/**
 * Split string by delimiter, respecting brackets
 *
 * @example
 * ```typescript
 * splitByDelimiter('hover:bg-[#ff0000]:text-white', ':')
 * // ['hover', 'bg-[#ff0000]', 'text-white']
 * ```
 */
export function splitByDelimiter(str: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let depth = 0

  for (const char of str) {
    if (char === '[' || char === '(') {
      depth++
      current += char
    } else if (char === ']' || char === ')') {
      depth--
      current += char
    } else if (char === delimiter && depth === 0) {
      if (current) {
        result.push(current)
      }
      current = ''
    } else {
      current += char
    }
  }

  if (current) {
    result.push(current)
  }

  return result
}

/**
 * Trim quotes from string
 *
 * @example
 * ```typescript
 * trimQuotes('"hello"') // 'hello'
 * trimQuotes("'hello'") // 'hello'
 * ```
 */
export function trimQuotes(str: string): string {
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    return str.slice(1, -1)
  }
  return str
}

/**
 * Capitalize first letter
 *
 * @example
 * ```typescript
 * capitalize('hello') // 'Hello'
 * ```
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Check if string contains only whitespace
 */
export function isWhitespace(str: string): boolean {
  return /^\s*$/.test(str)
}

/**
 * Deduplicate array of strings while preserving order
 */
export function dedupeStrings(arr: string[]): string[] {
  return [...new Set(arr)]
}

/**
 * Join strings with proper spacing
 */
export function joinWithSpace(...parts: (string | undefined | null | false)[]): string {
  return parts.filter(Boolean).join(' ')
}
