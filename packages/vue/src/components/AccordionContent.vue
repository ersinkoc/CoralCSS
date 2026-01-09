<script setup lang="ts">
/**
 * AccordionContent Component
 */

import { inject, type ComputedRef } from 'vue'

const open = inject<ComputedRef<boolean>>('accordion-item-open')
</script>

<template>
  <div
    role="region"
    data-coral-accordion-content
    :data-state="open ? 'open' : 'closed'"
    :hidden="!open"
  >
    <div data-coral-accordion-content-inner>
      <slot />
    </div>
  </div>
</template>
