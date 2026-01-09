<script setup lang="ts">
/**
 * Toast Component
 *
 * Vue wrapper for CoralCSS Toast component.
 */

import { ref, onMounted } from 'vue'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

const props = withDefaults(
  defineProps<{
    variant?: ToastVariant
    duration?: number
    dismissible?: boolean
    title?: string
    description?: string
  }>(),
  {
    variant: 'default',
    duration: 5000,
    dismissible: true,
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref(true)

const close = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(close, props.duration)
  }
})
</script>

<template>
  <div
    v-if="visible"
    data-coral-toast
    :data-variant="variant"
    role="alert"
  >
    <div data-coral-toast-content>
      <div v-if="title" data-coral-toast-title>{{ title }}</div>
      <div v-if="description" data-coral-toast-description>{{ description }}</div>
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      data-coral-toast-close
      @click="close"
    >
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
  </div>
</template>
