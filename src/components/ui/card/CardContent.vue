<script setup>
import { cn } from '@/lib/cn';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('p-6 pt-0', props.class)">
    <slot />
  </div>
</template>
