import {Component} from '@angular/core';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ImagePreviewDirective} from './image-preview';

describe('shared/image-preview', () => {
  function createComponentWithDirectiveAndImgSrc(src: string) {
    @Component({template: `<img appPreview [src]="src">`})
    class ImagePreviewTestComponent {
      src = src;
    }

    TestBed.configureTestingModule({
      declarations: [ImagePreviewDirective, ImagePreviewTestComponent]
    });
    const fixture = TestBed.createComponent(ImagePreviewTestComponent);
    fixture.detectChanges();

    return fixture;
  }

  it('URL', fakeAsync(() => {
    const windowOpen = spyOn(window, 'open');

    // test case
    const src = 'http://google.fr/media/raw/UUID/FILENAME.png';
    const fixture = createComponentWithDirectiveAndImgSrc(src);

    // execute
    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('click', null);

    // check
    expect(windowOpen).toHaveBeenCalledWith(src, '_blank'); // URL + new tab
  }));

  it('Base64 data', fakeAsync(() => {
    const fakeHtmlImageElement = {src: null};
    const fakeNewWindow = {
      document: {
        createElement: (tagName) => fakeHtmlImageElement,
        body: {
          appendChild: (arg) => arg
        }
      }
    };
    const windowOpen = spyOn(window, 'open').and.returnValue(fakeNewWindow);

    // test case
    const src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    const fixture = createComponentWithDirectiveAndImgSrc(src);

    // execute
    const img = fixture.debugElement.query(By.css('img'));
    img.triggerEventHandler('click', null);

    // check
    expect(windowOpen).toHaveBeenCalledWith('about:blank'); // new tab
    expect(fakeHtmlImageElement.src).toEqual(src); // "data:..."
  }));
});
