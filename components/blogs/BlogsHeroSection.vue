<template>
  <section
    class="relative min-h-[50vh] flex flex-col justify-center overflow-hidden"
  >
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1">
      <img
        src="/assets/images/faqs-bg.png"
        alt="Hero Background"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Overlay to hide background after hero section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
      style="z-index: 1"
    ></div>

    <!-- Hero Content -->
    <div
      class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16"
    >
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 mt-24">
        <span class="text-white uppercase text-2xl md:text-4xl">Blogs</span>
        <br />
        <span class="text-orange-500 relative uppercase">
          Stay Informed with Our Blog
          <div
            class="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </span>
      </h1>

      <div class="space-y-6 mb-12">
        <p
          class="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-tight"
        >
          Discover insights articles, tips, and updates on industry trends. Our
          blog keeps you informed and inspired, offering valuable knowledge to
          help you stay ahead in your field.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
/* Hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style>
