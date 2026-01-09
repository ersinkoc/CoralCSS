<script setup lang="ts">
/**
 * TooltipTrigger Component
 */

import { inject } from 'vue'

const showTooltip = inject<() => void>('tooltip-show')
const hideTooltip = inject<() => void>('tooltip-hide')
</script>

<template>
  <span
    data-coral-tooltip-trigger
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <slot />
  </span>
</template>
