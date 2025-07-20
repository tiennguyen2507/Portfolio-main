<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">      <!-- FAQ Categories -->
      <div class="space-y-12">
        <div v-for="(category, categoryIndex) in faqData" :key="categoryIndex" class="max-w-7xl mx-auto">
          <!-- Category Title -->
          <h3 class="text-2xl md:text-3xl font-bold text-black mb-8 text-left">
            {{ category.title }}
          </h3>

          <!-- FAQ Items -->
          <div class="space-y-4">
            <div 
              v-for="(item, itemIndex) in category.items" 
              :key="itemIndex"
              class="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300"
              :class="{ 'ring-2 ring-orange-500': item.isOpen }"
            >
              <!-- Question Header -->
              <button
                @click="toggleFaq(categoryIndex, itemIndex)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                :class="{ 'bg-orange-500 text-white hover:bg-orange-600': item.isOpen, 'bg-white text-black': !item.isOpen }"
              >
                <h4 class="text-lg font-semibold pr-4">
                  {{ item.question }}
                </h4>
                <div class="flex-shrink-0">
                  <svg 
                    class="w-6 h-6 transition-transform duration-300"
                    :class="{ 'rotate-180': item.isOpen }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <!-- Answer Content -->
              <div 
                v-show="item.isOpen"
                class="px-6 py-4 bg-gray-50 text-gray-700"
              >
                <div 
                  class="prose max-w-none"
                  v-html="item.answer"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// FAQ Data Structure
const faqData = ref([
  {
    title: 'GENERAL QUESTIONS',
    items: [
      {
        question: 'How can I get in touch with LeadsWise?',
        answer: 'Email: <a href="mailto:contact@leadswisenetwork.com" class="text-orange-400 hover:text-orange-300 underline">contact@leadswisenetwork.com</a><br><br>Or Sign up as an Advertiser/ Publisher and unlock a world of opportunities. Visit <a href="https://LeadsWiseNetwork.com" class="text-orange-400 hover:text-orange-300 underline" target="_blank">https://LeadsWiseNetwork.com</a> to learn more.',
        isOpen: true
      },
      {
        question: 'Is there a fee to activate my account?',
        answer: 'No, there are no fees to activate your account with LeadsWise Network. We believe in providing accessible opportunities for both advertisers and publishers to grow their businesses.',
        isOpen: false
      },
      {
        question: 'What should I do if my account is suspended or blocked?',
        answer: 'If your account is suspended or blocked, please contact our support team immediately at <a href="mailto:support@leadswisenetwork.com" class="text-orange-400 hover:text-orange-300 underline">support@leadswisenetwork.com</a>. We will review your case and provide guidance on how to resolve the issue.',
        isOpen: false
      },
      {
        question: 'What types of campaigns do you offer?',
        answer: 'We offer a wide variety of campaign types including:<br><br>• <strong>Lead Generation</strong> - Collect qualified leads for your business<br>• <strong>E-commerce</strong> - Drive sales for your products and services<br>• <strong>App Installs</strong> - Promote mobile applications<br>• <strong>Email Subscriptions</strong> - Build your email list<br>• <strong>Survey Completions</strong> - Gather market research data<br>• <strong>And many more...</strong>',
        isOpen: false
      },
      {
        question: 'How can I monitor the performance of my campaigns?',
        answer: 'Our comprehensive dashboard provides real-time analytics including:<br><br>• <strong>Conversion Tracking</strong> - Monitor clicks, leads, and sales<br>• <strong>Performance Metrics</strong> - Track CTR, conversion rates, and ROI<br>• <strong>Geographic Data</strong> - See where your traffic is coming from<br>• <strong>Publisher Performance</strong> - Identify your top-performing partners<br>• <strong>Revenue Reports</strong> - Detailed financial insights',
        isOpen: false
      },
      {
        question: 'If my campaign is performing exceptionally well, when will I be paid for conversions?',
        answer: 'We offer flexible payment terms based on your campaign performance:<br><br>• <strong>Standard Terms</strong> - Net 30 days for regular campaigns<br>• <strong>High-Performing Campaigns</strong> - Accelerated payments available<br>• <strong>Volume Discounts</strong> - Better rates for high-volume advertisers<br>• <strong>Multiple Payment Methods</strong> - Bank transfer, PayPal, and more',
        isOpen: false
      }
    ]
  },
  {
    title: 'ADVERTISER QUESTIONS',
    items: [
      {
        question: 'How Do I Create An Advertiser Account?',
        answer: 'Creating an advertiser account is simple:<br><br>1. <strong>Visit our website</strong> and click "Advertiser Sign Up"<br>2. <strong>Fill out the application form</strong> with your business details<br>3. <strong>Submit required documents</strong> (business license, tax info)<br>4. <strong>Wait for approval</strong> (usually 1-2 business days)<br>5. <strong>Start creating campaigns</strong> and connect with publishers<br><br>Our team will guide you through the entire process and help you get started.',
        isOpen: false
      },
      {
        question: 'What are the minimum requirements to start advertising?',
        answer: 'To start advertising with LeadsWise Network, you need:<br><br>• <strong>Valid Business</strong> - Registered company or LLC<br>• <strong>Website</strong> - Professional landing page or website<br>• <strong>Budget</strong> - Minimum $500 monthly spend<br>• <strong>Compliance</strong> - Adhere to our terms and policies<br>• <strong>Quality Content</strong> - Clear value proposition for users',
        isOpen: false
      },
      {
        question: 'How much does it cost to advertise on your network?',
        answer: 'Our pricing is competitive and transparent:<br><br>• <strong>No Setup Fees</strong> - Start advertising immediately<br>• <strong>Performance-Based</strong> - Pay only for results<br>• <strong>Flexible Budgets</strong> - Set your own spending limits<br>• <strong>Volume Discounts</strong> - Better rates for higher spend<br>• <strong>No Hidden Costs</strong> - Clear, upfront pricing',
        isOpen: false
      },
      {
        question: 'What targeting options are available?',
        answer: 'We offer comprehensive targeting options:<br><br>• <strong>Geographic Targeting</strong> - Target specific countries, states, or cities<br>• <strong>Demographic Targeting</strong> - Age, gender, income level<br>• <strong>Interest-Based</strong> - Target users based on their interests<br>• <strong>Device Targeting</strong> - Mobile, desktop, or tablet<br>• <strong>Time-Based</strong> - Schedule campaigns for optimal times<br>• <strong>Publisher Selection</strong> - Choose specific publishers or categories',
        isOpen: false
      },
      {
        question: 'How do I track my campaign performance?',
        answer: 'Track your campaigns through our advanced dashboard:<br><br>• <strong>Real-Time Analytics</strong> - Monitor performance as it happens<br>• <strong>Conversion Tracking</strong> - Track leads, sales, and other actions<br>• <strong>Publisher Reports</strong> - See which publishers drive results<br>• <strong>ROI Calculator</strong> - Calculate your return on investment<br>• <strong>Custom Reports</strong> - Generate reports for your specific needs<br>• <strong>API Access</strong> - Integrate with your existing tools',
        isOpen: false
      }
    ]
  },
  {
    title: 'PUBLISHER QUESTIONS',
    items: [
      {
        question: 'How do I become a publisher?',
        answer: 'Join our publisher network in just a few steps:<br><br>1. <strong>Apply Online</strong> - Complete our publisher application<br>2. <strong>Website Review</strong> - We review your traffic quality<br>3. <strong>Account Setup</strong> - Get your tracking links and creatives<br>4. <strong>Start Earning</strong> - Begin promoting offers immediately<br><br>We welcome publishers of all sizes, from individual bloggers to large media companies.',
        isOpen: false
      },
      {
        question: 'What types of publishers do you work with?',
        answer: 'We work with diverse publisher types:<br><br>• <strong>Content Websites</strong> - Blogs, news sites, and content platforms<br>• <strong>Social Media</strong> - Influencers and social media marketers<br>• <strong>Email Marketers</strong> - Newsletter publishers and email lists<br>• <strong>Search Marketers</strong> - PPC and SEO specialists<br>• <strong>Mobile App Publishers</strong> - App developers and mobile marketers<br>• <strong>Video Content Creators</strong> - YouTube and video platform publishers',
        isOpen: false
      },
      {
        question: 'How and when do I get paid?',
        answer: 'We offer flexible payment options:<br><br>• <strong>Payment Schedule</strong> - Monthly payments on the 15th<br>• <strong>Minimum Payout</strong> - $50 for most payment methods<br>• <strong>Payment Methods</strong> - PayPal, bank transfer, check<br>• <strong>Payment Tracking</strong> - Real-time earnings dashboard<br>• <strong>Tax Documents</strong> - 1099 forms for US publishers<br>• <strong>International Payments</strong> - Available for global publishers',
        isOpen: false
      }
    ]
  }
])

// Toggle FAQ function
const toggleFaq = (categoryIndex, itemIndex) => {
  // Close all other FAQs in the same category
  faqData.value[categoryIndex].items.forEach((item, index) => {
    if (index !== itemIndex) {
      item.isOpen = false
    }
  })
  
  // Toggle the clicked FAQ
  faqData.value[categoryIndex].items[itemIndex].isOpen = !faqData.value[categoryIndex].items[itemIndex].isOpen
}
</script>

<style scoped>
/* Custom styles for the FAQ component */
.prose a {
  @apply text-orange-500 hover:text-orange-600 underline transition-colors duration-200;
}

.prose strong {
  @apply text-black font-semibold;
}

.prose ul {
  @apply list-disc list-inside space-y-1;
}

.prose ol {
  @apply list-decimal list-inside space-y-1;
}
</style> 