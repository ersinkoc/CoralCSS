/**
 * Spotlight Component
 *
 * A command palette / search spotlight component similar to Cmd+K interfaces.
 * Supports keyboard navigation, search filtering, and command execution.
 *
 * @module components/spotlight
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/** Debounce delay for search input (milliseconds) */
const SEARCH_DEBOUNCE_MS = 150

/**
 * Spotlight item interface
 */
export interface SpotlightItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  group?: string
  keywords?: string[]
  action?: () => void
  href?: string
  disabled?: boolean
}

/**
 * Spotlight configuration
 */
export interface SpotlightConfig extends ComponentConfig {
  items?: SpotlightItem[]
  placeholder?: string
  emptyMessage?: string
  hotkey?: string
  maxResults?: number
  fuzzyMatch?: boolean
  showGroups?: boolean
  showRecent?: boolean
  recentLimit?: number
  closeOnSelect?: boolean
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
  animationDuration?: number
  onSearch?: (query: string) => void
  onSelect?: (item: SpotlightItem) => void
  onOpen?: () => void
  onClose?: () => void
}

/**
 * Spotlight state
 */
export interface SpotlightState extends ComponentState {
  isOpen: boolean
  query: string
  results: SpotlightItem[]
  selectedIndex: number
  isLoading: boolean
  recentItems: string[]
}

/**
 * Spotlight Component Class
 */
export class Spotlight extends BaseComponent {
  declare protected config: SpotlightConfig
  declare protected state: SpotlightState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private overlay!: HTMLElement | null
  private dialog!: HTMLElement | null
  private input!: HTMLInputElement | null
  private resultsList!: HTMLElement | null
  private hotkeyHandler!: ((e: KeyboardEvent) => void) | null
  // Debounce and stale request tracking
  private searchDebounceTimeout!: ReturnType<typeof setTimeout> | null
  private searchRequestId!: number

  protected getDefaultConfig(): SpotlightConfig {
    return {
      items: [],
      placeholder: 'Search...',
      emptyMessage: 'No results found',
      hotkey: 'k',
      maxResults: 10,
      fuzzyMatch: true,
      showGroups: true,
      showRecent: true,
      recentLimit: 5,
      closeOnSelect: true,
      closeOnEscape: true,
      closeOnClickOutside: true,
      animationDuration: 200,
    }
  }

  protected getInitialState(): SpotlightState {
    return {
      isOpen: false,
      query: '',
      results: this.config.items || [],
      selectedIndex: 0,
      isLoading: false,
      recentItems: [],
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'dialog')
    this.element.setAttribute('aria-modal', 'true')
    this.element.setAttribute('aria-label', 'Search spotlight')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.overlay = null
    this.dialog = null
    this.input = null
    this.resultsList = null
    this.hotkeyHandler = null
    this.searchDebounceTimeout = null
    this.searchRequestId = 0

    this.buildDOM()
    this.setupKeyboardShortcut()
    this.setupInputEvents()
    this.setupClickOutside()
  }

  private buildDOM(): void {
    this.element.classList.add('spotlight-container')
    this.element.style.display = 'none'

    // Create overlay
    this.overlay = document.createElement('div')
    this.overlay.className = 'spotlight-overlay'
    this.element.appendChild(this.overlay)

    // Create dialog
    this.dialog = document.createElement('div')
    this.dialog.className = 'spotlight-dialog'
    this.dialog.setAttribute('role', 'combobox')
    this.dialog.setAttribute('aria-expanded', 'false')
    this.dialog.setAttribute('aria-haspopup', 'listbox')

    // Create search input
    const inputWrapper = document.createElement('div')
    inputWrapper.className = 'spotlight-input-wrapper'

    const searchIcon = document.createElement('span')
    searchIcon.className = 'spotlight-search-icon'
    searchIcon.innerHTML = '🔍'
    searchIcon.setAttribute('aria-hidden', 'true')
    inputWrapper.appendChild(searchIcon)

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.className = 'spotlight-input'
    this.input.placeholder = this.config.placeholder || 'Search...'
    this.input.setAttribute('role', 'searchbox')
    this.input.setAttribute('aria-autocomplete', 'list')
    this.input.setAttribute('aria-controls', 'spotlight-results')
    inputWrapper.appendChild(this.input)

    this.dialog.appendChild(inputWrapper)

    // Create results list
    this.resultsList = document.createElement('div')
    this.resultsList.id = 'spotlight-results'
    this.resultsList.className = 'spotlight-results'
    this.resultsList.setAttribute('role', 'listbox')
    this.dialog.appendChild(this.resultsList)

    this.element.appendChild(this.dialog)
    this.renderResults()
  }

  private setupKeyboardShortcut(): void {
    this.hotkeyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === this.config.hotkey) {
        e.preventDefault()
        this.toggle()
      }
    }
    document.addEventListener('keydown', this.hotkeyHandler)
  }

  private setupInputEvents(): void {
    if (!this.input) return

    this.input.addEventListener('input', () => {
      const query = this.input?.value || ''
      this.search(query)
    })

    this.input.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          this.selectNext()
          break
        case 'ArrowUp':
          e.preventDefault()
          this.selectPrevious()
          break
        case 'Enter':
          e.preventDefault()
          this.executeSelected()
          break
        case 'Escape':
          if (this.config.closeOnEscape) {
            this.close()
          }
          break
      }
    })
  }

  private setupClickOutside(): void {
    this.overlay?.addEventListener('click', () => {
      if (this.config.closeOnClickOutside) {
        this.close()
      }
    })
  }

  private search(query: string): void {
    this.setState({ query })

    // Clear previous debounce timeout
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout)
    }

    // Debounce the search to prevent excessive calls
    this.searchDebounceTimeout = setTimeout(() => {
      this.executeSearch(query)
    }, SEARCH_DEBOUNCE_MS)
  }

  private executeSearch(query: string): void {
    // Increment request ID to track stale responses
    const requestId = ++this.searchRequestId

    // Notify external handler (may be async)
    this.config.onSearch?.(query)

    const items = this.config.items || []
    let results: SpotlightItem[]

    if (!query.trim()) {
      if (this.config.showRecent && this.state.recentItems.length > 0) {
        results = items.filter((item) => this.state.recentItems.includes(item.id)).slice(0, this.config.recentLimit)
      } else {
        results = items.slice(0, this.config.maxResults)
      }
    } else {
      results = this.filterItems(items, query)
    }

    // Only update if this is still the latest request (prevents stale results)
    if (requestId === this.searchRequestId) {
      this.setState({ results, selectedIndex: 0 })
      this.renderResults()
    }
  }

  private filterItems(items: SpotlightItem[], query: string): SpotlightItem[] {
    const normalizedQuery = query.toLowerCase()

    return items
      .filter((item) => {
        if (item.disabled) return false

        const searchTargets = [item.label.toLowerCase(), item.description?.toLowerCase() || '', ...(item.keywords?.map((k) => k.toLowerCase()) || [])]

        if (this.config.fuzzyMatch) {
          return searchTargets.some((target) => this.fuzzyMatch(normalizedQuery, target))
        }

        return searchTargets.some((target) => target.includes(normalizedQuery))
      })
      .slice(0, this.config.maxResults)
  }

  private fuzzyMatch(pattern: string, text: string): boolean {
    let patternIdx = 0
    let textIdx = 0

    while (patternIdx < pattern.length && textIdx < text.length) {
      if (pattern[patternIdx] === text[textIdx]) {
        patternIdx++
      }
      textIdx++
    }

    return patternIdx === pattern.length
  }

  private renderResults(): void {
    if (!this.resultsList) return

    this.resultsList.innerHTML = ''

    if (this.state.results.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'spotlight-empty'
      empty.textContent = this.config.emptyMessage || 'No results found'
      this.resultsList.appendChild(empty)
      return
    }

    const groupedResults = this.groupResults(this.state.results)

    Object.entries(groupedResults).forEach(([group, items]) => {
      if (this.config.showGroups && group !== 'undefined') {
        const groupHeader = document.createElement('div')
        groupHeader.className = 'spotlight-group-header'
        groupHeader.textContent = group
        this.resultsList?.appendChild(groupHeader)
      }

      items.forEach((item, index) => {
        const globalIndex = this.state.results.indexOf(item)
        const resultItem = this.createResultItem(item, globalIndex)
        this.resultsList?.appendChild(resultItem)
      })
    })
  }

  private groupResults(items: SpotlightItem[]): Record<string, SpotlightItem[]> {
    return items.reduce(
      (groups, item) => {
        const group = item.group || 'Other'
        if (!groups[group]) {
          groups[group] = []
        }
        groups[group].push(item)
        return groups
      },
      {} as Record<string, SpotlightItem[]>
    )
  }

  private createResultItem(item: SpotlightItem, index: number): HTMLElement {
    const element = document.createElement('div')
    element.className = 'spotlight-result-item'
    element.setAttribute('role', 'option')
    element.setAttribute('aria-selected', String(index === this.state.selectedIndex))
    element.dataset.index = String(index)

    if (index === this.state.selectedIndex) {
      element.classList.add('selected')
    }

    if (item.disabled) {
      element.classList.add('disabled')
      element.setAttribute('aria-disabled', 'true')
    }

    if (item.icon) {
      const icon = document.createElement('span')
      icon.className = 'spotlight-item-icon'
      // Safety: Only allow SVG elements (starting with <svg), otherwise treat as text
      if (item.icon.trim().toLowerCase().startsWith('<svg')) {
        // Parse SVG safely using DOMParser
        const parser = new DOMParser()
        const doc = parser.parseFromString(item.icon, 'image/svg+xml')
        const svgEl = doc.querySelector('svg')
        if (svgEl && !doc.querySelector('parsererror')) {
          icon.appendChild(document.importNode(svgEl, true))
        } else {
          icon.textContent = item.icon
        }
      } else {
        icon.textContent = item.icon // Text or emoji - safe
      }
      element.appendChild(icon)
    }

    const content = document.createElement('div')
    content.className = 'spotlight-item-content'

    const label = document.createElement('span')
    label.className = 'spotlight-item-label'
    label.textContent = item.label
    content.appendChild(label)

    if (item.description) {
      const description = document.createElement('span')
      description.className = 'spotlight-item-description'
      description.textContent = item.description
      content.appendChild(description)
    }

    element.appendChild(content)

    if (item.shortcut) {
      const shortcut = document.createElement('span')
      shortcut.className = 'spotlight-item-shortcut'
      shortcut.textContent = item.shortcut
      element.appendChild(shortcut)
    }

    element.addEventListener('click', () => {
      if (!item.disabled) {
        this.selectItem(index)
        this.executeSelected()
      }
    })

    element.addEventListener('mouseenter', () => {
      if (!item.disabled) {
        this.selectItem(index)
      }
    })

    return element
  }

  private selectItem(index: number): void {
    this.setState({ selectedIndex: index })
    this.updateSelectedState()
  }

  private updateSelectedState(): void {
    const items = this.resultsList?.querySelectorAll('.spotlight-result-item')
    items?.forEach((item, index) => {
      if (index === this.state.selectedIndex) {
        item.classList.add('selected')
        item.setAttribute('aria-selected', 'true')
        // scrollIntoView may not be available in test environments
        if (typeof item.scrollIntoView === 'function') {
          item.scrollIntoView({ block: 'nearest' })
        }
      } else {
        item.classList.remove('selected')
        item.setAttribute('aria-selected', 'false')
      }
    })
  }

  // Public API

  override open(): void {
    this.element.style.display = 'flex'
    this.setState({ isOpen: true })
    this.dialog?.setAttribute('aria-expanded', 'true')
    this.input?.focus()
    this.search('')
    this.config.onOpen?.()
  }

  override close(): void {
    this.element.style.display = 'none'
    this.setState({ isOpen: false, query: '', selectedIndex: 0 })
    this.dialog?.setAttribute('aria-expanded', 'false')
    if (this.input) {
      this.input.value = ''
    }
    this.config.onClose?.()
  }

  override toggle(): void {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  isOpenState(): boolean {
    return this.state.isOpen
  }

  setItems(items: SpotlightItem[]): void {
    this.config.items = items
    this.search(this.state.query)
  }

  getItems(): SpotlightItem[] {
    return [...(this.config.items || [])]
  }

  addItem(item: SpotlightItem): void {
    this.config.items = [...(this.config.items || []), item]
    this.search(this.state.query)
  }

  removeItem(id: string): void {
    this.config.items = (this.config.items || []).filter((item) => item.id !== id)
    this.search(this.state.query)
  }

  setQuery(query: string): void {
    if (this.input) {
      this.input.value = query
    }
    // Programmatic query changes skip debounce - execute immediately
    this.setState({ query })
    this.executeSearch(query)
  }

  getQuery(): string {
    return this.state.query
  }

  clearQuery(): void {
    this.setQuery('')
  }

  selectNext(): void {
    const newIndex = (this.state.selectedIndex + 1) % Math.max(1, this.state.results.length)
    this.selectItem(newIndex)
  }

  selectPrevious(): void {
    const len = Math.max(1, this.state.results.length)
    const newIndex = (this.state.selectedIndex - 1 + len) % len
    this.selectItem(newIndex)
  }

  selectFirst(): void {
    this.selectItem(0)
  }

  selectLast(): void {
    this.selectItem(Math.max(0, this.state.results.length - 1))
  }

  selectIndex(index: number): void {
    if (index >= 0 && index < this.state.results.length) {
      this.selectItem(index)
    }
  }

  getFilteredItems(): SpotlightItem[] {
    return [...this.state.results]
  }

  getSelectedItem(): SpotlightItem | null {
    return this.state.results[this.state.selectedIndex] || null
  }

  executeSelected(): void {
    const selectedItem = this.state.results[this.state.selectedIndex]
    if (!selectedItem || selectedItem.disabled) return

    // Add to recent items
    const recentItems = [selectedItem.id, ...this.state.recentItems.filter((id) => id !== selectedItem.id)].slice(0, this.config.recentLimit)
    this.setState({ recentItems })

    this.config.onSelect?.(selectedItem)

    if (selectedItem.action) {
      selectedItem.action()
    } else if (selectedItem.href) {
      // Security: Only allow same-origin or relative URLs to prevent open redirect
      try {
        const url = new URL(selectedItem.href, window.location.origin)
        if (url.origin === window.location.origin) {
          window.location.href = selectedItem.href
        } else {
          console.warn('Spotlight: External URLs are blocked for security. Use action callback instead.')
        }
      } catch {
        // Relative URL - safe to navigate
        window.location.href = selectedItem.href
      }
    }

    if (this.config.closeOnSelect) {
      this.close()
    }
  }

  getRecentItems(): SpotlightItem[] {
    const items = this.config.items || []
    return this.state.recentItems.map((id) => items.find((item) => item.id === id)).filter((item): item is SpotlightItem => item !== undefined)
  }

  clearRecentItems(): void {
    this.setState({ recentItems: [] })
  }

  getGroups(): string[] {
    const items = this.config.items || []
    const groups = new Set<string>()
    items.forEach((item) => {
      if (item.group) {
        groups.add(item.group)
      }
    })
    return Array.from(groups)
  }

  setLoading(loading: boolean): void {
    this.setState({ isLoading: loading })
    this.resultsList?.classList.toggle('loading', loading)
  }

  override getState(): SpotlightState {
    return { ...this.state }
  }

  override destroy(): void {
    // Clean up debounce timeout
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout)
      this.searchDebounceTimeout = null
    }
    if (this.hotkeyHandler) {
      document.removeEventListener('keydown', this.hotkeyHandler)
    }
    super.destroy()
  }
}

/**
 * Create Spotlight instance
 */
export function createSpotlight(element: HTMLElement, config?: Partial<SpotlightConfig>): Spotlight {
  return new Spotlight(element, config)
}

export default Spotlight
