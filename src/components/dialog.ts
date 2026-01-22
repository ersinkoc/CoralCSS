/**
 * Dialog Component
 *
 * Accessible modal dialog component.
 * @module components/dialog
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Check if the native HTMLDialogElement API is supported
 * Safari 14 and earlier don't support showModal()
 */
function supportsNativeDialog(): boolean {
  if (typeof HTMLDialogElement === 'undefined') {
    return false
  }
  // Check if showModal method exists (Safari 14 has <dialog> but no showModal)
  const dialog = document.createElement('dialog')
  return typeof dialog.showModal === 'function'
}

/**
 * Dialog configuration
 */
export interface DialogConfig extends ComponentConfig {
  /**
   * Whether clicking the backdrop closes the dialog
   * @default true
   */
  closeOnBackdrop?: boolean

  /**
   * Whether pressing Escape closes the dialog
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to trap focus within the dialog
   * @default true
   */
  trapFocus?: boolean

  /**
   * Whether to lock body scroll when open
   * @default true
   */
  lockScroll?: boolean

  /**
   * Whether to use native dialog element
   * @default true
   */
  useNative?: boolean

  /**
   * Custom backdrop element selector
   */
  backdropSelector?: string

  /**
   * Custom close button selector
   * @default '[data-coral-dialog-close]'
   */
  closeSelector?: string
}

/**
 * Dialog state
 */
export interface DialogState extends ComponentState {
  isOpen: boolean
  previousActiveElement: Element | null
}

/**
 * Dialog component
 *
 * @example
 * ```html
 * <div data-coral-dialog>
 *   <div data-coral-dialog-backdrop></div>
 *   <div data-coral-dialog-content role="dialog" aria-modal="true">
 *     <h2 id="dialog-title">Dialog Title</h2>
 *     <p>Dialog content...</p>
 *     <button data-coral-dialog-close>Close</button>
 *   </div>
 * </div>
 *
 * <!-- Or using native dialog -->
 * <dialog data-coral-dialog>
 *   <h2>Dialog Title</h2>
 *   <p>Dialog content...</p>
 *   <button data-coral-dialog-close>Close</button>
 * </dialog>
 * ```
 */
// Cache the feature detection result
let _supportsNativeDialog: boolean | null = null

function getNativeDialogSupport(): boolean {
  if (_supportsNativeDialog === null) {
    _supportsNativeDialog = supportsNativeDialog()
  }
  return _supportsNativeDialog
}

export class Dialog extends BaseComponent {
  protected declare config: DialogConfig
  protected declare state: DialogState

  private isNativeDialog: boolean
  private canUseNativeDialog: boolean
  private backdrop: HTMLElement | null = null
  private content: HTMLElement | null = null

  constructor(element: HTMLElement, config: Partial<DialogConfig> = {}) {
    super(element, config)
    this.isNativeDialog = element.tagName === 'DIALOG'
    // Only use native dialog if both: element is a dialog AND browser supports showModal
    this.canUseNativeDialog = this.isNativeDialog && getNativeDialogSupport()
  }

  protected getDefaultConfig(): DialogConfig {
    return {
      closeOnBackdrop: true,
      closeOnEscape: true,
      trapFocus: true,
      lockScroll: true,
      useNative: true,
      closeSelector: '[data-coral-dialog-close]',
    }
  }

  protected getInitialState(): DialogState {
    return {
      isOpen: false,
      previousActiveElement: null,
    }
  }

  protected setupAria(): void {
    if (this.isNativeDialog) {
      return // Native dialog handles ARIA automatically
    }

    this.content = this.query('[data-coral-dialog-content]') ?? this.element
    this.content.setAttribute('role', 'dialog')
    this.content.setAttribute('aria-modal', 'true')

    // Find and link title
    const title = this.query('[data-coral-dialog-title]') ?? this.query('h1, h2, h3, h4, h5, h6')
    if (title) {
      if (!title.id) {
        title.id = `${this.element.id}-title`
      }
      this.content.setAttribute('aria-labelledby', title.id)
    }

    // Find and link description
    const description = this.query('[data-coral-dialog-description]')
    if (description) {
      if (!description.id) {
        description.id = `${this.element.id}-description`
      }
      this.content.setAttribute('aria-describedby', description.id)
    }
  }

  protected bindEvents(): void {
    // Close buttons
    const closeButtons = this.queryAll(this.config.closeSelector!)
    closeButtons.forEach((button) => {
      this.addEventListener(button, 'click', () => this.close())
    })

    // Backdrop click
    if (this.config.closeOnBackdrop) {
      this.backdrop = this.query(this.config.backdropSelector ?? '[data-coral-dialog-backdrop]')
      if (this.backdrop) {
        this.addEventListener(this.backdrop, 'click', (e) => {
          if (e.target === this.backdrop) {
            this.close()
          }
        })
      }

      // For native dialog, handle click on dialog element itself (the backdrop area)
      if (this.isNativeDialog) {
        this.addEventListener(this.element, 'click', (e) => {
          if (e.target === this.element) {
            this.close()
          }
        })
      }
    }

    // Escape key
    if (this.config.closeOnEscape) {
      this.addEventListener(document, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === 'Escape' && this.state.isOpen) {
          this.close()
        }
      })
    }

    // Native dialog close event (only if native dialog API is supported)
    if (this.canUseNativeDialog) {
      this.addEventListener(this.element, 'close', () => {
        this.setState({ isOpen: false })
      })
    }
  }

  protected override render(): void {
    if (this.state.isOpen) {
      this.element.setAttribute('data-open', '')
      this.backdrop?.setAttribute('data-open', '')

      // Only use native dialog API if browser supports it and config allows it
      if (this.canUseNativeDialog && this.config.useNative) {
        const dialog = this.element as HTMLDialogElement
        // Ensure dialog isn't already open to avoid InvalidStateError
        if (!dialog.open) {
          dialog.showModal()
        }
      } else {
        this.element.style.display = ''
        this.element.removeAttribute('hidden')
      }
    } else {
      this.element.removeAttribute('data-open')
      this.backdrop?.removeAttribute('data-open')

      // Only use native dialog API if browser supports it and config allows it
      if (this.canUseNativeDialog && this.config.useNative) {
        const dialog = this.element as HTMLDialogElement
        // Only close if actually open
        if (dialog.open) {
          dialog.close()
        }
      } else {
        this.element.style.display = 'none'
        this.element.setAttribute('hidden', '')
      }
    }
  }

  /**
   * Open the dialog
   */
  override open(): void {
    if (this.state.isOpen) {return}

    // Store active element to restore focus later
    this.state.previousActiveElement = document.activeElement

    // Lock scroll if configured
    if (this.config.lockScroll) {
      this.lockScroll()
    }

    // Update state
    this.setState({ isOpen: true })

    // Trap focus if configured
    if (this.config.trapFocus) {
      const focusTarget = this.content ?? this.element
      this.trapFocus(focusTarget)

      // Focus first focusable element
      const firstFocusable = focusTarget.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }

    // Call hooks and dispatch event
    this.hooks.onOpen?.(this.getContext())
    this.dispatch('open')
  }

  /**
   * Close the dialog
   */
  override close(): void {
    if (!this.state.isOpen) {return}

    // Release focus trap
    if (this.config.trapFocus) {
      this.releaseFocusTrap(this.content ?? this.element)
    }

    // Unlock scroll
    if (this.config.lockScroll) {
      this.unlockScroll()
    }

    // Update state
    this.setState({ isOpen: false })

    // Restore focus to previously focused element
    if (this.state.previousActiveElement instanceof HTMLElement) {
      this.state.previousActiveElement.focus()
    }

    // Call hooks and dispatch event
    this.hooks.onClose?.(this.getContext())
    this.dispatch('close')
  }
}

/**
 * Create a dialog instance
 */
export const createDialog = createComponentFactory(Dialog)

export default Dialog
