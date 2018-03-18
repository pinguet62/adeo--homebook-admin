import {Routes} from '@angular/router';
import {EmptyComponent} from './layout/empty.component';
import {LoginGuard} from './login';

export const routes: Routes = [
  {path: '', component: EmptyComponent, canActivate: [LoginGuard]},
  {path: 'article', loadChildren: 'app/article/article.module#ArticleModule'},
];
