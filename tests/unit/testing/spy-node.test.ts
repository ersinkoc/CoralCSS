/**
 * Testing Spy - Node.js Environment Tests
 *
 * Tests for non-browser code paths in testing spy utilities.
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll } from 'vitest'

// Set up minimal document mock for testing
const mockClassList = {
  contains: () => true,
  add: () => {},
  remove: () => {},
}

const mockElement = {
  classList: mockClassList,
} as unknown as Element

beforeAll(() => {
  // MutationObserver is undefined in Node.js by default
  // This tests the early return path
})

describe('Testing Spy - Node.js Environment', () => {
  describe('waitForClassRemoval', () => {
    it('should return false when MutationObserver is undefined', async () => {
      const { waitForClassRemoval } = await import('../../../src/testing/spy')
      // Element has the class, and MutationObserver is undefined in Node
      const result = await waitForClassRemoval(mockElement, 'test-class', 100)
      expect(result).toBe(false)
    })
  })
})
