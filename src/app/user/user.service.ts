import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

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
      .pipe(map(it => it.data))
      .pipe(tap((it: IUser) => it.permissions = it.permissions || []));
  }

  getByEmail(email: string): Observable<IUser> {
    return this.http
      .get<HomebookResult<IUser>>(
        environment.apiUrl + `/users/fromEmail`,
        {params: new HttpParams().set('emails', [email].join(','))}
      )
      .pipe(map(it => it.data))
      .pipe(map(it => it[email])) // object: key=email / value=IUser
      .pipe(tap((it: IUser) => it.permissions = it.permissions || []));
  }

  updatePermissions(id: string, permissions: string[]): Observable<string[]> {
    return this.http
      .put<HomebookResult<string[]>>(
        environment.apiUrl + `/users/${id}/permissions`,
        permissions
      )
      .pipe(map(it => it.data));
  }

}
