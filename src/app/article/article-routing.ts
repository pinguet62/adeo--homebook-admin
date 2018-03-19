import {Routes} from '@angular/router';

import {ArticleEditComponent} from './article-edit.component';
import {ArticleListComponent} from './article-list.component';

export const routes: Routes = [
  {path: '', component: ArticleListComponent},
  {path: ':_id', component: ArticleEditComponent},
];
