<template>
  <div class="text-center">
    <Typography as="h2" size="3xl" weight="extrabold" color="default" class="mt-2">
      Đăng ký tài khoản mới
    </Typography>
    <Typography as="p" size="sm" color="muted" class="mt-2">
      Hoặc
      <NuxtLink
        to="/auth/login"
        class="font-medium text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300"
      >
        đăng nhập vào tài khoản hiện có
      </NuxtLink>
    </Typography>
  </div>

  <!-- Register Form -->
  <form class="mt-2 space-y-6" @submit="handleRegister">
    <!-- Error Message -->
    <div
      v-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 rounded-lg"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-red-600 dark:text-red-400"
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
        <Typography as="span" size="sm" color="error">{{ error }}</Typography>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 rounded-lg"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-green-600 dark:text-green-400"
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
        <Typography as="span" size="sm" color="success">{{ successMessage }}</Typography>
      </div>
    </div>

    <div class="space-y-4">
      <!-- First Name Input -->
      <div>
        <Typography
          as="label"
          for="firstName"
          size="sm"
          weight="medium"
          color="default"
          class="block mb-2"
        >
          Họ
        </Typography>
        <Input
          id="firstName"
          v-model="firstName"
          v-bind="firstNameAttrs"
          type="text"
          placeholder="Nhập họ của bạn"
          required
          :variant="errors.firstName ? 'error' : 'default'"
          size="lg"
        />
        <Typography v-if="errors.firstName" as="p" size="sm" color="error" class="mt-1">
          {{ errors.firstName }}
        </Typography>
      </div>

      <!-- Last Name Input -->
      <div>
        <Typography
          as="label"
          for="lastName"
          size="sm"
          weight="medium"
          color="default"
          class="block mb-2"
        >
          Tên
        </Typography>
        <Input
          id="lastName"
          v-model="lastName"
          v-bind="lastNameAttrs"
          type="text"
          placeholder="Nhập tên của bạn"
          required
          :variant="errors.lastName ? 'error' : 'default'"
          size="lg"
        />
        <Typography v-if="errors.lastName" as="p" size="sm" color="error" class="mt-1">
          {{ errors.lastName }}
        </Typography>
      </div>

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

      <!-- Confirm Password Input -->
      <div>
        <Typography
          as="label"
          for="confirmPassword"
          size="sm"
          weight="medium"
          color="default"
          class="block mb-2"
        >
          Xác nhận mật khẩu
        </Typography>
        <Input
          id="confirmPassword"
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          type="password"
          placeholder="Nhập lại mật khẩu"
          required
          :variant="errors.confirmPassword ? 'error' : 'default'"
          size="lg"
        />
        <Typography v-if="errors.confirmPassword" as="p" size="sm" color="error" class="mt-1">
          {{ errors.confirmPassword }}
        </Typography>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="flex items-center">
      <input
        id="agree-terms"
        v-model="agreeTerms"
        type="checkbox"
        class="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
      />
      <Typography v-if="errors.agreeTerms" as="p" size="sm" color="error" class="mt-1">
        {{ errors.agreeTerms }}
      </Typography>
      <Typography as="label" for="agree-terms" size="sm" color="default" class="ml-2 block">
        Tôi đồng ý với
        <NuxtLink
          to="/terms"
          class="font-medium text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300"
        >
          Điều khoản sử dụng
        </NuxtLink>
        và
        <NuxtLink
          to="/privacy"
          class="font-medium text-orange-500 dark:text-orange-400 hover:text-orange-400 dark:hover:text-orange-300"
        >
          Chính sách bảo mật
        </NuxtLink>
      </Typography>
    </div>

    <!-- Submit Button -->
    <div>
      <Button
        type="submit"
        :disabled="loading || !agreeTerms"
        :loading="loading"
        fullWidth
        size="lg"
        variant="primary"
        class="w-full"
      >
        Đăng ký
      </Button>
    </div>
  </form>
</template>

<script setup>
  import { httpRequest } from '~/utils/httpRequest'
  import Input from '~/components/ui/Input/Input.vue'
  import Button from '~/components/ui/Button.vue'
  import Typography from '~/components/ui/Typography.vue'
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
