import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ArticleService, IArticle} from './article.service';

@Component({
  template: `
    <app-edit-article [article]="article" (edited)="onUpdated($event)"></app-edit-article>
  `
})
export class ArticleUpdateComponent {

  article: IArticle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) {
    route.paramMap.subscribe((p) => {
      const articleId = p.get('_id');
      this.articleService.get(articleId).subscribe((a) =>
        this.article = a
      );
    });
  }

  onUpdated(article: IArticle) {
    this.articleService.update(article).subscribe((a) => {
      this.article = a;
      this.router.navigate(['../..'], {relativeTo: this.route}); // list
    });
  }

}
