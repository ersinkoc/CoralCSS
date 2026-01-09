<script setup lang="ts">
/**
 * Badge Component
 *
 * Vue wrapper for CoralCSS Badge component.
 */

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
export type BadgeSize = 'sm' | 'md' | 'lg'

withDefaults(
  defineProps<{
    variant?: BadgeVariant
    size?: BadgeSize
    removable?: boolean
  }>(),
  {
    variant: 'default',
    size: 'md',
    removable: false,
  }
)

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <span
    data-coral-badge
    :data-variant="variant"
    :data-size="size"
  >
    <slot />
    <button
      v-if="removable"
      type="button"
      data-coral-badge-remove
      @click="emit('remove')"
    >
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Remove</span>
    </button>
  </span>
</template>
