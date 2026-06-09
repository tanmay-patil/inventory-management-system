import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    // It should redirect to login
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should allow admin to login and see dashboard', async ({ page }) => {
    await page.goto('/login');

    // Fill the login form
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'Admin@IMS');

    // Submit the form
    await page.click('button[type="submit"]');

    // It should redirect to the dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);

    // It should display the welcome message
    await expect(page.locator('h1')).toContainText('Welcome back, System Admin');

    // It should show the role as ADMIN
    await expect(page.locator('text=admin').first()).toBeVisible();
  });
});
