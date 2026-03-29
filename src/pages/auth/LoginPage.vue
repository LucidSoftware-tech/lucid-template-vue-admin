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
      email: values.email,
      password: values.password,
    })
    router.push('/')
  } catch (err) {
    globalError.value = err.message || 'Login failed'
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-5">

    <UiInput
      v-model="email"
      v-bind="emailAttrs"
      label="Email"
      type="text"
      placeholder="Enter your email"
      :error="errors.email"
    />

    <div>
      <div class="flex items-center justify-between mb-1.5">
        <label class="text-sm font-medium leading-none text-foreground">
          Password
        </label>
        <a href="#" class="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors">
          Forgot password?
        </a>
      </div>
      <UiInput
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        placeholder="Enter your password"
        :error="errors.password"
      />
    </div>

    <div v-if="globalError" class="rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
      {{ globalError }}
    </div>

    <div class="pt-1">
      <UiButton type="submit" class="w-full h-11 text-sm font-medium rounded-lg" :loading="isSubmitting">
        Sign in
      </UiButton>
    </div>

    <p class="text-center text-[13px] text-gray-500">
      Don't have an account?
      <a href="#" class="font-medium text-primary hover:text-primary/80 transition-colors">Apply for access</a>
    </p>

  </form>
</template>
