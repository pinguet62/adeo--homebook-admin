import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `
    <router-outlet></router-outlet>`
})
export class UserComponent {

  constructor(titleService: Title) {
    titleService.setTitle('Users');
  }

}
