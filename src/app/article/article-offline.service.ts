import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, mergeMap, tap} from 'rxjs/operators';

import {OfflineService} from '../shared';
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
      .pipe(filter(it => it)) // offline -> online
      .subscribe(() => this.sync());
  }

  /* Actions must be ordered */
  public sync() {
    console.log('Sync...');

    of(...this.createCache)
      .pipe(tap(article => {
        // delete cached (by "_id")
        const index = this.createCache.findIndex(it => it._id === article._id);
        this.createCache.splice(index, 1);
      }))
      .pipe(tap(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      }))
      .pipe(tap(it => delete it._id)) // temporary "_id"
      .pipe(mergeMap(it => this.onlineArticleService.create(it)))
      .pipe(tap(article => this.listCache.push(article))) // refresh cached (by "_id")
      .subscribe();

    of(...this.updateCache)
      .pipe(tap(article => {
        // delete cached (by "_id")
        const index = this.updateCache.findIndex(it => it._id === article._id);
        this.updateCache.splice(index, 1);
      }))
      .pipe(tap(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      }))
      .pipe(mergeMap(it => this.onlineArticleService.update(it)))
      .pipe(tap(article => this.listCache.push(article))) // refresh cached (by "_id")
      .subscribe();

    of(...this.deleteCache)
      .pipe(tap(article => {
        // delete cached (by "_id")
        const index = this.deleteCache.findIndex(it => it._id === article._id);
        this.deleteCache.splice(index, 1);
      }))
      .pipe(tap(article => {
        // refresh cached (by "_id")
        const index = this.listCache.findIndex(it => it._id === article._id);
        this.listCache.splice(index, 1);
      }))
      .pipe(mergeMap(it => this.onlineArticleService.delete(it)))
      .pipe(tap(article => this.listCache.push(article))) // refresh cached (by "_id")
      .subscribe();
  }

  list(search: string = ''): Observable<IArticle[]> {
    return of(this.listCache);
  }

  get(_id: string): Observable<IArticle> {
    const article = this.listCache.find(it => it._id === _id);
    return of(article);
  }

  create(article: IArticle): Observable<IArticle> {
    article._id = ArticleOfflineService.idcachedPrefix + Math.random(); // temporary "_id"
    this.createCache.push(article);

    this.listCache.push(article);

    return of(article);
  }

  update(article: IArticle): Observable<IArticle> {
    this.updateCache.push(article);

    // refresh cached (by "_id")
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache[index] = article;

    return of(article);
  }

  delete(article: IArticle): Observable<any> {
    this.deleteCache.push(article);

    // delete cached (by "_id")
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache.splice(index, 1);

    return of(article);
  }

  private refreshCached(article: IArticle) {
    const index = this.listCache.findIndex(it => it._id === article._id);
    this.listCache[index] = article;
  }

}
