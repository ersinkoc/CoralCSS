/**
 * CoralCSS DevTools Inspector
 *
 * A lightweight utility inspector for debugging and exploring CoralCSS classes.
 * Can be injected into any page to inspect utility usage.
 *
 * Note: This component uses innerHTML for rendering the inspector UI.
 * All content is generated programmatically from class names - no user input
 * is rendered directly. Class names are escaped before display.
 *
 * @module devtools/inspector
 */

// ============================================================================
// Types
// ============================================================================

export interface InspectorConfig {
  /** Show inspector panel on initialization */
  autoShow?: boolean
  /** Position of the inspector panel */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Enable keyboard shortcuts */
  enableShortcuts?: boolean
  /** Dark mode */
  darkMode?: boolean
  /** Highlight hovered elements */
  enableHighlight?: boolean
}

export interface ClassInfo {
  className: string
  category: string
  description: string
  css: string
  isCoralCSS: boolean
}

export interface ElementInfo {
  tagName: string
  id?: string
  classes: ClassInfo[]
  computedStyles: Record<string, string>
  element: HTMLElement
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// ============================================================================
// Utility Category Detection
// ============================================================================

const UTILITY_PATTERNS: Record<string, RegExp> = {
  // Spacing
  'spacing': /^-?[pm][xytrblseib]?-[\d.]+$|^-?[pm][xytrblseib]?-(auto|px)$|^space-[xy]-[\d.]+$|^gap(-[xy])?-[\d.]+$/,
  'fluid-spacing': /^[pm]-fluid-(xs|sm|base|md|lg|xl)$/,

  // Sizing
  'sizing': /^(w|h|min-w|max-w|min-h|max-h)-[\w\/]+$/,
  'logical-size': /^(inline-size|block-size|min-inline-size|max-inline-size|min-block-size|max-block-size)-[\w\/]+$/,

  // Colors
  'background': /^bg-([\w-]+(-\d+)?|transparent|current|inherit|\[.+\])$/,
  'text-color': /^text-([\w-]+(-\d+)?|transparent|current|inherit|\[.+\])$/,
  'border-color': /^border-([\w-]+(-\d+)?)$/,

  // Typography
  'font': /^font-(sans|serif|mono|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  'text-size': /^text-(xs|sm|base|lg|xl|[2-9]xl)$/,
  'fluid-text': /^text-fluid-(xs|sm|base|lg|xl|[2-5]xl|hero|display|giant)$/,
  'gradient-text': /^text-gradient-(primary|secondary|rainbow|sunset|ocean|forest|fire|neon|gold|silver|chrome|holographic|aurora|animate)$/,
  'neon-text': /^text-neon-(blue|pink|green|red|yellow|purple|orange|cyan|white)$/,
  'text-effect': /^text-(stroke|glow|3d|emboss|engrave|outline|mask)(-[\w-]+)?$/,
  'leading': /^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/,
  'tracking': /^tracking-(tighter|tight|normal|wide|wider|widest)$/,

  // Layout
  'display': /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|hidden|table|table-cell|table-row|contents|flow-root|list-item)$/,
  'position': /^(static|fixed|absolute|relative|sticky)$/,
  'flex': /^flex-(row|col|row-reverse|col-reverse|wrap|nowrap|wrap-reverse|1|auto|initial|none|grow|shrink)(-\d+)?$/,
  'grid': /^grid-(cols|rows)-[\w]+$|^(col|row)-(span|start|end)-[\w]+$/,
  'justify': /^justify-(start|end|center|between|around|evenly|stretch|items-start|items-end|items-center|items-stretch|self-start|self-end|self-center|self-stretch)$/,
  'items': /^items-(start|end|center|baseline|stretch)$/,
  'gap': /^gap(-[xy])?-[\d.]+$/,

  // Borders
  'border': /^border(-[trblxyse])?(-[\d]+)?$/,
  'rounded': /^rounded(-[trblxyseab]{1,2})?(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/,
  'logical-border': /^(border-s|border-e|border-bs|border-be|rounded-ss|rounded-se|rounded-es|rounded-ee|rounded-s|rounded-e)(-[\w]+)?$/,
  'ring': /^ring(-[\d]+)?(-offset-[\d]+)?(-[\w-]+)?$/,

  // Effects
  'shadow': /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/,
  'opacity': /^opacity-[\d]+$/,
  'blur': /^blur(-none|-sm|-md|-lg|-xl|-2xl|-3xl)?$/,
  'backdrop': /^backdrop-(blur|brightness|contrast|grayscale|hue-rotate|invert|opacity|saturate|sepia)(-[\w]+)?$/,

  // Glassmorphism & Neumorphism (Phase 2)
  'glass': /^glass(-sm|-lg|-xl|-dark|-light|-frost|-crystal|-morphism|-primary|-blue|-green|-purple|-orange|-pink|-cyan|-noise|-border-glow)?$/,
  'neumorphism': /^neu(-sm|-lg|-xl|-inset|-flat|-concave|-convex|-pressed|-dark|-dark-inset|-primary|-primary-inset|-blue|-blue-inset|-green|-green-inset|-purple|-purple-inset|-gray|-gray-inset)?$/,

  // Transforms
  'transform': /^(scale|rotate|translate|skew|origin)-[\w-\/]+$/,

  // Transitions & Animations
  'transition': /^transition(-none|-all|-colors|-opacity|-shadow|-transform)?$/,
  'duration': /^duration-[\d]+$/,
  'delay': /^delay-[\d]+$/,
  'ease': /^ease-(linear|in|out|in-out|spring(-bounce|-stiff|-soft|-wobbly|-gentle)?)$/,

  // Physics Animations (Phase 3)
  'animation': /^animate-(none|spin|spin-slow|ping|pulse|bounce|float|float-slow|pulse-ring|pulse-dot|wiggle|shake|swing|heartbeat|breathing|tada|wobble|flash|blink|pop|slide-in-left|slide-in-right|slide-in-up|slide-in-down|zoom-in|zoom-out|flip-in-x|flip-in-y|marquee|marquee-reverse|morph|rotate-3d|bg-pan-left|bg-pan-right|progress|spring-in|spring-out|bounce-in|bounce-subtle|elastic|jello|rubber-band|scroll-fade-in|scroll-scale)$/,
  'stagger': /^stagger(-child)?-[\d]+$/,
  'animation-control': /^animate-(once|twice|thrice|infinite|normal|reverse|alternate|fill-forwards|fill-backwards|fill-both|running|paused)$/,

  // Animated Gradients
  'gradient-animate': /^gradient-(animate|animate-slow|animate-fast|shimmer|wave|pulse|rotate|mesh)$/,

  // Skeleton & Glow
  'skeleton': /^skeleton(-dark|-pulse)?$/,
  'glow': /^glow(-pulse)?(-primary|-blue|-green|-red|-purple|-pink|-orange|-yellow|-cyan)?(-sm|-lg)?$/,

  // Aspect Ratios (Phase 4)
  'aspect': /^aspect-(auto|square|video|golden|silver|cinema|ultra|imax|photo|portrait|story|a4|letter|legal|film-35mm|anamorphic|tv|widescreen|superwide|vertical)$/,

  // Logical Properties (Phase 4)
  'logical-spacing': /^(ps|pe|pbs|pbe|pli|plb|ms|me|mbs|mbe|mli|mlb)-[\d.]+$|^(ps|pe|pbs|pbe|pli|plb|ms|me|mbs|mbe|mli|mlb)-auto$/,
  'logical-position': /^(start|end|inset-inline|inset-block)-[\w\/]+$/,
  'logical-float': /^(float|clear)-(start|end)$/,
  'writing-mode': /^(writing-(horizontal-tb|vertical-rl|vertical-lr)|dir-(ltr|rtl)|bidi-(normal|embed|isolate|override)|text-orientation-(mixed|upright|sideways))$/,
  'overflow-logical': /^overflow-(inline|block)-(auto|hidden|scroll|visible|clip)$/,
  'scroll-logical': /^scroll-(ms|me|mbs|mbe|ps|pe|pbs|pbe)-[\d]+$/,

  // Background Blur
  'bg-blur': /^bg-(blur(-xs|-sm|-md|-lg|-xl|-2xl|-3xl)?|frosted(-dark)?)$/,

  // Interactive (Phase 5)
  'cursor': /^cursor-(auto|default|pointer|wait|text|move|help|not-allowed|none|context-menu|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|col-resize|row-resize|[nsew]{1,2}-resize|zoom-in|zoom-out)$/,
  'select': /^select-(none|text|all|auto|contain)$/,
  'touch': /^touch-(auto|none|manipulation|pan-x|pan-left|pan-right|pan-y|pan-up|pan-down|pinch-zoom)$/,
  'pointer-events': /^pointer-events-(none|auto|all|visible|painted|fill|stroke)$/,
  'selection': /^selection(-text)?-(primary|secondary|accent|[\w-]+)$/,
  'caret': /^caret-(primary|secondary|transparent|current|[\w-]+)$/,
  'accent': /^accent-(primary|auto|current|[\w-]+)$/,

  // Performance (Phase 5)
  'will-change': /^will-change-(auto|scroll|contents|transform|opacity)$/,
  'contain': /^contain-(none|strict|content|size|layout|style|paint|inline-size|layout-paint|size-layout)$/,
  'content-visibility': /^content-visibility-(visible|hidden|auto)$/,

  // Rendering (Phase 5)
  'color-scheme': /^color-scheme-(normal|light|dark|light-dark|only-light|only-dark)$/,
  'image-render': /^image-render-(auto|crisp|pixelated|smooth|optimizeQuality)$/,
  'text-render': /^text-render-(auto|optimizeSpeed|optimizeLegibility|geometricPrecision)$/,
  'print-color-adjust': /^print-color-adjust-(economy|exact)$/,
  'forced-color-adjust': /^forced-color-adjust-(auto|none)$/,

  // Backdrop utilities
  'backdrop-style': /^backdrop-(dark|darker|light)$/,
  'scrollbar-gutter': /^scrollbar-gutter-(auto|stable|stable-both)$/,

  // Accessibility
  'sr-only': /^(sr-only|not-sr-only)$/,

  // Container queries
  'container': /^@?container(-[\w]+)?$/,

  // Overflow
  'overflow': /^overflow(-[xy])?-(auto|hidden|visible|scroll|clip)$/,

  // Z-index
  'z-index': /^z-(auto|0|10|20|30|40|50)$/,

  // Object fit/position
  'object': /^object-(contain|cover|fill|none|scale-down|center|top|bottom|left|right)$/,

  // Line clamp
  'line-clamp': /^line-clamp-(none|\d+)$/,
}

/**
 * Detect category of a class name
 */
function detectCategory(className: string): { category: string; isCoralCSS: boolean } {
  for (const [category, pattern] of Object.entries(UTILITY_PATTERNS)) {
    if (pattern.test(className)) {
      return { category, isCoralCSS: true }
    }
  }
  return { category: 'custom', isCoralCSS: false }
}

/**
 * Generate description for a class
 */
function generateDescription(className: string, category: string): string {
  const descriptions: Record<string, (c: string) => string> = {
    'spacing': (c) => `Spacing utility: ${c}`,
    'fluid-spacing': (c) => `Fluid responsive spacing: ${c}`,
    'sizing': (c) => `Size utility: ${c}`,
    'background': (c) => `Background color: ${c}`,
    'text-color': (c) => `Text color: ${c}`,
    'fluid-text': () => `Fluid typography: scales responsively`,
    'gradient-text': () => `Gradient text effect`,
    'neon-text': () => `Neon glow text effect`,
    'text-effect': () => `Advanced text effect`,
    'glass': () => `Glassmorphism effect: frosted glass with blur`,
    'neumorphism': () => `Neumorphism: soft UI shadow effect`,
    'animation': (c) => `Animation: ${c.replace('animate-', '')}`,
    'stagger': () => `Staggered animation delay`,
    'gradient-animate': () => `Animated gradient effect`,
    'skeleton': () => `Skeleton loading placeholder`,
    'glow': () => `Glow/pulse effect`,
    'aspect': (c) => `Aspect ratio: ${c.replace('aspect-', '')}`,
    'logical-spacing': () => `Logical spacing for RTL support`,
    'cursor': (c) => `Cursor style: ${c.replace('cursor-', '')}`,
    'touch': (c) => `Touch interaction: ${c.replace('touch-', '')}`,
    'will-change': () => `Performance hint for animations`,
    'contain': () => `CSS containment for performance`,
    'content-visibility': () => `Content visibility optimization`,
    'custom': () => `Custom/external class`,
  }

  return descriptions[category]?.(className) || `${category}: ${className}`
}

// ============================================================================
// Inspector Class
// ============================================================================

export class CoralInspector {
  private config: Required<InspectorConfig>
  private panel: HTMLElement | null = null
  private isActive = false
  private hoveredElement: HTMLElement | null = null
  private highlightOverlay: HTMLElement | null = null
  private selectedInfo: ElementInfo | null = null

  // Bound handler for keyboard shortcuts
  private boundHandleKeydown: ((e: KeyboardEvent) => void) | null = null

  constructor(config: InspectorConfig = {}) {
    this.config = {
      autoShow: config.autoShow ?? false,
      position: config.position ?? 'bottom-right',
      enableShortcuts: config.enableShortcuts ?? true,
      darkMode: config.darkMode ?? true,
      enableHighlight: config.enableHighlight ?? true,
    }

    this.init()
  }

  private init(): void {
    this.createPanel()
    this.createHighlightOverlay()

    if (this.config.enableShortcuts) {
      this.bindShortcuts()
    }

    if (this.config.autoShow) {
      this.show()
    }
  }

  private createPanel(): void {
    this.panel = document.createElement('div')
    this.panel.id = 'coral-inspector-panel'
    this.buildPanelContent()
    this.applyPanelStyles()
    document.body.appendChild(this.panel)
    this.bindPanelEvents()
  }

  private buildPanelContent(): void {
    if (!this.panel) {return}

    // Build header
    const header = document.createElement('div')
    header.className = 'coral-inspector-header'

    const logo = document.createElement('span')
    logo.className = 'coral-inspector-logo'
    logo.textContent = '\uD83D\uDC1A CoralCSS Inspector'

    const controls = document.createElement('div')
    controls.className = 'coral-inspector-controls'

    const toggleBtn = document.createElement('button')
    toggleBtn.id = 'coral-inspector-toggle'
    toggleBtn.title = 'Toggle inspection (Alt+I)'
    toggleBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>'

    const closeBtn = document.createElement('button')
    closeBtn.id = 'coral-inspector-close'
    closeBtn.title = 'Close (Esc)'
    closeBtn.textContent = '\u00D7'

    controls.appendChild(toggleBtn)
    controls.appendChild(closeBtn)
    header.appendChild(logo)
    header.appendChild(controls)

    // Build content
    const content = document.createElement('div')
    content.className = 'coral-inspector-content'

    const info = document.createElement('div')
    info.id = 'coral-inspector-info'

    const hint = document.createElement('p')
    hint.className = 'coral-inspector-hint'
    hint.innerHTML = 'Press <kbd>Alt+I</kbd> to start inspecting elements'
    info.appendChild(hint)
    content.appendChild(info)

    // Build footer
    const footer = document.createElement('div')
    footer.className = 'coral-inspector-footer'

    const stats = document.createElement('span')
    stats.id = 'coral-inspector-stats'
    stats.textContent = '0 CoralCSS classes'
    footer.appendChild(stats)

    // Assemble panel
    this.panel.appendChild(header)
    this.panel.appendChild(content)
    this.panel.appendChild(footer)
  }

  private createHighlightOverlay(): void {
    this.highlightOverlay = document.createElement('div')
    this.highlightOverlay.id = 'coral-inspector-highlight'
    this.highlightOverlay.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: 2px solid #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      z-index: 999998;
      display: none;
      transition: all 0.1s ease;
    `
    document.body.appendChild(this.highlightOverlay)
  }

  private applyPanelStyles(): void {
    if (!this.panel) {return}

    const positions: Record<string, string> = {
      'top-right': 'top: 16px; right: 16px;',
      'top-left': 'top: 16px; left: 16px;',
      'bottom-right': 'bottom: 16px; right: 16px;',
      'bottom-left': 'bottom: 16px; left: 16px;',
    }

    const isDark = this.config.darkMode

    this.panel.style.cssText = `
      position: fixed;
      ${positions[this.config.position]}
      width: 360px;
      max-height: 500px;
      background: ${isDark ? '#1e1e2e' : '#ffffff'};
      color: ${isDark ? '#cdd6f4' : '#1e1e2e'};
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      display: none;
      overflow: hidden;
    `

    const style = document.createElement('style')
    style.id = 'coral-inspector-styles'
    style.textContent = `
      .coral-inspector-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: ${isDark ? '#313244' : '#f1f5f9'};
        border-bottom: 1px solid ${isDark ? '#45475a' : '#e2e8f0'};
      }
      .coral-inspector-logo {
        font-weight: 600;
        font-size: 14px;
      }
      .coral-inspector-controls {
        display: flex;
        gap: 8px;
      }
      .coral-inspector-controls button {
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .coral-inspector-controls button:hover {
        background: ${isDark ? '#45475a' : '#e2e8f0'};
      }
      .coral-inspector-controls button.active {
        background: #3b82f6;
        color: white;
      }
      .coral-inspector-content {
        padding: 16px;
        max-height: 380px;
        overflow-y: auto;
      }
      .coral-inspector-hint {
        color: ${isDark ? '#6c7086' : '#64748b'};
        text-align: center;
        margin: 0;
      }
      .coral-inspector-hint kbd {
        background: ${isDark ? '#45475a' : '#e2e8f0'};
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
      }
      .coral-inspector-element {
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid ${isDark ? '#45475a' : '#e2e8f0'};
      }
      .coral-inspector-element-tag {
        font-family: monospace;
        color: #f472b6;
        font-weight: 500;
      }
      .coral-inspector-classes {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .coral-inspector-class {
        padding: 4px 8px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .coral-inspector-class.coralcss {
        background: ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'};
        color: #3b82f6;
        border: 1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
      }
      .coral-inspector-class.custom {
        background: ${isDark ? '#45475a' : '#f1f5f9'};
        color: ${isDark ? '#a6adc8' : '#475569'};
        border: 1px solid transparent;
      }
      .coral-inspector-class:hover {
        transform: scale(1.05);
      }
      .coral-inspector-class-detail {
        margin-top: 12px;
        padding: 12px;
        background: ${isDark ? '#313244' : '#f8fafc'};
        border-radius: 8px;
      }
      .coral-inspector-class-detail h4 {
        margin: 0 0 8px;
        font-size: 12px;
        color: ${isDark ? '#cdd6f4' : '#1e293b'};
      }
      .coral-inspector-class-detail p {
        margin: 0 0 8px;
        color: ${isDark ? '#a6adc8' : '#64748b'};
        font-size: 12px;
      }
      .coral-inspector-class-detail code {
        display: block;
        padding: 8px;
        background: ${isDark ? '#1e1e2e' : '#ffffff'};
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 11px;
        white-space: pre-wrap;
        color: #22c55e;
      }
      .coral-inspector-footer {
        padding: 8px 16px;
        background: ${isDark ? '#313244' : '#f1f5f9'};
        border-top: 1px solid ${isDark ? '#45475a' : '#e2e8f0'};
        font-size: 11px;
        color: ${isDark ? '#6c7086' : '#94a3b8'};
      }
      .coral-inspector-category {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        text-transform: uppercase;
        background: ${isDark ? '#45475a' : '#e2e8f0'};
        color: ${isDark ? '#a6adc8' : '#64748b'};
        margin-left: 8px;
      }
    `

    // Remove existing styles if present
    document.getElementById('coral-inspector-styles')?.remove()
    document.head.appendChild(style)
  }

  private bindPanelEvents(): void {
    if (!this.panel) {return}

    const toggleBtn = this.panel.querySelector('#coral-inspector-toggle')
    const closeBtn = this.panel.querySelector('#coral-inspector-close')

    toggleBtn?.addEventListener('click', () => {
      this.toggleInspection()
      toggleBtn.classList.toggle('active', this.isActive)
    })

    closeBtn?.addEventListener('click', () => {
      this.hide()
    })
  }

  private bindShortcuts(): void {
    this.boundHandleKeydown = (e: KeyboardEvent) => {
      // Alt+I to toggle inspection
      if (e.altKey && e.key.toLowerCase() === 'i') {
        e.preventDefault()
        this.toggleInspection()
      }
      // Alt+Shift+I to toggle panel
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault()
        this.toggle()
      }
      // Escape to close
      if (e.key === 'Escape') {
        if (this.isActive) {
          this.stopInspection()
        } else {
          this.hide()
        }
      }
    }
    document.addEventListener('keydown', this.boundHandleKeydown)
  }

  private toggleInspection(): void {
    if (this.isActive) {
      this.stopInspection()
    } else {
      this.startInspection()
    }
  }

  private startInspection(): void {
    this.isActive = true
    document.body.style.cursor = 'crosshair'

    document.addEventListener('mouseover', this.handleMouseOver)
    document.addEventListener('mouseout', this.handleMouseOut)
    document.addEventListener('click', this.handleClick, true)

    const toggleBtn = this.panel?.querySelector('#coral-inspector-toggle')
    toggleBtn?.classList.add('active')
  }

  private stopInspection(): void {
    this.isActive = false
    document.body.style.cursor = ''

    document.removeEventListener('mouseover', this.handleMouseOver)
    document.removeEventListener('mouseout', this.handleMouseOut)
    document.removeEventListener('click', this.handleClick, true)

    if (this.highlightOverlay) {
      this.highlightOverlay.style.display = 'none'
    }

    const toggleBtn = this.panel?.querySelector('#coral-inspector-toggle')
    toggleBtn?.classList.remove('active')
  }

  private handleMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement
    if (target === this.panel || this.panel?.contains(target)) {return}
    if (target === this.highlightOverlay) {return}

    this.hoveredElement = target
    this.highlightElement(target)
  }

  private handleMouseOut = (): void => {
    this.hoveredElement = null
  }

  private handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement
    if (target === this.panel || this.panel?.contains(target)) {return}

    e.preventDefault()
    e.stopPropagation()

    this.selectElement(target)
    this.stopInspection()
  }

  private highlightElement(element: HTMLElement): void {
    if (!this.highlightOverlay || !this.config.enableHighlight) {return}

    const rect = element.getBoundingClientRect()

    this.highlightOverlay.style.display = 'block'
    this.highlightOverlay.style.top = `${rect.top}px`
    this.highlightOverlay.style.left = `${rect.left}px`
    this.highlightOverlay.style.width = `${rect.width}px`
    this.highlightOverlay.style.height = `${rect.height}px`
  }

  private selectElement(element: HTMLElement): void {
    const classes = Array.from(element.classList)
    const classInfos: ClassInfo[] = classes.map(className => {
      const { category, isCoralCSS } = detectCategory(className)
      return {
        className,
        category,
        description: generateDescription(className, category),
        css: this.getComputedCSSForClass(element, className),
        isCoralCSS,
      }
    })

    this.selectedInfo = {
      tagName: element.tagName.toLowerCase(),
      id: element.id || undefined,
      classes: classInfos,
      computedStyles: {},
      element,
    }

    this.updatePanelContent()
  }

  private getComputedCSSForClass(element: HTMLElement, className: string): string {
    const styles = getComputedStyle(element)
    const relevantProps: string[] = []

    // Detect which properties might be affected by this class
    if (className.startsWith('p-') || className.startsWith('m-')) {
      relevantProps.push('padding', 'margin')
    } else if (className.startsWith('bg-')) {
      relevantProps.push('background', 'background-color')
    } else if (className.startsWith('text-')) {
      relevantProps.push('color', 'font-size')
    } else if (className.startsWith('flex')) {
      relevantProps.push('display', 'flex-direction', 'flex-wrap')
    } else if (className.startsWith('grid')) {
      relevantProps.push('display', 'grid-template-columns')
    }

    if (relevantProps.length === 0) {
      return '/* CSS properties applied by this class */'
    }

    return relevantProps
      .map(prop => `${prop}: ${styles.getPropertyValue(prop)};`)
      .join('\n')
  }

  private updatePanelContent(): void {
    const content = this.panel?.querySelector('#coral-inspector-info')
    const stats = this.panel?.querySelector('#coral-inspector-stats')

    // Early return with proper null check before any property access
    if (!content || !this.selectedInfo) {return}

    const coralCount = this.selectedInfo.classes.filter(c => c.isCoralCSS).length

    // Clear existing content
    content.innerHTML = ''

    // Build element info - all property accesses are now safe due to early return above
    const elementDiv = document.createElement('div')
    elementDiv.className = 'coral-inspector-element'

    const tagSpan = document.createElement('span')
    tagSpan.className = 'coral-inspector-element-tag'

    // Safe access to tagName and id (guaranteed non-null by early return check)
    const idAttr = this.selectedInfo.id ? ` id="${escapeHtml(this.selectedInfo.id)}"` : ''
    tagSpan.textContent = `<${this.selectedInfo.tagName}${idAttr}>`
    elementDiv.appendChild(tagSpan)

    // Build classes list
    const classesDiv = document.createElement('div')
    classesDiv.className = 'coral-inspector-classes'

    this.selectedInfo.classes.forEach(c => {
      const classSpan = document.createElement('span')
      classSpan.className = `coral-inspector-class ${c.isCoralCSS ? 'coralcss' : 'custom'}`
      classSpan.dataset.class = c.className
      classSpan.title = c.description
      classSpan.textContent = c.className
      classSpan.addEventListener('click', () => this.showClassDetail(c.className))
      classesDiv.appendChild(classSpan)
    })

    // Build details container
    const detailsDiv = document.createElement('div')
    detailsDiv.id = 'coral-inspector-class-details'

    content.appendChild(elementDiv)
    content.appendChild(classesDiv)
    content.appendChild(detailsDiv)

    if (stats) {
      stats.textContent = `${coralCount} CoralCSS classes`
    }
  }

  private showClassDetail(className: string): void {
    const detailContainer = this.panel?.querySelector('#coral-inspector-class-details')
    if (!detailContainer || !this.selectedInfo) {return}

    const classInfo = this.selectedInfo.classes.find(c => c.className === className)
    if (!classInfo) {return}

    // Clear existing content
    detailContainer.innerHTML = ''

    // Build detail view
    const detailDiv = document.createElement('div')
    detailDiv.className = 'coral-inspector-class-detail'

    const header = document.createElement('h4')
    header.textContent = classInfo.className

    const categorySpan = document.createElement('span')
    categorySpan.className = 'coral-inspector-category'
    categorySpan.textContent = classInfo.category
    header.appendChild(categorySpan)

    const desc = document.createElement('p')
    desc.textContent = classInfo.description

    const code = document.createElement('code')
    code.textContent = classInfo.css

    detailDiv.appendChild(header)
    detailDiv.appendChild(desc)
    detailDiv.appendChild(code)
    detailContainer.appendChild(detailDiv)
  }

  /**
   * Show the inspector panel
   */
  show(): void {
    if (this.panel) {
      this.panel.style.display = 'block'
    }
  }

  /**
   * Hide the inspector panel
   */
  hide(): void {
    if (this.panel) {
      this.panel.style.display = 'none'
    }
    this.stopInspection()
  }

  /**
   * Toggle the inspector panel
   */
  toggle(): void {
    if (this.panel?.style.display === 'none') {
      this.show()
    } else {
      this.hide()
    }
  }

  /**
   * Destroy the inspector
   */
  destroy(): void {
    this.stopInspection()

    // Remove keyboard shortcut listener
    if (this.boundHandleKeydown) {
      document.removeEventListener('keydown', this.boundHandleKeydown)
      this.boundHandleKeydown = null
    }

    this.panel?.remove()
    this.highlightOverlay?.remove()
    document.getElementById('coral-inspector-styles')?.remove()
  }

  /**
   * Inspect a specific element programmatically
   */
  inspect(element: HTMLElement): void {
    this.show()
    this.selectElement(element)
  }

  /**
   * Get all CoralCSS classes used on the page
   */
  getAllCoralCSSClasses(): string[] {
    const allClasses = new Set<string>()

    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(className => {
        const { isCoralCSS } = detectCategory(className)
        if (isCoralCSS) {
          allClasses.add(className)
        }
      })
    })

    return Array.from(allClasses).sort()
  }

  /**
   * Get usage statistics
   */
  getStats(): { total: number; coralCSS: number; custom: number; byCategory: Record<string, number> } {
    const stats = {
      total: 0,
      coralCSS: 0,
      custom: 0,
      byCategory: {} as Record<string, number>,
    }

    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(className => {
        stats.total++
        const { category, isCoralCSS } = detectCategory(className)

        if (isCoralCSS) {
          stats.coralCSS++
          stats.byCategory[category] = (stats.byCategory[category] || 0) + 1
        } else {
          stats.custom++
        }
      })
    })

    return stats
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create and initialize a CoralCSS Inspector
 */
export function createInspector(config?: InspectorConfig): CoralInspector {
  return new CoralInspector(config)
}

/**
 * Quick utility to get all CoralCSS classes on the page
 */
export function getPageClasses(): string[] {
  const inspector = new CoralInspector({ autoShow: false })
  const classes = inspector.getAllCoralCSSClasses()
  inspector.destroy()
  return classes
}

export default CoralInspector
