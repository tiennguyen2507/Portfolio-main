<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay with only opacity -->
      <div
        class="fixed inset-0 bg-black/70 transition-all duration-300"
        @click="close"
      ></div>
      <!-- Modal Content -->
      <div
        :class="modalClasses"
        @click.stop
        role="dialog"
        aria-modal="true"
        style="z-index: 10"
      >
        <!-- Header -->
        <div
          v-if="$slots.header"
          class="modal-header flex items-center justify-between border-b border-gray-700/60 px-8 py-6"
        >
          <slot name="header" />
          <button
            @click="close"
            class="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-2xl font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>
        <!-- Content -->
        <div class="modal-body px-8 py-6 text-gray-200 text-base">
          <slot />
        </div>
        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="modal-footer border-t border-gray-700/60 px-8 py-5 flex justify-end space-x-3 bg-gray-900/80"
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
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
});
const emit = defineEmits(["close"]);

const modalClasses = computed(() => {
  const base =
    "relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/40 max-h-[90vh] overflow-y-auto transition-all duration-300";
  const widthMap = {
    sm: "w-full max-w-sm",
    md: "w-full max-w-lg",
    lg: "w-full max-w-2xl",
  };
  return `${base} ${widthMap[props.width]}`;
});

function close() {
  emit("close");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
