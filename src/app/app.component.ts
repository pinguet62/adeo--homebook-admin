import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button routerLink="/" mat-button>Home</button>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
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
}
