<template>
  <div class="text-center">
    <Typography as="h2" size="3xl" weight="extrabold" color="default" class="mt-1">
      Đăng nhập vào tài khoản
    </Typography>
    <Typography as="p" size="sm" color="muted" class="mt-2">
      Hoặc
      <NuxtLink
        to="/auth/register"
        class="font-medium text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300"
      >
        đăng ký tài khoản mới
      </NuxtLink>
    </Typography>
  </div>

  <form class="mt-2 space-y-6" @submit="handleLogin">
    <div class="space-y-4">
      <!-- Email Input -->
      <div>
        <Typography as="label" for="email" size="sm" weight="medium" color="default" class="block mb-2">
          Email
        </Typography>
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
        <Typography v-if="errors.email" as="p" size="sm" color="error" class="mt-1">
          {{ errors.email }}
        </Typography>
      </div>

      <!-- Password Input -->
      <div>
        <Typography
          as="label"
          for="password"
          size="sm"
          weight="medium"
          color="default"
          class="block mb-2"
        >
          Mật khẩu
        </Typography>
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
        <Typography v-if="errors.password" as="p" size="sm" color="error" class="mt-1">
          {{ errors.password }}
        </Typography>
      </div>
    </div>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          v-model="rememberMe"
          type="checkbox"
          class="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
        />
        <Typography as="label" for="remember-me" size="sm" color="default" class="ml-2 block">
          Ghi nhớ đăng nhập
        </Typography>
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
  import Typography from '~/components/ui/Typography.vue'
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
