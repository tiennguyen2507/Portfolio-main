<template>
  <section
    class="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
  >
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1">
      <img
        src="/images/ab-bg.webp"
        alt="Hero Background"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/80"></div>
    </div>

    <!-- Overlay to hide background after hero section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
      style="z-index: 1"
    ></div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-7xl w-[100%] mx-auto px-8 mb-16">
      <div class="text-left max-w-4xl">
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 mt-16">
          <span
            class="text-white block text-3xl md:text-4xl lg:text-5xl font-medium mb-2 uppercase"
          >
            We aim high and <br> achieve even
          </span>
          <span class="text-orange-500 block leading-tight uppercase">
            greater results
          </span>
        </h1>

        <div class="space-y-6 mb-12">
          <p class="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Our approach involves grasping your needs and
            providing innovative, cutting-edge technological solutions.          </p>
        </div>
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
