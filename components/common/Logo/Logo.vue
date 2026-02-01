<template>
  <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
    <div
      class="flex items-center gap-2 md:gap-3"
    >
      <img
        src="~/assets/images/logo-main.webp"
        alt="Nguyễn Lê Đình Tiên Logo"
        class="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl flex-shrink-0"
      />
      <div class="flex flex-col justify-center">
        <Typography
          as="span"
          :size="{sp: 'xxs', pc: 'sm'}"
          weight="semibold"
          :class="titleClass"
        >
          TienNLD2
        </Typography>
        <Typography
          as="span"
          :size="{sp: 'xxs', pc: 'md'}"
          color="muted"
          :class="subtitleClass"
        >
          software engineer
        </Typography>
      </div>
    </div>
  </NuxtLink>
</template> 

<script setup>
  const props = defineProps({
    titleClass: {
      type: String,
      default: '',
    },
    subtitleClass: {
      type: String,
      default: '',
    },
  })
</script>

