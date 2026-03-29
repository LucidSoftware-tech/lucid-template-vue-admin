<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import { icons } from '@/config/icons'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Inbox' },
  class: { type: [String, Object, Array], default: '' }
})

const IconComponent = computed(() => icons[props.icon] || icons.Inbox)
</script>

<template>
  <div
    :class="cn(
      'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
      props.class
    )"
  >
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <div class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <component :is="IconComponent" class="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 class="mt-6 text-xl font-semibold">{{ title }}</h2>
      <p class="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>
