<script setup>
import { watch, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/cn'
import { icons } from '@/config/icons'

const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  class: { type: [String, Object, Array], default: '' }
})

const emit = defineEmits(['update:open'])

const close = () => {
  emit('update:open', false)
}

watch(() => props.open, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100"
      @click="close"
    >
      <div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full" @click.stop>
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 v-if="title" class="text-lg font-semibold leading-none tracking-tight">{{ title }}</h2>
          <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
        </div>
        
        <div :class="cn('', props.class)">
          <slot />
        </div>

        <button
          @click="close"
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <component :is="icons.CloseIcon" class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>
