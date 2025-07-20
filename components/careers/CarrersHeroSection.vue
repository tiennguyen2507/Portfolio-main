<template>
  <section
    class="relative min-h-[100vh] flex flex-col justify-center overflow-hidden"
  >
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1">
      <img
        src="/assets/images/ca-bg.webp"
        alt="Hero Background"
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Overlay to hide background after hero section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
      style="z-index: 1"
    ></div>

    <!-- Hero Content -->
    <div
      class="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 mt-24"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content (Left Side) -->
        <div class="text-center lg:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span class="block">JOIN OUR TEAM AT</span>
            <span class="block text-orange-500">LEADSWISE</span>
          </h1>
          
          <div class="space-y-6 text-lg text-white/90 leading-relaxed">
            <p>
              We believe in the power of teamwork. Our open-door policy encourages communication, idea-sharing, and cross-functional collaboration. Whether you are in marketing, tech, or operations, your voice matters here.
            </p>
            
            <p>
              Achievements, big or small, deserve recognition. From monthly shout-outs to team outings, we celebrate wins together. Plus, our office has a dedicated "Wall of Fame" for outstanding contributions.
            </p>
          </div>
          
          <!-- CTA Button -->
          <div class="mt-8">
            <button class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Explore Opportunities
            </button>
          </div>
        </div>

        <!-- Team Image (Right Side) -->
        <div class="relative flex justify-center lg:justify-start">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/assets/images/Executive.webp"
              alt="Diverse team collaborating at LeadsWise"
              class="w-full h-[500px] object-cover"
            />
            <!-- Subtle overlay to enhance the image -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* Hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style>
