<template>
  <div
    class="rounded-xl sm:rounded-2xl bg-[#f6eadb] ring-1 ring-[#e8dccd] shadow-sm overflow-hidden"
  >
    <div
      class="sm:w-full overflow-hidden flex items-center justify-center p-2 md:p-4"
    >
      <Image
        :src="item.thumbnail"
        :alt="item.title"
        custom-class="w-20 h-20 md:w-40  md:h-40 object-cover rounded-lg"
      />
    </div>

    <div class="px-3 sm:p-5">
      <h3 class="text-sm sm:text-lg font-semibold text-[#3b2b23] truncate">
        {{ item.title }}
      </h3>
      <ViewEditor
        :content="item.description"
        variant="default"
        custom-class="mt-2 text-[#7a6657] leading-relaxed text-xs sm:text-sm clamp-3 min-h-[58px]"
        :truncate="true"
        :max-length="150"
      />

      <div class="mt-2 flex items-center justify-between">
        <label class="text-[#4b3e35] text-xs sm:text-sm hidden sm:block"
          >Số lượng:</label
        >
        <QuantityInput v-model="localQty" :max="max" :invalid="invalidQty" />
      </div>

      <div
        class="mt-0 md:mt-4 flex items-center justify-between flex-col sm:flex-row gap-1 pb-2 sm:pb-0"
      >
        <div class="text-[#3b2b23]">
          <span class="text-sm sm:text-lg font-semibold">{{
            formatPrice(item.price)
          }}</span>
          <span class="text-xs sm:text-sm text-[#7a6657]"> /phần</span>
        </div>
        <button
          class="add-btn px-3 py-1.5 sm:px-4 sm:py-2 text-sm w-full sm:w-auto"
          @click="addToCart"
          :disabled="localQty <= 0 || isAdding"
        >
          <Loading
            v-if="isAdding"
            size="xs"
            color="white"
            text=""
            container-class="py-0"
          />
          <span v-else>Thêm</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import QuantityInput from '~/pages/shop/_components/QuantityInput.vue'
  import Image from '~/components/ui/Image.vue'
  import Loading from '~/components/ui/Loading.vue'
  import ViewEditor from '~/components/ui/ViewEditor.vue'
  const props = defineProps({
    item: { type: Object, required: true },
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 20 },
  })
  const emit = defineEmits(['update:modelValue', 'add'])
  const cart = useLocalStorage('th_shop_cart', {})
  const localQty = ref(props.modelValue)
  const invalidQty = ref(false)
  const isAdding = ref(false)
  watch(
    () => props.modelValue,
    v => {
      if (v !== localQty.value) localQty.value = v
    }
  )
  watch(localQty, v => {
    const sv = sanitize(v)
    emit('update:modelValue', sv)
    if (invalidQty.value && sv > 0) invalidQty.value = false
  })

  const sanitize = v =>
    Math.min(props.max, Math.max(0, Number.isFinite(v) ? v : 0))
  const decrease = () => (localQty.value = sanitize(localQty.value - 1))
  const increase = () => (localQty.value = sanitize(localQty.value + 1))
  const addToCart = async () => {
    const qty = sanitize(localQty.value) || 1
    if (qty <= 0) {
      invalidQty.value = true
      return
    }

    // Bắt đầu loading
    isAdding.value = true

    try {
      // Delay 1 giây để hiển thị loading
      await new Promise(resolve => setTimeout(resolve, 500))

      // Thực hiện action thêm vào giỏ hàng
      const current = cart.value?.[props.item._id] || 0
      cart.value = { ...(cart.value || {}), [props.item._id]: current + qty }
      emit('add', { item: props.item, quantity: qty })

      // Reset số lượng về 0
      localQty.value = 0

      // Hiển thị thông báo thành công
      alert('Đã thêm vào giỏ hàng!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng!')
    } finally {
      // Kết thúc loading
      isAdding.value = false
    }
  }

  const formatPrice = v =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(v)
</script>

<style scoped>
  .qty-btn {
    @apply h-9 w-9 inline-flex items-center justify-center rounded-lg bg-white/70 border border-[#e5d6c3] text-[#3b2b23] hover:bg-white;
  }
  .add-btn {
    @apply inline-flex items-center justify-center rounded-xl bg-[#3b2b23] text-[#f7efe6] px-4 py-2 hover:bg-[#2f221c];
  }
  .add-btn:disabled {
    @apply bg-[#a58e7f] text-white/70 cursor-not-allowed opacity-60 hover:bg-[#a58e7f];
  }
  .input-error {
    @apply border-red-500 ring-1 ring-red-300;
  }
</style>
