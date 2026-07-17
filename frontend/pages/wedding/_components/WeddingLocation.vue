<template>
  <section
    class="relative flex flex-col gap-5 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 pb-10 sm:pb-12 md:pb-16"
  >
    <div class="text-center px-1">
      <h3
        class="uppercase font-normal text-[16px] sm:text-[20px] md:text-[26px] text-[#e9ce9e] font-baskerville tracking-[0.05em]"
      >
        Tiệc cưới sẽ tổ chức tại
      </h3>
      <div
        class="mx-auto mt-3 sm:mt-4 max-w-[95vw] sm:max-w-sm md:max-w-[600px] rounded-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 whitespace-pre-line text-xs sm:text-sm md:text-base font-baskerville text-[#553f18] bg-[#e9ce9e] break-words"
      >
        {{ config.weddingDate.reception.address }}
      </div>
      <p class="mt-2 text-xs sm:text-sm text-[#d9bc86] font-baskerville">
        {{ config.weddingDate.reception.location }}
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full">
      <h4
        class="uppercase font-normal text-[16px] sm:text-[20px] md:text-[26px] text-center text-[#e9ce9e] font-baskerville tracking-[0.05em]"
      >
        BẢN ĐỒ
      </h4>
      <a
        :href="config.weddingDate.reception.mapUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center min-h-[44px] rounded-full bg-[#e9ce9e] px-5 py-2.5 sm:px-6 sm:py-2 text-sm font-semibold text-[#553f18] transition-transform hover:scale-[1.03] active:scale-[0.98] font-baskerville"
      >
        Xem trên Google Maps →
      </a>
    </div>
  </section>
</template>

<script setup>
  import { weddingConfig } from '../config.js'

  const config = weddingConfig
</script>
