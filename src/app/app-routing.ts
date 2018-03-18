import {Routes} from '@angular/router';

import {ArticleEditComponent} from './article/article-edit.component';
import {ArticleListComponent} from './article/article-list.component';
import {EmptyComponent} from './layout/empty.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginGuard} from './login';

export const routes: Routes = [
  {path: '', component: EmptyComponent, canActivate: [LoginGuard]},
  {
    path: 'article', component: RouterOutletComponent,
    children: [
      {path: '', component: ArticleListComponent},
      {path: ':id', component: ArticleEditComponent},
    ]
  },
];
