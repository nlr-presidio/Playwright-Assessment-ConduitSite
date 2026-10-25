# Playwright-Assessment-ConduitSite

End-to-end tests for the [Conduit](https://conduit.bondaracademy.com/) demo blog, written with [Playwright](https://playwright.dev/) and TypeScript using the Page Object Model and data-driven tests.

## What is tested

| Test | What it checks |
|---|---|
| **Login** (`tests/login.spec.ts`) | The saved session starts the user already logged in; a logged-out user can sign in through the form |
| **Article lifecycle** (`tests/article.spec.ts`) | Creates one article per row in the JSON data file, edits the first article's title, and deletes the last article |
| **Logout** (`tests/logout.teardown.ts`) | Logs out from the Settings page once all tests have finished |

Every page action checks its own result (URL, headings, field values), so a failure points to the exact step that broke.

## Project structure

```
pages/                    Page objects (locators + actions + checks)
  Login.ts                Sign in
  HomePage.ts             Navigation, open an article from the feed
  EditorPage.ts           Create and edit articles
  ArticlePage.ts          Check article details, edit, delete
  SettingsPage.ts         Log out
tests/
  auth.setup.ts           Logs in once and saves the session
  login.spec.ts
  article.spec.ts
  logout.teardown.ts      Runs last and logs out
  fixtures/pages.ts       Provides page objects to tests as fixtures
test-datas/
  article-input.json      Article data (title, about, body, tags)
playwright.config.ts
```

## Setup

Requirements: Node.js 18 or later, Google Chrome installed, and a Conduit account.

```bash
npm install
npx playwright install
cp .env.example .env
```

Then put your Conduit login in `.env`:

```
CONDUIT_EMAIL=your-email@example.com
CONDUIT_PASSWORD=your-password
```

`.env` is ignored by git, so your credentials are never committed.

## Running the tests

```bash
npx playwright test                       # all tests
npx playwright test tests/article.spec.ts # one file
npx playwright show-report                # open the HTML report from the last run
```

Tests run in a visible Chrome window (`headless: false` in `playwright.config.ts`).

## How a run works

1. **setup** (`auth.setup.ts`) logs in with the `.env` credentials and saves the session to `playwright/.auth/user.json`.
2. **Google Chrome** runs every `*.spec.ts` file, starting each test from that saved session, so no test has to log in again.
3. **teardown** (`logout.teardown.ts`) logs out after everything else has finished.

## Test data

To add an article, add a row to `test-datas/article-input.json`:

```json
{
  "title": "My new article",
  "about": "Short description",
  "body": "Article text.",
  "tags": "mytag"
}
```

Each run adds a random ID to every title, because Conduit rejects an article with a title that already exists. Conduit stores tags in lowercase, and the tag check allows for that.

The article tests run in order (`test.describe.serial`), since editing and deleting need the articles the create test makes. Each run leaves the edited first article and any middle articles on the account.

## CI

`.github/workflows/playwright.yml` runs the tests on pushes and pull requests to `main`/`master`. It reads the login from the repository secrets `CONDUIT_EMAIL` and `CONDUIT_PASSWORD` (add them under **Settings → Secrets and variables → Actions**), and runs the tests inside a virtual display (`xvfb-run`) because the config opens a visible browser.
