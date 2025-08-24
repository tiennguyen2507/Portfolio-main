<template>
  <section>
    <h2
      class="text-2xl sm:text-3xl font-serif font-bold text-[#3b2b23] mb-3 text-left"
    >
      {{ title }}
    </h2>
    <p class="text-[#7a6657] text-sm sm:text-base mb-6 text-left">
      {{ description }}
    </p>

    <!-- Loading skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-8"
    >
      <div
        v-for="i in 8"
        :key="`${category}-skeleton-${i}`"
        class="animate-pulse"
      >
        <div class="bg-[#e8dccd] rounded-xl h-40 mb-3"></div>
        <div class="bg-[#e8dccd] rounded h-4 mb-2"></div>
        <div class="bg-[#e8dccd] rounded h-3 mb-2"></div>
        <div class="bg-[#e8dccd] rounded h-8"></div>
      </div>
    </div>

    <!-- No products state -->
    <div v-else-if="!loading && products.length === 0" class="text-center py-8">
      <p class="text-gray-500">Không có sản phẩm nào trong danh mục này</p>
    </div>

    <!-- Products -->
    <div v-else-if="!loading && products.length > 0">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 lg:gap-8 mb-6"
      >
        <Card
          v-for="product in paginatedProducts"
          :key="product._id"
          :item="product"
          :model-value="0"
          @add="onAdd"
        />
      </div>

      <!-- Pagination -->
      <div
        v-if="totalProducts > itemsPerPage"
        class="flex justify-center gap-2 mt-4"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg bg-[#3b2b23] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#2f221c] transition-colors"
        >
          Trước
        </button>
        <span class="px-4 py-2 text-[#3b2b23]">
          {{ currentPage }} / {{ Math.ceil(totalProducts / itemsPerPage) }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage >= Math.ceil(totalProducts / itemsPerPage)"
          class="px-4 py-2 rounded-lg bg-[#3b2b23] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#2f221c] transition-colors"
        >
          Sau
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import Card from './Card.vue'
  import httpRequest from '~/utils/httpRequest'

  // Props
  const props = defineProps({
    category: {
      type: String,
      required: true,
      validator: value => ['drink', 'breakfast'].includes(value),
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 8,
    },
  })

  // Emits
  const emit = defineEmits(['add', 'products-loaded'])

  // State
  const products = ref([])
  const loading = ref(true) // Bắt đầu với loading = true để hiển thị skeleton ngay
  const currentPage = ref(1)
  const totalProducts = ref(0)

  // Computed
  const paginatedProducts = computed(() => {
    return products.value
  })

  // Methods
  const fetchProducts = async (page = 1) => {
    loading.value = true

    try {
      const response = await httpRequest.get(
        `/products?category=${props.category}&page=${page}&limit=${props.itemsPerPage}`
      )

      if (response && response.data) {
        products.value = response.data
        // Giả sử API trả về total trong response
        if (response.total) {
          totalProducts.value = response.total
        }
      } else if (response && Array.isArray(response)) {
        products.value = response
      }
    } catch (err) {
      // Không cần set error, chỉ để products rỗng
    } finally {
      loading.value = false
      // Emit products để component cha có thể mapping giỏ hàng
      emit('products-loaded', products.value)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchProducts(currentPage.value)
    }
  }

  const nextPage = () => {
    const totalPages = Math.ceil(totalProducts.value / props.itemsPerPage)
    if (currentPage.value < totalPages) {
      currentPage.value++
      fetchProducts(currentPage.value)
    }
  }

  const onAdd = ({ item, quantity }) => {
    if (quantity <= 0) return
    emit('add', { item, quantity })
  }

  // Lifecycle
  onMounted(() => {
    fetchProducts()
  })

  // Watch products để reset pagination
  watch(products, () => {
    // Không cần reset currentPage nữa vì mỗi lần fetch sẽ set đúng page
  })
</script>

<style scoped>
  .btn-place {
    @apply inline-flex items-center justify-center rounded-xl bg-[#3b2b23] text-[#f7efe6] px-5 py-3 font-medium hover:bg-[#2f221c] transition-colors;
  }
</style>
