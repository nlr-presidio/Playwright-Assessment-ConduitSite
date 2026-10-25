import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/Login';
import { HomePage } from '../../pages/HomePage';
import { EditorPage } from '../../pages/EditorPage';
import { ArticlePage } from '../../pages/ArticlePage';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  editorPage: EditorPage;
  articlePage: ArticlePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  editorPage: async ({ page }, use) => {
    await use(new EditorPage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect } from '@playwright/test';
