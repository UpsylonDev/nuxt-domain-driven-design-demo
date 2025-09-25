import type { Post } from '@/domains/posts/types'
import { PostService } from '@/domains/posts/services/PostService'

/**
 * Application Service (Composable) for Posts domain
 * Orchestrates post-related use cases and manages reactive state
 * Follows DDD principles by delegating business logic to PostService
 */
export const usePosts = () => {
  const posts = useState('posts', (): Post[] => [])
  const loading = useState('posts-loading', () => false)
  const error = useState('posts-error', (): string | null => null)

  /**
   * Fetches all posts using the PostService
   * Manages loading and error states
   */
  async function fetch() {
    try {
      loading.value = true
      error.value = null

      const fetchedPosts = await PostService.fetchPosts()
      posts.value = fetchedPosts
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch posts'
      console.error('Posts fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Finds a post by ID
   * @param id - The post ID to search for
   * @returns Post | undefined
   */
  function findPostById(id: number): Post | undefined {
    return posts.value.find(post => String(post.id) === String(id))
  }

  /**
   * Gets posts by author
   * @param authorUsername - The author's username
   * @returns Post[] filtered by author
   */
  function getPostsByAuthor(authorUsername: string): Post[] {
    return posts.value.filter(post => post.author?.username === authorUsername)
  }

  /**
   * Gets post count
   * @returns number of posts
   */
  const postCount = computed(() => posts.value.length)

  return {
    // State
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),

    // Computed
    postCount,

    // Actions
    fetch,
    findPostById,
    getPostsByAuthor,
  }
}
