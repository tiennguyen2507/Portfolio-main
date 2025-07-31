<template>
  <div
    class="min-h-screen bg-gray-900 text-white w-full max-w-full overflow-x-hidden"
  >
    <!-- Header/Navigation -->
    <PortfolioHeader />

    <!-- Hero Section -->
    <section id="home" class="pt-24 pb-16 min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Introduction -->
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-6xl md:text-7xl font-bold">
                <span class="text-white">Hello.</span>
                <span class="text-orange-500 ml-2">●</span>
              </h1>
              <div class="flex items-center space-x-4">
                <span class="text-3xl md:text-4xl text-white"
                  >I'm Nguyễn Lê Đình Tiên</span
                >
                <div class="w-16 h-0.5 bg-orange-500"></div>
              </div>
              <h2 class="text-4xl md:text-5xl font-bold text-white">
                Software Developer
              </h2>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Got a project?
              </button>
              <button
                class="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                My resume
              </button>
            </div>
          </div>

          <!-- Right Side - Profile Picture -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative">
              <!-- Background decorative elements -->
              <div
                class="absolute -top-8 -left-8 w-32 h-32 border-2 border-orange-500/30 rounded-full"
              ></div>
              <div
                class="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-orange-500/20 rounded-full"
              ></div>

              <!-- Chevron shapes -->
              <div
                class="absolute -left-16 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-6xl font-bold"
              >
                &lt;
              </div>
              <div
                class="absolute -right-16 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-6xl font-bold"
              >
                &gt;
              </div>

              <!-- Profile Image -->
              <div class="relative z-10">
                <div
                  class="w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-4 border-orange-500/20 shadow-2xl flex items-center justify-center"
                >
                  <div class="text-center">
                    <div
                      class="w-32 h-32 bg-orange-500/30 rounded-full flex items-center justify-center mb-4"
                    >
                      <svg
                        class="w-16 h-16 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div class="text-orange-500 font-semibold text-lg">
                      Nguyễn Lê Đình Tiên
                    </div>
                    <div class="text-gray-400 text-sm">Software Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies Section -->
    <section class="py-16 bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-wrap justify-center gap-8 text-gray-400 text-lg">
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
import PortfolioContact from "./_components/PortfolioContact.vue";
import PortfolioAbout from "./_components/portfolioAbout.vue";
import PortfolioHeader from "./_components/PortfolioHeader.vue";
import Card from "~/components/ui/Card.vue";
import Badge from "~/components/ui/Badge.vue";

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
