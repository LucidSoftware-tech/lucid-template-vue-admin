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
  { key: 'actions', label: 'Actions', headerClass: 'text-right', cellClass: 'text-right' },
]
</script>

<template>
  <div class="space-y-5">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-gray-900">Users</h2>
        <p class="mt-1 text-[13px] text-gray-500">Manage your team members and their account permissions here.</p>
      </div>
      <router-link to="/users/create">
        <UiButton size="sm">
          <component :is="icons.Plus" class="mr-1.5 h-4 w-4" />
          Add User
        </UiButton>
      </router-link>
    </div>

    <!-- Search -->
    <div>
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

    <!-- Table -->
    <UiTable
      :columns="columns"
      :data="data?.data"
      :loading="isLoading || isFetching"
    >
      <template #role="{ item }">
        <UiBadge
          :variant="item.role === 'Admin' ? 'default' : 'outline'"
        >
          {{ item.role }}
        </UiBadge>
      </template>

      <template #status="{ item }">
        <UiBadge
          :variant="item.status === 'Active' ? 'success' : 'outline'"
        >
          {{ item.status }}
        </UiBadge>
      </template>

      <template #actions="{ item }">
        <div class="flex items-center justify-end gap-1">
          <router-link :to="`/users/${item.id}/edit`">
            <button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <component :is="icons.PencilIcon" class="h-4 w-4" />
            </button>
          </router-link>
          <button class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <component :is="icons.TrashIcon" class="h-4 w-4" />
          </button>
        </div>
      </template>
    </UiTable>

    <!-- Pagination -->
    <UiPagination
      v-if="data?.meta"
      :page="page"
      @update:page="page = $event"
      :limit="data.meta.limit"
      :total="data.meta.total"
    />
  </div>
</template>
