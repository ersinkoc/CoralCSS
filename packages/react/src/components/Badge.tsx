/**
 * Badge Component
 *
 * React wrapper for CoralCSS Badge component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

/**
 * Badge component for labels and tags
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="success">Success</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <span
      ref={ref}
      data-coral-badge=""
      data-variant={variant}
      className={className}
      {...props}
    />
  )
)

Badge.displayName = 'Badge'

export default Badge
