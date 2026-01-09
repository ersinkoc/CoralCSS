/**
 * Spacing Utilities Plugin
 *
 * Padding, margin, gap, and space utilities.
 * @module plugins/core/utilities/spacing
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { spacing, negativeSpacing } from '../../../theme'

/**
 * Create spacing rules for a property
 */
function createSpacingRules(
  prefix: string,
  properties: string[],
  scale: Record<string, string>,
  allowNegative = false
): Rule[] {
  const rules: Rule[] = []

  for (const [key, value] of Object.entries(scale)) {
    rules.push({
      pattern: `${prefix}-${key}`,
      properties: Object.fromEntries(properties.map((p) => [p, value])),
    })
  }

  // Arbitrary value support
  rules.push({
    pattern: new RegExp(`^${prefix}-\\[(.+)\\]$`),
    handler: (match) => {
      const v = match[1]
      if (!v) return null
      return { properties: Object.fromEntries(properties.map((p) => [p, v])) }
    },
  })

  // Negative values
  if (allowNegative) {
    for (const [key, value] of Object.entries(negativeSpacing)) {
      rules.push({
        pattern: `-${prefix}${key}`,
        properties: Object.fromEntries(properties.map((p) => [p, value])),
      })
    }
  }

  return rules
}

/**
 * Spacing utilities plugin
 */
export function spacingPlugin(): Plugin {
  return {
    name: 'spacing',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Padding
      rules.push(...createSpacingRules('p', ['padding'], spacing))
      rules.push(...createSpacingRules('px', ['padding-left', 'padding-right'], spacing))
      rules.push(...createSpacingRules('py', ['padding-top', 'padding-bottom'], spacing))
      rules.push(...createSpacingRules('pt', ['padding-top'], spacing))
      rules.push(...createSpacingRules('pr', ['padding-right'], spacing))
      rules.push(...createSpacingRules('pb', ['padding-bottom'], spacing))
      rules.push(...createSpacingRules('pl', ['padding-left'], spacing))
      rules.push(...createSpacingRules('ps', ['padding-inline-start'], spacing))
      rules.push(...createSpacingRules('pe', ['padding-inline-end'], spacing))

      // Comprehensive Logical Properties for Padding (Tailwind 4 parity)
      rules.push(...createSpacingRules('pbs', ['padding-block-start'], spacing))
      rules.push(...createSpacingRules('pbe', ['padding-block-end'], spacing))
      rules.push(...createSpacingRules('pli', ['padding-inline'], spacing))
      rules.push(...createSpacingRules('plb', ['padding-block'], spacing))

      // Margin
      rules.push(...createSpacingRules('m', ['margin'], spacing, true))
      rules.push(...createSpacingRules('mx', ['margin-left', 'margin-right'], spacing, true))
      rules.push(...createSpacingRules('my', ['margin-top', 'margin-bottom'], spacing, true))
      rules.push(...createSpacingRules('mt', ['margin-top'], spacing, true))
      rules.push(...createSpacingRules('mr', ['margin-right'], spacing, true))
      rules.push(...createSpacingRules('mb', ['margin-bottom'], spacing, true))
      rules.push(...createSpacingRules('ml', ['margin-left'], spacing, true))
      rules.push(...createSpacingRules('ms', ['margin-inline-start'], spacing, true))
      rules.push(...createSpacingRules('me', ['margin-inline-end'], spacing, true))

      // Comprehensive Logical Properties for Margin (Tailwind 4 parity)
      rules.push(...createSpacingRules('mbs', ['margin-block-start'], spacing, true))
      rules.push(...createSpacingRules('mbe', ['margin-block-end'], spacing, true))
      rules.push(...createSpacingRules('mli', ['margin-inline'], spacing, true))
      rules.push(...createSpacingRules('mlb', ['margin-block'], spacing, true))

      // Auto margin
      rules.push({ pattern: 'm-auto', properties: { margin: 'auto' } })
      rules.push({ pattern: 'mx-auto', properties: { 'margin-left': 'auto', 'margin-right': 'auto' } })
      rules.push({ pattern: 'my-auto', properties: { 'margin-top': 'auto', 'margin-bottom': 'auto' } })
      rules.push({ pattern: 'mt-auto', properties: { 'margin-top': 'auto' } })
      rules.push({ pattern: 'mr-auto', properties: { 'margin-right': 'auto' } })
      rules.push({ pattern: 'mb-auto', properties: { 'margin-bottom': 'auto' } })
      rules.push({ pattern: 'ml-auto', properties: { 'margin-left': 'auto' } })
      rules.push({ pattern: 'ms-auto', properties: { 'margin-inline-start': 'auto' } })
      rules.push({ pattern: 'me-auto', properties: { 'margin-inline-end': 'auto' } })
      rules.push({ pattern: 'mbs-auto', properties: { 'margin-block-start': 'auto' } })
      rules.push({ pattern: 'mbe-auto', properties: { 'margin-block-end': 'auto' } })
      rules.push({ pattern: 'mli-auto', properties: { 'margin-inline': 'auto' } })
      rules.push({ pattern: 'mlb-auto', properties: { 'margin-block': 'auto' } })

      // Gap
      rules.push(...createSpacingRules('gap', ['gap'], spacing))
      rules.push(...createSpacingRules('gap-x', ['column-gap'], spacing))
      rules.push(...createSpacingRules('gap-y', ['row-gap'], spacing))

      // Space between (uses > * + * selector)
      for (const [key, value] of Object.entries(spacing)) {
        rules.push({
          pattern: `space-x-${key}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'margin-left': value },
        })
        rules.push({
          pattern: `space-y-${key}`,
          selector: (s) => `${s} > * + *`,
          properties: { 'margin-top': value },
        })
      }

      // Space reverse
      rules.push({
        pattern: 'space-x-reverse',
        selector: (s) => `${s} > * + *`,
        properties: {
          '--coral-space-x-reverse': '1',
          'margin-right': 'calc(var(--coral-space-x) * var(--coral-space-x-reverse))',
          'margin-left': 'calc(var(--coral-space-x) * calc(1 - var(--coral-space-x-reverse)))',
        },
      })
      rules.push({
        pattern: 'space-y-reverse',
        selector: (s) => `${s} > * + *`,
        properties: {
          '--coral-space-y-reverse': '1',
          'margin-bottom': 'calc(var(--coral-space-y) * var(--coral-space-y-reverse))',
          'margin-top': 'calc(var(--coral-space-y) * calc(1 - var(--coral-space-y-reverse)))',
        },
      })

      // Arbitrary space values
      rules.push({
        pattern: /^space-x-\[(.+)\]$/,
        selector: (s) => `${s} > * + *`,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'margin-left': v } } },
      })
      rules.push({
        pattern: /^space-y-\[(.+)\]$/,
        selector: (s) => `${s} > * + *`,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'margin-top': v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default spacingPlugin
