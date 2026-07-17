<template>
  <div class="inline-block" :style="{ width: sizePx, height: sizePx }">
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />

    <button
      type="button"
      :aria-label="
        effectiveImageSrc
          ? 'Ảnh đại diện'
          : isInteractive
            ? 'Tải ảnh đại diện'
            : 'Ảnh đại diện mặc định'
      "
      @click="triggerSelectFile"
      :class="[
        'relative w-full h-full rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
        ringClass,
        isInteractive
          ? 'cursor-pointer hover:opacity-95'
          : 'cursor-not-allowed opacity-70',
      ]"
      :disabled="!isInteractive"
    >
      <!-- Image -->
      <img
        v-if="effectiveImageSrc && !imageError"
        :src="effectiveImageSrc"
        alt="Avatar"
        class="w-full h-full object-cover"
        :style="{ width: sizePx, height: sizePx }"
        @error="onImgError"
      />

      <!-- Placeholder -->
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-inherit"
          :style="{ width: iconSizePx, height: iconSizePx }"
        >
          <path
            d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.337 0-8 2.163-8 5v1h16v-1c0-2.837-3.663-5-8-5z"
          />
        </svg>
      </div>

      <!-- Edit badge -->
      <div
        v-if="isInteractive"
        class="absolute bottom-1 right-1 bg-gray-900/80 text-white rounded-full p-1 border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 7.125L16.875 4.5"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
  import { computed, ref, watch, onBeforeUnmount } from 'vue'

  const props = defineProps({
    modelValue: { type: String, default: '' },
    src: { type: String, default: '' },
    readOnly: { type: Boolean, default: false },
    size: { type: [Number, String], default: 80 }, // px
    ring: { type: Boolean, default: true },
    ringColorClass: { type: String, default: 'ring-orange-500' },
    ringWidthClass: { type: String, default: 'ring-2' },
    disabled: { type: Boolean, default: false },
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const fileInputRef = ref(null)
  const objectUrl = ref('')
  const imageError = ref(false)

  const sizePx = computed(() => `${Number(props.size)}px`)
  const iconSizePx = computed(
    () => `${Math.max(20, Math.floor(Number(props.size) * 0.45))}px`
  )

  const ringClass = computed(() =>
    props.ring ? `${props.ringWidthClass} ring ${props.ringColorClass}` : ''
  )

  // If readOnly, prefer src. Otherwise, prefer modelValue or selected file URL
  const effectiveImageSrc = computed(() =>
    props.readOnly ? props.src : props.modelValue || objectUrl.value
  )

  const isInteractive = computed(() => !props.readOnly && !props.disabled)

  const triggerSelectFile = () => {
    if (!isInteractive.value) return
    fileInputRef.value?.click()
  }

  const handleFileChange = event => {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = URL.createObjectURL(file)
    imageError.value = false

    emit('update:modelValue', objectUrl.value)
    emit('change', file)
  }

  const onImgError = () => {
    imageError.value = true
  }

  watch(
    () => effectiveImageSrc.value,
    () => {
      imageError.value = false
    }
  )

  onBeforeUnmount(() => {
    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
  })
</script>

<style scoped>
  /* No additional CSS; using Tailwind classes. */
</style>
