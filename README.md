# Playwright-Assessment-ConduitSite

End-to-end tests for the [Conduit](https://conduit.bondaracademy.com/) demo blog, written with [Playwright](https://playwright.dev/) and TypeScript using the Page Object Model and data-driven tests.


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


