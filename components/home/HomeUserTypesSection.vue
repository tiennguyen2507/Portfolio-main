<template>
  <section ref="sectionRef" class="py-20 bg-black text-white relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-500 transform rotate-12 scale-150"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section title -->
      <div 
        class="text-center mb-20 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
        :class="{ 'animate-fade-in-up': isVisible }"
      >
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
          WHERE DO YOU FIT IN
        </h2>
      </div>
      
      <!-- Advertisers Section -->
      <div class="mb-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Advertisers Graphic -->
          <div 
            class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
            :class="{ 'animate-fade-in-up': isVisible }"
          >
            <!-- Central Graphic -->
            <div class="relative mb-12">
              <!-- Main Circle -->
              <div class="relative w-64 h-64 mx-auto">
                <!-- Radiating lines background -->
                <div class="absolute inset-0">
                  <svg class="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Radiating lines -->
                    <g stroke="#fbbf24" stroke-width="2" opacity="0.6">
                      <line x1="128" y1="20" x2="128" y2="40" />
                      <line x1="128" y1="216" x2="128" y2="236" />
                      <line x1="20" y1="128" x2="40" y2="128" />
                      <line x1="216" y1="128" x2="236" y2="128" />
                      <line x1="40" y1="40" x2="60" y2="60" />
                      <line x1="196" y1="196" x2="216" y2="216" />
                      <line x1="40" y1="196" x2="60" y2="216" />
                      <line x1="196" y1="40" x2="216" y2="60" />
                      <line x1="60" y1="20" x2="80" y2="30" />
                      <line x1="176" y1="226" x2="196" y2="236" />
                      <line x1="20" y1="60" x2="30" y2="80" />
                      <line x1="226" y1="176" x2="236" y2="196" />
                    </g>
                  </svg>
                </div>
                
                <!-- Pink border circle -->
                <div class="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-2">
                  <div class="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <div class="text-center">
                      <h3 class="text-2xl font-bold text-yellow-300 leading-tight">
                        ADVERTISERS
                      </h3>
                      <h4 class="text-lg font-semibold text-yellow-300">
                        & AGENCIES
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Background pattern dots -->
              <div class="absolute -top-8 -left-8 w-16 h-16 opacity-20">
                <div class="grid grid-cols-4 gap-1">
                  <div v-for="i in 16" :key="i" class="w-2 h-2 bg-pink-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <!-- Call to Action Button -->
            <NuxtLink 
              to="/advertisers" 
              class="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              LEARN MORE
            </NuxtLink>
          </div>
          
          <!-- Advertisers Content Grid -->
          <div 
            class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300"
            :class="{ 'animate-fade-in-up': isVisible }"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Left Column -->
              <div class="space-y-8">
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Qualified Traffic</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">PERFORMANCE-DRIVEN</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Tap into our curated publisher base — trusted affiliates who deliver real results, not just impressions.
                  </p>
                </div>
                
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-500"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Advanced Targeting</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">REACH YOUR KPIS</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Run smart campaigns with geo, device, and behavioral filters. We optimize in real time to hit your KPIs.
                  </p>
                </div>
                
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Fraud Prevention</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">YOU ARE SAFE</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Every lead is verified. Every source is monitored. We protect your budget with layered fraud defense.
                  </p>
                </div>
              </div>
              
              <!-- Right Column -->
              <div class="space-y-8">
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-500"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Transparent Tracking</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">CLEAN DATA</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    From first click to final conversion — we track everything. You see what we see.
                  </p>
                </div>
                
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Account Managers</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">YOU ARE NOT ALONE</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Our experienced team works alongside you — optimizing, scaling, and solving fast.
                  </p>
                </div>
                
                <div 
                  class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-700"
                  :class="{ 'animate-fade-in-up': isVisible }"
                >
                  <h4 class="text-2xl font-bold text-white mb-2">Risk-Free Models</h4>
                  <p class="text-yellow-300 text-sm font-semibold uppercase tracking-wider mb-3">PERFORMANCE-BASED</p>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Multiple pricing models available: CPA, CPL, CPI, and CPS. All based on actual performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Divider -->
      <div class="flex justify-center mb-20">
        <div class="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      </div>
      
      <!-- Publishers Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Publishers Content Grid -->
        <div 
          class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-400"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-8">
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-500"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Top-converting Offers</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">COMPLETE OFFERWALL</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  Promote offers that actually convert — across verticals like loans, sweepstakes, insurance, and more.
                </p>
              </div>
              
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Fast & Reliable Payouts</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">MULTIPLE METHODS</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  We pay on time. Every time. Weekly, bi-weekly or custom terms available for top partners.
                </p>
              </div>
              
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-700"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Exclusive Tools</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">CUSTOM SCRIPTS</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  Our team helps you test creatives, optimize traffic sources, and scale without the guesswork.
                </p>
              </div>
            </div>
            
            <!-- Right Column -->
            <div class="space-y-8">
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-600"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Real-time Tracking</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">TRANSPARENT DATA</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  Get instant access to performance data via our tracking dashboard — detailed, transparent, and mobile-friendly.
                </p>
              </div>
              
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-700"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Dedicated Support</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">WE ARE HERE TO HELP</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  Our account managers speak multiple languages and are available 24/7 to support your success.
                </p>
              </div>
              
              <div 
                class="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-800"
                :class="{ 'animate-fade-in-up': isVisible }"
              >
                <h4 class="text-2xl font-bold text-white mb-2">Clean Network Reputation</h4>
                <p class="text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-3">COMPLIANCE FIRST</p>
                <p class="text-gray-300 text-sm leading-relaxed">
                  We maintain strict compliance. No scrubbing games. No shady practices.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Publishers Graphic -->
        <div 
          class="text-center opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-500"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <!-- Central Graphic -->
          <div class="relative mb-12">
            <!-- Main Circle -->
            <div class="relative w-64 h-64 mx-auto">
              <!-- Radiating lines background -->
              <div class="absolute inset-0">
                <svg class="w-full h-full" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Radiating lines -->
                  <g stroke="#06b6d4" stroke-width="2" opacity="0.6">
                    <line x1="128" y1="20" x2="128" y2="40" />
                    <line x1="128" y1="216" x2="128" y2="236" />
                    <line x1="20" y1="128" x2="40" y2="128" />
                    <line x1="216" y1="128" x2="236" y2="128" />
                    <line x1="40" y1="40" x2="60" y2="60" />
                    <line x1="196" y1="196" x2="216" y2="216" />
                    <line x1="40" y1="196" x2="60" y2="216" />
                    <line x1="196" y1="40" x2="216" y2="60" />
                    <line x1="60" y1="20" x2="80" y2="30" />
                    <line x1="176" y1="226" x2="196" y2="236" />
                    <line x1="20" y1="60" x2="30" y2="80" />
                    <line x1="226" y1="176" x2="236" y2="196" />
                  </g>
                </svg>
              </div>
              
              <!-- Cyan border circle -->
              <div class="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-2">
                <div class="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div class="text-center">
                    <h3 class="text-2xl font-bold text-cyan-300 leading-tight">
                      AFFILIATES
                    </h3>
                    <h4 class="text-lg font-semibold text-cyan-300">
                      & PUBLISHERS
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Background pattern dots -->
            <div class="absolute -top-8 -right-8 w-16 h-16 opacity-20">
              <div class="grid grid-cols-4 gap-1">
                <div v-for="i in 16" :key="i" class="w-2 h-2 bg-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <!-- Call to Action Button -->
          <NuxtLink 
            to="/publishers" 
            class="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            LEARN MORE
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