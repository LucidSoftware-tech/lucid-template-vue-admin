<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigation } from '@/config/navigation'
import { useUiStore } from '@/stores/ui.store'
import { useAuthStore } from '@/stores/auth.store'
import { icons } from '@/config/icons'
import { UiButton, UiAvatar } from '../ui'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  const navItem = navigation.find((n) => n.name === route.name)
  return navItem ? navItem.title : (route.meta.title || '')
})

const userInitials = computed(() => {
  return authStore.user?.name || authStore.user?.email || 'U'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
    <UiButton
      variant="ghost"
      size="icon"
      class="-m-2.5 lg:hidden"
      @click="uiStore.toggleSidebar"
    >
      <span class="sr-only">Open sidebar</span>
      <component :is="icons.MenuIcon" class="h-6 w-6" />
    </UiButton>

    <!-- Separator for mobile menu -->
    <div class="h-6 w-px bg-border lg:hidden" aria-hidden="true"></div>

    <div class="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
      <div class="flex flex-1">
        <h1 class="text-xl font-semibold leading-6 text-foreground">
          {{ pageTitle }}
        </h1>
      </div>
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true"></div>

        <div class="flex items-center gap-2">
          <UiAvatar :initials="userInitials" size="sm" class="bg-primary text-primary-foreground" />
          <UiButton variant="ghost" size="icon" @click="handleLogout" title="Logout">
            <component :is="icons.LogOutIcon" class="h-5 w-5" />
          </UiButton>
        </div>
      </div>
    </div>
  </header>
</template>
