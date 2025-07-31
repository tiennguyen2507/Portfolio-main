<template>
  <div
    class="min-h-screen bg-gray-900 text-white w-full max-w-full overflow-x-hidden"
  >
    <StructuredData />
    <!-- Header/Navigation -->
    <PortfolioHeader />

    <PortfolioHero />

    <!-- Technologies Section -->
    <section
      class="py-8 sm:py-12 md:py-16 bg-gray-800/50 relative overflow-hidden"
    >
      <!-- Background Tech Pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div
          class="absolute top-10 left-1/4 text-orange-500 text-2xl animate-pulse"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div
          class="absolute bottom-10 right-1/4 text-orange-500 text-2xl animate-bounce"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"
        ></div>
      </div>

      <div class="relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            class="flex flex-wrap justify-center gap-8 text-gray-400 text-lg"
          >
            <span class="hover:text-orange-500 transition-colors">HTML</span>
            <span class="hover:text-orange-500 transition-colors">CSS</span>
            <span class="hover:text-orange-500 transition-colors"
              >Javascript</span
            >
            <span class="hover:text-orange-500 transition-colors">Nest JS</span>
            <span class="hover:text-orange-500 transition-colors">React</span>
            <span class="hover:text-orange-500 transition-colors">Next</span>
            <span class="hover:text-orange-500 transition-colors">Vue</span>
            <span class="hover:text-orange-500 transition-colors">Nuxt</span>
          </div>
        </div>
      </div>
    </section>

    <!-- About & Services Section -->
    <PortfolioAbout />

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
                Nền tảng thương mại điện tử hiện đại với React frontend và
                Node.js backend, tích hợp thanh toán và quản lý đơn hàng
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
                Ứng dụng quản lý công việc đa nền tảng với React Native, tích
                hợp Firebase cho real-time sync
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

    <PortfolioContact @submit="handleContactSubmit" />

    <!-- Footer -->
    <footer class="py-6 sm:py-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p class="text-gray-400">
          &copy; 2025 Nguyễn Lê Đình Tiên. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Card from "~/components/ui/Card.vue";
import Badge from "~/components/ui/Badge.vue";
import PortfolioHero from "~/pages/_components/PortfolioHero.vue";
import StructuredData from "~/components/StructuredData.vue";

useHead({
  title:
    "Nguyễn Lê Đình Tiên - Fullstack Web Developer | React, Vue.js, Node.js | Da Nang",
  meta: [
    {
      name: "description",
      content:
        "Nguyễn Lê Đình Tiên - Lập trình viên web với 6 năm kinh nghiệm trong Frontend và Backend Development. Chuyên xây dựng giao diện hiện đại với React, Vue.js và API mạnh mẽ với Node.js, NestJS. Dựa tại Đà Nẵng, Việt Nam.",
    },
    {
      name: "keywords",
      content:
        "web developer, fullstack developer, frontend developer, backend developer, React developer, Vue.js developer, Node.js developer, Da Nang, Vietnam, hire developer, modern UI/UX, API development, software engineer, NestJS, TypeScript",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/webp",
      href: "/favicon.webp",
    },
    {
      rel: "shortcut icon",
      type: "image/webp",
      href: "/favicon.webp",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon.webp",
    },
  ],
});

definePageMeta({
  layout: false, // Không sử dụng layout nào - trang trắng hoàn toàn
});

// Handle contact form submission
const handleContactSubmit = (formData) => {
  console.log("Contact form submitted:", formData);
  // Ở đây bạn có thể thêm logic gửi email hoặc lưu vào database
  // Ví dụ: gửi email, gọi API, etc.
};
</script>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>
