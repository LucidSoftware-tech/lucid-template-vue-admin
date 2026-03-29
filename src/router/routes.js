export const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/DashboardPage.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/features/users/pages/UsersListPage.vue'),
        meta: { title: 'Users' }
      },
      {
        path: 'users/create',
        name: 'users-create',
        component: () => import('@/features/users/pages/UserFormPage.vue'),
        meta: { title: 'Create User' }
      },
      {
        path: 'users/:id/edit',
        name: 'users-edit',
        component: () => import('@/features/users/pages/UserFormPage.vue'),
        meta: { title: 'Edit User' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/components/layout/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue')
  }
]
