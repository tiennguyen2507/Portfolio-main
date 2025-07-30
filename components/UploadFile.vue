<template>
  <div class="w-full p-4 bg-white rounded-xl shadow border border-gray-200">
    <h2 class="text-lg font-semibold mb-1">Upload a File</h2>
    <label
      for="file-upload"
      class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition hover:border-blue-400 bg-gray-50 py-2 px-4 text-center w-full"
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
          class="mx-auto text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
          />
        </svg>
        <p class="text-gray-400">Click to upload or drag and drop</p>
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
import { ref } from "vue";

// Props
const props = defineProps({
  onChange: {
    type: Function,
    default: null,
  },
});

// Reactive data
const preview = ref(null);
const inputRef = ref(null);

// Methods
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (props.onChange) props.onChange(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      preview.value = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    if (props.onChange) props.onChange(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      preview.value = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
