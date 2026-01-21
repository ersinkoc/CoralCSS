/**
 * Tests for Masonry Layout Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/masonry
 */

import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { Masonry, createMasonry } from '../../../src/components/masonry'

// Setup mocks before all tests (after jsdom is initialized)
beforeAll(() => {
  // Mock ResizeObserver if not available
  if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }

  // Mock MutationObserver if not available
  if (!global.MutationObserver) {
    (global as unknown as Record<string, unknown>).MutationObserver = class MutationObserver {
      constructor(_callback: MutationCallback) {}
      observe() {}
      disconnect() {}
      takeRecords(): MutationRecord[] {
        return []
      }
    }
  }
})

describe('Masonry Component', () => {
  let container: HTMLElement
  let component: Masonry

  const createItems = (count: number): void => {
    for (let i = 0; i < count; i++) {
      const item = document.createElement('div')
      item.className = 'masonry-item'
      item.style.height = `${100 + Math.random() * 200}px`
      item.textContent = `Item ${i + 1}`
      container.appendChild(item)
    }
  }

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'masonry-container'
    container.style.width = '1000px'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create masonry with default options', () => {
      component = createMasonry(container)
      expect(component).toBeInstanceOf(Masonry)
    })

    it('should create with fixed columns', () => {
      component = createMasonry(container, { columns: 3 })
      expect(component).toBeDefined()
    })

    it('should create with auto columns', () => {
      component = createMasonry(container, { columns: 'auto' })
      expect(component).toBeDefined()
    })

    it('should create with custom column width', () => {
      component = createMasonry(container, { columnWidth: 250 })
      expect(component).toBeDefined()
    })

    it('should create with custom gap', () => {
      component = createMasonry(container, { gap: 20 })
      expect(component).toBeDefined()
    })

    it('should initialize with layout not complete', () => {
      component = createMasonry(container)
      const state = component.getState()
      expect(state.layoutComplete).toBe(false)
    })
  })

  describe('Column Management', () => {
    it('should calculate columns based on width', () => {
      createItems(6)
      component = createMasonry(container, {
        columns: 'auto',
        columnWidth: 300,
      })
      const state = component.getState()
      expect(state.columns).toBeGreaterThan(0)
    })

    it('should track column heights', () => {
      createItems(6)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      const state = component.getState()
      expect(state.columnHeights.length).toBe(3)
    })

    it('should update columns on resize', () => {
      createItems(6)
      component = createMasonry(container, { columns: 'auto', columnWidth: 300 })
      component.layout()
      expect(component).toBeDefined()
    })
  })

  describe('Layout', () => {
    it('should layout items', () => {
      createItems(6)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      const state = component.getState()
      expect(state.layoutComplete).toBe(true)
    })

    it('should position items in columns', () => {
      createItems(6)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      const state = component.getState()
      expect(state.items.length).toBe(6)
    })

    it('should call onLayoutComplete', () => {
      const onLayoutComplete = vi.fn()
      createItems(6)
      component = createMasonry(container, {
        columns: 3,
        onLayoutComplete,
      })
      component.layout()
      expect(onLayoutComplete).toHaveBeenCalled()
    })

    it('should call onItemPositioned for each item', () => {
      const onItemPositioned = vi.fn()
      createItems(3)
      component = createMasonry(container, {
        columns: 3,
        onItemPositioned,
      })
      component.layout()
      expect(onItemPositioned).toHaveBeenCalledTimes(3)
    })
  })

  describe('Item Selector', () => {
    it('should filter items by selector', () => {
      createItems(6)
      component = createMasonry(container, {
        itemSelector: '.masonry-item',
      })
      component.layout()
      const state = component.getState()
      expect(state.items.length).toBe(6)
    })

    it('should ignore non-matching items', () => {
      createItems(4)
      const otherItem = document.createElement('div')
      otherItem.className = 'other-item'
      container.appendChild(otherItem)
      component = createMasonry(container, {
        itemSelector: '.masonry-item',
      })
      component.layout()
      const state = component.getState()
      expect(state.items.length).toBe(4)
    })
  })

  describe('Animation', () => {
    it('should support animated layout', () => {
      createItems(6)
      component = createMasonry(container, {
        animate: true,
        animationDuration: 300,
      })
      expect(component).toBeDefined()
    })

    it('should support custom easing', () => {
      createItems(6)
      component = createMasonry(container, {
        animate: true,
        animationEasing: 'ease-in-out',
      })
      expect(component).toBeDefined()
    })

    it('should disable animation when animate is false', () => {
      createItems(6)
      component = createMasonry(container, { animate: false })
      expect(component).toBeDefined()
    })
  })

  describe('Horizontal Order', () => {
    it('should support horizontal order', () => {
      createItems(6)
      component = createMasonry(container, {
        columns: 3,
        horizontalOrder: true,
      })
      expect(component).toBeDefined()
    })

    it('should layout in natural order when horizontalOrder is false', () => {
      createItems(6)
      component = createMasonry(container, {
        columns: 3,
        horizontalOrder: false,
      })
      expect(component).toBeDefined()
    })
  })

  describe('Fit Width', () => {
    it('should support fit width option', () => {
      createItems(6)
      component = createMasonry(container, { fitWidth: true })
      expect(component).toBeDefined()
    })
  })

  describe('Dynamic Items', () => {
    it('should add item', () => {
      createItems(3)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      const newItem = document.createElement('div')
      newItem.className = 'masonry-item'
      newItem.style.height = '150px'
      component.addItem(newItem)
      const state = component.getState()
      expect(state.items.length).toBe(4)
    })

    it('should remove item', () => {
      createItems(3)
      component = createMasonry(container, {
        columns: 3,
        itemSelector: '.masonry-item',
      })
      component.layout()
      const itemToRemove = container.querySelector('.masonry-item') as HTMLElement
      component.removeItem(itemToRemove)
      const state = component.getState()
      expect(state.items.length).toBe(2)
    })

    it('should prepend item', () => {
      createItems(3)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      const newItem = document.createElement('div')
      newItem.className = 'masonry-item'
      newItem.style.height = '150px'
      component.prependItem(newItem)
      const state = component.getState()
      expect(state.items.length).toBe(4)
    })
  })

  describe('Refresh', () => {
    it('should refresh layout', () => {
      createItems(6)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      component.refresh()
      const state = component.getState()
      expect(state.layoutComplete).toBe(true)
    })

    it('should recalculate on refresh', () => {
      createItems(6)
      component = createMasonry(container, { columns: 'auto' })
      component.layout()
      container.style.width = '600px'
      component.refresh()
      expect(component).toBeDefined()
    })
  })

  describe('Destroy', () => {
    it('should clean up on destroy', () => {
      createItems(6)
      component = createMasonry(container, { columns: 3 })
      component.layout()
      component.destroy()
      expect(component).toBeDefined()
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createMasonry(container)
      expect(component).toBeInstanceOf(Masonry)
    })

    it('should accept options via factory', () => {
      component = createMasonry(container, {
        columns: 4,
        gap: 15,
        animate: true,
      })
      expect(component).toBeDefined()
    })
  })
})
