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
    ArticleComponent,
    ArticleContentsComponent, ArticleEditComponent, PreviewDialogComponent,
    ArticleListComponent, ArticleShowComponent, ArticleCreateComponent, ArticleUpdateComponent,
  ],
  entryComponents: [
    PreviewDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // lib
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatTooltipModule,
    // app
    RouterModule.forChild(routes),
    ConfirmDialogModule,
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {
}
