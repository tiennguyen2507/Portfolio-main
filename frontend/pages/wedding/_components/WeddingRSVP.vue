<template>
  <section
    class="px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 pb-6 sm:pb-8 bg-[#0A202F] text-[#e9ce9e] font-baskerville"
  >
    <div class="text-center">
      <h2
        class="uppercase font-normal text-[20px] sm:text-[22px] md:text-[26px] text-center text-[#e9ce9e] font-baskerville tracking-[0.05em]"
      >
        Sổ lưu bút
      </h2>
    </div>

    <form
      class="mt-4 sm:mt-6 mx-auto max-w-full md:max-w-[600px]"
      @submit.prevent="handleSubmit"
    >
      <div
        class="rounded-xl sm:rounded-2xl border border-[#e9ce9e]/40 bg-white/10 p-4 sm:p-6 shadow-lg backdrop-blur-sm"
      >
        <div class="mb-3 sm:mb-4">
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Nhập tên của bạn*"
            class="w-full rounded-lg border px-4 py-3 text-[16px] sm:text-[15px] focus:outline-none bg-[#e9ce9e]/10 border-[#e9ce9e] text-[#e9ce9e] placeholder-[#e9ce9e]/60 min-h-[44px]"
          />
        </div>
        <textarea
          v-model="form.message"
          rows="4"
          required
          placeholder="Nhập lời chúc của bạn*"
          class="w-full resize-none rounded-lg border px-4 py-3 text-[16px] sm:text-[15px] focus:outline-none bg-[#e9ce9e]/10 border-[#e9ce9e] text-[#e9ce9e] placeholder-[#e9ce9e]/60 min-h-[120px]"
        />
        <div class="mt-4 flex items-center justify-end">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="rounded-full min-h-[44px] px-5 py-2.5 sm:px-4 sm:py-2 text-[14px] sm:text-[15px] font-semibold transition-transform hover:scale-105 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed bg-[#e9ce9e] text-[#553f18] font-baskerville"
          >
            {{ isSubmitting ? 'ĐANG GỬI...' : 'GỬI LỜI CHÚC' }}
          </button>
        </div>
      </div>
    </form>

    <div
      v-if="showSuccess"
      class="mt-4 mx-auto max-w-[600px] p-3 sm:p-4 rounded-xl border border-[#e9ce9e]/40 bg-white/10 text-[#e9ce9e] text-center text-[14px] sm:text-[15px]"
    >
      Cảm ơn bạn! Lời chúc đã được lưu.
    </div>

    <p
      class="mt-4 sm:mt-6 text-center text-[13px] sm:text-[14px] text-[#d9bc86]/80 max-w-xl mx-auto px-1"
    >
      {{ config.contact.message }}
    </p>
    <div
      class="mt-3 sm:mt-4 text-center text-[13px] sm:text-[14px] text-[#d9bc86]/60 break-all"
    >
      Liên hệ:
      <a
        :href="`tel:${config.contact.phone}`"
        class="underline hover:opacity-90"
        >{{ config.contact.phone }}</a
      >
      ·
      <a
        :href="`mailto:${config.contact.email}`"
        class="underline hover:opacity-90"
        >{{ config.contact.email }}</a
      >
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'
  import { weddingConfig } from '../config.js'

  const config = weddingConfig

  const form = ref({ name: '', message: '' })
  const isSubmitting = ref(false)
  const showSuccess = ref(false)

  const handleSubmit = async () => {
    isSubmitting.value = true
    await new Promise(r => setTimeout(r, 1000))
    console.log('RSVP:', form.value)
    isSubmitting.value = false
    showSuccess.value = true
    form.value = { name: '', message: '' }
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }
</script>
