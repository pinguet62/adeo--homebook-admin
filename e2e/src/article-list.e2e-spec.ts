import * as nock from 'nock';
import {ArticleListPage} from './article-list.po';
import {MOCKEND_BACKEND, openApp} from './utils';

describe('Article list', () => {
  const articles = [{
    _id: '1',
    title: 'title 1',
    cover: {path: 'path 1'}
  }];
  beforeEach(() => {
    nock(MOCKEND_BACKEND)
      .get('/package-management/article?search=')
      .reply(200, {data: articles});
  });
  afterEach(() => nock.cleanAll());

  let page: ArticleListPage;
  beforeEach(async () => {
    const indexPage = await openApp({logged: true});
    page = await indexPage.clickOnArticles() as ArticleListPage;
  });

  it('Should display results', async () => {
    await expect((await page.getArticles()).length).toEqual(articles.length);
  });
});
