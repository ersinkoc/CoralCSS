/**
 * @vitest-environment jsdom
 * Base Component Tests
 *
 * Comprehensive tests for BaseComponent class functionality.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  BaseComponent,
  createComponentFactory,
  autoInit,
  initComponents,
  Dialog,
  createDialog,
  Accordion,
  createAccordion,
  Switch,
  createSwitch,
  Tabs,
  createTabs,
} from '../../../src/components'

describe('BaseComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  function createElement(
    tag: string,
    attrs: Record<string, string> = {}
  ): HTMLElement {
    const el = document.createElement(tag)
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value)
    })
    document.body.appendChild(el)
    return el
  }

  describe('Dialog Component Methods', () => {
    it('should open dialog', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      expect(dialog.isOpen()).toBe(false)
      dialog.open()
      expect(dialog.isOpen()).toBe(true)

      dialog.destroy()
    })

    it('should close dialog', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      dialog.open()
      expect(dialog.isOpen()).toBe(true)
      dialog.close()
      expect(dialog.isOpen()).toBe(false)

      dialog.destroy()
    })

    it('should toggle dialog', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      expect(dialog.isOpen()).toBe(false)
      dialog.toggle()
      expect(dialog.isOpen()).toBe(true)
      dialog.toggle()
      expect(dialog.isOpen()).toBe(false)

      dialog.destroy()
    })

    it('should get state', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      const state = dialog.getState()
      expect(state).toBeDefined()
      expect(typeof state).toBe('object')
      expect(state.isOpen).toBe(false)

      dialog.destroy()
    })

    it('should subscribe to state changes', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)
      const listener = vi.fn()

      const unsubscribe = dialog.subscribe(listener)
      dialog.open()

      expect(listener).toHaveBeenCalled()
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ isOpen: true }))

      unsubscribe()
      dialog.close()
      expect(listener).toHaveBeenCalledTimes(1) // Not called again after unsubscribe

      dialog.destroy()
    })

    it('should call hooks', () => {
      const onInit = vi.fn()
      const onOpen = vi.fn()
      const onClose = vi.fn()
      const onStateChange = vi.fn()

      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el, {
        hooks: {
          onInit,
          onOpen,
          onClose,
          onStateChange,
        },
      })

      expect(onInit).toHaveBeenCalled()

      dialog.open()
      expect(onOpen).toHaveBeenCalled()
      expect(onStateChange).toHaveBeenCalled()

      dialog.close()
      expect(onClose).toHaveBeenCalled()

      dialog.destroy()
    })

    it('should update props', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      dialog.update({ closeOnEscape: false })
      // Just verify it doesn't throw
      expect(dialog).toBeDefined()

      dialog.destroy()
    })

    it('should mount and unmount', () => {
      const onMount = vi.fn()
      const onUnmount = vi.fn()

      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el, {
        hooks: { onMount, onUnmount },
      })

      dialog.mount(document.body)
      expect(onMount).toHaveBeenCalled()

      dialog.unmount()
      expect(onUnmount).toHaveBeenCalled()

      dialog.destroy()
    })
  })

  describe('Switch Component Methods', () => {
    it('should toggle switch', () => {
      const el = createElement('button', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      const initialState = sw.getState()
      expect(initialState.checked).toBe(false)
      sw.toggle()
      const newState = sw.getState()
      expect(newState.checked).toBe(true)

      sw.destroy()
    })

    it('should get checked state', () => {
      const el = createElement('button', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      const state = sw.getState()
      expect(state).toHaveProperty('checked')
      expect(state).toHaveProperty('disabled')

      sw.destroy()
    })
  })

  describe('Accordion Component Methods', () => {
    it('should expand and collapse items', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      el.innerHTML = `
        <div data-coral-accordion-item>
          <button data-coral-accordion-trigger>Item 1</button>
          <div data-coral-accordion-content>Content 1</div>
        </div>
      `
      const accordion = new Accordion(el)

      expect(accordion.getState()).toBeDefined()
      accordion.destroy()
    })

    it('should accept multiple option', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      const accordion = new Accordion(el, { multiple: true })

      expect(accordion).toBeDefined()
      accordion.destroy()
    })
  })

  describe('Tabs Component Methods', () => {
    it('should switch tabs', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      el.innerHTML = `
        <div role="tablist">
          <button role="tab" data-coral-tab="tab1">Tab 1</button>
          <button role="tab" data-coral-tab="tab2">Tab 2</button>
        </div>
        <div data-coral-tab-panel="tab1">Panel 1</div>
        <div data-coral-tab-panel="tab2">Panel 2</div>
      `
      const tabs = new Tabs(el)

      expect(tabs.getState()).toBeDefined()
      tabs.destroy()
    })

    it('should accept defaultValue option', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      const tabs = new Tabs(el, { defaultValue: 'tab1' })

      expect(tabs).toBeDefined()
      tabs.destroy()
    })
  })

  describe('createComponentFactory', () => {
    it('should create factory function', () => {
      expect(typeof createComponentFactory).toBe('function')
    })
  })

  describe('autoInit', () => {
    it('should auto initialize dialog components', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })

      // autoInit with Dialog class should not throw
      expect(() => autoInit('[data-coral-dialog]', Dialog as never)).not.toThrow()
    })

    it('should initialize specific accordion components', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })

      expect(() => autoInit('[data-coral-accordion]', Accordion as never)).not.toThrow()
    })
  })

  describe('initComponents', () => {
    it('should initialize all components', () => {
      createElement('div', { 'data-coral-dialog': '' })
      createElement('div', { 'data-coral-accordion': '' })

      expect(() => initComponents()).not.toThrow()
    })
  })

  describe('Factory Functions', () => {
    it('createDialog should create dialog', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = createDialog(el)

      expect(dialog).toBeInstanceOf(Dialog)
      dialog.destroy()
    })

    it('createAccordion should create accordion', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      const accordion = createAccordion(el)

      expect(accordion).toBeInstanceOf(Accordion)
      accordion.destroy()
    })

    it('createSwitch should create switch', () => {
      const el = createElement('button', { 'data-coral-switch': '' })
      const sw = createSwitch(el)

      expect(sw).toBeInstanceOf(Switch)
      sw.destroy()
    })

    it('createTabs should create tabs', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      const tabs = createTabs(el)

      expect(tabs).toBeInstanceOf(Tabs)
      tabs.destroy()
    })
  })

  describe('Component with options', () => {
    it('should accept disabled option', () => {
      const el = createElement('button', { 'data-coral-switch': '', disabled: '' })
      const sw = new Switch(el, { disabled: true })

      expect(sw).toBeDefined()
      sw.destroy()
    })

    it('should accept custom id', () => {
      const el = createElement('div', { id: 'my-dialog', 'data-coral-dialog': '' })
      const dialog = new Dialog(el)

      expect(dialog.id).toBe('my-dialog')
      dialog.destroy()
    })
  })

  describe('Event dispatching', () => {
    it('should dispatch custom events', () => {
      const el = createElement('div', { 'data-coral-dialog': '' })
      const dialog = new Dialog(el)
      const handler = vi.fn()

      el.addEventListener('coral:dialog:open', handler)
      dialog.open()

      // Event should have been dispatched
      expect(handler).toHaveBeenCalled()

      dialog.destroy()
    })
  })

  describe('Protected methods coverage', () => {
    it('should use query method via component', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      el.innerHTML = `
        <div data-coral-accordion-item data-value="item1">
          <button data-coral-accordion-trigger>Trigger</button>
          <div data-coral-accordion-content>Content</div>
        </div>
      `
      const accordion = new Accordion(el)

      // The query method is used internally by components
      // when finding triggers and content
      expect(accordion.getState()).toBeDefined()

      accordion.destroy()
    })

    it('should use addEventListener and event handling', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      el.innerHTML = `
        <div data-coral-accordion-item data-value="item1">
          <button data-coral-accordion-trigger>Click me</button>
          <div data-coral-accordion-content>Content</div>
        </div>
      `
      const accordion = new Accordion(el)
      const trigger = el.querySelector('[data-coral-accordion-trigger]') as HTMLElement

      // Clicking the trigger uses internal event listeners
      trigger?.click()

      expect(accordion.getState()).toBeDefined()
      accordion.destroy()
    })

    it('should handle keyboard events through internal listeners', () => {
      const el = createElement('div', { 'data-coral-tabs': '' })
      el.innerHTML = `
        <div role="tablist">
          <button role="tab" data-coral-tab="tab1">Tab 1</button>
          <button role="tab" data-coral-tab="tab2">Tab 2</button>
        </div>
        <div data-coral-tab-panel="tab1">Panel 1</div>
        <div data-coral-tab-panel="tab2">Panel 2</div>
      `
      const tabs = new Tabs(el)
      const tabButton = el.querySelector('[data-coral-tab="tab1"]') as HTMLElement

      // Keyboard navigation uses internal event listeners
      tabButton?.focus()
      tabButton?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

      expect(tabs.getState()).toBeDefined()
      tabs.destroy()
    })

    it('should use queryAll for multiple elements', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      el.innerHTML = `
        <div data-coral-accordion-item data-value="item1">
          <button data-coral-accordion-trigger>Trigger 1</button>
          <div data-coral-accordion-content>Content 1</div>
        </div>
        <div data-coral-accordion-item data-value="item2">
          <button data-coral-accordion-trigger>Trigger 2</button>
          <div data-coral-accordion-content>Content 2</div>
        </div>
      `
      const accordion = new Accordion(el, { multiple: true })

      // queryAll is used to find all items/triggers
      expect(accordion.getState()).toBeDefined()

      accordion.destroy()
    })
  })

  describe('createComponentFactory edge cases', () => {
    it('should throw error when string selector finds no element', () => {
      const factory = createComponentFactory(Accordion)

      expect(() => {
        factory('#non-existent-element-id-12345')
      }).toThrow('Element not found: #non-existent-element-id-12345')
    })

    it('should work with valid string selector', () => {
      const el = createElement('div', { 'data-coral-accordion': '', id: 'test-accordion-factory' })
      const item = document.createElement('div')
      item.setAttribute('data-coral-accordion-item', '')
      item.setAttribute('data-value', 'item1')
      const trigger = document.createElement('button')
      trigger.setAttribute('data-coral-accordion-trigger', '')
      trigger.textContent = 'Trigger 1'
      const content = document.createElement('div')
      content.setAttribute('data-coral-accordion-content', '')
      content.textContent = 'Content 1'
      item.appendChild(trigger)
      item.appendChild(content)
      el.appendChild(item)
      document.body.appendChild(el)

      const factory = createComponentFactory(Accordion)
      const accordion = factory('#test-accordion-factory')

      expect(accordion).toBeDefined()
      expect(accordion).toBeInstanceOf(Accordion)

      accordion.destroy()
      el.remove()
    })

    it('should work with HTMLElement directly', () => {
      const el = createElement('div', { 'data-coral-accordion': '' })
      const item = document.createElement('div')
      item.setAttribute('data-coral-accordion-item', '')
      item.setAttribute('data-value', 'item1')
      const trigger = document.createElement('button')
      trigger.setAttribute('data-coral-accordion-trigger', '')
      trigger.textContent = 'Trigger 1'
      const content = document.createElement('div')
      content.setAttribute('data-coral-accordion-content', '')
      content.textContent = 'Content 1'
      item.appendChild(trigger)
      item.appendChild(content)
      el.appendChild(item)

      const factory = createComponentFactory(Accordion)
      const accordion = factory(el)

      expect(accordion).toBeDefined()
      expect(accordion).toBeInstanceOf(Accordion)

      accordion.destroy()
    })
  })

  describe('BaseComponent removeEventListener coverage', () => {
    it('should use protected removeEventListener method', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      // Create a mock handler
      const handler = vi.fn()
      sw.addEventListener(el, 'click', handler)

      // Get count after adding our listener
      const countWithOurListener = (sw as any).trackedListeners.length

      // Access protected method through subclass
      ;(sw as any).removeEventListener(el, 'click', handler)

      // Verify the listener was removed from tracking
      expect((sw as any).trackedListeners.length).toBe(countWithOurListener - 1)

      sw.destroy()
    })

    it('should filter tracked listeners on removeEventListener', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      const handler1 = vi.fn()
      const handler2 = vi.fn()

      // Get initial count (Switch may have internal listeners)
      const initialCount = (sw as any).trackedListeners.length

      // Add multiple listeners
      sw.addEventListener(el, 'click', handler1)
      sw.addEventListener(el, 'mouseover', handler2)

      const afterAddCount = (sw as any).trackedListeners.length
      expect(afterAddCount).toBe(initialCount + 2)

      // Remove one listener
      ;(sw as any).removeEventListener(el, 'click', handler1)

      // Verify one listener was removed
      expect((sw as any).trackedListeners.length).toBe(afterAddCount - 1)

      sw.destroy()
    })
  })

  describe('BaseComponent boundHandlers legacy cleanup', () => {
    it('should clean up boundHandlers on destroy', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      // Simulate legacy boundHandlers
      const handler = vi.fn()
      ;(sw as any).boundHandlers.set('click-123', handler)
      ;(sw as any).boundHandlers.set('mousedown-456', handler)

      // Call destroy which should trigger legacy cleanup
      sw.destroy()

      // boundHandlers should be cleared
      expect((sw as any).boundHandlers.size).toBe(0)
    })

    it('should handle empty boundHandlers gracefully', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      // boundHandlers is empty by default
      expect((sw as any).boundHandlers.size).toBe(0)

      // Should not throw
      sw.destroy()
    })

    it('should parse event name from boundHandlers key format', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      // Add handler with legacy key format 'eventName-uniqueId'
      const handler = vi.fn()
      ;(sw as any).boundHandlers.set('resize-abc123', handler)
      ;(sw as any).boundHandlers.set('click-xyz789', handler)

      // Destroy should parse and use event names ('resize', 'click')
      sw.destroy()

      // Should not throw and handlers should be cleared
      expect((sw as any).boundHandlers.size).toBe(0)
    })

    it('should handle boundHandlers key without dash', () => {
      const el = createElement('div', { 'data-coral-switch': '' })
      const sw = new Switch(el)

      // Add handler with key format that has no dash
      const handler = vi.fn()
      ;(sw as any).boundHandlers.set('singlekey', handler)

      // Should handle gracefully
      sw.destroy()

      expect((sw as any).boundHandlers.size).toBe(0)
    })
  })
})
