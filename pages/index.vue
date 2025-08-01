<template>
  <div
    class="min-h-screen bg-gray-900 text-white w-full max-w-full overflow-x-hidden"
  >
    <StructuredData />
    <PortfolioHero />
    <TechnologiesSection />

    <!-- About & Services Section -->
    <PortfolioAbout />

    <ProjectsSection />

    <PortfolioBlog />

    <PortfolioContact @submit="handleContactSubmit" />
  </div>
</template>

<script setup>
import PortfolioHero from "~/pages/_components/PortfolioHero.vue";
import TechnologiesSection from "~/pages/_components/TechnologiesSection.vue";
import ProjectsSection from "~/pages/_components/ProjectsSection.vue";
import PortfolioBlog from "~/pages/_components/PortfolioBlog.vue";
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
  layout: "default", // Sử dụng layout default với header và footer
});

// Handle contact form submission
const handleContactSubmit = (formData) => {
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
