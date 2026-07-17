<template>
  <!-- Overlay chat: cố định dưới màn hình, không che toàn bộ click (dùng pointer-events) -->
  <div class="fixed inset-x-0 bottom-0 z-30 pointer-events-none">
    <div
      class="mx-auto max-w-[700px] px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-auto"
    >
      <!-- Danh sách lời chúc dạng bong bóng -->
      <transition-group
        name="wish-fade"
        tag="div"
        class="flex flex-col items-start gap-1 sm:gap-1.5 mb-2 max-h-[220px] overflow-hidden"
      >
        <div
          v-for="wish in visibleWishes"
          :key="wish.id"
          class="flex justify-start"
        >
          <div
            class="inline-flex items-center max-w-full rounded-full bg-white/15 px-2 sm:px-3 py-0.5 text-[10px] sm:text-[12px] text-[#e9ce9e] font-baskerville overflow-hidden"
          >
            <span class="font-semibold mr-1 shrink-0">
              {{ (wish.name || 'Khách') + ':' }}
            </span>
            <span class="font-normal truncate min-w-0">
              {{ wish.message }}
            </span>
          </div>
        </div>
      </transition-group>

      <!-- Thanh nhập lời chúc -->
      <form
        class="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/40 border border-[#e9ce9e]/40 px-2 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm shadow-lg"
        @submit.prevent="handleSubmit"
      >
        <input
          v-model="name"
          type="text"
          placeholder="Tên bạn"
          class="hidden sm:block w-[100px] bg-transparent text-[11px] sm:text-[12px] text-[#e9ce9e] placeholder-[#e9ce9e]/50 focus:outline-none"
        />
        <input
          v-model="message"
          type="text"
          required
          maxlength="160"
          placeholder="Để lại lời chúc..."
          class="flex-1 bg-transparent text-[12px] sm:text-[14px] text-[#e9ce9e] placeholder-[#e9ce9e]/60 focus:outline-none"
        />
        <button
          type="submit"
          :disabled="!message.trim()"
          :aria-label="message.trim() ? 'Gửi lời chúc' : 'Nhập lời chúc để gửi'"
          class="shrink-0 flex items-center justify-center rounded-full bg-[#e9ce9e] text-[#553f18] w-8 h-8 sm:w-9 sm:h-9 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
          >
            <path
              d="M5 12L4 5l16-3-3 16-7-1-3.5 3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const INITIAL_DATA = [
    {
      id: 'seed-1',
      name: 'VC ANH TRÍ',
      message: 'Chúc mừng vợ chồng em nha ❤️❤️❤️',
    },
    {
      id: 'seed-2',
      name: 'VC ANH PHÚ',
      message: 'Chúc mừng em trai, trăm năm hạnh phúc nhé!',
    },
    {
      id: 'seed-3',
      name: 'Bạn Hoà',
      message:
        'Chúc hai bạn mãi mãi hạnh phúc, luôn nắm tay nhau đi hết con đường.',
    },
    {
      id: 'seed-4',
      name: 'VC BẠN NHẬT',
      message: 'Welcome to the club! Chúc hai bạn sớm có baby nha 🍼',
    },
    {
      id: 'seed-5',
      name: 'Bạn Trung',
      message: 'Chúc vợ chồng bạn trăm năm hạnh phúc, luôn yêu thương nhau.',
    },
    {
      id: 'seed-6',
      name: 'Đồng Nghiệp',
      message: 'Chúc hai bạn xây dựng tổ ấm thật nhiều tiếng cười!',
    },
  ]

  const MAX_VISIBLE = 2
  const allWishes = ref([...INITIAL_DATA])
  const visibleWishes = ref(allWishes.value.slice(0, MAX_VISIBLE))
  const currentIndex = ref(MAX_VISIBLE)

  const name = ref('')
  const message = ref('')

  let timerId

  const pushVisible = wish => {
    // Thêm lời chúc mới lên trên, giữ tối đa MAX_VISIBLE
    visibleWishes.value.unshift(wish)
    if (visibleWishes.value.length > MAX_VISIBLE) {
      visibleWishes.value.pop()
    }
  }

  const showNextFromPool = () => {
    if (!allWishes.value.length) return
    const idx = currentIndex.value % allWishes.value.length
    currentIndex.value += 1
    const next = allWishes.value[idx]
    pushVisible(next)
  }

  const handleSubmit = () => {
    const text = message.value.trim()
    if (!text) return
    const displayName = (name.value || '').trim() || 'Khách'
    const wish = {
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: displayName,
      message: text,
    }
    allWishes.value.push(wish)
    pushVisible(wish)
    message.value = ''
  }

  onMounted(() => {
    timerId = window.setInterval(showNextFromPool, 5000)
  })

  onBeforeUnmount(() => {
    if (timerId) window.clearInterval(timerId)
  })
</script>

<style scoped>
  .wish-fade-enter-active,
  .wish-fade-leave-active {
    transition:
      opacity 0.35s ease,
      transform 0.35s ease;
  }
  .wish-fade-enter-from,
  .wish-fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
  }
</style>
