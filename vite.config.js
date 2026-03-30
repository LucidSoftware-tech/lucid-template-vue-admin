import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['lucide-vue-next', 'reka-ui', 'clsx', 'tailwind-merge'],
          'query-vendor': ['@tanstack/vue-query', 'axios'],
          'form-vendor': ['vee-validate', '@vee-validate/zod', 'zod']
        }
      }
    }
  }
})
