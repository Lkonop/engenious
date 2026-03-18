# Playwright Porting Project: Cypress RealWorld App (RWA)

This repository contains the port of the original Cypress authentication tests to the Playwright framework, following professional Page Object Model (POM) standards and robust test practices.

## 📋 Project Structure
- `cypress-realworld-app/` - The target application (SUT).
- `playwright-tests/` - The new Playwright test suite.
- `RECRUITMENT_SOLUTION.md` - Technical deep-dive and interview guide for the candidate.

## 🛠 Prerequisites
- **Node.js:** version 22.x or 25.x (the app has been patched for Node 25 compatibility).
- **Yarn:** required for the RWA application.

## 🚀 Getting Started

### 1. Start the Application
The application requires both the Frontend and the Backend to be running simultaneously.

**Frontend Setup (Port 3000):**
```bash
cd cypress-realworld-app
yarn install --ignore-engines
npx yarn start:react
```

**Backend Setup (Port 3001):**
*In a separate terminal:*
```bash
cd cypress-realworld-app
npx cross-env NODE_ENV=development TS_NODE_PROJECT=tsconfig.tsnode.json npx ts-node --files backend/app.ts
```

### 2. Run Playwright Tests
Once both ports (3000 and 3001) are active:

```bash
cd playwright-tests
npm install
npx playwright install chromium
npx playwright test
```

## 📊 Reporting
The project is configured with `allure-playwright` for high-quality test reporting.

```bash
cd playwright-tests
# To generate and view the report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## 🧠 Technical Highlights
- **DB Utilities:** Custom `DbUtils` helper for database seeding via API (replaces Cypress `cy.task`).
- **Dynamic User Handling:** Automated retrieval of test users from the DB to ensure test stability regardless of random data seeding.
- **Dependency Patching:** Manual fix for `buffer-equal-constant-time` to support Node 25.
- **Professional POM:** Clean, fluent Page Object Model with detailed `test.step` annotations.
