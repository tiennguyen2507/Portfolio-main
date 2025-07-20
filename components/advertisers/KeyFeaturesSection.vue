<template>
  <section class="py-20" :class="backgroundClass">
    <div class="max-w-7xl mx-auto px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6" :class="titleColor">
          {{ title }} <span :class="titleAccentColor">{{ titleAccent }}</span>
        </h2>
        <p class="text-xl max-w-3xl mx-auto" :class="subtitleColor">
          {{ subtitle }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="group text-center"
        >
          <div class="relative mb-8">
            <!-- Icon Container -->
            <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl" :class="feature.iconBgClass">
              <!-- Network Icon -->
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
              
              <!-- Documents Icon -->
              <svg v-else-if="index === 1" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" transform="translate(2,2)"/>
              </svg>
              
              <!-- Team Icon -->
              <svg v-else-if="index === 2" class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement1"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-80 group-hover:animate-pulse" :class="feature.floatingElement2"></div>
          </div>
          
          <h3 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="[feature.titleColor, feature.titleHoverColor]">
            {{ feature.title }}
          </h3>
          <p class="leading-relaxed" :class="feature.descriptionColor">
            {{ feature.description }}
          </p>
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