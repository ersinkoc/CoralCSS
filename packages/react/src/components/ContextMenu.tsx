/**
 * ContextMenu Component
 *
 * React wrapper for CoralCSS ContextMenu component.
 */

import React, {
  forwardRef,
  HTMLAttributes,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'

interface ContextMenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

const useContextMenu = () => {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu')
  }
  return context
}

export interface ContextMenuProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

/**
 * ContextMenu component for right-click menus
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Cut</ContextMenuItem>
 *     <ContextMenuItem>Copy</ContextMenuItem>
 *     <ContextMenuItem>Paste</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem>Delete</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({ children, onOpenChange }) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange: handleOpenChange, position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

ContextMenu.displayName = 'ContextMenu'

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ disabled, className, children, ...props }, ref) => {
    const { onOpenChange, setPosition } = useContextMenu()

    const handleContextMenu = (e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
      onOpenChange(true)
    }

    return (
      <div
        ref={ref}
        data-coral-context-menu-trigger=""
        data-disabled={disabled || undefined}
        onContextMenu={handleContextMenu}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ContextMenuTrigger.displayName = 'ContextMenuTrigger'

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
  alignOffset?: number
  sideOffset?: number
}

export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ forceMount, alignOffset = 0, sideOffset = 0, className, children, ...props }, ref) => {
    const { open, onOpenChange, position } = useContextMenu()
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          onOpenChange(false)
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, onOpenChange])

    if (!forceMount && !open) {
      return null
    }

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        data-coral-context-menu-content=""
        data-state={open ? 'open' : 'closed'}
        role="menu"
        style={{
          position: 'fixed',
          top: position.y + sideOffset,
          left: position.x + alignOffset,
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ContextMenuContent.displayName = 'ContextMenuContent'

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  inset?: boolean
  onSelect?: () => void
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ disabled, inset, onSelect, className, children, ...props }, ref) => {
    const { onOpenChange } = useContextMenu()

    const handleClick = () => {
      if (disabled) return
      onSelect?.()
      onOpenChange(false)
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        data-coral-context-menu-item=""
        data-disabled={disabled || undefined}
        data-inset={inset || undefined}
        aria-disabled={disabled}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ContextMenuItem.displayName = 'ContextMenuItem'

export const ContextMenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" data-coral-context-menu-separator="" className={className} {...props} />
  )
)

ContextMenuSeparator.displayName = 'ContextMenuSeparator'

export interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  inset?: boolean
}

export const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ inset, className, ...props }, ref) => (
    <div
      ref={ref}
      data-coral-context-menu-label=""
      data-inset={inset || undefined}
      className={className}
      {...props}
    />
  )
)

ContextMenuLabel.displayName = 'ContextMenuLabel'

export interface ContextMenuCheckboxItemProps extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ checked, onCheckedChange, disabled, className, children, ...props }, ref) => {
    const { onOpenChange } = useContextMenu()

    const handleClick = () => {
      if (disabled) return
      onCheckedChange?.(!checked)
      onOpenChange(false)
    }

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        data-coral-context-menu-checkbox-item=""
        data-checked={checked || undefined}
        data-disabled={disabled || undefined}
        onClick={handleClick}
        className={className}
        {...props}
      >
        <span data-coral-context-menu-item-indicator="">
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </span>
        {children}
      </div>
    )
  }
)

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem'

export const ContextMenuShortcut = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} data-coral-context-menu-shortcut="" className={className} {...props} />
  )
)

ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export default ContextMenu
