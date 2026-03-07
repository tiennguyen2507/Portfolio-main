<template>
  <section
    class="relative flex flex-col gap-16 md:gap-20 px-3 md:px-6 pb-24 md:pb-32"
  >
    <!-- Ông Bà - hai bên (SP: chữ nhỏ, cho phép xuống dòng) -->
    <div
      class="grid grid-cols-2 gap-2 sm:gap-3 text-center font-baskerville text-xs sm:text-sm md:text-lg tracking-[0.05em]"
    >
      <div class="flex flex-col gap-1 sm:gap-1.5 min-w-0">
        <span class="text-[#d9bc86]">Ông Bà</span>
        <span class="text-[11px] sm:text-[13px] md:text-[23px] text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.groom.fatherName }}
        </span>
        <span class="text-[11px] sm:text-[13px] md:text-[23px] text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.groom.motherName }}
        </span>
        <p class="mt-1 text-[10px] sm:text-[11px] md:text-[18px] tracking-normal w-[95%] sm:w-[90%] md:w-[80%] mx-auto whitespace-pre-line text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.groom.address }}
        </p>
      </div>
      <div class="flex flex-col gap-1 sm:gap-1.5 min-w-0">
        <span class="text-[#d9bc86]">Ông Bà</span>
        <span class="text-[11px] sm:text-[13px] md:text-[23px] text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.bride.fatherName }}
        </span>
        <span class="text-[11px] sm:text-[13px] md:text-[23px] text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.bride.motherName }}
        </span>
        <p class="mt-1 text-[10px] sm:text-[11px] md:text-[18px] tracking-normal w-[95%] sm:w-[90%] md:w-[80%] mx-auto whitespace-pre-line text-[#d9bc86] font-baskerville break-words">
          {{ config.couple.bride.address }}
        </p>
      </div>
    </div>

    <!-- TRÂN TRỌNG BÁO TIN / LỄ THÀNH HÔN CỦA CON CHÚNG TÔI -->
    <div
      class="text-center font-baskerville text-xs sm:text-sm md:text-lg text-[#e9ce9e] whitespace-pre-line uppercase px-1"
    >
      TRÂN TRỌNG BÁO TIN<br />LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
    </div>

    <!-- Tên chú rể, ÚT NAM, &, Tên cô dâu, ÚT NỮ (SP: chữ nhỏ, break-words) -->
    <div class="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4 w-full max-w-[95vw] mx-auto">
      <h3
        class="font-uni-chu w-full max-w-[90%] min-h-[60px] sm:min-h-[80px] flex items-center justify-center leading-tight sm:leading-[50px] md:leading-[100px] text-[clamp(1.25rem,5vw,2.5rem)] sm:text-[32px] md:text-[40px] text-[#e9ce9e] break-words"
      >
        {{ config.couple.groom.name }}
      </h3>
      <div class="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#d9bc86] font-baskerville">
        {{ config.couple.groom.birthOrder || 'ÚT NAM' }}
      </div>
      <div class="font-uni-chu text-[28px] sm:text-[35px] md:text-[48px] text-[#e9ce9e]">
        &amp;
      </div>
      <h3
        class="font-uni-chu w-full max-w-[90%] min-h-[60px] sm:min-h-[80px] flex items-center justify-center leading-tight sm:leading-[50px] md:leading-[100px] text-[clamp(1.25rem,5vw,2.5rem)] sm:text-[32px] md:text-[40px] text-[#e9ce9e] break-words"
      >
        {{ config.couple.bride.name }}
      </h3>
      <div class="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#d9bc86] font-baskerville">
        {{ config.couple.bride.birthOrder || 'ÚT NỮ' }}
      </div>
    </div>

    <!-- Câu trích -->
    <div class="mt-6 sm:mt-8 text-center max-w-xl mx-auto px-2">
      <p
        class="text-sm sm:text-base md:text-lg text-[#d9bc86]/90 leading-relaxed font-baskerville italic"
      >
        "Tình yêu không phải là nhìn chằm chằm vào nhau, mà là cùng nhìn về một
        hướng."
      </p>
      <p class="text-[#d9bc86]/70 mt-2 text-sm font-baskerville">
        — Antoine de Saint-Exupéry
      </p>
    </div>
  </section>
</template>

<script setup>
  import { weddingConfig } from '../config.js'

  const config = weddingConfig
</script>
