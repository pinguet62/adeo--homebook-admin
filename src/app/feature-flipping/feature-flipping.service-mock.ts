/** Delete this implementation after backend release. */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {IFeature} from './feature-flipping.service';

export interface IFeatureFlippingService {
  list(): Observable<IFeature[]>;

  create(feature: IFeature): Observable<IFeature>;

  update(feature: IFeature): Observable<IFeature>;

  delete(feature: IFeature): Observable<any>;
}

@Injectable()
export class FeatureFlippingServiceMock implements IFeatureFlippingService {

  private values: IFeature[] = [];

  list(): Observable<IFeature[]> {
    return of([...this.values]);
  }

  create(feature: IFeature): Observable<IFeature> {
    this.values.push(feature);
    return of(feature);
  }

  update(feature: IFeature): Observable<IFeature> {
    const index = this.values.findIndex(it => it.key === feature.key);
    if (index === -1) {
      return throwError(new HttpErrorResponse({status: 404}));
    }
    this.values[index] = feature;
    return of(feature);
  }

  delete(feature: IFeature): Observable<any> {
    const index = this.values.findIndex(it => it.key === feature.key);
    if (index === -1) {
      return throwError(new HttpErrorResponse({status: 404}));
    }
    const value = this.values[index];
    this.values.splice(index, 1);
    return of(value);
  }

}
