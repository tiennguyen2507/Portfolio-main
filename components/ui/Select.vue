<template>
  <div class="w-full" :class="wrapperClass">
    <label
      v-if="label"
      :for="id || undefined"
      class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
      :class="labelClass"
    >
      {{ label }}<span v-if="required" class="text-red-500"> *</span>
    </label>

    <div class="relative">
      <span
        v-if="slots.prefix"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prefix" />
      </span>

      <select
        :id="id || undefined"
        :name="name || undefined"
        v-model="innerValue"
        :disabled="disabled"
        :required="required"
        :multiple="multiple"
        :aria-invalid="variant === 'danger' || !!error || undefined"
        :class="selectClasses"
        @change="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <option v-if="!multiple && placeholder" disabled value="">
          {{ placeholder }}
        </option>
        <option
          v-for="(opt, idx) in normalizedOptions"
          :key="idx"
          :value="opt.value"
          :disabled="opt.disabled === true"
        >
          {{ opt.label }}
        </option>
      </select>

      <button
        v-if="clearable && !disabled && hasValue"
        type="button"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        @click="clear"
      >
        <span class="sr-only">Clear</span>
        ×
      </button>

      <span
        v-else-if="slots.suffix"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <slot name="suffix" />
      </span>
    </div>

    <p
      v-if="error"
      class="mt-1 text-sm text-red-600 dark:text-red-400"
      :class="messageClass"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1 text-sm text-gray-500 dark:text-gray-400"
      :class="messageClass"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: { type: [String, Number, Boolean, Array], default: '' },
    options: { type: Array, default: () => [] },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: v =>
        ['primary', 'secondary', 'success', 'danger'].includes(v),
    },
    name: { type: String, default: '' },
    id: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    wrapperClass: { type: [String, Array, Object], default: '' },
    labelClass: { type: [String, Array, Object], default: '' },
    selectClass: { type: [String, Array, Object], default: '' },
    messageClass: { type: [String, Array, Object], default: '' },
    valueKey: { type: String, default: 'value' },
    labelKey: { type: String, default: 'label' },
  })

  const emit = defineEmits([
    'update:modelValue',
    'change',
    'focus',
    'blur',
    'clear',
  ])

  const slots = useSlots()

  const isArrayModel = computed(() => props.multiple)

  const innerValue = ref(
    props.multiple
      ? Array.isArray(props.modelValue)
        ? props.modelValue
        : []
      : props.modelValue
  )

  const normalizedOptions = computed(() => {
    return props.options.map(opt => {
      if (
        typeof opt === 'string' ||
        typeof opt === 'number' ||
        typeof opt === 'boolean'
      ) {
        return { label: String(opt), value: opt }
      }
      if (opt && typeof opt === 'object') {
        return {
          label: opt[props.labelKey] ?? String(opt[props.valueKey]),
          value: opt[props.valueKey],
          disabled: opt.disabled === true,
        }
      }
      return { label: '', value: '' }
    })
  })

  const hasValue = computed(() => {
    return props.multiple
      ? Array.isArray(innerValue.value) && innerValue.value.length > 0
      : innerValue.value !== '' &&
          innerValue.value !== null &&
          innerValue.value !== undefined
  })

  watch(
    () => props.modelValue,
    value => {
      if (props.multiple) {
        const incoming = Array.isArray(value) ? value : []
        if (JSON.stringify(incoming) !== JSON.stringify(innerValue.value)) {
          innerValue.value = incoming
        }
      } else if (value !== innerValue.value) {
        innerValue.value = value
      }
    }
  )

  function onChange(event) {
    if (props.multiple) {
      const selected = Array.from(event.target.selectedOptions).map(
        o => o.value
      )
      emit('update:modelValue', selected)
    } else {
      emit('update:modelValue', event.target.value)
    }
    emit('change', event)
  }

  function clear() {
    const cleared = props.multiple ? [] : ''
    innerValue.value = cleared
    emit('update:modelValue', cleared)
    emit('clear')
  }

  const selectClasses = computed(() => {
    const base =
      'block w-full rounded-md border bg-white text-gray-900 focus:outline-none transition-all dark:bg-gray-900 dark:text-white'
    const textSizing = 'placeholder-gray-400'
    const sizeMap = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    }
    const variantMap = {
      primary:
        'border-orange-500 hover:border-orange-600 focus:border-orange-600 focus:ring-1 focus:ring-orange-500 dark:border-orange-500',
      secondary:
        'border-gray-500 hover:border-gray-600 focus:border-gray-600 focus:ring-1 focus:ring-gray-500 dark:border-gray-400',
      success:
        'border-green-600 hover:border-green-700 focus:border-green-700 focus:ring-1 focus:ring-green-500 dark:border-green-500',
      danger:
        'border-red-600 hover:border-red-700 focus:border-red-700 focus:ring-1 focus:ring-red-500 dark:border-red-500',
    }
    const disabledClass = props.disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    const hasPrefix = !!slots.prefix
    const hasSuffix = !!slots.suffix
    const leftPad = hasPrefix ? 'pl-10' : ''
    const rightPad =
      hasSuffix || (props.clearable && hasValue.value) ? 'pr-10' : ''

    return [
      base,
      textSizing,
      sizeMap[props.size],
      variantMap[props.variant],
      disabledClass,
      leftPad,
      rightPad,
      props.selectClass,
    ]
      .filter(Boolean)
      .join(' ')
  })
</script>


