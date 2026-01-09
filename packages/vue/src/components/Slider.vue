<script setup lang="ts">
/**
 * Slider Component
 *
 * Vue wrapper for CoralCSS Slider component.
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export type SliderSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    size?: SliderSize
    disabled?: boolean
    showValue?: boolean
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    disabled: false,
    showValue: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'changeEnd', value: number): void
}>()

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const internalValue = ref(props.modelValue)

const percentage = computed(() => {
  return ((internalValue.value - props.min) / (props.max - props.min)) * 100
})

const updateValue = (clientX: number) => {
  if (!trackRef.value || props.disabled) return

  const rect = trackRef.value.getBoundingClientRect()
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  const rawValue = props.min + percent * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  const clampedValue = Math.max(props.min, Math.min(props.max, steppedValue))

  internalValue.value = clampedValue
  emit('update:modelValue', clampedValue)
  emit('change', clampedValue)
}

const handleMouseDown = (e: MouseEvent) => {
  if (props.disabled) return
  isDragging.value = true
  updateValue(e.clientX)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  updateValue(e.clientX)
}

const handleMouseUp = () => {
  isDragging.value = false
  emit('changeEnd', internalValue.value)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled) return

  let newValue = internalValue.value

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      newValue = Math.min(props.max, internalValue.value + props.step)
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      newValue = Math.max(props.min, internalValue.value - props.step)
      break
    case 'Home':
      newValue = props.min
      break
    case 'End':
      newValue = props.max
      break
    default:
      return
  }

  e.preventDefault()
  internalValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div
    data-coral-slider
    :data-size="size"
    :data-disabled="disabled || undefined"
    :data-dragging="isDragging || undefined"
  >
    <div
      ref="trackRef"
      data-coral-slider-track
      @mousedown="handleMouseDown"
    >
      <div
        data-coral-slider-range
        :style="{ width: `${percentage}%` }"
      />
      <div
        role="slider"
        :tabindex="disabled ? -1 : 0"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="internalValue"
        :aria-disabled="disabled"
        data-coral-slider-thumb
        :style="{ left: `${percentage}%` }"
        @keydown="handleKeyDown"
      >
        <span v-if="showValue" data-coral-slider-tooltip>
          {{ internalValue }}
        </span>
      </div>
    </div>
  </div>
</template>
