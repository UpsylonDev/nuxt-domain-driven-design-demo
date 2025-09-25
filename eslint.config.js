import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
  },
}).append({
  rules: {
    // Allow single-word component names for pages (Nuxt convention)
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'default'],
      },
    ],
    // Disable problematic TypeScript parsing rules
    '@typescript-eslint/no-unused-vars': 'off',
    'no-undef': 'off',
    // Allow static-only classes for DDD Services
    '@typescript-eslint/no-extraneous-class': 'off',
  },
  languageOptions: {
    globals: {
      // Domain composables
      useUsers: 'readonly',
      usePosts: 'readonly',
      // i18n composable
      useI18n: 'readonly',
    },
  },
})
