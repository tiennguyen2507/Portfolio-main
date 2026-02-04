<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: value =>
        ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(
          value
        ),
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value),
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  })

  const badgeClasses = computed(() => {
    const baseClasses = 'inline-flex items-center font-medium'

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    }

    const variantClasses = {
      default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
      primary: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
      success: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
      warning: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
      error: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
      info: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    }

    const roundedClass = props.rounded ? 'rounded-full' : 'rounded-md'

    return [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      roundedClass,
    ].join(' ')
  })
</script>
