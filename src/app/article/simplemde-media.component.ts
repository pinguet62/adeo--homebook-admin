import {AfterViewInit, Component, ElementRef, forwardRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as SimpleMDE from 'simplemde';
import {MediaService} from '../media/media.service';
import {AlertLevel, AlertService} from '../shared';

@Component({
  selector: 'simplemde-upload',
  template: `
    <simplemde #element [(ngModel)]="value"></simplemde>
    <input #inputFile type="file" accept="image/*"(change)="inputFileChange($event.target.files[0])" hidden>
  `,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SimplemdeMediaComponent), multi: true},
  ],
})
export class SimplemdeMediaComponent implements AfterViewInit, ControlValueAccessor {

  private static readonly NO_ACTION = (() => void 0);

  @ViewChild('element') simpleMDE: SimpleMDE;

  @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement>;

  private originalFn: (editor: SimpleMDE) => void = null;

  /** @see ControlValueAccessor#registerOnTouched */
  private _onTouched: () => void = SimplemdeMediaComponent.NO_ACTION;

  /**
   * Used by `(ngModel)="onChange($event)"` output binding.
   * @see ControlValueAccessor#registerOnChange
   */
  private _onChange: (newValue: string) => void = SimplemdeMediaComponent.NO_ACTION;

  private _value: string;

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this._onChange(value);
  }

  constructor(
    private alertService: AlertService,
    private mediaService: MediaService,
  ) {
  }

  /**
   * Proxify {@link SimpleMDE} toolbar action,
   * in order to execute file upload and fill URL.
   */
  ngAfterViewInit() {
    const toolbarIcon: SimpleMDE.ToolbarIcon = (this.simpleMDE as any).simplemde.options.toolbar.filter(t => t.name === 'image')[0];
    this.originalFn = toolbarIcon.action as (editor: SimpleMDE) => void;
    toolbarIcon.action = () => this.inputFile.nativeElement.click();
  }

  inputFileChange(file: File) {
    this.mediaService.upload(file).subscribe(
      media => {
        this.inputFile.nativeElement.value = null; // allow consecutive uploads
        (this.simpleMDE as any).simplemde.options.insertTexts.image = [`![${media.title}](${media.path})`, ''];
        this.originalFn((this.simpleMDE as any).simplemde);
      }, (err: Error) => this.alertService.show(err.message, AlertLevel.ERROR));
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: (newValue: string) => void): void {
    this._onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  /** Used by `[ngModel]="attr"` input binding. */
  writeValue(value: string): void {
    this.value = value;
  }

}
