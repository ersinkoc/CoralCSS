/**
 * Drawer Component
 *
 * React wrapper for CoralCSS Drawer component.
 */

import React, { forwardRef, useEffect, useRef, useCallback } from 'react'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  position?: DrawerPosition
  children: React.ReactNode
  className?: string
}

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: DrawerPosition
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer')
  }
  return context
}

/**
 * Drawer component for slide-out panels
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onOpenChange={setIsOpen} position="right">
 *   <DrawerTrigger asChild>
 *     <Button>Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Drawer Title</DrawerTitle>
 *     </DrawerHeader>
 *     <div>Drawer content...</div>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
export function Drawer({
  open = false,
  onOpenChange,
  position = 'right',
  children,
}: DrawerProps) {
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange, position }}>
      {children}
    </DrawerContext.Provider>
  )
}

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawerContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onOpenChange(true)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleClick,
        ref,
      })
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    )
  }
)

DrawerTrigger.displayName = 'DrawerTrigger'

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, className, onEscapeKeyDown, onPointerDownOutside, ...props }, ref) => {
    const { open, onOpenChange, position } = useDrawerContext()
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!open) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onEscapeKeyDown?.(e)
          if (!e.defaultPrevented) {
            onOpenChange(false)
          }
        }
      }

      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
      }
    }, [open, onOpenChange, onEscapeKeyDown])

    const handleBackdropClick = () => {
      onOpenChange(false)
    }

    if (!open) return null

    return (
      <div data-coral-drawer="" data-open="" data-position={position} className={className} {...props}>
        <div data-coral-drawer-backdrop="" onClick={handleBackdropClick} />
        <div ref={contentRef} data-coral-drawer-content="">
          {children}
        </div>
      </div>
    )
  }
)

DrawerContent.displayName = 'DrawerContent'

export const DrawerHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-coral-drawer-header="" className={className} {...props} />
  )
)

DrawerHeader.displayName = 'DrawerHeader'

export const DrawerTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} data-coral-drawer-title="" className={className} {...props} />
  )
)

DrawerTitle.displayName = 'DrawerTitle'

export const DrawerClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { onOpenChange } = useDrawerContext()

    return (
      <button
        ref={ref}
        data-coral-drawer-close=""
        onClick={(e) => {
          onClick?.(e)
          onOpenChange(false)
        }}
        {...props}
      />
    )
  }
)

DrawerClose.displayName = 'DrawerClose'

export default Drawer
