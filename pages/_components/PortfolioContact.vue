<template>
  <!-- Contact Section -->
  <section id="contact" class="py-20 bg-gray-800/30">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          {{ contactData.title }}
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          {{ contactData.description }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div
            v-for="contact in contactData.contacts"
            :key="contact.label"
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
              <h3 class="text-lg font-semibold text-white">
                {{ contact.label }}
              </h3>
              <p class="text-gray-400">{{ contact.value }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-gray-800/50 p-8 rounded-lg">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Input
              v-model="form.name"
              type="text"
              placeholder="Your Name"
              size="lg"
              required
            />
            <Input
              v-model="form.email"
              type="email"
              placeholder="Your Email"
              size="lg"
              required
            />
            <Textarea
              v-model="form.message"
              placeholder="Your Message"
              :rows="4"
              size="lg"
              required
            />
            <Button @click="handleSubmit" variant="primary" size="lg" fullWidth>
              Send Message
            </Button>
          </form>
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

// Contact data
const contactData = portfolioContactData;

// Form data
const form = ref({
  name: "",
  email: "",
  message: "",
});

// Emit event for parent component
const emit = defineEmits(["submit"]);

// Handle form submission
const handleSubmit = () => {
  emit("submit", { ...form.value });

  // Reset form
  form.value = {
    name: "",
    email: "",
    message: "",
  };
};
</script>
