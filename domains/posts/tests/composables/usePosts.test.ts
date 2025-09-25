import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePosts } from '@/domains/posts/composables/usePosts'

// Mock the global functions before importing
vi.mock('#app', () => ({
  useState: vi.fn(),
  useFetch: vi.fn(),
}))

describe('usePosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize posts state', () => {
    // Mock useState to return a ref-like object
    const mockState = { value: null }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn(),
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { posts } = usePosts()

    expect(global.useState).toHaveBeenCalledWith('posts', expect.any(Function))
    expect(posts).toBeDefined()
  })

  it('should expose fetch function', () => {
    const mockState = { value: [] }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn(),
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { fetch } = usePosts()

    expect(typeof fetch).toBe('function')
  })

  it('should return posts state', () => {
    const mockState = { value: [] }
    global.useState = vi.fn().mockReturnValue(mockState)

    const mockFetch = {
      data: { value: [] },
      pending: { value: false },
      error: { value: null },
      refresh: vi.fn(),
    }
    global.useFetch = vi.fn().mockReturnValue(mockFetch)

    const { posts } = usePosts()

    expect(posts).toBe(mockState)
  })
})
