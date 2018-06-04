import {HttpErrorResponse} from '@angular/common/http';
import {EventEmitter, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ControlValueAccessor, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {of, throwError} from 'rxjs';

import {AlertService} from '../shared';
import {buttonMatIcon, DisabledConfirmDialogDirective, spyFileReaderSync} from '../test-utils';
import {MediaInputUploadComponent} from './media-input-upload.component';
import {IMedia, MediaService} from './media.service';

describe('media/media-input-upload.component', () => {
  // service dependencies
  let alertService: jasmine.SpyObj<AlertService>;
  let mediaService: jasmine.SpyObj<MediaService>;
  let ngForm: NgForm;
  let ngFormNgSubmit: jasmine.SpyObj<EventEmitter<{}>>;
  beforeEach(() => {
    alertService = jasmine.createSpyObj(AlertService.name, Object.keys(AlertService.prototype));
    mediaService = jasmine.createSpyObj(MediaService.name, Object.keys(MediaService.prototype));
    ngFormNgSubmit = jasmine.createSpyObj(EventEmitter.name, Object.keys(EventEmitter.prototype));
    ngForm = {ngSubmit: ngFormNgSubmit} as any as NgForm;
  });

  // build component
  let fixture: ComponentFixture<MediaInputUploadComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaInputUploadComponent,
        DisabledConfirmDialogDirective,
      ],
      providers: [
        {provide: AlertService, useValue: alertService},
        {provide: MediaService, useValue: mediaService},
        {provide: NgForm, useFactory: () => ngForm},
      ],
      imports: [MatButtonModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(MediaInputUploadComponent);
    fixture.componentInstance.writeValue(undefined); // 1st = undefined
    fixture.detectChanges();
  }));

  beforeEach(() => {
    spyFileReaderSync('data:;base64,Y29udGVudC4uLg==');
  });

  /** @returns {File} The uploaded {@link File}. */
  function fakeUpload(): File {
    const data = new DataTransfer();
    const file = new File(['content...'], 'filename.jpg');
    data.items.add(file);

    const inputFile = fixture.debugElement.query(By.css('input[type="file"]'));
    (inputFile.nativeElement as HTMLInputElement as any).files = data.files;

    fixture.detectChanges();

    return file;
  }

  it('Click on "upload <button>" should trigger "<input type="file"> click"', fakeAsync(() => {
    // test case
    const inputClickFn = spyOn(fixture.componentInstance.inputFile.nativeElement, 'click');

    // execute
    const fileUploadButton = fixture.debugElement.query(buttonMatIcon('file_upload'));
    fileUploadButton.triggerEventHandler('click', null);

    // check
    expect(inputClickFn).toHaveBeenCalled();
  }));

  describe('Eager', () => {
    beforeEach(() => {
      fixture.componentInstance.lazy = false;
      fixture.componentInstance.ngOnInit(); // livecycle
      fixture.detectChanges();
    });

    describe('Click on "upload" button', () => {
      it('Should: trigger "MediaService.upload()" & update view', fakeAsync(() => {
        // test case
        mediaService.upload.and.returnValue(of({} as IMedia));

        // execute
        const file = fakeUpload();

        // check
        expect(mediaService.upload).toHaveBeenCalledWith(file);
        expect(fixture.debugElement.query(buttonMatIcon('delete'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('.app-avatar'))).not.toBeNull();
      }));

      it('Fail should: hide loader & Keep view state', fakeAsync(() => {
        // test case
        mediaService.upload.and.returnValue(throwError(new HttpErrorResponse({status: 500})));

        // execute
        const file = fakeUpload();

        // check
        expect(mediaService.upload).toHaveBeenCalledWith(file);
        expect(fixture.debugElement.query(buttonMatIcon('file_upload'))).not.toBeNull();
      }));
    });

    describe('Click on "delete" button', () => {
      beforeEach(() => {
        fixture.componentInstance.writeValue({_id: '_id', path: 'https://www.google.fr/images/logo.png'} as IMedia);
        fixture.detectChanges();
      });

      it('Should: trigger "MediaService.delete()" & update view', fakeAsync(() => {
        // test case
        mediaService.delete.and.returnValue(of({} as IMedia));

        // execute
        const deleteButton = fixture.debugElement.query(buttonMatIcon('delete'));
        deleteButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // check
        expect(mediaService.delete).toHaveBeenCalled();
        expect(fixture.debugElement.query(buttonMatIcon('file_upload'))).not.toBeNull();
      }));

      it('Fail should: hide loader & Keep view state', fakeAsync(() => {
        // test case
        mediaService.delete.and.returnValue(throwError(new HttpErrorResponse({status: 500})));

        // execute
        const deleteButton = fixture.debugElement.query(buttonMatIcon('delete'));
        deleteButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // check
        expect(fixture.debugElement.query(buttonMatIcon('delete'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('.app-avatar'))).not.toBeNull();
      }));
    });
  });

  describe('Lazy', () => {
    beforeEach(() => {
      fixture.componentInstance.lazy = true;
      fixture.componentInstance.ngOnInit(); // livecycle
      fixture.detectChanges();
    });

    /** Validate the {@link NgForm} in which the {@link ControlValueAccessor} is used. */
    function emitSubmitForm() {
      const formValue = {foo: 'bar'};
      ngForm.ngSubmit.emit(formValue);
      return formValue;
    }

    it('Not-set value should not process "MediaService.*()"', fakeAsync(() => {
      // execute
      const formValue = emitSubmitForm();

      // check
      expect(mediaService.delete).not.toHaveBeenCalled();
      expect(mediaService.upload).not.toHaveBeenCalled();
      expect(fixture.componentInstance.media).toBeNull();
      expect(ngFormNgSubmit.emit.calls.count()).toEqual(1);
      expect(ngFormNgSubmit.emit).toHaveBeenCalledWith(formValue);
    }));

    it('Set value should process only "MediaService.upload()"', fakeAsync(() => {
      // test case
      mediaService.upload.and.returnValue(of({} as IMedia));

      // execute
      const newFile = fakeUpload();
      const formValue = emitSubmitForm();

      // check
      expect(mediaService.delete).not.toHaveBeenCalled();
      expect(mediaService.upload).toHaveBeenCalledWith(newFile);
      expect(fixture.componentInstance.media).not.toBeNull();
      expect(ngFormNgSubmit.emit.calls.count()).toEqual(1);
      expect(ngFormNgSubmit.emit).toHaveBeenCalledWith(formValue);
    }));

    it('Unmodified value should not process "MediaService.*()"', fakeAsync(() => {
      // test case
      fixture.componentInstance.writeValue({_id: '_id', path: 'https://www.google.fr/images/logo.png'} as IMedia);
      fixture.detectChanges();

      // execute
      const formValue = emitSubmitForm();

      // check
      expect(mediaService.delete).not.toHaveBeenCalled();
      expect(mediaService.upload).not.toHaveBeenCalled();
      expect(fixture.componentInstance.media).not.toBeNull();
      expect(ngFormNgSubmit.emit.calls.count()).toEqual(1);
      expect(ngFormNgSubmit.emit).toHaveBeenCalledWith(formValue);
    }));

    it('Modified value should process both "MediaService.delete()" & "MediaService.upload()"', fakeAsync(() => {
      // test case
      mediaService.delete.and.returnValue(of({} as IMedia));
      mediaService.upload.and.returnValue(of({} as IMedia));
      const oldMedia = {_id: '_id', path: 'https://www.google.fr/images/logo.png'} as IMedia;
      fixture.componentInstance.writeValue(oldMedia);
      fixture.detectChanges();

      // execute
      const deleteButton = fixture.debugElement.query(buttonMatIcon('delete'));
      deleteButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      const newFile = fakeUpload();
      tick(500);
      const formValue = emitSubmitForm();

      // check
      expect(mediaService.delete).toHaveBeenCalledWith(oldMedia);
      expect(mediaService.upload).toHaveBeenCalledWith(newFile);
      expect(fixture.componentInstance.media).not.toBeNull();
      expect(ngFormNgSubmit.emit.calls.count()).toEqual(1);
      expect(ngFormNgSubmit.emit).toHaveBeenCalledWith(formValue);
    }));

    it('Deleted value should process only "MediaService.delete()"', fakeAsync(() => {
      // test case
      mediaService.delete.and.returnValue(of({} as IMedia));
      const oldMedia = {_id: '_id', path: 'https://www.google.fr/images/logo.png'} as IMedia;
      fixture.componentInstance.writeValue(oldMedia);
      fixture.detectChanges();

      // execute
      const deleteButton = fixture.debugElement.query(buttonMatIcon('delete'));
      deleteButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      const formValue = emitSubmitForm();

      // check
      expect(mediaService.delete).toHaveBeenCalledWith(oldMedia);
      expect(mediaService.upload).not.toHaveBeenCalled();
      expect(fixture.componentInstance.media).toBeNull();
      expect(ngFormNgSubmit.emit.calls.count()).toEqual(1);
      expect(ngFormNgSubmit.emit).toHaveBeenCalledWith(formValue);
    }));
  });
});
