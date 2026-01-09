<script setup lang="ts">
/**
 * Textarea Component
 */

defineProps<{
  modelValue?: string
  variant?: 'default' | 'filled' | 'ghost'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  error?: boolean
  placeholder?: string
  rows?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <textarea
    data-coral-textarea=""
    :data-variant="variant || 'default'"
    :data-resize="resize || 'vertical'"
    :data-error="error || undefined"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
