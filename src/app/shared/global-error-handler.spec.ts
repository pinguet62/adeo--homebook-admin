import {HttpErrorResponse} from '@angular/common/http';

import {HomebookResult} from '../homebookResult';
import {GlobalErrorHandler} from './global-error-handler';

describe('shared/global-error-handler', () => {
  describe(`${GlobalErrorHandler.getMessage.name}`, () => {
    describe(`For type ${HttpErrorResponse.name}`, () => {
      it('Should return field "error"', () => {
        const message = 'expected';

        const httpErrorResponse = new HttpErrorResponse({statusText: message});

        const result = GlobalErrorHandler.getMessage(httpErrorResponse);

        expect(result).toContain(message); // built message
      });

      it('Wrapped Homebook response: should return sub-field "errors"', () => {
        const message = 'expected';
        const homebookMessage: HomebookResult = {status: 'any', data: 'any', errors: message};

        const error = new HttpErrorResponse({error: homebookMessage});

        const result = GlobalErrorHandler.getMessage(error);

        expect(result).toEqual(message);
      });
    });
  });
});
