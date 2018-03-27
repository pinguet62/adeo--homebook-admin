import {Routes} from '@angular/router';

import {UserPermissionsComponent} from './user-permissions.component';
import {UserComponent} from './user.component';

export const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: '', component: UserPermissionsComponent}
    ]
  },
];
