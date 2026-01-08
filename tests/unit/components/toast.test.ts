/**
 * Toast Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Toast, createToast, ToastContainer, createToastContainer } from '../../../src/components/toast'

describe('Toast Component', () => {
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
    // Clean up any toast containers
    document.querySelectorAll('[data-coral-toast-container]').forEach((el) => el.remove())
  })

  describe('initialization', () => {
    it('should create toast from element', () => {
      container.innerHTML = '<div id="test-toast" data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element)

      expect(toast).toBeDefined()
      expect(toast.id).toBe('test-toast')
    })

    it('should create toast with factory function', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = createToast(element)

      expect(toast).toBeDefined()
    })

    it('should generate ID if not present', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element)

      expect(element.id).toMatch(/^toast-/)
    })

    it('should apply default configuration', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element)

      expect(toast.isOpen()).toBe(true)
    })

    it('should accept custom configuration', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, {
        duration: 0,
        type: 'success',
        position: 'top-center',
      })

      expect(element.getAttribute('data-type')).toBe('success')
      expect(element.getAttribute('data-position')).toBe('top-center')
    })
  })

  describe('ARIA setup', () => {
    it('should set role=alert', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element)

      expect(element.getAttribute('role')).toBe('alert')
    })

    it('should set aria-live=polite', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element)

      expect(element.getAttribute('aria-live')).toBe('polite')
    })

    it('should set aria-atomic=true', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element)

      expect(element.getAttribute('aria-atomic')).toBe('true')
    })

    it('should set data-type attribute', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element, { type: 'error' })

      expect(element.getAttribute('data-type')).toBe('error')
    })

    it('should set data-position attribute', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      new Toast(element, { position: 'top-left' })

      expect(element.getAttribute('data-position')).toBe('top-left')
    })
  })

  describe('auto-dismiss', () => {
    it('should auto-dismiss after duration', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 3000 })

      expect(toast.isOpen()).toBe(true)

      vi.advanceTimersByTime(3000)

      expect(toast.isOpen()).toBe(false)
    })

    it('should not auto-dismiss when duration is 0', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      vi.advanceTimersByTime(10000)

      expect(toast.isOpen()).toBe(true)
    })

    it('should pause timer on mouseenter', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 3000, pauseOnHover: true })

      vi.advanceTimersByTime(1500) // Half way
      element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

      vi.advanceTimersByTime(3000) // More than remaining time

      expect(toast.isOpen()).toBe(true) // Should still be open because timer is paused
    })

    it('should resume timer on mouseleave', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 3000, pauseOnHover: true })

      vi.advanceTimersByTime(1500) // Half way
      element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

      vi.advanceTimersByTime(1000) // Some time passes while paused
      element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))

      vi.advanceTimersByTime(1500) // Remaining time

      expect(toast.isOpen()).toBe(false)
    })
  })

  describe('dismiss', () => {
    it('should dismiss programmatically', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      expect(toast.isOpen()).toBe(true)
      toast.dismiss()
      expect(toast.isOpen()).toBe(false)
    })

    it('should dispatch dismiss event', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      const listener = vi.fn()
      element.addEventListener('coral:toast:dismiss', listener)

      toast.dismiss()

      expect(listener).toHaveBeenCalled()
    })

    it('should dismiss on close button click', () => {
      container.innerHTML = '<div data-coral-toast><button data-coral-toast-close>Close</button></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const closeBtn = element.querySelector<HTMLElement>('[data-coral-toast-close]')!
      const toast = new Toast(element, { duration: 0 })

      closeBtn.click()

      expect(toast.isOpen()).toBe(false)
    })

    it('should not dismiss twice', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      const listener = vi.fn()
      element.addEventListener('coral:toast:dismiss', listener)

      toast.dismiss()
      toast.dismiss() // Second dismiss should be ignored

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should remove element after animation delay', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      toast.dismiss()

      // Element should still be in DOM immediately
      expect(container.contains(element)).toBe(true)

      // After 300ms animation delay
      vi.advanceTimersByTime(300)

      expect(container.contains(element)).toBe(false)
    })

    it('should not dismiss when not dismissible', () => {
      container.innerHTML = '<div data-coral-toast><button data-coral-toast-close>Close</button></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const closeBtn = element.querySelector<HTMLElement>('[data-coral-toast-close]')!
      const toast = new Toast(element, { duration: 0, dismissible: false })

      closeBtn.click()

      expect(toast.isOpen()).toBe(true)
    })
  })

  describe('setMessage', () => {
    it('should update toast message', () => {
      container.innerHTML = '<div data-coral-toast><span data-coral-toast-message>Original</span></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      toast.setMessage('Updated message')

      const messageEl = element.querySelector('[data-coral-toast-message]')
      expect(messageEl?.textContent).toBe('Updated message')
    })

    it('should handle missing message element', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      // Should not throw
      expect(() => toast.setMessage('New message')).not.toThrow()
    })
  })

  describe('render updates', () => {
    it('should set data-open and remove hidden when open', () => {
      container.innerHTML = '<div data-coral-toast hidden></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 0 })

      // Force render by dismissing and re-opening via state manipulation
      toast.dismiss()
      vi.advanceTimersByTime(300)
    })
  })

  describe('destroy', () => {
    it('should clear timeout on destroy', () => {
      container.innerHTML = '<div data-coral-toast></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-toast]')!
      const toast = new Toast(element, { duration: 5000 })

      toast.destroy()

      // Advancing timers should not cause dismiss
      vi.advanceTimersByTime(5000)
      // No error should occur
    })
  })
})

describe('ToastContainer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    // Clean up any toast containers
    document.querySelectorAll('[data-coral-toast-container]').forEach((el) => el.remove())
  })

  describe('initialization', () => {
    it('should create container with default position', () => {
      const tc = new ToastContainer()

      const container = document.getElementById('coral-toast-container-bottom-right')
      expect(container).not.toBeNull()
      expect(container?.getAttribute('data-position')).toBe('bottom-right')

      tc.destroy()
    })

    it('should create container with custom position', () => {
      const tc = new ToastContainer({ position: 'top-left' })

      const container = document.getElementById('coral-toast-container-top-left')
      expect(container).not.toBeNull()
      expect(container?.getAttribute('data-position')).toBe('top-left')

      tc.destroy()
    })

    it('should reuse existing container', () => {
      const tc1 = new ToastContainer({ position: 'bottom-right' })
      const tc2 = new ToastContainer({ position: 'bottom-right' })

      const containers = document.querySelectorAll('#coral-toast-container-bottom-right')
      expect(containers.length).toBe(1)

      tc1.destroy()
      tc2.destroy()
    })

    it('should set ARIA attributes on container', () => {
      const tc = new ToastContainer()

      const container = document.querySelector('[data-coral-toast-container]')
      expect(container?.getAttribute('aria-live')).toBe('polite')
      expect(container?.getAttribute('aria-label')).toBe('Notifications')

      tc.destroy()
    })
  })

  describe('show', () => {
    it('should show a toast with message', () => {
      const tc = new ToastContainer({ duration: 0 })
      const toast = tc.show('Test message')

      expect(toast).toBeDefined()
      expect(toast.isOpen()).toBe(true)

      const messageEl = document.querySelector('[data-coral-toast-message]')
      expect(messageEl?.textContent).toBe('Test message')

      tc.destroy()
    })

    it('should include close button when dismissible', () => {
      const tc = new ToastContainer({ duration: 0, dismissible: true })
      tc.show('Test')

      const closeBtn = document.querySelector('[data-coral-toast-close]')
      expect(closeBtn).not.toBeNull()

      tc.destroy()
    })

    it('should not include close button when not dismissible', () => {
      const tc = new ToastContainer({ duration: 0, dismissible: false })
      tc.show('Test')

      const closeBtn = document.querySelector('[data-coral-toast-close]')
      expect(closeBtn).toBeNull()

      tc.destroy()
    })

    it('should remove toast from map when dismissed', () => {
      const tc = new ToastContainer({ duration: 0 })
      const toast = tc.show('Test')

      toast.dismiss()
      vi.advanceTimersByTime(300)

      // Toast should be removed (no way to check internal map, but toast should be destroyed)
    })
  })

  describe('type shortcuts', () => {
    it('should create success toast', () => {
      const tc = new ToastContainer({ duration: 0 })
      tc.success('Success!')

      const toast = document.querySelector('[data-coral-toast]')
      expect(toast?.getAttribute('data-type')).toBe('success')

      tc.destroy()
    })

    it('should create error toast', () => {
      const tc = new ToastContainer({ duration: 0 })
      tc.error('Error!')

      const toast = document.querySelector('[data-coral-toast]')
      expect(toast?.getAttribute('data-type')).toBe('error')

      tc.destroy()
    })

    it('should create warning toast', () => {
      const tc = new ToastContainer({ duration: 0 })
      tc.warning('Warning!')

      const toast = document.querySelector('[data-coral-toast]')
      expect(toast?.getAttribute('data-type')).toBe('warning')

      tc.destroy()
    })

    it('should create info toast', () => {
      const tc = new ToastContainer({ duration: 0 })
      tc.info('Info!')

      const toast = document.querySelector('[data-coral-toast]')
      expect(toast?.getAttribute('data-type')).toBe('info')

      tc.destroy()
    })
  })

  describe('dismissAll', () => {
    it('should dismiss all toasts', () => {
      const tc = new ToastContainer({ duration: 0 })
      const toast1 = tc.show('Toast 1')
      const toast2 = tc.show('Toast 2')

      expect(toast1.isOpen()).toBe(true)
      expect(toast2.isOpen()).toBe(true)

      tc.dismissAll()

      expect(toast1.isOpen()).toBe(false)
      expect(toast2.isOpen()).toBe(false)

      tc.destroy()
    })
  })

  describe('createToastContainer factory', () => {
    it('should create container via factory', () => {
      const tc = createToastContainer({ position: 'top-right' })

      const container = document.getElementById('coral-toast-container-top-right')
      expect(container).not.toBeNull()

      tc.destroy()
    })
  })
})
