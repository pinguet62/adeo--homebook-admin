import {CommonModule} from '@angular/common';
import {Directive, NgModule} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators} from '@angular/forms';

export function objectIdValidator(): ValidatorFn {
  return Validators.pattern('^[0-9a-fA-F]{24}$');
}

@Directive({
  selector: '[objectId][formControlName],[objectId][formControl],[objectId][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ObjectIdValidatorDirective, multi: true}]
})
export class ObjectIdValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return objectIdValidator()(control);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    ObjectIdValidatorDirective,
  ],
  exports: [ObjectIdValidatorDirective],
})
export class ValidatorsModule {
}
