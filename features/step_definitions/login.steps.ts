import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const users: Record<string, { username: string; password: string }> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked:   { username: 'locked_out_user', password: 'secret_sauce' },
};

Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

When('I log in as the {string} user', async function (this: CustomWorld, userType: string) {
  const creds = users[userType];
  await this.loginPage.login(creds.username, creds.password);
});

Then('the inventory page should load', async function (this: CustomWorld) {
  await this.inventoryPage.verifyInventoryLoaded();
});

Then('I should see an error message', async function (this: CustomWorld) {
  await expect(this.page.getByText(/Epic sadface/)).toBeVisible();
});
