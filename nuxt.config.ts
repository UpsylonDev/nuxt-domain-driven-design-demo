// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-25',
  devtools: { enabled: true },
  extends: ["./domains/users", "./domains/posts"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

  imports: {
    dirs: [
      'domains/*/composables/**',
      'domains/*/utils/**'
    ]
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json'
      }
    ],
    defaultLocale: 'fr',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  }
});