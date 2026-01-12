/**
 * Focus Management Utilities Plugin Tests
 *
 * Tests for focus management utilities including focus-visible rings,
 * focus indicators, focus order, and accessibility features.
 * @module tests/unit/plugins/core/utilities/focus-management
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { focusManagementPlugin } from '../../../../../src/plugins/core/utilities/focus-management'

describe('Focus Management Utilities Plugin', () => {
  it('should generate focus-visible-ring-2', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-ring-2'])
    expect(css).toContain('--coral-ring-width: 2px')
  })

  it('should generate focus-visible-ring-4-offset-4', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-ring-4-offset-4'])
    expect(css).toContain('--coral-ring-offset-width: 4px')
    expect(css).toContain('--coral-ring-width: 4px')
  })

  it('should generate focus-visible-ring-coral-500', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-ring-coral-500'])
    expect(css).toContain('--coral-ring-color: var(--color-coral-500)')
  })

  it('should generate focus-visible-outline-none', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-outline-none'])
    expect(css).toContain('outline: none')
  })

  it('should generate focus-visible-outline-dotted', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-outline-dotted'])
    expect(css).toContain('outline-style: dotted')
  })

  it('should generate focus-visible-outline-2', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-outline-2'])
    expect(css).toContain('outline-width: 2px')
  })

  it('should generate focus-visible-offset-4', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-offset-4'])
    expect(css).toContain('--coral-ring-offset-width: 4px')
  })

  it('should generate focus-visible-inset', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-visible-inset'])
    expect(css).toContain('--coral-ring-inset: inset')
  })

  it('should generate focus-indicator-ring', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-indicator-ring'])
    expect(css).toContain('box-shadow: 0 0 0 2px var(--focus-indicator-color, currentColor)')
  })

  it('should generate focus-indicator-4', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-indicator-4'])
    expect(css).toContain('box-shadow: 0 0 0 4px var(--focus-indicator-color, currentColor)')
  })

  it('should generate focus-order-3', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-order-3'])
    expect(css).toContain('order: 3')
  })

  it('should generate focus-order-10', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-order-10'])
    expect(css).toContain('order: 10')
  })

  it('should generate skip-link', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['skip-link'])
    expect(css).toContain('position: absolute')
    expect(css).toContain('top: -40px')
    expect(css).toContain('background: var(--color-coral-600, #f97316)')
  })

  it('should generate skip-link-active', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['skip-link-active'])
    expect(css).toContain('top: 0')
  })

  it('should generate focus-fill-target', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-fill-target'])
    expect(css).toContain('fill: var(--focus-fill, currentColor)')
  })

  it('should generate focus-stroke-target', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate(['focus-stroke-target'])
    expect(css).toContain('stroke: var(--focus-stroke, currentColor)')
  })

  it('should generate multiple focus management utilities together', () => {
    const coral = createCoral({
      plugins: [focusManagementPlugin()]
    })

    const css = coral.generate([
      'focus-visible-ring-2',
      'focus-visible-ring-coral-500',
      'focus-visible-offset-4'
    ])
    expect(css).toContain('--coral-ring-width')
    expect(css).toContain('--coral-ring-color')
    expect(css).toContain('--coral-ring-offset-width')
  })
})
