/**
 * Popover Component
 *
 * React wrapper for CoralCSS Popover component.
 */

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react'

export type PopoverPosition = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  position: PopoverPosition
  align: PopoverAlign
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Open change handler */
  onOpenChange?: (open: boolean) => void
  /** Position */
  position?: PopoverPosition
  /** Alignment */
  align?: PopoverAlign
  /** Children */
  children: React.ReactNode
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position = 'bottom',
  align = 'center',
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement>(null)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = (newOpen: boolean) => {
    setUncontrolledOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <PopoverContext.Provider
      value={{ open, setOpen, triggerRef, position, align }}
    >
      <div data-coral-popover data-position={position}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

export interface PopoverTriggerProps {
  /** Children */
  children: React.ReactNode
  /** As child */
  asChild?: boolean
}

export function PopoverTrigger({ children, asChild = false }: PopoverTriggerProps) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('PopoverTrigger must be used within Popover')

  const { open, setOpen, triggerRef } = context

  const handleClick = () => setOpen(!open)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: handleClick,
      'aria-expanded': open,
      'data-coral-popover-trigger': true,
    })
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      data-coral-popover-trigger
      aria-expanded={open}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export interface PopoverContentProps {
  /** Content */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function PopoverContent({ children, className }: PopoverContentProps) {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('PopoverContent must be used within Popover')

  const { open, setOpen, position, align } = context
  const contentRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, setOpen])

  // Close on escape
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      data-coral-popover-content
      data-position={position}
      data-align={align}
      data-state={open ? 'open' : 'closed'}
      className={className}
    >
      {children}
    </div>
  )
}
