<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact information -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">
            CONTACT US
          </h2>
          
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Our solutions help connect agencies and advertisers with the right publishers to maximize 
            their marketing performance. Get in touch with us to learn how we can help you achieve 
            your goals.
          </p>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Phone</p>
                <a href="tel:+84123456789" class="text-gray-600 hover:text-orange-600 transition-colors">
                  +84 123 456 789
                </a>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Email</p>
                <div class="space-y-1">
                  <p class="text-gray-600">
                    <span class="font-medium">Affiliate Account Manager:</span>
                    <br>
                    <a href="mailto:janice.kim@leadswise.com" class="hover:text-orange-600 transition-colors">
                      Ms. Janice Kim
                    </a>
                  </p>
                  <p class="text-gray-600">
                    <span class="font-medium">Advertiser Account Manager:</span>
                    <br>
                    <a href="mailto:elise.kim@leadswise.com" class="hover:text-orange-600 transition-colors">
                      Ms. Elise Kim
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Address</p>
                <p class="text-gray-600">Ho Chi Minh City, Viet Nam</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact form -->
        <div class="bg-gray-50 p-8 rounded-lg">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
          <Form @submit="handleSubmit" :validation-schema="contactSchema" v-slot="{ errors, isSubmitting }" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Name <span class="text-red-500 font-bold">*</span>
              </label>
              <Field 
                name="name"
                v-slot="{ field, errorMessage }"
              >
                <input 
                  v-bind="field"
                  type="text" 
                  :class="[
                    'w-full px-4 py-3 border rounded-lg transition-all duration-300',
                    errorMessage ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Your full name"
                >
                <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
              </Field>
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500 font-bold">*</span>
              </label>
              <Field 
                name="email"
                v-slot="{ field, errorMessage }"
              >
                <input 
                  v-bind="field"
                  type="email" 
                  :class="[
                    'w-full px-4 py-3 border rounded-lg transition-all duration-300',
                    errorMessage ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="your.email@example.com"
                >
                <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
              </Field>
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Phone <span class="text-red-500 font-bold">*</span>
              </label>
              <Field 
                name="phone"
                v-slot="{ field, errorMessage }"
              >
                <input 
                  v-bind="field"
                  type="tel" 
                  :class="[
                    'w-full px-4 py-3 border rounded-lg transition-all duration-300',
                    errorMessage ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Your phone number"
                >
                <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
              </Field>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message 
              </label>
              <Field 
                name="message"
                v-slot="{ field, errorMessage }"
              >
                <textarea 
                  v-bind="field"
                  rows="4"
                  :class="[
                    'w-full px-4 py-3 border rounded-lg transition-all duration-300',
                    'resize-none',
                    errorMessage ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
                <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
              </Field>
            </div>
            
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>CONTACT US</span>
            </button>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { contactSchema } from '~/forms/contactSchema'

// Handle form submission
const handleSubmit = async (values) => {
  try {
    // Handle form submission
    console.log('Form submitted:', values)
    
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.')
    
    // Reset form is handled automatically by Vee-Validate
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred. Please try again.')
  }
}
</script>

 