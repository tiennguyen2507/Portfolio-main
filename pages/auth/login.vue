<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Logo/Brand -->
      <div class="text-center">
        <NuxtLink to="/" aria-label="Trang chủ">
          <img
            class="mx-auto h-16 w-auto"
            src="/assets/images/logo-main.webp"
            alt="Logo"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
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

      <!-- Login Form -->
      <form
        class="mt-8 space-y-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        @submit.prevent="handleLogin"
      >
        <!-- Error Message -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ error }}
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {{ successMessage }}
          </div>
        </div>

        <div class="space-y-4">
          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <AdminUiInput
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Nhập email của bạn"
              required
              :variant="emailError ? 'danger' : 'primary'"
              size="lg"
              @blur="validateEmailRealTime"
              @input="validateEmailRealTime"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600">
              {{ emailError }}
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
            <AdminUiInput
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              required
              :variant="passwordError ? 'danger' : 'primary'"
              size="lg"
              @blur="validatePasswordRealTime"
              @input="validatePasswordRealTime"
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">
              {{ passwordError }}
            </p>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="formData.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>
        </div>
        <!-- Submit Button -->
        <AdminUiButton
          type="submit"
          :disabled="loading"
          :loading="loading"
          full-width
          size="lg"
          variant="primary"
        >
          Đăng nhập
        </AdminUiButton>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import AdminUiInput from '~/components/admin/ui/AdminUiInput.vue'
  import AdminUiButton from '~/components/admin/ui/AdminUiButton.vue'

  definePageMeta({
    layout: 'default',
  })

  // Reactive data
  const formData = ref({
    email: '',
    password: '',
    rememberMe: false,
  })

  const loading = ref(false)
  const error = ref('')
  const successMessage = ref('')
  const emailError = ref('')
  const passwordError = ref('')

  // Validation functions
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return 'Email là bắt buộc'
    }
    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ'
    }
    return ''
  }

  const validatePassword = password => {
    if (!password) {
      return 'Mật khẩu là bắt buộc'
    }
    if (password.length < 8) {
      return 'Mật khẩu phải có ít nhất 8 ký tự'
    }
    return ''
  }

  // Clear errors
  const clearErrors = () => {
    error.value = ''
    emailError.value = ''
    passwordError.value = ''
    successMessage.value = ''
  }

  // Real-time validation
  const validateEmailRealTime = () => {
    if (formData.value.email) {
      emailError.value = validateEmail(formData.value.email)
    } else {
      emailError.value = ''
    }
  }

  const validatePasswordRealTime = () => {
    if (formData.value.password) {
      passwordError.value = validatePassword(formData.value.password)
    } else {
      passwordError.value = ''
    }
  }

  // Handle form submission
  const handleLogin = async () => {
    clearErrors()

    // Validate form
    const emailValidation = validateEmail(formData.value.email)
    const passwordValidation = validatePassword(formData.value.password)

    if (emailValidation) {
      emailError.value = emailValidation
      return
    }

    if (passwordValidation) {
      passwordError.value = passwordValidation
      return
    }

    loading.value = true

    try {
      const response = await httpRequest.post('/auth/login', {
        email: formData.value.email,
        password: formData.value.password,
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
        if (formData.value.rememberMe) {
          localStorage.setItem('remember_me', 'true')
        } else {
          localStorage.removeItem('remember_me')
        }

        // Set auth data in store
        const userStore = useUserStore()
        userStore.setAuth(response.access_token, response.user)

        successMessage.value = 'Đăng nhập thành công! Đang chuyển hướng...'

        // Redirect to admin dashboard or home page
        setTimeout(() => {
          navigateTo('/admin')
        }, 1500)
      } else {
        error.value = 'Đăng nhập thành công nhưng không nhận được token'
      }
    } catch (err) {
      console.error('Login error:', err)

      // Handle different error scenarios
      if (err.status === 401) {
        error.value = 'Email hoặc mật khẩu không đúng'
      } else if (err.status === 422) {
        error.value = 'Dữ liệu không hợp lệ'
      } else if (err.status === 429) {
        error.value = 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau'
      } else if (err.status >= 500) {
        error.value = 'Lỗi server. Vui lòng thử lại sau'
      } else {
        error.value = err.message || 'Có lỗi xảy ra khi đăng nhập'
      }
    } finally {
      loading.value = false
    }
  }

  // Social login handlers
  const socialLogin = provider => {
    // Implement social login logic here
    console.log(`Social login with ${provider}`)
    error.value = `Tính năng đăng nhập bằng ${provider} đang được phát triển`
  }

  // Check if user is already logged in
  onMounted(() => {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      // User is already logged in, redirect to admin
      navigateTo('/admin')
    }
  })
</script>
