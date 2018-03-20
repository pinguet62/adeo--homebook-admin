import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import * as markdown from 'markdown-it';

import {PreviewDialogComponent} from './article-update.component';
import {ArticleService} from './article.service';

interface PreviewDialogData {
  html: string;
}

@Component({
  template: `
    <form *ngIf="article" #articleForm="ngForm" class="article">
      <mat-form-field>
        <input
          [(ngModel)]="article.title" #titleModel="ngModel" name="title"
          required
          placeholder="Title"
          matInput>
      </mat-form-field>

      <mat-form-field>
        <input
          [(ngModel)]="article.summary" #summaryModel="ngModel" name="summary"
          placeholder="Summary"
          matInput>
      </mat-form-field>

      <mat-form-field>
        <textarea
          [(ngModel)]="article.contents" #contentsModel="ngModel" name="contents"
          placeholder="Contents"
          matInput rows="10"></textarea>
      </mat-form-field>
      <button (click)="renderContentHtml()" mat-icon-button>
        <mat-icon>visibility</mat-icon>
      </button>

      <mat-form-field>
        <input
          [(ngModel)]="tmpTag" [ngModelOptions]="{standalone: true}"
          (keydown.enter)="article.tags.push(tmpTag); tmpTag=''"
          placeholder="Tag"
          matInput>
      </mat-form-field>
      <div class="article-tags">
        <mat-chip-list *ngFor="let tag of article.tags">
          <mat-chip>
            {{tag}}
            <mat-icon (click)="article.tags.splice(article.tags.indexOf(tag), 1)">delete</mat-icon>
          </mat-chip>
        </mat-chip-list>
      </div>

      <mat-form-field>
        <mat-select [(value)]="article.partnerId" placeholder="Partner">
          <mat-option>-</mat-option>
          <mat-option *ngFor="let id of ['leroymerlin-fr', 'kbane-fr', 'boulanger-fr']" [value]="id">{{id}}</mat-option>
        </mat-select>
      </mat-form-field>

      <button
        [disabled]="!articleForm.form.valid"
        (click)="onSave()"
        mat-raised-button color="primary">
        Save
      </button>
    </form>
  `,
  styles: [`
    .article {
      display: flex;
      flex-direction: column;
    }

    .article-tags {
      display: flex;
      flex-direction: row;
    }
  `]
})
export class ArticleCreateComponent {

  article: any = {
    content: '',
    tags: [],
  };

  tmpTag = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {
  }

  renderContentHtml() {
    const html = markdown({html: true}).render(this.article.contents);
    this.dialog.open<PreviewDialogComponent, PreviewDialogData>(PreviewDialogComponent, {data: {html}});
  }

  onSave() {
    this.articleService.update(this.article).subscribe((a) => {
      this.article = a;
      this.router.navigate(['../'], {relativeTo: this.route}); // list
    });
  }

}
