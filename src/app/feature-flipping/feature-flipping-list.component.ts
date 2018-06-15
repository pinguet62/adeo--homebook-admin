import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

import {AlertLevel, AlertService} from '../shared';
import {FeatureFlippingCreateComponent} from './feature-flipping-create.component';
import {FeatureFlippingService, IFeature} from './feature-flipping.service';

@Component({
  template: `
    <table [dataSource]="features" mat-table>
      <ng-container matColumnDef="key">
        <th mat-header-cell *matHeaderCellDef>{{'featureFlipping.model.key' | translate}}</th>
        <td mat-cell *matCellDef="let feature">{{feature.key}}</td>
      </ng-container>

      <ng-container matColumnDef="enabled">
        <th mat-header-cell *matHeaderCellDef>{{'featureFlipping.model.enabled' | translate}}</th>
        <td mat-cell *matCellDef="let feature">
          <mat-slide-toggle [(ngModel)]="feature.enabled" (change)="featureSwitched(feature)"></mat-slide-toggle>
        </td>
      </ng-container>

      <ng-container matColumnDef="_actions">
        <th mat-header-cell *matHeaderCellDef>{{'featureFlipping.list.actions' | translate}}</th>
        <td mat-cell *matCellDef="let feature">
          <button (confirmedClick)="deleteFeature(feature)" aria-label="Delete" mat-icon-button>
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>

    <button (click)="openCreateDialog()" mat-fab color="warn" class="floating">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    /* floating button */
    .floating {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
  `, `
    table {
      width: 100%;
    }

    .mat-column-key {
      width: 50%;
    }

    .mat-column-enabled {
      width: 25%;
    }

    .mat-column-_actions {
      width: 25%;
    }
  `]
})
export class FeatureFlippingListComponent {

  readonly columns = ['key', 'enabled', '_actions'];

  features: IFeature[] = [];

  constructor(
    titleService: Title,
    translateService: TranslateService,
    private dialogService: MatDialog,
    private alertService: AlertService,
    private featureFlippingService: FeatureFlippingService,
  ) {
    translateService.get('featureFlipping.title').subscribe(it =>
      titleService.setTitle(it)
    );

    this.featureFlippingService.list().subscribe(it =>
      this.features = it
    );
  }

  /** Executed after `(ngModel)` */
  featureSwitched(feature: IFeature) {
    this.featureFlippingService.update(feature).subscribe(
      () => this.alertService.show(`Feature "${feature.key}" updated`, AlertLevel.INFO),
      () => {
        feature.enabled = !feature.enabled; // revert
        this.alertService.show(`Error updating feature "${feature.key}"`, AlertLevel.ERROR);
      }
    );
  }

  deleteFeature(feature: IFeature) {
    this.featureFlippingService.delete(feature).subscribe(
      () => {
        this.alertService.show(`Feature "${feature.key}" deleted`, AlertLevel.INFO);
        this.features = this.features.filter(it => it.key !== feature.key);
      },
      () => this.alertService.show(`Error deleting feature "${feature.key}"`, AlertLevel.ERROR)
    );
  }

  openCreateDialog() {
    const dialogRef: MatDialogRef<any, IFeature> = this.dialogService.open(FeatureFlippingCreateComponent);
    dialogRef.afterClosed().subscribe(createdFeature => {
      if (createdFeature) {
        this.features = this.features.concat(createdFeature);
      }
    });
  }

}
