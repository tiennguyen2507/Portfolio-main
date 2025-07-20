<template>
  <footer class="bg-orange-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main footer content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Logo and description -->
        <div class="lg:col-span-2">
          <div class="mb-4">
            <div class="flex items-center space-x-3">
              <!-- Logo Image -->
              <img 
                src="/assets/images/logo.webp" 
                alt="Leadsmax Network Logo" 
                class="h-12 w-auto"
              />
              <!-- Text Logo (fallback) -->
              <div class="flex flex-col">
                <div class="text-2xl font-serif font-bold">
                  <span class="text-white">Leads</span>
                  <span class="text-orange-500">max</span>
                </div>
                <div class="text-xs italic text-white font-light">NETWORK</div>
              </div>
            </div>
          </div>
          <p class="text-orange-100 mb-6 max-w-md">
            Empowering affiliate marketing partnerships with trust, transparency, and growth-focused solutions.
          </p>
          <!-- Social media icons -->
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-orange-700 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/advertisers" class="text-orange-100 hover:text-white transition-colors">ADVERTISERS</NuxtLink></li>
            <li><NuxtLink to="/publishers" class="text-orange-100 hover:text-white transition-colors">PUBLISHERS</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-orange-100 hover:text-white transition-colors">ABOUT</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="text-orange-100 hover:text-white transition-colors">PRICING</NuxtLink></li>
            <li><NuxtLink to="/faqs" class="text-orange-100 hover:text-white transition-colors">FAQS</NuxtLink></li>
            <li><NuxtLink to="/careers" class="text-orange-100 hover:text-white transition-colors">CAREERS</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-orange-100 hover:text-white transition-colors">CONTACT US</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact information -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
          <div class="space-y-3 text-orange-100">
            <div>
              <p class="font-medium">NGUYEN THI THONG</p>
              <p>General Manager</p>
            </div>
            <div>
              <p class="font-medium">Email:</p>
              <a href="mailto:leadswisenetwork@gmail.com" class="hover:text-white transition-colors">
                leadswisenetwork@gmail.com
              </a>
            </div>
            <div>
              <p class="font-medium">Phone:</p>
              <a href="tel:+84123456789" class="hover:text-white transition-colors">
                +84 123 456 789
              </a>
            </div>
            <div>
              <p class="font-medium">Address:</p>
              <p>Ha Tinh, Viet Nam</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-orange-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-orange-100">
            © 2024 Copyright LeadsWise Network. All rights reserved.
          </p>
          <div class="flex space-x-6 text-sm">
            <NuxtLink to="/privacy" class="text-orange-100 hover:text-white transition-colors">
              Privacy Policy
            </NuxtLink>
            <span class="text-orange-600">|</span>
            <NuxtLink to="/terms" class="text-orange-100 hover:text-white transition-colors">
              Terms of Service
            </NuxtLink>
            <span class="text-orange-600">|</span>
            <NuxtLink to="/cookies" class="text-orange-100 hover:text-white transition-colors">
              Cookie Policy
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template> 