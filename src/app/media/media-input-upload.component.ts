import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';
import {concat, Observable, of} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';

import {AlertLevel, AlertService} from '../shared';
import {IMedia, MediaService} from './media.service';

/**
 * To customize `<input type="file">`, the `click` event is proxified using `<button (click)>`:
 * the `'click'` is programmatically triggered on `<input>`.
 */
@Component({
  selector: 'media-input-upload',
  template: `
    <div *ngIf="loading">
      <mat-spinner diameter="40"></mat-spinner>
    </div>
    <div *ngIf="!loading">
      <div *ngIf="!media">
        <input #inputFile type="file" (change)="inputFileChange($event.target.files[0])" accept="image/*" hidden>
        <button (click)="requestUpload()" type="button" mat-icon-button>
          <mat-icon>file_upload</mat-icon>
        </button>
      </div>

      <div *ngIf="media" style="display: flex;">
        <button (confirmedClick)="remove()" type="button" mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
        <img [src]="media.path" [alt]="media.path" (click)="previewImage()" class="app-avatar">
      </div>
    </div>
  `,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MediaInputUploadComponent), multi: true},
  ],
})
export class MediaInputUploadComponent implements OnInit, ControlValueAccessor {

  private static readonly NO_ACTION = (() => void 0);

  private writeValueCall = 0;

  /** Execute {@link MediaService#upload} and {@link MediaService#delete} before {@link NgForm#ngSubmit}. */
  @Input() lazy = false;

  loading = false;

  private initialValue: IMedia;

  /**
   * Data-binding with {@link NgModel}.
   * @see writeValue
   * @see _onChange
   */
  private _media: IMedia;

  get media() {
    return this._media;
  }

  set media(media: IMedia) {
    this._media = media;
    this._onChange(media);
  }

  @ViewChild('inputFile') inputFile: ElementRef;

  /** @see ControlValueAccessor#registerOnTouched */
  private _onTouched: () => void = MediaInputUploadComponent.NO_ACTION;

  /**
   * Used by `(ngModel)="onChange($event)"` output binding.
   * @see ControlValueAccessor#registerOnChange
   */
  private _onChange: (newValue: IMedia) => void = MediaInputUploadComponent.NO_ACTION;

  /**
   * Action to execute during lazy process.
   * @see processLazyActions
   */
  private lazyUpload: Observable<IMedia>;

  /**
   * Action to execute during lazy process.
   * @see processLazyActions
   */
  private lazyDelete: Observable<IMedia>;

  constructor(
    private alertService: AlertService,
    private mediaService: MediaService,
    private ngForm: NgForm,
  ) {
  }

  /** Wrap {@link NgForm#ngSubmit} to execute {@link processLazyActions} before. */
  ngOnInit() {
    if (this.lazy) {
      const origin = this.ngForm.ngSubmit;
      const custom = new EventEmitter<{}>(origin.__isAsync);
      custom.emit = (value?: {}): void => {
        this.processLazyActions().subscribe(() =>
          origin.emit(value)
        );
      };
      this.ngForm.ngSubmit = custom;
    }
  }

  private processLazyActions(): Observable<any> {
    this.loading = true;
    const actions = [this.lazyDelete, this.lazyUpload].filter((it) => !!it);
    return concat(...actions, of(null))
      .pipe(tap((it) => this.media = it))
      .pipe(finalize(() => this.loading = false));
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: (newValue: IMedia) => void): void {
    this._onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  /** Used by `[ngModel]="attr"` input binding. */
  writeValue(value: IMedia): void {
    // wait for initialization: first call send "undefined"
    if (this.writeValueCall === 1) {
      this.initialValue = value;
    }
    this.writeValueCall++;

    this.media = value;
  }

  requestUpload() {
    this.inputFile.nativeElement.click();
    this._onTouched();
  }

  inputFileChange(file: File) {
    if (!this.lazy) {
      this.loading = true;
      this.mediaService.upload(file)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          (it) => this.media = it,
          (err: Error) => this.alertService.show(err.message, AlertLevel.ERROR)
        );
    } else {
      const fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent) => {
        this.media = {
          path: (event.target as any).result,
          _id: null,
        };
      };
      fileReader.readAsDataURL(file);

      this.lazyUpload = this.mediaService.upload(file);
    }
  }

  remove() {
    if (!this.lazy) {
      this.loading = true;
      this.mediaService.delete(this.media)
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          () => this.media = null,
          (err: Error) => this.alertService.show(err.message, AlertLevel.ERROR)
        );
    } else {
      if (this.initialValue) {
        this.lazyDelete = this.mediaService.delete(this.media)
          .pipe(map(() => null));
      }
      this.media = null;
    }
  }

  previewImage() {
    const src = this.media.path;
    if (src.startsWith('data:')) {
      const w = window.open('about:blank');
      w.document.body
        .appendChild(w.document.createElement('img'))
        .src = src;
    } else {
      window.open(src, '_blank');
    }
  }

}
