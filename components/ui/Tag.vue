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
          'default',
        ].includes(v),
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    pill: { type: Boolean, default: true },
    color: { type: String, default: '' }, // custom background color
    textColor: { type: String, default: '' }, // optional custom text color
    tagClass: { type: [String, Array, Object], default: '' },
  })

  const slots = useSlots()

  const sizeMap = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm',
  }

  const variantMap = {
    default:
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 border border-gray-200/70 dark:border-gray-700',
    primary:
      'bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-500/20',
    secondary:
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 border border-gray-200/70 dark:border-gray-700',
    success:
      'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border border-green-500/30',
    danger:
      'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-500/30',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-500/30',
    info:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-500/30',
    gray:
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300/60 dark:border-gray-700',
  }

  const base =
    'inline-flex items-center font-medium select-none align-middle transition-colors'

  const shapeClass = computed(() => (props.pill ? 'rounded-full' : 'rounded-md'))

  const styleObject = computed(() => {
    if (!props.color) return {}
    const style = { backgroundColor: props.color }
    style.color = props.textColor || '#fff'
    return style
  })

  const variantClass = computed(() =>
    props.color ? '' : variantMap[props.variant] || variantMap.default
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


