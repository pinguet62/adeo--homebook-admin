import {CommonModule} from '@angular/common';
import {Directive, Input, NgModule, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NgModel,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {Subscription} from 'rxjs';

export function objectIdValidator(): ValidatorFn {
  return Validators.pattern('^[0-9a-fA-F]{24}$');
}

@Directive({
  selector: '[objectId][formControlName],[objectId][formControl],[objectId][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ObjectIdValidatorDirective, multi: true}]
})
export class ObjectIdValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return objectIdValidator()(control);
  }
}

/**
 * @example
 * Only 1 of 2 fields is required, and 2nd must be empty:
 * ```html
 * <form>
 *     <input ... ngModel first="ngModel" requiredWithout="second">
 *     <input ... ngModel second="ngModel" requiredWithout="first">
 * </form>
 * ```
 */
@Directive({
  selector: '[requiredWithout][formControlName],[requiredWithout][formControl],[requiredWithout][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: RequiredWithoutValidatorDirective, multi: true}]
})
export class RequiredWithoutValidatorDirective implements Validator, OnDestroy {

  @Input('requiredWithout') otherModel: NgModel;

  private subscription: Subscription = null;

  validate(control: AbstractControl): ValidationErrors {
    // when target value changes, refresh validation
    if (!this.subscription) {
      this.subscription = this.otherModel.valueChanges.subscribe(() =>
        control.updateValueAndValidity({emitEvent: false})
      );
    }

    const otherControl = this.otherModel.control;
    return ((!!control.value) === (!!otherControl.value)) ? {'requiredWithout': 'error'} : null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    ObjectIdValidatorDirective,
    RequiredWithoutValidatorDirective,
  ],
  exports: [
    ObjectIdValidatorDirective,
    RequiredWithoutValidatorDirective,
  ],
})
export class ValidatorsModule {
}
