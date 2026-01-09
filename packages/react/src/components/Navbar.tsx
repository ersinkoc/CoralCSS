/**
 * Navbar Component
 *
 * React wrapper for CoralCSS Navbar component.
 */

import React, { forwardRef, useState, useCallback } from 'react'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean
  hideOnScroll?: boolean
}

/**
 * Navbar component for site navigation
 *
 * @example
 * ```tsx
 * <Navbar sticky>
 *   <NavbarBrand href="/">Logo</NavbarBrand>
 *   <NavbarMenu>
 *     <NavbarLink href="/about">About</NavbarLink>
 *     <NavbarLink href="/contact">Contact</NavbarLink>
 *   </NavbarMenu>
 *   <NavbarActions>
 *     <Button>Sign In</Button>
 *   </NavbarActions>
 * </Navbar>
 * ```
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ sticky, hideOnScroll, className, children, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
      <nav
        ref={ref}
        data-coral-navbar=""
        data-sticky={sticky || undefined}
        data-mobile-open={mobileOpen || undefined}
        className={className}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === NavbarToggle) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onClick: () => setMobileOpen(!mobileOpen),
              })
            }
            if (child.type === NavbarMenu) {
              return React.cloneElement(child as React.ReactElement<any>, {
                'data-open': mobileOpen || undefined,
              })
            }
          }
          return child
        })}
      </nav>
    )
  }
)

Navbar.displayName = 'Navbar'

export const NavbarBrand = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a ref={ref} data-coral-navbar-brand="" className={className} {...props} />
))

NavbarBrand.displayName = 'NavbarBrand'

export const NavbarMenu = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-navbar-menu="" className={className} {...props} />
))

NavbarMenu.displayName = 'NavbarMenu'

export const NavbarLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ active, className, ...props }, ref) => (
  <a
    ref={ref}
    data-active={active || undefined}
    className={className}
    {...props}
  />
))

NavbarLink.displayName = 'NavbarLink'

export const NavbarActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-navbar-actions="" className={className} {...props} />
))

NavbarActions.displayName = 'NavbarActions'

export const NavbarToggle = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    data-coral-navbar-toggle=""
    aria-label="Toggle navigation menu"
    className={className}
    {...props}
  >
    {children || (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    )}
  </button>
))

NavbarToggle.displayName = 'NavbarToggle'

export default Navbar
