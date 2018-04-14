import {Injectable, NgModule} from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mapTo';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OfflineService {

  public isOnline: boolean = window.navigator.onLine; // not reactive: should be updated by "online#subscribe()"

  public online: Observable<boolean>;

  public onOnline: Observable<boolean> = Observable.fromEvent(window, 'online').mapTo(true);

  public onOffline: Observable<boolean> = Observable.fromEvent(window, 'offline').mapTo(false);

  constructor() {
    this.online = Observable.merge(Observable.of(this.isOnline), this.onOnline, this.onOffline);
    this.online.subscribe(it => this.isOnline = it);
  }

}

@NgModule({
  providers: [OfflineService]
})
export class OfflineModule {
}
