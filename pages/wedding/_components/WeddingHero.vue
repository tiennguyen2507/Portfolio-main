<template>
  <!-- Full viewport: khi mở trang chỉ thấy Hero, scroll xuống xem nội dung tiếp -->
  <header
    class="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 wedding-hero-fullscreen overflow-hidden"
  >
    <!-- Nền: rồng góc trên, phượng góc dưới. SP vừa màn, PC lớn -->
    <img
      src="/images/rong.png"
      alt=""
      role="presentation"
      class="hero-deco absolute left-0 top-0 h-[65vh] max-h-[420px] w-auto object-contain object-[left_top] opacity-[0.15] pointer-events-none z-0 md:h-[90%] md:max-h-[960px]"
    />
    <img
      src="/images/phuong.png"
      alt=""
      role="presentation"
      class="hero-deco absolute right-0 bottom-0 h-[65vh] max-h-[420px] w-auto object-contain object-[right_bottom] opacity-[0.15] pointer-events-none z-0 md:h-[90%] md:max-h-[960px]"
    />

    <div class="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-5 w-full max-w-[92vw] mx-auto">
      <!-- Tên cô dâu chú rể: lớn, chính giữa, font UNI Chu / Times New Roman -->
      <div class="font-uni-chu leading-tight w-full flex flex-col items-center">
        <div class="name-line text-[clamp(2.25rem,9vw,4.5rem)] sm:text-[3.25rem] md:text-[5rem] leading-[1.15] md:leading-[1.2] break-words text-center">
          {{ shortGroomName }}
        </div>
        <div class="mt-1 sm:mt-2 text-[clamp(1.75rem,5vw,3rem)] sm:text-[2.75rem] md:text-[3.5rem] leading-none text-center">
          &amp;
        </div>
        <div class="name-line text-[clamp(2.25rem,9vw,4.5rem)] sm:text-[3.25rem] md:text-[5rem] leading-[1.15] md:leading-[1.2] break-words text-center">
          {{ shortBrideName }}
        </div>
      </div>
    </div>

    <!-- Countdown -->
    <div class="mt-6 sm:mt-8 w-full flex justify-center">
      <WeddingCountdown :target-date="getTargetDateTime()" />
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-80 pointer-events-none"
    >
      <svg
        class="w-6 h-6 text-[#e9ce9e]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </header>
</template>

<script setup>
  import { weddingConfig } from '../config.js'
  import WeddingCountdown from './WeddingCountdown.vue'

  const config = weddingConfig

  const shortGroomName =
    config.couple.groom.name.split(' ').slice(-2).join(' ') ||
    config.couple.groom.name
  const shortBrideName =
    config.couple.bride.name.split(' ').slice(-2).join(' ') ||
    config.couple.bride.name

  const getTargetDateTime = () => {
    const { date, time } = config.weddingDate.ceremony
    return `${date}T${time}:00`
  }
</script>

<style scoped>
  /* Full màn khi xuất hiện, scroll xuống xem nội dung tiếp theo */
  .wedding-hero-fullscreen {
    min-height: 100vh;
    min-height: 100dvh;
  }

  /* Tên dùng đúng font UNI Chu / Times New Roman (kế thừa .font-uni-chu) */
  .name-line {
    font-family: 'UNI Chu truyen thong', 'Times New Roman', serif;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, 8px);
    }
  }
  .animate-bounce {
    animation: bounce 2s ease-in-out infinite;
  }
</style>
