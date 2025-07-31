<template>
  <!-- Contact Section -->
  <section id="contact" class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ portfolioContactData.title }}
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          {{ portfolioContactData.description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <div
            v-for="(contact, index) in portfolioContactData.contacts"
            :key="index"
            class="flex items-center space-x-4"
          >
            <div
              class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="contact.icon"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold">{{ contact.label }}</h3>
              <p class="text-gray-400">{{ contact.value }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <Input
            v-model="formData.name"
            type="text"
            placeholder="Your Name"
            size="lg"
          />
          <Input
            v-model="formData.email"
            type="email"
            placeholder="Your Email"
            size="lg"
          />
          <Textarea
            v-model="formData.message"
            placeholder="Your Message"
            rows="4"
            size="lg"
          />
          <Button @click="handleSubmit" variant="primary" size="lg" fullWidth>
            Send Message
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioContactData } from "~/constants/PortfolioContactData";
import Button from "~/components/ui/Button.vue";
import Input from "~/components/ui/Input.vue";
import Textarea from "~/components/ui/Textarea.vue";

// Reactive form data
const formData = ref({
  name: "",
  email: "",
  message: "",
});

// Emit event khi submit form
const emit = defineEmits(["submit"]);

// Handle form submission
const handleSubmit = () => {
  emit("submit", formData.value);
  // Reset form after submission
  formData.value = {
    name: "",
    email: "",
    message: "",
  };
};
</script>
