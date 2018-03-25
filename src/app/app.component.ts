import {Component} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {Title} from '@angular/platform-browser';

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
      <span>{{titleService.getTitle()}}</span>

      <span style="flex: 1 1 auto;"></span>

      <button mat-icon-button>
      <button [matMenuTriggerFor]="appMenu" mat-icon-button>
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #appMenu="matMenu">
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
            <span mat-line>Articles</span>
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
    public media: ObservableMedia
  ) {
  }

}
