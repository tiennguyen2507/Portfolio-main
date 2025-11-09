<template>
  <section class="py-20 md:py-32 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-4">
          Khoảnh Khắc
        </h2>
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-16 bg-gray-700"></div>
          <span class="text-2xl">📸</span>
          <div class="h-px w-16 bg-gray-700"></div>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in config.gallery"
          :key="index"
          class="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
          @click="openLightbox(index)"
        >
          <img
            :src="image"
            :alt="`Wedding photo ${index + 1}`"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
          ></div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <button
        class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
        @click="closeLightbox"
      >
        &times;
      </button>
      <button
        v-if="currentImageIndex > 0"
        class="absolute left-4 text-white text-4xl hover:text-gray-300"
        @click.stop="previousImage"
      >
        ‹
      </button>
      <button
        v-if="currentImageIndex < config.gallery.length - 1"
        class="absolute right-4 text-white text-4xl hover:text-gray-300"
        @click.stop="nextImage"
      >
        ›
      </button>
      <img
        :src="config.gallery[currentImageIndex]"
        alt="Gallery image"
        class="max-w-full max-h-full object-contain"
        @click.stop
      />
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { weddingConfig } from '../config.js'

  const config = weddingConfig
  const lightboxOpen = ref(false)
  const currentImageIndex = ref(0)

  const openLightbox = index => {
    currentImageIndex.value = index
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    lightboxOpen.value = false
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    if (currentImageIndex.value < config.gallery.length - 1) {
      currentImageIndex.value++
    }
  }

  const previousImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--
    }
  }

  // Close on ESC key
  const handleKeydown = e => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      previousImage()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })
</script>
