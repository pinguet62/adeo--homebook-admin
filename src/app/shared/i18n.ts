import {HttpClient} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, first, mergeMap} from 'rxjs/operators';

export function i18nInitializer(translateService: TranslateService): () => Promise<any> {
  return () => {
    translateService.setDefaultLang('en');

    const prioritizedLangs = [
      translateService.getBrowserCultureLang(),
      translateService.getBrowserLang(),
    ];
    // first lang who doesn't fail
    return of(...prioritizedLangs).pipe(
      mergeMap(lang => translateService.use(lang).pipe(
        catchError(() => EMPTY))),
      first(() => true, EMPTY)
    ).toPromise();
  };
}

export class NullMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): Observable<any> {
    return of(null);
  }
}

const InitializedTranslateModule = TranslateModule.forRoot({
  useDefaultLang: true,
  missingTranslationHandler: {provide: MissingTranslationHandler, useClass: NullMissingTranslationHandler},
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
    deps: [HttpClient]
  },
});

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: i18nInitializer,
      multi: true,
      deps: [TranslateService]
    },
  ]
})
export class I18nInitializerModule {
}

export const I18nRootModule = [InitializedTranslateModule, I18nInitializerModule];

export const I18nChildModule = TranslateModule.forChild();
