<script setup>
import { usePagination } from '@/composables/usePagination'
import { useDebouncedRef } from '@/composables/useDebounce'
import { useUsers } from '../composables/useUsers'
import { UiCard, UiTable, UiPagination, UiBadge, UiInput, UiButton } from '@/components/ui'
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
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-gray-900">Users</h2>
        <p class="mt-1 text-[13px] text-gray-500">Manage your users and their permissions.</p>
      </div>
      <router-link to="/users/create">
        <UiButton size="sm">
          <component :is="icons.Plus" class="mr-1.5 h-4 w-4" />
          Add User
        </UiButton>
      </router-link>
    </div>

    <UiCard>
      <div class="flex items-center justify-between pb-4">
        <UiInput
          v-model="search"
          placeholder="Search users..."
          class="max-w-xs"
        >
          <template #icon>
            <component :is="icons.Search" class="h-4 w-4" />
          </template>
        </UiInput>
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
