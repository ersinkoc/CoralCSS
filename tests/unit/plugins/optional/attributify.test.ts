/**
 * Attributify Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { attributifyPlugin } from '../../../../src/plugins/optional/attributify'
import attributifyDefault from '../../../../src/plugins/optional/attributify'

describe('attributifyPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = attributifyPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = attributifyPlugin()

    expect(plugin.name).toBe('attributify')
  })

  it('should have version', () => {
    const plugin = attributifyPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = attributifyPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = attributifyPlugin()

    expect(() => plugin.install()).not.toThrow()
  })

  it('should export default', () => {
    expect(attributifyDefault).toBe(attributifyPlugin)
  })
})
