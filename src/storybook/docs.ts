/**
 * CoralCSS Storybook Documentation Utilities
 *
 * Utilities for generating documentation in Storybook.
 * @module storybook/docs
 */

import { createCoral } from '../index'
import type { Coral, CoralOptions } from '../types'

/**
 * Story documentation configuration
 */
export interface StoryDocConfig {
  /** Component name */
  name: string
  /** Component description */
  description?: string
  /** Classes used by the component */
  classes: string[]
  /** Component variants */
  variants?: Record<string, string[]>
  /** Props/attributes documentation */
  props?: PropDoc[]
  /** Usage examples */
  examples?: ExampleDoc[]
  /** Related components */
  related?: string[]
}

/**
 * Property documentation
 */
export interface PropDoc {
  /** Property name */
  name: string
  /** Property type */
  type: string
  /** Default value */
  defaultValue?: unknown
  /** Description */
  description?: string
  /** Whether the prop is required */
  required?: boolean
  /** Possible values */
  options?: unknown[]
}

/**
 * Example documentation
 */
export interface ExampleDoc {
  /** Example title */
  title: string
  /** Example description */
  description?: string
  /** Code snippet */
  code: string
  /** Language for syntax highlighting */
  language?: string
}

/**
 * Create story documentation
 *
 * @example
 * ```typescript
 * export default {
 *   title: 'Components/Button',
 *   ...createStoryDoc({
 *     name: 'Button',
 *     description: 'A customizable button component',
 *     classes: ['bg-coral-500', 'px-4', 'py-2', 'rounded'],
 *     variants: {
 *       primary: ['bg-coral-500', 'text-white'],
 *       secondary: ['bg-gray-200', 'text-gray-800'],
 *     },
 *     props: [
 *       { name: 'variant', type: 'string', defaultValue: 'primary' },
 *       { name: 'size', type: 'string', defaultValue: 'md' },
 *     ],
 *   }),
 * }
 * ```
 */
export function createStoryDoc(config: StoryDocConfig) {
  const {
    name,
    description,
    classes,
    variants = {},
    props = [],
    examples = [],
    related = [],
  } = config

  // Generate CSS preview
  const coral = createCoral()
  const allClasses = [
    ...classes,
    ...Object.values(variants).flat(),
  ]
  const generatedCSS = coral.generate(allClasses)

  return {
    title: name,
    parameters: {
      docs: {
        description: {
          component: description,
        },
        source: {
          language: 'html',
        },
      },
      coralCSS: {
        classes: allClasses,
        variants,
        generatedCSS,
      },
    },
    argTypes: createArgTypes(props),
    args: createDefaultArgs(props),
    tags: ['autodocs'],

    // Additional metadata
    __coralDoc: {
      name,
      description,
      classes,
      variants,
      props,
      examples,
      related,
      generatedCSS,
    },
  }
}

/**
 * Create Storybook argTypes from props
 */
function createArgTypes(props: PropDoc[]): Record<string, unknown> {
  const argTypes: Record<string, unknown> = {}

  for (const prop of props) {
    argTypes[prop.name] = {
      description: prop.description,
      control: getControlType(prop),
      table: {
        type: { summary: prop.type },
        defaultValue: { summary: String(prop.defaultValue) },
      },
    }

    if (prop.options) {
      const existing = argTypes[prop.name] as Record<string, unknown>
      argTypes[prop.name] = {
        ...existing,
        options: prop.options,
        control: { type: 'select' },
      }
    }
  }

  return argTypes
}

/**
 * Get control type for a prop
 */
function getControlType(prop: PropDoc) {
  const typeMap: Record<string, { type: string }> = {
    string: { type: 'text' },
    number: { type: 'number' },
    boolean: { type: 'boolean' },
    object: { type: 'object' },
    array: { type: 'array' },
  }

  return typeMap[prop.type] || { type: 'text' }
}

/**
 * Create default args from props
 */
function createDefaultArgs(props: PropDoc[]): Record<string, unknown> {
  const args: Record<string, unknown> = {}

  for (const prop of props) {
    if (prop.defaultValue !== undefined) {
      args[prop.name] = prop.defaultValue
    }
  }

  return args
}

/**
 * Generate documentation for CoralCSS classes
 *
 * @example
 * ```typescript
 * const docs = generateClassDoc(['bg-coral-500', 'hover:bg-coral-600', 'p-4'])
 * console.log(docs.css) // Generated CSS
 * console.log(docs.breakdown) // Class breakdown
 * ```
 */
export function generateClassDoc(
  classes: string[],
  options: CoralOptions = {}
): ClassDocumentation {
  const coral = createCoral(options)
  const css = coral.generate(classes)

  // Parse class breakdown
  const breakdown = classes.map((cls) => parseClassBreakdown(cls))

  return {
    classes,
    css,
    breakdown,
    formatted: formatCSSForDisplay(css),
  }
}

/**
 * Class documentation result
 */
export interface ClassDocumentation {
  /** Original classes */
  classes: string[]
  /** Generated CSS */
  css: string
  /** Class breakdown */
  breakdown: ClassBreakdown[]
  /** Formatted CSS for display */
  formatted: string
}

/**
 * Class breakdown
 */
export interface ClassBreakdown {
  /** Original class name */
  className: string
  /** Variants applied */
  variants: string[]
  /** Base utility */
  utility: string
  /** Value if any */
  value?: string
  /** Whether it's arbitrary */
  isArbitrary: boolean
  /** Whether it's negative */
  isNegative: boolean
}

/**
 * Parse class name into components
 */
function parseClassBreakdown(className: string): ClassBreakdown {
  const variants: string[] = []
  let remaining = className

  // Extract variants (before last colon)
  const colonIndex = remaining.lastIndexOf(':')
  if (colonIndex > 0) {
    const variantPart = remaining.substring(0, colonIndex)
    variants.push(...variantPart.split(':'))
    remaining = remaining.substring(colonIndex + 1)
  }

  // Check for arbitrary value
  const isArbitrary = remaining.includes('[') && remaining.includes(']')

  // Check for negative
  const isNegative = remaining.startsWith('-')
  if (isNegative) {
    remaining = remaining.substring(1)
  }

  // Extract value (after last dash, unless arbitrary)
  let utility = remaining
  let value: string | undefined

  if (isArbitrary) {
    const bracketStart = remaining.indexOf('[')
    utility = remaining.substring(0, bracketStart)
    value = remaining.substring(bracketStart + 1, remaining.length - 1)
  } else {
    const dashIndex = remaining.lastIndexOf('-')
    if (dashIndex > 0) {
      const possibleValue = remaining.substring(dashIndex + 1)
      // Check if it's a number or common value
      if (/^(\d+|auto|full|screen|none|inherit|initial)$/.test(possibleValue)) {
        utility = remaining.substring(0, dashIndex)
        value = possibleValue
      }
    }
  }

  return {
    className,
    variants,
    utility,
    value,
    isArbitrary,
    isNegative,
  }
}

/**
 * Format CSS for display
 */
function formatCSSForDisplay(css: string): string {
  return css
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*}\s*/g, '\n}\n\n')
    .replace(/\n {2}\n}/g, '\n}')
    .trim()
}

/**
 * Create a props table for documentation
 *
 * @example
 * ```typescript
 * const propsTable = createPropsTable([
 *   { name: 'variant', type: 'string', defaultValue: 'primary' },
 *   { name: 'size', type: 'string', defaultValue: 'md' },
 * ])
 * ```
 */
export function createPropsTable(props: PropDoc[]): string {
  if (props.length === 0) {
    return 'No props defined.'
  }

  const header = '| Name | Type | Default | Required | Description |'
  const separator = '|------|------|---------|----------|-------------|'

  const rows = props.map((prop) => {
    const required = prop.required ? 'Yes' : 'No'
    const defaultVal = prop.defaultValue !== undefined ? `\`${prop.defaultValue}\`` : '-'
    const desc = prop.description || '-'
    return `| ${prop.name} | \`${prop.type}\` | ${defaultVal} | ${required} | ${desc} |`
  })

  return [header, separator, ...rows].join('\n')
}

/**
 * Create usage examples markdown
 */
export function createExamplesMarkdown(examples: ExampleDoc[]): string {
  if (examples.length === 0) {
    return ''
  }

  return examples.map((example) => {
    const title = `### ${example.title}`
    const desc = example.description ? `\n${example.description}\n` : ''
    const lang = example.language || 'html'
    const code = `\n\`\`\`${lang}\n${example.code}\n\`\`\``

    return `${title}${desc}${code}`
  }).join('\n\n')
}

/**
 * Generate complete component documentation
 */
export function generateComponentDoc(config: StoryDocConfig): string {
  const sections: string[] = []

  // Header
  sections.push(`# ${config.name}`)

  if (config.description) {
    sections.push(config.description)
  }

  // Classes used
  sections.push('## Classes')
  sections.push(`This component uses the following CoralCSS classes:`)
  sections.push('```')
  sections.push(config.classes.join(' '))
  sections.push('```')

  // Variants
  if (config.variants && Object.keys(config.variants).length > 0) {
    sections.push('## Variants')
    for (const [name, classes] of Object.entries(config.variants)) {
      sections.push(`### ${name}`)
      sections.push('```')
      sections.push(classes.join(' '))
      sections.push('```')
    }
  }

  // Props
  if (config.props && config.props.length > 0) {
    sections.push('## Props')
    sections.push(createPropsTable(config.props))
  }

  // Examples
  if (config.examples && config.examples.length > 0) {
    sections.push('## Examples')
    sections.push(createExamplesMarkdown(config.examples))
  }

  // Related
  if (config.related && config.related.length > 0) {
    sections.push('## Related Components')
    sections.push(config.related.map((r) => `- ${r}`).join('\n'))
  }

  return sections.join('\n\n')
}
