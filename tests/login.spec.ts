import { test, expect } from './fixtures/pages';

test('user is already logged in', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Sign in' })).toBeHidden();
});

test.describe('logged out', () => {
  
  test.use({ storageState: { cookies: [], origins: [] } });
  test('user can sign in', async ({ loginPage, page }) => {
    await loginPage.loginAs(process.env.CONDUIT_EMAIL!, process.env.CONDUIT_PASSWORD!);

    await expect(page.getByRole('link', { name: 'Sign in' })).toBeHidden();
  });
});
