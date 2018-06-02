import {Routes} from '@angular/router';

import {IndexComponent} from './index.component';
import {RouterOutletComponent} from './layout/router-outlet.component';
import {LoginGuard, RoleGuard} from './shared';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  {
    path: 'article', component: RouterOutletComponent, canActivate: [LoginGuard, RoleGuard], data: {roles: ['package-management.manage']}, children: [
      {path: '', loadChildren: 'app/article/article.module#ArticleModule'},
    ]
  },
  {
    path: 'user', component: RouterOutletComponent, canActivate: [LoginGuard, RoleGuard], data: {roles: ['users.manage']}, children: [
      {path: '', loadChildren: 'app/user/user.module#UserModule'},
    ]
  },
];
