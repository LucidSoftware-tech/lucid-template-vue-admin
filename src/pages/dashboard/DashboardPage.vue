<script setup>
import { appConfig } from '@/config/app'
import { UiCard } from '@/components/ui'
</script>

<template>
  <div class="space-y-6">
    <UiCard>
      <template #header>
        <h2 class="text-2xl font-bold tracking-tight">Welcome to {{ appConfig.name }}!</h2>
        <p class="text-muted-foreground">
          This is a sample dashboard overview. You can configure your app preferences and settings here.
        </p>
      </template>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
          <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Total Users</h3>
          <div class="text-3xl font-bold">128</div>
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
          <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Active Sessions</h3>
          <div class="text-3xl font-bold">34</div>
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
          <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Revenue</h3>
          <div class="text-3xl font-bold">$12,450</div>
        </div>
        <div class="rounded-xl border bg-card text-card-foreground shadow space-y-2 p-6">
          <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wider">System Status</h3>
          <div class="flex items-center text-3xl font-bold text-emerald-500">
            Online
          </div>
        </div>
      </div>
    </UiCard>
  </div>
</template>
