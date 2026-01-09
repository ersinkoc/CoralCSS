/**
 * ScrollArea Component
 *
 * React wrapper for CoralCSS ScrollArea component.
 */

import React, { forwardRef, HTMLAttributes } from 'react'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both'
}

/**
 * ScrollArea component for custom scrollable containers
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px]">
 *   <div className="p-4">
 *     {items.map(item => <div key={item.id}>{item.name}</div>)}
 *   </div>
 * </ScrollArea>
 * ```
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ orientation = 'vertical', className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-coral-scroll-area=""
      data-orientation={orientation}
      className={className}
      {...props}
    >
      <div data-coral-scroll-area-viewport="">
        {children}
      </div>
      <ScrollBar orientation={orientation === 'both' ? 'vertical' : orientation} />
      {orientation === 'both' && <ScrollBar orientation="horizontal" />}
    </div>
  )
)

ScrollArea.displayName = 'ScrollArea'

export interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
}

export const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ orientation = 'vertical', className, ...props }, ref) => (
    <div
      ref={ref}
      data-coral-scroll-bar=""
      data-orientation={orientation}
      className={className}
      {...props}
    >
      <div data-coral-scroll-bar-thumb="" />
    </div>
  )
)

ScrollBar.displayName = 'ScrollBar'

export default ScrollArea
