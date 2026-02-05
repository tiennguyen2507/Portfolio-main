<template>
  <div class="text-center">
    <h2 class="mt-1 text-3xl font-extrabold text-gray-900">
      Đăng nhập vào tài khoản
    </h2>
    <p class="mt-2 text-sm text-gray-600">
      Hoặc
      <NuxtLink
        to="/auth/register"
        class="font-medium text-orange-500 hover:text-orange-400"
      >
        đăng ký tài khoản mới
      </NuxtLink>
    </p>
  </div>

  <form class="mt-2 space-y-6" @submit="handleLogin">
    <div class="space-y-4">
      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <Input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="Nhập email của bạn"
          required
          :variant="errors.email ? 'error' : 'default'"
          size="lg"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password Input -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Mật khẩu
        </label>
        <Input
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          required
          :variant="errors.password ? 'error' : 'default'"
          size="lg"
        />
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">
          {{ errors.password }}
        </p>
      </div>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          v-model="rememberMe"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
          Ghi nhớ đăng nhập
        </label>
      </div>
    </div>
    <!-- Submit Button -->
    <Button
      type="submit"
      :disabled="loading"
      :loading="loading"
      fullWidth
      size="md"
      variant="primary"
      class="w-full"
    >
      Đăng nhập
    </Button>
  </form>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import Input from '~/components/ui/Input/Input.vue'
  import Button from '~/components/ui/Button.vue'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { loginSchema } from '~/utils/validations/loginSchema'
  import { useNotification } from '~/composables/useNotification'

  definePageMeta({
    layout: 'auth',
  })

  const { showNotification, showError } = useNotification()

  // Sử dụng vee-validate với Zod schema
  const { handleSubmit, defineField, errors } = useForm({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Define fields với vee-validate
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')
  const [rememberMe] = defineField('rememberMe', {
    type: 'checkbox',
  })

  const loading = ref(false)

  // Handle form submission với vee-validate
  const handleLogin = handleSubmit(async values => {
    loading.value = true

    try {
      const response = await httpRequest.post('/auth/login', {
        email: values.email,
        password: values.password,
      })

      // Handle successful login
      if (response.access_token) {
        // Store token in localStorage
        localStorage.setItem('access_token', response.access_token)

        // Store user info if available
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }

        // Store remember me preference
        if (values.rememberMe) {
          localStorage.setItem('remember_me', 'true')
        } else {
          localStorage.removeItem('remember_me')
        }

        // Set auth data in store
        const userStore = useUserStore()
        userStore.setAuth(response.access_token, response.user)

        showNotification('Đăng nhập thành công! Đang chuyển hướng...')

        // Redirect to admin dashboard or home page
        setTimeout(() => {
          navigateTo('/admin')
        }, 1500)
      } else {
        showNotification({
          message: 'Đăng nhập thành công nhưng không nhận được token',
          type: 'error',
        })
      }
    } catch (err) {
      // Handle different error scenarios
      let errorMessage = 'Có lỗi xảy ra khi đăng nhập'
      if (err.status === 401) {
        errorMessage = 'Email hoặc mật khẩu không đúng'
      } else if (err.status === 422) {
        errorMessage = 'Dữ liệu không hợp lệ'
      } else if (err.status === 429) {
        errorMessage = 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau'
      } else if (err.status >= 500) {
        errorMessage = 'Lỗi server. Vui lòng thử lại sau'
      } else {
        errorMessage = err.message || 'Có lỗi xảy ra khi đăng nhập'
      }

      showError(errorMessage)
    } finally {
      loading.value = false
    }
  })

  // Check if user is already logged in
  onMounted(() => {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      // User is already logged in, redirect to admin
      navigateTo('/admin')
    }
  })
</script>
