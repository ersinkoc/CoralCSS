/**
 * Tests for StepperForm Component
 *
 * @vitest-environment jsdom
 * @module tests/unit/components/stepper-form
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { StepperForm, createStepperForm } from '../../../src/components/stepper-form'
import type { StepperFormStep, StepperFormConfig } from '../../../src/components/stepper-form'

const sampleSteps: StepperFormStep[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Enter your personal details',
    content: '<input type="text" name="firstName" placeholder="First Name" />',
  },
  {
    id: 'contact',
    title: 'Contact Info',
    description: 'Enter your contact details',
    content: '<input type="email" name="email" placeholder="Email" />',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review your information',
    content: '<p>Please review your information</p>',
  },
]

describe('StepperForm Component', () => {
  let element: HTMLElement
  let stepperForm: StepperForm

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  afterEach(() => {
    stepperForm?.destroy()
    element.remove()
  })

  describe('Initialization', () => {
    it('should create instance with default config', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })
      expect(stepperForm).toBeInstanceOf(StepperForm)
    })

    it('should have correct ARIA attributes', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })
      expect(element.getAttribute('role')).toBe('form')
      expect(element.getAttribute('aria-label')).toBe('Multi-step form')
    })

    it('should render stepper structure', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })
      expect(element.querySelector('.stepper-header')).not.toBeNull()
      expect(element.querySelector('.stepper-content')).not.toBeNull()
      expect(element.querySelector('.stepper-footer')).not.toBeNull()
    })

    it('should render progress bar when enabled', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        showProgressBar: true,
      })
      expect(element.querySelector('.stepper-progress')).not.toBeNull()
    })

    it('should not render progress bar when disabled', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        showProgressBar: false,
      })
      expect(element.querySelector('.stepper-progress')).toBeNull()
    })

    it('should render all step indicators', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })
      const stepIndicators = element.querySelectorAll('.stepper-step')
      expect(stepIndicators.length).toBe(3)
    })

    it('should start at initial step', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 1,
      })
      expect(stepperForm.getCurrentStep()).toBe(1)
    })
  })

  describe('Navigation', () => {
    it('should go to next step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        validateOnNext: false,
      })

      const result = await stepperForm.nextStep()
      expect(result).toBe(true)
      expect(stepperForm.getCurrentStep()).toBe(1)
    })

    it('should go to previous step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 1,
        validateOnNext: false,
      })

      const result = await stepperForm.previousStep()
      expect(result).toBe(true)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should not go beyond last step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
        validateOnNext: false,
      })

      const result = await stepperForm.nextStep()
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(2)
    })

    it('should not go before first step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        validateOnNext: false,
      })

      const result = await stepperForm.previousStep()
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should go to specific step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        linear: false,
        validateOnNext: false,
      })

      const result = await stepperForm.goToStep(2)
      expect(result).toBe(true)
      expect(stepperForm.getCurrentStep()).toBe(2)
    })

    it('should call onStepChange callback', async () => {
      const onStepChange = vi.fn()
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        onStepChange,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      expect(onStepChange).toHaveBeenCalledWith(1, 0)
    })
  })

  describe('Linear Mode', () => {
    it('should not allow skipping steps in linear mode', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        linear: true,
        validateOnNext: false,
      })

      const result = await stepperForm.goToStep(2)
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should allow going to completed steps in linear mode', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        linear: true,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      await stepperForm.nextStep()

      const result = await stepperForm.goToStep(0)
      expect(result).toBe(true)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })
  })

  describe('Optional Steps', () => {
    it('should skip optional step when allowed', () => {
      const stepsWithOptional: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content 1' },
        { id: 'step2', title: 'Step 2', content: 'Content 2', optional: true },
        { id: 'step3', title: 'Step 3', content: 'Content 3' },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithOptional,
        allowSkipOptional: true,
        initialStep: 1,
      })

      const result = stepperForm.skipStep()
      expect(result).toBe(true)
      expect(stepperForm.getCurrentStep()).toBe(2)
    })

    it('should not skip non-optional step', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        allowSkipOptional: true,
      })

      const result = stepperForm.skipStep()
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })
  })

  describe('Validation', () => {
    it('should validate step with custom validate function', async () => {
      const validateFn = vi.fn().mockResolvedValue(true)
      const stepsWithValidation: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content', validate: validateFn },
        { id: 'step2', title: 'Step 2', content: 'Content' },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithValidation,
        validateOnNext: true,
      })

      await stepperForm.nextStep()
      expect(validateFn).toHaveBeenCalled()
    })

    it('should not proceed when validation fails', async () => {
      const validateFn = vi.fn().mockResolvedValue(false)
      const stepsWithValidation: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content', validate: validateFn },
        { id: 'step2', title: 'Step 2', content: 'Content' },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithValidation,
        validateOnNext: true,
      })

      const result = await stepperForm.nextStep()
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should call onValidate callback', async () => {
      const onValidate = vi.fn()
      const validateFn = vi.fn().mockResolvedValue(true)
      const stepsWithValidation: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content', validate: validateFn },
        { id: 'step2', title: 'Step 2', content: 'Content' },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithValidation,
        validateOnNext: true,
        onValidate,
      })

      await stepperForm.nextStep()
      expect(onValidate).toHaveBeenCalledWith(0, true)
    })
  })

  describe('Form Data', () => {
    it('should set form data', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setFormData({ firstName: 'John', lastName: 'Doe' })

      const formData = stepperForm.getFormData()
      expect(formData.firstName).toBe('John')
      expect(formData.lastName).toBe('Doe')
    })

    it('should get form data', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setFormData({ test: 'value' })
      expect(stepperForm.getFormData()).toEqual({ test: 'value' })
    })

    it('should merge form data', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setFormData({ a: 1 })
      stepperForm.setFormData({ b: 2 })

      const formData = stepperForm.getFormData()
      expect(formData.a).toBe(1)
      expect(formData.b).toBe(2)
    })
  })

  describe('Submission', () => {
    it('should call onSubmit callback', async () => {
      const onSubmit = vi.fn()
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
        onSubmit,
        validateOnNext: false,
      })

      await stepperForm.submit()
      expect(onSubmit).toHaveBeenCalledWith({})
    })

    it('should pass form data to onSubmit', async () => {
      const onSubmit = vi.fn()
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
        onSubmit,
        validateOnNext: false,
      })

      stepperForm.setFormData({ name: 'Test' })
      await stepperForm.submit()

      expect(onSubmit).toHaveBeenCalledWith({ name: 'Test' })
    })

    it('should call onComplete after submission', async () => {
      const onComplete = vi.fn()
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
        onComplete,
        validateOnNext: false,
      })

      await stepperForm.submit()
      expect(onComplete).toHaveBeenCalled()
    })

    it('should set isSubmitting during submission', async () => {
      let wasSubmitting = false
      const onSubmit = vi.fn().mockImplementation(() => {
        wasSubmitting = stepperForm.isSubmitting()
      })

      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
        onSubmit,
        validateOnNext: false,
      })

      await stepperForm.submit()
      expect(wasSubmitting).toBe(true)
      expect(stepperForm.isSubmitting()).toBe(false)
    })
  })

  describe('Cancel', () => {
    it('should call onCancel callback', () => {
      const onCancel = vi.fn()
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        onCancel,
      })

      stepperForm.cancel()
      expect(onCancel).toHaveBeenCalled()
    })
  })

  describe('Reset', () => {
    it('should reset to initial step', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      await stepperForm.nextStep()
      stepperForm.reset()

      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should clear completed steps', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      stepperForm.reset()

      expect(stepperForm.getCompletedSteps()).toEqual([])
    })

    it('should clear form data', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setFormData({ name: 'Test' })
      stepperForm.reset()

      expect(stepperForm.getFormData()).toEqual({})
    })
  })

  describe('Step Management', () => {
    it('should get step count', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      expect(stepperForm.getStepCount()).toBe(3)
    })

    it('should check if step is completed', async () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      expect(stepperForm.isStepCompleted(0)).toBe(true)
      expect(stepperForm.isStepCompleted(1)).toBe(false)
    })

    it('should check if first step', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      expect(stepperForm.isFirstStep()).toBe(true)
    })

    it('should check if last step', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        initialStep: 2,
      })

      expect(stepperForm.isLastStep()).toBe(true)
    })

    it('should get steps', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      const steps = stepperForm.getSteps()
      expect(steps.length).toBe(3)
      expect(steps[0].id).toBe('personal')
    })

    it('should set new steps', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      const newSteps: StepperFormStep[] = [
        { id: 'new1', title: 'New Step 1', content: 'Content' },
        { id: 'new2', title: 'New Step 2', content: 'Content' },
      ]

      stepperForm.setSteps(newSteps)

      expect(stepperForm.getStepCount()).toBe(2)
    })

    it('should update step', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.updateStep(0, { title: 'Updated Title' })

      const steps = stepperForm.getSteps()
      expect(steps[0].title).toBe('Updated Title')
    })
  })

  describe('Error Handling', () => {
    it('should set step error', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setStepError(0, 'Test error')
      expect(stepperForm.getStepErrors(0)).toContain('Test error')
    })

    it('should clear step errors', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setStepError(0, 'Test error')
      stepperForm.clearStepErrors(0)

      expect(stepperForm.getStepErrors(0)).toEqual([])
    })

    it('should display error in step indicator', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.setStepError(0, 'Test error')

      const stepIndicator = element.querySelector('.stepper-step[data-step="0"]')
      expect(stepIndicator?.classList.contains('error')).toBe(true)
    })
  })

  describe('Step Lifecycle Hooks', () => {
    it('should call beforeEnter hook', async () => {
      const beforeEnter = vi.fn().mockResolvedValue(true)
      const stepsWithHooks: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content' },
        { id: 'step2', title: 'Step 2', content: 'Content', beforeEnter },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithHooks,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      expect(beforeEnter).toHaveBeenCalled()
    })

    it('should not proceed if beforeEnter returns false', async () => {
      const beforeEnter = vi.fn().mockResolvedValue(false)
      const stepsWithHooks: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content' },
        { id: 'step2', title: 'Step 2', content: 'Content', beforeEnter },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithHooks,
        validateOnNext: false,
      })

      const result = await stepperForm.nextStep()
      expect(result).toBe(false)
      expect(stepperForm.getCurrentStep()).toBe(0)
    })

    it('should call afterLeave hook', async () => {
      const afterLeave = vi.fn()
      const stepsWithHooks: StepperFormStep[] = [
        { id: 'step1', title: 'Step 1', content: 'Content', afterLeave },
        { id: 'step2', title: 'Step 2', content: 'Content' },
      ]

      stepperForm = createStepperForm(element, {
        steps: stepsWithHooks,
        validateOnNext: false,
      })

      await stepperForm.nextStep()
      expect(afterLeave).toHaveBeenCalled()
    })
  })

  describe('Orientation', () => {
    it('should apply horizontal orientation class', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        orientation: 'horizontal',
      })

      expect(element.classList.contains('stepper-horizontal')).toBe(true)
    })

    it('should apply vertical orientation class', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
        orientation: 'vertical',
      })

      expect(element.classList.contains('stepper-vertical')).toBe(true)
    })
  })

  describe('State Management', () => {
    it('should return complete state', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      const state = stepperForm.getState()

      expect(state).toHaveProperty('currentStep')
      expect(state).toHaveProperty('completedSteps')
      expect(state).toHaveProperty('errors')
      expect(state).toHaveProperty('formData')
      expect(state).toHaveProperty('isSubmitting')
    })
  })

  describe('Cleanup', () => {
    it('should clean up on destroy', () => {
      stepperForm = createStepperForm(element, {
        steps: sampleSteps,
      })

      stepperForm.destroy()

      // Should not throw errors
      expect(true).toBe(true)
    })
  })
})
