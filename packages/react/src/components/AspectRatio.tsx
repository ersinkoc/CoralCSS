/**
 * AspectRatio Component
 *
 * React wrapper for CoralCSS AspectRatio component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

/**
 * AspectRatio component for maintaining aspect ratios
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." className="object-cover w-full h-full" />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, style, className, ...props }, ref) => (
    <div
      ref={ref}
      data-coral-aspect-ratio=""
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        {...props}
      />
    </div>
  )
)

AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
