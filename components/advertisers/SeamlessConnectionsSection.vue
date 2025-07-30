<template>
  <section class="py-20" :class="backgroundClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Text Content -->
        <div class="space-y-6">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold uppercase">
            <span :class="titleFirstColor">{{ titleFirst }}</span>
            <br>
            <span :class="titleSecondColor">{{ titleSecond }}</span>
          </h2>
          
          <p class="text-lg md:text-xl leading-relaxed" :class="descriptionColor">
            {{ description }}
          </p>
        </div>
        
        <!-- Right Side - Image -->
        <div class="relative">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              :src="image.src" 
              :alt="image.alt" 
              class="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <!-- Floating stats card -->
          <div v-if="statsCard" class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-black">{{ statsCard.value }}</div>
                <div class="text-sm text-gray-600">{{ statsCard.label }}</div>
              </div>
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
    default: 'bg-white'
  },
  
  // Title
  titleFirst: {
    type: String,
    default: 'SEAMLESS CONNECTIONS'
  },
  titleFirstColor: {
    type: String,
    default: 'text-black'
  },
  titleSecond: {
    type: String,
    default: 'POWERFUL RESULTS'
  },
  titleSecondColor: {
    type: String,
    default: 'text-orange-500'
  },
  
  // Description
  description: {
    type: String,
    default: 'For advertisers, we provide seamless connections to diverse traffic sources, allowing you to widely promote your products to consumers through different advertising formats and achieve your desired ROI.'
  },
  descriptionColor: {
    type: String,
    default: 'text-gray-700'
  },
  
  // Image
  image: {
    type: Object,
    default: () => ({
      src: '/images/adv1.webp',
      alt: 'Business Partnership - Two people shaking hands'
    })
  },
  
  // Stats Card (optional)
  statsCard: {
    type: Object,
    default: () => ({
      value: '+150%',
      label: 'Average ROI'
    })
  }
})
</script>

<style scoped>
/* Custom styles for the section */
</style> 