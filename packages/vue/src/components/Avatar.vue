<script setup lang="ts">
/**
 * Avatar Component
 *
 * Vue wrapper for CoralCSS Avatar component.
 */

import { ref, computed } from 'vue'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarVariant = 'circle' | 'square' | 'rounded'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: AvatarSize
    variant?: AvatarVariant
    status?: AvatarStatus
  }>(),
  {
    size: 'md',
    variant: 'circle',
  }
)

const imageError = ref(false)

const showFallback = computed(() => !props.src || imageError.value)

const fallbackText = computed(() => {
  return props.fallback || props.alt?.charAt(0)?.toUpperCase() || '?'
})

const handleError = () => {
  imageError.value = true
}
</script>

<template>
  <div
    data-coral-avatar
    :data-size="size"
    :data-variant="variant"
  >
    <img
      v-if="!showFallback"
      :src="src"
      :alt="alt || ''"
      data-coral-avatar-image
      @error="handleError"
    />
    <span v-else data-coral-avatar-fallback>
      {{ fallbackText }}
    </span>
    <span
      v-if="status"
      data-coral-avatar-status
      :data-status="status"
    />
  </div>
</template>
