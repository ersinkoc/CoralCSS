/**
 * Class Name Parser
 *
 * Parses utility class names into structured format.
 * @module core/parser
 */

import type { ParsedClass } from '../types'
import { splitByDelimiter } from '../utils/string'
import { NEGATIVE_PATTERN } from '../utils/regex'
import {
  OPACITY_PATTERN,
  ARBITRARY_PATTERN,
  VARIANT_GROUP_PREFIX_PATTERN,
  WHITESPACE_PATTERN,
  ARBITRARY_WITH_TYPE_PATTERN,
  HAS_BRACKETS_PATTERN,
  BRACKET_CONTENT_PATTERN,
} from './parser-cache'

/**
 * Maximum allowed class name length to prevent DoS
 */
const MAX_CLASS_LENGTH = 500

/**
 * Maximum recursion depth for variant group expansion
 */
const MAX_VARIANT_GROUP_DEPTH = 10

/**
 * Empty parsed class result for invalid inputs
 */
const EMPTY_PARSED_CLASS: ParsedClass = {
  original: '',
  variants: [],
  utility: '',
  negative: false,
  arbitrary: null,
  important: false,
  opacity: null,
}

/**
 * Parse a class name into its components
 *
 * @example
 * ```typescript
 * parse('hover:dark:bg-red-500')
 * // {
 * //   original: 'hover:dark:bg-red-500',
 * //   variants: ['hover', 'dark'],
 * //   utility: 'bg-red-500',
 * //   negative: false,
 * //   arbitrary: null
 * // }
 *
 * parse('-translate-x-4')
 * // {
 * //   original: '-translate-x-4',
 * //   variants: [],
 * //   utility: 'translate-x-4',
 * //   negative: true,
 * //   arbitrary: null
 * // }
 *
 * parse('bg-[#ff0000]')
 * // {
 * //   original: 'bg-[#ff0000]',
 * //   variants: [],
 * //   utility: 'bg-[#ff0000]',
 * //   negative: false,
 * //   arbitrary: '#ff0000'
 * // }
 * ```
 */
export function parse(className: string): ParsedClass {
  // Input validation
  if (!className || typeof className !== 'string') {
    return { ...EMPTY_PARSED_CLASS }
  }

  // Trim whitespace
  const trimmed = className.trim()

  // Empty or whitespace-only check
  if (!trimmed) {
    return { ...EMPTY_PARSED_CLASS }
  }

  // Length check to prevent DoS
  if (trimmed.length > MAX_CLASS_LENGTH) {
    console.warn(`CoralCSS Parser: Class name exceeds max length (${MAX_CLASS_LENGTH}), returning empty result`)
    return { ...EMPTY_PARSED_CLASS, original: trimmed.slice(0, MAX_CLASS_LENGTH) }
  }

  const original = trimmed
  let remaining = trimmed
  const variants: string[] = []
  let negative = false
  let arbitrary: string | null = null
  let important = false
  let opacity: string | null = null

  // Split by colon, respecting brackets
  const parts = splitByDelimiter(remaining, ':')

  // Last part is the utility, rest are variants
  if (parts.length > 1) {
    const utility = parts.pop()!
    variants.push(...parts)
    remaining = utility
  }

  // Check for important prefix (!)
  if (remaining.startsWith('!')) {
    important = true
    remaining = remaining.slice(1)
  }

  // Check for negative prefix
  const negativeMatch = remaining.match(NEGATIVE_PATTERN)
  if (negativeMatch) {
    negative = true
    remaining = negativeMatch[1]!
  }

  // Check for opacity modifier (e.g., bg-red-500/50 or bg-red-500/[0.5])
  const opacityMatch = remaining.match(OPACITY_PATTERN)
  if (opacityMatch) {
    opacity = opacityMatch[1]!
    // Remove opacity from utility for matching
    remaining = remaining.slice(0, -opacityMatch[0]!.length)
  }

  // Check for arbitrary value
  const arbitraryMatch = remaining.match(ARBITRARY_PATTERN)
  if (arbitraryMatch) {
    arbitrary = arbitraryMatch[1]!
  }

  return {
    original,
    variants,
    utility: remaining,
    negative,
    arbitrary,
    important,
    opacity,
  }
}

/**
 * Expand variant groups into individual classes
 *
 * @example
 * ```typescript
 * expandVariantGroups('hover:(bg-red-500 text-white scale-105)')
 * // ['hover:bg-red-500', 'hover:text-white', 'hover:scale-105']
 *
 * expandVariantGroups('dark:hover:(bg-gray-800 text-white)')
 * // ['dark:hover:bg-gray-800', 'dark:hover:text-white']
 * ```
 */
export function expandVariantGroups(input: string, depth = 0): string[] {
  // Depth limit to prevent stack overflow from circular/deep nesting
  if (depth > MAX_VARIANT_GROUP_DEPTH) {
    console.warn(`CoralCSS Parser: Variant group depth exceeds max (${MAX_VARIANT_GROUP_DEPTH}), stopping expansion`)
    return [input]
  }

  // Input validation
  if (!input || typeof input !== 'string') {
    return []
  }

  const result: string[] = []
  const str = input.trim()

  // Empty check
  if (!str) {
    return []
  }

  // Length check
  if (str.length > MAX_CLASS_LENGTH * 10) { // Allow longer for grouped classes
    console.warn(`CoralCSS Parser: Variant group input too long, returning as-is`)
    return [str]
  }

  let pos = 0

  // Helper to find balanced closing parenthesis
  function findClosingParen(s: string, start: number): number {
    let parenDepth = 1
    for (let i = start; i < s.length; i++) {
      if (s[i] === '(') {parenDepth++}
      if (s[i] === ')') {parenDepth--}
      if (parenDepth === 0) {return i}
    }
    return -1
  }

  // Helper to skip whitespace
  function skipWhitespace(): void {
    while (pos < str.length && WHITESPACE_PATTERN.test(str[pos]!)) {
      pos++
    }
  }

  // Helper to read a token (class name or variant group)
  function readToken(): string | null {
    skipWhitespace()
    if (pos >= str.length) {return null}

    const start = pos

    // Check if this is a variant group pattern
    // Match: variant:( or variant:variant:( etc.
    const remaining = str.slice(pos)
    const groupMatch = remaining.match(VARIANT_GROUP_PREFIX_PATTERN)

    if (groupMatch) {
      const variantPrefix = groupMatch[1]!
      pos += groupMatch[0]!.length - 1 // Move to opening paren

      // Find matching closing paren
      const closePos = findClosingParen(str, pos + 1)
      if (closePos === -1) {
        // Malformed, return rest as single token
        const token = str.slice(start)
        pos = str.length
        return token
      }

      // Extract content between parens
      const content = str.slice(pos + 1, closePos)
      pos = closePos + 1

      // Recursively expand the content with incremented depth
      const expanded = expandVariantGroups(content, depth + 1)

      // Add each expanded class with the variant prefix
      for (const expandedClass of expanded) {
        result.push(`${variantPrefix}:${expandedClass}`)
      }

      return null // Already added to result
    }

    // Regular token - read until whitespace or end
    while (pos < str.length && !WHITESPACE_PATTERN.test(str[pos]!)) {
      pos++
    }

    return str.slice(start, pos)
  }

  // Process all tokens
  while (pos < str.length) {
    skipWhitespace()
    if (pos >= str.length) {break}

    const token = readToken()
    if (token) {
      result.push(token)
    }
    // If token is null, the function already added expanded items
  }

  return result
}

/**
 * Parse multiple class names from a space-separated string
 *
 * @example
 * ```typescript
 * parseClasses('p-4 bg-red-500 hover:bg-red-600')
 * // [
 * //   { original: 'p-4', variants: [], utility: 'p-4', ... },
 * //   { original: 'bg-red-500', variants: [], utility: 'bg-red-500', ... },
 * //   { original: 'hover:bg-red-600', variants: ['hover'], utility: 'bg-red-600', ... }
 * // ]
 * ```
 */
export function parseClasses(classString: string): ParsedClass[] {
  // First expand any variant groups
  const expanded = expandVariantGroups(classString)

  // Then parse each class
  return expanded.map(parse)
}

/**
 * Check if a class name has variants
 */
export function hasVariants(className: string): boolean {
  return className.includes(':') && !className.startsWith('[')
}

/**
 * Check if a class name is negative
 */
export function isNegative(className: string): boolean {
  return className.startsWith('-') && !className.startsWith('--')
}

/**
 * Check if a class name has an arbitrary value
 */
export function hasArbitrary(className: string): boolean {
  return HAS_BRACKETS_PATTERN.test(className)
}

/**
 * Extract the utility name without variants
 */
export function extractUtility(className: string): string {
  const parts = splitByDelimiter(className, ':')
  return parts[parts.length - 1]!
}

/**
 * Extract variants from a class name
 */
export function extractVariants(className: string): string[] {
  const parts = splitByDelimiter(className, ':')
  return parts.slice(0, -1)
}

/**
 * Combine variants with a utility
 */
export function combineWithVariants(utility: string, variants: string[]): string {
  if (variants.length === 0) {
    return utility
  }
  return [...variants, utility].join(':')
}

/**
 * Normalize arbitrary value (replace underscores with spaces)
 *
 * @example
 * ```typescript
 * normalizeArbitraryValue('grid-cols-[1fr_2fr]')
 * // 'grid-cols-[1fr 2fr]'
 * ```
 */
export function normalizeArbitraryValue(value: string): string {
  // Replace underscores with spaces in arbitrary values
  // But not if they're escaped (\_)
  return value.replace(/(?<!\\)_/g, ' ')
}

/**
 * Extract arbitrary value and its type hint
 *
 * @example
 * ```typescript
 * parseArbitraryValue('[color:red]')
 * // { type: 'color', value: 'red' }
 *
 * parseArbitraryValue('[#ff0000]')
 * // { type: null, value: '#ff0000' }
 * ```
 */
export function parseArbitraryValue(input: string): { type: string | null; value: string } | null {
  const match = input.match(ARBITRARY_WITH_TYPE_PATTERN)
  if (!match) {
    return null
  }

  const [, type, value] = match
  return {
    type: type || null,
    value: normalizeArbitraryValue(value!),
  }
}

/**
 * Create a class name from components
 */
export function createClassName(
  utility: string,
  options: { variants?: string[]; negative?: boolean } = {}
): string {
  const { variants = [], negative = false } = options

  let result = utility
  if (negative) {
    result = `-${result}`
  }
  if (variants.length > 0) {
    result = [...variants, result].join(':')
  }

  return result
}

/**
 * Extended parsed class result with additional fields
 */
export interface ExtendedParsedClass {
  original: string
  variants: string[]
  utility: string
  negative: boolean
  arbitrary: string | null
  important: boolean
  opacity: string | null
}

/**
 * ClassNameParser - OOP wrapper for parsing functions
 *
 * @example
 * ```typescript
 * const parser = new ClassNameParser()
 * const result = parser.parse('hover:bg-red-500/50')
 * // { utility: 'bg-red-500', variants: ['hover'], opacity: '50', ... }
 * ```
 */
export class ClassNameParser {
  /**
   * Parse a class name into its components
   */
  parse(className: string): ExtendedParsedClass {
    let remaining = className
    let important = false
    let negative = false
    let opacity: string | null = null
    let arbitrary: string | null = null

    // Split by colon, respecting brackets
    const parts = splitByDelimiter(remaining, ':')

    // Last part is the utility, rest are variants
    const variants: string[] = []
    if (parts.length > 1) {
      const utility = parts.pop()!
      variants.push(...parts)
      remaining = utility
    }

    // Check for important prefix (can be at start of class or after variants)
    if (remaining.startsWith('!')) {
      important = true
      remaining = remaining.slice(1)
    }

    // Check for negative prefix
    if (remaining.startsWith('-') && !remaining.startsWith('--')) {
      negative = true
      remaining = remaining.slice(1)
    }

    // Check for opacity modifier (e.g., bg-red-500/50)
    const opacityMatch = remaining.match(OPACITY_PATTERN)
    if (opacityMatch) {
      opacity = opacityMatch[1]!
    }

    // Check for arbitrary value
    const arbitraryMatch = remaining.match(ARBITRARY_PATTERN)
    if (arbitraryMatch) {
      arbitrary = arbitraryMatch[1]!
    }

    return {
      original: className,
      variants,
      utility: remaining,
      negative,
      arbitrary,
      important,
      opacity,
    }
  }

  /**
   * Parse multiple classes
   */
  parseClasses(input: string): ExtendedParsedClass[] {
    const expanded = this.expandVariantGroups(input)
    return expanded.map((c) => this.parse(c))
  }

  /**
   * Expand variant groups into individual classes
   */
  expandVariantGroups(input: string): string[] {
    return expandVariantGroups(input)
  }

  /**
   * Parse an arbitrary value, returns just the value string
   */
  parseArbitraryValue(input: string): string | null {
    const match = input.match(BRACKET_CONTENT_PATTERN)
    if (!match) {
      return null
    }
    return match[1]!
  }

  /**
   * Split variants from utility
   */
  splitVariants(className: string): { variants: string[]; utility: string } {
    const parts = splitByDelimiter(className, ':')
    if (parts.length > 1) {
      const utility = parts.pop()!
      return { variants: parts, utility }
    }
    return { variants: [], utility: className }
  }
}
