<script setup lang="ts">
/**
 * Button Component
 *
 * Vue wrapper for CoralCSS Button component.
 */

import { computed } from 'vue'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
  | 'soft'
  | 'success'
  | 'warning'
  | 'info'
  | 'gradient'
  | 'glow'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    type: 'button',
  }
)

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button
    data-coral-button
    :data-variant="variant"
    :data-size="size"
    :data-loading="loading || undefined"
    :data-full-width="fullWidth || undefined"
    :type="type"
    :disabled="isDisabled"
  >
    <span v-if="loading" data-coral-button-spinner class="coral-button-spinner">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="8" cy="8" r="6" opacity="0.25" />
        <path d="M8 2a6 6 0 0 1 6 6" stroke-linecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 8 8"
            to="360 8 8"
            dur="0.75s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
    <slot />
  </button>
</template>
