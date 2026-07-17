<template>
  <div
    class="w-full p-4 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800"
  >
    <h2 class="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
      Upload a File
    </h2>
    <label
      for="file-upload"
      class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer transition hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-900 py-2 px-4 text-center w-full"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <img
        v-if="preview"
        :src="preview"
        alt="Preview"
        class="max-w-full object-contain rounded-3xl mb-2"
        style="max-height: 200px"
      />
      <div v-else class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="mx-auto text-gray-400 dark:text-gray-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400">
          Click to upload or drag and drop
        </p>
      </div>

      <input
        id="file-upload"
        type="file"
        class="hidden"
        accept="image/svg+xml,image/png,image/jpeg,image/gif"
        ref="inputRef"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'

  // Props
  const props = defineProps({
    onChange: {
      type: Function,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  })

  // Reactive data
  const preview = ref(null)
  const inputRef = ref(null)
  const hasNewFile = ref(false) // Track if user selected a new file

  // Set preview from value prop when component mounts or value changes
  onMounted(() => {
    if (props.value) {
      preview.value = props.value
    }
  })

  watch(
    () => props.value,
    (newValue, oldValue) => {
      // If value prop changed (e.g., switching to edit different item), reset and show new value
      if (newValue !== oldValue && newValue) {
        // If current preview is a data URL (file selected), keep it
        // Otherwise, update to show the new value
        if (!preview.value || !preview.value.startsWith('data:')) {
          preview.value = newValue
          hasNewFile.value = false
        }
      } else if (newValue && !hasNewFile.value) {
        // Initial load or value exists but no new file selected
        preview.value = newValue
      }
    },
    { immediate: true }
  )

  // Methods
  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      hasNewFile.value = true
      if (props.onChange) props.onChange(file)
      const reader = new FileReader()
      reader.onload = ev => {
        preview.value = ev.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = event => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      hasNewFile.value = true
      if (props.onChange) props.onChange(file)
      const reader = new FileReader()
      reader.onload = ev => {
        preview.value = ev.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
  }
</script>

<style scoped>
  /* Custom styles if needed */
</style>
