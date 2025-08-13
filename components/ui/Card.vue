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
    const baseClasses = 'rounded-lg transition-all duration-300'

    const variantClasses = {
      default: 'bg-gray-800 border border-gray-700',
      elevated: 'bg-gray-800 shadow-lg border border-gray-700',
      outlined: 'bg-transparent border-2 border-gray-700',
    }

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const hoverClass = props.hover
      ? 'hover:transform hover:scale-105 hover:shadow-xl'
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
    @apply border-b border-gray-700 pb-4 mb-4;
  }

  .card-body {
    @apply space-y-4;
  }

  .card-footer {
    @apply border-t border-gray-700 pt-4 mt-4;
  }
</style>
