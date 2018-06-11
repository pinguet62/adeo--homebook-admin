import * as nock from 'nock';
import {LoginPage} from './login.po';
import {JWT_TOKEN, MOCKEND_BACKEND, openApp} from './utils';

describe('Login', () => {
  let postUsersLoginNock: nock.Scope;
  beforeEach(() => {
    postUsersLoginNock = nock(MOCKEND_BACKEND)
      .post('/users/login')
      .reply(200, {data: JWT_TOKEN});
  });
  afterEach(() => nock.cleanAll());

  let page: LoginPage;
  beforeEach(async () => {
    const indexPage = await openApp();
    page = await indexPage.clickOnUser() as LoginPage; // not logged = redirect to "LoginPage"
  });

  it('Process', async () => {
    const email = 'user@example.com';
    const password = 'secret1234';

    await page.fillEmail(email);
    await page.fillPassword(password);
    await page.submit();
    expect(postUsersLoginNock.isDone()).toBe(true);
  });
});
