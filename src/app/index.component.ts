import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `
    <div class="menus">
      <div class="box" routerLink="/article">
        <img src="/assets/article.jpg" alt="Article">
        <h2>{{'article.title' | translate}}</h2>
      </div>

      <div class="box" routerLink="/user">
        <img src="/assets/user.jpg" alt="User">
        <h2>{{'user.title' | translate}}</h2>
      </div>

      <div class="box" routerLink="/feature-flipping">
        <img src="/assets/feature-flipping.jpg" alt="Feature flipping">
        <h2>{{'featureFlipping.title' | translate}}</h2>
      </div>
    </div>
  `,
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(titleService: Title) {
    titleService.setTitle('');
  }

}
