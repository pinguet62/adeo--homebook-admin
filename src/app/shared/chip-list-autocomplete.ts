import {CommonModule} from '@angular/common';
import {Component, ElementRef, forwardRef, Input, NgModule, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
} from '@angular/material';

@Component({
  selector: 'chip-list-autocomplete',
  template: `
    <mat-form-field style="width: 100%;">
      <mat-chip-list #chipList>
        <mat-chip
          *ngFor="let value of values"
          [removable]="true" (removed)="removeChipValue(value)">
          {{value}}
          <mat-icon matChipRemove>cancel</mat-icon>
        </mat-chip>

        <input
          #input [name]="name"
          [matAutocomplete]="autocomplete"
          [matChipInputFor]="chipList"
          (matChipInputTokenEnd)="addChipValue($event)"
          [placeholder]="placeholder">

        <mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="addAutocompleteValue($event)">
          <mat-option *ngFor="let suggestion of filteredSuggestions" [value]="suggestion">{{suggestion}}</mat-option>
        </mat-autocomplete>
      </mat-chip-list>
    </mat-form-field>
  `,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ChipListAutocompleteComponent), multi: true},
  ],
})
export class ChipListAutocompleteComponent implements ControlValueAccessor {

  private static readonly NO_ACTION = (() => void 0);

  @Input() name;

  @Input() placeholder = '';

  @Input() suggestions: string[] = [];

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  values: string[] = [];

  /** @see ControlValueAccessor#registerOnTouched */
  private _onTouched: () => void = ChipListAutocompleteComponent.NO_ACTION;

  /**
   * Used by `(ngModel)="onChange($event)"` output binding.
   * @see ControlValueAccessor#registerOnChange
   */
  private _onChange: (newValue: string[]) => void = ChipListAutocompleteComponent.NO_ACTION;

  get filteredSuggestions(): string[] {
    return this.suggestions
      .filter((it) => !this.values.includes(it))
      .filter((it) => it.includes(this.input.nativeElement.value));
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: (newValue: string[]) => void): void {
    this._onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  /** Used by `[ngModel]="attr"` input binding. */
  writeValue(value: string[]): void {
    this.values = value;
  }

  addAutocompleteValue(event: MatAutocompleteSelectedEvent) {
    this.values.push(event.option.viewValue);
    this._onChange(this.values);
    this.input.nativeElement.value = '';
  }

  addChipValue(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.values.push(value);
      this._onChange(this.values);
    }
    this.input.nativeElement.value = '';
  }

  removeChipValue(value: string) {
    this.values.splice(this.values.indexOf(value), 1);
    this._onChange(this.values);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // lib
    MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule,
  ],
  declarations: [ChipListAutocompleteComponent],
  exports: [ChipListAutocompleteComponent]
})
export class ChipListAutocompleteModule {
}
