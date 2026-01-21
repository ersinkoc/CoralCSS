/**
 * StepperForm Component
 *
 * A multi-step form wizard component with validation,
 * step navigation, and progress tracking.
 *
 * @module components/stepper-form
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent } from './base'

/**
 * Step definition for StepperForm
 */
export interface StepperFormStep {
  id: string
  title: string
  description?: string
  icon?: string
  content?: string | HTMLElement
  validate?: () => boolean | Promise<boolean>
  beforeEnter?: () => boolean | Promise<boolean>
  afterLeave?: () => void | Promise<void>
  optional?: boolean
  disabled?: boolean
  completed?: boolean
  error?: string
}

/**
 * Validation rule for form fields
 */
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: unknown
  message: string
  validate?: (value: unknown) => boolean
}

/**
 * Field validation state
 */
export interface FieldValidation {
  valid: boolean
  errors: string[]
  touched: boolean
}

/**
 * StepperForm configuration
 */
export interface StepperFormConfig extends ComponentConfig {
  steps: StepperFormStep[]
  initialStep?: number
  linear?: boolean
  showStepNumbers?: boolean
  showStepDescription?: boolean
  showProgressBar?: boolean
  allowSkipOptional?: boolean
  orientation?: 'horizontal' | 'vertical'
  animationDuration?: number
  validateOnNext?: boolean
  validateOnChange?: boolean
  submitLabel?: string
  nextLabel?: string
  prevLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  autoFocusFirstInput?: boolean
  persistState?: boolean
  storageKey?: string
  onStepChange?: (currentStep: number, previousStep: number) => void
  onValidate?: (step: number, isValid: boolean) => void
  onSubmit?: (formData: Record<string, unknown>) => void | Promise<void>
  onCancel?: () => void
  onComplete?: () => void
}

/**
 * StepperForm state
 */
export interface StepperFormState extends ComponentState {
  currentStep: number
  completedSteps: Set<number>
  errors: Map<number, string[]>
  fieldValidations: Map<string, FieldValidation>
  isSubmitting: boolean
  isValidating: boolean
  formData: Record<string, unknown>
  stepHistory: number[]
}

/**
 * StepperForm Component Class
 */
export class StepperForm extends BaseComponent {
  declare protected config: StepperFormConfig
  declare protected state: StepperFormState
  // Note: Don't use field initializers with = value - they run AFTER super() returns
  // and would overwrite values set during bindEvents().
  private headerElement!: HTMLElement | null
  private contentElement!: HTMLElement | null
  private footerElement!: HTMLElement | null
  private progressElement!: HTMLElement | null
  // Navigation lock to prevent concurrent step transitions
  private isNavigating!: boolean

  protected getDefaultConfig(): StepperFormConfig {
    return {
      steps: [],
      initialStep: 0,
      linear: true,
      showStepNumbers: true,
      showStepDescription: true,
      showProgressBar: true,
      allowSkipOptional: false,
      orientation: 'horizontal',
      animationDuration: 300,
      validateOnNext: true,
      validateOnChange: false,
      submitLabel: 'Submit',
      nextLabel: 'Next',
      prevLabel: 'Back',
      cancelLabel: 'Cancel',
      showCancel: false,
      autoFocusFirstInput: true,
      persistState: false,
      storageKey: 'stepper-form-state',
    }
  }

  protected getInitialState(): StepperFormState {
    const savedState = this.config.persistState ? this.loadState() : null

    return {
      currentStep: savedState?.currentStep ?? this.config.initialStep ?? 0,
      completedSteps: new Set(savedState?.completedSteps ?? []),
      errors: new Map(),
      fieldValidations: new Map(),
      isSubmitting: false,
      isValidating: false,
      formData: savedState?.formData ?? {},
      stepHistory: savedState?.stepHistory ?? [],
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'form')
    this.element.setAttribute('aria-label', 'Multi-step form')
  }

  protected bindEvents(): void {
    // Initialize all private fields that don't use field initializers
    this.headerElement = null
    this.contentElement = null
    this.footerElement = null
    this.progressElement = null
    this.isNavigating = false

    this.buildDOM()
    this.renderCurrentStep()
    this.setupFormListeners()
  }

  private buildDOM(): void {
    this.element.classList.add('stepper-form')
    this.element.classList.add(`stepper-${this.config.orientation}`)

    // Progress bar
    if (this.config.showProgressBar) {
      this.progressElement = document.createElement('div')
      this.progressElement.className = 'stepper-progress'
      this.element.appendChild(this.progressElement)
      this.renderProgress()
    }

    // Header with steps indicator
    this.headerElement = document.createElement('div')
    this.headerElement.className = 'stepper-header'
    this.element.appendChild(this.headerElement)
    this.renderHeader()

    // Content area
    this.contentElement = document.createElement('div')
    this.contentElement.className = 'stepper-content'
    this.contentElement.setAttribute('role', 'tabpanel')
    this.element.appendChild(this.contentElement)

    // Footer with navigation buttons
    this.footerElement = document.createElement('div')
    this.footerElement.className = 'stepper-footer'
    this.element.appendChild(this.footerElement)
    this.renderFooter()
  }

  private renderHeader(): void {
    if (!this.headerElement) return

    this.headerElement.innerHTML = ''
    const steps = this.config.steps || []

    const stepsContainer = document.createElement('div')
    stepsContainer.className = 'stepper-steps'
    stepsContainer.setAttribute('role', 'tablist')

    steps.forEach((step, index) => {
      const stepElement = document.createElement('div')
      stepElement.className = 'stepper-step'
      stepElement.dataset.step = String(index)
      stepElement.setAttribute('role', 'tab')
      stepElement.setAttribute('aria-selected', String(index === this.state.currentStep))
      stepElement.setAttribute('aria-controls', `step-panel-${index}`)

      if (index === this.state.currentStep) {
        stepElement.classList.add('active')
      }
      if (this.state.completedSteps.has(index)) {
        stepElement.classList.add('completed')
      }
      if (step.disabled) {
        stepElement.classList.add('disabled')
        stepElement.setAttribute('aria-disabled', 'true')
      }
      if (step.optional) {
        stepElement.classList.add('optional')
      }
      if (this.state.errors.has(index)) {
        stepElement.classList.add('error')
      }

      // Step indicator
      const indicator = document.createElement('div')
      indicator.className = 'stepper-step-indicator'

      if (step.icon) {
        // Safety: Only allow SVG elements (starting with <svg), otherwise treat as text
        if (step.icon.trim().toLowerCase().startsWith('<svg')) {
          const parser = new DOMParser()
          const doc = parser.parseFromString(step.icon, 'image/svg+xml')
          const svgEl = doc.querySelector('svg')
          if (svgEl && !doc.querySelector('parsererror')) {
            indicator.appendChild(document.importNode(svgEl, true))
          } else {
            indicator.textContent = step.icon
          }
        } else {
          indicator.textContent = step.icon // Text or emoji - safe
        }
      } else if (this.config.showStepNumbers) {
        if (this.state.completedSteps.has(index)) {
          indicator.textContent = '\u2713' // Checkmark
        } else {
          indicator.textContent = String(index + 1)
        }
      }

      stepElement.appendChild(indicator)

      // Step info
      const info = document.createElement('div')
      info.className = 'stepper-step-info'

      const title = document.createElement('div')
      title.className = 'stepper-step-title'
      title.textContent = step.title

      info.appendChild(title)

      if (this.config.showStepDescription && step.description) {
        const description = document.createElement('div')
        description.className = 'stepper-step-description'
        description.textContent = step.description
        info.appendChild(description)
      }

      if (step.optional) {
        const optional = document.createElement('span')
        optional.className = 'stepper-step-optional'
        optional.textContent = '(Optional)'
        info.appendChild(optional)
      }

      stepElement.appendChild(info)

      // Connector line (except for last step)
      if (index < steps.length - 1) {
        const connector = document.createElement('div')
        connector.className = 'stepper-connector'
        if (this.state.completedSteps.has(index)) {
          connector.classList.add('completed')
        }
        stepElement.appendChild(connector)
      }

      // Click handler for non-linear mode
      if (!this.config.linear || this.state.completedSteps.has(index) || index <= this.state.currentStep) {
        stepElement.addEventListener('click', () => {
          if (!step.disabled) {
            this.goToStep(index)
          }
        })
        stepElement.style.cursor = 'pointer'
      }

      stepsContainer.appendChild(stepElement)
    })

    this.headerElement.appendChild(stepsContainer)
  }

  private renderProgress(): void {
    if (!this.progressElement) return

    const steps = this.config.steps || []
    const progress = steps.length > 0 ? ((this.state.currentStep + 1) / steps.length) * 100 : 0

    this.progressElement.innerHTML = ''

    const progressBar = document.createElement('div')
    progressBar.className = 'stepper-progress-bar'
    progressBar.setAttribute('role', 'progressbar')
    progressBar.setAttribute('aria-valuenow', String(progress))
    progressBar.setAttribute('aria-valuemin', '0')
    progressBar.setAttribute('aria-valuemax', '100')

    const progressFill = document.createElement('div')
    progressFill.className = 'stepper-progress-fill'
    progressFill.style.width = `${progress}%`
    progressFill.style.transition = `width ${this.config.animationDuration}ms ease-out`

    progressBar.appendChild(progressFill)
    this.progressElement.appendChild(progressBar)

    const progressText = document.createElement('div')
    progressText.className = 'stepper-progress-text'
    progressText.textContent = `Step ${this.state.currentStep + 1} of ${steps.length}`
    this.progressElement.appendChild(progressText)
  }

  private renderCurrentStep(): void {
    if (!this.contentElement) return

    const steps = this.config.steps || []
    const currentStep = steps[this.state.currentStep]
    if (!currentStep) return

    this.contentElement.innerHTML = ''
    this.contentElement.setAttribute('id', `step-panel-${this.state.currentStep}`)
    this.contentElement.setAttribute('aria-labelledby', `step-${this.state.currentStep}`)

    // Step content
    const content = document.createElement('div')
    content.className = 'stepper-step-content'

    if (currentStep.content) {
      if (typeof currentStep.content === 'string') {
        // Safety: Use textContent for strings. If HTML is needed, provide an HTMLElement instead.
        content.textContent = currentStep.content
      } else {
        content.appendChild(currentStep.content.cloneNode(true))
      }
    }

    // Error message
    const errors = this.state.errors.get(this.state.currentStep)
    if (errors && errors.length > 0) {
      const errorContainer = document.createElement('div')
      errorContainer.className = 'stepper-step-errors'
      errorContainer.setAttribute('role', 'alert')

      errors.forEach((error) => {
        const errorMsg = document.createElement('div')
        errorMsg.className = 'stepper-step-error'
        errorMsg.textContent = error
        errorContainer.appendChild(errorMsg)
      })

      content.insertBefore(errorContainer, content.firstChild)
    }

    this.contentElement.appendChild(content)

    // Auto-focus first input
    if (this.config.autoFocusFirstInput) {
      requestAnimationFrame(() => {
        const firstInput = content.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          'input:not([type="hidden"]), textarea, select'
        )
        firstInput?.focus()
      })
    }
  }

  private renderFooter(): void {
    if (!this.footerElement) return

    this.footerElement.innerHTML = ''
    const steps = this.config.steps || []

    // Navigation buttons container
    const buttonsLeft = document.createElement('div')
    buttonsLeft.className = 'stepper-footer-left'

    const buttonsRight = document.createElement('div')
    buttonsRight.className = 'stepper-footer-right'

    // Cancel button
    if (this.config.showCancel) {
      const cancelBtn = document.createElement('button')
      cancelBtn.type = 'button'
      cancelBtn.className = 'stepper-btn stepper-btn-cancel'
      cancelBtn.textContent = this.config.cancelLabel || 'Cancel'
      cancelBtn.addEventListener('click', () => this.cancel())
      buttonsLeft.appendChild(cancelBtn)
    }

    // Previous button
    if (this.state.currentStep > 0) {
      const prevBtn = document.createElement('button')
      prevBtn.type = 'button'
      prevBtn.className = 'stepper-btn stepper-btn-prev'
      prevBtn.textContent = this.config.prevLabel || 'Back'
      prevBtn.addEventListener('click', () => this.previousStep())
      buttonsLeft.appendChild(prevBtn)
    }

    // Next / Submit button
    const isLastStep = this.state.currentStep === steps.length - 1

    if (isLastStep) {
      const submitBtn = document.createElement('button')
      submitBtn.type = 'button'
      submitBtn.className = 'stepper-btn stepper-btn-submit'
      submitBtn.textContent = this.config.submitLabel || 'Submit'
      submitBtn.disabled = this.state.isSubmitting
      submitBtn.addEventListener('click', () => this.submit())
      buttonsRight.appendChild(submitBtn)
    } else {
      // Skip button for optional steps
      const currentStepConfig = steps[this.state.currentStep]
      if (currentStepConfig?.optional && this.config.allowSkipOptional) {
        const skipBtn = document.createElement('button')
        skipBtn.type = 'button'
        skipBtn.className = 'stepper-btn stepper-btn-skip'
        skipBtn.textContent = 'Skip'
        skipBtn.addEventListener('click', () => this.skipStep())
        buttonsRight.appendChild(skipBtn)
      }

      const nextBtn = document.createElement('button')
      nextBtn.type = 'button'
      nextBtn.className = 'stepper-btn stepper-btn-next'
      nextBtn.textContent = this.config.nextLabel || 'Next'
      nextBtn.disabled = this.state.isValidating
      nextBtn.addEventListener('click', () => this.nextStep())
      buttonsRight.appendChild(nextBtn)
    }

    this.footerElement.appendChild(buttonsLeft)
    this.footerElement.appendChild(buttonsRight)
  }

  private setupFormListeners(): void {
    // Listen for form input changes
    this.element.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (target.name) {
        this.setFieldValue(target.name, target.value)
        if (this.config.validateOnChange) {
          this.validateField(target.name)
        }
      }
    })

    // Listen for form submission
    this.element.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submit()
    })

    // Keyboard navigation
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'TEXTAREA' && target.tagName !== 'BUTTON') {
          e.preventDefault()
          this.nextStep()
        }
      }
    })
  }

  private async validateCurrentStep(): Promise<boolean> {
    const steps = this.config.steps || []
    const currentStep = steps[this.state.currentStep]
    if (!currentStep) return true

    this.setState({ isValidating: true })

    try {
      let isValid = true

      // Custom step validation
      if (currentStep.validate) {
        isValid = await currentStep.validate()
      }

      // Field validation
      const fields = this.contentElement?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        '[name][data-validate]'
      )

      if (fields) {
        for (const field of fields) {
          const fieldValid = await this.validateField(field.name)
          if (!fieldValid) isValid = false
        }
      }

      if (!isValid) {
        const errors = this.state.errors.get(this.state.currentStep) || []
        if (currentStep.error) {
          errors.push(currentStep.error)
        }
        this.state.errors.set(this.state.currentStep, errors)
      } else {
        this.state.errors.delete(this.state.currentStep)
      }

      this.config.onValidate?.(this.state.currentStep, isValid)
      return isValid
    } finally {
      this.setState({ isValidating: false })
    }
  }

  private async validateField(fieldName: string): Promise<boolean> {
    const field = this.contentElement?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      `[name="${fieldName}"]`
    )
    if (!field) return true

    const rules = field.dataset.validate?.split(',') || []
    const errors: string[] = []
    const value = field.value

    for (const rule of rules) {
      const [type, ...params] = rule.trim().split(':')

      switch (type) {
        case 'required':
          if (!value.trim()) {
            errors.push(field.dataset.requiredMessage || 'This field is required')
          }
          break
        case 'email':
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.push(field.dataset.emailMessage || 'Please enter a valid email address')
          }
          break
        case 'minLength':
          if (value && value.length < parseInt(params[0] || '0', 10)) {
            errors.push(field.dataset.minLengthMessage || `Minimum ${params[0]} characters required`)
          }
          break
        case 'maxLength':
          if (value && value.length > parseInt(params[0] || '0', 10)) {
            errors.push(field.dataset.maxLengthMessage || `Maximum ${params[0]} characters allowed`)
          }
          break
        case 'pattern':
          if (value && params[0] && !new RegExp(params[0]).test(value)) {
            errors.push(field.dataset.patternMessage || 'Invalid format')
          }
          break
      }
    }

    const validation: FieldValidation = {
      valid: errors.length === 0,
      errors,
      touched: true,
    }

    this.state.fieldValidations.set(fieldName, validation)

    // Update field visual state
    field.classList.toggle('error', errors.length > 0)
    field.setAttribute('aria-invalid', String(errors.length > 0))

    // Update or create error message element
    let errorEl = field.parentElement?.querySelector('.field-error')
    if (errors.length > 0) {
      if (!errorEl) {
        errorEl = document.createElement('div')
        errorEl.className = 'field-error'
        field.parentElement?.appendChild(errorEl)
      }
      errorEl.textContent = errors[0] || ''
    } else if (errorEl) {
      errorEl.remove()
    }

    return errors.length === 0
  }

  private setFieldValue(name: string, value: unknown): void {
    const formData = { ...this.state.formData, [name]: value }
    this.setState({ formData })

    if (this.config.persistState) {
      this.saveState()
    }
  }

  /** Get namespaced storage key to prevent arbitrary localStorage writes */
  private getStorageKey(): string {
    const userKey = this.config.storageKey || 'stepper-form-state'
    // Always prefix with coral-stepper to namespace our storage
    return `coral-stepper:${userKey}`
  }

  private loadState(): Partial<StepperFormState> | null {
    if (typeof localStorage === 'undefined') return null

    try {
      const saved = localStorage.getItem(this.getStorageKey())
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          currentStep: parsed.currentStep,
          completedSteps: parsed.completedSteps,
          formData: parsed.formData,
          stepHistory: parsed.stepHistory,
        }
      }
    } catch {
      // Ignore parse errors
    }
    return null
  }

  private saveState(): void {
    if (typeof localStorage === 'undefined') return

    try {
      const stateToSave = {
        currentStep: this.state.currentStep,
        completedSteps: Array.from(this.state.completedSteps),
        formData: this.state.formData,
        stepHistory: this.state.stepHistory,
      }
      localStorage.setItem(this.getStorageKey(), JSON.stringify(stateToSave))
    } catch {
      // Ignore storage errors
    }
  }

  private clearSavedState(): void {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.removeItem(this.getStorageKey())
    } catch {
      // Ignore errors
    }
  }

  // Public API

  async nextStep(): Promise<boolean> {
    // Prevent concurrent navigation
    if (this.isNavigating) return false
    this.isNavigating = true

    try {
      const steps = this.config.steps || []
      if (this.state.currentStep >= steps.length - 1) return false

      if (this.config.validateOnNext) {
        const isValid = await this.validateCurrentStep()
        if (!isValid) {
          this.renderCurrentStep()
          return false
        }
      }

      const currentStep = steps[this.state.currentStep]
      if (currentStep?.afterLeave) {
        await currentStep.afterLeave()
      }

      const nextIndex = this.state.currentStep + 1
      const nextStep = steps[nextIndex]

      if (nextStep?.beforeEnter) {
        const canEnter = await nextStep.beforeEnter()
        if (!canEnter) return false
      }

      const previousStep = this.state.currentStep
      const completedSteps = new Set(this.state.completedSteps)
      completedSteps.add(previousStep)

      const stepHistory = [...this.state.stepHistory, previousStep]

      this.setState({
        currentStep: nextIndex,
        completedSteps,
        stepHistory,
      })

      this.renderHeader()
      this.renderProgress()
      this.renderCurrentStep()
      this.renderFooter()

      if (this.config.persistState) {
        this.saveState()
      }

      this.config.onStepChange?.(nextIndex, previousStep)
      return true
    } finally {
      this.isNavigating = false
    }
  }

  async previousStep(): Promise<boolean> {
    // Prevent concurrent navigation
    if (this.isNavigating) return false
    this.isNavigating = true

    try {
      if (this.state.currentStep <= 0) return false

      const steps = this.config.steps || []
      const currentStep = steps[this.state.currentStep]

      if (currentStep?.afterLeave) {
        await currentStep.afterLeave()
      }

      const previousIndex = this.state.currentStep - 1
      const prevStep = steps[previousIndex]

      if (prevStep?.beforeEnter) {
        const canEnter = await prevStep.beforeEnter()
        if (!canEnter) return false
      }

      const stepHistory = [...this.state.stepHistory]
      stepHistory.pop()

      const oldStep = this.state.currentStep
      this.setState({
        currentStep: previousIndex,
        stepHistory,
      })

      this.renderHeader()
      this.renderProgress()
      this.renderCurrentStep()
      this.renderFooter()

      if (this.config.persistState) {
        this.saveState()
      }

      this.config.onStepChange?.(previousIndex, oldStep)
      return true
    } finally {
      this.isNavigating = false
    }
  }

  async goToStep(stepIndex: number): Promise<boolean> {
    // Prevent concurrent navigation
    if (this.isNavigating) return false

    const steps = this.config.steps || []
    if (stepIndex < 0 || stepIndex >= steps.length) return false
    if (stepIndex === this.state.currentStep) return false

    const targetStep = steps[stepIndex]
    if (targetStep?.disabled) return false

    // In linear mode, can only go to completed steps or the next step
    if (this.config.linear) {
      if (stepIndex > this.state.currentStep + 1) return false
      if (!this.state.completedSteps.has(stepIndex) && stepIndex > this.state.currentStep) {
        if (stepIndex === this.state.currentStep + 1) {
          return this.nextStep()
        }
        return false
      }
    }

    this.isNavigating = true

    try {
      // Validate current step if moving forward
      if (stepIndex > this.state.currentStep && this.config.validateOnNext) {
        const isValid = await this.validateCurrentStep()
        if (!isValid) {
          this.renderCurrentStep()
          return false
        }
      }

      const currentStep = steps[this.state.currentStep]
      if (currentStep?.afterLeave) {
        await currentStep.afterLeave()
      }

      if (targetStep?.beforeEnter) {
        const canEnter = await targetStep.beforeEnter()
        if (!canEnter) return false
      }

      const previousStep = this.state.currentStep
      const completedSteps = new Set(this.state.completedSteps)
      if (stepIndex > previousStep) {
        completedSteps.add(previousStep)
      }

      this.setState({
        currentStep: stepIndex,
        completedSteps,
      })

      this.renderHeader()
      this.renderProgress()
      this.renderCurrentStep()
      this.renderFooter()

      if (this.config.persistState) {
        this.saveState()
      }

      this.config.onStepChange?.(stepIndex, previousStep)
      return true
    } finally {
      this.isNavigating = false
    }
  }

  skipStep(): boolean {
    const steps = this.config.steps || []
    const currentStep = steps[this.state.currentStep]

    if (!currentStep?.optional || !this.config.allowSkipOptional) {
      return false
    }

    const previousStep = this.state.currentStep
    const completedSteps = new Set(this.state.completedSteps)
    completedSteps.add(previousStep)

    this.setState({
      currentStep: this.state.currentStep + 1,
      completedSteps,
    })

    this.renderHeader()
    this.renderProgress()
    this.renderCurrentStep()
    this.renderFooter()

    this.config.onStepChange?.(this.state.currentStep, previousStep)
    return true
  }

  async submit(): Promise<void> {
    if (this.state.isSubmitting) return

    // Validate final step
    if (this.config.validateOnNext) {
      const isValid = await this.validateCurrentStep()
      if (!isValid) {
        this.renderCurrentStep()
        return
      }
    }

    this.setState({ isSubmitting: true })
    this.renderFooter()

    try {
      await this.config.onSubmit?.(this.state.formData)

      // Mark all steps as completed
      const steps = this.config.steps || []
      const completedSteps = new Set<number>()
      steps.forEach((_, i) => completedSteps.add(i))
      this.setState({ completedSteps })

      this.clearSavedState()
      this.config.onComplete?.()
    } finally {
      this.setState({ isSubmitting: false })
      this.renderFooter()
    }
  }

  cancel(): void {
    this.clearSavedState()
    this.config.onCancel?.()
  }

  reset(): void {
    this.clearSavedState()
    this.setState({
      currentStep: this.config.initialStep ?? 0,
      completedSteps: new Set(),
      errors: new Map(),
      fieldValidations: new Map(),
      isSubmitting: false,
      isValidating: false,
      formData: {},
      stepHistory: [],
    })

    this.renderHeader()
    this.renderProgress()
    this.renderCurrentStep()
    this.renderFooter()
  }

  setFormData(data: Record<string, unknown>): void {
    this.setState({ formData: { ...this.state.formData, ...data } })

    // Update form fields
    Object.entries(data).forEach(([name, value]) => {
      const field = this.contentElement?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        `[name="${name}"]`
      )
      if (field) {
        field.value = String(value ?? '')
      }
    })

    if (this.config.persistState) {
      this.saveState()
    }
  }

  getFormData(): Record<string, unknown> {
    return { ...this.state.formData }
  }

  getCurrentStep(): number {
    return this.state.currentStep
  }

  getStepCount(): number {
    return (this.config.steps || []).length
  }

  getCompletedSteps(): number[] {
    return Array.from(this.state.completedSteps)
  }

  isStepCompleted(stepIndex: number): boolean {
    return this.state.completedSteps.has(stepIndex)
  }

  isFirstStep(): boolean {
    return this.state.currentStep === 0
  }

  isLastStep(): boolean {
    return this.state.currentStep === (this.config.steps || []).length - 1
  }

  isSubmitting(): boolean {
    return this.state.isSubmitting
  }

  isValidating(): boolean {
    return this.state.isValidating
  }

  getStepErrors(stepIndex: number): string[] {
    return this.state.errors.get(stepIndex) || []
  }

  setStepError(stepIndex: number, error: string): void {
    const errors = this.state.errors.get(stepIndex) || []
    errors.push(error)
    this.state.errors.set(stepIndex, errors)
    this.renderHeader()
    if (stepIndex === this.state.currentStep) {
      this.renderCurrentStep()
    }
  }

  clearStepErrors(stepIndex: number): void {
    this.state.errors.delete(stepIndex)
    this.renderHeader()
    if (stepIndex === this.state.currentStep) {
      this.renderCurrentStep()
    }
  }

  setSteps(steps: StepperFormStep[]): void {
    this.config.steps = steps
    this.setState({
      currentStep: Math.min(this.state.currentStep, steps.length - 1),
      completedSteps: new Set(),
    })
    this.renderHeader()
    this.renderProgress()
    this.renderCurrentStep()
    this.renderFooter()
  }

  getSteps(): StepperFormStep[] {
    return [...(this.config.steps || [])]
  }

  updateStep(stepIndex: number, updates: Partial<StepperFormStep>): void {
    const steps = this.config.steps || []
    const existingStep = steps[stepIndex]
    if (stepIndex >= 0 && stepIndex < steps.length && existingStep) {
      steps[stepIndex] = { ...existingStep, ...updates }
      this.renderHeader()
      if (stepIndex === this.state.currentStep) {
        this.renderCurrentStep()
      }
    }
  }

  override getState(): StepperFormState {
    return { ...this.state }
  }

  override destroy(): void {
    if (this.config.persistState) {
      this.saveState()
    }
    super.destroy()
  }
}

/**
 * Create StepperForm instance
 */
export function createStepperForm(element: HTMLElement, config?: Partial<StepperFormConfig>): StepperForm {
  return new StepperForm(element, config)
}

export default StepperForm
