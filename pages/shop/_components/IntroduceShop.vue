<template>
  <section class="w-full bg-[#1f1d1c] text-[#e7d8c0] md:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <!-- Row 1: Image left, text right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <div
            class="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl"
          >
            <img
              src="https://www.vinmec.com/static/uploads/large_20210516_113632_727988_an_khoai_lang_moi_n_max_1800x1800_jpg_28f7417de4.jpg"
              alt="Khoai lang – đồ quê làm thủ công mỗi ngày"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div class="lg:col-span-7">
          <h2
            class="text-3xl sm:text-4xl font-semibold tracking-tight text-[#e7d8c0]"
          >
            Đồ Quê Làm Thủ Công
          </h2>
          <p class="mt-5 text-[#cdbfaa] leading-relaxed max-w-2xl">
            Khoai, sắn, đậu… được tuyển chọn mỗi ngày và chế biến theo cách mộc
            mạc tại bếp lửa quê. Vị bùi béo, thơm ngọt và dinh dưỡng—mang trọn
            hương vị tuổi thơ vào từng phần.
          </p>
          <div class="mt-8">
            <NuxtLink to="/menu" class="btn-dark">
              <span>Xem thực đơn</span>
              <span aria-hidden="true" class="ml-2">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Divider spacing -->
      <div class="h-12 sm:h-16" />

      <!-- Row 2: Text left, image right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-6 order-2 lg:order-1">
          <h2
            class="text-3xl sm:text-4xl font-semibold tracking-tight text-[#e7d8c0]"
          >
            Hương Vị Quê Nhà
          </h2>
          <div class="mt-5 text-[#cdbfaa] leading-relaxed max-w-2xl space-y-4">
            <p>
              Chào mừng bạn đến với Tiệm đồ quê: nơi có khoai lang nướng, sắn
              luộc, đậu phộng rang, bánh quê… tất cả đều mộc mạc, ấm áp đúng
              điệu đồng quê.
            </p>
            <p>
              Hãy ghé thưởng thức để đánh thức ký ức thân thương trong từng vị
              bùi bùi, dẻo ngọt—chúng tôi rất mong được chào đón bạn!
            </p>
          </div>
          <div class="mt-8">
            <NuxtLink to="/about" class="btn-dark">
              <span>Tìm hiểu thêm</span>
              <span aria-hidden="true" class="ml-2">→</span>
            </NuxtLink>
          </div>
        </div>
        <div class="lg:col-span-6 order-1 lg:order-2">
          <div
            class="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl"
          >
            <img
              src="https://nutrihome.vn/wp-content/uploads/2024/06/tieu-duong-co-an-khoai-mi-duoc-khong.jpg"
              alt="Sắn – món quê dân dã nhưng đầy yêu thương"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
  .btn-dark {
    @apply inline-flex items-center rounded-xl border border-white/20 bg-transparent px-5 py-3 text-[#e7d8c0] hover:bg-white/10 transition-colors;
  }
</style>
