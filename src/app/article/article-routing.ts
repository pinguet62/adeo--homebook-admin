import {Routes} from '@angular/router';

import {ArticleEditComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';
import {ArticleComponent} from './article.component';

export const routes: Routes = [
  {
    path: '', component: ArticleComponent, children: [
      {path: '', component: ArticleListComponent},
      {path: ':_id', component: ArticleEditComponent},
    ]
  },
];
