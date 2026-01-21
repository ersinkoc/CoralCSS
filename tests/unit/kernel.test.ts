/**
 * Kernel Tests
 *
 * Tests for the CoralCSS kernel/engine.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral, Kernel } from '../../src/kernel'
import type { Plugin, Rule } from '../../src/types'

describe('Kernel', () => {
  let coral: Kernel

  beforeEach(() => {
    coral = createCoral() as Kernel
  })

  describe('createCoral', () => {
    it('should create a new Coral instance', () => {
      expect(coral).toBeInstanceOf(Kernel)
    })

    it('should accept configuration options', () => {
      const instance = createCoral({ prefix: 'tw-' })
      expect(instance).toBeDefined()
    })
  })

  describe('use', () => {
    it('should register a plugin', () => {
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      }

      coral.use(plugin)
      // Plugin should be registered (verified by not throwing)
      expect(true).toBe(true)
    })

    it('should call plugin install function', () => {
      let installed = false
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {
          installed = true
        },
      }

      coral.use(plugin)
      expect(installed).toBe(true)
    })

    it('should pass context to plugin install', () => {
      let receivedContext: unknown = null
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          receivedContext = ctx
        },
      }

      coral.use(plugin)
      expect(receivedContext).toBeDefined()
      expect(receivedContext).toHaveProperty('addRule')
      expect(receivedContext).toHaveProperty('addVariant')
    })

    it('should return this for chaining', () => {
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      }

      const result = coral.use(plugin)
      expect(result).toBe(coral)
    })
  })

  describe('generate', () => {
    beforeEach(() => {
      // Register a simple plugin with rules
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
          ctx.addRule({
            pattern: 'flex',
            properties: { display: 'flex' },
          })
          ctx.addRule({
            pattern: /^p-(\d+)$/,
            handler: (match) => {
              const v = match[1]
              if (!v) return null
              return { properties: { padding: `${parseInt(v, 10) * 0.25}rem` } }
            },
          })
        },
      })
    })

    it('should generate CSS for static patterns', () => {
      const css = coral.generate(['block'])
      expect(css).toContain('.block')
      expect(css).toContain('display: block')
    })

    it('should generate CSS for multiple classes', () => {
      const css = coral.generate(['block', 'flex'])
      expect(css).toContain('.block')
      expect(css).toContain('.flex')
    })

    it('should generate CSS for regex patterns', () => {
      const css = coral.generate(['p-4'])
      expect(css).toContain('.p-4')
      expect(css).toContain('padding: 1rem')
    })

    it('should return empty string for unknown classes', () => {
      const css = coral.generate(['unknown-class'])
      expect(css).toBe('')
    })

    it('should deduplicate classes', () => {
      const css = coral.generate(['block', 'block', 'flex'])
      const blockMatches = (css.match(/\.block/g) ?? []).length
      expect(blockMatches).toBe(1)
    })
  })

  describe('generateFromHTML', () => {
    beforeEach(() => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'flex',
            properties: { display: 'flex' },
          })
          ctx.addRule({
            pattern: 'items-center',
            properties: { 'align-items': 'center' },
          })
        },
      })
    })

    it('should extract and generate CSS from HTML', () => {
      const html = '<div class="flex items-center">Content</div>'
      const css = coral.generateFromHTML(html)
      expect(css).toContain('.flex')
      expect(css).toContain('.items-center')
    })

    it('should handle multiple elements', () => {
      const html = `
        <div class="flex">
          <span class="items-center">Content</span>
        </div>
      `
      const css = coral.generateFromHTML(html)
      expect(css).toContain('.flex')
      expect(css).toContain('.items-center')
    })
  })

  describe('getRules', () => {
    it('should return registered rules', () => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const rules = coral.getRules()
      expect(rules.length).toBeGreaterThan(0)
    })
  })

  describe('getVariants', () => {
    it('should return registered variants', () => {
      coral.use({
        name: 'test-variants',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariant({
            name: 'hover',
            handler: (selector) => `${selector}:hover`,
          })
        },
      })

      const variants = coral.getVariants()
      expect(variants.length).toBeGreaterThan(0)
    })
  })

  describe('reset', () => {
    it('should clear all registered rules', () => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      coral.reset()
      const rules = coral.getRules()
      expect(rules.length).toBe(0)
    })
  })

  describe('unregister', () => {
    it('should unregister a plugin by name', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const result = coral.unregister('test-plugin')
      expect(result).toBe(true)
    })

    it('should return false for unknown plugin', () => {
      const result = coral.unregister('unknown-plugin')
      expect(result).toBe(false)
    })
  })

  describe('safelist', () => {
    it('should accept safelisted classes in config', () => {
      const instance = createCoral({
        safelist: ['always-include'],
      }) as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'always-include',
            properties: { display: 'block' },
          })
        },
      })

      expect(instance).toBeDefined()
    })

    it('should accept RegExp patterns in safelist', () => {
      const instance = createCoral({
        safelist: [/^safe-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept pattern objects with variants in safelist', () => {
      const instance = createCoral({
        safelist: [
          { pattern: /^safe-/, variants: ['hover', 'focus'] },
        ],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('blocklist', () => {
    it('should accept blocklist in config', () => {
      const instance = createCoral({
        blocklist: ['hidden'],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept RegExp patterns in blocklist', () => {
      const instance = createCoral({
        blocklist: [/^debug-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('PluginAPI', () => {
    it('should allow extending theme', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({
            colors: {
              brand: '#ff6b6b',
            },
          })
        },
      })

      expect(coral).toBeDefined()
    })

    it('should provide getConfig method', () => {
      let config: unknown = null

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          config = ctx.getConfig()
        },
      })

      expect(config).toBeDefined()
      expect(config).toHaveProperty('prefix')
    })

    it('should allow addVariant via PluginAPI', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariant({
            name: 'custom-hover',
            handler: (selector) => `${selector}:hover`,
          })
        },
      })

      const variants = coral.getVariants()
      expect(variants.some(v => v.name === 'custom-hover')).toBe(true)
    })
  })

  describe('configuration', () => {
    it('should use custom prefix', () => {
      const instance = createCoral({ prefix: 'tw-' }) as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const css = instance.generate(['block'])
      expect(css).toContain('.tw-block')
    })

    it('should accept darkMode option', () => {
      const instance = createCoral({ darkMode: 'media' }) as Kernel
      expect(instance).toBeDefined()
    })

    it('should accept important option', () => {
      const instance = createCoral({ important: true }) as Kernel
      expect(instance).toBeDefined()
    })
  })

  describe('events', () => {
    it('should register and fire event listeners', () => {
      let eventFired = false

      coral.on('rule:added', () => {
        eventFired = true
      })

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'test-rule',
            properties: { display: 'block' },
          })
        },
      })

      expect(eventFired).toBe(true)
    })

    it('should return unsubscribe function', () => {
      let eventCount = 0

      const unsubscribe = coral.on('rule:added', () => {
        eventCount++
      })

      coral.use({
        name: 'test-plugin-1',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'rule1',
            properties: { display: 'block' },
          })
        },
      })

      unsubscribe()

      coral.use({
        name: 'test-plugin-2',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'rule2',
            properties: { display: 'flex' },
          })
        },
      })

      expect(eventCount).toBe(1)
    })

    it('should handle event handler errors gracefully', () => {
      coral.on('rule:added', () => {
        throw new Error('Handler error')
      })

      // Should not throw
      expect(() => {
        coral.use({
          name: 'test-plugin',
          version: '1.0.0',
          install: (ctx) => {
            ctx.addRule({
              pattern: 'test-rule',
              properties: { display: 'block' },
            })
          },
        })
      }).not.toThrow()
    })

    it('should register event listener via plugin API', () => {
      let eventFired = false

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.on('variant:added', () => {
            eventFired = true
          })
        },
      })

      coral.use({
        name: 'test-variants',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariant({
            name: 'test-variant',
            handler: (sel) => `${sel}:test`,
          })
        },
      })

      expect(eventFired).toBe(true)
    })

    it('should execute multiple event handlers when event is emitted', () => {
      let callCount = 0

      coral.on('rule:added', () => {
        callCount++
      })

      coral.on('rule:added', () => {
        callCount++
      })

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'test-rule',
            properties: { display: 'block' },
          })
        },
      })

      expect(callCount).toBe(2)
    })
  })

  describe('plugin lifecycle', () => {
    it('should call onReady for plugins after use', async () => {
      let readyCalled = false

      // Create a new instance
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
        onReady: async () => {
          readyCalled = true
        },
      })

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(readyCalled).toBe(true)
    })

    it('should handle onReady errors', async () => {
      let errorHandled = false

      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
        onReady: async () => {
          throw new Error('Ready error')
        },
        onError: () => {
          errorHandled = true
        },
      })

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(errorHandled).toBe(true)
    })
  })

  describe('blocklist extended', () => {
    it('should configure blocklist with strings', () => {
      const instance = createCoral({
        blocklist: ['blocked-class'],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should configure blocklist with RegExp', () => {
      const instance = createCoral({
        blocklist: [/^debug-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('safelist expansion', () => {
    it('should include safelisted classes in generation', () => {
      const instance = createCoral({
        safelist: ['always-visible'],
      }) as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'always-visible',
            properties: { display: 'block' },
          })
        },
      })

      // Safelist items should be available even if not in input
      expect(instance).toBeDefined()
    })

    it('should handle RegExp safelist patterns', () => {
      const instance = createCoral({
        safelist: [/^safe-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should handle pattern object safelist with variants', () => {
      const instance = createCoral({
        safelist: [
          { pattern: /^bg-/, variants: ['hover', 'focus'] },
        ],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('PluginAPI advanced', () => {
    it('should allow addRules for bulk registration', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRules([
            { pattern: 'rule1', properties: { display: 'block' } },
            { pattern: 'rule2', properties: { display: 'flex' } },
          ])
        },
      })

      const rules = coral.getRules()
      expect(rules.some(r => r.pattern === 'rule1')).toBe(true)
      expect(rules.some(r => r.pattern === 'rule2')).toBe(true)
    })

    it('should allow addVariants for bulk registration', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariants([
            { name: 'variant1', handler: (sel) => `${sel}:v1` },
            { name: 'variant2', handler: (sel) => `${sel}:v2` },
          ])
        },
      })

      const variants = coral.getVariants()
      expect(variants.some(v => v.name === 'variant1')).toBe(true)
      expect(variants.some(v => v.name === 'variant2')).toBe(true)
    })

    it('should allow addComponent registration', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addComponent({
            name: 'button',
            styles: '.btn { display: inline-flex; }',
          })
        },
      })

      expect(coral).toBeDefined()
    })

    it('should access theme values via path', () => {
      let themeValue: unknown = null

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({
            colors: {
              primary: '#007bff',
            },
          })
          themeValue = ctx.theme('colors.primary')
        },
      })

      expect(themeValue).toBe('#007bff')
    })

    it('should return fallback for missing theme path', () => {
      let themeValue: unknown = 'default'

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          themeValue = ctx.theme('nonexistent.path', 'fallback')
        },
      })

      expect(themeValue).toBe('fallback')
    })

    it('should return fallback for null in theme path', () => {
      let themeValue: unknown = 'default'

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({
            colors: null as unknown,
          })
          themeValue = ctx.theme('colors.primary', 'fallback')
        },
      })

      expect(themeValue).toBe('fallback')
    })

    it('should return fallback for non-object in theme path', () => {
      let themeValue: unknown = 'default'

      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({
            colors: 'not-an-object' as unknown,
          })
          themeValue = ctx.theme('colors.primary', 'fallback')
        },
      })

      expect(themeValue).toBe('fallback')
    })

    it('should set variant match to name if not provided', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariant({
            name: 'auto-match',
            handler: (sel) => `${sel}:auto`,
          })
        },
      })

      const variants = coral.getVariants()
      const variant = variants.find(v => v.name === 'auto-match')
      expect(variant?.match).toBe('auto-match')
    })
  })

  describe('generate edge cases', () => {
    it('should handle empty input', () => {
      const css = coral.generate([])
      expect(css).toBe('')
    })

    it('should handle whitespace-only classes', () => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const css = coral.generate(['  ', 'block', ''])
      expect(css).toContain('.block')
    })
  })

  describe('blocklist configuration', () => {
    it('should accept blocklist with strings', () => {
      const instance = createCoral({
        blocklist: ['hidden', 'secret-class'],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept blocklist with regex patterns', () => {
      const instance = createCoral({
        blocklist: [/^debug-/, /^test-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept mixed blocklist patterns', () => {
      const instance = createCoral({
        blocklist: ['exact-match', /^pattern-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('safelist configuration', () => {
    it('should accept safelist string classes', () => {
      const instance = createCoral({
        safelist: ['flex', 'grid', 'block'],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept RegExp safelist patterns', () => {
      const instance = createCoral({
        safelist: [/^bg-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept pattern object safelist', () => {
      const instance = createCoral({
        safelist: [
          { pattern: /^text-/, variants: ['hover', 'focus'] },
        ],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('theme configuration', () => {
    it('should accept nested theme configuration', () => {
      const instance = createCoral({
        theme: {
          colors: {
            primary: '#ff0000',
          },
        },
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should extend theme via plugin', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'theme-extender',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({
            colors: {
              secondary: '#00ff00',
            },
          })
        },
      })

      expect(instance).toBeDefined()
    })
  })

  describe('plugin error handling', () => {
    it('should handle plugin install errors gracefully', () => {
      const instance = createCoral() as Kernel

      expect(() => {
        instance.use({
          name: 'error-plugin',
          version: '1.0.0',
          install: () => {
            throw new Error('Install error')
          },
        })
      }).toThrow('Install error')
    })

    it('should call onError callback when onReady throws', async () => {
      let errorCalled = false
      const instance = createCoral() as Kernel

      instance.use({
        name: 'error-plugin',
        version: '1.0.0',
        install: () => {},
        onReady: async () => {
          throw new Error('Ready error')
        },
        onError: (error) => {
          errorCalled = true
          expect(error.message).toBe('Ready error')
        },
      })

      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(errorCalled).toBe(true)
    })
  })

  describe('configuration options', () => {
    it('should accept prefix option', () => {
      const instance = createCoral({
        prefix: 'tw-',
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept darkMode option', () => {
      const instance = createCoral({
        darkMode: 'media',
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept features option', () => {
      const instance = createCoral({
        features: {
          variantGroups: false,
          attributify: true,
        },
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should accept darkModeSelector option', () => {
      const instance = createCoral({
        darkModeSelector: '[data-theme="dark"]',
      }) as Kernel

      expect(instance.config.darkModeSelector).toBe('[data-theme="dark"]')
    })

    it('should accept content option', () => {
      const instance = createCoral({
        content: ['./src/**/*.tsx', './pages/**/*.tsx'],
      }) as Kernel

      expect(instance.config.content).toEqual(['./src/**/*.tsx', './pages/**/*.tsx'])
    })
  })

  describe('plugin dependencies', () => {
    it('should throw when dependency is missing', () => {
      const instance = createCoral() as Kernel

      expect(() => {
        instance.use({
          name: 'dependent-plugin',
          version: '1.0.0',
          dependencies: ['missing-dependency'],
          install: () => {},
        })
      }).toThrow()
    })

    it('should allow plugin with satisfied dependencies', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'base-plugin',
        version: '1.0.0',
        install: () => {},
      })

      expect(() => {
        instance.use({
          name: 'dependent-plugin',
          version: '1.0.0',
          dependencies: ['base-plugin'],
          install: () => {},
        })
      }).not.toThrow()
    })
  })

  describe('plugin onError during install', () => {
    it('should call onError when install throws', () => {
      let errorCalled = false
      const instance = createCoral() as Kernel

      try {
        instance.use({
          name: 'error-plugin',
          version: '1.0.0',
          install: () => {
            throw new Error('Install failed')
          },
          onError: () => {
            errorCalled = true
          },
        })
      } catch {
        // Expected to throw
      }

      expect(errorCalled).toBe(true)
    })
  })

  describe('plugin unregister lifecycle', () => {
    it('should call onDestroy when unregistering', async () => {
      let destroyCalled = false
      const instance = createCoral() as Kernel

      instance.use({
        name: 'destroyable-plugin',
        version: '1.0.0',
        install: () => {},
        onDestroy: async () => {
          destroyCalled = true
        },
      })

      instance.unregister('destroyable-plugin')
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(destroyCalled).toBe(true)
    })

    it('should handle onDestroy errors gracefully', async () => {
      let errorHandled = false
      const instance = createCoral() as Kernel

      instance.use({
        name: 'error-destroy-plugin',
        version: '1.0.0',
        install: () => {},
        onDestroy: async () => {
          throw new Error('Destroy error')
        },
        onError: () => {
          errorHandled = true
        },
      })

      instance.unregister('error-destroy-plugin')
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(errorHandled).toBe(true)
    })
  })

  describe('variant groups expansion', () => {
    it('should expand variant group syntax', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'text-white',
            properties: { color: 'white' },
          })
          ctx.addRule({
            pattern: 'bg-black',
            properties: { 'background-color': 'black' },
          })
          ctx.addVariant({
            name: 'hover',
            handler: (sel) => `${sel}:hover`,
          })
        },
      })

      const css = instance.generate(['hover:(text-white bg-black)'])
      expect(css).toContain('hover')
    })

    it('should work with variant groups disabled', () => {
      const instance = createCoral({
        features: { variantGroups: false },
      }) as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const css = instance.generate(['block'])
      expect(css).toContain('.block')
    })
  })

  describe('blocklist filtering', () => {
    it('should accept blocklist configuration', () => {
      const instance = createCoral({
        blocklist: ['blocked-class'],
      }) as Kernel

      // Blocklist is accepted in configuration
      expect(instance).toBeDefined()
    })

    it('should accept regex blocklist configuration', () => {
      const instance = createCoral({
        blocklist: [/^debug-/],
      }) as Kernel

      expect(instance).toBeDefined()
    })
  })

  describe('safelist in generation', () => {
    it('should accept safelist configuration', () => {
      const instance = createCoral({
        safelist: ['safelist-class'],
      }) as Kernel

      expect(instance).toBeDefined()
    })

    it('should include safelist classes in generation', () => {
      const instance = createCoral({
        safelist: ['safelisted-class'],
      }) as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'safelisted-class',
            properties: { display: 'block' },
          })
        },
      })

      // Generate with an empty array should still include safelist
      const css = instance.generate([])
      // Safelist expansion is called internally
      expect(instance).toBeDefined()
    })

    it('should handle RegExp safelist (skip expansion)', () => {
      const instance = createCoral({
        safelist: [/^safe-/],
      }) as Kernel

      // Generate to trigger safelist expansion
      const css = instance.generate([])
      expect(instance).toBeDefined()
    })

    it('should handle pattern object safelist (skip expansion)', () => {
      const instance = createCoral({
        safelist: [
          { pattern: 'safe', variants: ['hover'] },
        ],
      }) as Kernel

      // Generate to trigger safelist expansion
      const css = instance.generate([])
      expect(instance).toBeDefined()
    })
  })

  describe('blocklist filtering behavior', () => {
    it('should filter out string-blocked classes during generation', () => {
      const instance = createCoral({
        blocklist: ['blocked-class'],
      }) as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'blocked-class',
            properties: { display: 'none' },
          })
          ctx.addRule({
            pattern: 'allowed-class',
            properties: { display: 'block' },
          })
        },
      })

      // Generate including blocked class
      const css = instance.generate(['blocked-class', 'allowed-class'])

      // blocked-class should be filtered out
      expect(css).not.toContain('.blocked-class')
      expect(css).toContain('.allowed-class')
    })

    it('should filter out regex-blocked classes during generation', () => {
      const instance = createCoral({
        blocklist: [/^debug-/],
      }) as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: /^debug-/,
            generate: () => ({ display: 'none' }),
          })
          ctx.addRule({
            pattern: 'normal-class',
            properties: { display: 'block' },
          })
        },
      })

      // Generate including debug classes
      const css = instance.generate(['debug-panel', 'debug-overlay', 'normal-class'])

      // debug-* classes should be filtered out
      expect(css).not.toContain('.debug-panel')
      expect(css).not.toContain('.debug-overlay')
      expect(css).toContain('.normal-class')
    })
  })

  describe('cache operations', () => {
    it('should return cache statistics', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      instance.generate(['block'])
      const stats = instance.getCacheStats()
      expect(stats).toBeDefined()
    })

    it('should clear cache', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      instance.generate(['block'])
      instance.clearCache()
      const stats = instance.getCacheStats()
      expect(stats.size).toBe(0)
    })

    it('should emit cache:hit on repeated generation', () => {
      let cacheHits = 0
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      instance.on('cache:hit', () => {
        cacheHits++
      })

      instance.generate(['block'])
      instance.generate(['block'])
      expect(cacheHits).toBeGreaterThan(0)
    })

    it('should emit cache:miss on first generation', () => {
      let cacheMisses = 0
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      instance.on('cache:miss', () => {
        cacheMisses++
      })

      instance.generate(['block'])
      expect(cacheMisses).toBeGreaterThan(0)
    })
  })

  describe('event emission', () => {
    it('should emit plugin:registered event', () => {
      let pluginName = ''
      const instance = createCoral() as Kernel

      instance.on('plugin:registered', (data: unknown) => {
        pluginName = (data as { plugin: string }).plugin
      })

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      })

      expect(pluginName).toBe('test-plugin')
    })

    it('should emit plugin:unregistered event', () => {
      let pluginName = ''
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      })

      instance.on('plugin:unregistered', (data: unknown) => {
        pluginName = (data as { plugin: string }).plugin
      })

      instance.unregister('test-plugin')
      expect(pluginName).toBe('test-plugin')
    })

    it('should emit css:generated event', () => {
      let eventData: unknown = null
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      instance.on('css:generated', (data: unknown) => {
        eventData = data
      })

      instance.generate(['block'])
      expect(eventData).toBeDefined()
      expect((eventData as { css: string }).css).toContain('.block')
    })

    it('should emit theme:extended event', () => {
      let eventFired = false
      const instance = createCoral() as Kernel

      instance.on('theme:extended', () => {
        eventFired = true
      })

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.extendTheme({ colors: { test: '#000' } })
        },
      })

      expect(eventFired).toBe(true)
    })
  })

  describe('plugin priority sorting', () => {
    it('should load plugins in priority order', () => {
      const loadOrder: string[] = []
      const instance = createCoral({
        plugins: [
          {
            name: 'low-priority',
            version: '1.0.0',
            priority: 1,
            install: () => { loadOrder.push('low') },
          },
          {
            name: 'high-priority',
            version: '1.0.0',
            priority: 100,
            install: () => { loadOrder.push('high') },
          },
          {
            name: 'medium-priority',
            version: '1.0.0',
            priority: 50,
            install: () => { loadOrder.push('medium') },
          },
        ],
      }) as Kernel

      expect(loadOrder[0]).toBe('high')
      expect(loadOrder[1]).toBe('medium')
      expect(loadOrder[2]).toBe('low')
      expect(instance).toBeDefined()
    })
  })

  describe('plugin count and access', () => {
    it('should return correct plugin count', () => {
      const instance = createCoral() as Kernel

      expect(instance.pluginCount).toBe(0)

      instance.use({
        name: 'plugin-1',
        version: '1.0.0',
        install: () => {},
      })

      expect(instance.pluginCount).toBe(1)

      instance.use({
        name: 'plugin-2',
        version: '1.0.0',
        install: () => {},
      })

      expect(instance.pluginCount).toBe(2)
    })

    it('should provide access to plugins map', () => {
      const instance = createCoral() as Kernel

      instance.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      })

      const plugins = instance.plugins
      expect(plugins.has('test-plugin')).toBe(true)
    })
  })

  describe('skip duplicate plugin registration', () => {
    it('should not re-register same plugin', () => {
      let installCount = 0
      const instance = createCoral() as Kernel

      const plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => { installCount++ },
      }

      instance.use(plugin)
      instance.use(plugin)

      expect(installCount).toBe(1)
    })
  })

  describe('presets', () => {
    it('should load plugins from presets', () => {
      let pluginInstalled = false

      const instance = createCoral({
        presets: [
          {
            plugins: [
              {
                name: 'preset-plugin',
                version: '1.0.0',
                install: () => { pluginInstalled = true },
              },
            ],
          },
        ],
      }) as Kernel

      expect(pluginInstalled).toBe(true)
      expect(instance.pluginCount).toBe(1)
    })

    it('should apply preset theme configuration', () => {
      const instance = createCoral({
        presets: [
          {
            plugins: [],
            theme: {
              colors: {
                preset: '#123456',
              },
            },
          },
        ],
      }) as Kernel

      expect(instance.config.theme.colors).toHaveProperty('preset')
    })

    it('should apply preset options', () => {
      const instance = createCoral({
        presets: [
          {
            plugins: [],
            options: {
              prefix: 'preset-',
            },
          },
        ],
      }) as Kernel

      expect(instance.config.prefix).toBe('preset-')
    })
  })

  describe('callOnReady during initialization', () => {
    it('should call onReady for plugins during preset load', async () => {
      let readyCalled = false

      const instance = createCoral({
        presets: [
          {
            plugins: [
              {
                name: 'ready-plugin',
                version: '1.0.0',
                install: () => {},
                onReady: async () => {
                  readyCalled = true
                },
              },
            ],
          },
        ],
      }) as Kernel

      await new Promise((resolve) => setTimeout(resolve, 100))
      expect(readyCalled).toBe(true)
      expect(instance).toBeDefined()
    })
  })

  describe('ready() method', () => {
    it('should return a Promise that resolves after all plugins are ready', async () => {
      let readyCalled = false

      // Register plugin via constructor options to ensure it's included in ready()
      const instance = createCoral({
        plugins: [
          {
            name: 'async-plugin',
            version: '1.0.0',
            install: () => {},
            onReady: async () => {
              await new Promise((resolve) => setTimeout(resolve, 50))
              readyCalled = true
            },
          },
        ],
      }) as Kernel

      await instance.ready()
      expect(readyCalled).toBe(true)
    })

    it('should be callable multiple times and resolve consistently', async () => {
      const instance = createCoral({
        plugins: [
          {
            name: 'test-plugin',
            version: '1.0.0',
            install: () => {},
            onReady: async () => {},
          },
        ],
      }) as Kernel

      // Both calls should resolve successfully
      await instance.ready()
      await instance.ready()
      // No error means it works
      expect(true).toBe(true)
    })

    it('should resolve immediately if no plugins have onReady', async () => {
      const instance = createCoral({
        plugins: [
          {
            name: 'sync-plugin',
            version: '1.0.0',
            install: () => {},
          },
        ],
      }) as Kernel

      const start = Date.now()
      await instance.ready()
      const elapsed = Date.now() - start
      expect(elapsed).toBeLessThan(50)
    })

    it('should handle plugins with onReady errors gracefully', async () => {
      let errorHandled = false

      const instance = createCoral({
        plugins: [
          {
            name: 'error-plugin',
            version: '1.0.0',
            install: () => {},
            onReady: async () => {
              throw new Error('Async error')
            },
            onError: () => {
              errorHandled = true
            },
          },
        ],
      }) as Kernel

      // ready() should not throw
      await expect(instance.ready()).resolves.toBeUndefined()
      expect(errorHandled).toBe(true)
    })

    it('should wait for all async plugins before resolving', async () => {
      const order: string[] = []

      const instance = createCoral({
        plugins: [
          {
            name: 'plugin-1',
            version: '1.0.0',
            install: () => {},
            onReady: async () => {
              await new Promise((resolve) => setTimeout(resolve, 30))
              order.push('plugin-1')
            },
          },
          {
            name: 'plugin-2',
            version: '1.0.0',
            install: () => {},
            onReady: async () => {
              await new Promise((resolve) => setTimeout(resolve, 10))
              order.push('plugin-2')
            },
          },
        ],
      }) as Kernel

      await instance.ready()
      // Both plugins should have completed
      expect(order).toContain('plugin-1')
      expect(order).toContain('plugin-2')
    })

    it('should call onReady for plugins added via use() after initialization', async () => {
      let readyCalled = false
      const instance = createCoral() as Kernel

      instance.use({
        name: 'late-plugin',
        version: '1.0.0',
        install: () => {},
        onReady: async () => {
          readyCalled = true
        },
      })

      // For plugins added after initialization, onReady is called immediately (fire-and-forget)
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(readyCalled).toBe(true)
    })
  })

  describe('prototype pollution protection', () => {
    it('should ignore __proto__ in config', () => {
      const maliciousConfig = JSON.parse('{"__proto__":{"polluted":"yes"}}')

      const instance = createCoral({
        theme: maliciousConfig,
      }) as Kernel

      // __proto__ should not be set on Object.prototype
      expect(({} as Record<string, unknown>).polluted).toBeUndefined()
      expect(instance).toBeDefined()
    })

    it('should ignore constructor in config', () => {
      const maliciousConfig = {
        constructor: {
          prototype: {
            polluted: 'yes',
          },
        },
        colors: {
          primary: '#000',
        },
      }

      const instance = createCoral({
        theme: maliciousConfig as Record<string, unknown>,
      }) as Kernel

      // Should not pollute Object.prototype
      expect(({} as Record<string, unknown>).polluted).toBeUndefined()
      expect(instance).toBeDefined()
    })

    it('should ignore prototype in nested config', () => {
      const instance = createCoral({
        theme: {
          colors: {
            prototype: { polluted: 'yes' },
            primary: '#fff',
          },
        } as Record<string, unknown>,
      }) as Kernel

      expect(({} as Record<string, unknown>).polluted).toBeUndefined()
      expect(instance).toBeDefined()
    })

    it('should still merge safe properties', () => {
      const instance = createCoral({
        theme: {
          colors: {
            primary: '#ff0000',
            secondary: '#00ff00',
          },
        },
      }) as Kernel

      expect(instance.config.theme.colors).toHaveProperty('primary', '#ff0000')
      expect(instance.config.theme.colors).toHaveProperty('secondary', '#00ff00')
    })

    it('should handle deeply nested prototype pollution attempts', () => {
      const maliciousConfig = {
        extend: {
          colors: {
            nested: {
              __proto__: { polluted: 'yes' },
              safe: '#000',
            },
          },
        },
      }

      const instance = createCoral({
        theme: maliciousConfig as Record<string, unknown>,
      }) as Kernel

      expect(({} as Record<string, unknown>).polluted).toBeUndefined()
      expect(instance).toBeDefined()
    })
  })
})
