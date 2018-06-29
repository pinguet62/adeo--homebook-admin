import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {I18nChildModule} from '../i18n';
import {AuthorizationHttpInterceptor} from './authorization.http-interceptor';
import {LoginGuard} from './login.guard';
import {LoginService} from './login.service';
import {RoleGuard} from './role.guard';

@NgModule({
  imports: [
    CommonModule,
    // app
    I18nChildModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true},
    LoginGuard,
    LoginService,
    RoleGuard,
  ]
})
export class SecurityModule {
}
