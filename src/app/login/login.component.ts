import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ORIGINAL_URL} from './constants';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onLogin()">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title><h1>Login</h1></mat-card-title>
        </mat-card-header>

        <mat-card-content class="login-fields">
          <mat-form-field>
            <input
              [(ngModel)]="email" #emailModel="ngModel" name="email"
              type="email"
              required email
              placeholder="Email"
              matInput>
          </mat-form-field>

          <mat-form-field>
            <input
              [(ngModel)]="password" #passwordModel="ngModel" name="password"
              type="password"
              required
              placeholder="Password"
              matInput>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions>
          <button
            type="submit"
            [disabled]="!loginForm.form.valid"
            mat-raised-button color="primary">
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [`
    /* center */
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `, `
    .login-card {
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }

    .login-fields {
      display: flex;
      flex-direction: column;
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
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.originalUrl = this.route.snapshot.queryParams[ORIGINAL_URL] || '/';
  }

  onLogin() {
    this.loginService
      .login(this.email, this.password)
      .do(() => this.router.navigate([this.originalUrl]))
      .subscribe();
  }

}
