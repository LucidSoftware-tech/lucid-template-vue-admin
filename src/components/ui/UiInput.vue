<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  class: { type: [String, Object, Array], default: '' },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const onInput = (event) => emit('update:modelValue', event.target.value)
</script>

<template>
  <div class="relative w-full">
    <label v-if="label" class="mb-1.5 block text-sm font-medium leading-none text-foreground">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="$slots.icon" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <slot name="icon" />
      </div>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        :class="cn(
          'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
          $slots.icon && 'pl-9',
          error && 'border-destructive focus-visible:ring-destructive',
          props.class
        )"
      />
    </div>
    <p v-if="error" class="mt-1.5 text-[0.8rem] font-medium text-destructive">
      {{ error }}
    </p>
  </div>
</template>
