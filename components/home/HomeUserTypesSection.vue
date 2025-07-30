<template>
  <section ref="sectionRef" class="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
    <!-- Modern background pattern -->
    <div class="absolute inset-0">
      <!-- Orange accent overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/8"></div>
      
      <!-- Geometric orange accents -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-10 w-32 h-32 bg-orange-500/15 rounded-full blur-3xl"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-600/12 rounded-full blur-3xl"></div>
        <div class="absolute bottom-40 right-1/3 w-28 h-28 bg-orange-500/18 rounded-full blur-2xl"></div>
      </div>
      
      <!-- Subtle orange grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section title -->
      <div 
        class="text-center mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        :class="{ 'animate-fade-in-up': isVisible }"
      >
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-6">
          What Makes Us Different?
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We're not just another network. We're your strategic partner in performance marketing.
        </p>
      </div>
      
      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Performance-first mindset -->
        <div 
          class="group relative p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-orange-500/20 shadow-xl hover:shadow-2xl hover:border-orange-400/40 transition-all duration-500 opacity-0 transform translate-y-8"
          :class="{ 'animate-fade-in-up': isVisible }"
          style="transition-delay: 200ms;"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-2xl"></div>
          
          <!-- Icon -->
          <div class="relative z-10 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
              Performance-first Mindset
            </h3>
            <p class="text-gray-300 leading-relaxed">
              Every click, lead, and conversion is measured and optimized. We don't just track performance — we drive it.
            </p>
          </div>
        </div>

        <!-- Global traffic coverage -->
        <div 
          class="group relative p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-orange-500/20 shadow-xl hover:shadow-2xl hover:border-orange-400/40 transition-all duration-500 opacity-0 transform translate-y-8"
          :class="{ 'animate-fade-in-up': isVisible }"
          style="transition-delay: 400ms;"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-2xl"></div>
          
          <!-- Icon -->
          <div class="relative z-10 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
              Global Traffic Coverage
            </h3>
            <p class="text-gray-300 leading-relaxed">
              We connect advertisers with top-tier publishers across the US, LATAM, APAC, and EU. Your reach is limitless.
            </p>
          </div>
        </div>

        <!-- Advanced tracking ecosystem -->
        <div 
          class="group relative p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-orange-500/20 shadow-xl hover:shadow-2xl hover:border-orange-400/40 transition-all duration-500 opacity-0 transform translate-y-8"
          :class="{ 'animate-fade-in-up': isVisible }"
          style="transition-delay: 600ms;"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-2xl"></div>
          
          <!-- Icon -->
          <div class="relative z-10 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
              Advanced Tracking Ecosystem
            </h3>
            <p class="text-gray-300 leading-relaxed">
              Transparent data. Clean attribution. Fraud protection. Your campaigns are protected at every level.
            </p>
          </div>
        </div>

        <!-- Real partnership -->
        <div 
          class="group relative p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm border border-orange-500/20 shadow-xl hover:shadow-2xl hover:border-orange-400/40 transition-all duration-500 opacity-0 transform translate-y-8"
          :class="{ 'animate-fade-in-up': isVisible }"
          style="transition-delay: 800ms;"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-2xl"></div>
          
          <!-- Icon -->
          <div class="relative z-10 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
              Real Partnership
            </h3>
            <p class="text-gray-300 leading-relaxed">
              We treat every advertiser and publisher like a strategic ally — not just an account. Your success is our mission.
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div 
        class="text-center mt-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        :class="{ 'animate-fade-in-up': isVisible }"
        style="transition-delay: 1000ms;"
      >
        <div class="inline-flex flex-col sm:flex-row gap-6">
          <NuxtLink 
            to="/advertisers" 
            class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="relative z-10">For Advertisers</span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </NuxtLink>
          
          <NuxtLink 
            to="/publishers" 
            class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="relative z-10">For Publishers</span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </NuxtLink>
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