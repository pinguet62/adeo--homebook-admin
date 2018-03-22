import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebookResult';

const LOCALSTORAGE_JWTTOKEN_KEY = 'jwtToken';

@Injectable()
export class LoginService {

  public jwtToken: string = window.localStorage.getItem(LOCALSTORAGE_JWTTOKEN_KEY);

  constructor(private http: HttpClient) {
  }

  /** @returns The JWT token. */
  public login(email: string, password: string): Observable<string> {
    return this.http.post<HomebookResult<string>>(
      environment.apiUrl + '/users/login',
      new HttpParams()
        .set('email', email)
        .set('password', password),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .map((it) => it.data)
      .do((token) => this.processLogin(token));
  }

  private processLogin(token: string) {
    this.jwtToken = token;
    window.localStorage.setItem(LOCALSTORAGE_JWTTOKEN_KEY, this.jwtToken);
  }

}
