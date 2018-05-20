import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';

import {HomebookResult} from '../homebookResult';
import {AlertLevel, AlertService} from './alert';

// "Injector" usage: avoid circular dependency
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private alertService: AlertService;

  constructor(private injector: Injector) {
    this.alertService = this.injector.get(AlertService);
  }

  static getMessage(error: Error): string | string[] {
    if (error instanceof HttpErrorResponse) {
      // Homebook wrapped response
      const httpError = error.error;
      if (httpError && typeof httpError === 'object' && ['status', 'data', 'errors'].every((field) => field in httpError)) {
        return (httpError as HomebookResult).errors;
      }
    }

    return error.message;
  }

  handleError(error: Error): void {
    // default handler
    console.error('[CommonErrorHandler]', error);

    // custom handler
    const userMessage = GlobalErrorHandler.getMessage(error);
    this.alertService.show(userMessage, AlertLevel.ERROR);
  }

}

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ]
})
export class GlobalErrorModule {
}
