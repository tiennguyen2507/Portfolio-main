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
      v-for="icon in iconPaths"
      :key="icon.name"
      v-show="name === icon.name"
      stroke-linecap="round"
      stroke-linejoin="round"
      :d="icon.path"
    />
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

  // Mảng chứa tất cả icon paths
  const iconPaths = [
    {
      name: 'plus',
      path: 'M12 6v12M6 12h12',
    },
    {
      name: 'edit',
      path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
    {
      name: 'delete',
      path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    },
  ]

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
