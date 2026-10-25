import { type Page, type Locator, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.signInLink).toBeVisible();
  }
}
