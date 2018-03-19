import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button routerLink="/" mat-raised-button>Home</button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
