import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ConfirmDialogModule, ErrorTranslateModule, I18nChildModule} from '../shared';
import {FeatureFlippingCreateComponent} from './feature-flipping-create.component';
import {FeatureFlippingListComponent} from './feature-flipping-list.component';
import {routes} from './feature-flipping-routing';
import {FeatureFlippingService} from './feature-flipping.service';
import {FeatureFlippingServiceMock} from './feature-flipping.service-mock';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    // lib
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatTableModule,
    // app
    RouterModule.forChild(routes),
    ConfirmDialogModule,
    ErrorTranslateModule,
    I18nChildModule,
  ],
  declarations: [
    FeatureFlippingListComponent,
    FeatureFlippingCreateComponent,
  ],
  entryComponents: [
    FeatureFlippingCreateComponent,
  ],
  providers: [
    {provide: FeatureFlippingService, useClass: FeatureFlippingServiceMock}, // FeatureFlippingService,
  ]
})
export class FeatureFlippingModule {
}
