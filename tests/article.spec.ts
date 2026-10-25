import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures/pages';
import articleData from '../test-datas/article-input.json';

const runId = randomUUID().slice(0, 8);
const articles = articleData.map((article) => ({ ...article, title: `${article.title} ${runId}` }));

test.describe.serial('article lifecycle workflow', () => {
  test('Create article from the data set', async ({ homePage, editorPage, articlePage }) => {
    for (const article of articles) {
      await homePage.open();
      await homePage.openNewArticle();
      await editorPage.publishArticle(article);
      await articlePage.expectDetails(article.title, article.body);
      await articlePage.expectTag(article.tags);
    }
  });

  test('Edit the first created article', async ({ homePage, articlePage, editorPage }) => {
    const article = articles[0];
    await homePage.open();
    await homePage.openArticle(article.title);
    await articlePage.expectDetails(article.title, article.body);
    await articlePage.openEditor();
    const updatedTitle = `${article.title} Edited`;
    await editorPage.updateTitle(updatedTitle);
    await articlePage.expectDetails(updatedTitle, article.body);
    await articlePage.expectTag(article.tags);
  });

  test('Delete the last created article', async ({ homePage, articlePage, page }) => {
    const articleToDelete = articles[articles.length - 1];
    await homePage.open();
    await homePage.openArticle(articleToDelete.title);
    await articlePage.expectDetails(articleToDelete.title, articleToDelete.body);

    await articlePage.delete();

    await expect(homePage.newArticleLink).toBeVisible();
    await expect(page.getByRole('heading', { name: articleToDelete.title, exact: true })).toHaveCount(0);
  });
});
