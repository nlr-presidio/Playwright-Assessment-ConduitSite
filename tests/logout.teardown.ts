import { test as teardown } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';

teardown('logout', async ({ page }) => {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  await homePage.open();
  await homePage.openHome();
  await homePage.openSettings();
  await settingsPage.logout();
});
