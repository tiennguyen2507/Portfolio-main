<template>
  <div class="w-full" :class="wrapperClass">
    <label
      v-if="label"
      :for="id || undefined"
      class="block text-sm font-medium text-gray-700 mb-2"
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

      <input
        :id="id || undefined"
        :name="name || undefined"
        :type="type"
        v-model="innerValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :inputmode="inputmode || undefined"
        :maxlength="maxlength"
        :aria-invalid="variant === 'danger' || !!error || undefined"
        :class="inputClasses"
        @input="onInput"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
        @keydown.enter="$emit('enter', innerValue)"
      />

      <button
        v-if="clearable && !disabled && String(innerValue).length"
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

    <p v-if="error" class="mt-1 text-sm text-red-600" :class="messageClass">
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1 text-sm text-gray-500"
      :class="messageClass"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    label: { type: String, default: '' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: v => ['primary', 'secondary', 'success', 'danger'].includes(v),
    },
    name: { type: String, default: '' },
    id: { type: String, default: '' },
    autocomplete: { type: String, default: 'off' },
    inputmode: { type: String, default: '' },
    maxlength: { type: [Number, String], default: undefined },
    debounce: { type: Number, default: 0 },
    clearable: { type: Boolean, default: false },
    wrapperClass: { type: [String, Array, Object], default: '' },
    labelClass: { type: [String, Array, Object], default: '' },
    inputClass: { type: [String, Array, Object], default: '' },
    messageClass: { type: [String, Array, Object], default: '' },
  })

  const emit = defineEmits([
    'update:modelValue',
    'input',
    'change',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'enter',
    'clear',
  ])

  const slots = useSlots()

  const innerValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    value => {
      if (value !== innerValue.value) innerValue.value = value
    }
  )

  let debounceTimer
  onBeforeUnmount(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  function onInput(event) {
    const value = event.target.value
    emit('input', event)
    if (props.debounce > 0) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        emit('update:modelValue', value)
      }, props.debounce)
    } else {
      emit('update:modelValue', value)
    }
  }

  function clear() {
    innerValue.value = ''
    emit('update:modelValue', '')
    emit('clear')
  }

  const inputClasses = computed(() => {
    const base =
      'block w-full rounded-md border bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all'
    const sizeMap = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
    }
    const variantMap = {
      primary:
        'border-blue-600 hover:border-blue-700 focus:border-blue-700 focus:ring-1 focus:ring-blue-500',
      secondary:
        'border-orange-500 hover:border-orange-600 focus:border-orange-600 focus:ring-1 focus:ring-orange-500',
      success:
        'border-green-600 hover:border-green-700 focus:border-green-700 focus:ring-1 focus:ring-green-500',
      danger:
        'border-red-600 hover:border-red-700 focus:border-red-700 focus:ring-1 focus:ring-red-500',
    }
    const disabledClass = props.disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100'
      : ''

    const hasPrefix = !!slots.prefix
    const hasSuffix = !!slots.suffix
    const leftPad = hasPrefix ? 'pl-10' : ''
    const rightPad =
      props.clearable && String(innerValue.value).length
        ? 'pr-10'
        : hasSuffix
          ? 'pr-10'
          : ''

    return [
      base,
      sizeMap[props.size],
      variantMap[props.variant],
      disabledClass,
      leftPad,
      rightPad,
      props.inputClass,
    ]
      .filter(Boolean)
      .join(' ')
  })
</script>
