import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly newArticleLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async openSettings() {
    await this.settingsLink.click();
    await expect(this.page).toHaveURL(/\/settings$/);
  }

  async open() {
    await this.page.goto('/');
    await expect(this.newArticleLink).toBeVisible();
  }

  async openHome() {
    await this.homeLink.click();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async openArticle(title: string) {
    await this.page.getByRole('heading', { name: title, exact: true }).first().click();
    await expect(this.page).toHaveURL(/\/article\/.+/);
  }

  async openNewArticle() {
    await this.newArticleLink.click();
    await expect(this.page).toHaveURL(/\/editor\/?$/);
  }
}
