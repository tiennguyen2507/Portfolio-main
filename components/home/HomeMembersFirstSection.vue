<template>
  <section ref="sectionRef" class="py-20 bg-black text-white relative overflow-hidden">
    <!-- Background network pattern -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0">
        <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#10b981" opacity="0.6"/>
              <line x1="0" y1="10" x2="20" y2="10" stroke="#10b981" stroke-width="0.5" opacity="0.3"/>
              <line x1="10" y1="0" x2="10" y2="20" stroke="#10b981" stroke-width="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#network)"/>
        </svg>
      </div>
    </div>
    
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 
        class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        :class="{ 'animate-fade-in-up': isVisible }"
      >
                    <span class="text-orange-500 uppercase">At Leadsmax, People Come First</span>
        <br>
        <span class="text-white uppercase">Empowered Teams. Meaningful Work. Shared Wins.</span>
      </h2>
      
      <p 
        class="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
        :class="{ 'animate-fade-in-up': isVisible }"
      >
      We believe that great performance starts with great people.
      At Leadsmax, we don’t just build campaigns — we build a culture where every voice matters, innovation thrives, and success is something we create together.
      </p>
      
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Inclusive Culture</h3>
          <p class="text-gray-400">A safe, supportive space where everyone belongs.</p>
        </div>
        
        <div 
          class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Innovation-Driven</h3>
          <p class="text-gray-400">We challenge ideas, not people — and create bold new solutions.</p>
        </div>
        
        <div 
          class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-800"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Collaborative Spirit</h3>
          <p class="text-gray-400">We grow faster when we win together.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { isVisible, elementRef: sectionRef } = useScrollAnimation()
</script>

<style scoped>
.animate-fade-in-up {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
</style> 