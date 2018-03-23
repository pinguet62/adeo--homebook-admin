import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';

import {AlertLevel, AlertModule, AlertService} from './alert';

// "Injector" usage: avoid circular dependency
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  static getMessage(error: Error): string {
    if (error instanceof HttpErrorResponse) {
      const e = error.error;

      // Homebook wrapped response
      if (typeof e === 'object' && ['status', 'data', 'errors'].every((field) => field in e)) {
        return e.errors;
      }

      return e;
    }
    return error.message;
  }

  handleError(error: Error): void {
    // default logging
    console.error('[CommonErrorHandler]', error);
    // global user logging
    const alertService = this.injector.get(AlertService);
    alertService.show(GlobalErrorHandler.getMessage(error), 'error' as AlertLevel);
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
