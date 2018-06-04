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
import {SimplemdeModule} from 'ng2-simplemde';

import {MediaModule} from '../media';
import {
  BadgeAvatarModule,
  ChipListAutocompleteModule,
  ConfirmDialogModule,
  ErrorTranslateModule,
  I18nChildModule
} from '../shared';
import {ArticleContentsComponent} from './article-contents.component';
import {ArticleCreateComponent} from './article-create.component';
import {ArticleEditComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';
import {routes} from './article-routing';
import {ArticleShowComponent} from './article-show.component';
import {ArticleUpdateComponent} from './article-update.component';
import {ArticleComponent} from './article.component';
import {ArticleService} from './article.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    // lib
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatTooltipModule,
    SimplemdeModule.forRoot(),
    // app
    RouterModule.forChild(routes),
    BadgeAvatarModule,
    ErrorTranslateModule,
    ChipListAutocompleteModule,
    ConfirmDialogModule,
    I18nChildModule,
    MediaModule,
  ],
  declarations: [
    ArticleComponent,
    ArticleContentsComponent, ArticleEditComponent,
    ArticleListComponent, ArticleShowComponent, ArticleCreateComponent, ArticleUpdateComponent,
  ],
  providers: [
    ArticleService,
  ]
})
export class ArticleModule {
}
