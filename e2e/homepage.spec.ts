import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display the main title', async ({ page }) => {
    await page.goto('/')

    // Check if the main title is visible
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Domain Driven Design - Example with Nuxt Layers')
  })

  test('should have navigation menu with correct links', async ({ page }) => {
    await page.goto('/')

    // Check navigation links
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Users' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Posts' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog (Redirects to Posts)' })).toBeVisible()
  })

  test('should navigate to Users page', async ({ page }) => {
    await page.goto('/')

    // Click on Users link
    await page.getByRole('link', { name: 'Users' }).click()

    // Check if we're on the users page
    await expect(page).toHaveURL('/users')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Users')
  })

  test('should navigate to Posts page', async ({ page }) => {
    await page.goto('/')

    // Click on Posts link
    await page.getByRole('link', { name: 'Posts' }).click()

    // Check if we're on the posts page
    await expect(page).toHaveURL('/posts')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Posts')
  })

  test('should redirect Blog link to Posts page', async ({ page }) => {
    await page.goto('/')

    // Click on Blog link
    await page.getByRole('link', { name: 'Blog (Redirects to Posts)' }).click()

    // Check if we're redirected to the posts page
    await expect(page).toHaveURL('/posts')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Posts')
  })

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/')

    // Check that the page is centered with proper CSS classes
    const container = page.locator('div.h-screen.flex.items-center.justify-center')
    await expect(container).toBeVisible()

    // Check that navigation has proper styling
    const nav = page.locator('ul.flex.gap-5.mb-10.bg-gray-800.text-white.p-5')
    await expect(nav).toBeVisible()
  })
})