/**
 * Tooltip Component
 *
 * React wrapper for CoralCSS Tooltip component.
 */

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
  position: TooltipPosition
  delay: number
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

export interface TooltipProps {
  /** Position of the tooltip */
  position?: TooltipPosition
  /** Delay before showing (ms) */
  delay?: number
  /** Default open state */
  defaultOpen?: boolean
  /** Children */
  children: React.ReactNode
}

export function Tooltip({
  position = 'top',
  delay = 300,
  defaultOpen = false,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement>(null)

  return (
    <TooltipContext.Provider
      value={{ open, setOpen, triggerRef, position, delay }}
    >
      <div data-coral-tooltip data-position={position}>
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

export interface TooltipTriggerProps {
  /** Children */
  children: React.ReactNode
  /** As child - render as child element */
  asChild?: boolean
}

export function TooltipTrigger({ children, asChild = false }: TooltipTriggerProps) {
  const context = useContext(TooltipContext)
  if (!context) throw new Error('TooltipTrigger must be used within Tooltip')

  const { setOpen, triggerRef, delay } = context
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setOpen(false)
  }

  const handleFocus = () => setOpen(true)
  const handleBlur = () => setOpen(false)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'data-coral-tooltip-trigger': true,
    })
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      data-coral-tooltip-trigger
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </span>
  )
}

export interface TooltipContentProps {
  /** Content text or elements */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function TooltipContent({ children, className }: TooltipContentProps) {
  const context = useContext(TooltipContext)
  if (!context) throw new Error('TooltipContent must be used within Tooltip')

  const { open, position } = context

  if (!open) return null

  return (
    <div
      role="tooltip"
      data-coral-tooltip-content
      data-position={position}
      data-state={open ? 'open' : 'closed'}
      className={className}
    >
      {children}
      <span data-coral-tooltip-arrow />
    </div>
  )
}
