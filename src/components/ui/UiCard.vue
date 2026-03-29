<script setup>
import { cn } from '@/lib/cn'

const props = defineProps({
  class: { type: [String, Object, Array], default: '' }
})
</script>

<template>
  <div :class="cn('rounded-xl border border-border bg-card text-card-foreground', props.class)">
    <div v-if="$slots.header || $slots.title || $slots.description" class="flex flex-col space-y-1.5 p-6">
      <slot name="header">
        <h3 v-if="$slots.title" class="font-semibold leading-none tracking-tight">
          <slot name="title" />
        </h3>
        <p v-if="$slots.description" class="text-sm text-muted-foreground">
          <slot name="description" />
        </p>
      </slot>
    </div>
    <div :class="cn('p-6 pt-0', !($slots.header || $slots.title || $slots.description) && 'pt-6')">
      <slot />
    </div>
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>
