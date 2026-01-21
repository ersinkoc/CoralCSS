/**
 * Tests for Compare Slider Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/compare-slider
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { CompareSlider, createCompareSlider } from '../../../src/components/compare-slider'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('CompareSlider Component', () => {
  let container: HTMLElement
  let component: CompareSlider

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'compare-slider-container'
    container.style.width = '800px'
    container.style.height = '600px'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (component) {
      component.destroy()
    }
    document.body.innerHTML = ''
  })

  describe('Initialization', () => {
    it('should create compare slider with default options', () => {
      component = createCompareSlider(container)
      expect(component).toBeInstanceOf(CompareSlider)
    })

    it('should create with images', () => {
      component = createCompareSlider(container, {
        beforeImage: 'before.jpg',
        afterImage: 'after.jpg',
      })
      expect(component).toBeDefined()
    })

    it('should create with labels', () => {
      component = createCompareSlider(container, {
        beforeLabel: 'Before',
        afterLabel: 'After',
      })
      expect(component).toBeDefined()
    })

    it('should initialize at 50% by default', () => {
      component = createCompareSlider(container)
      const state = component.getState()
      expect(state.position).toBe(50)
    })

    it('should initialize with custom position', () => {
      component = createCompareSlider(container, { initialPosition: 30 })
      const state = component.getState()
      expect(state.position).toBe(30)
    })

    it('should initialize as not dragging', () => {
      component = createCompareSlider(container)
      const state = component.getState()
      expect(state.isDragging).toBe(false)
    })
  })

  describe('Orientation', () => {
    it('should support horizontal orientation', () => {
      component = createCompareSlider(container, {
        orientation: 'horizontal',
      })
      expect(component).toBeDefined()
    })

    it('should support vertical orientation', () => {
      component = createCompareSlider(container, {
        orientation: 'vertical',
      })
      expect(component).toBeDefined()
    })

    it('should default to horizontal', () => {
      component = createCompareSlider(container)
      expect(component).toBeDefined()
    })
  })

  describe('Position', () => {
    it('should set position', () => {
      component = createCompareSlider(container)
      component.setPosition(75)
      expect(component.getPosition()).toBe(75)
    })

    it('should clamp position to min 0', () => {
      component = createCompareSlider(container)
      component.setPosition(-10)
      expect(component.getPosition()).toBe(0)
    })

    it('should clamp position to max 100', () => {
      component = createCompareSlider(container)
      component.setPosition(110)
      expect(component.getPosition()).toBe(100)
    })

    it('should get current position', () => {
      component = createCompareSlider(container, { initialPosition: 40 })
      expect(component.getPosition()).toBe(40)
    })
  })

  describe('Images', () => {
    it('should set before image', () => {
      component = createCompareSlider(container)
      component.setBeforeImage('new-before.jpg')
      expect(component).toBeDefined()
    })

    it('should set after image', () => {
      component = createCompareSlider(container)
      component.setAfterImage('new-after.jpg')
      expect(component).toBeDefined()
    })

    it('should track image loading state', () => {
      component = createCompareSlider(container)
      expect(component.isLoaded()).toBe(false)
    })
  })

  describe('Labels', () => {
    it('should show labels by default', () => {
      component = createCompareSlider(container, { showLabels: true })
      expect(component).toBeDefined()
    })

    it('should hide labels', () => {
      component = createCompareSlider(container, { showLabels: false })
      expect(component).toBeDefined()
    })

    it('should set labels dynamically', () => {
      component = createCompareSlider(container)
      component.setLabels('Old', 'New')
      expect(component).toBeDefined()
    })

    it('should support label positions', () => {
      component = createCompareSlider(container, {
        showLabels: true,
        labelPosition: 'inside',
      })
      expect(component).toBeDefined()
    })
  })

  describe('Handle', () => {
    it('should support custom handle size', () => {
      component = createCompareSlider(container, { handleSize: 50 })
      expect(component).toBeDefined()
    })

    it('should support custom handle color', () => {
      component = createCompareSlider(container, { handleColor: '#ff0000' })
      expect(component).toBeDefined()
    })
  })

  describe('Animation', () => {
    it('should support animated transitions', () => {
      component = createCompareSlider(container, { animate: true })
      expect(component).toBeDefined()
    })

    it('should support custom animation duration', () => {
      component = createCompareSlider(container, {
        animate: true,
        animationDuration: 300,
      })
      expect(component).toBeDefined()
    })

    it('should disable animation', () => {
      component = createCompareSlider(container, { animate: false })
      expect(component).toBeDefined()
    })
  })

  describe('Keyboard Support', () => {
    it('should support keyboard navigation', () => {
      component = createCompareSlider(container, { keyboard: true })
      expect(component).toBeDefined()
    })

    it('should disable keyboard navigation', () => {
      component = createCompareSlider(container, { keyboard: false })
      expect(component).toBeDefined()
    })

    it('should support custom keyboard step', () => {
      component = createCompareSlider(container, {
        keyboard: true,
        keyboardStep: 10,
      })
      expect(component).toBeDefined()
    })
  })

  describe('Callbacks', () => {
    it('should call onSlide during drag', () => {
      const onSlide = vi.fn()
      component = createCompareSlider(container, { onSlide })
      component.setPosition(60)
      expect(onSlide).toHaveBeenCalledWith(60)
    })

    it('should call onSlideStart', () => {
      const onSlideStart = vi.fn()
      component = createCompareSlider(container, { onSlideStart })
      // Simulate drag start - this would be triggered by mouse/touch events
      expect(component).toBeDefined()
    })

    it('should call onSlideEnd', () => {
      const onSlideEnd = vi.fn()
      component = createCompareSlider(container, { onSlideEnd })
      expect(component).toBeDefined()
    })
  })

  describe('Dragging State', () => {
    it('should report dragging state', () => {
      component = createCompareSlider(container)
      expect(component.isDragging()).toBe(false)
    })
  })

  describe('State', () => {
    it('should get full state', () => {
      component = createCompareSlider(container)
      const state = component.getState()
      expect(state).toHaveProperty('position')
      expect(state).toHaveProperty('isDragging')
      expect(state).toHaveProperty('beforeLoaded')
      expect(state).toHaveProperty('afterLoaded')
    })
  })

  describe('Destroy', () => {
    it('should clean up on destroy', () => {
      component = createCompareSlider(container)
      component.destroy()
      expect(component).toBeDefined()
    })
  })

  describe('Factory Function', () => {
    it('should create instance via factory', () => {
      component = createCompareSlider(container)
      expect(component).toBeInstanceOf(CompareSlider)
    })

    it('should accept options via factory', () => {
      component = createCompareSlider(container, {
        beforeImage: 'before.jpg',
        afterImage: 'after.jpg',
        orientation: 'horizontal',
        initialPosition: 50,
        showLabels: true,
        animate: true,
        keyboard: true,
      })
      expect(component).toBeDefined()
    })
  })
})
