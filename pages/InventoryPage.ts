import { expect, Page } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    readonly backpack = () =>
        this.page.getByRole('button', { name: 'Add to cart' }).first();

    readonly cartBadge = () =>
        this.page.locator('.shopping_cart_badge');

    readonly cart = () =>
        this.page.locator('.shopping_cart_link');

    async verifyInventoryLoaded() {

        await expect(this.page).toHaveURL(/inventory/);

        await expect(
            this.page.getByText('Products')
        ).toBeVisible();

    }

    async addBackpackToCart() {
        await this.backpack().click();
    }

    async openCart() {
        await this.cart().click();
    }

}