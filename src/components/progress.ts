/**
 * Progress Component
 *
 * Accessible progress bar component.
 * @module components/progress
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Progress configuration
 */
export interface ProgressConfig extends ComponentConfig {
  /**
   * Current value
   * @default 0
   */
  value?: number

  /**
   * Maximum value
   * @default 100
   */
  max?: number

  /**
   * Whether the progress is indeterminate
   * @default false
   */
  indeterminate?: boolean

  /**
   * Show value label
   * @default false
   */
  showLabel?: boolean

  /**
   * Custom label formatter
   */
  formatLabel?: (value: number, max: number) => string

  /**
   * Bar element selector
   * @default '[data-coral-progress-bar]'
   */
  barSelector?: string

  /**
   * Label element selector
   * @default '[data-coral-progress-label]'
   */
  labelSelector?: string
}

/**
 * Progress state
 */
export interface ProgressState extends ComponentState {
  value: number
  percent: number
}

/**
 * Progress component
 *
 * @example
 * ```html
 * <div data-coral-progress data-value="65">
 *   <div data-coral-progress-bar></div>
 *   <span data-coral-progress-label>65%</span>
 * </div>
 *
 * <!-- Indeterminate -->
 * <div data-coral-progress data-indeterminate="true">
 *   <div data-coral-progress-bar></div>
 * </div>
 * ```
 */
export class Progress extends BaseComponent {
  protected declare config: ProgressConfig
  protected declare state: ProgressState

  private bar: HTMLElement | null = null
  private label: HTMLElement | null = null

  protected getDefaultConfig(): ProgressConfig {
    return {
      value: 0,
      max: 100,
      indeterminate: false,
      showLabel: false,
      barSelector: '[data-coral-progress-bar]',
      labelSelector: '[data-coral-progress-label]',
    }
  }

  protected getInitialState(): ProgressState {
    const { value, max } = this.config
    const val = value ?? 0
    const maxVal = max ?? 100
    return {
      value: val,
      // Prevent division by zero - default to 0% if max is 0
      percent: maxVal > 0 ? (val / maxVal) * 100 : 0,
    }
  }

  protected setupAria(): void {
    this.bar = this.query(this.config.barSelector!)
    this.label = this.query(this.config.labelSelector!)

    // Set up progress ARIA
    this.element.setAttribute('role', 'progressbar')
    this.element.setAttribute('aria-valuemin', '0')
    this.element.setAttribute('aria-valuemax', String(this.config.max))

    if (this.config.indeterminate) {
      this.element.removeAttribute('aria-valuenow')
      this.element.setAttribute('data-indeterminate', '')
    } else {
      this.element.setAttribute('aria-valuenow', String(this.state.value))
      this.element.setAttribute('aria-valuetext', this.getLabel())
    }

    // Initial render
    this.updateVisuals()
  }

  protected bindEvents(): void {
    // Progress doesn't have interactive events by default
  }

  private updateVisuals(): void {
    if (this.config.indeterminate) {
      // Indeterminate animation handled by CSS
      this.bar?.removeAttribute('style')
      this.bar?.setAttribute('data-indeterminate', '')
    } else {
      this.bar?.removeAttribute('data-indeterminate')

      // Update bar width
      if (this.bar) {
        this.bar.style.width = `${this.state.percent}%`
      }

      // Update label
      if (this.label && this.config.showLabel) {
        this.label.textContent = this.getLabel()
      }
    }
  }

  private getLabel(): string {
    if (this.config.formatLabel) {
      return this.config.formatLabel(this.state.value, this.config.max ?? 100)
    }
    return `${Math.round(this.state.percent)}%`
  }

  /**
   * Get current value
   */
  getValue(): number {
    return this.state.value
  }

  /**
   * Get current percentage
   */
  getPercent(): number {
    return this.state.percent
  }

  /**
   * Set value
   */
  setValue(value: number): void {
    const max = this.config.max ?? 100
    const clampedValue = Math.max(0, Math.min(max, value))
    // Prevent division by zero - default to 0% if max is 0
    const percent = max > 0 ? (clampedValue / max) * 100 : 0

    this.setState({ value: clampedValue, percent })

    // Update ARIA
    this.element.setAttribute('aria-valuenow', String(clampedValue))
    this.element.setAttribute('aria-valuetext', this.getLabel())

    // Update visuals
    this.updateVisuals()

    // Dispatch change event
    this.dispatch('change', { value: clampedValue, percent })

    // Check for completion
    if (clampedValue >= max) {
      this.dispatch('complete')
    }
  }

  /**
   * Increment value by step
   */
  increment(step: number = 1): void {
    this.setValue(this.state.value + step)
  }

  /**
   * Decrement value by step
   */
  decrement(step: number = 1): void {
    this.setValue(this.state.value - step)
  }

  /**
   * Set indeterminate state
   */
  setIndeterminate(indeterminate: boolean): void {
    this.config.indeterminate = indeterminate

    if (indeterminate) {
      this.element.removeAttribute('aria-valuenow')
      this.element.setAttribute('data-indeterminate', '')
    } else {
      this.element.setAttribute('aria-valuenow', String(this.state.value))
      this.element.removeAttribute('data-indeterminate')
    }

    this.updateVisuals()
  }

  /**
   * Reset to initial value
   */
  reset(): void {
    this.setValue(this.config.value ?? 0)
  }
}

/**
 * Create a progress instance
 */
export const createProgress = createComponentFactory(Progress)

export default Progress
