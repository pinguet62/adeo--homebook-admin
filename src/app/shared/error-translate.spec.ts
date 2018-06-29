import {ValidationErrors} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {ErrorTranslatePipe} from './error-translate';

describe('shared/error-translate', () => {
  let translateService: jasmine.SpyObj<TranslateService>;
  let pipe: ErrorTranslatePipe;
  beforeEach(() => {
    translateService = jasmine.createSpyObj(TranslateService.name, Object.keys(TranslateService.prototype));
    pipe = new ErrorTranslatePipe(translateService);
  });

  describe(`${ErrorTranslatePipe.prototype.transform.name}`, () => {
    it('Supported i18n: should translate message "validation.${key}"', async () => {
      const expectedMessage = 'expectedMessage';
      translateService.instant.and.callFake((key: string): string => {
        if (key === 'validation.required') {
          return expectedMessage;
        } else {
          throw new Error('mock');
        }
      });

      const value: ValidationErrors = {'required': true};
      const message = pipe.transform(value);

      await expect(message).toEqual(expectedMessage);
    });

    it('Unsupported i18n: should translate default message "_"', async () => {
      const expectedMessage = 'expectedMessage';
      translateService.instant.and.callFake((key: string): string => {
        if (key === 'validation.required') {
          return key; // missing i18n
        } else if (key === 'validation._') {
          return expectedMessage;
        } else {
          throw new Error('mock');
        }
      });

      const value: ValidationErrors = {'required': true};
      const message = pipe.transform(value);

      await expect(message).toEqual(expectedMessage);
    });

    it('Should support parametrized "ValidationErrors" & i18n', async () => {
      const expectedMessage = 'expectedMessage';
      const validationErrorArgs = {'requiredPattern': '[0-9]{10}', 'actualValue': '...'};
      translateService.instant.and.callFake((key: string, interpolateParams?: Object): string => {
        if (key === 'validation.pattern' && interpolateParams === validationErrorArgs) {
          return expectedMessage;
        } else {
          throw new Error('mock');
        }
      });

      const value: ValidationErrors = {'pattern': validationErrorArgs};
      const message = pipe.transform(value);

      await expect(message).toEqual(expectedMessage);
    });

    it('Multiple-errors: should return first', async () => {
      const expectedMessage = 'expectedMessage';
      translateService.instant.and.callFake((key: string): string => {
        if (key === 'validation.required') {
          return expectedMessage;
        } else {
          throw new Error('mock');
        }
      });

      const value: ValidationErrors = {'required': true, 'other': 'any'};
      const message = pipe.transform(value);

      await expect(message).toEqual(expectedMessage);
    });
  });
});
