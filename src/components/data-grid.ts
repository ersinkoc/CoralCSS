/**
 * DataGrid Component
 *
 * A powerful data grid component with sorting, filtering,
 * pagination, selection, and virtual scrolling support.
 *
 * @module components/data-grid
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Column definition for DataGrid
 */
export interface DataGridColumn<T = unknown> {
  id: string
  header: string
  accessor: keyof T | ((row: T) => unknown)
  width?: number | string
  minWidth?: number
  maxWidth?: number
  sortable?: boolean
  filterable?: boolean
  resizable?: boolean
  hidden?: boolean
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: T, rowIndex: number) => string | HTMLElement
  sortFn?: (a: T, b: T) => number
  filterFn?: (row: T, filterValue: string) => boolean
  headerRender?: (column: DataGridColumn<T>) => string | HTMLElement
  sticky?: 'left' | 'right'
  cellClassName?: string | ((value: unknown, row: T) => string)
}

/**
 * Sort configuration
 */
export interface DataGridSort {
  columnId: string
  direction: 'asc' | 'desc'
}

/**
 * Filter configuration
 */
export interface DataGridFilter {
  columnId: string
  value: string
  operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte'
}

/**
 * Pagination configuration
 */
export interface DataGridPagination {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

/**
 * DataGrid configuration
 */
export interface DataGridConfig<T = unknown> extends ComponentConfig {
  columns: DataGridColumn<T>[]
  data: T[]
  rowKey?: keyof T | ((row: T) => string)
  sortable?: boolean
  filterable?: boolean
  selectable?: boolean
  multiSelect?: boolean
  resizableColumns?: boolean
  reorderableColumns?: boolean
  stickyHeader?: boolean
  stickyFooter?: boolean
  virtualScroll?: boolean
  rowHeight?: number
  headerHeight?: number
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
  showPagination?: boolean
  loading?: boolean
  emptyMessage?: string
  loadingMessage?: string
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  compact?: boolean
  onSort?: (sort: DataGridSort | null) => void
  onFilter?: (filters: DataGridFilter[]) => void
  onSelect?: (selectedRows: T[]) => void
  onRowClick?: (row: T, rowIndex: number) => void
  onRowDoubleClick?: (row: T, rowIndex: number) => void
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onColumnResize?: (columnId: string, width: number) => void
  onColumnReorder?: (columnOrder: string[]) => void
}

/**
 * DataGrid state
 */
export interface DataGridState extends ComponentState {
  sort: DataGridSort | null
  filters: DataGridFilter[]
  selectedRows: Set<string>
  page: number
  pageSize: number
  columnWidths: Map<string, number>
  columnOrder: string[]
  expandedRows: Set<string>
  isAllSelected: boolean
  isLoading: boolean
}

/**
 * DataGrid Component Class
 */
export class DataGrid<T = unknown> extends BaseComponent {
  declare protected config: DataGridConfig<T>
  declare protected state: DataGridState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents(). Use the ! assertion instead.
  private tableContainer!: HTMLElement | null
  private tableHeader!: HTMLElement | null
  private tableBody!: HTMLElement | null
  private tableFooter!: HTMLElement | null
  private resizeObserver!: ResizeObserver | null
  private resizeDebounceTimeout!: ReturnType<typeof setTimeout> | null
  private processedData!: T[]

  protected getDefaultConfig(): DataGridConfig<T> {
    return {
      columns: [],
      data: [],
      sortable: true,
      filterable: false,
      selectable: false,
      multiSelect: true,
      resizableColumns: false,
      reorderableColumns: false,
      stickyHeader: true,
      stickyFooter: false,
      virtualScroll: false,
      rowHeight: 48,
      headerHeight: 48,
      pagination: true,
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      showPageSizeSelector: true,
      showPagination: true,
      loading: false,
      emptyMessage: 'No data available',
      loadingMessage: 'Loading...',
      striped: false,
      bordered: true,
      hoverable: true,
      compact: false,
    }
  }

  protected getInitialState(): DataGridState {
    const columns = this.config.columns || []
    return {
      sort: null,
      filters: [],
      selectedRows: new Set(),
      page: 1,
      pageSize: this.config.pageSize || 10,
      columnWidths: new Map(columns.map((col) => [col.id, typeof col.width === 'number' ? col.width : 150])),
      columnOrder: columns.map((col) => col.id),
      expandedRows: new Set(),
      isAllSelected: false,
      isLoading: this.config.loading || false,
    }
  }

  protected override validateConfig(): void {
    super.validateConfig()

    // Ensure rowHeight is positive to prevent division by zero
    if (this.config.rowHeight !== undefined && this.config.rowHeight <= 0) {
      this.warnConfig(`rowHeight must be positive, got ${this.config.rowHeight}. Using default 48.`)
      this.config.rowHeight = 48
    }

    // Ensure headerHeight is positive
    if (this.config.headerHeight !== undefined && this.config.headerHeight <= 0) {
      this.warnConfig(`headerHeight must be positive, got ${this.config.headerHeight}. Using default 48.`)
      this.config.headerHeight = 48
    }

    // Ensure pageSize is positive
    if (this.config.pageSize !== undefined && this.config.pageSize <= 0) {
      this.warnConfig(`pageSize must be positive, got ${this.config.pageSize}. Using default 10.`)
      this.config.pageSize = 10
    }

    // Ensure columns array exists
    if (!this.config.columns || !Array.isArray(this.config.columns)) {
      this.warnConfig('columns must be an array. Using empty array.')
      this.config.columns = []
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'grid')
    this.element.setAttribute('aria-label', 'Data grid')
    this.updateGridAria()
  }

  private updateGridAria(): void {
    const visibleColumns = this.config.columns.filter((c) => !c.hidden).length
    const selectColumn = this.config.selectable ? 1 : 0
    this.element.setAttribute('aria-colcount', String(visibleColumns + selectColumn))
    this.element.setAttribute('aria-rowcount', String((this.config.data?.length || 0) + 1)) // +1 for header
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.tableContainer = null
    this.tableHeader = null
    this.tableBody = null
    this.tableFooter = null
    this.resizeObserver = null
    this.resizeDebounceTimeout = null
    this.processedData = []

    this.buildDOM()
    this.processData()
    this.renderData()
  }

  private buildDOM(): void {
    this.element.classList.add('data-grid-wrapper')

    // Build table structure
    this.tableContainer = document.createElement('div')
    this.tableContainer.className = 'data-grid-container'

    const table = document.createElement('table')
    table.className = 'data-grid-table'
    if (this.config.striped) table.classList.add('striped')
    if (this.config.bordered) table.classList.add('bordered')
    if (this.config.hoverable) table.classList.add('hoverable')
    if (this.config.compact) table.classList.add('compact')

    // Header
    this.tableHeader = document.createElement('thead')
    this.tableHeader.className = 'data-grid-header'
    if (this.config.stickyHeader) {
      this.tableHeader.classList.add('sticky')
    }
    table.appendChild(this.tableHeader)

    // Body
    this.tableBody = document.createElement('tbody')
    this.tableBody.className = 'data-grid-body'
    table.appendChild(this.tableBody)

    this.tableContainer.appendChild(table)
    this.element.appendChild(this.tableContainer)

    // Pagination footer
    if (this.config.showPagination && this.config.pagination) {
      this.tableFooter = document.createElement('div')
      this.tableFooter.className = 'data-grid-footer'
      if (this.config.stickyFooter) {
        this.tableFooter.classList.add('sticky')
      }
      this.element.appendChild(this.tableFooter)
    }

    // Render header
    this.renderHeader()

    // Setup resize observer with debounce to prevent excessive re-renders
    if (this.config.virtualScroll && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeDebounceTimeout) {
          clearTimeout(this.resizeDebounceTimeout)
        }
        this.resizeDebounceTimeout = setTimeout(() => {
          this.renderData()
        }, 100) // 100ms debounce
      })
      this.resizeObserver.observe(this.tableContainer)
    }
  }

  private renderHeader(): void {
    if (!this.tableHeader) return

    const headerRow = document.createElement('tr')
    headerRow.className = 'data-grid-header-row'
    headerRow.setAttribute('role', 'row')

    // Selection checkbox column
    if (this.config.selectable) {
      const th = document.createElement('th')
      th.className = 'data-grid-select-cell'
      th.style.width = '48px'
      th.setAttribute('role', 'columnheader')

      if (this.config.multiSelect) {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'data-grid-select-all'
        checkbox.checked = this.state.isAllSelected
        checkbox.setAttribute('aria-label', 'Select all rows')
        checkbox.addEventListener('change', () => this.toggleSelectAll())
        th.appendChild(checkbox)
      }

      headerRow.appendChild(th)
    }

    // Column headers
    const orderedColumns = this.getOrderedColumns()
    orderedColumns.forEach((column) => {
      if (column.hidden) return

      const th = document.createElement('th')
      th.className = 'data-grid-header-cell'
      th.dataset.columnId = column.id
      th.setAttribute('role', 'columnheader')
      th.setAttribute('scope', 'col')

      // Alignment
      if (column.align) {
        th.style.textAlign = column.align
      }

      // Width
      const width = this.state.columnWidths.get(column.id) || column.width
      if (width) {
        th.style.width = typeof width === 'number' ? `${width}px` : width
      }
      if (column.minWidth) th.style.minWidth = `${column.minWidth}px`
      if (column.maxWidth) th.style.maxWidth = `${column.maxWidth}px`

      // Sticky column
      if (column.sticky) {
        th.classList.add(`sticky-${column.sticky}`)
      }

      // Header content
      const headerContent = document.createElement('div')
      headerContent.className = 'data-grid-header-content'

      if (column.headerRender) {
        const rendered = column.headerRender(column)
        if (typeof rendered === 'string') {
          // Use textContent for safety; if HTML is needed, user should return an HTMLElement
          headerContent.textContent = rendered
        } else {
          headerContent.appendChild(rendered)
        }
      } else {
        headerContent.textContent = column.header
      }

      th.appendChild(headerContent)

      // Sort indicator
      if (column.sortable !== false && this.config.sortable) {
        th.classList.add('sortable')

        const sortIndicator = document.createElement('span')
        sortIndicator.className = 'data-grid-sort-indicator'

        if (this.state.sort?.columnId === column.id) {
          th.classList.add('sorted')
          th.classList.add(this.state.sort.direction)
          th.setAttribute('aria-sort', this.state.sort.direction === 'asc' ? 'ascending' : 'descending')
          sortIndicator.textContent = this.state.sort.direction === 'asc' ? '\u25B2' : '\u25BC'
        } else {
          th.setAttribute('aria-sort', 'none')
          sortIndicator.textContent = '\u25B4\u25BE'
        }

        th.appendChild(sortIndicator)
        th.addEventListener('click', () => this.handleSort(column.id))
      }

      // Column resize handle
      if (this.config.resizableColumns && column.resizable !== false) {
        const resizeHandle = document.createElement('div')
        resizeHandle.className = 'data-grid-resize-handle'
        resizeHandle.addEventListener('mousedown', (e) => this.handleColumnResize(e, column.id))
        th.appendChild(resizeHandle)
      }

      headerRow.appendChild(th)
    })

    this.tableHeader.innerHTML = ''
    this.tableHeader.appendChild(headerRow)

    // Filter row
    if (this.config.filterable) {
      this.renderFilterRow()
    }
  }

  private renderFilterRow(): void {
    if (!this.tableHeader) return

    const filterRow = document.createElement('tr')
    filterRow.className = 'data-grid-filter-row'

    // Selection column placeholder
    if (this.config.selectable) {
      const td = document.createElement('th')
      td.className = 'data-grid-filter-cell'
      filterRow.appendChild(td)
    }

    const orderedColumns = this.getOrderedColumns()
    orderedColumns.forEach((column) => {
      if (column.hidden) return

      const td = document.createElement('th')
      td.className = 'data-grid-filter-cell'

      if (column.filterable !== false) {
        const input = document.createElement('input')
        input.type = 'text'
        input.className = 'data-grid-filter-input'
        input.placeholder = `Filter ${column.header}...`
        input.setAttribute('aria-label', `Filter by ${column.header}`)

        const existingFilter = this.state.filters.find((f) => f.columnId === column.id)
        if (existingFilter) {
          input.value = existingFilter.value
        }

        input.addEventListener('input', (e) => {
          const value = (e.target as HTMLInputElement).value
          this.handleFilter(column.id, value)
        })

        td.appendChild(input)
      }

      filterRow.appendChild(td)
    })

    this.tableHeader.appendChild(filterRow)
  }

  private processData(): void {
    let data = [...(this.config.data || [])]

    // Apply filters
    if (this.state.filters.length > 0) {
      data = data.filter((row) => {
        return this.state.filters.every((filter) => {
          const column = this.config.columns.find((c) => c.id === filter.columnId)
          if (!column) return true

          if (column.filterFn) {
            return column.filterFn(row, filter.value)
          }

          const value = this.getCellValue(row, column)
          const strValue = String(value ?? '').toLowerCase()
          const filterValue = filter.value.toLowerCase()

          switch (filter.operator) {
            case 'equals':
              return strValue === filterValue
            case 'startsWith':
              return strValue.startsWith(filterValue)
            case 'endsWith':
              return strValue.endsWith(filterValue)
            case 'gt':
              return Number(value) > Number(filterValue)
            case 'lt':
              return Number(value) < Number(filterValue)
            case 'gte':
              return Number(value) >= Number(filterValue)
            case 'lte':
              return Number(value) <= Number(filterValue)
            case 'contains':
            default:
              return strValue.includes(filterValue)
          }
        })
      })
    }

    // Apply sorting
    if (this.state.sort) {
      const column = this.config.columns.find((c) => c.id === this.state.sort?.columnId)
      if (column) {
        data.sort((a, b) => {
          if (column.sortFn) {
            const result = column.sortFn(a, b)
            return this.state.sort?.direction === 'desc' ? -result : result
          }

          const aValue = this.getCellValue(a, column)
          const bValue = this.getCellValue(b, column)

          let result: number
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            result = aValue - bValue
          } else {
            result = String(aValue ?? '').localeCompare(String(bValue ?? ''))
          }

          return this.state.sort?.direction === 'desc' ? -result : result
        })
      }
    }

    this.processedData = data
  }

  private renderData(): void {
    if (!this.tableBody) return

    this.tableBody.innerHTML = ''

    // Show loading state
    if (this.state.isLoading) {
      const loadingRow = document.createElement('tr')
      loadingRow.className = 'data-grid-loading-row'
      const loadingCell = document.createElement('td')
      loadingCell.colSpan = this.getVisibleColumnCount()
      loadingCell.className = 'data-grid-loading-cell'
      loadingCell.textContent = this.config.loadingMessage || 'Loading...'
      loadingRow.appendChild(loadingCell)
      this.tableBody.appendChild(loadingRow)
      return
    }

    // Get paginated data
    const pageData = this.getPaginatedData()

    // Show empty state
    if (pageData.length === 0) {
      const emptyRow = document.createElement('tr')
      emptyRow.className = 'data-grid-empty-row'
      const emptyCell = document.createElement('td')
      emptyCell.colSpan = this.getVisibleColumnCount()
      emptyCell.className = 'data-grid-empty-cell'
      emptyCell.textContent = this.config.emptyMessage || 'No data available'
      emptyRow.appendChild(emptyCell)
      this.tableBody.appendChild(emptyRow)
      this.renderPagination()
      return
    }

    // Render rows
    pageData.forEach((row, index) => {
      const rowElement = this.renderRow(row, index)
      this.tableBody?.appendChild(rowElement)
    })

    // Render pagination
    this.renderPagination()

    // Update select all state
    this.updateSelectAllState()
  }

  private renderRow(row: T, rowIndex: number): HTMLElement {
    const tr = document.createElement('tr')
    tr.className = 'data-grid-row'
    tr.dataset.rowIndex = String(rowIndex)
    tr.setAttribute('role', 'row')
    tr.setAttribute('aria-rowindex', String(rowIndex + 2)) // +2 for 1-based index and header row

    const rowKey = this.getRowKey(row)
    tr.dataset.rowKey = rowKey

    if (this.state.selectedRows.has(rowKey)) {
      tr.classList.add('selected')
    }

    // Row click handlers
    tr.addEventListener('click', () => {
      this.config.onRowClick?.(row, rowIndex)
      if (this.config.selectable && !this.config.multiSelect) {
        this.selectRow(rowKey)
      }
    })

    tr.addEventListener('dblclick', () => {
      this.config.onRowDoubleClick?.(row, rowIndex)
    })

    // Selection checkbox
    if (this.config.selectable) {
      const td = document.createElement('td')
      td.className = 'data-grid-select-cell'
      td.setAttribute('role', 'gridcell')

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.className = 'data-grid-row-checkbox'
      checkbox.checked = this.state.selectedRows.has(rowKey)
      checkbox.setAttribute('aria-label', `Select row ${rowIndex + 1}`)
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation()
        this.toggleRowSelection(rowKey)
      })
      checkbox.addEventListener('click', (e) => e.stopPropagation())

      td.appendChild(checkbox)
      tr.appendChild(td)
    }

    // Data cells
    const orderedColumns = this.getOrderedColumns()
    orderedColumns.forEach((column) => {
      if (column.hidden) return

      const td = document.createElement('td')
      td.className = 'data-grid-cell'
      td.dataset.columnId = column.id
      td.setAttribute('role', 'gridcell')

      // Alignment
      if (column.align) {
        td.style.textAlign = column.align
      }

      // Cell class name
      if (column.cellClassName) {
        const value = this.getCellValue(row, column)
        const className =
          typeof column.cellClassName === 'function' ? column.cellClassName(value, row) : column.cellClassName
        td.classList.add(className)
      }

      // Sticky column
      if (column.sticky) {
        td.classList.add(`sticky-${column.sticky}`)
      }

      // Cell content
      const value = this.getCellValue(row, column)
      if (column.render) {
        const rendered = column.render(value, row, rowIndex)
        if (typeof rendered === 'string') {
          // Use textContent for safety; if HTML is needed, user should return an HTMLElement
          td.textContent = rendered
        } else {
          td.appendChild(rendered)
        }
      } else {
        td.textContent = value != null ? String(value) : ''
      }

      tr.appendChild(td)
    })

    return tr
  }

  private renderPagination(): void {
    if (!this.tableFooter || !this.config.showPagination) return

    this.tableFooter.innerHTML = ''

    const pagination = this.getPaginationInfo()

    // Info text
    const info = document.createElement('div')
    info.className = 'data-grid-pagination-info'
    const startItem = (pagination.page - 1) * pagination.pageSize + 1
    const endItem = Math.min(pagination.page * pagination.pageSize, pagination.totalItems)
    info.textContent =
      pagination.totalItems > 0 ? `Showing ${startItem} to ${endItem} of ${pagination.totalItems} entries` : 'No entries'

    this.tableFooter.appendChild(info)

    // Page size selector
    if (this.config.showPageSizeSelector) {
      const pageSizeContainer = document.createElement('div')
      pageSizeContainer.className = 'data-grid-page-size'

      const label = document.createElement('label')
      label.textContent = 'Show '

      const select = document.createElement('select')
      select.className = 'data-grid-page-size-select'
      select.setAttribute('aria-label', 'Page size')
      ;(this.config.pageSizeOptions || [10, 25, 50, 100]).forEach((size) => {
        const option = document.createElement('option')
        option.value = String(size)
        option.textContent = String(size)
        option.selected = size === this.state.pageSize
        select.appendChild(option)
      })

      select.addEventListener('change', (e) => {
        const newSize = parseInt((e.target as HTMLSelectElement).value, 10)
        this.setPageSize(newSize)
      })

      label.appendChild(select)
      label.appendChild(document.createTextNode(' entries'))
      pageSizeContainer.appendChild(label)
      this.tableFooter.appendChild(pageSizeContainer)
    }

    // Pagination buttons
    const buttons = document.createElement('div')
    buttons.className = 'data-grid-pagination-buttons'

    // First page
    const firstBtn = this.createPaginationButton('\u00AB', 1, pagination.page === 1)
    firstBtn.setAttribute('aria-label', 'First page')
    buttons.appendChild(firstBtn)

    // Previous page
    const prevBtn = this.createPaginationButton('\u2039', pagination.page - 1, pagination.page === 1)
    prevBtn.setAttribute('aria-label', 'Previous page')
    buttons.appendChild(prevBtn)

    // Page numbers
    const pageNumbers = this.getPageNumbers(pagination.page, pagination.totalPages)
    pageNumbers.forEach((pageNum) => {
      if (pageNum === '...') {
        const ellipsis = document.createElement('span')
        ellipsis.className = 'data-grid-pagination-ellipsis'
        ellipsis.textContent = '...'
        buttons.appendChild(ellipsis)
      } else {
        const btn = this.createPaginationButton(String(pageNum), pageNum as number, false)
        if (pageNum === pagination.page) {
          btn.classList.add('active')
          btn.setAttribute('aria-current', 'page')
        }
        buttons.appendChild(btn)
      }
    })

    // Next page
    const nextBtn = this.createPaginationButton('\u203A', pagination.page + 1, pagination.page === pagination.totalPages)
    nextBtn.setAttribute('aria-label', 'Next page')
    buttons.appendChild(nextBtn)

    // Last page
    const lastBtn = this.createPaginationButton('\u00BB', pagination.totalPages, pagination.page === pagination.totalPages)
    lastBtn.setAttribute('aria-label', 'Last page')
    buttons.appendChild(lastBtn)

    this.tableFooter.appendChild(buttons)
  }

  private createPaginationButton(text: string, page: number, disabled: boolean): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.className = 'data-grid-pagination-btn'
    btn.textContent = text
    btn.disabled = disabled
    btn.addEventListener('click', () => this.goToPage(page))
    return btn
  }

  private getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  private getCellValue(row: T, column: DataGridColumn<T>): unknown {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }
    return row[column.accessor]
  }

  private getRowKey(row: T): string {
    if (typeof this.config.rowKey === 'function') {
      return this.config.rowKey(row)
    }
    if (this.config.rowKey) {
      return String(row[this.config.rowKey])
    }
    return JSON.stringify(row)
  }

  private getOrderedColumns(): DataGridColumn<T>[] {
    const columns = this.config.columns || []
    return this.state.columnOrder
      .map((id) => columns.find((c) => c.id === id))
      .filter((c): c is DataGridColumn<T> => c !== undefined)
  }

  private getVisibleColumnCount(): number {
    const columns = this.config.columns || []
    let count = columns.filter((c) => !c.hidden).length
    if (this.config.selectable) count++
    return count
  }

  private getPaginatedData(): T[] {
    if (!this.config.pagination) {
      return this.processedData
    }

    const start = (this.state.page - 1) * this.state.pageSize
    const end = start + this.state.pageSize
    return this.processedData.slice(start, end)
  }

  private getPaginationInfo(): DataGridPagination {
    const totalItems = this.processedData.length
    const totalPages = Math.max(1, Math.ceil(totalItems / this.state.pageSize))

    return {
      page: this.state.page,
      pageSize: this.state.pageSize,
      totalItems,
      totalPages,
    }
  }

  private handleSort(columnId: string): void {
    let newSort: DataGridSort | null

    if (this.state.sort?.columnId === columnId) {
      if (this.state.sort.direction === 'asc') {
        newSort = { columnId, direction: 'desc' }
      } else {
        newSort = null
      }
    } else {
      newSort = { columnId, direction: 'asc' }
    }

    this.setState({ sort: newSort, page: 1 })
    this.processData()
    this.renderHeader()
    this.renderData()
    this.config.onSort?.(newSort)
  }

  private handleFilter(columnId: string, value: string): void {
    let filters = [...this.state.filters]
    const existingIndex = filters.findIndex((f) => f.columnId === columnId)

    if (value.trim() === '') {
      if (existingIndex >= 0) {
        filters.splice(existingIndex, 1)
      }
    } else {
      const filter: DataGridFilter = { columnId, value, operator: 'contains' }
      if (existingIndex >= 0) {
        filters[existingIndex] = filter
      } else {
        filters.push(filter)
      }
    }

    this.setState({ filters, page: 1 })
    this.processData()
    this.renderData()
    this.config.onFilter?.(filters)
  }

  private handleColumnResize(e: MouseEvent, columnId: string): void {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startWidth = this.state.columnWidths.get(columnId) || 150

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX
      const newWidth = Math.max(50, startWidth + delta)
      const columnWidths = new Map(this.state.columnWidths)
      columnWidths.set(columnId, newWidth)
      this.setState({ columnWidths })
      this.renderHeader()
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      const finalWidth = this.state.columnWidths.get(columnId)
      if (finalWidth) {
        this.config.onColumnResize?.(columnId, finalWidth)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  private toggleRowSelection(rowKey: string): void {
    const selectedRows = new Set(this.state.selectedRows)

    if (selectedRows.has(rowKey)) {
      selectedRows.delete(rowKey)
    } else {
      selectedRows.add(rowKey)
    }

    this.setState({ selectedRows })
    this.updateSelectAllState()
    this.renderData()

    const selectedData = this.getSelectedRows()
    this.config.onSelect?.(selectedData)
  }

  private selectRow(rowKey: string): void {
    const selectedRows = new Set<string>()
    selectedRows.add(rowKey)
    this.setState({ selectedRows })
    this.renderData()

    const selectedData = this.getSelectedRows()
    this.config.onSelect?.(selectedData)
  }

  private toggleSelectAll(): void {
    const pageData = this.getPaginatedData()

    if (this.state.isAllSelected) {
      this.setState({ selectedRows: new Set(), isAllSelected: false })
    } else {
      const selectedRows = new Set<string>()
      pageData.forEach((row) => {
        selectedRows.add(this.getRowKey(row))
      })
      this.setState({ selectedRows, isAllSelected: true })
    }

    this.renderData()
    const selectedData = this.getSelectedRows()
    this.config.onSelect?.(selectedData)
  }

  private updateSelectAllState(): void {
    const pageData = this.getPaginatedData()
    if (pageData.length === 0) {
      this.setState({ isAllSelected: false })
      return
    }

    const allSelected = pageData.every((row) => this.state.selectedRows.has(this.getRowKey(row)))
    this.setState({ isAllSelected: allSelected })

    const selectAllCheckbox = this.element.querySelector('.data-grid-select-all') as HTMLInputElement | null
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = allSelected
      selectAllCheckbox.indeterminate = !allSelected && this.state.selectedRows.size > 0
    }
  }

  // Public API

  setData(data: T[]): void {
    this.config.data = data
    this.processData()
    this.setState({ page: 1 })
    this.updateGridAria()
    this.renderData()
  }

  getData(): T[] {
    return [...(this.config.data || [])]
  }

  getProcessedData(): T[] {
    return [...this.processedData]
  }

  setColumns(columns: DataGridColumn<T>[]): void {
    this.config.columns = columns
    this.setState({
      columnOrder: columns.map((c) => c.id),
      columnWidths: new Map(columns.map((col) => [col.id, typeof col.width === 'number' ? col.width : 150])),
    })
    this.renderHeader()
    this.renderData()
  }

  getColumns(): DataGridColumn<T>[] {
    return [...(this.config.columns || [])]
  }

  sortBy(columnId: string, direction: 'asc' | 'desc'): void {
    this.setState({ sort: { columnId, direction }, page: 1 })
    this.processData()
    this.renderHeader()
    this.renderData()
  }

  clearSort(): void {
    this.setState({ sort: null })
    this.processData()
    this.renderHeader()
    this.renderData()
  }

  getSort(): DataGridSort | null {
    return this.state.sort
  }

  filterBy(filters: DataGridFilter[]): void {
    this.setState({ filters, page: 1 })
    this.processData()
    this.renderData()
  }

  clearFilters(): void {
    this.setState({ filters: [], page: 1 })
    this.processData()
    this.renderFilterRow()
    this.renderData()
  }

  getFilters(): DataGridFilter[] {
    return [...this.state.filters]
  }

  goToPage(page: number): void {
    const { totalPages } = this.getPaginationInfo()
    const newPage = Math.max(1, Math.min(page, totalPages))
    this.setState({ page: newPage })
    this.renderData()
    this.config.onPageChange?.(newPage)
  }

  setPageSize(pageSize: number): void {
    this.setState({ pageSize, page: 1 })
    this.renderData()
    this.config.onPageSizeChange?.(pageSize)
  }

  getPage(): number {
    return this.state.page
  }

  getPageSize(): number {
    return this.state.pageSize
  }

  getPagination(): DataGridPagination {
    return this.getPaginationInfo()
  }

  selectRows(rowKeys: string[]): void {
    this.setState({ selectedRows: new Set(rowKeys) })
    this.updateSelectAllState()
    this.renderData()
  }

  clearSelection(): void {
    this.setState({ selectedRows: new Set(), isAllSelected: false })
    this.renderData()
  }

  getSelectedRows(): T[] {
    return this.processedData.filter((row) => this.state.selectedRows.has(this.getRowKey(row)))
  }

  getSelectedRowKeys(): string[] {
    return Array.from(this.state.selectedRows)
  }

  isRowSelected(rowKey: string): boolean {
    return this.state.selectedRows.has(rowKey)
  }

  showColumn(columnId: string): void {
    const column = this.config.columns?.find((c) => c.id === columnId)
    if (column) {
      column.hidden = false
      this.renderHeader()
      this.renderData()
    }
  }

  hideColumn(columnId: string): void {
    const column = this.config.columns?.find((c) => c.id === columnId)
    if (column) {
      column.hidden = true
      this.renderHeader()
      this.renderData()
    }
  }

  setColumnWidth(columnId: string, width: number): void {
    const columnWidths = new Map(this.state.columnWidths)
    columnWidths.set(columnId, width)
    this.setState({ columnWidths })
    this.renderHeader()
  }

  reorderColumns(columnOrder: string[]): void {
    this.setState({ columnOrder })
    this.renderHeader()
    this.renderData()
    this.config.onColumnReorder?.(columnOrder)
  }

  setLoading(loading: boolean): void {
    this.setState({ isLoading: loading })
    this.renderData()
  }

  isLoading(): boolean {
    return this.state.isLoading
  }

  refresh(): void {
    this.processData()
    this.renderData()
  }

  exportData(format: 'csv' | 'json' = 'json'): string {
    const data = this.processedData
    const columns = this.getOrderedColumns().filter((c) => !c.hidden)

    if (format === 'json') {
      return JSON.stringify(
        data.map((row) => {
          const obj: Record<string, unknown> = {}
          columns.forEach((col) => {
            obj[col.id] = this.getCellValue(row, col)
          })
          return obj
        }),
        null,
        2
      )
    }

    // CSV export
    const headers = columns.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(',')
    const rows = data.map((row) => {
      return columns
        .map((col) => {
          const value = this.getCellValue(row, col)
          const str = String(value ?? '')
          return `"${str.replace(/"/g, '""')}"`
        })
        .join(',')
    })

    return [headers, ...rows].join('\n')
  }

  override getState(): DataGridState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.resizeDebounceTimeout) {
      clearTimeout(this.resizeDebounceTimeout)
      this.resizeDebounceTimeout = null
    }
    this.resizeObserver?.disconnect()
    super.destroy()
  }
}

/**
 * Create DataGrid instance
 */
export function createDataGrid<T = unknown>(element: HTMLElement, config?: Partial<DataGridConfig<T>>): DataGrid<T> {
  return new DataGrid<T>(element, config)
}

export default DataGrid
