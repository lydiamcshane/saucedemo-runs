import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

test('Locked user cannot login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login(
        'locked_out_user',
        'secret_sauce'
    );

    await expect(
        page.getByText(/Sorry, this user has been locked out/)
    ).toBeVisible();

});