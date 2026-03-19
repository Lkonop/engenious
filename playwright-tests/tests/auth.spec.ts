import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { SignupPage } from '../pages/signup.page';
import { NavComponent } from '../pages/nav.component';
import { DbUtils } from '../utils/db-utils';
import { userPassword } from '../test-data/user-data';

test.describe('Authentication tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let signupPage: SignupPage;
  let nav: NavComponent;

  test.beforeEach(async ({ page }) => {
    await test.step('Seed database', async () => {
      await DbUtils.seed();
      loginPage = new LoginPage(page);
      homePage = new HomePage(page);
      signupPage = new SignupPage(page);
      nav = new NavComponent(page);
    });
  });

  test('should redirect unauthenticated user to signin page', async ({ page }) => {
    await test.step('Navigate to personal transactions', async () => {
      await page.goto('/personal');
    });

    await test.step('Verify redirect to signin page', async () => {
      await expect(page).toHaveURL('/signin');
    });
  });

  test('should redirect to the home page after login', async ({ page }) => {
    // Fetch any user from the seeded DB to avoid issues with random faker data
    const user = await DbUtils.findUser({});

    await test.step('Login with valid credentials', async () => {
      await page.goto('/signin');
      await loginPage.login(user.username, userPassword);
    });

    await test.step('Verify redirect to home page', async () => {
      await expect(page).toHaveURL('/');
      await expect(nav.usernameLabel).toBeVisible();
      await expect(homePage.transactionList).toBeVisible();
    });
  });

  test('should remember a user for 30 days after login', async ({ page }) => {
    const user = await DbUtils.findUser({});

    await test.step('Login with "Remember me" checked', async () => {
      await page.goto('/signin');
      await loginPage.login(user.username, userPassword, true);
    });

    await test.step('Verify session persistence after reload', async () => {
      await page.reload();
      await expect(nav.usernameLabel).toBeVisible();
    });

    await test.step('Logout and verify redirection', async () => {
      await nav.logout();
      await expect(page).toHaveURL('/signin');
    });
  });

  test('should allow a visitor to sign-up, login, and logout', async ({ page }) => {
    const userInfo = {
      firstName: 'Bob',
      lastName: 'Ross',
      username: `Painter_${Date.now()}`, // Unique username for stability
      password: userPassword,
    };

    await test.step('Navigate to Signup and fill form', async () => {
      await page.goto('/signup');
      await expect(signupPage.title).toBeVisible();
      await signupPage.signup(userInfo);
    });

    await test.step('Login with new user', async () => {
      await expect(page).toHaveURL('/signin');
      await loginPage.login(userInfo.username, userInfo.password);
    });

    await test.step('Complete onboarding flow', async () => {
      await expect(homePage.onboardingDialog).toBeVisible();
      await homePage.completeOnboarding('The Best Bank', '123456789', '987654321');
    });

    await test.step('Verify app state and logout', async () => {
      await expect(homePage.transactionList).toBeVisible();
      await nav.logout();
      await expect(page).toHaveURL('/signin');
    });
  });

  test('should display login errors', async ({ page }) => {
    await test.step('Navigate to signin', async () => {
      await page.goto('/signin');
    });

    await test.step('Trigger "Username is required" error', async () => {
      await loginPage.usernameInput.fill('User');
      await loginPage.usernameInput.clear();
      await loginPage.usernameInput.blur();
      await expect(loginPage.usernameHelperText).toBeVisible();
      await expect(loginPage.usernameHelperText).toContainText('Username is required');
    });

    await test.step('Trigger "Password must contain at least 4 characters" error', async () => {
      await loginPage.passwordInput.fill('abc');
      await loginPage.passwordInput.blur();
      await expect(loginPage.passwordHelperText).toBeVisible();
      await expect(loginPage.passwordHelperText).toContainText('Password must contain at least 4 characters');
    });

    await test.step('Verify submit button is disabled', async () => {
      await expect(loginPage.submitButton).toBeDisabled();
    });
  });

  test('should display signup errors', async ({ page }) => {
    await test.step('Navigate to signup', async () => {
      await page.goto('/signup');
    });

    await test.step('Verify required field errors', async () => {
      const inputs = [
        { loc: signupPage.firstNameInput, helper: signupPage.firstNameHelper, text: 'First Name is required' },
        { loc: signupPage.lastNameInput, helper: signupPage.lastNameHelper, text: 'Last Name is required' },
        { loc: signupPage.usernameInput, helper: signupPage.usernameHelper, text: 'Username is required' },
        { loc: signupPage.passwordInput, helper: signupPage.passwordHelper, text: 'Enter your password' },
      ];

      for (const item of inputs) {
        await item.loc.fill('test');
        await item.loc.clear();
        await item.loc.blur();
        await expect(item.helper).toBeVisible();
        await expect(item.helper).toContainText(item.text);
      }
    });

    await test.step('Verify password mismatch error', async () => {
      await signupPage.passwordInput.fill('password');
      await signupPage.confirmPasswordInput.fill('DIFFERENT');
      await signupPage.confirmPasswordInput.blur();
      await expect(signupPage.confirmPasswordHelper).toBeVisible();
      await expect(signupPage.confirmPasswordHelper).toContainText('Password does not match');
    });

    await test.step('Verify signup button is disabled', async () => {
      await expect(signupPage.submitButton).toBeDisabled();
    });
  });

  test('should error for an invalid user', async ({ page }) => {
    await test.step('Attempt login with invalid user', async () => {
      await page.goto('/signin');
      await loginPage.login('invalidUserName', 'invalidPa$$word');
    });

    await test.step('Verify error message', async () => {
      await expect(loginPage.loginError).toBeVisible();
      await expect(loginPage.loginError).toHaveText('Username or password is invalid');
    });
  });

  test('should error for an invalid password for existing user', async ({ page }) => {
    const user = await DbUtils.findUser({});

    await test.step('Attempt login with invalid password', async () => {
      await page.goto('/signin');
      await loginPage.login(user.username, 'INVALID');
    });

    await test.step('Verify error message', async () => {
      await expect(loginPage.loginError).toBeVisible();
      await expect(loginPage.loginError).toHaveText('Username or password is invalid');
    });
  });
});
