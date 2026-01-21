/**
 * Testing Helpers - Node.js Environment Tests
 *
 * Tests for non-browser code paths in testing helpers.
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'

describe('Testing Helpers - Node.js Environment', () => {
  describe('waitForCSSInjection', () => {
    it('should return null when document is undefined', async () => {
      const { waitForCSSInjection } = await import('../../../src/testing/helpers')
      const result = await waitForCSSInjection()
      expect(result).toBeNull()
    })
  })

  describe('getInjectedStyles', () => {
    it('should return empty array when document is undefined', async () => {
      const { getInjectedStyles } = await import('../../../src/testing/helpers')
      const result = getInjectedStyles()
      expect(result).toEqual([])
    })
  })
})
