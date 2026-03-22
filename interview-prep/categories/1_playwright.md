# Category 1: Playwright & Advanced Automation (10 Questions)

## 1. What are Playwright Fixtures and why did you implement them?
**Answer:** Fixtures are a Dependency Injection mechanism. I implemented them to encapsulate setup/teardown logic. For example, an **Auto-Fixture** for DB seeding ensures every test starts with a pristine state, while **Environment-ready Fixtures** for Page Objects automate navigation, reducing boilerplate.

## 2. Explain your Page Object Model (POM) implementation.
**Answer:** I followed a strict POM pattern to separate test logic from UI selectors. Features include:
- **Atomic Methods:** Small, reusable actions (e.g., `fillUsername`).
- **Fluent Interface:** Methods return the next page instance for step chaining.
- **Locator Centralization:** Defined in constructors using stable `data-test` attributes.

## 3. How do you handle flakiness in E2E tests?
**Answer:** I leverage Playwright’s **Auto-waiting** and web-first assertions (`expect(locator).toBeVisible()`). I ensure **Test Isolation** via automatic DB seeding and use **Trace Viewer** to diagnose race conditions through the execution timeline.

## 4. How do you manage test data in your framework?
**Answer:** I use a dedicated `test-data/` directory. Static constants (URLs, error messages) are centralized. For dynamic data, I use `@faker-js/faker` to generate unique users for every run, preventing database collisions.

## 5. What are the advantages of Playwright over Cypress?
**Answer:** 
- **Browser Contexts:** Multiple independent sessions in one browser instance.
- **Native Mobile Emulation:** Better support for touch events and mobile viewports.
- **Out-of-Process Execution:** Runs outside the browser's execution loop, avoiding "injection" limitations.

## 6. How do you handle Authentication persistence across tests?
**Answer:** I use **Storage State**. I perform the login once in a global setup or a specialized test, save the cookies and local storage to a JSON file, and then load this state in the `playwright.config.ts` or individual contexts to skip the login flow for subsequent tests.

## 7. How do you test elements inside a Shadow DOM?
**Answer:** Playwright handles Shadow DOM natively. Unlike other tools that require deep traversal, Playwright's locators (like `page.locator('button')`) will automatically penetrate open shadow roots to find the element, making the code much cleaner.

## 8. What is Request Interception and how have you used it?
**Answer:** It's the ability to monitor or modify network traffic. I use `page.route()` to mock API responses. This is useful for testing "Edge Cases" (like 500 errors or slow networks) without needing the actual backend to fail.

## 9. How do you implement Cross-Browser and Cross-Platform testing?
**Answer:** I define multiple **Projects** in `playwright.config.ts`. This allows me to run the same suite against Chromium, Firefox, Webkit (Safari), and mobile emulations (e.g., Pixel 5, iPhone 12) using a single command.

## 10. Explain how you use Custom Matchers or Assertions.
**Answer:** While Playwright has many built-in matchers, I can extend them using `expect.extend()`. This allows me to create domain-specific assertions (e.g., `expect(locator).toHaveValidCurrencyFormat()`), improving test readability and reuse.
