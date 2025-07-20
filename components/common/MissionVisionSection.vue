<template>
  <section class="w-full bg-black">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
      <!-- Left Side - Image with Filter -->
      <div class="relative overflow-hidden">
        <img 
          src="/assets/images/ab-4.webp" 
          alt="Collaborative team working in modern office"
          class="w-full h-full object-cover"
        />
        <!-- Orange Filter Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-orange-600/40 to-orange-700/30 mix-blend-overlay"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-orange-500/20"></div>
      </div>

      <!-- Right Side - Text Content -->
      <div class="bg-black text-white p-8 lg:p-12 flex flex-col justify-center">
        <div class="space-y-8">
          <!-- OUR MISSION -->
          <div class="space-y-3">
            <h3 class="text-2xl lg:text-3xl font-bold">
              <span class="text-white">OUR</span>
              <span class="text-orange-500"> MISSION</span>
            </h3>
            <p class="text-base lg:text-lg text-gray-300 leading-relaxed">
              With over 20 years of experience in affiliate and performance marketing, we know how to connect consumers with brands and products in ways no one else can.
            </p>
          </div>

          <!-- OUR VISION -->
          <div class="space-y-3">
            <h3 class="text-2xl lg:text-3xl font-bold">
              <span class="text-white">OUR</span>
              <span class="text-orange-500"> VISION</span>
            </h3>
            <p class="text-base lg:text-lg text-gray-300 leading-relaxed">
              Understanding your needs and delivering creative and fresh technological solutions is how we roll.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* Custom styles for the component */
</style> 