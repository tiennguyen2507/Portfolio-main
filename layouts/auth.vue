<template>
  <div
    class="relative min-h-[100svh] bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
  >
    <!-- Decorative background -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        class="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-orange-200/40 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-orange-300/30 blur-3xl"
      ></div>
    </div>

    <div class="relative w-full max-w-md">
      <div
        class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6"
      >
        <div class="space-y-4">
          <div class="text-center">
            <NuxtLink to="/" aria-label="Trang chủ">
              <img
                class="mx-auto h-12 w-auto"
                src="/assets/images/logo-main.webp"
                alt="Logo"
              />
            </NuxtLink>
          </div>
          <main class="w-full">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
