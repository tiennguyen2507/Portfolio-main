<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Hero Section -->
    <WeddingHero />

    <!-- About Section -->
    <WeddingAbout />

    <!-- Timeline Section -->
    <WeddingTimeline />

    <!-- Gallery Section -->
    <WeddingGallery />

    <!-- RSVP Section -->
    <WeddingRSVP />

    <!-- Location Section -->
    <WeddingLocation />

    <!-- Footer -->
    <footer class="bg-gray-900 border-t border-gray-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-lg mb-2">
          {{ weddingConfig.couple.groom.name }} &
          {{ weddingConfig.couple.bride.name }}
        </p>
        <p class="text-gray-400 mb-4">
          {{ formatDate(weddingConfig.weddingDate.ceremony.date) }}
        </p>
        <p class="text-gray-500 text-sm">Made with ❤️ for our special day</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import WeddingHero from './_components/WeddingHero.vue'
  import WeddingAbout from './_components/WeddingAbout.vue'
  import WeddingTimeline from './_components/WeddingTimeline.vue'
  import WeddingGallery from './_components/WeddingGallery.vue'
  import WeddingRSVP from './_components/WeddingRSVP.vue'
  import WeddingLocation from './_components/WeddingLocation.vue'
  import { weddingConfig } from './config.js'

  // Không sử dụng layout nào, trang tự quản lý
  definePageMeta({
    layout: false,
  })

  // Hàm format date - phải định nghĩa trước khi sử dụng
  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('vi-VN', options)
  }

  // SEO Meta Tags
  useHead({
    title: `${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name} - Wedding`,
    meta: [
      {
        name: 'description',
        content: `Đám cưới của ${weddingConfig.couple.groom.name} và ${weddingConfig.couple.bride.name} vào ngày ${formatDate(weddingConfig.weddingDate.ceremony.date)}`,
      },
    ],
  })
</script>

<style>
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ea580c;
  }
</style>
