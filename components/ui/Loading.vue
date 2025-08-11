<template>
  <div
    :class="[
      'flex justify-center items-center',
      containerClass
    ]"
  >
    <div
      :class="[
        'animate-spin rounded-full border-b-2',
        sizeClasses[size],
        colorClasses[color]
      ]"
    ></div>
    <span
      v-if="text"
      :class="[
        'ml-2 text-gray-600',
        textSizeClasses[size]
      ]"
    >
      {{ text }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'gray', 'green', 'red'].includes(value)
  },
  text: {
    type: String,
    default: 'Đang tải dữ liệu...'
  },
  containerClass: {
    type: String,
    default: 'py-12'
  }
});

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base'
};

const colorClasses = {
  blue: 'border-blue-600',
  gray: 'border-gray-600',
  green: 'border-green-600',
  red: 'border-red-600'
};
</script>
