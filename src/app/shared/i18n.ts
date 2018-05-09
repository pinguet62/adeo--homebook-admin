import {APP_INITIALIZER, NgModule} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EMPTY, of} from 'rxjs';
import {catchError, first, mergeMap} from 'rxjs/operators';

export function i18nInitializer(translateService: TranslateService): () => Promise<any> {
  return () => {
    translateService.setDefaultLang('en');

    // first lang who doesn't fail
    return of(translateService.getBrowserCultureLang(), translateService.getBrowserLang()).pipe(
      mergeMap(lang => translateService.use(lang).pipe(
        catchError(() => EMPTY))),
      first()
    ).toPromise();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: i18nInitializer,
      multi: true,
      deps: [TranslateService]
    }
  ]
})
export class I18nModule {
}
