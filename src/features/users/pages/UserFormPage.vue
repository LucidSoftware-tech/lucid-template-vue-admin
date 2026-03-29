<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { UiButton, UiInput, UiCard } from '@/components/ui'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? 'Edit User' : 'Create User')

const schema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
}))

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    role: 'User',
  }
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [role, roleAttrs] = defineField('role')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    // MOCK: Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('Submitted user:', values)
    router.push('/users')
  } catch (err) {
    globalError.value = err.message || 'Something went wrong'
  }

  // REAL API CALL
  // try {
  //   if (isEdit.value) {
  //     await usersService.updateUser(route.params.id, values)
  //   } else {
  //     await usersService.createUser(values)
  //   }
  //   router.push('/users')
  // } catch (err) {
  //   globalError.value = err.response?.data?.message || 'Something went wrong'
  // }
})
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ pageTitle }}</h2>
        <p class="text-sm text-muted-foreground mt-1">
          {{ isEdit ? 'Update the user information below.' : 'Fill in the details to create a new user.' }}
        </p>
      </div>
    </div>

    <UiCard>
      <form @submit="onSubmit" class="space-y-5">
        <UiInput
          v-model="name"
          v-bind="nameAttrs"
          label="Full Name"
          placeholder="Enter full name"
          :error="errors.name"
        />

        <UiInput
          v-model="email"
          v-bind="emailAttrs"
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          :error="errors.email"
        />

        <div class="space-y-1.5">
          <label class="block text-sm font-medium leading-none">Role</label>
          <select
            v-model="role"
            v-bind="roleAttrs"
            class="flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <p v-if="errors.role" class="text-[0.8rem] font-medium text-destructive">
            {{ errors.role }}
          </p>
        </div>

        <div v-if="globalError" class="text-sm font-medium text-destructive">
          {{ globalError }}
        </div>

        <div class="flex items-center gap-3 pt-4">
          <UiButton type="submit" :loading="isSubmitting">
            {{ isEdit ? 'Update User' : 'Create User' }}
          </UiButton>
          <UiButton type="button" variant="outline" @click="router.push('/users')">
            Cancel
          </UiButton>
        </div>
      </form>
    </UiCard>
  </div>
</template>
