/**
 * Prototype Pollution Tests
 *
 * Security tests to ensure deepMerge and other functions
 * are protected against prototype pollution attacks.
 */

import { describe, it, expect } from 'vitest'
import { Kernel } from '../../src/kernel'
import { CoralError } from '../../src/errors'

describe('Prototype Pollution Protection', () => {
  // Test via Kernel since deepMerge is internal
  describe('via theme extend', () => {
    it('should block __proto__ pollution via theme', () => {
      const kernel = new Kernel()

      // Attempt to pollute via theme extension
      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            // Try to pollute via theme
            api.extendTheme({
              __proto__: { polluted: true }
            } as any)
          }
        })
      }).not.toThrow()

      // Verify pollution didn't happen
      expect(({} as any).polluted).toBeUndefined()
    })

    it('should block constructor pollution via theme', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({
              toString: {
                constructor: {
                  prototype: { polluted: true }
                }
              }
            } as any)
          }
        })
      }).not.toThrow()

      expect(({} as any).polluted).toBeUndefined()
    })

    it('should allow safe theme extensions', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({
              colors: {
                primary: 'blue',
                secondary: 'green'
              }
            })
          }
        })
      }).not.toThrow()

      const colors = kernel.config.theme.colors as any
      expect(colors.primary).toBe('blue')
    })
  })

  describe('Object.create(null) protection', () => {
    it('should handle null prototype objects safely', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            const nullProtoObj = Object.create(null)
            nullProtoObj.safe = 'value'

            api.extendTheme({
              custom: nullProtoObj
            } as any)
          }
        })
      }).not.toThrow()
    })
  })

  describe('circular reference handling', () => {
    it('should handle circular references without infinite loop', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            const circular: any = { value: 1 }
            circular.self = circular

            api.extendTheme({
              nested: circular
            })
          }
        })
      }).not.toThrow()
    })
  })

  describe('max depth protection', () => {
    it('should stop merging at max depth', () => {
      const kernel = new Kernel()
      const consoleWarn = vi.spyOn(console, 'warn')

      let deep: any = { value: 'deep' }
      for (let i = 0; i < 30; i++) {
        deep = { nested: deep }
      }

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({ veryDeep: deep })
          }
        })
      }).not.toThrow()

      // Should have warned about max depth
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('exceeded maximum depth')
      )
    })
  })

  describe('type validation', () => {
    it('should handle Date objects correctly', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({
              createdAt: new Date('2024-01-01')
            })
          }
        })
      }).not.toThrow()
    })

    it('should handle RegExp objects correctly', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({
              pattern: /test/g
            })
          }
        })
      }).not.toThrow()
    })

    it('should preserve arrays as arrays', () => {
      const kernel = new Kernel()

      expect(() => {
        kernel.use({
          name: 'test-plugin',
          install(api) {
            api.extendTheme({
              colors: ['red', 'green', 'blue']
            })
          }
        })
      }).not.toThrow()

      const theme = kernel.config.theme as any
      expect(Array.isArray(theme.colors)).toBe(true)
    })
  })
})
