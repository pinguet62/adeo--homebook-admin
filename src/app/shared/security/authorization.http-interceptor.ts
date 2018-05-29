import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {LoginService} from './login.service';

@Injectable()
export class AuthorizationHttpInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.jwtToken) {
      req = req.clone({headers: req.headers.set('Authorization', this.loginService.jwtToken)});
    }
    return next.handle(req);
  }

}
