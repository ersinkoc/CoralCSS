<script setup lang="ts">
/**
 * PopoverTrigger Component
 */

import { inject, type Ref } from 'vue'

const open = inject<Ref<boolean>>('popover-open')
const toggle = inject<() => void>('popover-toggle')
</script>

<template>
  <button
    type="button"
    data-coral-popover-trigger
    :aria-expanded="open"
    @click="toggle"
  >
    <slot />
  </button>
</template>
