/**
 * Dropdown Component
 *
 * React wrapper for CoralCSS Dropdown component.
 */

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useId,
} from 'react'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export interface DropdownProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Open change handler */
  onOpenChange?: (open: boolean) => void
  /** Children */
  children: React.ReactNode
}

export function Dropdown({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = (newOpen: boolean) => {
    setUncontrolledOpen(newOpen)
    onOpenChange?.(newOpen)
    if (!newOpen) setHighlightedIndex(-1)
  }

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, highlightedIndex, setHighlightedIndex }}
    >
      <div data-coral-dropdown data-open={open || undefined}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export interface DropdownTriggerProps {
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownTrigger must be used within Dropdown')

  const { open, setOpen } = context

  return (
    <button
      type="button"
      data-coral-dropdown-trigger
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={className}
    >
      {children}
      <svg
        data-coral-dropdown-icon
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
}

export interface DropdownContentProps {
  /** Children */
  children: React.ReactNode
  /** Alignment */
  align?: 'start' | 'center' | 'end'
  /** Additional class */
  className?: string
}

export function DropdownContent({
  children,
  align = 'start',
  className,
}: DropdownContentProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownContent must be used within Dropdown')

  const { open, setOpen } = context
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

  if (!open) return null

  return (
    <div
      ref={contentRef}
      role="menu"
      data-coral-dropdown-content
      data-align={align}
      className={className}
    >
      {children}
    </div>
  )
}

export interface DropdownItemProps {
  /** Click handler */
  onSelect?: () => void
  /** Disabled state */
  disabled?: boolean
  /** Destructive variant */
  destructive?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function DropdownItem({
  onSelect,
  disabled = false,
  destructive = false,
  children,
  className,
}: DropdownItemProps) {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('DropdownItem must be used within Dropdown')

  const { setOpen } = context

  const handleClick = () => {
    if (disabled) return
    onSelect?.()
    setOpen(false)
  }

  return (
    <div
      role="menuitem"
      data-coral-dropdown-item
      data-disabled={disabled || undefined}
      data-destructive={destructive || undefined}
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  )
}

export interface DropdownSeparatorProps {
  /** Additional class */
  className?: string
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div data-coral-dropdown-separator role="separator" className={className} />
}

export interface DropdownLabelProps {
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div data-coral-dropdown-label className={className}>
      {children}
    </div>
  )
}
