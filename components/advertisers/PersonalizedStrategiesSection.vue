<template>
  <section class="py-20" :class="backgroundClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Image -->
        <div class="relative order-2 lg:order-1">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              :src="image.src" 
              :alt="image.alt" 
              class="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <!-- Floating achievement card -->
          <div v-if="achievementCard" class="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-black">{{ achievementCard.title }}</div>
                <div class="text-sm text-gray-600">{{ achievementCard.subtitle }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Side - Text Content -->
        <div class="space-y-6 order-1 lg:order-2">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span :class="titleFirstColor">{{ titleFirst }}</span>
            <br>
            <span :class="titleSecondColor">{{ titleSecond }}</span>
          </h2>
          
          <p class="text-lg md:text-xl leading-relaxed" :class="descriptionColor">
            {{ description }}
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div v-for="feature in features" :key="feature.title" class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-black">{{ feature.title }}</h3>
                <p class="text-gray-600 text-sm">{{ feature.description }}</p>
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
    default: 'bg-gray-50'
  },
  
  // Title
  titleFirst: {
    type: String,
    default: 'PERSONALIZED STRATEGIES FOR'
  },
  titleFirstColor: {
    type: String,
    default: 'text-black'
  },
  titleSecond: {
    type: String,
    default: 'OPTIMAL PERFORMANCE'
  },
  titleSecondColor: {
    type: String,
    default: 'text-orange-500'
  },
  
  // Description
  description: {
    type: String,
    default: 'Our priority is to foster a fair and efficient marketplace that supports advertisers and publishers in achieving their revenue goals and business objectives. Through relentless innovation focused on shared growth and prosperity, LeadsWise proudly stands as one of Singapore\'s leading performance marketing networks.'
  },
  descriptionColor: {
    type: String,
    default: 'text-gray-700'
  },
  
  // Image
  image: {
    type: Object,
    default: () => ({
      src: '/images/adv2.webp',
      alt: 'Team Collaboration - Four people celebrating success'
    })
  },
  
  // Achievement Card (optional)
  achievementCard: {
    type: Object,
    default: () => ({
      title: 'Award-Winning',
      subtitle: 'Performance Network'
    })
  },
  
  // Features
  features: {
    type: Array,
    default: () => [
      {
        title: 'Innovation Focus',
        description: 'Cutting-edge marketing solutions'
      },
      {
        title: 'Shared Growth',
        description: 'Mutual success partnerships'
      },
      {
        title: 'Fair Marketplace',
        description: 'Transparent and ethical practices'
      },
      {
        title: 'Leading Network',
        description: 'Singapore\'s top performance network'
      }
    ]
  }
})
</script>

<style scoped>
/* Custom styles for the section */
</style> 