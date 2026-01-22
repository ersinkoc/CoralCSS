/**
 * CoralCSS IntelliSense Hover Provider
 *
 * Provides hover information for utility classes.
 * @module intellisense/hover
 */

import { createCoral } from '../index'
import type { Theme } from '../types'
import { defaultTheme } from '../theme/default'
import { corePlugins } from '../plugins/core'

/**
 * Hover information structure
 */
export interface HoverInfo {
  /** Class name */
  className: string
  /** Generated CSS */
  css: string
  /** Human-readable description */
  description?: string
  /** Color value (for color utilities) */
  color?: string
  /** Source category */
  category?: string
  /** Variants applied */
  variants?: string[]
  /** Documentation URL */
  docsUrl?: string
}

/**
 * Create a hover provider
 */
export function createHoverProvider(theme: Theme = defaultTheme) {
  const coral = createCoral({ theme })

  // Load all core plugins
  corePlugins().forEach(plugin => coral.use(plugin))

  /**
   * Get hover information for a class name
   */
  function getHoverInfo(className: string): HoverInfo | null {
    if (!className || className.trim().length === 0) {
      return null
    }

    className = className.trim()

    // Parse variants
    const parts = className.split(':')
    const baseClass = parts.pop() || ''
    const variants = parts

    // Generate CSS
    const css = coral.generate([className])
    if (!css) {
      return null
    }

    // Parse the class for category and description
    const info = parseClassName(baseClass, theme)

    return {
      className,
      css: formatCSS(css),
      description: info.description,
      color: info.color,
      category: info.category,
      variants: variants.length > 0 ? variants : undefined,
    }
  }

  /**
   * Get hover information for multiple classes
   */
  function getHoverInfoBatch(classNames: string[]): Map<string, HoverInfo | null> {
    const results = new Map<string, HoverInfo | null>()

    for (const className of classNames) {
      results.set(className, getHoverInfo(className))
    }

    return results
  }

  return {
    getHoverInfo,
    getHoverInfoBatch,
  }
}

/**
 * Parse a class name to extract category and description
 */
function parseClassName(className: string, theme: Theme): {
  category?: string
  description?: string
  color?: string
} {
  // Handle negative prefix
  const isNegative = className.startsWith('-')
  const baseClass = isNegative ? className.slice(1) : className

  // Color utilities
  const colorPrefixes = ['text', 'bg', 'border', 'ring', 'divide', 'outline', 'accent', 'caret', 'fill', 'stroke', 'decoration', 'shadow', 'placeholder']
  for (const prefix of colorPrefixes) {
    if (baseClass.startsWith(`${prefix}-`)) {
      const colorPart = baseClass.slice(prefix.length + 1)
      const color = resolveColor(colorPart, theme)
      if (color) {
        return {
          category: 'colors',
          description: `Set ${prefix.replace('bg', 'background').replace('decoration', 'text decoration')} color`,
          color,
        }
      }
    }
  }

  // Spacing utilities
  const spacingPrefixes: Record<string, string> = {
    'm': 'margin',
    'mx': 'horizontal margin',
    'my': 'vertical margin',
    'mt': 'top margin',
    'mr': 'right margin',
    'mb': 'bottom margin',
    'ml': 'left margin',
    'ms': 'start margin',
    'me': 'end margin',
    'p': 'padding',
    'px': 'horizontal padding',
    'py': 'vertical padding',
    'pt': 'top padding',
    'pr': 'right padding',
    'pb': 'bottom padding',
    'pl': 'left padding',
    'ps': 'start padding',
    'pe': 'end padding',
    'gap': 'gap',
    'gap-x': 'column gap',
    'gap-y': 'row gap',
    'space-x': 'horizontal space between',
    'space-y': 'vertical space between',
  }

  for (const [prefix, desc] of Object.entries(spacingPrefixes)) {
    if (baseClass.startsWith(`${prefix}-`)) {
      const value = baseClass.slice(prefix.length + 1)
      const sign = isNegative ? 'negative ' : ''
      return {
        category: 'spacing',
        description: `Set ${sign}${desc} to ${value}`,
      }
    }
  }

  // Sizing utilities
  const sizingPrefixes: Record<string, string> = {
    'w': 'width',
    'h': 'height',
    'min-w': 'min-width',
    'max-w': 'max-width',
    'min-h': 'min-height',
    'max-h': 'max-height',
    'size': 'width and height',
  }

  for (const [prefix, desc] of Object.entries(sizingPrefixes)) {
    if (baseClass.startsWith(`${prefix}-`)) {
      const value = baseClass.slice(prefix.length + 1)
      return {
        category: 'sizing',
        description: `Set ${desc} to ${value}`,
      }
    }
  }

  // Typography utilities
  if (baseClass.startsWith('text-')) {
    const value = baseClass.slice(5)
    if (['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'].includes(value)) {
      return {
        category: 'typography',
        description: `Set font size to ${value}`,
      }
    }
    if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(value)) {
      return {
        category: 'typography',
        description: `Align text to ${value}`,
      }
    }
  }

  if (baseClass.startsWith('font-')) {
    const value = baseClass.slice(5)
    if (['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'].includes(value)) {
      return {
        category: 'typography',
        description: `Set font weight to ${value}`,
      }
    }
    if (['sans', 'serif', 'mono'].includes(value)) {
      return {
        category: 'typography',
        description: `Use ${value} font family`,
      }
    }
  }

  if (baseClass.startsWith('tracking-')) {
    return {
      category: 'typography',
      description: `Set letter spacing to ${baseClass.slice(9)}`,
    }
  }

  if (baseClass.startsWith('leading-')) {
    return {
      category: 'typography',
      description: `Set line height to ${baseClass.slice(8)}`,
    }
  }

  // Layout utilities
  const layoutClasses: Record<string, string> = {
    'block': 'Set display to block',
    'inline-block': 'Set display to inline-block',
    'inline': 'Set display to inline',
    'flex': 'Set display to flex',
    'inline-flex': 'Set display to inline-flex',
    'grid': 'Set display to grid',
    'inline-grid': 'Set display to inline-grid',
    'hidden': 'Hide element (display: none)',
    'contents': 'Set display to contents',
    'static': 'Set position to static',
    'fixed': 'Set position to fixed',
    'absolute': 'Set position to absolute',
    'relative': 'Set position to relative',
    'sticky': 'Set position to sticky',
    'visible': 'Make element visible',
    'invisible': 'Make element invisible',
    'isolate': 'Create new stacking context',
  }

  if (layoutClasses[baseClass]) {
    return {
      category: 'layout',
      description: layoutClasses[baseClass],
    }
  }

  // Flexbox utilities
  const flexClasses: Record<string, string> = {
    'flex-row': 'Set flex direction to row',
    'flex-row-reverse': 'Set flex direction to row-reverse',
    'flex-col': 'Set flex direction to column',
    'flex-col-reverse': 'Set flex direction to column-reverse',
    'flex-wrap': 'Allow flex items to wrap',
    'flex-wrap-reverse': 'Allow flex items to wrap in reverse',
    'flex-nowrap': 'Prevent flex items from wrapping',
    'flex-1': 'Grow and shrink as needed (flex: 1 1 0%)',
    'flex-auto': 'Grow and shrink based on content (flex: 1 1 auto)',
    'flex-initial': 'Shrink but dont grow (flex: 0 1 auto)',
    'flex-none': 'Dont grow or shrink (flex: none)',
    'grow': 'Allow flex item to grow',
    'grow-0': 'Prevent flex item from growing',
    'shrink': 'Allow flex item to shrink',
    'shrink-0': 'Prevent flex item from shrinking',
  }

  if (flexClasses[baseClass]) {
    return {
      category: 'flexbox',
      description: flexClasses[baseClass],
    }
  }

  // Justify/align utilities
  if (baseClass.startsWith('justify-')) {
    return {
      category: 'flexbox',
      description: `Justify content to ${baseClass.slice(8)}`,
    }
  }

  if (baseClass.startsWith('items-')) {
    return {
      category: 'flexbox',
      description: `Align items to ${baseClass.slice(6)}`,
    }
  }

  if (baseClass.startsWith('content-')) {
    return {
      category: 'flexbox',
      description: `Align content to ${baseClass.slice(8)}`,
    }
  }

  if (baseClass.startsWith('self-')) {
    return {
      category: 'flexbox',
      description: `Align self to ${baseClass.slice(5)}`,
    }
  }

  // Grid utilities
  if (baseClass.startsWith('grid-cols-')) {
    const value = baseClass.slice(10)
    return {
      category: 'grid',
      description: value === 'none' ? 'Remove grid columns' : `Create ${value} equal grid columns`,
    }
  }

  if (baseClass.startsWith('grid-rows-')) {
    const value = baseClass.slice(10)
    return {
      category: 'grid',
      description: value === 'none' ? 'Remove grid rows' : `Create ${value} equal grid rows`,
    }
  }

  if (baseClass.startsWith('col-span-')) {
    const value = baseClass.slice(9)
    return {
      category: 'grid',
      description: value === 'full' ? 'Span all columns' : `Span ${value} columns`,
    }
  }

  if (baseClass.startsWith('row-span-')) {
    const value = baseClass.slice(9)
    return {
      category: 'grid',
      description: value === 'full' ? 'Span all rows' : `Span ${value} rows`,
    }
  }

  // Border utilities
  if (baseClass.startsWith('rounded')) {
    return {
      category: 'borders',
      description: 'Set border radius',
    }
  }

  if (baseClass.startsWith('border')) {
    return {
      category: 'borders',
      description: 'Set border',
    }
  }

  if (baseClass.startsWith('ring')) {
    return {
      category: 'borders',
      description: 'Add ring/outline effect',
    }
  }

  if (baseClass.startsWith('outline')) {
    return {
      category: 'borders',
      description: 'Set outline',
    }
  }

  // Effect utilities
  if (baseClass.startsWith('shadow')) {
    return {
      category: 'effects',
      description: 'Add box shadow',
    }
  }

  if (baseClass.startsWith('opacity-')) {
    const value = baseClass.slice(8)
    return {
      category: 'effects',
      description: `Set opacity to ${value}%`,
    }
  }

  if (baseClass.startsWith('mix-blend-')) {
    return {
      category: 'effects',
      description: `Set mix blend mode to ${baseClass.slice(10)}`,
    }
  }

  // Transform utilities
  if (baseClass.startsWith('scale')) {
    return {
      category: 'transforms',
      description: 'Scale element',
    }
  }

  if (baseClass.startsWith('rotate')) {
    return {
      category: 'transforms',
      description: 'Rotate element',
    }
  }

  if (baseClass.startsWith('translate')) {
    return {
      category: 'transforms',
      description: 'Translate/move element',
    }
  }

  if (baseClass.startsWith('skew')) {
    return {
      category: 'transforms',
      description: 'Skew element',
    }
  }

  if (baseClass.startsWith('origin-')) {
    return {
      category: 'transforms',
      description: `Set transform origin to ${baseClass.slice(7)}`,
    }
  }

  // Transition utilities
  if (baseClass.startsWith('transition')) {
    return {
      category: 'transitions',
      description: 'Enable transitions',
    }
  }

  if (baseClass.startsWith('duration-')) {
    return {
      category: 'transitions',
      description: `Set transition duration to ${baseClass.slice(9)}ms`,
    }
  }

  if (baseClass.startsWith('ease-')) {
    return {
      category: 'transitions',
      description: `Set easing to ${baseClass.slice(5)}`,
    }
  }

  if (baseClass.startsWith('delay-')) {
    return {
      category: 'transitions',
      description: `Set transition delay to ${baseClass.slice(6)}ms`,
    }
  }

  if (baseClass.startsWith('animate-')) {
    return {
      category: 'transitions',
      description: `Apply ${baseClass.slice(8)} animation`,
    }
  }

  // Filter utilities
  if (baseClass.startsWith('blur')) {
    return {
      category: 'filters',
      description: 'Apply blur filter',
    }
  }

  if (baseClass.startsWith('brightness-')) {
    return {
      category: 'filters',
      description: `Set brightness to ${baseClass.slice(11)}%`,
    }
  }

  if (baseClass.startsWith('contrast-')) {
    return {
      category: 'filters',
      description: `Set contrast to ${baseClass.slice(9)}%`,
    }
  }

  if (baseClass === 'grayscale' || baseClass === 'grayscale-0') {
    return {
      category: 'filters',
      description: baseClass === 'grayscale' ? 'Apply grayscale filter' : 'Remove grayscale',
    }
  }

  if (baseClass === 'invert' || baseClass === 'invert-0') {
    return {
      category: 'filters',
      description: baseClass === 'invert' ? 'Invert colors' : 'Remove invert',
    }
  }

  if (baseClass === 'sepia' || baseClass === 'sepia-0') {
    return {
      category: 'filters',
      description: baseClass === 'sepia' ? 'Apply sepia filter' : 'Remove sepia',
    }
  }

  if (baseClass.startsWith('saturate-')) {
    return {
      category: 'filters',
      description: `Set saturation to ${baseClass.slice(9)}%`,
    }
  }

  if (baseClass.startsWith('hue-rotate-')) {
    return {
      category: 'filters',
      description: `Rotate hue by ${baseClass.slice(11)} degrees`,
    }
  }

  if (baseClass.startsWith('drop-shadow')) {
    return {
      category: 'filters',
      description: 'Apply drop shadow filter',
    }
  }

  if (baseClass.startsWith('backdrop-')) {
    return {
      category: 'filters',
      description: 'Apply backdrop filter',
    }
  }

  // Interactivity utilities
  if (baseClass.startsWith('cursor-')) {
    return {
      category: 'interactivity',
      description: `Set cursor to ${baseClass.slice(7)}`,
    }
  }

  if (baseClass.startsWith('pointer-events-')) {
    return {
      category: 'interactivity',
      description: baseClass === 'pointer-events-none' ? 'Disable pointer events' : 'Enable pointer events',
    }
  }

  if (baseClass.startsWith('resize')) {
    return {
      category: 'interactivity',
      description: 'Control element resizing',
    }
  }

  if (baseClass.startsWith('scroll-')) {
    return {
      category: 'interactivity',
      description: 'Control scroll behavior',
    }
  }

  if (baseClass.startsWith('snap-')) {
    return {
      category: 'interactivity',
      description: 'Control scroll snapping',
    }
  }

  if (baseClass.startsWith('touch-')) {
    return {
      category: 'interactivity',
      description: `Set touch action to ${baseClass.slice(6)}`,
    }
  }

  if (baseClass.startsWith('select-')) {
    return {
      category: 'interactivity',
      description: `Set user-select to ${baseClass.slice(7)}`,
    }
  }

  // Default
  return {}
}

/**
 * Resolve a color value from theme
 */
function resolveColor(colorPart: string, theme: Theme): string | undefined {
  const colors = theme.colors || {}

  // Check for opacity modifier (e.g., coral-500/50)
  const splitParts = colorPart.split('/')
  const colorName = splitParts[0] || ''

  if (!colorName) {
    return undefined
  }

  // Simple color (e.g., transparent, current)
  const simpleColor = colors[colorName]
  if (typeof simpleColor === 'string') {
    return simpleColor
  }

  // Color with shade (e.g., coral-500)
  const parts = colorName.split('-')
  if (parts.length >= 2) {
    const shade = parts.pop()
    const name = parts.join('-')
    const palette = colors[name]
    if (typeof palette === 'object' && palette !== null && shade) {
      const paletteRecord = palette as unknown as Record<string, string>
      return paletteRecord[shade]
    }
  }

  return undefined
}

/**
 * Format CSS output for display
 */
function formatCSS(css: string): string {
  // Add proper indentation and line breaks
  return css
    .replace(/\{/g, ' {\n  ')
    .replace(/;/g, ';\n  ')
    .replace(/\n {2}\}/g, '\n}')
    .replace(/\n {2}$/gm, '')
    .trim()
}

/**
 * Default hover provider instance
 */
export const hoverProvider = createHoverProvider()
