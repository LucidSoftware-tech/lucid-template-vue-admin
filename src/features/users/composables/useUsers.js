import { useQuery } from '@tanstack/vue-query'
import { usersService } from '../services/users.service'
import { computed } from 'vue'

export function useUsers(options = {}) {
  const { page, limit, search } = options

  return useQuery({
    queryKey: ['users', { page, limit, search }],
    queryFn: () => usersService.fetchUsers({
      page: page?.value,
      limit: limit?.value,
      search: search?.value
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
