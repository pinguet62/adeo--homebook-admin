import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ArticleService, IArticle} from './article.service';

@Component({
  template: `
    <app-article-contents *ngIf="article" [markdown]="article.contents"></app-article-contents>
  `
})
export class ArticleShowComponent {

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

}
