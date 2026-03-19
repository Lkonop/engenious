import { test, expect } from '../fixtures/pom.fixture';
import { DbUtils } from '../utils/db-utils';
import { userPassword, getRandomUser, defaultBankData } from '../test-data/user-data';
import { urls } from '../test-data/urls';
import { errorMessages } from '../test-data/messages';

test.describe('Authentication tests', () => {

  test('should redirect unauthenticated user to signin page', async ({ page }) => {
    await test.step('Navigate to personal transactions', async () => {
      await page.goto(urls.personal);
    });

    await test.step('Verify redirect to signin page', async () => {
      await expect(page).toHaveURL(urls.signin);
    });
  });

  test('should redirect to the home page after login', async ({ page, loginPage, nav, homePage }) => {
    const user = await DbUtils.findUser({});

    await test.step('Login with valid credentials', async () => {
      await page.goto(urls.signin);
      await loginPage.login(user.username, userPassword);
    });

    await test.step('Verify redirect to home page', async () => {
      await expect(page).toHaveURL(urls.home);
      await expect(nav.usernameLabel).toBeVisible();
      await expect(homePage.transactionList).toBeVisible();
    });
  });

  test('should remember a user for 30 days after login', async ({ page, loginPage, nav }) => {
    const user = await DbUtils.findUser({});

    await test.step('Login with "Remember me" checked', async () => {
      await page.goto(urls.signin);
      await loginPage.login(user.username, userPassword, true);
    });

    await test.step('Verify session persistence after reload', async () => {
      await page.reload();
      await expect(nav.usernameLabel).toBeVisible();
    });

    await test.step('Logout and verify redirection', async () => {
      await nav.logout();
      await expect(page).toHaveURL(urls.signin);
    });
  });

  test('should allow a visitor to sign-up, login, and logout', async ({ page, loginPage, signupPage, homePage, nav }) => {
    const userInfo = getRandomUser();

    await test.step('Navigate to Signup and fill form', async () => {
      await page.goto(urls.signup);
      await expect(signupPage.title).toBeVisible();
      await signupPage.signup(userInfo);
    });

    await test.step('Login with new user', async () => {
      await expect(page).toHaveURL(urls.signin);
      await loginPage.login(userInfo.username, userInfo.password);
    });

    await test.step('Complete onboarding flow', async () => {
      await expect(homePage.onboardingDialog).toBeVisible();
      await homePage.completeOnboarding(
        defaultBankData.name, 
        defaultBankData.accountNumber, 
        defaultBankData.routingNumber
      );
    });

    await test.step('Verify app state and logout', async () => {
      await expect(homePage.transactionList).toBeVisible();
      await nav.logout();
      await expect(page).toHaveURL(urls.signin);
    });
  });

  test('should display login errors', async ({ page, loginPage }) => {
    await test.step('Navigate to signin', async () => {
      await page.goto(urls.signin);
    });

    await test.step('Trigger "Username is required" error', async () => {
      await loginPage.usernameInput.fill('User');
      await loginPage.usernameInput.clear();
      await loginPage.usernameInput.blur();
      await expect(loginPage.usernameHelperText).toBeVisible();
      await expect(loginPage.usernameHelperText).toContainText(errorMessages.usernameRequired);
    });

    await test.step('Trigger "Password must contain at least 4 characters" error', async () => {
      await loginPage.passwordInput.fill('abc');
      await loginPage.passwordInput.blur();
      await expect(loginPage.passwordHelperText).toBeVisible();
      await expect(loginPage.passwordHelperText).toContainText(errorMessages.passwordTooShort);
    });

    await test.step('Verify submit button is disabled', async () => {
      await expect(loginPage.submitButton).toBeDisabled();
    });
  });

  test('should display signup errors', async ({ page, signupPage }) => {
    await test.step('Navigate to signup', async () => {
      await page.goto(urls.signup);
    });

    await test.step('Verify required field errors', async () => {
      const inputs = [
        { loc: signupPage.firstNameInput, helper: signupPage.firstNameHelper, text: errorMessages.firstNameRequired },
        { loc: signupPage.lastNameInput, helper: signupPage.lastNameHelper, text: errorMessages.lastNameRequired },
        { loc: signupPage.usernameInput, helper: signupPage.usernameHelper, text: errorMessages.usernameRequired },
        { loc: signupPage.passwordInput, helper: signupPage.passwordHelper, text: errorMessages.passwordRequired },
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
      await expect(signupPage.confirmPasswordHelper).toContainText(errorMessages.passwordsDoNotMatch);
    });

    await test.step('Verify signup button is disabled', async () => {
      await expect(signupPage.submitButton).toBeDisabled();
    });
  });

  test('should error for an invalid user', async ({ page, loginPage }) => {
    await test.step('Attempt login with invalid user', async () => {
      await page.goto(urls.signin);
      await loginPage.login('invalidUserName', 'invalidPa$$word');
    });

    await test.step('Verify error message', async () => {
      await expect(loginPage.loginError).toBeVisible();
      await expect(loginPage.loginError).toHaveText(errorMessages.invalidCredentials);
    });
  });

  test('should error for an invalid password for existing user', async ({ page, loginPage }) => {
    const user = await DbUtils.findUser({});

    await test.step('Attempt login with invalid password', async () => {
      await page.goto(urls.signin);
      await loginPage.login(user.username, 'INVALID');
    });

    await test.step('Verify error message', async () => {
      await expect(loginPage.loginError).toBeVisible();
      await expect(loginPage.loginError).toHaveText(errorMessages.invalidCredentials);
    });
  });
});
