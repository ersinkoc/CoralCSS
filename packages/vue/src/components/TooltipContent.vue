<script setup lang="ts">
/**
 * TooltipContent Component
 */

import { inject, type Ref } from 'vue'
import type { TooltipPosition } from './Tooltip.vue'

const open = inject<Ref<boolean>>('tooltip-open')
const position = inject<TooltipPosition>('tooltip-position', 'top')
</script>

<template>
  <div
    v-if="open"
    role="tooltip"
    data-coral-tooltip-content
    :data-position="position"
    data-state="open"
  >
    <slot />
    <span data-coral-tooltip-arrow />
  </div>
</template>
