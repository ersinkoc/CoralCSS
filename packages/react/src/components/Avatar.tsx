/**
 * Avatar Component
 *
 * React wrapper for CoralCSS Avatar component.
 */

import React, { forwardRef, useState } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarVariant = 'circle' | 'square' | 'rounded'

export interface AvatarProps {
  /** Image source */
  src?: string
  /** Alt text */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Size */
  size?: AvatarSize
  /** Shape variant */
  variant?: AvatarVariant
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy'
  /** Additional class */
  className?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = 'md',
      variant = 'circle',
      status,
      className,
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false)

    const showFallback = !src || imageError

    return (
      <div
        ref={ref}
        data-coral-avatar
        data-size={size}
        data-variant={variant}
        className={className}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || ''}
            data-coral-avatar-image
            onError={() => setImageError(true)}
          />
        ) : (
          <span data-coral-avatar-fallback>
            {fallback || alt?.charAt(0)?.toUpperCase() || '?'}
          </span>
        )}
        {status && (
          <span data-coral-avatar-status data-status={status} />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export interface AvatarGroupProps {
  /** Max avatars to show before "+X" */
  max?: number
  /** Size for all avatars */
  size?: AvatarSize
  /** Children */
  children: React.ReactNode
  /** Additional class */
  className?: string
}

export function AvatarGroup({ max, size, children, className }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children)
  const visibleChildren = max ? childArray.slice(0, max) : childArray
  const remainingCount = max ? Math.max(0, childArray.length - max) : 0

  return (
    <div data-coral-avatar-group data-size={size} className={className}>
      {visibleChildren.map((child, index) => (
        <div key={index} data-coral-avatar-group-item>
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div data-coral-avatar data-size={size} data-variant="circle">
          <span data-coral-avatar-fallback>+{remainingCount}</span>
        </div>
      )}
    </div>
  )
}
