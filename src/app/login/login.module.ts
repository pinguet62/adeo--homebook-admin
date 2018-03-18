import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {AuthorizationInterceptor} from './authorization-interceptor';
import {routes} from './login-routing';
import {LoginComponent} from './login.component';
import {LoginGuard} from './login.guard';
import {LoginService} from './login.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    // lib
    MatButtonModule, MatFormFieldModule, MatInputModule,
    // app
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    LoginService, LoginGuard
  ]
})
export class LoginModule {
}
