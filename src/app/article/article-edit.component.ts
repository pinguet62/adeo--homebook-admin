import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialog} from '@angular/material';

import {IArticle} from './article.service';

type DialogDataType = IArticle;

@Component({
  template: `
    <mat-dialog-content>
      <app-article-contents [markdown]="data.contents"></app-article-contents>
    </mat-dialog-content>
  `
})
export class PreviewDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataType) {
  }

}

@Component({
  selector: 'app-edit-article',
  template: `
    <form *ngIf="article" #articleForm="ngForm" (ngSubmit)="edited.emit(article)">
      <div fxLayout="column" class="article-edit mat-elevation-z8">
        <mat-checkbox [(ngModel)]="article.published" #publishedModel="ngModel" name="published">
          {{'article.form.published' | translate}}
        </mat-checkbox>

        <mat-form-field>
          <input
            [(ngModel)]="article.title" #titleModel="ngModel" name="title"
            required
            [placeholder]="'article.form.title' | translate"
            matInput>
        </mat-form-field>

        <mat-form-field>
          <mat-chip-list #tagsChipList>
            <mat-chip
              *ngFor="let tag of article.tags"
              [removable]="true" (removed)="removeTag(tag)">
              {{tag}}
              <mat-icon matChipRemove>cancel</mat-icon>
            </mat-chip>
            <input
              [matChipInputFor]="tagsChipList"
              (matChipInputTokenEnd)="addTag($event)"
              [placeholder]="'article.form.tags' | translate">
          </mat-chip-list>
        </mat-form-field>

        <mat-form-field>
          <mat-select [(value)]="article.partnerId" [placeholder]="'article.form.partner' | translate">
            <mat-option>-</mat-option>
            <mat-option *ngFor="let id of ['leroymerlin-fr', 'kbane-fr', 'boulanger-fr']" [value]="id">{{id}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <media-input-upload
          [(ngModel)]="article.cover" #coverModel="ngModel" name="cover"
          [lazy]="true"
          required>
        </media-input-upload>

        <mat-form-field>
          <input
            [(ngModel)]="article.summary" #summaryModel="ngModel" name="summary"
            [placeholder]="'article.form.summary' | translate"
            matInput>
        </mat-form-field>

        <mat-form-field>
          <textarea
            [(ngModel)]="article.contents" #contentsModel="ngModel" name="contents"
            [placeholder]="'article.form.contents' | translate"
            matInput rows="10"></textarea>
          <mat-icon (click)="showPreview()" matSuffix>visibility</mat-icon>
        </mat-form-field>
      </div>

      <button
        type="submit"
        [disabled]="!articleForm.form.valid"
        mat-raised-button color="primary" class="article-edit-submit">
        {{'common.save' | translate}}
      </button>
    </form>
  `,
  styles: [`
    .article-edit {
      padding: 24px;
    }

    .article-edit-submit {
      margin-top: 24px;
      width: 100%;
    }
  `]
})
export class ArticleEditComponent {

  @Input()
  article: IArticle;

  @Output()
  edited: EventEmitter<IArticle> = new EventEmitter<IArticle>();

  constructor(private dialogService: MatDialog) {
  }

  addTag(event: MatChipInputEvent) {
    // append tag
    const value = (event.value || '').trim();
    if (value) {
      this.article.tags.push(value);
    }
    // reset <input>
    const input = event.input;
    if (input) {
      input.value = '';
    }
  }

  removeTag(value: string) {
    this.article.tags.splice(this.article.tags.indexOf(value), 1);
  }

  showPreview() {
    this.dialogService.open<PreviewDialogComponent, DialogDataType>(PreviewDialogComponent, {data: this.article});
  }

}
