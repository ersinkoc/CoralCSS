/**
 * Accordion Component
 *
 * React wrapper for CoralCSS Accordion component.
 */

import React, {
  forwardRef,
  useState,
  createContext,
  useContext,
  useId,
} from 'react'

type AccordionType = 'single' | 'multiple'

interface AccordionContextValue {
  type: AccordionType
  value: string[]
  toggle: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

export interface AccordionProps {
  /** Single or multiple items can be open */
  type?: AccordionType
  /** Controlled value (array of open item values) */
  value?: string[]
  /** Default value */
  defaultValue?: string[]
  /** Value change handler */
  onValueChange?: (value: string[]) => void
  /** Collapsible (for single type) */
  collapsible?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function Accordion({
  type = 'single',
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  collapsible = true,
  children,
  className,
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

  const value = controlledValue ?? uncontrolledValue

  const toggle = (itemValue: string) => {
    let newValue: string[]

    if (type === 'single') {
      if (value.includes(itemValue)) {
        newValue = collapsible ? [] : value
      } else {
        newValue = [itemValue]
      }
    } else {
      if (value.includes(itemValue)) {
        newValue = value.filter((v) => v !== itemValue)
      } else {
        newValue = [...value, itemValue]
      }
    }

    setUncontrolledValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <AccordionContext.Provider value={{ type, value, toggle }}>
      <div data-coral-accordion data-type={type} className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextValue {
  value: string
  open: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

export interface AccordionItemProps {
  /** Unique value for this item */
  value: string
  /** Disabled state */
  disabled?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function AccordionItem({
  value,
  disabled = false,
  children,
  className,
}: AccordionItemProps) {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('AccordionItem must be used within Accordion')

  const id = useId()
  const triggerId = `accordion-trigger-${id}`
  const contentId = `accordion-content-${id}`
  const open = context.value.includes(value)

  return (
    <AccordionItemContext.Provider
      value={{ value, open, triggerId, contentId }}
    >
      <div
        data-coral-accordion-item
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        className={className}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within AccordionItem')
  }

  const { toggle } = accordionContext
  const { value, open, triggerId, contentId } = itemContext

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      data-coral-accordion-trigger
      data-open={open || undefined}
      onClick={() => toggle(value)}
      className={className}
    >
      <span>{children}</span>
      <svg
        data-coral-accordion-icon
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

export interface AccordionContentProps {
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const itemContext = useContext(AccordionItemContext)
  if (!itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem')
  }

  const { open, triggerId, contentId } = itemContext

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-coral-accordion-content
      data-state={open ? 'open' : 'closed'}
      hidden={!open}
      className={className}
    >
      <div data-coral-accordion-content-inner>{children}</div>
    </div>
  )
}
