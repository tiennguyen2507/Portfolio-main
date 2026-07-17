<template>
  <div class="mb-4 sm:mb-6">
    <div
      class="flex items-center justify-between gap-3 sm:gap-4"
    >
      <div class="flex-1 min-w-0 mr-2">
        <Typography
          as="h1"
          :size="{ sp: 'lg', pc: '2xl' }"
          weight="bold"
          color="default"
          class="truncate sm:whitespace-normal"
        >
          {{ title }}
        </Typography>
        <Typography
          v-if="subtitle"
          as="p"
          :size="{ sp: 'xs', pc: 'sm' }"
          color="muted"
          class="mt-1 sm:mt-2 line-clamp-2"
        >
          {{ subtitle }}
        </Typography>
      </div>
      <div class="flex items-center justify-end shrink-0">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Typography from '~/components/ui/Typography.vue'

  defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  })
</script>

