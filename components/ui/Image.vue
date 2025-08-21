<template>
  <ClientOnly>
    <img
      :src="currentSrc"
      :alt="alt"
      :class="customClass"
      :loading="loading"
      :fetchpriority="fetchpriority"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <template #fallback>
      <img
        :src="props.src"
        :alt="alt"
        :class="customClass"
        :loading="loading"
        :fetchpriority="fetchpriority"
      />
    </template>
  </ClientOnly>
</template>

<script setup>
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Image',
    },
    customClass: {
      type: String,
      default: '',
    },
    loading: {
      type: String,
      default: 'lazy',
    },
    fetchpriority: {
      type: String,
      default: 'auto',
    },
  })

  const emit = defineEmits(['error', 'load'])

  // Import ảnh mặc định
  import defaultImage from '~/assets/images/image-default.webp'

  const currentSrc = ref(props.src)
  const hasError = ref(false)
  const isProxyUsed = ref(false)

  const handleImageError = () => {
    console.log('Image error:', props.src)
    if (!hasError.value) {
      // Lần đầu lỗi, thử dùng proxy
      hasError.value = true
      isProxyUsed.value = true
      const proxyUrl = `https://blog-data.up.railway.app/image/proxy-image?url=${encodeURIComponent(props.src)}`
      console.log('Trying proxy:', proxyUrl)
      currentSrc.value = proxyUrl
      emit('error', { originalSrc: props.src, proxyUrl })
    } else if (isProxyUsed.value) {
      // Proxy cũng lỗi, dùng ảnh mặc định
      console.log('Using default image:', defaultImage)
      currentSrc.value = defaultImage
      emit('error', { originalSrc: props.src, fallbackToDefault: true })
    }
  }

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentSrc.value)
    emit('load', { src: currentSrc.value })
  }

  // Reset khi src thay đổi
  watch(
    () => props.src,
    newSrc => {
      currentSrc.value = newSrc
      hasError.value = false
      isProxyUsed.value = false
    }
  )
</script>
