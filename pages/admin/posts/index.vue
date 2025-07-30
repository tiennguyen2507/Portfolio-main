<template>
  <div class="admin-posts">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý Bài viết</h1>
        <p class="text-gray-600">Tạo và chỉnh sửa các bài viết blog</p>
      </div>

      <!-- Create/Edit Form -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">
            {{ editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới" }}
          </h2>
          <button
            v-if="editingPost"
            @click="cancelEdit"
            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy chỉnh sửa
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề bài viết
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tiêu đề bài viết..."
              maxlength="120"
            />
          </div>

          <!-- Thumbnail Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            <UploadFile :onChange="handleThumbnailChange" />
          </div>

          <!-- Content Editor -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nội dung bài viết
            </label>
            <div class="border border-gray-300 rounded-lg">
              <ClientOnly>
                <QuillEditor
                  v-if="QuillEditor"
                  v-model:content="form.description"
                  contentType="html"
                  theme="snow"
                  :options="editorOptions"
                  @ready="onEditorReady"
                  class="quill-editor"
                />
                <div v-else class="p-4 text-gray-500 text-center">
                  Đang tải editor...
                </div>
              </ClientOnly>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Làm mới
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{
                loading
                  ? "Đang xử lý..."
                  : editingPost
                    ? "Cập nhật"
                    : "Tạo bài viết"
              }}
            </button>
          </div>
        </form>
      </div>

      <!-- Posts List -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-6">Danh sách bài viết</h2>

        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-2 text-gray-600">Đang tải...</p>
        </div>

        <div v-else-if="posts.length === 0" class="text-center py-8">
          <p class="text-gray-600">Chưa có bài viết nào</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="post in posts"
            :key="post._id"
            class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <!-- Thumbnail -->
            <div class="h-48 bg-gray-100">
              <img
                v-if="post.thumbnail"
                :src="post.thumbnail"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-gray-400"
              >
                <span>Không có ảnh</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2 line-clamp-2">
                {{ post.title }}
              </h3>
              <p
                class="text-gray-600 text-sm mb-4 line-clamp-3"
                v-html="post.description"
              ></p>

              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">
                  {{ new Date(post.createdAt).toLocaleDateString("vi-VN") }}
                </span>
                <div class="flex space-x-2">
                  <button
                    @click="editPost(post)"
                    class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deletePost(post._id)"
                    class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Import Quill editor only on client side
let QuillEditor = null;
if (process.client) {
  const { QuillEditor: QuillEditorComponent } = await import(
    "@vueup/vue-quill"
  );
  QuillEditor = QuillEditorComponent;
  // Import CSS
  await import("@vueup/vue-quill/dist/vue-quill.snow.css");
}

// API URL - Use Nginx proxy to backend
const API_URL = "http://localhost/api";

// Reactive data
const posts = ref([]);
const loading = ref(false);
const editingPost = ref(null);
const thumbnailFile = ref(null);
const form = ref({
  title: "",
  description: "",
  thumbnail: "",
});

// Editor options
const editorOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  placeholder: "Nhập nội dung bài viết...",
};

// Methods
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_URL}/posts?page=1&limit=50`);
    const data = await response.json();
    posts.value = data.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Không thể tải danh sách bài viết");
  } finally {
    loading.value = false;
  }
};

const handleThumbnailChange = (file) => {
  if (!file) return;
  thumbnailFile.value = file;
};

const handleSubmit = async () => {
  if (!form.value.title.trim() || !form.value.description.trim()) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  loading.value = true;
  try {
    let thumbnail = form.value.thumbnail;

    // Upload thumbnail if there's a new file
    if (thumbnailFile.value) {
      const formData = new FormData();
      formData.append("file", thumbnailFile.value);
      formData.append("folder", "thumbnails");

      const uploadResponse = await fetch(`${API_URL}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload thumbnail failed");
      }

      const uploadData = await uploadResponse.json();
      thumbnail = uploadData.url || uploadData.secure_url;
    }

    const url = editingPost.value
      ? `${API_URL}/posts/${editingPost.value._id}`
      : `${API_URL}/posts`;

    const method = editingPost.value ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.value.title,
        description: form.value.description,
        thumbnail: thumbnail,
      }),
    });

    if (response.ok) {
      alert(
        editingPost.value ? "Cập nhật thành công!" : "Tạo bài viết thành công!"
      );
      resetForm();
      await fetchPosts();
    } else {
      throw new Error("Request failed");
    }
  } catch (error) {
    console.error("Error saving post:", error);
    alert("Có lỗi xảy ra khi lưu bài viết");
  } finally {
    loading.value = false;
  }
};

const editPost = (post) => {
  editingPost.value = post;
  form.value = {
    title: post.title,
    description: post.description,
    thumbnail: post.thumbnail || "",
  };
  thumbnailFile.value = null; // Reset thumbnail file when editing
};

const deletePost = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Xóa bài viết thành công!");
      await fetchPosts();
    } else {
      throw new Error("Delete failed");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Không thể xóa bài viết");
  }
};

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    thumbnail: "",
  };
  thumbnailFile.value = null;
  editingPost.value = null;
};

const cancelEdit = () => {
  resetForm();
};

const onEditorReady = (quill) => {
  // Custom image handler for Quill editor
  const toolbar = quill.getModule("toolbar");
  toolbar.addHandler("image", () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "editor");

        try {
          const response = await fetch(`${API_URL}/image/upload`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          const imageUrl = data.url || data.secure_url;

          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Không thể upload ảnh");
        }
      }
    };
  });
};

// Lifecycle
onMounted(() => {
  fetchPosts();
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

/* Quill Editor Styles */
:deep(.ql-editor) {
  min-height: 200px;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

:deep(.ql-toolbar) {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

:deep(.ql-container) {
  border: none;
  font-size: 14px;
}

:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: italic;
}

/* Ensure Quill editor is visible */
.quill-editor {
  display: block !important;
  visibility: visible !important;
}

:deep(.ql-editor) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Global Quill styles */
:deep(.ql-snow) {
  border: none !important;
}

:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  border-bottom: 1px solid #e5e7eb !important;
}

:deep(.ql-container.ql-snow) {
  border: none !important;
}

:deep(.ql-editor) {
  padding: 12px !important;
  min-height: 200px !important;
}
</style>
