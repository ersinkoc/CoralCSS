/**
 * Input Component Tests
 * @vitest-environment jsdom
 *
 * Security Note: innerHTML usage in tests is safe - we're setting up test DOM with
 * hardcoded static strings, not processing untrusted user input.
 *
 * Note: Some tests are limited due to jsdom environment constraints and
 * the Input component's internal reference handling.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Input, createInput } from '../../../src/components/input'

describe('Input Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create input from element', () => {
      container.innerHTML = '<div id="test-input" data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input).toBeDefined()
      expect(input.id).toBe('test-input')
    })

    it('should create input with factory function', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = createInput(element)

      expect(input).toBeDefined()
    })

    it('should generate ID if not present', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element)

      expect(element.id).toMatch(/^input-/)
    })

    it('should read initial value from input', () => {
      container.innerHTML = '<div data-coral-input><input type="text" value="initial value" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.getValue()).toBe('initial value')
    })

    it('should apply default configuration', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)
      const state = input.getState()

      expect(state.focused).toBe(false)
      expect(state.touched).toBe(false)
      expect(state.valid).toBe(true)
    })

    it('should initialize with empty value', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.getValue()).toBe('')
    })
  })

  describe('ARIA setup', () => {
    it('should set aria-required when required', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element, { required: true })
      const inputEl = element.querySelector('input')!

      expect(inputEl.getAttribute('aria-required')).toBe('true')
    })

    it('should link description with aria-describedby', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /><span data-coral-input-description>Help text</span></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element)
      const inputEl = element.querySelector('input')!
      const description = element.querySelector('[data-coral-input-description]')!

      expect(inputEl.getAttribute('aria-describedby')).toBe(description.id)
    })

    it('should set up error element with ID', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /><span data-coral-input-error></span></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element)
      const error = element.querySelector('[data-coral-input-error]')!

      expect(error.id).toContain('error')
    })
  })

  describe('initial state', () => {
    it('should read initial value correctly', () => {
      container.innerHTML = '<div data-coral-input><input type="text" value="test" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.getValue()).toBe('test')
    })

    it('should initialize focused state as false', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.getState().focused).toBe(false)
    })

    it('should initialize touched state as false', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.getState().touched).toBe(false)
    })

    it('should initialize valid state as true', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)

      expect(input.isValid()).toBe(true)
    })
  })

  describe('focus state tracking', () => {
    it('should track focus state via events', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)
      const inputEl = element.querySelector('input')!

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }))

      expect(input.getState().focused).toBe(true)
    })

    it('should track blur state and mark touched', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element)
      const inputEl = element.querySelector('input')!

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
      inputEl.dispatchEvent(new FocusEvent('blur', { bubbles: true }))

      expect(input.getState().focused).toBe(false)
      expect(input.getState().touched).toBe(true)
    })

    it('should set data-state to focused when focused', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element)
      const inputEl = element.querySelector('input')!

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }))

      expect(element.dataset.state).toBe('focused')
    })

    it('should set data-state to default when blurred', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element)
      const inputEl = element.querySelector('input')!

      inputEl.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
      inputEl.dispatchEvent(new FocusEvent('blur', { bubbles: true }))

      expect(element.dataset.state).toBe('default')
    })
  })

  describe('component config', () => {
    it('should accept type config', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element, { type: 'email' })

      expect(input).toBeDefined()
    })

    it('should accept disabled config', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      const input = new Input(element, { disabled: true })

      expect(input.getState().disabled).toBe(true)
    })

    it('should accept required config', () => {
      container.innerHTML = '<div data-coral-input><input type="text" /></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-input]')!
      new Input(element, { required: true })
      const inputEl = element.querySelector('input')!

      expect(inputEl.getAttribute('aria-required')).toBe('true')
    })
  })
})
