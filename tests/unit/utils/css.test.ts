/**
 * CSS Utilities Tests
 */
import { describe, it, expect } from 'vitest'
import {
  serializeProperties,
  formatValue,
  formatRule,
  formatCSS,
  minifyCSS,
  wrapInMediaQuery,
  wrapInContainerQuery,
  wrapInLayer,
  cssVar,
  cssVarDeclaration,
  parseValueWithUnit,
  remToPx,
  pxToRem,
  isColor,
  isCSSFunction,
  parseCSSFunction,
  combineCSS,
  createKeyframes,
} from '../../../src/utils/css'

describe('CSS Utilities', () => {
  describe('serializeProperties', () => {
    it('should serialize simple properties', () => {
      const result = serializeProperties({ padding: '1rem', margin: '2rem' })
      expect(result).toContain('padding: 1rem;')
      expect(result).toContain('margin: 2rem;')
    })

    it('should convert camelCase to kebab-case', () => {
      const result = serializeProperties({ marginTop: '1rem', backgroundColor: 'red' })
      expect(result).toContain('margin-top: 1rem;')
      expect(result).toContain('background-color: red;')
    })

    it('should skip null and undefined values', () => {
      const result = serializeProperties({ padding: '1rem', margin: null as unknown as string, color: undefined as unknown as string })
      expect(result).toBe('padding: 1rem;')
    })

    it('should handle nested properties', () => {
      const result = serializeProperties({
        '@media (min-width: 768px)': { padding: '2rem' },
      })
      expect(result).toContain('@media (min-width: 768px) { padding: 2rem; }')
    })
  })

  describe('formatValue', () => {
    it('should format number 0 without unit', () => {
      expect(formatValue(0)).toBe('0')
    })

    it('should format non-zero numbers', () => {
      expect(formatValue(16)).toBe('16')
      expect(formatValue(1.5)).toBe('1.5')
    })

    it('should return string values as-is', () => {
      expect(formatValue('1rem')).toBe('1rem')
      expect(formatValue('auto')).toBe('auto')
    })
  })

  describe('formatRule', () => {
    it('should format rule with selector and properties', () => {
      const result = formatRule('.p-4', { padding: '1rem' })
      expect(result).toBe('.p-4 { padding: 1rem; }')
    })

    it('should handle multiple properties', () => {
      const result = formatRule('.test', { padding: '1rem', margin: '0' })
      expect(result).toContain('padding: 1rem;')
      expect(result).toContain('margin: 0;')
    })
  })

  describe('formatCSS', () => {
    it('should format CSS with newlines', () => {
      const result = formatCSS('.p-4{padding:1rem}', { indent: 2, newlines: true })
      expect(result).toContain('\n')
      expect(result).toContain('  padding')
    })

    it('should not format when newlines is false', () => {
      const css = '.p-4{padding:1rem}'
      const result = formatCSS(css, { newlines: false })
      expect(result).toBe(css)
    })

    it('should use custom indent', () => {
      const result = formatCSS('.p-4{padding:1rem}', { indent: 4, newlines: true })
      expect(result).toContain('    padding')
    })

    it('should handle as selector + properties when second arg is properties', () => {
      const result = formatCSS('.test', { display: 'block' })
      expect(result).toBe('.test { display: block; }')
    })

    it('should handle nested rules', () => {
      const result = formatCSS('.a{padding:1rem;.b{margin:0}}', { indent: 2, newlines: true })
      expect(result).toContain('.a')
      expect(result).toContain('.b')
    })

    it('should handle CSS with colon in values', () => {
      const result = formatCSS('.test{background:url("http://example.com")}', { indent: 2, newlines: true })
      expect(result).toContain('background')
      expect(result).toContain('http')
    })

    it('should handle CSS with semicolon in values', () => {
      const result = formatCSS('.test{content:";"}', { indent: 2, newlines: true })
      expect(result).toContain('content')
      expect(result).toContain(';')
    })

    it('should handle empty CSS', () => {
      const result = formatCSS('', { indent: 2, newlines: true })
      expect(result).toBe('')
    })
  })

  describe('minifyCSS', () => {
    it('should remove whitespace', () => {
      const result = minifyCSS('.p-4 {\n  padding: 1rem;\n}')
      expect(result).toBe('.p-4{padding:1rem}')
    })

    it('should remove comments', () => {
      const result = minifyCSS('/* comment */ .p-4 { padding: 1rem; }')
      expect(result).not.toContain('comment')
      expect(result).toBe('.p-4{padding:1rem}')
    })

    it('should remove trailing semicolons', () => {
      const result = minifyCSS('.p-4 { padding: 1rem; }')
      expect(result).toBe('.p-4{padding:1rem}')
    })

    it('should collapse multiple spaces', () => {
      const result = minifyCSS('.p-4     {    padding:    1rem;    }')
      expect(result).toBe('.p-4{padding:1rem}')
    })
  })

  describe('wrapInMediaQuery', () => {
    it('should wrap CSS in media query', () => {
      const result = wrapInMediaQuery('.p-4 { padding: 1rem; }', '(min-width: 768px)')
      expect(result).toBe('@media (min-width: 768px) { .p-4 { padding: 1rem; } }')
    })
  })

  describe('wrapInContainerQuery', () => {
    it('should wrap CSS in container query', () => {
      const result = wrapInContainerQuery('.p-4 { padding: 1rem; }', '(min-width: 20rem)')
      expect(result).toBe('@container (min-width: 20rem) { .p-4 { padding: 1rem; } }')
    })

    it('should include container name when provided', () => {
      const result = wrapInContainerQuery('.p-4 { padding: 1rem; }', '(min-width: 20rem)', 'sidebar')
      expect(result).toBe('@container sidebar (min-width: 20rem) { .p-4 { padding: 1rem; } }')
    })
  })

  describe('wrapInLayer', () => {
    it('should wrap CSS in layer', () => {
      const result = wrapInLayer('.p-4 { padding: 1rem; }', 'utilities')
      expect(result).toBe('@layer utilities { .p-4 { padding: 1rem; } }')
    })
  })

  describe('cssVar', () => {
    it('should create CSS var reference', () => {
      expect(cssVar('spacing-4')).toBe('var(--spacing-4)')
    })

    it('should not double-prefix', () => {
      expect(cssVar('--spacing-4')).toBe('var(--spacing-4)')
    })

    it('should include fallback', () => {
      expect(cssVar('spacing-4', '1rem')).toBe('var(--spacing-4, 1rem)')
    })
  })

  describe('cssVarDeclaration', () => {
    it('should create CSS var declaration', () => {
      expect(cssVarDeclaration('spacing-4', '1rem')).toBe('--spacing-4: 1rem')
    })

    it('should not double-prefix', () => {
      expect(cssVarDeclaration('--spacing-4', '1rem')).toBe('--spacing-4: 1rem')
    })
  })

  describe('parseValueWithUnit', () => {
    it('should parse px values', () => {
      expect(parseValueWithUnit('16px')).toEqual({ value: 16, unit: 'px' })
    })

    it('should parse rem values', () => {
      expect(parseValueWithUnit('1.5rem')).toEqual({ value: 1.5, unit: 'rem' })
    })

    it('should parse percentage values', () => {
      expect(parseValueWithUnit('50%')).toEqual({ value: 50, unit: '%' })
    })

    it('should parse negative values', () => {
      expect(parseValueWithUnit('-16px')).toEqual({ value: -16, unit: 'px' })
    })

    it('should handle unitless numbers', () => {
      expect(parseValueWithUnit('16')).toEqual({ value: 16, unit: null })
    })

    it('should handle keyword values', () => {
      expect(parseValueWithUnit('auto')).toEqual({ value: 'auto', unit: null })
    })
  })

  describe('remToPx', () => {
    it('should convert rem to px with default base', () => {
      expect(remToPx(1)).toBe(16)
      expect(remToPx(1.5)).toBe(24)
    })

    it('should convert rem to px with custom base', () => {
      expect(remToPx(1, 10)).toBe(10)
    })
  })

  describe('pxToRem', () => {
    it('should convert px to rem with default base', () => {
      expect(pxToRem(16)).toBe(1)
      expect(pxToRem(24)).toBe(1.5)
    })

    it('should convert px to rem with custom base', () => {
      expect(pxToRem(10, 10)).toBe(1)
    })
  })

  describe('isColor', () => {
    it('should detect hex colors', () => {
      expect(isColor('#fff')).toBe(true)
      expect(isColor('#ffffff')).toBe(true)
      expect(isColor('#ffffffff')).toBe(true)
    })

    it('should detect rgb function start', () => {
      // The regex checks if the value starts with rgb( or rgba(
      expect(isColor('rgb(')).toBe(true)
      expect(isColor('rgba(')).toBe(true)
    })

    it('should detect hsl function start', () => {
      expect(isColor('hsl(')).toBe(true)
      expect(isColor('hsla(')).toBe(true)
    })

    it('should detect oklch function start', () => {
      expect(isColor('oklch(')).toBe(true)
    })

    it('should detect color-mix function start', () => {
      expect(isColor('color-mix(')).toBe(true)
    })

    it('should detect light-dark function start', () => {
      expect(isColor('light-dark(')).toBe(true)
    })

    it('should detect special values', () => {
      expect(isColor('transparent')).toBe(true)
      expect(isColor('currentColor')).toBe(true)
      expect(isColor('inherit')).toBe(true)
    })

    it('should detect named colors', () => {
      expect(isColor('red')).toBe(true)
      expect(isColor('blue')).toBe(true)
    })
  })

  describe('isCSSFunction', () => {
    it('should detect CSS functions', () => {
      expect(isCSSFunction('rgb(255, 0, 0)')).toBe(true)
      expect(isCSSFunction('calc(100% - 20px)')).toBe(true)
      expect(isCSSFunction('var(--color)')).toBe(true)
    })

    it('should not detect non-functions', () => {
      expect(isCSSFunction('16px')).toBe(false)
      expect(isCSSFunction('red')).toBe(false)
    })
  })

  describe('parseCSSFunction', () => {
    it('should parse CSS function', () => {
      expect(parseCSSFunction('rgb(255, 0, 0)')).toEqual({ name: 'rgb', args: '255, 0, 0' })
    })

    it('should parse calc function', () => {
      expect(parseCSSFunction('calc(100% - 20px)')).toEqual({ name: 'calc', args: '100% - 20px' })
    })

    it('should return null for non-functions', () => {
      expect(parseCSSFunction('16px')).toBeNull()
      expect(parseCSSFunction('red')).toBeNull()
    })
  })

  describe('combineCSS', () => {
    it('should combine CSS rules', () => {
      const result = combineCSS('.a { color: red; }', '.b { color: blue; }')
      expect(result).toBe('.a { color: red; }\n.b { color: blue; }')
    })

    it('should filter empty rules', () => {
      const result = combineCSS('.a { color: red; }', '', '.b { color: blue; }')
      expect(result).toBe('.a { color: red; }\n.b { color: blue; }')
    })
  })

  describe('createKeyframes', () => {
    it('should create keyframes rule', () => {
      const result = createKeyframes('spin', {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      })

      expect(result).toContain('@keyframes spin')
      expect(result).toContain('0%')
      expect(result).toContain('100%')
      expect(result).toContain('transform: rotate(0deg);')
      expect(result).toContain('transform: rotate(360deg);')
    })
  })
})
