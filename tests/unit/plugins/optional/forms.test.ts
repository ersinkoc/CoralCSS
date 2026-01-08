/**
 * Forms Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { formsPlugin } from '../../../../src/plugins/optional/forms'
import formsDefault from '../../../../src/plugins/optional/forms'

describe('formsPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = formsPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = formsPlugin()

    expect(plugin.name).toBe('forms')
  })

  it('should have version', () => {
    const plugin = formsPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = formsPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = formsPlugin()

    expect(() => plugin.install()).not.toThrow()
  })

  it('should export default', () => {
    expect(formsDefault).toBe(formsPlugin)
  })
})
