<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/cn'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: { type: Boolean, default: false },
  emptyText: { type: String, default: 'No results found.' },
  class: { type: [String, Object, Array], default: '' },
})
</script>

<template>
  <div :class="cn('w-full overflow-auto rounded-md border border-border', props.class)">
    <table class="w-full caption-bottom text-sm">
      <thead class="bg-muted/50 [&_tr]:border-b [&_tr]:border-border">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th
            v-for="col in columns"
            :key="col.key"
            :class="cn('h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', col.headerClass)"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <tr v-if="loading">
          <td :colspan="columns.length" class="h-24 text-center">
            <span class="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent h-4 w-4 align-[-0.125em]"></span>
            Loading...
          </td>
        </tr>
        <tr v-else-if="!data.length">
          <td :colspan="columns.length" class="h-24 text-center text-muted-foreground">
            {{ emptyText }}
          </td>
        </tr>
        <template v-else>
          <tr
            v-for="(row, i) in data"
            :key="i"
            class="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', col.cellClass)"
            >
              <slot :name="col.key" :item="row" :index="i">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
