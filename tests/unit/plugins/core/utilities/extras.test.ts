/**
 * Extras Utilities Plugin Tests
 *
 * Tests for accent colors, color schemes, line clamps, and other modern CSS utilities.
 * @module tests/unit/plugins/core/utilities/extras
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { extrasUtilitiesPlugin } from '../../../../../src/plugins/core/utilities/extras'

describe('Extras Utilities Plugin', () => {
  it('should generate accent color utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['accent-auto'])
    expect(css).toContain('accent-color: auto;')
  })

  it('should generate accent color with theme colors', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['accent-primary'])
    expect(css).toContain('accent-color: hsl(var(--primary));')
  })

  it('should generate color scheme utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['color-scheme-dark'])
    expect(css).toContain('color-scheme: dark;')
  })

  it('should generate print color adjust utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['print-color-adjust-exact'])
    expect(css).toContain('print-color-adjust: exact;')
    expect(css).toContain('-webkit-print-color-adjust: exact;')
  })

  it('should generate line clamp utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['line-clamp-3'])
    expect(css).toContain('display: -webkit-box;')
    expect(css).toContain('-webkit-box-orient: vertical;')
    expect(css).toContain('-webkit-line-clamp: 3;')
    expect(css).toContain('overflow: hidden;')
  })

  it('should generate line clamp none', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['line-clamp-none'])
    expect(css).toContain('-webkit-line-clamp: unset;')
  })

  it('should generate box decoration break utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['decoration-clone'])
    expect(css).toContain('box-decoration-break: clone;')
    expect(css).toContain('-webkit-box-decoration-break: clone;')
  })

  it('should generate hanging punctuation utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['hanging-punctuation-first'])
    expect(css).toContain('hanging-punctuation: first;')
  })

  it('should generate text align last utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['text-align-last-center'])
    expect(css).toContain('text-align-last: center;')
  })

  it('should generate appearance utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['appearance-none'])
    expect(css).toContain('appearance: none;')
    expect(css).toContain('-webkit-appearance: none;')
    expect(css).toContain('-moz-appearance: none;')
  })

  it('should generate hyphens utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['hyphens-auto'])
    expect(css).toContain('-webkit-hyphens: auto;')
    expect(css).toContain('-ms-hyphens: auto;')
    expect(css).toContain('hyphens: auto;')
  })

  it('should generate overflow anchor utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['overflow-anchor-none'])
    expect(css).toContain('overflow-anchor: none;')
  })

  it('should generate forced color adjust utilities', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['forced-color-adjust-none'])
    expect(css).toContain('forced-color-adjust: none;')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate(['hover:accent-primary', 'dark:line-clamp-3'])
    expect(css).toContain('.hover\\:accent-primary')
    expect(css).toContain('accent-color: hsl(var(--primary))')
    expect(css).toContain('.dark\\:line-clamp-3')
    expect(css).toContain('-webkit-line-clamp: 3')
  })

  it('should generate multiple extras utilities together', () => {
    const coral = createCoral({
      plugins: [extrasUtilitiesPlugin()]
    })

    const css = coral.generate([
      'accent-primary',
      'line-clamp-3',
      'color-scheme-dark',
      'appearance-none'
    ])
    expect(css).toContain('accent-color: hsl(var(--primary))')
    expect(css).toContain('-webkit-line-clamp: 3')
    expect(css).toContain('color-scheme: dark')
    expect(css).toContain('-webkit-appearance: none')
  })
})
