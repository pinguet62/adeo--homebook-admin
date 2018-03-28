import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Title} from '@angular/platform-browser';

import {LoginService} from './login';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button (click)="sidenav.toggle()" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>

      <span>
        <a routerLink="/">Homebook admin</a>
      </span>
      <mat-divider [vertical]="true"></mat-divider>
      <span>{{titleService.getTitle() | translate}}</span>

      <span style="flex: 1 1 auto;"></span>

      <button [matMenuTriggerFor]="appMenu" mat-icon-button>
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #appMenu="matMenu">
        <button (click)="loginService.logout()" [routerLink]="['/']" mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>

    <mat-sidenav-container fullscreen style="margin-top: 64px;">
      <mat-sidenav
        #sidenav
        [mode]="media.isActive('gt-sm') ? 'side' : 'over'"
        [opened]="media.isActive('gt-sm')"
        [fixedInViewport]="!media.isActive('gt-sm')">
        <mat-nav-list>
          <mat-list-item [routerLink]="['/article']">
            <mat-icon mat-list-icon>find_in_page</mat-icon>
            <span mat-line>{{'article.title' | translate}}</span>
          </mat-list-item>
          <mat-list-item [routerLink]="['/user']">
            <mat-icon mat-list-icon>person</mat-icon>
            <span mat-line>{{'user.title' | translate}}</span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <main ngClass.gt-sm="content-web">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .content-web {
      width: 75%;
      margin: 25px auto;
    }
  `]
})
export class AppComponent {

  constructor(
    public titleService: Title,
    public media: ObservableMedia,
    public loginService: LoginService
  ) {
  }

}
