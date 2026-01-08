/**
 * DOM Utilities Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  isBrowser,
  querySelector,
  querySelectorAll,
  createElement,
  getOrCreateStyleElement,
  getFocusableElements,
  trapFocus,
  lockScroll,
  isInViewport,
  setAttributes,
  setAriaAttributes,
  addEventListener,
  onDOMReady,
  dispatchCustomEvent,
  getComputedStyleValue,
  cssSupports,
  supportsAnchorPositioning,
  supportsContainerQueries,
  supportsHasSelector,
  supportsScrollTimeline,
  supportsViewTransitions,
  getDataAttribute,
  setDataAttribute,
  releaseFocusTrap,
  setFocusTrap,
  unlockScroll,
  setScrollLock,
} from '../../../src/utils/dom'

describe('DOM Utilities', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('isBrowser', () => {
    it('should return true in jsdom environment', () => {
      expect(isBrowser()).toBe(true)
    })
  })

  describe('querySelector', () => {
    it('should find element by selector', () => {
      container.innerHTML = '<div class="test-element"></div>'
      const result = querySelector('.test-element', container)

      expect(result).toBeDefined()
      expect(result?.classList.contains('test-element')).toBe(true)
    })

    it('should return null when element not found', () => {
      const result = querySelector('.non-existent', container)

      expect(result).toBeNull()
    })

    it('should use document as default root', () => {
      const result = querySelector('#test-container')

      expect(result).toBe(container)
    })
  })

  describe('querySelectorAll', () => {
    it('should find all matching elements', () => {
      container.innerHTML = '<div class="item"></div><div class="item"></div><div class="item"></div>'
      const result = querySelectorAll('.item', container)

      expect(result.length).toBe(3)
    })

    it('should return empty array when no elements found', () => {
      const result = querySelectorAll('.non-existent', container)

      expect(result).toEqual([])
    })

    it('should return array not NodeList', () => {
      container.innerHTML = '<div class="item"></div>'
      const result = querySelectorAll('.item', container)

      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('createElement', () => {
    it('should create element with tag', () => {
      const element = createElement('div')

      expect(element.tagName).toBe('DIV')
    })

    it('should set attributes', () => {
      const element = createElement('div', { class: 'test', id: 'my-id' })

      expect(element.className).toBe('test')
      expect(element.id).toBe('my-id')
    })

    it('should append string children', () => {
      const element = createElement('div', {}, 'Hello World')

      expect(element.textContent).toBe('Hello World')
    })

    it('should append node children', () => {
      const child = document.createElement('span')
      child.textContent = 'Child'
      const element = createElement('div', {}, child)

      expect(element.contains(child)).toBe(true)
    })

    it('should append multiple children', () => {
      const span = document.createElement('span')
      const element = createElement('div', {}, 'Text', span, 'More text')

      expect(element.childNodes.length).toBe(3)
    })
  })

  describe('getOrCreateStyleElement', () => {
    afterEach(() => {
      const style = document.getElementById('test-style')
      style?.remove()
    })

    it('should create new style element', () => {
      const style = getOrCreateStyleElement('test-style')

      expect(style.tagName).toBe('STYLE')
      expect(style.id).toBe('test-style')
    })

    it('should return existing style element', () => {
      const first = getOrCreateStyleElement('test-style')
      const second = getOrCreateStyleElement('test-style')

      expect(first).toBe(second)
    })

    it('should append to document head', () => {
      const style = getOrCreateStyleElement('test-style')

      expect(document.head.contains(style)).toBe(true)
    })

    it('should set type attribute', () => {
      const style = getOrCreateStyleElement('test-style')

      expect(style.getAttribute('type')).toBe('text/css')
    })
  })

  describe('getFocusableElements', () => {
    it('should find links', () => {
      container.innerHTML = '<a href="#test">Link</a>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should find buttons', () => {
      container.innerHTML = '<button>Click</button>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should find inputs', () => {
      container.innerHTML = '<input type="text" />'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should find selects', () => {
      container.innerHTML = '<select><option>A</option></select>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should find textareas', () => {
      container.innerHTML = '<textarea></textarea>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should find elements with tabindex', () => {
      container.innerHTML = '<div tabindex="0">Focusable</div>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(1)
    })

    it('should exclude disabled elements', () => {
      container.innerHTML = '<button disabled>Disabled</button><input disabled />'
      const result = getFocusableElements(container)

      expect(result.length).toBe(0)
    })

    it('should exclude tabindex=-1 elements', () => {
      container.innerHTML = '<div tabindex="-1">Not focusable</div>'
      const result = getFocusableElements(container)

      expect(result.length).toBe(0)
    })
  })

  describe('trapFocus', () => {
    it('should focus first focusable element', () => {
      container.innerHTML = '<button id="first">First</button><button id="last">Last</button>'
      const first = container.querySelector('#first') as HTMLElement

      trapFocus(container)

      expect(document.activeElement).toBe(first)
    })

    it('should return cleanup function', () => {
      container.innerHTML = '<button>Button</button>'
      const cleanup = trapFocus(container)

      expect(typeof cleanup).toBe('function')
      cleanup()
    })

    it('should trap Tab to first element from last', () => {
      container.innerHTML = '<button id="first">First</button><button id="last">Last</button>'
      const first = container.querySelector('#first') as HTMLElement
      const last = container.querySelector('#last') as HTMLElement

      trapFocus(container)
      last.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      Object.defineProperty(event, 'preventDefault', { value: vi.fn() })
      container.dispatchEvent(event)

      expect(document.activeElement).toBe(first)
    })

    it('should trap Shift+Tab to last element from first', () => {
      container.innerHTML = '<button id="first">First</button><button id="last">Last</button>'
      const first = container.querySelector('#first') as HTMLElement
      const last = container.querySelector('#last') as HTMLElement

      trapFocus(container)
      first.focus()

      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
      Object.defineProperty(event, 'preventDefault', { value: vi.fn() })
      container.dispatchEvent(event)

      expect(document.activeElement).toBe(last)
    })

    it('should ignore non-Tab keys', () => {
      container.innerHTML = '<button id="first">First</button>'
      trapFocus(container)

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      const preventDefault = vi.fn()
      Object.defineProperty(event, 'preventDefault', { value: preventDefault })
      container.dispatchEvent(event)

      expect(preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('lockScroll', () => {
    it('should set body styles', () => {
      lockScroll()

      expect(document.body.style.overflow).toBe('hidden')
      expect(document.body.style.position).toBe('fixed')
    })

    it('should return cleanup function', () => {
      const cleanup = lockScroll()

      expect(typeof cleanup).toBe('function')
      cleanup()
    })

    it('should restore body styles on cleanup', () => {
      const originalOverflow = document.body.style.overflow
      const cleanup = lockScroll()

      cleanup()

      expect(document.body.style.overflow).toBe(originalOverflow)
    })
  })

  describe('isInViewport', () => {
    it('should return true for visible element', () => {
      const element = document.createElement('div')
      element.style.width = '100px'
      element.style.height = '100px'
      document.body.appendChild(element)

      // Mock getBoundingClientRect
      element.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      })

      expect(isInViewport(element)).toBe(true)

      element.remove()
    })

    it('should return false for element outside viewport', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      // Mock getBoundingClientRect
      element.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -100,
        left: -100,
        bottom: -50,
        right: -50,
      })

      expect(isInViewport(element)).toBe(false)

      element.remove()
    })
  })

  describe('setAttributes', () => {
    it('should set attributes', () => {
      const element = document.createElement('div')
      setAttributes(element, { id: 'test', class: 'my-class' })

      expect(element.id).toBe('test')
      expect(element.className).toBe('my-class')
    })

    it('should remove attribute when value is null', () => {
      const element = document.createElement('div')
      element.id = 'test'

      setAttributes(element, { id: null })

      expect(element.hasAttribute('id')).toBe(false)
    })
  })

  describe('setAriaAttributes', () => {
    it('should set aria attributes', () => {
      const element = document.createElement('div')
      setAriaAttributes(element, { expanded: 'true', label: 'Test' })

      expect(element.getAttribute('aria-expanded')).toBe('true')
      expect(element.getAttribute('aria-label')).toBe('Test')
    })

    it('should handle attributes already prefixed', () => {
      const element = document.createElement('div')
      setAriaAttributes(element, { 'aria-expanded': 'true' })

      expect(element.getAttribute('aria-expanded')).toBe('true')
    })

    it('should handle boolean true', () => {
      const element = document.createElement('div')
      setAriaAttributes(element, { expanded: true })

      expect(element.getAttribute('aria-expanded')).toBe('true')
    })

    it('should remove attribute when false', () => {
      const element = document.createElement('div')
      element.setAttribute('aria-expanded', 'true')

      setAriaAttributes(element, { expanded: false })

      expect(element.hasAttribute('aria-expanded')).toBe(false)
    })

    it('should remove attribute when null', () => {
      const element = document.createElement('div')
      element.setAttribute('aria-label', 'Test')

      setAriaAttributes(element, { label: null })

      expect(element.hasAttribute('aria-label')).toBe(false)
    })
  })

  describe('addEventListener', () => {
    it('should add event listener', () => {
      const handler = vi.fn()
      addEventListener(container, 'click', handler)

      container.click()

      expect(handler).toHaveBeenCalled()
    })

    it('should return cleanup function', () => {
      const handler = vi.fn()
      const cleanup = addEventListener(container, 'click', handler)

      cleanup()
      container.click()

      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('onDOMReady', () => {
    it('should call callback immediately when DOM is ready', () => {
      const callback = vi.fn()

      onDOMReady(callback)

      expect(callback).toHaveBeenCalled()
    })
  })

  describe('dispatchCustomEvent', () => {
    it('should dispatch custom event', () => {
      const handler = vi.fn()
      container.addEventListener('my-event', handler)

      dispatchCustomEvent(container, 'my-event')

      expect(handler).toHaveBeenCalled()
    })

    it('should include detail', () => {
      const handler = vi.fn()
      container.addEventListener('my-event', handler)

      dispatchCustomEvent(container, 'my-event', { foo: 'bar' })

      expect(handler.mock.calls[0][0].detail).toEqual({ foo: 'bar' })
    })
  })

  describe('getComputedStyleValue', () => {
    it('should return computed style value', () => {
      container.style.display = 'block'

      const result = getComputedStyleValue(container, 'display')

      expect(result).toBe('block')
    })
  })

  describe('cssSupports', () => {
    beforeEach(() => {
      // Mock CSS.supports for jsdom
      if (typeof CSS === 'undefined') {
        (globalThis as Record<string, unknown>).CSS = { supports: vi.fn().mockReturnValue(true) }
      } else if (!CSS.supports) {
        (CSS as Record<string, unknown>).supports = vi.fn().mockReturnValue(true)
      }
    })

    it('should check CSS support', () => {
      // Mock CSS.supports
      vi.spyOn(CSS, 'supports').mockReturnValue(true)
      expect(cssSupports('display', 'block')).toBe(true)
    })

    it('should return false for unsupported property', () => {
      vi.spyOn(CSS, 'supports').mockReturnValue(false)
      expect(cssSupports('fake-property', 'fake-value')).toBe(false)
    })
  })

  describe('modern CSS feature detection', () => {
    beforeEach(() => {
      // Mock CSS.supports for jsdom
      if (typeof CSS === 'undefined') {
        (globalThis as Record<string, unknown>).CSS = { supports: vi.fn().mockReturnValue(false) }
      } else if (!CSS.supports) {
        (CSS as Record<string, unknown>).supports = vi.fn().mockReturnValue(false)
      }
    })

    it('supportsAnchorPositioning should return boolean', () => {
      vi.spyOn(CSS, 'supports').mockReturnValue(false)
      expect(typeof supportsAnchorPositioning()).toBe('boolean')
    })

    it('supportsContainerQueries should return boolean', () => {
      vi.spyOn(CSS, 'supports').mockReturnValue(false)
      expect(typeof supportsContainerQueries()).toBe('boolean')
    })

    it('supportsHasSelector should return boolean', () => {
      expect(typeof supportsHasSelector()).toBe('boolean')
    })

    it('supportsScrollTimeline should return boolean', () => {
      vi.spyOn(CSS, 'supports').mockReturnValue(false)
      expect(typeof supportsScrollTimeline()).toBe('boolean')
    })

    it('supportsViewTransitions should return boolean', () => {
      expect(typeof supportsViewTransitions()).toBe('boolean')
    })
  })

  describe('getDataAttribute', () => {
    it('should get data attribute without prefix', () => {
      container.setAttribute('data-test', 'value')

      expect(getDataAttribute(container, 'test')).toBe('value')
    })

    it('should get data attribute with prefix', () => {
      container.setAttribute('data-test', 'value')

      expect(getDataAttribute(container, 'data-test')).toBe('value')
    })

    it('should return null when attribute not found', () => {
      expect(getDataAttribute(container, 'non-existent')).toBeNull()
    })
  })

  describe('setDataAttribute', () => {
    it('should set data attribute without prefix', () => {
      setDataAttribute(container, 'test', 'value')

      expect(container.getAttribute('data-test')).toBe('value')
    })

    it('should set data attribute with prefix', () => {
      setDataAttribute(container, 'data-test', 'value')

      expect(container.getAttribute('data-test')).toBe('value')
    })

    it('should remove attribute when value is null', () => {
      container.setAttribute('data-test', 'value')

      setDataAttribute(container, 'test', null)

      expect(container.hasAttribute('data-test')).toBe(false)
    })
  })

  describe('setFocusTrap and releaseFocusTrap', () => {
    it('should set focus trap', () => {
      container.innerHTML = '<button id="first">First</button>'
      const first = container.querySelector('#first') as HTMLElement

      setFocusTrap(container)

      expect(document.activeElement).toBe(first)
    })

    it('should return cleanup function', () => {
      container.innerHTML = '<button>Button</button>'
      const cleanup = setFocusTrap(container)

      expect(typeof cleanup).toBe('function')
      cleanup()
    })

    it('releaseFocusTrap should release trap', () => {
      container.innerHTML = '<button>Button</button>'
      setFocusTrap(container)

      // Should not throw
      expect(() => releaseFocusTrap(container)).not.toThrow()
    })

    it('releaseFocusTrap on non-trapped container should not throw', () => {
      expect(() => releaseFocusTrap(container)).not.toThrow()
    })
  })

  describe('setScrollLock and unlockScroll', () => {
    beforeEach(() => {
      // Reset body styles before each test
      document.body.style.cssText = ''
      unlockScroll() // Clear any existing lock
    })

    it('should lock scroll', () => {
      setScrollLock()

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should return cleanup function', () => {
      const cleanup = setScrollLock()

      expect(typeof cleanup).toBe('function')
      cleanup()
    })

    it('unlockScroll should unlock', () => {
      setScrollLock()
      expect(document.body.style.overflow).toBe('hidden')

      unlockScroll()

      // Body style should be restored
      expect(document.body.style.overflow).toBe('')
    })

    it('unlockScroll when not locked should not throw', () => {
      expect(() => unlockScroll()).not.toThrow()
    })
  })
})
