import {by, element, Key} from 'protractor';

export class UserPage {
  async fillId(userId: string) {
    await element(by.css('.mat-step:nth-child(1) input[name="userId"]')).sendKeys(userId);
    return this;
  }

  async search() {
    await element(by.css('.mat-step:nth-child(1) button[type="submit"]')).click();
    return this;
  }

  async getPermissions(): Promise<string[]> {
    return element.all(by.css('.mat-step:nth-child(2) .mat-chip'))
      .map(it => ({title: it.getText()})) as any as Promise<string[]>;
  }

  async addPermission(value: string) {
    return element(by.css('.mat-step:nth-child(2) input[name="permissions"]')).sendKeys(
      value,
      Key.ENTER
    );
  }

  async clickSomewhereElseToHideAutocomplete() {
    await element(by.css('.mat-step:nth-child(2) mat-step-header')).click();
    return this;
  }

  async save() {
    await element(by.css('.mat-step:nth-child(2) button[type="submit"]')).click();
    return this;
  }
}
