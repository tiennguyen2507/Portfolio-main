<template>
  <div
    class="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Logo/Brand -->
      <div class="text-center">
        <img class="mx-auto h-16 w-auto" src="/images/logo.webp" alt="Logo" />
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          Đăng ký tài khoản mới
        </h2>
        <p class="mt-2 text-sm text-gray-400">
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
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <!-- Error Message -->
        <div
          v-if="error"
          class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2"
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
          class="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2"
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
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Họ
            </label>
            <Input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              placeholder="Nhập họ của bạn"
              required
              :variant="firstNameError ? 'error' : 'default'"
              size="lg"
              @blur="validateFirstNameRealTime"
              @input="validateFirstNameRealTime"
            />
            <p v-if="firstNameError" class="mt-1 text-sm text-red-400">
              {{ firstNameError }}
            </p>
          </div>

          <!-- Last Name Input -->
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Tên
            </label>
            <Input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              placeholder="Nhập tên của bạn"
              required
              :variant="lastNameError ? 'error' : 'default'"
              size="lg"
              @blur="validateLastNameRealTime"
              @input="validateLastNameRealTime"
            />
            <p v-if="lastNameError" class="mt-1 text-sm text-red-400">
              {{ lastNameError }}
            </p>
          </div>

          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Nhập email của bạn"
              required
              :variant="emailError ? 'error' : 'default'"
              size="lg"
              @blur="validateEmailRealTime"
              @input="validateEmailRealTime"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-400">
              {{ emailError }}
            </p>
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Mật khẩu
            </label>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              required
              :variant="passwordError ? 'error' : 'default'"
              size="lg"
              @blur="validatePasswordRealTime"
              @input="validatePasswordRealTime"
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-400">
              {{ passwordError }}
            </p>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Xác nhận mật khẩu
            </label>
            <Input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
              :variant="confirmPasswordError ? 'error' : 'default'"
              size="lg"
              @blur="validateConfirmPasswordRealTime"
              @input="validateConfirmPasswordRealTime"
            />
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-400">
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
            class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded bg-gray-800"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-300">
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
          <Button
            type="submit"
            :disabled="loading || !formData.agreeTerms"
            :loading="loading"
            full-width
            size="lg"
          >
            <span v-if="!loading">Đăng ký</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Đang đăng ký...
            </span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { httpRequest } from "~/utils/httpRequest";

definePageMeta({
  layout: "default",
});

// Reactive data
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const loading = ref(false);
const error = ref("");
const successMessage = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");

// Validation functions
const validateFirstName = (firstName) => {
  if (!firstName) {
    return "Họ là bắt buộc";
  }
  if (firstName.length < 2) {
    return "Họ phải có ít nhất 2 ký tự";
  }
  if (firstName.length > 50) {
    return "Họ không được quá 50 ký tự";
  }
  return "";
};

const validateLastName = (lastName) => {
  if (!lastName) {
    return "Tên là bắt buộc";
  }
  if (lastName.length < 2) {
    return "Tên phải có ít nhất 2 ký tự";
  }
  if (lastName.length > 50) {
    return "Tên không được quá 50 ký tự";
  }
  return "";
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email là bắt buộc";
  }
  if (!emailRegex.test(email)) {
    return "Email không hợp lệ";
  }
  return "";
};

const validatePassword = (password) => {
  if (!password) {
    return "Mật khẩu là bắt buộc";
  }
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  }
  // Check for at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordRegex.test(password)) {
    return "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
  }
  return "";
};

const validateConfirmPassword = (confirmPassword) => {
  if (!confirmPassword) {
    return "Xác nhận mật khẩu là bắt buộc";
  }
  if (confirmPassword !== formData.value.password) {
    return "Mật khẩu xác nhận không khớp";
  }
  return "";
};

// Clear errors
const clearErrors = () => {
  error.value = "";
  firstNameError.value = "";
  lastNameError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";
  successMessage.value = "";
};

// Real-time validation
const validateFirstNameRealTime = () => {
  if (formData.value.firstName) {
    firstNameError.value = validateFirstName(formData.value.firstName);
  } else {
    firstNameError.value = "";
  }
};

const validateLastNameRealTime = () => {
  if (formData.value.lastName) {
    lastNameError.value = validateLastName(formData.value.lastName);
  } else {
    lastNameError.value = "";
  }
};

const validateEmailRealTime = () => {
  if (formData.value.email) {
    emailError.value = validateEmail(formData.value.email);
  } else {
    emailError.value = "";
  }
};

const validatePasswordRealTime = () => {
  if (formData.value.password) {
    passwordError.value = validatePassword(formData.value.password);
  } else {
    passwordError.value = "";
  }
  // Also validate confirm password when password changes
  if (formData.value.confirmPassword) {
    confirmPasswordError.value = validateConfirmPassword(
      formData.value.confirmPassword
    );
  }
};

const validateConfirmPasswordRealTime = () => {
  if (formData.value.confirmPassword) {
    confirmPasswordError.value = validateConfirmPassword(
      formData.value.confirmPassword
    );
  } else {
    confirmPasswordError.value = "";
  }
};

// Handle form submission
const handleRegister = async () => {
  clearErrors();

  // Validate form
  const firstNameValidation = validateFirstName(formData.value.firstName);
  const lastNameValidation = validateLastName(formData.value.lastName);
  const emailValidation = validateEmail(formData.value.email);
  const passwordValidation = validatePassword(formData.value.password);
  const confirmPasswordValidation = validateConfirmPassword(
    formData.value.confirmPassword
  );

  if (firstNameValidation) {
    firstNameError.value = firstNameValidation;
    return;
  }

  if (lastNameValidation) {
    lastNameError.value = lastNameValidation;
    return;
  }

  if (emailValidation) {
    emailError.value = emailValidation;
    return;
  }

  if (passwordValidation) {
    passwordError.value = passwordValidation;
    return;
  }

  if (confirmPasswordValidation) {
    confirmPasswordError.value = confirmPasswordValidation;
    return;
  }

  if (!formData.value.agreeTerms) {
    error.value = "Bạn phải đồng ý với điều khoản sử dụng";
    return;
  }

  loading.value = true;

  try {
    const response = await httpRequest.post("/auth/register", {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
    });

    // Handle successful registration
    successMessage.value =
      "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...";

    // Clear form
    formData.value = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    };

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigateTo("/auth/login");
    }, 2000);
  } catch (err) {
    console.error("Registration error:", err);

    // Handle different error scenarios
    if (err.status === 409) {
      error.value = "Email đã tồn tại trong hệ thống";
    } else if (err.status === 422) {
      error.value = "Dữ liệu không hợp lệ";
    } else if (err.status === 429) {
      error.value = "Quá nhiều lần thử đăng ký. Vui lòng thử lại sau";
    } else if (err.status >= 500) {
      error.value = "Lỗi server. Vui lòng thử lại sau";
    } else {
      error.value = err.message || "Có lỗi xảy ra khi đăng ký";
    }
  } finally {
    loading.value = false;
  }
};

// Check if user is already logged in
onMounted(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
    // User is already logged in, redirect to admin
    navigateTo("/admin");
  }
});
</script>
