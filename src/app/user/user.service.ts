import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebookResult';

export interface IUser {
  _id: string;
  status: string;
  email: string;
  name: string;
  surname: string;
  permissions: string[];
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<IUser> {
    return this.http
      .get<HomebookResult<IUser>>(environment.apiUrl + `/users/${id}`)
      .map((it) => it.data);
  }

  updatePermissions(id: string, permissions: string[]): Observable<string[]> {
    return this.http
      .put<HomebookResult<string[]>>(
        environment.apiUrl + `/users/${id}/permissions`,
        permissions
      )
      .map((it) => it.data);
  }

}
