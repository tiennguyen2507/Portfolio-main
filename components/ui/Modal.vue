<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
    >
      <!-- Overlay with only opacity -->
      <div
        class="fixed inset-0 bg-black/70 modal-overlay"
        @click="close"
      ></div>
      <!-- Modal Content -->
      <div
        :class="modalClasses"
        :style="modalStyle"
        class="modal-content"
        @click.stop
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div
          v-if="$slots.header"
          class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-white dark:bg-gray-900"
        >
          <slot name="header" />
          <button
            @click="close"
            class="ml-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl transition-colors focus:outline-none focus:ring-0"
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>
        <!-- Content -->
        <div
          class="px-6 py-6 text-gray-700 dark:text-gray-100 text-base flex-1 overflow-y-auto bg-white dark:bg-gray-900"
        >
          <slot />
        </div>
        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-end space-x-3 bg-white dark:bg-gray-900"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'lg',
      validator: v => ['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(v),
    },
    maxHeight: {
      type: String,
      default: '90vh',
    },
  })
  const emit = defineEmits(['close'])

  const modalClasses = computed(() => {
    const base =
      'relative bg-white dark:bg-gray-900 rounded-t-2xl md:rounded-xl shadow-2xl border-t md:border border-gray-200 dark:border-gray-800 w-full overflow-hidden flex flex-col transition-all duration-300 text-gray-900 dark:text-white max-h-[calc(100vh-4rem)] md:max-h-none safe-area-bottom'
    const widthMap = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-3xl',
      '2xl': 'max-w-5xl',
      full: 'max-w-[96vw]',
    }
    return `${base} ${widthMap[props.width]}`
  })

  const modalStyle = computed(() => ({
    maxHeight: props.maxHeight,
  }))

  function close() {
    emit('close')
  }
</script>

<style scoped>
  /* Overlay fade animation */
  .modal-overlay {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Modal container animation */
  .modal-enter-active {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .modal-enter-active .modal-overlay {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .modal-enter-active .modal-content {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .modal-leave-active {
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .modal-leave-active .modal-overlay {
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .modal-leave-active .modal-content {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Initial states */
  .modal-enter-from {
    opacity: 0;
  }
  .modal-enter-from .modal-overlay {
    opacity: 0;
  }
  .modal-enter-from .modal-content {
    opacity: 0;
    transform: translateY(100%);
  }

  .modal-leave-to {
    opacity: 0;
  }
  .modal-leave-to .modal-overlay {
    opacity: 0;
  }
  .modal-leave-to .modal-content {
    opacity: 0;
    transform: translateY(100%);
  }

  /* Desktop: scale + fade animation */
  @media (min-width: 768px) {
    .modal-enter-from .modal-content {
      transform: translateY(0) scale(0.95);
    }
    .modal-leave-to .modal-content {
      transform: translateY(0) scale(0.95);
    }
  }
</style>
