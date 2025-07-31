<template>
  <div
    class="min-h-screen bg-gray-900 text-white w-full max-w-full overflow-x-hidden"
  >
    <!-- Header/Navigation -->
    <PortfolioHeader />

    <PortfolioHero />

    <!-- Technologies Section -->
    <section class="py-16 bg-gray-800/50 relative overflow-hidden">
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
        <div class="max-w-7xl mx-auto px-6">
          <div
            class="flex flex-wrap justify-center gap-8 text-gray-400 text-lg"
          >
            <span class="hover:text-orange-500 transition-colors">HTML</span>
            <span class="hover:text-orange-500 transition-colors">CSS</span>
            <span class="hover:text-orange-500 transition-colors"
              >Javascript</span
            >
            <span class="hover:text-orange-500 transition-colors">Node.js</span>
            <span class="hover:text-orange-500 transition-colors">React</span>
            <span class="hover:text-orange-500 transition-colors">Git</span>
            <span class="hover:text-orange-500 transition-colors">Github</span>
          </div>
        </div>
      </div>
    </section>

    <!-- About & Services Section -->
    <PortfolioAbout />

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-800/30">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <!-- Project Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card variant="elevated" hover>
            <img
              src="~/assets/images/blog-1.webp"
              alt="Project 1"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                E-commerce Platform
              </h3>
              <p class="text-gray-400 mb-4">
                A modern e-commerce solution built with React and Node.js
              </p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="primary">React</Badge>
                <Badge variant="primary">Node.js</Badge>
              </div>
            </div>
          </Card>

          <Card variant="elevated" hover>
            <img
              src="~/assets/images/blog-2.webp"
              alt="Project 2"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">Mobile App</h3>
              <p class="text-gray-400 mb-4">
                Cross-platform mobile application for task management
              </p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="primary">React Native</Badge>
                <Badge variant="primary">Firebase</Badge>
              </div>
            </div>
          </Card>

          <Card variant="elevated" hover>
            <img
              src="~/assets/images/blog-3.webp"
              alt="Project 3"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                Dashboard System
              </h3>
              <p class="text-gray-400 mb-4">
                Analytics dashboard with real-time data visualization
              </p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="primary">Vue.js</Badge>
                <Badge variant="primary">D3.js</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <PortfolioContact @submit="handleContactSubmit" />

    <!-- Footer -->
    <footer class="py-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-gray-400">
          &copy; 2024 Nguyễn Lê Đình Tiên. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Card from "~/components/ui/Card.vue";
import Badge from "~/components/ui/Badge.vue";
import PortfolioHero from "~/pages/_components/PortfolioHero.vue";

useHead({
  title: "Nguyễn Lê Đình Tiên - Software Developer Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Nguyễn Lê Đình Tiên is a passionate software developer specializing in web development, mobile apps, and modern technologies. View my portfolio and get in touch for your next project.",
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
