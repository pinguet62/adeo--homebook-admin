import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {routes} from './app-routing';
import {AppComponent} from './app.component';
import {AlertModule, GlobalErrorModule} from './common';
import {IndexComponent} from './index.component';
import {EmptyComponent} from './layout/empty.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginModule} from './login';

@NgModule({
  declarations: [
    EmptyComponent, RouterOutletComponent,
    AppComponent, IndexComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // lib
    FlexLayoutModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule,
    // app
    RouterModule.forRoot(routes),
    AlertModule,
    GlobalErrorModule,
    LoginModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
