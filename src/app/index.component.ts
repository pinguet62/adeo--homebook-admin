import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `
    <div class="menus">
      <div class="box" routerLink="/article">
        <img src="http://www.nerdglaze.com/wp-content/uploads/2013/12/Shelf-of-Books-1024x637.jpg">
        <h2>Articles</h2>
      </div>

      <div class="box" routerLink="/user">
        <img src="http://www.cerc.co.uk/software-support/assets/img/CERC_UGM_2010_097.jpg">
        <h2>User</h2>
      </div>
    </div>
  `,
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(titleService: Title) {
    titleService.setTitle(null);
  }

}
