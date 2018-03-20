import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ArticleCreateComponent} from './article-create.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleUpdateComponent, PreviewDialogComponent} from './article-update.component';
import {routes} from './article-routing';
import {ArticleComponent} from './article.component';
import {ArticleService} from './article.service';

@NgModule({
  declarations: [
    ArticleComponent, ArticleListComponent, ArticleCreateComponent, ArticleUpdateComponent, PreviewDialogComponent,
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
