/**
 * Pagination Component
 *
 * React wrapper for CoralCSS Pagination component.
 */

import React, { forwardRef, HTMLAttributes, ButtonHTMLAttributes } from 'react'

export interface PaginationProps extends HTMLAttributes<HTMLElement> {}

/**
 * Pagination component for navigating pages
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      data-coral-pagination=""
      className={className}
      {...props}
    />
  )
)

Pagination.displayName = 'Pagination'

export const PaginationContent = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-coral-pagination-content="" className={className} {...props} />
  )
)

PaginationContent.displayName = 'PaginationContent'

export const PaginationItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-coral-pagination-item="" className={className} {...props} />
  )
)

PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg'
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ isActive, size = 'default', className, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      data-coral-pagination-link=""
      data-active={isActive || undefined}
      data-size={size}
      className={className}
      {...props}
    />
  )
)

PaginationLink.displayName = 'PaginationLink'

export const PaginationPrevious = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    aria-label="Go to previous page"
    data-coral-pagination-previous=""
    className={className}
    {...props}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
    <span>Previous</span>
  </a>
))

PaginationPrevious.displayName = 'PaginationPrevious'

export const PaginationNext = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    aria-label="Go to next page"
    data-coral-pagination-next=""
    className={className}
    {...props}
  >
    <span>Next</span>
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.15788 3.13514C5.95643 3.32401 5.94622 3.64042 6.13508 3.84188L9.56449 7.49991L6.13508 11.1579C5.94622 11.3594 5.95643 11.6758 6.15788 11.8647C6.35934 12.0535 6.67576 12.0433 6.86462 11.8419L10.6146 7.84188C10.7949 7.64955 10.7949 7.35027 10.6146 7.15794L6.86462 3.15794C6.67576 2.95648 6.35934 2.94628 6.15788 3.13514Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </a>
))

PaginationNext.displayName = 'PaginationNext'

export const PaginationEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      data-coral-pagination-ellipsis=""
      className={className}
      {...props}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">More pages</span>
    </span>
  )
)

PaginationEllipsis.displayName = 'PaginationEllipsis'

export default Pagination
