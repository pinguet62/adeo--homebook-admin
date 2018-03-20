import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ArticleEditComponent, PreviewDialogComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleComponent} from './article.component';
import {routes} from './article-routing';
import {ArticleService} from './article.service';

@NgModule({
  declarations: [
    ArticleComponent, ArticleListComponent, ArticleEditComponent, PreviewDialogComponent,
  ],
  entryComponents: [
    PreviewDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    // lib
    MatButtonModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule,
    // app
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {
}
