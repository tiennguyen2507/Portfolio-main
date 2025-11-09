<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image với overlay -->
    <div class="absolute inset-0 z-0">
      <img
        :src="config.heroImage"
        alt="Wedding Hero"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center text-white px-4 py-20">
      <div class="max-w-4xl mx-auto">
        <!-- Tên chú rể cô dâu -->
        <h1
          class="text-5xl md:text-7xl font-light tracking-wide mb-4 animate-fade-in"
        >
          {{ config.couple.groom.name }}
        </h1>
        <div class="flex items-center justify-center gap-4 my-6">
          <div class="h-px w-20 bg-white/50"></div>
          <span class="text-3xl md:text-5xl">💕</span>
          <div class="h-px w-20 bg-white/50"></div>
        </div>
        <h1
          class="text-5xl md:text-7xl font-light tracking-wide mb-8 animate-fade-in"
        >
          {{ config.couple.bride.name }}
        </h1>

        <!-- Ngày cưới -->
        <p class="text-xl md:text-2xl font-light mb-2 opacity-90">
          {{ formatDate(config.weddingDate.ceremony.date) }}
        </p>
        <p class="text-lg md:text-xl font-light opacity-80">
          Chúng tôi kết hôn
        </p>

        <!-- Countdown Timer -->
        <div class="mt-12">
          <WeddingCountdown :target-date="getTargetDateTime()" />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
  import { weddingConfig } from '../config.js'
  import WeddingCountdown from './WeddingCountdown.vue'

  const config = weddingConfig

  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('vi-VN', options)
  }

  // Tạo datetime string đầy đủ cho countdown (ngày + giờ)
  const getTargetDateTime = () => {
    const date = config.weddingDate.ceremony.date
    const time = config.weddingDate.ceremony.time
    // Format: YYYY-MM-DDTHH:MM:SS
    return `${date}T${time}:00`
  }
</script>

<style scoped>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
</style>
