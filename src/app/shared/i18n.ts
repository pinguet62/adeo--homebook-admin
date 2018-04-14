import {APP_INITIALIZER, NgModule} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export function i18nInitializer(translateService: TranslateService): () => Promise<any> {
  return () => {
    translateService.setDefaultLang('en');
    return Promise.resolve();
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
