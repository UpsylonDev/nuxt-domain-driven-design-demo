<template>

  <div class="min-h-screen bg-gray-50">
     <!-- Mobile-first header with bottom navigation -->
    <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">

      <div class="px-4 py-3">

        <div class="flex items-center justify-between">
           <NuxtLink to="/" class="text-lg font-bold text-gray-900"> DDD Demo </NuxtLink>
          <div class="flex items-center space-x-3">
             <!-- Language Switcher - Mobile optimized --> <button
              class="bg-gray-100 rounded-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="toggleLanguageMenu"
            >
               <span v-if="$i18n.locale === 'fr'">🇫🇷</span> <span v-else>🇺🇸</span> </button
            > <!-- Menu toggle --> <button
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="toggleMenu"
            >
               <svg
                class="h-5 w-5"
                :class="{ hidden: menuOpen, block: !menuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                 </svg
              > <svg
                class="h-5 w-5"
                :class="{ block: menuOpen, hidden: !menuOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
                 </svg
              > </button
            >
          </div>

        </div>

      </div>
       <!-- Language dropdown menu -->
      <div
        v-if="languageMenuOpen"
        class="absolute top-full right-4 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50"
      >
         <button
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
          :class="{ 'bg-blue-50 text-blue-600': $i18n.locale === 'fr' }"
          @click="switchLanguage('fr')"
        >
           🇫🇷 Français </button
        > <button
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
          :class="{ 'bg-blue-50 text-blue-600': $i18n.locale === 'en' }"
          @click="switchLanguage('en')"
        >
           🇺🇸 English </button
        >
      </div>
       <!-- Slide-out menu -->
      <div
        class="fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out"
        :class="{ 'translate-x-0': menuOpen, 'translate-x-full': !menuOpen }"
      >

        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeMenu" />

        <div class="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">

          <div class="p-4 pt-16">

            <nav class="space-y-2">
               <NuxtLink
                to="/users"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                active-class="text-blue-600 bg-blue-50"
                @click="closeMenu"
                > <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                   </svg
                > {{ $t('navigation.users') }} </NuxtLink
              > <NuxtLink
                to="/posts"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                active-class="text-blue-600 bg-blue-50"
                @click="closeMenu"
                > <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                   </svg
                > {{ $t('navigation.posts') }} </NuxtLink
              >
            </nav>

          </div>

        </div>

      </div>

    </header>
     <!-- Main content with padding for fixed header -->
    <main class="pt-16 pb-20 min-h-screen">

      <div class="px-4 py-4"> <slot /> </div>

    </main>
     <!-- Mobile bottom navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">

      <div class="flex justify-around py-2">
         <NuxtLink
          to="/"
          class="flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors"
          active-class="text-blue-600"
          exact-active-class="text-blue-600"
          > <svg class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
             </svg
          > {{ $t('navigation.home') }} </NuxtLink
        > <NuxtLink
          to="/users"
          class="flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors"
          active-class="text-blue-600"
          > <svg class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
             </svg
          > {{ $t('navigation.users') }} </NuxtLink
        > <NuxtLink
          to="/posts"
          class="flex flex-col items-center py-2 px-4 text-xs font-medium transition-colors"
          active-class="text-blue-600"
          > <svg class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
             </svg
          > {{ $t('navigation.posts') }} </NuxtLink
        > <button
          class="flex flex-col items-center py-2 px-4 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          @click="toggleMenu"
        >
           <svg class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
             </svg
          > Menu </button
        >
      </div>

    </nav>

  </div>

</template>

<script setup>
const menuOpen = ref(false)
const languageMenuOpen = ref(false)
const { $i18n } = useNuxtApp()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  languageMenuOpen.value = false
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleLanguageMenu = () => {
  languageMenuOpen.value = !languageMenuOpen.value
  menuOpen.value = false
}

const switchLanguage = locale => {
  $i18n.setLocale(locale)
  languageMenuOpen.value = false
}

// Close menus on route change
watch(
  () => useRoute().path,
  () => {
    menuOpen.value = false
    languageMenuOpen.value = false
  }
)

// Close menus when clicking outside
onMounted(() => {
  const handleClickOutside = event => {
    if (
      !event.target.closest('.language-menu') &&
      !event.target.closest('[data-language-toggle]')
    ) {
      languageMenuOpen.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* Custom mobile-specific styles */
.touch-manipulation {
  touch-action: manipulation;
}

/* Smooth transitions for better mobile experience */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Ensure proper viewport handling on mobile */
@media (max-width: 640px) {
  html {
    font-size: 16px; /* Prevent zoom on input focus */
  }
}
</style>

