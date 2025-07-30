<template>
  <section class="relative min-h-[120vh] flex flex-col justify-center overflow-hidden">
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1;">
      <img 
        src="/images/ab-bg.webp" 
        alt="Hero Background" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black/80"></div>
    </div>
    
    <!-- Overlay to hide background after hero section -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" style="z-index: 1;"></div>
    
    <!-- Hero Content -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-16">
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 mt-16">
        <span class="text-orange-500 relative">
          LEADSMAX
          <div class="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </span>
        <span class="text-white"> NETWORK</span>
      </h1>
      
      <div class="space-y-6 mb-12">
        <p class="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-tight">
          Maximum Performance – Outstanding Results
        </p>
        
        <p class="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Trusted by partners. Driven by results.
        </p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <NuxtLink 
          to="https://leadswise.affise.com/v2/sign/up" 
          target="_blank"
          rel="noopener noreferrer"
          class="group relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="relative z-10">SIGN UP</span>
        </NuxtLink>
        
        <NuxtLink to="/blogs" class="group relative inline-flex items-center px-8 py-5 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-orange-400 hover:text-orange-400 transition-all duration-300 transform hover:scale-105">
          <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>BLOGS</span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Stats Section -->
    <div class="absolute bottom-[0] z-10 w-full h-[30vh] lg:h-[22vh]">
      <!-- Separator line -->
      <div class="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 mb-8"></div>
      
      <!-- Stats Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                     <div class="text-center group">
             <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2 transition-all duration-300 group-hover:scale-110">
               +<span ref="leadsCounter">0</span>M
             </div>
             <div class="text-lg md:text-xl text-gray-300 font-medium">
               Monthly leads
             </div>
           </div>
          
                     <div class="text-center group">
             <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2 transition-all duration-300 group-hover:scale-110">
               +<span ref="advertisersCounter">0</span>
             </div>
             <div class="text-lg md:text-xl text-gray-300 font-medium">
               Advertisers
             </div>
           </div>
          
                     <div class="text-center group">
             <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2 transition-all duration-300 group-hover:scale-110">
               +<span ref="publishersCounter">0</span>
             </div>
             <div class="text-lg md:text-xl text-gray-300 font-medium">
               Publishers
             </div>
           </div>
          
                     <div class="text-center group">
             <div class="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-500 mb-2 transition-all duration-300 group-hover:scale-110">
               +<span ref="offersCounter">0</span>
             </div>
             <div class="text-lg md:text-xl text-gray-300 font-medium">
               Offers
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const leadsCounter = ref(null)
const advertisersCounter = ref(null)
const publishersCounter = ref(null)
const offersCounter = ref(null)

// Animation function
const animateCounter = (element, target, duration = 3500) => {
  if (!element) return
  
  let start = 0
  const increment = target / (duration / 16) // 60fps
  
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Intersection Observer to trigger animation when section is visible
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start animations
        animateCounter(leadsCounter.value, 1.2) // 1M
        animateCounter(advertisersCounter.value, 350)
        animateCounter(publishersCounter.value, 1500)
        animateCounter(offersCounter.value, 500)
        
        // Stop observing after animation starts
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.3
  })
  
  // Observe the section
  const section = document.querySelector('section')
  if (section) {
    observer.observe(section)
  }
})
</script>

<style scoped>
/* Hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style> 