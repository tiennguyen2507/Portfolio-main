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
      name: 'add',
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
    {
      name: 'dashboard',
      path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z',
    },
    {
      name: 'users',
      path: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    },
    {
      name: 'contacts',
      path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
    {
      name: 'blogs',
      path: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    },
    {
      name: 'projects',
      path: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    },
    {
      name: 'comments',
      path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
      name: 'shop',
      path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    },
    {
      name: 'reports',
      path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      name: 'settings',
      path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      name: 'chevron-down',
      path: 'M19 9l-7 7-7-7',
    },
    {
      name: 'user',
      path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      name: 'logout',
      path: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    },
    {
      name: 'refresh',
      path: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },
    {
      name: 'eye',
      path: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    },
    {
      name: 'sun',
      path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      name: 'moon',
      path: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    },
    {
      name: 'menu',
      path: 'M4 6h16M4 12h16M4 18h16',
    },
    {
      name: 'home',
      path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      name: 'search',
      path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    },
    {
      name: 'close',
      path: 'M6 18L18 6M6 6l12 12',
    },
    {
      name: 'chevron-left',
      path: 'M15 19l-7-7 7-7',
    },
    {
      name: 'chevron-right',
      path: 'M9 5l7 7-7 7',
    },
    {
      name: 'chevron-up',
      path: 'M5 15l7-7 7 7',
    },
    {
      name: 'arrow-left',
      path: 'M10 19l-7-7m0 0l7-7m-7 7h18',
    },
    {
      name: 'arrow-right',
      path: 'M14 5l7 7m0 0l-7 7m7-7H3',
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

