<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Quản lý Bài viết</h1>
          <p class="text-gray-600 mt-2">
            Quản lý và theo dõi tất cả bài viết trong hệ thống
          </p>
        </div>
        <Button
          @click="showCreateModal = true"
          class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Thêm bài viết mới
        </Button>
      </div>
    </div>

    <!-- Create Blog Modal (Ant Design style) -->
    <transition name="fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-black/70 transition-all duration-300"
          @click="showCreateModal = false"
        ></div>
        <!-- Modal -->
        <div
          class="relative bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full mx-4 z-10 animate-fadeIn"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              Tạo bài viết mới
            </h3>
            <button
              @click="showCreateModal = false"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 text-xl transition-colors"
              aria-label="Đóng"
            >
              &times;
            </button>
          </div>
          <!-- Content -->
          <div class="px-6 py-6">
            <Input
              v-model="form.title"
              placeholder="Tiêu đề bài viết"
              class="mb-4"
            />
            <Editor
              v-model="form.description"
              placeholder="Nhập nội dung bài viết..."
              height="250px"
              contentType="html"
              theme="snow"
              :options="editorOptions"
              class="mb-4"
            />
          </div>
          <!-- Footer -->
          <div
            class="flex justify-end items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl"
          >
            <button
              @click="showCreateModal = false"
              class="px-5 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              Hủy
            </button>
            <button
              @click="handleCreateBlog"
              class="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Blogs List -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <span class="text-gray-500">Đang tải dữ liệu...</span>
    </div>
    <div v-else-if="error" class="flex justify-center items-center py-12">
      <span class="text-red-500">{{ error }}</span>
    </div>
    <div v-else>
      <!-- Table -->
      <div
        class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thumbnail
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tiêu đề
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mô tả
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng thái
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tác giả
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày tạo
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày cập nhật
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="post in posts"
                :key="post._id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    v-if="post.thumbnail"
                    :src="post.thumbnail"
                    :alt="post.title"
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                  <div
                    v-else
                    class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-gray-400 text-xs">No image</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="text-sm font-medium text-gray-900 max-w-xs truncate"
                  >
                    {{ post.title }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="text-sm text-gray-500 max-w-md h-16 overflow-hidden line-clamp-3"
                    v-html="post.description"
                  ></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge
                    :variant="post.status ? 'success' : 'danger'"
                    size="sm"
                  >
                    {{ post.status ? "Hoạt động" : "Không hoạt động" }}
                  </Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      v-if="post.createdBy && post.createdBy.avatar"
                      :src="post.createdBy.avatar"
                      :alt="post.createdBy.firstName"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div class="text-sm text-gray-900">
                      {{
                        post.createdBy
                          ? post.createdBy.firstName +
                            " " +
                            post.createdBy.lastName
                          : "Admin"
                      }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(post.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(post.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <NuxtLink :to="`/blogs/${post._id}`">
                      <Button size="sm" variant="primary">Xem</Button>
                    </NuxtLink>
                    <Button size="sm" variant="secondary">Sửa</Button>
                    <Button size="sm" variant="danger">Xóa</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpRequest from "~/utils/httpRequest";
import Card from "~/components/ui/Card.vue";
import Badge from "~/components/ui/Badge.vue";
import Button from "~/components/ui/Button.vue";
import Input from "~/components/ui/Input.vue";
import Editor from "~/components/ui/Editor.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const posts = ref([]);
const loading = ref(true);
const error = ref("");
const showCreateModal = ref(false);
const form = ref({ title: "", description: "" });

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const resp = await httpRequest.get(
      "https://blog-data.up.railway.app/posts?page=1&limit=10"
    );
    posts.value = resp.data || [];
  } catch (err) {
    error.value = err?.message || "Không thể tải dữ liệu.";
  } finally {
    loading.value = false;
  }
};

const handleCreateBlog = async () => {
  // TODO: Gọi API tạo blog, validate, đóng modal, refetch
  alert(`Tạo blog: ${form.value.title}`);
  showCreateModal.value = false;
  // Sau này có thể gọi fetchPosts() để reload danh sách
};

onMounted(fetchPosts);
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
@keyframes fadeIn {
  from {
    transform: translateY(40px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
