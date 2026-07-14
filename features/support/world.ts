import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, firefox } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

export class CustomWorld extends World {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    // Same POMs your Playwright specs use
    loginPage!: LoginPage;
    inventoryPage!: InventoryPage;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.browser = await firefox.launch({ headless: true });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        // Instantiate the shared POMs with the Cucumber-owned page
        this.loginPage = new LoginPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
    }

    async destroy() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(CustomWorld);