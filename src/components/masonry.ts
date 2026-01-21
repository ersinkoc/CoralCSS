/**
 * Masonry Layout Component
 *
 * A Pinterest-style masonry grid layout with responsive columns,
 * animation support, and dynamic item positioning.
 *
 * @module components/masonry
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Masonry configuration
 */
export interface MasonryConfig extends ComponentConfig {
  columns?: number | 'auto'
  columnWidth?: number
  gap?: number
  itemSelector?: string
  fitWidth?: boolean
  horizontalOrder?: boolean
  animate?: boolean
  animationDuration?: number
  animationEasing?: string
  onLayoutComplete?: (items: HTMLElement[]) => void
  onItemPositioned?: (item: HTMLElement, position: { x: number; y: number }) => void
}

/**
 * Masonry state
 */
export interface MasonryState extends ComponentState {
  columns: number
  columnHeights: number[]
  items: HTMLElement[]
  layoutComplete: boolean
}

interface ItemPosition {
  element: HTMLElement
  x: number
  y: number
  width: number
  height: number
  column: number
}

/**
 * Masonry Layout Component Class
 */
export class Masonry extends BaseComponent {
  declare protected config: MasonryConfig
  declare protected state: MasonryState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private resizeObserver!: ResizeObserver | null
  private mutationObserver!: MutationObserver | null
  private positions!: Map<HTMLElement, ItemPosition>
  private resizeDebounceTimeout!: ReturnType<typeof setTimeout> | null

  protected getDefaultConfig(): MasonryConfig {
    return {
      columns: 'auto',
      columnWidth: 300,
      gap: 16,
      itemSelector: '*',
      fitWidth: false,
      horizontalOrder: false,
      animate: false,
      animationDuration: 300,
      animationEasing: 'ease-out',
    }
  }

  protected getInitialState(): MasonryState {
    return {
      columns: this.calculateColumns(),
      columnHeights: [],
      items: [],
      layoutComplete: false,
    }
  }

  protected override validateConfig(): void {
    super.validateConfig()

    // Ensure columns is positive if numeric
    if (typeof this.config.columns === 'number' && this.config.columns <= 0) {
      this.warnConfig(`columns must be positive, got ${this.config.columns}. Using 'auto'.`)
      this.config.columns = 'auto'
    }

    // Ensure columnWidth is positive
    if (this.config.columnWidth !== undefined && this.config.columnWidth <= 0) {
      this.warnConfig(`columnWidth must be positive, got ${this.config.columnWidth}. Using default 300.`)
      this.config.columnWidth = 300
    }

    // Ensure gap is non-negative
    if (this.config.gap !== undefined && this.config.gap < 0) {
      this.warnConfig(`gap must be non-negative, got ${this.config.gap}. Using 0.`)
      this.config.gap = 0
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'grid')
    this.element.setAttribute('aria-label', 'Masonry grid layout')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.resizeObserver = null
    this.mutationObserver = null
    this.positions = new Map()
    this.resizeDebounceTimeout = null

    this.element.classList.add('masonry-container')
    this.element.style.position = 'relative'

    // Setup resize observer with debounce to prevent excessive layouts
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeDebounceTimeout) {
          clearTimeout(this.resizeDebounceTimeout)
        }
        this.resizeDebounceTimeout = setTimeout(() => {
          this.refresh()
        }, 100) // 100ms debounce
      })
      this.resizeObserver.observe(this.element)
    } else {
      console.warn('Masonry: ResizeObserver is not supported. Auto-relayout on resize will not work.')
    }

    // Setup mutation observer
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver((mutations) => {
        let needsLayout = false
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
            needsLayout = true
          }
        })
        if (needsLayout) {
          this.refresh()
        }
      })
      this.mutationObserver.observe(this.element, { childList: true })
    }
  }

  private calculateColumns(): number {
    if (typeof this.config.columns === 'number') {
      return this.config.columns
    }

    const containerWidth = this.element.clientWidth
    const columnWidth = this.config.columnWidth || 300
    const gap = this.config.gap || 16

    return Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)))
  }

  private getItems(): HTMLElement[] {
    const selector = this.config.itemSelector || '*'
    return Array.from(this.element.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.classList.contains('masonry-sizer')
    )
  }

  private getShortestColumn(): number {
    const heights = this.state.columnHeights
    let shortestIndex = 0
    let shortestHeight = heights[0] || 0

    for (let i = 1; i < heights.length; i++) {
      if ((heights[i] || 0) < shortestHeight) {
        shortestHeight = heights[i] || 0
        shortestIndex = i
      }
    }

    return shortestIndex
  }

  layout(): void {
    const items = this.getItems()
    const columns = this.calculateColumns()
    const gap = this.config.gap || 16
    const columnWidth = this.element.clientWidth / columns - gap * ((columns - 1) / columns)
    const columnHeights = Array(columns).fill(0)

    this.positions.clear()

    // PHASE 1: Batch all reads to avoid layout thrashing
    // First, set widths (write phase 1 - only widths, no position changes)
    items.forEach((item) => {
      item.style.position = 'absolute'
      item.style.width = `${columnWidth}px`
    })

    // Force a single layout recalculation, then read all heights at once
    const itemHeights = items.map((item) => item.offsetHeight)

    // PHASE 2: Batch all writes (positions and transforms)
    items.forEach((item, index) => {
      const height = itemHeights[index] || 0
      const column = this.config.horizontalOrder
        ? columnHeights.indexOf(Math.min(...columnHeights))
        : this.getShortestColumnIndex(columnHeights)

      const x = column * (columnWidth + gap)
      const y = columnHeights[column] || 0

      if (this.config.animate) {
        item.style.transition = `transform ${this.config.animationDuration}ms ${this.config.animationEasing}`
      }

      item.style.transform = `translate(${x}px, ${y}px)`

      columnHeights[column] = (columnHeights[column] || 0) + height + gap

      this.positions.set(item, {
        element: item,
        x,
        y,
        width: columnWidth,
        height,
        column,
      })

      this.config.onItemPositioned?.(item, { x, y })
    })

    // Set container height (guard against empty array - Math.max(...[]) returns -Infinity)
    const maxHeight = columnHeights.length > 0 ? Math.max(...columnHeights) - gap : 0
    this.element.style.height = `${Math.max(0, maxHeight)}px`

    this.setState({
      columns,
      columnHeights,
      items,
      layoutComplete: true,
    })

    this.config.onLayoutComplete?.(items)
  }

  private getShortestColumnIndex(heights: number[]): number {
    let minIndex = 0
    let minHeight = heights[0] || 0

    for (let i = 1; i < heights.length; i++) {
      if ((heights[i] || 0) < minHeight) {
        minHeight = heights[i] || 0
        minIndex = i
      }
    }

    return minIndex
  }

  refresh(): void {
    this.layout()
  }

  addItem(item: HTMLElement): void {
    this.element.appendChild(item)
    this.layout()
  }

  removeItem(item: HTMLElement): void {
    if (this.element.contains(item)) {
      item.remove()
      this.positions.delete(item)
      this.layout()
    }
  }

  prependItem(item: HTMLElement): void {
    this.element.insertBefore(item, this.element.firstChild)
    this.layout()
  }

  override getState(): MasonryState {
    return { ...this.state }
  }

  getItemPosition(item: HTMLElement): ItemPosition | undefined {
    return this.positions.get(item)
  }

  override destroy(): void {
    if (this.resizeDebounceTimeout) {
      clearTimeout(this.resizeDebounceTimeout)
      this.resizeDebounceTimeout = null
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
      this.mutationObserver = null
    }
    this.positions.clear()
    super.destroy()
  }
}

/**
 * Create Masonry instance
 */
export function createMasonry(element: HTMLElement, config?: Partial<MasonryConfig>): Masonry {
  return new Masonry(element, config)
}

export default Masonry
