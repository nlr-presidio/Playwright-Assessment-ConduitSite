import { type Page, type Locator, expect } from '@playwright/test';

export type ArticleData = {
  title: string;
  about: string;
  body: string;
  tags: string;
};

export class EditorPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly aboutInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.aboutInput = page.getByRole('textbox', { name: "What's this article about?" });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in' });
    this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async fillArticle(article: ArticleData) {
    await this.titleInput.fill(article.title);
    await this.aboutInput.fill(article.about);
    await this.bodyInput.fill(article.body);
    await this.tagsInput.fill(article.tags);

    await expect(this.titleInput).toHaveValue(article.title);
    await expect(this.bodyInput).toHaveValue(article.body);
  }

  async publish() {
    await this.publishButton.click();
    await expect(this.page).toHaveURL(/\/article\/.+/);
  }

  async publishArticle(article: ArticleData) {
    await this.fillArticle(article);
    await this.publish();
  }

  // fields here are already pre-filled so only the the title is changed.
  async updateTitle(title: string) {
    await expect(this.titleInput).not.toHaveValue('');

    await this.titleInput.fill(title);
    await expect(this.titleInput).toHaveValue(title);
    await this.publish();
  }
}
