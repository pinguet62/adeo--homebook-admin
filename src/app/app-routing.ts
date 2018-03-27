import {Routes} from '@angular/router';

import {IndexComponent} from './index.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginGuard} from './login';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {
    path: 'article', component: RouterOutletComponent, canActivate: [LoginGuard], children: [
      {path: '', loadChildren: 'app/article/article.module#ArticleModule'},
    ]
  },
  {
    path: 'user', component: RouterOutletComponent, canActivate: [LoginGuard], children: [
      {path: '', loadChildren: 'app/user/user.module#UserModule'},
    ]
  },
];
