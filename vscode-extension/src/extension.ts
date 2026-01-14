/**
 * CoralCSS VS Code Extension
 *
 * Provides IntelliSense, syntax highlighting, and documentation for CoralCSS classes.
 */

import * as vscode from 'vscode'

// CoralCSS utility categories and patterns
const UTILITY_PATTERNS = {
  // Spacing (including logical properties)
  spacing: {
    prefixes: ['p', 'm', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'ps', 'pe', 'pbs', 'pbe', 'pli', 'plb', 'mx', 'my', 'ms', 'me', 'mbs', 'mbe', 'mli', 'mlb', 'space-x', 'space-y', 'gap', 'gap-x', 'gap-y', 'gap-inline', 'gap-block'],
    description: 'Padding and margin utilities (including logical properties)',
    values: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '96', 'auto', 'px', '0.5', '1.5', '2.5', '3.5']
  },
  // Fluid spacing
  fluidSpacing: {
    prefixes: ['p-fluid', 'm-fluid', 'gap-fluid'],
    description: 'Fluid responsive spacing using clamp()',
    values: ['xs', 'sm', 'base', 'md', 'lg', 'xl']
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
  // Fluid Typography (Phase 1)
  fluidTypography: {
    prefixes: ['text-fluid'],
    description: 'Fluid responsive font sizes using clamp()',
    values: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'hero', 'display', 'giant']
  },
  // Gradient Text (Phase 1)
  gradientText: {
    prefixes: ['text-gradient'],
    description: 'Gradient text effects',
    values: ['primary', 'secondary', 'rainbow', 'sunset', 'ocean', 'forest', 'fire', 'neon', 'gold', 'silver', 'chrome', 'holographic', 'aurora', 'animate']
  },
  // Text Effects (Phase 1)
  textEffects: {
    prefixes: ['text-stroke', 'text-glow', 'text-neon', 'text-3d', 'text-mask'],
    description: 'Advanced text effects',
    values: {
      'text-stroke': ['1', '2', '3', '4', '5', 'white', 'black', 'current', 'primary'],
      'text-glow': ['sm', '', 'md', 'lg', 'xl'],
      'text-neon': ['blue', 'pink', 'green', 'red', 'yellow', 'purple', 'orange', 'cyan', 'white'],
      'text-3d': ['', 'sm', 'lg'],
      'text-mask': ['fade-b', 'fade-t', 'fade-r', 'fade-l']
    }
  },
  // 3D Text
  text3D: {
    prefixes: ['text-emboss', 'text-engrave', 'text-outline'],
    description: '3D text effects',
    values: ['', '2']
  },
  // Glassmorphism (Phase 2)
  glassmorphism: {
    prefixes: ['glass'],
    description: 'Glassmorphism effects with blur and transparency',
    values: ['', 'sm', 'lg', 'xl', 'dark', 'light', 'frost', 'crystal', 'morphism', 'primary', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'noise', 'border-glow']
  },
  // Neumorphism (Phase 2)
  neumorphism: {
    prefixes: ['neu'],
    description: 'Soft UI / Neumorphism effects',
    values: ['', 'sm', 'lg', 'xl', 'inset', 'flat', 'concave', 'convex', 'pressed', 'dark', 'dark-inset', 'primary', 'primary-inset', 'blue', 'blue-inset', 'green', 'green-inset', 'purple', 'purple-inset', 'gray', 'gray-inset']
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
    prefixes: ['transition', 'duration', 'ease', 'delay'],
    description: 'Transition utilities',
    values: {
      transition: ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'],
      duration: ['75', '100', '150', '200', '300', '500', '700', '1000'],
      ease: ['linear', 'in', 'out', 'in-out'],
      delay: ['75', '100', '150', '200', '300', '500', '700', '1000']
    }
  },
  // Physics-based Animations (Phase 3)
  physicsAnimations: {
    prefixes: ['ease-spring', 'animate-spring', 'animate-bounce', 'animate-elastic', 'animate-jello', 'animate-rubber'],
    description: 'Physics-based spring and elastic animations',
    values: {
      'ease-spring': ['', 'bounce', 'stiff', 'soft', 'wobbly', 'gentle'],
      'animate-spring': ['in', 'out'],
      'animate-bounce': ['in', 'subtle'],
      'animate-elastic': [''],
      'animate-jello': [''],
      'animate-rubber': ['band']
    }
  },
  // Animation Orchestration (Phase 3)
  animationOrchestration: {
    prefixes: ['stagger', 'stagger-child', 'animate'],
    description: 'Animation timing and orchestration',
    values: {
      stagger: ['50', '100', '150', '200', '250', '300', '400', '500'],
      'stagger-child': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      animate: ['once', 'twice', 'thrice', 'infinite', 'normal', 'reverse', 'alternate', 'fill-forwards', 'fill-backwards', 'fill-both', 'running', 'paused']
    }
  },
  // Animated Gradients (Phase 3)
  animatedGradients: {
    prefixes: ['gradient'],
    description: 'Animated gradient effects',
    values: ['animate', 'animate-slow', 'animate-fast', 'shimmer', 'wave', 'pulse', 'rotate', 'mesh']
  },
  // 50+ Animations (Phase 3)
  animations: {
    prefixes: ['animate'],
    description: 'Extended animation utilities',
    values: [
      'none', 'spin', 'spin-slow', 'ping', 'pulse', 'bounce',
      'float', 'float-slow', 'pulse-ring', 'pulse-dot',
      'wiggle', 'shake', 'swing', 'heartbeat', 'breathing', 'tada', 'wobble', 'flash', 'blink', 'pop',
      'slide-in-left', 'slide-in-right', 'slide-in-up', 'slide-in-down',
      'zoom-in', 'zoom-out', 'flip-in-x', 'flip-in-y',
      'marquee', 'marquee-reverse', 'morph', 'rotate-3d',
      'bg-pan-left', 'bg-pan-right', 'progress',
      'scroll-fade-in', 'scroll-scale'
    ]
  },
  // Skeleton Loading
  skeleton: {
    prefixes: ['skeleton'],
    description: 'Skeleton loading animations',
    values: ['', 'dark', 'pulse']
  },
  // Glow Effects
  glowEffects: {
    prefixes: ['glow', 'glow-pulse'],
    description: 'Glow and pulse effects',
    values: ['primary', 'blue', 'green', 'red', 'purple', 'pink', 'orange', 'yellow', 'cyan', 'primary-sm', 'primary-lg', 'blue-sm', 'blue-lg']
  },
  // Interactive (Phase 5)
  interactive: {
    prefixes: ['cursor', 'select', 'resize', 'snap', 'touch', 'pointer-events'],
    description: 'Interactive state utilities',
    values: {
      cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 's-resize', 'e-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'],
      select: ['none', 'text', 'all', 'auto', 'contain'],
      resize: ['none', 'x', 'y', 'both'],
      touch: ['auto', 'none', 'manipulation', 'pan-x', 'pan-left', 'pan-right', 'pan-y', 'pan-up', 'pan-down', 'pinch-zoom'],
      'pointer-events': ['none', 'auto', 'all', 'visible', 'painted', 'fill', 'stroke']
    }
  },
  // Selection Utilities (Phase 5)
  selection: {
    prefixes: ['selection', 'selection-text', 'caret', 'accent'],
    description: 'Selection and accent color utilities',
    values: {
      selection: ['primary', 'secondary', 'accent', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
      'selection-text': ['white', 'black', 'primary', 'secondary'],
      caret: ['primary', 'secondary', 'transparent', 'current'],
      accent: ['primary', 'auto', 'current']
    }
  },
  // Extended Aspect Ratios (Phase 4)
  aspectRatios: {
    prefixes: ['aspect'],
    description: 'Extended aspect ratio utilities',
    values: ['auto', 'square', 'video', 'golden', 'silver', 'cinema', 'ultra', 'imax', 'photo', 'portrait', 'story', 'a4', 'letter', 'legal', 'film-35mm', 'anamorphic', 'tv', 'widescreen', 'superwide', 'vertical']
  },
  // Logical Properties - Position (Phase 4)
  logicalPosition: {
    prefixes: ['start', 'end', 'inset-inline', 'inset-block'],
    description: 'Logical positioning utilities',
    values: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', 'auto', 'full', '1/2', '1/3', '2/3', '1/4', '3/4']
  },
  // Logical Properties - Border (Phase 4)
  logicalBorder: {
    prefixes: ['border-s', 'border-e', 'border-bs', 'border-be', 'rounded-ss', 'rounded-se', 'rounded-es', 'rounded-ee', 'rounded-s', 'rounded-e'],
    description: 'Logical border utilities',
    values: ['', '0', '2', '4', '8', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']
  },
  // Logical Properties - Float & Clear (Phase 4)
  logicalFloat: {
    prefixes: ['float', 'clear'],
    description: 'Logical float and clear utilities',
    values: ['start', 'end', 'left', 'right', 'none', 'both']
  },
  // Writing Mode & Direction (Phase 4)
  writingMode: {
    prefixes: ['writing', 'dir', 'bidi', 'text-orientation'],
    description: 'Writing mode and text direction utilities',
    values: {
      writing: ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
      dir: ['ltr', 'rtl'],
      bidi: ['normal', 'embed', 'isolate', 'override'],
      'text-orientation': ['mixed', 'upright', 'sideways']
    }
  },
  // Logical Size (Phase 4)
  logicalSize: {
    prefixes: ['inline-size', 'block-size', 'min-inline-size', 'max-inline-size', 'min-block-size', 'max-block-size'],
    description: 'Logical size utilities',
    values: ['0', 'auto', 'full', 'screen', 'min', 'max', 'fit', '1/2', '1/3', '2/3', '1/4', '3/4']
  },
  // Overflow Logical (Phase 4)
  overflowLogical: {
    prefixes: ['overflow-inline', 'overflow-block'],
    description: 'Logical overflow utilities',
    values: ['auto', 'hidden', 'scroll', 'visible', 'clip']
  },
  // Scroll Logical (Phase 4)
  scrollLogical: {
    prefixes: ['scroll-ms', 'scroll-me', 'scroll-mbs', 'scroll-mbe', 'scroll-ps', 'scroll-pe', 'scroll-pbs', 'scroll-pbe'],
    description: 'Logical scroll margin/padding utilities',
    values: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24']
  },
  // Background Blur (Phase 4)
  bgBlur: {
    prefixes: ['bg-blur', 'bg-frosted'],
    description: 'Background blur utilities',
    values: ['xs', 'sm', '', 'md', 'lg', 'xl', '2xl', '3xl', 'dark']
  },
  // Performance Hints (Phase 5)
  performance: {
    prefixes: ['will-change', 'contain', 'content-visibility'],
    description: 'Performance optimization utilities',
    values: {
      'will-change': ['auto', 'scroll', 'contents', 'transform', 'opacity'],
      contain: ['none', 'strict', 'content', 'size', 'layout', 'style', 'paint', 'inline-size', 'layout-paint', 'size-layout'],
      'content-visibility': ['visible', 'hidden', 'auto']
    }
  },
  // Advanced Rendering (Phase 5)
  rendering: {
    prefixes: ['color-scheme', 'image-render', 'text-render', 'print-color-adjust', 'forced-color-adjust'],
    description: 'Advanced rendering utilities',
    values: {
      'color-scheme': ['normal', 'light', 'dark', 'light-dark', 'only-light', 'only-dark'],
      'image-render': ['auto', 'crisp', 'pixelated', 'smooth', 'optimizeQuality'],
      'text-render': ['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision'],
      'print-color-adjust': ['economy', 'exact'],
      'forced-color-adjust': ['auto', 'none']
    }
  },
  // Backdrop Utilities (Phase 5)
  backdrop: {
    prefixes: ['backdrop-blur', 'backdrop-dark', 'backdrop-light', 'scrollbar-gutter'],
    description: 'Dialog/modal backdrop utilities',
    values: {
      'backdrop-blur': ['sm', '', 'lg'],
      'backdrop-dark': ['', 'er'],
      'scrollbar-gutter': ['auto', 'stable', 'stable-both']
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

    // Add advanced features (Phases 1-6)
    const advancedFeatures = [
      // Phase 1: Typography
      { name: 'text-fluid-base', detail: 'Fluid typography', docs: 'Responsive font size using clamp() that scales smoothly between breakpoints.' },
      { name: 'text-fluid-hero', detail: 'Hero fluid text', docs: 'Large hero text that scales from 3rem to 6rem based on viewport.' },
      { name: 'text-gradient-rainbow', detail: 'Rainbow gradient text', docs: 'Animated rainbow gradient effect for text.' },
      { name: 'text-gradient-aurora', detail: 'Aurora gradient text', docs: 'Aurora borealis-inspired gradient for text.' },
      { name: 'text-neon-blue', detail: 'Neon blue text', docs: 'Glowing neon blue text effect with animated glow.' },
      { name: 'text-stroke-2', detail: 'Text stroke', docs: 'Adds a 2px stroke outline to text.' },
      { name: 'text-glow-lg', detail: 'Text glow', docs: 'Large glowing text effect.' },
      { name: 'text-3d', detail: '3D text effect', docs: 'Creates a 3D shadow effect on text.' },
      { name: 'text-emboss', detail: 'Embossed text', docs: 'Raised/embossed text effect.' },

      // Phase 2: Glassmorphism & Neumorphism
      { name: 'glass', detail: 'Glassmorphism', docs: 'Frosted glass effect with backdrop blur and transparency.' },
      { name: 'glass-frost', detail: 'Frosted glass', docs: 'Heavy frosted glass effect with strong blur.' },
      { name: 'glass-morphism', detail: 'Full glass morphism', docs: 'Complete glassmorphism effect with border and shadow.' },
      { name: 'neu', detail: 'Neumorphism', docs: 'Soft UI shadow effect for raised elements.' },
      { name: 'neu-inset', detail: 'Inset neumorphism', docs: 'Pressed/inset soft UI effect.' },
      { name: 'neu-convex', detail: 'Convex neumorphism', docs: 'Convex soft UI with gradient highlight.' },

      // Phase 3: Animations
      { name: 'ease-spring', detail: 'Spring easing', docs: 'Physics-based spring easing function for natural motion.' },
      { name: 'animate-spring-in', detail: 'Spring entrance', docs: 'Bouncy spring entrance animation.' },
      { name: 'animate-elastic', detail: 'Elastic animation', docs: 'Elastic overshoot animation effect.' },
      { name: 'animate-jello', detail: 'Jello wobble', docs: 'Wobbly jello-like animation effect.' },
      { name: 'stagger-100', detail: 'Stagger delay', docs: 'Adds 100ms stagger delay for child animations.' },
      { name: 'gradient-animate', detail: 'Animated gradient', docs: 'Smoothly animating gradient background.' },
      { name: 'gradient-shimmer', detail: 'Shimmer effect', docs: 'Shimmering gradient loading effect.' },
      { name: 'skeleton', detail: 'Skeleton loading', docs: 'Skeleton placeholder animation for loading states.' },
      { name: 'glow-pulse', detail: 'Pulsing glow', docs: 'Animated pulsing glow effect.' },

      // Phase 4: Layout
      { name: 'aspect-golden', detail: 'Golden ratio', docs: 'Aspect ratio of 1.618 (golden ratio).' },
      { name: 'aspect-cinema', detail: 'Cinemascope', docs: 'Aspect ratio of 2.35 (cinemascope film).' },
      { name: 'ps-4', detail: 'Padding start', docs: 'Logical padding-inline-start for RTL support.' },
      { name: 'me-4', detail: 'Margin end', docs: 'Logical margin-inline-end for RTL support.' },
      { name: 'border-s', detail: 'Border start', docs: 'Logical border-inline-start for RTL support.' },
      { name: 'rounded-ss', detail: 'Rounded start-start', docs: 'Logical border-start-start-radius.' },
      { name: 'writing-vertical-rl', detail: 'Vertical writing', docs: 'Vertical writing mode, right-to-left.' },
      { name: 'bg-frosted', detail: 'Frosted background', docs: 'Frosted glass background effect with blur and saturation.' },

      // Phase 5: Interactive
      { name: 'cursor-grab', detail: 'Grab cursor', docs: 'Displays grab hand cursor for draggable elements.' },
      { name: 'selection-primary', detail: 'Selection color', docs: 'Sets text selection highlight to primary color.' },
      { name: 'touch-manipulation', detail: 'Touch manipulation', docs: 'Enables panning and zooming but disables double-tap.' },
      { name: 'will-change-transform', detail: 'Will change', docs: 'Hints browser to optimize for transform changes.' },
      { name: 'contain-layout', detail: 'CSS containment', docs: 'Contains layout changes within element.' },
      { name: 'content-visibility-auto', detail: 'Content visibility', docs: 'Enables browser to skip rendering off-screen content.' },
      { name: 'color-scheme-dark', detail: 'Dark color scheme', docs: 'Indicates dark mode preference to the browser.' },
      { name: 'scrollbar-gutter-stable', detail: 'Scrollbar gutter', docs: 'Reserves space for scrollbar to prevent layout shift.' },

      // Legacy
      { name: 'smart-grid', detail: 'Auto-fit responsive grid', docs: 'Responsive grid that automatically adjusts column count based on available space.' },
      { name: 'p-smart', detail: 'Fluid responsive padding', docs: 'Padding that uses clamp() for fluid responsive sizing.' },
      { name: 'accent-primary', detail: 'Primary accent color', docs: 'Sets the accent color to the primary theme color.' },
      { name: 'line-clamp-3', detail: 'Line clamping', docs: 'Limits text to 3 lines with ellipsis.' },
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

    // Add component data attributes (Phase 6)
    const componentAttributes = [
      { name: 'data-coral-ai-chat', detail: 'AI Chat Interface', docs: 'ChatGPT/Claude-like AI chat interface component with streaming support.' },
      { name: 'data-coral-kanban', detail: 'Kanban Board', docs: 'Trello-style drag-and-drop Kanban board component.' },
      { name: 'data-coral-terminal', detail: 'Terminal Emulator', docs: 'Terminal/console emulator with themes and ANSI color support.' },
      { name: 'data-coral-command', detail: 'Command Palette', docs: 'VSCode/Raycast style command palette component.' },
      { name: 'data-coral-data-table', detail: 'Data Table', docs: 'Excel-like data grid with sorting and filtering.' },
      { name: 'data-coral-virtual-list', detail: 'Virtual List', docs: 'Virtualized scrolling list for large datasets.' },
      { name: 'data-coral-tree', detail: 'Tree View', docs: 'File explorer-style tree component.' },
      { name: 'data-coral-code', detail: 'Code Block', docs: 'Syntax highlighted code block component.' },
      { name: 'data-coral-accordion', detail: 'Accordion', docs: 'Collapsible accordion component.' },
      { name: 'data-coral-tabs', detail: 'Tabs', docs: 'Tab navigation component.' },
      { name: 'data-coral-modal', detail: 'Modal Dialog', docs: 'Accessible modal dialog component.' },
      { name: 'data-coral-tooltip', detail: 'Tooltip', docs: 'Hoverable tooltip component.' },
      { name: 'data-coral-dropdown', detail: 'Dropdown Menu', docs: 'Accessible dropdown menu component.' },
    ]

    for (const comp of componentAttributes) {
      const item = new vscode.CompletionItem(comp.name, vscode.CompletionItemKind.Property)
      item.detail = comp.detail
      item.documentation = new vscode.MarkdownString(`**Component**: ${comp.detail}\n\n${comp.docs}\n\n\`\`\`html\n<div ${comp.name}></div>\n\`\`\``)
      item.sortText = `5_${comp.name}`
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

    // Advanced features (Phases 1-6)
    const advancedMap: Record<string, { name: string; description: string; css: string }> = {
      // Phase 1: Typography
      'text-fluid-base': {
        name: 'Fluid Typography',
        description: 'Responsive font size using clamp().',
        css: 'font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);'
      },
      'text-fluid-hero': {
        name: 'Hero Fluid Text',
        description: 'Large responsive hero text.',
        css: 'font-size: clamp(3rem, 2rem + 5vw, 6rem);'
      },
      'text-gradient-rainbow': {
        name: 'Rainbow Gradient Text',
        description: 'Animated rainbow gradient on text.',
        css: 'background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);\nbackground-clip: text;\n-webkit-text-fill-color: transparent;'
      },
      'text-neon-blue': {
        name: 'Neon Blue Text',
        description: 'Glowing neon blue text effect.',
        css: 'color: #00d4ff;\ntext-shadow: 0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff;'
      },
      'text-glow-lg': {
        name: 'Text Glow',
        description: 'Large glowing text effect.',
        css: 'text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;'
      },
      'text-3d': {
        name: '3D Text',
        description: '3D shadow effect on text.',
        css: 'text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #bbb, 3px 3px 0 #aaa, 4px 4px 0 #999;'
      },
      'text-emboss': {
        name: 'Embossed Text',
        description: 'Raised embossed text effect.',
        css: 'text-shadow: -1px -1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(255,255,255,0.8);'
      },

      // Phase 2: Glassmorphism & Neumorphism
      'glass': {
        name: 'Glassmorphism',
        description: 'Frosted glass effect.',
        css: 'background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255, 255, 255, 0.2);'
      },
      'glass-frost': {
        name: 'Frosted Glass',
        description: 'Heavy frosted glass effect.',
        css: 'background: rgba(255, 255, 255, 0.25);\nbackdrop-filter: blur(16px) saturate(180%);'
      },
      'glass-morphism': {
        name: 'Glass Morphism',
        description: 'Complete glassmorphism effect.',
        css: 'background: rgba(255, 255, 255, 0.15);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.3);\nbox-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);'
      },
      'neu': {
        name: 'Neumorphism',
        description: 'Soft UI raised effect.',
        css: 'background: #e0e0e0;\nbox-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;'
      },
      'neu-inset': {
        name: 'Neumorphism Inset',
        description: 'Soft UI pressed effect.',
        css: 'background: #e0e0e0;\nbox-shadow: inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff;'
      },

      // Phase 3: Animations
      'ease-spring': {
        name: 'Spring Easing',
        description: 'Physics-based spring timing function.',
        css: 'transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);'
      },
      'animate-spring-in': {
        name: 'Spring Entrance',
        description: 'Bouncy spring entrance animation.',
        css: 'animation: spring-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;'
      },
      'animate-elastic': {
        name: 'Elastic Animation',
        description: 'Elastic overshoot animation.',
        css: 'animation: elastic 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);'
      },
      'gradient-animate': {
        name: 'Animated Gradient',
        description: 'Smoothly animating gradient background.',
        css: 'background-size: 200% 200%;\nanimation: gradient-animate 3s ease infinite;'
      },
      'gradient-shimmer': {
        name: 'Shimmer Effect',
        description: 'Loading shimmer effect.',
        css: 'background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);\nbackground-size: 200% 100%;\nanimation: shimmer 1.5s infinite;'
      },
      'skeleton': {
        name: 'Skeleton Loading',
        description: 'Skeleton placeholder animation.',
        css: 'background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\nbackground-size: 200% 100%;\nanimation: skeleton 1.5s ease-in-out infinite;'
      },

      // Phase 4: Layout
      'aspect-golden': {
        name: 'Golden Ratio',
        description: 'Aspect ratio of 1.618.',
        css: 'aspect-ratio: 1.618;'
      },
      'aspect-cinema': {
        name: 'Cinemascope',
        description: 'Aspect ratio of 2.35.',
        css: 'aspect-ratio: 2.35;'
      },
      'bg-frosted': {
        name: 'Frosted Background',
        description: 'Frosted glass background.',
        css: 'backdrop-filter: blur(12px) saturate(180%);\nbackground: rgba(255, 255, 255, 0.7);'
      },

      // Phase 5: Interactive & Performance
      'will-change-transform': {
        name: 'Will Change',
        description: 'Hints browser to optimize for transforms.',
        css: 'will-change: transform;'
      },
      'contain-layout': {
        name: 'CSS Containment',
        description: 'Contains layout changes within element.',
        css: 'contain: layout;'
      },
      'content-visibility-auto': {
        name: 'Content Visibility',
        description: 'Skip rendering off-screen content.',
        css: 'content-visibility: auto;\ncontain-intrinsic-size: auto 500px;'
      },
      'scrollbar-gutter-stable': {
        name: 'Scrollbar Gutter',
        description: 'Reserves space for scrollbar.',
        css: 'scrollbar-gutter: stable;'
      },

      // Legacy
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

    // Handle logical properties
    const logicalMatch = className.match(/^(ps|pe|pbs|pbe|pli|plb|ms|me|mbs|mbe|mli|mlb)-(\d+|auto)$/)
    if (logicalMatch) {
      const propMap: Record<string, string> = {
        ps: 'padding-inline-start',
        pe: 'padding-inline-end',
        pbs: 'padding-block-start',
        pbe: 'padding-block-end',
        pli: 'padding-inline',
        plb: 'padding-block',
        ms: 'margin-inline-start',
        me: 'margin-inline-end',
        mbs: 'margin-block-start',
        mbe: 'margin-block-end',
        mli: 'margin-inline',
        mlb: 'margin-block'
      }
      const property = propMap[logicalMatch[1]] || logicalMatch[1]
      const value = logicalMatch[2] === 'auto' ? 'auto' : `${this.spacingScale[parseInt(logicalMatch[2])] || logicalMatch[2]}rem`
      return {
        name: 'Logical Spacing',
        description: `Sets ${property} to ${value} (RTL-aware)`,
        css: `${property}: ${value};`
      }
    }

    // Handle fluid typography
    const fluidMatch = className.match(/^text-fluid-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|hero|display|giant)$/)
    if (fluidMatch) {
      const fluidSizes: Record<string, string> = {
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)',
        base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        '3xl': 'clamp(1.875rem, 1.5rem + 1.9vw, 2.5rem)',
        '4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)',
        '5xl': 'clamp(3rem, 2.2rem + 4vw, 4rem)',
        hero: 'clamp(3rem, 2rem + 5vw, 6rem)',
        display: 'clamp(4rem, 2.5rem + 7.5vw, 8rem)',
        giant: 'clamp(6rem, 3rem + 15vw, 12rem)'
      }
      return {
        name: 'Fluid Typography',
        description: `Responsive font size that scales with viewport.`,
        css: `font-size: ${fluidSizes[fluidMatch[1]]};`
      }
    }

    // Handle glass utilities
    const glassMatch = className.match(/^glass(-sm|-lg|-xl|-dark|-light|-frost|-crystal|-morphism)?$/)
    if (glassMatch) {
      return {
        name: 'Glassmorphism',
        description: 'Frosted glass effect with backdrop blur.',
        css: 'background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255, 255, 255, 0.2);'
      }
    }

    // Handle neu utilities
    const neuMatch = className.match(/^neu(-sm|-lg|-xl|-inset|-flat|-concave|-convex|-pressed|-dark)?$/)
    if (neuMatch) {
      return {
        name: 'Neumorphism',
        description: 'Soft UI shadow effect.',
        css: 'box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff;'
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
