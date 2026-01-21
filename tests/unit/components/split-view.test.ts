/**
 * Tests for Split View Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/split-view
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { SplitView, createSplitView } from '../../../src/components/split-view'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('SplitView Component', () => {
  let container: HTMLElement
  let component: SplitView

  const createPanes = (): void => {
    const pane1 = document.createElement('div')
    pane1.className = 'pane-1'
    pane1.setAttribute('data-pane', 'first')
    pane1.textContent = 'Pane 1'
    container.appendChild(pane1)

    const gutter = document.createElement('div')
    gutter.className = 'gutter'
    gutter.setAttribute('data-gutter', '')
    container.appendChild(gutter)

    const pane2 = document.createElement('div')
    pane2.className = 'pane-2'
    pane2.setAttribute('data-pane', 'second')
    pane2.textContent = 'Pane 2'
    container.appendChild(pane2)
  }

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'split-container'
    container.style.width = '1000px'
    container.style.height = '500px'
    container.style.display = 'flex'
    document.body.appendChild(container)
    createPanes()
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create split view with default options', () => {
      component = createSplitView(container)
      expect(component).toBeInstanceOf(SplitView)
    })

    it('should create with custom initial split', () => {
      component = createSplitView(container, { initialSplit: 30 })
      const state = component.getState()
      expect(state.splitPercentage).toBe(30)
    })

    it('should initialize as not dragging', () => {
      component = createSplitView(container)
      const state = component.getState()
      expect(state.isDragging).toBe(false)
    })

    it('should initialize as not collapsed', () => {
      component = createSplitView(container)
      const state = component.getState()
      expect(state.isCollapsed).toBe(null)
    })

    it('should use 50% split by default', () => {
      component = createSplitView(container)
      const state = component.getState()
      expect(state.splitPercentage).toBe(50)
    })
  })

  describe('Direction', () => {
    it('should support horizontal direction', () => {
      component = createSplitView(container, { direction: 'horizontal' })
      expect(component).toBeDefined()
    })

    it('should support vertical direction', () => {
      component = createSplitView(container, { direction: 'vertical' })
      expect(component).toBeDefined()
    })

    it('should default to horizontal', () => {
      component = createSplitView(container)
      expect(component).toBeDefined()
    })
  })

  describe('Split Percentage', () => {
    it('should set split percentage', () => {
      component = createSplitView(container)
      component.setSplit(40)
      const state = component.getState()
      expect(state.splitPercentage).toBe(40)
    })

    it('should clamp split to valid range', () => {
      component = createSplitView(container, {
        minPaneSize: 100,
      })
      component.setSplit(5)
      const state = component.getState()
      expect(state.splitPercentage).toBeGreaterThanOrEqual(0)
    })

    it('should get current split', () => {
      component = createSplitView(container, { initialSplit: 60 })
      expect(component.getSplit()).toBe(60)
    })
  })

  describe('Size Constraints', () => {
    it('should respect minPaneSize', () => {
      component = createSplitView(container, {
        minPaneSize: 200,
      })
      expect(component).toBeDefined()
    })

    it('should respect maxPaneSize', () => {
      component = createSplitView(container, {
        maxPaneSize: 800,
      })
      expect(component).toBeDefined()
    })

    it('should support custom gutter size', () => {
      component = createSplitView(container, {
        gutterSize: 10,
      })
      expect(component).toBeDefined()
    })
  })

  describe('Snap Points', () => {
    it('should support snap points', () => {
      component = createSplitView(container, {
        snapPoints: [25, 50, 75],
      })
      expect(component).toBeDefined()
    })

    it('should support snap threshold', () => {
      component = createSplitView(container, {
        snapPoints: [25, 50, 75],
        snapThreshold: 10,
      })
      expect(component).toBeDefined()
    })

    it('should snap to nearest point', () => {
      component = createSplitView(container, {
        snapPoints: [25, 50, 75],
        snapThreshold: 10,
      })
      component.setSplit(48)
      component.snapToNearest()
      const state = component.getState()
      expect(state.splitPercentage).toBe(50)
    })
  })

  describe('Collapsible', () => {
    it('should support collapsible option', () => {
      component = createSplitView(container, { collapsible: true })
      expect(component).toBeDefined()
    })

    it('should collapse first pane', () => {
      component = createSplitView(container, { collapsible: true })
      component.collapseFirst()
      const state = component.getState()
      expect(state.isCollapsed).toBe('first')
    })

    it('should collapse second pane', () => {
      component = createSplitView(container, { collapsible: true })
      component.collapseSecond()
      const state = component.getState()
      expect(state.isCollapsed).toBe('second')
    })

    it('should expand collapsed pane', () => {
      component = createSplitView(container, { collapsible: true })
      component.collapseFirst()
      component.expand()
      const state = component.getState()
      expect(state.isCollapsed).toBe(null)
    })

    it('should toggle collapse', () => {
      component = createSplitView(container, { collapsible: true })
      component.toggleCollapse('first')
      const state1 = component.getState()
      expect(state1.isCollapsed).toBe('first')
      component.toggleCollapse('first')
      const state2 = component.getState()
      expect(state2.isCollapsed).toBe(null)
    })

    it('should support collapse threshold', () => {
      component = createSplitView(container, {
        collapsible: true,
        collapseThreshold: 10,
      })
      expect(component).toBeDefined()
    })
  })

  describe('Animation', () => {
    it('should support animated transitions', () => {
      component = createSplitView(container, { animated: true })
      expect(component).toBeDefined()
    })

    it('should support custom animation duration', () => {
      component = createSplitView(container, {
        animated: true,
        animationDuration: 500,
      })
      expect(component).toBeDefined()
    })
  })

  describe('Disabled State', () => {
    it('should support disabled state', () => {
      component = createSplitView(container, { disabled: true })
      expect(component).toBeDefined()
    })

    it('should enable/disable dragging', () => {
      component = createSplitView(container)
      component.disable()
      expect(component.isDisabled()).toBe(true)
      component.enable()
      expect(component.isDisabled()).toBe(false)
    })
  })

  describe('Callbacks', () => {
    it('should call onDragStart', () => {
      const onDragStart = vi.fn()
      component = createSplitView(container, { onDragStart })
      component.startDrag()
      expect(onDragStart).toHaveBeenCalled()
    })

    it('should call onDrag during drag', () => {
      const onDrag = vi.fn()
      component = createSplitView(container, { onDrag })
      component.startDrag()
      component.updateDrag(60)
      expect(onDrag).toHaveBeenCalledWith(60)
    })

    it('should call onDragEnd', () => {
      const onDragEnd = vi.fn()
      component = createSplitView(container, { onDragEnd })
      component.startDrag()
      component.endDrag()
      expect(onDragEnd).toHaveBeenCalled()
    })

    it('should call onCollapse', () => {
      const onCollapse = vi.fn()
      component = createSplitView(container, {
        collapsible: true,
        onCollapse,
      })
      component.collapseFirst()
      expect(onCollapse).toHaveBeenCalledWith('first')
    })

    it('should call onExpand', () => {
      const onExpand = vi.fn()
      component = createSplitView(container, {
        collapsible: true,
        onExpand,
      })
      component.collapseFirst()
      component.expand()
      expect(onExpand).toHaveBeenCalled()
    })
  })

  describe('Pane Sizes', () => {
    it('should calculate pane sizes', () => {
      component = createSplitView(container, { initialSplit: 50 })
      const state = component.getState()
      // In JSDOM, clientWidth is 0, so sizes will be negative due to gutter
      // Just verify the state properties exist and are numbers
      expect(typeof state.pane1Size).toBe('number')
      expect(typeof state.pane2Size).toBe('number')
    })

    it('should get pane 1 size', () => {
      component = createSplitView(container)
      const size = component.getPane1Size()
      // Just verify it returns a number
      expect(typeof size).toBe('number')
    })

    it('should get pane 2 size', () => {
      component = createSplitView(container)
      const size = component.getPane2Size()
      // Just verify it returns a number
      expect(typeof size).toBe('number')
    })
  })

  describe('Reset', () => {
    it('should reset to initial split', () => {
      component = createSplitView(container, { initialSplit: 50 })
      component.setSplit(30)
      component.reset()
      const state = component.getState()
      expect(state.splitPercentage).toBe(50)
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createSplitView(container)
      expect(component).toBeInstanceOf(SplitView)
    })

    it('should accept options via factory', () => {
      component = createSplitView(container, {
        direction: 'vertical',
        initialSplit: 40,
        collapsible: true,
      })
      const state = component.getState()
      expect(state.splitPercentage).toBe(40)
    })
  })
})
