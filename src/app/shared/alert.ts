import {CommonModule} from '@angular/common';
import {Component, Inject, Injectable, NgModule} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatIconModule, MatSnackBar, MatSnackBarModule} from '@angular/material';

export enum AlertLevel {
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error'
}

interface AlertData {
  level: AlertLevel;
  message: string | string[];
}

@Component({
  template: `
    <mat-icon [color]="'app-'+data.level" style="margin-right: 14px;">{{data.level}}</mat-icon>

    <div *ngIf="!Array.isArray(data.message); else array">
      {{data.message}}
    </div>
    <ng-template #array>
      <div>
        <ul>
          <li *ngFor="let it of data.message">{{it}}</li>
        </ul>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }
  `]
})
export class AlertComponent {
  Array = Array; // "Array" class usage into template

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: AlertData) {
  }
}

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  public show(message: string | string[], level: AlertLevel) {
    const data: AlertData = {level, message};
    this.snackBar.openFromComponent(AlertComponent, {
      data,
      duration: 1000
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    // lib
    MatIconModule, MatSnackBarModule,
  ],
  declarations: [AlertComponent],
  entryComponents: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule {
}
