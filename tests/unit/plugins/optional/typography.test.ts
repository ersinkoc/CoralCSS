/**
 * Typography Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { typographyPlugin } from '../../../../src/plugins/optional/typography'
import typographyDefault from '../../../../src/plugins/optional/typography'

describe('typographyPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = typographyPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = typographyPlugin()

    expect(plugin.name).toBe('typography')
  })

  it('should have version', () => {
    const plugin = typographyPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = typographyPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = typographyPlugin()

    expect(() => plugin.install()).not.toThrow()
  })

  it('should export default', () => {
    expect(typographyDefault).toBe(typographyPlugin)
  })
})
