import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ArticleService, IArticle, IMedia} from './article.service';

@Component({
  template: `
    <app-edit-article [article]="article" (edited)="onCreated($event)"></app-edit-article>
  `
})
export class ArticleCreateComponent {

  article: IArticle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) {
    this.article = {
      title: '',
      contents: '',
      tags: [],
      cover: {} as IMedia,
    };
  }

  onCreated(article: IArticle) {
    this.articleService.create(article).subscribe((a) => {
      this.article = a;
      this.router.navigate(['../'], {relativeTo: this.route}); // list
    });
  }

}
