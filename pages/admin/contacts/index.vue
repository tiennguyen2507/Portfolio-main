<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Quản lý Liên hệ</h1>
          <p class="text-gray-600 mt-2">
            Quản lý và theo dõi tất cả liên hệ từ khách hàng
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Tìm kiếm</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm theo tên, email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            @input="debouncedSearch"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Trạng thái</label
          >
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            @change="fetchContacts"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đã xử lý</option>
            <option value="false">Chưa xử lý</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="fetchContacts"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Lọc
          </button>
        </div>
      </div>
    </div>

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

    <!-- Contacts Table -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thông tin liên hệ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tin nhắn
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
              v-for="contact in contacts"
              :key="contact._id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    <span class="text-sm font-medium text-gray-600">{{
                      contact.name.charAt(0).toUpperCase()
                    }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ contact.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ contact.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">
                  {{ contact.message }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': contact.status === true,
                    'bg-yellow-100 text-yellow-800': contact.status === false,
                  }"
                >
                  {{ contact.status ? "Đã xử lý" : "Chưa xử lý" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(contact.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="toggleStatus(contact._id, contact.status)"
                    :class="[
                      'px-3 py-1 rounded text-xs font-medium',
                      contact.status
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200',
                    ]"
                  >
                    {{
                      contact.status
                        ? "Đánh dấu chưa xử lý"
                        : "Đánh dấu đã xử lý"
                    }}
                  </button>
                  <button
                    @click="deleteContact(contact._id)"
                    class="text-red-600 hover:text-red-900 px-3 py-1 rounded text-xs font-medium hover:bg-red-50"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="contacts.length === 0 && !loading" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Không có liên hệ nào
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Chưa có liên hệ nào được gửi đến.
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="contacts.length > 0"
        class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.nextPage"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị
                <span class="font-medium">{{
                  (currentPage - 1) * limit + 1
                }}</span>
                đến
                <span class="font-medium">{{
                  Math.min(currentPage * limit, pagination.total)
                }}</span>
                trong tổng số
                <span class="font-medium">{{ pagination.total }}</span> liên hệ
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              >
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Trước</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  @click="nextPage"
                  :disabled="!pagination.nextPage"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Sau</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { httpRequest } from "~/utils/httpRequest";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

// Reactive data
const searchQuery = ref("");
const selectedStatus = ref("");
const currentPage = ref(1);
const limit = 10;
const loading = ref(false);
const contacts = ref([]);
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  nextPage: false,
  prePage: false,
});

// Debounced search
let searchTimeout;
const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    fetchContacts();
  }, 500);
};

// Fetch contacts from API
const fetchContacts = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: limit.toString(),
    });

    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    if (selectedStatus.value !== "") {
      params.append("status", selectedStatus.value);
    }

    const response = await httpRequest.get(`/contact?${params.toString()}`);

    contacts.value = response.data;
    pagination.value = {
      total: response.total,
      page: response.page,
      limit: response.limit,
      nextPage: response.nextPage,
      prePage: response.prePage,
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    // You might want to show a toast notification here
  } finally {
    loading.value = false;
  }
};

// Toggle contact status
const toggleStatus = async (id, currentStatus) => {
  try {
    await httpRequest.put(`/contact/${id}`, {
      status: !currentStatus,
    });

    // Update local state
    const contact = contacts.value.find((c) => c._id === id);
    if (contact) {
      contact.status = !currentStatus;
    }
  } catch (error) {
    console.error("Error updating contact status:", error);
  }
};

// Delete contact
const deleteContact = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
    try {
      await httpRequest.delete(`/contact/${id}`);

      // Remove from local state
      contacts.value = contacts.value.filter((contact) => contact._id !== id);

      // Refresh data if current page is empty
      if (contacts.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        fetchContacts();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }
};

// Pagination methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchContacts();
  }
};

const nextPage = () => {
  if (pagination.value.nextPage) {
    currentPage.value++;
    fetchContacts();
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
  fetchContacts();
});
</script>
