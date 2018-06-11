import * as nock from 'nock';
import {UserPage} from './user.po';
import {MOCKEND_BACKEND, openApp} from './utils';

describe('User', () => {
  const userId = '5a13eb9fc546380027181e80';
  const user = {
    _id: userId,
    email: 'user@example.com',
    name: 'James',
    surname: 'Bond',
    permissions: ['first', 'second']
  };

  let postUsersPermissionsNock: nock.Scope;
  beforeEach(() => {
    nock(MOCKEND_BACKEND)
      .get(`/users/${userId}`)
      .reply(200, {data: user});
    postUsersPermissionsNock = nock(MOCKEND_BACKEND)
      .put(`/users/${userId}/permissions`)
      .reply(200, {data: user.permissions});
  });
  afterEach(() => nock.cleanAll());

  let page: UserPage;
  beforeEach(async () => {
    const indexPage = await openApp({logged: true});
    page = await indexPage.clickOnUser() as UserPage;
  });

  it('Search & Update', async () => {
    // step 1
    await page.fillId(userId);
    await page.search();
    // step 2
    await expect((await page.getPermissions()).length).toEqual(user.permissions.length);
    const newPermission = 'third';
    await page.addPermission(newPermission);
    await page.clickSomewhereElseToHideAutocomplete();
    await page.save();
    await expect(postUsersPermissionsNock.isDone()).toBe(true);
  });
});
