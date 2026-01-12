/**
 * Typography Utilities Plugin
 *
 * Font, text, and typography utilities.
 * @module plugins/core/utilities/typography
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textDecorationThickness,
  textUnderlineOffset,
} from '../../../theme'

/**
 * Typography utilities plugin
 */
export function typographyPlugin(): Plugin {
  return {
    name: 'typography',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Font family
      for (const [key, value] of Object.entries(fonts)) {
        rules.push({
          pattern: `font-${key}`,
          properties: { 'font-family': Array.isArray(value) ? value.join(', ') : value },
        })
      }

      // Font size
      for (const [key, value] of Object.entries(fontSizes)) {
        if (typeof value === 'object' && 'fontSize' in value) {
          rules.push({
            pattern: `text-${key}`,
            properties: {
              'font-size': value.fontSize,
              'line-height': value.lineHeight,
            },
          })
        }
      }

      // Font weight
      for (const [key, value] of Object.entries(fontWeights)) {
        rules.push({
          pattern: `font-${key}`,
          properties: { 'font-weight': value },
        })
      }

      // Font style
      rules.push({ pattern: 'italic', properties: { 'font-style': 'italic' } })
      rules.push({ pattern: 'not-italic', properties: { 'font-style': 'normal' } })

      // Font variant numeric
      rules.push({ pattern: 'normal-nums', properties: { 'font-variant-numeric': 'normal' } })
      rules.push({ pattern: 'ordinal', properties: { 'font-variant-numeric': 'ordinal' } })
      rules.push({ pattern: 'slashed-zero', properties: { 'font-variant-numeric': 'slashed-zero' } })
      rules.push({ pattern: 'lining-nums', properties: { 'font-variant-numeric': 'lining-nums' } })
      rules.push({ pattern: 'oldstyle-nums', properties: { 'font-variant-numeric': 'oldstyle-nums' } })
      rules.push({ pattern: 'proportional-nums', properties: { 'font-variant-numeric': 'proportional-nums' } })
      rules.push({ pattern: 'tabular-nums', properties: { 'font-variant-numeric': 'tabular-nums' } })
      rules.push({ pattern: 'diagonal-fractions', properties: { 'font-variant-numeric': 'diagonal-fractions' } })
      rules.push({ pattern: 'stacked-fractions', properties: { 'font-variant-numeric': 'stacked-fractions' } })

      // Line height
      for (const [key, value] of Object.entries(lineHeights)) {
        rules.push({
          pattern: `leading-${key}`,
          properties: { 'line-height': value },
        })
      }

      // Letter spacing
      for (const [key, value] of Object.entries(letterSpacing)) {
        rules.push({
          pattern: `tracking-${key}`,
          properties: { 'letter-spacing': value },
        })
      }

      // Text alignment
      rules.push({ pattern: 'text-left', properties: { 'text-align': 'left' } })
      rules.push({ pattern: 'text-center', properties: { 'text-align': 'center' } })
      rules.push({ pattern: 'text-right', properties: { 'text-align': 'right' } })
      rules.push({ pattern: 'text-justify', properties: { 'text-align': 'justify' } })
      rules.push({ pattern: 'text-start', properties: { 'text-align': 'start' } })
      rules.push({ pattern: 'text-end', properties: { 'text-align': 'end' } })

      // Vertical alignment
      rules.push({ pattern: 'align-baseline', properties: { 'vertical-align': 'baseline' } })
      rules.push({ pattern: 'align-top', properties: { 'vertical-align': 'top' } })
      rules.push({ pattern: 'align-middle', properties: { 'vertical-align': 'middle' } })
      rules.push({ pattern: 'align-bottom', properties: { 'vertical-align': 'bottom' } })
      rules.push({ pattern: 'align-text-top', properties: { 'vertical-align': 'text-top' } })
      rules.push({ pattern: 'align-text-bottom', properties: { 'vertical-align': 'text-bottom' } })
      rules.push({ pattern: 'align-sub', properties: { 'vertical-align': 'sub' } })
      rules.push({ pattern: 'align-super', properties: { 'vertical-align': 'super' } })

      // Text decoration
      rules.push({ pattern: 'underline', properties: { 'text-decoration-line': 'underline' } })
      rules.push({ pattern: 'overline', properties: { 'text-decoration-line': 'overline' } })
      rules.push({ pattern: 'line-through', properties: { 'text-decoration-line': 'line-through' } })
      rules.push({ pattern: 'no-underline', properties: { 'text-decoration-line': 'none' } })

      // Text decoration style
      rules.push({ pattern: 'decoration-solid', properties: { 'text-decoration-style': 'solid' } })
      rules.push({ pattern: 'decoration-double', properties: { 'text-decoration-style': 'double' } })
      rules.push({ pattern: 'decoration-dotted', properties: { 'text-decoration-style': 'dotted' } })
      rules.push({ pattern: 'decoration-dashed', properties: { 'text-decoration-style': 'dashed' } })
      rules.push({ pattern: 'decoration-wavy', properties: { 'text-decoration-style': 'wavy' } })

      // Text decoration thickness
      for (const [key, value] of Object.entries(textDecorationThickness)) {
        rules.push({
          pattern: `decoration-${key}`,
          properties: { 'text-decoration-thickness': value },
        })
      }

      // Text underline offset
      for (const [key, value] of Object.entries(textUnderlineOffset)) {
        rules.push({
          pattern: `underline-offset-${key}`,
          properties: { 'text-underline-offset': value },
        })
      }

      // Text transform
      rules.push({ pattern: 'uppercase', properties: { 'text-transform': 'uppercase' } })
      rules.push({ pattern: 'lowercase', properties: { 'text-transform': 'lowercase' } })
      rules.push({ pattern: 'capitalize', properties: { 'text-transform': 'capitalize' } })
      rules.push({ pattern: 'normal-case', properties: { 'text-transform': 'none' } })

      // Text overflow
      rules.push({ pattern: 'truncate', properties: {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      }})
      rules.push({ pattern: 'text-ellipsis', properties: { 'text-overflow': 'ellipsis' } })
      rules.push({ pattern: 'text-clip', properties: { 'text-overflow': 'clip' } })

      // Text wrap (including Tailwind 4 additions)
      rules.push({ pattern: 'text-wrap', properties: { 'text-wrap': 'wrap' } })
      rules.push({ pattern: 'text-nowrap', properties: { 'text-wrap': 'nowrap' } })
      rules.push({ pattern: 'text-balance', properties: { 'text-wrap': 'balance' } })
      rules.push({ pattern: 'text-pretty', properties: { 'text-wrap': 'pretty' } })
      rules.push({ pattern: 'text-stable', properties: { 'text-wrap': 'stable' } })

      // Font variant caps
      rules.push({ pattern: 'small-caps', properties: { 'font-variant-caps': 'small-caps' } })
      rules.push({ pattern: 'all-small-caps', properties: { 'font-variant-caps': 'all-small-caps' } })
      rules.push({ pattern: 'petite-caps', properties: { 'font-variant-caps': 'petite-caps' } })
      rules.push({ pattern: 'all-petite-caps', properties: { 'font-variant-caps': 'all-petite-caps' } })
      rules.push({ pattern: 'unicase', properties: { 'font-variant-caps': 'unicase' } })
      rules.push({ pattern: 'titling-caps', properties: { 'font-variant-caps': 'titling-caps' } })
      rules.push({ pattern: 'normal-caps', properties: { 'font-variant-caps': 'normal' } })

      // Font stretch
      rules.push({ pattern: 'font-stretch-ultra-condensed', properties: { 'font-stretch': 'ultra-condensed' } })
      rules.push({ pattern: 'font-stretch-extra-condensed', properties: { 'font-stretch': 'extra-condensed' } })
      rules.push({ pattern: 'font-stretch-condensed', properties: { 'font-stretch': 'condensed' } })
      rules.push({ pattern: 'font-stretch-semi-condensed', properties: { 'font-stretch': 'semi-condensed' } })
      rules.push({ pattern: 'font-stretch-normal', properties: { 'font-stretch': 'normal' } })
      rules.push({ pattern: 'font-stretch-semi-expanded', properties: { 'font-stretch': 'semi-expanded' } })
      rules.push({ pattern: 'font-stretch-expanded', properties: { 'font-stretch': 'expanded' } })
      rules.push({ pattern: 'font-stretch-extra-expanded', properties: { 'font-stretch': 'extra-expanded' } })
      rules.push({ pattern: 'font-stretch-ultra-expanded', properties: { 'font-stretch': 'ultra-expanded' } })

      // Font synthesis
      rules.push({ pattern: 'font-synthesis-none', properties: { 'font-synthesis': 'none' } })
      rules.push({ pattern: 'font-synthesis-weight', properties: { 'font-synthesis': 'weight' } })
      rules.push({ pattern: 'font-synthesis-style', properties: { 'font-synthesis': 'style' } })
      rules.push({ pattern: 'font-synthesis-small-caps', properties: { 'font-synthesis': 'small-caps' } })

      // Text spacing (Tailwind 4 feature)
      rules.push({ pattern: 'text-spacing-normal', properties: { 'text-autospace': 'normal' } })
      rules.push({ pattern: 'text-spacing-none', properties: { 'text-autospace': 'no-autospace' } })
      rules.push({ pattern: 'text-spacing-trim-start', properties: { 'text-spacing-trim': 'space-first' } })
      rules.push({ pattern: 'text-spacing-trim-end', properties: { 'text-spacing-trim': 'space-all' } })
      rules.push({ pattern: 'text-spacing-trim-both', properties: { 'text-spacing-trim': 'trim-both' } })

      // Initial letter (drop caps)
      rules.push({ pattern: 'initial-letter-normal', properties: { 'initial-letter': 'normal' } })
      rules.push({ pattern: 'initial-letter-2', properties: { 'initial-letter': '2' } })
      rules.push({ pattern: 'initial-letter-3', properties: { 'initial-letter': '3' } })
      rules.push({ pattern: 'initial-letter-4', properties: { 'initial-letter': '4' } })
      rules.push({ pattern: 'initial-letter-5', properties: { 'initial-letter': '5' } })
      rules.push({
        pattern: /^initial-letter-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'initial-letter': v } }
        },
      })

      // Font optical sizing
      rules.push({ pattern: 'font-optical-auto', properties: { 'font-optical-sizing': 'auto' } })
      rules.push({ pattern: 'font-optical-none', properties: { 'font-optical-sizing': 'none' } })

      // Text indent
      rules.push({
        pattern: /^indent-(\d+)$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'text-indent': `${parseInt(v, 10) * 0.25}rem` } }
        },
      })

      // Whitespace
      rules.push({ pattern: 'whitespace-normal', properties: { 'white-space': 'normal' } })
      rules.push({ pattern: 'whitespace-nowrap', properties: { 'white-space': 'nowrap' } })
      rules.push({ pattern: 'whitespace-pre', properties: { 'white-space': 'pre' } })
      rules.push({ pattern: 'whitespace-pre-line', properties: { 'white-space': 'pre-line' } })
      rules.push({ pattern: 'whitespace-pre-wrap', properties: { 'white-space': 'pre-wrap' } })
      rules.push({ pattern: 'whitespace-break-spaces', properties: { 'white-space': 'break-spaces' } })

      // Word break
      rules.push({ pattern: 'break-normal', properties: { 'overflow-wrap': 'normal', 'word-break': 'normal' } })
      rules.push({ pattern: 'break-words', properties: { 'overflow-wrap': 'break-word' } })
      rules.push({ pattern: 'break-all', properties: { 'word-break': 'break-all' } })
      rules.push({ pattern: 'break-keep', properties: { 'word-break': 'keep-all' } })

      // ========================================
      // OVERFLOW WRAP (Tailwind 4.1+)
      // ========================================

      // Overflow wrap utilities
      rules.push({
        pattern: 'wrap-normal',
        generate: () => ({
          properties: {
            'overflow-wrap': 'normal',
            'word-break': 'normal'
          }
        })
      })

      rules.push({
        pattern: 'wrap-break-word',
        generate: () => ({
          properties: {
            'overflow-wrap': 'break-word'
          }
        })
      })

      rules.push({
        pattern: 'wrap-anywhere',
        generate: () => ({
          properties: {
            'overflow-wrap': 'anywhere'
          }
        })
      })

      // ========================================
      // END OVERFLOW WRAP
      // ========================================

      // Hyphens
      rules.push({ pattern: 'hyphens-none', properties: { hyphens: 'none' } })
      rules.push({ pattern: 'hyphens-manual', properties: { hyphens: 'manual' } })
      rules.push({ pattern: 'hyphens-auto', properties: { hyphens: 'auto' } })

      // ========================================
      // EXTENDED HYPHENATION (Beyond Tailwind 4)
      // ========================================

      // Hyphenate limit chars (minimum characters before/after hyphen)
      // Format: hyphenate-limit-chars: word before after
      rules.push({ pattern: 'hyphenate-limit-chars-auto', properties: { 'hyphenate-limit-chars': 'auto' } })
      rules.push({ pattern: 'hyphenate-limit-chars-5', properties: { 'hyphenate-limit-chars': '5' } })
      rules.push({ pattern: 'hyphenate-limit-chars-6', properties: { 'hyphenate-limit-chars': '6' } })
      rules.push({ pattern: 'hyphenate-limit-chars-8', properties: { 'hyphenate-limit-chars': '8' } })
      rules.push({ pattern: 'hyphenate-limit-chars-10', properties: { 'hyphenate-limit-chars': '10' } })
      rules.push({ pattern: 'hyphenate-limit-chars-5-2-2', properties: { 'hyphenate-limit-chars': '5 2 2' } })
      rules.push({ pattern: 'hyphenate-limit-chars-6-3-3', properties: { 'hyphenate-limit-chars': '6 3 3' } })
      rules.push({ pattern: 'hyphenate-limit-chars-8-3-3', properties: { 'hyphenate-limit-chars': '8 3 3' } })

      rules.push({
        pattern: /^hyphenate-limit-chars-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'hyphenate-limit-chars': v.replace(/_/g, ' ') } }
        },
      })

      // Hyphenate limit lines (max consecutive hyphenated lines)
      rules.push({ pattern: 'hyphenate-limit-lines-none', properties: { 'hyphenate-limit-lines': 'no-limit' } })
      rules.push({ pattern: 'hyphenate-limit-lines-1', properties: { 'hyphenate-limit-lines': '1' } })
      rules.push({ pattern: 'hyphenate-limit-lines-2', properties: { 'hyphenate-limit-lines': '2' } })
      rules.push({ pattern: 'hyphenate-limit-lines-3', properties: { 'hyphenate-limit-lines': '3' } })
      rules.push({ pattern: 'hyphenate-limit-lines-4', properties: { 'hyphenate-limit-lines': '4' } })

      rules.push({
        pattern: /^hyphenate-limit-lines-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'hyphenate-limit-lines': v } }
        },
      })

      // Hyphenate limit zone (minimum space before triggering hyphenation)
      rules.push({ pattern: 'hyphenate-limit-zone-5', properties: { 'hyphenate-limit-zone': '5%' } })
      rules.push({ pattern: 'hyphenate-limit-zone-10', properties: { 'hyphenate-limit-zone': '10%' } })
      rules.push({ pattern: 'hyphenate-limit-zone-15', properties: { 'hyphenate-limit-zone': '15%' } })
      rules.push({ pattern: 'hyphenate-limit-zone-20', properties: { 'hyphenate-limit-zone': '20%' } })
      rules.push({ pattern: 'hyphenate-limit-zone-1rem', properties: { 'hyphenate-limit-zone': '1rem' } })
      rules.push({ pattern: 'hyphenate-limit-zone-2rem', properties: { 'hyphenate-limit-zone': '2rem' } })

      rules.push({
        pattern: /^hyphenate-limit-zone-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'hyphenate-limit-zone': v } }
        },
      })

      // Hyphenate limit last (control hyphenation of last word)
      rules.push({ pattern: 'hyphenate-limit-last-none', properties: { 'hyphenate-limit-last': 'none' } })
      rules.push({ pattern: 'hyphenate-limit-last-always', properties: { 'hyphenate-limit-last': 'always' } })
      rules.push({ pattern: 'hyphenate-limit-last-column', properties: { 'hyphenate-limit-last': 'column' } })
      rules.push({ pattern: 'hyphenate-limit-last-page', properties: { 'hyphenate-limit-last': 'page' } })
      rules.push({ pattern: 'hyphenate-limit-last-spread', properties: { 'hyphenate-limit-last': 'spread' } })

      // Hyphenation character
      rules.push({ pattern: 'hyphenate-character-auto', properties: { 'hyphenate-character': 'auto' } })
      rules.push({
        pattern: /^hyphenate-character-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'hyphenate-character': `"${v}"` } }
        },
      })

      // ========================================
      // WORD SPACING (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'word-spacing-normal', properties: { 'word-spacing': 'normal' } })
      rules.push({ pattern: 'word-spacing-tighter', properties: { 'word-spacing': '-0.05em' } })
      rules.push({ pattern: 'word-spacing-tight', properties: { 'word-spacing': '-0.025em' } })
      rules.push({ pattern: 'word-spacing-wide', properties: { 'word-spacing': '0.025em' } })
      rules.push({ pattern: 'word-spacing-wider', properties: { 'word-spacing': '0.05em' } })
      rules.push({ pattern: 'word-spacing-widest', properties: { 'word-spacing': '0.1em' } })

      rules.push({
        pattern: /^word-spacing-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'word-spacing': v } }
        },
      })

      // ========================================
      // OVERFLOW WRAP (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'overflow-wrap-normal', properties: { 'overflow-wrap': 'normal' } })
      rules.push({ pattern: 'overflow-wrap-anywhere', properties: { 'overflow-wrap': 'anywhere' } })
      rules.push({ pattern: 'overflow-wrap-break-word', properties: { 'overflow-wrap': 'break-word' } })

      // ========================================
      // LINE BREAK (CJK & International)
      // ========================================

      rules.push({ pattern: 'line-break-auto', properties: { 'line-break': 'auto' } })
      rules.push({ pattern: 'line-break-loose', properties: { 'line-break': 'loose' } })
      rules.push({ pattern: 'line-break-normal', properties: { 'line-break': 'normal' } })
      rules.push({ pattern: 'line-break-strict', properties: { 'line-break': 'strict' } })
      rules.push({ pattern: 'line-break-anywhere', properties: { 'line-break': 'anywhere' } })

      // ========================================
      // TEXT JUSTIFY (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'text-justify-auto', properties: { 'text-justify': 'auto' } })
      rules.push({ pattern: 'text-justify-none', properties: { 'text-justify': 'none' } })
      rules.push({ pattern: 'text-justify-inter-word', properties: { 'text-justify': 'inter-word' } })
      rules.push({ pattern: 'text-justify-inter-character', properties: { 'text-justify': 'inter-character' } })

      // ========================================
      // WIDOWS & ORPHANS (Print/Pagination)
      // ========================================

      rules.push({ pattern: 'widows-1', properties: { widows: '1' } })
      rules.push({ pattern: 'widows-2', properties: { widows: '2' } })
      rules.push({ pattern: 'widows-3', properties: { widows: '3' } })
      rules.push({ pattern: 'widows-4', properties: { widows: '4' } })

      rules.push({
        pattern: /^widows-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { widows: v } }
        },
      })

      rules.push({ pattern: 'orphans-1', properties: { orphans: '1' } })
      rules.push({ pattern: 'orphans-2', properties: { orphans: '2' } })
      rules.push({ pattern: 'orphans-3', properties: { orphans: '3' } })
      rules.push({ pattern: 'orphans-4', properties: { orphans: '4' } })

      rules.push({
        pattern: /^orphans-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { orphans: v } }
        },
      })

      // ========================================
      // TEXT COMBINE UPRIGHT (Vertical Writing)
      // ========================================

      rules.push({ pattern: 'text-combine-none', properties: { 'text-combine-upright': 'none' } })
      rules.push({ pattern: 'text-combine-all', properties: { 'text-combine-upright': 'all' } })
      rules.push({ pattern: 'text-combine-digits-2', properties: { 'text-combine-upright': 'digits 2' } })
      rules.push({ pattern: 'text-combine-digits-3', properties: { 'text-combine-upright': 'digits 3' } })
      rules.push({ pattern: 'text-combine-digits-4', properties: { 'text-combine-upright': 'digits 4' } })

      // ========================================
      // TEXT ORIENTATION (Vertical Writing)
      // ========================================

      rules.push({ pattern: 'text-orientation-mixed', properties: { 'text-orientation': 'mixed' } })
      rules.push({ pattern: 'text-orientation-upright', properties: { 'text-orientation': 'upright' } })
      rules.push({ pattern: 'text-orientation-sideways', properties: { 'text-orientation': 'sideways' } })
      rules.push({ pattern: 'text-orientation-sideways-right', properties: { 'text-orientation': 'sideways-right' } })

      // ========================================
      // TAB SIZE (Code Formatting)
      // ========================================

      rules.push({ pattern: 'tab-0', properties: { 'tab-size': '0' } })
      rules.push({ pattern: 'tab-2', properties: { 'tab-size': '2' } })
      rules.push({ pattern: 'tab-4', properties: { 'tab-size': '4' } })
      rules.push({ pattern: 'tab-8', properties: { 'tab-size': '8' } })

      rules.push({
        pattern: /^tab-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'tab-size': v } }
        },
      })

      // ========================================
      // FONT KERNING
      // ========================================

      rules.push({ pattern: 'font-kerning-auto', properties: { 'font-kerning': 'auto' } })
      rules.push({ pattern: 'font-kerning-normal', properties: { 'font-kerning': 'normal' } })
      rules.push({ pattern: 'font-kerning-none', properties: { 'font-kerning': 'none' } })

      // ========================================
      // FONT VARIANT ALTERNATES
      // ========================================

      rules.push({ pattern: 'font-variant-alternates-normal', properties: { 'font-variant-alternates': 'normal' } })
      rules.push({ pattern: 'font-variant-alternates-historical', properties: { 'font-variant-alternates': 'historical-forms' } })

      // ========================================
      // FONT VARIANT LIGATURES
      // ========================================

      rules.push({ pattern: 'font-ligatures-normal', properties: { 'font-variant-ligatures': 'normal' } })
      rules.push({ pattern: 'font-ligatures-none', properties: { 'font-variant-ligatures': 'none' } })
      rules.push({ pattern: 'font-ligatures-common', properties: { 'font-variant-ligatures': 'common-ligatures' } })
      rules.push({ pattern: 'font-ligatures-no-common', properties: { 'font-variant-ligatures': 'no-common-ligatures' } })
      rules.push({ pattern: 'font-ligatures-discretionary', properties: { 'font-variant-ligatures': 'discretionary-ligatures' } })
      rules.push({ pattern: 'font-ligatures-no-discretionary', properties: { 'font-variant-ligatures': 'no-discretionary-ligatures' } })
      rules.push({ pattern: 'font-ligatures-historical', properties: { 'font-variant-ligatures': 'historical-ligatures' } })
      rules.push({ pattern: 'font-ligatures-no-historical', properties: { 'font-variant-ligatures': 'no-historical-ligatures' } })
      rules.push({ pattern: 'font-ligatures-contextual', properties: { 'font-variant-ligatures': 'contextual' } })
      rules.push({ pattern: 'font-ligatures-no-contextual', properties: { 'font-variant-ligatures': 'no-contextual' } })

      // ========================================
      // FONT VARIANT POSITION
      // ========================================

      rules.push({ pattern: 'font-position-normal', properties: { 'font-variant-position': 'normal' } })
      rules.push({ pattern: 'font-position-sub', properties: { 'font-variant-position': 'sub' } })
      rules.push({ pattern: 'font-position-super', properties: { 'font-variant-position': 'super' } })

      // ========================================
      // FONT VARIANT EAST ASIAN
      // ========================================

      rules.push({ pattern: 'font-east-asian-normal', properties: { 'font-variant-east-asian': 'normal' } })
      rules.push({ pattern: 'font-east-asian-jis78', properties: { 'font-variant-east-asian': 'jis78' } })
      rules.push({ pattern: 'font-east-asian-jis83', properties: { 'font-variant-east-asian': 'jis83' } })
      rules.push({ pattern: 'font-east-asian-jis90', properties: { 'font-variant-east-asian': 'jis90' } })
      rules.push({ pattern: 'font-east-asian-jis04', properties: { 'font-variant-east-asian': 'jis04' } })
      rules.push({ pattern: 'font-east-asian-simplified', properties: { 'font-variant-east-asian': 'simplified' } })
      rules.push({ pattern: 'font-east-asian-traditional', properties: { 'font-variant-east-asian': 'traditional' } })
      rules.push({ pattern: 'font-east-asian-full-width', properties: { 'font-variant-east-asian': 'full-width' } })
      rules.push({ pattern: 'font-east-asian-proportional', properties: { 'font-variant-east-asian': 'proportional-width' } })
      rules.push({ pattern: 'font-east-asian-ruby', properties: { 'font-variant-east-asian': 'ruby' } })

      // ========================================
      // FONT FEATURE SETTINGS (OpenType Features)
      // ========================================

      // Common OpenType features
      rules.push({ pattern: 'font-feature-normal', properties: { 'font-feature-settings': 'normal' } })

      // Ligatures
      rules.push({ pattern: 'font-feature-liga', properties: { 'font-feature-settings': '"liga" 1' } })
      rules.push({ pattern: 'font-feature-liga-off', properties: { 'font-feature-settings': '"liga" 0' } })
      rules.push({ pattern: 'font-feature-dlig', properties: { 'font-feature-settings': '"dlig" 1' } })
      rules.push({ pattern: 'font-feature-dlig-off', properties: { 'font-feature-settings': '"dlig" 0' } })
      rules.push({ pattern: 'font-feature-hlig', properties: { 'font-feature-settings': '"hlig" 1' } })
      rules.push({ pattern: 'font-feature-clig', properties: { 'font-feature-settings': '"clig" 1' } })

      // Small caps and capitals
      rules.push({ pattern: 'font-feature-smcp', properties: { 'font-feature-settings': '"smcp" 1' } })
      rules.push({ pattern: 'font-feature-c2sc', properties: { 'font-feature-settings': '"c2sc" 1' } })
      rules.push({ pattern: 'font-feature-pcap', properties: { 'font-feature-settings': '"pcap" 1' } })
      rules.push({ pattern: 'font-feature-c2pc', properties: { 'font-feature-settings': '"c2pc" 1' } })
      rules.push({ pattern: 'font-feature-titl', properties: { 'font-feature-settings': '"titl" 1' } })
      rules.push({ pattern: 'font-feature-unic', properties: { 'font-feature-settings': '"unic" 1' } })

      // Numeric features
      rules.push({ pattern: 'font-feature-lnum', properties: { 'font-feature-settings': '"lnum" 1' } })
      rules.push({ pattern: 'font-feature-onum', properties: { 'font-feature-settings': '"onum" 1' } })
      rules.push({ pattern: 'font-feature-pnum', properties: { 'font-feature-settings': '"pnum" 1' } })
      rules.push({ pattern: 'font-feature-tnum', properties: { 'font-feature-settings': '"tnum" 1' } })
      rules.push({ pattern: 'font-feature-frac', properties: { 'font-feature-settings': '"frac" 1' } })
      rules.push({ pattern: 'font-feature-afrc', properties: { 'font-feature-settings': '"afrc" 1' } })
      rules.push({ pattern: 'font-feature-zero', properties: { 'font-feature-settings': '"zero" 1' } })
      rules.push({ pattern: 'font-feature-ordn', properties: { 'font-feature-settings': '"ordn" 1' } })
      rules.push({ pattern: 'font-feature-sinf', properties: { 'font-feature-settings': '"sinf" 1' } })
      rules.push({ pattern: 'font-feature-sups', properties: { 'font-feature-settings': '"sups" 1' } })
      rules.push({ pattern: 'font-feature-subs', properties: { 'font-feature-settings': '"subs" 1' } })

      // Swash & alternates
      rules.push({ pattern: 'font-feature-swsh', properties: { 'font-feature-settings': '"swsh" 1' } })
      rules.push({ pattern: 'font-feature-cswh', properties: { 'font-feature-settings': '"cswh" 1' } })
      rules.push({ pattern: 'font-feature-calt', properties: { 'font-feature-settings': '"calt" 1' } })
      rules.push({ pattern: 'font-feature-calt-off', properties: { 'font-feature-settings': '"calt" 0' } })
      rules.push({ pattern: 'font-feature-salt', properties: { 'font-feature-settings': '"salt" 1' } })
      rules.push({ pattern: 'font-feature-hist', properties: { 'font-feature-settings': '"hist" 1' } })

      // Stylistic sets (ss01-ss20)
      for (let i = 1; i <= 20; i++) {
        const num = i.toString().padStart(2, '0')
        rules.push({
          pattern: `font-feature-ss${num}`,
          properties: { 'font-feature-settings': `"ss${num}" 1` },
        })
      }

      // Character variants (cv01-cv99)
      for (let i = 1; i <= 20; i++) {
        const num = i.toString().padStart(2, '0')
        rules.push({
          pattern: `font-feature-cv${num}`,
          properties: { 'font-feature-settings': `"cv${num}" 1` },
        })
      }

      // Kerning
      rules.push({ pattern: 'font-feature-kern', properties: { 'font-feature-settings': '"kern" 1' } })
      rules.push({ pattern: 'font-feature-kern-off', properties: { 'font-feature-settings': '"kern" 0' } })

      // Case-sensitive forms
      rules.push({ pattern: 'font-feature-case', properties: { 'font-feature-settings': '"case" 1' } })

      // Localized forms
      rules.push({ pattern: 'font-feature-locl', properties: { 'font-feature-settings': '"locl" 1' } })

      // CJK forms
      rules.push({ pattern: 'font-feature-jp78', properties: { 'font-feature-settings': '"jp78" 1' } })
      rules.push({ pattern: 'font-feature-jp83', properties: { 'font-feature-settings': '"jp83" 1' } })
      rules.push({ pattern: 'font-feature-jp90', properties: { 'font-feature-settings': '"jp90" 1' } })
      rules.push({ pattern: 'font-feature-jp04', properties: { 'font-feature-settings': '"jp04" 1' } })
      rules.push({ pattern: 'font-feature-smpl', properties: { 'font-feature-settings': '"smpl" 1' } })
      rules.push({ pattern: 'font-feature-trad', properties: { 'font-feature-settings': '"trad" 1' } })
      rules.push({ pattern: 'font-feature-fwid', properties: { 'font-feature-settings': '"fwid" 1' } })
      rules.push({ pattern: 'font-feature-pwid', properties: { 'font-feature-settings': '"pwid" 1' } })
      rules.push({ pattern: 'font-feature-ruby', properties: { 'font-feature-settings': '"ruby" 1' } })
      rules.push({ pattern: 'font-feature-hwid', properties: { 'font-feature-settings': '"hwid" 1' } })
      rules.push({ pattern: 'font-feature-vrt2', properties: { 'font-feature-settings': '"vrt2" 1' } })
      rules.push({ pattern: 'font-feature-vert', properties: { 'font-feature-settings': '"vert" 1' } })
      rules.push({ pattern: 'font-feature-vkrn', properties: { 'font-feature-settings': '"vkrn" 1' } })
      rules.push({ pattern: 'font-feature-vpal', properties: { 'font-feature-settings': '"vpal" 1' } })
      rules.push({ pattern: 'font-feature-vhal', properties: { 'font-feature-settings': '"vhal" 1' } })

      // Math features
      rules.push({ pattern: 'font-feature-ssty', properties: { 'font-feature-settings': '"ssty" 1' } })
      rules.push({ pattern: 'font-feature-dtls', properties: { 'font-feature-settings': '"dtls" 1' } })
      rules.push({ pattern: 'font-feature-flac', properties: { 'font-feature-settings': '"flac" 1' } })

      // Arbitrary font-feature-settings
      rules.push({
        pattern: /^font-feature-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'font-feature-settings': v.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // FONT VARIATION SETTINGS (Variable Fonts)
      // ========================================

      rules.push({ pattern: 'font-variation-normal', properties: { 'font-variation-settings': 'normal' } })

      // Common variable font axes
      rules.push({ pattern: 'font-variation-wght-100', properties: { 'font-variation-settings': '"wght" 100' } })
      rules.push({ pattern: 'font-variation-wght-200', properties: { 'font-variation-settings': '"wght" 200' } })
      rules.push({ pattern: 'font-variation-wght-300', properties: { 'font-variation-settings': '"wght" 300' } })
      rules.push({ pattern: 'font-variation-wght-400', properties: { 'font-variation-settings': '"wght" 400' } })
      rules.push({ pattern: 'font-variation-wght-500', properties: { 'font-variation-settings': '"wght" 500' } })
      rules.push({ pattern: 'font-variation-wght-600', properties: { 'font-variation-settings': '"wght" 600' } })
      rules.push({ pattern: 'font-variation-wght-700', properties: { 'font-variation-settings': '"wght" 700' } })
      rules.push({ pattern: 'font-variation-wght-800', properties: { 'font-variation-settings': '"wght" 800' } })
      rules.push({ pattern: 'font-variation-wght-900', properties: { 'font-variation-settings': '"wght" 900' } })

      // Width axis (wdth)
      rules.push({ pattern: 'font-variation-wdth-75', properties: { 'font-variation-settings': '"wdth" 75' } })
      rules.push({ pattern: 'font-variation-wdth-100', properties: { 'font-variation-settings': '"wdth" 100' } })
      rules.push({ pattern: 'font-variation-wdth-125', properties: { 'font-variation-settings': '"wdth" 125' } })

      // Slant axis (slnt)
      rules.push({ pattern: 'font-variation-slnt-0', properties: { 'font-variation-settings': '"slnt" 0' } })
      rules.push({ pattern: 'font-variation-slnt-6', properties: { 'font-variation-settings': '"slnt" -6' } })
      rules.push({ pattern: 'font-variation-slnt-12', properties: { 'font-variation-settings': '"slnt" -12' } })

      // Italic axis (ital)
      rules.push({ pattern: 'font-variation-ital-0', properties: { 'font-variation-settings': '"ital" 0' } })
      rules.push({ pattern: 'font-variation-ital-1', properties: { 'font-variation-settings': '"ital" 1' } })

      // Optical size (opsz)
      rules.push({ pattern: 'font-variation-opsz-8', properties: { 'font-variation-settings': '"opsz" 8' } })
      rules.push({ pattern: 'font-variation-opsz-12', properties: { 'font-variation-settings': '"opsz" 12' } })
      rules.push({ pattern: 'font-variation-opsz-16', properties: { 'font-variation-settings': '"opsz" 16' } })
      rules.push({ pattern: 'font-variation-opsz-24', properties: { 'font-variation-settings': '"opsz" 24' } })
      rules.push({ pattern: 'font-variation-opsz-48', properties: { 'font-variation-settings': '"opsz" 48' } })
      rules.push({ pattern: 'font-variation-opsz-72', properties: { 'font-variation-settings': '"opsz" 72' } })
      rules.push({ pattern: 'font-variation-opsz-144', properties: { 'font-variation-settings': '"opsz" 144' } })

      // Grade axis (GRAD)
      rules.push({ pattern: 'font-variation-grad-n50', properties: { 'font-variation-settings': '"GRAD" -50' } })
      rules.push({ pattern: 'font-variation-grad-0', properties: { 'font-variation-settings': '"GRAD" 0' } })
      rules.push({ pattern: 'font-variation-grad-50', properties: { 'font-variation-settings': '"GRAD" 50' } })
      rules.push({ pattern: 'font-variation-grad-150', properties: { 'font-variation-settings': '"GRAD" 150' } })

      // Arbitrary font-variation-settings
      rules.push({
        pattern: /^font-variation-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'font-variation-settings': v.replace(/_/g, ' ') } }
        },
      })

      // Content
      rules.push({ pattern: 'content-none', properties: { content: 'none' } })

      // Line clamp
      for (let i = 1; i <= 6; i++) {
        rules.push({
          pattern: `line-clamp-${i}`,
          properties: {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': String(i),
          },
        })
      }
      rules.push({ pattern: 'line-clamp-none', properties: {
        overflow: 'visible',
        display: 'block',
        '-webkit-box-orient': 'horizontal',
        '-webkit-line-clamp': 'none',
      }})

      // Arbitrary values
      rules.push({
        pattern: /^text-\[(.+)\]$/,
        handler: (match): { properties: Record<string, string> } | null => {
          const value = match[1]
          if (!value) {return null}
          // Check if it's a font size (has rem, px, em, etc.)
          if (/^\d/.test(value) || value.includes('rem') || value.includes('px') || value.includes('em')) {
            return { properties: { 'font-size': value } }
          }
          // Otherwise treat as color
          return { properties: { color: value } }
        },
      })
      rules.push({
        pattern: /^font-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'font-family': v } } },
      })
      rules.push({
        pattern: /^leading-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'line-height': v } } },
      })
      rules.push({
        pattern: /^tracking-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) {return null;} return { properties: { 'letter-spacing': v } } },
      })

      // ========================================
      // TEXT SHADOW (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'text-shadow-none', properties: { 'text-shadow': 'none' } })
      rules.push({ pattern: 'text-shadow-sm', properties: { 'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)' } })
      rules.push({ pattern: 'text-shadow', properties: { 'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)' } })
      rules.push({ pattern: 'text-shadow-md', properties: { 'text-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)' } })
      rules.push({ pattern: 'text-shadow-lg', properties: { 'text-shadow': '0 8px 16px rgba(0, 0, 0, 0.15)' } })
      rules.push({ pattern: 'text-shadow-xl', properties: { 'text-shadow': '0 16px 32px rgba(0, 0, 0, 0.2)' } })

      // Colored text shadows
      rules.push({ pattern: 'text-shadow-primary', properties: { 'text-shadow': '0 2px 8px var(--coral-primary, #ff6b6b)' } })
      rules.push({ pattern: 'text-shadow-glow', properties: { 'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor' } })
      rules.push({ pattern: 'text-shadow-neon', properties: { 'text-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor' } })
      rules.push({ pattern: 'text-shadow-hard', properties: { 'text-shadow': '2px 2px 0 rgba(0, 0, 0, 0.25)' } })
      rules.push({ pattern: 'text-shadow-emboss', properties: { 'text-shadow': '1px 1px 0 rgba(255, 255, 255, 0.5), -1px -1px 0 rgba(0, 0, 0, 0.1)' } })
      rules.push({ pattern: 'text-shadow-engrave', properties: { 'text-shadow': '-1px -1px 0 rgba(255, 255, 255, 0.2), 1px 1px 0 rgba(0, 0, 0, 0.25)' } })
      rules.push({ pattern: 'text-shadow-outline', properties: { 'text-shadow': '-1px -1px 0 currentColor, 1px -1px 0 currentColor, -1px 1px 0 currentColor, 1px 1px 0 currentColor' } })
      rules.push({ pattern: 'text-shadow-3d', properties: { 'text-shadow': '1px 1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.15), 3px 3px 0 rgba(0,0,0,0.1)' } })

      // Arbitrary text shadow
      rules.push({
        pattern: /^text-shadow-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'text-shadow': v } }
        },
      })

      // ========================================
      // CSS COUNTERS (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'counter-reset', properties: { 'counter-reset': 'section' } })
      rules.push({ pattern: 'counter-increment', properties: { 'counter-increment': 'section' } })
      rules.push({ pattern: 'counter-set', properties: { 'counter-set': 'section 0' } })

      rules.push({
        pattern: /^counter-reset-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'counter-reset': v } }
        },
      })
      rules.push({
        pattern: /^counter-increment-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'counter-increment': v } }
        },
      })
      rules.push({
        pattern: /^counter-set-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'counter-set': v } }
        },
      })

      // Content with counter
      rules.push({
        pattern: 'content-counter',
        properties: { content: 'counter(section)' },
      })
      rules.push({
        pattern: 'content-counter-decimal',
        properties: { content: 'counter(section, decimal)' },
      })
      rules.push({
        pattern: 'content-counter-roman',
        properties: { content: 'counter(section, lower-roman)' },
      })
      rules.push({
        pattern: 'content-counter-alpha',
        properties: { content: 'counter(section, lower-alpha)' },
      })

      // ========================================
      // LIST & MARKER STYLING (Beyond Tailwind 4)
      // ========================================

      // List style position
      rules.push({ pattern: 'list-inside', properties: { 'list-style-position': 'inside' } })
      rules.push({ pattern: 'list-outside', properties: { 'list-style-position': 'outside' } })

      // List style type
      rules.push({ pattern: 'list-none', properties: { 'list-style-type': 'none' } })
      rules.push({ pattern: 'list-disc', properties: { 'list-style-type': 'disc' } })
      rules.push({ pattern: 'list-decimal', properties: { 'list-style-type': 'decimal' } })
      rules.push({ pattern: 'list-decimal-leading-zero', properties: { 'list-style-type': 'decimal-leading-zero' } })
      rules.push({ pattern: 'list-lower-alpha', properties: { 'list-style-type': 'lower-alpha' } })
      rules.push({ pattern: 'list-upper-alpha', properties: { 'list-style-type': 'upper-alpha' } })
      rules.push({ pattern: 'list-lower-roman', properties: { 'list-style-type': 'lower-roman' } })
      rules.push({ pattern: 'list-upper-roman', properties: { 'list-style-type': 'upper-roman' } })
      rules.push({ pattern: 'list-circle', properties: { 'list-style-type': 'circle' } })
      rules.push({ pattern: 'list-square', properties: { 'list-style-type': 'square' } })

      // Custom list style (emoji, unicode)
      rules.push({
        pattern: /^list-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'list-style-type': `"${v}"` } }
        },
      })

      // Marker pseudo-element styling utilities
      rules.push({
        pattern: 'marker-primary',
        selector: (s) => `${s}::marker`,
        properties: { color: 'var(--coral-primary, #ff6b6b)' },
      })
      rules.push({
        pattern: /^marker-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return {
            selector: (s: string) => `${s}::marker`,
            properties: { color: v },
          }
        },
      })

      // ========================================
      // QUOTES STYLING (Beyond Tailwind 4)
      // ========================================

      rules.push({ pattern: 'quotes-none', properties: { quotes: 'none' } })
      rules.push({ pattern: 'quotes-auto', properties: { quotes: 'auto' } })
      rules.push({ pattern: 'quotes-english', properties: { quotes: '"\u201c" "\u201d" "\u2018" "\u2019"' } })
      rules.push({ pattern: 'quotes-french', properties: { quotes: '"\u00ab" "\u00bb" "\u2039" "\u203a"' } })
      rules.push({ pattern: 'quotes-german', properties: { quotes: '"\u201e" "\u201c" "\u201a" "\u2018"' } })
      rules.push({ pattern: 'quotes-cjk', properties: { quotes: '"\u300c" "\u300d" "\u300e" "\u300f"' } })

      rules.push({
        pattern: /^quotes-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { quotes: v } }
        },
      })

      // ========================================
      // RUBY ANNOTATION (Asian Typography)
      // ========================================

      rules.push({ pattern: 'ruby-position-over', properties: { 'ruby-position': 'over' } })
      rules.push({ pattern: 'ruby-position-under', properties: { 'ruby-position': 'under' } })
      rules.push({ pattern: 'ruby-align-start', properties: { 'ruby-align': 'start' } })
      rules.push({ pattern: 'ruby-align-center', properties: { 'ruby-align': 'center' } })
      rules.push({ pattern: 'ruby-align-space-between', properties: { 'ruby-align': 'space-between' } })
      rules.push({ pattern: 'ruby-align-space-around', properties: { 'ruby-align': 'space-around' } })

      // ========================================
      // HANGING PUNCTUATION
      // ========================================

      rules.push({ pattern: 'hanging-punctuation-none', properties: { 'hanging-punctuation': 'none' } })
      rules.push({ pattern: 'hanging-punctuation-first', properties: { 'hanging-punctuation': 'first' } })
      rules.push({ pattern: 'hanging-punctuation-last', properties: { 'hanging-punctuation': 'last' } })
      rules.push({ pattern: 'hanging-punctuation-force', properties: { 'hanging-punctuation': 'force-end' } })
      rules.push({ pattern: 'hanging-punctuation-allow', properties: { 'hanging-punctuation': 'allow-end' } })

      // ========================================
      // TEXT UNDERLINE (Extended)
      // ========================================

      rules.push({ pattern: 'underline-offset-auto', properties: { 'text-underline-offset': 'auto' } })
      rules.push({ pattern: 'underline-offset-1', properties: { 'text-underline-offset': '1px' } })
      rules.push({ pattern: 'underline-offset-2', properties: { 'text-underline-offset': '2px' } })
      rules.push({ pattern: 'underline-offset-4', properties: { 'text-underline-offset': '4px' } })
      rules.push({ pattern: 'underline-offset-8', properties: { 'text-underline-offset': '8px' } })

      rules.push({
        pattern: /^underline-offset-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'text-underline-offset': v } }
        },
      })

      // Underline position
      rules.push({ pattern: 'underline-position-auto', properties: { 'text-underline-position': 'auto' } })
      rules.push({ pattern: 'underline-position-under', properties: { 'text-underline-position': 'under' } })
      rules.push({ pattern: 'underline-position-left', properties: { 'text-underline-position': 'left' } })
      rules.push({ pattern: 'underline-position-right', properties: { 'text-underline-position': 'right' } })

      // Decoration thickness
      rules.push({ pattern: 'decoration-0', properties: { 'text-decoration-thickness': '0px' } })
      rules.push({ pattern: 'decoration-1', properties: { 'text-decoration-thickness': '1px' } })
      rules.push({ pattern: 'decoration-2', properties: { 'text-decoration-thickness': '2px' } })
      rules.push({ pattern: 'decoration-4', properties: { 'text-decoration-thickness': '4px' } })
      rules.push({ pattern: 'decoration-8', properties: { 'text-decoration-thickness': '8px' } })
      rules.push({ pattern: 'decoration-auto', properties: { 'text-decoration-thickness': 'auto' } })
      rules.push({ pattern: 'decoration-from-font', properties: { 'text-decoration-thickness': 'from-font' } })

      rules.push({
        pattern: /^decoration-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'text-decoration-thickness': v } }
        },
      })

      // Decoration skip
      rules.push({ pattern: 'decoration-skip-none', properties: { 'text-decoration-skip-ink': 'none' } })
      rules.push({ pattern: 'decoration-skip-auto', properties: { 'text-decoration-skip-ink': 'auto' } })
      rules.push({ pattern: 'decoration-skip-all', properties: { 'text-decoration-skip-ink': 'all' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default typographyPlugin
