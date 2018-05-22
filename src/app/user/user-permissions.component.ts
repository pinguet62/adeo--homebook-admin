import {HttpErrorResponse} from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatStepper} from '@angular/material';
import {of} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';

import {AlertLevel, AlertService} from '../shared';
import {IUser, UserService} from './user.service';

@Component({
  template: `
    <div class="mat-elevation-z8">
      <mat-vertical-stepper #stepper linear>
        <mat-step [completed]="user !== null" [label]="'user.permissions.searchStep.title' | translate">
          <form (ngSubmit)="searchUser()" #userIdForm="ngForm" fxLayout="column">
            <mat-form-field style="padding: 0px 16px;">
              <input
                [(ngModel)]="userId" name="userId"
                (change)="user = null"
                required objectId
                [placeholder]="'user.permissions.searchStep.placeholder' | translate" matInput>
            </mat-form-field>
            <button type="submit" mat-raised-button>
              <span>{{'common.search' | translate}}</span>
              <mat-icon>search</mat-icon>
            </button>
          </form>
        </mat-step>

        <mat-step [label]="'user.permissions.editStep.title' | translate">
          <form *ngIf="user" (ngSubmit)="savePermissions()" fxLayout="column">
            <mat-form-field>
              <mat-chip-list #permissionsChipList>
                <mat-chip
                  *ngFor="let permission of user.permissions"
                  [removable]="true" (removed)="removePermission(permission)">
                  {{permission}}
                  <mat-icon matChipRemove>cancel</mat-icon>
                </mat-chip>
                <input
                  #rolesInput
                  [matAutocomplete]="roleSuggestions"
                  [matChipInputFor]="permissionsChipList"
                  (matChipInputTokenEnd)="addPermission($event)"
                  [placeholder]="'user.permissions.editStep.value' | translate">
                <mat-autocomplete #roleSuggestions="matAutocomplete" (optionSelected)="test($event)">
                  <mat-option *ngFor="let suggestion of suggested" [value]="suggestion">{{suggestion}}</mat-option>
                </mat-autocomplete>
              </mat-chip-list>
            </mat-form-field>

            <button type="submit" mat-raised-button color="primary">{{'common.save' | translate}}</button>
          </form>
        </mat-step>
      </mat-vertical-stepper>
    </div>
  `
})
export class UserPermissionsComponent {

  @ViewChild('stepper') stepper: MatStepper;

  @ViewChild('rolesInput') rolesInput: ElementRef;

  userId: string;

  user: IUser = null;

  get suggested() {
    return ['users.manage', 'notification.send', 'package-management.manage']
      .filter((role) => !this.user.permissions.includes(role));
  }

  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) {
  }

  searchUser() {
    this.userService.getById(this.userId)
      .pipe(tap((user) => this.user = user))
      .pipe(delay(100)) // TODO Workaround: waiting for <mat-step [completed]="user!==null"> before MatStepper#next()
      .pipe(tap(() => this.stepper.next()))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.alertService.show('User not found', AlertLevel.WARN); // TODO if (error.status === 404) ...
        return of(error);
      }))
      .subscribe();
  }

  addPermission(event: MatChipInputEvent) {
    // append permission
    const value = (event.value || '').trim();
    if (value) {
      this.user.permissions.push(value);
    }
    // reset <input>
    const input = event.input;
    if (input) {
      input.value = '';
    }
  }

  test(event: MatAutocompleteSelectedEvent) {
    this.user.permissions.push(event.option.viewValue);
    this.rolesInput.nativeElement.value = '';
  }

  removePermission(value: string) {
    this.user.permissions.splice(this.user.permissions.indexOf(value), 1);
  }

  savePermissions() {
    this.userService.updatePermissions(this.userId, this.user.permissions).subscribe();
  }

}
