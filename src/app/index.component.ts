import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `
    <div>
      <button routerLink="/article" mat-raised-button>Articles</button>
    </div>
  `
})
export class IndexComponent {

  constructor(titleService: Title) {
    titleService.setTitle(null);
  }

}
