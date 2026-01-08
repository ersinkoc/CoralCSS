/**
 * Tooltip Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Tooltip, createTooltip } from '../../../src/components/tooltip'

describe('Tooltip Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    vi.useFakeTimers()
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe('initialization', () => {
    it('should create tooltip from element', () => {
      container.innerHTML = `
        <div id="test-tooltip" data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      expect(tooltip).toBeDefined()
      expect(tooltip.id).toBe('test-tooltip')
    })

    it('should create tooltip with factory function', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = createTooltip(element)

      expect(tooltip).toBeDefined()
    })

    it('should generate ID if not present', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      expect(element.id).toMatch(/^tooltip-/)
    })

    it('should apply default configuration', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      expect(tooltip.isOpen()).toBe(false)
    })

    it('should use title attribute as content', () => {
      container.innerHTML = '<button data-coral-tooltip title="Tooltip text">Trigger</button>'
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      const content = element.querySelector('[data-coral-tooltip-content]')
      expect(content).not.toBeNull()
      expect(content?.textContent).toBe('Tooltip text')
      expect(element.hasAttribute('title')).toBe(false)
    })

    it('should use element as trigger when no dedicated trigger', () => {
      container.innerHTML = '<button data-coral-tooltip title="Text">Trigger</button>'
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      // Show on mouseenter of the element itself
      element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true)
    })
  })

  describe('ARIA setup', () => {
    it('should set role=tooltip on content', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      const content = element.querySelector('[data-coral-tooltip-content]')
      expect(content?.getAttribute('role')).toBe('tooltip')
    })

    it('should set aria-describedby on trigger', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      const trigger = element.querySelector('[data-coral-tooltip-trigger]')
      const content = element.querySelector('[data-coral-tooltip-content]')
      expect(trigger?.getAttribute('aria-describedby')).toBe(content?.id)
    })

    it('should set hidden on content initially', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      const content = element.querySelector('[data-coral-tooltip-content]')
      expect(content?.hasAttribute('hidden')).toBe(true)
    })

    it('should generate content ID if not present', () => {
      container.innerHTML = `
        <div id="my-tooltip" data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      new Tooltip(element)

      const content = element.querySelector('[data-coral-tooltip-content]')
      expect(content?.id).toBe('my-tooltip-content')
    })
  })

  describe('hover trigger', () => {
    it('should show on mouseenter', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element)

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

      expect(tooltip.isOpen()).toBe(true)
    })

    it('should hide on mouseleave', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element)

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true)

      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(false)
    })

    it('should stay open when hovering content', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const content = element.querySelector<HTMLElement>('[data-coral-tooltip-content]')!
      const tooltip = new Tooltip(element, { hideDelay: 100 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))

      // Move to content before hide delay completes
      content.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

      vi.advanceTimersByTime(200)

      expect(tooltip.isOpen()).toBe(true)
    })
  })

  describe('focus trigger', () => {
    it('should show on focus', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element)

      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }))

      expect(tooltip.isOpen()).toBe(true)
    })

    it('should hide on blur', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element)

      trigger.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true)

      trigger.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(false)
    })
  })

  describe('click trigger', () => {
    it('should toggle on click', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { trigger: ['click'] })

      trigger.click()
      expect(tooltip.isOpen()).toBe(true)

      trigger.click()
      expect(tooltip.isOpen()).toBe(false)
    })

    it('should close on click outside', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
        <button id="outside">Outside</button>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { trigger: ['click'] })

      trigger.click()
      expect(tooltip.isOpen()).toBe(true)

      document.getElementById('outside')!.click()
      expect(tooltip.isOpen()).toBe(false)
    })
  })

  describe('escape key', () => {
    it('should close on Escape key', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element)

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true)

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      expect(tooltip.isOpen()).toBe(false)
    })
  })

  describe('delays', () => {
    it('should respect show delay', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { showDelay: 500 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(false)

      vi.advanceTimersByTime(500)
      expect(tooltip.isOpen()).toBe(true)
    })

    it('should respect hide delay', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { hideDelay: 500 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true)

      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      expect(tooltip.isOpen()).toBe(true) // Still open

      vi.advanceTimersByTime(500)
      expect(tooltip.isOpen()).toBe(false)
    })

    it('should cancel show on hide', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { showDelay: 500 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      vi.advanceTimersByTime(250) // Half way

      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      vi.advanceTimersByTime(500) // Past show delay

      expect(tooltip.isOpen()).toBe(false)
    })

    it('should cancel hide on show', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { hideDelay: 500 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      vi.advanceTimersByTime(250) // Half way

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      vi.advanceTimersByTime(500) // Past hide delay

      expect(tooltip.isOpen()).toBe(true)
    })
  })

  describe('render updates', () => {
    it('should remove hidden and add data-open when shown', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const content = element.querySelector<HTMLElement>('[data-coral-tooltip-content]')!
      const tooltip = new Tooltip(element)

      tooltip.show()

      expect(content.hasAttribute('hidden')).toBe(false)
      expect(content.hasAttribute('data-open')).toBe(true)
      expect(element.hasAttribute('data-open')).toBe(true)
    })

    it('should add hidden and remove data-open when hidden', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const content = element.querySelector<HTMLElement>('[data-coral-tooltip-content]')!
      const tooltip = new Tooltip(element)

      tooltip.show()
      tooltip.hide()

      expect(content.hasAttribute('hidden')).toBe(true)
      expect(content.hasAttribute('data-open')).toBe(false)
      expect(element.hasAttribute('data-open')).toBe(false)
    })

    it('should set data-placement on content', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const content = element.querySelector<HTMLElement>('[data-coral-tooltip-content]')!
      const tooltip = new Tooltip(element, { placement: 'bottom' })

      tooltip.show()

      expect(content.getAttribute('data-placement')).toBe('bottom')
    })
  })

  describe('setContent', () => {
    it('should update tooltip content', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Original</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const content = element.querySelector<HTMLElement>('[data-coral-tooltip-content]')!
      const tooltip = new Tooltip(element)

      tooltip.setContent('Updated')

      expect(content.textContent).toBe('Updated')
    })
  })

  describe('events', () => {
    it('should dispatch show event', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      const listener = vi.fn()
      element.addEventListener('coral:tooltip:show', listener)

      tooltip.show()

      expect(listener).toHaveBeenCalled()
    })

    it('should dispatch hide event', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      const listener = vi.fn()
      element.addEventListener('coral:tooltip:hide', listener)

      tooltip.show()
      tooltip.hide()

      expect(listener).toHaveBeenCalled()
    })
  })

  describe('destroy', () => {
    it('should restore title attribute', () => {
      container.innerHTML = '<button data-coral-tooltip title="Tooltip text">Trigger</button>'
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      expect(element.hasAttribute('title')).toBe(false)

      tooltip.destroy()

      expect(element.getAttribute('title')).toBe('Tooltip text')
    })

    it('should clear timeouts', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const trigger = element.querySelector<HTMLElement>('[data-coral-tooltip-trigger]')!
      const tooltip = new Tooltip(element, { showDelay: 1000 })

      trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

      tooltip.destroy()

      vi.advanceTimersByTime(1000)
      // No error should occur
    })
  })

  describe('edge cases', () => {
    it('should not show twice', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      const listener = vi.fn()
      element.addEventListener('coral:tooltip:show', listener)

      tooltip.show()
      tooltip.show() // Second show should be ignored

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should not hide twice', () => {
      container.innerHTML = `
        <div data-coral-tooltip>
          <button data-coral-tooltip-trigger>Trigger</button>
          <div data-coral-tooltip-content>Content</div>
        </div>
      `
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!
      const tooltip = new Tooltip(element)

      const listener = vi.fn()
      element.addEventListener('coral:tooltip:hide', listener)

      tooltip.show()
      tooltip.hide()
      tooltip.hide() // Second hide should be ignored

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should handle no trigger element', () => {
      container.innerHTML = '<div data-coral-tooltip></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-tooltip]')!

      // Should not throw
      expect(() => new Tooltip(element)).not.toThrow()
    })
  })
})
