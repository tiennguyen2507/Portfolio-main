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
  <form class="mt-2 space-y-6" @submit="handleRegister">
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
          v-model="firstName"
          v-bind="firstNameAttrs"
          type="text"
          placeholder="Nhập họ của bạn"
          required
          :variant="errors.firstName ? 'danger' : 'primary'"
          size="lg"
        />
        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
          {{ errors.firstName }}
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
          v-model="lastName"
          v-bind="lastNameAttrs"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          :variant="errors.lastName ? 'danger' : 'primary'"
          size="lg"
        />
        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
          {{ errors.lastName }}
        </p>
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <AdminUiInput
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="Nhập email của bạn"
          required
          :variant="errors.email ? 'danger' : 'primary'"
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
        <AdminUiInput
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          required
          :variant="errors.password ? 'danger' : 'primary'"
          size="lg"
        />
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">
          {{ errors.password }}
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
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          type="password"
          placeholder="Nhập lại mật khẩu"
          required
          :variant="errors.confirmPassword ? 'danger' : 'primary'"
          size="lg"
        />
        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
          {{ errors.confirmPassword }}
        </p>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="flex items-center">
      <input
        id="agree-terms"
        v-model="agreeTerms"
        type="checkbox"
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
      />
      <p v-if="errors.agreeTerms" class="mt-1 text-sm text-red-600">
        {{ errors.agreeTerms }}
      </p>
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
        :disabled="loading || !agreeTerms"
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
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { registerSchema } from '~/utils/validations/registerSchema'

  definePageMeta({
    layout: 'auth',
  })

  // Sử dụng vee-validate với Zod schema
  const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(registerSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  })

  // Define fields với vee-validate
  const [firstName, firstNameAttrs] = defineField('firstName')
  const [lastName, lastNameAttrs] = defineField('lastName')
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')
  const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
  const [agreeTerms] = defineField('agreeTerms', {
    type: 'checkbox',
  })

  const loading = ref(false)
  const error = ref('')
  const successMessage = ref('')

  // Clear errors
  const clearErrors = () => {
    error.value = ''
    successMessage.value = ''
  }

  // Handle form submission với vee-validate
  const handleRegister = handleSubmit(async values => {
    clearErrors()
    loading.value = true

    try {
      const response = await httpRequest.post('/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })

      // Handle successful registration
      successMessage.value =
        'Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...'

      // Clear form
      resetForm()

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
  })

  // Check if user is already logged in
  onMounted(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      // User is already logged in, redirect to admin
      navigateTo('/admin')
    }
  })
</script>
