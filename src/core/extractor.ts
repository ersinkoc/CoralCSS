/**
 * Class Extractor
 *
 * Extracts class names from HTML and other content.
 * @module core/extractor
 */

import { dedupeStrings } from '../utils/string'

/**
 * Maximum input length to prevent ReDoS attacks
 */
const MAX_INPUT_LENGTH = 1_000_000 // 1MB

/**
 * Maximum class name length (reasonable limit)
 */
const MAX_CLASS_LENGTH = 200

/**
 * Extractor options
 */
export interface ExtractorOptions {
  /** Include attributify syntax */
  attributify?: boolean
  /** Custom extraction patterns */
  patterns?: RegExp[]
  /** Maximum input length (default: 1MB) */
  maxInputLength?: number
}

/**
 * Attributify attribute groups
 */
const ATTRIBUTIFY_GROUPS = [
  'p',
  'm',
  'w',
  'h',
  'size',
  'bg',
  'text',
  'border',
  'ring',
  'shadow',
  'font',
  'leading',
  'tracking',
  'flex',
  'grid',
  'gap',
  'pos',
  'inset',
  'z',
  'opacity',
  'blur',
  'rounded',
  'transition',
  'duration',
  'ease',
  'delay',
  'scale',
  'rotate',
  'translate',
]

/**
 * Class Extractor class
 *
 * @example
 * ```typescript
 * const extractor = new Extractor()
 * const classes = extractor.extractFromHTML('<div class="p-4 bg-red-500">')
 * // ['p-4', 'bg-red-500']
 * ```
 */
export class Extractor {
  private options: ExtractorOptions
  private attributifyPattern: RegExp

  constructor(options: ExtractorOptions = {}) {
    this.options = {
      attributify: false,
      patterns: [],
      ...options,
    }

    // Build attributify pattern
    const attrGroups = ATTRIBUTIFY_GROUPS.join('|')
    this.attributifyPattern = new RegExp(`(?:^|\\s)(${attrGroups})="([^"]*)"`, 'g')
  }

  /**
   * Extract classes from HTML content
   *
   * @example
   * ```typescript
   * const classes = extractor.extractFromHTML(`
   *   <div class="p-4 bg-red-500">
   *     <button class="btn hover:bg-blue-500">Click</button>
   *   </div>
   * `)
   * // ['p-4', 'bg-red-500', 'btn', 'hover:bg-blue-500']
   * ```
   */
  extractFromHTML(html: string): string[] {
    // Input validation to prevent ReDoS
    const maxLength = this.options.maxInputLength ?? MAX_INPUT_LENGTH
    if (!html || html.length > maxLength) {
      if (html && html.length > maxLength) {
        console.warn(`CoralCSS Extractor: Input exceeds max length (${maxLength}), truncating`)
        html = html.slice(0, maxLength)
      } else {
        return []
      }
    }

    const classes: string[] = []

    // Extract from class attributes
    classes.push(...this.extractClassAttribute(html))

    // Extract from className attributes (JSX)
    classes.push(...this.extractClassNameAttribute(html))

    // Extract attributify syntax if enabled
    if (this.options.attributify) {
      classes.push(...this.extractAttributify(html))
    }

    // Apply custom patterns
    for (const pattern of this.options.patterns ?? []) {
      classes.push(...this.extractWithPattern(html, pattern))
    }

    return dedupeStrings(classes)
  }

  /**
   * Extract from any content (JS, JSX, templates, etc.)
   *
   * @example
   * ```typescript
   * const classes = extractor.extract(`
   *   const className = "p-4 bg-red-500"
   *   element.classList.add('hover:bg-blue-500')
   * `)
   * ```
   */
  extract(content: string): string[] {
    // Input validation to prevent ReDoS
    const maxLength = this.options.maxInputLength ?? MAX_INPUT_LENGTH
    if (!content || content.length > maxLength) {
      if (content && content.length > maxLength) {
        console.warn(`CoralCSS Extractor: Input exceeds max length (${maxLength}), truncating`)
        content = content.slice(0, maxLength)
      } else {
        return []
      }
    }

    const classes: string[] = []

    // Extract from class/className attributes
    classes.push(...this.extractClassAttribute(content))
    classes.push(...this.extractClassNameAttribute(content))

    // Extract from template literals
    classes.push(...this.extractTemplateLiterals(content))

    // Extract from string literals that look like classes
    classes.push(...this.extractStringLiterals(content))

    // Apply custom patterns
    for (const pattern of this.options.patterns ?? []) {
      classes.push(...this.extractWithPattern(content, pattern))
    }

    return dedupeStrings(classes)
  }

  /**
   * Extract from class="..." attributes
   */
  private extractClassAttribute(content: string): string[] {
    const classes: string[] = []
    const pattern = /class="([^"]*)"/g
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    return classes
  }

  /**
   * Extract from className="..." or className={'...'} attributes
   */
  private extractClassNameAttribute(content: string): string[] {
    const classes: string[] = []

    // className="..."
    const stringPattern = /className="([^"]*)"/g
    let match: RegExpExecArray | null

    while ((match = stringPattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    // className={'...'}
    const exprPattern = /className=\{[`'"]([^`'"]*)[`'"]\}/g
    while ((match = exprPattern.exec(content)) !== null) {
      const classValue = match[1]!
      classes.push(...this.splitClasses(classValue))
    }

    return classes
  }

  /**
   * Extract from template literals
   */
  private extractTemplateLiterals(content: string): string[] {
    const classes: string[] = []

    // Match template literals in className or class contexts
    const pattern = /(?:class(?:Name)?=\{?)`([^`]*)`/g
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const value = match[1]!
      // Remove ${...} expressions
      const cleaned = value.replace(/\$\{[^}]*\}/g, ' ')
      classes.push(...this.splitClasses(cleaned))
    }

    return classes
  }

  /**
   * Extract from string literals that look like utility classes
   * Uses a ReDoS-safe approach by avoiding nested quantifiers
   */
  private extractStringLiterals(content: string): string[] {
    const classes: string[] = []

    // ReDoS-safe pattern: match simple quoted strings, then validate contents
    // Avoids nested quantifiers that cause catastrophic backtracking
    const pattern = /["'`]([^"'`]{1,500})["'`]/g
    let match: RegExpExecArray | null

    while ((match = pattern.exec(content)) !== null) {
      const value = match[1]
      if (!value) {continue}

      // Only process if it looks like it might contain class names
      // Quick check before splitting to avoid unnecessary work
      if (!/^[a-z]/i.test(value)) {continue}

      // Split and validate each potential class
      const parts = this.splitClasses(value)
      for (const part of parts) {
        // Skip if too long (prevents processing malicious input)
        if (part.length > MAX_CLASS_LENGTH) {continue}

        if (this.looksLikeUtility(part)) {
          classes.push(part)
        }
      }
    }

    return classes
  }

  /**
   * Extract attributify syntax
   *
   * @example
   * ```html
   * <div bg="red-500 hover:red-600" p="4" m="x-2 y-4">
   * ```
   * Extracts: ['bg-red-500', 'hover:bg-red-600', 'p-4', 'm-x-2', 'm-y-4']
   */
  extractAttributify(html: string): string[] {
    const classes: string[] = []
    let match: RegExpExecArray | null

    // Reset regex
    this.attributifyPattern.lastIndex = 0

    while ((match = this.attributifyPattern.exec(html)) !== null) {
      const [, attr, values] = match
      const valueList = values!.trim().split(/\s+/)

      for (const value of valueList) {
        if (!value) {
          continue
        }

        // Check for variant prefix
        const variantMatch = value.match(/^([a-z-]+:)?(.+)$/)
        if (variantMatch) {
          const [, variant, val] = variantMatch
          if (variant) {
            // e.g., hover:red-500 -> hover:bg-red-500
            classes.push(`${variant}${attr}-${val}`)
          } else {
            // e.g., red-500 -> bg-red-500
            classes.push(`${attr}-${val}`)
          }
        }
      }
    }

    return classes
  }

  /**
   * Extract using a custom pattern
   */
  private extractWithPattern(content: string, pattern: RegExp): string[] {
    const classes: string[] = []
    let match: RegExpExecArray | null

    // Clone pattern to reset lastIndex
    const clonedPattern = new RegExp(pattern.source, pattern.flags)

    while ((match = clonedPattern.exec(content)) !== null) {
      // Use first capture group or full match
      const value = match[1] ?? match[0]
      classes.push(...this.splitClasses(value))
    }

    return classes
  }

  /**
   * Split a class string into individual classes
   */
  private splitClasses(classString: string): string[] {
    return classString
      .split(/\s+/)
      .map((c) => c.trim())
      .filter(Boolean)
  }

  /**
   * Check if a string looks like a utility class
   * Uses anchored patterns with limited character classes to prevent ReDoS
   * Supports Unicode identifiers for internationalized class names
   */
  private looksLikeUtility(str: string): boolean {
    // Quick length check first
    if (!str || str.length > MAX_CLASS_LENGTH) {
      return false
    }

    // Simple character-based checks (faster than regex for initial filter)
    // Allow: a-z, hyphen, or Unicode letters (code point > 127)
    const firstChar = str[0]
    const firstCode = firstChar?.charCodeAt(0) ?? 0
    const isValidFirstChar =
      firstChar === '-' ||
      (firstCode >= 97 && firstCode <= 122) || // a-z
      firstCode > 127 // Unicode letters

    if (!isValidFirstChar) {
      return false
    }

    // Common utility patterns - all anchored and using non-greedy matching
    // These patterns avoid nested quantifiers
    // Note: In character classes, `-` must be at start or end to be literal,
    // and `[` `]` are escaped as `\[` `\]` for clarity
    const patterns = [
      /^-?[a-z]+$/,                                // Simple utilities (flex, block, etc.)
      /^-?[a-z]+-[a-z0-9\[\]().:%/_-]+$/,         // Standard utilities (limited charset)
      /^[a-z]+:-?[a-z]+-[a-z0-9\[\]().:%/_-]+$/,  // With single variant prefix
    ]

    // Check ASCII patterns first (most common)
    if (patterns.some((p) => p.test(str))) {
      return true
    }

    // For Unicode class names, use a more permissive but still safe check
    // Match: optional hyphen, then letters/digits/common chars
    // This covers internationalized utility names like text-日本語
    // Check if any character has code point > 127 (non-ASCII)
    const hasNonASCII = firstCode > 127 || [...str].some((c) => (c.codePointAt(0) ?? 0) > 127)
    if (hasNonASCII) {
      // Safe Unicode pattern: no nested quantifiers, anchored
      // Allows Unicode letters (\p{L}), digits, and common utility chars
      try {
        const unicodePattern = /^-?[\p{L}\p{N}][\p{L}\p{N}\-_:.[\]()%/]*$/u
        return unicodePattern.test(str)
      } catch {
        // Unicode regex not supported (old environments), fall back to ASCII-only
        return false
      }
    }

    return false
  }

  /**
   * Set extraction options
   */
  setOptions(options: Partial<ExtractorOptions>): void {
    this.options = { ...this.options, ...options }
  }
}

/**
 * Create a new extractor instance
 */
export function createExtractor(options?: ExtractorOptions): Extractor {
  return new Extractor(options)
}

/**
 * Extract classes from HTML (convenience function)
 */
export function extractFromHTML(html: string, options?: ExtractorOptions): string[] {
  const extractor = new Extractor(options)
  return extractor.extractFromHTML(html)
}

/**
 * Extract classes from any content (convenience function)
 */
export function extractClasses(content: string, options?: ExtractorOptions): string[] {
  const extractor = new Extractor(options)
  return extractor.extract(content)
}
