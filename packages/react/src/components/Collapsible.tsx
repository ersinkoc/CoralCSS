/**
 * Collapsible Component
 *
 * React wrapper for CoralCSS Collapsible component.
 */

import React, {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react'

interface CollapsibleContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  disabled?: boolean
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

const useCollapsible = () => {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible')
  }
  return context
}

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

/**
 * Collapsible component for expandable content
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Content that can be collapsed
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, disabled, className, children, ...props }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlled, onOpenChange]
    )

    return (
      <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange, disabled }}>
        <div
          ref={ref}
          data-coral-collapsible=""
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          className={className}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)

Collapsible.displayName = 'Collapsible'

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange, disabled } = useCollapsible()

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        data-coral-collapsible-trigger=""
        data-state={open ? 'open' : 'closed'}
        disabled={disabled}
        onClick={() => onOpenChange(!open)}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CollapsibleTrigger.displayName = 'CollapsibleTrigger'

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean
}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ forceMount, className, children, ...props }, ref) => {
    const { open } = useCollapsible()

    if (!forceMount && !open) {
      return null
    }

    return (
      <div
        ref={ref}
        data-coral-collapsible-content=""
        data-state={open ? 'open' : 'closed'}
        hidden={!open}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CollapsibleContent.displayName = 'CollapsibleContent'

export default Collapsible
