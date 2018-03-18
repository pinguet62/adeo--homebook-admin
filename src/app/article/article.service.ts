import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebookResult';

export interface IArticle {
  readonly _id: string;
  title: string;
  summary?: string;
  engine?: string;
  contents?: string;
  url?: string;
  tags?: string[];
  partnerId?: string; // 'leroymerlin-fr', 'kbane-fr', 'boulanger-fr'
  readonly version?: string;
  author?: string;
  published?: string;
  authoredAt?: string;
  cover: IMedia;
  readonly searchTokens?: IMedia;
}

export interface IMedia {
  _id: string;
  title?: string;
  engine?: string; // 'local', 'openstack'
  path: string;
  type?: string; // 'image', 'other'
  mime?: string;
  thumbnails?: {
    small: string;
    medium: string;
  };
}

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<IArticle[]> {
    return this.http
      .get<HomebookResult<IArticle[]>>(environment.apiUrl + `/package-management/article`)
      .map((it) => it.data);
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

}
