import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
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
    alertService.show(this.getMessage(error), 'error' as AlertLevel);
  }

  private getMessage(error: Error): string {
    if (error instanceof HttpErrorResponse) {
      return error.error.errors;
    }
    return error.message;
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
