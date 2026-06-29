import { expect, Locator } from '@playwright/test';

export async function verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible();
}