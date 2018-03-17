import {Routes} from '@angular/router';

import {ArticleEditComponent} from './article/article-edit.component';
import {ArticleListComponent} from './article/article-list.component';
import {EmptyComponent} from './layout/empty.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: '', component: EmptyComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'article', component: RouterOutletComponent,
    children: [
      {path: '', component: ArticleListComponent},
      {path: ':id', component: ArticleEditComponent},
    ]
  },
];
