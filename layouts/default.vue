<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              DDD Demo
            </NuxtLink>
          </div>

          <nav class="hidden md:flex space-x-8">
            <NuxtLink
              to="/users"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              {{ $t('navigation.users') }}
            </NuxtLink>
            <NuxtLink
              to="/posts"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              {{ $t('navigation.posts') }}
            </NuxtLink>
          </nav>

          <div class="flex items-center space-x-4">
            <!-- Language Switcher -->
            <div class="relative">
              <select
                :value="$i18n.locale"
                @change="switchLanguage($event)"
                class="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇺🇸 EN</option>
              </select>
            </div>

            <!-- Mobile menu button -->
            <button
              @click="toggleMobileMenu"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg class="h-6 w-6" :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden" :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-gray-50">
            <NuxtLink
              to="/users"
              class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-blue-600 bg-blue-100"
              @click="closeMobileMenu"
            >
              {{ $t('navigation.users') }}
            </NuxtLink>
            <NuxtLink
              to="/posts"
              class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-blue-600 bg-blue-100"
              @click="closeMobileMenu"
            >
              {{ $t('navigation.posts') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <slot />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-gray-500">
            © 2025 Domain-Driven Design Demo. Built with Nuxt.
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const { $i18n } = useNuxtApp()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const switchLanguage = (event) => {
  $i18n.setLocale(event.target.value)
}

// Close mobile menu on route change
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>