<template>
  <ClientOnly>
    <Suspense>
      <template #default>
        <QuillEditorAsync
          v-model:content="content"
          :contentType="contentType"
          :theme="theme"
          :options="options"
          :placeholder="placeholder"
          class="quill-editor"
          :style="{ minHeight: height }"
          @update:content="onUpdate"
        />
      </template>
      <template #fallback>
        <div class="p-4 text-gray-500 text-center">Đang tải editor...</div>
      </template>
    </Suspense>
  </ClientOnly>
</template>

<script setup>
import { ref, watch, onMounted, defineAsyncComponent } from "vue";
const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Nhập nội dung..." },
  height: { type: String, default: "200px" },
  contentType: { type: String, default: "html" },
  theme: { type: String, default: "snow" },
  options: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["update:modelValue"]);

const content = ref(props.modelValue);

const QuillEditorAsync = defineAsyncComponent(async () => {
  if (process.client) {
    try {
      const { QuillEditor } = await import("@vueup/vue-quill");
      await import("@vueup/vue-quill/dist/vue-quill.snow.css");
      return QuillEditor;
    } catch (e) {
      console.error("Không thể load QuillEditor:", e);
      return {
        template: '<div class="text-red-500">Không thể tải editor</div>',
      };
    }
  }
  return {
    template: '<div class="text-gray-500">Chỉ hỗ trợ trên client</div>',
  };
});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== content.value) content.value = val;
  }
);

function onUpdate(val) {
  emit("update:modelValue", val);
}
</script>

<style scoped>
.quill-editor {
  min-height: 200px;
}
</style>
