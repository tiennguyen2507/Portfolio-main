<template>
  <div>
    <!-- Page Header -->
    <HeaderContent
      title="Quản lý Comments About Me"
      subtitle="Danh sách lời nhận xét/testimonials"
    />

    <!-- Loading State -->
    <div
      v-if="loading"
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
    >
      <div class="flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <span class="ml-2 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    </div>

    <!-- Comments Table -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Người nhận xét
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nội dung
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày tạo
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
              v-for="comment in comments"
              :key="comment._id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Avatar
                    :src="comment.avatar"
                    :size="40"
                    :ring="false"
                    :read-only="true"
                  />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ comment.name }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ comment.relationship }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">
                  {{ comment.comment }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': isActiveStatus(
                      comment.status
                    ),
                    'bg-yellow-100 text-yellow-800': !isActiveStatus(
                      comment.status
                    ),
                  }"
                >
                  {{ isActiveStatus(comment.status) ? "Hiển thị" : "Ẩn" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(comment.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <ButtonIcon
                    icon="delete"
                    color="red"
                    @click="deleteComment(comment._id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <EmptyData
        v-if="comments.length === 0 && !loading"
        title="Không có nhận xét nào"
        description="Chưa có dữ liệu hiển thị."
      />

      <!-- Pagination -->
      <div v-if="comments.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <Pagination
          :page="currentPage"
          :total="pagination.total"
          :limit="limit"
          :page-count="Math.ceil(pagination.total / limit)"
          :show-info="true"
          :split="true"
          @update:page="(p) => { currentPage = p; fetchComments(); }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { httpRequest } from "~/utils/httpRequest";
import Avatar from "~/components/ui/Avatar.vue";
import ButtonIcon from "~/components/ui/ButtonIcon.vue";
import EmptyData from "~/components/ui/EmptyData.vue";
import Pagination from "~/components/ui/Pagination.vue";
import HeaderContent from "~/components/admin/HeaderContent.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// Reactive data
const currentPage = ref(1);
const limit = 10;
const loading = ref(false);
const comments = ref([]);
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  nextPage: false,
  prePage: false,
});

// Helpers
const isActiveStatus = (status) => {
  // Accept boolean true or string "true"/"public" as active
  if (status === true) return true;
  if (typeof status === "string") {
    const normalized = status.toLowerCase();
    return normalized === "true" || normalized === "public";
  }
  return false;
};

// Fetch comments from API
const fetchComments = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: limit.toString(),
    });

    const response = await httpRequest.get(
      `/comments-about-me?${params.toString()}`
    );

    comments.value = response.data;
    pagination.value = {
      total: response.total,
      page: response.page,
      limit: response.limit,
      nextPage: response.nextPage,
      prePage: response.prePage,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    // You might want to show a toast notification here
  } finally {
    loading.value = false;
  }
};

// Delete comment
const deleteComment = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa nhận xét này?")) {
    try {
      await httpRequest.delete(`/comments-about-me/${id}`);

      // Remove from local state
      comments.value = comments.value.filter((item) => item._id !== id);

      // Refresh data if current page is empty
      if (comments.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
};

// Pagination methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchComments();
  }
};

const nextPage = () => {
  if (pagination.value.nextPage) {
    currentPage.value++;
    fetchComments();
  }
};

// Utility methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fetch data on mount
onMounted(() => {
  fetchComments();
});
</script>
