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
import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '../environments/environment';
import {ConfigInitializerModule} from './app-config-initializer';
import {routes} from './app-routing';
import {AppComponent} from './app.component';
import {IndexComponent} from './index.component';
import {EmptyComponent} from './layout/empty.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {AlertModule, GlobalErrorModule, I18nRootModule, SecurityModule} from './shared';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    // lib
    MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule,
    // app
    RouterModule.forRoot(routes),
    AlertModule,
    ConfigInitializerModule,
    GlobalErrorModule,
    I18nRootModule,
    SecurityModule,
  ],
  declarations: [
    EmptyComponent, RouterOutletComponent,
    AppComponent, IndexComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
