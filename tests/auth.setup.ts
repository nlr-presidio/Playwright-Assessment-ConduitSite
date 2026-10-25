import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';
import { STORAGE_STATE } from '../playwright.config';

setup('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginAs(process.env.CONDUIT_EMAIL!, process.env.CONDUIT_PASSWORD!);

  await expect(page.getByRole('link', { name: 'Sign in' })).toBeHidden();
  await page.context().storageState({ path: STORAGE_STATE });
});
