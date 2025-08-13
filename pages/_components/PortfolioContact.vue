<template>
  <!-- Contact Section -->
  <section id="contact" class="py-12 sm:py-16 md:py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ contactData.title }}
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          {{ contactData.description }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
        <!-- Contact Information -->
        <div class="space-y-6 sm:space-y-8">
          <div
            v-for="contact in contactData.contacts"
            :key="contact.label"
            class="flex items-center space-x-4"
          >
            <div
              class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="contact.icon"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">
                {{ contact.label }}
              </h3>
              <p class="text-gray-400">{{ contact.value }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-800/50 p-4 sm:p-6 md:p-8 rounded-lg">
          <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
            <Input
              v-model="form.name"
              type="text"
              placeholder="Your Name"
              size="lg"
              required
              :disabled="isSubmitting"
            />
            <Input
              v-model="form.email"
              type="email"
              placeholder="Your Email"
              size="lg"
              required
              :disabled="isSubmitting"
            />
            <Textarea
              v-model="form.message"
              placeholder="Your Message"
              :rows="4"
              size="lg"
              required
              :disabled="isSubmitting"
            />

            <!-- Notification above button -->
            <div v-if="notification.show" class="mb-2">
              <div
                :class="[
                  'p-3 rounded-lg text-center font-medium text-sm',
                  notification.type === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30',
                ]"
              >
                {{ notification.message }}
              </div>
            </div>

            <Button
              @click="handleSubmit"
              variant="primary"
              size="lg"
              fullWidth
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { portfolioContactData } from '~/constants/PortfolioContactData'
  import Button from '~/components/ui/Button.vue'
  import Input from '~/components/ui/Input.vue'
  import Textarea from '~/components/ui/Textarea.vue'
  import { httpRequest } from '~/utils/httpRequest'

  // Contact data
  const contactData = portfolioContactData

  // Form data
  const form = ref({
    name: '',
    email: '',
    message: '',
  })

  // Form state
  const isSubmitting = ref(false)

  // Notification state
  const notification = ref({
    show: false,
    type: 'success', // 'success' or 'error'
    message: '',
  })

  // Emit event for parent component
  const emit = defineEmits(['submit'])

  // Check if user can submit (rate limiting)
  const canSubmit = () => {
    if (process.client) {
      const lastSubmission = localStorage.getItem('lastContactSubmission')
      if (lastSubmission) {
        const timeDiff = Date.now() - parseInt(lastSubmission)
        const twoMinutes = 2 * 60 * 1000 // 2 minutes in milliseconds
        return timeDiff >= twoMinutes
      }
    }
    return true
  }

  // Show notification
  const showNotification = (type, message) => {
    notification.value = {
      show: true,
      type,
      message,
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
      notification.value.show = false
    }, 5000)
  }

  // Handle form submission
  const handleSubmit = async () => {
    // Check rate limiting
    if (!canSubmit()) {
      showNotification('error', 'Bạn vừa mới liên hệ tôi rồi mà')
      return
    }

    // Validate form
    if (!form.value.name || !form.value.email || !form.value.message) {
      showNotification('error', 'Vui lòng điền đầy đủ thông tin')
      return
    }

    // Validate Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    if (!emailRegex.test(form.value.email)) {
      showNotification('error', 'Vui lòng sử dụng địa chỉ Gmail')
      return
    }

    isSubmitting.value = true

    try {
      await httpRequest.post('/contact', {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      })

      // Success
      showNotification('success', 'Tin nhắn đã được gửi thành công!')

      // Save to localStorage for rate limiting
      if (process.client) {
        localStorage.setItem('lastContactSubmission', Date.now().toString())
      }

      // Reset form
      form.value = {
        name: '',
        email: '',
        message: '',
      }

      // Emit event for parent component
      emit('submit', { ...form.value })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      showNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      isSubmitting.value = false
    }
  }
</script>
