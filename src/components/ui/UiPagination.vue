<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import UiButton from './UiButton.vue'
import { icons } from '@/config/icons'

const props = defineProps({
  page: { type: Number, required: true },
  total: { type: Number, required: true },
  limit: { type: Number, default: 10 },
  class: { type: [String, Object, Array], default: '' }
})

const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.ceil(props.total / props.limit))

const prev = () => {
  if (props.page > 1) {
    emit('update:page', props.page - 1)
  }
}

const next = () => {
  if (props.page < totalPages.value) {
    emit('update:page', props.page + 1)
  }
}
</script>

<template>
  <div :class="cn('flex items-center justify-between px-2', props.class)">
    <div class="flex-1 text-sm text-muted-foreground">
      Showing {{ ((page - 1) * limit) + 1 }} to {{ Math.min(page * limit, total) }} of {{ total }}
    </div>
    <div class="flex items-center space-x-2">
      <UiButton
        variant="outline"
        size="sm"
        :disabled="page <= 1"
        @click="prev"
      >
        <span class="sr-only">Go to previous page</span>
        <component :is="icons.ChevronLeft" class="h-4 w-4" />
      </UiButton>
      <div class="text-sm font-medium">Page {{ page }} of {{ totalPages }}</div>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="page >= totalPages"
        @click="next"
      >
        <span class="sr-only">Go to next page</span>
        <component :is="icons.ChevronRight" class="h-4 w-4" />
      </UiButton>
    </div>
  </div>
</template>
