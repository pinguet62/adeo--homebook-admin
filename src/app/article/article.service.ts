import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebook';
import {IMedia} from '../media';

export enum PartnerId {
  LEROY_MERLIN = 'leroymerlin-fr',
  BOULANGER = 'boulanger-fr',
}

export interface IArticle {
  _id: string;
  title: string;
  summary?: string;
  engine?: string;
  contents?: string;
  url?: string;
  tags?: string[];
  partnerId?: PartnerId;
  readonly version?: string;
  author?: string;
  published?: string;
  authoredAt?: string;
  cover: IMedia;
  readonly searchTokens?: IMedia;
}

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  list(search: string = ''): Observable<IArticle[]> {
    return this.http
      .get<HomebookResult<IArticle[]>>(environment.apiUrl + `/package-management/article?search=${search}`)
      .pipe(map(it => it.data));
  }

  get(_id: string): Observable<IArticle> {
    return this.http
      .get<HomebookResult<IArticle>>(environment.apiUrl + `/package-management/article/${_id}`)
      .pipe(map(it => it.data));
  }

  create(article: IArticle): Observable<IArticle> {
    return this.http
      .post<HomebookResult<IArticle>>(
        environment.apiUrl + `/package-management/article`,
        article
      )
      .pipe(map(it => it.data));
  }

  update(article: IArticle): Observable<IArticle> {
    return this.http
      .put<HomebookResult<IArticle>>(
        environment.apiUrl + `/package-management/article/${article._id}`,
        article
      )
      .pipe(map(it => it.data));
  }

  delete(article: IArticle): Observable<any> {
    return this.http
      .delete<HomebookResult<IArticle>>(environment.apiUrl + `/package-management/article/${article._id}`)
      .pipe(map((it) => it.data));
  }

}
