import type { User } from '@/domains/users/types'
import { UserService } from '@/domains/users/services/UserService'

/**
 * Application Service (Composable) for Users domain
 * Orchestrates user-related use cases and manages reactive state
 * Follows DDD principles by delegating business logic to UserService
 */
export const useUsers = () => {
  const users = useState('users', (): User[] => [])
  const loading = useState('users-loading', () => false)
  const error = useState('users-error', (): string | null => null)

  /**
   * Fetches all users using the UserService
   * Manages loading and error states
   */
  async function fetch() {
    try {
      loading.value = true
      error.value = null

      const fetchedUsers = await UserService.fetchUsers()
      users.value = fetchedUsers
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      console.error('Users fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Finds a user by username
   * @param username - The username to search for
   * @returns User | undefined
   */
  function findUserByUsername(username: string): User | undefined {
    return users.value.find(user => user.username === username)
  }

  /**
   * Gets user count
   * @returns number of users
   */
  const userCount = computed(() => users.value.length)

  return {
    // State
    users: users,
    loading: loading,
    error: error,

    // Computed
    userCount,

    // Actions
    fetch,
    findUserByUsername,
  }
}
