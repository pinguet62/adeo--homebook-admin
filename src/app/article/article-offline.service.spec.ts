import {of} from 'rxjs';

import {OfflineService} from '../shared';
import {ArticleOfflineService} from './article-offline.service';
import {ArticleOnlineService} from './article-online.service';
import {IArticle} from './article.service';

describe('article/article-offline.service', () => {
  let service: ArticleOfflineService;
  let onlineArticleService: jasmine.SpyObj<ArticleOnlineService>;
  beforeEach(() => {
    onlineArticleService = jasmine.createSpyObj(ArticleOnlineService.name, Object.keys(ArticleOnlineService.prototype));
    service = new ArticleOfflineService(
      {online: of(false)} as OfflineService,
      onlineArticleService
    );
  });

  describe('create()', () => {
    it('Should: initialize "_id" + append to "createCache" & "listCache"', () => {
      const newArticle = {} as IArticle;

      service.create(newArticle);

      expect(newArticle._id).not.toBeUndefined(); // temporary "_id"
      expect(service.createCache.length).toBe(1);
      expect(service.listCache.length).toBe(1);
    });
  });

  describe('update()', () => {
    it('Should: append to "updateCache" + refresh into "listCache"', () => {
      const existingArticle = {_id: '_id', title: 'initial'} as IArticle;
      service.listCache.push(existingArticle);

      const updatedArticle = {...existingArticle, title: 'updated'};
      service.update(updatedArticle);

      expect(service.updateCache.length).toBe(1);
      expect(service.listCache.find(it => it._id === existingArticle._id).title).toEqual('updated');
    });
  });

  describe('delete()', () => {
    it('Should: append to "deleteCache" + remove from "listCache"', () => {
      const existingArticle = {_id: '_id', title: 'title'} as IArticle;
      service.listCache.push(existingArticle);

      const deletedArticle = {...existingArticle};
      service.delete(deletedArticle);

      expect(service.deleteCache.length).toBe(1);
      expect(service.listCache.find(it => it._id === existingArticle._id)).toBeUndefined();
    });
  });

  describe('sync()', () => {
    describe('when there are new values into "createCache"', () => {
      it(`Should: remove from "createCache" + call "ArticleOnlineService#create()" + refresh into "listCache"`, () => {
        const newArticle = {_id: 'temporary', title: 'initial'} as IArticle;
        service.createCache.push(newArticle);
        service.listCache.push(newArticle);

        const onlineCreate = onlineArticleService.create.and.returnValue(of({
          _id: 'real',
          title: 'expected', foo: 'bar'
        }));

        service.sync();

        expect(service.createCache.length).toBe(0);
        expect(onlineCreate.calls.any()).toBe(true);
        expect(service.listCache.find(it => it._id === 'real').title).toBe('expected');
      });
    });

    describe('when there are new values into "updateCache"', () => {
      it(`Should: remove from "updateCache" + call "ArticleOnlineService#update()" + refresh into "listCache"`, () => {
        const existingArticle = {_id: '_id', title: 'initial'} as IArticle;
        service.updateCache.push(existingArticle);
        service.listCache.push(existingArticle);

        const onlineUpdate = onlineArticleService.update.and.returnValue(of({
          _id: '_id',
          title: 'updated'
        }));

        service.sync();

        expect(service.updateCache.length).toBe(0);
        expect(onlineUpdate.calls.any()).toBe(true);
        expect(service.listCache.find(it => it._id === existingArticle._id).title).toBe('updated');
      });
    });

    describe('when there are new values into "deleteCache"', () => {
      it(`Should: remove from "deleteCache" + call "ArticleOnlineService#delete()"`, () => {
        const existingArticle = {_id: '_id'} as IArticle;
        service.deleteCache.push(existingArticle);
        service.listCache.push(existingArticle);

        const onlineDelete = onlineArticleService.delete.and.returnValue(of({_id: '_id'}));

        service.sync();

        expect(service.deleteCache.length).toBe(0);
        expect(onlineDelete.calls.any()).toBe(true);
      });
    });
  });
});
