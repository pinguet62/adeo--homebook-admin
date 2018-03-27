import {CommonModule} from '@angular/common';
import {Component, Directive, EventEmitter, HostListener, NgModule, Output} from '@angular/core';
import {MatButtonModule, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';

@Component({
  template: `
    <mat-dialog-content>Are you sure?</mat-dialog-content>
    <mat-dialog-actions>
      <button matDialogClose [matDialogClose]="true" mat-raised-button color="primary">Yes</button>
      <button matDialogClose [matDialogClose]="false" mat-raised-button color="warn">No</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
}

@Directive({
  selector: '[confirmedClick]'
})
export class ConfirmDialogDirective {

  @Output('confirmedClick') confirmedClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private dialogService: MatDialog) {
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    const dialogRef: MatDialogRef<ConfirmDialogComponent, boolean> = this.dialogService.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmedClick.emit(event);
      }
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    // lib
    MatButtonModule, MatDialogModule,
  ],
  declarations: [ConfirmDialogComponent, ConfirmDialogDirective],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent, ConfirmDialogDirective]
})
export class ConfirmDialogModule {
}
