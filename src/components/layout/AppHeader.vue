<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigation } from '@/config/navigation'
import { useUiStore } from '@/stores/ui.store'
import { useAuthStore } from '@/stores/auth.store'
import { icons } from '@/config/icons'
import { cn } from '@/lib/cn'
import { UiButton } from '../ui'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  const navItem = navigation.find((n) => n.name === route.name)
  return navItem ? navItem.title : (route.meta?.title || '')
})

const userInitials = computed(() => {
  const name = authStore.user?.name || authStore.user?.email || 'U'
  return name.charAt(0).toUpperCase()
})

const displayName = computed(() => {
  return authStore.user?.name || authStore.user?.email || ''
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-white px-4 sm:px-6 lg:px-6">

    <div class="flex items-center">
      <UiButton
        variant="ghost"
        size="icon"
        class="-ml-2 mr-2 lg:hidden"
        @click="uiStore.toggleSidebar"
      >
        <component :is="icons.MenuIcon" class="h-5 w-5 text-gray-500" />
      </UiButton>

      <h1 class="text-[15px] font-semibold tracking-tight text-gray-900">
        {{ pageTitle }}
      </h1>
    </div>

    <div class="flex items-center gap-x-4">
      <!-- User name + avatar -->
      <div class="flex items-center gap-2.5">
        <span class="text-[13px] font-medium text-gray-600 hidden sm:block">{{ displayName }}</span>
        <div :class="cn('flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 border border-gray-200')">
          <span class="text-xs font-semibold leading-none">{{ userInitials }}</span>
        </div>
      </div>

      <!-- Logout -->
      <button @click="handleLogout" class="text-gray-400 hover:text-gray-600 transition-colors" title="Log out">
        <component :is="icons.LogOutIcon" class="h-[18px] w-[18px]" />
      </button>
    </div>
  </header>
</template>
