<script setup>
import { computed, ref } from 'vue'
import { cn } from '@/lib/cn'

const props = defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
  initials: { type: String, default: '' },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  class: { type: [String, Object, Array], default: '' }
})

const imageError = ref(false)

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base'
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div
    :class="cn(
      'relative flex shrink-0 overflow-hidden rounded-full bg-secondary text-secondary-foreground items-center justify-center font-medium',
      sizeClasses[size],
      props.class
    )"
  >
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover"
      @error="handleImageError"
    />
    <span v-else-if="initials">{{ initials.substring(0, 2).toUpperCase() }}</span>
    <span v-else>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-1/2 w-1/2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </span>
  </div>
</template>
