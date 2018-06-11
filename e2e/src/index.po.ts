import {browser, by, element} from 'protractor';

import {ArticleListPage} from './article-list.po';
import {LoginPage} from './login.po';
import {UserPage} from './user.po';

export class IndexPage {
  async clickOnArticles(): Promise<LoginPage | ArticleListPage> {
    await element(by.css('app-root main div[routerlink="/article"]')).click();
    return (await browser.getCurrentUrl()).match('/login') ? new LoginPage() : new ArticleListPage();
  }

  async clickOnUser(): Promise<LoginPage | UserPage> {
    await element(by.css('app-root main div[routerlink="/user"]')).click();
    return (await browser.getCurrentUrl()).match('/login') ? new LoginPage() : new UserPage();
  }
}
