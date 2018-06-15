import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HomebookResult} from '../homebook';

export interface IFeature {
  key: string;
  enabled: boolean;
}

@Injectable()
export class FeatureFlippingService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<IFeature[]> {
    return this.http
      .get<HomebookResult<IFeature[]>>(environment.apiUrl + `/feature-flipping`)
      .pipe(map(it => it.data));
  }

  create(feature: IFeature): Observable<IFeature> {
    return this.http
      .post<HomebookResult<IFeature>>(
        environment.apiUrl + `/feature-flipping`,
        feature
      )
      .pipe(map(it => it.data));
  }

  update(feature: IFeature): Observable<IFeature> {
    return this.http
      .put<HomebookResult<IFeature>>(
        environment.apiUrl + `/feature-flipping/${feature.key}`,
        feature
      )
      .pipe(map(it => it.data));
  }

  delete(feature: IFeature): Observable<any> {
    return this.http
      .delete<HomebookResult<IFeature>>(environment.apiUrl + `/feature-flipping/${feature.key}`)
      .pipe(map((it) => it.data));
  }

}
