<template>
  <!-- Nút nhạc: cố định góc trên trái, nổi trên mọi thứ -->
  <button
    type="button"
    class="fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#e9ce9e]/60 bg-black/30 text-[#e9ce9e] backdrop-blur-sm shadow-md active:scale-[0.97]"
    :aria-label="isPlaying ? 'Tắt nhạc' : 'Bật nhạc'"
    @click.stop="toggle"
  >
    <!-- Icon khi đang phát -->
    <svg
      v-if="isPlaying"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-5 w-5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    >
      <path
        d="M9 18V6.5l8-2V10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm8-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.5 7.5c1.1.6 1.8 1.8 1.8 3.1 0 1.3-.7 2.5-1.8 3.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Icon khi tắt -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-5 w-5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    >
      <path
        d="M9 18V6.5l8-2V10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 13.5 15.5 16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 13.5 18 16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import musicSrc from '~/assets/music/50_nam_ve_sau.mp3'

  const audio = ref(null)
  const isPlaying = ref(false)

  const play = async () => {
    if (!audio.value) return
    try {
      await audio.value.play()
      isPlaying.value = true
    } catch (e) {
      // Trình duyệt (nhất là iOS) có thể chặn autoplay chưa có interaction
      isPlaying.value = false
    }
  }

  const pause = () => {
    if (!audio.value) return
    audio.value.pause()
    isPlaying.value = false
  }

  const toggle = () => {
    if (isPlaying.value) pause()
    else play()
  }

  onMounted(() => {
    audio.value = new Audio(musicSrc)
    audio.value.loop = true
    audio.value.preload = 'auto'

    // Thử autoplay nhẹ nhàng, nếu bị chặn thì chờ user click icon
    play()
  })

  onBeforeUnmount(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
  })
</script>

<style scoped>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>

