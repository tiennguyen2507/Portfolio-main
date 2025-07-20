<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="blog in blogs" 
          :key="blog.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
        >
          <!-- Blog Image -->
          <div class="relative overflow-hidden h-48">
            <img 
              :src="blog.image" 
              :alt="blog.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {{ blog.category }}
              </span>
            </div>
            <!-- Read Time -->
            <div class="absolute top-4 right-4">
              <span class="bg-black/70 text-white px-2 py-1 rounded text-xs">
                {{ blog.readTime }} min read
              </span>
            </div>
          </div>

          <!-- Blog Content -->
          <div class="p-6">
            <!-- Date -->
            <div class="flex items-center text-sm text-gray-500 mb-3">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ blog.date }}
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
              {{ blog.title }}
            </h3>

            <!-- Excerpt -->
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ blog.excerpt }}
            </p>

            <!-- Author -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img 
                  :src="blog.author.avatar" 
                  :alt="blog.author.name"
                  class="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ blog.author.name }}</p>
                  <p class="text-xs text-gray-500">{{ blog.author.role }}</p>
                </div>
              </div>
              
              <!-- Read More Button -->
              <button class="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Read More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-12">
        <button class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          Load More Articles
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Blog data
const blogs = ref([
  {
    id: 1,
    title: "10 Proven Strategies to Boost Your Affiliate Marketing Revenue in 2024",
    excerpt: "Discover the most effective affiliate marketing strategies that top performers are using to increase their revenue and grow their business in the competitive digital landscape.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    category: "Strategy",
    readTime: 8,
    date: "March 15, 2024",
    author: {
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "/images/ab-1.webp"
    }
  },
  {
    id: 2,
    title: "The Complete Guide to Lead Generation for Affiliate Marketers",
    excerpt: "Learn how to generate high-quality leads that convert into sales. This comprehensive guide covers everything from lead magnets to email marketing automation.",
    image: "/images/blog-2.webp",
    category: "Lead Generation",
    readTime: 12,
    date: "March 12, 2024",
    author: {
      name: "Mike Chen",
      role: "Lead Generation Expert",
      avatar: "/images/ab-2.webp"
    }
  },
  {
    id: 3,
    title: "How to Build Trust and Credibility in Your Affiliate Marketing Business",
    excerpt: "Trust is the foundation of successful affiliate marketing. Learn proven techniques to build credibility with your audience and increase conversion rates.",
    image: "/images/ab-3.webp",
    category: "Trust Building",
    readTime: 6,
    date: "March 10, 2024",
    author: {
      name: "Emma Davis",
      role: "Content Strategist",
      avatar: "/images/ab-3.webp"
    }
  },
  {
    id: 4,
    title: "Top 5 Affiliate Marketing Tools Every Publisher Should Use",
    excerpt: "Discover the essential tools and software that will streamline your affiliate marketing operations and help you scale your business efficiently.",
    image: "/images/blog-4.webp",
    category: "Tools",
    readTime: 10,
    date: "March 8, 2024",
    author: {
      name: "David Wilson",
      role: "Tech Specialist",
      avatar: "/images/ab-4.webp"
    }
  },
  {
    id: 5,
    title: "Social Media Marketing for Affiliate Marketers: Best Practices",
    excerpt: "Master social media marketing to promote your affiliate products effectively. Learn platform-specific strategies and content creation tips.",
    image: "/images/blog-2.webp",
    category: "Social Media",
    readTime: 9,
    date: "March 5, 2024",
    author: {
      name: "Lisa Rodriguez",
      role: "Social Media Manager",
      avatar: "/images/ab-1.webp"
    }
  },
  {
    id: 6,
    title: "Email Marketing Automation: The Secret Weapon of Successful Affiliates",
    excerpt: "Automate your email marketing campaigns to nurture leads and drive sales. Learn how to create effective email sequences that convert.",
    image: "/images/blog-4.webp",
    category: "Email Marketing",
    readTime: 11,
    date: "March 3, 2024",
    author: {
      name: "Alex Thompson",
      role: "Email Marketing Expert",
      avatar: "/images/ab-2.webp"
    }
  }
])
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:text-orange-500 {
  color: #f97316;
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
</style> 