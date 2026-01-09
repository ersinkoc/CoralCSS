/**
 * Select Component
 *
 * React wrapper for CoralCSS Select component.
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

export type SelectSize = 'sm' | 'md' | 'lg'

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value?: string
  onValueChange: (value: string) => void
  size: SelectSize
}

const SelectContext = createContext<SelectContextValue | null>(null)

export interface SelectProps {
  /** Controlled value */
  value?: string
  /** Default value */
  defaultValue?: string
  /** Change handler */
  onValueChange?: (value: string) => void
  /** Size variant */
  size?: SelectSize
  /** Disabled state */
  disabled?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Children (SelectTrigger, SelectContent) */
  children: React.ReactNode
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled = false,
  children,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen: disabled ? () => {} : setOpen,
        value: value ?? internalValue,
        onValueChange: handleValueChange,
        size,
      }}
    >
      <div data-coral-select data-open={open || undefined} data-disabled={disabled || undefined}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export interface SelectTriggerProps {
  /** Placeholder when no value selected */
  placeholder?: string
  /** Children */
  children?: React.ReactNode
  /** Additional class */
  className?: string
}

export function SelectTrigger({ placeholder, children, className }: SelectTriggerProps) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within Select')

  const { open, setOpen, value, size } = context

  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      data-coral-select-trigger
      data-size={size}
      onClick={() => setOpen(!open)}
      className={className}
    >
      <span data-coral-select-value data-placeholder={!value || undefined}>
        {children || value || placeholder || 'Select...'}
      </span>
      <svg
        data-coral-select-icon
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

export interface SelectContentProps {
  /** Children (SelectItem) */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function SelectContent({ children, className }: SelectContentProps) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectContent must be used within Select')

  const { open } = context

  if (!open) return null

  return (
    <div
      role="listbox"
      data-coral-select-content
      data-state={open ? 'open' : 'closed'}
      className={className}
    >
      {children}
    </div>
  )
}

export interface SelectItemProps {
  /** Item value */
  value: string
  /** Disabled state */
  disabled?: boolean
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function SelectItem({ value, disabled = false, children, className }: SelectItemProps) {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within Select')

  const { value: selectedValue, onValueChange } = context
  const isSelected = selectedValue === value

  return (
    <div
      role="option"
      aria-selected={isSelected}
      data-coral-select-item
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      onClick={() => !disabled && onValueChange(value)}
      className={className}
    >
      {isSelected && (
        <svg
          data-coral-select-item-indicator
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {children}
    </div>
  )
}
