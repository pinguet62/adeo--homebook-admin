import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {tap} from 'rxjs/operators';

import {LoginService, ORIGINAL_URL} from '../shared';

@Component({
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onLogin()">
      <mat-card class="login-card">
        <mat-card-content fxLayout="column">
          <mat-form-field>
            <input
              type="email"
              [(ngModel)]="email" name="email"
              #emailModel="ngModel"
              required email
              [placeholder]="'login.form.email' | translate"
              matInput
              autocomplete="email">
            <mat-error *ngIf="emailModel.control.invalid">
              {{emailModel.control.errors | errorTranslate | async}}
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input
              type="password"
              [(ngModel)]="password" name="password"
              #passwordModel="ngModel"
              required
              [placeholder]="'login.form.password' | translate"
              matInput
              autocomplete="password">
            <mat-error *ngIf="passwordModel.control.invalid">
              {{passwordModel.control.errors | errorTranslate | async}}
            </mat-error>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            type="submit"
            [disabled]="!loginForm.form.valid"
            mat-raised-button color="primary" style="width: 100%;">
            {{'login.form.submit' | translate}}
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [`
    .login-card {
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  originalUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    titleService: Title,
    translateService: TranslateService,
    private loginService: LoginService
  ) {
    translateService.get('login.title').subscribe(x =>
      titleService.setTitle(x)
    );
  }

  ngOnInit(): void {
    this.originalUrl = this.route.snapshot.queryParams[ORIGINAL_URL] || '/';
  }

  onLogin() {
    this.loginService
      .login(this.email, this.password)
      .pipe(tap(() => this.router.navigate([this.originalUrl])))
      .subscribe();
  }

}
