import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {AlertLevel, AlertService} from '../alert';
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data.roles as string[];
    const missingRoles = requiredRoles.filter(it => !this.loginService.permissions.includes(it));
    if (missingRoles.length === 0) {
      return true;
    } else {
      const message = this.translateService.instant('common.security.roleguard.missingrole', {roles: JSON.stringify(missingRoles)});
      this.alertService.show(message, AlertLevel.ERROR);
      return false;
    }
  }

}
