import { Locator, Page } from '@playwright/test';
import { HomePage } from './home.page';
import { SignupPage } from './signup.page';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitButton: Locator;
  readonly signupLink: Locator;
  readonly loginError: Locator;
  readonly usernameHelperText: Locator;
  readonly passwordHelperText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="signin-username"] input');
    this.passwordInput = page.locator('[data-test="signin-password"] input');
    this.rememberMeCheckbox = page.locator('[data-test="signin-remember-me"] input');
    this.submitButton = page.locator('[data-test="signin-submit"]');
    this.signupLink = page.locator('[data-test="signup"]');
    this.loginError = page.locator('[data-test="signin-error"]');
    this.usernameHelperText = page.locator('#username-helper-text');
    this.passwordHelperText = page.locator('#password-helper-text');
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async toggleRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async clickSubmit(): Promise<HomePage> {
    await this.submitButton.click();
    return new HomePage(this.page);
  }

  async login(username: string, password: string, remember = false): Promise<HomePage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    if (remember) {
      await this.toggleRememberMe();
    }
    return await this.clickSubmit();
  }

  async navigateToSignup(): Promise<SignupPage> {
    await this.signupLink.click({ force: true });
    return new SignupPage(this.page);
  }
}
