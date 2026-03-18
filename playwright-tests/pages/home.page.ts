import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly onboardingDialog: Locator;
  readonly onboardingNextButton: Locator;
  readonly bankNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly routingNumberInput: Locator;
  readonly onboardingSubmitButton: Locator;
  readonly transactionList: Locator;
  readonly listSkeleton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.onboardingDialog = page.locator('[data-test="user-onboarding-dialog"]');
    this.onboardingNextButton = page.locator('[data-test="user-onboarding-next"]');
    // Using *= as per Cypress getBySelLike patterns
    this.bankNameInput = page.locator('[data-test*="bankName-input"] input');
    this.accountNumberInput = page.locator('[data-test*="accountNumber-input"] input');
    this.routingNumberInput = page.locator('[data-test*="routingNumber-input"] input');
    this.onboardingSubmitButton = page.locator('[data-test*="submit"]');
    this.transactionList = page.locator('[data-test="transaction-list"]');
    this.listSkeleton = page.locator('[data-test="list-skeleton"]');
  }

  async completeOnboarding(bankName: string, accountNumber: string, routingNumber: string): Promise<void> {
    await this.onboardingNextButton.click();
    await this.bankNameInput.fill(bankName);
    await this.accountNumberInput.fill(accountNumber);
    await this.routingNumberInput.fill(routingNumber);
    await this.onboardingSubmitButton.click();
    // Final step 'Finished'
    await this.onboardingNextButton.click();
  }
}
