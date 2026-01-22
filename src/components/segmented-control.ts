/**
 * Segmented Control Component
 *
 * An iOS-style segmented control for selecting between multiple options.
 * Similar to tabs but with a more compact, inline appearance.
 *
 * @module components/segmented-control
 */

import { BaseComponent, createComponentFactory } from './base'
import type { ComponentConfig, ComponentState } from '../types'

/**
 * Segmented control option
 */
export interface SegmentOption {
  /** Unique value for the option */
  value: string
  /** Display label */
  label: string
  /** Optional icon */
  icon?: string
  /** Whether the option is disabled */
  disabled?: boolean
}

/**
 * Segmented control configuration
 */
export interface SegmentedControlConfig extends ComponentConfig {
  /** Available options */
  options: SegmentOption[]
  /** Currently selected value */
  value?: string
  /** Whether multiple selections are allowed */
  multiple?: boolean
  /** Display size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Visual appearance variant */
  variant?: 'default' | 'primary' | 'secondary'
  /** Selection behavior */
  selectionType?: 'single' | 'multi'
  /** Disable the entire control */
  disabled?: boolean
  /** Control name for forms */
  name?: string
}

/**
 * Segmented control state
 */
export interface SegmentedControlState extends ComponentState {
  /** Currently selected value(s) */
  value: string | string[]
  /** Currently focused segment index */
  focusedIndex: number | null
  /** Disabled state */
  disabled: boolean
}

/**
 * Segmented Control Component
 *
 * An iOS-style segmented control for selecting between multiple options.
 *
 * @example
 * ```html
 * <div data-coral-segmented-control data-value="tab1">
 *   <button type="button" data-coral-segment data-value="tab1">Tab 1</button>
 *   <button type="button" data-coral-segment data-value="tab2">Tab 2</button>
 *   <button type="button" data-coral-segment data-value="tab3">Tab 3</button>
 *   <div data-coral-segment-indicator></div>
 * </div>
 * ```
 */
export class SegmentedControl extends BaseComponent {
  protected declare config: SegmentedControlConfig
  protected declare state: SegmentedControlState

  // Note: Using '!' definite assignment since these are set in cacheElements() during init()
  // Cannot use field initializers as they run AFTER the base class constructor calls init()
  private segments!: HTMLElement[]
  private indicator!: HTMLElement | null

  protected getDefaultConfig(): SegmentedControlConfig {
    return {
      size: 'md',
      variant: 'default',
      multiple: false,
      selectionType: 'single',
      disabled: false,
      options: [],
    }
  }

  protected getInitialState(): SegmentedControlState {
    return {
      value: this.config.value || (this.config.multiple ? [] : ''),
      focusedIndex: null,
      disabled: this.config.disabled || false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'tablist')
    this.segments.forEach((segment, index) => {
      segment.setAttribute('role', 'tab')
      segment.setAttribute('aria-selected', 'false')
      segment.setAttribute('tabindex', index === 0 ? '0' : '-1')
    })
  }

  protected bindEvents(): void {
    // Segment click handlers
    this.segments.forEach((segment, index) => {
      this.addEventListener(segment, 'click', (e: Event) => this.handleSegmentClick(index, e))
      this.addEventListener(segment, 'keydown', (e: Event) => this.handleSegmentKeydown(index, e as KeyboardEvent))
      this.addEventListener(segment, 'focus', () => this.handleSegmentFocus(index))
      this.addEventListener(segment, 'blur', () => this.handleSegmentBlur())
    })
  }

  private cacheElements(): void {
    this.segments = Array.from(
      this.element.querySelectorAll('[data-coral-segment]')
    )
    this.indicator = this.element.querySelector('[data-coral-segment-indicator]')

    // If no indicator exists, create one
    if (!this.indicator) {
      this.indicator = document.createElement('div')
      this.indicator.setAttribute('data-coral-segment-indicator', '')
      this.element.appendChild(this.indicator)
    }
  }

  protected override init(): void {
    this.cacheElements()
    super.init()
    this.updateSegments()
    this.updateIndicator()
  }

  private handleSegmentClick(index: number, event: Event): void {
    if (this.state.disabled) {return}

    const segment = this.segments[index]
    if (!segment) {return}
    const value = segment.getAttribute('data-value') || ''
    const isDisabled = segment.getAttribute('data-disabled') === 'true'

    if (isDisabled) {return}

    if (this.config.multiple || this.config.selectionType === 'multi') {
      this.handleMultiSelect(value)
    } else {
      this.handleSingleSelect(value)
    }

    this.dispatch('change', { value: this.state.value })
  }

  private handleSingleSelect(value: string): void {
    this.setState({ value })
    this.updateSegments()
    this.updateIndicator()
  }

  private handleMultiSelect(value: string): void {
    const currentValues = Array.isArray(this.state.value) ? this.state.value : []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value]

    this.setState({ value: newValues })
    this.updateSegments()
  }

  private handleSegmentKeydown(index: number, event: KeyboardEvent): void {
    if (this.state.disabled) {return}

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        this.focusPreviousSegment(index)
        break
      case 'ArrowRight':
        event.preventDefault()
        this.focusNextSegment(index)
        break
      case 'Home':
        event.preventDefault()
        this.focusSegment(0)
        break
      case 'End':
        event.preventDefault()
        this.focusSegment(this.segments.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        this.handleSegmentClick(index, event)
        break
    }
  }

  private handleSegmentFocus(index: number): void {
    this.setState({ focusedIndex: index })
  }

  private handleSegmentBlur(): void {
    this.setState({ focusedIndex: null })
  }

  private focusPreviousSegment(currentIndex: number): void {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : this.segments.length - 1
    this.focusSegment(newIndex)
  }

  private focusNextSegment(currentIndex: number): void {
    const newIndex = currentIndex < this.segments.length - 1 ? currentIndex + 1 : 0
    this.focusSegment(newIndex)
  }

  private focusSegment(index: number): void {
    if (this.segments[index]) {
      this.segments[index].focus()
    }
  }

  private updateSegments(): void {
    const values = Array.isArray(this.state.value) ? this.state.value : [this.state.value]

    this.segments.forEach((segment) => {
      const value = segment.getAttribute('data-value') || ''
      const isSelected = values.includes(value)

      if (isSelected) {
        segment.setAttribute('aria-pressed', 'true')
        segment.classList.add('active')
      } else {
        segment.setAttribute('aria-pressed', 'false')
        segment.classList.remove('active')
      }
    })
  }

  private updateIndicator(): void {
    if (!this.indicator) {return}

    const value = Array.isArray(this.state.value) ? this.state.value[0] : this.state.value
    const activeSegment = this.segments.find(
      (s) => s.getAttribute('data-value') === value
    )

    if (activeSegment) {
      const rect = activeSegment.getBoundingClientRect()
      const parentRect = this.element.getBoundingClientRect()

      this.indicator.style.width = `${rect.width}px`
      this.indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`
      this.indicator.classList.add('active')
    } else {
      this.indicator.classList.remove('active')
    }
  }

  /**
   * Set the selected value(s)
   */
  setValue(value: string | string[]): void {
    this.setState({ value })
    this.updateSegments()
    this.updateIndicator()
    this.dispatch('change', { value })
  }

  /**
   * Get the current selected value(s)
   */
  getValue(): string | string[] {
    return this.state.value
  }

  /**
   * Get the index of the currently selected segment
   */
  getSelectedIndex(): number {
    const value = Array.isArray(this.state.value) ? this.state.value[0] : this.state.value
    return this.segments.findIndex((s) => s.getAttribute('data-value') === value)
  }

  /**
   * Select a segment by index
   */
  selectByIndex(index: number): void {
    if (index >= 0 && index < this.segments.length) {
      const segment = this.segments[index]
      if (!segment) {return}
      const value = segment.getAttribute('data-value') || ''
      this.setValue(value)
    }
  }

  /**
   * Disable the entire control
   */
  disable(): void {
    this.setState({ disabled: true })
    this.element.classList.add('disabled')
    this.segments.forEach((segment) => {
      segment.setAttribute('disabled', 'disabled')
      segment.setAttribute('aria-disabled', 'true')
    })
  }

  /**
   * Enable the control
   */
  enable(): void {
    this.setState({ disabled: false })
    this.element.classList.remove('disabled')
    this.segments.forEach((segment) => {
      segment.removeAttribute('disabled')
      segment.setAttribute('aria-disabled', 'false')
    })
  }

  /**
   * Disable a specific segment
   */
  disableSegment(value: string): void {
    const segment = this.segments.find((s) => s.getAttribute('data-value') === value)
    if (segment) {
      segment.setAttribute('data-disabled', 'true')
      segment.setAttribute('aria-disabled', 'true')
      segment.classList.add('disabled')
    }
  }

  /**
   * Enable a specific segment
   */
  enableSegment(value: string): void {
    const segment = this.segments.find((s) => s.getAttribute('data-value') === value)
    if (segment) {
      segment.removeAttribute('data-disabled')
      segment.setAttribute('aria-disabled', 'false')
      segment.classList.remove('disabled')
    }
  }
}

/**
 * Factory function to create a SegmentedControl instance
 */
export function createSegmentedControl(
  element: HTMLElement,
  config?: SegmentedControlConfig
): SegmentedControl {
  return new SegmentedControl(element, config || {})
}

/**
 * Factory to create SegmentedControl components with consistent configuration
 */
export const createSegmentedControlFactory = createComponentFactory<
  SegmentedControl,
  SegmentedControlConfig
>(
  SegmentedControl as unknown as new (element: HTMLElement, config?: Partial<SegmentedControlConfig>) => SegmentedControl
)

export default SegmentedControl
