import {HttpErrorResponse} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import {Observable, of} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';
import {AlertLevel, AlertService} from '../shared';
import {IUser, UserService} from './user.service';

@Component({
  template: `
    <div class="mat-elevation-z8">
      <mat-vertical-stepper #stepper linear>
        <mat-step [completed]="user !== null" [label]="'user.permissions.searchStep.title' | translate">
          <form (ngSubmit)="searchUser()" #searchForm="ngForm" fxLayout="column">
            <mat-form-field style="padding: 0px 16px;">
              <input
                [(ngModel)]="userId" name="userId" #userIdModel="ngModel"
                (change)="user = null"
                [requiredWithout]="userEmailModel" objectId
                [placeholder]="'user.permissions.searchStep.id' | translate" matInput>
              <mat-error *ngIf="userIdModel.control.invalid">
                {{userIdModel.control.errors | errorTranslate | async}}
              </mat-error>
            </mat-form-field>
            <mat-form-field style="padding: 0px 16px;">
              <input
                [(ngModel)]="userEmail" name="userEmail" #userEmailModel="ngModel"
                (change)="user = null"
                [requiredWithout]="userIdModel" email
                [placeholder]="'user.permissions.searchStep.email' | translate" matInput>
              <mat-error *ngIf="userEmailModel.control.invalid">
                {{userEmailModel.control.errors | errorTranslate | async}}
              </mat-error>
            </mat-form-field>
            <button type="submit" [disabled]="!searchForm.form.valid" mat-raised-button>
              <span>{{'common.search' | translate}}</span>
              <mat-icon>search</mat-icon>
            </button>
          </form>
        </mat-step>

        <mat-step [label]="'user.permissions.editStep.title' | translate">
          <form *ngIf="user" (ngSubmit)="savePermissions()" fxLayout="column">
            <chip-list-autocomplete
              [(ngModel)]="user.permissions" #permissionsModel="ngModel" name="permissions"
              [suggestions]="['users.manage', 'notification.send', 'package-management.manage']"
              [placeholder]="'user.permissions.editStep.value' | translate">
            </chip-list-autocomplete>
            <button type="submit" mat-raised-button color="primary">{{'common.save' | translate}}</button>
          </form>
        </mat-step>
      </mat-vertical-stepper>
    </div>
  `
})
export class UserPermissionsComponent {

  @ViewChild('stepper') stepper: MatStepper;

  userId: string;

  userEmail: string;

  user: IUser = null;

  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) {
  }

  searchUser() {
    const find: Observable<IUser> = this.userId ? this.userService.getById(this.userId) : this.userService.getByEmail(this.userEmail);
    find
      .pipe(tap((user) => this.user = user))
      .pipe(delay(100)) // TODO Workaround: waiting for <mat-step [completed]="user!==null"> before MatStepper#next()
      .pipe(tap(() => this.stepper.next()))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.alertService.show('User not found', AlertLevel.WARN); // TODO if (error.status === 404) ...
        return of(error);
      }))
      .subscribe();
  }

  savePermissions() {
    this.userService.updatePermissions(this.userId, this.user.permissions).subscribe();
  }

}
