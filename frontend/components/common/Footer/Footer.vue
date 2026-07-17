<template>
  <footer
    class="bg-gray-800 dark:bg-gray-900 text-white py-8 sm:py-12 md:py-16 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mobile: 2 columns, Tablet: 2 columns, Desktop: 5 columns -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
        <!-- VỀ TÔI -->
        <div class="space-y-3 sm:space-y-4">
          <Typography
            as="h3"
            :size="{sp: 'md', pc: 'lg'}"
            weight="bold"
            color="white"
            class="mb-3 sm:mb-4"
          >
            VỀ TÔI
          </Typography>
          <ul class="space-y-2 sm:space-y-3">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80 hover:opacity-100">
                  Trang chủ
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                <Typography as="span" size="sm" color="white" class="opacity-80 hover:opacity-100">
                  Dự án & Portfolio
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blogs"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                <Typography as="span" size="sm" color="white" class="opacity-80 hover:opacity-100">
                  Blog & Tin tức
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#about"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                <Typography as="span" size="sm" color="white" class="opacity-80 hover:opacity-100">
                  Giới thiệu
                </Typography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- DỊCH VỤ -->
        <div class="space-y-3 sm:space-y-4">
          <Typography
            as="h3"
            :size="{sp: 'md', pc: 'lg'}"
            weight="bold"
            color="white"
            class="mb-3 sm:mb-4"
          >
            DỊCH VỤ
          </Typography>
          <ul class="space-y-2 sm:space-y-3">
            <li>
              <NuxtLink
                to="/projects"
                class="flex items-center gap-2 hover:text-orange-400 dark:hover:text-orange-300 transition-colors group"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                  <Icon name="code" size="sm" class="text-orange-500 group-hover:text-orange-400" />
                </div>
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80 group-hover:opacity-100">
                  Phát triển Web
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="flex items-center gap-2 hover:text-orange-400 dark:hover:text-orange-300 transition-colors group"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                  <Icon name="mobile" size="sm" class="text-blue-500 group-hover:text-blue-400" />
                </div>
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80 group-hover:opacity-100">
                  Ứng dụng Mobile
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="flex items-center gap-2 hover:text-orange-400 dark:hover:text-orange-300 transition-colors group"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                  <Icon name="database" size="sm" class="text-green-500 group-hover:text-green-400" />
                </div>
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80 group-hover:opacity-100">
                  API Development
                </Typography>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/blogs"
                class="flex items-center gap-2 hover:text-orange-400 dark:hover:text-orange-300 transition-colors group"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                  <Icon name="book" size="sm" class="text-purple-500 group-hover:text-purple-400" />
                </div>
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80 group-hover:opacity-100">
                  Blog & Tutorials
                </Typography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- LIÊN HỆ -->
        <div class="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
          <Typography
            as="h3"
            :size="{sp: 'md', pc: 'lg'}"
            weight="bold"
            color="white"
            class="mb-3 sm:mb-4"
          >
            LIÊN HỆ
          </Typography>
          <div class="space-y-2 sm:space-y-3">
            <div>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="mb-1 opacity-70">
                Email:
              </Typography>
              <a
                href="mailto:Nguyenledinhtien2507@gmail.com"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors block break-all"
              >
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white">
                  Nguyenledinhtien2507@gmail.com
                </Typography>
              </a>
            </div>
            <div>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="mb-1 opacity-70">
                Phone:
              </Typography>
              <a
                href="tel:+84886694350"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors"
              >
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white">
                  {{ config.public.SITE_PHONE }}
                </Typography>
              </a>
            </div>
            <div>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="mb-1 opacity-70">
                Địa chỉ:
              </Typography>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="opacity-80">
                Đà Nẵng, Việt Nam
              </Typography>
            </div>
          </div>
        </div>

        <!-- HỢP TÁC -->
        <div class="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
          <Typography
            as="h3"
            :size="{sp: 'md', pc: 'lg'}"
            weight="bold"
            color="white"
            class="mb-3 sm:mb-4"
          >
            HỢP TÁC
          </Typography>
          <div class="space-y-2 sm:space-y-3">
            <div>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="mb-1 opacity-70">
                Email hợp tác:
              </Typography>
              <a
                href="mailto:Nguyenledinhtien2507@gmail.com"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors block break-all"
              >
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white">
                  Nguyenledinhtien2507@gmail.com
                </Typography>
              </a>
            </div>
            <div>
              <Typography as="p" :size="{sp: 'xs', pc: 'sm'}" color="white" class="mb-1 opacity-70">
                Website:
              </Typography>
              <a
                :href="config.public.SITE_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-orange-400 dark:hover:text-orange-300 transition-colors block break-all"
              >
                <Typography as="span" :size="{sp: 'xs', pc: 'sm'}" color="white">
                  {{ config.public.SITE_URL?.replace('https://', '') }}
                </Typography>
              </a>
            </div>
          </div>
        </div>

        <!-- KẾT NỐI & TẢI APP -->
        <div class="space-y-4 sm:space-y-6 col-span-2 lg:col-span-1">
          <div>
            <Typography
              as="h3"
              :size="{sp: 'md', pc: 'lg'}"
              weight="bold"
              color="white"
              class="mb-3 sm:mb-4"
            >
              KẾT NỐI VỚI TÔI
            </Typography>
            <div class="flex items-center gap-3 sm:gap-4">
              <a
                v-if="config.public.SITE_FACEBOOK"
                :href="config.public.SITE_FACEBOOK"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Icon name="facebook" size="md" class="text-white" />
              </a>
              <a
                v-if="config.public.SITE_LINKEDIN"
                :href="config.public.SITE_LINKEDIN"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size="md" class="text-white" />
              </a>
              <a
                v-if="config.public.SITE_TWITTER"
                :href="config.public.SITE_TWITTER"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Icon name="twitter" size="md" class="text-white" />
              </a>
              <a
                v-if="config.public.SITE_GITHUB"
                :href="config.public.SITE_GITHUB"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Icon name="code" size="md" class="text-white" />
              </a>
            </div>
          </div>

          <!-- Copyright -->
          <div class="pt-4 sm:pt-6 border-t border-gray-700 dark:border-gray-600">
            <Typography as="p" :size="{sp: 'xxs', pc: 'xs'}" color="white" align="center" class="opacity-60">
              © {{ new Date().getFullYear() }} Nguyễn Lê Đình Tiên. All rights
              reserved.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const config = useRuntimeConfig()
</script>

