/**
 * Table Component
 *
 * React wrapper for CoralCSS Table component.
 */

import React, { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered'
}

/**
 * Table component for data display
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <div data-coral-table-wrapper="">
      <table
        ref={ref}
        data-coral-table=""
        data-variant={variant}
        className={className}
        {...props}
      />
    </div>
  )
)

Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} data-coral-table-header="" className={className} {...props} />
  )
)

TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} data-coral-table-body="" className={className} {...props} />
  )
)

TableBody.displayName = 'TableBody'

export const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} data-coral-table-footer="" className={className} {...props} />
  )
)

TableFooter.displayName = 'TableFooter'

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, className, ...props }, ref) => (
    <tr
      ref={ref}
      data-coral-table-row=""
      data-selected={selected || undefined}
      className={className}
      {...props}
    />
  )
)

TableRow.displayName = 'TableRow'

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sortable, sorted, className, children, ...props }, ref) => (
    <th
      ref={ref}
      data-coral-table-head=""
      data-sortable={sortable || undefined}
      data-sorted={sorted || undefined}
      className={className}
      {...props}
    >
      {children}
      {sortable && (
        <span data-coral-table-sort-icon="">
          {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
        </span>
      )}
    </th>
  )
)

TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} data-coral-table-cell="" className={className} {...props} />
  )
)

TableCell.displayName = 'TableCell'

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} data-coral-table-caption="" className={className} {...props} />
  )
)

TableCaption.displayName = 'TableCaption'

export default Table
