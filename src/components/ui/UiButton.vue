<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import UiSpinner from './UiSpinner.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'danger', 'link'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'icon'].includes(v)
  },
  class: { type: [String, Object, Array], default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-transparent',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent',
  outline: 'border border-input bg-background hover:bg-muted hover:text-muted-foreground',
  ghost: 'hover:bg-muted hover:text-muted-foreground border border-transparent',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm border border-transparent',
  link: 'text-primary underline-offset-4 hover:underline border border-transparent',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 py-2',
  lg: 'h-10 px-8',
  icon: 'h-9 w-9 p-0',
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      props.class
    )"
  >
    <UiSpinner v-if="loading" class="mr-2 h-4 w-4" />
    <slot />
  </button>
</template>
