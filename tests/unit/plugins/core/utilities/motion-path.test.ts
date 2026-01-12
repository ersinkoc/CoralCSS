/**
 * Motion Path Utilities Plugin Tests
 *
 * Tests for CSS Motion Path utilities including offset-path, offset-distance,
 * offset-rotate, offset-anchor, and offset-position.
 * @module tests/unit/plugins/core/utilities/motion-path
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { motionPathPlugin } from '../../../../../src/plugins/core/utilities/motion-path'

describe('Motion Path Utilities Plugin', () => {
  it('should generate offset-path-none', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-path-none'])
    expect(css).toContain('offset-path: none')
  })

  it('should generate offset-path-circle', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-path-circle'])
    expect(css).toContain('offset-path: circle(50% at 50% 50%)')
  })

  it('should generate offset-path-ellipse', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-path-ellipse'])
    expect(css).toContain('offset-path: ellipse(40% 30% at 50% 50%)')
  })

  it('should generate offset-path-polygon', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-path-polygon'])
    expect(css).toContain('offset-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)')
  })

  it('should generate offset-ray utilities', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-ray-top', 'offset-ray-right', 'offset-ray-bottom'])
    expect(css).toContain('ray(0deg closest-side)')
    expect(css).toContain('ray(90deg closest-side)')
    expect(css).toContain('ray(180deg closest-side)')
  })

  it('should generate arbitrary offset-path', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-path-[path("M10,10_L90,90")]'])
    expect(css).toContain('offset-path: path("M10,10 L90,90")')
  })

  it('should generate offset-distance values', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-distance-0', 'offset-distance-50', 'offset-distance-full'])
    expect(css).toContain('offset-distance: 0')
    expect(css).toContain('offset-distance: 50%')
    expect(css).toContain('offset-distance: 100%')
  })

  it('should generate arbitrary offset-distance', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-distance-[75%]'])
    expect(css).toContain('offset-distance: 75%')
  })

  it('should generate offset-rotate values', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-rotate-auto', 'offset-rotate-reverse', 'offset-rotate-90deg'])
    expect(css).toContain('offset-rotate: auto')
    expect(css).toContain('offset-rotate: reverse')
    expect(css).toContain('offset-rotate: 90deg')
  })

  it('should generate arbitrary offset-rotate', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-rotate-[45deg]'])
    expect(css).toContain('offset-rotate: 45deg')
  })

  it('should generate offset-anchor values', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-anchor-auto', 'offset-anchor-center', 'offset-anchor-none'])
    expect(css).toContain('offset-anchor: auto')
    expect(css).toContain('offset-anchor: center')
    expect(css).toContain('offset-anchor: none')
  })

  it('should generate offset-anchor with top-left', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-anchor-top-left'])
    expect(css).toContain('offset-anchor: top left')
  })

  it('should generate offset-position values', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-position-auto', 'offset-position-center'])
    expect(css).toContain('offset-position: auto')
    expect(css).toContain('offset-position: center')
  })

  it('should generate arbitrary offset-position', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['offset-position-[50%_50%]'])
    expect(css).toContain('offset-position: 50% 50%')
  })

  it('should support motion-path alias', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['motion-path-[path("M0,0_L100,100")]'])
    expect(css).toContain('offset-path: path("M0,0 L100,100")')
  })

  it('should support motion-distance alias', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['motion-distance-[25%]'])
    expect(css).toContain('offset-distance: 25%')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate(['hover:offset-path-circle', 'dark:offset-distance-full'])
    expect(css).toContain('.hover\\:offset-path-circle')
    expect(css).toContain('.dark\\:offset-distance-full')
  })

  it('should generate multiple motion path utilities together', () => {
    const coral = createCoral({
      plugins: [motionPathPlugin()]
    })

    const css = coral.generate([
      'offset-path-circle',
      'offset-distance-50',
      'offset-rotate-auto',
      'offset-anchor-center'
    ])
    expect(css).toContain('offset-path')
    expect(css).toContain('offset-distance')
    expect(css).toContain('offset-rotate')
    expect(css).toContain('offset-anchor')
  })
})
