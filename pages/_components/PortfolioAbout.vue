<template>
  <!-- About & Services Section -->
  <section id="about" class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Left Side - Services -->
        <div class="relative">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>

          <div class="space-y-12">
            <div
              v-for="(service, index) in services"
              :key="service.title"
              class="flex items-center space-x-4 relative"
            >
              <!-- Timeline dot -->
              <div
                class="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"
              ></div>

              <!-- Service content -->
              <div class="ml-8 flex items-center space-x-4">
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
      title: 'Frontend Development',
      description: 'Modern UI/UX with Vue.js & React',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      title: 'Backend Development',
      description: 'Robust APIs with Node.js & NestJS',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
    {
      title: 'Server Deployment',
      description: 'Cloud infrastructure & DevOps',
      icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },
    {
      title: 'Team Leadership',
      description: 'Project management & mentoring',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
  ])

  // Statistics data
  const statistics = ref([
    {
      value: '12',
      suffix: '+',
      label: 'Completed Projects',
    },
    {
      value: '95',
      suffix: '%',
      label: 'Client satisfaction',
    },
    {
      value: '6',
      suffix: '+',
      label: 'Years of experience',
    },
  ])
</script>
