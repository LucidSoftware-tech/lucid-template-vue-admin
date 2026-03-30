import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { toast } from 'vue-sonner'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login'
      } else if (error.response.status >= 500) {
        toast.error('Server Error', { description: 'An unexpected internal server error occurred.' })
      } else if (error.response.status >= 400 && error.response.status !== 401 && error.response.status !== 422) {
        toast.error('Request Failed', { description: error.response.data?.message || 'Something went wrong.' })
      }
    } else {
      toast.error('Network Error', { description: 'Could not connect to the server.' })
    }
    return Promise.reject(error)
  }
)
