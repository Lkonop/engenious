import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class NavComponent {
  readonly page: Page;
  readonly sidenavToggle: Locator;
  readonly signoutButton: Locator;
  readonly usernameLabel: Locator;
  readonly notificationsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidenavToggle = page.locator('[data-test="sidenav-toggle"]');
    this.signoutButton = page.locator('[data-test="sidenav-signout"]');
    this.usernameLabel = page.locator('[data-test="sidenav-username"]');
    this.notificationsCount = page.locator('[data-test="nav-top-notifications-count"]');
  }

  async logout(): Promise<LoginPage> {
    // In RWA, the logout button is in the sidebar which might be hidden
    if (!(await this.signoutButton.isVisible())) {
      await this.sidenavToggle.click();
    }
    await this.signoutButton.click();
    return new LoginPage(this.page);
  }
}
