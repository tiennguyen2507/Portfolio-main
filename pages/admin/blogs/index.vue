<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Bài viết"
      subtitle="Quản lý và theo dõi tất cả bài viết trong hệ thống"
    >
      <template #action>
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
      </template>
    </HeaderContent>

    <!-- Create/Edit Blog Modal -->
    <FormBlogs
      v-if="showCreateModal"
      :isOpen="showCreateModal"
      :isEditing="isEditing"
      :form="form"
      :submitting="submitting"
      :error="error"
      :editorOptions="editorOptions"
      @close="closeModal"
      @submit="handleFormSubmit"
      @thumbnailChange="(f) => (thumbnailFile = f)"
    />

    <!-- Blogs List -->
    <ErrorCommon 
      v-if="error"
      :message="error"
      @retry="fetchPosts"
    />
    
    <TableBlogs  
      v-if="!error"
      :posts="posts"
      :loading="loading"
      @edit="startEdit"
      @delete="deletePost"
    />

    <!-- Pagination - Separated from Table -->
    <div v-if="!error && posts.length > 0" class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
      <Pagination
        :page="currentPage"
        :total="pagination.total"
        :limit="limit"
        :show-info="true"
        :split="true"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpRequest from "~/utils/httpRequest";
import handleUpdateImage from "~/utils/handleUpdateImage";
import Button from "~/components/ui/Button.vue";
import FormBlogs from "~/pages/admin/blogs/_components/ModalFormBlogs.vue"  
import HeaderContent from "~/components/admin/HeaderContent.vue";
import ErrorCommon from "~/components/admin/ErrorCommon.vue";
import Pagination from "~/components/ui/Pagination.vue";
import TableBlogs from "~/pages/admin/blogs/_components/TableBlogs.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const posts = ref([]);
const loading = ref(true);
const error = ref("");
const showCreateModal = ref(false);
const submitting = ref(false); // Loading state for form submit
let form = ref({ title: "", description: "", thumbnail: "" });
const isEditing = ref(false);
const editingId = ref(null);
let thumbnailFile = null;
const currentPage = ref(1);
const limit = 10;
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  nextPage: false,
  prePage: false,
});







// Editor options - now using default options from Editor component
const editorOptions = {
  placeholder: "Nhập nội dung bài viết...",
};


const fetchPosts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: limit.toString(),
    });
    
    const resp = await httpRequest.get(`/posts?${params.toString()}`);
    
    posts.value = resp.data || [];
    pagination.value = {
      total: resp.total || 0,
      page: resp.page || 1,
      limit: resp.limit || 10,
      nextPage: resp.nextPage || false,
      prePage: resp.prePage || false,
    };
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
  error.value = ""; // Clear error when closing modal
  thumbnailFile = null; // Reset thumbnail file when closing modal
}

function startEdit(post) {
  isEditing.value = true;
  editingId.value = post._id;
  form.value = { title: post.title || "", description: post.description || "", thumbnail: post.thumbnail || "" };
  thumbnailFile = null; // Reset thumbnail file when editing
  showCreateModal.value = true;
}

const handleFormSubmit = async (result) => {
  if (!result.success) {
    error.value = result.error;
    return;
  }

  submitting.value = true;
  try {
    let thumbnailUrl = result.data.thumbnail;

    // Upload thumbnail if there's a new file
    if (result.thumbnailFile && result.thumbnailFile instanceof File) {
      const uploadedUrl = await handleUpdateImage(result.thumbnailFile, 'blogs');
      if (uploadedUrl) {
        thumbnailUrl = uploadedUrl;
      } else {
        error.value = "Không thể upload thumbnail. Vui lòng thử lại.";
        submitting.value = false;
        return;
      }
    }

    if (isEditing.value && editingId.value) {
      await httpRequest.patch(`/posts/${editingId.value}`, {
        title: result.data.title.trim(),
        description: result.data.description.trim(),
        thumbnail: thumbnailUrl,
      });
    } else {
      await httpRequest.post("/posts", {
        title: result.data.title.trim(),
        description: result.data.description.trim(),
        thumbnail: thumbnailUrl,
        status: true,
      });
    }
    await fetchPosts();
    closeModal();
    form.value = { title: "", description: "", thumbnail: "" };
    error.value = ""; // Clear any previous errors
  } catch (err) {
    error.value = err?.message || "Không thể lưu dữ liệu.";
  } finally {
    submitting.value = false;
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

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchPosts();
};

onMounted(() => {
  fetchPosts();
});
</script>
