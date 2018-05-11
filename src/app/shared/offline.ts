import {Injectable, NgModule} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OfflineService {

  public isOnline: boolean = window.navigator.onLine; // not reactive: should be updated by "online#subscribe()"

  public online: Observable<boolean>;

  public onOnline: Observable<boolean> = fromEvent(window, 'online').pipe(mapTo(true));

  public onOffline: Observable<boolean> = fromEvent(window, 'offline').pipe(mapTo(false));

  constructor() {
    this.online = merge(of(this.isOnline), this.onOnline, this.onOffline);
    this.online.subscribe(it => this.isOnline = it);
  }

}

@NgModule({
  providers: [OfflineService]
})
export class OfflineModule {
}
