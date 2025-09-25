import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  // options here
}).append({
  rules: {
    // Allow single-word component names for pages (Nuxt convention)
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'default']
    }]
  }
})