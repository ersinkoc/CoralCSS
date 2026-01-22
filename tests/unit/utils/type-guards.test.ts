/**
 * Type Guards and Branded Types Tests
 *
 * Tests for type guard functions and branded types.
 */

import { describe, it, expect } from 'vitest'
import {
  isValidPlainObject,
  assertPlainObject,
  safeAssert,
  createTypeGuard,
  isValidTheme,
  isValidConfig,
  safeCast,
  isNonNullObject,
  isString,
  isNumber,
  isFiniteNumber,
  isArray,
  isFunction,
  filterArray,
  assertArrayOfType,
  brandAsValidated,
  hasProperty,
  hasProperties,
  type ValidatedPlainObject,
  type ValidatedConfig,
} from '../../../src/utils/type-guards'

describe('Type Guards - Plain Objects', () => {
  describe('isValidPlainObject', () => {
    it('should accept plain objects', () => {
      expect(isValidPlainObject({})).toBe(true)
      expect(isValidPlainObject({ a: 1, b: 2 })).toBe(true)
      expect(isValidPlainObject(Object.create(null))).toBe(true)
    })

    it('should reject arrays', () => {
      expect(isValidPlainObject([])).toBe(false)
      expect(isValidPlainObject([1, 2, 3])).toBe(false)
    })

    it('should reject null', () => {
      expect(isValidPlainObject(null)).toBe(false)
    })

    it('should reject primitives', () => {
      expect(isValidPlainObject(undefined)).toBe(false)
      expect(isValidPlainObject('string')).toBe(false)
      expect(isValidPlainObject(123)).toBe(false)
      expect(isValidPlainObject(true)).toBe(false)
    })

    it('should reject special objects', () => {
      expect(isValidPlainObject(new Date())).toBe(false)
      expect(isValidPlainObject(/regex/)).toBe(false)
      expect(isValidPlainObject(() => {})).toBe(false)
      expect(isValidPlainObject(new Map())).toBe(false)
      expect(isValidPlainObject(new Set())).toBe(false)
    })

    it('should reject objects with custom prototypes', () => {
      class CustomClass {}
      expect(isValidPlainObject(new CustomClass())).toBe(false)
    })
  })

  describe('assertPlainObject', () => {
    it('should return value when valid', () => {
      const obj = { a: 1 }
      const result = assertPlainObject(obj)
      expect(result).toBe(obj)
    })

    it('should throw when invalid', () => {
      expect(() => assertPlainObject(null)).toThrow('Value is not a plain object')
      expect(() => assertPlainObject([])).toThrow('Value is not a plain object')
      expect(() => assertPlainObject('string')).toThrow('Value is not a plain object')
    })

    it('should use custom error message', () => {
      expect(() => assertPlainObject(null, 'Custom error'))
        .toThrow('Custom error')
    })
  })
})

describe('Type Guards - Theme and Config', () => {
  describe('isValidTheme', () => {
    it('should accept valid theme objects', () => {
      expect(isValidTheme({ colors: { primary: 'red' } })).toBe(true)
      expect(isValidTheme({ spacing: { sm: '4px' } })).toBe(true)
      expect(isValidTheme({})).toBe(true) // Empty theme is valid
    })

    it('should accept theme with multiple properties', () => {
      const theme = {
        colors: { primary: 'red' },
        spacing: { sm: '4px' },
        fontSize: { xs: '12px' },
      }
      expect(isValidTheme(theme)).toBe(true)
    })

    it('should reject non-objects', () => {
      expect(isValidTheme(null)).toBe(false)
      expect(isValidTheme('string')).toBe(false)
      expect(isValidTheme(123)).toBe(false)
      expect(isValidTheme([])).toBe(false)
    })
  })

  describe('isValidConfig', () => {
    it('should accept valid config objects', () => {
      expect(isValidConfig({ theme: {} })).toBe(true)
      expect(isValidConfig({ prefix: 'coral-' })).toBe(true)
      expect(isValidConfig({ darkMode: 'class' })).toBe(true)
    })

    it('should accept empty config', () => {
      expect(isValidConfig({})).toBe(true)
    })

    it('should reject non-objects', () => {
      expect(isValidConfig(null)).toBe(false)
      expect(isValidConfig('string')).toBe(false)
      expect(isValidConfig(123)).toBe(false)
      expect(isValidConfig([])).toBe(false)
    })
  })
})

describe('Type Guards - Primitives', () => {
  describe('isNonNullObject', () => {
    it('should accept non-null objects', () => {
      expect(isNonNullObject({})).toBe(true)
      expect(isNonNullObject([])).toBe(true)
      expect(isNonNullObject(new Date())).toBe(true)
    })

    it('should reject null and primitives', () => {
      expect(isNonNullObject(null)).toBe(false)
      expect(isNonNullObject(undefined)).toBe(false)
      expect(isNonNullObject('string')).toBe(false)
      expect(isNonNullObject(123)).toBe(false)
      expect(isNonNullObject(true)).toBe(false)
    })
  })

  describe('isString', () => {
    it('should accept strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString('123')).toBe(true)
    })

    it('should reject non-strings', () => {
      expect(isString(123)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString({})).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('should accept numbers (excluding NaN)', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123)).toBe(true)
      expect(isNumber(-456)).toBe(true)
      expect(isNumber(1.5)).toBe(true)
      expect(isNumber(Infinity)).toBe(true)
      expect(isNumber(-Infinity)).toBe(true)
    })

    it('should reject NaN and non-numbers', () => {
      expect(isNumber(NaN)).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })
  })

  describe('isFiniteNumber', () => {
    it('should accept finite numbers', () => {
      expect(isFiniteNumber(0)).toBe(true)
      expect(isFiniteNumber(123)).toBe(true)
      expect(isFiniteNumber(-456)).toBe(true)
      expect(isFiniteNumber(1.5)).toBe(true)
    })

    it('should reject Infinity, NaN, and non-numbers', () => {
      expect(isFiniteNumber(Infinity)).toBe(false)
      expect(isFiniteNumber(-Infinity)).toBe(false)
      expect(isFiniteNumber(NaN)).toBe(false)
      expect(isFiniteNumber('123')).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('should accept functions', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(function() {})).toBe(true)
      expect(isFunction(async () => {})).toBe(true)
      expect(isFunction(function* () {})).toBe(true)
    })

    it('should reject non-functions', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction('string')).toBe(false)
    })
  })
})

describe('Type Guards - Arrays', () => {
  describe('isArray', () => {
    it('should accept arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(['a', 'b', 'c'])).toBe(true)
    })

    it('should validate array items when validator provided', () => {
      expect(isArray([1, 2, 3], isNumber)).toBe(true)
      expect(isArray([1, 'a', 3], isNumber)).toBe(false)
      expect(isArray(['a', 'b'], isString)).toBe(true)
    })

    it('should reject non-arrays', () => {
      expect(isArray({})).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray('string')).toBe(false)
    })
  })

  describe('filterArray', () => {
    it('should filter array by type guard', () => {
      const mixed = [1, 'a', 2, 'b', 3, 'c'] as unknown[]
      const numbers = filterArray(mixed, isNumber)
      expect(numbers).toEqual([1, 2, 3])

      const strings = filterArray(mixed, isString)
      expect(strings).toEqual(['a', 'b', 'c'])
    })

    it('should return empty array when no matches', () => {
      const result = filterArray([1, 2, 3], isString)
      expect(result).toEqual([])
    })
  })

  describe('assertArrayOfType', () => {
    it('should return array when all items valid', () => {
      const arr = [1, 2, 3]
      const result = assertArrayOfType(arr, isNumber)
      expect(result).toEqual(arr)
    })

    it('should throw when not an array', () => {
      expect(() => assertArrayOfType(null, isNumber))
        .toThrow('Array contains invalid items: value is not an array')
    })

    it('should throw when item invalid', () => {
      expect(() => assertArrayOfType([1, 'a', 3], isNumber))
        .toThrow('Array contains invalid items: item at index 1 is invalid')
    })
  })
})

describe('Type Guards - Safe Assertions', () => {
  describe('safeAssert', () => {
    it('should return success when valid', () => {
      const result = safeAssert({ a: 1 }, isValidPlainObject)
      expect(result.isValid).toBe(true)
      expect(result.value).toEqual({ a: 1 })
      expect(result.errors).toEqual([])
    })

    it('should return failure when invalid', () => {
      const result = safeAssert(null, isValidPlainObject)
      expect(result.isValid).toBe(false)
      expect(result.value).toBeNull()
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('safeCast', () => {
    it('should return value when valid', () => {
      const obj = { a: 1 }
      const result = safeCast(obj, isValidPlainObject)
      expect(result).toBe(obj)
    })

    it('should throw when invalid', () => {
      expect(() => safeCast(null, isValidPlainObject))
        .toThrow('Type cast failed: value did not pass type validation')
    })

    it('should use custom error context', () => {
      expect(() => safeCast(null, isValidPlainObject, 'Custom error'))
        .toThrow('Custom error: value did not pass type validation')
    })
  })

  describe('createTypeGuard', () => {
    it('should create type guard from validator', () => {
      const isEven = createTypeGuard((val: unknown): val is number =>
        typeof val === 'number' && val % 2 === 0
      )

      expect(isEven(2)).toBe(true)
      expect(isEven(3)).toBe(false)
      expect(isEven('a')).toBe(false)
    })
  })

  describe('brandAsValidated', () => {
    it('should brand value as validated', () => {
      const value = { a: 1 }
      const branded = brandAsValidated(value, isValidPlainObject)
      // At runtime, branding doesn't change the value
      expect(branded).toEqual(value)
    })
  })
})

describe('Type Guards - Property Checks', () => {
  describe('hasProperty', () => {
    it('should return true when property exists', () => {
      expect(hasProperty({ a: 1 }, 'a')).toBe(true)
      expect(hasProperty({ a: 1 }, 'toString')).toBe(true)
    })

    it('should return false when property missing', () => {
      expect(hasProperty({ a: 1 }, 'b')).toBe(false)
      expect(hasProperty({}, 'a')).toBe(false)
    })

    it('should reject non-objects', () => {
      expect(hasProperty(null, 'a')).toBe(false)
      expect(hasProperty(123, 'a')).toBe(false)
    })
  })

  describe('hasProperties', () => {
    it('should return true when all properties exist', () => {
      expect(hasProperties({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toBe(true)
      expect(hasProperties({ a: 1 }, ['a'])).toBe(true)
    })

    it('should return false when any property missing', () => {
      expect(hasProperties({ a: 1, b: 2 }, ['a', 'c'])).toBe(false)
      expect(hasProperties({ a: 1 }, ['a', 'b'])).toBe(false)
    })

    it('should reject non-objects', () => {
      expect(hasProperties(null, ['a'])).toBe(false)
      expect(hasProperties(123, ['a'])).toBe(false)
    })
  })
})

describe('Type Guards - Type Narrowing', () => {
  it('should narrow type with isValidPlainObject', () => {
    const value: unknown = { a: 1 }

    if (isValidPlainObject(value)) {
      // TypeScript knows value is ValidatedPlainObject here
      expect(value.a).toBe(1)
    } else {
      expect.fail('Should have been a valid plain object')
    }
  })

  it('should narrow type with isString', () => {
    const value: unknown = 'hello'

    if (isString(value)) {
      // TypeScript knows value is string here
      expect(value.toUpperCase()).toBe('HELLO')
    }
  })

  it('should narrow type with isNumber', () => {
    const value: unknown = 42

    if (isNumber(value)) {
      // TypeScript knows value is number here
      expect(value.toFixed(2)).toBe('42.00')
    }
  })

  it('should narrow type with hasProperty', () => {
    const value: unknown = { name: 'test', value: 123 }

    if (hasProperty(value, 'name')) {
      // TypeScript knows value has 'name' property
      expect(value.name).toBe('test')
    }
  })
})
