<script setup>
import { appConfig } from '@/config/app'
import { icons } from '@/config/icons'
import { computed } from 'vue'

const logoComponent = computed(() => {
  if (appConfig.logoIcon && icons[appConfig.logoIcon]) {
    return icons[appConfig.logoIcon]
  }
  return icons.RocketIcon
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-[440px] rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-sm sm:px-10 sm:py-12">

      <!-- Logo & Title -->
      <div class="flex flex-col items-center text-center mb-8">
        <template v-if="appConfig.logo">
          <img :src="appConfig.logo" :alt="appConfig.name" class="mb-5 h-14 w-14" />
        </template>
        <template v-else>
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-sm">
            <component :is="logoComponent" class="h-7 w-7 text-white" />
          </div>
        </template>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
        <p class="mt-2 text-[14px] text-gray-500">Sign in to {{ appConfig.name }}</p>
      </div>

      <!-- Form -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
