/**
 * Radio Component
 *
 * React wrapper for CoralCSS Radio component.
 */

import React, { forwardRef, useId, createContext, useContext } from 'react'

interface RadioGroupContextValue {
  name?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = createContext<RadioGroupContextValue>({})

export interface RadioGroupProps {
  /** Group name for form submission */
  name?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Disabled state for all radios */
  disabled?: boolean
  /** Size for all radios */
  size?: 'sm' | 'md' | 'lg'
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'md',
  orientation = 'vertical',
  children,
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: value ?? internalValue,
        onChange: handleChange,
        disabled,
        size,
      }}
    >
      <div
        role="radiogroup"
        data-coral-radio-group
        data-orientation={orientation}
        className={className}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Radio value */
  value: string
  /** Label text */
  label?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, size, className, disabled, ...props }, ref) => {
    const generatedId = useId()
    const context = useContext(RadioGroupContext)

    const radioSize = size || context.size || 'md'
    const isDisabled = disabled || context.disabled
    const isChecked = context.value === value

    const handleChange = () => {
      context.onChange?.(value)
    }

    return (
      <label
        data-coral-radio-wrapper
        data-size={radioSize}
        data-disabled={isDisabled || undefined}
        data-checked={isChecked || undefined}
        className={className}
      >
        <input
          ref={ref}
          type="radio"
          id={generatedId}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          data-coral-radio
          data-size={radioSize}
          {...props}
        />
        <span data-coral-radio-indicator />
        {label && <span data-coral-radio-label>{label}</span>}
      </label>
    )
  }
)

Radio.displayName = 'Radio'
