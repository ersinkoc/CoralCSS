/**
 * CoralCSS VS Code Extension
 *
 * Provides IntelliSense, syntax highlighting, and documentation for CoralCSS classes.
 */

import * as vscode from 'vscode'

// CoralCSS utility categories and patterns
const UTILITY_PATTERNS = {
  // Spacing
  spacing: {
    prefixes: ['p', 'm', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'space-x', 'space-y'],
    description: 'Padding and margin utilities',
    values: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '96', 'auto']
  },
  // Sizing
  sizing: {
    prefixes: ['w', 'h', 'min-w', 'min-h', 'max-w', 'max-h'],
    description: 'Width and height utilities',
    values: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '96', 'auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5']
  },
  // Colors
  colors: {
    prefixes: ['bg', 'text', 'border', 'ring', 'fill', 'stroke', 'shadow', 'accent', 'decoration'],
    description: 'Color utilities',
    values: [
      // Coral colors
      'coral-50', 'coral-100', 'coral-200', 'coral-300', 'coral-400', 'coral-500', 'coral-600', 'coral-700', 'coral-800', 'coral-900', 'coral-950',
      // Standard colors
      'slate-50', 'slate-100', 'slate-200', 'slate-300', 'slate-400', 'slate-500', 'slate-600', 'slate-700', 'slate-800', 'slate-900', 'slate-950',
      'red-50', 'red-100', 'red-200', 'red-300', 'red-400', 'red-500', 'red-600', 'red-700', 'red-800', 'red-900', 'red-950',
      'orange-50', 'orange-100', 'orange-200', 'orange-300', 'orange-400', 'orange-500', 'orange-600', 'orange-700', 'orange-800', 'orange-900', 'orange-950',
      'amber-50', 'amber-100', 'amber-200', 'amber-300', 'amber-400', 'amber-500', 'amber-600', 'amber-700', 'amber-800', 'amber-900', 'amber-950',
      'yellow-50', 'yellow-100', 'yellow-200', 'yellow-300', 'yellow-400', 'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900', 'yellow-950',
      'lime-50', 'lime-100', 'lime-200', 'lime-300', 'lime-400', 'lime-500', 'lime-600', 'lime-700', 'lime-800', 'lime-900', 'lime-950',
      'green-50', 'green-100', 'green-200', 'green-300', 'green-400', 'green-500', 'green-600', 'green-700', 'green-800', 'green-900', 'green-950',
      'emerald-50', 'emerald-100', 'emerald-200', 'emerald-300', 'emerald-400', 'emerald-500', 'emerald-600', 'emerald-700', 'emerald-800', 'emerald-900', 'emerald-950',
      'teal-50', 'teal-100', 'teal-200', 'teal-300', 'teal-400', 'teal-500', 'teal-600', 'teal-700', 'teal-800', 'teal-900', 'teal-950',
      'cyan-50', 'cyan-100', 'cyan-200', 'cyan-300', 'cyan-400', 'cyan-500', 'cyan-600', 'cyan-700', 'cyan-800', 'cyan-900', 'cyan-950',
      'sky-50', 'sky-100', 'sky-200', 'sky-300', 'sky-400', 'sky-500', 'sky-600', 'sky-700', 'sky-800', 'sky-900', 'sky-950',
      'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400', 'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900', 'blue-950',
      'indigo-50', 'indigo-100', 'indigo-200', 'indigo-300', 'indigo-400', 'indigo-500', 'indigo-600', 'indigo-700', 'indigo-800', 'indigo-900', 'indigo-950',
      'violet-50', 'violet-100', 'violet-200', 'violet-300', 'violet-400', 'violet-500', 'violet-600', 'violet-700', 'violet-800', 'violet-900', 'violet-950',
      'purple-50', 'purple-100', 'purple-200', 'purple-300', 'purple-400', 'purple-500', 'purple-600', 'purple-700', 'purple-800', 'purple-900', 'purple-950',
      'fuchsia-50', 'fuchsia-100', 'fuchsia-200', 'fuchsia-300', 'fuchsia-400', 'fuchsia-500', 'fuchsia-600', 'fuchsia-700', 'fuchsia-800', 'fuchsia-900', 'fuchsia-950',
      'pink-50', 'pink-100', 'pink-200', 'pink-300', 'pink-400', 'pink-500', 'pink-600', 'pink-700', 'pink-800', 'pink-900', 'pink-950',
      'rose-50', 'rose-100', 'rose-200', 'rose-300', 'rose-400', 'rose-500', 'rose-600', 'rose-700', 'rose-800', 'rose-900', 'rose-950',
      // Special values
      'inherit', 'current', 'transparent'
    ]
  },
  // Typography
  typography: {
    prefixes: ['font', 'text', 'leading', 'tracking', 'align'],
    description: 'Typography utilities',
    values: {
      font: ['sans', 'serif', 'mono', 'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      text: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', 'justify', 'left', 'right', 'center', 'start', 'end'],
      leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
    }
  },
  // Layout
  layout: {
    prefixes: ['display', 'flex', 'grid', 'hidden', 'float', 'clear', 'overflow', 'position', 'inset'],
    description: 'Layout utilities',
    values: {
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden', 'table', 'table-cell', 'table-row'],
      flex: ['row', 'row-reverse', 'col', 'col-reverse', 'wrap', 'nowrap', 'wrap-reverse', '1', 'auto', 'initial', 'none', 'grow', 'shrink'],
      grid: ['cols-1', 'cols-2', 'cols-3', 'cols-4', 'cols-5', 'cols-6', 'cols-7', 'cols-8', 'cols-9', 'cols-10', 'cols-11', 'cols-12', 'rows-1', 'rows-2', 'rows-3', 'rows-4', 'rows-5', 'rows-6'],
      hidden: ['hidden'],
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      inset: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', 'auto', 'x-', 'y-']
    }
  },
  // Flexbox & Grid
  flexbox: {
    prefixes: ['items', 'justify', 'content', 'self', 'place', 'gap', 'order'],
    description: 'Flexbox and grid alignment utilities',
    values: {
      items: ['start', 'end', 'center', 'stretch', 'baseline'],
      justify: ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly'],
      content: ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly'],
      self: ['auto', 'start', 'end', 'center', 'stretch'],
      gap: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '96', 'x-', 'y-']
    }
  },
  // Borders
  borders: {
    prefixes: ['border', 'rounded', 'ring'],
    description: 'Border and radius utilities',
    values: {
      border: ['0', '1', '2', '4', '8', 't-', 'r-', 'b-', 'l-', 'x-', 'y-'],
      rounded: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 't-', 'r-', 'b-', 'l-', 'tl-', 'tr-', 'bl-', 'br-'],
      ring: ['0', '1', '2', '4', '8', 'inset', 'offset-', 'offset-0', 'offset-1', 'offset-2', 'offset-4', 'offset-8']
    }
  },
  // Effects
  effects: {
    prefixes: ['shadow', 'opacity', 'blur', 'brightness', 'contrast', 'drop-shadow', 'grayscale', 'hue-rotate', 'invert', 'saturate', 'sepia'],
    description: 'Visual effects utilities',
    values: {
      shadow: ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'],
      opacity: ['0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100'],
      blur: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
    }
  },
  // Transforms
  transforms: {
    prefixes: ['scale', 'rotate', 'translate', 'skew', 'origin', 'transform'],
    description: 'CSS transform utilities',
    values: {
      scale: ['0', '50', '75', '90', '95', '100', '105', '110', '125', '150', 'x-', 'y-', 'z-'],
      rotate: ['0', '1', '2', '3', '6', '12', '45', '90', '180', 'x-', 'y-', 'z-'],
      translate: ['x-', 'y-', 'z-', '1/2', '1/3', '2/3', '1/4', '3/4', 'full'],
      skew: ['x-', 'y-', '0', '1', '2', '3', '6', '12'],
      origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
    }
  },
  // Transitions & Animations
  transitions: {
    prefixes: ['transition', 'duration', 'ease', 'delay', 'animate'],
    description: 'Transition and animation utilities',
    values: {
      transition: ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'],
      duration: ['75', '100', '150', '200', '300', '500', '700', '1000'],
      ease: ['linear', 'in', 'out', 'in-out', 'spring-sm', 'spring-md', 'spring-lg'],
      delay: ['75', '100', '150', '200', '300', '500', '700', '1000'],
      animate: ['none', 'spin', 'ping', 'pulse', 'bounce', 'spring-sm', 'spring-md', 'spring-lg', 'bounce-in', 'bounce-out', 'elastic', 'scroll-fade-in', 'scroll-scale', 'swipe-left', 'swipe-right', 'shake', 'wiggle', 'pulse-glow']
    }
  },
  // Interactive
  interactive: {
    prefixes: ['cursor', 'pointer', 'select', 'resize', 'snap', 'touch'],
    description: 'Interactive state utilities',
    values: {
      cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'crosshair', 'zoom-in', 'zoom-out'],
      select: ['none', 'text', 'all', 'auto'],
      resize: ['none', 'x', 'y', 'both']
    }
  },
  // Accessibility
  a11y: {
    prefixes: ['sr', 'not-sr'],
    description: 'Accessibility utilities',
    values: ['only', 'not-only']
  },
  // Container Queries
  container: {
    prefixes: ['@', 'container'],
    description: 'Container query utilities',
    values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'style-grid', 'state-hovered']
  },
  // Extras
  extras: {
    prefixes: ['accent', 'color-scheme', 'print-color-adjust', 'line-clamp', 'decoration', 'hanging-punctuation', 'text-align-last', 'appearance', 'hyphens', 'overflow-anchor', 'forced-color-adjust'],
    description: 'Extra utilities for modern CSS',
    values: {
      accent: ['auto', 'current', 'coral-50', 'coral-500', 'primary', 'secondary'],
      'color-scheme': ['normal', 'light', 'dark', 'light-dark', 'only-light', 'only-dark'],
      'print-color-adjust': ['economy', 'exact'],
      'line-clamp': ['none', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      decoration: ['slice', 'clone'],
      'hanging-punctuation': ['none', 'first', 'last', 'force-end', 'allow-end', 'first-last', 'all'],
      'text-align-last': ['auto', 'start', 'end', 'left', 'right', 'center', 'justify'],
      appearance: ['auto', 'none', 'textfield', 'searchfield', 'button', 'menulist'],
      hyphens: ['none', 'manual', 'auto'],
      'overflow-anchor': ['auto', 'none'],
      'forced-color-adjust': ['auto', 'none', 'preserve']
    }
  },
  // Scroll-driven animations
  scrollAnimations: {
    prefixes: ['animate-scroll'],
    description: 'Scroll-driven animations',
    values: ['fade-in', 'scale', 'rotate', 'slide-up', 'blur-in']
  }
}

// Variant modifiers
const VARIANTS = {
  responsive: ['sm', 'md', 'lg', 'xl', '2xl'],
  pseudo: ['hover', 'focus', 'focus-within', 'focus-visible', 'active', 'visited', 'target', 'first', 'last', 'only', 'odd', 'even', 'first-of-type', 'last-of-type', 'only-of-type'],
  state: ['default', 'checked', 'indeterminate', 'placeholder-shown', 'autofill', 'required', 'valid', 'invalid', 'in-range', 'out-of-range', 'read-only', 'disabled', 'enabled'],
  darkMode: ['dark', 'light'],
  group: ['group-hover', 'group-focus'],
  peer: ['peer-hover', 'peer-focus'],
  container: ['@sm', '@md', '@lg', '@xl', '@2xl'],
  modern: ['has', 'not', 'within', 'where', 'is']
}

/**
 * Generate completions for a given prefix
 */
function generateCompletions(prefix: string, category: string, values: string[] | Record<string, string[]>): vscode.CompletionItem[] {
  const completions: vscode.CompletionItem[] = []
  const valueList = Array.isArray(values) ? values : Object.values(values).flat()

  for (const value of valueList) {
    const label = `${prefix}${value}`
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value)
    item.detail = label
    item.documentation = new vscode.MarkdownString(`**${category}**: \`${prefix}${value}\`\n\nAdds \`${prefix}${value}\` utility class.`)
    item.insertText = label
    item.sortText = prefix
    completions.push(item)
  }

  return completions
}

/**
 * CoralCSS Completion Provider
 */
class CoralCSSCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[]> {
    const config = vscode.workspace.getConfiguration('coralcss')
    if (!config.get('enableIntelliSense', true)) {
      return undefined
    }

    const completions: vscode.CompletionItem[] = []

    // Add variants
    for (const [variantType, variants] of Object.entries(VARIANTS)) {
      for (const variant of variants) {
        const item = new vscode.CompletionItem(`${variant}:`, vscode.CompletionItemKind.Snippet)
        item.detail = `Variant: ${variant}`
        item.documentation = new vscode.MarkdownString(`**${variantType}**: \`${variant}\`\n\nApplies styles when ${variant} condition is met.\n\n\`\`\`html\n<code class="html"><div class="${variant}:bg-red-500"></code>\n\`\`\``)
        item.insertText = `${variant}:$1`
        item.sortText = `0_${variant}`
        completions.push(item)
      }
    }

    // Add utility classes
    for (const [category, data] of Object.entries(UTILITY_PATTERNS)) {
      const info = data as { prefixes: string[]; description: string; values: string[] | Record<string, string[]> }

      for (const prefix of info.prefixes) {
        const categoryCompletions = generateCompletions(`${prefix}-`, category, info.values)
        completions.push(...categoryCompletions)
      }
    }

    // Add display utilities
    const displays = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden', 'table', 'table-cell']
    for (const display of displays) {
      const item = new vscode.CompletionItem(display, vscode.CompletionItemKind.Value)
      item.detail = `Display: ${display}`
      item.documentation = new vscode.MarkdownString(`**Layout**: Sets \`display: ${display}\``)
      item.sortText = `1_${display}`
      completions.push(item)
    }

    // Add advanced features
    const advancedFeatures = [
      { name: 'smart-grid', detail: 'Auto-fit responsive grid', docs: 'Responsive grid that automatically adjusts column count based on available space.' },
      { name: 'grid-masonry-tight', detail: 'Masonry grid layout', docs: 'CSS masonry layout for tight-packed elements.' },
      { name: 'p-smart', detail: 'Fluid responsive padding', docs: 'Padding that uses clamp() for fluid responsive sizing.' },
      { name: 'text-perceptual', detail: 'Perceptual adaptive color', docs: 'Text color that maintains perceptual brightness across themes.' },
      { name: 'contrast-high', detail: 'High contrast mode', docs: 'Increases contrast for better readability.' },
      { name: 'animate-spring-md', detail: 'Spring animation', docs: 'Physics-based spring animation for natural movement.' },
      { name: 'animate-scroll-fade-in', detail: 'Scroll fade animation', docs: 'Fade-in animation driven by scroll position.' },
      { name: 'accent-primary', detail: 'Primary accent color', docs: 'Sets the accent color to the primary theme color.' },
      { name: 'line-clamp-3', detail: 'Line clamping', docs: 'Limits text to 3 lines with ellipsis.' },
      { name: 'color-scheme-dark', detail: 'Dark color scheme', docs: 'Indicates dark mode preference to the browser.' },
      { name: 'print-color-adjust-exact', detail: 'Print color exact', docs: 'Preserves colors when printing.' },
    ]

    // Add Catppuccin theme colors
    const catppuccinColors = [
      { name: 'catppuccin-latte', detail: 'Catppuccin Latte', docs: 'Light theme from Catppuccin palette.' },
      { name: 'catppuccin-frappe', detail: 'Catppuccin Frappé', docs: 'Dark theme from Catppuccin palette.' },
      { name: 'catppuccin-macchiato', detail: 'Catppuccin Macchiato', docs: 'Medium-dark theme from Catppuccin palette.' },
      { name: 'catppuccin-mocha', detail: 'Catppuccin Mocha', docs: 'Dark theme from Catppuccin palette.' },
    ]

    // Add arbitrary value snippets
    const arbitraryValues = [
      { name: '[value]', detail: 'Arbitrary value', docs: 'Use any arbitrary value: `p-[17px]`, `bg-[#ff0000]`, `grid-cols-[repeat(3,minmax(0,1fr))]`' },
      { name: '[color:hex]', detail: 'Arbitrary color', docs: 'Use arbitrary hex color: `bg-[#ff0000]`, `text-[rgba(255,0,0,0.5)]`' },
      { name: '[size:unit]', detail: 'Arbitrary size', docs: 'Use arbitrary size: `w-[50%]`, `h-[100vh]`, `max-w-[min(100vw,1024px)]`' },
    ]

    for (const feature of advancedFeatures) {
      const item = new vscode.CompletionItem(feature.name, vscode.CompletionItemKind.Value)
      item.detail = feature.detail
      item.documentation = new vscode.MarkdownString(`**Advanced Feature**: ${feature.detail}\n\n${feature.docs}`)
      item.sortText = `2_${feature.name}`
      completions.push(item)
    }

    for (const color of catppuccinColors) {
      const item = new vscode.CompletionItem(color.name, vscode.CompletionItemKind.Color)
      item.detail = color.detail
      item.documentation = new vscode.MarkdownString(`**Theme**: ${color.detail}\n\n${color.docs}`)
      item.sortText = `3_${color.name}`
      completions.push(item)
    }

    for (const arbitrary of arbitraryValues) {
      const item = new vscode.CompletionItem(arbitrary.name, vscode.CompletionItemKind.Snippet)
      item.detail = arbitrary.detail
      item.documentation = new vscode.MarkdownString(`**Arbitrary Values**: ${arbitrary.detail}\n\n${arbitrary.docs}`)
      item.sortText = `4_${arbitrary.name}`
      completions.push(item)
    }

    return completions
  }
}

/**
 * CoralCSS Hover Provider
 */
class CoralCSSHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    const config = vscode.workspace.getConfiguration('coralcss')
    if (!config.get('showDocumentationOnHover', true)) {
      return undefined
    }

    const range = document.getWordRangeAtPosition(position, /[\w\-\[\]:\(\)]+/)
    if (!range) {
      return undefined
    }

    const text = document.getText(range)

    // Parse the class name
    let className = text
    let variant = ''

    if (text.includes(':')) {
      const parts = text.split(':')
      variant = parts.slice(0, -1).join(':')
      className = parts[parts.length - 1]
    }

    // Handle variant groups
    if (className.includes('(') && className.includes(')')) {
      const match = className.match(/^([a-z\-]+)\((.*)\)$/)
      if (match) {
        return new vscode.Hover(
          new vscode.MarkdownString(
            `**Variant Group**: \`${text}\`\n\nApplies multiple classes with the \`${match[1]}\` variant.\n\n\`\`\`html\n<code class="html"><!-- Equivalent to -->\n${match[1]}:${match[2].split(/\s+/).join(`\n${match[1]}:`)}\n</code>\n\`\`\``
          )
        )
      }
    }

    // Provide documentation for variants
    if (variant) {
      const variantInfo = this.getVariantInfo(variant)
      if (variantInfo) {
        return new vscode.Hover(
          new vscode.MarkdownString(
            `**${variantInfo.name}**: \`${variant}\`\n\n${variantInfo.description}\n\n\`\`\`css\n${variantInfo.css}\n\`\`\``
          )
        )
      }
    }

    // Provide documentation for utilities
    const utilityInfo = this.getUtilityInfo(className)
    if (utilityInfo) {
      return new vscode.Hover(
        new vscode.MarkdownString(
          `**${utilityInfo.name}**: \`${className}\`\n\n${utilityInfo.description}\n\n\`\`\`css\n${utilityInfo.css}\n\`\`\``
        )
      )
    }

    return undefined
  }

  private getVariantInfo(variant: string): { name: string; description: string; css: string } | null {
    const variantMap: Record<string, { name: string; description: string; css: string }> = {
      hover: {
        name: 'Hover State',
        description: 'Applies styles when the user hovers over an element.',
        css: '&:hover { ... }'
      },
      focus: {
        name: 'Focus State',
        description: 'Applies styles when an element has focus.',
        css: '&:focus { ... }'
      },
      active: {
        name: 'Active State',
        description: 'Applies styles when an element is being pressed.',
        css: '&:active { ... }'
      },
      dark: {
        name: 'Dark Mode',
        description: 'Applies styles when dark mode is enabled (requires .dark parent).',
        css: '.dark & { ... }'
      },
      'group-hover': {
        name: 'Group Hover',
        description: 'Applies styles when any element in the group is hovered.',
        css: '.group:hover & { ... }'
      },
      sm: {
        name: 'Small Breakpoint',
        description: 'Applies styles at 640px and up.',
        css: '@media (min-width: 640px) { ... }'
      },
      md: {
        name: 'Medium Breakpoint',
        description: 'Applies styles at 768px and up.',
        css: '@media (min-width: 768px) { ... }'
      },
      lg: {
        name: 'Large Breakpoint',
        description: 'Applies styles at 1024px and up.',
        css: '@media (min-width: 1024px) { ... }'
      },
      xl: {
        name: 'XL Breakpoint',
        description: 'Applies styles at 1280px and up.',
        css: '@media (min-width: 1280px) { ... }'
      },
      '2xl': {
        name: '2XL Breakpoint',
        description: 'Applies styles at 1536px and up.',
        css: '@media (min-width: 1536px) { ... }'
      }
    }

    return variantMap[variant] || null
  }

  private getUtilityInfo(className: string): { name: string; description: string; css: string } | null {
    // Spacing utilities
    const spacingMatch = className.match(/^([pm][xytrbl]?)-(\d+|auto)$/)
    if (spacingMatch) {
      const property = this.mapSpacingProperty(spacingMatch[1])
      const value = spacingMatch[2] === 'auto' ? 'auto' : `${this.spacingScale[parseInt(spacingMatch[2])]}rem`
      return {
        name: 'Spacing',
        description: `Sets ${property} to ${value}`,
        css: `${property}: ${value};`
      }
    }

    // Color utilities
    const colorMatch = className.match(/^(bg|text|border)-([a-z]+)-?(\d{2,3})?$/)
    if (colorMatch) {
      const property = this.mapColorProperty(colorMatch[1])
      const color = colorMatch[2]
      const shade = colorMatch[3] || '500'
      return {
        name: 'Color',
        description: `Sets ${property} to ${color}-${shade}`,
        css: `${property}: rgb(var(--color-${color}-${shade}));`
      }
    }

    // Display utilities
    if (['flex', 'grid', 'block', 'inline-block', 'hidden', 'table'].includes(className)) {
      return {
        name: 'Display',
        description: `Sets display property`,
        css: `display: ${className};`
      }
    }

    // Advanced features
    const advancedMap: Record<string, { name: string; description: string; css: string }> = {
      'grid-auto-fit': {
        name: 'Smart Grid',
        description: 'Auto-fit responsive grid with minmax columns.',
        css: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));'
      },
      'p-smart': {
        name: 'Smart Spacing',
        description: 'Fluid responsive padding.',
        css: 'padding: clamp(1rem, 2.5vw, 1.5rem);'
      },
      'text-perceptual': {
        name: 'Perceptual Color',
        description: 'Adaptive text color for readability.',
        css: 'color: color-mix(in oklch, canvasText 85%, currentColor);'
      },
      'animate-spring-md': {
        name: 'Spring Animation',
        description: 'Physics-based spring animation.',
        css: 'animation: spring-md 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);'
      },
      'animate-scroll-fade-in': {
        name: 'Scroll Animation',
        description: 'Scroll-driven fade-in effect.',
        css: 'animation: scroll-fade-in linear both; animation-timeline: view();'
      },
      'accent-primary': {
        name: 'Accent Color',
        description: 'Sets the accent color to primary theme color.',
        css: 'accent-color: hsl(var(--primary));'
      },
      'line-clamp-3': {
        name: 'Line Clamp',
        description: 'Limits text to 3 lines with ellipsis.',
        css: 'display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;'
      },
      'color-scheme-dark': {
        name: 'Color Scheme',
        description: 'Indicates dark mode preference.',
        css: 'color-scheme: dark;'
      }
    }

    return advancedMap[className] || null
  }

  private mapSpacingProperty(prop: string): string {
    const map: Record<string, string> = {
      p: 'padding',
      m: 'margin',
      px: 'padding-left, padding-right',
      py: 'padding-top, padding-bottom',
      pt: 'padding-top',
      pb: 'padding-bottom',
      pl: 'padding-left',
      pr: 'padding-right',
      mx: 'margin-left, margin-right',
      my: 'margin-top, margin-bottom',
      mt: 'margin-top',
      mb: 'margin-bottom',
      ml: 'margin-left',
      mr: 'margin-right'
    }
    return map[prop] || prop
  }

  private mapColorProperty(prop: string): string {
    const map: Record<string, string> = {
      bg: 'background-color',
      text: 'color',
      border: 'border-color'
    }
    return map[prop] || prop
  }

  private spacingScale: Record<number, string> = {
    0: '0',
    1: '0.25',
    2: '0.5',
    3: '0.75',
    4: '1',
    5: '1.25',
    6: '1.5',
    8: '2',
    10: '2.5',
    12: '3',
    16: '4',
    20: '5',
    24: '6',
    32: '8',
    40: '10',
    48: '12',
    56: '14',
    64: '16'
  }
}

/**
 * Activate extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('CoralCSS IntelliSense is now active!')

  // Register completion provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ['html', 'javascriptreact', 'typescriptreact', 'vue', 'svelte'],
    new CoralCSSCompletionProvider(),
    '-', ':', ' '
  )

  // Register hover provider
  const hoverProvider = vscode.languages.registerHoverProvider(
    ['html', 'javascriptreact', 'typescriptreact', 'vue', 'svelte'],
    new CoralCSSHoverProvider()
  )

  context.subscriptions.push(completionProvider, hoverProvider)
}

/**
 * Deactivate extension
 */
export function deactivate() {}
