<script setup lang="ts">
/**
 * DropdownContent Component
 */

import { inject, ref, onMounted, onUnmounted, type Ref } from 'vue'

defineProps<{
  align?: 'start' | 'center' | 'end'
}>()

const open = inject<Ref<boolean>>('dropdown-open')
const close = inject<() => void>('dropdown-close')

const contentRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (contentRef.value && !contentRef.value.contains(e.target as Node)) {
    close?.()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div
    v-if="open"
    ref="contentRef"
    role="menu"
    data-coral-dropdown-content
    :data-align="align"
  >
    <slot />
  </div>
</template>
