<template>
  <section ref="sectionRef" class="py-20" :class="{ 'bg-black': isBlack, 'bg-white': !isBlack }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" :class="{ 'text-white': isBlack, 'text-black': !isBlack }">
          {{ title }}
        </h2>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="text-center relative group"
        >
          <div class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-orange-500 transition-all duration-300 hover:text-orange-600 hover:drop-shadow-lg hover:drop-shadow-orange-500/50">
            <span :ref="el => { if (el) counterRefs[index] = el }">0{{ stat.suffix || '' }}</span>
          </div>
          <div class="text-lg md:text-xl font-medium" :class="{ 'text-gray-300': isBlack, 'text-gray-600': !isBlack }">
            {{ stat.label }}
          </div>
          <!-- Separator line (hidden on mobile and last item) -->
          <div 
            v-if="index < stats.length - 1"
            class="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-16" 
            :class="{ 'bg-gray-600': isBlack, 'bg-gray-300': !isBlack }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  isBlack: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'OUR STATS'
  },
  stats: {
    type: Array,
    default: () => [
      {
        value: '+1.2',
        suffix: 'M',
        label: 'Monthly leads'
      },
      {
        value: 350,
        suffix: '+',
        label: 'Advertisers'
      },
      {
        value: 1500,
        suffix: '+',
        label: 'Publishers'
      },
      {
        value: 600,
        suffix: '+',
        label: 'Live Offers'
      }
    ]
  }
})

const sectionRef = ref(null)
const counterRefs = ref([])
const hasAnimated = ref(false)

// Animation function
const animateCounter = (element, target, suffix = '', duration = 2000) => {
  if (!element) return
  
  let start = 0
  const increment = target / (duration / 16) // 60fps
  
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target + suffix
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + suffix
    }
  }, 16)
}

// Intersection Observer to trigger animation when section is visible
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        
        // Start animations for all stats
        props.stats.forEach((stat, index) => {
          const counterElement = counterRefs.value[index]
          if (counterElement) {
            animateCounter(counterElement, stat.value, stat.suffix || '')
          }
        })
        
        // Stop observing after animation starts
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.3
  })
  
  // Observe the section
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<style scoped>
/* Custom hover effects for stats */
.group:hover .text-orange-500 {
  text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
</style> 