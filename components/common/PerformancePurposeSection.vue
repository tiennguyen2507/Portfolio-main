<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Section - Text Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        <!-- Left Side - Title -->
        <div class="space-y-6">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span class="text-black">PERFORMANCE DRIVES OUR</span><br>
            <span class="text-orange-500">PURPOSE</span>
          </h2>
        </div>
        
        <!-- Right Side - Description -->
        <div class="space-y-6">
          <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
            With over 20 years of experience in affiliate and performance marketing, we know how to connect consumers with brands and products in ways no one else can. We continue to innovate with our award-winning solution that connects advertisers with valuable audiences and helps publishers monetize their content.
          </p>
        </div>
      </div>

      <!-- Bottom Section - Images -->
      <div class="flex gap-6">
        <!-- Left Image - ab-1 -->
        <div class="relative overflow-hidden rounded-2xl shadow-2xl flex-1">
          <img 
            src="/assets/images/ab-1.webp" 
            alt="Collaborative workspace with team members working together"
            class="w-full h-64 lg:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <!-- Right Image - ab-2 -->
        <div class="relative overflow-hidden rounded-2xl shadow-2xl flex-1">
          <img 
            src="/assets/images/ab-2.webp" 
            alt="Modern open-plan office with contemporary design"
            class="w-full h-64 lg:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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