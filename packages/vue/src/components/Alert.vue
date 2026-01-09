<script setup lang="ts">
/**
 * Alert Component
 *
 * Vue wrapper for CoralCSS Alert component.
 */

import { ref } from 'vue'

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'

const props = withDefaults(
  defineProps<{
    variant?: AlertVariant
    dismissible?: boolean
    icon?: boolean
  }>(),
  {
    variant: 'default',
    dismissible: false,
    icon: true,
  }
)

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

const visible = ref(true)

const dismiss = () => {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <div
    v-if="visible"
    data-coral-alert
    :data-variant="variant"
    role="alert"
  >
    <div v-if="icon" data-coral-alert-icon>
      <slot name="icon" />
    </div>
    <div data-coral-alert-content>
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      data-coral-alert-dismiss
      @click="dismiss"
    >
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Dismiss</span>
    </button>
  </div>
</template>
