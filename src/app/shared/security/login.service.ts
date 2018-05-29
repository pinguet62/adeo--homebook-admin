import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {HomebookResult} from '../../homebook';

const LOCALSTORAGE_JWTTOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root' // app singleton: shared with feature modules
})
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
      .pipe(map(it => it.data))
      .pipe(tap((token) => {
        this.jwtToken = token;
        window.localStorage.setItem(LOCALSTORAGE_JWTTOKEN_KEY, this.jwtToken);
      }));
  }

  public logout() {
    window.localStorage.removeItem(LOCALSTORAGE_JWTTOKEN_KEY);
    this.jwtToken = null;
  }

}
