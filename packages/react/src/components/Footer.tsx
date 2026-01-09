/**
 * Footer Component
 *
 * React wrapper for CoralCSS Footer component.
 */

import React, { forwardRef } from 'react'

export type FooterVariant = 'simple' | 'columns' | 'centered' | 'minimal'

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: FooterVariant
  sticky?: boolean
}

/**
 * Footer component for site footer
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ variant = 'columns', sticky, className, ...props }, ref) => (
    <footer
      ref={ref}
      data-coral-footer=""
      data-variant={variant}
      data-sticky={sticky || undefined}
      className={className}
      {...props}
    />
  )
)

Footer.displayName = 'Footer'

export const FooterContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-footer-content="" className={className} {...props} />
))

FooterContent.displayName = 'FooterContent'

export const FooterSection = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-footer-section="" className={className} {...props} />
))

FooterSection.displayName = 'FooterSection'

export const FooterTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4 ref={ref} data-coral-footer-title="" className={className} {...props} />
))

FooterTitle.displayName = 'FooterTitle'

export const FooterNav = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} data-coral-footer-nav="" className={className} {...props} />
))

FooterNav.displayName = 'FooterNav'

export const FooterBottom = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-footer-bottom="" className={className} {...props} />
))

FooterBottom.displayName = 'FooterBottom'

export const FooterCopyright = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} data-coral-footer-copyright="" className={className} {...props} />
))

FooterCopyright.displayName = 'FooterCopyright'

export const FooterSocial = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-coral-footer-social="" className={className} {...props} />
))

FooterSocial.displayName = 'FooterSocial'

export default Footer
