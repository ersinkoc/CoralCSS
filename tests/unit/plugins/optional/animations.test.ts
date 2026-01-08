/**
 * Animations Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { animationsPlugin } from '../../../../src/plugins/optional/animations'
import animationsDefault from '../../../../src/plugins/optional/animations'

describe('animationsPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = animationsPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = animationsPlugin()

    expect(plugin.name).toBe('animations')
  })

  it('should have version', () => {
    const plugin = animationsPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = animationsPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = animationsPlugin()

    expect(() => plugin.install()).not.toThrow()
  })

  it('should export default', () => {
    expect(animationsDefault).toBe(animationsPlugin)
  })
})
