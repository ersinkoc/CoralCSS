/**
 * CSS Utilities
 *
 * Helper functions for CSS manipulation and generation.
 * @module utils/css
 */

import type { CSSProperties, CSSValue } from '../types'
import { kebabCase, sanitizeCSSValue } from './string'
import { CoralError, ErrorCode } from '../errors'

/**
 * Serialize CSS properties object to CSS string
 *
 * @example
 * ```typescript
 * serializeProperties({ padding: '1rem', marginTop: '2rem' })
 * // 'padding: 1rem; margin-top: 2rem;'
 * ```
 */
export function serializeProperties(properties: CSSProperties): string {
  const parts: string[] = []

  for (const [key, value] of Object.entries(properties)) {
    if (value === null || value === undefined) {
      continue
    }

    if (typeof value === 'object') {
      // Nested properties (for things like nested rules)
      parts.push(`${key} { ${serializeProperties(value as CSSProperties)} }`)
    } else {
      const cssKey = kebabCase(key)
      parts.push(`${cssKey}: ${formatValue(value)};`)
    }
  }

  return parts.join(' ')
}

/**
 * Format a CSS value
 * Sanitizes string values to prevent CSS injection
 * @throws {CoralError} If a dangerous CSS value is detected
 */
export function formatValue(value: CSSValue): string {
  if (typeof value === 'number') {
    // Validate numeric values
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      throw new CoralError(
        `Invalid numeric CSS value: ${value}`,
        ErrorCode.INVALID_CONFIG,
        { value },
        ['Use a finite number', 'Check for NaN/Infinity values']
      )
    }
    // 0 doesn't need units, others might be unitless
    return value === 0 ? '0' : String(value)
  }
  // Sanitize string values to prevent CSS injection attacks
  const sanitized = sanitizeCSSValue(value)
  if (sanitized === null) {
    // Throw error instead of silent fallback - this is a SECURITY MUST
    throw new CoralError(
      `Blocked potentially dangerous CSS value: ${value.slice(0, 100)}`,
      ErrorCode.INVALID_CONFIG,
      { value },
      ['Remove or escape the dangerous value', 'Use safe CSS syntax only']
    )
  }
  return sanitized
}

/**
 * Format CSS rule with selector and properties
 *
 * @example
 * ```typescript
 * formatRule('.p-4', { padding: '1rem' })
 * // '.p-4 { padding: 1rem; }'
 * ```
 */
export function formatRule(selector: string, properties: CSSProperties): string {
  const body = serializeProperties(properties)
  return `${selector} { ${body} }`
}

/**
 * Format CSS with proper indentation
 *
 * @example
 * ```typescript
 * formatCSS('.p-4{padding:1rem}', { indent: 2 })
 * // '.p-4 {\n  padding: 1rem;\n}'
 *
 * formatCSS('.test', { display: 'block' })
 * // '.test { display: block; }'
 * ```
 */
export function formatCSS(
  selectorOrCss: string,
  optionsOrProperties?: { indent?: number; newlines?: boolean } | CSSProperties
): string {
  // If second argument has CSS property names, treat as selector + properties
  if (optionsOrProperties && typeof optionsOrProperties === 'object') {
    const keys = Object.keys(optionsOrProperties)
    // Check if it looks like CSS properties (common property names or no indent/newlines keys)
    const isCSSProps = keys.length > 0 && !keys.includes('indent') && !keys.includes('newlines')
    if (isCSSProps) {
      return formatRule(selectorOrCss, optionsOrProperties as CSSProperties)
    }
  }

  const options = (optionsOrProperties ?? {}) as { indent?: number; newlines?: boolean }
  const { indent = 2, newlines = true } = options

  if (!newlines) {
    return selectorOrCss
  }

  const css = selectorOrCss
  const indentStr = ' '.repeat(indent)
  let result = ''
  let depth = 0
  let inValue = false
  let i = 0

  while (i < css.length) {
    const char = css[i]

    if (char === '{') {
      result += ' {\n'
      depth++
      result += indentStr.repeat(depth)
      inValue = false
    } else if (char === '}') {
      depth--
      result = result.trimEnd()
      result += '\n' + indentStr.repeat(depth) + '}\n'
      if (depth > 0) {
        result += indentStr.repeat(depth)
      }
      inValue = false
    } else if (char === ';') {
      result += ';\n'
      if (depth > 0) {
        result += indentStr.repeat(depth)
      }
      inValue = false
    } else if (char === ':' && !inValue) {
      result += ': '
      inValue = true
      // Skip any whitespace after colon
      while (i + 1 < css.length && css[i + 1] === ' ') {
        i++
      }
    } else if (char === ' ' || char === '\n' || char === '\t') {
      // Collapse whitespace
      if (result.length > 0 && !result.endsWith(' ') && !result.endsWith('\n')) {
        result += ' '
      }
    } else {
      result += char
    }

    i++
  }

  return result.trim()
}

/**
 * Minify CSS by removing unnecessary whitespace
 *
 * Uses a state machine approach instead of regex to avoid ReDoS
 * vulnerabilities from nested comment patterns (e.g. comment-within-comment
 * that causes catastrophic backtracking in regex solutions).
 *
 * @example
 * ```typescript
 * minifyCSS('.p-4 {\n  padding: 1rem;\n}')
 * // '.p-4{padding:1rem}'
 * ```
 */
export function minifyCSS(css: string): string {
  // State machine approach to avoid ReDoS vulnerability
  // Prevents catastrophic backtracking on nested comments
  // Attack vector: deeply nested comment patterns
  const result: string[] = []
  let i = 0
  const len = css.length

  while (i < len) {
    // Skip CSS comments - O(n) guaranteed, no backtracking
    if (i + 1 < len && css[i] === '/' && css[i + 1] === '*') {
      i += 2
      // Advance until we find closing */
      while (i + 1 < len) {
        if (css[i] === '*' && css[i + 1] === '/') {
          i += 2
          break
        }
        i++
      }
      continue
    }

    // Handle whitespace compression
    if (/\s/.test(css[i]!)) {
      result.push(' ')
      // Skip consecutive whitespace
      while (i < len && /\s/.test(css[i]!)) {
        i++
      }
      continue
    }

    // Copy non-whitespace, non-comment characters
    result.push(css[i]!)
    i++
  }

  let output = result.join('')

  // Clean up around special characters - these are safe patterns
  output = output
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    .replace(/;}/g, '}')
    .trim()

  return output
}

/**
 * Wrap CSS in a media query
 *
 * @example
 * ```typescript
 * wrapInMediaQuery('.p-4 { padding: 1rem; }', '(min-width: 768px)')
 * // '@media (min-width: 768px) { .p-4 { padding: 1rem; } }'
 * ```
 */
export function wrapInMediaQuery(css: string, query: string): string {
  return `@media ${query} { ${css} }`
}

/**
 * Wrap CSS in a container query
 *
 * @example
 * ```typescript
 * wrapInContainerQuery('.p-4 { padding: 1rem; }', '(min-width: 20rem)')
 * // '@container (min-width: 20rem) { .p-4 { padding: 1rem; } }'
 * ```
 */
export function wrapInContainerQuery(css: string, query: string, name?: string): string {
  const containerName = name ? `${name} ` : ''
  return `@container ${containerName}${query} { ${css} }`
}

/**
 * Wrap CSS in a layer
 *
 * @example
 * ```typescript
 * wrapInLayer('.p-4 { padding: 1rem; }', 'utilities')
 * // '@layer utilities { .p-4 { padding: 1rem; } }'
 * ```
 */
export function wrapInLayer(css: string, layer: string): string {
  return `@layer ${layer} { ${css} }`
}

/**
 * Validate a CSS custom property name
 * CSS custom properties must:
 * - Start with -- (we add this if missing)
 * - Contain only letters, digits, hyphens, and underscores after the --
 * - Not be empty after the --
 */
export function isValidCSSVarName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false
  }

  // Remove -- prefix for validation
  const cleanName = name.startsWith('--') ? name.slice(2) : name

  // Must have content after --
  if (!cleanName) {
    return false
  }

  // Max length to prevent abuse (browsers typically support very long names, but 200 is reasonable)
  if (cleanName.length > 200) {
    return false
  }

  // CSS custom property names: start with letter/underscore, then letters/digits/hyphens/underscores
  // Also allow starting with hyphen for things like --_private or ---triple
  return /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(cleanName)
}

/**
 * Sanitize a CSS custom property name
 * Returns the sanitized name or null if invalid
 */
export function sanitizeCSSVarName(name: string): string | null {
  if (!name || typeof name !== 'string') {
    return null
  }

  // Remove -- prefix
  let cleanName = name.startsWith('--') ? name.slice(2) : name

  // Must have content
  if (!cleanName) {
    return null
  }

  // Replace invalid characters with hyphens
  cleanName = cleanName.replace(/[^a-zA-Z0-9_-]/g, '-')

  // Collapse multiple hyphens
  cleanName = cleanName.replace(/-+/g, '-')

  // Remove leading/trailing hyphens (except one leading hyphen is OK)
  cleanName = cleanName.replace(/^-+/, '').replace(/-+$/, '')

  // If empty after sanitization, return null
  if (!cleanName) {
    return null
  }

  // Truncate if too long
  if (cleanName.length > 200) {
    cleanName = cleanName.slice(0, 200)
  }

  return `--${cleanName}`
}

/**
 * Create a CSS variable reference
 *
 * @example
 * ```typescript
 * cssVar('spacing-4') // 'var(--spacing-4)'
 * cssVar('spacing-4', '1rem') // 'var(--spacing-4, 1rem)'
 * cssVar('invalid name!') // 'var(--invalid-name)' (sanitized)
 * ```
 */
export function cssVar(name: string, fallback?: string): string {
  const sanitized = sanitizeCSSVarName(name)
  if (!sanitized) {
    console.warn(`CoralCSS: Invalid CSS variable name "${name}", returning empty var`)
    return 'var(--invalid)'
  }

  // Sanitize fallback value if provided
  if (fallback !== undefined) {
    const sanitizedFallback = sanitizeCSSValue(fallback)
    if (sanitizedFallback === null) {
      console.warn(`CoralCSS: Blocked potentially dangerous fallback value for CSS variable`)
      return `var(${sanitized})`
    }
    return `var(${sanitized}, ${sanitizedFallback})`
  }

  return `var(${sanitized})`
}

/**
 * Create a CSS variable declaration
 *
 * @example
 * ```typescript
 * cssVarDeclaration('spacing-4', '1rem') // '--spacing-4: 1rem'
 * cssVarDeclaration('invalid name!', '1rem') // '--invalid-name: 1rem' (sanitized)
 * ```
 */
export function cssVarDeclaration(name: string, value: string): string {
  const sanitizedName = sanitizeCSSVarName(name)
  if (!sanitizedName) {
    console.warn(`CoralCSS: Invalid CSS variable name "${name}"`)
    return ''
  }

  // Sanitize value
  const sanitizedValue = sanitizeCSSValue(value)
  if (sanitizedValue === null) {
    console.warn(`CoralCSS: Blocked potentially dangerous value for CSS variable "${name}"`)
    return ''
  }

  return `${sanitizedName}: ${sanitizedValue}`
}

/**
 * Parse a CSS value with unit
 *
 * @example
 * ```typescript
 * parseValueWithUnit('16px') // { value: 16, unit: 'px' }
 * parseValueWithUnit('1.5rem') // { value: 1.5, unit: 'rem' }
 * parseValueWithUnit('auto') // { value: 'auto', unit: null }
 * parseValueWithUnit('invalid') // { value: 'invalid', unit: null }
 * ```
 */
export function parseValueWithUnit(input: string): { value: number | string; unit: string | null } {
  // Input validation
  if (!input || typeof input !== 'string') {
    return { value: '', unit: null }
  }

  // Limit input length to prevent abuse
  if (input.length > 100) {
    return { value: input.slice(0, 100), unit: null }
  }

  const match = input.match(/^(-?[\d.]+)([a-z%]*)$/i)
  if (match) {
    const [, num, unit] = match
    const parsed = parseFloat(num!)

    // Handle NaN from parseFloat
    if (Number.isNaN(parsed)) {
      return { value: input, unit: null }
    }

    return {
      value: parsed,
      unit: unit || null,
    }
  }
  return { value: input, unit: null }
}

/**
 * Convert rem to px (assuming 16px base)
 */
export function remToPx(rem: number, base = 16): number {
  return rem * base
}

/**
 * Convert px to rem (assuming 16px base)
 */
export function pxToRem(px: number, base = 16): number {
  return px / base
}

/**
 * Check if a value is a valid CSS color
 */
export function isColor(value: string): boolean {
  // Named colors, hex, rgb, rgba, hsl, hsla, oklch, etc.
  return /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\(|color-mix\(|light-dark\(|transparent|currentColor|inherit|initial|unset|[a-z]+)$/i.test(
    value
  )
}

/**
 * Check if a value is a CSS function
 */
export function isCSSFunction(value: string): boolean {
  return /^[a-z-]+\(/.test(value)
}

/**
 * Extract CSS function name and arguments
 *
 * @example
 * ```typescript
 * parseCSSFunction('rgb(255, 0, 0)')
 * // { name: 'rgb', args: '255, 0, 0' }
 * ```
 */
export function parseCSSFunction(value: string): { name: string; args: string } | null {
  const match = value.match(/^([a-z-]+)\((.+)\)$/i)
  if (match) {
    return { name: match[1]!, args: match[2]! }
  }
  return null
}

/**
 * Combine multiple CSS rules
 */
export function combineCSS(...rules: string[]): string {
  return rules.filter(Boolean).join('\n')
}

/**
 * Create @keyframes rule
 *
 * @example
 * ```typescript
 * createKeyframes('spin', {
 *   '0%': { transform: 'rotate(0deg)' },
 *   '100%': { transform: 'rotate(360deg)' }
 * })
 * ```
 */
export function createKeyframes(
  name: string,
  frames: Record<string, CSSProperties>
): string {
  const frameRules = Object.entries(frames)
    .map(([key, props]) => `${key} { ${serializeProperties(props)} }`)
    .join(' ')
  return `@keyframes ${name} { ${frameRules} }`
}
