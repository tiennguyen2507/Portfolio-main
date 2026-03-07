<template>
  <div class="wedding-page relative min-h-[100dvh] bg-[#0A202F] overflow-x-hidden">
    <main class="w-full min-h-[100dvh] py-0 px-0">
      <div
        class="wedding-card relative w-full min-h-[100dvh] overflow-hidden text-[#e9ce9e] flex flex-col"
      >
          <!-- Phần chìm: absolute trong card, scroll theo trang (không fixed) -->
          <div class="absolute inset-0 z-0 pointer-events-none">
            <WeddingBackground />
          </div>
          <!-- Nội dung -->
          <div class="relative z-10 flex flex-col gap-10 sm:gap-14 md:gap-20 lg:gap-24">
            <WeddingHero />
            <WeddingGallery />
            <WeddingAbout />
            <WeddingTimeline />
            <WeddingLocation />
            <WeddingRSVP />
          </div>

          <!-- Footer (SP: padding nhỏ hơn, chữ vừa đọc) -->
          <footer
            class="relative mt-10 sm:mt-12 md:mt-16 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 pb-8 sm:pb-10 text-center font-baskerville text-[#d9bc86]"
          >
            <p class="text-xs sm:text-sm md:text-lg whitespace-pre-line max-w-[95vw]">
              Gia đình xin chân thành cảm ơn quý khách đã đến chung vui.
            </p>
            <p class="text-[11px] sm:text-xs opacity-70 break-words max-w-[95vw]">
              {{ weddingConfig.couple.groom.name }} &
              {{ weddingConfig.couple.bride.name }}
            </p>
            <p class="text-xs sm:text-sm opacity-80">
              {{ formatDate(weddingConfig.weddingDate.ceremony.date) }}
            </p>
          </footer>
        </div>
    </main>
  </div>
</template>

<script setup>
  import WeddingHero from './_components/WeddingHero.vue'
  import WeddingAbout from './_components/WeddingAbout.vue'
  import WeddingTimeline from './_components/WeddingTimeline.vue'
  import WeddingGallery from './_components/WeddingGallery.vue'
  import WeddingRSVP from './_components/WeddingRSVP.vue'
  import WeddingLocation from './_components/WeddingLocation.vue'
  import WeddingBackground from './_components/WeddingBackground.vue'
  import { weddingConfig } from './config.js'
  import { useSeoWedding } from './useSeoWedding.tsx'

  definePageMeta({
    layout: false,
  })

  // Font chính dùng Times New Roman (system) – tiếng Việt không lỗi. Pattaya chỉ khi cần.
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Pattaya&display=swap',
      },
    ],
  })

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  useSeoWedding(weddingConfig)
</script>

<style lang="scss">
  @import '~/assets/scss/_wedding-fonts';

  /* Scrollbar trang wedding: màu giống chữ (#e9ce9e) */
  .wedding-page {
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #0a1628;
    }
    ::-webkit-scrollbar-thumb {
      background: #e9ce9e;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #d9bc86;
    }
  }

  html {
    scroll-behavior: smooth;
  }

  /* Safe area cho SP có notch (iPhone, v.v.) */
  .safe-area-padding {
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  }
</style>
