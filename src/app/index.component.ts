import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `
    <div class="menus">
      <div class="box" routerLink="/article">
        <img src="/assets/article.jpg">
        <h2>{{'article.title' | translate}}</h2>
      </div>

      <div class="box" routerLink="/user">
        <img src="/assets/user.jpg">
        <h2>{{'user.title' | translate}}</h2>
      </div>
    </div>
  `,
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(titleService: Title) {
    titleService.setTitle('Homebook');
  }

}
