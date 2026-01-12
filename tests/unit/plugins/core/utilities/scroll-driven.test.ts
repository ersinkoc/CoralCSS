/**
 * Scroll-Driven Animations Utilities Plugin Tests
 *
 * Tests for CSS Scroll-Driven Animations utilities including animation-timeline,
 * animation-range, view-timeline, and scroll-timeline.
 * @module tests/unit/plugins/core/utilities/scroll-driven
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { scrollDrivenAnimationsPlugin } from '../../../../../src/plugins/core/utilities/scroll-driven'

describe('Scroll-Driven Animations Utilities Plugin', () => {
  it('should generate animation-timeline-scroll', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-timeline-scroll'])
    expect(css).toContain('animation-timeline: scroll()')
  })

  it('should generate animation-timeline-scroll-root', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-timeline-scroll-root'])
    expect(css).toContain('animation-timeline: scroll(root)')
  })

  it('should generate animation-timeline-view', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-timeline-view'])
    expect(css).toContain('animation-timeline: view()')
  })

  it('should generate animation-timeline-view-block', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-timeline-view-block'])
    expect(css).toContain('animation-timeline: view(block)')
  })

  it('should generate arbitrary animation-timeline', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-timeline-[scroll(root_block)]'])
    expect(css).toContain('animation-timeline: scroll(root block)')
  })

  it('should generate animation-range-entry', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-entry'])
    expect(css).toContain('animation-range: entry')
  })

  it('should generate animation-range-exit', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-exit'])
    expect(css).toContain('animation-range: exit')
  })

  it('should generate animation-range-cover', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-cover'])
    expect(css).toContain('animation-range: cover')
  })

  it('should generate animation-range-contain', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-contain'])
    expect(css).toContain('animation-range: contain')
  })

  it('should generate animation-range with percentages', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-0%', 'animation-range-50%', 'animation-range-100%'])
    expect(css).toContain('animation-range: 0%')
    expect(css).toContain('animation-range: 50%')
    expect(css).toContain('animation-range: 100%')
  })

  it('should generate animation-range-entry-0%', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-entry-0%'])
    expect(css).toContain('animation-range: entry 0%')
  })

  it('should generate animation-range-exit-100%', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-exit-100%'])
    expect(css).toContain('animation-range: exit 100%')
  })

  it('should generate arbitrary animation-range', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['animation-range-[entry_0%_exit_100%]'])
    expect(css).toContain('animation-range: entry 0% exit 100%')
  })

  it('should generate view-timeline-axis', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['view-timeline-block', 'view-timeline-y'])
    expect(css).toContain('view-timeline-axis: block')
    expect(css).toContain('view-timeline-axis: y')
  })

  it('should generate view-timeline-inset', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['view-timeline-inset-auto'])
    expect(css).toContain('view-timeline-inset: auto')
  })

  it('should generate arbitrary view-timeline-name', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['view-timeline-name-[my-timeline]'])
    expect(css).toContain("view-timeline-name: my-timeline")
  })

  it('should generate scroll-timeline-axis', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['scroll-timeline-x'])
    expect(css).toContain('scroll-timeline-axis: x')
  })

  it('should generate arbitrary scroll-timeline-name', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['scroll-timeline-name-[my-scroll]'])
    expect(css).toContain("scroll-timeline-name: my-scroll")
  })

  it('should generate timeline-scope-root', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['timeline-scope-root'])
    expect(css).toContain('timeline-scope: root')
  })

  it('should generate scroll-fade-in convenience class', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['scroll-fade-in'])
    expect(css).toContain('animation-timeline: view()')
    expect(css).toContain('animation-range: entry 0% entry 50%')
    expect(css).toContain('animation-name: scroll-fade-in')
  })

  it('should generate scroll-parallax convenience class', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['scroll-parallax'])
    expect(css).toContain('animation-timeline: scroll(root)')
    expect(css).toContain('animation-name: scroll-parallax')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate(['hover:animation-timeline-scroll', 'dark:scroll-fade-in'])
    expect(css).toContain('.hover\\:animation-timeline-scroll')
    expect(css).toContain('.dark\\:scroll-fade-in')
  })

  it('should generate multiple scroll-driven utilities together', () => {
    const coral = createCoral({
      plugins: [scrollDrivenAnimationsPlugin()]
    })

    const css = coral.generate([
      'animation-timeline-view',
      'animation-range-entry',
      'view-timeline-block'
    ])
    expect(css).toContain('animation-timeline')
    expect(css).toContain('animation-range')
    expect(css).toContain('view-timeline')
  })
})
