// import { apiClient } from '@/lib/api-client'

export const authService = {
  // MOCK IMPLEMENTATION
  async login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'a' && credentials.password === 'a') {
          resolve({
            user: { id: 1, name: 'Admin', email: 'admin@lucid.com', role: 'admin' },
            token: 'mock-jwt-token-abcd-1234'
          })
        } else {
          reject(new Error('Invalid credentials. Use a/a'))
        }
      }, 500)
    })
  },

  async getMe() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: 'Admin', email: 'admin@lucid.com', role: 'admin' })
      }, 500)
    })
  },

  logout() {
    // Clear any external persistence if needed
    // LocalStorage handled by Pinia
  }

  // REAL API CALLS
  // async login(credentials) {
  //   const { data } = await apiClient.post('/auth/login', credentials)
  //   return data
  // },
  // async getMe() {
  //   const { data } = await apiClient.get('/auth/me')
  //   return data
  // },
  // async logout() {
  //   await apiClient.post('/auth/logout')
  // }
}
