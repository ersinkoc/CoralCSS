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
 * These are checked case-insensitively
 */
const DANGEROUS_CSS_PATTERNS = [
  // JavaScript execution vectors (outside of url())
  /javascript\s*:/i,
  /vbscript\s*:/i,
  // Note: data: URLs are handled separately in url() check to allow data:image/*

  // Legacy IE expression execution
  /expression\s*\(/i,
  /behavior\s*:/i,

  // Firefox-specific binding
  /-moz-binding\s*:/i,

  // Import can load external stylesheets with malicious content
  /@import/i,
]

/**
 * Check if a CSS value contains potentially dangerous content
 * Used to sanitize arbitrary values in class names
 *
 * @example
 * ```typescript
 * isDangerousCSSValue('url(javascript:alert(1))') // true
 * isDangerousCSSValue('expression(alert(1))') // true
 * isDangerousCSSValue('#ff0000') // false
 * isDangerousCSSValue('calc(100% - 20px)') // false
 * ```
 */
export function isDangerousCSSValue(value: string): boolean {
  if (!value) return false

  // Check against dangerous patterns
  for (const pattern of DANGEROUS_CSS_PATTERNS) {
    if (pattern.test(value)) {
      return true
    }
  }

  // Check for url() with dangerous protocols
  const urlMatch = value.match(/url\s*\(\s*(['"]?)(.+?)\1\s*\)/gi)
  if (urlMatch) {
    for (const match of urlMatch) {
      const urlContent = match.replace(/url\s*\(\s*['"]?/i, '').replace(/['"]?\s*\)$/, '')
      const trimmedUrl = urlContent.trim()
      // Block dangerous protocols in url():
      // - javascript: and vbscript: can execute scripts
      // - data: URLs are allowed only for images (data:image/*)
      // - data:text/html can execute scripts and must be blocked
      if (/^(javascript|vbscript)\s*:/i.test(trimmedUrl)) {
        return true
      }
      // Block data: URLs that aren't images
      if (/^data\s*:/i.test(trimmedUrl) && !/^data\s*:\s*image\//i.test(trimmedUrl)) {
        return true
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
  if (!value) return value

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
