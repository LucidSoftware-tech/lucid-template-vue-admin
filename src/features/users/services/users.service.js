// import { apiClient } from '@/lib/api-client'
import dayjs from 'dayjs'

const FIRST_NAMES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ivan', 'Julia', 'Kevin', 'Laura', 'Michael', 'Nora', 'Oscar']
const LAST_NAMES = ['Smith', 'Jones', 'Brown', 'Wilson', 'Taylor', 'Davis', 'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Green', 'Adams']

const MOCK_USERS = Array.from({ length: 45 }).map((_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length]
  const last = LAST_NAMES[i % LAST_NAMES.length]
  return {
    id: i + 1,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    role: i % 5 === 0 ? 'Admin' : 'User',
    status: i % 3 === 0 ? 'Inactive' : 'Active',
    created_at: dayjs().subtract(i * 2, 'day').format('YYYY-MM-DD HH:mm:ss'),
  }
})

export const usersService = {
  // MOCK Implementation
  async fetchUsers(params = {}) {
    const { page = 1, limit = 10, search = '' } = params

    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...MOCK_USERS]
        if (search) {
          filtered = filtered.filter(
            (u) =>
              u.name.toLowerCase().includes(search.toLowerCase()) ||
              u.email.toLowerCase().includes(search.toLowerCase())
          )
        }

        const offset = (page - 1) * limit
        const items = filtered.slice(offset, offset + limit)
        resolve({
          data: items,
          meta: {
            total: filtered.length,
            page,
            limit,
          },
        })
      }, 300)
    })
  },

  // REAL API CALLS
  // async fetchUsers(params) {
  //   const { data } = await apiClient.get('/users', { params })
  //   return data
  // },
  // async createUser(payload) {
  //   const { data } = await apiClient.post('/users', payload)
  //   return data
  // },
  // async updateUser(id, payload) {
  //   const { data } = await apiClient.put(`/users/${id}`, payload)
  //   return data
  // },
  // async deleteUser(id) {
  //   const { data } = await apiClient.delete(`/users/${id}`)
  //   return data
  // },
}
