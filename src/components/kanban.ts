/**
 * Kanban Board Component
 *
 * A Trello-style drag-and-drop kanban board.
 * Features: drag & drop, column management, card actions.
 * @module components/kanban
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Kanban card interface
 */
export interface KanbanCard {
  id: string
  title: string
  description?: string
  labels?: KanbanLabel[]
  assignees?: KanbanAssignee[]
  dueDate?: Date
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  attachments?: number
  comments?: number
  checklist?: { total: number; completed: number }
  cover?: string
  metadata?: Record<string, unknown>
}

/**
 * Kanban column interface
 */
export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  color?: string
  limit?: number
  collapsed?: boolean
}

/**
 * Kanban label
 */
export interface KanbanLabel {
  id: string
  name: string
  color: string
}

/**
 * Kanban assignee
 */
export interface KanbanAssignee {
  id: string
  name: string
  avatar?: string
}

/**
 * Drag data
 */
interface DragData {
  cardId: string
  sourceColumnId: string
  sourceIndex: number
}

/**
 * Kanban configuration
 */
export interface KanbanConfig extends ComponentConfig {
  /**
   * Initial columns
   */
  columns?: KanbanColumn[]

  /**
   * Enable drag and drop
   * @default true
   */
  enableDragDrop?: boolean

  /**
   * Enable column reordering
   * @default true
   */
  enableColumnReorder?: boolean

  /**
   * Enable adding new cards
   * @default true
   */
  enableAddCard?: boolean

  /**
   * Enable adding new columns
   * @default true
   */
  enableAddColumn?: boolean

  /**
   * Enable card editing
   * @default true
   */
  enableEditCard?: boolean

  /**
   * Enable card deletion
   * @default true
   */
  enableDeleteCard?: boolean

  /**
   * Enable column collapsing
   * @default true
   */
  enableCollapse?: boolean

  /**
   * Show card count in column header
   * @default true
   */
  showCardCount?: boolean

  /**
   * Show WIP limits
   * @default true
   */
  showWipLimits?: boolean

  /**
   * Placeholder for new card
   * @default 'Enter a title for this card...'
   */
  newCardPlaceholder?: string

  /**
   * Placeholder for new column
   * @default 'Enter column name...'
   */
  newColumnPlaceholder?: string

  /**
   * Card moved handler
   */
  onCardMove?: (cardId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void

  /**
   * Column moved handler
   */
  onColumnMove?: (columnId: string, targetIndex: number) => void

  /**
   * Card added handler
   */
  onCardAdd?: (columnId: string, card: Partial<KanbanCard>) => void

  /**
   * Card edited handler
   */
  onCardEdit?: (cardId: string, updates: Partial<KanbanCard>) => void

  /**
   * Card deleted handler
   */
  onCardDelete?: (cardId: string, columnId: string) => void

  /**
   * Column added handler
   */
  onColumnAdd?: (column: Partial<KanbanColumn>) => void

  /**
   * Column edited handler
   */
  onColumnEdit?: (columnId: string, updates: Partial<KanbanColumn>) => void

  /**
   * Column deleted handler
   */
  onColumnDelete?: (columnId: string) => void

  /**
   * Card clicked handler
   */
  onCardClick?: (card: KanbanCard, columnId: string) => void

  /**
   * Board container selector
   * @default '[data-coral-kanban-board]'
   */
  boardSelector?: string

  /**
   * Column selector
   * @default '[data-coral-kanban-column]'
   */
  columnSelector?: string

  /**
   * Card selector
   * @default '[data-coral-kanban-card]'
   */
  cardSelector?: string
}

/**
 * Kanban state
 */
export interface KanbanState extends ComponentState {
  columns: KanbanColumn[]
  draggingCard: DragData | null
  draggingColumn: string | null
  addingCardToColumn: string | null
  addingColumn: boolean
  editingCard: string | null
  editingColumn: string | null
}

/**
 * Default configuration
 */
const defaultConfig: KanbanConfig = {
  columns: [],
  enableDragDrop: true,
  enableColumnReorder: true,
  enableAddCard: true,
  enableAddColumn: true,
  enableEditCard: true,
  enableDeleteCard: true,
  enableCollapse: true,
  showCardCount: true,
  showWipLimits: true,
  newCardPlaceholder: 'Enter a title for this card...',
  newColumnPlaceholder: 'Enter column name...',
  boardSelector: '[data-coral-kanban-board]',
  columnSelector: '[data-coral-kanban-column]',
  cardSelector: '[data-coral-kanban-card]',
}

/**
 * Kanban Component Class
 */
export class Kanban extends BaseComponent {
  protected declare config: KanbanConfig
  protected declare state: KanbanState
  private boardElement: HTMLElement | null = null

  protected getDefaultConfig(): KanbanConfig {
    return { ...defaultConfig }
  }

  protected getInitialState(): KanbanState {
    return {
      columns: this.config.columns || [],
      draggingCard: null,
      draggingColumn: null,
      addingCardToColumn: null,
      addingColumn: false,
      editingCard: null,
      editingColumn: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'application')
    this.element.setAttribute('aria-label', 'Kanban Board')

    this.boardElement = this.element.querySelector(this.config.boardSelector || '[data-coral-kanban-board]')
  }

  protected bindEvents(): void {
    // Drag and drop events for cards
    this.element.addEventListener('dragstart', this.handleDragStart.bind(this))
    this.element.addEventListener('dragend', this.handleDragEnd.bind(this))
    this.element.addEventListener('dragover', this.handleDragOver.bind(this))
    this.element.addEventListener('drop', this.handleDrop.bind(this))
    this.element.addEventListener('dragenter', this.handleDragEnter.bind(this))
    this.element.addEventListener('dragleave', this.handleDragLeave.bind(this))

    // Click events
    this.element.addEventListener('click', this.handleClick.bind(this))

    // Keyboard events
    this.element.addEventListener('keydown', this.handleKeydown.bind(this))
  }

  private handleDragStart(e: DragEvent): void {
    const target = e.target as HTMLElement

    // Card drag
    const cardEl = target.closest('[data-coral-kanban-card]')
    if (cardEl && this.config.enableDragDrop) {
      const cardId = cardEl.getAttribute('data-card-id')
      const columnEl = cardEl.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')

      if (cardId && columnId) {
        const column = this.state.columns.find(c => c.id === columnId)
        const cardIndex = column?.cards.findIndex(c => c.id === cardId) ?? -1

        this.setState({
          draggingCard: {
            cardId,
            sourceColumnId: columnId,
            sourceIndex: cardIndex,
          },
        })

        e.dataTransfer?.setData('text/plain', cardId)
        cardEl.classList.add('dragging')
        this.emit('cardDragStart', { cardId, columnId })
      }
    }

    // Column drag
    const columnHeader = target.closest('[data-coral-kanban-column-drag-handle]')
    if (columnHeader && this.config.enableColumnReorder) {
      const columnEl = columnHeader.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')

      if (columnId) {
        this.setState({ draggingColumn: columnId })
        e.dataTransfer?.setData('text/plain', `column:${columnId}`)
        columnEl?.classList.add('dragging')
        this.emit('columnDragStart', { columnId })
      }
    }
  }

  private handleDragEnd(e: DragEvent): void {
    const target = e.target as HTMLElement

    // Remove dragging class
    const draggingElements = this.element.querySelectorAll('.dragging, .drag-over')
    draggingElements.forEach(el => {
      el.classList.remove('dragging', 'drag-over')
    })

    if (this.state.draggingCard) {
      this.emit('cardDragEnd', { cardId: this.state.draggingCard.cardId })
    }
    if (this.state.draggingColumn) {
      this.emit('columnDragEnd', { columnId: this.state.draggingColumn })
    }

    this.setState({
      draggingCard: null,
      draggingColumn: null,
    })
  }

  private handleDragOver(e: DragEvent): void {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
    }
  }

  private handleDragEnter(e: DragEvent): void {
    const target = e.target as HTMLElement

    // Column drop zone
    const columnEl = target.closest('[data-coral-kanban-column]')
    if (columnEl && this.state.draggingCard) {
      columnEl.classList.add('drag-over')
    }

    // Card drop indicator
    const cardEl = target.closest('[data-coral-kanban-card]')
    if (cardEl && this.state.draggingCard) {
      cardEl.classList.add('drag-over')
    }
  }

  private handleDragLeave(e: DragEvent): void {
    const target = e.target as HTMLElement

    const columnEl = target.closest('[data-coral-kanban-column]')
    if (columnEl) {
      // Only remove if leaving the column entirely
      if (!columnEl.contains(e.relatedTarget as Node)) {
        columnEl.classList.remove('drag-over')
      }
    }

    const cardEl = target.closest('[data-coral-kanban-card]')
    if (cardEl) {
      cardEl.classList.remove('drag-over')
    }
  }

  private handleDrop(e: DragEvent): void {
    e.preventDefault()
    const target = e.target as HTMLElement

    // Card drop
    if (this.state.draggingCard) {
      const columnEl = target.closest('[data-coral-kanban-column]')
      const targetColumnId = columnEl?.getAttribute('data-column-id')

      if (targetColumnId) {
        // Determine drop index
        const cardEl = target.closest('[data-coral-kanban-card]')
        let targetIndex = 0

        if (cardEl) {
          const targetCardId = cardEl.getAttribute('data-card-id')
          const targetColumn = this.state.columns.find(c => c.id === targetColumnId)
          targetIndex = targetColumn?.cards.findIndex(c => c.id === targetCardId) ?? 0
        } else {
          // Dropped on empty area - add to end
          const targetColumn = this.state.columns.find(c => c.id === targetColumnId)
          targetIndex = targetColumn?.cards.length ?? 0
        }

        this.moveCard(
          this.state.draggingCard.cardId,
          this.state.draggingCard.sourceColumnId,
          targetColumnId,
          targetIndex
        )
      }
    }

    // Column drop
    if (this.state.draggingColumn) {
      const boardEl = target.closest('[data-coral-kanban-board]')
      if (boardEl) {
        const targetColumnEl = target.closest('[data-coral-kanban-column]')
        const targetColumnId = targetColumnEl?.getAttribute('data-column-id')

        if (targetColumnId && targetColumnId !== this.state.draggingColumn) {
          const targetIndex = this.state.columns.findIndex(c => c.id === targetColumnId)
          this.moveColumn(this.state.draggingColumn, targetIndex)
        }
      }
    }

    // Clean up
    this.element.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over')
    })
  }

  private handleClick(e: MouseEvent): void {
    const target = e.target as HTMLElement

    // Card click
    const cardEl = target.closest('[data-coral-kanban-card]')
    if (cardEl && !target.closest('[data-coral-kanban-card-action]')) {
      const cardId = cardEl.getAttribute('data-card-id')
      const columnEl = cardEl.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')

      if (cardId && columnId) {
        const column = this.state.columns.find(c => c.id === columnId)
        const card = column?.cards.find(c => c.id === cardId)

        if (card) {
          this.emit('cardClick', { card, columnId })
          this.config.onCardClick?.(card, columnId)
        }
      }
    }

    // Add card button
    if (target.closest('[data-coral-kanban-add-card]')) {
      const columnEl = target.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')
      if (columnId) {
        this.setState({ addingCardToColumn: columnId })
      }
    }

    // Save new card
    if (target.closest('[data-coral-kanban-save-new-card]')) {
      this.saveNewCard()
    }

    // Cancel new card
    if (target.closest('[data-coral-kanban-cancel-new-card]')) {
      this.setState({ addingCardToColumn: null })
    }

    // Add column button
    if (target.closest('[data-coral-kanban-add-column]')) {
      this.setState({ addingColumn: true })
    }

    // Save new column
    if (target.closest('[data-coral-kanban-save-new-column]')) {
      this.saveNewColumn()
    }

    // Cancel new column
    if (target.closest('[data-coral-kanban-cancel-new-column]')) {
      this.setState({ addingColumn: false })
    }

    // Edit card
    if (target.closest('[data-coral-kanban-edit-card]')) {
      const cardEl = target.closest('[data-coral-kanban-card]')
      const cardId = cardEl?.getAttribute('data-card-id')
      if (cardId) {
        this.setState({ editingCard: cardId })
        this.emit('cardEditStart', { cardId })
      }
    }

    // Delete card
    if (target.closest('[data-coral-kanban-delete-card]')) {
      const cardEl = target.closest('[data-coral-kanban-card]')
      const cardId = cardEl?.getAttribute('data-card-id')
      const columnEl = cardEl?.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')

      if (cardId && columnId) {
        this.deleteCard(cardId, columnId)
      }
    }

    // Collapse column
    if (target.closest('[data-coral-kanban-collapse-column]')) {
      const columnEl = target.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')
      if (columnId) {
        this.toggleColumnCollapse(columnId)
      }
    }

    // Edit column
    if (target.closest('[data-coral-kanban-edit-column]')) {
      const columnEl = target.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')
      if (columnId) {
        this.setState({ editingColumn: columnId })
        this.emit('columnEditStart', { columnId })
      }
    }

    // Delete column
    if (target.closest('[data-coral-kanban-delete-column]')) {
      const columnEl = target.closest('[data-coral-kanban-column]')
      const columnId = columnEl?.getAttribute('data-column-id')
      if (columnId) {
        this.deleteColumn(columnId)
      }
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    // Save on Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      if (this.state.addingCardToColumn) {
        e.preventDefault()
        this.saveNewCard()
      }
      if (this.state.addingColumn) {
        e.preventDefault()
        this.saveNewColumn()
      }
    }

    // Cancel on Escape
    if (e.key === 'Escape') {
      if (this.state.addingCardToColumn) {
        this.setState({ addingCardToColumn: null })
      }
      if (this.state.addingColumn) {
        this.setState({ addingColumn: false })
      }
      if (this.state.editingCard) {
        this.setState({ editingCard: null })
      }
      if (this.state.editingColumn) {
        this.setState({ editingColumn: null })
      }
    }
  }

  /**
   * Move a card to a new position
   */
  moveCard(cardId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number): void {
    const columns = [...this.state.columns]

    // Find source column and card
    const sourceColumn = columns.find(c => c.id === sourceColumnId)
    const cardIndex = sourceColumn?.cards.findIndex(c => c.id === cardId) ?? -1

    if (!sourceColumn || cardIndex === -1) {return}

    // Check WIP limit
    if (sourceColumnId !== targetColumnId) {
      const targetColumn = columns.find(c => c.id === targetColumnId)
      if (targetColumn?.limit && targetColumn.cards.length >= targetColumn.limit) {
        this.emit('wipLimitReached', { columnId: targetColumnId, limit: targetColumn.limit })
        return
      }
    }

    // Remove card from source
    const [card] = sourceColumn.cards.splice(cardIndex, 1)

    // Find target column and insert
    const targetColumn = columns.find(c => c.id === targetColumnId)
    if (targetColumn && card) {
      // Adjust index if same column and moving down
      let adjustedIndex = targetIndex
      if (sourceColumnId === targetColumnId && cardIndex < targetIndex) {
        adjustedIndex--
      }

      targetColumn.cards.splice(adjustedIndex, 0, card)
    }

    this.setState({ columns })

    this.emit('cardMove', { cardId, sourceColumnId, targetColumnId, targetIndex })
    this.config.onCardMove?.(cardId, sourceColumnId, targetColumnId, targetIndex)
  }

  /**
   * Move a column to a new position
   */
  moveColumn(columnId: string, targetIndex: number): void {
    const columns = [...this.state.columns]
    const columnIndex = columns.findIndex(c => c.id === columnId)

    if (columnIndex === -1) {return}

    const [column] = columns.splice(columnIndex, 1) as [KanbanColumn]
    columns.splice(targetIndex, 0, column)

    this.setState({ columns })

    this.emit('columnMove', { columnId, targetIndex })
    this.config.onColumnMove?.(columnId, targetIndex)
  }

  /**
   * Add a new card
   */
  addCard(columnId: string, card: Partial<KanbanCard>): void {
    const newCard: KanbanCard = {
      id: card.id || `card-${Date.now()}`,
      title: card.title || 'New Card',
      ...card,
    }

    const columns = this.state.columns.map(c =>
      c.id === columnId
        ? { ...c, cards: [...c.cards, newCard] }
        : c
    )

    this.setState({ columns, addingCardToColumn: null })

    this.emit('cardAdd', { columnId, card: newCard })
    this.config.onCardAdd?.(columnId, newCard)
  }

  private saveNewCard(): void {
    const columnId = this.state.addingCardToColumn
    if (!columnId) {return}

    const input = this.element.querySelector(`[data-coral-kanban-new-card-input][data-column-id="${columnId}"]`) as HTMLTextAreaElement
    const title = input?.value.trim()

    if (title) {
      this.addCard(columnId, { title })
    } else {
      this.setState({ addingCardToColumn: null })
    }
  }

  /**
   * Update a card
   */
  updateCard(cardId: string, updates: Partial<KanbanCard>): void {
    const columns = this.state.columns.map(column => ({
      ...column,
      cards: column.cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
      ),
    }))

    this.setState({ columns, editingCard: null })

    this.emit('cardEdit', { cardId, updates })
    this.config.onCardEdit?.(cardId, updates)
  }

  /**
   * Delete a card
   */
  deleteCard(cardId: string, columnId: string): void {
    const columns = this.state.columns.map(c =>
      c.id === columnId
        ? { ...c, cards: c.cards.filter(card => card.id !== cardId) }
        : c
    )

    this.setState({ columns })

    this.emit('cardDelete', { cardId, columnId })
    this.config.onCardDelete?.(cardId, columnId)
  }

  /**
   * Add a new column
   */
  addColumn(column: Partial<KanbanColumn>): void {
    const newColumn: KanbanColumn = {
      id: column.id || `column-${Date.now()}`,
      title: column.title || 'New Column',
      cards: column.cards || [],
      ...column,
    }

    this.setState({
      columns: [...this.state.columns, newColumn],
      addingColumn: false,
    })

    this.emit('columnAdd', { column: newColumn })
    this.config.onColumnAdd?.(newColumn)
  }

  private saveNewColumn(): void {
    const input = this.element.querySelector('[data-coral-kanban-new-column-input]') as HTMLInputElement
    const title = input?.value.trim()

    if (title) {
      this.addColumn({ title })
    } else {
      this.setState({ addingColumn: false })
    }
  }

  /**
   * Update a column
   */
  updateColumn(columnId: string, updates: Partial<KanbanColumn>): void {
    const columns = this.state.columns.map(c =>
      c.id === columnId ? { ...c, ...updates } : c
    )

    this.setState({ columns, editingColumn: null })

    this.emit('columnEdit', { columnId, updates })
    this.config.onColumnEdit?.(columnId, updates)
  }

  /**
   * Delete a column
   */
  deleteColumn(columnId: string): void {
    const columns = this.state.columns.filter(c => c.id !== columnId)
    this.setState({ columns })

    this.emit('columnDelete', { columnId })
    this.config.onColumnDelete?.(columnId)
  }

  /**
   * Toggle column collapse
   */
  toggleColumnCollapse(columnId: string): void {
    const columns = this.state.columns.map(c =>
      c.id === columnId ? { ...c, collapsed: !c.collapsed } : c
    )

    this.setState({ columns })
    this.emit('columnToggleCollapse', { columnId, collapsed: !this.state.columns.find(c => c.id === columnId)?.collapsed })
  }

  /**
   * Get all columns
   */
  getColumns(): KanbanColumn[] {
    return [...this.state.columns]
  }

  /**
   * Set columns externally
   */
  setColumns(columns: KanbanColumn[]): void {
    this.setState({ columns })
  }

  /**
   * Get card by ID
   */
  getCard(cardId: string): KanbanCard | undefined {
    for (const column of this.state.columns) {
      const card = column.cards.find(c => c.id === cardId)
      if (card) {return card}
    }
    return undefined
  }

  /**
   * Get column by ID
   */
  getColumn(columnId: string): KanbanColumn | undefined {
    return this.state.columns.find(c => c.id === columnId)
  }

  /**
   * Get current state
   */
  override getState(): KanbanState {
    return { ...this.state }
  }

  /**
   * Destroy component
   */
  override destroy(): void {
    this.boundHandlers.clear()
    this.stateListeners.clear()
    super.destroy()
  }

  protected override render(): void {
    // Update data attributes for styling
    this.element.setAttribute('data-adding-column', String(this.state.addingColumn))
    this.element.setAttribute('data-dragging', String(!!this.state.draggingCard || !!this.state.draggingColumn))
  }
}

/**
 * Create Kanban instance
 */
export const createKanban = createComponentFactory<Kanban, KanbanConfig>(Kanban)

export default Kanban
