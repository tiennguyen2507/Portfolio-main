<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: value =>
        [
          'primary',
          'secondary',
          'success',
          'danger',
          'outline',
          'ghost',
          'heroOutline',
        ].includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['click'])

  const buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center text-center font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    }

    const variantClasses = {
      primary:
        'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500 dark:bg-orange-500 dark:hover:bg-orange-400',
      secondary:
        'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700',
      success:
        'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-500',
      danger:
        'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500',
      outline:
        'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500',
      heroOutline:
        'border-2 border-black bg-transparent hover:bg-black focus:ring-black dark:border-white dark:hover:bg-white',
      ghost: 'text-orange-500 hover:bg-orange-500/10 focus:ring-orange-500',
    }

    const widthClass = props.fullWidth ? 'w-full' : ''
    const loadingClass = props.loading ? 'cursor-not-allowed' : ''

    return [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      widthClass,
      loadingClass,
    ].join(' ')
  })
</script>
