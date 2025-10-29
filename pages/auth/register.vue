<template>
  <div class="text-center">
    <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
      Đăng ký tài khoản mới
    </h2>
    <p class="mt-2 text-sm text-gray-600">
      Hoặc
      <NuxtLink
        to="/auth/login"
        class="font-medium text-orange-500 hover:text-orange-400"
      >
        đăng nhập vào tài khoản hiện có
      </NuxtLink>
    </p>
  </div>

  <!-- Register Form -->
  <form class="mt-2 space-y-6" @submit.prevent="handleRegister">
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
      <!-- First Name Input -->
      <div>
        <label
          for="firstName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Họ
        </label>
        <AdminUiInput
          id="firstName"
          v-model="formData.firstName"
          type="text"
          placeholder="Nhập họ của bạn"
          required
          :variant="firstNameError ? 'danger' : 'primary'"
          size="lg"
          @blur="validateFirstNameRealTime"
          @input="validateFirstNameRealTime"
        />
        <p v-if="firstNameError" class="mt-1 text-sm text-red-600">
          {{ firstNameError }}
        </p>
      </div>

      <!-- Last Name Input -->
      <div>
        <label
          for="lastName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Tên
        </label>
        <AdminUiInput
          id="lastName"
          v-model="formData.lastName"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          :variant="lastNameError ? 'danger' : 'primary'"
          size="lg"
          @blur="validateLastNameRealTime"
          @input="validateLastNameRealTime"
        />
        <p v-if="lastNameError" class="mt-1 text-sm text-red-600">
          {{ lastNameError }}
        </p>
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
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

      <!-- Confirm Password Input -->
      <div>
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Xác nhận mật khẩu
        </label>
        <AdminUiInput
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          required
          :variant="confirmPasswordError ? 'danger' : 'primary'"
          size="lg"
          @blur="validateConfirmPasswordRealTime"
          @input="validateConfirmPasswordRealTime"
        />
        <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">
          {{ confirmPasswordError }}
        </p>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="flex items-center">
      <input
        id="agree-terms"
        v-model="formData.agreeTerms"
        type="checkbox"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
      />
      <label for="agree-terms" class="ml-2 block text-sm text-gray-700">
        Tôi đồng ý với
        <NuxtLink
          to="/terms"
          class="font-medium text-orange-500 hover:text-orange-400"
        >
          Điều khoản sử dụng
        </NuxtLink>
        và
        <NuxtLink
          to="/privacy"
          class="font-medium text-orange-500 hover:text-orange-400"
        >
          Chính sách bảo mật
        </NuxtLink>
      </label>
    </div>

    <!-- Submit Button -->
    <div>
      <AdminUiButton
        type="submit"
        :disabled="loading || !formData.agreeTerms"
        :loading="loading"
        full-width
        size="lg"
        variant="primary"
      >
        Đăng ký
      </AdminUiButton>
    </div>
  </form>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import AdminUiInput from '~/components/admin/ui/AdminUiInput.vue'
  import AdminUiButton from '~/components/admin/ui/AdminUiButton.vue'

  definePageMeta({
    layout: 'auth',
  })

  // Reactive data
  const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const loading = ref(false)
  const error = ref('')
  const successMessage = ref('')
  const firstNameError = ref('')
  const lastNameError = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const confirmPasswordError = ref('')

  // Validation functions
  const validateFirstName = firstName => {
    if (!firstName) {
      return 'Họ là bắt buộc'
    }
    if (firstName.length < 2) {
      return 'Họ phải có ít nhất 2 ký tự'
    }
    if (firstName.length > 50) {
      return 'Họ không được quá 50 ký tự'
    }
    return ''
  }

  const validateLastName = lastName => {
    if (!lastName) {
      return 'Tên là bắt buộc'
    }
    if (lastName.length < 2) {
      return 'Tên phải có ít nhất 2 ký tự'
    }
    if (lastName.length > 50) {
      return 'Tên không được quá 50 ký tự'
    }
    return ''
  }

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
    // Check for at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
    if (!passwordRegex.test(password)) {
      return 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    }
    return ''
  }

  const validateConfirmPassword = confirmPassword => {
    if (!confirmPassword) {
      return 'Xác nhận mật khẩu là bắt buộc'
    }
    if (confirmPassword !== formData.value.password) {
      return 'Mật khẩu xác nhận không khớp'
    }
    return ''
  }

  // Clear errors
  const clearErrors = () => {
    error.value = ''
    firstNameError.value = ''
    lastNameError.value = ''
    emailError.value = ''
    passwordError.value = ''
    confirmPasswordError.value = ''
    successMessage.value = ''
  }

  // Real-time validation
  const validateFirstNameRealTime = () => {
    if (formData.value.firstName) {
      firstNameError.value = validateFirstName(formData.value.firstName)
    } else {
      firstNameError.value = ''
    }
  }

  const validateLastNameRealTime = () => {
    if (formData.value.lastName) {
      lastNameError.value = validateLastName(formData.value.lastName)
    } else {
      lastNameError.value = ''
    }
  }

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
    // Also validate confirm password when password changes
    if (formData.value.confirmPassword) {
      confirmPasswordError.value = validateConfirmPassword(
        formData.value.confirmPassword
      )
    }
  }

  const validateConfirmPasswordRealTime = () => {
    if (formData.value.confirmPassword) {
      confirmPasswordError.value = validateConfirmPassword(
        formData.value.confirmPassword
      )
    } else {
      confirmPasswordError.value = ''
    }
  }

  // Handle form submission
  const handleRegister = async () => {
    clearErrors()

    // Validate form
    const firstNameValidation = validateFirstName(formData.value.firstName)
    const lastNameValidation = validateLastName(formData.value.lastName)
    const emailValidation = validateEmail(formData.value.email)
    const passwordValidation = validatePassword(formData.value.password)
    const confirmPasswordValidation = validateConfirmPassword(
      formData.value.confirmPassword
    )

    if (firstNameValidation) {
      firstNameError.value = firstNameValidation
      return
    }

    if (lastNameValidation) {
      lastNameError.value = lastNameValidation
      return
    }

    if (emailValidation) {
      emailError.value = emailValidation
      return
    }

    if (passwordValidation) {
      passwordError.value = passwordValidation
      return
    }

    if (confirmPasswordValidation) {
      confirmPasswordError.value = confirmPasswordValidation
      return
    }

    if (!formData.value.agreeTerms) {
      error.value = 'Bạn phải đồng ý với điều khoản sử dụng'
      return
    }

    loading.value = true

    try {
      const response = await httpRequest.post('/auth/register', {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        email: formData.value.email,
        password: formData.value.password,
      })

      // Handle successful registration
      successMessage.value =
        'Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...'

      // Clear form
      formData.value = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      }

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigateTo('/auth/login')
      }, 2000)
    } catch (err) {
      console.error('Registration error:', err)

      // Handle different error scenarios
      if (err.status === 409) {
        error.value = 'Email đã tồn tại trong hệ thống'
      } else if (err.status === 422) {
        error.value = 'Dữ liệu không hợp lệ'
      } else if (err.status === 429) {
        error.value = 'Quá nhiều lần thử đăng ký. Vui lòng thử lại sau'
      } else if (err.status >= 500) {
        error.value = 'Lỗi server. Vui lòng thử lại sau'
      } else {
        error.value = err.message || 'Có lỗi xảy ra khi đăng ký'
      }
    } finally {
      loading.value = false
    }
  }

  // Check if user is already logged in
  onMounted(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // User is already logged in, redirect to admin
      navigateTo('/admin')
    }
  })
</script>
