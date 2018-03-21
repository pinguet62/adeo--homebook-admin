import {CommonModule} from '@angular/common';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';

import {AlertLevel, AlertModule, AlertService} from './alert';

// "Injector" usage: avoid circular dependency
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error): void {
    // default logging
    console.error('[CommonErrorHandler]', error);
    // global user logging
    const alertService = this.injector.get(AlertService);
    alertService.show(error.message, 'error' as AlertLevel);
  }

}

@NgModule({
  imports: [
    CommonModule,
    // app
    AlertModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
})
export class GlobalErrorModule {
}
