import type { Post } from '@/domains/posts/types'

/**
 * Service layer for Post domain operations
 * Handles all server communications and business logic for Posts
 */
export class PostService {
  /**
   * Fetches all posts from the API
   * @returns Promise<Post[]> List of posts
   * @throws Error if the API call fails
   */
  static async fetchPosts(): Promise<Post[]> {
    try {
      const data = await $fetch<Post[]>('/api/posts')
      return data
    } catch (err) {
      throw new Error(`Failed to fetch posts: ${err.message || 'Unknown error'}`)
    }
  }

  /**
   * Fetches a specific post by ID
   * @param id - The post ID to search for
   * @returns Promise<Post | null> The post or null if not found
   */
  static async fetchPostById(id: number): Promise<Post | null> {
    try {
      const posts = await this.fetchPosts()
      return posts.find(post => post.id === id) || null
    } catch (error) {
      throw new Error(`Failed to fetch post ${id}: ${error.message}`)
    }
  }

  /**
   * Fetches posts by a specific author
   * @param authorUsername - The author's username
   * @returns Promise<Post[]> List of posts by the author
   */
  static async fetchPostsByAuthor(authorUsername: string): Promise<Post[]> {
    try {
      const posts = await this.fetchPosts()
      return posts.filter(post => post.author?.username === authorUsername)
    } catch (error) {
      throw new Error(`Failed to fetch posts by ${authorUsername}: ${error.message}`)
    }
  }

  /**
   * Validates post data according to domain rules
   * @param post - Post data to validate
   * @returns boolean - Whether the post data is valid
   */
  static validatePost(post: Partial<Post>): boolean {
    return !!(post.title && post.snippet && post.author)
  }

  /**
   * Generates a post excerpt from content
   * @param content - Full post content
   * @param maxLength - Maximum excerpt length (default: 150)
   * @returns string - The excerpt
   */
  static generateExcerpt(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }
}
