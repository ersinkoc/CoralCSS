<script setup lang="ts">
/**
 * CollapsibleContent Component
 */

import { inject, type Ref } from 'vue'

defineProps<{
  forceMount?: boolean
}>()

const open = inject<Ref<boolean>>('collapsible-open')
</script>

<template>
  <div
    v-if="forceMount || open"
    data-coral-collapsible-content=""
    :data-state="open ? 'open' : 'closed'"
    :hidden="!open"
  >
    <slot />
  </div>
</template>
