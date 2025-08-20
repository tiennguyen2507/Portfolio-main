<template>
  <footer class="w-full bg-[#1f1d1c] text-[#e7d8c0] border-t border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <!-- Top row: branding + newsletter -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Branding -->
        <div class="lg:col-span-6">
          <div class="flex items-center gap-4">
            <div class="bg-[#fdf6ee] rounded-xl px-2">
              <img :src="logoSrc" alt="Tien Hanh Shop" class="h-12 w-auto" />
            </div>
            <div class="text-sm text-[#cdbfaa]">
              Đồ quê ngon – ấm vị tuổi thơ
            </div>
          </div>
          <p class="mt-6 max-w-xl text-[#cdbfaa]">
            Khoai, sắn, đậu phộng rang và nhiều món quê dân dã được làm mỗi
            ngày. Chúng tôi mang đến hương vị mộc mạc, sạch và tốt cho sức khỏe.
          </p>

          <!-- Socials -->
          <div class="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Instagram" class="social">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 17.8 2.8 2.8 0 0 0 12 9.2zm5.5-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
                />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" class="social">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                  d="M13.5 22v-8h2.7l.4-3H13.5V8.6c0-.9.3-1.5 1.7-1.5h1.4V4.4c-.7-.1-1.5-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.7v8h2.8z"
                />
              </svg>
            </a>
            <a href="#" aria-label="Google" class="social">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path
                  d="M21.8 10.2H12v3.6h5.6c-.3 1.8-2.1 5.2-5.6 5.2-3.4 0-6.2-2.8-6.2-6.2S8.6 6.6 12 6.6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17.1 3.7 14.8 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c6.4 0 9.2-4.5 9.2-9.2 0-.6 0-1.2-.1-1.8z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-6">
          <h3 class="text-xl sm:text-2xl font-medium text-[#e7d8c0]">
            Đăng ký nhận tin để nhận ưu đãi và cập nhật mới!
          </h3>
          <form
            class="mt-5 flex flex-col sm:flex-row gap-3"
            @submit.prevent="subscribe"
          >
            <input
              v-model="email"
              type="email"
              required
              placeholder="Nhập email của bạn"
              class="flex-1 rounded-xl bg-transparent border border-white/20 px-4 py-3 text-[#e7d8c0] placeholder-[#cdbfaa] focus:outline-none focus:ring-2 focus:ring-[#e7d8c0]/30"
            />
            <button type="submit" class="btn-subscribe">Đăng ký</button>
          </form>
        </div>
      </div>

      <!-- Bottom row -->
      <div
        class="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#cdbfaa]"
      >
        <div>© {{ year }} Tien Hanh Shop. Bảo lưu mọi quyền.</div>
        <div class="flex items-center gap-6">
          <NuxtLink to="/privacy" class="link">Chính sách riêng tư</NuxtLink>
          <NuxtLink to="/terms" class="link">Điều khoản</NuxtLink>
          <NuxtLink to="/cookies" class="link">Cookies</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import logoSrc from '~/assets/images/Tien-hanh-shop-logo-no-bg.webp'

  const email = ref('')
  const year = new Date().getFullYear()

  const subscribe = () => {
    if (!email.value) return
    // Demo only: thay bằng gọi API thực tế nếu có
    alert(`Đã đăng ký nhận tin với email: ${email.value}`)
    email.value = ''
  }
</script>

<style scoped>
  .social {
    @apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#e7d8c0] hover:bg-white/10 transition-colors;
  }
  .btn-subscribe {
    @apply inline-flex items-center justify-center rounded-xl bg-[#e7d8c0] text-[#1f1d1c] px-5 py-3 font-medium hover:bg-[#e2cda9] transition-colors whitespace-nowrap;
  }
  .link {
    @apply hover:text-[#e7d8c0] transition-colors;
  }
</style>
