<template>
  <button
    type="button"
    :class="['button-icon', variantClass, customClass]"
    :style="buttonStyle"
    v-bind="$attrs"
  >
    <span v-if="icon === 'delete'" v-html="deleteIcon" />
    <span v-else-if="icon === 'edit'" v-html="editIcon" />
    <span v-else-if="isSvg(icon)" v-html="icon" />
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    icon: {
      type: [String],
      default: '',
      required: false,
    },
    color: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'solid', // 'solid' by default to match provided UI
      validator: v => ['ghost', 'outline', 'solid'].includes(v),
    },
  })

  const variantClass = computed(() => {
    if (props.variant === 'outline') return 'button-icon--outline'
    if (props.variant === 'ghost') return 'button-icon--ghost'
    return 'button-icon--solid'
  })

  const NAMED_COLORS = {
    red: '#dc2626', // red-600
    blue: '#3b82f6', // blue-500
    green: '#16a34a', // green-600
    yellow: '#f59e0b', // amber-500
    gray: '#6b7280', // gray-500
    slate: '#475569',
    sky: '#0ea5e9',
    orange: '#f97316',
    pink: '#ec4899',
    purple: '#8b5cf6',
  }

  function resolveColor(input) {
    if (!input || typeof input !== 'string') return ''
    const trimmed = input.trim()
    if (trimmed.startsWith('#')) return trimmed
    const lower = trimmed.toLowerCase()
    return NAMED_COLORS[lower] || trimmed
  }

  function parseHex(hex) {
    if (!hex || typeof hex !== 'string') return null
    let value = hex.trim()
    if (!value.startsWith('#')) return null
    value = value.slice(1)
    if (value.length === 3)
      value = value
        .split('')
        .map(c => c + c)
        .join('')
    if (value.length !== 6) return null
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    if ([r, g, b].some(n => Number.isNaN(n))) return null
    return { r, g, b }
  }

  function lightenFromHex(hex, amount = 0.12) {
    const rgb = parseHex(hex)
    if (!rgb) return ''
    const r = Math.round(rgb.r + (255 - rgb.r) * amount)
    const g = Math.round(rgb.g + (255 - rgb.g) * amount)
    const b = Math.round(rgb.b + (255 - rgb.b) * amount)
    return `rgb(${r}, ${g}, ${b})`
  }

  const resolvedColor = computed(() => resolveColor(props.color))

  const computedHoverBg = computed(() => {
    if (props.variant === 'solid') {
      if (resolvedColor.value && resolvedColor.value.startsWith('#')) {
        const lighter = lightenFromHex(resolvedColor.value, 0.12)
        if (lighter) return lighter
      }
      return 'rgba(255,255,255,0.1)'
    }
    if (resolvedColor.value && resolvedColor.value.startsWith('#')) {
      const rgb = parseHex(resolvedColor.value)
      if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`
    }
    return 'rgba(0, 0, 0, 0.05)'
  })

  const buttonStyle = computed(() => {
    const style = {}
    if (props.variant === 'solid') {
      if (resolvedColor.value) style['--bi-bg'] = resolvedColor.value
      style['--bi-fg'] = '#fff'
    } else {
      if (resolvedColor.value) style.color = resolvedColor.value
    }
    style['--bi-hover-bg'] = computedHoverBg.value
    return style
  })

  const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`
  const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`

  function isSvg(str) {
    return typeof str === 'string' && str.trim().startsWith('<svg')
  }
</script>

<style scoped>
  .button-icon {
    --bi-size: 2.25rem; /* 36px */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--bi-size);
    height: var(--bi-size);
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem; /* match screenshot rounded */
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.05s ease;
    color: var(--bi-fg, currentColor);
  }

  /* SOLID */
  .button-icon--solid {
    background: var(--bi-bg, #3b82f6); /* default blue-500 */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }
  .button-icon--solid:hover {
    background: var(--bi-hover-bg, #60a5fa); /* blue-400 */
  }
  .button-icon--solid:active {
    transform: translateY(0.5px);
  }

  /* OUTLINE */
  .button-icon--outline {
    border: 1px solid currentColor;
    background: transparent;
  }
  .button-icon--outline:hover {
    background: var(--bi-hover-bg, rgba(0, 0, 0, 0.05));
  }

  /* GHOST */
  .button-icon--ghost:hover {
    background: var(--bi-hover-bg, rgba(0, 0, 0, 0.05));
  }
</style>
