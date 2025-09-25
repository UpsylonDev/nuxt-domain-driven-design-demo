import { test, expect } from '@playwright/test'

test.describe('Users Domain', () => {
  test('should load users page and display users', async ({ page }) => {
    await page.goto('/users')

    // Check page title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Users')

    // Wait for users to load (they are generated with faker)
    await page.waitForTimeout(1000)

    // Check that user profiles are displayed
    const userProfiles = page.locator('.bg-gray-100.rounded.p-2.mb-5')
    await expect(userProfiles).toHaveCount(10) // Assuming 10 users are generated

    // Check that each user profile contains expected fields
    const firstUser = userProfiles.first()
    await expect(firstUser).toContainText('Username:')
    await expect(firstUser).toContainText('Name:')
    await expect(firstUser).toContainText('Email:')
    await expect(firstUser).toContainText('initials:')
  })

  test('should display user initials correctly', async ({ page }) => {
    await page.goto('/users')

    // Wait for users to load
    await page.waitForTimeout(1000)

    // Check that initials are displayed and properly formatted
    const initialsElements = page.locator('li:has-text("initials:")')
    const firstInitials = await initialsElements.first().textContent()

    // Initials should be in the format "initials: XX"
    expect(firstInitials).toMatch(/initials: [A-Z]{1,3}/)
  })

  test('should have proper navigation back to home', async ({ page }) => {
    await page.goto('/users')

    // Click home link
    await page.getByRole('link', { name: 'Home' }).click()

    // Should be back on homepage
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Domain Driven Design')
  })

  test('should navigate to posts from users page', async ({ page }) => {
    await page.goto('/users')

    // Click posts link
    await page.getByRole('link', { name: 'Posts' }).click()

    // Should be on posts page
    await expect(page).toHaveURL('/posts')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Posts')
  })
})