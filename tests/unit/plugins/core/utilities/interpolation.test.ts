/**
 * Interpolation Utilities Plugin Tests
 *
 * Tests for CSS interpolation utilities including color-mix(),
 * relative color syntax, and color manipulation shortcuts.
 * @module tests/unit/plugins/core/utilities/interpolation
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { interpolationPlugin } from '../../../../../src/plugins/core/utilities/interpolation'

describe('Interpolation Utilities Plugin', () => {
  it('should generate bg-mix with default srgb color space', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-mix-[red]-in-[blue]'])
    expect(css).toContain('background-color: color-mix(in srgb, red, blue)')
  })

  it('should generate text-mix with default srgb color space', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['text-mix-[white]-in-[black]'])
    expect(css).toContain('color: color-mix(in srgb, white, black)')
  })

  it('should generate bg-mix-oklab with specified color space', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-mix-oklab-[red]-in-[blue]'])
    expect(css).toContain('background-color: color-mix(in oklab, red, blue)')
  })

  it('should generate text-mix-oklch with specified color space', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['text-mix-oklch-[coral_500]-in-[slate_900]'])
    expect(css).toContain('color: color-mix(in oklch, coral 500, slate 900)')
  })

  it('should generate border-mix with default color space', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['border-mix-[red]-in-[transparent]'])
    expect(css).toContain('border-color: color-mix(in srgb, red, transparent)')
  })

  it('should generate bg-mix-white-50%', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-mix-white-50%'])
    expect(css).toContain('background-color: color-mix(in srgb, white 50%, currentColor)')
  })

  it('should generate bg-mix-black-20%', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-mix-black-20%'])
    expect(css).toContain('background-color: color-mix(in srgb, black 20%, currentColor)')
  })

  it('should generate text-mix-transparent-100%', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['text-mix-transparent-100%'])
    expect(css).toContain('color: color-mix(in srgb, transparent 100%, currentColor)')
  })

  it('should generate from-oklab relative color syntax', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['from-oklab-[10%_0_0]'])
    expect(css).toContain('color: oklab(from var(--color-base) 10% 0 0)')
  })

  it('should generate from-oklch relative color syntax', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['from-oklch-[0.5_0.1_180]'])
    expect(css).toContain('color: oklch(from var(--color-base) 0.5 0.1 180)')
  })

  it('should generate from-lch relative color syntax', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['from-lch-[50%_10_90deg]'])
    expect(css).toContain('color: lch(from var(--color-base) 50% 10 90deg)')
  })

  it('should generate from-hsl relative color syntax', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['from-hsl-[calc(h_+_10deg)_s_l]'])
    expect(css).toContain('color: hsl(from var(--color-base) calc(h + 10deg) s l)')
  })

  it('should generate lighten utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['lighten-[10]'])
    expect(css).toContain('color: oklab(from var(--color-base) calc(l + 10%) a b)')
  })

  it('should generate darken utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['darken-[20]'])
    expect(css).toContain('color: oklab(from var(--color-base) calc(l - 20%) a b)')
  })

  it('should generate saturate utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['saturate-[150]'])
    expect(css).toContain('color: oklch(from var(--color-base) l calc(c * 150 / 100) h)')
  })

  it('should generate desaturate utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['desaturate-[50]'])
    expect(css).toContain('color: oklch(from var(--color-base) l calc(c * 50 / 100) h)')
  })

  it('should generate bg-lighten utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-lighten-[15]'])
    expect(css).toContain('background-color: oklab(from var(--bg-color-base) calc(l + 15%) a b)')
  })

  it('should generate bg-darken utility', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['bg-darken-[25]'])
    expect(css).toContain('background-color: oklab(from var(--bg-color-base) calc(l - 25%) a b)')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate(['hover:bg-mix-white-50%', 'dark:lighten-[10]'])
    expect(css).toContain('.hover\\:bg-mix-white-50\\%')
    expect(css).toContain('.dark\\:lighten-\\[10\\]')
  })

  it('should generate multiple interpolation utilities together', () => {
    const coral = createCoral({
      plugins: [interpolationPlugin()]
    })

    const css = coral.generate([
      'bg-mix-[red]-in-[blue]',
      'text-mix-white-50%',
      'lighten-[10]'
    ])
    expect(css).toContain('background-color')
    expect(css).toContain('color')
  })
})
