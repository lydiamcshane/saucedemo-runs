import { expect, Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    readonly username = () => this.page.getByPlaceholder('Username');
    readonly password = () => this.page.getByPlaceholder('Password');
    readonly loginButton = () => this.page.getByRole('button', { name: 'Login' });

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await expect(this.username()).toBeVisible();

        await this.username().fill(username);
        await this.password().fill(password);

        await this.loginButton().click();
    }

}