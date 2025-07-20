<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Quản lý Leads</h1>
          <p class="text-gray-600 mt-2">Quản lý và theo dõi tất cả leads trong hệ thống</p>
        </div>
        <NuxtLink 
          to="/admin/leads/new" 
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm Lead mới
        </NuxtLink>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm theo tên, email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nguồn</label>
          <select 
            v-model="selectedSource" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Tất cả nguồn</option>
            <option value="Website">Website</option>
            <option value="Facebook">Facebook</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Email">Email</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
          <select 
            v-model="selectedStatus" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="New">Mới</option>
            <option value="Contacted">Đã liên hệ</option>
            <option value="Qualified">Đủ điều kiện</option>
            <option value="Converted">Đã chuyển đổi</option>
            <option value="Lost">Mất</option>
          </select>
        </div>
        <div class="flex items-end">
          <button 
            @click="applyFilters" 
            class="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Lọc
          </button>
        </div>
      </div>
    </div>

    <!-- Leads Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nguồn
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lead in filteredLeads" :key="lead.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">{{ lead.name.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ lead.name }}</div>
                    <div class="text-sm text-gray-500">{{ lead.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-blue-100 text-blue-800': lead.source === 'Website',
                        'bg-orange-100 text-orange-800': lead.source === 'Facebook',
                        'bg-yellow-100 text-yellow-800': lead.source === 'Google Ads',
                        'bg-purple-100 text-purple-800': lead.source === 'Email'
                      }">
                  {{ lead.source }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-gray-100 text-gray-800': lead.status === 'New',
                        'bg-blue-100 text-blue-800': lead.status === 'Contacted',
                        'bg-yellow-100 text-yellow-800': lead.status === 'Qualified',
                        'bg-orange-100 text-orange-800': lead.status === 'Converted',
                        'bg-red-100 text-red-800': lead.status === 'Lost'
                      }">
                  {{ getStatusText(lead.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(lead.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button 
                    @click="editLead(lead.id)" 
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Sửa
                  </button>
                  <button 
                    @click="deleteLead(lead.id)" 
                    class="text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
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
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị <span class="font-medium">{{ startIndex + 1 }}</span> đến 
                <span class="font-medium">{{ endIndex }}</span> trong tổng số 
                <span class="font-medium">{{ totalLeads }}</span> leads
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Trước</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage 
                      ? 'z-10 bg-orange-50 border-orange-500 text-orange-600' 
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Sau</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
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
definePageMeta({
  layout: 'admin'
})

// Reactive data
const searchQuery = ref('')
const selectedSource = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Mock data
const leads = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    source: 'Website',
    status: 'New',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    source: 'Facebook',
    status: 'Contacted',
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0369852147',
    source: 'Google Ads',
    status: 'Qualified',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0521478963',
    source: 'Email',
    status: 'Converted',
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0741852963',
    source: 'Website',
    status: 'Lost',
    createdAt: '2024-01-11T11:00:00Z'
  }
])

// Computed properties
const filteredLeads = computed(() => {
  let filtered = leads.value

  if (searchQuery.value) {
    filtered = filtered.filter(lead => 
      lead.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedSource.value) {
    filtered = filtered.filter(lead => lead.source === selectedSource.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(lead => lead.status === selectedStatus.value)
  }

  return filtered
})

const totalLeads = computed(() => filteredLeads.value.length)
const totalPages = computed(() => Math.ceil(totalLeads.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalLeads.value))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const applyFilters = () => {
  currentPage.value = 1
}

const getStatusText = (status) => {
  const statusMap = {
    'New': 'Mới',
    'Contacted': 'Đã liên hệ',
    'Qualified': 'Đủ điều kiện',
    'Converted': 'Đã chuyển đổi',
    'Lost': 'Mất'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const editLead = (id) => {
  console.log('Edit lead:', id)
  // Navigate to edit page
}

const deleteLead = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa lead này?')) {
    leads.value = leads.value.filter(lead => lead.id !== id)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script> 