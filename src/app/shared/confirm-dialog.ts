import {CommonModule} from '@angular/common';
import {Component, Directive, EventEmitter, HostListener, NgModule, Output} from '@angular/core';
import {MatButtonModule, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  template: `
    <mat-dialog-content>{{'common.confirm.title' | translate}}</mat-dialog-content>
    <mat-dialog-actions>
      <button matDialogClose [matDialogClose]="true" type="button" mat-raised-button color="primary">
        {{'common.yes' | translate}}
      </button>
      <button matDialogClose [matDialogClose]="false" type="button" mat-raised-button color="warn">
        {{'common.no' | translate}}
      </button>
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
    TranslateModule.forChild(),
    MatButtonModule, MatDialogModule,
  ],
  declarations: [ConfirmDialogComponent, ConfirmDialogDirective],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent, ConfirmDialogDirective]
})
export class ConfirmDialogModule {
}
