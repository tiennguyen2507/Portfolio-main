<template>
  <!-- Projects Section -->
  <section id="projects" class="py-12 sm:py-16 md:py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Dự án nổi bật
        </h2>
        <p class="text-lg text-gray-300 mb-4">
          Các dự án web và ứng dụng tôi đã phát triển
        </p>
        <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <!-- Project Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <Card variant="elevated" hover>
          <img
            src="~/assets/images/blog-1.webp"
            alt="E-commerce Platform - Dự án thương mại điện tử hiện đại"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-4 sm:p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              E-commerce Platform
            </h3>
            <p class="text-gray-400 mb-4">
              Nền tảng thương mại điện tử hiện đại với React frontend và Node.js
              backend, tích hợp thanh toán và quản lý đơn hàng
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge variant="primary">React</Badge>
              <Badge variant="primary">Node.js</Badge>
              <Badge variant="primary">MongoDB</Badge>
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <img
            src="~/assets/images/blog-2.webp"
            alt="Mobile App - Ứng dụng quản lý công việc đa nền tảng"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-4 sm:p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              Task Management App
            </h3>
            <p class="text-gray-400 mb-4">
              Ứng dụng quản lý công việc đa nền tảng với React Native, tích hợp
              Firebase cho real-time sync
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge variant="primary">React Native</Badge>
              <Badge variant="primary">Firebase</Badge>
              <Badge variant="primary">Redux</Badge>
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <img
            src="~/assets/images/blog-3.webp"
            alt="Dashboard System - Hệ thống bảng điều khiển phân tích dữ liệu"
            class="w-full h-48 object-cover rounded-t-lg"
          />
          <div class="p-4 sm:p-6">
            <h3 class="text-xl font-semibold text-white mb-2">
              Analytics Dashboard
            </h3>
            <p class="text-gray-400 mb-4">
              Hệ thống bảng điều khiển phân tích dữ liệu thời gian thực với
              Vue.js và D3.js, hiển thị biểu đồ tương tác
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge variant="primary">Vue.js</Badge>
              <Badge variant="primary">D3.js</Badge>
              <Badge variant="primary">Chart.js</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Card from '~/components/ui/Card.vue'
  import Badge from '~/components/ui/Badge.vue'
</script>
