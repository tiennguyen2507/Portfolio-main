<template>
  <div class="sm:mb-2">
    <div class="flex sm:flex-row sm:justify-between sm:items-start gap-4">
      <div class="flex-1">
        <Typography
          as="h1"
          :size="{ sp: 'xl', pc: '2xl' }"
          weight="bold"
          color="default"
        >
          {{ title }}
        </Typography>
        <Typography
          v-if="subtitle"
          as="p"
          size="sm"
          color="muted"
          class="mt-1"
        >
          {{ subtitle }}
        </Typography>
      </div>
      <div class="flex items-center justify-end sm:justify-start">
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

