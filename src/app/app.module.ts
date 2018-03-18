import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {routes} from './app-routing';
import {AppComponent} from './app.component';
import {ArticleModule} from './article';
import {EmptyComponent} from './layout/empty.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginModule} from './login';

@NgModule({
  declarations: [
    AppComponent, EmptyComponent, RouterOutletComponent
  ],
  imports: [
    // lib
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    // app
    LoginModule, ArticleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
