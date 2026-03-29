<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigation } from '@/config/navigation'
import { appConfig } from '@/config/app'
import { icons } from '@/config/icons'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/lib/cn'
import UiButton from '../ui/UiButton.vue'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const currentRouteName = computed(() => route.name)

const handleNavigate = (navItem) => {
  router.push(navItem.path)
  if (window.innerWidth < 1024) {
    uiStore.setSidebarOpen(false)
  }
}
</script>

<template>
  <aside
    :class="cn(
      'fixed inset-y-0 left-0 z-40 w-64 -translate-x-full transform border-r bg-card transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 lg:flex lg:flex-col',
      uiStore.isSidebarOpen && 'translate-x-0'
    )"
  >
    <div class="flex h-16 shrink-0 items-center border-b px-6">
      <img v-if="appConfig.logo" :src="appConfig.logo" alt="Logo" class="mr-3 h-8 w-8" />
      <span class="text-lg font-bold">{{ appConfig.name }}</span>
    </div>
    <nav class="flex-1 space-y-1 overflow-y-auto p-4">
      <component
        :is="nav.path ? 'a' : 'div'"
        v-for="nav in navigation"
        :key="nav.name"
        @click.prevent="handleNavigate(nav)"
        :class="cn(
          'group flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
          currentRouteName === nav.name
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )"
      >
        <component
          :is="icons[nav.icon] || icons.DashboardIcon"
          :class="cn(
            'mr-3 h-5 w-5 shrink-0',
            currentRouteName === nav.name ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
          )"
        />
        {{ nav.title }}
      </component>
    </nav>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="uiStore.isSidebarOpen"
    class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
    @click="uiStore.setSidebarOpen(false)"
  ></div>
</template>
