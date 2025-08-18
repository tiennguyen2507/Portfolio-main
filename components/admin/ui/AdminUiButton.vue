<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :class="buttonClasses"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <span v-if="slots.prefix" class="mr-2 inline-flex items-center">
      <slot name="prefix" />
    </span>

    <span class="inline-flex items-center">
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <slot />
    </span>

    <span v-if="slots.suffix" class="ml-2 inline-flex items-center">
      <slot name="suffix" />
    </span>
  </button>
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
          'outline',
          'ghost',
        ].includes(v),
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
    buttonClass: { type: [String, Array, Object], default: '' },
  })

  const slots = useSlots()
  const emit = defineEmits(['click', 'focus', 'blur'])

  const buttonClasses = computed(() => {
    const base =
      'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const sizeMap = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    }
    const variantMap = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent',
      secondary:
        'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 border border-transparent',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border border-transparent',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent',
      outline:
        'bg-transparent text-orange-600 hover:bg-orange-50 border-2 border-orange-500 focus:ring-orange-500',
      ghost:
        'bg-transparent text-orange-600 hover:bg-orange-50 focus:ring-orange-400',
    }
    const width = props.fullWidth ? 'w-full' : ''
    const loadingClass = props.loading ? 'cursor-wait' : ''

    return [
      base,
      sizeMap[props.size],
      variantMap[props.variant],
      width,
      loadingClass,
      props.buttonClass,
    ]
      .filter(Boolean)
      .join(' ')
  })
</script>
