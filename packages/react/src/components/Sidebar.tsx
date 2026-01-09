/**
 * Sidebar Component
 *
 * React wrapper for CoralCSS Sidebar component.
 */

import React, { forwardRef, useState, createContext, useContext } from 'react'

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar')
  }
  return context
}

export type SidebarVariant = 'default' | 'floating' | 'inset' | 'compact'
export type SidebarPosition = 'left' | 'right'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SidebarVariant
  position?: SidebarPosition
  collapsible?: boolean
  defaultCollapsed?: boolean
}

/**
 * Sidebar component for app navigation
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      variant = 'default',
      position = 'left',
      collapsible = true,
      defaultCollapsed = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
      <SidebarContext.Provider
        value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}
      >
        <aside
          ref={ref}
          data-coral-sidebar=""
          data-variant={variant}
          data-position={position}
          data-collapsed={collapsed || undefined}
          data-mobile-open={mobileOpen || undefined}
          className={className}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  }
)

Sidebar.displayName = 'Sidebar'

export const SidebarHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-sidebar-header="" className={className} {...props} />
))

SidebarHeader.displayName = 'SidebarHeader'

export const SidebarNav = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} data-coral-sidebar-nav="" className={className} {...props} />
))

SidebarNav.displayName = 'SidebarNav'

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ active, className, ...props }, ref) => (
    <a
      ref={ref}
      data-coral-sidebar-item=""
      data-active={active || undefined}
      className={className}
      {...props}
    />
  )
)

SidebarItem.displayName = 'SidebarItem'

export const SidebarGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-sidebar-group="" className={className} {...props} />
))

SidebarGroup.displayName = 'SidebarGroup'

export const SidebarGroupTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    data-coral-sidebar-group-trigger=""
    className={className}
    {...props}
  />
))

SidebarGroupTrigger.displayName = 'SidebarGroupTrigger'

export const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-coral-sidebar-group-content=""
    className={className}
    {...props}
  />
))

SidebarGroupContent.displayName = 'SidebarGroupContent'

export const SidebarFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-sidebar-footer="" className={className} {...props} />
))

SidebarFooter.displayName = 'SidebarFooter'

export const SidebarToggle = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <button
      ref={ref}
      data-coral-sidebar-toggle=""
      aria-expanded={!collapsed}
      onClick={(e) => {
        onClick?.(e)
        setCollapsed(!collapsed)
      }}
      className={className}
      {...props}
    >
      {children || (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {collapsed ? (
            <path d="M6 4l4 4-4 4" />
          ) : (
            <path d="M10 4l-4 4 4 4" />
          )}
        </svg>
      )}
    </button>
  )
})

SidebarToggle.displayName = 'SidebarToggle'

export default Sidebar
