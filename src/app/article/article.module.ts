import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {MediaModule} from '../media';
import {ChipListAutocompleteModule, ConfirmDialogModule} from '../shared';
import {ArticleContentsComponent} from './article-contents.component';
import {ArticleCreateComponent} from './article-create.component';
import {ArticleEditComponent, PreviewDialogComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleOfflineService} from './article-offline.service';
import {ArticleOnlineService} from './article-online.service';
import {routes} from './article-routing';
import {ArticleShowComponent} from './article-show.component';
import {ArticleUpdateComponent} from './article-update.component';
import {ArticleComponent} from './article.component';
import {ArticleService} from './article.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // lib
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatTooltipModule,
    // app
    RouterModule.forChild(routes),
    ChipListAutocompleteModule,
    ConfirmDialogModule,
    MediaModule,
  ],
  declarations: [
    ArticleComponent,
    ArticleContentsComponent, ArticleEditComponent, PreviewDialogComponent,
    ArticleListComponent, ArticleShowComponent, ArticleCreateComponent, ArticleUpdateComponent,
  ],
  entryComponents: [
    PreviewDialogComponent
  ],
  providers: [
    ArticleService,
    ArticleOnlineService,
    ArticleOfflineService,
  ]
})
export class ArticleModule {
}
