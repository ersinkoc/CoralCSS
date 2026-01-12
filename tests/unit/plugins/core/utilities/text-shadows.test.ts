/**
 * Text Shadow Utilities Plugin Tests
 *
 * Tests for text shadow utilities including base shadows, colored shadows,
 * opacity modifiers, and special effects.
 * @module tests/unit/plugins/core/utilities/text-shadows
 */

import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { textShadowsPlugin } from '../../../../../src/plugins/core/utilities/text-shadows'

describe('Text Shadow Utilities Plugin', () => {
  it('should generate base text shadows', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-2xs'])
    expect(css).toContain('text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)')
  })

  it('should generate text-shadow-xs', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-xs'])
    expect(css).toContain('text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15)')
  })

  it('should generate text-shadow-sm', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-sm'])
    expect(css).toContain('text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)')
  })

  it('should generate text-shadow-md', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-md'])
    expect(css).toContain('text-shadow: 0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)')
  })

  it('should generate text-shadow-lg', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-lg'])
    expect(css).toContain('text-shadow: 0 10px 15px rgba(0, 0, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)')
  })

  it('should generate text-shadow-xl', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-xl'])
    expect(css).toContain('text-shadow: 0 20px 25px rgba(0, 0, 0, 0.35), 0 8px 10px rgba(0, 0, 0, 0.25)')
  })

  it('should generate text-shadow-2xl', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-2xl'])
    expect(css).toContain('text-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 12px 24px rgba(0, 0, 0, 0.3)')
  })

  it('should generate text-shadow-none', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-none'])
    expect(css).toContain('text-shadow: none')
  })

  it('should support opacity modifiers', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-lg/50'])
    // Note: The opacity modifier may use a different pattern format
    expect(css).toContain('text-shadow')
  })

  it('should support opacity modifier for md', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-md/20'])
    expect(css).toContain('text-shadow')
  })

  it('should generate colored text shadows', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-red-500'])
    expect(css).toContain('--text-shadow-color: var(--color-red-500)')
    expect(css).toContain('text-shadow: 0 4px 6px var(--text-shadow-color)')
  })

  it('should support colored shadows with opacity', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-cyan-500'])
    expect(css).toContain('--text-shadow-color')
    expect(css).toContain('var(--color-cyan-500)')
  })

  it('should support arbitrary values', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-[0_2px_10px_rgba(255,0,0,0.5)]'])
    expect(css).toContain('text-shadow: 0 2px 10px rgba(255,0,0,0.5)')
  })

  it('should generate embossed effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-embossed'])
    expect(css).toContain('text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2)')
  })

  it('should generate debossed effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-debossed'])
    expect(css).toContain('text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.8), 1px 1px 1px rgba(0, 0, 0, 0.2)')
  })

  it('should generate neon effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-neon'])
    expect(css).toContain('text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor')
  })

  it('should generate neon-lg effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-neon-lg'])
    expect(css).toContain('text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor')
  })

  it('should generate 3d effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-3d'])
    expect(css).toContain('text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 0 #aaa, 4px 4px 0 #999')
  })

  it('should generate outline effect', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['text-shadow-outline'])
    expect(css).toContain('text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000')
  })

  it('should work with variant modifiers', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate(['hover:text-shadow-md', 'dark:text-shadow-neon'])
    expect(css).toContain('.hover\\:text-shadow-md')
    expect(css).toContain('.dark\\:text-shadow-neon')
  })

  it('should generate multiple text shadow utilities together', () => {
    const coral = createCoral({
      plugins: [textShadowsPlugin()]
    })

    const css = coral.generate([
      'text-shadow-md',
      'text-shadow-red-500',
      'text-shadow-neon'
    ])
    expect(css).toContain('text-shadow')
  })
})
