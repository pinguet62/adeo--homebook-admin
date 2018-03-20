import {AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialog} from '@angular/material';
import * as markdown from 'markdown-it';

import {IArticle} from './article.service';

export interface PreviewDialogData {
  html: string;
}

@Component({
  template: `
    <mat-dialog-content>
      <div #contentHtml></div>
    </mat-dialog-content>
  `
})
export class PreviewDialogComponent implements AfterViewInit {

  @ViewChild('contentHtml', {read: ElementRef}) contentHtml: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) private data: PreviewDialogData) {
  }

  ngAfterViewInit() {
    this.contentHtml.nativeElement.innerHTML = this.data.html;
  }

}

@Component({
  selector: 'app-edit-article',
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
        <mat-icon (click)="renderContentHtml()" matSuffix>visibility</mat-icon>
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

      <button
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

  constructor(private dialog: MatDialog) {
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

  renderContentHtml() {
    const html = markdown({html: true}).render(this.article.contents);
    this.dialog.open<PreviewDialogComponent, PreviewDialogData>(PreviewDialogComponent, {data: {html}});
  }

}
