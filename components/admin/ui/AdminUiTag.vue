<template>
  <span :class="tagClasses" :style="styleObject" role="status">
    <span v-if="slots.prefix" class="mr-1 inline-flex items-center">
      <slot name="prefix" />
    </span>
    <slot />
    <span v-if="slots.suffix" class="ml-1 inline-flex items-center">
      <slot name="suffix" />
    </span>
  </span>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: v =>
        [
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'gray',
        ].includes(v),
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    pill: { type: Boolean, default: true },
    color: { type: String, default: '' }, // custom background color (e.g. '#ff6600' or 'rgb(255,0,0)')
    textColor: { type: String, default: '' }, // optional custom text color (e.g. '#fff')
    tagClass: { type: [String, Array, Object], default: '' },
  })

  const slots = useSlots()

  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3.5 py-1.5 text-sm',
  }

  // primary is TURQUOISE (#28bdbf), secondary is ORANGE (aligned with AdminUiButton/Input/Select)
  const variantMap = {
    primary: 'bg-[#b3e5e7] text-[#0d7377]',
    secondary: 'bg-orange-100 text-orange-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    gray: 'bg-gray-100 text-gray-800',
  }

  const base = 'inline-flex items-center font-medium select-none'

  const shapeClass = computed(() => (props.pill ? 'rounded-full' : 'rounded'))

  const styleObject = computed(() => {
    if (!props.color) return {}
    const style = { backgroundColor: props.color }
    if (props.textColor) {
      style.color = props.textColor
    } else {
      style.color = '#fff'
    }
    return style
  })

  const variantClass = computed(() =>
    props.color ? '' : variantMap[props.variant]
  )

  const tagClasses = computed(() =>
    [
      base,
      sizeMap[props.size],
      shapeClass.value,
      variantClass.value,
      props.tagClass,
    ]
      .filter(Boolean)
      .join(' ')
  )
</script>
