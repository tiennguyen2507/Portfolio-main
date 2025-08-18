<template>
  <svg
    :viewBox="viewBox"
    fill="none"
    :stroke-width="strokeWidth"
    stroke="currentColor"
    :class="['inline-block align-middle', sizeClass, colorClass, iconClass]"
    :style="styleObject"
    aria-hidden="true"
  >
    <path
      v-if="name === 'plus'"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 6v12M6 12h12"
    />
    <!-- Có thể mở rộng thêm các icon khác ở đây -->
  </svg>
</template>

<script setup>
  const props = defineProps({
    name: { type: String, required: true },
    size: { type: [String, Number], default: 'md' }, // 'sm' | 'md' | 'lg' | number(px)
    color: { type: String, default: '' }, // Tailwind class (e.g., 'text-white') hoặc mã màu '#fff'
    strokeWidth: { type: [Number, String], default: 1.5 },
    viewBox: { type: String, default: '0 0 24 24' },
    iconClass: { type: [String, Array, Object], default: '' },
  })

  const sizeClass = computed(() => {
    if (typeof props.size === 'number') return ''
    const map = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }
    return map[props.size] || 'w-5 h-5'
  })

  const colorClass = computed(() => {
    return props.color &&
      !props.color.startsWith('#') &&
      !props.color.startsWith('rgb')
      ? props.color
      : ''
  })

  const styleObject = computed(() => {
    const styles = {}
    if (typeof props.size === 'number') {
      styles.width = `${props.size}px`
      styles.height = `${props.size}px`
    }
    if (
      props.color &&
      (props.color.startsWith('#') || props.color.startsWith('rgb'))
    ) {
      styles.color = props.color
    }
    return styles
  })
</script>
