import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

import { Users } from '../fixtures/users';

test('Standard user can login', async ({ page }) => {

    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.navigate();

    await login.login(
        Users.standard.username,
        Users.standard.password
    );

    await inventory.verifyInventoryLoaded();

});