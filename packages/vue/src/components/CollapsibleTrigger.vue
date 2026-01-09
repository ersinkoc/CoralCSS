<script setup lang="ts">
/**
 * CollapsibleTrigger Component
 */

import { inject, type Ref } from 'vue'

const open = inject<Ref<boolean>>('collapsible-open')
const toggle = inject<() => void>('collapsible-toggle')
const disabled = inject<boolean>('collapsible-disabled', false)
</script>

<template>
  <button
    type="button"
    :aria-expanded="open"
    data-coral-collapsible-trigger=""
    :data-state="open ? 'open' : 'closed'"
    :disabled="disabled"
    @click="toggle"
  >
    <slot />
  </button>
</template>
