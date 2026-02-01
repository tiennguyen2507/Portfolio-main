<template>
  <section id="wedding" class="py-20 bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <Typography as="h2" :size="{sp: '2xl', pc: '3xl'}" weight="bold" color="default" align="center" class="mb-4"></Typography>
          Trang Web Wedding
        <Typography as="p" :size="{sp: 'lg', pc: 'xl'}" color="muted" align="center" class="max-w-3xl mx-auto">
          Trang web đám cưới đẹp mắt, hiện đại với đầy đủ tính năng: countdown timer, gallery, RSVP form và thông tin lễ cưới
        </Typography>
      </div>

      <!-- Wedding Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Left: Image -->
        <div class="relative">
          <div
            class="relative rounded-2xl overflow-hidden ring-1 ring-orange-500/20 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
              alt="Wedding Website"
              custom-class="w-full h-80 object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            ></div>
          </div>
          <div
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            💕 Wedding
          </div>
        </div>

        <!-- Right: Content -->
        <div class="space-y-6">
          <Typography as="h3" :size="{sp: 'xl', pc: '2xl'}" weight="bold" color="default">
            Trang Web Cưới Hỏi Chuyên Nghiệp
          </Typography>

          <Typography as="p" :size="{sp: 'md', pc: 'lg'}" color="default" class="leading-relaxed">
            Trang web wedding được thiết kế với giao diện nhẹ nhàng, sang trọng.
            Bao gồm đầy đủ các tính năng cần thiết cho một đám cưới: countdown timer,
            thông tin cô dâu chú rể, lịch trình lễ cưới, gallery ảnh, form xác nhận tham dự
            và bản đồ địa điểm. Hoàn toàn responsive và tối ưu cho mọi thiết bị.
          </Typography>

          <!-- Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Countdown Timer</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Photo Gallery</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">RSVP Form</Typography>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <Typography as="span" :size="{sp: 'sm', pc: 'md'}" color="default">Responsive Design</Typography>
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="pt-4">
            <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="muted" class="mb-2">Tech Stack:</Typography>
            <div class="flex flex-wrap gap-2">
              <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default" class="px-3 py-1 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-full">
                Vue.js
              </Typography>
              <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default" class="px-3 py-1 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-full">
                Nuxt 3
              </Typography>
              <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default" class="px-3 py-1 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-full">
                Tailwind CSS
              </Typography>
              <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="default" class="px-3 py-1 bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-full">
                JavaScript
              </Typography>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <NuxtLink
              to="/wedding"
              class="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Xem Trang Wedding
              <svg
                class="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Preview Features -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-gray-700/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-600 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 dark:bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <Typography as="h4" :size="{sp: 'sm', pc: 'md'}" weight="semibold" color="default" class="mb-2">
            Countdown Timer
          </Typography>
          <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="muted">
            Đếm ngược thời gian đến ngày cưới với độ chính xác đến từng giây
          </Typography>
        </div>

        <div
          class="bg-white dark:bg-[#1C1C1E] rounded-xl p-6 border border-gray-300 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 dark:bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <Typography as="h4" :size="{sp: 'sm', pc: 'md'}" weight="semibold" color="default" class="mb-2">
            Photo Gallery
          </Typography>
          <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="muted">
            Gallery ảnh đẹp mắt với lightbox để xem ảnh ở độ phân giải cao
          </Typography>
        </div>

        <div
          class="bg-white dark:bg-[#1C1C1E] rounded-xl p-6 border border-gray-300 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 dark:bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <Typography as="h4" :size="{sp: 'sm', pc: 'md'}" weight="semibold" color="default" class="mb-2">
            RSVP Form
          </Typography>
          <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="muted">
            Form xác nhận tham dự đơn giản, dễ sử dụng cho khách mời
          </Typography>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Image from '~/components/ui/Image.vue'
</script>

