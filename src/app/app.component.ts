import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>
        <a routerLink="/">Homebook admin</a>
      </span>
      <mat-divider [vertical]="true"></mat-divider>
      <span>{{titleService.getTitle()}}</span>
    </mat-toolbar>

    <mat-sidenav-container fullscreen style="top: 64px;">
      <mat-sidenav mode="side" opened="true">
        <mat-nav-list>
          <mat-list-item [routerLink]="['/article']">
            <mat-icon mat-list-icon>find_in_page</mat-icon>
            <span mat-line>Articles</span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-container>
  `,
  styles: [`
    /* full screen */
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
    }
  `, `
    /* margin */
    .content {
      width: 75%;
      margin: 25px auto;
    }
  `]
})
export class AppComponent {

  constructor(public titleService: Title) {
  }

}
