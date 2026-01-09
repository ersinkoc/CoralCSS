<script setup lang="ts">
/**
 * Drawer Component
 *
 * Vue wrapper for CoralCSS Drawer component.
 */

import { ref, watch, onMounted, onUnmounted, provide } from 'vue'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const props = withDefaults(
  defineProps<{
    open?: boolean
    position?: DrawerPosition
    size?: DrawerSize
    overlay?: boolean
  }>(),
  {
    open: false,
    position: 'right',
    size: 'md',
    overlay: true,
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
  if (target.hasAttribute('data-coral-drawer-backdrop')) {
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

provide('drawer-open', internalOpen)
provide('drawer-close', close)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="internalOpen"
      data-coral-drawer
      :data-position="position"
      :data-size="size"
      data-open
      @click="handleClickOutside"
    >
      <div v-if="overlay" data-coral-drawer-backdrop />
      <div data-coral-drawer-content>
        <slot :close="close" />
      </div>
    </div>
  </Teleport>
</template>
