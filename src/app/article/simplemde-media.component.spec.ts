import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SimplemdeModule} from 'ng2-simplemde';
import {of} from 'rxjs';
import * as SimpleMDE from 'simplemde';
import {IMedia, MediaService} from '../media/media.service';
import {AlertService} from '../shared';
import {SimplemdeMediaComponent} from './simplemde-media.component';

describe('article/simplemde-upload.component', () => {
  // service dependencies
  let alertService: jasmine.SpyObj<AlertService>;
  let mediaService: jasmine.SpyObj<MediaService>;
  beforeEach(() => {
    alertService = jasmine.createSpyObj(AlertService.name, Object.keys(AlertService.prototype));
    mediaService = jasmine.createSpyObj(MediaService.name, Object.keys(MediaService.prototype));
  });

  // build component
  let fixture: ComponentFixture<SimplemdeMediaComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimplemdeMediaComponent],
      providers: [
        {provide: AlertService, useValue: alertService},
        {provide: MediaService, useValue: mediaService},
      ],
      imports: [SimplemdeModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SimplemdeMediaComponent);
    fixture.componentInstance.writeValue(undefined); // 1st = undefined
    fixture.detectChanges();
  }));

  /** @returns {File} The uploaded {@link File}. */
  function fakeUpload(filename: string = 'filename.jpg'): File {
    const data = new DataTransfer();
    const file = new File(['content...'], filename);
    data.items.add(file);

    const inputFile = fixture.debugElement.query(By.css('input[type="file"]'));
    (inputFile.nativeElement as HTMLInputElement as any).files = data.files;

    fixture.detectChanges();

    return file;
  }

  it('Click on "image" toolbar icon should open "upload dialog"', fakeAsync(() => {
    // test case
    const inputFile = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement as HTMLInputElement;
    const inputFileClickFn = spyOn(inputFile, 'click');

    // execute
    const simpleMDE = fixture.debugElement.query(By.css('simplemde')).nativeNode as HTMLElement;
    const imageToolbarIcon = simpleMDE.querySelector<HTMLAnchorElement>('.fa-picture-o');
    imageToolbarIcon.click();

    // check
    expect(inputFileClickFn).toHaveBeenCalled();
  }));

  it('Selected file should upload to "mediaService" and auto-fill input', fakeAsync(() => {
    // test case
    const path = 'http://www.google.fr/favicon.icon';
    const title = 'filename.jpg';
    mediaService.upload.and.returnValue(of({path, title} as IMedia));

    // execute
    const file = fakeUpload(title);
    tick(750);

    // check
    expect(mediaService.upload).toHaveBeenCalledWith(file);
    expect((fixture.debugElement.query(By.css('simplemde')).componentInstance as SimpleMDE).value).toContain(`![${title}](${path})`);
  }));
});
