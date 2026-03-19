import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { SignupPage } from '../pages/signup.page';
import { NavComponent } from '../pages/nav.component';
import { DbUtils } from '../utils/db-utils';

type MyFixtures = {
  dbSeed: void; // Auto-fixture for DB seeding
  loginPage: LoginPage;
  homePage: HomePage;
  signupPage: SignupPage;
  nav: NavComponent;
};

export const test = base.extend<MyFixtures>({
  // Automatic DB seeding before each test
  dbSeed: [async ({}, use) => {
    await DbUtils.seed();
    await use();
  }, { auto: true }],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
  nav: async ({ page }, use) => {
    const nav = new NavComponent(page);
    await use(nav);
  },
});

export { expect } from '@playwright/test';
