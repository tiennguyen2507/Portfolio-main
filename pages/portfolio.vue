<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header/Navigation -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img
              src="~/assets/images/logo-main.webp"
              alt="Logo"
              class="h-8 w-auto"
            />
          </div>
          <nav class="hidden md:flex space-x-8">
            <a
              href="#home"
              class="text-white hover:text-orange-500 transition-colors"
              >Home</a
            >
            <a
              href="#about"
              class="text-white hover:text-orange-500 transition-colors"
              >About</a
            >
            <a
              href="#projects"
              class="text-white hover:text-orange-500 transition-colors"
              >Projects</a
            >
            <a
              href="#contact"
              class="text-white hover:text-orange-500 transition-colors"
              >Contact</a
            >
          </nav>
          <button class="md:hidden text-white">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="pt-24 pb-16 min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Side - Introduction -->
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-6xl md:text-7xl font-bold">
                <span class="text-white">Hello.</span>
                <span class="text-orange-500 ml-2">●</span>
              </h1>
              <div class="flex items-center space-x-4">
                <span class="text-3xl md:text-4xl text-white"
                  >I'm Nguyễn Lê Đình Tiên</span
                >
                <div class="w-16 h-0.5 bg-orange-500"></div>
              </div>
              <h2 class="text-4xl md:text-5xl font-bold text-white">
                Software Developer
              </h2>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Got a project?
              </button>
              <button
                class="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                My resume
              </button>
            </div>
          </div>

          <!-- Right Side - Profile Picture -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative">
              <!-- Background decorative elements -->
              <div
                class="absolute -top-8 -left-8 w-32 h-32 border-2 border-orange-500/30 rounded-full"
              ></div>
              <div
                class="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-orange-500/20 rounded-full"
              ></div>

              <!-- Chevron shapes -->
              <div
                class="absolute -left-16 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-6xl font-bold"
              >
                &lt;
              </div>
              <div
                class="absolute -right-16 top-1/2 transform -translate-y-1/2 text-orange-500/30 text-6xl font-bold"
              >
                &gt;
              </div>

              <!-- Profile Image -->
              <div class="relative z-10">
                <div
                  class="w-80 h-80 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-4 border-orange-500/20 shadow-2xl flex items-center justify-center"
                >
                  <div class="text-center">
                    <div
                      class="w-32 h-32 bg-orange-500/30 rounded-full flex items-center justify-center mb-4"
                    >
                      <svg
                        class="w-16 h-16 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div class="text-orange-500 font-semibold text-lg">
                      Nguyễn Lê Đình Tiên
                    </div>
                    <div class="text-gray-400 text-sm">Software Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technologies Section -->
    <section class="py-16 bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-wrap justify-center gap-8 text-gray-400 text-lg">
          <span class="hover:text-orange-500 transition-colors">HTML</span>
          <span class="hover:text-orange-500 transition-colors">CSS</span>
          <span class="hover:text-orange-500 transition-colors"
            >Javascript</span
          >
          <span class="hover:text-orange-500 transition-colors">Node.js</span>
          <span class="hover:text-orange-500 transition-colors">React</span>
          <span class="hover:text-orange-500 transition-colors">Git</span>
          <span class="hover:text-orange-500 transition-colors">Github</span>
        </div>
      </div>
    </section>

    <!-- About & Services Section -->
    <section id="about" class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Left Side - Services -->
          <div class="relative">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-orange-500">
              <div
                class="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
              ></div>
              <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
              ></div>
              <div
                class="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full"
              ></div>
            </div>

            <div class="ml-8 space-y-12">
              <div class="flex items-center space-x-4">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white">
                    Website Development
                  </h3>
                  <p class="text-gray-400">Modern web applications</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
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
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white">
                    App Development
                  </h3>
                  <p class="text-gray-400">Mobile & desktop applications</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
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
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white">
                    Website Hosting
                  </h3>
                  <p class="text-gray-400">Reliable hosting solutions</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - About Me -->
          <div class="space-y-8">
            <h2 class="text-4xl md:text-5xl font-bold text-white">About me</h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              I started my software journey from photography. Through that, I
              learned to love the process of creating from scratch. Since then,
              this has led me to software development as it fulfills my love for
              learning and building things.
            </p>

            <!-- Statistics -->
            <div class="grid grid-cols-3 gap-8 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-500 mb-2">
                  <span>120</span>
                  <span class="text-orange-500">+</span>
                </div>
                <div class="text-gray-400">Completed Projects</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-500 mb-2">
                  <span>95</span>
                  <span class="text-orange-500">%</span>
                </div>
                <div class="text-gray-400">Client satisfaction</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-500 mb-2">
                  <span>10</span>
                  <span class="text-orange-500">+</span>
                </div>
                <div class="text-gray-400">Years of experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-800/30">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <div class="w-16 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <!-- Project Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="~/assets/images/blog-1.webp"
              alt="Project 1"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                E-commerce Platform
              </h3>
              <p class="text-gray-400 mb-4">
                A modern e-commerce solution built with React and Node.js
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >React</span
                >
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >Node.js</span
                >
              </div>
            </div>
          </div>

          <div
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="~/assets/images/blog-2.webp"
              alt="Project 2"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">Mobile App</h3>
              <p class="text-gray-400 mb-4">
                Cross-platform mobile application for task management
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >React Native</span
                >
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >Firebase</span
                >
              </div>
            </div>
          </div>

          <div
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          >
            <img
              src="~/assets/images/blog-3.webp"
              alt="Project 3"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">
                Dashboard System
              </h3>
              <p class="text-gray-400 mb-4">
                Analytics dashboard with real-time data visualization
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >Vue.js</span
                >
                <span
                  class="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                  >D3.js</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring
            your ideas to life.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-white font-semibold">Email</h3>
                <p class="text-gray-400">jensen@example.com</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-white font-semibold">Phone</h3>
                <p class="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-white font-semibold">Location</h3>
                <p class="text-gray-400">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            ></textarea>
            <button
              class="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-gray-400">
          &copy; 2024 Nguyễn Lê Đình Tiên. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: "Nguyễn Lê Đình Tiên - Software Developer Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Nguyễn Lê Đình Tiên is a passionate software developer specializing in web development, mobile apps, and modern technologies. View my portfolio and get in touch for your next project.",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/webp",
      href: "/favicon.webp",
    },
    {
      rel: "shortcut icon",
      type: "image/webp",
      href: "/favicon.webp",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon.webp",
    },
  ],
});

definePageMeta({
  layout: false, // Không sử dụng layout nào - trang trắng hoàn toàn
});
</script>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>
