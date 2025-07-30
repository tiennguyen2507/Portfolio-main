<template>
  <section ref="sectionRef" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text content -->
        <div>
          <h2 
            class="text-3xl md:text-4xl font-bold mb-6 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
            :class="{ 'animate-fade-in-up': isVisible }"
          >
            <span class="text-black uppercase">Scale Smarter with Affiliate</span>
            <br>
            <span class="text-orange-500 text-4xl md:text-5xl">PERFORMANCE</span>
            <br>
            <span class="text-black uppercase">That Delivers</span>
          </h2>
          
          <p 
            class="text-lg text-gray-600 leading-relaxed mb-8 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
            :class="{ 'animate-fade-in-up delay-200': isVisible }"
          >
          At Leadsmax Network, we connect advertisers and publishers through high-impact affiliate campaigns.
          Our platform is built for performance — giving you the tools, insights, and support to drive results that scale.
          </p>
          
          <div class="space-y-4">
            <div 
              class="flex items-center opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
              :class="{ 'animate-fade-in-up delay-300': isVisible }"
            >
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Smarter targeting. Better optimization.</span>
            </div>
            
            <div 
              class="flex items-center opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
              :class="{ 'animate-fade-in-up delay-400': isVisible }"
            >
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Real-time tracking with actionable insights.</span>
            </div>
            
            <div 
              class="flex items-center opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
              :class="{ 'animate-fade-in-up delay-500': isVisible }"
            >
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">Dedicated account support that grows with you.</span>
            </div>
          </div>
        </div>
        
        <!-- Marketing Image -->
        <div 
          class="relative opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
          :class="{ 'animate-fade-in-up delay-250': isVisible }"
        >
          <div class="relative overflow-hidden rounded-2xl shadow-lg transform hover:shadow-2xl transition-all duration-500">
            <img 
              src="/assets/images/marketing.webp" 
              alt="Marketing Performance - Digital marketing strategies and analytics"
              class="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            <!-- Gradient overlay for better text contrast -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
            

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { isVisible, elementRef: sectionRef } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
})
</script>

<style scoped>
.animate-fade-in-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Custom delay classes for smoother timing */
.delay-200 {
  transition-delay: 200ms !important;
}

.delay-250 {
  transition-delay: 250ms !important;
}

.delay-300 {
  transition-delay: 300ms !important;
}

.delay-400 {
  transition-delay: 400ms !important;
}

.delay-500 {
  transition-delay: 500ms !important;
}
</style> 