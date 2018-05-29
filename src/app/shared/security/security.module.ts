import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AuthorizationHttpInterceptor} from './authorization.http-interceptor';
import {LoginGuard} from './login.guard';
import {LoginService} from './login.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true},
    LoginGuard,
    LoginService,
  ]
})
export class SecurityModule {
}
