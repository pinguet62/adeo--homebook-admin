import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import {AlertModule, ValidatorsModule} from '../common';
import {UserPermissionsComponent} from './user-permissions.component';
import {routes} from './user-routing';
import {UserComponent} from './user.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // lib
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatStepperModule, MatTooltipModule,
    // app
    RouterModule.forChild(routes),
    AlertModule, ValidatorsModule,
  ],
  declarations: [
    UserComponent,
    UserPermissionsComponent,
  ],
  providers: [
    UserService
  ]
})
export class UserModule {
}
