<template>
  <section class="w-full from-white bg-[#fdf6ee] text-[#1f1d1c] md:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Image with brush mask -->
        <div class="lg:col-span-6">
          <div class="brush-wrapper">
            <Image
              src="https://i.vietgiaitri.com/2021/6/15/con-song-o-thanh-pho-nhung-van-nhan-tiep-te-do-que-do-khong-phai-yeu-thuong-ma-la-bat-hieu-d11-5824841.jpg"
              alt="Món quê - khoai, sắn, đậu"
              custom-class="w-full h-auto object-cover brush-mask"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="lg:col-span-6">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1d1c]"
          >
            Tiệm Đồ Quê Tiên Hạnh
          </h2>
          <p class="mt-3 text-xl text-[#7a6657] font-medium">
            Nơi lưu giữ hương vị tuổi thơ – đơn giản, mộc mạc và thật ngon.
          </p>

          <ul class="mt-6 space-y-4">
            <li
              v-for="(item, idx) in highlights"
              :key="idx"
              class="flex items-start gap-3"
            >
              <span class="icon-check mt-1"></span>
              <span class="text-[#4b3e35] leading-relaxed">{{ item }}</span>
            </li>
          </ul>

          <div class="mt-8">
            <NuxtLink to="/about" class="btn-cta"
              >Tìm hiểu về chúng tôi</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Image from '~/components/ui/Image.vue'

  const highlights = [
    'Nguyên liệu sạch mỗi ngày: khoai lang, sắn, đậu phộng, bánh quê…',
    'Chế biến thủ công tại bếp nhà, giữ trọn vị bùi – dẻo – thơm',
    'Đóng gói gọn gàng, giữ nóng/lạnh tốt; giao nhanh trong ngày',
    'Giá bình dân – món quê gần gũi, hợp cho bữa sáng và quà chiều',
  ]
</script>

<style scoped>
  .btn-cta {
    @apply inline-flex items-center rounded-xl border border-[#3b2b23] text-[#3b2b23] px-5 py-3 font-medium hover:bg-[#efe4d8] transition-colors;
  }

  /* Brush effect (pure CSS masks) */
  .brush-wrapper {
    position: relative;
  }
  .brush-mask {
    -webkit-mask-image:
      radial-gradient(circle at 0% 20%, black 55%, transparent 58%),
      radial-gradient(circle at 15% 0%, black 60%, transparent 63%),
      radial-gradient(circle at 75% 0%, black 60%, transparent 63%),
      radial-gradient(circle at 100% 25%, black 55%, transparent 58%),
      radial-gradient(circle at 100% 75%, black 58%, transparent 61%),
      radial-gradient(circle at 80% 100%, black 60%, transparent 63%),
      radial-gradient(circle at 20% 100%, black 60%, transparent 63%),
      radial-gradient(circle at 0% 75%, black 58%, transparent 61%);
    mask-image:
      radial-gradient(circle at 0% 20%, black 55%, transparent 58%),
      radial-gradient(circle at 15% 0%, black 60%, transparent 63%),
      radial-gradient(circle at 75% 0%, black 60%, transparent 63%),
      radial-gradient(circle at 100% 25%, black 55%, transparent 58%),
      radial-gradient(circle at 100% 75%, black 58%, transparent 61%),
      radial-gradient(circle at 80% 100%, black 60%, transparent 63%),
      radial-gradient(circle at 20% 100%, black 60%, transparent 63%),
      radial-gradient(circle at 0% 75%, black 58%, transparent 61%);
    -webkit-mask-composite: source-over;
    mask-composite: add;
    background: #ddd;
    border-radius: 16px;
  }

  .icon-check {
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background: #22c55e; /* green-500 */
    box-shadow: inset 0 0 0 3px #eafff0;
    position: relative;
  }
  .icon-check::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 10px;
    border-right: 2px solid #1f1d1c;
    border-bottom: 2px solid #1f1d1c;
    transform: rotate(45deg);
  }
</style>
