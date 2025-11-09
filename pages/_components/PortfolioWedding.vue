<template>
  <section id="wedding" class="py-20 bg-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
          Trang Web Wedding
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Trang web đám cưới đẹp mắt, hiện đại với đầy đủ tính năng: countdown timer, gallery, RSVP form và thông tin lễ cưới
        </p>
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
          <h3 class="text-2xl font-bold text-white">
            Trang Web Cưới Hỏi Chuyên Nghiệp
          </h3>

          <p class="text-gray-300 leading-relaxed">
            Trang web wedding được thiết kế với giao diện nhẹ nhàng, sang trọng.
            Bao gồm đầy đủ các tính năng cần thiết cho một đám cưới: countdown timer,
            thông tin cô dâu chú rể, lịch trình lễ cưới, gallery ảnh, form xác nhận tham dự
            và bản đồ địa điểm. Hoàn toàn responsive và tối ưu cho mọi thiết bị.
          </p>

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
              <span class="text-gray-300">Countdown Timer</span>
            </div>
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
              <span class="text-gray-300">Photo Gallery</span>
            </div>
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
              <span class="text-gray-300">RSVP Form</span>
            </div>
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
              <span class="text-gray-300">Responsive Design</span>
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="pt-4">
            <p class="text-sm text-gray-400 mb-2">Tech Stack:</p>
            <div class="flex flex-wrap gap-2">
              <span
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                Vue.js
              </span>
              <span
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                Nuxt 3
              </span>
              <span
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                Tailwind CSS
              </span>
              <span
                class="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                JavaScript
              </span>
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
          class="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-orange-500/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500"
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
          <h4 class="text-white font-semibold mb-2">Countdown Timer</h4>
          <p class="text-gray-400 text-sm">
            Đếm ngược thời gian đến ngày cưới với độ chính xác đến từng giây
          </p>
        </div>

        <div
          class="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-orange-500/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500"
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
          <h4 class="text-white font-semibold mb-2">Photo Gallery</h4>
          <p class="text-gray-400 text-sm">
            Gallery ảnh đẹp mắt với lightbox để xem ảnh ở độ phân giải cao
          </p>
        </div>

        <div
          class="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-orange-500/50 transition-colors"
        >
          <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-orange-500"
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
          <h4 class="text-white font-semibold mb-2">RSVP Form</h4>
          <p class="text-gray-400 text-sm">
            Form xác nhận tham dự đơn giản, dễ sử dụng cho khách mời
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Image from '~/components/ui/Image.vue'
</script>

