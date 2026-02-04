<template>
  <div class="relative w-full">
    <!-- Search Icon (Left) -->
    <div
      class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
    >
      <svg
        class="w-5 h-5 text-gray-600 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <!-- Input Field -->
    <input
      ref="inputRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      type="text"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="$emit('enter', modelValue)"
    />

    <!-- Right Side Icons -->
    <div class="absolute inset-y-0 right-0 pr-4 flex items-center z-10">
      <!-- Clear Button (when has text) -->
      <button
        v-if="hasValue && !disabled"
        type="button"
        class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        @click="handleClear"
        aria-label="Clear search"
      >
        <svg
          class="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Microphone Icon (when no text) -->
      <div
        v-else-if="!disabled && showMicrophone"
        class="flex items-center justify-center pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Type to search...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showMicrophone: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits([
    'update:modelValue',
    'focus',
    'blur',
    'input',
    'clear',
    'enter',
  ])

  const isFocused = ref(false)
  const inputRef = ref(null)

  const hasValue = computed(() => {
    return String(props.modelValue || '').length > 0
  })

  const isActive = computed(() => {
    return isFocused.value || hasValue.value
  })

  const inputClasses = computed(() => {
    const base =
      'w-full pl-12 pr-12 py-2 rounded-full border-[1px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none dark:bg-gray-900 dark:text-white dark:placeholder-gray-500'
    const activeBorder = isActive.value
      ? 'border-primary-500 dark:border-primary-500'
      : 'border-gray-300 hover:border-gray-400 focus:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500 dark:focus:border-gray-500'
    const disabledClass = props.disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800'
      : ''

    return [base, activeBorder, disabledClass].filter(Boolean).join(' ')
  })

  const handleInput = event => {
    emit('update:modelValue', event.target.value)
    emit('input', event)
  }

  const handleFocus = event => {
    isFocused.value = true
    emit('focus', event)
  }

  const handleBlur = event => {
    isFocused.value = false
    emit('blur', event)
  }

  const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
    // Focus lại input sau khi clear
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
</script>
