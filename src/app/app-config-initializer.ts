import {HttpClient} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {tap} from 'rxjs/operators';

import {environment} from '../environments/environment';

export function configInitializer(http: HttpClient): () => Promise<any> {
  return () => http
    .get('assets/config.json')
    .pipe(tap(config => {
      for (const prop in config) {
        if (config.hasOwnProperty(prop)) {
          environment[prop] = eval(config[prop]); // tslint:disable-line:no-eval
        }
      }
    }))
    .toPromise();
}

const configInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: configInitializer,
  deps: [HttpClient],
  multi: true
};

@NgModule({
  providers: [configInitializerProvider]
})
export class ConfigInitializerModule {
}
