import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>App</div>
    <ul>
      <li><a routerLink="/">/</a></li>
      <li><a routerLink="/login">/login</a></li>
      <li><a routerLink="/article">/article</a></li>
      <li><a routerLink="/article/42">/article/42</a></li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
