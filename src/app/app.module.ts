import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ArticleListComponent} from './article/article-list.component';
import {ArticleEditComponent} from './article/article-edit.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {EmptyComponent} from './layout/empty.component';
import {LoginComponent} from './login/login.component';
import {routes} from './router';

@NgModule({
  declarations: [
    AppComponent, EmptyComponent, RouterOutletComponent,
    LoginComponent,
    ArticleListComponent, ArticleEditComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
