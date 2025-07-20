<template>
  <section class="relative overflow-hidden min-h-[600px] flex items-center" :class="{ 'bg-black': isBack }">
    <!-- Background with global growth image -->
    <div v-if="!isBack" class="absolute inset-0">
      <img 
        :src="backgroundImage.src" 
        :alt="backgroundImage.alt" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0" :class="overlayClass"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Column - Main Heading -->
        <div class="text-left">
          <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span :class="titleFirstColor" class="block mb-2">{{ titleFirst }}</span>
            <span :class="titleSecondColor" class="block mb-2 hover:text-orange-600 transition-colors duration-300 hover:drop-shadow-lg hover:drop-shadow-orange-500/50">{{ titleSecond }}</span>
            <span :class="titleThirdColor" class="block hover:text-orange-600 transition-colors duration-300 hover:drop-shadow-lg hover:drop-shadow-orange-500/50">{{ titleThird }}</span>
          </h2>
        </div>
        
        <!-- Right Column - Content and CTA -->
        <div class="space-y-8">
          <p class="text-lg md:text-xl leading-relaxed" :class="descriptionColor">
            {{ description }}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pb-2">
            <NuxtLink 
              :to="primaryButton.link"
              class="group relative inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-orange-500/25"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative z-10">{{ primaryButton.text }}</span>
            </NuxtLink>
            
            <NuxtLink 
              :to="secondaryButton.link"
              class="group relative inline-flex items-center px-8 py-4 bg-gray-800/80 text-white border border-gray-600 rounded-xl font-semibold hover:bg-gray-700/80 hover:border-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ secondaryButton.text }}</span>
            </NuxtLink>
          </div>
        </div>
        
      </div>
      
      <!-- Floating Stats Cards -->
      <div v-if="statsCards" class="absolute bottom-[10%] right-[-40px] transform -translate-y-1/2 hidden lg:block">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-500 mb-2 hover:text-orange-600 transition-colors duration-300">{{ statsCards.countries.value }}</div>
            <div class="text-sm text-gray-300">{{ statsCards.countries.label }}</div>
          </div>
        </div>
      </div>
      
      <div v-if="statsCards" class="absolute top-[-18%] left-8 transform translate-y-1/2 hidden lg:block">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-500 mb-2 hover:text-orange-600 transition-colors duration-300">{{ statsCards.clicks.value }}</div>
            <div class="text-sm text-gray-300">{{ statsCards.clicks.label }}</div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  isBack: {
    type: Boolean,
    default: false
  },
  
  // Title
  titleFirst: {
    type: String,
    default: 'ASSURED'
  },
  titleFirstColor: {
    type: String,
    default: 'text-white'
  },
  titleSecond: {
    type: String,
    default: 'WORLDWIDE'
  },
  titleSecondColor: {
    type: String,
    default: 'text-orange-500'
  },
  titleThird: {
    type: String,
    default: 'GROWTH'
  },
  titleThirdColor: {
    type: String,
    default: 'text-orange-500'
  },
  
  // Description
  description: {
    type: String,
    default: 'As an advertiser, you play a crucial role in our mission. Whether you\'re an established brand, a growing business, or a startup looking to expand your reach, our platform is designed to provide you with seamless access to diverse traffic sources and high-performing publishers. By joining our network, you\'ll gain access to targeted audiences that can help you maximize your ROI and achieve sustainable growth. Together, let\'s achieve worldwide success!'
  },
  descriptionColor: {
    type: String,
    default: 'text-gray-200'
  },
  
  // Buttons
  primaryButton: {
    type: Object,
    default: () => ({
      text: 'BECOME AN ADVERTISER',
      link: '/login'
    })
  },
  secondaryButton: {
    type: Object,
    default: () => ({
      text: 'ADVERTISER ACCESS',
      link: '/contact'
    })
  },
  
  // Background Image
  backgroundImage: {
    type: Object,
    default: () => ({
      src: '/images/globalgrowth.webp',
      alt: 'Global Growth Background'
    })
  },
  
  // Overlay
  overlayClass: {
    type: String,
    default: 'bg-black/70'
  },
  
  // Stats Cards (optional)
  statsCards: {
    type: Object,
    default: () => ({
      countries: {
        value: '50+',
        label: 'Countries'
      },
      clicks: {
        value: '1M+',
        label: 'Daily Clicks'
      }
    })
  }
})
</script>

<style scoped>
/* Custom glow effects */
.text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
}

/* Floating animation for stats cards */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.absolute {
  animation: float 6s ease-in-out infinite;
}

.absolute:nth-child(2) {
  animation-delay: 2s;
}
</style> 