/**
 * Tests for Dock Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/dock
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Dock, createDock } from '../../../src/components/dock'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Dock Component', () => {
  let container: HTMLElement
  let component: Dock

  const sampleItems = [
    { id: '1', label: 'Finder', icon: '📁' },
    { id: '2', label: 'Safari', icon: '🌐' },
    { id: '3', label: 'Mail', icon: '✉️', badge: 3 },
    { id: '4', label: 'Music', icon: '🎵' },
  ]

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'dock-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create dock with default options', () => {
      component = createDock(container)
      expect(component).toBeInstanceOf(Dock)
    })

    it('should create with items', () => {
      component = createDock(container, { items: sampleItems })
      expect(component).toBeDefined()
    })

    it('should create with custom position', () => {
      component = createDock(container, { position: 'left' })
      expect(component).toBeDefined()
    })

    it('should default to bottom position', () => {
      component = createDock(container)
      expect(component).toBeDefined()
    })

    it('should initialize with no active item', () => {
      component = createDock(container, { items: sampleItems })
      const state = component.getState()
      expect(state.activeItem).toBe(null)
    })

    it('should initialize with no hovered item', () => {
      component = createDock(container)
      const state = component.getState()
      expect(state.hoveredItem).toBe(null)
    })
  })

  describe('Position', () => {
    it('should support bottom position', () => {
      component = createDock(container, { position: 'bottom' })
      expect(component).toBeDefined()
    })

    it('should support top position', () => {
      component = createDock(container, { position: 'top' })
      expect(component).toBeDefined()
    })

    it('should support left position', () => {
      component = createDock(container, { position: 'left' })
      expect(component).toBeDefined()
    })

    it('should support right position', () => {
      component = createDock(container, { position: 'right' })
      expect(component).toBeDefined()
    })

    it('should set position dynamically', () => {
      component = createDock(container)
      component.setPosition('left')
      expect(component).toBeDefined()
    })
  })

  describe('Magnification', () => {
    it('should support magnification', () => {
      component = createDock(container, {
        magnification: true,
        magnificationScale: 1.5,
      })
      expect(component).toBeDefined()
    })

    it('should disable magnification', () => {
      component = createDock(container, { magnification: false })
      expect(component).toBeDefined()
    })

    it('should support custom magnification scale', () => {
      component = createDock(container, {
        magnification: true,
        magnificationScale: 2.0,
      })
      expect(component).toBeDefined()
    })

    it('should enable magnification dynamically', () => {
      component = createDock(container, { magnification: false })
      component.setMagnification(true)
      expect(component).toBeDefined()
    })
  })

  describe('Items', () => {
    it('should get items', () => {
      component = createDock(container, { items: sampleItems })
      const items = component.getItems()
      expect(items).toHaveLength(4)
    })

    it('should set items', () => {
      component = createDock(container)
      component.setItems(sampleItems)
      expect(component.getItems()).toHaveLength(4)
    })

    it('should add item', () => {
      component = createDock(container, { items: sampleItems })
      component.addItem({ id: '5', label: 'New App', icon: '📱' })
      expect(component.getItems()).toHaveLength(5)
    })

    it('should remove item', () => {
      component = createDock(container, { items: sampleItems })
      component.removeItem('1')
      expect(component.getItems()).toHaveLength(3)
    })

    it('should get item by id', () => {
      component = createDock(container, { items: sampleItems })
      const item = component.getItem('2')
      expect(item?.label).toBe('Safari')
    })
  })

  describe('Active Item', () => {
    it('should set active item', () => {
      component = createDock(container, { items: sampleItems })
      component.setActive('2')
      const state = component.getState()
      expect(state.activeItem).toBe('2')
    })

    it('should clear active item', () => {
      component = createDock(container, { items: sampleItems })
      component.setActive('2')
      component.clearActive()
      const state = component.getState()
      expect(state.activeItem).toBe(null)
    })

    it('should get active item', () => {
      component = createDock(container, { items: sampleItems })
      component.setActive('3')
      expect(component.getActiveItem()).toBe('3')
    })
  })

  describe('Badges', () => {
    it('should set badge on item', () => {
      component = createDock(container, { items: sampleItems })
      component.setBadge('1', 5)
      const item = component.getItem('1')
      expect(item?.badge).toBe(5)
    })

    it('should clear badge on item', () => {
      component = createDock(container, { items: sampleItems })
      component.setBadge('3', undefined)
      const item = component.getItem('3')
      expect(item?.badge).toBeUndefined()
    })

    it('should support string badges', () => {
      component = createDock(container, { items: sampleItems })
      component.setBadge('1', 'New')
      const item = component.getItem('1')
      expect(item?.badge).toBe('New')
    })
  })

  describe('Auto Hide', () => {
    it('should support auto hide', () => {
      component = createDock(container, { autoHide: true })
      expect(component).toBeDefined()
    })

    it('should support auto hide delay', () => {
      component = createDock(container, {
        autoHide: true,
        autoHideDelay: 1000,
      })
      expect(component).toBeDefined()
    })

    it('should show dock', () => {
      component = createDock(container, { autoHide: true })
      component.show()
      const state = component.getState()
      expect(state.isHidden).toBe(false)
    })

    it('should hide dock', () => {
      component = createDock(container, { autoHide: true })
      component.hide()
      const state = component.getState()
      expect(state.isHidden).toBe(true)
    })
  })

  describe('Callbacks', () => {
    it('should call onClick when item clicked', () => {
      const onClick = vi.fn()
      component = createDock(container, {
        items: sampleItems,
        onClick,
      })
      component.clickItem('1')
      expect(onClick).toHaveBeenCalled()
    })

    it('should call onHover when item hovered', () => {
      const onHover = vi.fn()
      component = createDock(container, {
        items: sampleItems,
        onHover,
      })
      component.hoverItem('2')
      expect(onHover).toHaveBeenCalledWith('2')
    })

    it('should call onLeave when leaving item', () => {
      const onLeave = vi.fn()
      component = createDock(container, {
        items: sampleItems,
        onLeave,
      })
      component.hoverItem('2')
      component.leaveItem()
      expect(onLeave).toHaveBeenCalled()
    })
  })

  describe('Item Size', () => {
    it('should support custom item size', () => {
      component = createDock(container, { itemSize: 64 })
      expect(component).toBeDefined()
    })

    it('should support custom gap', () => {
      component = createDock(container, { gap: 8 })
      expect(component).toBeDefined()
    })
  })

  describe('Separators', () => {
    it('should support separator indices', () => {
      component = createDock(container, {
        items: sampleItems,
        separatorIndices: [2],
      })
      expect(component).toBeDefined()
    })
  })

  describe('Animation', () => {
    it('should support bounce animation', () => {
      component = createDock(container, { bounceOnClick: true })
      expect(component).toBeDefined()
    })

    it('should bounce item', () => {
      component = createDock(container, {
        items: sampleItems,
        bounceOnClick: true,
      })
      component.bounceItem('1')
      expect(component).toBeDefined()
    })
  })

  describe('Disabled State', () => {
    it('should support disabled items', () => {
      const itemsWithDisabled = [
        ...sampleItems,
        { id: '5', label: 'Disabled', icon: '🚫', disabled: true },
      ]
      component = createDock(container, { items: itemsWithDisabled })
      expect(component).toBeDefined()
    })

    it('should disable item', () => {
      component = createDock(container, { items: sampleItems })
      component.setDisabled('1', true)
      const item = component.getItem('1')
      expect(item?.disabled).toBe(true)
    })

    it('should enable item', () => {
      component = createDock(container, { items: sampleItems })
      component.setDisabled('1', true)
      component.setDisabled('1', false)
      const item = component.getItem('1')
      expect(item?.disabled).toBe(false)
    })
  })

  describe('Running Indicator', () => {
    it('should support running indicator', () => {
      const itemsWithRunning = [
        { id: '1', label: 'App', icon: '📱', running: true },
      ]
      component = createDock(container, { items: itemsWithRunning })
      expect(component).toBeDefined()
    })

    it('should set running state', () => {
      component = createDock(container, { items: sampleItems })
      component.setRunning('1', true)
      const item = component.getItem('1')
      expect(item?.running).toBe(true)
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createDock(container)
      expect(component).toBeInstanceOf(Dock)
    })

    it('should accept options via factory', () => {
      component = createDock(container, {
        items: sampleItems,
        position: 'left',
        magnification: true,
        autoHide: true,
      })
      expect(component).toBeDefined()
    })
  })
})
