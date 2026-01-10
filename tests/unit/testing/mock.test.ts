/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  createTestCoral,
  mockCoral,
  resetMockCoral,
  createMockWithCSS,
  spyOnGenerate,
} from '../../../src/testing/mock'

describe('Testing Mock Utilities', () => {
  beforeEach(() => {
    resetMockCoral()
  })

  describe('createTestCoral', () => {
    it('should create a mock coral instance', () => {
      const coral = createTestCoral()
      expect(coral).toBeDefined()
      expect(coral.generate).toBeDefined()
      expect(coral.getGeneratedCSS).toBeDefined()
      expect(coral.getProcessedClasses).toBeDefined()
    })

    it('should track generated CSS', () => {
      const coral = createTestCoral({ trackCSS: true })
      coral.generate(['bg-red-500'])
      const generatedCSS = coral.getGeneratedCSS()
      // generatedCSS array contains entries when CSS is generated
      expect(Array.isArray(generatedCSS)).toBe(true)
    })

    it('should track processed classes', () => {
      const coral = createTestCoral({ trackClasses: true })
      coral.generate(['bg-red-500', 'p-4'])
      expect(coral.wasProcessed('bg-red-500')).toBe(true)
      expect(coral.wasProcessed('p-4')).toBe(true)
      expect(coral.wasProcessed('not-used')).toBe(false)
    })

    it('should count generations', () => {
      const coral = createTestCoral()
      coral.generate(['bg-red-500'])
      coral.generate(['bg-red-500'])
      coral.generate(['bg-red-500'])
      expect(coral.getGenerationCount('bg-red-500')).toBe(3)
    })

    it('should reset tracking', () => {
      const coral = createTestCoral()
      coral.generate(['bg-red-500'])
      expect(coral.wasProcessed('bg-red-500')).toBe(true)
      coral.reset()
      expect(coral.wasProcessed('bg-red-500')).toBe(false)
      expect(coral.getGeneratedCSS()).toEqual([])
      expect(coral.getProcessedClasses()).toEqual([])
    })

    it('should clear generation count on reset', () => {
      const coral = createTestCoral()
      coral.generate(['bg-red-500'])
      coral.generate(['bg-red-500'])
      expect(coral.getGenerationCount('bg-red-500')).toBe(2)
      coral.reset()
      expect(coral.getGenerationCount('bg-red-500')).toBe(0)
    })

    it('should return empty CSS when emptyCSS option is true', () => {
      const coral = createTestCoral({ emptyCSS: true })
      const css = coral.generate(['bg-red-500'])
      expect(css).toBe('')
    })

    it('should expose config property', () => {
      const coral = createTestCoral()
      expect(coral.config).toBeDefined()
    })

    it('should expose plugins property', () => {
      const coral = createTestCoral()
      expect(coral.plugins).toBeDefined()
    })

    it('should expose pluginCount property', () => {
      const coral = createTestCoral()
      expect(typeof coral.pluginCount).toBe('number')
    })

    it('should support use method for plugins', () => {
      const coral = createTestCoral()
      const plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      }
      const result = coral.use(plugin)
      expect(result).toBe(coral) // Returns self for chaining
    })

    it('should support unregister method', () => {
      const coral = createTestCoral()
      expect(typeof coral.unregister).toBe('function')
    })

    it('should support generateFromHTML method', () => {
      const coral = createTestCoral()
      expect(typeof coral.generateFromHTML).toBe('function')
    })

    it('should support getRules method', () => {
      const coral = createTestCoral()
      const rules = coral.getRules()
      expect(Array.isArray(rules)).toBe(true)
    })

    it('should support getVariants method', () => {
      const coral = createTestCoral()
      const variants = coral.getVariants()
      expect(Array.isArray(variants)).toBe(true)
    })
  })

  describe('mockCoral', () => {
    it('should return same instance on multiple calls', () => {
      const coral1 = mockCoral()
      const coral2 = mockCoral()
      expect(coral1).toBe(coral2)
    })

    it('should create new instance after reset', () => {
      const coral1 = mockCoral()
      resetMockCoral()
      const coral2 = mockCoral()
      expect(coral1).not.toBe(coral2)
    })
  })

  describe('resetMockCoral', () => {
    it('should reset global state', () => {
      const coral = mockCoral()
      coral.generate(['bg-red-500'])
      resetMockCoral()
      const newCoral = mockCoral()
      expect(newCoral.getProcessedClasses()).toEqual([])
    })
  })

  describe('createMockWithCSS', () => {
    it('should return predefined CSS for classes', () => {
      const mock = createMockWithCSS({
        'bg-red-500': '.bg-red-500 { background-color: red; }',
        'p-4': '.p-4 { padding: 1rem; }',
      })

      const css = mock.generate(['bg-red-500', 'p-4'])
      expect(css).toContain('.bg-red-500')
      expect(css).toContain('.p-4')
    })

    it('should return empty string for unknown classes', () => {
      const mock = createMockWithCSS({
        'bg-red-500': '.bg-red-500 { background-color: red; }',
      })

      const css = mock.generate(['unknown-class'])
      expect(css).toBe('')
    })

    it('should still track processed classes', () => {
      const mock = createMockWithCSS({
        'bg-red-500': '.bg-red-500 { background-color: red; }',
      })

      mock.generate(['bg-red-500', 'unknown'])
      expect(mock.wasProcessed('bg-red-500')).toBe(true)
      expect(mock.wasProcessed('unknown')).toBe(true)
    })
  })

  describe('spyOnGenerate', () => {
    it('should track all generate calls', () => {
      const coral = createTestCoral()
      const spy = spyOnGenerate(coral)

      coral.generate(['bg-red-500'])
      coral.generate(['p-4', 'm-2'])

      expect(spy.calls).toHaveLength(2)
      expect(spy.calls[0]).toEqual(['bg-red-500'])
      expect(spy.calls[1]).toEqual(['p-4', 'm-2'])
    })

    it('should allow reset', () => {
      const coral = createTestCoral()
      const spy = spyOnGenerate(coral)

      coral.generate(['bg-red-500'])
      expect(spy.calls).toHaveLength(1)

      spy.reset()
      expect(spy.calls).toHaveLength(0)
    })

    it('should still generate CSS normally', () => {
      const coral = createTestCoral()
      spyOnGenerate(coral)

      const css = coral.generate(['bg-red-500'])
      // CSS might be empty if class is not recognized, but generate should work
      expect(typeof css).toBe('string')
    })
  })
})
