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
# Category 2: Software Testing Theory & Strategy (10 Questions)

## 1. What is the "Test Pyramid" and how do you apply it?
**Answer:** It's a strategy favoring a large base of Unit tests, fewer API tests, and even fewer UI tests. I apply it by moving validation to the API layer whenever possible, reserving UI tests for critical "Happy Paths" and visual verification.

## 2. Explain the difference between Smoke, Sanity, and Regression testing.
**Answer:** 
- **Smoke:** Critical "showstopper" functions (e.g., "Can I log in?").
- **Sanity:** Verifies a specific bug fix or narrow change.
- **Regression:** Full-scale testing to ensure new changes didn't break existing features.

## 3. What is "Shift-Left Testing"?
**Answer:** It's the practice of moving testing earlier in the SDLC. It involves QAs participating in requirement refinement, early API testing, and pair-testing with developers before a feature is even "finished."

## 4. How do you perform Risk-Based Testing?
**Answer:** I categorize features by **Impact** and **Probability of Failure**. High-risk features (e.g., checkout flows) get 100% automation and deep manual exploratory testing, while low-risk features get minimal smoke coverage.

## 5. Describe your defect management process.
**Answer:** Once a bug is confirmed, I log it in Jira with a clear title, reproduction steps, expected/actual results, and attachments (logs/traces). I track it through the lifecycle: Open -> Fixed -> Re-test -> Closed.

## 6. Difference between Boundary Value Analysis (BVA) and Equivalence Partitioning (EP).
**Answer:** 
- **EP:** Grouping inputs into sets that should behave the same (e.g., age 18-65). I test one value from each group.
- **BVA:** Testing the "edges" of those groups (e.g., testing 17, 18, 65, and 66). Most bugs occur at these boundaries.

## 7. What is Exploratory Testing and when do you use it?
**Answer:** It’s simultaneous learning, test design, and execution. I use it when a feature is new or complex to find "unscripted" bugs that automation might miss, focusing on user behavior and edge cases.

## 8. What are "Quality Metrics" and which ones do you track?
**Answer:** Metrics provide visibility into process health. I track:
- **Defect Detection Percentage (DDP):** Bugs found by QA vs. bugs found in production.
- **Automation Coverage:** % of requirements covered by scripts.
- **Test Execution Time:** To ensure the CI/CD pipeline remains fast.

## 9. Explain TDD vs. BDD.
**Answer:** 
- **TDD (Test-Driven Development):** Write a failing unit test, then write code to pass it. Focuses on implementation.
- **BDD (Behavior-Driven Development):** Uses "Given/When/Then" (Gherkin) to define business behavior. Focuses on communication between stakeholders and devs.

## 10. What is Mutation Testing?
**Answer:** It involves intentionally injecting small errors ("mutations") into the source code to see if your tests fail. If the tests still pass, it means your test suite is weak and needs better coverage or more meaningful assertions.
# Category 3: API Testing & HTTP Protocols (10 Questions)

## 1. What are common HTTP status codes?
**Answer:**
- **2xx (Success):** 200 OK, 201 Created.
- **4xx (Client Error):** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.
- **5xx (Server Error):** 500 Internal Server Error, 503 Service Unavailable.

## 2. GET vs. POST vs. PUT vs. PATCH.
**Answer:**
- **GET:** Retrieve data (Idempotent).
- **POST:** Create new resource.
- **PUT:** Replace entire resource (Idempotent).
- **PATCH:** Update partial resource.

## 3. How do you automate API tests in Playwright?
**Answer:** I use the `request` fixture. I send calls (e.g., `request.post`), capture the JSON response, and validate the status, headers, and body schema using `expect`.

## 4. Authentication vs. Authorization.
**Answer:** 
- **Authentication (AuthN):** Who are you? (Login).
- **Authorization (AuthZ):** What can you do? (Permissions).

## 5. What is JSON Schema validation?
**Answer:** Verifying that an API response matches a blueprint (correct types, mandatory fields). It ensures the "contract" between backend and frontend isn't broken.

## 6. How do you test a GraphQL API?
**Answer:** Since GraphQL uses a single POST endpoint, I send the `query` or `mutation` string in the request body. I validate that the response doesn't contain an `errors` array and that the `data` object has the expected structure.

## 7. What is API Rate Limiting and how do you test it?
**Answer:** It’s a limit on how many requests a user can make in a timeframe. I test this by using a loop to send rapid requests until I receive a **429 Too Many Requests** status code.

## 8. Explain the OAuth2 flow from a testing perspective.
**Answer:** It involves requesting an **Access Token** using client credentials, then including that token in the `Authorization: Bearer <token>` header for subsequent API calls. I automate the token retrieval to keep tests independent.

## 9. What is Idempotency in APIs?
**Answer:** An operation is idempotent if performing it multiple times has the same effect as performing it once (e.g., GET, PUT, DELETE). I test this by calling an endpoint twice and verifying the system state remains consistent.

## 10. What is Contract Testing (e.g., Pact)?
**Answer:** It's a way to ensure two services (Consumer and Provider) can communicate. Instead of testing the whole system, we test if the Provider meets the specific requirements defined by the Consumer. It's much faster than E2E testing.
# Category 4: SQL & Database Testing (10 Questions)

## 1. INNER, LEFT, RIGHT, and FULL JOIN.
**Answer:**
- **INNER:** Only matching records.
- **LEFT:** All from left + matches from right.
- **RIGHT:** All from right + matches from left.
- **FULL:** All records when there's a match in either.

## 2. WHERE vs. HAVING.
**Answer:** 
- **WHERE:** Filters rows *before* grouping.
- **HAVING:** Filters groups *after* grouping.

## 3. Database Transactions (ACID).
**Answer:** Work units that are all-or-nothing. ACID: Atomicity, Consistency, Isolation, Durability. Useful in testing for ROLLBACKs to keep data clean.

## 4. How do you handle DB seeding?
**Answer:** I use custom API endpoints (like `/testData/seed`) to reset the app state. It’s faster and more reliable than direct SQL scripts for automation.

## 5. What are SQL Indexes?
**Answer:** Structures that speed up data retrieval (SELECT) but can slow down writes (INSERT). I test them by running performance checks on large datasets.

## 6. What is a Subquery and when do you use it?
**Answer:** A query within another query. I use them when I need to filter data based on a dynamic set of results (e.g., "Find users who made a transaction larger than the average").

## 7. Explain SQL Injection and how to test for it.
**Answer:** A vulnerability where an attacker executes malicious SQL via input fields. I test for it by entering patterns like `' OR '1'='1` into forms to ensure the backend uses prepared statements.

## 8. What are Window Functions (e.g., RANK, ROW_NUMBER)?
**Answer:** Functions that perform calculations across a set of table rows related to the current row. Useful for complex reports (e.g., "Find the top 3 transactions for each user").

## 9. SQL vs. NoSQL: When to choose which?
**Answer:** 
- **SQL (Relational):** Best for structured data and complex joins (e.g., banking systems). 
- **NoSQL (Document/Key-Value):** Best for unstructured, rapidly changing data or massive scaling (e.g., real-time logs).

## 10. How do you ensure Data Integrity during automation?
**Answer:** I use constraints (Primary Keys, Foreign Keys) and verify them by attempting to insert invalid data (e.g., duplicate IDs) to ensure the database correctly rejects the operation.
# Category 5: Mobile Testing & Appium Essentials (10 Questions)

## 1. What is the Appium architecture?
**Answer:** Client-Server model. Code (Client) sends HTTP commands via JSON Wire Protocol to the Appium Server (Node.js), which uses drivers (XCUITest/UiAutomator2) to control the device.

## 2. What are "Desired Capabilities"?
**Answer:** JSON keys sent to the server to define the session (e.g., `platformName`, `deviceName`, `app` path, `automationName`).

## 3. Mobile Locator Strategies.
**Answer:** 
- **Accessibility ID:** Best for cross-platform.
- **ID / resource-id:** Android-specific.
- **iOS Class Chain:** Fast for iOS.
- **Xpath:** Slowest, use as a last resort.

## 4. Native vs. Web vs. Hybrid apps.
**Answer:** 
- **Native:** Built for OS (Swift/Kotlin).
- **Web:** Mobile browser sites.
- **Hybrid:** Web view inside a native container.

## 5. How do you handle mobile gestures?
**Answer:** I use the **Actions API** to define sequences of touch events (e.g., move to (x,y), press, move to (x2,y2), release) for swiping and scrolling.

## 6. What is the "Appium Inspector"?
**Answer:** A GUI tool used to record actions, inspect the mobile element hierarchy, and find locators. It's the "DevTools" of mobile automation.

## 7. Implicit vs. Explicit waits in Appium.
**Answer:** 
- **Implicit:** Global timeout for all elements. 
- **Explicit:** Better practice; waits for a specific condition (e.g., `visibilityOf`) for a specific element.

## 8. iOS vs. Android Automation: Key differences.
**Answer:** 
- **Drivers:** UiAutomator2 (Android) vs. XCUITest (iOS). 
- **Packaging:** APK (Android) vs. IPA/APP (iOS). 
- **Locators:** resource-id (Android) vs. predicate/class-chain (iOS).

## 9. How do you test apps on Real Devices vs. Emulators?
**Answer:** 
- **Emulators/Simulators:** Faster for CI and early dev. 
- **Real Devices:** Essential for performance, battery, camera, and network-related tests. I use cloud services like **BrowserStack** for scale.

## 10. What are the challenges of Hybrid App testing?
**Answer:** Switching **Contexts**. You must switch the driver from the `NATIVE_APP` context to the `WEBVIEW` context to interact with elements inside the web container.
# Category 6: CI/CD & DevOps for QA (10 Questions)

## 1. Importance of CI/CD for QA.
**Answer:** Provides immediate feedback. Every code change triggers an automated suite, catching bugs before they reach production.

## 2. Parallel execution and Sharding.
**Answer:** **Parallelism** runs multiple tests on one machine. **Sharding** splits tests across multiple machines. Both reduce execution time significantly.

## 3. Handling Secrets in CI.
**Answer:** Use Environment Variables stored as **Encrypted Secrets** in tools like GitHub Actions or Jenkins. Never commit them to git.

## 4. Role of Docker in Testing.
**Answer:** Ensures environment consistency. We wrap the app, DB, and test runner into containers so "it works on my machine" always translates to CI.

## 5. Integrating Allure Reports.
**Answer:** I add a pipeline step to generate the report from results and host it (e.g., on GitHub Pages) so stakeholders can see visual results and screenshots.

## 6. What are "Deployment Gates"?
**Answer:** Automated checks in the pipeline (e.g., "Pass 100% of Smoke tests") that prevent a build from moving to the next stage if it fails.

## 7. Blue-Green vs. Canary Deployments.
**Answer:** 
- **Blue-Green:** Two identical environments; one is live, one is new. Switch traffic instantly. 
- **Canary:** Roll out changes to a small % of users first, then expand if metrics are stable.

## 8. What is "Infrastructure as Code" (IaC)?
**Answer:** Managing test environments using configuration files (e.g., Terraform, CloudFormation) rather than manual setup. Ensures environments are reproducible.

## 9. How do you handle "Flaky Test Quarantine"?
**Answer:** I tag flaky tests as `@quarantine` and run them separately. They don't block the main pipeline, but I track them until fixed to maintain developer trust.

## 10. What is "Continuous Monitoring"?
**Answer:** Tracking application health in production using logs and metrics (e.g., ELK stack, Datadog). QA uses this to identify production issues before users report them.
# Category 7: Testing Generative AI Components (10 Questions)

## 1. Challenges of LLM testing.
**Answer:** **Non-determinism**. Outputs vary for the same input. We use probabilistic checks and "LLM-as-a-judge" instead of exact string matching.

## 2. Measuring LLM Accuracy.
**Answer:** Metrics like **BERTScore** (semantic similarity), **ROUGE/BLEU** (n-gram overlap), and human-in-the-loop evaluations.

## 3. What is "Prompt Injection"?
**Answer:** Attacks where users try to bypass safety guardrails (e.g., "jailbreaking"). I test this with a library of known adversarial prompts.

## 4. Scaling AI Validation.
**Answer:** I use an "Evaluator LLM" (e.g., GPT-4) to grade thousands of responses from a smaller model based on factuality and tone.

## 5. Testing RAG (Retrieval-Augmented Generation).
**Answer:** Test both the **Retrieval** (finding the right source) and the **Generation** (accurately summarizing the source without hallucinating).

## 6. What is "Hallucination" and how to test for it?
**Answer:** When an AI generates false info. I test for it by providing "ground truth" documents and verifying the AI doesn't include info NOT present in those documents.

## 7. How does "Temperature" affect testing?
**Answer:** Higher temperature = more creative/random. Lower temperature = more deterministic. I test with temperature 0.0 for consistency checks and higher values for creativity/diversity tests.

## 8. Explain "Model Drift" and how to monitor it.
**Answer:** When an LLM's performance degrades over time due to updates or data changes. I monitor it by running a "Golden Dataset" of prompts periodically and comparing metrics.

## 9. AI Cost and Token management.
**Answer:** Long prompts cost more. I test token usage to ensure the system is optimized and doesn't exceed budget or context window limits.

## 10. What is "Self-Correction" in AI and how do you test it?
**Answer:** When a model critiques its own output. I test this by giving it a complex task and checking if it can identify and fix its own errors in a second reasoning step.
# Category 8: TypeScript for Automation (10 Questions)

## --- EASY ---

## 1. What is TypeScript and what are its main advantages over JavaScript?
**Answer:** TypeScript is a strongly typed superset of JavaScript that compiles to plain JS. Its main advantages include **Static Typing** (catching errors at compile-time), **IntelliSense/Autocompletion** (better developer experience), and **Better Refactoring** (safer to change code across large projects).

## 2. What are the basic types available in TypeScript?
**Answer:** The primary types are `string`, `number`, `boolean`, `array` (e.g., `string[]`), `tuple`, `enum`, `any`, `void`, `null`, and `undefined`.

## 3. What is the difference between an Interface and a Type Alias?
**Answer:** Both are used to define the shape of an object. However, **Interfaces** are better for defining object structures and can be "merged" (declaration merging), whereas **Types** are more flexible and can define unions, primitives, and intersections. In automation, Interfaces are the standard for POM class structures.

## 4. Why should the `any` type be avoided in automation scripts?
**Answer:** Using `any` effectively turns off type-checking, defeating the purpose of TypeScript. It hides potential bugs, removes autocompletion, and makes the code harder to maintain. It is better to use `unknown` if the type is truly unknown, as it forces a type check before use.

## 5. How do you define optional properties in a TypeScript interface?
**Answer:** You use the question mark `?` after the property name. For example:
```typescript
interface User {
  username: string;
  password?: string; // Optional field
}
```

## --- MEDIUM ---

## 6. What are Generics and how do you use them in a test framework?
**Answer:** Generics allow you to create reusable components that work with a variety of types. In automation, I use them for generic "Base Page" methods. For example, a method that waits for a specific Page Object to load:
```typescript
async function waitForPage<T>(pageClass: new (page: Page) => T): Promise<T> { ... }
```

## 7. Explain Union Types vs. Intersection Types.
**Answer:** 
- **Union (`|`):** A value can be one of several types (e.g., `string | number`). Useful for a function that accepts multiple locator types.
- **Intersection (`&`):** Combines multiple types into one. A value must satisfy all types. Useful for combining a base user object with specific permissions (e.g., `User & AdminPermissions`).

## 8. What are Enums and when should you use them over Union Types?
**Answer:** Enums allow you to define a set of named constants. I use Enums for fixed, stable sets of values like `Environment` (DEV, STAGE, PROD). However, for simple string sets, I prefer **Union Types** (e.g., `'active' | 'inactive'`) because they are more lightweight and don't require extra runtime code.

## --- HARD ---

## 9. Explain TypeScript Utility Types (Partial, Readonly, Pick, Record).
**Answer:** These are built-in types that transform existing types:
- **Partial<T>:** Makes all properties in T optional (great for update-user API tests).
- **Readonly<T>:** Makes all properties immutable.
- **Pick<T, K>:** Creates a type by picking a set of properties K from T.
- **Record<K, T>:** Constructs an object type with keys K and values T (useful for mapping error codes to messages).

## 10. What are Mapped Types and how can they be useful in a large-scale POM?
**Answer:** Mapped types allow you to create new types based on old ones by "mapping" over the keys. In a large POM, I can use them to automatically generate a type that represents the "Loading State" or "Validation State" of every field in a form interface, ensuring that my automation state-tracking is always in sync with the UI model.

# APPENDIX: Project Specifics & Advanced Troubleshooting

## The Node.js 25 'SlowBuffer' Patch
In this project, we encountered a critical blocker where the legacy dependency 'buffer-equal-constant-time' was incompatible with Node 25. Instead of downgrading, we applied a 'patch-package' solution. This demonstrates high-level debugging skills and the ability to maintain legacy systems in modern environments.

## Playwright Fixtures Architecture
We moved away from 'beforeEach' hooks to a Fixture-based Dependency Injection model. Our fixtures handle:
1. **dbSeed:** Automatic database reset before every test (Total Isolation).
2. **POM Initialization:** Lazy-loading of Page Objects.
3. **Declarative Navigation:** Automated 'page.goto' calls within the fixture context.

## Dynamic Data Strategy
We integrated '@faker-js/faker' to ensure that every test run uses unique data, preventing database collisions and making the automation suite 'Seed-Agnostic'.
