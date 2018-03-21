import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ArticleService, IArticle} from './article.service';

@Component({
  template: `
    <mat-form-field>
      <input [(ngModel)]="search" (keyup)="refresh()" placeholder="Search..." matInput>
    </mat-form-field>

    <mat-table [dataSource]="articles">
      <ng-container matColumnDef="_id">
        <mat-header-cell *matHeaderCellDef>Id</mat-header-cell>
        <mat-cell *matCellDef="let article">{{article._id}}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="title">
        <mat-header-cell *matHeaderCellDef>Id</mat-header-cell>
        <mat-cell *matCellDef="let article">{{article.title}}</mat-cell>
      </ng-container>

      <ng-container matColumnDef="actions">
        <mat-header-cell *matHeaderCellDef></mat-header-cell>
        <mat-cell *matCellDef="let article">
          <button [routerLink]="['show', article._id]" mat-icon-button>
            <mat-icon>visibility</mat-icon>
          </button>
          <button [routerLink]="['edit', article._id]" mat-icon-button>
            <mat-icon>edit</mat-icon>
          </button>
          <button [appConfirmDialog]="deleteArticleFct(article)" mat-icon-button>
            <mat-icon>delete</mat-icon>
          </button>
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let article; columns: displayedColumns;">
      </mat-row>
    </mat-table>

    <button mat-fab color="warn" class="floating" routerLink="./create">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    .floating {
      position: fixed;
      right: 40px;
      bottom: 40px;
    }
  `]
})
export class ArticleListComponent {

  readonly displayedColumns = ['_id', 'title', 'actions'];

  search: string;

  articles: IArticle[] = [];

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {
    this.refresh();
  }

  public refresh() {
    this.articleService.list(this.search).subscribe((x) =>
      this.articles = x
    );
  }

  /**
   * @returns Returns function in order to be executed by {@link ConfirmDialog}.
   */
  deleteArticleFct(article: IArticle): () => void {
    return () => {
      this.articleService.delete(article).subscribe(() =>
        this.refresh()
      );
    };
  }

}
