import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {I18nChildModule} from './i18n';

/**
 * @example
 * * HTML:
 *     <input ... pattern="[0-9]{10}" ... ngModel #myModel="ngModel">
 *     <span>{{myModel.control.errors | errorTranslate}}</span>
 * * ValidationErrors: {"pattern": {"requiredPattern": "[0-9]{10}", "actualValue": "..."}}
 * * i18n: {"validation.pattern": "The value must match with pattern \"{{requiredPattern}}\""}
 * * Translated message: "The value must match with pattern \"[0-9]{10}\""
 */
@Pipe({
  name: 'errorTranslate',
  pure: false
})
export class ErrorTranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: ValidationErrors): string {
    const [validationKey, validationInformation] = Object.entries(value)[0]; // 1st = mort important?
    const translateKey = 'validation.' + validationKey;
    let translateValue = this.translateService.instant(translateKey, validationInformation);
    if (translateValue === translateKey) { // validator not supported
      translateValue = this.translateService.instant('validation._');
    }
    return translateValue;
  }

}

@NgModule({
  imports: [
    // app
    I18nChildModule,
  ],
  declarations: [ErrorTranslatePipe],
  exports: [ErrorTranslatePipe]
})
export class ErrorTranslateModule {
}
