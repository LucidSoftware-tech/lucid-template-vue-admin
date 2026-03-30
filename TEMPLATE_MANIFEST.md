# Template Manifest — lucid-template-vue-admin

## Stack
- Framework: Vite 5 / Vue 3 (Composition API)
- Styling: Tailwind CSS + HSL CSS variables + Shadcn Vue
- State: Pinia + pinia-plugin-persistedstate
- Data fetching: TanStack Query v5 (@tanstack/vue-query)
- Forms: VeeValidate + Zod
- HTTP: Axios
- Icons: Lucide Vue Next
- Package manager: pnpm

## Import aliases
- `@/*` → `src/*`
- Example: `import { UiButton } from '@/components/ui'` or `import apiClient from '@/lib/api-client'`

## Available UI components
Below are the available custom and Shadcn Vue components inside `components/ui/`:

### UiAvatar
Props: `src` (String), `alt` (String), `initials` (String), `size` (sm|md|lg), `class` (String/Object/Array)
Usage: `<UiAvatar src="/img.png" initials="JD" size="md" />`

### UiBadge
Props: `variant` (default|success|warning|danger|info|outline|secondary), `class` (String/Object/Array)
Usage: `<UiBadge variant="success">Active</UiBadge>`

### UiButton
Props: `variant` (primary|secondary|outline|ghost|danger|link), `size` (sm|md|lg|icon), `class`, `loading`, `disabled`
Usage: `<UiButton variant="primary" size="md" :loading="false">Save</UiButton>`

### UiCard
Props: `class` (String/Object/Array)
Usage: `<UiCard>Content</UiCard>`

### UiEmptyState
Props: `title` (String), `description` (String), `icon` (String), `class`
Usage: `<UiEmptyState title="No Data" description="Nothing to see here." icon="Inbox" />`

### UiInput
Props: `modelValue` (String/Number), `label` (String), `placeholder` (String), `error` (String), `type` (text|password|etc), `disabled`, `class`
Usage: `<UiInput v-model="form.name" label="Name" placeholder="Enter name" :error="errors.name" />`

### UiModal
Props: `open` (Boolean), `title` (String), `description` (String), `class`
Usage: `<UiModal :open="isOpen" title="Confirm" description="Are you sure?">...</UiModal>`

### UiPagination
Props: `page` (Number), `total` (Number), `limit` (Number), `class`
Usage: `<UiPagination :page="currentPage" :total="100" />`

### UiSpinner
Props: `class` (String/Object/Array)
Usage: `<UiSpinner class="w-6 h-6 text-primary" />`

### UiTable
Props: `columns` (Array), `data` (Array), `loading` (Boolean), `emptyText` (String), `class`
Usage: `<UiTable :columns="[{key: 'name', label: 'Name'}]" :data="items" />`

### Shadcn Vue Components (Full Suite Installed)
The template is fully bootstrapped with over 30+ Shadcn Vue components (e.g., `Accordion`, `Dialog`, `Select`, `DropdownMenu`, `Tabs`, `Table`, `Form`, etc.). They are located at `src/components/ui/<component-name>/`.
Usage: Import them natively per Shadcn Vue documentation:
`import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'`

## Available layout components
- AppHeader
- AppSidebar
- AuthLayout (Used for Login/Register)
- MainLayout (Includes Header & Sidebar for authenticated routes)

## Available hooks / composables
- `useDebounce(value, delay)` (in `src/composables/useDebounce.js`)
- `useLocalStorage(key, initialValue)` (in `src/composables/useLocalStorage.js`)
- `usePagination(initialPage, initialLimit)` (in `src/composables/usePagination.js`)
- `useUsers()` (in `src/features/users/composables/useUsers.js`)

## Available stores
- `auth.store.js`: Manages user authentication state, token (`useAuthStore`)
- `ui.store.js`: Manages UI state like sidebar toggle (`useUiStore`)

## Available services
- `auth.service.js`: `authService.login(credentials)`, `authService.logout()`, `authService.me()`
- `users.service.js` (in `src/features/users/services/`): `usersService.getUsers()`, `usersService.createUser()`, etc.

## API client
Location: `src/lib/api-client.js`
Import: `import { apiClient } from '@/lib/api-client'`
Usage: `apiClient.get('/endpoint')`

## Routing pattern
Routes are defined in `src/router/routes.js`. We use nested routes with layout components:
- `MainLayout` operates at `'/'` and handles authenticated `children` pages.
- `AuthLayout` operates at `'/login'` and handles guest-only `children` pages.
New routes should dynamically import pages using `component: () => import('@/path/to/page.vue')`. Route meta tags (`requiresAuth: true`, `title: 'String'`) are used for guards and breadcrumbs.

## How to add a new page
1. Create the page component in `src/pages/<feature>/<PageName>.vue` or `src/features/<name>/pages/<PageName>.vue`.
2. Open `src/router/routes.js` to register the new route.
3. If it's an authenticated page, add it to the `children` array under the `MainLayout` object.
4. Open `src/components/layout/AppSidebar.vue` (or `src/config/navigation.js` if it exists) and add the navigation link.

## How to add a new feature
1. Create a new directory under `src/features/<feature-name>/`.
2. Inside, group by subfolders: `api/` or `services/` for axis calls, `composables/` for vue-query hooks, `components/` for feature-specific UI, and `pages/` for the route components.
3. Example of layered workflow: 
   - Write API calls in `services/<feature>.service.js`.
   - Write state logic or TanStack queries in `composables/use<Feature>.js`.
   - Create the page in `pages/<Feature>Page.vue` tying them together.
   - Inject the route in `src/router/routes.js` and link it in the Sidebar.

## CSS variables available
Location: `src/assets/styles/global.css`
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- `--radius`

## Tailwind custom classes
Location: `tailwind.config.js`
Custom themes apply the CSS variables seamlessly, e.g., `text-primary`, `bg-background`, `border-border`, `ring-ring`. Radix/Shadcn UI animations and states are supported. Include utility functions like `cn()` from `src/lib/cn.js` (aliased as `@/lib/cn`) to dynamically compose classes.

## Environment variables
There is no generic `.env.example` set, but the project utilizes:
- `VITE_API_URL`: Used in `src/lib/api-client.js` for setting the Axios base URL.

## DO NOT create these (already exist)
When generating new code, DO NOT recreate standard implementations or layout files:
- `Axios interceptors`: Use `src/lib/api-client.js`.
- `Auth store / tokens`: Use `src/stores/auth.store.js`.
- `Sidebar / Header`: Use existing `src/components/layout/*`.
- `Tailwind Config / Global CSS`: Modifying `tailwind.config.js` or `global.css` is generally discouraged unless adding deeply new design tokens.
- `Router Guards`: Standard authentication guards already exist in `src/router/guards.js`.
