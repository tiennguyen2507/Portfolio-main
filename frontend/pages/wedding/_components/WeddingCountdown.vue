<template>
  <div class="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6">
    <div v-for="(value, key) in timeLeft" :key="key" class="text-center">
      <div
        class="rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-5 md:py-3 min-w-[52px] sm:min-w-[60px] md:min-w-[90px] border border-[#e9ce9e]/30 bg-[#e9ce9e]/10 backdrop-blur-sm"
      >
        <div
          class="text-xl sm:text-2xl md:text-4xl font-light mb-0.5 text-[#e9ce9e] font-baskerville tabular-nums"
        >
          {{ value }}
        </div>
        <div
          class="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wide text-[#d9bc86] font-baskerville"
        >
          {{ getLabel(key) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    targetDate: {
      type: String,
      required: true,
    },
  })

  const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  let interval = null

  const calculateTimeLeft = () => {
    const target = new Date(props.targetDate).getTime()
    const now = new Date().getTime()
    const difference = target - now

    if (difference > 0) {
      timeLeft.value = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    } else {
      timeLeft.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
  }

  const getLabel = key => {
    const labels = {
      days: 'Ngày',
      hours: 'Giờ',
      minutes: 'Phút',
      seconds: 'Giây',
    }
    return labels[key] || key
  }

  onMounted(() => {
    calculateTimeLeft()
    interval = setInterval(calculateTimeLeft, 1000)
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
</script>
