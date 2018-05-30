import {CommonModule} from '@angular/common';
import {Directive, ElementRef, HostListener, NgModule} from '@angular/core';

@Directive({selector: 'img[appPreview]'})
export class ImagePreviewDirective {

  constructor(private elementRef: ElementRef<HTMLImageElement>) {
  }

  @HostListener('click')
  click() {
    const src = this.elementRef.nativeElement.src;

    if (src.startsWith('data:')) { // local File uploaded
      const w = window.open('about:blank');
      w.document.body
        .appendChild(w.document.createElement('img'))
        .src = src;
    } else {
      window.open(src, '_blank');
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [ImagePreviewDirective],
  exports: [ImagePreviewDirective],
})
export class ImagePreviewModule {
}
