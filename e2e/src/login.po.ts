import {by, element} from 'protractor';

export class LoginPage {
  async fillEmail(email: string) {
    await element(by.css('form input[name="email"]')).sendKeys(email);
    return this;
  }

  async fillPassword(password: string) {
    await element(by.css('form input[name="password"]')).sendKeys(password);
    return this;
  }

  async submit() {
    await element(by.css('form button[type="submit"]')).click();
  }

}
