import {Routes} from '@angular/router';

import {LOGIN_ROUTE} from './constants';
import {LoginComponent} from './login.component';

export const routes: Routes = [
  {path: LOGIN_ROUTE, component: LoginComponent},
];
