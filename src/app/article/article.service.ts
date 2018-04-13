import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {OfflineService} from '../common';
import {ArticleOfflineService} from './article-offline.service';
import {ArticleOnlineService} from './article-online.service';

export interface IArticle {
  /*readonly*/ _id?: string; // readonly/optional: updatable by offline cache
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

  constructor(
    private offlineService: OfflineService,
    private onlineArticleService: ArticleOnlineService,
    private offlineArticleService: ArticleOfflineService,
  ) {
  }

  list(search: string = ''): Observable<IArticle[]> {
    if (this.offlineService.isOnline) {
      return this.onlineArticleService.list(search);
    } else {
      return this.offlineArticleService.list(search);
    }
  }

  get(_id: string): Observable<IArticle> {
    if (this.offlineService.isOnline) {
      return this.onlineArticleService.get(_id);
    } else {
      return this.offlineArticleService.get(_id);
    }
  }

  create(article: IArticle): Observable<IArticle> {
    if (this.offlineService.isOnline) {
      return this.onlineArticleService.create(article);
    } else {
      return this.offlineArticleService.create(article);
    }
  }

  update(article: IArticle): Observable<IArticle> {
    if (this.offlineService.isOnline) {
      return this.onlineArticleService.update(article);
    } else {
      return this.offlineArticleService.update(article);
    }
  }

  delete(article: IArticle): Observable<any> {
    if (this.offlineService.isOnline) {
      return this.onlineArticleService.delete(article);
    } else {
      return this.offlineArticleService.delete(article);
    }
  }

}
