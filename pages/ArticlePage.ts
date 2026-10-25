import { type Page, type Locator, expect } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly title: Locator;
  readonly tagList: Locator;
  readonly editLink: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    this.tagList = page.locator('.tag-list');
    this.editLink = page.getByRole('link', { name: 'Edit Article' }).first();
    // Delete appears twice; use the one below the article body
    this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).nth(1);
  }

  async expectDetails(title: string, body: string) {
    await expect(this.page).toHaveURL(/\/article\/.+/);
    await expect(this.title).toHaveText(title);
    await expect(this.page.getByText(body, { exact: true })).toBeVisible();
  }

  async expectTag(tag: string) {
    await expect(this.tagList).toContainText(tag, { ignoreCase: true });
  }

  async openEditor() {
    await this.editLink.click();
    await expect(this.page).toHaveURL(/\/article\/.+/);
  }

  async delete() {
    await this.deleteButton.click();
    await expect(this.page).toHaveURL(/\/$/);
  }
}
