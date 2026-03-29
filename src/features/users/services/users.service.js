// import { apiClient } from '@/lib/api-client'
import dayjs from 'dayjs'

const MOCK_USERS = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? 'Admin' : 'User',
  status: i % 3 === 0 ? 'inactive' : 'active',
  created_at: dayjs().subtract(i * 2, 'day').format('YYYY-MM-DD HH:mm:ss')
}))

export const usersService = {
  // MOCK Fetch Users
  async fetchUsers(params = {}) {
    console.log('Fetching users with params:', params)
    const { page = 1, limit = 10, search = '' } = params
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...MOCK_USERS]
        if (search) {
          filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
        }
        
        const offset = (page - 1) * limit
        const items = filtered.slice(offset, offset + limit)
        resolve({
          data: items,
          meta: {
            total: filtered.length,
            page,
            limit
          }
        })
      }, 500)
    })
  }

  // REAL API CALLS
  // async fetchUsers(params) {
  //   const { data } = await apiClient.get('/users', { params })
  //   return data
  // }
}
