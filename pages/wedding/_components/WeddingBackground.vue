<template>
  <!-- Lớp họa tiết wedding + icon trôi chậm, không chặn click -->
  <div class="wedding-bg-deco pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <!-- Pattern nền tĩnh: trái tim + chấm -->
    <svg class="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wedding-hearts" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M60 20c-4-8-16-8-20 0-4 8 0 16 10 22 10-6 14-14 10-22-4-8-16-8-20 0z"
            fill="none"
            stroke="currentColor"
            stroke-width="0.6"
          />
        </pattern>
        <pattern id="wedding-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wedding-hearts)" />
      <rect width="100%" height="100%" fill="url(#wedding-dots)" opacity="0.5" />
    </svg>

    <!-- === Icon trôi chậm (floating) === -->
    <!-- Trái tim 1 -->
    <div class="deco-float deco-float-1 absolute left-[8%] top-[12%] w-8 opacity-20 sm:w-10 md:w-12">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
    <!-- Trái tim 2 -->
    <div class="deco-float deco-float-2 absolute right-[10%] top-[18%] w-6 opacity-15 sm:w-8">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
    <!-- Trái tim 3 -->
    <div class="deco-float deco-float-3 absolute left-[15%] bottom-[25%] w-7 opacity-[0.18]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
    <!-- Trái tim 4 -->
    <div class="deco-float deco-float-4 absolute right-[12%] bottom-[20%] w-9 opacity-20 md:w-11">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>

    <!-- Hoa 1 (5 cánh) -->
    <div class="deco-float deco-sway absolute left-[5%] top-[35%] w-10 opacity-[0.12] sm:w-12 md:w-14">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <g transform="translate(20,20)">
          <path transform="rotate(0)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(72)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(144)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(216)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(288)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <circle cx="0" cy="0" r="3" stroke="currentColor" fill="none" />
        </g>
      </svg>
    </div>
    <!-- Hoa 2 -->
    <div class="deco-float deco-sway deco-delay-2 absolute right-[6%] top-[45%] w-8 opacity-[0.1] md:w-10">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <g transform="translate(20,20)">
          <path transform="rotate(0)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(72)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(144)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(216)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(288)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <circle cx="0" cy="0" r="2.5" stroke="currentColor" fill="none" />
        </g>
      </svg>
    </div>
    <!-- Hoa 3 -->
    <div class="deco-float deco-sway deco-delay-1 absolute left-[10%] bottom-[35%] w-7 opacity-[0.1]">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <g transform="translate(20,20)">
          <path transform="rotate(0)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(72)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(144)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(216)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(288)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <circle cx="0" cy="0" r="2" stroke="currentColor" fill="none" />
        </g>
      </svg>
    </div>
    <!-- Hoa 4 -->
    <div class="deco-float deco-sway deco-delay-3 absolute right-[8%] bottom-[40%] w-9 opacity-[0.12]">
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <g transform="translate(20,20)">
          <path transform="rotate(0)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(72)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(144)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(216)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <path transform="rotate(288)" d="M0 0 Q4 -8 0 -12 Q-4 -8 0 0" />
          <circle cx="0" cy="0" r="2.5" stroke="currentColor" fill="none" />
        </g>
      </svg>
    </div>

    <!-- Nhẫn cưới 1 -->
    <div class="deco-float deco-pulse absolute left-[20%] top-[8%] w-14 opacity-[0.14] sm:w-16 md:w-20">
      <svg viewBox="0 0 60 30" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <ellipse cx="30" cy="15" rx="26" ry="10" />
        <ellipse cx="30" cy="15" rx="22" ry="8" />
      </svg>
    </div>
    <!-- Nhẫn 2 -->
    <div class="deco-float deco-pulse deco-delay-2 absolute right-[18%] bottom-[12%] w-12 opacity-[0.12] md:w-14">
      <svg viewBox="0 0 60 30" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <ellipse cx="30" cy="15" rx="26" ry="10" />
        <ellipse cx="30" cy="15" rx="22" ry="8" />
      </svg>
    </div>

    <!-- Rồng (stylized) - góc trái -->
    <div class="deco-float deco-float-slow absolute left-0 top-[22%] w-24 opacity-[0.1] sm:w-28 md:w-36">
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <!-- Rồng đơn giản: đầu + thân uốn -->
        <path d="M70 40 Q50 20 30 35 Q15 48 10 55 L5 50 M10 55 L8 60" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30 35 Q35 25 45 30 Q55 35 55 45" stroke-linecap="round" />
        <circle cx="68" cy="38" r="3" fill="none" stroke="currentColor" />
        <path d="M55 20 Q60 30 55 40 M50 25 Q58 32 52 42" stroke-linecap="round" opacity="0.8" />
      </svg>
    </div>
    <!-- Phượng (stylized) - góc phải -->
    <div class="deco-float deco-float-slow deco-delay-1 absolute right-0 top-[28%] w-24 scale-x-[-1] opacity-[0.1] sm:w-28 md:w-36">
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="0.8" class="text-gold">
        <!-- Phượng: đầu + đuôi lá -->
        <path d="M10 40 Q30 18 50 32 Q68 45 72 55 L76 52 M72 55 L74 60" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M50 32 Q48 22 55 28 Q62 35 58 42" stroke-linecap="round" />
        <circle cx="12" cy="38" r="3" fill="none" stroke="currentColor" />
        <path d="M25 25 Q20 35 28 40 M35 20 Q30 32 38 38 M45 22 Q42 34 48 40" stroke-linecap="round" opacity="0.8" />
      </svg>
    </div>

    <!-- Góc trang trí tĩnh (viền hoa) - giữ nguyên kiểu cũ nhưng có thể thêm class animate nếu muốn -->
    <svg
      class="absolute left-0 top-0 w-32 opacity-[0.06] sm:w-48 md:w-56"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 100 Q20 20 60 20 Q100 20 100 60 Q100 100 60 100 Q20 100 20 60"
        stroke="currentColor"
        stroke-width="0.8"
      />
      <path d="M60 30 L60 50 M50 40 L70 40" stroke="currentColor" stroke-width="0.5" />
      <circle cx="60" cy="45" r="4" stroke="currentColor" stroke-width="0.6" />
    </svg>
    <svg
      class="absolute right-0 top-0 w-32 scale-x-[-1] opacity-[0.06] sm:w-48 md:w-56"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 100 Q20 20 60 20 Q100 20 100 60 Q100 100 60 100 Q20 100 20 60"
        stroke="currentColor"
        stroke-width="0.8"
      />
      <path d="M60 30 L60 50 M50 40 L70 40" stroke="currentColor" stroke-width="0.5" />
      <circle cx="60" cy="45" r="4" stroke="currentColor" stroke-width="0.6" />
    </svg>

    <!-- Nhẫn lớn giữa (trang trí) - pulse nhẹ -->
    <div class="deco-pulse deco-delay-1 absolute left-1/2 top-1/3 w-40 -translate-x-1/2 opacity-[0.06] md:w-52">
      <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" stroke-width="1" class="text-gold">
        <ellipse cx="50" cy="20" rx="45" ry="18" />
        <ellipse cx="50" cy="20" rx="38" ry="14" />
      </svg>
    </div>
  </div>
</template>

<script setup>
  // Chỉ hiển thị họa tiết + animation, không cần logic
</script>

<style scoped>
  .wedding-bg-deco {
    color: #e9ce9e;
  }
  .text-gold {
    color: #e9ce9e;
  }

  /* Trôi lên xuống chậm */
  .deco-float {
    animation: float 8s ease-in-out infinite;
  }
  .deco-float-1 { animation-delay: 0s; }
  .deco-float-2 { animation-delay: 1.5s; }
  .deco-float-3 { animation-delay: 3s; }
  .deco-float-4 { animation-delay: 4.5s; }
  .deco-float-slow {
    animation: float 12s ease-in-out infinite;
  }
  .deco-delay-1 { animation-delay: 0.8s; }
  .deco-delay-2 { animation-delay: 2s; }
  .deco-delay-3 { animation-delay: 3.5s; }

  /* Lắc nhẹ (hoa) */
  .deco-sway {
    animation: sway 6s ease-in-out infinite;
  }

  /* Pulse nhẹ (nhẫn) */
  .deco-pulse {
    animation: pulse 5s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes sway {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.12; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.05); }
  }

  /* Pulse dùng cho nhẫn lớn giữa - giữ opacity trong component, chỉ scale */
  .deco-pulse.deco-delay-1 {
    animation: pulse-center 6s ease-in-out infinite;
  }
  @keyframes pulse-center {
    0%, 100% { opacity: 0.06; transform: translateX(-50%) scale(1); }
    50% { opacity: 0.1; transform: translateX(-50%) scale(1.08); }
  }
</style>
