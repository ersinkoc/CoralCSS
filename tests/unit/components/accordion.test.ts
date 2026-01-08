/**
 * Accordion Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Accordion, createAccordion } from '../../../src/components/accordion'

describe('Accordion Component', () => {
  let container: HTMLElement

  const createAccordionHTML = (options: { items?: number } = {}) => {
    const { items = 3 } = options
    let html = '<div id="test-accordion" data-coral-accordion>'
    for (let i = 0; i < items; i++) {
      html += `
        <div data-coral-accordion-item>
          <button data-coral-accordion-trigger>Section ${i + 1}</button>
          <div data-coral-accordion-panel>Content ${i + 1}</div>
        </div>
      `
    }
    html += '</div>'
    return html
  }

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create accordion from element', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      expect(accordion).toBeDefined()
      expect(accordion.id).toBe('test-accordion')
    })

    it('should create accordion with factory function', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = createAccordion(element)

      expect(accordion).toBeDefined()
    })

    it('should generate ID if not present', () => {
      container.innerHTML = '<div data-coral-accordion><div data-coral-accordion-item><button data-coral-accordion-trigger>T1</button><div data-coral-accordion-panel>C1</div></div></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      expect(element.id).toMatch(/^accordion-/)
    })

    it('should apply default configuration', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      expect(accordion.getOpenPanels()).toEqual([])
    })

    it('should accept custom configuration', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, {
        multiple: true,
        collapsible: false,
        defaultOpen: [0, 1],
      })

      expect(accordion.getOpenPanels()).toContain(0)
      expect(accordion.getOpenPanels()).toContain(1)
    })
  })

  describe('ARIA setup', () => {
    it('should set aria-expanded on triggers', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      const triggers = container.querySelectorAll('[data-coral-accordion-trigger]')
      triggers.forEach((trigger) => {
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
      })
    })

    it('should set aria-controls on triggers', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      const triggers = container.querySelectorAll('[data-coral-accordion-trigger]')
      const panels = container.querySelectorAll('[data-coral-accordion-panel]')

      triggers.forEach((trigger, i) => {
        expect(trigger.getAttribute('aria-controls')).toBe(panels[i]?.id)
      })
    })

    it('should set role=region on panels', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      const panels = container.querySelectorAll('[data-coral-accordion-panel]')
      panels.forEach((panel) => {
        expect(panel.getAttribute('role')).toBe('region')
      })
    })

    it('should set aria-labelledby on panels', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      const triggers = container.querySelectorAll('[data-coral-accordion-trigger]')
      const panels = container.querySelectorAll('[data-coral-accordion-panel]')

      panels.forEach((panel, i) => {
        expect(panel.getAttribute('aria-labelledby')).toBe(triggers[i]?.id)
      })
    })

    it('should set hidden on closed panels', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element)

      const panels = container.querySelectorAll('[data-coral-accordion-panel]')
      panels.forEach((panel) => {
        expect(panel.hasAttribute('hidden')).toBe(true)
      })
    })

    it('should not set hidden on defaultOpen panels', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      new Accordion(element, { defaultOpen: [0] })

      const panels = container.querySelectorAll('[data-coral-accordion-panel]')
      expect(panels[0]?.hasAttribute('hidden')).toBe(false)
      expect(panels[1]?.hasAttribute('hidden')).toBe(true)
    })
  })

  describe('panel operations via public API', () => {
    it('should open panel programmatically', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      accordion.openPanel(1)

      expect(accordion.isPanelOpen(1)).toBe(true)
      expect(accordion.getOpenPanels()).toContain(1)
    })

    it('should close panel programmatically', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [0] })

      accordion.closePanel(0)

      expect(accordion.isPanelOpen(0)).toBe(false)
      expect(accordion.getOpenPanels()).not.toContain(0)
    })

    it('should close other panels when not in multiple mode', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: false, defaultOpen: [0] })

      accordion.openPanel(1)

      expect(accordion.isPanelOpen(0)).toBe(false)
      expect(accordion.isPanelOpen(1)).toBe(true)
    })

    it('should keep other panels open when in multiple mode', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: true, defaultOpen: [0] })

      accordion.openPanel(1)

      expect(accordion.isPanelOpen(0)).toBe(true)
      expect(accordion.isPanelOpen(1)).toBe(true)
    })

    it('should ignore invalid panel index on open', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      accordion.openPanel(-1)
      accordion.openPanel(100)

      expect(accordion.getOpenPanels()).toEqual([])
    })

    it('should ignore invalid panel index on close', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [0] })

      accordion.closePanel(-1)
      accordion.closePanel(100)

      expect(accordion.getOpenPanels()).toEqual([0])
    })

    it('should not close already closed panel', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [0] })

      // Close panel 1 which is already closed - should not affect state
      accordion.closePanel(1)

      expect(accordion.getOpenPanels()).toEqual([0])
    })
  })

  describe('openAll/closeAll', () => {
    it('should open all panels when multiple is true', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: true })

      accordion.openAll()

      expect(accordion.getOpenPanels().length).toBe(3)
      expect(accordion.isPanelOpen(0)).toBe(true)
      expect(accordion.isPanelOpen(1)).toBe(true)
      expect(accordion.isPanelOpen(2)).toBe(true)
    })

    it('should not open all panels when multiple is false', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: false })

      accordion.openAll()

      expect(accordion.getOpenPanels().length).toBe(0)
    })

    it('should close all panels when collapsible is true', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: true, defaultOpen: [0, 1, 2] })

      accordion.closeAll()

      expect(accordion.getOpenPanels().length).toBe(0)
    })

    it('should not close all panels when collapsible is false', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { collapsible: false, defaultOpen: [0] })

      accordion.closeAll()

      expect(accordion.getOpenPanels().length).toBe(1)
    })
  })

  describe('render updates', () => {
    it('should update aria-expanded when panel opens', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      const trigger = container.querySelector<HTMLElement>('[data-coral-accordion-trigger]')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')

      accordion.openPanel(0)

      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('should update data-open attributes when panel opens', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      accordion.openPanel(0)

      const trigger = container.querySelector<HTMLElement>('[data-coral-accordion-trigger]')!
      const panel = container.querySelector<HTMLElement>('[data-coral-accordion-panel]')!
      const item = container.querySelector<HTMLElement>('[data-coral-accordion-item]')!

      expect(trigger.hasAttribute('data-open')).toBe(true)
      expect(panel.hasAttribute('data-open')).toBe(true)
      expect(item.hasAttribute('data-open')).toBe(true)
    })

    it('should remove hidden from panel when opened', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      const panel = container.querySelector<HTMLElement>('[data-coral-accordion-panel]')!
      expect(panel.hasAttribute('hidden')).toBe(true)

      accordion.openPanel(0)

      expect(panel.hasAttribute('hidden')).toBe(false)
    })

    it('should add hidden to panel when closed', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [0] })

      const panel = container.querySelector<HTMLElement>('[data-coral-accordion-panel]')!
      expect(panel.hasAttribute('hidden')).toBe(false)

      accordion.closePanel(0)

      expect(panel.hasAttribute('hidden')).toBe(true)
    })

    it('should remove data-open attributes when panel closes', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [0] })

      accordion.closePanel(0)

      const trigger = container.querySelector<HTMLElement>('[data-coral-accordion-trigger]')!
      const panel = container.querySelector<HTMLElement>('[data-coral-accordion-panel]')!
      const item = container.querySelector<HTMLElement>('[data-coral-accordion-item]')!

      expect(trigger.hasAttribute('data-open')).toBe(false)
      expect(panel.hasAttribute('data-open')).toBe(false)
      expect(item.hasAttribute('data-open')).toBe(false)
    })
  })

  describe('state queries', () => {
    it('should correctly report if panel is open', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { defaultOpen: [1] })

      expect(accordion.isPanelOpen(0)).toBe(false)
      expect(accordion.isPanelOpen(1)).toBe(true)
      expect(accordion.isPanelOpen(2)).toBe(false)
    })

    it('should return array of open panel indices', () => {
      container.innerHTML = createAccordionHTML()
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element, { multiple: true, defaultOpen: [0, 2] })

      const openPanels = accordion.getOpenPanels()
      expect(openPanels).toContain(0)
      expect(openPanels).toContain(2)
      expect(openPanels).not.toContain(1)
    })
  })

  describe('empty accordion', () => {
    it('should handle accordion with no items', () => {
      container.innerHTML = '<div id="empty" data-coral-accordion></div>'
      const element = container.querySelector<HTMLElement>('[data-coral-accordion]')!
      const accordion = new Accordion(element)

      expect(accordion.getOpenPanels()).toEqual([])
      accordion.openPanel(0) // Should not throw
      accordion.closePanel(0) // Should not throw
    })
  })
})
