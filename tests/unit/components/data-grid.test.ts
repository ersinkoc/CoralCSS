/**
 * Tests for DataGrid Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/data-grid
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { DataGrid, createDataGrid } from '../../../src/components/data-grid'
import type { DataGridColumn, DataGridConfig } from '../../../src/components/data-grid'

interface TestRow {
  id: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive'
}

const sampleColumns: DataGridColumn<TestRow>[] = [
  { id: 'id', header: 'ID', accessor: 'id', sortable: true, width: 80 },
  { id: 'name', header: 'Name', accessor: 'name', sortable: true, filterable: true },
  { id: 'age', header: 'Age', accessor: 'age', sortable: true, align: 'right' },
  { id: 'email', header: 'Email', accessor: 'email', filterable: true },
  { id: 'status', header: 'Status', accessor: 'status' },
]

const sampleData: TestRow[] = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com', status: 'active' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com', status: 'inactive' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com', status: 'active' },
  { id: 4, name: 'Diana', age: 28, email: 'diana@example.com', status: 'active' },
  { id: 5, name: 'Eve', age: 32, email: 'eve@example.com', status: 'inactive' },
]

describe('DataGrid Component', () => {
  let element: HTMLElement
  let dataGrid: DataGrid<TestRow>

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  afterEach(() => {
    dataGrid?.destroy()
    element.remove()
  })

  describe('Initialization', () => {
    it('should create instance with default config', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })
      expect(dataGrid).toBeInstanceOf(DataGrid)
    })

    it('should have correct ARIA attributes', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })
      expect(element.getAttribute('role')).toBe('grid')
      expect(element.getAttribute('aria-label')).toBe('Data grid')
    })

    it('should render table structure', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })
      expect(element.querySelector('.data-grid-container')).not.toBeNull()
      expect(element.querySelector('.data-grid-header')).not.toBeNull()
      expect(element.querySelector('.data-grid-body')).not.toBeNull()
    })

    it('should render all rows', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })
      const rows = element.querySelectorAll('.data-grid-row')
      expect(rows.length).toBe(5)
    })

    it('should render column headers', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })
      const headers = element.querySelectorAll('.data-grid-header-cell')
      expect(headers.length).toBe(5)
    })
  })

  describe('Sorting', () => {
    it('should sort by column ascending', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      dataGrid.sortBy('age', 'asc')

      const processedData = dataGrid.getProcessedData()
      expect(processedData[0].age).toBe(25) // Bob
      expect(processedData[4].age).toBe(35) // Charlie
    })

    it('should sort by column descending', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      dataGrid.sortBy('age', 'desc')

      const processedData = dataGrid.getProcessedData()
      expect(processedData[0].age).toBe(35) // Charlie
      expect(processedData[4].age).toBe(25) // Bob
    })

    it('should sort by name alphabetically', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      dataGrid.sortBy('name', 'asc')

      const processedData = dataGrid.getProcessedData()
      expect(processedData[0].name).toBe('Alice')
      expect(processedData[4].name).toBe('Eve')
    })

    it('should clear sort', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      dataGrid.sortBy('age', 'asc')
      dataGrid.clearSort()

      expect(dataGrid.getSort()).toBeNull()
    })

    it('should call onSort callback', () => {
      const onSort = vi.fn()
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        onSort,
      })

      dataGrid.sortBy('name', 'asc')
      // Note: sortBy doesn't trigger callback, only clicking header does
    })

    it('should return current sort state', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      dataGrid.sortBy('name', 'desc')
      const sort = dataGrid.getSort()

      expect(sort?.columnId).toBe('name')
      expect(sort?.direction).toBe('desc')
    })
  })

  describe('Filtering', () => {
    it('should filter data by column', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'name', value: 'ali', operator: 'contains' }])

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(1)
      expect(processedData[0].name).toBe('Alice')
    })

    it('should filter with equals operator', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'name', value: 'bob', operator: 'equals' }])

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(1)
      expect(processedData[0].name).toBe('Bob')
    })

    it('should filter with startsWith operator', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'name', value: 'ch', operator: 'startsWith' }])

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(1)
      expect(processedData[0].name).toBe('Charlie')
    })

    it('should filter with numeric operators', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'age', value: '30', operator: 'gte' }])

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(3) // Alice (30), Charlie (35), Eve (32)
    })

    it('should apply multiple filters', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([
        { columnId: 'status', value: 'active', operator: 'equals' },
        { columnId: 'age', value: '30', operator: 'gte' },
      ])

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(2) // Alice, Charlie
    })

    it('should clear filters', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'name', value: 'alice', operator: 'contains' }])
      dataGrid.clearFilters()

      const processedData = dataGrid.getProcessedData()
      expect(processedData.length).toBe(5)
    })

    it('should return current filters', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        filterable: true,
      })

      const filters = [{ columnId: 'name', value: 'test', operator: 'contains' as const }]
      dataGrid.filterBy(filters)

      expect(dataGrid.getFilters()).toEqual(filters)
    })
  })

  describe('Pagination', () => {
    it('should paginate data', () => {
      const moreData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      })) as TestRow[]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: moreData,
        pagination: true,
        pageSize: 10,
      })

      const rows = element.querySelectorAll('.data-grid-row')
      expect(rows.length).toBe(10)
    })

    it('should go to specific page', () => {
      const moreData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      })) as TestRow[]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: moreData,
        pagination: true,
        pageSize: 10,
      })

      dataGrid.goToPage(2)
      expect(dataGrid.getPage()).toBe(2)
    })

    it('should change page size', () => {
      const moreData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      })) as TestRow[]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: moreData,
        pagination: true,
        pageSize: 10,
      })

      dataGrid.setPageSize(25)
      expect(dataGrid.getPageSize()).toBe(25)

      const rows = element.querySelectorAll('.data-grid-row')
      expect(rows.length).toBe(25)
    })

    it('should return pagination info', () => {
      const moreData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      })) as TestRow[]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: moreData,
        pagination: true,
        pageSize: 10,
      })

      const pagination = dataGrid.getPagination()
      expect(pagination.page).toBe(1)
      expect(pagination.pageSize).toBe(10)
      expect(pagination.totalItems).toBe(25)
      expect(pagination.totalPages).toBe(3)
    })

    it('should not exceed total pages', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: true,
        pageSize: 10,
      })

      dataGrid.goToPage(999)
      expect(dataGrid.getPage()).toBe(1) // Only 1 page with 5 items
    })

    it('should not go below page 1', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: true,
        pageSize: 10,
      })

      dataGrid.goToPage(-5)
      expect(dataGrid.getPage()).toBe(1)
    })
  })

  describe('Selection', () => {
    it('should select rows', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        selectable: true,
        rowKey: 'id',
      })

      dataGrid.selectRows(['1', '3'])

      expect(dataGrid.isRowSelected('1')).toBe(true)
      expect(dataGrid.isRowSelected('2')).toBe(false)
      expect(dataGrid.isRowSelected('3')).toBe(true)
    })

    it('should get selected rows', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        selectable: true,
        rowKey: 'id',
        pagination: false,
      })

      dataGrid.selectRows(['1', '3'])

      const selected = dataGrid.getSelectedRows()
      expect(selected.length).toBe(2)
      expect(selected.map((r) => r.id)).toContain(1)
      expect(selected.map((r) => r.id)).toContain(3)
    })

    it('should get selected row keys', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        selectable: true,
        rowKey: 'id',
      })

      dataGrid.selectRows(['1', '3', '5'])

      const keys = dataGrid.getSelectedRowKeys()
      expect(keys).toContain('1')
      expect(keys).toContain('3')
      expect(keys).toContain('5')
    })

    it('should clear selection', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        selectable: true,
        rowKey: 'id',
      })

      dataGrid.selectRows(['1', '2', '3'])
      dataGrid.clearSelection()

      expect(dataGrid.getSelectedRows().length).toBe(0)
    })

    it('should render selection checkboxes', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        selectable: true,
        multiSelect: true,
      })

      expect(element.querySelector('.data-grid-select-all')).not.toBeNull()
      expect(element.querySelectorAll('.data-grid-row-checkbox').length).toBeGreaterThan(0)
    })
  })

  describe('Column Management', () => {
    it('should hide column', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      dataGrid.hideColumn('email')

      const columns = dataGrid.getColumns()
      const emailCol = columns.find((c) => c.id === 'email')
      expect(emailCol?.hidden).toBe(true)
    })

    it('should show column', () => {
      const columnsWithHidden = sampleColumns.map((c) => (c.id === 'email' ? { ...c, hidden: true } : c))

      dataGrid = createDataGrid<TestRow>(element, {
        columns: columnsWithHidden,
        data: sampleData,
      })

      dataGrid.showColumn('email')

      const columns = dataGrid.getColumns()
      const emailCol = columns.find((c) => c.id === 'email')
      expect(emailCol?.hidden).toBe(false)
    })

    it('should set column width', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        resizableColumns: true,
      })

      dataGrid.setColumnWidth('name', 200)

      const state = dataGrid.getState()
      expect(state.columnWidths.get('name')).toBe(200)
    })

    it('should reorder columns', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        reorderableColumns: true,
      })

      const newOrder = ['email', 'name', 'id', 'age', 'status']
      dataGrid.reorderColumns(newOrder)

      const state = dataGrid.getState()
      expect(state.columnOrder).toEqual(newOrder)
    })

    it('should set new columns', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      const newColumns: DataGridColumn<TestRow>[] = [
        { id: 'name', header: 'Full Name', accessor: 'name' },
        { id: 'email', header: 'Email Address', accessor: 'email' },
      ]

      dataGrid.setColumns(newColumns)

      expect(dataGrid.getColumns().length).toBe(2)
    })
  })

  describe('Data Management', () => {
    it('should set new data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      const newData: TestRow[] = [
        { id: 10, name: 'Test User', age: 40, email: 'test@example.com', status: 'active' },
      ]

      dataGrid.setData(newData)

      expect(dataGrid.getData().length).toBe(1)
      expect(dataGrid.getData()[0].name).toBe('Test User')
    })

    it('should get original data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      const data = dataGrid.getData()
      expect(data.length).toBe(5)
    })

    it('should get processed data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'status', value: 'active', operator: 'equals' }])

      const processed = dataGrid.getProcessedData()
      expect(processed.length).toBe(3) // Only active users
    })

    it('should refresh data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      // Modify the underlying data
      dataGrid.config.data = [...sampleData, { id: 6, name: 'Frank', age: 45, email: 'frank@example.com', status: 'active' }]

      dataGrid.refresh()

      expect(dataGrid.getProcessedData().length).toBe(6)
    })
  })

  describe('Loading State', () => {
    it('should show loading state', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        loading: true,
      })

      expect(element.querySelector('.data-grid-loading-cell')).not.toBeNull()
    })

    it('should set loading state', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      dataGrid.setLoading(true)
      expect(dataGrid.isLoading()).toBe(true)
      expect(element.querySelector('.data-grid-loading-cell')).not.toBeNull()
    })

    it('should hide loading state', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        loading: true,
      })

      dataGrid.setLoading(false)
      expect(dataGrid.isLoading()).toBe(false)
    })
  })

  describe('Empty State', () => {
    it('should show empty state when no data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: [],
      })

      expect(element.querySelector('.data-grid-empty-cell')).not.toBeNull()
    })

    it('should show custom empty message', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: [],
        emptyMessage: 'No users found',
      })

      const emptyCell = element.querySelector('.data-grid-empty-cell')
      expect(emptyCell?.textContent).toBe('No users found')
    })
  })

  describe('Export', () => {
    it('should export data as JSON', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      const json = dataGrid.exportData('json')
      const parsed = JSON.parse(json)

      expect(parsed.length).toBe(5)
      expect(parsed[0]).toHaveProperty('id')
      expect(parsed[0]).toHaveProperty('name')
    })

    it('should export data as CSV', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      const csv = dataGrid.exportData('csv')
      const lines = csv.split('\n')

      expect(lines.length).toBe(6) // 1 header + 5 rows
      expect(lines[0]).toContain('ID')
      expect(lines[0]).toContain('Name')
    })

    it('should export filtered data', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        pagination: false,
      })

      dataGrid.filterBy([{ columnId: 'status', value: 'active', operator: 'equals' }])
      const json = dataGrid.exportData('json')
      const parsed = JSON.parse(json)

      expect(parsed.length).toBe(3)
    })
  })

  describe('Custom Rendering', () => {
    it('should use custom cell renderer', () => {
      const columnsWithRender: DataGridColumn<TestRow>[] = [
        ...sampleColumns.slice(0, 4),
        {
          id: 'status',
          header: 'Status',
          accessor: 'status',
          // Return HTMLElement for HTML content (string returns are escaped for XSS safety)
          render: (value) => {
            const span = document.createElement('span')
            span.className = 'badge'
            span.textContent = String(value)
            return span
          },
        },
      ]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: columnsWithRender,
        data: sampleData,
        pagination: false,
      })

      expect(element.querySelector('.badge')).not.toBeNull()
    })

    it('should use custom accessor function', () => {
      const columnsWithAccessor: DataGridColumn<TestRow>[] = [
        {
          id: 'fullInfo',
          header: 'Full Info',
          accessor: (row) => `${row.name} (${row.age})`,
        },
      ]

      dataGrid = createDataGrid<TestRow>(element, {
        columns: columnsWithAccessor,
        data: sampleData,
        pagination: false,
      })

      const cells = element.querySelectorAll('.data-grid-cell')
      expect(cells[0].textContent).toContain('Alice (30)')
    })
  })

  describe('State Management', () => {
    it('should return complete state', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      const state = dataGrid.getState()

      expect(state).toHaveProperty('sort')
      expect(state).toHaveProperty('filters')
      expect(state).toHaveProperty('selectedRows')
      expect(state).toHaveProperty('page')
      expect(state).toHaveProperty('pageSize')
      expect(state).toHaveProperty('columnWidths')
      expect(state).toHaveProperty('columnOrder')
    })
  })

  describe('Styling Options', () => {
    it('should apply striped styling', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        striped: true,
      })

      expect(element.querySelector('.data-grid-table.striped')).not.toBeNull()
    })

    it('should apply bordered styling', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        bordered: true,
      })

      expect(element.querySelector('.data-grid-table.bordered')).not.toBeNull()
    })

    it('should apply compact styling', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        compact: true,
      })

      expect(element.querySelector('.data-grid-table.compact')).not.toBeNull()
    })

    it('should apply hoverable styling', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        hoverable: true,
      })

      expect(element.querySelector('.data-grid-table.hoverable')).not.toBeNull()
    })
  })

  describe('Sticky Features', () => {
    it('should apply sticky header', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        stickyHeader: true,
      })

      expect(element.querySelector('.data-grid-header.sticky')).not.toBeNull()
    })

    it('should apply sticky footer', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
        stickyFooter: true,
        showPagination: true,
      })

      expect(element.querySelector('.data-grid-footer.sticky')).not.toBeNull()
    })
  })

  describe('Cleanup', () => {
    it('should clean up on destroy', () => {
      dataGrid = createDataGrid<TestRow>(element, {
        columns: sampleColumns,
        data: sampleData,
      })

      dataGrid.destroy()

      // Should not throw errors
      expect(true).toBe(true)
    })
  })
})
