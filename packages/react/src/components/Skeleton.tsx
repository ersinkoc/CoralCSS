/**
 * Skeleton Component
 *
 * React wrapper for CoralCSS Skeleton component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  animation?: 'pulse' | 'wave' | 'none'
  width?: string | number
  height?: string | number
}

/**
 * Skeleton component for loading placeholders
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width={200} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={120} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', animation = 'pulse', width, height, className, style, ...props }, ref) => (
    <div
      ref={ref}
      data-coral-skeleton=""
      data-variant={variant}
      data-animation={animation}
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
