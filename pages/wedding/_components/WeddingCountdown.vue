<template>
  <div class="flex justify-center gap-4 md:gap-8">
    <div v-for="(value, key) in timeLeft" :key="key" class="text-center">
      <div
        class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]"
      >
        <div class="text-3xl md:text-5xl font-light mb-1">
          {{ value }}
        </div>
        <div class="text-xs md:text-sm uppercase tracking-wide opacity-90">
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
