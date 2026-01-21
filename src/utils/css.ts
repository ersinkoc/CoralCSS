/**
 * CSS Utilities
 *
 * Helper functions for CSS manipulation and generation.
 * @module utils/css
 */

import type { CSSProperties, CSSValue } from '../types'
import { kebabCase, sanitizeCSSValue } from './string'

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
 */
export function formatValue(value: CSSValue): string {
  if (typeof value === 'number') {
    // 0 doesn't need units, others might be unitless
    return value === 0 ? '0' : String(value)
  }
  // Sanitize string values to prevent CSS injection attacks
  const sanitized = sanitizeCSSValue(value)
  if (sanitized === null) {
    console.warn(`CoralCSS: Blocked potentially dangerous CSS value: ${value.slice(0, 50)}...`)
    return 'unset'
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
 * @example
 * ```typescript
 * minifyCSS('.p-4 {\n  padding: 1rem;\n}')
 * // '.p-4{padding:1rem}'
 * ```
 */
export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*{\s*/g, '{') // Remove space around {
    .replace(/\s*}\s*/g, '}') // Remove space around }
    .replace(/\s*;\s*/g, ';') // Remove space around ;
    .replace(/\s*:\s*/g, ':') // Remove space around :
    .replace(/\s*,\s*/g, ',') // Remove space around ,
    .replace(/;}/g, '}') // Remove trailing semicolons
    .trim()
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
 * Create a CSS variable reference
 *
 * @example
 * ```typescript
 * cssVar('spacing-4') // 'var(--spacing-4)'
 * cssVar('spacing-4', '1rem') // 'var(--spacing-4, 1rem)'
 * ```
 */
export function cssVar(name: string, fallback?: string): string {
  const varName = name.startsWith('--') ? name : `--${name}`
  return fallback !== undefined ? `var(${varName}, ${fallback})` : `var(${varName})`
}

/**
 * Create a CSS variable declaration
 *
 * @example
 * ```typescript
 * cssVarDeclaration('spacing-4', '1rem') // '--spacing-4: 1rem'
 * ```
 */
export function cssVarDeclaration(name: string, value: string): string {
  const varName = name.startsWith('--') ? name : `--${name}`
  return `${varName}: ${value}`
}

/**
 * Parse a CSS value with unit
 *
 * @example
 * ```typescript
 * parseValueWithUnit('16px') // { value: 16, unit: 'px' }
 * parseValueWithUnit('1.5rem') // { value: 1.5, unit: 'rem' }
 * parseValueWithUnit('auto') // { value: 'auto', unit: null }
 * ```
 */
export function parseValueWithUnit(input: string): { value: number | string; unit: string | null } {
  const match = input.match(/^(-?[\d.]+)([a-z%]*)$/i)
  if (match) {
    const [, num, unit] = match
    return {
      value: parseFloat(num!),
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
