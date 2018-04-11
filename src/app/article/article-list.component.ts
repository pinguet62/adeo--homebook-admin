import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ArticleService, IArticle} from './article.service';

@Component({
  template: `
    <div fxLayout="column">
      <!-- TODO Scroll Shrink -->
      <mat-form-field floatLabel="never" style="padding: 0px 16px;">
        <mat-icon matPrefix>search</mat-icon>
        <input
          [(ngModel)]="search"
          (keyup)="refresh()" (keydown.escape)="cleanSearch()"
          [placeholder]="('common.search' | translate) + '...'" matInput>
        <button mat-button *ngIf="search" (click)="cleanSearch()" aria-label="Clear" matSuffix mat-icon-button>
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <mat-list ngClass.gt-sm="mat-elevation-z8" ngStyle.lt-md="margin-bottom: 80px;">
        <mat-list-item *ngFor="let article of articles">
          <!-- icon -->
          <img matListAvatar [src]="article.cover.thumbnails?.small || article.cover.path" alt="">
          <!-- text -->
          <p mat-line [routerLink]="['show', article._id]" class="mat-card-title">{{article.title}}</p>
          <p mat-line [routerLink]="['show', article._id]" class="mat-card-subtitle">{{article.summary}}</p>
          <!-- actions -->
          <button [matMenuTriggerFor]="articleActionMenu" aria-label="Actions" mat-icon-button>
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #articleActionMenu="matMenu">
            <button mat-menu-item [routerLink]="['show', article._id]">
              <mat-icon>visibility</mat-icon>
              <span>{{'article.list.action.show' | translate}}</span>
            </button>
            <button mat-menu-item [routerLink]="['edit', article._id]">
              <mat-icon>edit</mat-icon>
              <span>{{'article.list.action.edit' | translate}}</span>
            </button>
            <button mat-menu-item (confirmedClick)="deleteArticle(article)">
              <mat-icon>delete</mat-icon>
              <span>{{'article.list.action.delete' | translate}}</span>
            </button>
          </mat-menu>
        </mat-list-item>
      </mat-list>
    </div>

    <button mat-fab color="warn" class="floating" routerLink="./create">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    /* floating button */
    .floating {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
  `]
})
export class ArticleListComponent {

  search: string;

  articles: IArticle[] = [];

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {
    this.refresh();
  }

  public cleanSearch() {
    this.search = '';
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
  deleteArticle(article: IArticle) {
    this.articleService.delete(article).subscribe(() =>
      this.refresh()
    );
  }

}
