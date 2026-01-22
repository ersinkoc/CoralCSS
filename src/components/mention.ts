/**
 * Mention Component
 *
 * An accessible @mention input component for user/entity tagging.
 * Commonly used in chat, comments, and collaborative editing.
 *
 * @module components/mention
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Mention item
 */
export interface MentionItem {
  id: string
  value: string
  label: string
  avatar?: string
  description?: string
  disabled?: boolean
  data?: Record<string, unknown>
}

/**
 * Mention configuration
 */
export interface MentionConfig extends ComponentConfig {
  /**
   * Available mention items
   */
  items?: MentionItem[]

  /**
   * Trigger character(s) to activate mention
   * @default '@'
   */
  trigger?: string | string[]

  /**
   * Placeholder text
   * @default 'Type @ to mention...'
   */
  placeholder?: string

  /**
   * Allow multiple mentions
   * @default true
   */
  allowMultiple?: boolean

  /**
   * Allow spaces in search
   * @default false
   */
  allowSpaces?: boolean

  /**
   * Minimum characters to trigger search
   * @default 0
   */
  minChars?: number

  /**
   * Maximum suggestions to show
   * @default 10
   */
  maxSuggestions?: number

  /**
   * Debounce delay for async search (ms)
   * @default 200
   */
  debounceMs?: number

  /**
   * Async search function
   */
  onSearch?: (query: string, trigger: string) => Promise<MentionItem[]>

  /**
   * Custom render for mention item
   */
  renderItem?: (item: MentionItem) => string

  /**
   * Custom render for inserted mention
   */
  renderMention?: (item: MentionItem) => string

  /**
   * Input element selector
   * @default '[data-coral-mention-input]'
   */
  inputSelector?: string

  /**
   * Suggestions container selector
   * @default '[data-coral-mention-suggestions]'
   */
  suggestionsSelector?: string

  /**
   * Highlight matches in suggestions
   * @default true
   */
  highlightMatches?: boolean

  /**
   * Close on select
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Insert space after mention
   * @default true
   */
  insertSpaceAfter?: boolean
}

/**
 * Mention state
 */
export interface MentionState extends ComponentState {
  isOpen: boolean
  isLoading: boolean
  searchQuery: string
  activeTrigger: string | null
  triggerPosition: number
  suggestions: MentionItem[]
  highlightedIndex: number
  mentions: MentionItem[]
  value: string
}

/**
 * Mention component
 *
 * @example
 * ```html
 * <div data-coral-mention>
 *   <div data-coral-mention-input contenteditable="true" placeholder="Type @ to mention..."></div>
 *   <div data-coral-mention-suggestions></div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const mention = createMention(element, {
 *   items: [
 *     { id: '1', value: 'john', label: 'John Doe', avatar: '/avatars/john.jpg' },
 *     { id: '2', value: 'jane', label: 'Jane Smith', avatar: '/avatars/jane.jpg' },
 *   ],
 *   trigger: '@',
 *   placeholder: 'Type @ to mention someone...',
 * })
 * ```
 */
export class Mention extends BaseComponent {
  protected declare config: MentionConfig
  protected declare state: MentionState

  private input: HTMLElement | null = null
  private suggestionsEl: HTMLElement | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private blurTimer: ReturnType<typeof setTimeout> | null = null

  protected override getDefaultConfig(): MentionConfig {
    return {
      items: [],
      trigger: '@',
      placeholder: 'Type @ to mention...',
      allowMultiple: true,
      allowSpaces: false,
      minChars: 0,
      maxSuggestions: 10,
      debounceMs: 200,
      inputSelector: '[data-coral-mention-input]',
      suggestionsSelector: '[data-coral-mention-suggestions]',
      highlightMatches: true,
      closeOnSelect: true,
      insertSpaceAfter: true,
    }
  }

  protected override getInitialState(): MentionState {
    return {
      isOpen: false,
      isLoading: false,
      searchQuery: '',
      activeTrigger: null,
      triggerPosition: -1,
      suggestions: [],
      highlightedIndex: -1,
      mentions: [],
      value: '',
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'combobox')
    this.element.setAttribute('aria-haspopup', 'listbox')
    this.element.setAttribute('aria-expanded', 'false')
  }

  protected bindEvents(): void {
    this.input = this.element.querySelector(this.config.inputSelector!)
    this.suggestionsEl = this.element.querySelector(this.config.suggestionsSelector!)

    if (!this.input) {
      console.warn('Mention: Input element not found')
      return
    }

    this.setupInput()
    this.setupSuggestions()
    this.setupKeyboardNavigation()
  }

  private setupInput(): void {
    if (!this.input) {return}

    // Set placeholder
    if (this.config.placeholder && !this.input.textContent) {
      this.input.setAttribute('data-placeholder', this.config.placeholder)
    }

    // Input handler
    this.input.addEventListener('input', this.handleInput.bind(this))

    // Focus/blur handlers
    this.input.addEventListener('focus', () => {
      this.dispatch('focus', {})
    })

    this.input.addEventListener('blur', () => {
      // Delay to allow click on suggestion - track for cleanup
      if (this.blurTimer) {
        clearTimeout(this.blurTimer)
      }
      this.blurTimer = setTimeout(() => {
        this.blurTimer = null
        if (this.state.isOpen) {
          this.close()
        }
      }, 150)
      this.dispatch('blur', {})
    })

    // Click away - use tracked addEventListener for proper cleanup
    const handleClickAway = (e: Event) => {
      if (!this.element.contains(e.target as Node)) {
        this.close()
      }
    }
    this.addEventListener(document, 'click', handleClickAway)
  }

  private setupSuggestions(): void {
    if (!this.suggestionsEl) {return}

    // Click handler for suggestions
    this.suggestionsEl.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('[data-coral-mention-item]')
      if (item) {
        const index = parseInt(item.getAttribute('data-index') || '0', 10)
        this.selectSuggestion(index)
      }
    })

    // Mouse enter for highlighting
    this.suggestionsEl.addEventListener('mousemove', (e) => {
      const item = (e.target as HTMLElement).closest('[data-coral-mention-item]')
      if (item) {
        const index = parseInt(item.getAttribute('data-index') || '0', 10)
        this.setState({ highlightedIndex: index })
        this.updateHighlight()
      }
    })
  }

  private setupKeyboardNavigation(): void {
    if (!this.input) {return}

    this.input.addEventListener('keydown', (e) => {
      if (!this.state.isOpen) {return}

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          this.navigateSuggestions(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          this.navigateSuggestions(-1)
          break
        case 'Enter':
          if (this.state.highlightedIndex >= 0) {
            e.preventDefault()
            this.selectSuggestion(this.state.highlightedIndex)
          }
          break
        case 'Escape':
          e.preventDefault()
          this.close()
          break
        case 'Tab':
          if (this.state.highlightedIndex >= 0) {
            e.preventDefault()
            this.selectSuggestion(this.state.highlightedIndex)
          }
          break
      }
    })
  }

  private handleInput(): void {
    if (!this.input) {return}

    const text = this.input.textContent || ''
    const _selection = window.getSelection()
    const cursorPosition = this.getCursorPosition()

    // Check for trigger character
    const triggerConfig = this.config.trigger || '@'
    const triggers: string[] = Array.isArray(triggerConfig)
      ? triggerConfig.filter((t): t is string => typeof t === 'string')
      : [triggerConfig]

    let foundTrigger: string | null = null
    let triggerPos = -1

    for (const trigger of triggers) {
      if (!trigger) {continue}
      // Look backwards from cursor for trigger
      for (let i = cursorPosition - 1; i >= 0; i--) {
        const char = text[i]
        if (char === trigger) {
          // Check if this is a valid trigger position
          const prevChar = text[i - 1]
          if (i === 0 || (prevChar && /\s/.test(prevChar))) {
            foundTrigger = trigger
            triggerPos = i
            break
          }
        }
        // Stop at whitespace unless allowSpaces is true
        if (!this.config.allowSpaces && char && /\s/.test(char)) {
          break
        }
      }
      if (foundTrigger) {break}
    }

    if (foundTrigger && triggerPos >= 0) {
      const query = text.slice(triggerPos + 1, cursorPosition)

      // Check minimum chars requirement
      if (query.length >= (this.config.minChars || 0)) {
        this.setState({
          activeTrigger: foundTrigger,
          triggerPosition: triggerPos,
          searchQuery: query,
        })
        this.searchItems(query)
      } else {
        this.close()
      }
    } else {
      this.close()
    }

    this.setState({ value: text })
    this.dispatch('input', { value: text })
  }

  private getCursorPosition(): number {
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) {return 0}

    const range = selection.getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(this.input!)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    return preCaretRange.toString().length
  }

  private searchItems(query: string): void {
    // Clear any pending debounce
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }

    // Async search
    if (this.config.onSearch) {
      this.setState({ isLoading: true })
      this.debounceTimer = setTimeout(async () => {
        try {
          const results = await this.config.onSearch!(query, this.state.activeTrigger || '@')
          this.showSuggestions(results.slice(0, this.config.maxSuggestions || 10))
        } catch (error) {
          console.error('Mention search error:', error)
          this.showSuggestions([])
        } finally {
          this.setState({ isLoading: false })
        }
      }, this.config.debounceMs || 200)
    } else {
      // Local search
      const items = this.config.items || []
      const filtered = items.filter((item) => {
        const searchText = `${item.label} ${item.value}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      this.showSuggestions(filtered.slice(0, this.config.maxSuggestions || 10))
    }
  }

  private showSuggestions(items: MentionItem[]): void {
    if (!this.suggestionsEl) {return}

    if (items.length === 0) {
      this.close()
      return
    }

    this.setState({
      isOpen: true,
      suggestions: items,
      highlightedIndex: 0,
    })

    this.renderSuggestions()
    this.dispatch('open', { suggestions: items })
  }

  private renderSuggestions(): void {
    if (!this.suggestionsEl) {return}

    const { suggestions, highlightedIndex, searchQuery } = this.state

    this.suggestionsEl.innerHTML = suggestions
      .map((item, index) => {
        if (this.config.renderItem) {
          return `<div data-coral-mention-item data-index="${index}" ${index === highlightedIndex ? 'data-highlighted' : ''}>${this.config.renderItem(item)}</div>`
        }

        let label = item.label
        if (this.config.highlightMatches && searchQuery) {
          const regex = new RegExp(`(${searchQuery})`, 'gi')
          label = label.replace(regex, '<mark>$1</mark>')
        }

        return `
          <div
            data-coral-mention-item
            data-index="${index}"
            ${index === highlightedIndex ? 'data-highlighted' : ''}
            ${item.disabled ? 'data-disabled' : ''}
          >
            ${item.avatar ? `<img src="${item.avatar}" alt="${item.label}" data-coral-mention-avatar />` : ''}
            <div data-coral-mention-item-content>
              <div data-coral-mention-item-label>${label}</div>
              ${item.description ? `<div data-coral-mention-item-description>${item.description}</div>` : ''}
            </div>
          </div>
        `
      })
      .join('')

    this.suggestionsEl.setAttribute('data-visible', 'true')
  }

  private updateHighlight(): void {
    if (!this.suggestionsEl) {return}

    const items = this.suggestionsEl.querySelectorAll('[data-coral-mention-item]')
    items.forEach((item, index) => {
      if (index === this.state.highlightedIndex) {
        item.setAttribute('data-highlighted', 'true')
        item.scrollIntoView({ block: 'nearest' })
      } else {
        item.removeAttribute('data-highlighted')
      }
    })
  }

  private navigateSuggestions(direction: number): void {
    const { suggestions, highlightedIndex } = this.state
    let newIndex = highlightedIndex + direction

    if (newIndex < 0) {
      newIndex = suggestions.length - 1
    } else if (newIndex >= suggestions.length) {
      newIndex = 0
    }

    // Skip disabled items
    while (suggestions[newIndex]?.disabled) {
      newIndex += direction
      if (newIndex < 0) {newIndex = suggestions.length - 1}
      if (newIndex >= suggestions.length) {newIndex = 0}
      if (newIndex === highlightedIndex) {break} // Prevent infinite loop
    }

    this.setState({ highlightedIndex: newIndex })
    this.updateHighlight()
  }

  private selectSuggestion(index: number): void {
    const item = this.state.suggestions[index]
    if (!item || item.disabled) {return}

    this.insertMention(item)

    if (this.config.closeOnSelect) {
      this.close()
    }

    this.dispatch('select', { item })
  }

  private insertMention(item: MentionItem): void {
    if (!this.input) {return}

    const text = this.input.textContent || ''
    const { triggerPosition, activeTrigger, searchQuery } = this.state

    // Create mention text
    let mentionText: string
    if (this.config.renderMention) {
      mentionText = this.config.renderMention(item)
    } else {
      mentionText = `${activeTrigger}${item.value}`
    }

    if (this.config.insertSpaceAfter) {
      mentionText += ' '
    }

    // Replace the trigger + query with the mention
    const before = text.slice(0, triggerPosition)
    const after = text.slice(triggerPosition + 1 + searchQuery.length)
    const newText = before + mentionText + after

    // Update content
    this.input.textContent = newText

    // Update mentions list
    const mentions = [...this.state.mentions]
    if (!mentions.find((m) => m.id === item.id)) {
      mentions.push(item)
    }

    this.setState({
      value: newText,
      mentions,
    })

    // Set cursor position after mention
    this.setCursorPosition(before.length + mentionText.length)

    this.dispatch('mention', { item, mentions })
  }

  private setCursorPosition(position: number): void {
    if (!this.input) {return}

    const range = document.createRange()
    const selection = window.getSelection()
    const textNode = this.input.firstChild

    if (textNode) {
      const pos = Math.min(position, textNode.textContent?.length || 0)
      range.setStart(textNode, pos)
      range.setEnd(textNode, pos)
    } else {
      range.selectNodeContents(this.input)
      range.collapse(false)
    }

    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  override close(): void {
    this.setState({
      isOpen: false,
      suggestions: [],
      highlightedIndex: -1,
      activeTrigger: null,
      triggerPosition: -1,
      searchQuery: '',
    })

    if (this.suggestionsEl) {
      this.suggestionsEl.removeAttribute('data-visible')
      this.suggestionsEl.innerHTML = ''
    }

    super.close()
  }

  // Public API

  /**
   * Get current value
   */
  getValue(): string {
    return this.state.value
  }

  /**
   * Set value
   */
  setValue(value: string): void {
    if (this.input) {
      this.input.textContent = value
      this.setState({ value })
    }
  }

  /**
   * Get all mentions
   */
  getMentions(): MentionItem[] {
    return [...this.state.mentions]
  }

  /**
   * Clear all mentions
   */
  clearMentions(): void {
    this.setState({ mentions: [] })
  }

  /**
   * Clear input
   */
  clear(): void {
    if (this.input) {
      this.input.textContent = ''
      this.setState({
        value: '',
        mentions: [],
      })
    }
    this.dispatch('clear', {})
  }

  /**
   * Focus input
   */
  focus(): void {
    this.input?.focus()
  }

  /**
   * Blur input
   */
  blur(): void {
    this.input?.blur()
  }

  /**
   * Open suggestions manually
   */
  override open(): void {
    this.handleInput()
  }

  /**
   * Update items
   */
  setItems(items: MentionItem[]): void {
    this.config.items = items
  }

  /**
   * Insert a mention programmatically
   */
  insertMentionAt(item: MentionItem): void {
    if (!this.input) {return}

    const text = this.input.textContent || ''
    const trigger = Array.isArray(this.config.trigger)
      ? this.config.trigger[0]
      : this.config.trigger || '@'

    let mentionText = `${trigger}${item.value}`
    if (this.config.insertSpaceAfter) {
      mentionText += ' '
    }

    this.input.textContent = text + mentionText
    this.setState({
      value: text + mentionText,
      mentions: [...this.state.mentions, item],
    })

    this.setCursorPosition((text + mentionText).length)
    this.dispatch('mention', { item, mentions: this.state.mentions })
  }

  override destroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }
    if (this.blurTimer) {
      clearTimeout(this.blurTimer)
      this.blurTimer = null
    }
    super.destroy()
  }
}

/**
 * Create Mention component factory
 */
export const createMention = createComponentFactory(Mention)

export default Mention
