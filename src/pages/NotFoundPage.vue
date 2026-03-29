<script setup>
import { UiButton } from '@/components/ui'
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl font-bold text-foreground">404</h1>
    <h2 class="mt-4 text-xl text-muted-foreground">This page could not be found.</h2>
    <div class="mt-6 flex gap-4">
      <router-link to="/">
        <UiButton>Go Home</UiButton>
      </router-link>
      <UiButton variant="outline" @click="$router.back()">Go Back</UiButton>
    </div>
  </div>
</template>
