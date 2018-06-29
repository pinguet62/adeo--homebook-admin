import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
export class ArticleComponent {

  constructor(
    titleService: Title,
    translateService: TranslateService
  ) {
    titleService.setTitle(translateService.instant('article.title'));
  }

}
