/**
 * Separator Component
 *
 * React wrapper for CoralCSS Separator component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

/**
 * Separator component for visual separation
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-coral-separator=""
      data-orientation={orientation}
      className={className}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

export default Separator
