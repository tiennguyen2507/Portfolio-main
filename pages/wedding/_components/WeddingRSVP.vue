<template>
  <section class="py-20 md:py-32 bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-4">
          Xác Nhận Tham Dự
        </h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 bg-gray-700"></div>
          <span class="text-2xl">💌</span>
          <div class="h-px w-16 bg-gray-700"></div>
        </div>
        <p class="text-gray-400 mt-6 max-w-2xl mx-auto">
          {{ config.contact.message }}
        </p>
      </div>

      <!-- RSVP Form -->
      <form
        @submit.prevent="handleSubmit"
        class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-xl"
      >
        <div class="space-y-6">
          <!-- Name -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Họ và Tên *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition placeholder-gray-500"
              placeholder="Nhập họ và tên của bạn"
            />
          </div>

          <!-- Message -->
          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Lời nhắn
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none placeholder-gray-500"
              placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {{ isSubmitting ? 'Đang gửi...' : 'Gửi Xác Nhận' }}
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="mt-6 p-4 bg-green-900/50 border border-green-700 text-green-300 rounded-lg text-center"
        >
          Cảm ơn bạn! Chúng tôi đã nhận được xác nhận của bạn. 💕
        </div>
      </form>

      <!-- Contact Info -->
      <div class="mt-12 text-center text-gray-400">
        <p class="mb-2">
          Liên hệ:
          <a
            :href="`tel:${config.contact.phone}`"
            class="hover:text-orange-500 transition-colors"
            >{{ config.contact.phone }}</a
          >
        </p>
        <p>
          Email:
          <a
            :href="`mailto:${config.contact.email}`"
            class="hover:text-orange-500 transition-colors"
            >{{ config.contact.email }}</a
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'
  import { weddingConfig } from '../config.js'

  const config = weddingConfig

  const form = ref({
    name: '',
    message: '',
  })

  const isSubmitting = ref(false)
  const showSuccess = ref(false)

  const handleSubmit = async () => {
    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Here you would typically send the data to your backend
    console.log('RSVP Form Data:', form.value)

    isSubmitting.value = false
    showSuccess.value = true

    // Reset form after 3 seconds
    setTimeout(() => {
      form.value = {
        name: '',
        message: '',
      }
      showSuccess.value = false
    }, 3000)
  }
</script>
