import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

import {ORIGINAL_URL} from './constants';
import {LoginService} from './login.service';

@Component({
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onLogin()">
      <mat-card class="login-card">
        <mat-card-content fxLayout="column">
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
            mat-raised-button color="primary" style="width: 100%;">
            Login
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
    private loginService: LoginService
  ) {
    titleService.setTitle('Login');
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
