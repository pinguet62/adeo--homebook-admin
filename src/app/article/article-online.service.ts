import {HttpClient} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebookResult';
import {ArticleOfflineService} from './article-offline.service';
import {IArticle} from './article.service';

@Injectable()
export class ArticleOnlineService {

  private offlineArticleService: ArticleOfflineService;

  constructor(
    private http: HttpClient,
    injector: Injector
  ) {
    setTimeout(() => this.offlineArticleService = injector.get(ArticleOfflineService)); // avoid circular dependency
  }

  list(search: string = ''): Observable<IArticle[]> {
    return this.http
      .get<HomebookResult<IArticle[]>>(environment.apiUrl + `/package-management/article?search=${search}`)
      .map((it) => it.data)
      .do((it) => {
        this.offlineArticleService.listCache.splice(0, this.offlineArticleService.listCache.length);
        it.forEach(x => this.offlineArticleService.listCache.push(x));
      });
  }

  get(_id: string): Observable<IArticle> {
    return this.http
      .get<HomebookResult<IArticle>>(environment.apiUrl + `/package-management/article/${_id}`)
      .map((it) => it.data);
  }

  create(article: IArticle): Observable<IArticle> {
    return this.http
      .post<HomebookResult<IArticle>>(
        environment.apiUrl + `/package-management/article`,
        article
      )
      .map((it) => it.data);
  }

  update(article: IArticle): Observable<IArticle> {
    return this.http
      .put<HomebookResult<IArticle>>(
        environment.apiUrl + `/package-management/article/${article._id}`,
        article
      )
      .map((it) => it.data);
  }

  delete(article: IArticle): Observable<any> {
    return this.http
      .delete<HomebookResult<IArticle>>(environment.apiUrl + `/package-management/article/${article._id}`);
  }

}
