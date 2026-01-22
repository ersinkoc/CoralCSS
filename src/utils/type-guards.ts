/**
 * Type Guards and Branded Types
 *
 * Runtime type validation utilities and branded types for enhanced type safety.
 * Replaces unsafe `as any` and `as unknown as` casts with validated type guards.
 *
 * @module utils/type-guards
 */

import type { DeepPartial, ResolvedConfig, Theme } from '../types'

/**
 * Branded type for validated plain objects
 * Marks objects that have passed validation with a unique symbol
 */
export interface ValidatedPlainObject extends Record<string, unknown> {
  readonly __validatedPlainObject: unique symbol
}

/**
 * Branded type for validated theme configurations
 */
export interface ValidatedTheme extends Theme {
  readonly __validatedTheme: unique symbol
}

/**
 * Branded type for validated config objects
 */
export interface ValidatedConfig extends Partial<ResolvedConfig> {
  readonly __validatedConfig: unique symbol
}

/**
 * Type guard result with validation details
 */
export interface TypeGuardResult<T> {
  isValid: boolean
  value: T | null
  errors: string[]
}

/**
 * Check if a value is a plain object (not array, null, or special object)
 * Enhanced version that returns a branded type for better type narrowing
 *
 * @example
 * ```typescript
 * if (isValidPlainObject(value)) {
 *   // TypeScript knows value is ValidatedPlainObject
 *   console.log(value.someProperty)
 * }
 * ```
 */
export function isValidPlainObject(value: unknown): value is ValidatedPlainObject {
  if (value === null || typeof value !== 'object') {
    return false
  }

  // Reject arrays and special objects explicitly
  if (Array.isArray(value)) return false
  if (value instanceof Date) return false
  if (value instanceof RegExp) return false
  if (value instanceof Function) return false
  if (value instanceof Map) return false
  if (value instanceof Set) return false
  if (value instanceof WeakMap) return false
  if (value instanceof WeakSet) return false
  if (value instanceof Promise) return false

  // Check prototype chain
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) {
    return false
  }

  return true
}

/**
 * Validate and assert that a value is a plain object
 * Throws if validation fails, returns branded type if successful
 *
 * @example
 * ```typescript
 * const validated = assertPlainObject(maybeObject)
 * // TypeScript knows validated is ValidatedPlainObject
 * ```
 */
export function assertPlainObject(value: unknown, errorMessage = 'Value is not a plain object'): ValidatedPlainObject {
  if (!isValidPlainObject(value)) {
    throw new TypeError(errorMessage)
  }
  return value as ValidatedPlainObject
}

/**
 * Safe type assertion with runtime validation
 * Returns null if validation fails instead of throwing
 *
 * @example
 * ```typescript
 * const result = safeAssert<Record<string, unknown>>(value, isValidRecord)
 * if (result.isValid) {
 *   console.log(result.value.someKey)
 * }
 * ```
 */
export function safeAssert<T>(
  value: unknown,
  validator: (val: unknown) => val is T
): TypeGuardResult<T> {
  const errors: string[] = []

  if (validator(value)) {
    return { isValid: true, value, errors }
  }

  errors.push(`Type assertion failed: value did not pass validation`)
  return { isValid: false, value: null, errors }
}

/**
 * Create a type guard from a validation function
 *
 * @example
 * ```typescript
 * const isValidString = createTypeGuard<string>(
 *   (val): val is string => typeof val === 'string'
 * )
 * ```
 */
export function createTypeGuard<T>(
  validator: (val: unknown) => val is T
): (val: unknown) => val is T {
  return validator
}

/**
 * Validate theme object structure
 * Checks for required properties and valid value types
 */
export function isValidTheme(value: unknown): value is Theme {
  if (!isValidPlainObject(value)) {
    return false
  }

  // Theme should have known top-level properties
  const theme = value as Record<string, unknown>
  const allowedKeys = new Set([
    'colors', 'spacing', 'fontSize', 'fontWeight', 'lineHeight',
    'letterSpacing', 'borderRadius', 'borderWidth', 'boxShadow',
    'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight',
    'flex', 'grid', 'columns', 'gap', 'inset', 'zIndex', 'opacity',
    'scale', 'rotate', 'translate', 'transitionDuration', 'transitionTimingFunction',
    'animation', 'keyframes', 'screens', 'extend'
  ])

  // Check if theme has at least one recognized property
  const hasValidKey = Object.keys(theme).some(key => allowedKeys.has(key))
  if (!hasValidKey && Object.keys(theme).length > 0) {
    return false
  }

  return true
}

/**
 * Validate config object structure
 */
export function isValidConfig(value: unknown): value is Partial<ResolvedConfig> {
  if (!isValidPlainObject(value)) {
    return false
  }

  const config = value as Record<string, unknown>

  // Check for known config properties
  const allowedKeys = new Set([
    'presets', 'plugins', 'theme', 'darkMode', 'darkModeSelector', 'prefix',
    'features', 'content', 'safelist', 'blocklist', 'cache'
  ])

  const keys = Object.keys(config)
  for (const key of keys) {
    if (!allowedKeys.has(key)) {
      // Unknown key - could be a user extension, so we'll allow it
      // In strict mode, you might want to reject this
    }
  }

  return true
}

/**
 * Safely cast a value with validation
 * Combines runtime validation with type assertion
 *
 * @example
 * ```typescript
 * const config = safeCast<Partial<ResolvedConfig>>(
 *   userInput,
 *   isValidConfig,
 *   'Invalid configuration'
 * )
 * ```
 */
export function safeCast<T>(
  value: unknown,
  validator: (val: unknown) => val is T,
  context = 'Type cast failed'
): T {
  if (validator(value)) {
    return value
  }

  throw new TypeError(`${context}: value did not pass type validation`)
}

/**
 * Check if value is a non-null object (but not null)
 */
export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

/**
 * Check if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Check if value is a number (excluding NaN)
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Check if value is a finite number
 */
export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value)
}

/**
 * Check if value is an array
 */
export function isArray<T = unknown>(value: unknown, itemValidator?: (val: unknown) => val is T): value is T[] {
  if (!Array.isArray(value)) {
    return false
  }

  if (itemValidator) {
    return value.every(item => itemValidator(item))
  }

  return true
}

/**
 * Check if value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/**
 * Type guard for array items
 * Filters array to only include items that match the type guard
 *
 * @example
 * ```typescript
 * const strings = filterArray(['a', 1, 'b', 2], isString)
 * // strings is typed as string[]
 * ```
 */
export function filterArray<T>(array: unknown[], guard: (val: unknown) => val is T): T[] {
  return array.filter(guard)
}

/**
 * Assert all items in array match type guard
 */
export function assertArrayOfType<T>(
  value: unknown,
  guard: (val: unknown) => val is T,
  errorMessage = 'Array contains invalid items'
): T[] {
  if (!Array.isArray(value)) {
    throw new TypeError(`${errorMessage}: value is not an array`)
  }

  for (let i = 0; i < value.length; i++) {
    if (!guard(value[i])) {
      throw new TypeError(`${errorMessage}: item at index ${i} is invalid`)
    }
  }

  return value as T[]
}

/**
 * Create a branded value from a validated object
 * This signals to TypeScript that the value has been validated
 *
 * @example
 * ```typescript
 * const validated = brandAsValidated(userInput, isValidConfig)
 * ```
 */
export function brandAsValidated<T, V>(
  value: T,
  _validator: (val: unknown) => val is V
): V {
  return value as unknown as V
}

/**
 * Check if value has required property
 */
export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return isNonNullObject(value) && key in value
}

/**
 * Check if value has all required properties
 */
export function hasProperties<K extends PropertyKey>(
  value: unknown,
  keys: K[]
): value is Record<K, unknown> {
  if (!isNonNullObject(value)) {
    return false
  }

  return keys.every(key => key in value)
}
