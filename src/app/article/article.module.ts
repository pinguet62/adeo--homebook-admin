import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ConfirmDialogModule} from '../common';
import {ArticleContentsComponent} from './article-contents.component';
import {ArticleCreateComponent} from './article-create.component';
import {ArticleEditComponent, PreviewDialogComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';
import {routes} from './article-routing';
import {ArticleShowComponent} from './article-show.component';
import {ArticleUpdateComponent} from './article-update.component';
import {ArticleComponent} from './article.component';
import {ArticleService} from './article.service';

@NgModule({
  declarations: [
    ArticleComponent, ArticleListComponent, ArticleShowComponent, ArticleEditComponent, ArticleCreateComponent, ArticleUpdateComponent, PreviewDialogComponent, ArticleContentsComponent,
  ],
  entryComponents: [
    PreviewDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    // lib
    MatButtonModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule, MatTooltipModule,
    // app
    RouterModule.forChild(routes),
    ConfirmDialogModule,
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
