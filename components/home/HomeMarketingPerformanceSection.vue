<template>
  <section ref="sectionRef" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text content -->
        <div>
          <h2 
            class="text-4xl md:text-5xl font-bold mb-6 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
            :class="{ 'animate-fade-in-up': isVisible }"
          >
            <span class="text-black">EMPOWERING YOUR MARKETING</span>
            <br>
            <span class="text-orange-500">PERFORMANCE</span>
          </h2>
          
          <p 
            class="text-lg text-gray-600 leading-relaxed mb-8 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
            :class="{ 'animate-fade-in-up delay-200': isVisible }"
          >
            We specialize in affiliate marketing, connecting consumers with brands and helping advertisers 
            and publishers achieve their goals. Our platform provides the tools and support needed to 
            maximize your marketing performance and drive sustainable growth.
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
              <span class="text-gray-700">Advanced targeting and optimization</span>
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
              <span class="text-gray-700">Real-time analytics and reporting</span>
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
              <span class="text-gray-700">Dedicated support and guidance</span>
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