/**
 * Tests for Pseudo-class and Pseudo-element Variants Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { pseudoVariantsPlugin } from '../../../../../src/plugins/core/variants/pseudo'
import { coralPreset } from '../../../../../src/presets/coral'
import type { Coral } from '../../../../../src/types'

describe('Pseudo Variants Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coralPreset().forEach((p) => coral.use(p))
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = pseudoVariantsPlugin()
      expect(plugin.name).toBe('pseudo-variants')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Basic Pseudo-classes', () => {
    it('should generate hover variant', () => {
      const css = coral.generate(['hover:bg-red-500'])
      expect(css).toContain(':hover')
    })

    it('should generate focus variant', () => {
      const css = coral.generate(['focus:ring-2'])
      expect(css).toContain(':focus')
    })

    it('should generate focus-within variant', () => {
      const css = coral.generate(['focus-within:ring-2'])
      expect(css).toContain(':focus-within')
    })

    it('should generate focus-visible variant', () => {
      const css = coral.generate(['focus-visible:outline-2'])
      expect(css).toContain(':focus-visible')
    })

    it('should generate active variant', () => {
      const css = coral.generate(['active:bg-blue-700'])
      expect(css).toContain(':active')
    })

    it('should generate visited variant', () => {
      const css = coral.generate(['visited:text-purple-600'])
      expect(css).toContain(':visited')
    })

    it('should generate target variant', () => {
      const css = coral.generate(['target:bg-yellow-100'])
      expect(css).toContain(':target')
    })
  })

  describe('Child Position Variants', () => {
    it('should generate first variant', () => {
      const css = coral.generate(['first:pt-0'])
      expect(css).toContain(':first-child')
    })

    it('should generate last variant', () => {
      const css = coral.generate(['last:pb-0'])
      expect(css).toContain(':last-child')
    })

    it('should generate only variant', () => {
      const css = coral.generate(['only:border-0'])
      expect(css).toContain(':only-child')
    })

    it('should generate odd variant', () => {
      const css = coral.generate(['odd:bg-gray-100'])
      expect(css).toContain(':nth-child(odd)')
    })

    it('should generate even variant', () => {
      const css = coral.generate(['even:bg-gray-50'])
      expect(css).toContain(':nth-child(even)')
    })
  })

  describe('Type Variants', () => {
    it('should generate first-of-type variant', () => {
      const css = coral.generate(['first-of-type:font-bold'])
      expect(css).toContain(':first-of-type')
    })

    it('should generate last-of-type variant', () => {
      const css = coral.generate(['last-of-type:mb-0'])
      expect(css).toContain(':last-of-type')
    })

    it('should generate only-of-type variant', () => {
      const css = coral.generate(['only-of-type:text-center'])
      expect(css).toContain(':only-of-type')
    })
  })

  describe('State Variants', () => {
    it('should generate empty variant', () => {
      const css = coral.generate(['empty:hidden'])
      expect(css).toContain(':empty')
    })

    it('should generate disabled variant', () => {
      const css = coral.generate(['disabled:opacity-50'])
      expect(css).toContain(':disabled')
    })

    it('should generate enabled variant', () => {
      const css = coral.generate(['enabled:cursor-pointer'])
      expect(css).toContain(':enabled')
    })

    it('should generate checked variant', () => {
      const css = coral.generate(['checked:bg-blue-500'])
      expect(css).toContain(':checked')
    })

    it('should generate indeterminate variant', () => {
      const css = coral.generate(['indeterminate:bg-gray-300'])
      expect(css).toContain(':indeterminate')
    })

    it('should generate default variant', () => {
      const css = coral.generate(['default:ring-2'])
      expect(css).toContain(':default')
    })
  })

  describe('Form Validation Variants', () => {
    it('should generate required variant', () => {
      const css = coral.generate(['required:border-red-500'])
      expect(css).toContain(':required')
    })

    it('should generate optional variant', () => {
      const css = coral.generate(['optional:border-gray-300'])
      expect(css).toContain(':optional')
    })

    it('should generate valid variant', () => {
      const css = coral.generate(['valid:border-green-500'])
      expect(css).toContain(':valid')
    })

    it('should generate invalid variant', () => {
      const css = coral.generate(['invalid:border-red-500'])
      expect(css).toContain(':invalid')
    })

    it('should generate in-range variant', () => {
      const css = coral.generate(['in-range:bg-green-50'])
      expect(css).toContain(':in-range')
    })

    it('should generate out-of-range variant', () => {
      const css = coral.generate(['out-of-range:bg-red-50'])
      expect(css).toContain(':out-of-range')
    })

    it('should generate placeholder-shown variant', () => {
      const css = coral.generate(['placeholder-shown:text-gray-400'])
      expect(css).toContain(':placeholder-shown')
    })

    it('should generate autofill variant', () => {
      const css = coral.generate(['autofill:bg-yellow-50'])
      expect(css).toContain(':autofill')
    })

    it('should generate read-only variant', () => {
      const css = coral.generate(['read-only:bg-gray-100'])
      expect(css).toContain(':read-only')
    })

    it('should generate read-write variant', () => {
      const css = coral.generate(['read-write:bg-white'])
      expect(css).toContain(':read-write')
    })
  })

  describe('Dialog Variant', () => {
    it('should generate open variant', () => {
      const css = coral.generate(['open:block'])
      expect(css).toContain('[open]')
    })
  })

  describe('Pseudo-elements', () => {
    it('should generate before pseudo-element', () => {
      const css = coral.generate(['before:content-["*"]'])
      expect(css).toContain('::before')
    })

    it('should generate after pseudo-element', () => {
      const css = coral.generate(['after:content-[""]'])
      expect(css).toContain('::after')
    })

    it('should generate first-letter pseudo-element', () => {
      const css = coral.generate(['first-letter:text-2xl'])
      expect(css).toContain('::first-letter')
    })

    it('should generate first-line pseudo-element', () => {
      const css = coral.generate(['first-line:font-bold'])
      expect(css).toContain('::first-line')
    })

    it('should generate marker pseudo-element', () => {
      const css = coral.generate(['marker:text-blue-500'])
      expect(css).toContain('::marker')
    })

    it('should generate selection pseudo-element', () => {
      const css = coral.generate(['selection:bg-blue-200'])
      expect(css).toContain('::selection')
    })

    it('should generate file pseudo-element', () => {
      const css = coral.generate(['file:bg-blue-500'])
      expect(css).toContain('::file-selector-button')
    })

    it('should generate backdrop pseudo-element', () => {
      const css = coral.generate(['backdrop:bg-black/50'])
      expect(css).toContain('::backdrop')
    })

    it('should generate placeholder pseudo-element', () => {
      const css = coral.generate(['placeholder:text-gray-400'])
      expect(css).toContain('::placeholder')
    })
  })

  describe('Group Variants', () => {
    it('should generate group-hover variant', () => {
      const css = coral.generate(['group-hover:text-white'])
      expect(css).toContain('.group:hover')
    })

    it('should generate group-focus variant', () => {
      const css = coral.generate(['group-focus:ring-2'])
      expect(css).toContain('.group:focus')
    })

    it('should generate group-focus-within variant', () => {
      const css = coral.generate(['group-focus-within:shadow-lg'])
      expect(css).toContain('.group:focus-within')
    })

    it('should generate group-focus-visible variant', () => {
      const css = coral.generate(['group-focus-visible:outline-2'])
      expect(css).toContain('.group:focus-visible')
    })

    it('should generate group-active variant', () => {
      const css = coral.generate(['group-active:scale-95'])
      expect(css).toContain('.group:active')
    })

    it('should generate group-visited variant', () => {
      const css = coral.generate(['group-visited:text-purple-600'])
      expect(css).toContain('.group:visited')
    })

    it('should generate group-target variant', () => {
      const css = coral.generate(['group-target:bg-yellow-100'])
      expect(css).toContain('.group:target')
    })

    it('should generate group-disabled variant', () => {
      const css = coral.generate(['group-disabled:opacity-50'])
      expect(css).toContain('.group:disabled')
    })

    it('should generate group-checked variant', () => {
      const css = coral.generate(['group-checked:bg-blue-100'])
      expect(css).toContain('.group:checked')
    })

    it('should generate group-first variant', () => {
      const css = coral.generate(['group-first:pt-0'])
      expect(css).toContain('.group:first-child')
    })

    it('should generate group-last variant', () => {
      const css = coral.generate(['group-last:pb-0'])
      expect(css).toContain('.group:last-child')
    })

    it('should generate group-odd variant', () => {
      const css = coral.generate(['group-odd:bg-gray-100'])
      expect(css).toContain('.group:nth-child(odd)')
    })

    it('should generate group-even variant', () => {
      const css = coral.generate(['group-even:bg-gray-50'])
      expect(css).toContain('.group:nth-child(even)')
    })
  })

  describe('Peer Variants', () => {
    it('should generate peer-hover variant', () => {
      const css = coral.generate(['peer-hover:text-blue-500'])
      expect(css).toContain('.peer:hover ~')
    })

    it('should generate peer-focus variant', () => {
      const css = coral.generate(['peer-focus:ring-2'])
      expect(css).toContain('.peer:focus ~')
    })

    it('should generate peer-focus-within variant', () => {
      const css = coral.generate(['peer-focus-within:shadow-lg'])
      expect(css).toContain('.peer:focus-within ~')
    })

    it('should generate peer-focus-visible variant', () => {
      const css = coral.generate(['peer-focus-visible:outline-2'])
      expect(css).toContain('.peer:focus-visible ~')
    })

    it('should generate peer-active variant', () => {
      const css = coral.generate(['peer-active:bg-blue-600'])
      expect(css).toContain('.peer:active ~')
    })

    it('should generate peer-visited variant', () => {
      const css = coral.generate(['peer-visited:text-purple-600'])
      expect(css).toContain('.peer:visited ~')
    })

    it('should generate peer-target variant', () => {
      const css = coral.generate(['peer-target:bg-yellow-100'])
      expect(css).toContain('.peer:target ~')
    })

    it('should generate peer-disabled variant', () => {
      const css = coral.generate(['peer-disabled:opacity-50'])
      expect(css).toContain('.peer:disabled ~')
    })

    it('should generate peer-checked variant', () => {
      const css = coral.generate(['peer-checked:bg-blue-100'])
      expect(css).toContain('.peer:checked ~')
    })

    it('should generate peer-invalid variant', () => {
      const css = coral.generate(['peer-invalid:text-red-500'])
      expect(css).toContain('.peer:invalid ~')
    })

    it('should generate peer-required variant', () => {
      const css = coral.generate(['peer-required:font-semibold'])
      expect(css).toContain('.peer:required ~')
    })

    it('should generate peer-placeholder-shown variant', () => {
      const css = coral.generate(['peer-placeholder-shown:text-gray-400'])
      expect(css).toContain('.peer:placeholder-shown ~')
    })
  })

  describe('Combined Variants', () => {
    it('should combine hover with focus', () => {
      const css = coral.generate(['hover:focus:ring-4'])
      expect(css).toBeDefined()
    })

    it('should combine group-hover with other variants', () => {
      const css = coral.generate(['group-hover:md:text-lg'])
      expect(css).toContain('.group:hover')
    })

    it('should combine peer-focus with other variants', () => {
      const css = coral.generate(['peer-focus:sm:block'])
      expect(css).toContain('.peer:focus ~')
    })

    it('should combine before with content', () => {
      const css = coral.generate(['before:block', 'before:content-[""]'])
      expect(css).toContain('::before')
    })

    it('should combine first with hover', () => {
      const css = coral.generate(['first:hover:bg-gray-200'])
      expect(css).toContain(':first-child')
      expect(css).toContain(':hover')
    })

    it('should combine dark with hover', () => {
      const css = coral.generate(['dark:hover:bg-gray-800'])
      expect(css).toContain(':hover')
    })

    it('should combine responsive with hover', () => {
      const css = coral.generate(['hover:md:bg-blue-500'])
      expect(css).toContain(':hover')
    })

    it('should combine dark with group-hover', () => {
      const css = coral.generate(['dark:group-hover:bg-gray-700'])
      expect(css).toContain('.group:hover')
    })
  })

  describe('Selection Variant', () => {
    it('should generate selection variant', () => {
      const css = coral.generate(['selection:bg-blue-500'])
      expect(css).toContain('::selection')
    })

    it('should generate selection with text color', () => {
      const css = coral.generate(['selection:text-white'])
      expect(css).toContain('::selection')
    })
  })

  describe('File Variant', () => {
    it('should generate file variant', () => {
      const css = coral.generate(['file:bg-blue-500'])
      expect(css).toContain('::file-selector-button')
    })

    it('should generate file with text color', () => {
      const css = coral.generate(['file:text-white'])
      expect(css).toContain('::file-selector-button')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/pseudo'
      )
      expect(defaultExport).toBe(pseudoVariantsPlugin)
    })
  })
})
