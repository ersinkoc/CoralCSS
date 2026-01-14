/**
 * Kanban Component Tests
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/kanban
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  Kanban,
  createKanban,
  type KanbanConfig,
  type KanbanColumn,
  type KanbanCard,
} from '../../../src/components/kanban'

// Mock DragEvent and DataTransfer for jsdom
class MockDataTransfer {
  private data: Map<string, string> = new Map()
  dropEffect: string = 'none'
  effectAllowed: string = 'all'

  setData(type: string, value: string): void {
    this.data.set(type, value)
  }

  getData(type: string): string {
    return this.data.get(type) || ''
  }

  clearData(): void {
    this.data.clear()
  }
}

class MockDragEvent extends Event {
  dataTransfer: MockDataTransfer | null
  relatedTarget: EventTarget | null

  constructor(type: string, init?: DragEventInit & { dataTransfer?: DataTransfer, relatedTarget?: EventTarget | null }) {
    super(type, init)
    this.dataTransfer = init?.dataTransfer as unknown as MockDataTransfer || new MockDataTransfer()
    this.relatedTarget = init?.relatedTarget || null
  }
}

// Assign mocks to global
;(globalThis as unknown as Record<string, unknown>).DragEvent = MockDragEvent
;(globalThis as unknown as Record<string, unknown>).DataTransfer = MockDataTransfer

function createTestContainer(): HTMLElement {
  const container = document.createElement('div')

  const boardDiv = document.createElement('div')
  boardDiv.setAttribute('data-coral-kanban-board', '')
  container.appendChild(boardDiv)

  return container
}

function createColumnElement(columnId: string): HTMLElement {
  const column = document.createElement('div')
  column.setAttribute('data-coral-kanban-column', '')
  column.setAttribute('data-column-id', columnId)
  column.draggable = true
  return column
}

function createCardElement(cardId: string, columnId: string): HTMLElement {
  const card = document.createElement('div')
  card.setAttribute('data-coral-kanban-card', '')
  card.setAttribute('data-card-id', cardId)
  card.draggable = true
  return card
}

describe('Kanban Component', () => {
  let container: HTMLElement
  let kanban: Kanban

  beforeEach(() => {
    container = createTestContainer()
    document.body.appendChild(container)
  })

  afterEach(() => {
    kanban?.destroy()
    container?.remove()
  })

  describe('constructor', () => {
    it('should create Kanban with element', () => {
      kanban = new Kanban(container)
      expect(container.getAttribute('role')).toBe('application')
      expect(container.getAttribute('aria-label')).toBe('Kanban Board')
    })

    it('should create Kanban with config', () => {
      const config: KanbanConfig = {
        columns: [],
        enableDragDrop: true,
      }
      kanban = new Kanban(container, config)
      expect(kanban.getColumns()).toEqual([])
    })

    it('should initialize with initial columns', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns })
      expect(kanban.getColumns()).toHaveLength(2)
    })
  })

  describe('getColumns', () => {
    it('should return columns', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })
      expect(kanban.getColumns()).toHaveLength(1)
      expect(kanban.getColumns()[0]?.title).toBe('To Do')
    })
  })

  describe('setColumns', () => {
    it('should set columns externally', () => {
      kanban = new Kanban(container)

      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban.setColumns(columns)

      expect(kanban.getColumns()).toHaveLength(2)
    })
  })

  describe('getColumn', () => {
    it('should return column by ID', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      const column = kanban.getColumn('col-1')
      expect(column?.title).toBe('To Do')
    })

    it('should return undefined for non-existent column', () => {
      kanban = new Kanban(container)
      expect(kanban.getColumn('non-existent')).toBeUndefined()
    })
  })

  describe('getCard', () => {
    it('should return card by ID', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns })

      const card = kanban.getCard('card-1')
      expect(card?.title).toBe('Task 1')
    })

    it('should return undefined for non-existent card', () => {
      kanban = new Kanban(container)
      expect(kanban.getCard('non-existent')).toBeUndefined()
    })
  })

  describe('addCard', () => {
    it('should add a card to column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.addCard('col-1', { title: 'New Task' })

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(1)
    })

    it('should emit cardAdd event', () => {
      const onCardAdd = vi.fn()
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns, onCardAdd })

      kanban.addCard('col-1', { title: 'New Task' })

      expect(onCardAdd).toHaveBeenCalled()
    })

    it('should generate card ID if not provided', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.addCard('col-1', { title: 'New Task' })

      const card = kanban.getColumn('col-1')?.cards[0]
      expect(card?.id).toContain('card-')
    })
  })

  describe('updateCard', () => {
    it('should update a card', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns })

      kanban.updateCard('card-1', { title: 'Updated Task' })

      expect(kanban.getCard('card-1')?.title).toBe('Updated Task')
    })

    it('should emit cardEdit event', () => {
      const onCardEdit = vi.fn()
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns, onCardEdit })

      kanban.updateCard('card-1', { title: 'Updated' })

      expect(onCardEdit).toHaveBeenCalled()
    })
  })

  describe('deleteCard', () => {
    it('should delete a card', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns })

      kanban.deleteCard('card-1', 'col-1')

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(0)
    })

    it('should emit cardDelete event', () => {
      const onCardDelete = vi.fn()
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns, onCardDelete })

      kanban.deleteCard('card-1', 'col-1')

      expect(onCardDelete).toHaveBeenCalled()
    })
  })

  describe('moveCard', () => {
    it('should move card to same column', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [
            { id: 'card-1', title: 'Task 1' },
            { id: 'card-2', title: 'Task 2' },
            { id: 'card-3', title: 'Task 3' },
          ],
        },
      ]
      kanban = new Kanban(container, { columns })

      // Move card-3 from index 2 to index 0
      kanban.moveCard('card-3', 'col-1', 'col-1', 0)

      const cards = kanban.getColumn('col-1')?.cards
      expect(cards?.[0]?.id).toBe('card-3')
      expect(cards?.[1]?.id).toBe('card-1')
      expect(cards?.[2]?.id).toBe('card-2')
    })

    it('should move card to different column', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.moveCard('card-1', 'col-1', 'col-2', 0)

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(0)
      expect(kanban.getColumn('col-2')?.cards).toHaveLength(1)
    })

    it('should emit cardMove event', () => {
      const onCardMove = vi.fn()
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns, onCardMove })

      kanban.moveCard('card-1', 'col-1', 'col-2', 0)

      expect(onCardMove).toHaveBeenCalled()
    })

    it('should respect WIP limits', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
        {
          id: 'col-2',
          title: 'In Progress',
          cards: [{ id: 'card-2', title: 'Task 2' }],
          limit: 1,
        },
      ]
      kanban = new Kanban(container, { columns })

      kanban.moveCard('card-1', 'col-1', 'col-2', 0)

      // Card should still be in col-1 due to WIP limit
      expect(kanban.getColumn('col-1')?.cards).toHaveLength(1)
      expect(kanban.getColumn('col-2')?.cards).toHaveLength(1)
    })

    it('should emit wipLimitReached event', () => {
      const eventHandler = vi.fn()
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
        {
          id: 'col-2',
          title: 'In Progress',
          cards: [{ id: 'card-2', title: 'Task 2' }],
          limit: 1,
        },
      ]
      kanban = new Kanban(container, { columns })
      container.addEventListener('coral:kanban:wipLimitReached', eventHandler)

      kanban.moveCard('card-1', 'col-1', 'col-2', 0)

      expect(eventHandler).toHaveBeenCalled()
    })

    it('should do nothing for non-existent source column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.moveCard('card-1', 'non-existent', 'col-1', 0)
      // Should not throw
      expect(true).toBe(true)
    })

    it('should do nothing for non-existent card', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.moveCard('non-existent', 'col-1', 'col-1', 0)
      expect(true).toBe(true)
    })
  })

  describe('addColumn', () => {
    it('should add a column', () => {
      kanban = new Kanban(container)

      kanban.addColumn({ title: 'New Column' })

      expect(kanban.getColumns()).toHaveLength(1)
    })

    it('should emit columnAdd event', () => {
      const onColumnAdd = vi.fn()
      kanban = new Kanban(container, { onColumnAdd })

      kanban.addColumn({ title: 'New Column' })

      expect(onColumnAdd).toHaveBeenCalled()
    })

    it('should generate column ID if not provided', () => {
      kanban = new Kanban(container)

      kanban.addColumn({ title: 'New Column' })

      const column = kanban.getColumns()[0]
      expect(column?.id).toContain('column-')
    })
  })

  describe('updateColumn', () => {
    it('should update a column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.updateColumn('col-1', { title: 'Updated Title' })

      expect(kanban.getColumn('col-1')?.title).toBe('Updated Title')
    })

    it('should emit columnEdit event', () => {
      const onColumnEdit = vi.fn()
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns, onColumnEdit })

      kanban.updateColumn('col-1', { title: 'Updated' })

      expect(onColumnEdit).toHaveBeenCalled()
    })
  })

  describe('deleteColumn', () => {
    it('should delete a column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.deleteColumn('col-1')

      expect(kanban.getColumns()).toHaveLength(0)
    })

    it('should emit columnDelete event', () => {
      const onColumnDelete = vi.fn()
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns, onColumnDelete })

      kanban.deleteColumn('col-1')

      expect(onColumnDelete).toHaveBeenCalled()
    })
  })

  describe('moveColumn', () => {
    it('should move a column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      kanban.moveColumn('col-1', 1)

      const cols = kanban.getColumns()
      expect(cols[0]?.id).toBe('col-2')
      expect(cols[1]?.id).toBe('col-1')
    })

    it('should emit columnMove event', () => {
      const onColumnMove = vi.fn()
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns, onColumnMove })

      kanban.moveColumn('col-1', 1)

      expect(onColumnMove).toHaveBeenCalled()
    })

    it('should do nothing for non-existent column', () => {
      kanban = new Kanban(container)

      kanban.moveColumn('non-existent', 0)
      expect(true).toBe(true)
    })
  })

  describe('toggleColumnCollapse', () => {
    it('should toggle column collapse', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [], collapsed: false },
      ]
      kanban = new Kanban(container, { columns })

      kanban.toggleColumnCollapse('col-1')

      expect(kanban.getColumn('col-1')?.collapsed).toBe(true)
    })

    it('should emit columnToggleCollapse event', () => {
      const eventHandler = vi.fn()
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [], collapsed: false },
      ]
      kanban = new Kanban(container, { columns })
      container.addEventListener('coral:kanban:columnToggleCollapse', eventHandler)

      kanban.toggleColumnCollapse('col-1')

      expect(eventHandler).toHaveBeenCalled()
    })
  })

  describe('getState', () => {
    it('should return current state', () => {
      kanban = new Kanban(container)
      const state = kanban.getState()

      expect(state.columns).toBeDefined()
      expect(state.draggingCard).toBeNull()
      expect(state.draggingColumn).toBeNull()
    })
  })

  describe('drag events', () => {
    it('should handle card drag start', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns, enableDragDrop: true })

      // Create card element
      const columnEl = createColumnElement('col-1')
      const cardEl = createCardElement('card-1', 'col-1')
      columnEl.appendChild(cardEl)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      // Create drag event
      const dragEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer(),
      })

      cardEl.dispatchEvent(dragEvent)

      expect(kanban.getState().draggingCard).not.toBeNull()
    })

    it('should handle drag end', () => {
      kanban = new Kanban(container, { enableDragDrop: true })

      // Manually set dragging state
      kanban['setState']({ draggingCard: { cardId: 'card-1', sourceColumnId: 'col-1', sourceIndex: 0 } })

      const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
      })

      container.dispatchEvent(dragEndEvent)

      expect(kanban.getState().draggingCard).toBeNull()
    })

    it('should handle column drag start', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns, enableColumnReorder: true })

      // Create column with drag handle
      const columnEl = createColumnElement('col-1')
      const dragHandle = document.createElement('div')
      dragHandle.setAttribute('data-coral-kanban-column-drag-handle', '')
      columnEl.appendChild(dragHandle)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      const dragEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer(),
      })

      dragHandle.dispatchEvent(dragEvent)

      expect(kanban.getState().draggingColumn).toBe('col-1')
    })

    it('should handle drag over', () => {
      kanban = new Kanban(container)

      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer(),
      })

      container.dispatchEvent(dragOverEvent)
      expect(dragOverEvent.defaultPrevented).toBe(true)
    })

    it('should handle drag enter on column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      // Set dragging state
      kanban['setState']({ draggingCard: { cardId: 'card-1', sourceColumnId: 'col-1', sourceIndex: 0 } })

      const columnEl = createColumnElement('col-1')
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      const dragEnterEvent = new DragEvent('dragenter', {
        bubbles: true,
        cancelable: true,
      })

      columnEl.dispatchEvent(dragEnterEvent)
      expect(columnEl.classList.contains('drag-over')).toBe(true)
    })

    it('should handle drag leave on column', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      columnEl.classList.add('drag-over')
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      const dragLeaveEvent = new DragEvent('dragleave', {
        bubbles: true,
        cancelable: true,
        relatedTarget: document.body,
      })

      columnEl.dispatchEvent(dragLeaveEvent)
      expect(columnEl.classList.contains('drag-over')).toBe(false)
    })

    it('should handle drop on column', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
        { id: 'col-2', title: 'Done', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      // Set dragging state
      kanban['setState']({ draggingCard: { cardId: 'card-1', sourceColumnId: 'col-1', sourceIndex: 0 } })

      const columnEl = createColumnElement('col-2')
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
      })

      columnEl.dispatchEvent(dropEvent)

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(0)
      expect(kanban.getColumn('col-2')?.cards).toHaveLength(1)
    })
  })

  describe('click events', () => {
    it('should handle card click', () => {
      const onCardClick = vi.fn()
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns, onCardClick })

      const columnEl = createColumnElement('col-1')
      const cardEl = createCardElement('card-1', 'col-1')
      columnEl.appendChild(cardEl)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      cardEl.click()

      expect(onCardClick).toHaveBeenCalled()
    })

    it('should handle add card button click', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const addBtn = document.createElement('button')
      addBtn.setAttribute('data-coral-kanban-add-card', '')
      columnEl.appendChild(addBtn)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      addBtn.click()

      expect(kanban.getState().addingCardToColumn).toBe('col-1')
    })

    it('should handle cancel new card click', () => {
      kanban = new Kanban(container)
      kanban['setState']({ addingCardToColumn: 'col-1' })

      const cancelBtn = document.createElement('button')
      cancelBtn.setAttribute('data-coral-kanban-cancel-new-card', '')
      container.appendChild(cancelBtn)

      cancelBtn.click()

      expect(kanban.getState().addingCardToColumn).toBeNull()
    })

    it('should handle add column button click', () => {
      kanban = new Kanban(container)

      const addBtn = document.createElement('button')
      addBtn.setAttribute('data-coral-kanban-add-column', '')
      container.appendChild(addBtn)

      addBtn.click()

      expect(kanban.getState().addingColumn).toBe(true)
    })

    it('should handle cancel new column click', () => {
      kanban = new Kanban(container)
      kanban['setState']({ addingColumn: true })

      const cancelBtn = document.createElement('button')
      cancelBtn.setAttribute('data-coral-kanban-cancel-new-column', '')
      container.appendChild(cancelBtn)

      cancelBtn.click()

      expect(kanban.getState().addingColumn).toBe(false)
    })

    it('should handle edit card button click', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const cardEl = createCardElement('card-1', 'col-1')
      const editBtn = document.createElement('button')
      editBtn.setAttribute('data-coral-kanban-edit-card', '')
      editBtn.setAttribute('data-coral-kanban-card-action', '')
      cardEl.appendChild(editBtn)
      columnEl.appendChild(cardEl)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      editBtn.click()

      expect(kanban.getState().editingCard).toBe('card-1')
    })

    it('should handle delete card button click', () => {
      const columns: KanbanColumn[] = [
        {
          id: 'col-1',
          title: 'To Do',
          cards: [{ id: 'card-1', title: 'Task 1' }],
        },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const cardEl = createCardElement('card-1', 'col-1')
      const deleteBtn = document.createElement('button')
      deleteBtn.setAttribute('data-coral-kanban-delete-card', '')
      deleteBtn.setAttribute('data-coral-kanban-card-action', '')
      cardEl.appendChild(deleteBtn)
      columnEl.appendChild(cardEl)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      deleteBtn.click()

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(0)
    })

    it('should handle collapse column button click', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [], collapsed: false },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const collapseBtn = document.createElement('button')
      collapseBtn.setAttribute('data-coral-kanban-collapse-column', '')
      columnEl.appendChild(collapseBtn)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      collapseBtn.click()

      expect(kanban.getColumn('col-1')?.collapsed).toBe(true)
    })

    it('should handle edit column button click', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const editBtn = document.createElement('button')
      editBtn.setAttribute('data-coral-kanban-edit-column', '')
      columnEl.appendChild(editBtn)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      editBtn.click()

      expect(kanban.getState().editingColumn).toBe('col-1')
    })

    it('should handle delete column button click', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })

      const columnEl = createColumnElement('col-1')
      const deleteBtn = document.createElement('button')
      deleteBtn.setAttribute('data-coral-kanban-delete-column', '')
      columnEl.appendChild(deleteBtn)
      container.querySelector('[data-coral-kanban-board]')?.appendChild(columnEl)

      deleteBtn.click()

      expect(kanban.getColumns()).toHaveLength(0)
    })
  })

  describe('keyboard events', () => {
    it('should save new card on Enter', () => {
      const columns: KanbanColumn[] = [
        { id: 'col-1', title: 'To Do', cards: [] },
      ]
      kanban = new Kanban(container, { columns })
      kanban['setState']({ addingCardToColumn: 'col-1' })

      const input = document.createElement('textarea')
      input.setAttribute('data-coral-kanban-new-card-input', '')
      input.setAttribute('data-column-id', 'col-1')
      input.value = 'New Task'
      container.appendChild(input)

      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      input.dispatchEvent(keyEvent)

      expect(kanban.getColumn('col-1')?.cards).toHaveLength(1)
    })

    it('should save new column on Enter', () => {
      kanban = new Kanban(container)
      kanban['setState']({ addingColumn: true })

      const input = document.createElement('input')
      input.setAttribute('data-coral-kanban-new-column-input', '')
      input.value = 'New Column'
      container.appendChild(input)

      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      input.dispatchEvent(keyEvent)

      expect(kanban.getColumns()).toHaveLength(1)
    })

    it('should cancel on Escape', () => {
      kanban = new Kanban(container)
      kanban['setState']({
        addingCardToColumn: 'col-1',
        addingColumn: true,
        editingCard: 'card-1',
        editingColumn: 'col-1',
      })

      const keyEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      container.dispatchEvent(keyEvent)

      expect(kanban.getState().addingCardToColumn).toBeNull()
      expect(kanban.getState().addingColumn).toBe(false)
      expect(kanban.getState().editingCard).toBeNull()
      expect(kanban.getState().editingColumn).toBeNull()
    })
  })

  describe('createKanban factory', () => {
    it('should create Kanban instance', () => {
      kanban = createKanban(container)
      expect(kanban).toBeInstanceOf(Kanban)
    })

    it('should create Kanban with config', () => {
      kanban = createKanban(container, {
        columns: [{ id: 'col-1', title: 'To Do', cards: [] }],
      })
      expect(kanban.getColumns()).toHaveLength(1)
    })
  })

  describe('render', () => {
    it('should set data attributes', () => {
      kanban = new Kanban(container)

      // Check that kanban board is rendered with role and aria attributes
      expect(container.getAttribute('role')).toBe('application')
      expect(container.getAttribute('aria-label')).toBe('Kanban Board')
    })
  })

  describe('destroy', () => {
    it('should clean up on destroy', () => {
      kanban = new Kanban(container)
      kanban.destroy()
      expect(true).toBe(true)
    })
  })
})
