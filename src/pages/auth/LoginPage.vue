<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useAuthStore } from '@/stores/auth.store'
import { UiButton, UiInput } from '@/components/ui'

const router = useRouter()
const authStore = useAuthStore()

const schema = toTypedSchema(z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
}))

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'a',
    password: 'a',
  }
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    await authStore.login({
      email: values.email === 'a' ? 'a' : values.email,
      password: values.password
    })
    router.push('/')
  } catch (err) {
    globalError.value = err.message || 'Login failed'
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <UiInput
      v-model="email"
      v-bind="emailAttrs"
      label="Email address"
      type="text"
      :error="errors.email"
      placeholder="Try 'a'"
    />

    <UiInput
      v-model="password"
      v-bind="passwordAttrs"
      label="Password"
      type="password"
      :error="errors.password"
      placeholder="Try 'a'"
    />

    <div v-if="globalError" class="text-sm font-medium text-destructive">
      {{ globalError }}
    </div>

    <UiButton type="submit" class="w-full" :loading="isSubmitting">
      Sign In
    </UiButton>
  </form>
</template>
