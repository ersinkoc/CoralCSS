<script setup lang="ts">
/**
 * NavigationMenuContent Component
 */

import { inject, computed, type Ref } from 'vue'

defineProps<{
  forceMount?: boolean
}>()

const value = inject<Ref<string>>('navigation-menu-value')
const itemValue = inject<string>('navigation-menu-item-value', '')

const isOpen = computed(() => value?.value === itemValue && itemValue !== '')
</script>

<template>
  <div
    v-if="forceMount || isOpen"
    data-coral-navigation-menu-content=""
    :data-state="isOpen ? 'open' : 'closed'"
    data-motion="from-start"
  >
    <slot />
  </div>
</template>
