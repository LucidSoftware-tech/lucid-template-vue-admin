import { defineStore } from 'pinia'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuth: (state) => !!state.token,
  },
  actions: {
    setAuth(user, token) {
      this.user = user
      this.token = token
    },
    async login(credentials) {
      const data = await authService.login(credentials)
      this.setAuth(data.user, data.token)
      return data
    },
    logout() {
      this.user = null
      this.token = null
      authService.logout()
    }
  },
  persist: true,
})
