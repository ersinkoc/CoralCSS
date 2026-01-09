/**
 * Breadcrumb Component
 *
 * React wrapper for CoralCSS Breadcrumb component.
 */

import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes, createContext, useContext } from 'react'

interface BreadcrumbContextValue {
  separator: React.ReactNode
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({ separator: '/' })

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
}

/**
 * Breadcrumb component for navigation hierarchy
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', className, children, ...props }, ref) => (
    <BreadcrumbContext.Provider value={{ separator }}>
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        data-coral-breadcrumb=""
        className={className}
        {...props}
      >
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  )
)

Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} data-coral-breadcrumb-list="" className={className} {...props} />
  )
)

BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-coral-breadcrumb-item="" className={className} {...props} />
  )
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a ref={ref} data-coral-breadcrumb-link="" className={className} {...props} />
  )
)

BreadcrumbLink.displayName = 'BreadcrumbLink'

export const BreadcrumbPage = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-current="page"
      aria-disabled="true"
      data-coral-breadcrumb-page=""
      className={className}
      {...props}
    />
  )
)

BreadcrumbPage.displayName = 'BreadcrumbPage'

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
}

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ children, className, ...props }, ref) => {
    const { separator } = useContext(BreadcrumbContext)
    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        data-coral-breadcrumb-separator=""
        className={className}
        {...props}
      >
        {children || separator}
      </li>
    )
  }
)

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-coral-breadcrumb-ellipsis=""
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
      <span className="sr-only">More</span>
    </span>
  )
)

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

export default Breadcrumb
