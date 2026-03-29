<script setup>
import { appConfig } from '@/config/app'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-muted/30 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <img v-if="appConfig.logo" class="mx-auto h-12 w-auto" :src="appConfig.logo" alt="Logo" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
        Sign in to {{ appConfig.name }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10 border border-border">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
