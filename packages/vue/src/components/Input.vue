<script setup lang="ts">
/**
 * Input Component
 *
 * Vue wrapper for CoralCSS Input component.
 */

export type InputVariant = 'default' | 'filled' | 'outline' | 'underline'
export type InputSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: string
    placeholder?: string
    variant?: InputVariant
    size?: InputSize
    disabled?: boolean
    error?: boolean
    errorMessage?: string
    label?: string
    helperText?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    variant: 'default',
    size: 'md',
    disabled: false,
    error: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div data-coral-input-wrapper :data-error="error || undefined">
    <label v-if="label" data-coral-input-label>{{ label }}</label>
    <input
      data-coral-input
      :data-variant="variant"
      :data-size="size"
      :data-error="error || undefined"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span v-if="error && errorMessage" data-coral-input-error>
      {{ errorMessage }}
    </span>
    <span v-else-if="helperText" data-coral-input-helper>
      {{ helperText }}
    </span>
  </div>
</template>
