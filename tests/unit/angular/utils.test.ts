import { describe, it, expect } from 'vitest'
import { cn, cx, merge, cva } from '../../../src/angular/utils'

describe('Angular Utils', () => {
  describe('cn', () => {
    it('should combine strings', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle falsy values', () => {
      expect(cn('foo', null, 'bar', undefined, false, '')).toBe('foo bar')
    })

    it('should handle numbers', () => {
      expect(cn('foo', 123)).toBe('foo 123')
    })

    it('should handle arrays', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle nested arrays', () => {
      expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    })

    it('should handle object syntax', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should handle mixed inputs', () => {
      expect(cn('foo', { bar: true }, ['baz'])).toBe('foo bar baz')
    })

    it('should return empty string for no inputs', () => {
      expect(cn()).toBe('')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const isDisabled = false
      expect(cn('btn', isActive && 'active', isDisabled && 'disabled')).toBe('btn active')
    })
  })

  describe('cx', () => {
    it('should be an alias for cn', () => {
      expect(cx).toBe(cn)
    })
  })

  describe('merge', () => {
    it('should merge class names with conflict resolution', () => {
      const result = merge('p-2', 'p-4')
      expect(result).toContain('p-4')
      expect(result).not.toContain('p-2')
    })

    it('should handle same color conflicts', () => {
      const result = merge('bg-red-500', 'bg-red-600')
      expect(result).toBe('bg-red-600')
    })

    it('should keep different color utilities', () => {
      const result = merge('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('bg-blue-500')
    })

    it('should handle empty inputs', () => {
      expect(merge()).toBe('')
    })

    it('should handle same color variant conflicts', () => {
      const result = merge('hover:bg-red-500', 'hover:bg-red-600')
      expect(result).toBe('hover:bg-red-600')
    })

    it('should keep different color variants', () => {
      const result = merge('hover:bg-red-500', 'hover:bg-blue-500')
      expect(result).toContain('hover:bg-red-500')
      expect(result).toContain('hover:bg-blue-500')
    })

    it('should handle text color utilities', () => {
      const result = merge('text-red-500', 'text-blue-600')
      // Different colors are kept, only same color conflicts are resolved
      expect(result).toContain('text-blue-600')
      expect(result).toContain('text-red-500')
    })

    it('should handle border color utilities', () => {
      const result = merge('border-red-500', 'border-blue-600')
      expect(result).toContain('border-blue-600')
      expect(result).toContain('border-red-500')
    })

    it('should handle ring color utilities', () => {
      const result = merge('ring-red-500', 'ring-blue-600')
      expect(result).toContain('ring-blue-600')
      expect(result).toContain('ring-red-500')
    })

    it('should handle fill color utilities', () => {
      const result = merge('fill-red-500', 'fill-blue-600')
      expect(result).toContain('fill-blue-600')
      expect(result).toContain('fill-red-500')
    })

    it('should handle stroke color utilities', () => {
      const result = merge('stroke-red-500', 'stroke-blue-600')
      expect(result).toContain('stroke-blue-600')
      expect(result).toContain('stroke-red-500')
    })

    it('should handle multiple variant prefixes', () => {
      const result = merge('hover:focus:bg-red-500', 'hover:focus:bg-red-600')
      expect(result).toBe('hover:focus:bg-red-600')
    })

    it('should handle utilities without dash prefix', () => {
      const result = merge('flex', 'block')
      expect(result).toContain('flex')
      expect(result).toContain('block')
    })

    it('should handle negative utilities', () => {
      const result = merge('-mt-2', '-mt-4')
      expect(result).toBe('-mt-4')
    })

    it('should keep non-conflicting classes', () => {
      const result = merge('bg-red-500 p-2', 'text-white')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
    })
  })

  describe('cva', () => {
    it('should return base classes', () => {
      const button = cva('px-4 py-2')
      expect(button()).toBe('px-4 py-2')
    })

    it('should apply variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      })

      expect(button({ intent: 'primary' })).toBe('px-4 py-2 bg-blue-500')
    })

    it('should apply default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
      })

      expect(button()).toBe('px-4 py-2 bg-blue-500')
    })

    it('should apply compound variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
          size: {
            lg: 'text-lg',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'font-bold',
          },
        ],
      })

      expect(button({ intent: 'primary', size: 'lg' })).toBe('px-4 py-2 bg-blue-500 text-lg font-bold')
    })

    it('should accept class prop (Angular style)', () => {
      const button = cva('px-4 py-2')
      expect(button({ class: 'custom-class' })).toBe('px-4 py-2 custom-class')
    })

    it('should handle multiple variants', () => {
      const button = cva('btn', {
        variants: {
          color: {
            red: 'bg-red-500',
            blue: 'bg-blue-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      })

      expect(button({ color: 'red', size: 'lg' })).toBe('btn bg-red-500 text-lg')
    })

    it('should override default variants', () => {
      const button = cva('btn', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
      })

      expect(button({ intent: 'secondary' })).toBe('btn bg-gray-500')
    })

    it('should handle empty config', () => {
      const button = cva('px-4 py-2')
      expect(button()).toBe('px-4 py-2')
    })

    it('should handle compound variants with default variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
          size: {
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          intent: 'primary',
          size: 'lg',
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'shadow-lg',
          },
        ],
      })

      expect(button()).toBe('px-4 py-2 bg-blue-500 text-lg shadow-lg')
    })

    it('should not apply compound variants when conditions do not match', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'shadow-lg',
          },
        ],
      })

      // size is 'sm', not 'lg', so shadow-lg should not apply
      expect(button({ size: 'sm' })).toBe('px-4 py-2 bg-blue-500 text-sm')
    })

    it('should apply multiple compound variants', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            danger: 'bg-red-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'shadow-lg',
          },
          {
            intent: 'danger',
            size: 'sm',
            class: 'uppercase',
          },
        ],
      })

      expect(button({ intent: 'primary', size: 'lg' })).toBe('px-4 py-2 bg-blue-500 text-lg shadow-lg')
      expect(button({ intent: 'danger', size: 'sm' })).toBe('px-4 py-2 bg-red-500 text-sm uppercase')
    })

    it('should handle compound variants with partial matches', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
          rounded: {
            true: 'rounded',
            false: 'rounded-none',
          },
        },
        compoundVariants: [
          {
            intent: 'primary',
            size: 'lg',
            class: 'shadow-lg',
          },
        ],
      })

      // Only intent matches, size doesn't, so shadow-lg should not apply
      expect(button({ intent: 'primary', size: 'sm', rounded: true })).toBe('px-4 py-2 bg-blue-500 text-sm rounded')
    })

    it('should handle undefined variant values', () => {
      const button = cva('px-4 py-2', {
        variants: {
          intent: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          intent: 'primary',
        },
        compoundVariants: [
          {
            size: 'lg',
            class: 'text-bold',
          },
        ],
      })

      // intent is default (primary), size is not set (undefined)
      const result = button()
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })
  })
})
