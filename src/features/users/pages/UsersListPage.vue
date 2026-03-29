<script setup>
import { usePagination } from '@/composables/usePagination'
import { useDebouncedRef } from '@/composables/useDebounce'
import { useUsers } from '../composables/useUsers'
import { UiCard, UiTable, UiPagination, UiBadge, UiInput } from '@/components/ui'
import { icons } from '@/config/icons'

const { page, limit } = usePagination()
const search = useDebouncedRef('', 500)

const { data, isLoading, isFetching } = useUsers({ page, limit, search })

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Date Added' },
]
</script>

<template>
  <div class="space-y-4">
    <UiCard>
      <div class="flex items-center justify-between pb-4">
        <div class="flex items-center space-x-2">
          <UiInput
            v-model="search"
            placeholder="Search users..."
            class="max-w-sm"
          >
            <template #icon>
              <component :is="icons.Search" class="h-4 w-4" />
            </template>
          </UiInput>
        </div>
      </div>
      
      <UiTable
        :columns="columns"
        :data="data?.data"
        :loading="isLoading || isFetching"
      >
        <template #status="{ item }">
          <UiBadge
            :variant="item.status === 'active' ? 'success' : 'secondary'"
          >
            {{ item.status }}
          </UiBadge>
        </template>
      </UiTable>

      <div class="mt-4">
        <UiPagination
          v-if="data?.meta"
          :page="page"
          @update:page="page = $event"
          :limit="data.meta.limit"
          :total="data.meta.total"
        />
      </div>
    </UiCard>
  </div>
</template>
