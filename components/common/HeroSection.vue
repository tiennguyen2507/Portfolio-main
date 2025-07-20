<template>
  <section class="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
    <!-- Background with hero image -->
    <div class="fixed inset-0" style="z-index: -1;">
      <img 
        :src="backgroundImage" 
        alt="Hero Background" 
        class="w-full h-full object-cover"
      />
      <!-- Dark overlay for better text readability -->
      <div :class="`absolute inset-0 bg-black/${theme.overlayOpacity}`"></div>
    </div>
    
    <!-- Overlay to hide background after hero section -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" style="z-index: 1;"></div>
    
    <!-- Hero Content -->
    <div class="relative z-10 max-w-7xl w-[100%] mx-auto px-8 mb-16">
      <div :class="`text-left max-w-4xl ${theme?.classWidth}`">
        <h1 :class="`text-4xl md:text-5xl lg:text-6xl font-bold mb-8 mt-16 ${theme?.class}`">
          <span :class="`text-${theme.textColor} block text-2xl md:text-2xl lg:text-3xl font-medium mb-2`">
            {{ title }}
          </span>
          <span :class="`text-${theme.textColor} block leading-tight`">
            {{ subtitle }}
          </span>
        </h1>
        
        <div class="space-y-6 mb-12">
          <p :class="`text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed`">
            {{ description }}
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 items-start">
          <!-- Primary Button -->
          <NuxtLink 
            :to="primaryButton.link"
            :class="`group relative inline-block bg-gradient-to-r from-${theme.primaryColor}-500 to-${theme.primaryColor}-600 text-white px-10 py-5 rounded-xl text-lg font-semibold hover:from-${theme.primaryColor}-600 hover:to-${theme.primaryColor}-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-${theme.primaryColor}-500/25`"
          >
            <div :class="`absolute inset-0 bg-gradient-to-r from-${theme.primaryColor}-400/20 to-${theme.primaryColor}-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`"></div>
            <span class="relative z-10">{{ primaryButton.text }}</span>
          </NuxtLink>
          
          <!-- Secondary Button -->
          <NuxtLink 
            v-if="secondaryButton"
            :to="secondaryButton?.link"
            class="group relative inline-block bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span class="relative z-10">{{ secondaryButton?.text }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script setup>
// Define props
const props = defineProps({
  title: {
    type: String,
    default: 'Welcome'
  },
  subtitle: {
    type: String,
    default: 'Your Subtitle Here'
  },
  description: {
    type: String,
    default: 'Your description here'
  },
  primaryButton: {
    type: Object,
    default: () => ({
      text: 'Get Started',
      link: '/'
    })
  },
  secondaryButton: {
    type: Object,
    default: () => (null)
  },
  backgroundImage: {
    type: String,
    default: '/images/hero-background.webp'
  },
  theme: {
    type: Object,
    default: () => ({
      primaryColor: 'blue',
      textColor: 'white',
      overlayOpacity: 50
    })
  }
})

// Destructure props for easier use
const { title, subtitle, description, primaryButton, secondaryButton, backgroundImage, theme } = props
</script>

<style scoped>
/* Hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style> 