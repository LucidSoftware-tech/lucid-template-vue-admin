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

const userName = computed(() => {
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
      <!-- Notification Bell -->
      <button class="relative text-gray-400 hover:text-gray-500 focus:outline-none transition-colors">
        <span class="absolute -right-0.5 -top-0.5 block h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
        <component :is="icons.BellIcon" class="h-[18px] w-[18px]" />
      </button>

      <div class="hidden sm:block h-5 w-px bg-gray-200" aria-hidden="true"></div>

      <!-- User -->
      <div class="flex items-center gap-2.5">
        <div :class="cn('flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary')">
          <span class="text-xs font-bold leading-none">{{ userInitials }}</span>
        </div>
        <span class="text-[13px] font-medium text-gray-600 hidden sm:block">{{ userName }}</span>
      </div>

      <!-- Logout -->
      <button @click="handleLogout" class="text-gray-400 hover:text-gray-600 transition-colors" title="Log out">
        <component :is="icons.LogOutIcon" class="h-[18px] w-[18px]" />
      </button>
    </div>
  </header>
</template>
