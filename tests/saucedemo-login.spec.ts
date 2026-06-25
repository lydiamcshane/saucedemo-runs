import { test, expect } from '@playwright/test';

test('SauceDemo user can log in successfully', async ({ page }) => {
  // Go to login page
  await page.goto('https://www.saucedemo.com/');

  // Verify page loaded
  await expect(page).toHaveTitle(/Swag Labs/);

  // Fill username
  await page.getByPlaceholder('Username').fill('standard_user');

  // Fill password
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login (inventory page loads)
  await expect(page).toHaveURL(/inventory/);

  // Check that products are visible
  await expect(page.getByText('Products')).toBeVisible();
});