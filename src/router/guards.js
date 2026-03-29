import { useAuthStore } from '@/stores/auth.store'

export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuth = authStore.isAuth

    if (to.meta.requiresAuth && !isAuth) {
      next('/login')
    } else if (to.meta.guestOnly && isAuth) {
      next('/')
    } else {
      next()
    }
  })
}
