import {Component, EventEmitter, Input, Output} from '@angular/core';

import {IArticle, PartnerId} from './article.service';

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
          <mat-error *ngIf="titleModel.control.invalid">
            {{titleModel.control.errors | errorTranslate | async}}
          </mat-error>
        </mat-form-field>

        <chip-list-autocomplete
          [(ngModel)]="article.tags" name="tags"
          [placeholder]="'article.form.tags' | translate">
        </chip-list-autocomplete>

        <mat-form-field>
          <mat-select [(value)]="article.partnerId" [placeholder]="'article.form.partner' | translate">
            <mat-select-trigger *ngIf="article.partnerId">
              <span fxLayoutAlign="flex-start center">
                <img [src]="'assets/partner/' + article.partnerId + '.svg'" [alt]="id" class="app-avatar">
                {{article.partnerId}}
              </span>
            </mat-select-trigger>

            <mat-option>-</mat-option>
            <mat-option *ngFor="let id of partnerIds" [value]="id">
              <span fxLayoutAlign="flex-start center">
                <img [src]="'assets/partner/' + id + '.svg'" [alt]="id" class="app-avatar">
                {{id}}
              </span>
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

        <simplemde [(ngModel)]="article.contents" #contentsModel="ngModel" name="contents"></simplemde>
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

  readonly partnerIds = Object.values(PartnerId);

  @Input()
  article: IArticle;

  @Output()
  edited: EventEmitter<IArticle> = new EventEmitter<IArticle>();

}
