import {Routes} from '@angular/router';

import {ArticleCreateComponent} from './article-create.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleShowComponent} from './article-show.component';
import {ArticleUpdateComponent} from './article-update.component';
import {ArticleComponent} from './article.component';

export const routes: Routes = [
  {
    path: '', component: ArticleComponent, children: [
      {path: '', component: ArticleListComponent},
      {path: 'show/:_id', component: ArticleShowComponent},
      {path: 'create', component: ArticleCreateComponent},
      {path: 'edit/:_id', component: ArticleUpdateComponent},
    ]
  },
];
