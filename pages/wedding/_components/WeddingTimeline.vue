<template>
  <section class="relative flex flex-col gap-10 sm:gap-14 md:gap-18 px-4 sm:px-5 md:px-6 pb-10 sm:pb-12 md:pb-16">
    <!-- Lễ thành hôn (SP: dòng ngày gọn, wrap nếu cần) -->
    <div
      class="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 text-center font-baskerville"
    >
      <div class="flex flex-col items-center gap-1.5 sm:gap-2 text-[#e9ce9e] px-1">
        <span class="tracking-[0.05em] whitespace-pre-line text-[13px] sm:text-[15px] md:text-[17px]">
          LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI<br />{{ ceremonyVenue }}
        </span>
        <p class="text-sm sm:text-base md:text-lg mb-1 sm:mb-2 uppercase">VÀO LÚC</p>
      </div>
      <div class="text-[18px] sm:text-[20px] md:text-[30px] text-[#e9ce9e] font-baskerville">
        {{ config.weddingDate.ceremony.time }}
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 text-[#e9ce9e]">
        <span class="text-[13px] sm:text-[14px] md:text-[17px] font-baskerville">
          {{ weekdayCeremony }}
        </span>
        <span class="h-5 sm:h-6 md:h-8 w-[2px] bg-[#e9ce9e]/60 shrink-0" aria-hidden="true" />
        <span class="text-[24px] sm:text-[30px] md:text-[40px] font-baskerville">
          {{ dayCeremony }}
        </span>
        <span class="h-5 sm:h-6 md:h-8 w-[2px] bg-[#e9ce9e]/60 shrink-0" aria-hidden="true" />
        <span class="text-[13px] sm:text-[14px] md:text-[17px] font-baskerville">
          {{ monthYearCeremony }}
        </span>
      </div>
      <div class="text-[18px] sm:text-[20px] md:text-[24px] text-[#e9ce9e] font-baskerville">
        {{ yearCeremony }}
      </div>
    </div>

    <!-- Tiệc cưới -->
    <div
      class="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 text-center font-baskerville"
    >
      <h3
        class="uppercase text-[18px] sm:text-[20px] md:text-[26px] text-[#e9ce9e] font-baskerville tracking-[0.05em] px-2"
      >
        Tiệc cưới sẽ diễn ra vào lúc:
      </h3>
      <div class="text-[18px] sm:text-[20px] md:text-[30px] text-[#e9ce9e] font-baskerville">
        {{ config.weddingDate.reception.time }}
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 text-[#e9ce9e]">
        <span class="text-[13px] sm:text-[14px] md:text-[17px] font-baskerville">
          {{ weekdayReception }}
        </span>
        <span class="h-5 sm:h-6 md:h-8 w-[2px] bg-[#e9ce9e]/60 shrink-0" aria-hidden="true" />
        <span class="text-[24px] sm:text-[30px] md:text-[40px] font-baskerville">
          {{ dayReception }}
        </span>
        <span class="h-5 sm:h-6 md:h-8 w-[2px] bg-[#e9ce9e]/60 shrink-0" aria-hidden="true" />
        <span class="text-[13px] sm:text-[14px] md:text-[17px] font-baskerville">
          {{ monthYearReception }}
        </span>
      </div>
      <div class="text-[18px] sm:text-[20px] md:text-[24px] text-[#e9ce9e] font-baskerville">
        {{ yearReception }}
      </div>
      <p class="text-[13px] sm:text-[14px] md:text-[17px] uppercase tracking-wider text-[#d9bc86] font-baskerville">
        Khai tiệc {{ config.weddingDate.reception.time }}
      </p>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue'
  import { weddingConfig } from '../config.js'

  const config = weddingConfig

  const ceremonyVenue = computed(
    () => config.weddingDate.ceremony.location || 'TƯ GIA'
  )

  const formatParts = (dateString, locale = 'vi-VN') => {
    const d = new Date(dateString)
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    return {
      weekday: d.toLocaleDateString(locale, { weekday: 'long' }).toUpperCase(),
      day: d.getDate().toString(),
      month,
      year: d.getFullYear().toString(),
    }
  }

  const ceremonyParts = computed(() =>
    formatParts(config.weddingDate.ceremony.date)
  )
  const receptionParts = computed(() =>
    formatParts(config.weddingDate.reception.date)
  )

  const weekdayCeremony = computed(() => ceremonyParts.value.weekday)
  const dayCeremony = computed(() => ceremonyParts.value.day)
  const monthYearCeremony = computed(
    () => `THÁNG ${ceremonyParts.value.month}`
  )
  const yearCeremony = computed(() => ceremonyParts.value.year)

  const weekdayReception = computed(() => receptionParts.value.weekday)
  const dayReception = computed(() => receptionParts.value.day)
  const monthYearReception = computed(
    () => `THÁNG ${receptionParts.value.month}`
  )
  const yearReception = computed(() => receptionParts.value.year)
</script>
