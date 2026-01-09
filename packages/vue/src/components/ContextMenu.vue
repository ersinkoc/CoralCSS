<script setup lang="ts">
/**
 * ContextMenu Component
 */

import { ref, provide } from 'vue'

const emit = defineEmits<{
  (e: 'openChange', value: boolean): void
}>()

const open = ref(false)
const position = ref({ x: 0, y: 0 })

const onOpenChange = (value: boolean) => {
  open.value = value
  emit('openChange', value)
}

const setPosition = (pos: { x: number; y: number }) => {
  position.value = pos
}

provide('context-menu-open', open)
provide('context-menu-onOpenChange', onOpenChange)
provide('context-menu-position', position)
provide('context-menu-setPosition', setPosition)
</script>

<template>
  <slot />
</template>
