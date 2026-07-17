<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'elevated', 'outlined'].includes(value),
    },
    padding: {
      type: String,
      default: 'md',
      validator: value => ['none', 'sm', 'md', 'lg'].includes(value),
    },
    hover: {
      type: Boolean,
      default: false,
    },
  })

  const cardClasses = computed(() => {
    const baseClasses =
      'rounded-xl border transition-all duration-300 bg-white text-gray-900 ' +
      'dark:bg-gray-900 dark:text-white shadow-sm'

    const variantClasses = {
      default:
        'border-gray-200 dark:border-gray-800',
      elevated:
        'border-gray-200 dark:border-gray-800 shadow-lg shadow-black/5 dark:shadow-black/40',
      outlined:
        'bg-transparent border border-gray-300 dark:border-gray-700',
    }

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const hoverClass = props.hover
      ? 'hover:-translate-y-0.5 hover:shadow-lg hover:border-orange-500/60 dark:hover:border-orange-400/60'
      : ''

    return [
      baseClasses,
      variantClasses[props.variant],
      paddingClasses[props.padding],
      hoverClass,
    ].join(' ')
  })
</script>

<style scoped>
  .card-header {
    @apply border-b border-gray-200 dark:border-gray-800 pb-4 mb-4;
  }

  .card-body {
    @apply space-y-4;
  }

  .card-footer {
    @apply border-t border-gray-200 dark:border-gray-800 pt-4 mt-4;
  }
</style>
