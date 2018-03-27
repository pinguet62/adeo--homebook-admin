import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {AuthorizationHttpInterceptor} from './authorization.http-interceptor';
import {routes} from './login-routing';
import {LoginComponent} from './login.component';
import {LoginGuard} from './login.guard';
import {LoginService} from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // lib
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
    FlexLayoutModule,
    // app
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true},
    LoginService,
    LoginGuard
  ]
})
export class LoginModule {
}
