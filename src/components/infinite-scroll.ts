/**
 * Infinite Scroll Component
 *
 * A headless infinite scroll component with intersection observer,
 * loading states, and customizable triggers.
 *
 * @module components/infinite-scroll
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Infinite Scroll configuration
 */
export interface InfiniteScrollConfig extends ComponentConfig {
  threshold?: number
  rootMargin?: string
  direction?: 'down' | 'up' | 'both'
  triggerDistance?: number
  disabled?: boolean
  hasMore?: boolean
  onLoadMore?: () => Promise<void> | void
  onError?: (error: Error) => void
  onLoadStart?: () => void
  onLoadEnd?: () => void
}

/**
 * Infinite Scroll state
 */
export interface InfiniteScrollState extends ComponentState {
  loading: boolean
  error: Error | null
  hasMore: boolean
  loadCount: number
  direction: 'down' | 'up' | null
}

/**
 * Infinite Scroll Component Class
 */
export class InfiniteScroll extends BaseComponent {
  declare protected config: InfiniteScrollConfig
  declare protected state: InfiniteScrollState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private observer!: IntersectionObserver | null
  private sentinel!: HTMLElement | null
  private topSentinel!: HTMLElement | null
  // Synchronous guard flag to prevent race conditions
  private isLoadingInProgress!: boolean

  protected getDefaultConfig(): InfiniteScrollConfig {
    return {
      threshold: 0.1,
      rootMargin: '100px',
      direction: 'down',
      triggerDistance: 100,
      disabled: false,
      hasMore: true,
    }
  }

  protected getInitialState(): InfiniteScrollState {
    return {
      loading: false,
      error: null,
      hasMore: this.config.hasMore ?? true,
      loadCount: 0,
      direction: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'feed')
    this.element.setAttribute('aria-busy', 'false')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.observer = null
    this.sentinel = null
    this.topSentinel = null
    this.isLoadingInProgress = false

    this.createSentinels()
    this.setupObserver()
  }

  private createSentinels(): void {
    // Bottom sentinel for scrolling down
    if (this.config.direction === 'down' || this.config.direction === 'both') {
      this.sentinel = document.createElement('div')
      this.sentinel.className = 'infinite-scroll-sentinel infinite-scroll-sentinel-bottom'
      this.sentinel.setAttribute('aria-hidden', 'true')
      this.sentinel.style.height = '1px'
      this.element.appendChild(this.sentinel)
    }

    // Top sentinel for scrolling up
    if (this.config.direction === 'up' || this.config.direction === 'both') {
      this.topSentinel = document.createElement('div')
      this.topSentinel.className = 'infinite-scroll-sentinel infinite-scroll-sentinel-top'
      this.topSentinel.setAttribute('aria-hidden', 'true')
      this.topSentinel.style.height = '1px'
      this.element.insertBefore(this.topSentinel, this.element.firstChild)
    }
  }

  private setupObserver(): void {
    // Check for IntersectionObserver support
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('InfiniteScroll: IntersectionObserver is not supported in this browser. Infinite scroll will not work.')
      return
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: this.config.rootMargin || '100px',
      threshold: this.config.threshold || 0.1,
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.state.loading && this.state.hasMore && !this.config.disabled) {
          const isTop = entry.target === this.topSentinel
          this.handleIntersection(isTop ? 'up' : 'down')
        }
      })
    }, options)

    if (this.sentinel) {
      this.observer.observe(this.sentinel)
    }
    if (this.topSentinel) {
      this.observer.observe(this.topSentinel)
    }
  }

  private async handleIntersection(direction: 'down' | 'up'): Promise<void> {
    // Use synchronous flag to prevent race condition with multiple intersection events
    if (this.isLoadingInProgress || this.state.loading || !this.state.hasMore || this.config.disabled) {
      return
    }

    // Set synchronous flag immediately to prevent concurrent calls
    this.isLoadingInProgress = true

    this.setState({ loading: true, direction })
    this.element.setAttribute('aria-busy', 'true')
    this.config.onLoadStart?.()

    try {
      await this.config.onLoadMore?.()
      this.setState({
        loading: false,
        error: null,
        loadCount: this.state.loadCount + 1,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.setState({ loading: false, error: err })
      this.config.onError?.(err)
    } finally {
      this.isLoadingInProgress = false
      this.element.setAttribute('aria-busy', 'false')
      this.config.onLoadEnd?.()
    }
  }

  // Public API

  setLoading(loading: boolean): void {
    this.setState({ loading })
    this.element.setAttribute('aria-busy', String(loading))
  }

  isLoading(): boolean {
    return this.state.loading
  }

  setHasMore(hasMore: boolean): void {
    this.setState({ hasMore })
  }

  hasMoreContent(): boolean {
    return this.state.hasMore
  }

  setError(error: Error | null): void {
    this.setState({ error })
  }

  clearError(): void {
    this.setState({ error: null })
  }

  hasError(): boolean {
    return this.state.error !== null
  }

  incrementLoadCount(): void {
    this.setState({ loadCount: this.state.loadCount + 1 })
  }

  resetLoadCount(): void {
    this.setState({ loadCount: 0 })
  }

  async triggerLoad(): Promise<void> {
    if (!this.state.loading && this.state.hasMore && !this.config.disabled) {
      await this.handleIntersection('down')
    }
  }

  disable(): void {
    this.config.disabled = true
  }

  enable(): void {
    this.config.disabled = false
  }

  isDisabled(): boolean {
    return this.config.disabled || false
  }

  reset(): void {
    this.isLoadingInProgress = false
    this.setState({
      loading: false,
      error: null,
      hasMore: true,
      loadCount: 0,
      direction: null,
    })
  }

  override getState(): InfiniteScrollState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    if (this.sentinel) {
      this.sentinel.remove()
      this.sentinel = null
    }
    if (this.topSentinel) {
      this.topSentinel.remove()
      this.topSentinel = null
    }
    super.destroy()
  }
}

/**
 * Create Infinite Scroll instance
 */
export function createInfiniteScroll(element: HTMLElement, config?: Partial<InfiniteScrollConfig>): InfiniteScroll {
  return new InfiniteScroll(element, config)
}

export default InfiniteScroll
