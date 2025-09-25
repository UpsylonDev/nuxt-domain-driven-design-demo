// Global test setup file for domains
import { vi } from 'vitest'
import { computed, ref, reactive } from 'vue'

// Make Vue composables globally available
global.computed = computed
global.ref = ref
global.reactive = reactive

// Mock Nuxt's useState composable for testing
global.useState = vi.fn((key: string, init?: () => unknown) => {
  return {
    value: init ? init() : null
  }
})

// Mock Nuxt's useFetch composable for testing
global.useFetch = vi.fn((_url: string) => {
  return {
    data: { value: null },
    pending: { value: false },
    error: { value: null },
    refresh: vi.fn()
  }
})

// Mock getUserInitials utility function
global.getUserInitials = vi.fn((user: { name: string }) => {
  return user.name.split(' ').map((n: string) => n.charAt(0)).join('').toUpperCase()
})