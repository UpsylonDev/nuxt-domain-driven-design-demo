import type { User } from "@/domains/users/types";

/**
 * Service layer for User domain operations
 * Handles all server communications and business logic for Users
 */
export class UserService {
  /**
   * Fetches all users from the API
   * @returns Promise<User[]> List of users
   * @throws Error if the API call fails
   */
  static async fetchUsers(): Promise<User[]> {
    try {
      const data = await $fetch<User[]>("/api/users");
      return data;
    } catch (err) {
      const message = (err instanceof Error) ? err.message : 'Unknown error';
      throw new Error(`Failed to fetch users: ${message}`);
    }
  }

  /**
   * Fetches a specific user by username
   * @param username - The username to search for
   * @returns Promise<User | null> The user or null if not found
   */
  static async fetchUserByUsername(username: string): Promise<User | null> {
    try {
      const users = await this.fetchUsers();
      return users.find(user => user.username === username) || null;
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch user ${username}: ${message}`);
    }
  }

  /**
   * Validates user data according to domain rules
   * @param user - User data to validate
   * @returns boolean - Whether the user data is valid
   */
  static validateUser(user: Partial<User>): boolean {
    return !!(user.username && user.name && user.email);
  }
}