/**
 * Virtual List Component
 *
 * Efficiently renders large lists by only rendering visible items.
 * Supports both fixed and variable height items.
 *
 * @module components/virtual-list
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Virtual list configuration
 */
export interface VirtualListConfig extends ComponentConfig {
  /**
   * Total number of items
   */
  itemCount: number

  /**
   * Height of each item in pixels (for fixed height mode)
   * @default 40
   */
  itemHeight?: number

  /**
   * Estimated height for variable height items
   * @default 40
   */
  estimatedItemHeight?: number

  /**
   * Height of the container in pixels
   * @default 400
   */
  height?: number

  /**
   * Number of items to overscan (render outside viewport)
   * @default 3
   */
  overscan?: number

  /**
   * Whether items have variable heights
   * @default false
   */
  variableHeight?: boolean

  /**
   * Custom render function for items
   */
  renderItem?: (index: number, style: Record<string, string>) => HTMLElement

  /**
   * Container element selector
   * @default '[data-coral-virtual-list-container]'
   */
  containerSelector?: string

  /**
   * Content element selector
   * @default '[data-coral-virtual-list-content]'
   */
  contentSelector?: string
}

/**
 * Virtual list state
 */
export interface VirtualListState extends ComponentState {
  scrollTop: number
  startIndex: number
  endIndex: number
  visibleItems: number[]
  itemHeights: Map<number, number>
}

/**
 * Virtual list component
 *
 * @example
 * ```html
 * <div data-coral-virtual-list data-item-count="10000" data-item-height="40">
 *   <div data-coral-virtual-list-container>
 *     <div data-coral-virtual-list-content>
 *       <!-- Items will be rendered here -->
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const list = createVirtualList(element, {
 *   itemCount: 10000,
 *   itemHeight: 40,
 *   height: 400,
 *   renderItem: (index, style) => {
 *     const item = document.createElement('div')
 *     item.className = 'virtual-list-item'
 *     Object.assign(item.style, style)
 *     item.textContent = `Item ${index}`
 *     return item
 *   }
 * })
 * ```
 */
export class VirtualList extends BaseComponent {
  protected declare config: VirtualListConfig
  protected declare state: VirtualListState

  private container: HTMLElement | null = null
  private content: HTMLElement | null = null
  private spacer: HTMLElement | null = null
  private renderedItems: Map<number, HTMLElement> = new Map()
  private measurementCache: Map<number, number> = new Map()
  private scrollRAF: number | null = null
  private resizeObserver: ResizeObserver | null = null

  protected getDefaultConfig(): VirtualListConfig {
    return {
      itemCount: 0,
      itemHeight: 40,
      estimatedItemHeight: 40,
      height: 400,
      overscan: 3,
      variableHeight: false,
      containerSelector: '[data-coral-virtual-list-container]',
      contentSelector: '[data-coral-virtual-list-content]',
    }
  }

  protected getInitialState(): VirtualListState {
    return {
      scrollTop: 0,
      startIndex: 0,
      endIndex: 0,
      visibleItems: [],
      itemHeights: new Map(),
    }
  }

  protected setupAria(): void {
    this.container = this.query(this.config.containerSelector!)
    this.content = this.query(this.config.contentSelector!)

    // Read config from data attributes
    const dataItemCount = this.element.dataset.itemCount
    if (dataItemCount) {
      this.config.itemCount = parseInt(dataItemCount, 10)
    }

    const dataItemHeight = this.element.dataset.itemHeight
    if (dataItemHeight) {
      this.config.itemHeight = parseInt(dataItemHeight, 10)
    }

    const dataHeight = this.element.dataset.height
    if (dataHeight) {
      this.config.height = parseInt(dataHeight, 10)
    }

    if (!this.container) {
      this.container = document.createElement('div')
      this.container.setAttribute('data-coral-virtual-list-container', '')
      this.element.appendChild(this.container)
    }

    if (!this.content) {
      this.content = document.createElement('div')
      this.content.setAttribute('data-coral-virtual-list-content', '')
      this.container.appendChild(this.content)
    }

    // Create spacer element for scroll height
    this.spacer = document.createElement('div')
    this.spacer.setAttribute('data-coral-virtual-list-spacer', '')
    this.spacer.style.position = 'absolute'
    this.spacer.style.top = '0'
    this.spacer.style.left = '0'
    this.spacer.style.width = '1px'
    this.spacer.style.pointerEvents = 'none'
    this.container.appendChild(this.spacer)

    // Set up container styles
    this.container.style.position = 'relative'
    this.container.style.height = `${this.config.height}px`
    this.container.style.overflow = 'auto'
    this.container.style.willChange = 'scroll-position'

    // Set up content styles
    this.content.style.position = 'relative'
    this.content.style.width = '100%'

    // Set up ARIA
    this.element.setAttribute('role', 'list')
    this.element.setAttribute('aria-rowcount', String(this.config.itemCount))

    // Initialize visible range
    this.calculateVisibleRange()
  }

  protected bindEvents(): void {
    if (!this.container) {
      return
    }

    // Scroll handler with RAF throttling
    this.addEventListener(this.container, 'scroll', () => {
      if (this.scrollRAF) {
        return
      }

      this.scrollRAF = requestAnimationFrame(() => {
        this.scrollRAF = null
        this.handleScroll()
      })
    })

    // Resize observer for container size changes
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateVisibleRange()
      })
      this.resizeObserver.observe(this.container)
    }
  }

  private handleScroll(): void {
    if (!this.container) {
      return
    }

    const scrollTop = this.container.scrollTop
    this.setState({ scrollTop })
    this.calculateVisibleRange()
  }

  private calculateVisibleRange(): void {
    const { itemCount, itemHeight, overscan, height, variableHeight } = this.config
    const { scrollTop } = this.state

    if (!itemCount || !height) {
      return
    }

    let startIndex: number
    let endIndex: number

    if (variableHeight) {
      // Variable height calculation
      startIndex = this.findStartIndex(scrollTop)
      endIndex = this.findEndIndex(startIndex, height)
    } else {
      // Fixed height calculation
      startIndex = Math.floor(scrollTop / itemHeight!)
      const visibleCount = Math.ceil(height / itemHeight!)
      endIndex = Math.min(startIndex + visibleCount, itemCount - 1)
    }

    // Apply overscan
    startIndex = Math.max(0, startIndex - overscan!)
    endIndex = Math.min(itemCount - 1, endIndex + overscan!)

    // Generate visible items array
    const visibleItems: number[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push(i)
    }

    this.setState({ startIndex, endIndex, visibleItems })
    this.renderItems()
  }

  private findStartIndex(scrollTop: number): number {
    const { itemCount, estimatedItemHeight } = this.config
    let offset = 0
    let index = 0

    while (index < itemCount && offset < scrollTop) {
      offset += this.getItemHeight(index)
      index++
    }

    return Math.max(0, index - 1)
  }

  private findEndIndex(startIndex: number, viewportHeight: number): number {
    const { itemCount } = this.config
    let offset = 0
    let index = startIndex

    while (index < itemCount && offset < viewportHeight) {
      offset += this.getItemHeight(index)
      index++
    }

    return Math.min(itemCount - 1, index)
  }

  private getItemHeight(index: number): number {
    // Check measurement cache
    if (this.measurementCache.has(index)) {
      return this.measurementCache.get(index)!
    }

    // Check state cache
    if (this.state.itemHeights.has(index)) {
      return this.state.itemHeights.get(index)!
    }

    // Return estimated height
    return this.config.variableHeight
      ? this.config.estimatedItemHeight!
      : this.config.itemHeight!
  }

  private getItemOffset(index: number): number {
    let offset = 0
    for (let i = 0; i < index; i++) {
      offset += this.getItemHeight(i)
    }
    return offset
  }

  private getTotalHeight(): number {
    const { itemCount, variableHeight, itemHeight, estimatedItemHeight } = this.config

    if (!variableHeight) {
      return itemCount * itemHeight!
    }

    let total = 0
    for (let i = 0; i < itemCount; i++) {
      total += this.getItemHeight(i)
    }
    return total
  }

  private renderItems(): void {
    if (!this.content || !this.spacer) {
      return
    }

    const { visibleItems } = this.state
    const { renderItem, itemHeight, variableHeight } = this.config

    // Update spacer height
    this.spacer.style.height = `${this.getTotalHeight()}px`

    // Track which items need to be added/removed
    const newItems = new Set(visibleItems)
    const toRemove: number[] = []

    // Find items to remove
    this.renderedItems.forEach((element, index) => {
      if (!newItems.has(index)) {
        toRemove.push(index)
      }
    })

    // Remove old items
    toRemove.forEach((index) => {
      const element = this.renderedItems.get(index)
      if (element) {
        element.remove()
        this.renderedItems.delete(index)
      }
    })

    // Add/update visible items
    visibleItems.forEach((index) => {
      if (!this.renderedItems.has(index)) {
        const offset = this.getItemOffset(index)
        const height = this.getItemHeight(index)

        const style: Record<string, string> = {
          position: 'absolute',
          top: `${offset}px`,
          left: '0',
          right: '0',
          height: variableHeight ? 'auto' : `${height}px`,
          minHeight: variableHeight ? `${height}px` : 'auto',
        }

        let element: HTMLElement

        if (renderItem) {
          element = renderItem(index, style)
        } else {
          element = document.createElement('div')
          element.setAttribute('data-coral-virtual-list-item', '')
          element.setAttribute('data-index', String(index))
          element.textContent = `Item ${index}`
          Object.assign(element.style, style)
        }

        element.setAttribute('role', 'listitem')
        element.setAttribute('aria-rowindex', String(index + 1))

        this.content!.appendChild(element)
        this.renderedItems.set(index, element)

        // Measure actual height for variable height items
        if (variableHeight) {
          const actualHeight = element.getBoundingClientRect().height
          if (actualHeight !== height) {
            this.measurementCache.set(index, actualHeight)
          }
        }
      }
    })

    // Dispatch render event
    this.dispatch('render', {
      startIndex: this.state.startIndex,
      endIndex: this.state.endIndex,
      visibleCount: visibleItems.length,
    })
  }

  protected override render(): void {
    this.renderItems()
  }

  /**
   * Scroll to a specific item
   */
  scrollToIndex(index: number, align: 'start' | 'center' | 'end' = 'start'): void {
    if (!this.container) {
      return
    }

    const { height } = this.config
    const offset = this.getItemOffset(index)
    const itemHeight = this.getItemHeight(index)

    let scrollTop: number

    switch (align) {
      case 'center':
        scrollTop = offset - (height! / 2) + (itemHeight / 2)
        break
      case 'end':
        scrollTop = offset - height! + itemHeight
        break
      case 'start':
      default:
        scrollTop = offset
        break
    }

    this.container.scrollTop = Math.max(0, scrollTop)
  }

  /**
   * Update item count
   */
  setItemCount(count: number): void {
    this.config.itemCount = count
    this.element.setAttribute('aria-rowcount', String(count))
    this.measurementCache.clear()
    this.calculateVisibleRange()
  }

  /**
   * Update item height measurement
   */
  setItemHeight(index: number, height: number): void {
    this.measurementCache.set(index, height)
    this.state.itemHeights.set(index, height)
    this.calculateVisibleRange()
  }

  /**
   * Force re-render all items
   */
  refresh(): void {
    this.renderedItems.forEach((element) => element.remove())
    this.renderedItems.clear()
    this.measurementCache.clear()
    this.calculateVisibleRange()
  }

  /**
   * Get visible range
   */
  getVisibleRange(): { start: number; end: number } {
    return {
      start: this.state.startIndex,
      end: this.state.endIndex,
    }
  }

  override destroy(): void {
    // Cancel pending RAF
    if (this.scrollRAF) {
      cancelAnimationFrame(this.scrollRAF)
      this.scrollRAF = null
    }

    // Disconnect ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }

    // Clear rendered items
    this.renderedItems.forEach((element) => element.remove())
    this.renderedItems.clear()
    this.measurementCache.clear()

    super.destroy()
  }
}

/**
 * Create a virtual list instance
 */
export const createVirtualList = createComponentFactory(VirtualList)

export default VirtualList
