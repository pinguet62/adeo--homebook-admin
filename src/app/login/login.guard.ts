import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {LOGIN_ROUTE, ORIGINAL_URL} from './constants';
import {LoginService} from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.jwtToken) {
      return true;
    }

    this.router.navigate([`/${LOGIN_ROUTE}`], {queryParams: {[ORIGINAL_URL]: state.url}});
    return false;
  }

}
