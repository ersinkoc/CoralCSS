/**
 * Tests for Advanced Effects Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { advancedEffectsPlugin } from '../../../../../src/plugins/core/utilities/advanced-effects'

describe('Advanced Effects Plugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(advancedEffectsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = advancedEffectsPlugin()
      expect(plugin.name).toBe('advanced-effects')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Fluid Typography', () => {
    it('should generate text-fluid-xs', () => {
      const css = coral.generate(['text-fluid-xs'])
      expect(css).toContain('font-size')
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-sm', () => {
      const css = coral.generate(['text-fluid-sm'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-base', () => {
      const css = coral.generate(['text-fluid-base'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-lg', () => {
      const css = coral.generate(['text-fluid-lg'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-xl', () => {
      const css = coral.generate(['text-fluid-xl'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-2xl', () => {
      const css = coral.generate(['text-fluid-2xl'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-3xl', () => {
      const css = coral.generate(['text-fluid-3xl'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-hero', () => {
      const css = coral.generate(['text-fluid-hero'])
      expect(css).toContain('clamp(')
    })

    it('should generate text-fluid-display', () => {
      const css = coral.generate(['text-fluid-display'])
      expect(css).toContain('clamp(')
    })

    it('should generate arbitrary text-fluid-[1rem_2rem]', () => {
      const css = coral.generate(['text-fluid-[1rem_2rem]'])
      expect(css).toContain('clamp(1rem, 5vw, 2rem)')
    })

    it('should generate arbitrary text-fluid-[1rem_3vw_2rem]', () => {
      const css = coral.generate(['text-fluid-[1rem_3vw_2rem]'])
      expect(css).toContain('clamp(1rem, 3vw, 2rem)')
    })

    it('should return null for empty text-fluid-[]', () => {
      const css = coral.generate(['text-fluid-[]'])
      expect(css).toBe('')
    })
  })

  describe('Fluid Spacing', () => {
    it('should generate p-fluid-xs', () => {
      const css = coral.generate(['p-fluid-xs'])
      expect(css).toContain('padding')
      expect(css).toContain('clamp(')
    })

    it('should generate p-fluid-sm', () => {
      const css = coral.generate(['p-fluid-sm'])
      expect(css).toContain('padding')
    })

    it('should generate p-fluid-lg', () => {
      const css = coral.generate(['p-fluid-lg'])
      expect(css).toContain('padding')
    })

    it('should generate m-fluid-base', () => {
      const css = coral.generate(['m-fluid-base'])
      expect(css).toContain('margin')
    })

    it('should generate gap-fluid-md', () => {
      const css = coral.generate(['gap-fluid-md'])
      expect(css).toContain('gap')
    })

    it('should generate px-fluid-xl', () => {
      const css = coral.generate(['px-fluid-xl'])
      expect(css).toContain('padding-left')
      expect(css).toContain('padding-right')
    })

    it('should generate py-fluid-2xl', () => {
      const css = coral.generate(['py-fluid-2xl'])
      expect(css).toContain('padding-top')
      expect(css).toContain('padding-bottom')
    })

    it('should generate mx-fluid-xs', () => {
      const css = coral.generate(['mx-fluid-xs'])
      expect(css).toContain('margin-left')
      expect(css).toContain('margin-right')
    })

    it('should generate my-fluid-3xl', () => {
      const css = coral.generate(['my-fluid-3xl'])
      expect(css).toContain('margin-top')
      expect(css).toContain('margin-bottom')
    })
  })

  describe('Gradient Text', () => {
    it('should generate text-gradient-primary', () => {
      const css = coral.generate(['text-gradient-primary'])
      expect(css).toContain('background-image')
      expect(css).toContain('-webkit-background-clip')
      expect(css).toContain('background-clip')
      expect(css).toContain('color: transparent')
      expect(css).toContain('-webkit-text-fill-color')
    })

    it('should generate text-gradient-secondary', () => {
      const css = coral.generate(['text-gradient-secondary'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate text-gradient-rainbow', () => {
      const css = coral.generate(['text-gradient-rainbow'])
      expect(css).toContain('linear-gradient(90deg')
      expect(css).toContain('#ff0000')
    })

    it('should generate text-gradient-sunset', () => {
      const css = coral.generate(['text-gradient-sunset'])
      expect(css).toContain('linear-gradient(135deg')
    })

    it('should generate text-gradient-ocean', () => {
      const css = coral.generate(['text-gradient-ocean'])
      expect(css).toContain('linear-gradient')
    })

    it('should generate text-gradient-neon', () => {
      const css = coral.generate(['text-gradient-neon'])
      expect(css).toContain('linear-gradient(90deg')
    })

    it('should generate arbitrary text-gradient-[red_blue]', () => {
      const css = coral.generate(['text-gradient-[red_blue]'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient(135deg, red blue)')
    })

    it('should return null for empty text-gradient-[]', () => {
      const css = coral.generate(['text-gradient-[]'])
      expect(css).toBe('')
    })

    it('should replace underscores in arbitrary gradient text', () => {
      const css = coral.generate(['text-gradient-[red,_blue,_green]'])
      expect(css).toContain('linear-gradient(135deg, red, blue, green)')
    })

    it('should generate text-gradient-animate', () => {
      const css = coral.generate(['text-gradient-animate'])
      expect(css).toContain('background-size')
      expect(css).toContain('animation')
    })
  })

  describe('Text Stroke', () => {
    it('should generate text-stroke-1', () => {
      const css = coral.generate(['text-stroke-1'])
      expect(css).toContain('-webkit-text-stroke-width')
      expect(css).toContain('1px')
    })

    it('should generate text-stroke-2', () => {
      const css = coral.generate(['text-stroke-2'])
      expect(css).toContain('2px')
    })

    it('should generate text-stroke-4', () => {
      const css = coral.generate(['text-stroke-4'])
      expect(css).toContain('4px')
    })

    it('should generate text-stroke-8', () => {
      const css = coral.generate(['text-stroke-8'])
      expect(css).toContain('8px')
    })

    it('should generate text-stroke-white', () => {
      const css = coral.generate(['text-stroke-white'])
      expect(css).toContain('-webkit-text-stroke-color')
      expect(css).toContain('#ffffff')
    })

    it('should generate text-stroke-black', () => {
      const css = coral.generate(['text-stroke-black'])
      expect(css).toContain('-webkit-text-stroke-color')
      expect(css).toContain('#000000')
    })

    it('should generate text-stroke-primary', () => {
      const css = coral.generate(['text-stroke-primary'])
      expect(css).toContain('--coral-primary')
    })

    it('should generate combined text-stroke-2-red', () => {
      const css = coral.generate(['text-stroke-2-red'])
      expect(css).toContain('-webkit-text-stroke')
      expect(css).toContain('2px')
      expect(css).toContain('red')
    })

    it('should generate combined text-stroke-3-primary', () => {
      const css = coral.generate(['text-stroke-3-primary'])
      expect(css).toContain('3px')
    })

    it('should return null for invalid combined text-stroke', () => {
      const css = coral.generate(['text-stroke--'])
      expect(css).toBe('')
    })

    it('should generate arbitrary text-stroke-[2px_solid]', () => {
      const css = coral.generate(['text-stroke-[2px_solid]'])
      expect(css).toContain('-webkit-text-stroke')
      expect(css).toContain('2px solid')
    })

    it('should return null for empty text-stroke-[]', () => {
      const css = coral.generate(['text-stroke-[]'])
      expect(css).toBe('')
    })
  })

  describe('Advanced Text Effects', () => {
    it('should generate text-glow-sm', () => {
      const css = coral.generate(['text-glow-sm'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('0 0 4px')
    })

    it('should generate text-glow', () => {
      const css = coral.generate(['text-glow'])
      expect(css).toContain('0 0 8px')
    })

    it('should generate text-glow-md', () => {
      const css = coral.generate(['text-glow-md'])
      expect(css).toContain('0 0 12px')
    })

    it('should generate text-glow-lg', () => {
      const css = coral.generate(['text-glow-lg'])
      expect(css).toContain('0 0 16px')
      expect(css).toContain('0 0 24px')
    })

    it('should generate text-glow-xl', () => {
      const css = coral.generate(['text-glow-xl'])
      expect(css).toContain('0 0 20px')
      expect(css).toContain('0 0 40px')
      expect(css).toContain('0 0 60px')
    })

    it('should generate text-neon-blue', () => {
      const css = coral.generate(['text-neon-blue'])
      expect(css).toContain('color')
      expect(css).toContain('#00d4ff')
      expect(css).toContain('text-shadow')
    })

    it('should generate text-neon-pink', () => {
      const css = coral.generate(['text-neon-pink'])
      expect(css).toContain('#ff00ff')
    })

    it('should generate text-neon-green', () => {
      const css = coral.generate(['text-neon-green'])
      expect(css).toContain('#00ff00')
    })

    it('should generate text-neon-red', () => {
      const css = coral.generate(['text-neon-red'])
      expect(css).toContain('#ff0040')
    })

    it('should generate text-neon-white', () => {
      const css = coral.generate(['text-neon-white'])
      expect(css).toContain('#ffffff')
    })

    it('should generate text-3d', () => {
      const css = coral.generate(['text-3d'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('5px 5px')
    })

    it('should generate text-3d-sm', () => {
      const css = coral.generate(['text-3d-sm'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('2px 2px')
    })

    it('should generate text-3d-lg', () => {
      const css = coral.generate(['text-3d-lg'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('7px 7px')
    })

    it('should generate text-emboss', () => {
      const css = coral.generate(['text-emboss'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('rgba(255,255,255,0.5)')
      expect(css).toContain('rgba(0,0,0,0.1)')
    })

    it('should generate text-engrave', () => {
      const css = coral.generate(['text-engrave'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('rgba(255,255,255,0.2)')
      expect(css).toContain('rgba(0,0,0,0.25)')
    })

    it('should generate text-outline', () => {
      const css = coral.generate(['text-outline'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('-1px -1px 0 currentColor')
    })

    it('should generate text-outline-2', () => {
      const css = coral.generate(['text-outline-2'])
      expect(css).toContain('text-shadow')
      expect(css).toContain('-2px -2px')
    })

    it('should generate text-mask-fade-b', () => {
      const css = coral.generate(['text-mask-fade-b'])
      expect(css).toContain('-webkit-mask-image')
      expect(css).toContain('linear-gradient(to bottom')
    })

    it('should generate text-mask-fade-t', () => {
      const css = coral.generate(['text-mask-fade-t'])
      expect(css).toContain('linear-gradient(to top')
    })

    it('should generate text-mask-fade-r', () => {
      const css = coral.generate(['text-mask-fade-r'])
      expect(css).toContain('linear-gradient(to right')
    })

    it('should generate text-mask-fade-l', () => {
      const css = coral.generate(['text-mask-fade-l'])
      expect(css).toContain('linear-gradient(to left')
    })
  })

  describe('Glassmorphism', () => {
    it('should generate glass', () => {
      const css = coral.generate(['glass'])
      expect(css).toContain('background')
      expect(css).toContain('backdrop-filter')
      expect(css).toContain('blur(10px)')
      expect(css).toContain('-webkit-backdrop-filter')
      expect(css).toContain('border')
    })

    it('should generate glass-sm', () => {
      const css = coral.generate(['glass-sm'])
      expect(css).toContain('blur(4px)')
    })

    it('should generate glass-lg', () => {
      const css = coral.generate(['glass-lg'])
      expect(css).toContain('blur(20px)')
    })

    it('should generate glass-xl', () => {
      const css = coral.generate(['glass-xl'])
      expect(css).toContain('blur(30px)')
    })

    it('should generate glass-dark', () => {
      const css = coral.generate(['glass-dark'])
      expect(css).toContain('rgba(0, 0, 0, 0.3)')
    })

    it('should generate glass-light', () => {
      const css = coral.generate(['glass-light'])
      expect(css).toContain('rgba(255, 255, 255, 0.7)')
    })

    it('should generate glass-frost', () => {
      const css = coral.generate(['glass-frost'])
      expect(css).toContain('saturate(180%)')
    })

    it('should generate glass-crystal', () => {
      const css = coral.generate(['glass-crystal'])
      expect(css).toContain('linear-gradient')
      expect(css).toContain('saturate(200%)')
      expect(css).toContain('box-shadow')
    })

    it('should generate glass-morphism', () => {
      const css = coral.generate(['glass-morphism'])
      expect(css).toContain('blur(40px)')
      expect(css).toContain('saturate(150%)')
    })

    it('should generate glass-noise', () => {
      const css = coral.generate(['glass-noise'])
      expect(css).toContain('position')
      expect(css).toContain('relative')
    })

    it('should generate glass-border-glow', () => {
      const css = coral.generate(['glass-border-glow'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('rgba(255, 255, 255, 0.3)')
    })

    it('should generate glass-primary', () => {
      const css = coral.generate(['glass-primary'])
      expect(css).toContain('rgba(255, 107, 107, 0.2)')
    })

    it('should generate glass-blue', () => {
      const css = coral.generate(['glass-blue'])
      expect(css).toContain('rgba(66, 133, 244, 0.2)')
    })

    it('should generate glass-purple', () => {
      const css = coral.generate(['glass-purple'])
      expect(css).toContain('rgba(156, 39, 176, 0.2)')
    })

    it('should generate glass-cyan', () => {
      const css = coral.generate(['glass-cyan'])
      expect(css).toContain('rgba(0, 188, 212, 0.2)')
    })
  })

  describe('Neumorphism', () => {
    it('should generate neu', () => {
      const css = coral.generate(['neu'])
      expect(css).toContain('background')
      expect(css).toContain('box-shadow')
      expect(css).toContain('5px 5px 10px')
      expect(css).toContain('-5px -5px 10px')
    })

    it('should generate neu-sm', () => {
      const css = coral.generate(['neu-sm'])
      expect(css).toContain('3px 3px 6px')
    })

    it('should generate neu-lg', () => {
      const css = coral.generate(['neu-lg'])
      expect(css).toContain('10px 10px 20px')
    })

    it('should generate neu-xl', () => {
      const css = coral.generate(['neu-xl'])
      expect(css).toContain('15px 15px 30px')
    })

    it('should generate neu-inset', () => {
      const css = coral.generate(['neu-inset'])
      expect(css).toContain('inset 5px 5px')
      expect(css).toContain('inset -5px -5px')
    })

    it('should generate neu-flat', () => {
      const css = coral.generate(['neu-flat'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('#f0f0f0')
    })

    it('should generate neu-concave', () => {
      const css = coral.generate(['neu-concave'])
      expect(css).toContain('linear-gradient')
      expect(css).toContain('#d9d9d9')
    })

    it('should generate neu-convex', () => {
      const css = coral.generate(['neu-convex'])
      expect(css).toContain('linear-gradient')
      expect(css).toContain('#ffffff')
    })

    it('should generate neu-pressed', () => {
      const css = coral.generate(['neu-pressed'])
      expect(css).toContain('inset 3px 3px')
    })

    it('should generate neu-dark', () => {
      const css = coral.generate(['neu-dark'])
      expect(css).toContain('linear-gradient')
      expect(css).toContain('#2d2d2d')
      expect(css).toContain('#363636')
    })

    it('should generate neu-dark-inset', () => {
      const css = coral.generate(['neu-dark-inset'])
      expect(css).toContain('inset')
      expect(css).toContain('#1a1a1a')
      expect(css).toContain('#404040')
    })

    it('should generate neu-primary', () => {
      const css = coral.generate(['neu-primary'])
      expect(css).toContain('#ff6b6b')
      expect(css).toContain('#ff8585')
      expect(css).toContain('#cc5555')
    })

    it('should generate neu-blue', () => {
      const css = coral.generate(['neu-blue'])
      expect(css).toContain('#4285f4')
    })

    it('should generate neu-green', () => {
      const css = coral.generate(['neu-green'])
      expect(css).toContain('#34a853')
    })

    it('should generate neu-purple', () => {
      const css = coral.generate(['neu-purple'])
      expect(css).toContain('#9c27b0')
    })

    it('should generate neu-gray', () => {
      const css = coral.generate(['neu-gray'])
      expect(css).toContain('#e0e0e0')
    })

    it('should generate neu-primary-inset', () => {
      const css = coral.generate(['neu-primary-inset'])
      expect(css).toContain('inset')
    })
  })

  describe('Animated Gradients', () => {
    it('should generate gradient-animate', () => {
      const css = coral.generate(['gradient-animate'])
      expect(css).toContain('background-size')
      expect(css).toContain('200% 200%')
      expect(css).toContain('animation')
      expect(css).toContain('gradient-shift 3s')
    })

    it('should generate gradient-animate-slow', () => {
      const css = coral.generate(['gradient-animate-slow'])
      expect(css).toContain('gradient-shift 6s')
    })

    it('should generate gradient-animate-fast', () => {
      const css = coral.generate(['gradient-animate-fast'])
      expect(css).toContain('gradient-shift 1.5s')
    })

    it('should generate gradient-shimmer', () => {
      const css = coral.generate(['gradient-shimmer'])
      expect(css).toContain('shimmer 2s')
    })

    it('should generate gradient-wave', () => {
      const css = coral.generate(['gradient-wave'])
      expect(css).toContain('300% 100%')
      expect(css).toContain('wave 3s')
    })

    it('should generate gradient-pulse', () => {
      const css = coral.generate(['gradient-pulse'])
      expect(css).toContain('gradient-pulse 2s')
    })

    it('should generate gradient-rotate', () => {
      const css = coral.generate(['gradient-rotate'])
      expect(css).toContain('gradient-rotate 4s')
    })

    it('should generate gradient-mesh', () => {
      const css = coral.generate(['gradient-mesh'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient')
    })
  })

  describe('Extended Aspect Ratios', () => {
    it('should generate aspect-golden', () => {
      const css = coral.generate(['aspect-golden'])
      expect(css).toContain('aspect-ratio')
      expect(css).toContain('1.618')
    })

    it('should generate aspect-silver', () => {
      const css = coral.generate(['aspect-silver'])
      expect(css).toContain('2.414')
    })

    it('should generate aspect-cinema', () => {
      const css = coral.generate(['aspect-cinema'])
      expect(css).toContain('2.35')
    })

    it('should generate aspect-ultra', () => {
      const css = coral.generate(['aspect-ultra'])
      expect(css).toContain('2.76')
    })

    it('should generate aspect-imax', () => {
      const css = coral.generate(['aspect-imax'])
      expect(css).toContain('1.43')
    })

    it('should generate aspect-photo', () => {
      const css = coral.generate(['aspect-photo'])
      expect(css).toContain('1.5')
    })

    it('should generate aspect-portrait', () => {
      const css = coral.generate(['aspect-portrait'])
      expect(css).toContain('0.8')
    })

    it('should generate aspect-story', () => {
      const css = coral.generate(['aspect-story'])
      expect(css).toContain('0.5625')
    })

    it('should generate aspect-a4', () => {
      const css = coral.generate(['aspect-a4'])
      expect(css).toContain('1.414')
    })

    it('should generate aspect-letter', () => {
      const css = coral.generate(['aspect-letter'])
      expect(css).toContain('1.294')
    })

    it('should generate aspect-legal', () => {
      const css = coral.generate(['aspect-legal'])
      expect(css).toContain('1.647')
    })

    it('should generate aspect-film-35mm', () => {
      const css = coral.generate(['aspect-film-35mm'])
      expect(css).toContain('1.375')
    })

    it('should generate aspect-tv', () => {
      const css = coral.generate(['aspect-tv'])
      expect(css).toContain('1.333')
    })

    it('should generate aspect-widescreen', () => {
      const css = coral.generate(['aspect-widescreen'])
      expect(css).toContain('1.778')
    })

    it('should generate aspect-superwide', () => {
      const css = coral.generate(['aspect-superwide'])
      expect(css).toContain('3.5')
    })
  })

  describe('Spring Animations', () => {
    it('should generate ease-spring', () => {
      const css = coral.generate(['ease-spring'])
      expect(css).toContain('transition-timing-function')
      expect(css).toContain('cubic-bezier(0.175, 0.885, 0.32, 1.275)')
    })

    it('should generate ease-spring-bounce', () => {
      const css = coral.generate(['ease-spring-bounce'])
      expect(css).toContain('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
    })

    it('should generate ease-spring-stiff', () => {
      const css = coral.generate(['ease-spring-stiff'])
      expect(css).toContain('cubic-bezier(0.5, 1.25, 0.75, 1.25)')
    })

    it('should generate ease-spring-soft', () => {
      const css = coral.generate(['ease-spring-soft'])
      expect(css).toContain('cubic-bezier(0.34, 1.56, 0.64, 1)')
    })

    it('should generate ease-spring-gentle', () => {
      const css = coral.generate(['ease-spring-gentle'])
      expect(css).toContain('cubic-bezier(0.23, 1, 0.32, 1)')
    })

    it('should generate animate-spring-in', () => {
      const css = coral.generate(['animate-spring-in'])
      expect(css).toContain('animation')
      expect(css).toContain('spring-in 0.6s')
    })

    it('should generate animate-spring-out', () => {
      const css = coral.generate(['animate-spring-out'])
      expect(css).toContain('spring-out 0.4s')
    })

    it('should generate animate-bounce-in', () => {
      const css = coral.generate(['animate-bounce-in'])
      expect(css).toContain('bounce-in 0.6s')
    })

    it('should generate animate-elastic', () => {
      const css = coral.generate(['animate-elastic'])
      expect(css).toContain('elastic 1s')
    })

    it('should generate animate-jello', () => {
      const css = coral.generate(['animate-jello'])
      expect(css).toContain('jello 1s')
    })

    it('should generate animate-rubber-band', () => {
      const css = coral.generate(['animate-rubber-band'])
      expect(css).toContain('rubber-band 1s')
    })
  })

  describe('Stagger Animations', () => {
    it('should generate stagger-50', () => {
      const css = coral.generate(['stagger-50'])
      expect(css).toContain('--stagger-delay')
      expect(css).toContain('50ms')
    })

    it('should generate stagger-100', () => {
      const css = coral.generate(['stagger-100'])
      expect(css).toContain('--stagger-delay')
      expect(css).toContain('100ms')
    })

    it('should generate stagger-200', () => {
      const css = coral.generate(['stagger-200'])
      expect(css).toContain('200ms')
    })

    it('should generate stagger-300', () => {
      const css = coral.generate(['stagger-300'])
      expect(css).toContain('300ms')
    })

    it('should generate stagger-500', () => {
      const css = coral.generate(['stagger-500'])
      expect(css).toContain('500ms')
    })

    it('should generate stagger-child-1', () => {
      const css = coral.generate(['stagger-child-1'])
      expect(css).toContain('animation-delay')
      expect(css).toContain('calc(var(--stagger-delay, 100ms) * 1)')
    })

    it('should generate stagger-child-5', () => {
      const css = coral.generate(['stagger-child-5'])
      expect(css).toContain('calc(var(--stagger-delay, 100ms) * 5)')
    })

    it('should generate stagger-child-10', () => {
      const css = coral.generate(['stagger-child-10'])
      expect(css).toContain('calc(var(--stagger-delay, 100ms) * 10)')
    })

    it('should generate stagger-child-20', () => {
      const css = coral.generate(['stagger-child-20'])
      expect(css).toContain('calc(var(--stagger-delay, 100ms) * 20)')
    })
  })

  describe('Skeleton Loading', () => {
    it('should generate skeleton', () => {
      const css = coral.generate(['skeleton'])
      expect(css).toContain('background')
      expect(css).toContain('linear-gradient')
      expect(css).toContain('animation')
      expect(css).toContain('skeleton-loading 1.5s')
    })

    it('should generate skeleton-dark', () => {
      const css = coral.generate(['skeleton-dark'])
      expect(css).toContain('#2a2a2a')
      expect(css).toContain('#3a3a3a')
    })

    it('should generate skeleton-pulse', () => {
      const css = coral.generate(['skeleton-pulse'])
      expect(css).toContain('skeleton-pulse 2s')
    })
  })

  describe('Glow Effects', () => {
    it('should generate glow-primary', () => {
      const css = coral.generate(['glow-primary'])
      expect(css).toContain('box-shadow')
      expect(css).toContain('--coral-primary')
    })

    it('should generate glow-blue', () => {
      const css = coral.generate(['glow-blue'])
      expect(css).toContain('#3b82f6')
    })

    it('should generate glow-green', () => {
      const css = coral.generate(['glow-green'])
      expect(css).toContain('#22c55e')
    })

    it('should generate glow-red', () => {
      const css = coral.generate(['glow-red'])
      expect(css).toContain('#ef4444')
    })

    it('should generate glow-purple', () => {
      const css = coral.generate(['glow-purple'])
      expect(css).toContain('#a855f7')
    })

    it('should generate glow-pink', () => {
      const css = coral.generate(['glow-pink'])
      expect(css).toContain('#ec4899')
    })

    it('should generate glow-orange', () => {
      const css = coral.generate(['glow-orange'])
      expect(css).toContain('#f97316')
    })

    it('should generate glow-yellow', () => {
      const css = coral.generate(['glow-yellow'])
      expect(css).toContain('#eab308')
    })

    it('should generate glow-cyan', () => {
      const css = coral.generate(['glow-cyan'])
      expect(css).toContain('#06b6d4')
    })

    it('should generate glow-white', () => {
      const css = coral.generate(['glow-white'])
      expect(css).toContain('#ffffff')
    })

    it('should generate glow-blue-sm', () => {
      const css = coral.generate(['glow-blue-sm'])
      expect(css).toContain('0 0 8px')
    })

    it('should generate glow-green-lg', () => {
      const css = coral.generate(['glow-green-lg'])
      expect(css).toContain('0 0 20px')
      expect(css).toContain('0 0 40px')
      expect(css).toContain('0 0 60px')
    })

    it('should generate glow-pulse', () => {
      const css = coral.generate(['glow-pulse'])
      expect(css).toContain('animation')
      expect(css).toContain('glow-pulse 2s')
    })
  })

  describe('Background Gradients', () => {
    it('should generate bg-gradient-primary', () => {
      const css = coral.generate(['bg-gradient-primary'])
      expect(css).toContain('background-image')
      expect(css).toContain('linear-gradient')
    })

    it('should generate bg-gradient-rainbow', () => {
      const css = coral.generate(['bg-gradient-rainbow'])
      expect(css).toContain('linear-gradient(90deg')
    })

    it('should generate bg-gradient-fire', () => {
      const css = coral.generate(['bg-gradient-fire'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('#f12711')
      expect(css).toContain('#f5af19')
    })

    it('should generate bg-gradient-gold', () => {
      const css = coral.generate(['bg-gradient-gold'])
      expect(css).toContain('#f7971e')
      expect(css).toContain('#ffd200')
    })

    it('should generate bg-gradient-holographic', () => {
      const css = coral.generate(['bg-gradient-holographic'])
      expect(css).toContain('linear-gradient')
    })
  })

  describe('Noise Texture', () => {
    it('should generate noise-subtle', () => {
      const css = coral.generate(['noise-subtle'])
      expect(css).toContain('background-image')
      expect(css).toContain('data:image/svg+xml')
      expect(css).toContain('opacity')
      expect(css).toContain('0.03')
    })

    it('should generate noise-visible', () => {
      const css = coral.generate(['noise-visible'])
      expect(css).toContain('opacity')
      expect(css).toContain('0.08')
    })
  })

  describe('Blur Backgrounds', () => {
    it('should generate bg-blur-xs', () => {
      const css = coral.generate(['bg-blur-xs'])
      expect(css).toContain('backdrop-filter')
      expect(css).toContain('blur(2px)')
      expect(css).toContain('-webkit-backdrop-filter')
    })

    it('should generate bg-blur-sm', () => {
      const css = coral.generate(['bg-blur-sm'])
      expect(css).toContain('blur(4px)')
    })

    it('should generate bg-blur', () => {
      const css = coral.generate(['bg-blur'])
      expect(css).toContain('blur(8px)')
    })

    it('should generate bg-blur-md', () => {
      const css = coral.generate(['bg-blur-md'])
      expect(css).toContain('blur(12px)')
    })

    it('should generate bg-blur-lg', () => {
      const css = coral.generate(['bg-blur-lg'])
      expect(css).toContain('blur(16px)')
    })

    it('should generate bg-blur-xl', () => {
      const css = coral.generate(['bg-blur-xl'])
      expect(css).toContain('blur(24px)')
    })

    it('should generate bg-blur-2xl', () => {
      const css = coral.generate(['bg-blur-2xl'])
      expect(css).toContain('blur(40px)')
    })

    it('should generate bg-blur-3xl', () => {
      const css = coral.generate(['bg-blur-3xl'])
      expect(css).toContain('blur(64px)')
    })

    it('should generate arbitrary bg-blur-[5px]', () => {
      const css = coral.generate(['bg-blur-[5px]'])
      expect(css).toContain('blur(5px)')
    })

    it('should return null for empty bg-blur-[]', () => {
      const css = coral.generate(['bg-blur-[]'])
      expect(css).toBe('')
    })
  })

  describe('Frosted Effects', () => {
    it('should generate bg-frosted', () => {
      const css = coral.generate(['bg-frosted'])
      expect(css).toContain('backdrop-filter')
      expect(css).toContain('blur(16px) saturate(180%)')
      expect(css).toContain('-webkit-backdrop-filter')
      expect(css).toContain('background')
      expect(css).toContain('rgba(255, 255, 255, 0.72)')
    })

    it('should generate bg-frosted-dark', () => {
      const css = coral.generate(['bg-frosted-dark'])
      expect(css).toContain('rgba(0, 0, 0, 0.72)')
    })
  })
})
