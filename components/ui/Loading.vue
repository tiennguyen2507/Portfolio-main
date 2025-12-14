<template>
  <div :class="['flex justify-center items-center', containerClass]">
    <div
      class="loader"
      :class="[sizeClasses[size]]"
      :style="{ '--loader-color': colorValues[color] }"
    ></div>
  </div>
</template>

<script setup>
  defineProps({
    size: {
      type: String,
      default: 'md',
      validator: value => ['md', 'lg'].includes(value),
    },
    color: {
      type: String,
      default: 'green',
      validator: value =>
        ['blue', 'gray', 'green', 'red', 'orange'].includes(value),
    },
    containerClass: {
      type: String,
      default: 'py-12',
    },
  })

  const sizeClasses = {
    md: 'loader-md',
    lg: 'loader-lg',
  }

  const colorValues = {
    blue: '#3b82f6',
    gray: '#6b7280',
    green: '#28bdbf',
    red: '#ef4444',
    orange: '#f97316',
  }
</script>

<style scoped>
  .loader {
    aspect-ratio: 1;
    border-radius: 50%;
    background:
      radial-gradient(farthest-side, var(--loader-color) 94%, #0000) top/8px 7px
        no-repeat,
      conic-gradient(#0000 30%, var(--loader-color));
    -webkit-mask: radial-gradient(
      farthest-side,
      #0000 calc(100% - 12px),
      #000 0
    );
    mask: radial-gradient(farthest-side, #0000 calc(100% - 7px), #000 0);
    animation: l13 1s infinite linear;
  }

  .loader-md {
    width: 36px;
  }

  .loader-lg {
    width: 48px;
  }

  @keyframes l13 {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
