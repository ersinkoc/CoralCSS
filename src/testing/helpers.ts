/**
 * CoralCSS Testing Helpers
 *
 * Utility functions for testing CoralCSS functionality.
 * @module testing/helpers
 */

import { createCoral } from '../index'
import type { Coral, CoralOptions } from '../types'

/**
 * CSS Snapshot structure
 */
export interface CSSSnapshot {
  /** Generated CSS content */
  css: string
  /** Classes that were processed */
  classes: string[]
  /** Timestamp when snapshot was created */
  timestamp: number
  /** Hash of the CSS content */
  hash: string
}

/**
 * CSS comparison result
 */
export interface CSSComparisonResult {
  /** Whether the CSS content matches */
  matches: boolean
  /** Differences found */
  differences: {
    /** Properties only in the first CSS */
    onlyInFirst: string[]
    /** Properties only in the second CSS */
    onlyInSecond: string[]
    /** Properties with different values */
    different: Array<{
      property: string
      firstValue: string
      secondValue: string
    }>
  }
}

/**
 * Extract generated CSS from a Coral instance for given classes
 *
 * @example
 * ```typescript
 * const coral = createCoral()
 * const css = extractGeneratedCSS(coral, ['bg-red-500', 'p-4'])
 * console.log(css) // Contains the generated CSS rules
 * ```
 */
export function extractGeneratedCSS(
  coral: Coral,
  classes: string | string[]
): string {
  const classArray = Array.isArray(classes)
    ? classes
    : classes.split(/\s+/).filter(Boolean)

  if (classArray.length === 0) {
    return ''
  }

  try {
    return coral.generate(classArray)
  } catch {
    // Return empty string if generation fails
    return ''
  }
}

/**
 * Get computed classes from an element or class string
 *
 * @example
 * ```typescript
 * const classes = getComputedClasses('bg-red-500 p-4 hover:bg-red-600')
 * // Returns ['bg-red-500', 'p-4', 'hover:bg-red-600']
 * ```
 */
export function getComputedClasses(input: Element | string): string[] {
  if (typeof input === 'string') {
    return input.split(/\s+/).filter(Boolean)
  }
  return Array.from(input.classList)
}

/**
 * FNV-1a hash function for CSS content
 * Better distribution than simple djb2 for collision resistance
 * @internal
 */
function hashCSS(css: string): string {
  // FNV-1a 32-bit parameters
  const FNV_PRIME = 0x01000193
  const FNV_OFFSET = 0x811c9dc5

  let hash = FNV_OFFSET

  for (let i = 0; i < css.length; i++) {
    hash ^= css.charCodeAt(i)
    hash = Math.imul(hash, FNV_PRIME)
  }

  // Convert to unsigned 32-bit integer and return hex
  return (hash >>> 0).toString(16).padStart(8, '0')
}

/**
 * Generate a CSS snapshot for comparison
 *
 * @example
 * ```typescript
 * const coral = createCoral()
 * const snapshot = generateSnapshot(coral, ['bg-red-500', 'p-4'])
 *
 * // Later, compare with another snapshot
 * const newSnapshot = generateSnapshot(coral, ['bg-red-500', 'p-4'])
 * expect(snapshot.hash).toBe(newSnapshot.hash)
 * ```
 */
export function generateSnapshot(
  coral: Coral,
  classes: string | string[]
): CSSSnapshot {
  const classArray = Array.isArray(classes) ? classes : classes.split(/\s+/)
  const css = coral.generate(classArray)

  return {
    css,
    classes: classArray,
    timestamp: Date.now(),
    hash: hashCSS(css),
  }
}

/**
 * Parse CSS into a map of selectors to properties
 *
 * NOTE: This is a simple parser for testing purposes.
 * Limitations:
 * - Does not handle nested rules (@media, @keyframes, etc.)
 * - Does not handle CSS comments
 * - Does not handle strings containing { or }
 * - For complex CSS comparison, consider using a proper CSS parser
 *
 * @internal
 */
function parseCSS(css: string): Map<string, Map<string, string>> {
  const result = new Map<string, Map<string, string>>()

  // Remove CSS comments first
  const cleanedCSS = css.replace(/\/\*[\s\S]*?\*\//g, '')

  // Simple CSS parser - handles basic rules only
  // Using a non-greedy match for the properties block
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g
  let match

  while ((match = ruleRegex.exec(cleanedCSS)) !== null) {
    const selector = match[1]?.trim()
    const propertiesStr = match[2]?.trim()

    // Skip empty or at-rule selectors (basic handling)
    if (!selector || !propertiesStr || selector.startsWith('@')) {
      continue
    }

    const properties = new Map<string, string>()
    // Split by semicolons and process each property
    const propParts = propertiesStr.split(';').filter((p) => p.trim())

    for (const propPart of propParts) {
      const colonIndex = propPart.indexOf(':')
      if (colonIndex === -1) continue

      const propName = propPart.slice(0, colonIndex).trim()
      const propValue = propPart.slice(colonIndex + 1).trim()

      if (propName && propValue) {
        properties.set(propName, propValue)
      }
    }

    if (properties.size > 0) {
      result.set(selector, properties)
    }
  }

  return result
}

/**
 * Compare two CSS strings for differences
 *
 * @example
 * ```typescript
 * const result = compareCSS(
 *   '.bg-red-500 { background-color: red; }',
 *   '.bg-red-500 { background-color: blue; }'
 * )
 *
 * if (!result.matches) {
 *   console.log('Differences:', result.differences)
 * }
 * ```
 */
export function compareCSS(css1: string, css2: string): CSSComparisonResult {
  const parsed1 = parseCSS(css1)
  const parsed2 = parseCSS(css2)

  const onlyInFirst: string[] = []
  const onlyInSecond: string[] = []
  const different: Array<{
    property: string
    firstValue: string
    secondValue: string
  }> = []

  // Check selectors only in first
  for (const selector of parsed1.keys()) {
    if (!parsed2.has(selector)) {
      onlyInFirst.push(selector)
    }
  }

  // Check selectors only in second
  for (const selector of parsed2.keys()) {
    if (!parsed1.has(selector)) {
      onlyInSecond.push(selector)
    }
  }

  // Check property differences for common selectors
  for (const [selector, props1] of parsed1) {
    const props2 = parsed2.get(selector)
    if (!props2) {
      continue
    }

    // Check properties in first
    for (const [prop, value1] of props1) {
      const value2 = props2.get(prop)
      if (value2 === undefined) {
        different.push({
          property: `${selector} -> ${prop}`,
          firstValue: value1,
          secondValue: '(missing)',
        })
      } else if (value1 !== value2) {
        different.push({
          property: `${selector} -> ${prop}`,
          firstValue: value1,
          secondValue: value2,
        })
      }
    }

    // Check properties only in second
    for (const [prop, value2] of props2) {
      if (!props1.has(prop)) {
        different.push({
          property: `${selector} -> ${prop}`,
          firstValue: '(missing)',
          secondValue: value2,
        })
      }
    }
  }

  return {
    matches: onlyInFirst.length === 0 && onlyInSecond.length === 0 && different.length === 0,
    differences: {
      onlyInFirst,
      onlyInSecond,
      different,
    },
  }
}

/**
 * Normalize CSS for comparison (removes whitespace variations)
 */
export function normalizeCSS(css: string): string {
  return css
    .replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, ' { ')
    .replace(/\s*}\s*/g, ' } ')
    .replace(/\s*;\s*/g, '; ')
    .replace(/\s*:\s*/g, ': ')
    .trim()
}

/**
 * Extract CSS properties from generated CSS for a specific class
 *
 * @example
 * ```typescript
 * const coral = createCoral()
 * const css = coral.generate(['bg-red-500'])
 * const props = extractCSSProperties(css, '.bg-red-500')
 * // Returns { 'background-color': 'rgb(...)' }
 * ```
 */
export function extractCSSProperties(
  css: string,
  selector: string
): Record<string, string> {
  const parsed = parseCSS(css)
  const properties = parsed.get(selector)

  if (!properties) {
    return {}
  }

  const result: Record<string, string> = {}
  for (const [key, value] of properties) {
    result[key] = value
  }
  return result
}

/**
 * Create a CSS diff report between two snapshots
 */
export function createDiffReport(
  snapshot1: CSSSnapshot,
  snapshot2: CSSSnapshot
): string {
  const comparison = compareCSS(snapshot1.css, snapshot2.css)

  if (comparison.matches) {
    return 'No differences found.'
  }

  const lines: string[] = ['CSS Differences:']
  lines.push('')

  if (comparison.differences.onlyInFirst.length > 0) {
    lines.push('Selectors only in first:')
    comparison.differences.onlyInFirst.forEach((s) => lines.push(`  - ${s}`))
    lines.push('')
  }

  if (comparison.differences.onlyInSecond.length > 0) {
    lines.push('Selectors only in second:')
    comparison.differences.onlyInSecond.forEach((s) => lines.push(`  + ${s}`))
    lines.push('')
  }

  if (comparison.differences.different.length > 0) {
    lines.push('Property differences:')
    comparison.differences.different.forEach((d) => {
      lines.push(`  ${d.property}:`)
      lines.push(`    - ${d.firstValue}`)
      lines.push(`    + ${d.secondValue}`)
    })
  }

  return lines.join('\n')
}

/**
 * Create a test utility coral instance with specific configuration
 */
export function createConfiguredCoral(options: CoralOptions = {}): Coral {
  return createCoral(options)
}

/**
 * Wait for CSS injection to complete (for async testing)
 */
export async function waitForCSSInjection(
  selector = '[data-coral]',
  timeout = 1000
): Promise<HTMLStyleElement | null> {
  if (typeof document === 'undefined') {
    return null
  }

  const startTime = Date.now()

  return new Promise((resolve) => {
    const check = () => {
      const element = document.querySelector(selector) as HTMLStyleElement | null
      if (element) {
        resolve(element)
      } else if (Date.now() - startTime > timeout) {
        resolve(null)
      } else {
        setTimeout(check, 10)
      }
    }
    check()
  })
}

/**
 * Get all injected Coral style elements
 */
export function getInjectedStyles(): HTMLStyleElement[] {
  if (typeof document === 'undefined') {
    return []
  }
  return Array.from(document.querySelectorAll('style[data-coral]'))
}

/**
 * Clean up all injected Coral styles
 */
export function cleanupInjectedStyles(): void {
  getInjectedStyles().forEach((el) => el.remove())
}
