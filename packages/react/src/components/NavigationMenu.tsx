/**
 * NavigationMenu Component
 *
 * React wrapper for CoralCSS NavigationMenu component.
 */

import React, {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'

interface NavigationMenuContextValue {
  value: string
  onValueChange: (value: string) => void
  orientation: 'horizontal' | 'vertical'
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null)

const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext)
  if (!context) {
    throw new Error('NavigationMenu components must be used within a NavigationMenu')
  }
  return context
}

export interface NavigationMenuProps extends HTMLAttributes<HTMLElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

/**
 * NavigationMenu component for site navigation
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink href="/products">All Products</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  ({ value: controlledValue, defaultValue = '', onValueChange, orientation = 'horizontal', className, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isControlled, onValueChange]
    )

    return (
      <NavigationMenuContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
        <nav
          ref={ref}
          aria-label="Main"
          data-coral-navigation-menu=""
          data-orientation={orientation}
          className={className}
          {...props}
        >
          {children}
          <NavigationMenuViewport />
        </nav>
      </NavigationMenuContext.Provider>
    )
  }
)

NavigationMenu.displayName = 'NavigationMenu'

export const NavigationMenuList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-coral-navigation-menu-list="" className={className} {...props} />
  )
)

NavigationMenuList.displayName = 'NavigationMenuList'

interface NavigationMenuItemContextValue {
  value: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue | null>(null)

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  value?: string
}

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value = '', className, children, ...props }, ref) => {
    const triggerRef = useRef<HTMLButtonElement>(null)

    return (
      <NavigationMenuItemContext.Provider value={{ value, triggerRef }}>
        <li ref={ref} data-coral-navigation-menu-item="" className={className} {...props}>
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    )
  }
)

NavigationMenuItem.displayName = 'NavigationMenuItem'

export interface NavigationMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value, onValueChange } = useNavigationMenu()
    const itemContext = useContext(NavigationMenuItemContext)
    const isOpen = itemContext?.value === value && value !== ''

    const handleClick = () => {
      if (itemContext) {
        onValueChange(isOpen ? '' : itemContext.value)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        data-coral-navigation-menu-trigger=""
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden
          data-coral-navigation-menu-chevron=""
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
    )
  }
)

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

export interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ forceMount, className, ...props }, ref) => {
    const { value } = useNavigationMenu()
    const itemContext = useContext(NavigationMenuItemContext)
    const isOpen = itemContext?.value === value && value !== ''

    if (!forceMount && !isOpen) {
      return null
    }

    return (
      <div
        ref={ref}
        data-coral-navigation-menu-content=""
        data-state={isOpen ? 'open' : 'closed'}
        data-motion="from-start"
        className={className}
        {...props}
      />
    )
  }
)

NavigationMenuContent.displayName = 'NavigationMenuContent'

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ active, className, ...props }, ref) => (
    <a
      ref={ref}
      data-coral-navigation-menu-link=""
      data-active={active || undefined}
      className={className}
      {...props}
    />
  )
)

NavigationMenuLink.displayName = 'NavigationMenuLink'

export const NavigationMenuViewport = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { value } = useNavigationMenu()

    return (
      <div data-coral-navigation-menu-viewport-position="">
        <div
          ref={ref}
          data-coral-navigation-menu-viewport=""
          data-state={value ? 'open' : 'closed'}
          className={className}
          {...props}
        />
      </div>
    )
  }
)

NavigationMenuViewport.displayName = 'NavigationMenuViewport'

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-coral-navigation-menu-indicator="" className={className} {...props}>
      <div data-coral-navigation-menu-indicator-arrow="" />
    </div>
  )
)

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator'

export default NavigationMenu
