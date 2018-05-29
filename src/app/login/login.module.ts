import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ErrorTranslateModule, I18nChildModule} from '../shared';
import {routes} from './login-routing';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    // lib
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
    // app
    RouterModule.forChild(routes),
    ErrorTranslateModule,
    I18nChildModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule {
}
