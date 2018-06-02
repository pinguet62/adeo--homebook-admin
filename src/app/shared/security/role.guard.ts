import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {AlertLevel, AlertService} from '..';
import {LoginService} from './login.service';

/**
 * @see Route#data
 * @example
 * {
 *   path: 'sample',
 *   component: SampleComponent,
 *   canActivate: [RoleGuard],
 *   data: {roles: ['admin', 'user']}
 * }
 */
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private translateService: TranslateService,
    private loginService: LoginService,
    private alertService: AlertService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredRoles = route.data.roles as string[];
    const missingRoles = requiredRoles.filter(it => !this.loginService.permissions.includes(it));
    if (missingRoles.length === 0) {
      return of(true);
    } else {
      return this.translateService.get('common.security.roleguard.missingrole', {roles: JSON.stringify(missingRoles)})
        .pipe(tap(it => this.alertService.show(it, AlertLevel.ERROR)))
        .pipe(map(() => false));
    }
  }

}
