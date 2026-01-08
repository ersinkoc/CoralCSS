/**
 * Accordion Component
 *
 * Accessible accordion/collapsible component.
 * @module components/accordion
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Accordion configuration
 */
export interface AccordionConfig extends ComponentConfig {
  /**
   * Whether multiple panels can be open at once
   * @default false
   */
  multiple?: boolean

  /**
   * Whether panels can all be collapsed
   * @default true
   */
  collapsible?: boolean

  /**
   * Accordion item selector
   * @default '[data-coral-accordion-item]'
   */
  itemSelector?: string

  /**
   * Accordion trigger selector
   * @default '[data-coral-accordion-trigger]'
   */
  triggerSelector?: string

  /**
   * Accordion panel selector
   * @default '[data-coral-accordion-panel]'
   */
  panelSelector?: string

  /**
   * Default open panels (by index)
   * @default []
   */
  defaultOpen?: number[]
}

/**
 * Accordion state
 */
export interface AccordionState extends ComponentState {
  openPanels: Set<number>
  focusedIndex: number
}

/**
 * Accordion component
 *
 * @example
 * ```html
 * <div data-coral-accordion>
 *   <div data-coral-accordion-item>
 *     <button data-coral-accordion-trigger>Section 1</button>
 *     <div data-coral-accordion-panel>Content 1</div>
 *   </div>
 *   <div data-coral-accordion-item>
 *     <button data-coral-accordion-trigger>Section 2</button>
 *     <div data-coral-accordion-panel>Content 2</div>
 *   </div>
 * </div>
 * ```
 */
export class Accordion extends BaseComponent {
  protected declare config: AccordionConfig
  protected declare state: AccordionState

  private items!: HTMLElement[]
  private triggers!: HTMLElement[]
  private panels!: HTMLElement[]

  protected getDefaultConfig(): AccordionConfig {
    return {
      multiple: false,
      collapsible: true,
      itemSelector: '[data-coral-accordion-item]',
      triggerSelector: '[data-coral-accordion-trigger]',
      panelSelector: '[data-coral-accordion-panel]',
      defaultOpen: [],
    }
  }

  protected getInitialState(): AccordionState {
    return {
      openPanels: new Set(this.config.defaultOpen ?? []),
      focusedIndex: -1,
    }
  }

  protected setupAria(): void {
    // Initialize arrays (needed because setupAria is called from parent constructor)
    this.triggers = []
    this.panels = []
    this.items = Array.from(this.queryAll(this.config.itemSelector!))

    this.items.forEach((item, index) => {
      const trigger = item.querySelector<HTMLElement>(this.config.triggerSelector!)
      const panel = item.querySelector<HTMLElement>(this.config.panelSelector!)

      if (trigger && panel) {
        this.triggers.push(trigger)
        this.panels.push(panel)

        // Generate IDs
        if (!trigger.id) {
          trigger.id = `${this.element.id}-trigger-${index}`
        }
        if (!panel.id) {
          panel.id = `${this.element.id}-panel-${index}`
        }

        // Set up trigger
        trigger.setAttribute('aria-expanded', String(this.state.openPanels.has(index)))
        trigger.setAttribute('aria-controls', panel.id)

        // Set up panel
        panel.setAttribute('role', 'region')
        panel.setAttribute('aria-labelledby', trigger.id)

        if (!this.state.openPanels.has(index)) {
          panel.setAttribute('hidden', '')
        }
      }
    })
  }

  protected bindEvents(): void {
    this.triggers.forEach((trigger, index) => {
      this.addEventListener(trigger, 'click', () => this.togglePanel(index))
      this.addEventListener(trigger, 'keydown', (e: Event) => this.handleKeydown(e as KeyboardEvent, index))
      this.addEventListener(trigger, 'focus', () => {
        this.setState({ focusedIndex: index })
      })
    })
  }

  private handleKeydown(e: KeyboardEvent, index: number): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.focusNextTrigger()
        break
      case 'ArrowUp':
        e.preventDefault()
        this.focusPreviousTrigger()
        break
      case 'Home':
        e.preventDefault()
        this.focusTrigger(0)
        break
      case 'End':
        e.preventDefault()
        this.focusTrigger(this.triggers.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.togglePanel(index)
        break
    }
  }

  private focusTrigger(index: number): void {
    if (index >= 0 && index < this.triggers.length) {
      this.triggers[index]?.focus()
    }
  }

  private focusNextTrigger(): void {
    const next = (this.state.focusedIndex + 1) % this.triggers.length
    this.focusTrigger(next)
  }

  private focusPreviousTrigger(): void {
    const prev = this.state.focusedIndex <= 0 ? this.triggers.length - 1 : this.state.focusedIndex - 1
    this.focusTrigger(prev)
  }

  private togglePanel(index: number): void {
    const isOpen = this.state.openPanels.has(index)

    if (isOpen) {
      // Close panel
      if (this.config.collapsible || this.state.openPanels.size > 1) {
        this.closePanel(index)
      }
    } else {
      // Open panel
      this.openPanel(index)
    }
  }

  /**
   * Open a panel by index
   */
  openPanel(index: number): void {
    if (index < 0 || index >= this.panels.length) return

    const newOpenPanels = new Set(this.state.openPanels)

    // If not multiple, close other panels
    if (!this.config.multiple) {
      newOpenPanels.clear()
    }

    newOpenPanels.add(index)
    this.setState({ openPanels: newOpenPanels })

    this.dispatch('open', { index })
  }

  /**
   * Close a panel by index
   */
  closePanel(index: number): void {
    if (index < 0 || index >= this.panels.length) return
    if (!this.state.openPanels.has(index)) return

    const newOpenPanels = new Set(this.state.openPanels)
    newOpenPanels.delete(index)
    this.setState({ openPanels: newOpenPanels })

    this.dispatch('close', { index })
  }

  protected override render(): void {
    this.triggers.forEach((trigger, index) => {
      const panel = this.panels[index]
      const item = this.items[index]
      const isOpen = this.state.openPanels.has(index)

      trigger.setAttribute('aria-expanded', String(isOpen))

      if (isOpen) {
        trigger.setAttribute('data-open', '')
        panel?.removeAttribute('hidden')
        panel?.setAttribute('data-open', '')
        item?.setAttribute('data-open', '')
      } else {
        trigger.removeAttribute('data-open')
        panel?.setAttribute('hidden', '')
        panel?.removeAttribute('data-open')
        item?.removeAttribute('data-open')
      }
    })
  }

  /**
   * Check if a panel is open
   */
  isPanelOpen(index: number): boolean {
    return this.state.openPanels.has(index)
  }

  /**
   * Get all open panel indices
   */
  getOpenPanels(): number[] {
    return Array.from(this.state.openPanels)
  }

  /**
   * Open all panels (only works when multiple is true)
   */
  openAll(): void {
    if (!this.config.multiple) return

    const newOpenPanels = new Set<number>()
    this.panels.forEach((_, index) => newOpenPanels.add(index))
    this.setState({ openPanels: newOpenPanels })

    this.dispatch('openAll')
  }

  /**
   * Close all panels
   */
  closeAll(): void {
    if (!this.config.collapsible) return

    this.setState({ openPanels: new Set() })
    this.dispatch('closeAll')
  }
}

/**
 * Create an accordion instance
 */
export const createAccordion = createComponentFactory(Accordion)

export default Accordion
