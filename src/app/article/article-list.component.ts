import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ArticleService, IArticle} from './article.service';

@Component({
  selector: 'app-article-list',
  template: `
    <mat-table [dataSource]="articles">
      <ng-container matColumnDef="_id">
        <mat-header-cell *matHeaderCellDef>Id</mat-header-cell>
        <mat-cell *matCellDef="let article">{{article._id}}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="title">
        <mat-header-cell *matHeaderCellDef>Id</mat-header-cell>
        <mat-cell *matCellDef="let article">{{article.title}}</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row
        *matRowDef="let article; columns: displayedColumns;"
        [routerLink]="[article._id]">
      </mat-row>
    </mat-table>
  `
})
export class ArticleListComponent {

  articles: IArticle[] = [];

  displayedColumns = ['_id', 'title'];

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {
    this.articleService.list().subscribe((x) =>
      this.articles = x
    );
  }

}
