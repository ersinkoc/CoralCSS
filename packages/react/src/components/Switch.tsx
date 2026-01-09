/**
 * Switch Component
 *
 * React wrapper for CoralCSS Switch component.
 */

import React, { forwardRef, useState, useCallback, ButtonHTMLAttributes } from 'react'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

/**
 * Switch component for toggles
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false)
 *
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 *
 * <label>
 *   <Switch defaultChecked />
 *   <span>Enable notifications</span>
 * </label>
 * ```
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked)
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const handleClick = useCallback(() => {
      if (disabled) return

      const newValue = !isChecked
      if (!isControlled) {
        setInternalChecked(newValue)
      }
      onCheckedChange?.(newValue)
    }, [isChecked, isControlled, disabled, onCheckedChange])

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        data-coral-switch=""
        data-checked={isChecked || undefined}
        data-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        className={className}
        {...props}
      >
        <span data-coral-switch-thumb="" />
      </button>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch
