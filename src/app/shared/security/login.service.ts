import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {HomebookResult} from '../../homebook';

export interface HomebookJwtToken {
  iss: 'users ms';
  jid: string;
  sub: 'login';
  user: string; // `User._id`
  roles?: string[];
  exp?: number;
  iat: number;
}

@Injectable({
  providedIn: 'root' // app singleton: shared with feature modules
})
export class LoginService {

  public static readonly LOCALSTORAGE_JWTTOKEN_KEY = 'jwtToken';

  public jwtToken: string;

  public permissions: string[];

  constructor(private http: HttpClient) {
    this.jwtToken = window.localStorage.getItem(LoginService.LOCALSTORAGE_JWTTOKEN_KEY);
    this.initPermissions();
  }

  private initPermissions() {
    if (this.jwtToken) {
      const payload: HomebookJwtToken = jwtDecode(this.jwtToken);
      this.permissions = payload.roles || [];
    } else {
      this.permissions = null;
    }
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
      .pipe(map(it => it.data))
      .pipe(tap((token) => {
        this.jwtToken = token;
        this.initPermissions();
        window.localStorage.setItem(LoginService.LOCALSTORAGE_JWTTOKEN_KEY, this.jwtToken);
      }));
  }

  public logout() {
    window.localStorage.removeItem(LoginService.LOCALSTORAGE_JWTTOKEN_KEY);
    this.jwtToken = null;
    this.initPermissions();
  }

}
