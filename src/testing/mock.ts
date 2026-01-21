/**
 * CoralCSS Mock Utilities
 *
 * Mock implementations for testing.
 * @module testing/mock
 */

import { Coral, createCoral } from '../index'
import type { CoralOptions } from '../types'

/**
 * Mock Coral options
 */
export interface MockCoralOptions extends CoralOptions {
  /** Track generated CSS */
  trackCSS?: boolean
  /** Track processed classes */
  trackClasses?: boolean
  /** Return empty CSS (for snapshot isolation) */
  emptyCSS?: boolean
}

/**
 * Mock Coral instance with additional testing methods
 */
export interface MockCoral extends Coral {
  /** Get all generated CSS */
  getGeneratedCSS: () => string[]
  /** Get all processed classes */
  getProcessedClasses: () => string[]
  /** Reset tracking */
  reset: () => void
  /** Check if a class was processed */
  wasProcessed: (className: string) => boolean
  /** Get generation count for a class */
  getGenerationCount: (className: string) => number
}

// Global mock state
let mockInstance: MockCoral | null = null
const generatedCSS: string[] = []
const processedClasses: string[] = []
const classGenerationCount = new Map<string, number>()

/**
 * Create a test Coral instance
 *
 * @example
 * ```typescript
 * import { createTestCoral } from '@coral-css/core/testing'
 *
 * describe('MyComponent', () => {
 *   let coral: MockCoral
 *
 *   beforeEach(() => {
 *     coral = createTestCoral({ trackCSS: true })
 *   })
 *
 *   it('should generate CSS for classes', () => {
 *     coral.generate(['bg-red-500', 'p-4'])
 *     expect(coral.wasProcessed('bg-red-500')).toBe(true)
 *   })
 * })
 * ```
 */
export function createTestCoral(options: MockCoralOptions = {}): MockCoral {
  const { trackCSS = true, trackClasses = true, emptyCSS = false, ...coralOptions } = options

  const baseCoral = createCoral(coralOptions)

  // Create mock with all base methods explicitly
  const mock: MockCoral = {
    // Properties
    get config() {
      return baseCoral.config
    },
    get plugins() {
      return baseCoral.plugins
    },
    get pluginCount() {
      return baseCoral.pluginCount
    },

    // Methods
    use(plugin) {
      baseCoral.use(plugin)
      return mock
    },
    unregister: baseCoral.unregister.bind(baseCoral),
    generateFromHTML: baseCoral.generateFromHTML.bind(baseCoral),
    getRules: baseCoral.getRules.bind(baseCoral),
    getVariants: baseCoral.getVariants.bind(baseCoral),

    generate(classes: string[]): string {
      if (trackClasses) {
        for (const cls of classes) {
          processedClasses.push(cls)
          classGenerationCount.set(cls, (classGenerationCount.get(cls) || 0) + 1)
        }
      }

      if (emptyCSS) {
        return ''
      }

      const css = baseCoral.generate(classes)

      if (trackCSS && css) {
        generatedCSS.push(css)
      }

      return css
    },

    getGeneratedCSS(): string[] {
      return [...generatedCSS]
    },

    getProcessedClasses(): string[] {
      return [...processedClasses]
    },

    reset(): void {
      generatedCSS.length = 0
      processedClasses.length = 0
      classGenerationCount.clear()
    },

    wasProcessed(className: string): boolean {
      return processedClasses.includes(className)
    },

    getGenerationCount(className: string): number {
      return classGenerationCount.get(className) || 0
    },

    ready(): Promise<void> {
      return baseCoral.ready()
    },
  }

  return mock
}

/**
 * Get or create a global mock Coral instance
 *
 * @example
 * ```typescript
 * import { mockCoral, resetMockCoral } from '@coral-css/core/testing'
 *
 * beforeEach(() => {
 *   resetMockCoral()
 * })
 *
 * it('should use mock coral', () => {
 *   const coral = mockCoral()
 *   coral.generate(['bg-red-500'])
 *   expect(coral.wasProcessed('bg-red-500')).toBe(true)
 * })
 * ```
 */
export function mockCoral(options: MockCoralOptions = {}): MockCoral {
  if (!mockInstance) {
    mockInstance = createTestCoral(options)
  }
  return mockInstance
}

/**
 * Reset the global mock Coral instance
 */
export function resetMockCoral(): void {
  if (mockInstance) {
    mockInstance.reset()
  }
  mockInstance = null
  generatedCSS.length = 0
  processedClasses.length = 0
  classGenerationCount.clear()
}

/**
 * Create a mock that returns predefined CSS
 *
 * @example
 * ```typescript
 * const mock = createMockWithCSS({
 *   'bg-red-500': '.bg-red-500 { background-color: #ef4444; }',
 *   'p-4': '.p-4 { padding: 1rem; }',
 * })
 * ```
 */
export function createMockWithCSS(cssMap: Record<string, string>): MockCoral {
  const mock = createTestCoral({ emptyCSS: true })
  const originalGenerate = mock.generate.bind(mock)

  mock.generate = (classes: string[]): string => {
    originalGenerate(classes)
    return classes.map(cls => cssMap[cls] || '').filter(Boolean).join('\n')
  }

  return mock
}

/**
 * Create a spy for Coral generate method
 */
export function spyOnGenerate(coral: Coral): {
  calls: string[][]
  reset: () => void
} {
  const calls: string[][] = []
  const original = coral.generate.bind(coral)

  coral.generate = (classes: string[]): string => {
    calls.push([...classes])
    return original(classes)
  }

  return {
    calls,
    reset: () => {
      calls.length = 0
    },
  }
}
