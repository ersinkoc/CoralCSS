/**
 * Switch Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Switch, createSwitch } from '../../../src/components/switch'

describe('Switch Component', () => {
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
    it('should create switch from element', () => {
      container.innerHTML = '<button id="test-switch" data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(switchEl).toBeDefined()
      expect(switchEl.id).toBe('test-switch')
    })

    it('should create switch with factory function', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = createSwitch(element)

      expect(switchEl).toBeDefined()
    })

    it('should generate ID if not present', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.id).toMatch(/^switch-/)
    })

    it('should apply default configuration', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(switchEl.isChecked()).toBe(false)
    })

    it('should accept custom configuration', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, {
        defaultChecked: true,
        disabled: true,
      })

      expect(switchEl.isChecked()).toBe(true)
    })

    it('should read initial state from aria-checked when defaultChecked is undefined', () => {
      container.innerHTML = '<button data-coral-switch aria-checked="true"></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      // Pass undefined explicitly to allow attribute reading
      const switchEl = new Switch(element, { defaultChecked: undefined })

      expect(switchEl.isChecked()).toBe(true)
    })

    it('should read initial state from data-checked when defaultChecked is undefined', () => {
      container.innerHTML = '<button data-coral-switch data-checked></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      // Pass undefined explicitly to allow attribute reading
      const switchEl = new Switch(element, { defaultChecked: undefined })

      expect(switchEl.isChecked()).toBe(true)
    })

    it('should read initial disabled state from disabled attribute when disabled is undefined', () => {
      container.innerHTML = '<button data-coral-switch disabled></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      // Pass undefined explicitly to allow attribute reading
      const switchEl = new Switch(element, { disabled: undefined })

      expect((switchEl.getState() as { disabled: boolean }).disabled).toBe(true)
    })
  })

  describe('ARIA setup', () => {
    it('should set role=switch if not present', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.getAttribute('role')).toBe('switch')
    })

    it('should not override existing role', () => {
      container.innerHTML = '<button data-coral-switch role="checkbox"></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.getAttribute('role')).toBe('checkbox')
    })

    it('should set aria-checked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.getAttribute('aria-checked')).toBe('false')
    })

    it('should set tabindex if not present', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.getAttribute('tabindex')).toBe('0')
    })

    it('should not override existing tabindex', () => {
      container.innerHTML = '<button data-coral-switch tabindex="-1"></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      expect(element.getAttribute('tabindex')).toBe('-1')
    })

    it('should set aria-disabled when disabled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element, { disabled: true })

      expect(element.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('hidden input for forms', () => {
    it('should create hidden input when name is provided', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element, { name: 'feature-toggle' })

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')
      expect(input).toBeDefined()
      expect(input?.name).toBe('feature-toggle')
    })

    it('should set hidden input value when checked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element, { name: 'feature-toggle', defaultChecked: true })

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')
      expect(input?.value).toBe('on')
    })

    it('should set empty value when not checked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element, { name: 'feature-toggle' })

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')
      expect(input?.value).toBe('')
    })

    it('should use custom value when provided', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element, { name: 'feature', defaultChecked: true, value: 'enabled' })

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')
      expect(input?.value).toBe('enabled')
    })

    it('should not create hidden input when name is not provided', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      new Switch(element)

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')
      expect(input).toBeNull()
    })
  })

  describe('toggle operations', () => {
    it('should toggle from unchecked to checked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(switchEl.isChecked()).toBe(false)
      switchEl.toggle()
      expect(switchEl.isChecked()).toBe(true)
    })

    it('should toggle from checked to unchecked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { defaultChecked: true })

      expect(switchEl.isChecked()).toBe(true)
      switchEl.toggle()
      expect(switchEl.isChecked()).toBe(false)
    })

    it('should set checked state programmatically', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      switchEl.setChecked(true)
      expect(switchEl.isChecked()).toBe(true)
    })

    it('should not change if setting same checked state', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { defaultChecked: true })

      const listener = vi.fn()
      element.addEventListener('coral:switch:change', listener)

      switchEl.setChecked(true) // Already checked
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('should set disabled state', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      switchEl.setDisabled(true)
      expect((switchEl.getState() as { disabled: boolean }).disabled).toBe(true)
    })

    it('should not change if setting same disabled state', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { disabled: true })

      const initialState = switchEl.getState()
      switchEl.setDisabled(true) // Already disabled
      expect(switchEl.getState()).toEqual(initialState)
    })
  })

  describe('click events', () => {
    it('should toggle on click', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(switchEl.isChecked()).toBe(false)
      element.click()
      expect(switchEl.isChecked()).toBe(true)
    })

    it('should not toggle on click when disabled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { disabled: true })

      expect(switchEl.isChecked()).toBe(false)
      element.click()
      expect(switchEl.isChecked()).toBe(false)
    })
  })

  describe('keyboard events', () => {
    it('should toggle on Enter key', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      element.dispatchEvent(event)
      expect(switchEl.isChecked()).toBe(true)
    })

    it('should toggle on Space key', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true })
      element.dispatchEvent(event)
      expect(switchEl.isChecked()).toBe(true)
    })

    it('should not toggle on Enter when disabled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { disabled: true })

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      element.dispatchEvent(event)
      expect(switchEl.isChecked()).toBe(false)
    })

    it('should not toggle on Space when disabled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { disabled: true })

      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true })
      element.dispatchEvent(event)
      expect(switchEl.isChecked()).toBe(false)
    })

    it('should not toggle on other keys', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      element.dispatchEvent(event)
      expect(switchEl.isChecked()).toBe(false)
    })
  })

  describe('render updates', () => {
    it('should update aria-checked when toggled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(element.getAttribute('aria-checked')).toBe('false')
      switchEl.setChecked(true)
      expect(element.getAttribute('aria-checked')).toBe('true')
    })

    it('should add data-checked attribute when checked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      expect(element.hasAttribute('data-checked')).toBe(false)
      switchEl.setChecked(true)
      expect(element.hasAttribute('data-checked')).toBe(true)
    })

    it('should remove data-checked attribute when unchecked', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      // First, set checked to add the attribute (render is only called on state change)
      switchEl.setChecked(true)
      expect(element.hasAttribute('data-checked')).toBe(true)

      // Then uncheck to remove it
      switchEl.setChecked(false)
      expect(element.hasAttribute('data-checked')).toBe(false)
    })

    it('should update aria-disabled and data-disabled when disabled changes', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      switchEl.setDisabled(true)
      expect(element.getAttribute('aria-disabled')).toBe('true')
      expect(element.hasAttribute('data-disabled')).toBe(true)

      switchEl.setDisabled(false)
      expect(element.hasAttribute('aria-disabled')).toBe(false)
      expect(element.hasAttribute('data-disabled')).toBe(false)
    })

    it('should update hidden input value when toggled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element, { name: 'feature' })

      const input = element.querySelector<HTMLInputElement>('input[type="hidden"]')!
      expect(input.value).toBe('')

      switchEl.setChecked(true)
      expect(input.value).toBe('on')

      switchEl.setChecked(false)
      expect(input.value).toBe('')
    })
  })

  describe('events', () => {
    it('should dispatch change event when toggled', () => {
      container.innerHTML = '<button data-coral-switch></button>'
      const element = container.querySelector<HTMLElement>('[data-coral-switch]')!
      const switchEl = new Switch(element)

      const listener = vi.fn()
      element.addEventListener('coral:switch:change', listener)

      switchEl.toggle()

      expect(listener).toHaveBeenCalled()
      expect(listener.mock.calls[0][0].detail).toEqual({ checked: true })
    })
  })
})
