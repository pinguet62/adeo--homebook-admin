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
  message: string;
}

@Component({
  template: `
    <mat-icon [color]="'app-'+data.level">{{data.level}}</mat-icon>
    {{data.message}}
  `
})
class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: AlertData) {
  }
}

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  public show(message: string, level: AlertLevel) {
    const data: AlertData = {level, message}
    this.snackBar.openFromComponent(AlertComponent, {
      data,
      duration: 1000
    });
  }

}

@NgModule({
  declarations: [AlertComponent],
  entryComponents: [AlertComponent],
  imports: [
    CommonModule,
    // lib
    MatIconModule, MatSnackBarModule,
  ],
  exports: [],
  providers: [AlertService]
})
export class AlertModule {
}
