<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navigation } from '@/config/navigation'
import { appConfig } from '@/config/app'
import { icons } from '@/config/icons'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/lib/cn'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const currentRouteName = computed(() => route.name)

const logoComponent = computed(() => {
  if (appConfig.logoIcon && icons[appConfig.logoIcon]) {
    return icons[appConfig.logoIcon]
  }
  return icons.RocketIcon
})

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
      'fixed inset-y-0 left-0 z-40 w-64 -translate-x-full transform border-r border-border/40 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 lg:flex lg:flex-col',
      uiStore.isSidebarOpen && 'translate-x-0'
    )"
  >
    <!-- Logo -->
    <div class="flex h-14 shrink-0 items-center border-b border-border/40 px-5">
      <template v-if="appConfig.logo">
        <img :src="appConfig.logo" :alt="appConfig.name" class="mr-3 h-8 w-8" />
      </template>
      <template v-else>
        <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
          <component :is="logoComponent" class="h-[18px] w-[18px] text-white" />
        </div>
      </template>
      <span class="text-[15px] font-semibold tracking-tight text-foreground">{{ appConfig.name }}</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
      <a
        v-for="nav in navigation"
        :key="nav.name"
        href="#"
        @click.prevent="handleNavigate(nav)"
        :class="cn(
          'group flex cursor-pointer items-center rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
          currentRouteName === nav.name
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        )"
      >
        <component
          :is="icons[nav.icon] || icons.DashboardIcon"
          :class="cn(
            'mr-2.5 h-4 w-4 shrink-0 transition-colors',
            currentRouteName === nav.name ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
          )"
        />
        {{ nav.title }}
      </a>
    </nav>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="uiStore.isSidebarOpen"
    class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
    @click="uiStore.setSidebarOpen(false)"
  ></div>
</template>
