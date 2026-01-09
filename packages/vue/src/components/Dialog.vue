<script setup lang="ts">
/**
 * Dialog Component
 *
 * Vue wrapper for CoralCSS Dialog component.
 */

import { ref, watch, onMounted, onUnmounted, provide, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    open?: boolean
    modal?: boolean
  }>(),
  {
    open: false,
    modal: true,
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}>()

const internalOpen = ref(props.open)

watch(
  () => props.open,
  (newVal) => {
    internalOpen.value = newVal
  }
)

const close = () => {
  internalOpen.value = false
  emit('update:open', false)
  emit('close')
}

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && internalOpen.value) {
    close()
  }
}

// Handle click outside
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.hasAttribute('data-coral-dialog-backdrop')) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll when open
watch(internalOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

provide('dialog-open', internalOpen)
provide('dialog-close', close)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="internalOpen"
      data-coral-dialog
      data-open
      @click="handleClickOutside"
    >
      <div data-coral-dialog-backdrop />
      <div data-coral-dialog-content>
        <slot :close="close" />
      </div>
    </div>
  </Teleport>
</template>
