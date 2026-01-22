/**
 * Transfer Component
 *
 * A dual-list component for transferring items between two lists.
 * Useful for selecting multiple items from a source list to a target list.
 *
 * @module components/transfer
 */

import { BaseComponent, createComponentFactory } from './base'
import type { ComponentConfig, ComponentState } from '../types'

/**
 * Transfer item structure
 */
export interface TransferItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional description */
  description?: string
  /** Whether the item is disabled */
  disabled?: boolean
  /** Optional grouping key */
  group?: string
}

/**
 * Transfer list state
 */
export interface TransferListState {
  /** Items in the list */
  items: TransferItem[]
  /** Selected item IDs */
  selectedIds: Set<string>
  /** Filter text */
  filter: string
}

/**
 * Transfer configuration
 */
export interface TransferConfig extends ComponentConfig {
  /** Source items */
  sourceItems: TransferItem[]
  /** Target items (initially transferred) */
  targetItems?: TransferItem[]
  /** Allow selecting all items */
  selectAll?: boolean
  /** Show search/filter inputs */
  searchable?: boolean
  /** Show item count */
  showCount?: boolean
  /** Display mode */
  mode?: 'move' | 'add'
  /** Disable the component */
  disabled?: boolean
  /** Maximum items in target list */
  maxTargetItems?: number
  /** Sort items alphabetically */
  sortable?: boolean
}

/**
 * Transfer component state
 */
export interface TransferComponentState extends ComponentState {
  /** Source list state */
  source: TransferListState
  /** Target list state */
  target: TransferListState
  /** Disabled state */
  disabled: boolean
}

/**
 * Transfer Component
 *
 * A dual-list component for transferring items between two lists.
 *
 * @example
 * ```html
 * <div data-coral-transfer>
 *   <div data-coral-transfer-source>
 *     <input type="text" data-coral-transfer-filter="source" placeholder="Search..." />
 *     <div data-coral-transfer-list="source"></div>
 *   </div>
 *   <div data-coral-transfer-controls>
 *     <button type="button" data-coral-transfer-move="to-target">&raquo;</button>
 *     <button type="button" data-coral-transfer-move="to-source">&laquo;</button>
 *   </div>
 *   <div data-coral-transfer-target>
 *     <input type="text" data-coral-transfer-filter="target" placeholder="Search..." />
 *     <div data-coral-transfer-list="target"></div>
 *   </div>
 * </div>
 * ```
 */
export class Transfer extends BaseComponent {
  protected override state!: TransferComponentState
  protected override config!: TransferConfig
  private sourceListElement: HTMLElement | null = null
  private targetListElement: HTMLElement | null = null
  private sourceFilterInput: HTMLInputElement | null = null
  private targetFilterInput: HTMLInputElement | null = null
  private toTargetButton: HTMLButtonElement | null = null
  private toSourceButton: HTMLButtonElement | null = null

  constructor(element: HTMLElement, config: TransferConfig) {
    super(element, config)
    this.cacheElements()
    this.render()
  }

  protected getDefaultConfig(): TransferConfig {
    return {
      sourceItems: [],
      selectAll: true,
      searchable: true,
      showCount: true,
      mode: 'move',
      disabled: false,
      sortable: true,
    }
  }

  protected getInitialState(): TransferComponentState {
    return {
      source: {
        items: this.config.sourceItems || [],
        selectedIds: new Set(),
        filter: '',
      },
      target: {
        items: this.config.targetItems || [],
        selectedIds: new Set(),
        filter: '',
      },
      disabled: this.config.disabled || false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Transfer list')
  }

  private cacheElements(): void {
    this.sourceListElement = this.element.querySelector('[data-coral-transfer-list="source"]')
    this.targetListElement = this.element.querySelector('[data-coral-transfer-list="target"]')
    this.sourceFilterInput = this.element.querySelector('[data-coral-transfer-filter="source"]') as HTMLInputElement
    this.targetFilterInput = this.element.querySelector('[data-coral-transfer-filter="target"]') as HTMLInputElement
    this.toTargetButton = this.element.querySelector('[data-coral-transfer-move="to-target"]') as HTMLButtonElement
    this.toSourceButton = this.element.querySelector('[data-coral-transfer-move="to-source"]') as HTMLButtonElement
  }

  protected bindEvents(): void {
    // Filter inputs
    this.sourceFilterInput?.addEventListener('input', (e) => this.handleFilterChange('source', (e.target as HTMLInputElement).value))
    this.targetFilterInput?.addEventListener('input', (e) => this.handleFilterChange('target', (e.target as HTMLInputElement).value))

    // Control buttons
    this.toTargetButton?.addEventListener('click', () => this.moveToTarget())
    this.toSourceButton?.addEventListener('click', () => this.moveToSource())

    // Keyboard navigation
    this.element.addEventListener('keydown', this.handleKeydown.bind(this))
  }

  private handleFilterChange(list: 'source' | 'target', value: string): void {
    const state = list === 'source' ? this.state.source : this.state.target
    state.filter = value
    this.renderList(list)
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Handle keyboard shortcuts for moving items
    if (event.key === 'ArrowRight' && event.altKey) {
      event.preventDefault()
      this.moveToTarget()
    } else if (event.key === 'ArrowLeft' && event.altKey) {
      event.preventDefault()
      this.moveToSource()
    }
  }

  private moveToTarget(): void {
    if (this.state.disabled) {return}

    const selectedItems = this.getSelectedItems('source')
    const maxItems = this.config.maxTargetItems

    if (maxItems && this.state.target.items.length + selectedItems.length > maxItems) {
      this.emit('error', `Maximum ${maxItems} items allowed`)
      return
    }

    // Move items
    this.state.source.items = this.state.source.items.filter(
      (item) => !this.state.source.selectedIds.has(item.id)
    )
    this.state.target.items.push(...selectedItems)
    this.state.source.selectedIds.clear()

    if (this.config.sortable) {
      this.sortItems(this.state.target.items)
    }

    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  private moveToSource(): void {
    if (this.state.disabled) {return}

    const selectedItems = this.getSelectedItems('target')

    // Move items back
    this.state.target.items = this.state.target.items.filter(
      (item) => !this.state.target.selectedIds.has(item.id)
    )
    this.state.source.items.push(...selectedItems)
    this.state.target.selectedIds.clear()

    if (this.config.sortable) {
      this.sortItems(this.state.source.items)
    }

    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  private getSelectedItems(list: 'source' | 'target'): TransferItem[] {
    const state = list === 'source' ? this.state.source : this.state.target
    return state.items.filter((item) => state.selectedIds.has(item.id))
  }

  private sortItems(items: TransferItem[]): void {
    items.sort((a, b) => a.label.localeCompare(b.label))
  }

  private getFilteredItems(list: 'source' | 'target'): TransferItem[] {
    const state = list === 'source' ? this.state.source : this.state.target
    const filter = state.filter.toLowerCase()

    if (!filter) {return state.items}

    return state.items.filter((item) =>
      item.label.toLowerCase().includes(filter) ||
      item.description?.toLowerCase().includes(filter)
    )
  }

  protected override render(): void {
    this.renderList('source')
    this.renderList('target')
    this.updateControls()
  }

  private renderList(list: 'source' | 'target'): void {
    const listElement = list === 'source' ? this.sourceListElement : this.targetListElement
    if (!listElement) {return}

    const state = list === 'source' ? this.state.source : this.state.target
    const items = this.getFilteredItems(list)

    listElement.innerHTML = ''

    if (items.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'transfer-empty'
      empty.textContent = state.filter ? 'No results found' : 'No items'
      listElement.appendChild(empty)
      return
    }

    // Group items if groups exist
    const groups = new Map<string, TransferItem[]>()
    items.forEach((item) => {
      const group = item.group || ''
      if (!groups.has(group)) {
        groups.set(group, [])
      }
      groups.get(group)!.push(item)
    })

    groups.forEach((groupItems, group) => {
      if (group) {
        const groupHeader = document.createElement('div')
        groupHeader.className = 'transfer-group-header'
        groupHeader.textContent = group
        listElement.appendChild(groupHeader)
      }

      groupItems.forEach((item) => {
        const itemElement = this.renderItem(item, list, state)
        listElement.appendChild(itemElement)
      })
    })
  }

  private renderItem(item: TransferItem, list: 'source' | 'target', state: TransferListState): HTMLElement {
    const stateKey = list
    const itemState = this.state[stateKey]
    const isSelected = itemState.selectedIds.has(item.id)

    const element = document.createElement('div')
    element.className = 'transfer-item'
    element.setAttribute('data-transfer-item-id', item.id)
    element.setAttribute('role', 'option')
    element.setAttribute('aria-selected', isSelected.toString())

    if (item.disabled) {
      element.classList.add('disabled')
      element.setAttribute('aria-disabled', 'true')
    }

    if (isSelected) {
      element.classList.add('selected')
    }

    // Checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = isSelected
    checkbox.disabled = item.disabled || this.state.disabled
    checkbox.addEventListener('change', () => this.toggleItemSelection(list, item.id))
    element.appendChild(checkbox)

    // Content
    const content = document.createElement('div')
    content.className = 'transfer-item-content'

    const label = document.createElement('span')
    label.className = 'transfer-item-label'
    label.textContent = item.label
    content.appendChild(label)

    if (item.description) {
      const description = document.createElement('span')
      description.className = 'transfer-item-description'
      description.textContent = item.description
      content.appendChild(description)
    }

    element.appendChild(content)

    // Click handler
    element.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked
        this.toggleItemSelection(list, item.id)
      }
    })

    return element
  }

  private toggleItemSelection(list: 'source' | 'target', itemId: string): void {
    const state = list === 'source' ? this.state.source : this.state.target

    if (state.selectedIds.has(itemId)) {
      state.selectedIds.delete(itemId)
    } else {
      state.selectedIds.add(itemId)
    }

    this.renderList(list)
    this.updateControls()
  }

  private updateControls(): void {
    if (this.toTargetButton) {
      this.toTargetButton.disabled = this.state.source.selectedIds.size === 0 || this.state.disabled
    }

    if (this.toSourceButton) {
      this.toSourceButton.disabled = this.state.target.selectedIds.size === 0 || this.state.disabled
    }
  }

  /**
   * Get the source items
   */
  getSourceItems(): TransferItem[] {
    return [...this.state.source.items]
  }

  /**
   * Get the target items
   */
  getTargetItems(): TransferItem[] {
    return [...this.state.target.items]
  }

  /**
   * Set the source items
   */
  setSourceItems(items: TransferItem[]): void {
    this.state.source.items = items
    this.state.source.selectedIds.clear()
    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  /**
   * Set the target items
   */
  setTargetItems(items: TransferItem[]): void {
    this.state.target.items = items
    this.state.target.selectedIds.clear()
    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  /**
   * Move all items to target
   */
  moveAllToTarget(): void {
    if (this.state.disabled) {return}

    const maxItems = this.config.maxTargetItems
    const itemsToMove = maxItems
      ? this.state.source.items.slice(0, maxItems - this.state.target.items.length)
      : [...this.state.source.items]

    this.state.target.items.push(...itemsToMove)
    this.state.source.items = this.state.source.items.filter(
      (item) => !itemsToMove.includes(item)
    )

    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  /**
   * Move all items to source
   */
  moveAllToSource(): void {
    if (this.state.disabled) {return}

    this.state.source.items.push(...this.state.target.items)
    this.state.target.items = []

    this.render()
    this.emit('change', {
      source: this.state.source.items,
      target: this.state.target.items,
    })
  }

  /**
   * Clear all selections
   */
  clearSelection(list?: 'source' | 'target'): void {
    if (list) {
      const state = list === 'source' ? this.state.source : this.state.target
      state.selectedIds.clear()
      this.renderList(list)
    } else {
      this.state.source.selectedIds.clear()
      this.state.target.selectedIds.clear()
      this.render()
    }
    this.updateControls()
  }

  /**
   * Disable the transfer component
   */
  disable(): void {
    this.setState({ disabled: true })
    this.element.classList.add('disabled')
    this.updateControls()
  }

  /**
   * Enable the transfer component
   */
  enable(): void {
    this.setState({ disabled: false })
    this.element.classList.remove('disabled')
    this.updateControls()
  }

  /**
   * Destroy the component
   */
  override destroy(): void {
    this.sourceFilterInput?.replaceWith(this.sourceFilterInput.cloneNode(true))
    this.targetFilterInput?.replaceWith(this.targetFilterInput.cloneNode(true))
    this.toTargetButton?.replaceWith(this.toTargetButton.cloneNode(true))
    this.toSourceButton?.replaceWith(this.toSourceButton.cloneNode(true))
    super.destroy()
  }
}

/**
 * Factory function to create a Transfer instance
 */
export function createTransfer(element: HTMLElement, config?: TransferConfig): Transfer {
  return new Transfer(element, config!)
}

/**
 * Factory to create Transfer components with consistent configuration
 */
export const createTransferFactory = createComponentFactory<Transfer, TransferConfig>(
  Transfer as unknown as new (element: HTMLElement, config?: Partial<TransferConfig>) => Transfer
)

export default Transfer
