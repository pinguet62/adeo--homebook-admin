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

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogDataType) {
  }

}

@Component({
  selector: 'app-edit-article',
  template: `
    <form *ngIf="article" #articleForm="ngForm" class="article">
      <mat-checkbox [(ngModel)]="article.published" #publishedModel="ngModel" name="published">Published?</mat-checkbox>

      <mat-form-field>
        <input
          [(ngModel)]="article.title" #titleModel="ngModel" name="title"
          required
          placeholder="Title"
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
            placeholder="Tags">
        </mat-chip-list>
      </mat-form-field>

      <mat-form-field>
        <mat-select [(value)]="article.partnerId" placeholder="Partner">
          <mat-option>-</mat-option>
          <mat-option *ngFor="let id of ['leroymerlin-fr', 'kbane-fr', 'boulanger-fr']" [value]="id">{{id}}</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- TODO separate form -->
      <mat-form-field>
        <textarea
          [ngModel]="article.cover | json" (ngModelChange)="setCover($event)" #coverModel="ngModel" name="cover"
          required
          placeholder="Cover"
          matInput rows="5"></textarea>
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
        <mat-icon (click)="showPreview()" matSuffix>visibility</mat-icon>
      </mat-form-field>

      <button
        type="submit"
        [disabled]="!articleForm.form.valid"
        (click)="edited.emit(article)"
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

  // JSON not available into template
  setCover(coverJson: string) {
    this.article.cover = JSON.parse(coverJson);
  }

}
