import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUsers } from '@/domains/users/composables/useUsers'

// Mock the global functions before importing
vi.mock('#app', () => ({
  useState: vi.fn(),
  useFetch: vi.fn()
}))

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize users state', () => {
    // Mock useState to return a ref-like object
    const mockState = { value: null }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn()
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { users } = useUsers()

    expect(global.useState).toHaveBeenCalledWith('users', expect.any(Function))
    expect(users).toBeDefined()
  })

  it('should expose fetch function', () => {
    const mockState = { value: [] }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn()
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { fetch } = useUsers()

    expect(typeof fetch).toBe('function')
  })

  it('should return users state', () => {
    const mockState = { value: [] }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn()
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { users } = useUsers()

    expect(users).toBe(mockState)
  })

  it('should initialize with empty array', () => {
    const mockState = { value: [] }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn()
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { users } = useUsers()

    expect(Array.isArray(users.value)).toBe(true)
    expect(users.value).toHaveLength(0)
  })
})