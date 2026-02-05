<template>
  <div class="space-y-1">
    <!-- Label -->
    <label
      v-if="label"
      class="flex items-center justify-between"
      :for="id || undefined"
    >
      <Typography
        as="span"
        size="sm"
        weight="medium"
        color="default"
        class="block"
      >
        {{ label }}
      </Typography>
      <Typography
        v-if="required"
        as="span"
        size="xs"
        color="error"
        class="ml-2"
      >
        *
      </Typography>
    </label>

    <!-- Input + Icon -->
    <div class="relative">
      <input
        :id="id || undefined"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />

      <!-- Optional icon slot (right aligned) -->
      <div
        v-if="$slots.icon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="icon" />
      </div>
    </div>

    <!-- Helper / Error text -->
    <Typography
      v-if="error"
      as="p"
      size="xs"
      color="error"
      class="mt-1"
    >
      {{ error }}
    </Typography>
    <Typography
      v-else-if="hint"
      as="p"
      size="xs"
      color="muted"
      class="mt-1"
    >
      {{ hint }}
    </Typography>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'error', 'success'].includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value),
    },
    label: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: undefined,
    },
  })

  defineEmits(['update:modelValue', 'focus', 'blur'])

  const inputClasses = computed(() => {
    const baseClasses =
      'w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400 shadow-sm ' +
      'focus:outline-none focus:ring-2 focus:ring-orange-500/70 focus:border-transparent ' +
      'dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-500'

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    }

    const variantClasses = {
      default:
        'border-gray-300 dark:border-gray-700 focus:ring-orange-500/70 focus:border-orange-500',
      error:
        'border-red-500 text-red-900 placeholder-red-400 ' +
        'focus:border-red-500 focus:ring-red-500/70 ' +
        'dark:border-red-500 dark:text-red-300 dark:placeholder-red-500',
      success:
        'border-green-500 text-green-900 placeholder-green-400 ' +
        'focus:border-green-500 focus:ring-green-500/70 ' +
        'dark:border-green-500 dark:text-green-300 dark:placeholder-green-500',
    }

    const disabledClass = props.disabled
      ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    return [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      disabledClass,
    ].join(' ')
  })
</script>


