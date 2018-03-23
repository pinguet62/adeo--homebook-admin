import {CommonModule} from '@angular/common';
import {Component, Directive, HostListener, Inject, Input, NgModule} from '@angular/core';
import {MAT_DIALOG_DATA, MatButtonModule, MatDialog, MatDialogModule} from '@angular/material';

type ConfirmDialogData = () => any;

@Component({
  template: `
    <mat-dialog-content>Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
      <button matDialogClose (click)="data()" mat-raised-button color="primary">Yes</button>
      <button matDialogClose mat-raised-button color="warn">No</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }

}

@Directive({
  selector: '[appConfirmDialog]'
})
export class ConfirmDialogDirective {

  @Input('appConfirmDialog') callback: () => any;

  constructor(private dialogService: MatDialog) {
  }

  @HostListener('click')
  click() {
    this.dialogService.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {data: this.callback});
  }

}

@NgModule({
  declarations: [ConfirmDialogComponent, ConfirmDialogDirective],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    // lib
    MatButtonModule, MatDialogModule,
  ],
  exports: [ConfirmDialogComponent, ConfirmDialogDirective],
  providers: []
})
export class ConfirmDialogModule {
}
