/**
 * Spacing Scale
 *
 * Spacing values for padding, margin, gap, etc.
 * @module theme/spacing
 */

import type { SpacingScale } from '../types'

/**
 * Default spacing scale
 *
 * Values are in rem (relative to root font size, typically 16px)
 */
export const spacing: SpacingScale = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
}

/**
 * Sizing scale (extends spacing with percentages and keywords)
 */
export const sizing = {
  ...spacing,
  'auto': 'auto',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  'full': '100%',
  'screen': '100vw',
  'svw': '100svw',
  'lvw': '100lvw',
  'dvw': '100dvw',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
}

/**
 * Height-specific sizing (uses vh instead of vw for screen)
 */
export const heightSizing = {
  ...sizing,
  'screen': '100vh',
  'svh': '100svh',
  'lvh': '100lvh',
  'dvh': '100dvh',
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
 * Get spacing value
 *
 * @example
 * ```typescript
 * getSpacing('4') // '1rem'
 * getSpacing('px') // '1px'
 * getSpacing('auto') // undefined (not in spacing scale)
 * ```
 */
export function getSpacing(key: string): string | undefined {
  if (!isValidKey(key)) {
    return undefined
  }
  return spacing[key]
}

/**
 * Get sizing value
 *
 * @example
 * ```typescript
 * getSizing('4') // '1rem'
 * getSizing('1/2') // '50%'
 * getSizing('full') // '100%'
 * ```
 */
export function getSizing(key: string): string | undefined {
  if (!isValidKey(key)) {
    return undefined
  }
  // Use optional chaining for safe property access
  return sizing[key as keyof typeof sizing]
}

/**
 * Negative spacing values
 */
export const negativeSpacing: SpacingScale = Object.fromEntries(
  Object.entries(spacing)
    .filter(([key]) => key !== '0' && key !== 'px')
    .map(([key, value]) => [`-${key}`, `-${value}`])
)

/**
 * Get negative spacing value
 */
export function getNegativeSpacing(key: string): string | undefined {
  if (!isValidKey(key)) {
    return undefined
  }
  // Remove leading minus if present
  const cleanKey = key.startsWith('-') ? key.slice(1) : key
  const value = spacing[cleanKey]
  if (value && value !== '0px') {
    return `-${value}`
  }
  return undefined
}

/**
 * Inset values (for top, right, bottom, left)
 */
export const inset = {
  ...sizing,
  // Additional fractional values for positioning
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '3/4': '75%',
  'full': '100%',
}

/**
 * Z-index scale
 */
export const zIndex = {
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
  'auto': 'auto',
}

/**
 * Max-width scale
 */
export const maxWidth = {
  '0': '0rem',
  'none': 'none',
  'xs': '20rem',
  'sm': '24rem',
  'md': '28rem',
  'lg': '32rem',
  'xl': '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  'full': '100%',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
  'prose': '65ch',
  'screen-sm': '640px',
  'screen-md': '768px',
  'screen-lg': '1024px',
  'screen-xl': '1280px',
  'screen-2xl': '1536px',
}
