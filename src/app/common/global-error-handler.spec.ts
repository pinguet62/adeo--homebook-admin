import {HttpErrorResponse} from '@angular/common/http';

import {GlobalErrorHandler} from './global-error-handler';

describe('common/global-error-handler', () => {
  describe(`${GlobalErrorHandler.getMessage.name}`, () => {
    describe(`For type ${HttpErrorResponse.name}`, () => {
      it('Wrapped Homebook response: should return sub-field "errors"', () => {
        const homebookResponse = {status: 'any', data: 'any', errors: 'expected'};
        const error = new HttpErrorResponse({error: homebookResponse});

        const message = GlobalErrorHandler.getMessage(error);

        expect(message).toEqual('expected');
      });

      it('Should return field "error"', () => {
        const error = new HttpErrorResponse({error: 'expected'});

        const message = GlobalErrorHandler.getMessage(error);

        expect(message).toEqual('expected');
      });
    });
  });
});
