import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebookResult';

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
export class MediaService {
  constructor(private http: HttpClient) {
  }

  upload(file: File) {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http
      .post<HomebookResult<IMedia>>(
        environment.apiUrl + '/media',
        data
      )
      .pipe(map(it => it.data))
      .pipe(tap((it: IMedia) => this._updatePathIfLocalStorage(it)));
  }

  delete(media: IMedia) {
    return this.http
      .delete<HomebookResult<IMedia>>(environment.apiUrl + `/media/${media._id}`)
      .pipe(map((it) => it.data));
  }

  _updatePathIfLocalStorage(media: IMedia) {
    try {
      new URL(media.path); // tslint:disable-line
      return;
    } catch (err) {
    }

    const processUrl = (url) => (environment.apiUrl + '/media/raw/' + url)
      .replace(new RegExp('//media/raw/'), '/media/raw/')
      .replace(new RegExp('/media/raw//'), '/media/raw/');

    media.path = processUrl(media.path);
    if (media.thumbnails) {
      media.thumbnails.small = processUrl(media.thumbnails.small);
      media.thumbnails.medium = processUrl(media.thumbnails.medium);
    }
  }
}
