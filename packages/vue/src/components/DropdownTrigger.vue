<script setup lang="ts">
/**
 * DropdownTrigger Component
 */

import { inject, type Ref } from 'vue'

const open = inject<Ref<boolean>>('dropdown-open')
const toggle = inject<() => void>('dropdown-toggle')
</script>

<template>
  <button
    type="button"
    data-coral-dropdown-trigger
    :aria-expanded="open"
    @click="toggle"
  >
    <slot />
    <svg
      data-coral-dropdown-icon
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>
</template>
