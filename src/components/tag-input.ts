/**
 * TagInput Component
 *
 * An accessible tag/chip input component.
 * Allows entering and managing multiple tags with validation.
 *
 * @module components/tag-input
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Tag item
 */
export interface TagItem {
  id: string
  value: string
  label?: string
  color?: string
  disabled?: boolean
  data?: Record<string, unknown>
}

/**
 * TagInput configuration
 */
export interface TagInputConfig extends ComponentConfig {
  /**
   * Initial tags
   */
  defaultTags?: TagItem[] | string[]

  /**
   * Placeholder text
   * @default 'Add tags...'
   */
  placeholder?: string

  /**
   * Maximum number of tags
   * @default Infinity
   */
  maxTags?: number

  /**
   * Maximum length per tag
   * @default 50
   */
  maxLength?: number

  /**
   * Minimum length per tag
   * @default 1
   */
  minLength?: number

  /**
   * Allow duplicate tags
   * @default false
   */
  allowDuplicates?: boolean

  /**
   * Keys that create a tag
   * @default ['Enter', ',', ' ']
   */
  createKeys?: string[]

  /**
   * Allow only predefined tags (autocomplete)
   * @default false
   */
  restrictToSuggestions?: boolean

  /**
   * Suggestions for autocomplete
   */
  suggestions?: string[]

  /**
   * Validate tag before adding
   */
  validate?: (value: string) => boolean | string

  /**
   * Transform tag value before adding
   */
  transform?: (value: string) => string

  /**
   * Disable the component
   * @default false
   */
  disabled?: boolean

  /**
   * Read-only mode (can't add/remove)
   * @default false
   */
  readOnly?: boolean

  /**
   * Pattern for validation (regex string)
   */
  pattern?: string

  /**
   * Custom colors for tags
   */
  tagColors?: Record<string, string>

  /**
   * Input element selector
   * @default '[data-coral-tag-input-field]'
   */
  inputSelector?: string

  /**
   * Tags container selector
   * @default '[data-coral-tag-input-tags]'
   */
  tagsSelector?: string

  /**
   * Suggestions container selector
   * @default '[data-coral-tag-input-suggestions]'
   */
  suggestionsSelector?: string
}

/**
 * TagInput state
 */
export interface TagInputState extends ComponentState {
  tags: TagItem[]
  inputValue: string
  showSuggestions: boolean
  filteredSuggestions: string[]
  highlightedSuggestion: number
  error: string | null
}

/**
 * TagInput component
 *
 * @example
 * ```html
 * <div data-coral-tag-input>
 *   <div data-coral-tag-input-tags></div>
 *   <input data-coral-tag-input-field type="text" placeholder="Add tags..." />
 *   <div data-coral-tag-input-suggestions></div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const tagInput = createTagInput(element, {
 *   maxTags: 5,
 *   suggestions: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Svelte'],
 *   validate: (value) => {
 *     if (value.length < 2) return 'Tag must be at least 2 characters'
 *     return true
 *   },
 * })
 * ```
 */
export class TagInput extends BaseComponent {
  protected declare config: TagInputConfig
  protected declare state: TagInputState

  private input: HTMLInputElement | null = null
  private tagsContainer: HTMLElement | null = null
  private suggestionsContainer: HTMLElement | null = null
  private patternRegex: RegExp | null = null
  private blurTimer: ReturnType<typeof setTimeout> | null = null
  private errorTimer: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): TagInputConfig {
    return {
      defaultTags: [],
      placeholder: 'Add tags...',
      maxTags: Infinity,
      maxLength: 50,
      minLength: 1,
      allowDuplicates: false,
      createKeys: ['Enter', ','],
      restrictToSuggestions: false,
      suggestions: [],
      disabled: false,
      readOnly: false,
      inputSelector: '[data-coral-tag-input-field]',
      tagsSelector: '[data-coral-tag-input-tags]',
      suggestionsSelector: '[data-coral-tag-input-suggestions]',
    }
  }

  protected getInitialState(): TagInputState {
    // Normalize default tags
    const defaultTags = (this.config.defaultTags || []).map((tag, index) => {
      if (typeof tag === 'string') {
        return { id: `tag-${index}`, value: tag, label: tag }
      }
      return tag
    })

    return {
      tags: defaultTags,
      inputValue: '',
      showSuggestions: false,
      filteredSuggestions: [],
      highlightedSuggestion: -1,
      error: null,
    }
  }

  protected setupAria(): void {
    this.input = this.query(this.config.inputSelector!) as HTMLInputElement
    this.tagsContainer = this.query(this.config.tagsSelector!)
    this.suggestionsContainer = this.query(this.config.suggestionsSelector!)

    // Create tags container if not present
    if (!this.tagsContainer) {
      this.tagsContainer = document.createElement('div')
      this.tagsContainer.setAttribute('data-coral-tag-input-tags', '')
      this.element.insertBefore(this.tagsContainer, this.input)
    }

    // Create suggestions container if not present
    if (!this.suggestionsContainer && this.config.suggestions?.length) {
      this.suggestionsContainer = document.createElement('div')
      this.suggestionsContainer.setAttribute('data-coral-tag-input-suggestions', '')
      this.element.appendChild(this.suggestionsContainer)
    }

    // Set up input
    if (this.input) {
      this.input.setAttribute('role', 'combobox')
      this.input.setAttribute('aria-autocomplete', 'list')
      this.input.setAttribute('aria-expanded', 'false')
      this.input.placeholder = this.config.placeholder!

      if (this.suggestionsContainer) {
        if (!this.suggestionsContainer.id) {
          this.suggestionsContainer.id = `${this.id}-suggestions`
        }
        this.input.setAttribute('aria-controls', this.suggestionsContainer.id)
      }

      if (this.config.maxLength) {
        this.input.maxLength = this.config.maxLength
      }

      if (this.config.disabled) {
        this.input.disabled = true
      }

      if (this.config.readOnly) {
        this.input.readOnly = true
      }
    }

    // Set up suggestions
    if (this.suggestionsContainer) {
      this.suggestionsContainer.setAttribute('role', 'listbox')
      this.suggestionsContainer.style.display = 'none'
    }

    // Compile pattern regex
    if (this.config.pattern) {
      this.patternRegex = new RegExp(this.config.pattern)
    }

    // Element attributes
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Tag input')

    if (this.config.disabled) {
      this.element.setAttribute('data-disabled', '')
    }

    if (this.config.readOnly) {
      this.element.setAttribute('data-readonly', '')
    }

    // Render initial tags
    this.renderTags()
  }

  protected bindEvents(): void {
    if (!this.input) {
      return
    }

    // Input events
    this.addEventListener(this.input, 'input', (e: Event) => {
      const target = e.target as HTMLInputElement
      this.handleInput(target.value)
    })

    this.addEventListener(this.input, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })

    this.addEventListener(this.input, 'focus', () => {
      this.element.setAttribute('data-focused', '')
      if (this.state.inputValue && this.config.suggestions?.length) {
        this.showSuggestionsPanel()
      }
    })

    this.addEventListener(this.input, 'blur', () => {
      this.element.removeAttribute('data-focused')
      // Delay to allow click on suggestion - track for cleanup
      if (this.blurTimer) {
        clearTimeout(this.blurTimer)
      }
      this.blurTimer = setTimeout(() => {
        this.blurTimer = null
        this.hideSuggestionsPanel()
      }, 150)
    })

    this.addEventListener(this.input, 'paste', (e: Event) => {
      this.handlePaste(e as ClipboardEvent)
    })

    // Click on container focuses input
    this.addEventListener(this.element, 'click', (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-coral-tag-input-tag]')) {
        this.input?.focus()
      }
    })
  }

  private handleInput(value: string): void {
    // Check for separator in paste
    const createKeys = this.config.createKeys || ['Enter', ',']
    if (createKeys.includes(',') && value.includes(',')) {
      // Split by comma and create multiple tags
      const parts = value.split(',').map((p) => p.trim()).filter(Boolean)
      parts.forEach((part) => this.addTag(part))
      if (this.input) {
        this.input.value = ''
      }
      this.setState({ inputValue: '', error: null })
      return
    }

    this.setState({ inputValue: value, error: null })

    // Update suggestions
    if (this.config.suggestions?.length) {
      this.filterSuggestions(value)
    }
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const { inputValue, tags, showSuggestions, highlightedSuggestion, filteredSuggestions } = this.state
    const createKeys = this.config.createKeys || ['Enter', ',']

    // Handle suggestion navigation
    if (showSuggestions && filteredSuggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          this.setState({
            highlightedSuggestion: Math.min(highlightedSuggestion + 1, filteredSuggestions.length - 1),
          })
          this.renderSuggestions()
          return

        case 'ArrowUp':
          e.preventDefault()
          this.setState({
            highlightedSuggestion: Math.max(highlightedSuggestion - 1, 0),
          })
          this.renderSuggestions()
          return

        case 'Enter':
          if (highlightedSuggestion >= 0) {
            e.preventDefault()
            this.addTag(filteredSuggestions[highlightedSuggestion]!)
            this.hideSuggestionsPanel()
            return
          }
          break

        case 'Escape':
          e.preventDefault()
          this.hideSuggestionsPanel()
          return
      }
    }

    // Create tag on configured keys
    if (createKeys.includes(e.key) && inputValue.trim()) {
      e.preventDefault()
      this.addTag(inputValue.trim())
      return
    }

    // Delete last tag on Backspace
    if (e.key === 'Backspace' && !inputValue && tags.length > 0 && !this.config.readOnly) {
      const lastTag = tags[tags.length - 1]
      if (lastTag && !lastTag.disabled) {
        this.removeTag(lastTag.id)
      }
      return
    }

    // Tab creates tag if there's value
    if (e.key === 'Tab' && inputValue.trim()) {
      this.addTag(inputValue.trim())
      // Don't prevent default - let focus move
    }
  }

  private handlePaste(e: ClipboardEvent): void {
    const text = e.clipboardData?.getData('text')
    if (!text) {
      return
    }

    // Check if pasted text contains separators
    const separators = [',', '\n', '\t']
    const hasSeparator = separators.some((sep) => text.includes(sep))

    if (hasSeparator) {
      e.preventDefault()

      // Split by any separator and create tags
      const values = text
        .split(/[,\n\t]+/)
        .map((v) => v.trim())
        .filter(Boolean)

      values.forEach((value) => this.addTag(value))
    }
  }

  private addTag(value: string): boolean {
    if (this.config.disabled || this.config.readOnly) {
      return false
    }

    // Transform value if configured
    if (this.config.transform) {
      value = this.config.transform(value)
    }

    // Trim
    value = value.trim()

    // Min length check
    if (value.length < (this.config.minLength || 1)) {
      this.setError(`Tag must be at least ${this.config.minLength} characters`)
      return false
    }

    // Max tags check
    if (this.state.tags.length >= (this.config.maxTags || Infinity)) {
      this.setError(`Maximum ${this.config.maxTags} tags allowed`)
      this.dispatch('max-reached', { maxTags: this.config.maxTags })
      return false
    }

    // Duplicate check
    if (!this.config.allowDuplicates) {
      const exists = this.state.tags.some(
        (tag) => tag.value.toLowerCase() === value.toLowerCase()
      )
      if (exists) {
        this.setError('Tag already exists')
        this.dispatch('duplicate', { value })
        return false
      }
    }

    // Pattern check
    if (this.patternRegex && !this.patternRegex.test(value)) {
      this.setError('Invalid tag format')
      return false
    }

    // Restrict to suggestions
    if (this.config.restrictToSuggestions && this.config.suggestions) {
      const found = this.config.suggestions.some(
        (s) => s.toLowerCase() === value.toLowerCase()
      )
      if (!found) {
        this.setError('Please select from suggestions')
        return false
      }
    }

    // Custom validation
    if (this.config.validate) {
      const result = this.config.validate(value)
      if (result !== true) {
        this.setError(typeof result === 'string' ? result : 'Invalid tag')
        return false
      }
    }

    // Create tag
    const newTag: TagItem = {
      id: `tag-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      value,
      label: value,
      color: this.config.tagColors?.[value],
    }

    const newTags = [...this.state.tags, newTag]

    this.setState({
      tags: newTags,
      inputValue: '',
      error: null,
    })

    if (this.input) {
      this.input.value = ''
    }

    this.renderTags()

    this.dispatch('add', { tag: newTag, tags: newTags })
    this.dispatch('change', { tags: newTags })

    return true
  }

  private removeTag(id: string): void {
    if (this.config.disabled || this.config.readOnly) {
      return
    }

    const tag = this.state.tags.find((t) => t.id === id)
    if (!tag || tag.disabled) {
      return
    }

    const newTags = this.state.tags.filter((t) => t.id !== id)

    this.setState({ tags: newTags })

    this.renderTags()

    this.dispatch('remove', { tag, tags: newTags })
    this.dispatch('change', { tags: newTags })
  }

  private setError(message: string): void {
    this.setState({ error: message })
    this.element.setAttribute('data-error', '')
    this.dispatch('error', { message })

    // Clear error after delay - track for cleanup
    if (this.errorTimer) {
      clearTimeout(this.errorTimer)
    }
    this.errorTimer = setTimeout(() => {
      this.errorTimer = null
      this.setState({ error: null })
      this.element.removeAttribute('data-error')
    }, 3000)
  }

  private filterSuggestions(query: string): void {
    if (!query) {
      this.hideSuggestionsPanel()
      return
    }

    const suggestions = this.config.suggestions || []
    const lowerQuery = query.toLowerCase()

    // Filter out already selected tags
    const existingValues = new Set(this.state.tags.map((t) => t.value.toLowerCase()))

    const filtered = suggestions.filter(
      (s) =>
        s.toLowerCase().includes(lowerQuery) &&
        !existingValues.has(s.toLowerCase())
    )

    this.setState({
      filteredSuggestions: filtered,
      highlightedSuggestion: filtered.length > 0 ? 0 : -1,
    })

    if (filtered.length > 0) {
      this.showSuggestionsPanel()
    } else {
      this.hideSuggestionsPanel()
    }
  }

  private showSuggestionsPanel(): void {
    if (!this.suggestionsContainer) {
      return
    }

    this.setState({ showSuggestions: true })
    this.suggestionsContainer.style.display = ''
    this.input?.setAttribute('aria-expanded', 'true')
    this.renderSuggestions()
  }

  private hideSuggestionsPanel(): void {
    if (!this.suggestionsContainer) {
      return
    }

    this.setState({ showSuggestions: false, highlightedSuggestion: -1 })
    this.suggestionsContainer.style.display = 'none'
    this.input?.setAttribute('aria-expanded', 'false')
  }

  private renderTags(): void {
    if (!this.tagsContainer) {
      return
    }

    this.tagsContainer.innerHTML = ''

    this.state.tags.forEach((tag) => {
      const el = this.createTagElement(tag)
      this.tagsContainer!.appendChild(el)
    })

    // Update count attribute
    this.element.setAttribute('data-count', String(this.state.tags.length))
  }

  private createTagElement(tag: TagItem): HTMLElement {
    const el = document.createElement('span')
    el.className = 'tag-input-tag'
    el.setAttribute('data-coral-tag-input-tag', '')
    el.setAttribute('data-value', tag.value)
    el.setAttribute('data-id', tag.id)

    if (tag.color) {
      el.style.setProperty('--tag-color', tag.color)
      el.setAttribute('data-colored', '')
    }

    if (tag.disabled) {
      el.setAttribute('data-disabled', '')
    }

    // Label
    const label = document.createElement('span')
    label.className = 'tag-input-tag-label'
    label.textContent = tag.label || tag.value
    el.appendChild(label)

    // Remove button (if not disabled/readonly)
    if (!this.config.readOnly && !tag.disabled) {
      const removeBtn = document.createElement('button')
      removeBtn.type = 'button'
      removeBtn.className = 'tag-input-tag-remove'
      removeBtn.setAttribute('data-coral-tag-input-tag-remove', '')
      removeBtn.setAttribute('aria-label', `Remove ${tag.label || tag.value}`)
      removeBtn.innerHTML = '×'
      removeBtn.tabIndex = -1

      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        this.removeTag(tag.id)
      })

      el.appendChild(removeBtn)
    }

    return el
  }

  private renderSuggestions(): void {
    if (!this.suggestionsContainer) {
      return
    }

    const { filteredSuggestions, highlightedSuggestion } = this.state

    this.suggestionsContainer.innerHTML = ''

    filteredSuggestions.forEach((suggestion, index) => {
      const el = document.createElement('div')
      el.className = 'tag-input-suggestion'
      el.setAttribute('data-coral-tag-input-suggestion', '')
      el.setAttribute('role', 'option')
      el.setAttribute('id', `${this.id}-suggestion-${index}`)
      el.textContent = suggestion

      if (index === highlightedSuggestion) {
        el.setAttribute('data-highlighted', '')
        el.setAttribute('aria-selected', 'true')
      }

      el.addEventListener('click', () => {
        this.addTag(suggestion)
        this.hideSuggestionsPanel()
        this.input?.focus()
      })

      el.addEventListener('mouseenter', () => {
        this.setState({ highlightedSuggestion: index })
        this.renderSuggestions()
      })

      this.suggestionsContainer!.appendChild(el)
    })
  }

  protected override render(): void {
    // Render is handled by individual methods
  }

  /**
   * Get all tags
   */
  getTags(): TagItem[] {
    return [...this.state.tags]
  }

  /**
   * Get tag values as strings
   */
  getValue(): string[] {
    return this.state.tags.map((t) => t.value)
  }

  /**
   * Set tags programmatically
   */
  setTags(tags: (TagItem | string)[]): void {
    const normalizedTags = tags.map((tag, index) => {
      if (typeof tag === 'string') {
        return { id: `tag-${Date.now()}-${index}`, value: tag, label: tag }
      }
      return tag
    })

    this.setState({ tags: normalizedTags })
    this.renderTags()
    this.dispatch('change', { tags: normalizedTags })
  }

  /**
   * Add a tag programmatically
   */
  add(value: string): boolean {
    return this.addTag(value)
  }

  /**
   * Remove a tag by value
   */
  remove(value: string): void {
    const tag = this.state.tags.find((t) => t.value === value)
    if (tag) {
      this.removeTag(tag.id)
    }
  }

  /**
   * Clear all tags
   */
  clear(): void {
    if (this.config.disabled || this.config.readOnly) {
      return
    }

    this.setState({ tags: [], inputValue: '' })
    if (this.input) {
      this.input.value = ''
    }
    this.renderTags()
    this.dispatch('clear')
    this.dispatch('change', { tags: [] })
  }

  /**
   * Focus the input
   */
  focus(): void {
    this.input?.focus()
  }

  /**
   * Enable the component
   */
  enable(): void {
    this.config.disabled = false
    this.element.removeAttribute('data-disabled')
    if (this.input) {
      this.input.disabled = false
    }
  }

  /**
   * Disable the component
   */
  disable(): void {
    this.config.disabled = true
    this.element.setAttribute('data-disabled', '')
    if (this.input) {
      this.input.disabled = true
    }
    this.hideSuggestionsPanel()
  }

  /**
   * Set suggestions
   */
  setSuggestions(suggestions: string[]): void {
    this.config.suggestions = suggestions
    if (this.state.inputValue) {
      this.filterSuggestions(this.state.inputValue)
    }
  }

  override destroy(): void {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer)
      this.blurTimer = null
    }
    if (this.errorTimer) {
      clearTimeout(this.errorTimer)
      this.errorTimer = null
    }
    super.destroy()
  }
}

/**
 * Create a tag input instance
 */
export const createTagInput = createComponentFactory(TagInput)

export default TagInput
