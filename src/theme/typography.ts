/**
 * Typography Scale
 *
 * Font families, sizes, weights, and other typography values.
 * @module theme/typography
 */

import type {
  FontFamilies,
  FontSizeScale,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
} from '../types'

/**
 * Font families
 */
export const fonts: FontFamilies = {
  sans: [
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  serif: [
    'ui-serif',
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif',
  ],
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ],
}

/**
 * Font size scale
 *
 * Each size includes both font-size and line-height
 */
export const fontSizes: FontSizeScale = {
  'xs': { fontSize: '0.75rem', lineHeight: '1rem' },
  'sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
  'base': { fontSize: '1rem', lineHeight: '1.5rem' },
  'lg': { fontSize: '1.125rem', lineHeight: '1.75rem' },
  'xl': { fontSize: '1.25rem', lineHeight: '1.75rem' },
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
  '5xl': { fontSize: '3rem', lineHeight: '1' },
  '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  '7xl': { fontSize: '4.5rem', lineHeight: '1' },
  '8xl': { fontSize: '6rem', lineHeight: '1' },
  '9xl': { fontSize: '8rem', lineHeight: '1' },
}

/**
 * Font weights
 */
export const fontWeights: FontWeightScale = {
  'thin': '100',
  'extralight': '200',
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'extrabold': '800',
  'black': '900',
}

/**
 * Line heights
 */
export const lineHeights: LineHeightScale = {
  'none': '1',
  'tight': '1.25',
  'snug': '1.375',
  'normal': '1.5',
  'relaxed': '1.625',
  'loose': '2',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
}

/**
 * Letter spacing
 */
export const letterSpacing: LetterSpacingScale = {
  'tighter': '-0.05em',
  'tight': '-0.025em',
  'normal': '0em',
  'wide': '0.025em',
  'wider': '0.05em',
  'widest': '0.1em',
}

/**
 * Text decoration thickness
 */
export const textDecorationThickness = {
  'auto': 'auto',
  'from-font': 'from-font',
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
}

/**
 * Text underline offset
 */
export const textUnderlineOffset = {
  'auto': 'auto',
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
}

/**
 * Maximum key length to prevent abuse
 */
const MAX_KEY_LENGTH = 32

/**
 * Validate theme key input
 */
function isValidKey(key: unknown): key is string {
  return typeof key === 'string' && key.length > 0 && key.length <= MAX_KEY_LENGTH
}

/**
 * Get font family as CSS string
 *
 * @example
 * ```typescript
 * getFontFamily('sans')
 * // 'ui-sans-serif, system-ui, sans-serif, ...'
 * ```
 */
export function getFontFamily(family: keyof FontFamilies): string {
  if (!isValidKey(family)) {
    return ''
  }
  return fonts[family]?.join(', ') ?? String(family)
}

/**
 * Get font size value
 *
 * @example
 * ```typescript
 * getFontSize('lg')
 * // { fontSize: '1.125rem', lineHeight: '1.75rem' }
 * ```
 */
export function getFontSize(size: string): { fontSize: string; lineHeight: string } | undefined {
  if (!isValidKey(size)) {
    return undefined
  }
  const value = fontSizes[size]
  if (typeof value === 'string') {
    return { fontSize: value, lineHeight: '1.5' }
  }
  return value
}

/**
 * Get font weight value
 *
 * @example
 * ```typescript
 * getFontWeight('bold') // '700'
 * ```
 */
export function getFontWeight(weight: string): string | undefined {
  if (!isValidKey(weight)) {
    return undefined
  }
  const value = fontWeights[weight]
  return typeof value === 'number' ? String(value) : value
}

/**
 * Get line height value
 *
 * @example
 * ```typescript
 * getLineHeight('tight') // '1.25'
 * ```
 */
export function getLineHeight(height: string): string | undefined {
  if (!isValidKey(height)) {
    return undefined
  }
  return lineHeights[height]
}

/**
 * Get letter spacing value
 *
 * @example
 * ```typescript
 * getLetterSpacing('wide') // '0.025em'
 * ```
 */
export function getLetterSpacing(spacing: string): string | undefined {
  if (!isValidKey(spacing)) {
    return undefined
  }
  return letterSpacing[spacing]
}
