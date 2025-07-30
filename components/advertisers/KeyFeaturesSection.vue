<template>
  <section class="py-20" :class="backgroundClass">
    <div class="max-w-7xl mx-auto px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-black to-orange-600 bg-clip-text text-transparent drop-shadow-lg leading-tight py-2">
          {{ title }} <span class="text-black">{{ titleAccent }}</span>
        </h2>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <!-- First 3 items -->
        <div 
          v-for="(feature, index) in features.slice(0, 3)" 
          :key="feature.title"
          class="group text-center"
        >
          <div class="relative mb-8">
            <!-- Icon Container -->
            <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl" :class="feature.iconBgClass">
              <!-- Network Icon - Qualified traffic -->
              <svg v-if="index === 0" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" stroke-width="2"/>
                <circle cx="6" cy="6" r="2" stroke-width="2"/>
                <circle cx="18" cy="6" r="2" stroke-width="2"/>
                <circle cx="6" cy="18" r="2" stroke-width="2"/>
                <circle cx="18" cy="18" r="2" stroke-width="2"/>
                <line x1="6" y1="6" x2="12" y2="12" stroke-width="2"/>
                <line x1="18" y1="6" x2="12" y2="12" stroke-width="2"/>
                <line x1="6" y1="18" x2="12" y2="12" stroke-width="2"/>
                <line x1="18" y1="18" x2="12" y2="12" stroke-width="2"/>
              </svg>
              
              <!-- Target Icon - Advanced targeting -->
              <svg v-else-if="index === 1" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <circle cx="12" cy="12" r="6" stroke-width="2"/>
                <circle cx="12" cy="12" r="2" stroke-width="2"/>
              </svg>
              
              <!-- Chart Icon - Transparent tracking -->
              <svg v-else-if="index === 2" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement1"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement2"></div>
          </div>
          
          <h3 class="text-xl font-bold mb-4 transition-colors duration-300" :class="[feature.titleColor, feature.titleHoverColor]">
            {{ feature.title }}
          </h3>
          <p class="leading-relaxed text-sm" :class="feature.descriptionColor">
            {{ feature.description }}
          </p>
        </div>

        <!-- Last 2 items - centered -->
        <div class="md:col-span-2 lg:col-span-3 flex justify-center">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
            <div 
              v-for="(feature, index) in features.slice(3, 5)" 
              :key="feature.title"
              class="group text-center"
            >
              <div class="relative mb-8">
                <!-- Icon Container -->
                <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl" :class="feature.iconBgClass">
                  <!-- Shield Icon - Fraud prevention -->
                  <svg v-if="index === 0" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  
                  <!-- Team Icon - Account managers -->
                  <svg v-else-if="index === 1" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                
                <!-- Floating Elements -->
                <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement1"></div>
                <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement2"></div>
              </div>
              
              <h3 class="text-xl font-bold mb-4 transition-colors duration-300" :class="[feature.titleColor, feature.titleHoverColor]">
                {{ feature.title }}
              </h3>
              <p class="leading-relaxed text-sm" :class="feature.descriptionColor">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  // Background
  backgroundClass: {
    type: String,
    default: 'bg-gradient-to-br from-gray-50 to-white'
  },
  
  // Header
  title: {
    type: String,
    default: 'Why Choose'
  },
  titleColor: {
    type: String,
    default: 'text-gray-900'
  },
  titleAccent: {
    type: String,
    default: 'Leadswise'
  },
  titleAccentColor: {
    type: String,
    default: 'text-orange-500'
  },
  subtitle: {
    type: String,
    default: 'Experience the advantages of partnering with Singapore\'s leading performance network'
  },
  subtitleColor: {
    type: String,
    default: 'text-gray-600'
  },
  
  // Features
  features: {
    type: Array,
    default: () => [
      {
        title: 'DIVERSE TRAFFIC TYPES',
        description: 'Access multiple traffic sources including social media, search engines, display networks, and native advertising platforms for maximum reach and performance.',
        iconBgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
        titleColor: 'text-gray-900',
        titleHoverColor: 'group-hover:text-orange-600',
        descriptionColor: 'text-gray-600',
        floatingElement1: 'bg-orange-400',
        floatingElement2: 'bg-yellow-400'
      },
      {
        title: 'VARIOUS VERTICALS',
        description: 'Partner across diverse industries including e-commerce, finance, gaming, health, education, and more to expand your market reach and revenue potential.',
        iconBgClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
        titleColor: 'text-gray-900',
        titleHoverColor: 'group-hover:text-orange-600',
        descriptionColor: 'text-gray-600',
        floatingElement1: 'bg-pink-400',
        floatingElement2: 'bg-blue-400'
      },
      {
        title: 'DEDICATED SUPPORT TEAM',
        description: 'Get personalized assistance from our experienced team of affiliate managers, optimization specialists, and technical support to maximize your campaign success.',
        iconBgClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
        titleColor: 'text-gray-900',
        titleHoverColor: 'group-hover:text-purple-600',
        descriptionColor: 'text-gray-600',
        floatingElement1: 'bg-red-400',
        floatingElement2: 'bg-yellow-400'
      }
    ]
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover .absolute {
  animation: float 2s ease-in-out infinite;
}
</style> 