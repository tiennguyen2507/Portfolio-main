<template>
  <section
    class="min-h-[100svh] bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6"
    >
      <NuxtLink to="/" aria-label="Trang chủ" class="block text-center mb-6">
        <img
          class="mx-auto h-12 w-auto"
          src="/assets/images/logo-main.webp"
          alt="Logo"
        />
      </NuxtLink>
      <slot />
    </div>
  </section>
</template>
