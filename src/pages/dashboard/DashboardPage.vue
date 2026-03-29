<script setup>
import { appConfig } from '@/config/app'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-bold tracking-tight text-gray-900">Dashboard</h2>
      <p class="mt-1 text-[13px] text-gray-500">
        Welcome to {{ appConfig.name }}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-border bg-white px-5 py-4">
        <p class="text-[13px] font-medium text-gray-500">Total Users</p>
        <p class="mt-3 text-2xl font-bold tracking-tight text-gray-900">—</p>
      </div>

      <div class="rounded-xl border border-border bg-white px-5 py-4">
        <p class="text-[13px] font-medium text-gray-500">Active Sessions</p>
        <p class="mt-3 text-2xl font-bold tracking-tight text-gray-900">—</p>
      </div>

      <div class="rounded-xl border border-border bg-white px-5 py-4">
        <p class="text-[13px] font-medium text-gray-500">Revenue</p>
        <p class="mt-3 text-2xl font-bold tracking-tight text-gray-900">—</p>
      </div>

      <div class="rounded-xl border border-border bg-white px-5 py-4">
        <p class="text-[13px] font-medium text-gray-500">Growth</p>
        <p class="mt-3 text-2xl font-bold tracking-tight text-gray-900">—</p>
      </div>
    </div>
  </div>
</template>
