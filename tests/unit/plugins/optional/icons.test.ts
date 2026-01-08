/**
 * Icons Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { iconsPlugin } from '../../../../src/plugins/optional/icons'
import iconsDefault from '../../../../src/plugins/optional/icons'

describe('iconsPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = iconsPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = iconsPlugin()

    expect(plugin.name).toBe('icons')
  })

  it('should have version', () => {
    const plugin = iconsPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = iconsPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = iconsPlugin()

    expect(() => plugin.install()).not.toThrow()
  })

  it('should export default', () => {
    expect(iconsDefault).toBe(iconsPlugin)
  })
})
