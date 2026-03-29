<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'warning', 'danger', 'info', 'outline', 'secondary'].includes(v)
  },
  class: { type: [String, Object, Array], default: '' }
})

const variantClasses = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  success: 'border-transparent bg-emerald-500 text-white hover:bg-emerald-600',
  warning: 'border-transparent bg-amber-500 text-white hover:bg-amber-600',
  danger: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
  outline: 'text-foreground',
}
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      variantClasses[variant],
      props.class
    )"
  >
    <slot />
  </div>
</template>
