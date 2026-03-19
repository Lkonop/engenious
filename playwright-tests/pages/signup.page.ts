import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class SignupPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;

  // Helper texts for validation
  readonly firstNameHelper: Locator;
  readonly lastNameHelper: Locator;
  readonly usernameHelper: Locator;
  readonly passwordHelper: Locator;
  readonly confirmPasswordHelper: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="signup-title"]');
    this.firstNameInput = page.locator('[data-test="signup-first-name"] input');
    this.lastNameInput = page.locator('[data-test="signup-last-name"] input');
    this.usernameInput = page.locator('[data-test="signup-username"] input');
    this.passwordInput = page.locator('[data-test="signup-password"] input');
    this.confirmPasswordInput = page.locator('[data-test="signup-confirmPassword"] input');
    this.submitButton = page.locator('[data-test="signup-submit"]');

    this.firstNameHelper = page.locator('#firstName-helper-text');
    this.lastNameHelper = page.locator('#lastName-helper-text');
    this.usernameHelper = page.locator('#username-helper-text');
    this.passwordHelper = page.locator('#password-helper-text');
    this.confirmPasswordHelper = page.locator('#confirmPassword-helper-text');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async clickSubmit(): Promise<LoginPage> {
    await this.submitButton.click();
    return new LoginPage(this.page);
  }

  async signup(user: any): Promise<LoginPage> {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillUsername(user.username);
    await this.fillPassword(user.password);
    await this.fillConfirmPassword(user.password);
    return await this.clickSubmit();
  }
}
