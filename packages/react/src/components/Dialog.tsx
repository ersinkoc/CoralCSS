/**
 * Dialog Component
 *
 * React wrapper for CoralCSS Dialog component.
 */

import React, { forwardRef, useEffect, useRef, useCallback } from 'react'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  children: React.ReactNode
  className?: string
}

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

/**
 * Dialog component for modal dialogs
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Are you sure?</DialogTitle>
 *     <DialogDescription>
 *       This action cannot be undone.
 *     </DialogDescription>
 *     <DialogFooter>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Confirm</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export function Dialog({
  open = false,
  onOpenChange,
  children,
}: DialogProps) {
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialogContext()

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

DialogTrigger.displayName = 'DialogTrigger'

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, onEscapeKeyDown, onPointerDownOutside, ...props }, ref) => {
    const { open, onOpenChange } = useDialogContext()
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

      const handlePointerDown = (e: PointerEvent) => {
        const content = contentRef.current
        if (content && !content.contains(e.target as Node)) {
          onPointerDownOutside?.(e)
          if (!e.defaultPrevented) {
            onOpenChange(false)
          }
        }
      }

      document.addEventListener('keydown', handleEscape)
      document.addEventListener('pointerdown', handlePointerDown)

      // Lock scroll
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('pointerdown', handlePointerDown)
        document.body.style.overflow = ''
      }
    }, [open, onOpenChange, onEscapeKeyDown, onPointerDownOutside])

    if (!open) return null

    return (
      <div
        data-coral-dialog=""
        data-open=""
        className={className}
        {...props}
      >
        <div data-coral-dialog-backdrop="" />
        <div ref={contentRef} data-coral-dialog-content="">
          {children}
        </div>
      </div>
    )
  }
)

DialogContent.displayName = 'DialogContent'

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} data-coral-dialog-title="" className={className} {...props} />
))

DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} data-coral-dialog-description="" className={className} {...props} />
))

DialogDescription.displayName = 'DialogDescription'

export const DialogFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-dialog-footer="" className={className} {...props} />
))

DialogFooter.displayName = 'DialogFooter'

export const DialogClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = useDialogContext()

  return (
    <button
      ref={ref}
      data-coral-dialog-close=""
      onClick={(e) => {
        onClick?.(e)
        onOpenChange(false)
      }}
      {...props}
    />
  )
})

DialogClose.displayName = 'DialogClose'

export default Dialog
