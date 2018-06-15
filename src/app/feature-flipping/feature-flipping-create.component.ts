import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

import {AlertLevel, AlertService} from '../shared';
import {FeatureFlippingService, IFeature} from './feature-flipping.service';

@Component({
  template: `
    <form #featureForm="ngForm" (ngSubmit)="createFeature()">
      <h2 mat-dialog-title>{{'featureFlipping.create.title' | translate}}</h2>

      <mat-dialog-content fxLayout="column">
        <mat-form-field>
          <input
            [(ngModel)]="feature.key" #keyModel="ngModel" name="key"
            required minlength="1"
            [placeholder]="'featureFlipping.model.key' | translate"
            matInput>
          <mat-error *ngIf="keyModel.control.invalid">
            {{keyModel.control.errors | errorTranslate}}
          </mat-error>
        </mat-form-field>

        <mat-slide-toggle
          [(ngModel)]="feature.enabled" #enabledModel="ngModel" name="enabled"
          required>
          {{'featureFlipping.model.enabled' | translate}}
        </mat-slide-toggle>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button
          type="submit"
          [disabled]="!featureForm.form.valid"
          mat-raised-button color="primary">
          {{'featureFlipping.create.submit' | translate}}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    /* Fix scroll: <mat-dialog-content> + flex */
    mat-dialog-content {
      padding-bottom: 11px;
    }
  `]
})
export class FeatureFlippingCreateComponent {

  feature: IFeature = {
    key: '',
    enabled: false
  };

  constructor(
    private dialogRef: MatDialogRef<FeatureFlippingCreateComponent>,
    private alertService: AlertService,
    private featureFlippingService: FeatureFlippingService,
  ) {
  }

  createFeature() {
    this.featureFlippingService.create(this.feature).subscribe(
      createdFeature => {
        this.dialogRef.close(createdFeature);
        this.alertService.show('Feature created with success', AlertLevel.INFO);
      },
      () => this.alertService.show('Error creating feature', AlertLevel.ERROR)
    );
  }

}
