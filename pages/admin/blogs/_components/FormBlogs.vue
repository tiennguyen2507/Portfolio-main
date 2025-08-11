<template>
  <div class="space-y-6">
    <!-- Title -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề bài viết</label>
      <input
        v-model="form.title"
        type="text"
        required
        class="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder="Nhập tiêu đề bài viết..."
        maxlength="120"
      />
    </div>

    <!-- Thumbnail Upload -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
      <UploadFile :onChange="(file) => $emit('thumbnailChange', file)" />
    </div>

    <!-- Content Editor -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nội dung bài viết</label>
      <Editor
        v-model="form.description"
        height="300px"
        contentType="html"
        theme="snow"
        :options="editorOptions"
        placeholder="Nhập nội dung bài viết..."
      />
    </div>
  </div>
</template>

<script setup>
import Editor from "~/components/ui/Editor.vue";
import UploadFile from "~/components/ui/UploadFile.vue";

const form = defineModel({
  type: Object,
  default: () => ({ title: "", description: "", thumbnail: "" }),
});

const props = defineProps({
  editorOptions: { type: Object, default: () => ({}) },
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure Quill editor is visible */
.quill-editor {
  display: block !important;
  visibility: visible !important;
}
</style>
