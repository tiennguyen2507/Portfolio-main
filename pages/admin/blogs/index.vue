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
          @click="() => { showCreateModal = true; isEditing = false; editingId = null; form = { title: '', description: '', thumbnail: '' }; }"
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

    <!-- Create/Edit Blog Modal using common Modal + FormBlogs -->
    <Modal v-if="showCreateModal" :isOpen="showCreateModal" width="2xl" maxHeight="90vh" @close="closeModal">
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
        </h3>
      </template>

      <FormBlogs v-model="form" :editorOptions="editorOptions" @thumbnailChange="(f) => (thumbnailFile = f)" />

      <template #footer>
        <button
          @click="closeModal"
          class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
        >
          Return
        </button>
        <button
          @click="handleCreateOrUpdateBlog"
          class="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Submit
        </button>
      </template>
    </Modal>

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
                  <NuxtLink
                    :to="`/blogs/${post._id}`"
                    class="text-sm font-semibold text-blue-600 max-w-xs truncate hover:underline focus:underline focus:outline-none cursor-pointer hover:text-blue-700"
                    title="Xem bài viết"
                  >
                    {{ post.title }}
                  </NuxtLink>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="text-sm text-gray-500 max-w-md overflow-hidden line-clamp-3"
                    v-html="post.description"
                  ></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge
                    :variant="post.status ? 'success' : 'danger'"
                    size="sm"
                  >
                    {{ post.status ? 'Hoạt động' : 'Không hoạt động' }}
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
                          ? post.createdBy.firstName + ' ' + post.createdBy.lastName
                          : 'Admin'
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
                  <div class="flex items-center gap-2">
                    <ButtonIcon icon="edit" color="blue" @click="startEdit(post)" />
                    <ButtonIcon icon="delete" color="red" @click="deletePost(post._id)" />
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
import Badge from "~/components/ui/Badge.vue";
import Button from "~/components/ui/Button.vue";
import Modal from "~/components/ui/Modal.vue";
import FormBlogs from "~/pages/admin/blogs/_components/FormBlogs.vue";
import ButtonIcon from "~/components/ui/ButtonIcon.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const posts = ref([]);
const loading = ref(true);
const error = ref("");
const showCreateModal = ref(false);
let form = ref({ title: "", description: "", thumbnail: "" });
const isEditing = ref(false);
const editingId = ref(null);
let thumbnailFile = null;

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

const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN");

const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const resp = await httpRequest.get("/posts?page=1&limit=10");
    posts.value = resp.data || [];
  } catch (err) {
    error.value = err?.message || "Không thể tải dữ liệu.";
  } finally {
    loading.value = false;
  }
};

function closeModal() {
  showCreateModal.value = false;
  isEditing.value = false;
  editingId.value = null;
}

function startEdit(post) {
  isEditing.value = true;
  editingId.value = post._id;
  form.value = { title: post.title || "", description: post.description || "", thumbnail: post.thumbnail || "" };
  showCreateModal.value = true;
}

const handleCreateOrUpdateBlog = async () => {
  try {
    if (isEditing.value && editingId.value) {
      await httpRequest.put(`/posts/${editingId.value}`, {
        title: form.value.title,
        description: form.value.description,
        thumbnail: form.value.thumbnail,
      });
    } else {
      await httpRequest.post("/posts", {
        title: form.value.title,
        description: form.value.description,
        thumbnail: form.value.thumbnail,
        status: true,
      });
    }
    await fetchPosts();
    closeModal();
    form.value = { title: "", description: "", thumbnail: "" };
  } catch (err) {
    error.value = err?.message || "Không thể lưu dữ liệu.";
  }
};

const deletePost = async (id) => {
  if (!id) return;
  if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
    try {
      await httpRequest.delete(`/posts/${id}`);
      await fetchPosts();
    } catch (err) {
      error.value = err?.message || "Không thể xóa bài viết.";
    }
  }
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
