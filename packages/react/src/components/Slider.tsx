/**
 * Slider Component
 *
 * React wrapper for CoralCSS Slider component.
 */

import React, { forwardRef, useState, useRef, useCallback } from 'react'

export type SliderSize = 'sm' | 'md' | 'lg'

export interface SliderProps {
  /** Controlled value */
  value?: number
  /** Default value */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Size variant */
  size?: SliderSize
  /** Disabled state */
  disabled?: boolean
  /** Change handler */
  onChange?: (value: number) => void
  /** Change end handler (on mouse up) */
  onChangeEnd?: (value: number) => void
  /** Show value tooltip */
  showValue?: boolean
  /** Additional class */
  className?: string
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      disabled = false,
      onChange,
      onChangeEnd,
      showValue = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isDragging, setIsDragging] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const currentValue = value ?? internalValue
    const percentage = ((currentValue - min) / (max - min)) * 100

    const updateValue = useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return

        const rect = trackRef.current.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const rawValue = min + percent * (max - min)
        const steppedValue = Math.round(rawValue / step) * step
        const clampedValue = Math.max(min, Math.min(max, steppedValue))

        if (value === undefined) {
          setInternalValue(clampedValue)
        }
        onChange?.(clampedValue)
      },
      [min, max, step, disabled, value, onChange]
    )

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValue(e.clientX)

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        onChangeEnd?.(value ?? internalValue)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = currentValue

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, currentValue + step)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, currentValue - step)
          break
        case 'Home':
          newValue = min
          break
        case 'End':
          newValue = max
          break
        default:
          return
      }

      e.preventDefault()
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        data-coral-slider
        data-size={size}
        data-disabled={disabled || undefined}
        data-dragging={isDragging || undefined}
        className={className}
      >
        <div
          ref={trackRef}
          data-coral-slider-track
          onMouseDown={handleMouseDown}
        >
          <div
            data-coral-slider-range
            style={{ width: `${percentage}%` }}
          />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-disabled={disabled}
            data-coral-slider-thumb
            style={{ left: `${percentage}%` }}
            onKeyDown={handleKeyDown}
          >
            {showValue && (
              <span data-coral-slider-tooltip>{currentValue}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
