import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {of, throwError} from 'rxjs';

import {i18nInitializer} from './i18n';

describe('shared/i18n', () => {
  describe(`${i18nInitializer.name}`, () => {
    const CULTURE_LANG = 'fr-FR';
    const LANG = 'fr';

    let translateService: jasmine.SpyObj<TranslateService>;
    beforeEach(() => {
      translateService = jasmine.createSpyObj(TranslateService.name, Object.keys(TranslateService.prototype));
      translateService.getBrowserCultureLang.and.returnValue(CULTURE_LANG);
      translateService.getBrowserLang.and.returnValue(LANG);
    });

    it('First, if browser "language + country" available, should use this lang', async () => {
      const dataCultureLang = {foo: 'bar'};

      translateService.use.and.callFake((lang) => {
        if (lang === CULTURE_LANG) {
          return of(dataCultureLang);
        } else {
          throw new Error('Should not occur');
        }
      });

      const result = await i18nInitializer(translateService)();

      expect(result).toEqual(dataCultureLang);
    });

    it('Second, should use browser "language"', async () => {
      const dataLang = {foo: 'bar'};

      translateService.use.and.callFake((lang) => {
        if (lang === CULTURE_LANG) {
          return throwError(new HttpErrorResponse({}));
        } else if (lang === LANG) {
          return of(dataLang);
        }
      });

      const result = await i18nInitializer(translateService)();

      expect(result).toEqual(dataLang);
    });
  });
});
