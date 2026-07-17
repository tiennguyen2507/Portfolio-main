<template>
  <section
    class="relative flex flex-col items-center px-4 sm:px-6 md:px-10 pb-10 sm:pb-12 md:pb-16"
  >
    <h2
      class="uppercase font-normal text-[20px] sm:text-[22px] md:text-[26px] text-[#e9ce9e] font-baskerville tracking-[0.05em] mb-4 sm:mb-6"
    >
      Album Ảnh Cưới
    </h2>
    <div class="mt-4 sm:mt-6 w-full max-w-[432px] md:max-w-[600px]">
      <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div
          v-for="(image, index) in displayImages"
          :key="index"
          class="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-white/5"
          @click="openLightbox(index)"
        >
          <img
            :src="image.src"
            :alt="`Ảnh cưới ${index + 1}`"
            class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <div
            v-if="image.isMore"
            class="absolute inset-0 flex items-center justify-center bg-black/55"
          >
            <span class="text-lg font-semibold text-white"
              >+{{ moreCount }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox (SP: nút đủ lớn 44px, ảnh fit viewport) -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-3 sm:p-4 safe-area-padding"
      @click="closeLightbox"
    >
      <button
        class="absolute top-3 right-3 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-2xl sm:text-4xl hover:text-gray-300 z-10 rounded-full hover:bg-white/10"
        aria-label="Đóng"
        @click="closeLightbox"
      >
        &times;
      </button>
      <button
        v-if="currentImageIndex > 0"
        class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-2xl sm:text-4xl hover:text-gray-300 z-10 rounded-full hover:bg-white/10"
        aria-label="Ảnh trước"
        @click.stop="previousImage"
      >
        ‹
      </button>
      <button
        v-if="currentImageIndex < config.gallery.length - 1"
        class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-2xl sm:text-4xl hover:text-gray-300 z-10 rounded-full hover:bg-white/10"
        aria-label="Ảnh sau"
        @click.stop="nextImage"
      >
        ›
      </button>
      <img
        :src="config.gallery[currentImageIndex]"
        alt="Gallery"
        class="max-w-full max-h-[75vh] sm:max-h-[85vh] w-auto object-contain select-none"
        @click.stop
      />
    </div>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { weddingConfig } from '../config.js'

  const config = weddingConfig
  const lightboxOpen = ref(false)
  const currentImageIndex = ref(0)

  const maxShow = 4
  const moreCount = computed(() => Math.max(0, config.gallery.length - maxShow))

  const displayImages = computed(() => {
    const len = Math.min(maxShow, config.gallery.length)
    const list = config.gallery.slice(0, len).map((src, i) => ({
      src,
      isMore: i === len - 1 && config.gallery.length > maxShow,
    }))
    return list
  })

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
    if (currentImageIndex.value < config.gallery.length - 1)
      currentImageIndex.value++
  }

  const previousImage = () => {
    if (currentImageIndex.value > 0) currentImageIndex.value--
  }

  const handleKeydown = e => {
    if (e.key === 'Escape') closeLightbox()
    else if (e.key === 'ArrowRight') nextImage()
    else if (e.key === 'ArrowLeft') previousImage()
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })
</script>
