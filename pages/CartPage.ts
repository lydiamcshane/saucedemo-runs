import { expect, Page } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    async verifyBackpackExists() {

        await expect(
            this.page.getByText('Sauce Labs Backpack')
        ).toBeVisible();

    }

}