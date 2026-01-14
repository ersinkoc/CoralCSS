/**
 * Tour Component
 *
 * An accessible product tour/onboarding component for guiding users.
 * Highlights elements and shows tooltips with step-by-step instructions.
 *
 * @module components/tour
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Tour step definition
 */
export interface TourStep {
  /** Unique step ID */
  id: string
  /** Target element selector */
  target: string
  /** Step title */
  title: string
  /** Step content/description */
  content: string
  /** Tooltip placement */
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto'
  /** Show spotlight overlay */
  spotlight?: boolean
  /** Spotlight padding around target */
  spotlightPadding?: number
  /** Allow interaction with target element */
  allowInteraction?: boolean
  /** Custom actions for this step */
  actions?: TourStepAction[]
  /** Callback before showing step */
  onBeforeShow?: () => void | Promise<void>
  /** Callback after showing step */
  onAfterShow?: () => void
  /** Callback before hiding step */
  onBeforeHide?: () => void | Promise<void>
  /** Wait for element to appear (ms) */
  waitForElement?: number
  /** Disable scrolling to element */
  disableScroll?: boolean
  /** Custom offset from target */
  offset?: { x: number; y: number }
}

/**
 * Tour step action
 */
export interface TourStepAction {
  label: string
  action: 'next' | 'prev' | 'skip' | 'complete' | 'custom'
  onClick?: () => void
  primary?: boolean
}

/**
 * Tour configuration
 */
export interface TourConfig extends ComponentConfig {
  /**
   * Tour steps
   */
  steps: TourStep[]

  /**
   * Start automatically on mount
   * @default false
   */
  autoStart?: boolean

  /**
   * Show step counter (e.g., "1 of 5")
   * @default true
   */
  showProgress?: boolean

  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Show skip button
   * @default true
   */
  showSkipButton?: boolean

  /**
   * Show spotlight overlay
   * @default true
   */
  spotlight?: boolean

  /**
   * Spotlight opacity
   * @default 0.75
   */
  spotlightOpacity?: number

  /**
   * Spotlight padding around target
   * @default 8
   */
  spotlightPadding?: number

  /**
   * Smooth scroll to elements
   * @default true
   */
  smoothScroll?: boolean

  /**
   * Scroll behavior options
   */
  scrollBehavior?: ScrollIntoViewOptions

  /**
   * Keyboard navigation
   * @default true
   */
  keyboardNavigation?: boolean

  /**
   * Close on escape key
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Close on overlay click
   * @default false
   */
  closeOnOverlayClick?: boolean

  /**
   * Next button text
   * @default 'Next'
   */
  nextText?: string

  /**
   * Previous button text
   * @default 'Previous'
   */
  prevText?: string

  /**
   * Skip button text
   * @default 'Skip'
   */
  skipText?: string

  /**
   * Done button text
   * @default 'Done'
   */
  doneText?: string

  /**
   * Z-index for overlay and tooltip
   * @default 10000
   */
  zIndex?: number

  /**
   * Animation duration (ms)
   * @default 300
   */
  animationDuration?: number

  /**
   * Storage key for persistence
   */
  storageKey?: string

  /**
   * Resume from last step on reload
   * @default false
   */
  resumeOnReload?: boolean
}

/**
 * Tour state
 */
export interface TourState extends ComponentState {
  isActive: boolean
  currentStep: number
  isTransitioning: boolean
}

/**
 * Tour component
 *
 * @example
 * ```typescript
 * const tour = createTour(document.body, {
 *   steps: [
 *     {
 *       id: 'welcome',
 *       target: '#header',
 *       title: 'Welcome!',
 *       content: 'This is your dashboard. Let us show you around.',
 *       placement: 'bottom',
 *     },
 *     {
 *       id: 'sidebar',
 *       target: '#sidebar',
 *       title: 'Navigation',
 *       content: 'Use the sidebar to navigate between sections.',
 *       placement: 'right',
 *     },
 *     {
 *       id: 'actions',
 *       target: '#main-actions',
 *       title: 'Quick Actions',
 *       content: 'Access frequently used actions here.',
 *       placement: 'left',
 *     },
 *   ],
 *   spotlight: true,
 *   showProgress: true,
 * })
 *
 * tour.start()
 * ```
 */
export class Tour extends BaseComponent {
  protected declare config: TourConfig
  protected declare state: TourState

  private overlay: HTMLElement | null = null
  private tooltip: HTMLElement | null = null
  private spotlightEl: HTMLElement | null = null

  protected override getDefaultConfig(): TourConfig {
    return {
      steps: [],
      autoStart: false,
      showProgress: true,
      showCloseButton: true,
      showSkipButton: true,
      spotlight: true,
      spotlightOpacity: 0.75,
      spotlightPadding: 8,
      smoothScroll: true,
      scrollBehavior: { behavior: 'smooth', block: 'center' },
      keyboardNavigation: true,
      closeOnEscape: true,
      closeOnOverlayClick: false,
      nextText: 'Next',
      prevText: 'Previous',
      skipText: 'Skip',
      doneText: 'Done',
      zIndex: 10000,
      animationDuration: 300,
      resumeOnReload: false,
    }
  }

  protected override getInitialState(): TourState {
    let startStep = 0

    // Resume from storage if enabled
    if (this.config.resumeOnReload && this.config.storageKey) {
      const saved = window.localStorage.getItem(this.config.storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.currentStep !== undefined) {
          startStep = parsed.currentStep
        }
      }
    }

    return {
      isActive: false,
      currentStep: startStep,
      isTransitioning: false,
    }
  }

  protected setupAria(): void {
    // Tour creates its own elements dynamically
  }

  protected bindEvents(): void {
    this.createOverlay()
    this.createTooltip()
    this.setupKeyboard()

    if (this.config.autoStart) {
      this.start()
    }
  }

  private createOverlay(): void {
    this.overlay = document.createElement('div')
    this.overlay.setAttribute('data-coral-tour-overlay', '')
    this.overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: ${this.config.zIndex};
      pointer-events: none;
      opacity: 0;
      transition: opacity ${this.config.animationDuration}ms ease;
    `

    // Spotlight cutout container
    this.spotlightEl = document.createElement('div')
    this.spotlightEl.setAttribute('data-coral-tour-spotlight', '')
    this.overlay.appendChild(this.spotlightEl)

    if (this.config.closeOnOverlayClick) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.stop()
        }
      })
    }

    document.body.appendChild(this.overlay)
  }

  private createTooltip(): void {
    this.tooltip = document.createElement('div')
    this.tooltip.setAttribute('data-coral-tour-tooltip', '')
    this.tooltip.setAttribute('role', 'dialog')
    this.tooltip.setAttribute('aria-modal', 'true')
    this.tooltip.style.cssText = `
      position: fixed;
      z-index: ${(this.config.zIndex || 10000) + 1};
      opacity: 0;
      visibility: hidden;
      transition: opacity ${this.config.animationDuration}ms ease, transform ${this.config.animationDuration}ms ease;
    `

    document.body.appendChild(this.tooltip)
  }

  private setupKeyboard(): void {
    if (!this.config.keyboardNavigation) {return}

    document.addEventListener('keydown', (e) => {
      if (!this.state.isActive) {return}

      switch (e.key) {
        case 'Escape':
          if (this.config.closeOnEscape) {
            e.preventDefault()
            this.stop()
          }
          break
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault()
          this.next()
          break
        case 'ArrowLeft':
          e.preventDefault()
          this.prev()
          break
      }
    })
  }

  private async showStep(stepIndex: number): Promise<void> {
    const step = this.config.steps[stepIndex]
    if (!step) {return}

    this.setState({ isTransitioning: true })

    // Before show callback
    if (step.onBeforeShow) {
      await step.onBeforeShow()
    }

    // Wait for element if specified
    const target = await this.waitForTarget(step)
    if (!target) {
      console.warn(`Tour: Target element "${step.target}" not found`)
      // Try next step
      if (stepIndex < this.config.steps.length - 1) {
        this.next()
      } else {
        this.stop()
      }
      return
    }

    // Scroll to target
    if (!step.disableScroll && this.config.smoothScroll) {
      target.scrollIntoView(this.config.scrollBehavior)
      // Wait for scroll to complete
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // Update spotlight
    this.updateSpotlight(target, step)

    // Update tooltip
    this.updateTooltip(target, step, stepIndex)

    // Show overlay and tooltip
    if (this.overlay) {
      this.overlay.style.opacity = '1'
      this.overlay.style.pointerEvents = step.allowInteraction ? 'none' : 'auto'
    }

    if (this.tooltip) {
      this.tooltip.style.opacity = '1'
      this.tooltip.style.visibility = 'visible'
    }

    this.setState({ isTransitioning: false })

    // Save progress
    this.saveProgress()

    // After show callback
    if (step.onAfterShow) {
      step.onAfterShow()
    }

    this.dispatch('step', { step, stepIndex })
  }

  private async waitForTarget(step: TourStep): Promise<HTMLElement | null> {
    const waitTime = step.waitForElement || 0
    const startTime = Date.now()

    while (Date.now() - startTime < waitTime || waitTime === 0) {
      const target = document.querySelector(step.target) as HTMLElement
      if (target) {return target}
      if (waitTime === 0) {return null}
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return null
  }

  private updateSpotlight(target: HTMLElement, step: TourStep): void {
    if (!this.overlay || !this.spotlightEl) {return}

    const showSpotlight = step.spotlight !== false && this.config.spotlight

    if (!showSpotlight) {
      this.overlay.style.background = `rgba(0, 0, 0, ${this.config.spotlightOpacity})`
      this.spotlightEl.style.display = 'none'
      return
    }

    const rect = target.getBoundingClientRect()
    const padding = step.spotlightPadding ?? this.config.spotlightPadding ?? 8

    // Use clip-path to create spotlight cutout
    const left = rect.left - padding
    const top = rect.top - padding
    const right = rect.right + padding
    const bottom = rect.bottom + padding

    this.overlay.style.background = 'transparent'
    this.overlay.innerHTML = `
      <svg style="position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: auto;">
        <defs>
          <mask id="coral-tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white"/>
            <rect
              x="${left}"
              y="${top}"
              width="${right - left}"
              height="${bottom - top}"
              rx="4"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, ${this.config.spotlightOpacity})"
          mask="url(#coral-tour-mask)"
        />
      </svg>
    `

    // Allow clicking through spotlight area if interaction is allowed
    if (step.allowInteraction) {
      const spotlightArea = document.createElement('div')
      spotlightArea.style.cssText = `
        position: fixed;
        left: ${left}px;
        top: ${top}px;
        width: ${right - left}px;
        height: ${bottom - top}px;
        pointer-events: none;
      `
      this.overlay.appendChild(spotlightArea)
    }
  }

  private updateTooltip(target: HTMLElement, step: TourStep, stepIndex: number): void {
    if (!this.tooltip) {return}

    const totalSteps = this.config.steps.length
    const isFirst = stepIndex === 0
    const isLast = stepIndex === totalSteps - 1

    // Determine actions
    const actions = step.actions || this.getDefaultActions(isFirst, isLast)

    // Render tooltip content using safe DOM methods
    this.tooltip.textContent = '' // Clear existing content

    // Header
    const header = document.createElement('div')
    header.setAttribute('data-coral-tour-header', '')

    if (this.config.showProgress) {
      const progress = document.createElement('div')
      progress.setAttribute('data-coral-tour-progress', '')
      progress.textContent = `${stepIndex + 1} / ${totalSteps}`
      header.appendChild(progress)
    }

    if (this.config.showCloseButton) {
      const closeBtn = document.createElement('button')
      closeBtn.setAttribute('data-coral-tour-close', '')
      closeBtn.setAttribute('aria-label', 'Close tour')
      closeBtn.textContent = '\u00D7'
      header.appendChild(closeBtn)
    }

    this.tooltip.appendChild(header)

    // Body
    const body = document.createElement('div')
    body.setAttribute('data-coral-tour-body', '')

    const title = document.createElement('h3')
    title.setAttribute('data-coral-tour-title', '')
    title.textContent = step.title // textContent is safe
    body.appendChild(title)

    const content = document.createElement('p')
    content.setAttribute('data-coral-tour-content', '')
    content.textContent = step.content // textContent is safe
    body.appendChild(content)

    this.tooltip.appendChild(body)

    // Footer
    const footer = document.createElement('div')
    footer.setAttribute('data-coral-tour-footer', '')

    if (this.config.showSkipButton && !isLast) {
      const skipBtn = document.createElement('button')
      skipBtn.setAttribute('data-coral-tour-skip', '')
      skipBtn.textContent = this.config.skipText || 'Skip'
      footer.appendChild(skipBtn)
    } else {
      footer.appendChild(document.createElement('div'))
    }

    const actionsDiv = document.createElement('div')
    actionsDiv.setAttribute('data-coral-tour-actions', '')

    actions.forEach((action) => {
      const btn = document.createElement('button')
      btn.setAttribute('data-coral-tour-action', action.action)
      if (action.primary) {
        btn.setAttribute('data-primary', '')
      }
      btn.textContent = action.label // textContent is safe
      actionsDiv.appendChild(btn)
    })

    footer.appendChild(actionsDiv)
    this.tooltip.appendChild(footer)

    // Position tooltip
    this.positionTooltip(target, step)

    // Setup button handlers
    this.tooltip.querySelector('[data-coral-tour-close]')?.addEventListener('click', () => {
      this.stop()
    })

    this.tooltip.querySelector('[data-coral-tour-skip]')?.addEventListener('click', () => {
      this.skip()
    })

    this.tooltip.querySelectorAll('[data-coral-tour-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const actionType = btn.getAttribute('data-coral-tour-action')
        const action = actions.find((a) => a.action === actionType)

        if (action?.onClick) {
          action.onClick()
        } else {
          switch (actionType) {
            case 'next':
              this.next()
              break
            case 'prev':
              this.prev()
              break
            case 'complete':
              this.complete()
              break
            case 'skip':
              this.skip()
              break
          }
        }
      })
    })
  }

  private getDefaultActions(isFirst: boolean, isLast: boolean): TourStepAction[] {
    const actions: TourStepAction[] = []

    if (!isFirst) {
      actions.push({
        label: this.config.prevText || 'Previous',
        action: 'prev',
      })
    }

    if (isLast) {
      actions.push({
        label: this.config.doneText || 'Done',
        action: 'complete',
        primary: true,
      })
    } else {
      actions.push({
        label: this.config.nextText || 'Next',
        action: 'next',
        primary: true,
      })
    }

    return actions
  }

  private positionTooltip(target: HTMLElement, step: TourStep): void {
    if (!this.tooltip) {return}

    const targetRect = target.getBoundingClientRect()
    const tooltipRect = this.tooltip.getBoundingClientRect()
    const padding = 12
    const offset = step.offset || { x: 0, y: 0 }

    let placement = step.placement || 'auto'

    // Auto placement
    if (placement === 'auto') {
      const spaceTop = targetRect.top
      const spaceBottom = window.innerHeight - targetRect.bottom
      const spaceLeft = targetRect.left
      const spaceRight = window.innerWidth - targetRect.right

      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight)

      if (maxSpace === spaceBottom) {placement = 'bottom'}
      else if (maxSpace === spaceTop) {placement = 'top'}
      else if (maxSpace === spaceRight) {placement = 'right'}
      else {placement = 'left'}
    }

    let left = 0
    let top = 0

    switch (placement) {
      case 'top':
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        top = targetRect.top - tooltipRect.height - padding
        break
      case 'bottom':
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        top = targetRect.bottom + padding
        break
      case 'left':
        left = targetRect.left - tooltipRect.width - padding
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        break
      case 'right':
        left = targetRect.right + padding
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Apply offset
    left += offset.x
    top += offset.y

    // Keep within viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding))
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding))

    this.tooltip.style.left = `${left}px`
    this.tooltip.style.top = `${top}px`
    this.tooltip.setAttribute('data-placement', placement)
  }

  private hideStep(): void {
    const step = this.config.steps[this.state.currentStep]

    if (step?.onBeforeHide) {
      step.onBeforeHide()
    }

    if (this.overlay) {
      this.overlay.style.opacity = '0'
    }

    if (this.tooltip) {
      this.tooltip.style.opacity = '0'
      this.tooltip.style.visibility = 'hidden'
    }
  }

  private saveProgress(): void {
    if (this.config.storageKey) {
      window.localStorage.setItem(
        this.config.storageKey,
        JSON.stringify({
          currentStep: this.state.currentStep,
          timestamp: Date.now(),
        })
      )
    }
  }

  private clearProgress(): void {
    if (this.config.storageKey) {
      window.localStorage.removeItem(this.config.storageKey)
    }
  }

  // Public API

  /**
   * Start the tour
   */
  start(): void {
    if (this.state.isActive) {return}

    this.setState({ isActive: true })
    this.showStep(this.state.currentStep)
    this.dispatch('start', {})
  }

  /**
   * Stop the tour
   */
  stop(): void {
    if (!this.state.isActive) {return}

    this.hideStep()
    this.setState({ isActive: false })
    this.dispatch('stop', { step: this.state.currentStep })
  }

  /**
   * Go to next step
   */
  async next(): Promise<void> {
    if (this.state.isTransitioning) {return}

    const nextStep = this.state.currentStep + 1

    if (nextStep >= this.config.steps.length) {
      this.complete()
      return
    }

    this.hideStep()
    await new Promise((resolve) => setTimeout(resolve, this.config.animationDuration))
    this.setState({ currentStep: nextStep })
    this.showStep(nextStep)
  }

  /**
   * Go to previous step
   */
  async prev(): Promise<void> {
    if (this.state.isTransitioning) {return}

    const prevStep = this.state.currentStep - 1

    if (prevStep < 0) {return}

    this.hideStep()
    await new Promise((resolve) => setTimeout(resolve, this.config.animationDuration))
    this.setState({ currentStep: prevStep })
    this.showStep(prevStep)
  }

  /**
   * Go to specific step
   */
  async goTo(stepIndex: number): Promise<void> {
    if (this.state.isTransitioning) {return}
    if (stepIndex < 0 || stepIndex >= this.config.steps.length) {return}

    this.hideStep()
    await new Promise((resolve) => setTimeout(resolve, this.config.animationDuration))
    this.setState({ currentStep: stepIndex })
    this.showStep(stepIndex)
  }

  /**
   * Go to step by ID
   */
  async goToById(stepId: string): Promise<void> {
    const index = this.config.steps.findIndex((s) => s.id === stepId)
    if (index !== -1) {
      await this.goTo(index)
    }
  }

  /**
   * Skip the tour
   */
  skip(): void {
    this.clearProgress()
    this.stop()
    this.dispatch('skip', { step: this.state.currentStep })
  }

  /**
   * Complete the tour
   */
  complete(): void {
    this.clearProgress()
    this.stop()
    this.dispatch('complete', {})
  }

  /**
   * Get current step index
   */
  getCurrentStep(): number {
    return this.state.currentStep
  }

  /**
   * Get total number of steps
   */
  getTotalSteps(): number {
    return this.config.steps.length
  }

  /**
   * Check if tour is active
   */
  isActive(): boolean {
    return this.state.isActive
  }

  /**
   * Reset tour to beginning
   */
  reset(): void {
    this.clearProgress()
    this.setState({ currentStep: 0 })
  }

  /**
   * Add a step dynamically
   */
  addStep(step: TourStep, index?: number): void {
    if (index !== undefined) {
      this.config.steps.splice(index, 0, step)
    } else {
      this.config.steps.push(step)
    }
  }

  /**
   * Remove a step
   */
  removeStep(stepId: string): void {
    const index = this.config.steps.findIndex((s) => s.id === stepId)
    if (index !== -1) {
      this.config.steps.splice(index, 1)
    }
  }

  override destroy(): void {
    this.stop()
    this.overlay?.remove()
    this.tooltip?.remove()
    super.destroy()
  }
}

/**
 * Create Tour component factory
 */
export const createTour = createComponentFactory(Tour)

export default Tour
