import {Injectable} from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';

import {OfflineService} from '../common';
import {ArticleOnlineService} from './article-online.service';
import {IArticle} from './article.service';

@Injectable()
export class ArticleOfflineService {

  private static idcachedPrefix = 'cache_';

  readonly listCache: IArticle[] = [];
  readonly createCache: IArticle[] = [];
  readonly updateCache: IArticle[] = [];
  readonly deleteCache: IArticle[] = [];

  constructor(
    private offlineService: OfflineService,
    private onlineArticleService: ArticleOnlineService
  ) {
    this.offlineService.online
      .filter(it => it) // offline -> online
      .subscribe(() => this.sync());
  }

  /* Actions must be ordered */
  public sync() {
    console.log('Sync...');

    Observable.from(this.createCache)
      .do(article => {
        // delete cached (by "_id")
        const index = this.createCache.findIndex(it => it._id === article._id);
        this.createCache.splice(index, 1);
      })
      .do(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      })
      .do(it => delete it._id) // temporary "_id"
      .mergeMap(it => this.onlineArticleService.create(it))
      .do(article => this.listCache.push(article)) // refresh cached (by "_id")
      .subscribe();

    Observable.from(this.updateCache)
      .do(article => {
        // delete cached (by "_id")
        const index = this.updateCache.findIndex(it => it._id === article._id);
        this.updateCache.splice(index, 1);
      })
      .do(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      })
      .mergeMap(it => this.onlineArticleService.update(it))
      .do(article => this.listCache.push(article)) // refresh cached (by "_id")
      .subscribe();

    Observable.from(this.deleteCache)
      .do(article => {
        // delete cached (by "_id")
        const index = this.deleteCache.findIndex(it => it._id === article._id);
        this.deleteCache.splice(index, 1);
      })
      .do(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      })
      .mergeMap(it => this.onlineArticleService.delete(it))
      .do(article => this.listCache.push(article)) // refresh cached (by "_id")
      .subscribe();
  }

  list(search: string = ''): Observable<IArticle[]> {
    return Observable.of(this.listCache);
  }

  get(_id: string): Observable<IArticle> {
    const article = this.listCache.find(it => it._id === _id);
    return Observable.of(article);
  }

  create(article: IArticle): Observable<IArticle> {
    article._id = ArticleOfflineService.idcachedPrefix + Math.random(); // temporary "_id"
    this.createCache.push(article);

    this.listCache.push(article);

    return Observable.of(article);
  }

  update(article: IArticle): Observable<IArticle> {
    this.updateCache.push(article);

    // refresh cached (by "_id")
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache[index] = article;

    return Observable.of(article);
  }

  delete(article: IArticle): Observable<any> {
    this.deleteCache.push(article);

    // delete cached (by "_id")
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache.splice(index, 1);

    return Observable.of(article);
  }

  private refreshCached(article: IArticle) {
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache[index] = article;
  }

}
