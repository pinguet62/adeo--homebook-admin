import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Title} from '@angular/platform-browser';

import {environment} from '../environments/environment';
import {LoginService} from './shared';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button (click)="sidenav.toggle()" aria-label="Menu" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>

      <button routerLink="/" fxShow.lt-md="false" mat-button><h1>{{'common.title' | translate}}</h1></button>
      <span>{{titleService.getTitle()}}</span>

      <span style="flex: 1 1 auto;"></span>

      <button [matMenuTriggerFor]="appMenu" aria-label="Options" mat-icon-button>
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #appMenu="matMenu">
        <a [href]="environment.appUrl" target="_blank" rel="noopener" mat-menu-item>
          <mat-icon>get_app</mat-icon>
          <span>{{'common.toolbar.app' | translate}}</span>
        </a>
        <button (click)="loginService.logout()" [routerLink]="['/']" mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>{{'common.toolbar.logout' | translate}}</span>
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
          <mat-list-item
            routerLink="/" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon mat-list-icon>home</mat-icon>
            <span mat-line>{{'common.home' | translate}}</span>
          </mat-list-item>

          <mat-divider></mat-divider>

          <mat-list-item
            routerLink="/article" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected">
            <mat-icon mat-list-icon>find_in_page</mat-icon>
            <span mat-line>{{'article.title' | translate}}</span>
          </mat-list-item>

          <mat-list-item
            routerLink="/user" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected">
            <mat-icon mat-list-icon>person</mat-icon>
            <span mat-line>{{'user.title' | translate}}</span>
          </mat-list-item>

          <mat-list-item
            routerLink="/feature-flipping" (click)="media.isActive('gt-sm') ? null : sidenav.close()"
            routerLinkActive="menu-selected">
            <mat-icon mat-list-icon>check_box</mat-icon>
            <span mat-line>{{'featureFlipping.title' | translate}}</span>
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
    mat-sidenav mat-list-item span {
      padding-right: 30px;
    }

    .menu-selected {
      color: #3f51b5;
    }
  `, `
    .content-web {
      width: 75%;
      margin: 25px auto;
    }
  `, `
    /* <mat-sidenav mode="side"> cover outside <mat-toolbar> */
    /deep/ .mat-drawer-backdrop.mat-drawer-shown {
      position: fixed;
    }
  `]
})
export class AppComponent {

  public environment: any = environment;

  constructor(
    public titleService: Title,
    public media: ObservableMedia,
    public loginService: LoginService
  ) {
  }

}
