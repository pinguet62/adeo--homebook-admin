import {CommonModule, DOCUMENT} from '@angular/common';
import {Directive, ElementRef, Inject, Input, NgModule, OnInit} from '@angular/core';

/**
 * @example
 * <div ... appBadgeAvatar="assets/sample.png"></div>
 */
@Directive({
  selector: '[appBadgeAvatar]',
})
export class BadgeAvatarDirective implements OnInit {

  @Input('appBadgeAvatar') img: string;

  private badgeElement: HTMLImageElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
    if (!this.img) {
      return;
    }

    this.badgeElement = this.document.createElement('img');
    this.badgeElement.src = this.img;
    this.badgeElement.alt = this.img;
    this.badgeElement.classList.add('app-badge-avatar');

    this.elementRef.nativeElement.appendChild(this.badgeElement);
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [
    BadgeAvatarDirective,
  ],
  exports: [
    BadgeAvatarDirective,
  ]
})
export class BadgeAvatarModule {
}
