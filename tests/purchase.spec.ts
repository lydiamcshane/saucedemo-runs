import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

import { Users } from '../fixtures/users';

test('Purchase flow', async ({ page }) => {

    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.navigate();

    await login.login(
        Users.standard.username,
        Users.standard.password
    );

    await inventory.verifyInventoryLoaded();

    await inventory.addBackpackToCart();

    await inventory.openCart();

    await cart.verifyBackpackExists();

});