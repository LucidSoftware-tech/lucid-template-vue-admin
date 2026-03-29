import { ref } from 'vue'

export function usePagination(initialPage = 1, initialLimit = 10) {
  const page = ref(initialPage)
  const limit = ref(initialLimit)

  return { page, limit }
}
