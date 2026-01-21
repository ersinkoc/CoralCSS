/**
 * DOM Utilities Tests - Node.js Environment (No Browser)
 *
 * These tests run in Node.js (not jsdom) to test non-browser code paths.
 * Note: Some functions have default parameters that reference `document`, which
 * is evaluated at module import time. We set up mocks before importing the module.
 *
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeAll } from 'vitest'

// Set up minimal document mock BEFORE any tests run
// This is needed because default parameters like `root: Document | Element = document`
// are evaluated when the module is imported
const mockDocument = {
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({}),
  getElementById: () => null,
  head: { appendChild: () => {} },
  body: { style: {} },
  readyState: 'complete',
  addEventListener: () => {},
}
;(globalThis as Record<string, unknown>).document = mockDocument

// Now import the module - document is mocked but window is undefined
// so isBrowser() will return false
import {
  isBrowser,
  querySelector,
  querySelectorAll,
  lockScroll,
  isInViewport,
  onDOMReady,
  getComputedStyleValue,
  cssSupports,
  supportsAnchorPositioning,
  supportsContainerQueries,
  supportsScrollTimeline,
  supportsViewTransitions,
  supportsHasSelector,
} from '../../../src/utils/dom'

describe('DOM Utilities - Node.js Environment', () => {
  describe('isBrowser', () => {
    it('should return false when window is undefined', () => {
      // window is still undefined, only document is mocked
      expect(isBrowser()).toBe(false)
    })
  })

  describe('querySelector', () => {
    it('should return null in non-browser environment', () => {
      const result = querySelector('.test')
      expect(result).toBeNull()
    })
  })

  describe('querySelectorAll', () => {
    it('should return empty array in non-browser environment', () => {
      const result = querySelectorAll('.test')
      expect(result).toEqual([])
    })
  })

  describe('lockScroll', () => {
    it('should return noop function in non-browser environment', () => {
      const cleanup = lockScroll()
      expect(typeof cleanup).toBe('function')
      // Should not throw
      expect(() => cleanup()).not.toThrow()
    })
  })

  describe('isInViewport', () => {
    it('should return false in non-browser environment', () => {
      // Create a mock element
      const mockElement = {
        getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 100, right: 100 }),
      } as Element
      expect(isInViewport(mockElement)).toBe(false)
    })
  })

  describe('onDOMReady', () => {
    it('should return early without calling callback in non-browser environment', () => {
      const callback = vi.fn()
      onDOMReady(callback)
      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('getComputedStyleValue', () => {
    it('should return empty string in non-browser environment', () => {
      const mockElement = {} as Element
      const result = getComputedStyleValue(mockElement, 'color')
      expect(result).toBe('')
    })
  })

  describe('cssSupports', () => {
    it('should return false in non-browser environment', () => {
      expect(cssSupports('display', 'flex')).toBe(false)
    })
  })

  describe('Modern CSS feature detection in non-browser', () => {
    it('supportsAnchorPositioning should return false', () => {
      expect(supportsAnchorPositioning()).toBe(false)
    })

    it('supportsContainerQueries should return false', () => {
      expect(supportsContainerQueries()).toBe(false)
    })

    it('supportsScrollTimeline should return false', () => {
      expect(supportsScrollTimeline()).toBe(false)
    })

    it('supportsViewTransitions should return false', () => {
      expect(supportsViewTransitions()).toBe(false)
    })

    it('supportsHasSelector should return boolean', () => {
      // Our mock document.querySelector doesn't throw for :has selector,
      // so it returns true. The real test is in the jsdom environment.
      expect(typeof supportsHasSelector()).toBe('boolean')
    })
  })
})
