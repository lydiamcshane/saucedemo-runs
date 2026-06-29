import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can logout', async ({ page }) => {

  const login = new LoginPage(page);

  await login.navigate();
  await login.login('standard_user', 'secret_sauce');

  await page.locator('#react-burger-menu-btn').click();

  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL('/');
});