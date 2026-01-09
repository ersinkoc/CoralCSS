<script setup lang="ts">
/**
 * NavigationMenuTrigger Component
 */

import { inject, computed, type Ref } from 'vue'

const value = inject<Ref<string>>('navigation-menu-value')
const onValueChange = inject<(value: string) => void>('navigation-menu-onValueChange')
const itemValue = inject<string>('navigation-menu-item-value', '')

const isOpen = computed(() => value?.value === itemValue && itemValue !== '')

const handleClick = () => {
  if (onValueChange) {
    onValueChange(isOpen.value ? '' : itemValue)
  }
}
</script>

<template>
  <button
    type="button"
    :aria-expanded="isOpen"
    data-coral-navigation-menu-trigger=""
    :data-state="isOpen ? 'open' : 'closed'"
    @click="handleClick"
  >
    <slot />
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      data-coral-navigation-menu-chevron=""
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" fill="none" />
    </svg>
  </button>
</template>
