/**
 * Tests for Infinite Scroll Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/infinite-scroll
 */

import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { InfiniteScroll, createInfiniteScroll } from '../../../src/components/infinite-scroll'

// Setup mocks before all tests
beforeAll(() => {
  // Mock ResizeObserver if not available
  if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }

  // Mock IntersectionObserver if not available
  if (!global.IntersectionObserver) {
    (global as unknown as Record<string, unknown>).IntersectionObserver = class IntersectionObserver {
      root: Element | null = null
      rootMargin: string = ''
      thresholds: ReadonlyArray<number> = []
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return []
      }
    }
  }
})

describe('InfiniteScroll Component', () => {
  let container: HTMLElement
  let component: InfiniteScroll

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'scroll-container'
    container.style.height = '500px'
    container.style.overflow = 'auto'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create infinite scroll with default options', () => {
      component = createInfiniteScroll(container)
      expect(component).toBeInstanceOf(InfiniteScroll)
    })

    it('should create with custom threshold', () => {
      component = createInfiniteScroll(container, { threshold: 0.5 })
      expect(component).toBeDefined()
    })

    it('should create with custom root margin', () => {
      component = createInfiniteScroll(container, { rootMargin: '200px' })
      expect(component).toBeDefined()
    })

    it('should initialize as not loading', () => {
      component = createInfiniteScroll(container)
      const state = component.getState()
      expect(state.loading).toBe(false)
    })

    it('should initialize with hasMore true', () => {
      component = createInfiniteScroll(container)
      const state = component.getState()
      expect(state.hasMore).toBe(true)
    })

    it('should initialize with zero load count', () => {
      component = createInfiniteScroll(container)
      const state = component.getState()
      expect(state.loadCount).toBe(0)
    })
  })

  describe('Direction', () => {
    it('should support down direction', () => {
      component = createInfiniteScroll(container, { direction: 'down' })
      expect(component).toBeDefined()
    })

    it('should support up direction', () => {
      component = createInfiniteScroll(container, { direction: 'up' })
      expect(component).toBeDefined()
    })

    it('should support both directions', () => {
      component = createInfiniteScroll(container, { direction: 'both' })
      expect(component).toBeDefined()
    })
  })

  describe('Loading State', () => {
    it('should track loading state', () => {
      component = createInfiniteScroll(container)
      component.setLoading(true)
      const state = component.getState()
      expect(state.loading).toBe(true)
    })

    it('should clear loading state', () => {
      component = createInfiniteScroll(container)
      component.setLoading(true)
      component.setLoading(false)
      const state = component.getState()
      expect(state.loading).toBe(false)
    })

    it('should check if loading', () => {
      component = createInfiniteScroll(container)
      component.setLoading(true)
      expect(component.isLoading()).toBe(true)
    })
  })

  describe('Has More State', () => {
    it('should track hasMore state', () => {
      component = createInfiniteScroll(container)
      component.setHasMore(false)
      const state = component.getState()
      expect(state.hasMore).toBe(false)
    })

    it('should check hasMore', () => {
      component = createInfiniteScroll(container)
      expect(component.hasMoreContent()).toBe(true)
    })
  })

  describe('Load Count', () => {
    it('should increment load count', () => {
      component = createInfiniteScroll(container)
      component.incrementLoadCount()
      const state = component.getState()
      expect(state.loadCount).toBe(1)
    })

    it('should track multiple loads', () => {
      component = createInfiniteScroll(container)
      component.incrementLoadCount()
      component.incrementLoadCount()
      component.incrementLoadCount()
      const state = component.getState()
      expect(state.loadCount).toBe(3)
    })

    it('should reset load count', () => {
      component = createInfiniteScroll(container)
      component.incrementLoadCount()
      component.incrementLoadCount()
      component.resetLoadCount()
      const state = component.getState()
      expect(state.loadCount).toBe(0)
    })
  })

  describe('Error Handling', () => {
    it('should track error state', () => {
      component = createInfiniteScroll(container)
      const error = new Error('Load failed')
      component.setError(error)
      const state = component.getState()
      expect(state.error).toBe(error)
    })

    it('should clear error state', () => {
      component = createInfiniteScroll(container)
      component.setError(new Error('Load failed'))
      component.clearError()
      const state = component.getState()
      expect(state.error).toBe(null)
    })

    it('should check for error', () => {
      component = createInfiniteScroll(container)
      expect(component.hasError()).toBe(false)
    })
  })

  describe('Callbacks', () => {
    it('should support onLoadMore callback', () => {
      const onLoadMore = vi.fn().mockResolvedValue(undefined)
      component = createInfiniteScroll(container, { onLoadMore })
      expect(component).toBeDefined()
    })

    it('should support onError callback', () => {
      const onError = vi.fn()
      component = createInfiniteScroll(container, { onError })
      expect(component).toBeDefined()
    })

    it('should support onLoadStart callback', () => {
      const onLoadStart = vi.fn()
      component = createInfiniteScroll(container, { onLoadStart })
      expect(component).toBeDefined()
    })

    it('should support onLoadEnd callback', () => {
      const onLoadEnd = vi.fn()
      component = createInfiniteScroll(container, { onLoadEnd })
      expect(component).toBeDefined()
    })
  })

  describe('Disabled State', () => {
    it('should support disabled state', () => {
      component = createInfiniteScroll(container, { disabled: true })
      expect(component).toBeDefined()
    })

    it('should toggle disabled state', () => {
      component = createInfiniteScroll(container)
      component.disable()
      expect(component.isDisabled()).toBe(true)
    })

    it('should enable after disable', () => {
      component = createInfiniteScroll(container, { disabled: true })
      component.enable()
      expect(component.isDisabled()).toBe(false)
    })
  })

  describe('Manual Trigger', () => {
    it('should support manual load trigger', async () => {
      const onLoadMore = vi.fn().mockResolvedValue(undefined)
      component = createInfiniteScroll(container, { onLoadMore })
      await component.triggerLoad()
      expect(onLoadMore).toHaveBeenCalled()
    })

    it('should not trigger when loading', async () => {
      const onLoadMore = vi.fn().mockResolvedValue(undefined)
      component = createInfiniteScroll(container, { onLoadMore })
      component.setLoading(true)
      await component.triggerLoad()
      expect(onLoadMore).not.toHaveBeenCalled()
    })

    it('should not trigger when no more content', async () => {
      const onLoadMore = vi.fn().mockResolvedValue(undefined)
      component = createInfiniteScroll(container, { onLoadMore })
      component.setHasMore(false)
      await component.triggerLoad()
      expect(onLoadMore).not.toHaveBeenCalled()
    })
  })

  describe('Reset', () => {
    it('should reset state', () => {
      component = createInfiniteScroll(container)
      component.setLoading(true)
      component.setHasMore(false)
      component.incrementLoadCount()
      component.reset()
      const state = component.getState()
      expect(state.loading).toBe(false)
      expect(state.hasMore).toBe(true)
      expect(state.loadCount).toBe(0)
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createInfiniteScroll(container)
      expect(component).toBeInstanceOf(InfiniteScroll)
    })

    it('should accept options via factory', () => {
      component = createInfiniteScroll(container, {
        threshold: 0.3,
        rootMargin: '150px',
        direction: 'both',
      })
      expect(component).toBeDefined()
    })
  })
})
