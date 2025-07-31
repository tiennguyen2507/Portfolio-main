<template>
  <!-- About & Services Section -->
  <section id="about" class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Left Side - Services -->
        <div class="relative">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-orange-500">
            <div
              class="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
            ></div>
            <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
            ></div>
            <div
              class="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
            ></div>
          </div>

          <div class="ml-8 space-y-12">
            <div
              v-for="service in services"
              :key="service.title"
              class="flex items-center space-x-4"
            >
              <div
                class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center"
              >
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
                    :d="service.icon"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white">
                  {{ service.title }}
                </h3>
                <p class="text-gray-400">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - About Me -->
        <div class="space-y-8">
          <h2 class="text-4xl md:text-5xl font-bold text-white">Giới thiệu</h2>
          <p class="text-lg text-gray-300 leading-relaxed">
            Tôi là Tiên, lập trình viên web với 6 năm kinh nghiệm. Tôi có khả
            năng làm việc cả Frontend và Backend. Ở phía giao diện, tôi thành
            thạo Vue.js và React, thường xuyên xây dựng các ứng dụng web hiện
            đại, thân thiện với người dùng. Về phía Backend, tôi sử dụng
            Node.js, NestJS để xây dựng API, xử lý dữ liệu, quản lý hệ thống và
            tích hợp với các dịch vụ khác. Tôi yêu thích tạo ra sản phẩm chất
            lượng, dễ bảo trì và tối ưu hiệu suất.
          </p>

          <!-- Statistics -->
          <div class="grid grid-cols-3 gap-8 pt-8">
            <div
              v-for="stat in statistics"
              :key="stat.label"
              class="text-center"
            >
              <div class="text-3xl font-bold text-orange-500 mb-2">
                <span>{{ stat.value }}</span>
                <span class="text-orange-500">{{ stat.suffix }}</span>
              </div>
              <div class="text-gray-400">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Services data
const services = ref([
  {
    title: "Website Development",
    description: "Modern web applications",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "App Development",
    description: "Mobile & desktop applications",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "Website Hosting",
    description: "Reliable hosting solutions",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
]);

// Statistics data
const statistics = ref([
  {
    value: "12",
    suffix: "+",
    label: "Completed Projects",
  },
  {
    value: "95",
    suffix: "%",
    label: "Client satisfaction",
  },
  {
    value: "6",
    suffix: "+",
    label: "Years of experience",
  },
]);
</script>
