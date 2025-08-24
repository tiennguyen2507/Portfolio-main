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
  import { ref } from 'vue'
  import httpRequest from '~/utils/httpRequest'

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

  const handleImageError = async () => {
    console.log('Image error:', props.src)
    if (!hasError.value) {
      // Lần đầu lỗi, thử dùng proxy với POST request
      hasError.value = true
      isProxyUsed.value = true

      try {
        // Encode URL thành base64
        const encodedUrl = btoa(props.src)
        console.log('Trying proxy with encoded URL:', encodedUrl)

        // Sử dụng httpRequest để gọi API
        const response = await httpRequest.post('/image/proxy-image-encoded', {
          encodedUrl: encodedUrl,
        })

        // Nếu thành công, sử dụng response data làm src
        if (response && response.url) {
          currentSrc.value = response.url
          emit('error', { originalSrc: props.src, proxyUrl: response.url })
        } else {
          throw new Error('Invalid response from proxy')
        }
      } catch (error) {
        console.error('Proxy request failed:', error)
        // Proxy cũng lỗi, dùng ảnh mặc định
        console.log('Using default image:', defaultImage)
        currentSrc.value = defaultImage
        emit('error', { originalSrc: props.src, fallbackToDefault: true })
      }
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
