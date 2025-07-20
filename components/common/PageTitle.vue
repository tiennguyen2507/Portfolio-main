<template>
  <div class="text-center py-16 bg-gradient-to-r from-gray-900 to-black text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        <slot name="title" />
      </h1>
      <p v-if="$slots.subtitle" class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
        <slot name="subtitle" />
      </p>
    </div>
  </div>
</template> 